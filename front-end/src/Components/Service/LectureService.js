import axios from "axios";
import { api } from ".";

const URL = "/Lecture";

class LectureService {
  createLecture(lecture) {
    return api.post(URL, lecture);
  }
  getAllLecturers() {
    return api.get(URL);
  }
  deleteLecture(Id) {
    return axios.delete(`${URL}/${Id}`);
  }

  updateNotice(noticeId, notice) {
    return api.put(URL + "/" + noticeId);
  }

  getLectureById(id) {
    return axios.get(`${URL}/${id}`);
  }
}
export default new LectureService();
