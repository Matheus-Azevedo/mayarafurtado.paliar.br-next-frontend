"use client";

import "./lobbyPatientRegistration.css";
import { use, useEffect, useState } from "react";
import { ArrowsClockwise, Info, Trash } from "@phosphor-icons/react";
import LobbyPatientDetail from "../lobbyPatientDetail/lobbyPatientDetail";
import Message from "../message/message";
import Loading from "../loading/loading";
import {
  createPatient,
  deletePatient,
  getPatients,
  Patient,
} from "@/services/patient";

interface PatientRegistrationProps {
  search: string;
}

function LobbyPatientRegistration({ search }: PatientRegistrationProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient>();
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPatients() {
      setIsLoading(true);
      const response = await getPatients();
      if (typeof response === "string") {
        setIsLoading(false);
        setMessage(response);
        setShowMessage(true);
        return;
      }
      setIsLoading(false);
      setPatients(response);
    }
    fetchPatients();
  }, []);

  async function handleRefresh() {
    setIsLoading(true);
    const response = await getPatients();
    if (typeof response === "string") {
      setMessage(response);
      setShowMessage(true);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setPatients(response);
  }

  function closeModal() {
    setShowModal(false);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target;
    const newPatient: Patient = {
      name: form.name.value,
      phone: form.tel.value,
      email: form.email.value,
      birthDate: form.date.value,
      cpf: form.cpf.value,
      address: form.address.value,
      district: form.district.value,
      city: form.city.value,
      state: form.state.value,
      zipCode: form.cep.value,
    };
    const message = await createPatient(newPatient);
    setIsLoading(false);
    setMessage(message);
    setShowMessage(true);
    form.reset();
  }

  async function handleDelete(id: string): Promise<void> {
    setIsLoading(true);
    const message = await deletePatient(id);
    setIsLoading(false);
    setMessage(message);
    setShowMessage(true);
  }

  return (
    <>
      <button
        onClick={handleRefresh}
        className="lobby-patient-registration-refresh-btn"
      >
        <ArrowsClockwise size={32} />
      </button>
      <section className="lobby-patient-registration-container-1">
        <section className="lobby-patient-registration-container-2">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nome"
              required
            />
            <input
              type="tel"
              id="tel"
              name="tel"
              placeholder="Telefone"
              required
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
            <input
              type="date"
              id="date"
              name="date"
              placeholder="Data de Nascimento"
              required
            />
            <input type="text" id="cpf" name="cpf" placeholder="CPF" />
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Endereço"
              required
            />
            <input
              type="text"
              id="district"
              name="district"
              placeholder="Bairro"
              required
            />
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Cidade"
              required
            />
            <input
              type="text"
              id="state"
              name="state"
              placeholder="Estado"
              required
            />
            <input type="text" id="cep" name="cep" placeholder="CEP" required />
            <button type="submit">Cadastrar</button>
          </form>
        </section>
        <section className="lobby-patient-registration-container-3">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Editar</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {patients &&
                patients
                  .filter((patient) => {
                    return (
                      patient.name
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      patient.phone.includes(search) ||
                      patient.email.toLowerCase().includes(search.toLowerCase())
                    );
                  })
                  .map((patient, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{patient.name}</td>
                      <td>{patient.phone}</td>
                      <td>
                        <button>
                          <Info
                            size={32}
                            onClick={() => {
                              setPatient(patient);
                              setShowModal(true);
                            }}
                          />
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            patient.id && handleDelete(patient.id);
                          }}
                        >
                          <Trash size={32} />
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </section>
      </section>
      {showModal && (
        <LobbyPatientDetail closeModal={closeModal} patient={patient} />
      )}
      {showMessage && (
        <Message closeModal={() => setShowMessage(false)} message={message} />
      )}
      {isLoading && <Loading />}
    </>
  );
}

export default LobbyPatientRegistration;
