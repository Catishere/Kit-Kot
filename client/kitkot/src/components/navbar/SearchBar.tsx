import {
  alpha,
  Autocomplete,
  Avatar,
  Divider,
  ListItemButton,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserInfo } from "../../types/types.interface";
import { UserService } from "../../services/UserService";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.text.primary, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.text.primary, 0.25),
  },
  marginRight: theme.spacing(2),
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  height: "50px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled(Link)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  position: "relative",
  height: "100%",
  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const AutocompleteStyled = styled(Autocomplete<UserInfo>)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    display: "none",
  },
}));

export default function SearchBar() {
  const [timerRef, setTimerRef] = useState<NodeJS.Timeout | null>(null);
  const [results, setResults] = useState<UserInfo[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();

  const isOpen = searchValue.length >= 3 && results.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) setResults([]);
    setSearchValue(e.target.value);
    if (timerRef) {
      clearTimeout(timerRef);
    }
    setTimerRef(
      setTimeout(() => {
        if (e.target.value.length === 0 || e.target.value.length < 3) return;
        UserService.searchUsers(e.target.value).then((res) => {
          setResults((prevValue) => {
            return res;
          });
        });
      }, 500)
    );
  };

  return (
    <Search sx={{ borderRadius: "40px" }}>
      <AutocompleteStyled
        disablePortal
        open={isOpen}
        id="autocomplete-search"
        options={results}
        autoHighlight
        sx={{ width: 300 }}
        inputValue={searchValue}
        noOptionsText="Loading..."
        getOptionLabel={(option) => option?.username || ""}
        renderOption={(props, option) => (
          <ListItemButton
            onClick={() => {
              setSearchValue("");
              navigate(`@${option?.username || "/"}`);
            }}
          >
            <Stack
              direction="row"
              margin="5px 20px 5px 20px"
              alignContent="center"
              justifyContent={"flex-start"}
              alignItems="center"
              gap={"10px"}
            >
              <Avatar src={option?.photoURL} alt={option?.displayName} />
              <Typography>{option?.username}</Typography>
            </Stack>
          </ListItemButton>
        )}
        renderInput={(params) => (
          <TextField
            sx={{
              "& fieldset": { border: "none" },
            }}
            placeholder="Search…"
            {...params}
            onChange={handleChange}
            inputProps={{
              "aria-label": "search",
              ...params.inputProps,
            }}
          />
        )}
      />

      <Divider orientation="vertical" flexItem />
      <SearchIconWrapper to="/search">
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  );
}
