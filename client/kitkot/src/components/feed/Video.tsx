import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

export default function Video({ url }: { url: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playPause = (video: HTMLVideoElement) => {
    if (video.paused) video.play();
    else video.pause();
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [url]);

  return (
    <Box
      display="flex"
      marginTop="10px"
      alignSelf={{ xxs: "center", sm: "flex-start" }}
      height={{ xxs: "auto", xs: "475px" }}
      width={{ xxs: "100%", xs: "300px" }}
      padding={{ xxs: "0px", xs: "10px" }}
    >
      <video
        style={{
          backgroundColor: "black",
          minHeight: "350px",
          borderRadius: "20px",
        }}
        ref={videoRef}
        width="100%"
        height="auto"
        onClick={(e) => playPause(e.target as HTMLVideoElement)}
      >
        <source src={url} type="video/mp4" />
      </video>
    </Box>
  );
}
