import { Patient } from "../lobbyPatientRegistration/lobbyPatientRegistration";
import "./lobbyPatientDetail.css";

interface PatientDetailProps {
  closeModal: () => void;
  patient?: Patient;
}

function LobbyPatientDetail({ closeModal, patient }: PatientDetailProps) {
  return (
    <section className="lobby-patient-detail-modal">
      <div className="lobby-patient-detail-container-1">
        <h1>{patient?.name}</h1>
        <p>
          <strong>Telefone: </strong>
          {patient?.tel}
        </p>
        <p>
          <strong>Email: </strong>
          {patient?.email}
        </p>
        <p>
          <strong>Nascimento: </strong>
          {patient?.date}
        </p>
        <p>
          <strong>CPF: </strong>
          {patient?.cpf}
        </p>
        <p>
          <strong>Endereço: </strong>
          {patient?.address}
        </p>
        <p>
          <strong>Bairro: </strong>
          {patient?.district}
        </p>
        <p>
          <strong>Cidade: </strong>
          {patient?.city}
        </p>
        <p>
          <strong>Estado: </strong>
          {patient?.state}
        </p>
        <p>
          <strong>CEP: </strong>
          {patient?.cep}
        </p>
        <button onClick={closeModal}>Fechar</button>
      </div>
    </section>
  );
}

export default LobbyPatientDetail;
