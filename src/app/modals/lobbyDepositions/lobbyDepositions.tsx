"use client";
import { useEffect, useState } from "react";
import "./lobbyDepositions.css";
import { ArrowsClockwise, ChatCircleText, Trash } from "@phosphor-icons/react";
import DepositionContent from "../depositionContent/depositionContent";
import {
  deleteTestimonials,
  GetTestimonial,
  getTestimonials,
} from "@/services/testimonials";
import Loading from "../loading/loading";
import Message from "../message/message";
import Confirm from "../confirm/confirm"; // Importe o modal de confirmação

interface DepositionContentProps {
  search: string;
}

function LobbyDepositions({ search }: DepositionContentProps) {
  const [depositions, setDepositions] = useState<GetTestimonial[]>([]);
  const [deposition, setDeposition] = useState<GetTestimonial>();
  const [openDepositionContentModal, setOpenDepositionContentModal] =
    useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPatients() {
      setIsLoading(true);
      const response = await getTestimonials();
      if (typeof response === "string") {
        setIsLoading(false);
        setMessage(response);
        setShowMessage(true);
        return;
      }
      setIsLoading(false);
      setDepositions(response);
    }
    fetchPatients();
  }, []);

  async function handleRefresh() {
    setIsLoading(true);
    const response = await getTestimonials();
    if (typeof response === "string") {
      setMessage(response);
      setShowMessage(true);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setDepositions(response);
  }

  function closeDepositionContentModal() {
    setOpenDepositionContentModal(false);
  }

  const openConfirmModal = (id: string) => {
    setIdToDelete(id); // Armazena o ID do depoimento a ser excluído
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setIdToDelete(null); // Limpa o ID ao fechar o modal
  };

  async function handleDelete() {
    if (idToDelete) {
      setIsLoading(true);
      const response = await deleteTestimonials(idToDelete);
      if (typeof response === "string") {
        setIsLoading(false);
        setMessage(response);
        setShowMessage(true);
        closeConfirmModal();
        return;
      }
    }
    setIsLoading(false);
    closeConfirmModal(); // Fecha o modal após a ação
  }

  return (
    <>
      <section className="lobby-deposition-container">
        <button
          onClick={handleRefresh}
          className="lobby-deposition-refresh-btn"
        >
          <ArrowsClockwise size={32} />
        </button>
        <table className="lobby-deposition-table">
          <thead className="lobby-deposition-header">
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>TEL</th>
              <th>Depoimento</th>
              <th>Apagar</th>
            </tr>
          </thead>
          <tbody className="lobby-deposition-content">
            {depositions
              .filter(
                (deposition) =>
                  deposition.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  deposition.telephone.includes(search)
              )
              .map((deposition, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{deposition.name}</td>
                  <td>{deposition.telephone}</td>
                  <td>
                    <button
                      onClick={() => {
                        setOpenDepositionContentModal(true);
                        setDeposition(deposition);
                      }}
                    >
                      <ChatCircleText size={32} />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        deposition.id && openConfirmModal(deposition.id)
                      } // Abre o modal de confirmação
                    >
                      <Trash size={32} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
      {openDepositionContentModal && (
        <DepositionContent
          closeModal={closeDepositionContentModal}
          deposition={deposition}
        />
      )}
      {showMessage && (
        <Message closeModal={() => setShowMessage(false)} message={message} />
      )}
      {isLoading && <Loading />}
      {showConfirmModal && (
        <Confirm
          closeModal={closeConfirmModal}
          confirmAction={handleDelete} // Passa a função de exclusão para o modal
          message="Tem certeza de que deseja excluir este depoimento?"
        />
      )}
    </>
  );
}

export default LobbyDepositions;
