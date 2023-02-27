import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import apiConfig from "../../api/apiConfig";

export default function MovieItem({ movie, category }) {
  const [isHovered, setIsHovered] = useState(false);

  const link = `/${category}/${movie.id}`;

  // console.log("LINK = ", link);

  const shorten = (str, maxLen, separator = " ") => {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen)) + " ...";
  };

  return (
    // <Link to={{ pathname: "/watch", movie: movie }}>
    <>
      <div
        className="listItem"
        // style={{ left: isHovered && index * 225 - 50 + index * 9 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundImage: `url(${apiConfig.w500Image(movie?.poster_path)})`,
          // left: isHovered && index * 225 - 50 + index * 9,
        }}
      >
        {/* <img src={movie?.imgSm} alt="" /> */}
        {isHovered && (
          <>
            {/* <video src={movie.trailer} autoPlay={true} loop /> */}

            <div className="itemInfo">
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">+{movie?.limit}</span>
                <span>{movie?.year}</span>
              </div>
              <div className="desc">{shorten(movie?.overview, 300, " ")}</div>
              <div className="itemInfoBottom">
                <div className="genre">{movie?.genre}</div>
                <div className="icons">
                  {/* <Link to={{ pathname: { link }, movie: movie }}> */}
                  <Link to={link}>
                    <PlayArrow className="icon" />
                  </Link>
                  <Link to={{ pathname: "/watch", movie: movie }}>
                    <Add className="icon" />
                  </Link>
                  <Link to={{ pathname: "/watch", movie: movie }}>
                    <ThumbUpAltOutlined className="icon" />
                  </Link>
                  <Link to={{ pathname: "/watch", movie: movie }}>
                    <ThumbDownOutlined className="icon" />
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <h5
        style={{
          visibility: !isHovered ? "hidden" : "visible",
          padding: "0 0.5rem",
        }}
      >
        {movie?.title || movie?.name}
      </h5>
    </>
    // </Link>
  );
}

// const [movie, setMovie] = useState({});
// const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
//   headers: {
//     token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
//   },
// });

// const getMovie = async () => {
//   try {
//     const res = await axiosInstance.get("/movies/find/" + item);
//     setMovie(res.data);
//   } catch (err) {
//     console.log(err);
//   }
// };

// useEffect(() => {
//   getMovie();
//   // eslint-disable-next-line
// }, [item]);
