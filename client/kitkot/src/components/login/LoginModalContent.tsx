import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState } from "react";
import { OnClose } from "../../types/types.interface";
import Loading from "./Loading";
import SelectLoginProvider from "./SelectLoginProvider";
import SelectRegisterProvider from "./SelectRegisterProvider";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: { xxs: "100%", xs: 400 },
  height: { xxs: "100%", xs: "auto" },
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  alignItems: "center",
  bgcolor: "modal.main",
  borderRadius: "10px",
  boxShadow: 24,
  p: 0,
  paddingBottom: 2,
};

const Switch = (props: any) => {
  const { test, children } = props;
  return children.find((child: any) => {
    return child.props.value === test;
  });
};

export default function LoginModalContent({ onClose }: OnClose) {
  const [view, setView] = useState<string>("select_login");

  const goBack = () => {
    if (view.startsWith("login")) setView("select_login");
    else setView("select_register");
  };

  return (
    <Box sx={style}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        {view !== "select_login" &&
        view !== "select_register" &&
        view !== "loading" ? (
          <IconButton onClick={() => goBack()}>
            <ArrowBackIosNewIcon />
          </IconButton>
        ) : null}
      </Box>
      <Switch test={view}>
        <SelectLoginProvider value={"select_login"} changeView={setView} />
        <SelectRegisterProvider
          value={"select_register"}
          changeView={setView}
        />
        <SignIn value={"login_email"} changeView={setView} />
        <SignUp value={"register_email"} changeView={setView} />
        <Loading value={"loading"} changeView={setView} />
      </Switch>
    </Box>
  );
}
