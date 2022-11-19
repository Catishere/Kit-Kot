import { LoadingButton } from "@mui/lab";
import { Alert, Box, Collapse, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useUserContextUpdater } from "../../contexts/UserContext";
import getHeaders from "../../helper/headers";
import { FollowingData, PostData, UserInfo } from "../../types/types.interface";
import { LoginFormData, ModalProps } from "../../types/types.interface";

export default function SignIn({ value }: ModalProps) {
  const [form, setForm] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setForm({ ...form, username: e.target.value });
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setForm({ ...form, password: e.target.value });
  };

  const userContextUpdater = useUserContextUpdater();

  const sendForm = () => {
    setLoading(true);
    fetch("/api/auth/login", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 401) {
          setError("Invalid username or password");
          throw new Error("Wrong credentials");
        }
      })
      .then(
        (data: {
          jwtToken: string;
          user: UserInfo;
          followingData: FollowingData;
          likedPosts: PostData[];
        }) => {
          const userInfo = {
            ...data.user,
            followingData: data.followingData,
            likedPosts: data.likedPosts,
          } as UserInfo;

          if (data.jwtToken) {
            localStorage.setItem("token", data.jwtToken);
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            userContextUpdater(userInfo);
          }
          setLoading(false);
        }
      )
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        width: "100%",
        paddingX: 6,
      }}
    >
      <Collapse in={error !== null}>
        <Alert
          onClose={() => setError(null)}
          sx={{ display: error ? "flex" : "none" }}
          severity="error"
        >
          {error}
        </Alert>
      </Collapse>

      <Typography sx={{ marginBottom: "20px" }} fontSize={18} fontWeight="bold">
        Sign In
      </Typography>
      <TextField
        sx={{ width: "100%" }}
        id="username-input"
        label="Username"
        value={form.username}
        onChange={onUsernameChange}
        variant="outlined"
      />
      <TextField
        sx={{ width: "100%" }}
        id="password-input"
        label="Password"
        value={form.password}
        onChange={onPasswordChange}
        type="password"
        variant="outlined"
      />
      <LoadingButton
        loading={loading}
        color="secondary"
        variant="contained"
        onClick={sendForm}
      >
        <Typography>Sign Up</Typography>
      </LoadingButton>
    </Box>
  );
}
