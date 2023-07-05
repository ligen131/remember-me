import request from "../request";
import { UploadToken } from "@/type";

export default function getUploadToken() {
  const whenFinish = request<UploadToken>({
    url: "/image/token",
    method: "get",
  });

  return whenFinish;
}
