import { PhotoCamera } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import Video from "../components/feed/Video";
import { ContentService } from "../services/ContentService";
import PostService from "../services/PostService";
import { PostCreateData, UploadFileResponse } from "../types/types.interface";

const EMPTY_FORM: PostCreateData = {
  content: "",
  mediaUrl: "",
  tags: [],
  music: {
    name: "",
    link: "",
  },
};

export function Upload() {
  const [selectedFile, setSelectedFile] = useState<string | Blob>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [form, setForm] = useState<PostCreateData>(EMPTY_FORM);
  const [tagsInput, setTagsInput] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const sendImage = async () => {
    if (!selectedFile) {
      console.log("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    return ContentService.uploadFile(formData);
  };

  const changeHandler = (event: any) => {
    if (event.target.files[0]) {
      setPreviewUrl(URL.createObjectURL(event.target.files[0]));
      setSelectedFile(event.target.files[0]);
    }
  };

  const publish = async () => {
    setLoading(true);
    let uploadData: UploadFileResponse;
    try {
      uploadData = await sendImage();
    } catch (err) {
      setLoading(false);
      return enqueueSnackbar("Error uploading file", { variant: "error" });
    }

    if (!selectedFile) return;

    try {
      await PostService.createPost({
        ...form,
        mediaUrl: uploadData.fileDownloadUri,
      });

      setForm(EMPTY_FORM);
      setSelectedFile("");
      setPreviewUrl("");
      setTagsInput("");
      enqueueSnackbar("Post created", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Post creation failed", { variant: "error" });
      setLoading(false);
    }
    setLoading(false);
  };

  const onContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const content = e.target.value;
    setForm({ ...form, content });
  };

  const onTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value;
    setTagsInput(tags);
    setForm({
      ...form,
      tags: tags
        .split(/[, ]/)
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "" && tag.length < 20),
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xxs: "column", sm: "row" },
        justifyContent: "center",
        alignContent: "center",
        paddingTop: "20px",
      }}
    >
      <Box
        alignSelf={{ xxs: "center", sm: "flex-start" }}
        sx={{ px: { xxs: "20px", xs: 0 } }}
      >
        <Video url={previewUrl} />
      </Box>

      <Stack
        padding={"10px"}
        maxWidth={"300px"}
        width={{ xxs: "100%", sm: "auto" }}
        direction="column"
        alignSelf={"center"}
        gap={"5px"}
      >
        <TextField
          sx={{ width: "100%" }}
          id="content-input"
          label="Content"
          multiline
          maxRows={5}
          value={form?.content}
          onChange={onContentChange}
          variant="outlined"
        />
        <Stack
          display="flex"
          alignContent="center"
          justifyContent="flex-start"
          flexWrap="wrap"
          maxWidth={"300px"}
          direction="row"
          gap="5px"
        >
          {form?.tags
            .filter((tag) => tag.length > 0)
            .map((tag) => (
              <Button key={tag} variant="contained" size="small">
                {tag}
              </Button>
            ))}
        </Stack>
        <TextField
          sx={{ width: "100%" }}
          id="tags-input"
          label="Tags"
          value={tagsInput}
          onChange={onTagsChange}
          variant="outlined"
        />
        <Stack
          direction="row"
          alignContent="center"
          justifyContent="center"
          flexWrap={"wrap"}
          gap="10px"
        >
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
          <LoadingButton
            loading={loading}
            color="secondary"
            variant="contained"
            component="label"
            onClick={publish}
          >
            Send
          </LoadingButton>
        </Stack>
      </Stack>
    </Box>
  );
}
