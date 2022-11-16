import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { ReactComponent as GoogleIcon } from "../../icons/googleIcon.svg";
import Typography from "@mui/material/Typography";
import { Divider, SvgIcon } from "@mui/material";
import { ModalProps } from "../../types/types.interface";

export default function SelectRegisterProvider({
  value,
  changeView,
}: ModalProps) {
  return (
    <>
      <Typography id="keep-mounted-modal-title" variant="h5" fontWeight="bold">
        Sign up for KitKot
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", p: 4, gap: "20px" }}>
        <Button
          startIcon={<PersonOutlinedIcon />}
          color="neutral"
          variant="outlined"
          onClick={() => changeView("register_email")}
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
          marginTop: 1,
        }}
      >
        Already have an account?
        <Button
          disableElevation
          disableRipple
          disableFocusRipple
          color="secondary"
          onClick={() => changeView("select_login")}
        >
          Log in
        </Button>
      </Box>
    </>
  );
}
