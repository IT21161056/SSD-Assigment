// Define a constant variable for the base URL
// const BASE_URL = "https://localhost:443";

import { api } from ".";

class userServices {
  getAllUsers() {
    return api.get("/user/");
  }

  getUser(id) {
    return api.get(`/user/${id}`);
  }

  createUser(user) {
    return api.post("/user/", user);
  }

  updateUser(id, user) {
    return api.put(`/user/${id}`, user);
  }

  deleteUser(id) {
    return api.delete(`/user/${id}`);
  }

  login(loginTemplate) {
    return api.post("/auth", loginTemplate);
  }

  logout() {
    return api.post("/auth/logout");
  }
}

export default new userServices();
