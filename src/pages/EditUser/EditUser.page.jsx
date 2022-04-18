import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserForm from "./EditPageForm";
import {
  loadUsersAsync,
  setCurrentUser,
  setCurrentUserId,
} from "../../redux/reducers/users/users.actions";
import {
  selectCurrentUser,
  selectCurrentUserId,
  selectIsLoading,
} from "../../redux/reducers/users/user.selector";

function EditUserPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const uncachedCurrentUser = useSelector((state) => state.user.currentUser);
  const currentUserId = useSelector(selectCurrentUserId);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    const bootstrap = async () => {
      await dispatch(loadUsersAsync());
      await dispatch(setCurrentUserId(id));
      await dispatch(setCurrentUser(id));
    };
    bootstrap();
  }, []);

  return (
    <>
      <Typography variant="h5">
        Edit User:{currentUser && currentUser.username} Page
      </Typography>

      {isLoading ? (
        <p>loading...</p>
      ) : (
        <UserForm
          paramId={id}
          currentUserId={currentUserId}
          currentUser={currentUser}
        />
      )}
    </>
  );
}

export default EditUserPage;
