import { useEffect } from "react";
import { ModalProps } from "../../types/types.interface";

export default function Loading({ changeView }: ModalProps) {
  useEffect(() => {
    setTimeout(() => {
      changeView("select_login");
    }, 2000);
  }, [changeView]);

  return <>Loading</>;
}
