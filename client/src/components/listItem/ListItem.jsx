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

  return (
    <Link to={{ pathname: "/watch", movie: movie }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie?.imgSm} alt="" />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />

            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
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
