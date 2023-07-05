import request from "../request";
import { PostList } from "@/type";

export default function getPost() {
  const whenFinish = request<PostList>({
    url: "/post",
    method: "get",
  });

  return whenFinish;
}
