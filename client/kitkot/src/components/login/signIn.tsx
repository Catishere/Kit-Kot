import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useUserContextUpdater } from "../../contexts/UserContext";
import headers from "../../helper/headers";
import { UserInfo } from "../../types";
import { LoginFormData, ModalProps } from "../../types/types.interface";

export default function SignIn({ value }: ModalProps) {
  const [form, setForm] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    setForm({ ...form, username });
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setForm({ ...form, password });
  };

  const userContextUpdater = useUserContextUpdater();

  const sendForm = () => {
    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers,
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data: { jwtToken: string; user: UserInfo }) => {
        console.log(data);
        if (data.jwtToken) {
          localStorage.setItem("token", data.jwtToken);
          localStorage.setItem("userInfo", JSON.stringify(data.user));
          userContextUpdater(data.user);
        }
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
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
      <Button color="secondary" variant="contained" onClick={sendForm}>
        <Typography>Sign Up</Typography>
      </Button>
    </Box>
  );
}
