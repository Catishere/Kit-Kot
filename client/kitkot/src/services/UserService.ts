import getHeaders from "../helper/headers";
import {
  HttpStatus,
  PostData,
  RegisterFormData,
  statusToText,
} from "../types/types.interface";

export namespace UserService {
  export async function followUser(followId: number) {
    return fetch(`/api/user/follow/${followId}`, {
      method: "POST",
      headers: getHeaders(),
    }).then((res) => {
      if (res.status === HttpStatus.OK || res.status === HttpStatus.CREATED)
        return res.json();
      throw new Error(statusToText(res.status));
    });
  }

  export async function login(username: string, password: string) {
    return fetch("/api/auth/login", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ username, password }),
    }).then((res) => {
      if (res.status === HttpStatus.OK || res.status === HttpStatus.CREATED)
        return res.json();
      if (res.status === HttpStatus.UNAUTHORIZED)
        throw new Error("Invalid username or password");
      else throw new Error(statusToText(res.status));
    });
  }

  export async function register(form: RegisterFormData) {
    return fetch("/api/auth/register", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(form),
    }).then((res) => {
      if (res.status === HttpStatus.OK || res.status === HttpStatus.CREATED)
        return res.json();
      throw new Error(statusToText(res.status));
    });
  }

  export async function getSuggested() {
    return fetch("/api/user/suggested", {
      method: "GET",
      headers: getHeaders(),
    }).then((res) => {
      if (res.status === HttpStatus.OK || res.status === HttpStatus.CREATED)
        return res.json();
      throw new Error(statusToText(res.status));
    });
  }

  export async function getAccount() {
    return fetch("/api/user/self", {
      method: "GET",
      headers: getHeaders(),
    }).then((res) => {
      if (res.status === HttpStatus.OK || res.status === HttpStatus.CREATED)
        return res.json();
      throw new Error(statusToText(res.status));
    });
  }

  export async function getUserByUsername(username: string) {
    return fetch(`/api/user?${new URLSearchParams({ username })}`, {
      method: "GET",
      headers: getHeaders(),
    }).then((res) => {
      if (res.status === HttpStatus.OK || res.status === HttpStatus.CREATED)
        return res.json();
      throw new Error(statusToText(res.status));
    });
  }

  export async function getLikedPostsByUsername(
    username: string
  ): Promise<PostData[]> {
    return fetch(`/api/user/${username}/liked`, {
      method: "GET",
      headers: getHeaders(),
    }).then((res) => {
      if (res.status === HttpStatus.OK || res.status === HttpStatus.CREATED)
        return res.json();
      throw new Error(statusToText(res.status));
    });
  }
}
