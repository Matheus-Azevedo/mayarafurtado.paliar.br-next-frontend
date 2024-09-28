"use client";

import "./lobbyPatientScheduling.css";
import { useState } from "react";
import { CheckCircle, Clock, Trash } from "@phosphor-icons/react";
import LobbyPatientSchedule from "../lobbyPatientSchedule/lobbyPatientSchedule";
import { Patient } from "@/services/patient";

interface PatientRegistrationProps {
  search: string;
}

function LobbyPatientScheduling({ search }: PatientRegistrationProps) {
  const [patients, setPatients] = useState([
    {
      name: "Fulano",
      phone: "83991142701",
      email: "fulano@email.com",
      birthDate: "01/01/2021",
      cpf: "123.456.789-00",
      address: "Rua do Fulano",
      district: "Bairro do Fulano",
      city: "Cidade do Fulano",
      state: "Estado do Fulano",
      zipCode: "12345-678",
    },
    {
      name: "Ciclano",
      phone: "83991142702",
      email: "ciclano@email.com",
      birthDate: "02/02/2021",
      cpf: "123.456.789-01",
      address: "Rua do Ciclano",
      district: "Bairro do Ciclano",
      city: "Cidade do Ciclano",
      state: "Estado do Ciclano",
      zipCode: "12345-679",
    },
  ]);
  const [patient, setPatient] = useState<Patient>();
  const [showModal, setShowModal] = useState(false);

  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      <section className="lobby-patient-scheduling-container-1">
        <section className="lobby-patient-scheduling-container-3">
          <h1>Pacientes</h1>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Agendar</th>
              </tr>
            </thead>
            <tbody>
              {patients
                .filter((patient) => {
                  return (
                    patient.name.toLowerCase().includes(search.toLowerCase()) ||
                    patient.phone.includes(search) ||
                    patient.email.toLowerCase().includes(search.toLowerCase())
                  );
                })
                .map((patient, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{patient.name}</td>
                    <td>{patient.phone}</td>
                    <td>{patient.email}</td>
                    <td>
                      <button>
                        <Clock
                          size={32}
                          onClick={() => {
                            setPatient(patient);
                            setShowModal(true);
                          }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
        <section className="lobby-patient-scheduling-container-3">
          <h1>Agendamentos</h1>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Confirmar</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{patient.name}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.email}</td>
                  <td>
                    <button>
                      <CheckCircle size={32} />
                    </button>
                  </td>
                  <td>
                    <button>
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
        <LobbyPatientSchedule closeModal={closeModal} patient={patient} />
      )}
    </>
  );
}

export default LobbyPatientScheduling;
