import { Link, useParams } from "react-router-dom";
import "./movie.css";
import { Publish } from "@material-ui/icons";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";

export default function Movie() {
  const params = useParams();
  const { movies } = useContext(MovieContext);
  const movie = movies.filter((movie) => movie._id === params.movieId)[0];

  return (
    <div className="movie">
      {movie ? (
        <>
          <div className="movieTitleContainer">
            <h1 className="movieTitle">Edit Movie</h1>
            <Link to="/newMovie">
              <button className="movieAddButton">Create</button>
            </Link>
          </div>
          <div className="movieTop">
            <div className="movieTopRight">
              <div className="movieInfoTop">
                <img src={movie.img} alt="" className="movieInfoImg" />
                <span className="movieName">{movie.title}</span>
              </div>
              <div className="movieInfoBottom">
                <div className="movieInfoItem">
                  <span className="movieInfoKey">id:</span>
                  <span className="movieInfoValue">{movie._id}</span>
                </div>
                <div className="movieInfoItem">
                  <span className="movieInfoKey">genre:</span>
                  <span className="movieInfoValue">{movie.genre}</span>
                </div>
                <div className="movieInfoItem">
                  <span className="movieInfoKey">year:</span>
                  <span className="movieInfoValue">{movie.year}</span>
                </div>
                <div className="movieInfoItem">
                  <span className="movieInfoKey">limit:</span>
                  <span className="movieInfoValue">{movie.limit}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="movieBottom">
            <form className="movieForm">
              <div className="movieFormLeft">
                <label>Movie Title</label>
                <input type="text" placeholder={movie.title} />
                <label>Year</label>
                <input type="text" placeholder={movie.year} />
                <label>Genre</label>
                <input type="text" placeholder={movie.genre} />
                <label>Limit</label>
                <input type="text" placeholder={movie.limit} />
                <label>Trailer</label>
                <input type="file" placeholder={movie.trailer} />
                <label>Video</label>
                <input type="file" placeholder={movie.video} />
              </div>
              <div className="movieFormRight">
                <div className="movieUpload">
                  <img src={movie.img} alt="" className="movieUploadImg" />
                  <label htmlFor="file">
                    <Publish />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="movieButton">Update</button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className="errorContainer">
          <h2 className="movieTitle">
            Something went wrong to retreive movie information
          </h2>
          <br></br>
          <Link to="/movies" className="link">
            <h3 style={{ color: "blue" }}>Please go back to Movies</h3>
          </Link>
        </div>
      )}
    </div>
  );
}
