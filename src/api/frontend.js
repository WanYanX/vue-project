import service from "@/utils/request";

export const register = (data) => {
  return service.post("/user/add", data);
};

export const startSession = (data) => {
  return service.post("/psychological-chat/session/start", data);
};

export const getSessionList = (params) => {
  return service.get("/psychological-chat/sessions", { params });
};

export const deleteSession = (id) => {
  return service.delete(`/psychological-chat/sessions/${id}`);
};

export const getSessionDetail = (id) => {
  return service.get(`/psychological-chat/sessions/${id}/messages`);
};

export const addEmotionDiary = (data) => {
  return service.post("/emotion-diary", data);
};

export const getKnowledgeList = (params) => {
  return service.get("/knowledge/article/page", { params });
};

export const getKnowledgeDetail = (id) => {
  return service.get(`/knowledge/article/${id}`);
};
