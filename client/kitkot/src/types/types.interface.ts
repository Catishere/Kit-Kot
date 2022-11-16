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
  changeView: (value: string) => void;
}

export interface OnClose {
  onClose: () => void;
}

export type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export interface RegisterForm {
  username?: string;
  password?: string;
  day?: string;
  month?: string;
  year?: string;
}

export interface RegisterFormData {
  username?: string;
  password?: string;
  day?: number;
  month: Month;
  year?: number;
}

export interface LoginFormData {
  username: string;
  password: string;
}
