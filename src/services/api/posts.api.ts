import baseApi from "./baseApi";
import type {Post} from "../../types/post.ts";
import type {AxiosResponse} from "axios";

export const postsApi = (): Promise<AxiosResponse<Post[]>> => {
    return baseApi.get<Post[]>("/endpoint/react/data.json");
};
