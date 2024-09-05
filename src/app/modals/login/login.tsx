"use client";

import React, { useState } from "react";
import Image from "next/image";
import "./login.css";
import { sendLoginRequest } from "@/services/login";
import Lobby from "../lobby/lobby";

interface LoginProps {
  closeLoginModal: () => void;
}

function Login({ closeLoginModal }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openLobbyModal, setOpenLobbyModal] = useState(false);

  function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleLogin() {
    // const data = await sendLoginRequest(email, password);
    // if (data) {
    //   console.log(data);
    //   setOpenLobbyModal(true);
    // }
    setOpenLobbyModal(true);
  }

  function closeLobbyModal() {
    setOpenLobbyModal(false);
  }

  return (
    <>
      <dialog className="login-modal">
        <div className="login-image">
          <Image src="/logo2.png" alt="logo" width={100} height={100} />
        </div>
        <input
          className="login-input"
          type="text"
          value={email}
          onChange={handleChangeEmail}
          placeholder="Email"
        />
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={handleChangePassword}
          placeholder="Senha"
        />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <button className="close-button" onClick={closeLoginModal}>
          Fechar
        </button>
      </dialog>
      {openLobbyModal && <Lobby closeLobbyModal={closeLobbyModal} />}
    </>
  );
}

export default Login;
