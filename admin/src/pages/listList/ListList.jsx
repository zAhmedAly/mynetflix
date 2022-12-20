import "./listList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { deleteList, getLists } from "../../context/listContext/apiCalls";

export default function ListList() {
  const { lists, dispatch, isFetching } = useContext(ListContext);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    getLists(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteList(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250, headerAlign: "center" },
    { field: "title", headerName: "Title", width: 250, headerAlign: "center" },
    { field: "genre", headerName: "Genre", width: 150, headerAlign: "center" },
    { field: "type", headerName: "Type", width: 150, headerAlign: "center" },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",

      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/list/" + params.row._id, list: params.row }}
            >
              <button className="listListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="listListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    // style={{ height: 400, width: "100%" }}
    <div className="listList">
      <DataGrid
        rows={lists}
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
