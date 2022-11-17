import { PhotoCamera } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import { uploadHeaders } from "../helper/headers";

export function Upload() {
  const [selectedFile, setSelectedFile] = useState<string | Blob>("");

  function sendImage(): void {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(localStorage.getItem("token"));
    fetch("http://localhost:3000/api/content/upload", {
      method: "POST",
      headers: uploadHeaders,
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  const changeHandler = (event: any) => {
    if (event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button
          startIcon={<PhotoCamera />}
          variant="contained"
          component="label"
        >
          Upload
          <input
            hidden
            accept="video/*"
            multiple
            type="file"
            onChange={changeHandler}
          />
        </Button>
        <Button variant="contained" component="label" onClick={sendImage}>
          Send
        </Button>
      </Stack>
    </Box>
  );
}
