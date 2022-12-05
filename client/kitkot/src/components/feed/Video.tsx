import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

export default function Video({ url, size }: { url: string; size?: any }) {
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
      alignSelf={{ xxs: "center", sm: "flex-start" }}
      height={size ? size.height : { xxs: "auto", xs: "475px" }}
      minWidth={size ? size.minWidth : "auto"}
      width={size ? size.width : { xxs: "100%", xs: "300px" }}
      padding={{ xxs: "0px", xs: "10px" }}
    >
      <video
        style={{
          backgroundColor: "black",
          minHeight: size ? size.height : "auto",
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
