"use client";
import {
  Paper,
  TextField,
  Typography,
  Link,
  Button,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  signInWithCredentials,
  LoginInfo,
} from "@/app/_dataModels/service/AuthService";
import { Philosopher } from "next/font/google";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const philosopher = Philosopher({ subsets: ["latin"], weight: "700" });

export default function SignIn() {
  const router = useRouter();

  const [user, setUser] = useState<LoginInfo>({ username: "", password: "" });
  const [isSignedIn, setSignedIn] = useState<boolean | undefined>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    AlertColor | undefined
  >(undefined);
  const [snackbarMessage, setSnackbarMessage] = useState("Validate message...");

  // UI manipulate handlers
  const handleOpenSnackbar = (
    severity: AlertColor | undefined,
    message: string
  ) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
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
  const handleValidateCredentials = () => {
    if (user.username === "" || user.password === "") {
      handleOpenSnackbar("error", "Email and Password can not be empty!");
      return false;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(user.username)) {
      handleOpenSnackbar("error", "Incorrected Email format!");
      return false;
    }
    return true;
  };

  // Login handlers
  const handleKeyUpPasswordField = async (
    e: KeyboardEvent<HTMLDivElement> | undefined
  ) => {
    e?.preventDefault();
    if (e?.key === "Enter") {
      if (!handleValidateCredentials()) {
        return;
      }
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
    }
  };
  const handleCredentialsLoginClick = async (
    e: MouseEvent<HTMLButtonElement> | undefined
  ) => {
    e?.preventDefault();
    if (!handleValidateCredentials()) {
      return;
    }
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
    if (isSignedIn) router.push("/");
  }, [isSignedIn]);

  return (
    <>
      <Box
        component={"main"}
        className="login-page flex h-screen flex-col items-center justify-between"
        sx={{
          backgroundImage: "url(/images/login-bg.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Paper
          sx={{
            width: 400,
            minWidth: 400,
            height: "70%",
            minHeight: 400,
            maxHeight: 550,
            margin: "auto",
            borderRadius: "2%",
            textAlign: "center",
            paddingX: "40px",
            paddingY: "40px",
            background: `linear-gradient(
                          to bottom,
                          transparent,
                          rgb(var(--background-end-rgb))
                        )
                        rgb(var(--background-start-rgb))`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          elevation={18}
        >
          <Typography
            color={"CaptionText"}
            fontSize={30}
            textAlign={"center"}
            paddingBottom={3}
            fontWeight={"400"}
            className={philosopher.className}
          >
            Welcome to Your Cloth <br />
            <Typography component={"span"} color={"GrayText"} fontSize={20}>
              Online Store
            </Typography>
          </Typography>
          <TextField
            id="username"
            name="username"
            label="Email"
            variant="outlined"
            color="success"
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
            color="success"
            type="password"
            sx={{
              marginBottom: "10px",
              width: "100%",
            }}
            onChange={handleChangePasswordInput}
            onKeyUp={handleKeyUpPasswordField}
            required
          />
          <div className="login-control flex-col justify-between align-middle w-full">
            <div className="non-login flex justify-between mb-5">
              <Link
                href="/forgot"
                className="forgot-password"
                style={{
                  fontSize: "12px",
                  fontWeight: 550,
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
                  fontSize: "12px",
                  fontWeight: 550,
                  fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
                }}
                underline="hover"
              >
                Sign up for Guests!
              </Link>
            </div>
            <div className="login flex-col justify-between align-middle">
              <Button
                className="bg-[#2e7d32]"
                disabled={isSignedIn === undefined}
                variant="contained"
                color="success"
                fullWidth
                onClick={handleCredentialsLoginClick}
                endIcon={
                  isSignedIn === undefined && <CircularProgress size={"12px"} />
                }
              >
                SIGN IN
              </Button>
            </div>
          </div>
          <div className="w-full h-4"></div>
          <Box
            width={"100%"}
            flexGrow={1}
            flexShrink={1}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            paddingX={3}
            paddingY={3}
            border={"1px solid #8d8d8dde"}
            borderRadius={2}
            position={"relative"}
          >
            <Typography
              component={"span"}
              position={"absolute"}
              left={"50%"}
              top={"-12px"}
              paddingX={1}
              sx={{ transform: "translateX(-50%)", background: "#e8eded" }}
            >
              Or
            </Typography>
            <Button variant="contained" color="inherit" className="bg-[#fff]">
              Sign in with Google
              <FcGoogle size="15px" style={{ marginLeft: "8px" }} />
            </Button>
            <Button variant="contained" className="bg-[#1976d2]">
              Sign in with Facebook
              <FaFacebook size="15px" style={{ marginLeft: "8px" }} />
            </Button>
          </Box>
        </Paper>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </>
  );
}
