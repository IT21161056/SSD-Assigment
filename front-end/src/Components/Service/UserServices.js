// import axios from "axios";

// class userSevices{
//     getAllUsers(){
//         return axios.get("http://localhost:5000/user/");
//     }
//     getUser(id){
//         return axios.get(`http://localhost:5000/user/${id}`);
//     }
//     createUser(User){
//         return axios.post("http://localhost:5000/user/", User);
//     }
//     updateUser(id, User){
//         return axios.put(`http://localhost:5000/user/${id}`, User);
//     }
//     deleteUser(id){
//         return axios.delete(`http://localhost:5000/user/${id}`);
//     }
//     login(loginTemplate){
//         return axios.post("https://localhost:5000/user/login",loginTemplate);
//     }
// }
// export default new userSevices;

import axios from "axios";
import { BASE_URL } from "../../config"

// Define a constant variable for the base URL
// const BASE_URL = "https://localhost:443";

class UserServices {
  getAllUsers() {
    return axios.get(`${BASE_URL}/user/`);
  }
  getUser(id) {
    return axios.get(`${BASE_URL}/user/${id}`);
  }
  createUser(user) {
    return axios.post(`${BASE_URL}/user/`, user);
  }
  updateUser(id, user) {
    return axios.put(`${BASE_URL}/user/${id}`, user);
  }
  deleteUser(id) {
    return axios.delete(`${BASE_URL}/user/${id}`);
  }
  login(loginTemplate) {
    return axios.post(`${BASE_URL}/user/login`, loginTemplate);
  }
}

export default new UserServices();