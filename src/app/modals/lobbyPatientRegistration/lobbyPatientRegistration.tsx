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
import Confirm from "../confirm/confirm";

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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

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

  function handleChangePhone(event: any) {
    const phone = event.target.value;
    const phoneFormatted = phone
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    event.target.value = phoneFormatted;
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

  function openConfirmModal(id: string) {
    setIdToDelete(id); // Armazena o ID do depoimento a ser excluído
    setShowConfirmModal(true);
  }

  function closeConfirmModal() {
    setShowConfirmModal(false);
    setIdToDelete(null); // Limpa o ID ao fechar o modal
  }

  async function handleDelete(): Promise<void> {
    if (idToDelete) {
      setIsLoading(true);
      const message = await deletePatient(idToDelete);
      if (typeof message === "string") {
        setIsLoading(false);
        setMessage(message);
        setShowMessage(true);
        closeConfirmModal();
        return;
      }
    }
    setIsLoading(false);
    closeConfirmModal();
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
              onChange={handleChangePhone}
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
                            patient.id && openConfirmModal(patient.id);
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
      {showConfirmModal && (
        <Confirm
          closeModal={closeConfirmModal}
          confirmAction={handleDelete} // Passa a função de exclusão para o modal
          message="Tem certeza de que deseja excluir este cadastro?"
        />
      )}
    </>
  );
}

export default LobbyPatientRegistration;
