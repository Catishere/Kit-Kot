import {
  Avatar,
  Box,
  Button,
  Container,
  Link,
  Typography,
} from "@mui/material";
import { PostData } from "../../types/types.interface";
import Moment from "react-moment";

export default function Post({ post }: { post: PostData }) {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        p: "20px 0px 20px 0px",
        height: { xxs: "auto", sm: "600px" },
        width: { xxs: "calc(100% - 10px)", sm: "100%" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Box>
          <Avatar
            sx={{
              width: { xxs: 40, sm: 56 },
              height: { xxs: 40, sm: 56 },
              zIndex: 1,
            }}
          />
        </Box>
        <Box
          justifyContent="flex-start"
          flexDirection="column"
          marginLeft="12px"
        >
          <Box
            sx={{ display: "flex", flexDirection: "row" }}
            alignItems="baseline"
            flexWrap="wrap-reverse"
          >
            <Typography
              fontWeight="bold"
              fontSize={{ xxs: 14, sm: 18 }}
              textAlign="left"
              marginRight="4px"
            >
              {post.user.username}
            </Typography>
            <Typography
              whiteSpace="nowrap"
              fontSize={{ xxs: 12, sm: 14 }}
              textAlign="left"
            >
              {post.user.displayName}
            </Typography>
          </Box>
          <Typography textAlign="left" fontSize={{ xxs: 12, sm: 14 }}>
            <Moment fromNow>{post.date}</Moment>
          </Typography>
          <Typography fontSize={12} fontWeight={"bold"} textAlign="left">
            {post.tags.map((tag) => (
              <>
                <Link component="button" underline="hover">
                  #{tag}
                </Link>
                &nbsp;
              </>
            ))}
          </Typography>
          <Typography textAlign="left">{post.content}</Typography>
        </Box>
        <Box justifySelf="flex-end" flexGrow={1}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ textTransform: "none" }}
          >
            <b>Follow</b>
          </Button>
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="flex-start"
        height={{ xxs: "auto", sm: "475px" }}
        width={{ xxs: "100%", sm: "475px" }}
      >
        <img
          src={process.env.PUBLIC_URL + post.mediaUrl}
          alt="fuck this shit"
          width="100%"
          height="auto"
        />
      </Box>
    </Container>
  );
}
