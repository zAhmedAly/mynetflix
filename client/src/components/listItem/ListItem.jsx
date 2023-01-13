import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ListItem({ index, movie }) {
  const [isHovered, setIsHovered] = useState(false);

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
          backgroundImage: `url(${movie?.imgSm})`,
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
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{shorten(movie?.desc, 375, " ")}</div>
              <div className="itemInfoBottom">
                <div className="genre">{movie.genre}</div>
                <div className="icons">
                  <Link to={{ pathname: "/watch", movie: movie }}>
                    <PlayArrow className="icon" />
                  </Link>
                  <Add className="icon" />
                  <ThumbUpAltOutlined className="icon" />
                  <ThumbDownOutlined className="icon" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <h3 style={{ padding: "0 1rem" }}>{movie.title}</h3>
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
