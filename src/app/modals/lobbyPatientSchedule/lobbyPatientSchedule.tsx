import { useState } from "react";
import { Patient } from "../../../services/patient";
import "./lobbyPatientSchedule.css";
import Loading from "../loading/loading";
import Message from "../message/message";
import { createScheduling } from "@/services/scheduling";
import { Calendar } from "@phosphor-icons/react";
import CalendarCheck from "../calendar/calendar";

interface PatientScheduleProps {
  closeModal: () => void;
  patient?: Patient;
}

function LobbyPatientSchedule({ closeModal, patient }: PatientScheduleProps) {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("");
  const [showModalCalendar, setShowModalCalendar] = useState(false);

  function handleChengeRole(event: React.ChangeEvent<HTMLInputElement>) {
    const role = event.target.value;
    setRole(role);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const scheduled = formData.get("date") as string;

    const scheduling = {
      patientId: patient?.id as string,
      scheduled,
      role,
    };
    console.log(scheduling);

    // Envia a role correta para o serviço
    const response = await createScheduling(scheduling);

    setMessage(response);
    setShowMessage(true);
    setIsLoading(false);
  }

  return (
    <>
      <section className="lobby-patient-schedule-modal">
        <form
          className="lobby-patient-schedule-container-1"
          onSubmit={handleSubmit}
        >
          <h1>{patient?.name}</h1>
          <p>
            <strong>Telefone: </strong>
            {patient?.phone}
          </p>
          <p>
            <strong>Email: </strong>
            {patient?.email}
          </p>
          <div className="lobby-patient-schedule-checkboxes">
            <strong>Avaliação: </strong>
            <input
              type="radio"
              name="role"
              value="EVALUATION"
              onChange={handleChengeRole}
            />
            <strong>Sessão: </strong>
            <input
              type="radio"
              name="role"
              value="SESSION"
              onChange={handleChengeRole}
            />
          </div>
          <div className="lobby-patient-schedule-date">
            <input type="datetime-local" name="date" required />
            <button type="button">
              <Calendar
                width={32}
                height={32}
                onClick={() => {
                  setShowModalCalendar(true);
                }}
              />
            </button>
          </div>
          <button type="submit">Agendar</button>
          <button type="button" onClick={closeModal}>
            Fechar
          </button>
        </form>
      </section>
      {showMessage && (
        <Message closeModal={() => setShowMessage(false)} message={message} />
      )}
      {isLoading && <Loading />}
      {showModalCalendar && (
        <CalendarCheck closeModal={() => setShowModalCalendar(false)} />
      )}
    </>
  );
}

export default LobbyPatientSchedule;
