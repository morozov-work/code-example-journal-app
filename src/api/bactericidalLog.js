import { axios } from ".";

export function getResource(url, config = {}) {
  return axios.get(url, config);
}

export function getBactericidalLog(page = 1) {
  const config = {
    params: { page },
  };
  return axios.get("/api/bactericidal_logs", config);
}

export function getLamps(id = null) {
  const url = id ? `/api/lamps/${id}` : "/api/lamps";
  return axios.get(url);
}

export function getRooms(id = null) {
  const url = id ? `/api/rooms/${id}` : "/api/rooms";
  return axios.get(url);
}

export function getRoomIndastrials(id = null) {
  const url = id ? `/api/room_industrials/${id}` : "/api/room_industrials";
  return axios.get(url);
}

export function getDepartments(id = null) {
  const url = id ? `/api/departments/${id}` : "/api/departments";
  return axios.get(url);
}

export function getEmployees(id = null) {
  const url = id ? `/api/employees/${id}` : "/api/employees";
  return axios.get(url);
}

export function postBactericidalLog(data) {
  return axios.post("/api/bactericidal_logs", data);
}
