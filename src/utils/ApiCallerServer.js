import axios from "axios";
import * as Config from "../constants/Config";

export default function callApi(endpoint, method = "GET", body) {
  if (!localStorage.getItem("account")) {
    localStorage.setItem("account", JSON.stringify(""));
  }
  let account = JSON.parse(localStorage.getItem("account"));
  if (Object.keys(account).length === 0) {
    return axios({
      method: method,
      url: `${Config.API_URL}/${endpoint}`,
      data: body,
    }).catch((err) => {
      
    });
  } else {
    // axios.interceptors.request.use(
    //   (config) => {
    //     config.headers.authorization = `Bearer ${account.accessToken}`;
    //     return config;
    //   },
    //   (error) => {
    //     return Promise.reject(error);
    //   }
    // );
    // return axios({
    //   method: method,
    //   url: `${Config.API_URL}/${endpoint}`,
    //   data: body,
    // }).catch((err) => {
    //   
    // });

    const authAxios = axios.create({
      baseURL: Config.API_URL,
      headers: {
        Authorization: "Bearer " + account.accessToken,
      },
    });
    return authAxios({
      method: method,
      url: `${Config.API_URL}/${endpoint}`,
      data: body,
    }).catch((err) => {
      
    });
  }
}
