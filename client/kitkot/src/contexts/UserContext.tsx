import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { UserService } from "../services/UserService";
import { UserInfo } from "../types/types.interface";
import { ChildrenProp } from "../types/types.interface";

// create contexts
const UserContextState = createContext(null as UserInfo | null);
const UserContextUpdater = createContext((user: UserInfo) => {});

// context consumer hook
const useUserContextState = () => {
  // get the context
  const context = useContext(UserContextState);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useUserContextState was used outside of its Provider");
  }

  return context;
};

// context consumer hook
const useUserContextUpdater = () => {
  // get the context
  const context = useContext(UserContextUpdater);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useUserContextUpdater was used outside of its Provider");
  }

  return context;
};

const UserContextProvider = ({ children }: ChildrenProp) => {
  const [user, setUser] = useState(null as UserInfo);

  const setUserState = useCallback((user: UserInfo) => {
    setUser(user);
  }, []);

  useEffect(() => {
    const userJson = localStorage.getItem("userInfo");
    if (!userJson) return;
    const userObject = JSON.parse(userJson);
    setUser(userObject);
    UserService.getAccount()
      .then((data) => {
        const userInfo = {
          ...data.user,
          followingData: data.followingData,
          likedPosts: data.likedPosts,
        };
        setUser(userInfo);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <UserContextState.Provider value={user}>
      <UserContextUpdater.Provider value={setUserState}>
        {children}
      </UserContextUpdater.Provider>
    </UserContextState.Provider>
  );
};

export { UserContextProvider, useUserContextState, useUserContextUpdater };
