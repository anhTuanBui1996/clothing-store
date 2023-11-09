"use client";
import {
  Paper,
  TextField,
  Typography,
  Link,
  Button,
  CircularProgress,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { signInWithCredentials, LoginInfo } from "@/data/service/AuthService";

const theme = createTheme({
  palette: {
    secondary: {
      main: grey[800],
    },
  },
});

export default function SignIn() {
  const router = useRouter();

  const [user, setUser] = useState<LoginInfo>({ username: "", password: "" });
  const [isSignedIn, setSignedIn] = useState<boolean | undefined>(false);

  const handleChangUsernameInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUser((user) => ({ ...user, username: e.target.value }));
  };

  const handleChangePasswordInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUser((user) => ({ ...user, password: e.target.value }));
  };

  // Login provider click handlers
  const handleMainLoginClick = async (
    e: MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.preventDefault();
    setSignedIn(undefined);
    const result = await signInWithCredentials(user);
    if (result?.ok) {
      if (result?.json() === null) {
        setSignedIn(false);
      } else {
        setSignedIn(true);
      }
    }
    setSignedIn(true);
  };

  useEffect(() => {
    if (isSignedIn) router.push("/dashboard");
  }, [isSignedIn]);

  return (
    <main className="flex h-screen flex-col items-center justify-between">
      <Paper
        sx={{
          width: 350,
          minWidth: 350,
          height: "70%",
          minHeight: 500,
          margin: "auto",
          borderRadius: "2%",
          textAlign: "center",
          paddingX: "40px",
          backgroundColor: "Background",
        }}
      >
        <Typography
          color={"GrayText"}
          fontSize={20}
          textAlign={"center"}
          paddingY={4}
          fontWeight={"400"}
        >
          Welcome to Empla
        </Typography>
        <TextField
          id="username"
          name="username"
          label="Email/Username"
          variant="outlined"
          sx={{
            marginBottom: "10px",
            width: "100%",
          }}
          onChange={handleChangUsernameInput}
          required
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          sx={{
            marginBottom: "10px",
            width: "100%",
          }}
          onChange={handleChangePasswordInput}
          required
        />
        <div className="login-control flex-col justify-between align-middle">
          <div className="non-login flex justify-between mb-5">
            <Link
              href="/forgot"
              className="forgot-password"
              style={{
                fontSize: "10px",
                fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
              }}
              underline="hover"
            >
              Forgot password?
            </Link>
            <Link
              href="/register"
              className="register-account"
              style={{
                fontSize: "10px",
                fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
              }}
              underline="hover"
            >
              Sign up for Guests!
            </Link>
          </div>
          <div className="login flex-col justify-between align-middle">
            <Button
              disabled={isSignedIn === undefined}
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleMainLoginClick}
              endIcon={
                isSignedIn === undefined && <CircularProgress size={"12px"} />
              }
            >
              LOGIN
            </Button>
          </div>
        </div>
      </Paper>
    </main>
  );
}
