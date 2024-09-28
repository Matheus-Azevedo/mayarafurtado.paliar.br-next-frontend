import axios from "axios";

export interface Patient {
  id?: string;
  name: string;
  phone: string;
  email: string;
  birthDate: string;
  cpf: string;
  address: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
}

export async function createPatient(newPatient: Patient): Promise<string> {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/patients/save`,
      newPatient,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return "Paciente cadastrado com sucesso!";
  } catch (error) {
    return "Erro ao cadastrar paciente!";
  }
}

export async function getPatients(): Promise<Patient[] | string> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/patients/findAll`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    if (!data) {
      return "Nenhum paciente encontrado!";
    }
    return data;
  } catch (error) {
    console.error(error);
    return "Erro ao buscar pacientes!";
  }
}

export async function deletePatient(id: string): Promise<string> {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/patients/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return "Paciente deletado com sucesso!";
  } catch (error) {
    console.error(error);
    return "Erro ao deletar paciente!";
  }
}

export async function updatePatient(
  id: string,
  patient: Patient
): Promise<string> {
  try {
    await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL_BASE}/patients/path/${id}`,
      patient,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return "Paciente atualizado com sucesso!";
  } catch (error) {
    console.error(error);
    return "Erro ao atualizar paciente!";
  }
}
