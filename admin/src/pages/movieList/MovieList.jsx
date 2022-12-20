import "./movieList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls";

export default function MovieList() {
  const { movies, dispatch, isFetching } = useContext(MovieContext);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90, headerAlign: "center" },
    {
      field: "movie",
      headerName: "Movie",
      headerAlign: "center",

      width: 200,
      renderCell: (params) => {
        return (
          <div className="movieListItem">
            <img className="movieListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120, headerAlign: "center" },
    { field: "year", headerName: "Year", width: 120, headerAlign: "center" },
    { field: "limit", headerName: "limit", width: 120, headerAlign: "center" },
    {
      field: "isSeries",
      headerName: "Series",
      width: 120,
      headerAlign: "center",
    },

    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",

      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/movie/" + params.row._id, movie: params.row }}
            >
              <button className="movieListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="movieListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="movieList">
      <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 15, 20]}
        checkboxSelection
        getRowId={(r) => r._id}
        pagination
        loading={isFetching}
      />
    </div>
  );
}
