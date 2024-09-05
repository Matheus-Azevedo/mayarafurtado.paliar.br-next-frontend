"use client";
import { useState } from "react";
import LobbyDepositions from "../lobbyDepositions/lobbyDepositions";
import LobbyLanding from "../lobbyLanding/lobbyLanding";
import "./lobby.css";

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
              Depoimentos
            </button>
            <button
              className="lobby-button"
              onClick={() => setShowComponent(1)}
            >
              Landing
            </button>
          </div>
          <button className="close-button" onClick={closeLobbyModal}>
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
          {showComponent === 0 && <LobbyDepositions search={search} />}
          {showComponent === 1 && <LobbyLanding />}
        </section>
      </dialog>
    </>
  );
}

export default Lobby;
