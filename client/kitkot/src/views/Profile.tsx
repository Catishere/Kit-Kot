import { Avatar, Box, Button, Skeleton, Tab, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostData, UserInfo } from "../types/types.interface";
import EditIcon from "@mui/icons-material/Edit";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import Video from "../components/feed/Video";
import {
  useUserContextState,
  useUserContextUpdater,
} from "../contexts/UserContext";
import { UserService } from "../services/UserService";
import PostService from "../services/PostService";
import { useSnackbar } from "notistack";

const UserNotFound = () => {
  return (
    <Box>
      <Typography height={"50px"} variant="h4">
        Couldn't find this account
      </Typography>
    </Box>
  );
};

export const UserProfile = ({
  user,
  videos,
  liked,
}: {
  user: UserInfo | undefined;
  videos: PostData[];
  liked: PostData[];
}) => {
  const [tab, setTab] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const currentUser = useUserContextState();
  const setUser = useUserContextUpdater();
  const { enqueueSnackbar } = useSnackbar();

  const isFollowed = currentUser?.followingData?.following?.some(
    (followingUser) => followingUser?.username === user?.username
  );

  const canFollowBack = currentUser?.followingData?.followers?.some(
    (followerUser) => followerUser?.username === user?.username
  );

  const followUser = async () => {
    if (!currentUser)
      return enqueueSnackbar("You need to be logged in to follow users", {
        variant: "warning",
      });
    if (!user) return;

    setLoading(true);
    UserService.followUser(user.id)
      .then((data) => {
        const i = currentUser.followingData.following.findIndex(
          (follow) => follow?.id === data.id
        ) as number;
        const userCopy = { ...currentUser };
        if (i >= 0) {
          userCopy.followingData.following.splice(i, 1);
          setUser(userCopy);
        } else {
          userCopy.followingData.following.push(data);
          setUser(userCopy);
        }
        setLoading(false);
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
        setLoading(false);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        {user ? (
          <Avatar
            src={user?.photoURL}
            sx={{ width: 116, height: 116 }}
            alt={user?.displayName}
          />
        ) : (
          <Skeleton variant="circular" width={116} height={116} />
        )}

        <Stack gap={"5px"} sx={{ display: "flex" }}>
          {user ? (
            <Typography textAlign="left" fontWeight={"bold"} variant="h4">
              {user?.username}
            </Typography>
          ) : (
            <Skeleton variant="text" sx={{ fontSize: 25 }} />
          )}

          {user ? (
            <Typography textAlign="left" fontWeight={"bold"} fontSize={16}>
              {user?.displayName}
            </Typography>
          ) : (
            <Skeleton variant="text" sx={{ fontSize: 16 }} />
          )}
          {user?.id === currentUser?.id ? (
            <Button
              color="neutral"
              variant="outlined"
              startIcon={<EditIcon />}
              sx={{ whiteSpace: "nowrap", width: "fit-content" }}
            >
              Edit Profile
            </Button>
          ) : (
            <LoadingButton
              loading={loading}
              variant={isFollowed ? "outlined" : "contained"}
              color="secondary"
              sx={{
                maxWidth: "fit-content",
                textTransform: "none",
                display: user?.id === currentUser?.id ? "none" : "flex",
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
          )}
        </Stack>
      </Box>
      <Stack direction="row" gap={"15px"}>
        <Box sx={{ display: "flex" }} flexDirection={"row"} gap="5px">
          <Typography textAlign="left" fontWeight={"bold"} fontSize={16}>
            {user ? user.followingData.following.length : 0}
          </Typography>
          <Typography textAlign="left" fontSize={16}>
            Following
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }} flexDirection={"row"} gap="5px">
          <Typography textAlign="left" fontWeight={"bold"} fontSize={16}>
            {user ? user.followingData.followers.length : 0}
          </Typography>
          <Typography textAlign="left" fontSize={16}>
            Followers
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }} flexDirection={"row"} gap="5px">
          <Typography textAlign="left" fontWeight={"bold"} fontSize={16}>
            {videos.reduce((acc, video) => acc + video.likes, 0)}
          </Typography>
          <Typography textAlign="left" fontSize={16}>
            Likes
          </Typography>
        </Box>
      </Stack>
      <TabContext value={tab.toString()}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "460px" }}>
          <TabList
            onChange={(_e, newValue: number) => setTab(newValue)}
            aria-label="profile-tabs"
          >
            <Tab label="Videos" value="1" sx={{ width: "50%" }} />
            <Tab label="Liked" value="2" sx={{ width: "50%" }} />
          </TabList>
        </Box>
        <TabPanel
          sx={{ p: 0, display: "flex", flexDirection: "row" }}
          value="1"
        >
          {videos.map((video) => {
            return (
              <Video
                url={video.mediaUrl}
                size={{ height: "260px", width: "180px" }}
              />
            );
          })}
        </TabPanel>
        <TabPanel
          sx={{ p: 0, display: "flex", flexDirection: "row" }}
          value="2"
        >
          {liked.map((video) => {
            return (
              <Video
                url={video.mediaUrl}
                size={{ height: "260px", width: "180px" }}
              />
            );
          })}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export function Profile() {
  let { username } = useParams();
  const [user, setUser] = useState<UserInfo | null | undefined>();
  const [videos, setVideos] = useState<PostData[]>([]);
  const [liked, setLiked] = useState<PostData[]>([]);

  useEffect(() => {
    if (!username) return;
    UserService.getUserByUsername(username)
      .then((data) => {
        const user = data.user;
        user.followingData = data.followingData;
        setUser(user);
      })
      .catch((_err) => setUser(null));

    PostService.getPostsByUsername(username).then((data) => {
      setVideos(data);
    });

    UserService.getLikedPostsByUsername(username).then((data) => {
      setLiked(data);
    });

    return () => {
      setUser(undefined);
    };
  }, [username]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignContent: "center",
        height: "100%",
        width: "100%",
        padding: "20px",
      }}
    >
      {user === null ? (
        <UserNotFound />
      ) : (
        <UserProfile user={user} videos={videos} liked={liked} />
      )}
    </Box>
  );
}
