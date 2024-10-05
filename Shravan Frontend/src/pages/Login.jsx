import { useInputValidation } from "6pp";
import { createTheme } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducer/auth";
import { usernameValidator } from "../utils/validatore";

import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid2,
    Link,
    Paper,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";

function Login() {
  const defaultTheme = createTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");


  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `localhost:3000/api/v1/user/login`, //api url
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `localhost;3000/api/v1/user/new`, //api url
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLogin ? (
        <ThemeProvider theme={defaultTheme}>
          <Grid2 container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid2
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage:
                  "url(https://www.hostpapa.com/blog/app/uploads/2023/05/Best-Chat-Apps-on-The-Internet-Header.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid2
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  noValidate
                  sx={{ mt: 1 }}
                  onSubmit={handleLogin}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoFocus
                    autoComplete="current-username"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isLoading}
                  >
                    Sign In
                  </Button>
                  <Grid2 container>
                    <Grid2 item>
                      <Link
                        disabled={isLoading}
                        fullWidth
                        variant="text"
                        onClick={toggleLogin}
                        style={{ cursor: "pointer" }}
                      >
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid2>
                  </Grid2>
                </Box>
              </Box>
            </Grid2>
          </Grid2>
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 3.5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h7">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 3 }}
                onSubmit={handleSignUp}
              >
                <Grid2 container spacing={2}>
                  <Grid2 item xs={12}>
                    <TextField
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      autoFocus
                      value={name.value}
                      onChange={name.changeHandler}
                    />
                  </Grid2>
                  <Grid2 item xs={12}>
                    <TextField
                      name="username"
                      required
                      fullWidth
                      id="username"
                      label="User Name"
                      autoFocus
                      value={username.value}
                      onChange={username.changeHandler}
                    />
                    {username.error && (
                      <Typography color="error" variant="caption">
                        {username.error}
                      </Typography>
                    )}
                  </Grid2>
                  <Grid2 item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      type="password"
                      label="Password"
                      id="password"
                      autoComplete="new-password"
                      value={password.value}
                      onChange={password.changeHandler}
                    />
                    {password.error && (
                      <Typography color="error" variant="caption">
                        {password.error}
                      </Typography>
                    )}
                  </Grid2>
                </Grid2>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isLoading}
                >
                  Sign Up
                </Button>
                <Grid2 container justifyContent="flex-end">
                  <Grid2 item>
                    <Link
                      marginBottom={2}
                      disabled={isLoading}
                      fullWidth
                      variant="text"
                      onClick={toggleLogin}
                      style={{ cursor: "pointer" }}
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid2>
                </Grid2>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </div>
  );
}

export default Login;
