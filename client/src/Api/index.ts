import axios from "axios";
import { IUrl } from "./apiTypes";

export const endpoint = "http://127.0.0.1:4000/api";
const createApi = () =>
{
  const axiosInsance = axios.create({
    baseURL:endpoint,
    headers: {
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*"}
  });
  
  return {
    getUrls: async (): Promise<IUrl[]> => {
      const response = await axiosInsance.get("/urls");
      return response.data.urls
    },
    postUrl: async (url: IUrl): Promise<IUrl> => {
      try {
        const response =  await axiosInsance.post("/urls/add", {url: url})
        const responseUrl: IUrl = response.data
        responseUrl.tinyUrl = responseUrl.tinyUrl;
        return responseUrl
      } catch (error) {
        console.error("TODO", error);
        throw new Error("failed");
      }
    },
    deleteUrl: async (url: IUrl): Promise<IUrl[]> => {
      const response =  await axiosInsance.delete(`urls/delete/${url.id}`)
      return response.data.response
    }

  }
}

export type Api = ReturnType<typeof createApi>

export const api = createApi();
