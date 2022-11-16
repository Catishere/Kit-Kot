const headers: HeadersInit = new Headers();
headers.set("Content-Type", "application/json");
if (localStorage.getItem("token"))
  headers.set("Authorization", "Bearer " + localStorage.getItem("token"));

export default headers;