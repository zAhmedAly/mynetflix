import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./featured.scss";

export default function Featured({ type, setGenre, genre }) {
  const bgImage =
    // "https://image.tmdb.org/t/p/original//r9PkFnRUIthgBp2JZZzD380MWZy.jpg";
    "https://image.tmdb.org/t/p/original//s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg";
  // "https://image.tmdb.org/t/p/original//zrnzWEQSJ0jtufPGR4SEnB6s1q1.jpg";

  const posterImg =
    // "https://image.tmdb.org/t/p/w500/lmf0zzR7ritjOL3qumRh3hfvOFK.jpg";
    "https://image.tmdb.org/t/p/original//t6HIqrRAclMCA60NsSmeqe9RmNV.jpg";
  // "https://image.tmdb.org/t/p/w500//1XSYOP0JjjyMz1irihvWywro82r.jpg";

  const [content, setContent] = useState({});
  const [status, setStatus] = useState("");

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });

  const getRandomContent = async () => {
    try {
      const res = await axiosInstance.get(`/movies/random?type=${type}`);
      setInterval(() => {
        setContent(res.data[0]);
        setStatus("active");
      }, 1000);
    } catch (err) {
      console.log(err);
      setStatus("");
    }
  };

  useEffect(() => {
    setStatus("");
    setGenre("");
    getRandomContent();
    // eslint-disable-next-line
  }, [type]);

  return (
    <div className="featured">
      <div
        className={`hero ${status}`}
        style={{
          // backgroundImage: `url(${content?.img})`,
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="hero__content">
          <div className="hero__content__info">
            {/* <div className="category">
              {type && (
                <>
                  <span>{type === "movie" ? "Movies" : "Series"}</span>
                  <select
                    name="genre"
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    aria-label="genre"
                  >
                    <option value="">Genre</option>
                    <option value="adventure">Adventure</option>
                    <option value="action">Action</option>
                    <option value="comedy">Comedy</option>
                    <option value="crime">Crime</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="historical">Historical</option>
                    <option value="horror">Horror</option>
                    <option value="romance">Romance</option>
                    <option value="sci-fi">Sci-fi</option>
                    <option value="thriller">Thriller</option>
                    <option value="western">Western</option>
                    <option value="animation">Animation</option>
                    <option value="drama">Drama</option>
                    <option value="documentary">Documentary</option>
                  </select>
                </>
              )}
            </div> */}
            <h2 className="title">Avatar: The Way of Water</h2>
            <span className="desc">
              Set more than a decade after the events of the first film, learn
              the story of the Sully family (Jake, Neytiri, and their kids), the
              trouble that follows them, the lengths they go to keep each other
              safe, the battles they fight to stay alive, and the tragedies they
              endure.
            </span>
            <div className="buttons">
              <button type="button" className="play">
                <PlayArrow />
                <Link
                  to={{ pathname: "/watch", movie: content }}
                  className="link"
                >
                  <span>Watch Now</span>
                </Link>
              </button>
              <button type="button" className="more">
                <InfoOutlined />
                <span>More Info</span>
              </button>
            </div>
          </div>
          <div className="hero__content__poster">
            {/* <img src={content?.img} alt="imgTitle" /> */}
            <img src={posterImg} alt="imgTitle" />
          </div>
        </div>
      </div>
    </div>
  );
}
