import { PhotoCamera } from "@mui/icons-material";
import { Box, Button, Card, Stack, TextField } from "@mui/material";
import { useState } from "react";
import Video from "../components/feed/Video";
import headers, { uploadHeaders } from "../helper/headers";
import { PostCreateData, UploadFileResponse } from "../types/types.interface";

export function Upload() {
  const [selectedFile, setSelectedFile] = useState<string | Blob>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [form, setForm] = useState<PostCreateData>({
    content: "",
    mediaUrl: "",
    tags: [],
    music: {
      name: "",
      link: "",
    },
  });

  function sendImage(): void {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    fetch("http://localhost:3000/api/content/upload", {
      method: "POST",
      headers: uploadHeaders,
      body: formData,
    })
      .then((res) => res.json())
      .then((data: UploadFileResponse) => {
        setFileUrl(data.fileDownloadUri);
        setForm({ ...form, mediaUrl: data.fileDownloadUri });
      });
  }

  const changeHandler = (event: any) => {
    if (event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const publish = () => {
    fetch("http://localhost:3000/api/post/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(form),
    });
  };

  const onContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const content = e.target.value;
    setForm({ ...form, content });
  };

  const onTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value;
    setForm({ ...form, tags: tags.split(",") });
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        paddingTop: "20px",
      }}
    >
      <Card sx={{ marginX: "20px", p: 0 }}>
        <Video url={fileUrl} />
      </Card>
      <Stack direction="column" alignItems="center" spacing={2}>
        <TextField
          sx={{ width: "100%" }}
          id="content-input"
          label="Content"
          value={form?.content}
          onChange={onContentChange}
          variant="outlined"
        />
        <TextField
          sx={{ width: "100%" }}
          id="tags-input"
          label="Tags"
          value={form?.tags}
          onChange={onTagsChange}
          variant="outlined"
        />
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
          <Button
            color="secondary"
            variant="contained"
            component="label"
            onClick={publish}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
