"use client";

import { useState } from "react";
import "./depositions.css";
import Carousel from "@/app/shared/swiper/swiper";
import CreateDeposition from "@/app/modals/createDeposition/createDeposition";
import Link from "next/link";
import LinkWhatsApp from "@/app/shared/linkWhatsapp/linkWhatsapp";

function Depositions() {
  const [history, setHistory] = useState([
    {
      photo: "/Exemplo.jpg",
      name: "Fulano de Tal",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      photo: "/Exemplo.jpg",
      name: "Cicrano de Tal",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      photo: "/Exemplo.jpg",
      name: "Beltrano de Tal",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ]);
  const [openCreateDepositionModal, setOpenCreateDepositionModal] =
    useState(false);

  function closeCreateDepositionModal() {
    setOpenCreateDepositionModal(false);
  }

  return (
    <>
      <main className="depositions-container-1">
        <Carousel histories={history} />
        <button
          className="depositions-button"
          onClick={() => setOpenCreateDepositionModal(true)}
        >
          Escrever Depoimento
        </button>
        <div className="depositions-container-2">
          <LinkWhatsApp />
        </div>
      </main>
      {openCreateDepositionModal && (
        <CreateDeposition closeModal={closeCreateDepositionModal} />
      )}
    </>
  );
}

export default Depositions;
