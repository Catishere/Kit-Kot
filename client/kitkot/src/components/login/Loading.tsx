import Box from "@mui/material/Box";
import { useEffect } from "react";
import { ModalProps } from "../../types/types.interface";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 400,
  bgcolor: "modal.main",
  borderRadius: "10px",
  boxShadow: 24,
  p: 0,
};

export default function Loading({ changeView }: ModalProps) {
  useEffect(() => {
    setTimeout(() => {
      changeView("select_login");
    }, 2000);
  }, [changeView]);

  return <Box sx={style}>Loading</Box>;
}
