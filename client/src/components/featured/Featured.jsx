import { InfoOutlined, PlayArrow } from "@material-ui/icons";
// import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./featured.scss";

import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

export default function Featured({ type }) {
  const [content, setContent] = useState({});
  const [status, setStatus] = useState("");
  const [genres, setGenres] = useState([]);

  // const axiosInstance = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL,
  //   headers: {
  //     token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
  //   },
  // });

  const getRandomContent = async () => {
    const params = { page: 1 };
    let res = null;
    let id = null;
    try {
      // const res = await axiosInstance.get(`/movies/random?type=${type}`);
      switch (type) {
        case "movie":
          res = await tmdbApi.getMoviesList(movieType.popular, {
            params,
          });
          break;
        case "series":
          res = await tmdbApi.getTvList(tvType.popular, { params });
          break;
        default:
          res = await tmdbApi.getMoviesList(movieType.top_rated, {
            params,
          });
          break;
      }

      // setContent(res.data[0]);

      id = Math.floor(Math.random() * 20);

      const response = await tmdbApi.detail(
        type === "series" ? category.tv : category.movie,
        res.results[id].id,
        {
          params: {},
        }
      );

      setContent(response);
      setGenres(response.genres);
      // setContent(res.results[Math.floor(Math.random() * 20)]);

      window.scrollTo(0, 0);

      setInterval(() => {
        setStatus("active");
      }, 1000);
    } catch (err) {
      console.log("Featured Error: ", err);
      setStatus("");
    }
  };

  useEffect(() => {
    getRandomContent();
    return () => {
      setStatus("");
    };
    // eslint-disable-next-line
  }, [type]);

  return (
    <div className="featured">
      <div
        className={`hero ${status}`}
        style={{
          // backgroundImage: `url(${content?.img})`,
          backgroundImage: `url(
            ${
              content?.backdrop_path &&
              apiConfig.originalImage(
                content?.backdrop_path
                  ? content?.backdrop_path
                  : content?.poster_path
              )
            }
          )`,
          backgroundColor: "darkgray",
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
            <h2 className="title">{content?.name || content?.title}</h2>

            <div className="itemInfoTop">
              {type === "series" ? (
                <>
                  <span>Country: {content?.origin_country}</span>
                  <span style={{ marginLeft: "1rem" }}>
                    {content?.first_air_date?.substring(0, 4)}
                  </span>
                </>
              ) : (
                <>
                  <span className="limit">+{content?.limit}</span>
                  <span>{content?.release_date?.substring(0, 4)}</span>
                </>
              )}
            </div>
            <div className="itemInfoTop">
              {content?.vote_average > 0 ? (
                <>
                  <span className="limit">
                    {content?.vote_average.toFixed(1)}
                  </span>

                  {/* <span style={{ marginRight: "1rem" }}>
                    Rating: {content?.vote_average.toFixed(1)}
                  </span> */}
                  <span>
                    {content?.vote_count.toLocaleString("en-US")} Votes
                  </span>
                </>
              ) : (
                <span>No Ratings</span>
              )}
            </div>
            <div className="genreContainer">
              {genres.map((genre) => (
                <span
                  key={genre.id}
                  className="desc"
                  style={{
                    fontSize: "0.8em",
                    fontWeight: "500",
                    color: "white",
                    marginRight: "1rem",
                    border: "2px solid white",
                    padding: "4px 8px",
                    borderRadius: "32px",
                  }}
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <span className="desc">{content?.overview}</span>
            <div className="buttons">
              <button type="button" className="play">
                <PlayArrow />
                <Link
                  to={{ pathname: "/watch", movie: content }}
                  className="link"
                  style={{ color: "white" }}
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
            {/* <img src={content?.imgSm} alt="imgTitle" /> */}
            {/* <img src={posterImg} alt="imgTitle" /> */}
            <img
              src={
                content?.poster_path &&
                apiConfig.w500Image(content?.poster_path)
              }
              alt="PosterImg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// const bgImage =
// "https://image.tmdb.org/t/p/original/r9PkFnRUIthgBp2JZZzD380MWZy.jpg";
// "https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg";
// "https://image.tmdb.org/t/p/original/zrnzWEQSJ0jtufPGR4SEnB6s1q1.jpg";
// 	https://image.tmdb.org/t/p/original/5kAGbi9MFAobQTVfK4kWPnIfnP0.jpg
// https://image.tmdb.org/t/p/original/AuV99eQivVWuk2AOSM6hYh9QRPQ.jpg
// https://image.tmdb.org/t/p/original/dKqa850uvbNSCaQCV4Im1XlzEtQ.jpg
// 	https://image.tmdb.org/t/p/original/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg
// 	https://image.tmdb.org/t/p/original/8I37NtDffNV7AZlDa7uDvvqhovU.jpg
// https://image.tmdb.org/t/p/original/nWs0auTqn2UaFGfTKtUE5tlTeBu.jpg

// const posterImg =
// "https://image.tmdb.org/t/p/w500/lmf0zzR7ritjOL3qumRh3hfvOFK.jpg";
// "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg";
// "https://image.tmdb.org/t/p/w500/1XSYOP0JjjyMz1irihvWywro82r.jpg";
// https://image.tmdb.org/t/p/w500/7CNCv9uhqdwK7Fv4bR4nmDysnd9.jpg
// https://image.tmdb.org/t/p/w500/iREd0rNCjYdf5Ar0vfaW32yrkm.jpg
// 	https://image.tmdb.org/t/p/w500/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg
// https://image.tmdb.org/t/p/w500/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg
// https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg
//https://image.tmdb.org/t/p/w500/ga8R3OiOMMgSvZ4cOj8x7prUNYZ.jpg
