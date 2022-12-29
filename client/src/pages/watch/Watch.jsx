import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./watch.scss";

export default function Watch() {
  const location = useLocation();
  const history = useHistory();
  const movie = location.movie;
  // console.log("location = ", location);
  // console.log("movie = ", movie);

  if (movie === undefined) {
    // console.log("movie is undefined");
    history.push("/");
  }

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        className="video"
        autoPlay
        progress="true"
        controls
        src={movie?.video}
      />
    </div>
  );
}
