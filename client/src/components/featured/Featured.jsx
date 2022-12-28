import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./featured.scss";

export default function Featured({ type, setGenre }) {
  // const [isScrolled, setIsScrolled] = useState(false);

  const [content, setContent] = useState({});
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });

  // window.onscroll = () => {
  //   setIsScrolled(window.pageYOffset === 0 ? false : true);
  //   return () => (window.onscroll = null);
  // };

  const getRandomContent = async () => {
    try {
      const res = await axiosInstance.get(`/movies/random?type=${type}`);
      setContent(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRandomContent();
    // eslint-disable-next-line
  }, [type]);

  return (
    // <div className={isScrolled ? "featured scrolled" : "featured"}>
    <div className="featured">
      <div
        className="hero"
        style={{
          backgroundImage: `url(${content?.img})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
          backgroundSize: "100vw 100vh",
        }}
      ></div>
      <div className="info">
        <div className="category">
          {type && (
            <>
              <span>{type === "movie" ? "Movies" : "Series"}</span>
              {/* <label htmlFor="genre">
                {type === "movie" ? "Movies" : "Series"}
              </label> */}
              <select
                name="genre"
                id="genre"
                onChange={(e) => setGenre(e.target.value)}
                aria-label="genre"
              >
                <option>Genre</option>
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
        </div>
        <div className="information">
          {/* <img src={content?.imgTitle} alt="imgTitle" /> */}

          <span className="desc">{content?.desc?.substring(0, 200)}</span>
          <div className="buttons">
            <button className="play">
              <PlayArrow />
              <Link
                to={{ pathname: "/watch", movie: content }}
                className="link"
              >
                <span>Play</span>
              </Link>
            </button>
            <button className="more">
              <InfoOutlined />
              <span>Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
