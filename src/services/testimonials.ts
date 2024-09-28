import axios from "axios";

export interface GetTestimonial {
  id?: string;
  photo: string;
  name: string;
  telephone: string;
  testimony: string;
}

export async function getTestimonials(): Promise<GetTestimonial[]> {
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
    return [];
  }
}
