import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import {
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  TextField,
  InputAdornment,
  Checkbox,
  IconButton,
} from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Logo from "../components/layout/logo";
import Iconify from "../components/layout/iconify";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/authActions";
import { useForm } from "react-hook-form";
import useLoading from "../hooks/useLoading";
import { authTypes } from "../redux/types";

// sections
// import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive("up", "md");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const isLogged = useSelector((state) => state.auth.isLogged);
  const isLoading = useLoading(authTypes.LOGIN_USER);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "harsh@gmail.com", password: "11111111" },
  });

  useEffect(() => {
    if (isLogged) {
      navigate({ pathname: "/" });
    }
  }, [isLogged]);

  const handleLogin = (values) => {
    dispatch(loginUser(values));
  };

  return (
    <>
      <Helmet>
        <title> {`Login | ${import.meta.env.VITE_APP_NAME}`} </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img
              src="/assets/illustrations/illustration_login.png"
              alt="login"
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to {import.meta.env.VITE_APP_NAME}
            </Typography>

            {/* <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {""}
              <Link variant="subtitle2">Get started</Link>
            </Typography> */}

            {/* <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify
                  icon="eva:google-fill"
                  color="#DF3E30"
                  width={22}
                  height={22}
                />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify
                  icon="eva:facebook-fill"
                  color="#1877F2"
                  width={22}
                  height={22}
                />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify
                  icon="eva:twitter-fill"
                  color="#1C9CEA"
                  width={22}
                  height={22}
                />
              </Button>
            </Stack> */}

            {/* <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                OR
              </Typography>
            </Divider> */}
            <form onSubmit={handleSubmit(handleLogin)}>
              <Stack spacing={3}>
                <TextField
                  name="email"
                  label="Email address"
                  {...register("email", {
                    required: true,
                  })}
                  error={Boolean(errors["email"])}
                  helperText={errors?.["email"]?.message}
                />

                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          <Iconify
                            icon={
                              showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...register("password", {
                    required: true,
                  })}
                  error={Boolean(errors["password"])}
                  helperText={errors?.["password"]?.message}
                />
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ my: 2 }}
              >
                <Checkbox name="remember" label="Remember me" />
                <Link variant="subtitle2" underline="hover">
                  Forgot password?
                </Link>
              </Stack>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isLoading}
              >
                Login
              </LoadingButton>
            </form>

            {/* <LoginForm /> */}
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}

// import React from "react";

// const Login = () => {
//   return <div>Login</div>;
// };

// export default Login;
