import { getUploadHeaders } from "../helper/headers";
import { HttpStatus, statusToText } from "../types/types.interface";

export namespace ContentService {
  export async function uploadFile(formData: FormData) {
    return fetch("/api/content/upload", {
      method: "POST",
      headers: getUploadHeaders(),
      body: formData,
    }).then((res) => {
      if (res.status === HttpStatus.OK || res.status === HttpStatus.CREATED)
        return res.json();
      throw new Error(statusToText(res.status));
    });
  }
}
