import axios from "axios";
import { api } from ".";

const URL = "http://localhost:5000/Lecture";

class LectureService {
  createLecture(lecture) {
    return api.post("/Lecture", lecture);
  }
  getAllLecturers() {
    return api.get(`/Lecture`);
  }
  deleteLecture(Id) {
    return api.delete(`/Lecture/${Id}`);
  }

  updateNotice(noticeId, notice) {
    return api.put(URL + "/" + noticeId);
  }

  getLectureById(id) {
    return api.get(`/Lecture/${id}`);
  }
}
export default new LectureService();
