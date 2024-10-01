import axios from "axios";

export interface CreateScheduling {
  id?: string;
  patientId: string;
  scheduled: string;
  role?: string;
}

export async function createScheduling(
  scheduling: CreateScheduling
): Promise<string> {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/scheduling/save`,
      scheduling,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return "Agendamento realizado com sucesso!";
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      return error.response?.data.details;
    } else {
      console.error(error);
      return "Erro inesperado ao realizar agendamento!";
    }
  }
}

export interface GetScheduling {
  id: string;
  scheduled: string;
  attended: boolean;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  scheduledFormatted: string;
  role: string;
  roleTranslated: string;
}

export async function getScheduling(): Promise<GetScheduling[] | string> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/scheduling/findAll`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    const dataFormatted = data.map((scheduling: any) => {
      const [year, month, day] = scheduling.scheduled; // Extraindo o ano, mês e dia

      // Formatando a data como DD/MM/YYYY
      const formattedDate = `${day < 10 ? "0" + day : day}/${
        month < 10 ? "0" + month : month
      }/${year}`;

      const roleTranslated =
        scheduling.role === "evaluation" ? "Avaliação" : "Sessão";

      return {
        ...scheduling,
        roleTranslated, // Adicionando a role formatada ao objeto
        scheduledFormatted: formattedDate, // Adicionando a data formatada ao objeto
      };
    });
    return dataFormatted;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      return error.response?.data.details;
    } else {
      console.error(error);
      return "Erro inesperado ao buscar agendamentos!";
    }
  }
}

export async function deleteScheduling(id: string): Promise<string> {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/scheduling/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return "Agendamento deletado com sucesso!";
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      return error.response?.data.details;
    } else {
      console.error(error);
      return "Erro inesperado ao deletar agendamento!";
    }
  }
}

export interface UpdateScheduling {
  scheduled: string;
  attended: boolean;
}

export async function updateScheduling(
  id: string,
  updatingSchedule: UpdateScheduling
): Promise<string> {
  try {
    await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/scheduling/path/${id}`,
      updatingSchedule,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return "Agendamento atualizado com sucesso!";
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      return error.response?.data.details;
    } else {
      console.error(error);
      return "Erro inesperado ao atualizar agendamento!";
    }
  }
}

export interface SchedulingCalendar {
  [date: string]: string;
}

export async function getSchedulingCalendar(): Promise<
  SchedulingCalendar | string
> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/scheduling/available-times/month`,
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
      return "Erro inesperado ao buscar agendamentos!";
    }
  }
}
