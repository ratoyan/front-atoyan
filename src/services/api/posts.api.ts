import baseApi from "./baseApi";

export const postsApi = () => {
    return baseApi.get("/endpoint/react/data.json");
};
