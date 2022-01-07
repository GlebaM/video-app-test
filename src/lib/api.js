import axios from "axios";

const defaultOptions = {
  baseURL: `https://thebetter.bsgroup.eu/`,
  headers: { "Content-Type": "application/json" },
};

let api = axios.create(defaultOptions);

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("primaryToken");
  const loginToken = localStorage.getItem("primaryToken");
  config.headers.Authorization = loginToken
    ? `Bearer ${loginToken}`
    : token
    ? `Bearer ${token}`
    : "";
  return config;
});

export async function getPrimaryToken() {
  const response = await api
    .post("/Authorization/SignIn", {
      Device: {
        PlatformCode: "WEB",
        Name: "12345678-1234-1234-1234-123412345678",
      },
    })
    .catch((err) => {
      console.error(err.message);
    });

  return response.data.AuthorizationToken.Token;
}

export async function getMediaList(listId) {
  const response = await api
    .post("/Media/GetMediaList", {
      MediaListId: listId,
      IncludeCategories: false,
      IncludeImages: true,
      IncludeMedia: false,
      PageNumber: 1,
      PageSize: 15,
    })
    .catch((err) => {
      console.error(err.message);
    });

  return response.data;
}

export async function getMediaPlayInfo(id) {
  const response = await api
    .post("/Media/GetMediaPlayInfo", {
      MediaId: id,
      StreamType: "TRIAL",
    })
    .catch((err) => {
      console.error(err.message);
    });

  return response.data;
}

export async function getLoginToken({ email, password }) {
  const response = await api
    .post("/Authorization/SignIn", {
      Username: email,
      Password: password,
      Device: {
        PlatformCode: "WEB",
        Name: "12345678-1234-1234-1234-123412345678",
      },
    })
    .catch((err) => {
      console.error(err.message);
    });

  return response.data.AuthorizationToken.Token;
}
