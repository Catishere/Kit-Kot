import { Avatar, Box, Typography } from "@mui/material";
import Moment from "react-moment";
import { Comment } from "../../types/types.interface";

export function CommentElement({ comment }: { comment: Comment }) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "500px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignContent: "center",
      }}
    >
      <Avatar
        src={comment.author?.photoURL}
        sx={{
          display: "flex",
          width: { xxs: 36, sm: 50 },
          height: { xxs: 36, sm: 50 },
          zIndex: 1,
        }}
      />
      <Box justifyContent="flex-start" flexDirection="column" marginLeft="12px">
        <Box
          sx={{ display: "flex", flexDirection: "row" }}
          alignItems="baseline"
          flexWrap="wrap-reverse"
        >
          <Typography
            fontWeight="bold"
            fontSize={{ xxs: 12, sm: 14 }}
            textAlign="left"
            marginRight="4px"
          >
            {comment.author?.username}
          </Typography>
          <Typography
            whiteSpace="nowrap"
            fontSize={{ xxs: 10, sm: 12 }}
            textAlign="left"
          >
            {comment.author?.displayName}
          </Typography>
        </Box>
        <Typography fontSize={{ xxs: 12, sm: 14 }} textAlign="left">
          {comment.content}
        </Typography>
        <Typography textAlign="left" fontSize={{ xxs: 10, sm: 12 }}>
          <Moment fromNow>{comment.date}</Moment>
        </Typography>
      </Box>
    </Box>
  );
}
