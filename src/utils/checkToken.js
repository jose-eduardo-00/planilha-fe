import api from "../services/api/auth/index";
import { useAuthStore } from "../store/index";

export default async function handleCheckToken(token) {
  if (!token) return false;

  const auth = useAuthStore();

  try {
    const res = await api.checkToken(token);
    if (res.status === 200) {
      return true;
    } else {
      auth.logout();
      return false;
    }
  } catch (error) {
    auth.logout();
    return false;
  }
}
