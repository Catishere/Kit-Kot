import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import headers from "../../helper/headers";
import {
  ModalProps,
  Month,
  RegisterForm,
  RegisterFormData,
} from "../../types/types.interface";

const daysOfMonth = {
  January: 31,
  February: 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};

const emailRegex = new RegExp(
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
);

export default function SignUp({ value, changeView }: ModalProps) {
  const [form, setForm] = useState<RegisterFormData>({
    month: "January",
    day: 1,
    year: 2022,
  });
  const [error, setError] = useState<RegisterForm>({});

  const menuSettings = {
    MenuProps: { PaperProps: { sx: { maxHeight: "300px" } } },
  };

  const onDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const day = parseInt(e.target.value);
    setForm({ ...form, day });
    setError({
      ...error,
      day:
        day <= 0 || day > daysOfMonth[form.month] ? "Invalid day" : undefined,
    });
  };

  const onMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const month = e.target.value as Month;
    setForm({ ...form, month });
    setError({
      ...error,
      month: !Object.keys(daysOfMonth).includes(month)
        ? "Invalid month"
        : undefined,
    });
  };

  const onYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(e.target.value);
    setForm({ ...form, year });
    setError({
      ...error,
      year: year < 1900 || year > 2023 ? "Invalid year" : undefined,
    });
  };

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    setForm({ ...form, username });
    setError({
      ...error,
      username:
        !/^[a-z0-9_\\.]+$/.exec(username) || username.length > 32
          ? "Invalid username"
          : undefined,
    });
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setForm({ ...form, email });
    setError({
      ...error,
      email: !emailRegex.exec(email) ? "Invalid email" : undefined,
    });
  };

  const onDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const displayName = e.target.value;
    setForm({ ...form, displayName });
    setError({
      ...error,
      displayName: !displayName.includes(" ")
        ? "Invalid display name"
        : undefined,
    });
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setForm({ ...form, password });
    setError({
      ...error,
      password: password.length < 8 ? "Invalid password" : undefined,
    });
  };

  const hasError = Object.values(error).some((e) => e !== undefined);

  const { enqueueSnackbar } = useSnackbar();

  const sendForm = async () => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers,
      body: JSON.stringify(form),
    });
    const data = await response.json();

    if (data.error) {
      enqueueSnackbar(data.error, { variant: "error" });
    } else {
      enqueueSnackbar("Successfully registered", { variant: "success" });
      changeView("login_email");
    }
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
        Sign Up
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <TextField
          id="select-day"
          select
          SelectProps={menuSettings}
          maxRows={5}
          label="Select day"
          value={form.day}
          error={error.day ? true : false}
          helperText={error.day}
          onChange={onDayChange}
          sx={{ width: "80px", margin: 0.2 }}
        >
          {[...Array(daysOfMonth[form.month])].map((_m, i) => (
            <MenuItem key={i} value={i + 1}>
              {i + 1}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="select-month"
          select
          label="Select month"
          value={form.month}
          SelectProps={menuSettings}
          error={error.month ? true : false}
          helperText={error.month}
          onChange={onMonthChange}
          sx={{ width: "125px", margin: 0.2 }}
        >
          {Object.keys(daysOfMonth).map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="select-year"
          select
          label="Select year"
          value={form.year}
          SelectProps={menuSettings}
          error={error.year ? true : false}
          helperText={error.year}
          onChange={onYearChange}
          sx={{ width: "90px", margin: 0.2 }}
        >
          {[...Array(100)].map((_m, i) => (
            <MenuItem key={2022 - i} value={2022 - i}>
              {2022 - i}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Typography
        sx={{ marginTop: "20px", alignSelf: "flex-start" }}
        fontSize={14}
        fontWeight="bold"
      >
        Username and password
      </Typography>
      <TextField
        sx={{ width: "100%" }}
        id="username-input"
        label="Username"
        value={form.username}
        error={error.username ? true : false}
        helperText={error.username}
        onChange={onUsernameChange}
        variant="outlined"
      />
      <TextField
        sx={{ width: "100%" }}
        id="email-input"
        label="Email"
        value={form.email}
        error={error.email ? true : false}
        helperText={error.email}
        onChange={onEmailChange}
        variant="outlined"
      />
      <TextField
        sx={{ width: "100%" }}
        id="displayname-input"
        label="Display name"
        value={form.displayName}
        error={error.displayName ? true : false}
        helperText={error.displayName}
        onChange={onDisplayNameChange}
        variant="outlined"
      />
      <TextField
        sx={{ width: "100%" }}
        error={error.password ? true : false}
        id="password-input"
        label="Password"
        value={form.password}
        helperText={error.password}
        onChange={onPasswordChange}
        type="password"
        variant="outlined"
      />
      <Button
        disabled={hasError}
        color="secondary"
        variant="contained"
        onClick={sendForm}
      >
        <Typography>Sign Up</Typography>
      </Button>
    </Box>
  );
}
