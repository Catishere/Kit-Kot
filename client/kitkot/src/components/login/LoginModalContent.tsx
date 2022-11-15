import { useState } from "react";
import { OnClose } from "../../types/types.interface";
import Loading from "./Loading";
import SelectLoginProvider from "./SelectLoginProvider";
import SelectRegisterProvider from "./SelectRegisterProvider";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Switch = (props: any) => {
  const { test, children } = props;
  return children.find((child: any) => {
    return child.props.value === test;
  });
};

export default function LoginModalContent({ onClose }: OnClose) {
  const [view, setView] = useState<string>("select_login");

  return (
    <Switch test={view}>
      <SelectLoginProvider
        value={"select_login"}
        onClose={onClose}
        changeView={setView}
      />
      <SelectRegisterProvider
        value={"select_register"}
        onClose={onClose}
        changeView={setView}
      />
      <SignIn value={"login_email"} onClose={onClose} changeView={setView} />
      <SignUp value={"register_email"} onClose={onClose} changeView={setView} />
      <Loading value={"loading"} onClose={onClose} changeView={setView} />
    </Switch>
  );
}
