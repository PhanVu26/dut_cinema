import axios from "axios";

const API_URL = "https://cinema-nestjs.herokuapp.com";

export default function callApi(endpoint, method = "GET", body) {
  if (!localStorage.getItem("account")) {
    localStorage.setItem("account", JSON.stringify(""));
  }
  let account = JSON.parse(localStorage.getItem("account"));
  if (Object.keys(account).length === 0) {
    return axios({
      method: method,
      url: `${API_URL}/${endpoint}`,
      data: body,
    }).catch((err) => {
      console.log(err);
    });
  } else {
    const authAxios = axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: account.accessToken,
      },
    });
    return authAxios({
      method: method,
      url: `${API_URL}/${endpoint}`,
      data: body,
    }).catch((err) => {
      console.log(err);
    });
  }
}
