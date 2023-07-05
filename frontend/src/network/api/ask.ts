import request from "../request";
import { Answer } from "@/type";

export default function ask(prompt: string) {
  const whenFinish = request<Answer>({
    url: `/ask?prompt=${prompt}`,
    method: "get",
  });

  return whenFinish;
}
