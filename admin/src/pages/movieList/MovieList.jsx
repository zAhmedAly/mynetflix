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
    {
      field: "_id",
      headerName: "ID",
      width: 200,
      align: "center",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "movie",
      headerName: "Movie",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",

      width: 220,
      renderCell: (params) => {
        return (
          <div className="movieListItem">
            <img className="movieListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "genre",
      headerName: "Genre",
      width: 160,
      align: "center",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "year",
      headerName: "Year",
      width: 160,
      align: "center",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "limit",
      headerName: "Limit",
      width: 120,
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "isSeries",
      type: "boolean",
      // headerClassName: "super-app-theme--header",
      headerAlign: "center",
      headerName: "Series",
      width: 160,
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
    },

    {
      field: "action",
      headerName: "Action",
      align: "center",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      width: 160,
      renderCell: (params) => {
        //  console.log("params = ", params);
        return (
          <>
            <Link
              to={{
                pathname: "/movie/" + params.row._id,
                state: {
                  movie: params.row,
                },
              }}
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
      <h1 style={{ marginBottom: "16px" }}> Movie List </h1>
      <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 15, 20]}
        // checkboxSelection
        getRowId={(r) => r._id}
        pagination
        loading={isFetching}
      />
    </div>
  );
}
