import axios from "axios";

export async function deleteDeposition(
  id: string
): Promise<number | undefined> {
  try {
    const { status } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/depositions/${id}`
    );
    return status;
  } catch (error) {
    console.error(error);
  }
}

export interface Deposition {
  name: string;
  phone: string;
  content: string;
  file: any;
}

export async function createDeposition(
  deposition: Deposition
): Promise<number | undefined> {
  try {
    const { status } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/depositions`,
      {
        ...deposition,
      }
    );
    return status;
  } catch (error) {
    console.error(error);
  }
}
