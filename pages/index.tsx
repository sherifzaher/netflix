import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Banner from "../components/Banner";
import axios from "axios";
import requests from "../utils/requests";
import { Movie } from "../typings";
import Row from "../components/Row";

interface Props {
  netflixOrigin: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  Doumentaries: Movie[];
}

const Home = ({
  netflixOrigin,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  Doumentaries,
}: Props) => {
  return (
    <div
      className={
        "relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]"
      }
    >
      <Head>
        <title>Home - Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={"relative pl-4 pb-24 lg:space-y-24"}>
        <Banner netflixOrigin={netflixOrigin} />
        <section className={"md:space-y-12"}>
          <Row title={"Netflix Originals"} Movies={netflixOrigin} />
          <Row title={"Trending Now"} Movies={trendingNow} />
          <Row title={"Top Rated"} Movies={topRated} />
          <Row title={"Action Movies"} Movies={actionMovies} />
          <Row title={"Comedy Movies"} Movies={comedyMovies} />
          <Row title={"Horror Movies"} Movies={horrorMovies} />
          <Row title={"Romance Movies"} Movies={romanceMovies} />
          <Row title={"Documentaries"} Movies={Doumentaries} />
        </section>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [
    netflixOrigin,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    Doumentaries,
  ] = await Promise.all([
    axios.get(requests.fetchNetflixOriginals).then((res) => res.data),
    axios.get(requests.fetchTrending).then((res) => res.data),
    axios.get(requests.fetchTopRated).then((res) => res.data),
    axios.get(requests.fetchActionMovies).then((res) => res.data),
    axios.get(requests.fetchComedyMovies).then((res) => res.data),
    axios.get(requests.fetchHorrorMovies).then((res) => res.data),
    axios.get(requests.fetchRomanceMovies).then((res) => res.data),
    axios.get(requests.fetchDocumentaries).then((res) => res.data),
  ]);
  return {
    props: {
      netflixOrigin: netflixOrigin.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      Doumentaries: Doumentaries.results,
    },
  };
};
