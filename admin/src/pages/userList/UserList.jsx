import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserList() {
  // const [data, setData] = useState(userRows);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  let users = [];
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });

  useEffect(() => {
    const getUsers = async () => {
      setIsFetching(true);
      try {
        const res = await axiosInstance.get("/users");
        setData(res.data);
        setIsFetching(false);
      } catch (err) {
        setIsFetching(false);
        console.log(err);
      }
    };
    getUsers();

    // eslint-disable-next-line
  }, []);

  users = data.map((user) => {
    return { ...user, id: user._id };
  });

  // console.log("data", users);

  const handleDelete = (id) => {
    setData(data.filter((user) => user._id !== id));
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
      headerClassName: "super-app-theme--header",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "username",
      headerName: "User",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={
                params.row.profilePic
                  ? params.row.profilePic
                  : "../../img/noAvatar.jpg"
              }
              alt="profilePic"
            />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "isAdmin",
      headerName: "IsAdmin",
      type: "boolean",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 160,
      // renderCell: (params) => {
      //   return <div style={{ textAlign: "center" }}>{params.row.username}</div>;
      // },
    },
    // {
    //   field: "transaction",
    //   headerName: "Transaction Volume",
    //   width: 160,
    //   headerAlign: "center",
    // },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      cellClassName: "super-app-theme--cell",
      align: "center",
      headerAlign: "center",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <h1 style={{ marginBottom: "16px" }}> Users List </h1>

      <DataGrid
        autoHeight
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 15, 20, 50]}
        // checkboxSelection
        pagination
        loading={isFetching}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
      />
    </div>
  );
}
