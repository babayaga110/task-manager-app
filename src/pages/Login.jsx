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
import authService from "../services/authService";
import { useAlert } from "../useContext/AlertContext";
import { auth, provider } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);
  const { showAlert } = useAlert();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    if (!data.email || !data.password) {
      return;
    }
    try {
      setLoading(true);
      const user = await authService.firebaseLogin(data);
      if (user) {
        const response = await authService.login({
          verifyToken: await user?.user?.getIdToken(),
        });
        if (response) {
          localStorage.setItem("user", JSON.stringify(response?.user));
          showAlert("Success", response.message, "success", "info");
          navigate("/dashboard"); // Redirect to dashboard or any other page
        }
      }
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
        navigate("/dashboard"); // Redirect to dashboard or any other page
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
          Login
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
          boxShadow="lg"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid xs={12}>
            <FormControl error={Boolean(errors.email)}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input placeholder="Enter your email" {...field} required />
                )}
              />
              {errors.email && (
                <FormHelperText>{errors.email.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl error={Boolean(errors.password)}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    required
                  />
                )}
              />
              {errors.password && (
                <FormHelperText>{errors.password.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <Button
              variant="solid"
              color="primary"
              fullWidth
              loading={loading}
              type="submit"
            >
              Login
            </Button>
          </Grid>
          <Grid xs={12}>
            <Divider>or</Divider>
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
              Login with Google
            </Button>
          </Grid>
          <Grid xs={12}>
            <Typography level="body-sm" align="center">
              Don't have an account?{" "}
              <Link
                underline="hover"
                component="button"
                onClick={() => navigate("/signup")}
              >
                Sign up!
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
