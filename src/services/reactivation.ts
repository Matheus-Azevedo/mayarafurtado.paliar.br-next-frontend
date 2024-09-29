import axios from "axios";

export interface Reactivation {
  id?: string;
  lastService: string;
  classification: string;
  reactivateIn: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientPhoneFormatted?: string;
}

export async function getReactivation(): Promise<Reactivation[] | string> {
  try {
    const { data }: { data: Reactivation[] } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/reactivations/findAll`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    const dataFormatted = data.map((reactivation) => ({
      ...reactivation,
      classification:
        reactivation.classification === "HOT"
          ? "Quente"
          : reactivation.classification === "QUIET"
          ? "Quieto"
          : reactivation.classification === "COLD"
          ? "Gelado"
          : "",
      patientPhoneFormatted:
        "55" + reactivation.patientPhone.replace(/\D/g, ""),
    }));
    return dataFormatted;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      return error.response?.data.details;
    } else {
      console.error(error);
      return "Erro inesperado ao buscar reativações!";
    }
  }
}
