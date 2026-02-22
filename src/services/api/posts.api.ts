import baseApi from "./baseApi";
import type {Post} from "../../types/post.ts";

export const postsApi = async (): Promise<Post[]> => {
    const { data } = await baseApi.get<Post[]>("/endpoint/react/data.json");
    return data;
};
