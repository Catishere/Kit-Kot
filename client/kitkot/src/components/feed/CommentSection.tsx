import { Box, Divider, Modal, Stack } from "@mui/material";
import {
  useCommentSectionContextState,
  useCommentSectionContextUpdater,
} from "../../contexts/CommentSectionContext";
import { CommentElement } from "./Comment";

export default function CommentSection() {
  const comments = useCommentSectionContextState();
  const setComments = useCommentSectionContextUpdater();

  return comments ? (
    <Modal open={comments !== null} onClose={() => setComments(null)}>
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
          {comments.map((comment) => (
            <CommentElement comment={comment} />
          ))}
        </Stack>
      </Box>
    </Modal>
  ) : (
    <></>
  );
}
