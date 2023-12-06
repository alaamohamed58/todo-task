import React from "react";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Stack,
} from "@mui/material";
import { userSchema } from "../../schemas/";
import { regiesterAsync, resetState } from "../../store/authSlice";
import Loading from "../../components/Loading";

interface Prop {
  setIsLoggin: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupFrom = ({ setIsLoggin }: Prop) => {
  const dispatch = useAppDispatch();
  const { status, httpErr } = useAppSelector((state) => state.auth);
  const { values, errors, touched, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      validationSchema: userSchema,
      onSubmit: async (values, actions) => {
        const {firstName, lastName, email, password} = values
        await dispatch(
          regiesterAsync({
            firstName,
            lastName,
            email,
            password,
          })
        );
      },
    });
  return (
    <div>
      {/* {successMsg !== "" && <Alert severity="success">{successMsg}</Alert>} */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid item>
          <Paper elevation={3} style={{ padding: 16, width: 300 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Create new account
            </Typography>
            <Stack component="form" onSubmit={handleSubmit}>
              <TextField
                label="First Name"
                id="firstName"
                variant="outlined"
                fullWidth
                margin="normal"
                value={values.firstName}
                onChange={handleChange}
                error={errors.firstName && touched.firstName ? true : false}
              />
              {errors.firstName && touched.firstName && (
                <Typography color="error" fontSize={10}>
                  {errors.firstName}
                </Typography>
              )}
              <TextField
                label="Last Name"
                id="lastName"
                variant="outlined"
                fullWidth
                margin="normal"
                value={values.lastName}
                onChange={handleChange}
                error={errors.lastName && touched.lastName ? true : false}
              />
              {errors.lastName && touched.lastName && (
                <Typography color="error" fontSize={10}>
                  {errors.lastName}
                </Typography>
              )}
              <TextField
                label="Email"
                id="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={values.email}
                onChange={handleChange}
                error={errors.email && touched.email ? true : false}
              />
              {errors.email && touched.email && (
                <Typography color="error" fontSize={10}>
                  {errors.email}
                </Typography>
              )}
              <TextField
                label="Password"
                id="password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={values.password}
                onChange={handleChange}
                error={errors.password && touched.password ? true : false}
              />
              {errors.password && touched.password && (
                <Typography color="error" fontSize={10}>
                  {errors.password}
                </Typography>
              )}

              {status !== "loading" && (
                <>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: 16 }}
                  >
                    Sign Up
                  </Button>
                  <Button
                    disabled={isSubmitting}
                    color="primary"
                    fullWidth
                    style={{ marginTop: 16 }}
                    onClick={() => {
                      setIsLoggin(true)
                      dispatch(resetState())
                    }}
                  >
                    Sign In
                  </Button>
                </>
              )}
              {status === "loading" && <Loading />}
            </Stack>
            {httpErr && status !== "loading" && (
              <Typography color="error" fontSize={20} textAlign="center">
                {httpErr}
              </Typography>
            )}

            {!httpErr && status === "succeeded" && (
              <Typography fontSize={20} textAlign="center" color='green'>
                {status}
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignupFrom;
