import { api } from ".";

const URL = "/notice";

class NoticeService {
  createNotice(notice) {
    return api.post(URL, notice);
  }
  getAllNotices() {
    return api.get(URL).then((res) => res.data);
  }
  deleteNotice(noticeId) {
    return api.delete(URL + "/" + noticeId);
  }
  updateNotice(noticeId, notice) {
    return api.put(URL + "/" + noticeId, notice);
  }
  getNoticeById(_id) {
    return api.get(URL + "/" + _id).then((resopnse) => resopnse.data);
  }
}
export default new NoticeService();
