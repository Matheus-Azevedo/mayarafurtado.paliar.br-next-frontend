"use client";
import { useState } from "react";
import LobbyDepositions from "../lobbyDepositions/lobbyDepositions";
import "./lobby.css";
import LobbyReactivationControl from "../lobbyReactivationControl/lobbyReactivationControl";
import LobbyPatientRegistration from "../lobbyPatientRegistration/lobbyPatientRegistration";
import LobbyPatientScheduling from "../lobbyPatientScheduling/lobbyPatientScheduling";

interface LobbyProps {
  closeLobbyModal: () => void;
}

function Lobby({ closeLobbyModal }: LobbyProps) {
  const [showComponent, setShowComponent] = useState(0);
  const [search, setSearch] = useState("");

  function handleChangeSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  return (
    <>
      <dialog className="lobby-modal">
        <section className="lobby-container-1">
          <div>
            <button
              className="lobby-button"
              onClick={() => setShowComponent(0)}
            >
              Cadastro
            </button>
            <button
              className="lobby-button"
              onClick={() => setShowComponent(1)}
            >
              Agendamento
            </button>
            <button
              className="lobby-button"
              onClick={() => setShowComponent(2)}
            >
              Controle de Reativação
            </button>
            <button
              className="lobby-button"
              onClick={() => setShowComponent(3)}
            >
              Depoimentos
            </button>
          </div>
          <button className="lobby-close-button" onClick={closeLobbyModal}>
            Logout
          </button>
        </section>
        <section className="lobby-container-2">
          <div className="lobby-input-search-container">
            <input
              className="lobby-input-search"
              type="text"
              value={search}
              onChange={handleChangeSearch}
              placeholder="Search"
            />
          </div>
          {showComponent === 0 && <LobbyPatientRegistration search={search} />}
          {showComponent === 1 && <LobbyPatientScheduling search={search} />}
          {showComponent === 2 && <LobbyReactivationControl search={search} />}
          {showComponent === 3 && <LobbyDepositions search={search} />}
        </section>
      </dialog>
    </>
  );
}

export default Lobby;
