const getHeaders = () => {
  const headers: HeadersInit = new Headers();
  headers.set("Content-Type", "application/json");
  if (localStorage.getItem("token"))
    headers.set("Authorization", "Bearer " + localStorage.getItem("token"));
  return headers;
};

export default getHeaders;

const getUploadHeaders = () => {
  const uploadHeaders: HeadersInit = new Headers();
  if (localStorage.getItem("token"))
    uploadHeaders.set(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
  return uploadHeaders;
};
export { getUploadHeaders };
