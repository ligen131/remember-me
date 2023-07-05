import request from "../request";
import { PostRes, PostProps } from "@/type";

export default function newPost(data: PostProps) {
  const whenFinish = request<PostRes>({
    url: "/post",
    data,
    method: "post",
  });

  return whenFinish;
}
