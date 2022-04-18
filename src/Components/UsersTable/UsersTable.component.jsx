import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
  selectUsers,
} from "../../redux/reducers/users/user.selector";
import {
  loadUsersAsync,
  deleteUser,
  setCurrentUserId,
  // editUser,
} from "../../redux/reducers/users/users.actions";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

import EditModal from "../Modal/Modal.component";
import { Box, Typography } from "@mui/material";

const UsersTable = () => {
  const [pageSize, setPageSize] = useState(3);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const isLoading = useSelector(selectIsLoading);
  const errorMessage = useSelector(selectError);

  useEffect(() => {
    console.log("useEffect");
    const bootstrapAsync = async () => {
      await dispatch(loadUsersAsync());
    };
    bootstrapAsync();
  }, []);

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (id: string) => {
    dispatch(setCurrentUserId(id));
    setIsOpenEdit(!isOpenEdit);
  };
  const handleAdd = (id: string) => {
    setIsOpenAdd(!isOpenAdd);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 10 },
    { field: "username", headerName: "username", width: 150 },
    { field: "email", headerName: "email", width: 150 },
    { field: "phone", headerName: "phone", width: 150 },
    { field: "company", headerName: "company", width: 150 },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.id)}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Toggle Admin"
          onClick={() => handleEdit(params.id)}
        />,
      ],
    },
  ];
  console.log("users", users);
  const readyRows =
    users &&
    users.map((user) => {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        company: user.company.name,
      };
    });
  return (
    <>
      <EditModal
        isOpen={isOpenEdit}
        toggleModal={handleEdit}
        formType="Edit User"
        mode="edit"
      />
      <EditModal
        isOpen={isOpenAdd}
        toggleModal={handleAdd}
        formType="Add User"
        mode="add"
      />
      <Box
        sx={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Users Table</Typography>
        <Button
          m={10}
          size="large"
          type="submit"
          variant="contained"
          onClick={handleAdd}
        >
          Add New User
        </Button>
      </Box>
      {isLoading && <h3>Loading...</h3>}
      {errorMessage && <h3>{errorMessage}</h3>}
      {users && (
        <DataGrid
          autoHeight
          rows={readyRows}
          columns={columns}
          disableColumnMenu
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[3, 5, 10]}
          pagination
        />
      )}{" "}
    </>
  );
};

export default UsersTable;
