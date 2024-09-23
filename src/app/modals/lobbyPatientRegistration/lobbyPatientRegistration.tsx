"use client";

import "./lobbyPatientRegistration.css";
import { useState } from "react";
import { Info, Trash } from "@phosphor-icons/react";
import LobbyPatientDetail from "../lobbyPatientDetail/lobbyPatientDetail";

interface PatientRegistrationProps {
  search: string;
}

export interface Patient {
  name: string;
  tel: string;
  email: string;
  date: string;
  cpf: string;
  address: string;
  district: string;
  city: string;
  state: string;
  cep: string;
}

function LobbyPatientRegistration({ search }: PatientRegistrationProps) {
  const [patients, setPatients] = useState([
    {
      name: "Fulano",
      tel: "83991142701",
      email: "fulano@email.com",
      date: "01/01/2021",
      cpf: "123.456.789-00",
      address: "Rua do Fulano",
      district: "Bairro do Fulano",
      city: "Cidade do Fulano",
      state: "Estado do Fulano",
      cep: "12345-678",
    },
    {
      name: "Ciclano",
      tel: "83991142702",
      email: "ciclano@email.com",
      date: "02/02/2021",
      cpf: "123.456.789-01",
      address: "Rua do Ciclano",
      district: "Bairro do Ciclano",
      city: "Cidade do Ciclano",
      state: "Estado do Ciclano",
      cep: "12345-679",
    },
  ]);
  const [patient, setPatient] = useState<Patient>();
  const [showModal, setShowModal] = useState(false);

  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      <section className="lobby-patient-registration-container-1">
        <section className="lobby-patient-registration-container-2">
          <form>
            <input type="text" id="name" name="name" placeholder="Nome" />
            <input type="tel" id="tel" name="tel" placeholder="Telefone" />
            <input type="email" id="email" name="email" placeholder="Email" />
            <input
              type="date"
              id="date"
              name="date"
              placeholder="Data de Nascimento"
            />
            <input type="text" id="cpf" name="cpf" placeholder="CPF" />
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Endereço"
            />
            <input
              type="text"
              id="district"
              name="district"
              placeholder="Bairro"
            />
            <input type="text" id="city" name="city" placeholder="Cidade" />
            <input type="text" id="state" name="state" placeholder="Estado" />
            <input type="text" id="cep" name="cep" placeholder="CEP" />
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
                <th>Email</th>
                <th>Detalhes</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {patients
                .filter((patient) => {
                  return (
                    patient.name.toLowerCase().includes(search.toLowerCase()) ||
                    patient.tel.includes(search) ||
                    patient.email.toLowerCase().includes(search.toLowerCase())
                  );
                })
                .map((patient, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{patient.name}</td>
                    <td>{patient.tel}</td>
                    <td>{patient.email}</td>
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
        <LobbyPatientDetail closeModal={closeModal} patient={patient} />
      )}
    </>
  );
}

export default LobbyPatientRegistration;
