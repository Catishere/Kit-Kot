import { Avatar, Box, Container, Link, Typography } from "@mui/material";
import { PostData } from "../../types/types.interface";
import Moment from "react-moment";
import { useUserContextState } from "../../contexts/UserContext";
import headers from "../../helper/headers";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

export default function Post({ post }: { post: PostData }) {
  const user = useUserContextState();

  const [loading, setLoading] = useState(false);

  const isFollowed = user?.followingData?.following?.some(
    (user) => user?.username === post.user?.username
  );

  const canFollowBack = user?.followingData?.followers?.some(
    (user) => user?.username === post.user?.username
  );

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        p: "20px 0px 20px 0px",
        width: { xxs: "calc(100% - 10px)", sm: "100%" },
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
        </Box>
        <Box sx={{ marginLeft: "auto", alignSelf: "center" }}>
          <LoadingButton
            loading={loading}
            variant={isFollowed ? "outlined" : "contained"}
            color="secondary"
            sx={{
              textTransform: "none",
              display: user?.id === post.user?.id ? "none" : "flex",
            }}
            onClick={() => {
              setLoading(true);
              fetch(`/api/user/${user?.id}/follow/${post.user?.id}`, {
                method: "POST",
                headers,
              })
                .then((res) => res.json())
                .then((data) => {
                  const i = user?.followingData.following.findIndex(
                    (follow) => follow?.id === data.id
                  ) as number;
                  if (i >= 0) user?.followingData.following.splice(i, 1);
                  else user?.followingData.following.push(data);
                  setLoading(false);
                })
                .catch((err) => {
                  console.log(err);
                  setLoading(false);
                });
            }}
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
      <Box sx={{ width: { xxs: "100%", sm: "475px" } }}>
        {post.content.length > 128 ? (
          <Typography textAlign="justify">
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
          <Typography textAlign="justify">{post.content}</Typography>
        )}
      </Box>
      <Box
        display="flex"
        marginTop="10px"
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
