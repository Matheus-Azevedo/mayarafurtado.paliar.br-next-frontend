"use client";
import { WhatsappLogo } from "@phosphor-icons/react";
import "./lobbyReactivationControl.css";
import { useState } from "react";
import Link from "next/link";

interface ReactivationControlProps {
  search: string;
}

interface Patient {
  name: string;
  lastAttendance: string;
  rating: string;
  reactivation: string;
  tel: string;
}

function LobbyReactivationControl({ search }: ReactivationControlProps) {
  const [patients, setPatients] = useState<Patient[]>([
    {
      name: "Fulano",
      lastAttendance: "01/01/2021",
      rating: "Quente",
      reactivation: "01/01/2022",
      tel: "83991142701",
    },
    {
      name: "Cicrano",
      lastAttendance: "01/01/2021",
      rating: "Quieto",
      reactivation: "01/01/2022",
      tel: "83991142702",
    },
    {
      name: "Beltrano",
      lastAttendance: "01/01/2021",
      rating: "Gelado",
      reactivation: "01/01/2022",
      tel: "83991142703",
    },
  ]);

  return (
    <section className="lobby-reactivation-control-container-1">
      <section className="lobby-reactivation-control-container-2">
        <table className="lobby-reactivation-control-table">
          <thead className="lobby-reactivation-control-header">
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Ultimo Atendimento</th>
              <th>Classificação</th>
              <th>Reativar em</th>
              <th>Contato</th>
            </tr>
          </thead>
          <tbody className="lobby-reactivation-control-content">
            {patients
              .filter(
                (patient) =>
                  patient.name.toLowerCase().includes(search.toLowerCase()) ||
                  patient.rating.includes(search)
              )
              .map((patient, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td>{patient.name}</td>
                  <td>{patient.lastAttendance}</td>
                  <td>{patient.rating}</td>
                  <td>{patient.reactivation}</td>
                  <td>
                    <Link
                      className="lobby-reactivation-control-whatsapp-container"
                      target="_blank"
                      href={`https://api.whatsapp.com/send?phone=${patient.tel}&amp;text=Olá, gostaria de agendar um consulta?`}
                    >
                      <WhatsappLogo
                        className="lobby-reactivation-control-whatsapp-image"
                        size={32}
                      />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </section>
  );
}

export default LobbyReactivationControl;
