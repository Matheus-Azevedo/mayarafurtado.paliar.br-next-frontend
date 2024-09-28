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
  telephone: string;
  testimony: string;
}

export async function createDeposition(
  deposition: Deposition
): Promise<string> {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/testimonials/save`,
      deposition
    );
    return "Depoimento enviado com sucesso!";
  } catch (error) {
    console.error(error);
    return "Erro ao enviar depoimento.";
  }
}
