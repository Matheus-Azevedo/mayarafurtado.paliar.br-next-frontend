"use client";

import Link from "next/link";
import "./home.css";
import Login from "../../modals/login/login";
import { useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";

function Home() {
  const [openLoginModal, setLoginModal] = useState(false);

  function closeLoginModal() {
    setLoginModal(false);
  }

  return (
    <>
      <main className="home-container-1">
        <div className="home-container-2">
          <div className="identity">
            <button onClick={() => setLoginModal(true)}>
              <h1>Mayara Furtado.</h1>
            </button>
            <p>
              GERONTOLOGIA E PALIATIVISMO
              <br />
              CREFITO: 217440-F
            </p>
          </div>
          <nav>
            <Link href="#biography" scroll={true}>
              <button>Biografia</button>
            </Link>
            <Link href="#clinic" scroll={true}>
              <button>Serviços</button>
            </Link>
            <Link href="#depositions" scroll={true}>
              <button>Depoimentos</button>
            </Link>
            <Link href="#contacts" scroll={true}>
              <button>Contato</button>
            </Link>
          </nav>
        </div>
        <div className="home-container-3">
          <div className="home-photo-container">
            <div className="home-photo" />
          </div>
          <div className="home-content">
            <h1>
              Alcance uma vida <strong className="brown-paliar">plena</strong> e{" "}
              <strong className="brown-paliar">funcional</strong>
            </h1>
            <p>
              Fisioterapeuta especializada em idosos com doença crônica
              proporcionando cuidado integral, <br />
              em
              <strong className="green-paliar"> consultório </strong>e
              <strong className="green-paliar"> domicílio</strong>.
            </p>
            <Link
              className="home-content-button"
              href="https://api.whatsapp.com/send?phone=5583991142751&amp;text=Olá, gostaria de agendar um consulta."
            >
              <WhatsappLogo className="home-content-image" size={42} />
              <button>AGENDE SUA CONSULTA!</button>
            </Link>
          </div>
        </div>
      </main>
      {openLoginModal && <Login closeLoginModal={closeLoginModal} />}
    </>
  );
}

export default Home;
