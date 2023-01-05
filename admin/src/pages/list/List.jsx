import "./list.css";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ListContext } from "../../context/listContext/ListContext";

export default function List() {
  const params = useParams();
  const { lists } = useContext(ListContext);
  const list = lists.filter((list) => list._id === params.listId)[0];

  return (
    <div className="list">
      {list ? (
        <>
          <div className="listTitleContainer">
            <h1 className="listTitle">Edit List</h1>
            <Link to="/newList">
              <button className="listAddButton">Create</button>
            </Link>
          </div>
          <div className="listTop">
            <div className="listTopRight">
              <div className="listInfoTop">
                <span className="listName">{list.title}</span>
              </div>
              <div className="listInfoBottom">
                <div className="listInfoItem">
                  <span className="listInfoKey">id:</span>
                  <span className="listInfoValue">{list._id}</span>
                </div>
                <div className="listInfoItem">
                  <span className="listInfoKey">genre:</span>
                  <span className="listInfoValue">{list.genre}</span>
                </div>
                <div className="listInfoItem">
                  <span className="listInfoKey">type:</span>
                  <span className="listInfoValue">{list.type}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="listBottom">
            <form className="listForm">
              <div className="listFormLeft">
                <label>List Title</label>
                <input type="text" placeholder={list.title} />
                <label>Type</label>
                <input type="text" placeholder={list.type} />
                <label>Genre</label>
                <input type="text" placeholder={list.genre} />
              </div>
              <div className="listFormRight">
                <button className="listButton">Update</button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className="errorContainer">
          <h2 className="listTitle">
            Something went wrong to retreive list information
          </h2>
          <br></br>
          <Link to="/lists" className="link">
            <h3 style={{ color: "blue" }}>Please go back to Lists</h3>
          </Link>
        </div>
      )}
    </div>
  );
}
