"use client";

import { useState } from "react";
import { Patient } from "../../../services/patient";
import "./lobbyPatientSchedule.css";
import Loading from "../loading/loading";
import Message from "../message/message";
import { createScheduling } from "@/services/scheduling";

interface PatientScheduleProps {
  closeModal: () => void;
  patient?: Patient;
}

function LobbyPatientSchedule({ closeModal, patient }: PatientScheduleProps) {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const scheduled = formData.get("date") as string;
    const response = await createScheduling({
      patientId: patient?.id as string,
      scheduled,
    });
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
          <input type="datetime-local" name="date" required />
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
    </>
  );
}

export default LobbyPatientSchedule;
