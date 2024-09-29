import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

export async function sendLoginRequest(
  email: string,
  password: string
): Promise<JwtPayload | string> {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/auth/login`,
      {
        email,
        password,
      }
    );
    const { token } = data;
    sessionStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      return error.response?.data.details;
    } else {
      console.error(error);
      return "Erro inesperado ao fazer login!";
    }
  }
}
