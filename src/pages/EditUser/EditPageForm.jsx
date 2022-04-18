import { Stack, Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { LoadingButton } from "@mui/lab";

import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

import {
  editUser,
  setCurrentUser,
} from "../../redux/reducers/users/users.actions";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ComposedTextField({
  mode,
  toggleModal,
  paramId,
  currentUser,
  currentUserId,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navHome = () => {
    console.log("test");
    navigate("/");
  };

  const newUserSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("username is required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    // phone: Yup.number(),
    // .required("Phone is required")
    companyName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Company is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: currentUser && {
      userName: currentUser.username || "",
      email: currentUser.email || "",
      phone: currentUser.phone || "",
      companyName: currentUser.company.name || "",
    },
    validationSchema: newUserSchema,

    onSubmit: () => {
      const formatBeforeEditAddedToState = {
        id: currentUser.id || "",
        username: formik.values.userName || "",
        email: formik.values.email || "",
        phone: formik.values.phone || "",
        company: {
          name: formik.values.companyName || "",
        },
      };

      dispatch(editUser(currentUserId, formatBeforeEditAddedToState));
      navigate("/");
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* UserName Input */}
          <FormControl>
            <InputLabel htmlFor="component-outlined">User Name</InputLabel>
            <OutlinedInput
              label="User Name"
              {...getFieldProps("userName")}
              error={Boolean(touched.userName && errors.userName)}
              helpertext={touched.userName && errors.userName}
            />
          </FormControl>

          {/* Email Input */}
          <FormControl>
            <InputLabel htmlFor="component-outlined">Email</InputLabel>
            <OutlinedInput
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helpertext={touched.email && errors.email}
            />
          </FormControl>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {/* Phone Number Input */}
            <FormControl>
              <InputLabel htmlFor="component-outlined">Phone Number</InputLabel>
              <OutlinedInput
                autoComplete="phone"
                type="phone"
                label="Phone number"
                {...getFieldProps("phone")}
                error={Boolean(touched.phone && errors.phone)}
                helpertext={touched.phone && errors.phone}
              />
            </FormControl>

            {/* Company Name Input */}
            <FormControl>
              <InputLabel htmlFor="component-outlined">Company Name</InputLabel>
              <OutlinedInput
                label="Company Name"
                {...getFieldProps("companyName")}
                error={Boolean(touched.companyName && errors.companyName)}
                helpertext={touched.companyName && errors.companyName}
              />
            </FormControl>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {/* Save Button */}
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Save
            </LoadingButton>

            {/* Back Button */}
            <Button
              color="error"
              size="large"
              type="button"
              variant="contained"
              onClick={navHome}
            >
              Back Home
            </Button>
          </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
