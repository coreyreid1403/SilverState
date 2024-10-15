import { setCookie, getCookie, hasCookie, deleteCookie, getCookies } from "cookies-next";

export class CookieManager{

    /**
    * Sets a cookie
    */
  public setCookie(key: string, value: any) {
    setCookie(key, value);
  }

    /**
    * Gets cookie by key
    * @returns if can sign up
    */
  public getCookie(key: string) {
    return getCookie(key);
  }

    /**
    * checks if cookie exists
    * @returns if exists
    */
  public hasCookie(key: string) {
    return hasCookie(key); // => true
  }

    /**
    * Deletes cookie by key
    * @returns 
    */
  public deleteCookie(key: string) {
    deleteCookie(key);
  }

    /**
    * Gets all cookies
    * @returns All cookies
    */
  public getAllCookies() {
    return getCookies(); 
  }

}