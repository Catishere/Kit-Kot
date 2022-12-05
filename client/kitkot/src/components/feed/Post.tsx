import {
  Avatar,
  Box,
  Container,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { PostData } from "../../types/types.interface";
import Moment from "react-moment";
import {
  useUserContextState,
  useUserContextUpdater,
} from "../../contexts/UserContext";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import Video from "./Video";
import { useSnackbar } from "notistack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import {
  useCommentSectionContextState,
  useCommentSectionContextUpdater,
} from "../../contexts/CommentSectionContext";
import { UserService } from "../../services/UserService";
import PostService from "../../services/PostService";

export default function Post({ post }: { post: PostData }) {
  const user = useUserContextState();
  const setUser = useUserContextUpdater();
  const { enqueueSnackbar } = useSnackbar();
  const commentContextState = useCommentSectionContextState();
  const commentContextUpdater = useCommentSectionContextUpdater();

  const [loading, setLoading] = useState(false);
  const [hoverLiked, setHoverLiked] = useState(false);

  const isFollowed = user?.followingData?.following?.some(
    (user) => user?.username === post.user?.username
  );

  const isLiked = user?.likedPosts?.some(
    (likedPost) => likedPost?.id === post.id
  );

  const canFollowBack = user?.followingData?.followers?.some(
    (user) => user?.username === post.user?.username
  );

  const showError = (err: any) => {
    enqueueSnackbar(err.message, { variant: "error" });
    setLoading(false);
  };

  const followUser = async () => {
    if (!user)
      return enqueueSnackbar("You need to be logged in to follow users", {
        variant: "warning",
      });
    if (!post.user) return;
    setLoading(true);
    UserService.followUser(post.user.id)
      .then((data) => {
        const i = user?.followingData.following.findIndex(
          (follow) => follow?.id === data.id
        ) as number;
        const userCopy = { ...user };
        if (i >= 0) {
          userCopy.followingData.following.splice(i, 1);
          setUser(userCopy);
        } else {
          userCopy.followingData.following.push(data);
          setUser(userCopy);
        }
        setLoading(false);
      })
      .catch(showError);
  };

  const likePost = async () => {
    if (!user)
      return enqueueSnackbar("You need to be logged in to like posts", {
        variant: "warning",
      });
    PostService.likePost(post.id)
      .then((data) => {
        const i = user?.likedPosts.findIndex((post) => post.id === data.id);
        const userCopy = { ...user };
        if (i >= 0) {
          userCopy?.likedPosts.splice(i, 1);
          setUser(userCopy);
        } else {
          userCopy?.likedPosts.push(data);
          setUser(userCopy);
        }
      })
      .catch(showError);
  };

  const toggleCommentSection = () => {
    if (!commentContextState) {
      PostService.getComments(post.id)
        .then((data) => {
          commentContextUpdater({ postId: post.id, comments: data });
        })
        .catch(showError);
    } else {
      commentContextUpdater(null);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "row",
        p: "20px 0px 20px 0px",
        width: { xxs: "calc(100% - 15px)", sm: "auto" },
      }}
    >
      <Box>
        <Avatar
          src={post.user?.photoURL}
          sx={{
            display: { xxs: "none", xs: "flex" },
            width: { xxs: 40, sm: 56 },
            height: { xxs: 40, sm: 56 },
            zIndex: 1,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "500px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Box>
            <Avatar
              src={post.user?.photoURL}
              sx={{
                display: { xxs: "flex", xs: "none" },
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
                {post.user?.username}
              </Typography>
              <Typography
                whiteSpace="nowrap"
                fontSize={{ xxs: 12, sm: 14 }}
                textAlign="left"
              >
                {post.user?.displayName}
              </Typography>
            </Box>
            <Typography textAlign="left" fontSize={{ xxs: 12, sm: 14 }}>
              <Moment
                subtract={{ minutes: new Date(post.date).getTimezoneOffset() }}
                fromNow
              >
                {post.date}
              </Moment>
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
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
              alignSelf: "flex-start",
            }}
          >
            <LoadingButton
              loading={loading}
              variant={isFollowed ? "outlined" : "contained"}
              color="secondary"
              sx={{
                textTransform: "none",
                display: user?.id === post.user?.id ? "none" : "flex",
                fontSize: { xxs: 12, xs: 14 },
              }}
              onClick={() => followUser()}
            >
              <b>
                {isFollowed
                  ? "Unfollow"
                  : canFollowBack
                  ? "Follow Back"
                  : "Follow"}
              </b>
            </LoadingButton>
          </Box>
        </Box>
        <Box
          sx={{
            width: { xxs: "100%", sm: "475px" },
          }}
        >
          {post.content.length > 128 ? (
            <Typography
              fontSize={{ xxs: 12, xs: 16 }}
              paddingX={{ xxs: 0, xs: "10px" }}
              textAlign="justify"
            >
              {post.content.substring(0, 128) + "..."}
              <Link
                onClick={(e) => {
                  const target = (e.target as HTMLElement).parentElement;
                  if (target) target.innerText = post.content;
                }}
                fontWeight="bold"
                color="primary.light"
                component="button"
                underline="hover"
              >
                See more
              </Link>
            </Typography>
          ) : (
            <Typography
              fontSize={{ xxs: 12, xs: 16 }}
              textAlign="justify"
              paddingX={{ xxs: 0, xs: "10px" }}
            >
              {post.content}
            </Typography>
          )}
        </Box>
        <Stack
          display="flex"
          width="100%"
          direction="row"
          justifyContent="flex-start"
          gap="5px"
        >
          <Video url={post.mediaUrl}></Video>
          <Stack
            display="flex"
            direction="column"
            gap="5px"
            justifyContent="flex-end"
            pb="10px"
          >
            <IconButton
              onMouseEnter={() => setHoverLiked(true)}
              onMouseLeave={() => setHoverLiked(false)}
              onClick={() => likePost()}
              sx={{
                backgroundColor: isLiked ? "secondary.dark" : "modal.main",
                "&:hover": {
                  backgroundColor: isLiked ? "maroon" : "secondary.dark",
                },
              }}
            >
              {hoverLiked && isLiked ? <HeartBrokenIcon /> : <FavoriteIcon />}
            </IconButton>
            <IconButton
              sx={{ backgroundColor: "modal.main" }}
              onClick={() => toggleCommentSection()}
            >
              <CommentIcon />
            </IconButton>
            <IconButton sx={{ backgroundColor: "modal.main" }}>
              <ShareIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
