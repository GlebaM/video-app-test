import axios from "axios";

const defaultOptions = {
  baseURL: `https://thebetter.bsgroup.eu/`,
  headers: { "Content-Type": "application/json" },
};

let api = axios.create(defaultOptions);
const loginApi = axios.create(defaultOptions);

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  const loginToken = localStorage.getItem("loginToken");
  config.headers.Authorization = loginToken
    ? `Bearer ${loginToken}`
    : `Bearer ${token}`;

  return config;
});

export async function getAuthToken(values = {}) {
  const response = await loginApi
    .post("/Authorization/SignIn", {
      ...values,
      Device: {
        PlatformCode: "WEB",
        Name: "7a6a86e5-356f-4795-8998-305e1b205531",
      },
    })
    .then(({ data }) => data)
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
  return response.AuthorizationToken;
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
    .then(({ data }) => data)
    .catch((err) => {
      throw new Error(err);
    });
  return { entities: response.Entities };
}

export async function getMediaPlayInfo({ mediaId, streamType }) {
  const response = await api
    .post("/Media/GetMediaPlayInfo", {
      MediaId: mediaId,
      StreamType: streamType,
    })
    .then(({ data }) => data)
    .catch((err) => {
      throw new Error(err);
    });
  return response;
}
