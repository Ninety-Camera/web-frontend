import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik } from "formik";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import FORGOTPW_IMAGE from "../../assets/forgotPW.svg";
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
  password: Yup.string()
    .required()
    .min(8)
    .max(15)
    .label("Password")
    .matches(/\d+/, "Password should contain at least one number")
    .matches(
      /[a-z]+/,
      "Password should contain at least one lowercase character"
    )
    .matches(
      /[A-Z]+/,
      "Password should contain at least one uppercase character"
    )
    .matches(
      /[!@#$%^&*()-+]+/,
      "Password should contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .required()
    .label("Confirm Password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
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
    <div style={{ overflowY: "hidden" }}>
      <BlackHorizontalBar phrase="Ninety Camera" />
      <HeightBox height={40} />
      <Stack direction="row" spacing={10}>
        <div style={{ padding: 100 }}>
          <img src={FORGOTPW_IMAGE} alt="" style={{ width: "30vw" }} />
        </div>
        <div style={{ paddingLeft: "100px", paddingTop: 50 }}>
          <h2 style={{ fontSize: 48, fontFamily: "Inter", margin: 0 }}>
            Reset Password
          </h2>
          <HeightBox height={30} />
          <Stack direction="column" spacing={2}>
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                const data = {
                  password: values.password,
                };
                console.log(data);
              }}
            >
              {(formikProps) => {
                const { errors, handleSubmit, handleChange, touched } =
                  formikProps;

                return (
                  <React.Fragment>
                    <CustomTextField
                      label="Password"
                      variant="outlined"
                      type="password"
                      error={errors.password && touched.password}
                      helperText={errors.password || ""}
                      onChange={(event) => handleChange("password")(event)}
                    />

                    <CustomTextField
                      label="Confirm Password"
                      variant="outlined"
                      type="password"
                      error={errors.confirmPassword && touched.confirmPassword}
                      helperText={errors.confirmPassword || ""}
                      onChange={(event) =>
                        handleChange("confirmPassword")(event)
                      }
                    />

                    <CustomButton
                      type="submit"
                      variant="contained"
                      size="large"
                      onClick={handleSubmit}
                      disabled={loading}
                      sx={{ backgroundColor: "#6C63FF" }}
                    >
                      {loading ? <CircularProgress /> : "Reset Password"}
                    </CustomButton>
                    <Button
                      variant="text"
                      size="large"
                      style={{ textTransform: "none" }}
                      onClick={() => navigate("/")}
                    >
                      Cancel
                    </Button>
                  </React.Fragment>
                );
              }}
            </Formik>
          </Stack>

          <HeightBox height={15} />
        </div>
      </Stack>
    </div>
  );
}
