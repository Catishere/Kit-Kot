import { Divider, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Post from "../components/feed/Post";
import headers from "../helper/headers";
import { PostData } from "../types/types.interface";

export function Home() {
  const [feed, setFeed] = useState<PostData[]>([]);

  useEffect(() => {
    fetch("/api/post/trending", {
      method: "GET",
      headers,
    })
      .then((res) => res.json())
      .then((data) => setFeed(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Stack
      sx={{ width: "100%" }}
      divider={
        <Divider
          sx={{
            width: { xxs: "100%", sm: "579px" },
            alignSelf: "center",
          }}
          flexItem
          variant="middle"
        />
      }
    >
      {feed.map((post: PostData, index: number) => (
        <>
          <Post key={post.id} post={post} />
        </>
      ))}
    </Stack>
  );
}
