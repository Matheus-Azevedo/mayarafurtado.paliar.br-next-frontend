import { Patient } from "../../../services/patient";
import "./lobbyPatientSchedule.css";

interface PatientScheduleProps {
  closeModal: () => void;
  patient?: Patient;
}

function LobbyPatientSchedule({ closeModal, patient }: PatientScheduleProps) {
  return (
    <section className="lobby-patient-schedule-modal">
      <div className="lobby-patient-schedule-container-1">
        <h1>{patient?.name}</h1>
        <p>
          <strong>Telefone: </strong>
          {patient?.phone}
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
