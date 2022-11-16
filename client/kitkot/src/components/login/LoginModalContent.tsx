import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
  width: { xxs: "100%", sm: 400 },
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
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

  return (
    <Box sx={style}>
      <IconButton sx={{ alignSelf: "flex-end" }}>
        <CloseIcon onClick={onClose} />
      </IconButton>
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
