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
  useContext,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useAuth, { LoginInfo } from "@/app/_utils/service/AuthService";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { PageLoadingContext } from "../_components/layout/PageLoadingProvider/PageLoadingProvider";
import { NextFontContext } from "../_components/layout/NextFontProvider/NextFontProvider";
import { CookiesContext } from "../_components/layout/CookiesProvider/CookiesProvider";

async function checkTokenValid() {
  const headers = import("next/headers");
  const cookies = (await headers).cookies;
  const jwtToken = cookies().get("jwt")?.value;
  const { getAuthentication } = useAuth();
  const res = await getAuthentication(jwtToken || "");
  if (!res?.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.status;
}

export default function Login() {
  const [initialLoaded, setInitialLoaded] = useState(false);
  const searchs = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { signInWithCredentials } = useAuth();
  const { philosopher } = useContext(NextFontContext);
  const { setLoading } = useContext(PageLoadingContext);
  const { cookies } = useContext(CookiesContext);

  useEffect(() => {
    checkTokenValid()
      .then((status) => {
        if (status === 200) {
          if (cookies) {
            if (cookies().has("jwt")) {
              const token = cookies().get("jwt");
              router.replace(`/?token=${token}`);
            }
          }
        }
      })
      .catch(() => {
        const isSignOut = searchs.has("signout");
        if (!isSignOut) {
          handleOpenSnackbar("error", "Error orcured, please login again!");
        } else {
          handleOpenSnackbar("info", "Signed Out!");
        }
      })
      .finally(() => {
        setInitialLoaded(true);
        setLoading(false);
      });
  }, []);

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
      const resp = await signInWithCredentials(user);
      if (resp?.status === 200) {
        const token = await resp.text();
        setValidating(false);
        const returnPage = searchs.get("returnPage");
        router.replace(
          `${
            pathname === "/login" ||
            returnPage === "/login" ||
            returnPage === null
              ? "/?token=${token}"
              : `${returnPage}?token=${token}`
          }?token=${token}`
        );
      } else {
        setValidating(false);
        handleOpenSnackbar("error", "Login failed, please try again!");
      }
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
    signInWithCredentials(user).then(async (resp) => {
      if (resp?.ok && resp?.status === 200) {
        const token = await resp.text();
        setValidating(false);
        const returnPage = searchs.get("returnPage");
        router.replace(
          `${
            pathname === "/login" ||
            returnPage === "/login" ||
            returnPage === null
              ? `/?token=${token}`
              : `${returnPage}?token=${token}`
          }`
        );
      } else {
        setValidating(false);
        handleOpenSnackbar("error", "Login failed, please try again!");
      }
    });
  };
  //#endregion

  return (
    initialLoaded && (
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
    )
  );
}
