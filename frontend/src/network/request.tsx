import axios, { AxiosError, AxiosRequestConfig } from "axios";

const baseURL = "https://api.hust.online/remember-me/api/v1";

const requestSet = new Set<string>();

async function request<T>(config: AxiosRequestConfig) {
  const key =
    JSON.stringify(config.data) + config.url! + JSON.stringify(config.params);

  if (requestSet.has(key)) {
  } else {
    const instance = axios.create({
      baseURL,
      timeout: 60000,
    });

    instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (err) => {
        console.error(err);
        return err;
      }
    );

    let whenFinish = new Promise<T>((resolve) => {
      let data: T | undefined;
      instance(config)
        .then((res) => {
          console.log(res);
          const { data: _data } = res.data;
          data = _data;
        })
        .catch((err) => {
          let errStr = "";
          if ((err as AxiosError).response) {
            if (err.response.status === 401) {
              errStr = "no login";
            } else errStr = err.message;
          } else if ((err as Error) instanceof Error) {
            errStr = err.message;
          } else if (typeof err === "string") {
            errStr = err;
          } else {
            errStr = "unknown error";
          }
          console.error(errStr);
        })
        .finally(() => {
          requestSet.delete(key);
          resolve(data!);
        });
    });

    return whenFinish;
  }
  return Promise.resolve();
}

export default request;
