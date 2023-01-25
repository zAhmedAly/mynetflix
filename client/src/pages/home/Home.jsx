import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import { useEffect } from "react";
// import axios from "axios";
import { category, movieType, tvType } from "../../api/tmdbApi";
import MovieList from "../../components/list/MovieList";
import useWindowSize from "../../hooks/useWindowSize";
import Footer from "../../components/footer/Footer";

const Lists = [
  {
    id: 1,
    title: "Upcoming Movies",
    category: category.movie,
    type: movieType.upcoming,
  },
  {
    id: 2,
    title: "Trending Movies",
    category: category.movie,
    type: movieType.popular,
  },
  {
    id: 3,
    title: "Top Rated Movies",
    category: category.movie,
    type: movieType.top_rated,
  },
  {
    id: 4,
    title: "On Air TV Series",
    category: category.tv,
    type: tvType.on_the_air,
  },
  {
    id: 5,
    title: "Trending TV Series",
    category: category.tv,
    type: tvType.popular,
  },
  {
    id: 6,
    title: "Top Rated TV Series",
    category: category.tv,
    type: tvType.top_rated,
  },
];
const Home = ({ type = null }) => {
  // const [lists, setLists] = useState([]);
  // const [genre, setGenre] = useState("");
  // const axiosInstance = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL,
  //   headers: {
  //     token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
  //   },
  // });

  const size = useWindowSize();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [size]);

  // useEffect(() => {
  //   setGenre("");
  // }, [type]);

  // useEffect(() => {
  //   const getRandomLists = async () => {
  //     try {
  //       const res = await axiosInstance.get(
  //         `lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`
  //       );

  //       setLists(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   // getRandomLists();
  //   // eslint-disable-next-line
  // }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      {/* <Featured type={type} setGenre={setGenre} genre={genre} /> */}
      <Featured type={type} />

      <div className="listContainer">
        {Lists.map((list, index) => (
          <MovieList
            listName={list.title}
            category={list.category}
            type={list.type}
            key={index}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
