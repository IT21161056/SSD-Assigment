import axios from "axios";
import { api } from ".";

const URL = "http://localhost:443/Lecture";

class LectureService {
  createLecture(lecture) {
    return api.post("/Lecture", lecture);
  }
  getAllLecturers() {
    return api.get(`/Lecture`);
  }
  deleteLecture(Id) {
    return axios.delete(`http://localhost:443/Lecture/${Id}`);
  }

  updateNotice(noticeId, notice) {
    return api.put(URL + "/" + noticeId);
  }

  getLectureById(id) {
    return axios.get(`http://localhost:443/Lecture/${id}`);
  }
}
export default new LectureService();
