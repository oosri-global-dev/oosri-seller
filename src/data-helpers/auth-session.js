// Created by: Aremu Olayinka Abayomi
// Helper site: https://www.tabnine.com/academy/javascript/how-to-set-cookies-javascript/

export function storeDataInCookie(cName, cValue, expDays) {
  if (typeof window !== "undefined") {
    const date = new Date();
    date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    window.document.cookie =
      cName +
      "=" +
      encodeURIComponent(cValue) +
      "; " +
      expires +
      "; path=/; SameSite=Lax" +
      secure;
  }
}

export function getDataInCookie(cName) {
  if (typeof window !== "undefined") {
    const name = cName + "=";
    const cDecoded = window.document.cookie;
    const cArr = cDecoded.split("; ");
    let res;
    cArr.forEach((val) => {
      if (val.indexOf(name) === 0) res = decodeURIComponent(val.substring(name.length));
    });
    return res;
  }
}

export function deleteDataInCookie(cName) {
  if (typeof window !== "undefined") {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${cName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax${secure}`;
  }
}

export function deleteAllCookie() {
  if (typeof window !== "undefined") {
    document.cookie = "_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    deleteDataInCookie("access_token__seller");
  }
}
