import { API_URL } from "./endpoints";
import { useAuth } from "../context/authContext";

let accessToken: string | null = null;

export const getAccessToken = () => accessToken;
export const setAccessToken = (t: string) => {
  accessToken = t;
};


export function useAuthFetch() {
  const { token, setUserAndToken } = useAuth();

  return async function authFetch(
    url: string,
    options: RequestInit = {}
  ) {
    let res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
    });

    if (res.status !== 401) return res;

    // refresh
    const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!refreshRes.ok) {
      throw new Error("Session expired");
    }

    const { accessToken, user } = await refreshRes.json();
    setUserAndToken(user, accessToken);

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });
  };
}