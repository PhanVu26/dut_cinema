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
      console.log(err);
    });
  } else {
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
      console.log(err);
    });
  }
}
