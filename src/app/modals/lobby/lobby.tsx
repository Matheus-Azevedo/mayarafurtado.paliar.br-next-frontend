"use client";

interface LobbyProps {
  closeLobbyModal: () => void;
}

function Lobby({ closeLobbyModal }: LobbyProps) {
  return (
    <dialog className="lobby-modal">
      <h1>Lobby</h1>
      <button onClick={closeLobbyModal}>Close</button>
    </dialog>
  );
}

export default Lobby;
