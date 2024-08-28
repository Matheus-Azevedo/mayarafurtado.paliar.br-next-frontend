import "./home.css";

function Home() {
  return (
    <main className="home-container-1">
      <div className="home-container-2">
        <div className="identity">
          <h1>Mayara Furtado.</h1>
          <p>
            GERONTOLOGIA E PALIATIVISMO
            <br />
            CREFITO: 217440-F
          </p>
        </div>
        <nav>
          <button>Biografia</button>
          <button>Clínica</button>
          <button>Depoimentos</button>
          <button>Contato</button>
        </nav>
      </div>
      <div className="home-container-3">
        <div className="home-photo"></div>
        <div className="home-content">
          <h1>
            Me chamo
            <strong className="brown-paliar"> Mayara Furtado,</strong>
            <br />
            Fisioterapeuta{" "}
            <strong className="brown-paliar">Gerontóloga,</strong>
            <br />
            com foco em
            <strong className="brown-paliar">reabilitação funcional</strong>
            <br />e <strong className="brown-paliar">doenças crônicas.</strong>
          </h1>
          <p>Proporcionando cuidado integral ao idoso com dedicação e amor.</p>
        </div>
      </div>
    </main>
  );
}

export default Home;
