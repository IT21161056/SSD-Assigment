import axios from "axios";

const URL = "http://localhost:443/Lecture";

class LectureService {
  createLecture(lecture) {
    return axios.post(URL, lecture);
  }
  getAllLecturers() {
    return axios.get(URL);
  }
  deleteLecture(Id) {
    return axios.delete(`http://localhost:443/Lecture/${Id}`);
  }
  updateNotice(noticeId, notice) {
    return axios.put(URL + "/" + noticeId);
  }
  getLectureById(id) {
    return axios.get(`http://localhost:443/Lecture/${id}`);
  }
}
export default new LectureService();
