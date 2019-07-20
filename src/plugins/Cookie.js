import Cookies from "js-cookie";

export function get(name) {
  return Cookies.get(name);
}

export function set(name, value) {
  Cookies.set(name, value);
}
