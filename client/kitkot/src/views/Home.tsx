import { useEffect } from "react";
import { useUserContextState } from "../contexts/UserContext";

export function Home() {
  const user = useUserContextState();

  useEffect(() => {
    fetch("http://localhost:3000/api/content/trending")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, [user?.id]);

  return <> This is home </>;
}
