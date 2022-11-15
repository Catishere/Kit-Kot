import Box from "@mui/material/Box";
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

export default function SignIn({ value, onClose }: ModalProps) {
  return <Box sx={style}>Login</Box>;
}
