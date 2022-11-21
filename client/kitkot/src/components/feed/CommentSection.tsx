import {
  Box,
  Divider,
  IconButton,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import {
  useCommentSectionContextState,
  useCommentSectionContextUpdater,
} from "../../contexts/CommentSectionContext";
import { CommentElement } from "./Comment";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useUserContextState } from "../../contexts/UserContext";
import PostService from "../../services/PostService";

export default function CommentSection() {
  const commentData = useCommentSectionContextState();
  const setCommentData = useCommentSectionContextUpdater();
  const user = useUserContextState();
  const [comment, setComment] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleComment = () => {
    if (!commentData) return;
    PostService.createComment(comment, commentData.postId)
      .then((data) => {
        setCommentData({
          ...commentData,
          comments: [...commentData.comments, data],
        });
        setComment("");
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
        setComment("");
      });
  };

  return commentData ? (
    <Modal open={commentData !== null} onClose={() => setCommentData(null)}>
      <Box
        sx={{
          display: "block",
          position: "fixed",
          padding: "20px 20px 20px 20px",
          right: 0,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "80%",
          maxWidth: "500px",
          height: "100vh",
          backgroundColor: "modal.main",
          transition: "width 0.3 ease",
        }}
      >
        <Stack display="flex" divider={<Divider sx={{ marginY: "15px" }} />}>
          {commentData.comments.map((comment) => (
            <CommentElement comment={comment} />
          ))}
          <Box
            display="flex"
            justifyContent="flex-start"
            alignContent="center"
            paddingX="10px"
            width="100%"
          >
            <TextField
              value={comment}
              disabled={user === null}
              onChange={(e) => setComment(e.target.value)}
              sx={{ width: "100%" }}
              variant="outlined"
              placeholder={
                user ? "Add comment..." : "You need to be logged in to comment"
              }
            />
            <IconButton
              disableRipple
              disabled={comment === ""}
              onClick={() => handleComment()}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Stack>
      </Box>
    </Modal>
  ) : (
    <></>
  );
}
