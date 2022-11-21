import getHeaders from "../helper/headers";
import {
  Comment,
  HttpStatus,
  PostCreateData,
  PostData,
  statusToText,
} from "../types/types.interface";

namespace PostService {
  export async function createPost(post: PostCreateData) {
    return fetch("/api/post", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(post),
    }).then((res) => {
      if (res.status === HttpStatus.OK || res.status === HttpStatus.CREATED)
        return res.json();
      throw new Error(statusToText(res.status));
    });
  }

  export async function createComment(
    comment: string,
    postId: number
  ): Promise<Comment> {
    return fetch(`/api/comment/${postId}`, {
      method: "POST",
      headers: getHeaders(),
      body: comment,
    }).then((res) => {
      if (res.status === HttpStatus.OK || res.status === HttpStatus.CREATED)
        return res.json();
      throw new Error(statusToText(res.status));
    });
  }

  export async function likePost(postId: number): Promise<PostData> {
    return fetch(`/api/post/${postId}/like`, {
      method: "POST",
      headers: getHeaders(),
    }).then((res) => {
      if (res.status === HttpStatus.OK || res.status === HttpStatus.CREATED)
        return res.json();
      throw new Error(statusToText(res.status));
    });
  }

  export async function getComments(postId: number): Promise<Comment[]> {
    return fetch(`/api/post/${postId}/comments`, {
      method: "GET",
      headers: getHeaders(),
    }).then((res) => {
      if (res.status === HttpStatus.OK || res.status === HttpStatus.CREATED)
        return res.json();
      throw new Error(statusToText(res.status));
    });
  }

  export async function getTrending(): Promise<PostData[]> {
    return fetch("/api/post/trending", {
      method: "GET",
      headers: getHeaders(),
    }).then((res) => {
      if (res.status === HttpStatus.OK || res.status === HttpStatus.CREATED)
        return res.json();
      throw new Error(statusToText(res.status));
    });
  }

  export async function getPostsByUsername(
    username: string
  ): Promise<PostData[]> {
    return fetch(`/api/post/user/${username}`, {
      method: "GET",
      headers: getHeaders(),
    }).then((res) => {
      if (res.status === HttpStatus.OK || res.status === HttpStatus.CREATED)
        return res.json();
      throw new Error(statusToText(res.status));
    });
  }
}

export default PostService;
