import { Box, Divider } from "@mui/material";
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
    <Box sx={{ width: "100%" }}>
      {feed.map((post: PostData, index: number) => (
        <>
          <Post key={post.id} post={post} />
          {index !== feed.length - 1 ? <Divider variant="middle" /> : null}
        </>
      ))}
    </Box>
  );
}
