import React, { createContext, useContext, useState, useCallback } from "react";
import { ChildrenProp, CommentSectionData } from "../types/types.interface";

const CommentSectionContextState = createContext(
  null as CommentSectionData | null
);
const CommentSectionContextUpdater = createContext(
  (commentData: CommentSectionData | null) => {}
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
  const [commentData, setCommentData] = useState(
    null as CommentSectionData | null
  );

  const setCommentSectionState = useCallback(
    (commentData: CommentSectionData | null) => {
      setCommentData(commentData);
    },
    []
  );

  return (
    <CommentSectionContextState.Provider value={commentData}>
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
