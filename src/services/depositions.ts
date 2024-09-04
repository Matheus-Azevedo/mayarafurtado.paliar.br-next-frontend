import axios from "axios";

interface DeleteDepositionsResponse {
  message: string;
  status: number;
}

export async function deleteDeposition(
  id: string
): Promise<DeleteDepositionsResponse | undefined> {
  try {
    const { data } = await axios.post(
      `http://localhost:3000/depositions/${id}`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}
