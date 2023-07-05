import { UploadToken } from "@/type";
import * as qiniu from "qiniu-js";
import getUploadToken from "./getUploadToken";

export default async function uploadImg(file: File) {
  let data: UploadToken = { key: "", token: "", url: "" };
  await getUploadToken().then((res) => {
    if (!res) return;
    data = res;
  });

  if (!data) return;

  const observable = qiniu.upload(file, data.key, data.token, undefined, {
    useCdnDomain: true,
    region: qiniu.region.z0,
  });

  return new Promise<string | undefined>((resolve) => {
    observable.subscribe(
      undefined,
      (err) => {
        console.log(err);
        resolve(undefined);
      },
      () => {
        resolve(data.url);
      }
    );
  });
}
