import { axios } from ".";

export function getResource(url, config = {}) {
  return axios.get(url, config);
}

export function getBactericidalLogs(page = 1) {
  // при указании номера страницы получаем корс ошибку
  const config = {
    headers: {
      params: { page },
    },
  };
  return axios.get("/api/bactericidal_logs");
}
