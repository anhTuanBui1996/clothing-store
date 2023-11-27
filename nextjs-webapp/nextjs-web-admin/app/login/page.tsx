"use client";
import {
  Paper,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
  AlertColor,
  Link,
} from "@mui/material";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import {
  signInWithCredentials,
  LoginInfo,
} from "@/app/_dataModels/service/AuthService";
import { Philosopher } from "next/font/google";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const philosopher = Philosopher({ subsets: ["latin"], weight: "700" });

export default function SignIn() {
  const searchs = useSearchParams();

  const isError = searchs.get("error");
  const isSignOut = searchs.get("signout");
  const [user, setUser] = useState<LoginInfo>({ username: "", password: "" });
  const [isValidating, setValidating] = useState<boolean | undefined>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    AlertColor | undefined
  >(undefined);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  //#region UI manipulate handlers
  const handleOpenSnackbar = (
    severity: AlertColor | undefined,
    message: string
  ) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleChangUsernameInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUser((user: LoginInfo) => ({ ...user, username: e.target.value }));
  };

  const handleChangePasswordInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUser((user: LoginInfo) => ({ ...user, password: e.target.value }));
  };

  const handleValidateCredentials = () => {
    if (user.username === "admin" && user.password === "password") {
      return true;
    }
    if (user.username === "" || user.password === "") {
      handleOpenSnackbar("error", "Email and Password can not be empty!");
      return false;
    }
    return true;
  };
  //#endregion

  //#region Login handlers
  const handleKeyUpPasswordField = async (
    e: KeyboardEvent<HTMLDivElement> | undefined
  ) => {
    e?.preventDefault();
    if (e?.key === "Enter") {
      if (!handleValidateCredentials()) {
        return;
      }
      setValidating(true);
      signInWithCredentials(user).then((resp: Response) => {
        if (resp.ok) {
          if (resp.status === 200) {
            const resultBody = resp.json();
            if (resultBody === null) {
              setValidating(false);
            } else {
              redirect("/");
            }
          }
        }
      });
    }
  };

  const handleCredentialsLoginClick = async (
    e: MouseEvent<HTMLButtonElement> | undefined
  ) => {
    e?.preventDefault();
    if (!handleValidateCredentials()) {
      return;
    }
    setValidating(true);
    signInWithCredentials(user).then((resp: Response) => {
      if (resp.ok) {
        if (resp.status === 200) {
          const resultBody = resp.json();
          if (resultBody === null) {
            setValidating(false);
          } else {
            redirect("/");
          }
        }
      }
    });
  };
  //#endregion

  // Error and SignOut listeners
  useEffect(() => {
    if (isError) {
      handleOpenSnackbar("error", "Some errors occur, please try again!");
    }
    if (isSignOut) {
      handleOpenSnackbar("info", "Sign out!");
    }
  }, [isError, isSignOut]);

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
            height: 550,
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
                disabled={isValidating}
                variant="contained"
                color="success"
                fullWidth
                onClick={
                  !isValidating ? handleCredentialsLoginClick : undefined
                }
                endIcon={isValidating && <CircularProgress size={"12px"} />}
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
            <Button
              LinkComponent={"a"}
              href="http://localhost:8082/oauth2/authorization/google"
              variant="contained"
              color="inherit"
              className="bg-[#fff]"
            >
              Sign in with Google
              <FcGoogle size="15px" style={{ marginLeft: "8px" }} />
            </Button>
            <Button
              LinkComponent={"a"}
              href="http://localhost:8082/oauth2/authorization/facebook"
              variant="contained"
              className="bg-[#1976d2]"
            >
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
        <Alert severity={snackbarSeverity} onClose={handleCloseSnackbar}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
