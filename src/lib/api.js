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

// export async function getAuthToken(values = {}) {
//   console.log(values);
//   const response = await loginApi
//     .post("/Authorization/SignIn", {
//       ...values,
//       Device: {
//         PlatformCode: "WEB",
//         Name: "7a6a86e5-356f-4795-8998-305e1b205531",
//       },
//     })
//     .then(({ data }) => data)
//     .catch((err) => {
//       throw new Error(err);
//     });
//   return response.AuthorizationToken;
// }

// export async function getMediaList(listId) {
//   const response = await api
//     .post("/Media/GetMediaList", {
//       MediaListId: listId,
//       IncludeCategories: false,
//       IncludeImages: true,
//       IncludeMedia: false,
//       PageNumber: 1,
//       PageSize: 15,
//     })
//     .then(({ data }) => data)
//     .catch((err) => {
//       throw new Error(err);
//     });
//   return { entities: response.Entities };
// }

// export async function getMediaPlayInfo(id, streamType) {
//   console.log(id);
//   const response = await api
//     .post("/Media/GetMediaPlayInfo", {
//       MediaId: id,
//       StreamType: "TRIAL",
//     })
//     .then(({ data }) => data)
//     .catch((err) => {
//       throw new Error(err);
//     });
//   console.log(response);
//   return response;
// }

// export async function getLoginToken({ email, password }) {
//   const response = await loginApi
//     .post("/Authorization/SignIn", {
//       Username: email,
//       Password: password,
//       Device: {
//         PlatformCode: "WEB",
//         Name: "7a6a86e5-356f-4795-8998-305e1b205531",
//       },
//     })
//     .then(({ data }) => data)
//     .catch((err) => {
//       console.error(err.message);
//     });
//   return response.AuthorizationToken.Token;
// }

//ENTERTOKEN
//Original
// export async function getPrimaryToken() {
//   const response = await loginApi
//     .post("/Authorization/SignIn", {
//       Device: {
//         PlatformCode: "WEB",
//         Name: "12345678-1234-1234-1234-123412345678",
//       },
//     })
//     .then(({ data }) => {
//       return data;
//     })
//     .catch((err) => {
//       console.error(err.message);
//     });

//   const data = await response.AuthorizationToken.Token;
//   return data;
// }

//Mocked
export async function getPrimaryToken() {
  const response = await Promise.resolve({
    data: {
      User: {
        Id: -999,
        UserName: "Anonymous",
        FullName: "Anonymous user",
        ClientRoles: [],
      },
      AuthorizationToken: {
        Token:
          "eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIn0._FpeIUpZhdIMjaYfA4elVFDUD1Gvk1Iog-0ZoExYDgvTQPeSiki8QA.8SB-4mBY7hMvpvei0_DLeg.JEmNsDTQxe65hKQ-LTeFIizP905QjR2_njMVhWZAppegvfGpnBG8CDAhLK-m4Xi_a9FPN9NieBKcSTXWCh1t5TQXmlivH6-QIiYS6l4Db-JTWNVf-XbZyXsl4UmbZAhGNqSWIlkW-M7qcNwsDYgHtI7l3easRyWxp3omcdAoktjilZ63U3j-99YjMddV-wziiBmsL8_fj0Yw52kBo2fb4hmCZHtGoWz8mpIxkrOs1v1Xe-4gboUs_4UVB3rUfvEbsBxM4aLbX5deKaUDrxFhyXuR1e3qY4G3QkxyDrWRktSgBQJv6C4QZ8n5ZQGrwNORXhLk-fkFGd4C0fSBHmbdadF7GNLi9T3rOlDyqtiT1sV7nvmA3WpQxM2aTLHNR0T_Kf51gRtkMBxWMPg3Uh-hpubhL3YIYqV9SUW5Dpj2OCo7-XUjhbLkFtzbMLo8GO_KxkrrfGNZ6IaS5jmOlMEEfcyu7-xQqB4yhq7uNwUItPJOFouNrXkOm2oDc27wOii5sCOFHCtN_C2Wq0pjt5qyGGiXBNdVj4BXz3WJaI_P3n0XoNayNVRY_bR8NZTgyojGAa6X7FM8f91229c3WtUtjwVSvrbqORlFmdFBWaDgVd6xygEXNtCwQniTbScS6Skr.oDQu3lKGR32j00YMN483EA",
        TokenExpires: "2022-01-12T15:13:42.2911479+00:00",
      },
    },
  })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error(err.message);
    });

  const data = await response.AuthorizationToken.Token;
  return data;
}

//LOGINTOKEN
export async function getLoginToken() {
  const response = await Promise.resolve({
    data: {
      User: {
        Id: 395,
        FullName: "Test User",
        Email: "test@bsgroup.eu",
        Initials: "TU",
        ClientRoles: [],
      },
      AuthorizationToken: {
        Token:
          "eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIn0._FpeIUpZhdIMjaYfA4elVFDUD1Gvk1Iog-0ZoExYDgvTQPeSiki8QA.8SB-4mBY7hMvpvei0_DLeg.JEmNsDTQxe65hKQ-LTeFIizP905QjR2_njMVhWZAppegvfGpnBG8CDAhLK-m4Xi_a9FPN9NieBKcSTXWCh1t5TQXmlivH6-QIiYS6l4Db-JTWNVf-XbZyXsl4UmbZAhGNqSWIlkW-M7qcNwsDYgHtI7l3easRyWxp3omcdAoktjilZ63U3j-99YjMddV-wziiBmsL8_fj0Yw52kBo2fb4hmCZHtGoWz8mpIxkrOs1v1Xe-4gboUs_4UVB3rUfvEbsBxM4aLbX5deKaUDrxFhyXuR1e3qY4G3QkxyDrWRktSgBQJv6C4QZ8n5ZQGrwNORXhLk-fkFGd4C0fSBHmbdadF7GNLi9T3rOlDyqtiT1sV7nvmA3WpQxM2aTLHNR0T_Kf51gRtkMBxWMPg3Uh-hpubhL3YIYqV9SUW5Dpj2OCo7-XUjhbLkFtzbMLo8GO_KxkrrfGNZ6IaS5jmOlMEEfcyu7-xQqB4yhq7uNwUItPJOFouNrXkOm2oDc27wOii5sCOFHCtN_C2Wq0pjt5qyGGiXBNdVj4BXz3WJaI_P3n0XoNayNVRY_bR8NZTgyojGAa6X7FM8f91229c3WtUtjwVSvrbqORlFmdFBWaDgVd6xygEXNtCwQniTbScS6Skr.oDQu3lKGR32j00YMN123RA",
        TokenExpires: "2022-01-12T21:51:42.869Z",
        RefreshToken: "string",
      },
    },
  })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error(err.message);
    });

  const data = await response.AuthorizationToken.Token;
  return data;
}

//MOCKING MEDIAINFO
export async function getMediaList(listId) {
  const response = await Promise.resolve({
    data: {
      CacheDataValidTo: "2022-01-12T15:31:13.8916898+00:00",
      SourceType: "MediaList",
      Entities: [
        {
          Id: 15,
          Guid: "6e6a86e5-356f-4795-8998-305e1b202536",
          MediaTypeCode: "VOD",
          MediaTypeDisplayName: "VOD",
          MediaAgeRestrictionValueMin: 16,
          MediaAgeRestrictionImageUrl:
            "https://pegi.info/sites/default/files/styles/medium/public/2017-03/pegi16.png",
          Title: "Top Gun \nMAVERICK",
          Description:
            "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is where he belongs, pushing \nthe envelope as a courageous test pilot and dodging\nthe advancement in rank that would ground him.",
          Year: 2015,
          Duration: 5040000,
          IsTrialContentAvailable: false,
          AvailableFrom: "2021-02-01T21:19:48+00:00",
          Images: [
            {
              Id: 16,
              MediaId: 15,
              PlatformCode: "ANY",
              ImageTypeCode: "COVER",
              Url: "https://d1n3vpqjhjvv6k.cloudfront.net:443/Asset/6e6a86e5356f47958998305e1b202536/Images/170c614505b540b988bbb81a7183f4bc",
              Width: 0,
              Height: 0,
            },
            {
              Id: 18,
              MediaId: 15,
              PlatformCode: "ANY",
              ImageTypeCode: "HIGHLIGHTS",
              Url: "https://d1n3vpqjhjvv6k.cloudfront.net:443/Asset/6e6a86e5356f47958998305e1b202536/Images/cfe375de54ee41558bd6ea93c344eb20",
              Width: 0,
              Height: 0,
            },
            {
              Id: 23,
              MediaId: 15,
              PlatformCode: "ANY",
              ImageTypeCode: "COVER",
              Url: "https://d1n3vpqjhjvv6k.cloudfront.net:443/Asset/6e6a86e5356f47958998305e1b202536/Images/c242eb3740494013890990066c506d08",
              Width: 0,
              Height: 0,
            },
            {
              Id: 24,
              MediaId: 15,
              PlatformCode: "ANY",
              ImageTypeCode: "FRAME",
              Url: "https://d1n3vpqjhjvv6k.cloudfront.net:443/Asset/6e6a86e5356f47958998305e1b202536/Images/fa18ca7c161344e6af1e4f3839b963f3",
              Width: 0,
              Height: 0,
            },
          ],
          Products: [
            {
              Id: 15,
            },
            {
              Id: 3156,
            },
            {
              Id: 3171,
            },
          ],
        },
        {
          Id: 17,
          Guid: "28151071-4c9d-4ed1-b71c-0c503965f82b",
          MediaTypeCode: "VOD",
          MediaTypeDisplayName: "VOD",
          MediaAgeRestrictionValueMin: 7,
          MediaAgeRestrictionImageUrl:
            "https://pegi.info/sites/default/files/styles/medium/public/2017-03/pegi7.png",
          Title: "Bumblebee",
          Description:
            "Quis commodo odio aenean sed adipiscing diam donec adipiscing tristique. Sed arcu non odio euismod lacinia at quis. Diam volutpat commodo sed egestas egestas. Pharetra sit amet aliquam id diam maecenas ultricies mi eget. Sed cras ornare arcu dui vivamus arcu. Enim sit amet venenatis urna cursus eget. At tempor commodo ullamcorper a.",
          Year: 2020,
          Duration: 4680000,
          IsTrialContentAvailable: false,
          AvailableFrom: "2020-05-19T18:22:07+00:00",
          Images: [
            {
              Id: 19,
              MediaId: 17,
              PlatformCode: "ANY",
              ImageTypeCode: "FRAME",
              Url: "https://d1n3vpqjhjvv6k.cloudfront.net:443/Asset/281510714c9d4ed1b71c0c503965f82b/Images/8b880e5cbc694dd3b0b175b2d0657495",
              Width: 0,
              Height: 0,
            },
            {
              Id: 25,
              MediaId: 17,
              PlatformCode: "ANY",
              ImageTypeCode: "COVER",
              Url: "https://d1n3vpqjhjvv6k.cloudfront.net:443/Asset/281510714c9d4ed1b71c0c503965f82b/Images/cca7babca20d48f89a9f2a92ba9c854a",
              Width: 0,
              Height: 0,
            },
            {
              Id: 26,
              MediaId: 17,
              PlatformCode: "ANY",
              ImageTypeCode: "HIGHLIGHTS",
              Url: "https://d1n3vpqjhjvv6k.cloudfront.net:443/Asset/281510714c9d4ed1b71c0c503965f82b/Images/d8dc38d73c8941768a82882dc4c4d23b",
              Width: 0,
              Height: 0,
            },
          ],
          Products: [
            {
              Id: 17,
            },
            {
              Id: 3171,
            },
            {
              Id: 3156,
            },
          ],
        },
        {
          Id: 7,
          Guid: "72d576b0-6f41-4607-a757-5f72370d771e",
          MediaTypeCode: "VOD",
          MediaTypeDisplayName: "VOD",
          MediaAgeRestrictionValueMin: 3,
          MediaAgeRestrictionImageUrl:
            "https://pegi.info/sites/default/files/styles/medium/public/2017-03/2000px-PEGI_3.svg_.png",
          Title: "Rally Racing",
          Description:
            "In est ante in nibh mauris cursus mattis molestie a. Turpis egestas maecenas pharetra convallis posuere morbi. Praesent tristique magna sit amet purus gravida quis blandit turpis. Etiam dignissim diam quis enim lobortis scelerisque.",
          Duration: 5280000,
          IsTrialContentAvailable: false,
          AvailableFrom: "2020-05-16T20:11:55+00:00",
          Images: [
            {
              Id: 8,
              MediaId: 7,
              PlatformCode: "ANY",
              ImageTypeCode: "FRAME",
              Url: "https://d1n3vpqjhjvv6k.cloudfront.net:443/Asset/72d576b06f414607a7575f72370d771e/Images/9f8cddabdb3e407bbb86d9b0c5d44067",
              Width: 0,
              Height: 0,
            },
            {
              Id: 20,
              MediaId: 7,
              PlatformCode: "ANY",
              ImageTypeCode: "HIGHLIGHTS",
              Url: "https://d1n3vpqjhjvv6k.cloudfront.net:443/Asset/72d576b06f414607a7575f72370d771e/Images/26cae5bb39e94ebf8ae99523c00b3662",
              Width: 0,
              Height: 0,
            },
          ],
          Products: [
            {
              Id: 7,
            },
            {
              Id: 3156,
            },
          ],
        },
        {
          Id: 11,
          Guid: "78a2aa1d-c6be-4188-8bb2-33efcc0b56a2",
          MediaTypeCode: "VOD",
          MediaTypeDisplayName: "VOD",
          MediaAgeRestrictionValueMin: 18,
          MediaAgeRestrictionImageUrl:
            "https://pegi.info/sites/default/files/styles/medium/public/2017-03/pegi18.png",
          Title: "Joker",
          Description:
            "Proin sagittis nisl rhoncus mattis rhoncus urna. Id ornare arcu odio ut sem. Cras sed felis eget velit aliquet. Adipiscing at in tellus integer feugiat scelerisque. Egestas erat imperdiet sed euismod nisi. In aliquam sem fringilla ut. Egestas purus viverra accumsan in nisl nisi scelerisque. Volutpat ac tincidunt vitae semper quis lectus nulla at volutpat. Vivamus arcu felis bibendum ut tristique et egestas quis. Maecenas pharetra convallis posuere morbi leo urna molestie. Vel pretium lectus quam id.",
          Year: 2019,
          Duration: 6240000,
          IsTrialContentAvailable: false,
          AvailableFrom: "2020-05-16T20:15:26+00:00",
          Images: [
            {
              Id: 12,
              MediaId: 11,
              PlatformCode: "ANY",
              ImageTypeCode: "COVER",
              Url: "https://d1n3vpqjhjvv6k.cloudfront.net:443/Asset/78a2aa1dc6be41888bb233efcc0b56a2/Images/cdb46ba47486416ab62505323e09b768",
              Width: 0,
              Height: 0,
            },
            {
              Id: 22,
              MediaId: 11,
              PlatformCode: "ANY",
              ImageTypeCode: "HIGHLIGHTS",
              Url: "https://d1n3vpqjhjvv6k.cloudfront.net:443/Asset/78a2aa1dc6be41888bb233efcc0b56a2/Images/562064e248b14ca59293bf62e8e4ea3e",
              Width: 0,
              Height: 0,
            },
            {
              Id: 27,
              MediaId: 11,
              PlatformCode: "ANY",
              ImageTypeCode: "FRAME",
              Url: "https://d1n3vpqjhjvv6k.cloudfront.net:443/Asset/78a2aa1dc6be41888bb233efcc0b56a2/Images/e51f6c8cb7324cf894a445a8c587610a",
              Width: 0,
              Height: 0,
            },
          ],
          Products: [
            {
              Id: 11,
            },
            {
              Id: 3156,
            },
            {
              Id: 3171,
            },
          ],
        },
        {
          Id: 3073,
          Guid: "f1163f60-db28-47e0-9e1d-32f82fc160ca",
          MediaTypeCode: "LIVE",
          MediaTypeDisplayName: "Na żywo",
          MediaAgeRestrictionValueMin: 7,
          MediaAgeRestrictionImageUrl:
            "https://pegi.info/sites/default/files/styles/medium/public/2017-03/pegi7.png",
          Title: "Mecz Paris Saint-Germain - Bayern Monachium",
          Description:
            "Piłkarze Bayernu Monachium triumfatorami Ligi Mistrzów. W finale w Lizbonie pokonali Paris Saint-Germain 1:0 (0:0) po golu Kingsleya Comana. W zwycięskiej drużynie całe spotkanie rozegrał Robert Lewandowski, który z 15 bramkami został królem strzelców rozgrywek.",
          Duration: 0,
          IsTrialContentAvailable: false,
          AvailableFrom: "2020-09-01T21:15:17+00:00",
          StartDateTime: "2020-09-01T21:15:17+00:00",
          Images: [
            {
              Id: 839,
              MediaId: 3073,
              PlatformCode: "ANY",
              ImageTypeCode: "FRAME",
              Url: "https://d1n3vpqjhjvv6k.cloudfront.net:443/Asset/f1163f60db2847e09e1d32f82fc160ca/Images/7ca429c77df242e2a7667f8579e9e578",
              Width: 0,
              Height: 0,
            },
          ],
          Products: [
            {
              Id: 3073,
            },
          ],
        },
      ],
      PageSize: 15,
      PageNumber: 1,
      TotalCount: 5,
    },
  })
    .then(({ data }) => data)
    .catch((err) => {
      throw new Error(err);
    });
  return { entities: response.Entities };
}

// MOCKING PLAYERINFO
export async function getMediaPlayInfo(id, streamType) {
  const response = await Promise.resolve({
    data: {
      MediaId: 17,
      Title: "Bumblebee",
      Description:
        "Quis commodo odio aenean sed adipiscing diam donec adipiscing tristique. Sed arcu non odio euismod lacinia at quis. Diam volutpat commodo sed egestas egestas. Pharetra sit amet aliquam id diam maecenas ultricies mi eget. Sed cras ornare arcu dui vivamus arcu. Enim sit amet venenatis urna cursus eget. At tempor commodo ullamcorper a.",
      MediaTypeCode: "VOD",
      MediaTypeDisplayName: "VOD",
      StreamId: 76,
      Provider: "Internal",
      ContentUrl:
        "https://cd-stream-od.telenorcdn.net/tnfbaod/SF/5c9dc369e4b0186f7bd726ca/hls_a1.ism/playlist.m3u8",
    },
  })
    .then(({ data }) => data)
    .catch((err) => {
      throw new Error(err);
    });
  return response;
}
