import axios from "axios";
import * as Config from "../constants/Config";

export default function callApi (endpoint, method = "GET", body) {
  return axios({
    method: method,
    url: `${Config.API_URL}/${endpoint}`,
    // url:"`https://cinema-nestjs.herokuapp.com/${endpoint}'",
    data: body,
    headers: {"Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vdmllbWFuYWdlckBnbWFpbC5jb20iLCJyb2xlTmFtZSI6Ik1vdmllIE1hbmFnZXIiLCJpYXQiOjE2MTk0MjY5NTgsImV4cCI6MTYxOTQ2Mjk1OH0.i4dwkx2xrDDFN1dG5-DdoCX5Z5kIoISKGhjSwnmAn4A"}
  }).catch(err => {
    console.log("err", err.message);
  });
}