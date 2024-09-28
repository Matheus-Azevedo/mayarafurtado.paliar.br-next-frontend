"use client";
import { ArrowsClockwise, WhatsappLogo } from "@phosphor-icons/react";
import "./lobbyReactivationControl.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "../loading/loading";
import Message from "../message/message";
import { getReactivation, Reactivation } from "@/services/reactivation";

interface ReactivationControlProps {
  search: string;
}

function LobbyReactivationControl({ search }: ReactivationControlProps) {
  const [reactivation, setReactivation] = useState<Reactivation[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPatients() {
      setIsLoading(true);
      const response = await getReactivation();
      if (typeof response === "string") {
        setIsLoading(false);
        setMessage(response);
        setShowMessage(true);
        return;
      }
      setIsLoading(false);
      setReactivation(response);
    }
    fetchPatients();
  }, []);

  async function handleRefresh() {
    setIsLoading(true);
    const response = await getReactivation();
    if (typeof response === "string") {
      setMessage(response);
      setShowMessage(true);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setReactivation(response);
  }

  return (
    <>
      <section className="lobby-reactivation-control-container-1">
        <section className="lobby-reactivation-control-container-2">
          <button
            onClick={handleRefresh}
            className="lobby-reactivation-control-refresh-btn"
          >
            <ArrowsClockwise size={32} />
          </button>
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
              {reactivation &&
                reactivation
                  .filter(
                    (reactivation) =>
                      reactivation.patientName
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      reactivation.classification.includes(search)
                  )
                  .map((reactivation, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>

                      <td>{reactivation.patientName}</td>
                      <td>{reactivation.lastService.split("T")[0]}</td>
                      <td>{reactivation.classification}</td>
                      <td>{reactivation.reactivateIn}</td>
                      <td>
                        <Link
                          className="lobby-reactivation-control-whatsapp-container"
                          target="_blank"
                          href={`https://api.whatsapp.com/send?phone=${reactivation.patientPhoneFormatted}&amp;text=Olá, gostaria de agendar um consulta?`}
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
      {showMessage && (
        <Message closeModal={() => setShowMessage(false)} message={message} />
      )}
      {isLoading && <Loading />}
    </>
  );
}

export default LobbyReactivationControl;
