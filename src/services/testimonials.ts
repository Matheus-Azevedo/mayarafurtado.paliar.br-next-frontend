import axios from "axios";

export interface GetTestimonial {
  id?: string;
  photo: string;
  name: string;
  telephone: string;
  testimony: string;
}

export async function getTestimonials(): Promise<GetTestimonial[] | string> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/testimonials/findAll`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      return error.response?.data.details;
    } else {
      console.error(error);
      return "Erro inesperado ao buscar depoimentos.";
    }
  }
}

export async function deleteTestimonials(id: string): Promise<string> {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/testimonials/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return "Depoimento deletado com sucesso!";
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      return error.response?.data.details;
    } else {
      console.error(error);
      return "Erro inesperado ao deletar depoimento.";
    }
  }
}

export interface CreateTestimonials {
  name: string;
  telephone: string;
  testimony: string;
}

export async function createTestimonials(
  deposition: CreateTestimonials
): Promise<string> {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/testimonials/save`,
      deposition
    );
    return "Depoimento enviado com sucesso!";
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      return error.response?.data.details;
    } else {
      console.error(error);
      return "Erro inesperado ao enviar depoimento.";
    }
  }
}
