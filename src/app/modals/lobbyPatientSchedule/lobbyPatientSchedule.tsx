import { Patient } from "../lobbyPatientRegistration/lobbyPatientRegistration";
import "./lobbyPatientSchedule.css";

interface PatientDetailProps {
  closeModal: () => void;
  patient?: Patient;
}

function LobbyPatientSchedule({ closeModal, patient }: PatientDetailProps) {
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
        <input type="datetime-local" />
        <button>Agendar</button>
        <button onClick={closeModal}>Fechar</button>
      </div>
    </section>
  );
}

export default LobbyPatientSchedule;
