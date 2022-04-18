// import { useState } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
import UserForm from "../UserForm/UserForm.component";

import {
  selectCurrentUserId,
} from "../../redux/reducers/users/user.selector";

import {
  setCurrentUser,
} from "../../redux/reducers/users/users.actions";

import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function NestedModal({ isOpen, toggleModal, formType, mode }) {
  const dispatch = useDispatch();
  const currentUserId = useSelector(selectCurrentUserId);

  useEffect(() => {
    dispatch(setCurrentUser(currentUserId));
    
  }, [currentUserId, dispatch]);
  
  return (
    <Modal
      open={isOpen}
      onClose={toggleModal}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: '50%' }}>
        <Typography variant="h3">{formType}</Typography>
        <UserForm
          
          toggleModal={toggleModal}
          mode={mode}
        />
      </Box>
    </Modal>
  );
}
