"use client";
import { useState } from "react";
import "./lobbyDepositions.css";
import Image from "next/image";
import { ChatCircleText, Trash } from "@phosphor-icons/react";
import DepositionContent from "../depositionContent/depositionContent";
import { deleteDeposition } from "@/services/depositions";

interface DepositionContentProps {
  search: string;
}

export interface Deposition {
  id?: string;
  photo: string;
  name: string;
  tel: string;
  content: string;
}

function LobbyDepositions({ search }: DepositionContentProps) {
  const [depositions, setDepositions] = useState<Deposition[]>([
    {
      photo: "/Exemplo.jpg",
      name: "Fulano",
      tel: "(83) 9 1234-5678",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      photo: "/Exemplo.jpg",
      name: "Cicrano",
      tel: "(83) 9 1234-5678",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      photo: "/Exemplo.jpg",
      name: "Beltrano",
      tel: "(83) 9 1234-5678",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ]);
  const [deposition, setDeposition] = useState<Deposition>();
  const [openDepositionContentModal, setOpenDepositionContentModal] =
    useState(false);

  function closeDepositionContentModal() {
    setOpenDepositionContentModal(false);
  }

  async function hanndleDelete(id: string) {
    const result = confirm("Você tem certeza deseja apagar?");
    if (result) {
      const status = await deleteDeposition(id);
      if (status === 200) {
        alert("Depoimento apagado com sucesso.");
        setDepositions(
          depositions.filter((deposition) => deposition.id !== id)
        );
      } else {
        alert("Não foi possível apagar o depoimento.");
      }
    }
  }

  return (
    <>
      <section className="lobby-deposition-container">
        <table className="lobby-deposition-table">
          <thead className="lobby-deposition-header">
            <tr>
              <th>#</th>
              <th>Foto</th>
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
                  deposition.tel.includes(search)
              )
              .map((deposition, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="lobby-deposition-content-image">
                    <Image
                      src={deposition.photo}
                      alt="Foto do depoente"
                      width={70}
                      height={70}
                    />
                  </td>
                  <td>{deposition.name}</td>
                  <td>{deposition.tel}</td>
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
                        deposition.id && hanndleDelete(deposition.id)
                      }
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
    </>
  );
}

export default LobbyDepositions;
