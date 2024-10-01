"use client";

import { useEffect, useState } from "react";
import "./calendar.css";
import {
  getSchedulingCalendar,
  SchedulingCalendar,
} from "@/services/scheduling";
import Message from "../message/message";
import Loading from "../loading/loading";

interface CalendarCheckProps {
  closeModal: () => void;
}

function CalendarCheck({ closeModal }: CalendarCheckProps) {
  const [schedules, setSchedules] = useState<SchedulingCalendar>();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchSchedules() {
      setIsLoading(true);
      const response = await getSchedulingCalendar();
      if (typeof response === "string") {
        setIsLoading(false);
        setMessage(response);
        setShowMessage(true);
        return;
      }
      setIsLoading(false);
      setSchedules(response);
    }
    fetchSchedules();
  }, []);

  return (
    <>
      <section className="calendar-container">
        <h1>Agendamentos disponíveis no mês:</h1>
        <ul className="calendar-list">
          {schedules &&
            Object.entries(schedules).map(([date, schedule]) => (
              <li key={date}>
                <strong>{date}: </strong>
                <span>{schedule}</span>
              </li>
            ))}
        </ul>
        <button onClick={closeModal} className="calendar-close-btn">
          Fechar
        </button>
      </section>
      {isLoading && <Loading />}
      {showMessage && (
        <Message closeModal={() => setShowMessage(false)} message={message} />
      )}
    </>
  );
}

export default CalendarCheck;
