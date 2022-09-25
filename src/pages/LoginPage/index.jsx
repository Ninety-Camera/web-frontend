import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik } from "formik";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import LOGIN_IMAGE from "../../assets/login.svg";
import { Stack } from "@mui/material";
import HeightBox from "../../components/HeightBox";
import * as Yup from "yup";
import SnackBarComponent from "../../components/SnackBarComponent";
import BlackHorizontalBar from "../../components/BlackHorizontalBar";
import "@fontsource/inter";

const CustomTextField = styled(TextField)({
  width: 350,
});

const CustomButton = styled(Button)(({ theme }) => ({
  // color: theme.palette.getContrastText([500]),
  backgroundColor: "#6C63FF",
  fontFamily: "Inter",
  fontSize: 15,
  fontWeight: 700,
  "&:hover": {
    backgroundColor: "#5C63FF",
  },
}));

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email("Must be a valid email")
    .label("email")
    .min(3)
    .max(36),
  password: Yup.string().required().min(8).max(15).label("Password"),
});

export default function SignIn() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackMessage, setSnackMessage] = useState({
    type: "success",
    message: "",
  });

  return (
    <div style={{ maxWidth: "100%" }}>
      <BlackHorizontalBar phrase="Ninety Camera" />
      <HeightBox height={40} />
      <Stack direction="row" spacing={15}>
        <div style={{ paddingLeft: "100px", paddingTop: 50 }}>
          <h2 style={{ fontSize: 48, fontFamily: "Inter", margin: 0 }}>
            Welcome Back!
          </h2>
          <HeightBox height={30} />
          <Stack direction="column" spacing={2}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values) => {
                const data = {
                  email: values.email,
                  password: values.password,
                };
              }}
              validationSchema={validationSchema}
            >
              {(formikProps) => {
                const { errors, handleSubmit, handleChange, touched } =
                  formikProps;

                return (
                  <React.Fragment>
                    <CustomTextField
                      label="email"
                      variant="outlined"
                      error={errors.email && touched.email}
                      helperText={errors.email || ""}
                      onChange={(event) => handleChange("email")(event)}
                    />

                    <CustomTextField
                      label="Password"
                      variant="outlined"
                      type="password"
                      error={errors.password && touched.password}
                      helperText={errors.password || ""}
                      onChange={(event) => handleChange("password")(event)}
                    />

                    <CustomButton
                      type="submit"
                      variant="contained"
                      size="large"
                      onClick={handleSubmit}
                      // onClick={()=> navigate("/dashboard")} //should remove later
                      disabled={loading}
                      sx={{ backgroundColor: "#6C63FF" }}
                    >
                      {loading ? <CircularProgress /> : "Sign In"}
                    </CustomButton>
                  </React.Fragment>
                );
              }}
            </Formik>
          </Stack>

          <HeightBox height={15} />
          <div style={{ fontSize: 15, width: 350 }}>
            <Stack direction="row" justifyContent="center" spacing={1}>
              {/* <p style={{ margin: 0 }}>Don't have an account?</p> */}
              {/* <Link href="/forgetPassword" underline="hover" color="black">
                Forget Password?
              </Link> */}
            </Stack>
          </div>
          <HeightBox height={15} />
        </div>
        <div style={{ padding: 100 }}>
          <img src={LOGIN_IMAGE} alt="" style={{ width: "40vw" }} />
        </div>
      </Stack>
    </div>
  );
}