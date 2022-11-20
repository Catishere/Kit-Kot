import React, { createContext, useContext, useState, useCallback } from "react";
import { Comment, ChildrenProp } from "../types/types.interface";

const CommentSectionContextState = createContext(null as Comment[] | null);
const CommentSectionContextUpdater = createContext(
  (comments: Comment[] | null) => {}
);

const useCommentSectionContextState = () => {
  const context = useContext(CommentSectionContextState);
  if (context === undefined)
    throw new Error(
      "useCommentSectionContextState was used outside of its Provider"
    );

  return context;
};

const useCommentSectionContextUpdater = () => {
  const context = useContext(CommentSectionContextUpdater);

  if (context === undefined)
    throw new Error(
      "useCommentSectionContextUpdater was used outside of its Provider"
    );

  return context;
};

const CommentSectionContextProvider = ({ children }: ChildrenProp) => {
  const [comments, setComments] = useState(null as Comment[] | null);

  const setCommentSectionState = useCallback((comments: Comment[] | null) => {
    setComments(comments);
  }, []);

  return (
    <CommentSectionContextState.Provider value={comments}>
      <CommentSectionContextUpdater.Provider value={setCommentSectionState}>
        {children}
      </CommentSectionContextUpdater.Provider>
    </CommentSectionContextState.Provider>
  );
};

export {
  CommentSectionContextProvider,
  useCommentSectionContextState,
  useCommentSectionContextUpdater,
};
