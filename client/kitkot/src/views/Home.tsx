import { Box, Divider } from "@mui/material";
import { useEffect } from "react";
import Post from "../components/feed/Post";
import { useUserContextState } from "../contexts/UserContext";
import { PostData } from "../types/types.interface";

export function Home() {
  const user = useUserContextState();

  useEffect(() => {
    fetch("http://localhost:3000/api/content/trending")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, [user?.id]);

  const posts: PostData[] = [
    {
      id: 1,
      authorUsername: "thecatishere",
      authorDisplayName: "Victor Gyoshev",
      date: new Date(),
      tags: ["#cats", "#cute", "#kittens"],
      music: {
        name: "Cat song",
        link: "https://www.youtube.com/watch?v=FCpIeQ3hhVk",
      },
      content: "Content 1",
      media: "/images/bird.jpg",
    },
    {
      id: 2,
      authorUsername: "petkosamoletko",
      authorDisplayName: "Boris Mutafow",
      date: new Date(),
      tags: ["#dogs", "#bad", "#weed"],
      music: {
        name: "smoke trees",
        link: "https://www.youtube.com/watch?v=FCpIeQ3hhVk",
      },
      content: "Content 2",
      media: "/images/bird.jpg",
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      {posts.map((post: PostData, index: number) => (
        <>
          <Post key={post.id} post={post} />
          {index !== posts.length - 1 ? <Divider /> : null}
        </>
      ))}
    </Box>
  );
}
