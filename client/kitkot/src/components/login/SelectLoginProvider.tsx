import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { ReactComponent as GoogleIcon } from "../../icons/googleIcon.svg";
import Typography from "@mui/material/Typography";
import { Divider, IconButton, SvgIcon } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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

export default function SelectLoginProvider({
  value,
  onClose,
  changeView,
}: ModalProps) {
  return (
    <Box sx={style}>
      <IconButton sx={{ alignSelf: "flex-end" }}>
        <CloseIcon onClick={onClose} />
      </IconButton>
      <Typography id="keep-mounted-modal-title" variant="h5" fontWeight="bold">
        Log in to KitKot
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", p: 4, gap: "20px" }}>
        <Button
          startIcon={<PersonOutlinedIcon />}
          color="neutral"
          variant="outlined"
          onClick={() => changeView("login_email")}
        >
          Use phone / email / username
        </Button>
        <Button
          startIcon={
            <SvgIcon>
              <GoogleIcon />
            </SvgIcon>
          }
          color="neutral"
          variant="outlined"
          onClick={() => changeView("loading")}
        >
          Continue with Google
        </Button>
      </Box>
      <Divider sx={{ width: "100%", marginBottom: 0 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
          marginY: 1,
        }}
      >
        Don't have an account?
        <Button
          disableElevation
          disableRipple
          disableFocusRipple
          color="secondary"
          onClick={() => changeView("select_register")}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
}
