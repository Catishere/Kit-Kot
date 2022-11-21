import { Avatar, Box, Button, Skeleton, Tab, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostData, UserInfo } from "../types/types.interface";
import EditIcon from "@mui/icons-material/Edit";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Video from "../components/feed/Video";
import { useUserContextState } from "../contexts/UserContext";
import { UserService } from "../services/UserService";
import PostService from "../services/PostService";

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
}: {
  user: UserInfo | undefined;
  videos: PostData[];
}) => {
  const [tab, setTab] = useState<number>(0);
  const currentUser = useUserContextState();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
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
            <></>
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
            0
          </Typography>
          <Typography textAlign="left" fontSize={16}>
            Likes
          </Typography>
        </Box>
      </Stack>
      <TabContext value={tab.toString()}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "460px" }}>
          <TabList onChange={handleChange} aria-label="profile-tabs">
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
        <TabPanel value="2">Liked</TabPanel>
      </TabContext>
    </Box>
  );
};

export function Profile() {
  let { username } = useParams();
  const [user, setUser] = useState<UserInfo | null | undefined>();
  const [videos, setVideos] = useState<PostData[]>([]);

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
        <UserProfile user={user} videos={videos} />
      )}
    </Box>
  );
}
