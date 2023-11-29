import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import tmdbApi from "../../api/tmdbApi";
import MovieItem from "../listItem/MovieItem";
import "./list.scss";
import useWindowSize from "../../hooks/useWindowSize";

export default function MovieList({ listName, category, type, id = 0 }) {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const [list, setList] = useState([]);

  const listRef = useRef();

  const size = useWindowSize();

  let items =
    size.width < 420 ? 2 : size.width <= 600 ? 3 : size.width <= 1024 ? 4 : 5;

  let itemWidth = Math.floor((size.width - 100 - items * 16) / items);

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x;

    if (direction === "left" && slideNumber >= 0) {
      listRef.current.style.transform = `translateX(${Math.ceil(
        itemWidth + 16 + distance
      )}px)`;
      setSlideNumber(slideNumber - 1);
    }
    if (direction === "right" && slideNumber < Math.floor(10 - items)) {
      setSlideNumber(slideNumber + 1);

      listRef.current.style.transform = `translateX(${
        -(itemWidth + 16) * (slideNumber + 1)
      }px)`;
    }
  };

  // useEffect(() => {
  //   setSlideNumber(0);
  //   handleClick("left");
  //   console.log("Reset Slide Number");
  // }, [size]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      let randomId = 0;
      const params = {};

      if (type !== "similar") {
        switch (category) {
          case "movie":
            response = await tmdbApi.getMoviesList(type, { params });
            break;
          default:
            response = await tmdbApi.getTvList(type, { params });
        }
      } else {
        response = await tmdbApi.similar(category, id);
      }
      randomId = Math.floor(Math.random() * 5);

      setList(response.results.slice(randomId, randomId + 10));
    };

    getList();
  }, [category, type, id]);

  return (
    <div className="list">
      {/* <div>
        {size.width}px / {size.height}px / {itemWidth}px
      </div> */}
      {list.length > 0 && (
        <>
          <h2 className="listTitle">{listName}</h2>
          <div className="wrapper">
            <ArrowBackIosOutlined
              className="sliderArrow left"
              onClick={() => handleClick("left")}
              style={{ display: (!isMoved || slideNumber === 0) && "none" }}
            />
            <div className="container" ref={listRef}>
              {list?.map((movie, index) => (
                <div
                  key={index}
                  className="item"
                  style={{ marginRight: "16px", width: `${itemWidth}px` }}
                >
                  <MovieItem movie={movie} category={category} key={index} />
                </div>
              ))}
            </div>
            <ArrowForwardIosOutlined
              className="sliderArrow right"
              onClick={() => handleClick("right")}
              style={{
                display: slideNumber >= Math.floor(10 - items) && "none",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
