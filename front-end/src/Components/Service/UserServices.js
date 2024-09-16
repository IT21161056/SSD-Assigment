// Define a constant variable for the base URL
// const BASE_URL = "https://localhost:443";

import { api } from ".";

const URL = "/user";

class userServices {
  getAllUsers() {
    return api.get(URL);
  }

  getUser(id) {
    return api.get(`${URL}/${id}`);
  }

  createUser(user) {
    return api.post(`${URL}`, user);
  }

  updateUser(id, user) {
    return api.put(`${URL}/${id}`, user);
  }

  // mew route
  getUserByEmail(email) {
    return api.put(`${URL}/user-by-email`, { email });
  }

  deleteUser(id) {
    return api.delete(`${URL}/${id}`);
  }

  login(loginTemplate) {
    return api.post("/auth", loginTemplate);
  }

  logout() {
    return api.post("/auth/logout");
  }
}

export default new userServices();
