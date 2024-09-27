"use client";

import React, { useState } from "react";
import Image from "next/image";
import "./login.css";
import { sendLoginRequest } from "@/services/login";
import Lobby from "../lobby/lobby";
import Loading from "../loading/loading";
import { jwtDecode } from "jwt-decode";

interface LoginProps {
  closeLoginModal: () => void;
}

function Login({ closeLoginModal }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openLobbyModal, setOpenLobbyModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleLogin() {
    setIsLoading(true);
    const data = await sendLoginRequest(email, password);
    if (data) {
      const decoded = jwtDecode(data.token);
      if (decoded.iss === `${process.env.NEXT_PUBLIC_ISSUER}`) {
        setIsLoading(false);
        setEmail("");
        setPassword("");
        setOpenLobbyModal(true);
      }
    }
    setIsLoading(false);
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
      {isLoading && <Loading />}
    </>
  );
}

export default Login;
