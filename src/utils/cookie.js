export function getCookie(name) {
  const cookieArr = document.cookie.split(";");

  let targetCookieValue;
  cookieArr.forEach((cookie) => {
    const targetCookieArr = cookie.split("=");
    targetCookieArr[0].trim() === name
      ? (targetCookieValue = targetCookieArr[1])
      : null;
  });

  return targetCookieValue;
}

export function setCookie(name, value) {
  document.cookie = name + "=" + value;
}

export function deleteCookie(name) {
  document.cookie = `${name}=; max-age=-1`;
}
