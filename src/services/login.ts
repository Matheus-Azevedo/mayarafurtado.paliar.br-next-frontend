import axios from "axios";

interface LoginResponse {
  token: string;
}

export async function sendLoginRequest(
  email: string,
  password: string
): Promise<LoginResponse | undefined> {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/auth/login`,
      {
        email,
        password,
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}
