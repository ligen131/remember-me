import request from "../request";
import { Relationship } from "@/type";

export default function getRelationship() {
  const whenFinish = request<Relationship>({
    url: "/people/relationship",
    method: "get",
  });

  return whenFinish;
}
