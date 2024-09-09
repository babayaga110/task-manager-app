import * as React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  Link,
  Typography,
} from "@mui/joy";
import GoogleIcon from "../assets/GoogleIcon";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useAlert } from "../useContext/AlertContext";
import authService from "../services/authService";
import { auth, provider } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";

export default function SignupPage() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [loading, setLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      return showAlert("Error", "Passwords do not match", "danger", "error");
    }
    try {
      setLoading(true);
      const response = await authService.register(data);
      showAlert("Success", response.message, "success", "info");
    } catch (error) {
      showAlert("Error", error.message, "danger", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const response = await authService.googleLogin({ idToken });
      if (response) {
        localStorage.setItem("user", JSON.stringify(response.user));
        showAlert("Success", "Logged in with Google", "success", "info");
      } else {
        showAlert("Error", response.message, "danger", "error");
      }
    } catch (error) {
      showAlert("Error", error.message, "danger", "error");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box>
        <Typography
          level="h1"
          fontWeight={700}
          color="primary"
          textAlign="left"
          gutterBottom
        >
          Signup
        </Typography>
        <Grid
          container
          spacing={2}
          border={2}
          borderColor="primary.500"
          padding={1.5}
          borderRadius={4}
          maxWidth={400}
          margin={0}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid xs={12}>
            <FormControl error={errors.firstName}>
             <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input placeholder="First Name" {...field} required />
                )}
              />
              {errors && (
                <FormHelperText error>
                  {errors.firstName}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl error={errors.lastName}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input placeholder="Last Name" {...field} required />
                )}
              />
              {errors && (
                <FormHelperText error>{errors.lastName}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl error={errors.email}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input placeholder="Email" {...field} required />
                )}
              />

              {errors && (
                <FormHelperText error>{errors.email}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl error={errors.password}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input type="password" placeholder="Password" {...field} required />
                )}
              />
              {errors && (
                <FormHelperText error>{errors.password}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl error={errors.confirmPassword}>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                    required
                  />
                )}
              />
              {errors && (
                <FormHelperText error>
                  {errors.confirmPassword}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <Button variant="solid" color="primary" fullWidth type="submit" loading={loading}>
              Signup
            </Button>
          </Grid>
          <Grid xs={12}>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector("light")]: {
                  color: { xs: "#FFF", md: "text.tertiary" },
                },
              })}
            >
              or
            </Divider>
          </Grid>
          <Grid xs={12}>
            <Typography level="body-sm" align="center">
              Already have an account?{" "}
              <Link
                underline="hover"
                component="button"
                onClick={() => navigate("/")}
              >
                Login
              </Link>
            </Typography>
          </Grid>
          <Grid xs={12}>
            <Button
              variant="soft"
              color="neutral"
              startDecorator={<GoogleIcon />}
              fullWidth
              onClick={handleGoogleLogin}
              loading={googleLoading}
            >
              Signup with Google
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
