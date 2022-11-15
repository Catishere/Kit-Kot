import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface ChildrenProp {
  children: React.ReactNode | React.ReactNode[];
}

export interface MenuOptions {
  key: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  content?: React.ReactNode;
  disabled?: boolean;
  keep?: boolean;
  to?: string;
  onClick?: () => void;
}

export interface State<T> {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
}

export interface PostData {
  id: number;
  user: UserData;
  date: Date;
  tags: string[];
  music: {
    name: string;
    link: string;
  };
  content: string;
  mediaUrl: string;
}

export interface UserData {
  id: number;
  username: string;
  displayName: string;
  photoURL: string;
  email: string;
  role: string;
}

export interface ModalProps {
  value: string;
  onClose: () => void;
  changeView: (value: string) => void;
}

export interface OnClose {
  onClose: () => void;
}
