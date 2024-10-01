"use client";

import "./lobbyPatientScheduling.css";
import { useEffect, useState } from "react";
import {
  ArrowsClockwise,
  CheckCircle,
  Clock,
  Trash,
} from "@phosphor-icons/react";
import LobbyPatientSchedule from "../lobbyPatientSchedule/lobbyPatientSchedule";
import { getPatients, Patient } from "@/services/patient";
import Loading from "../loading/loading";
import Message from "../message/message";
import {
  deleteScheduling,
  GetScheduling,
  getScheduling,
  updateScheduling,
} from "@/services/scheduling";
import Confirm from "../confirm/confirm";

interface PatientRegistrationProps {
  search: string;
}

function LobbyPatientScheduling({ search }: PatientRegistrationProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [scheduling, setScheduling] = useState<GetScheduling[]>([]);
  const [patient, setPatient] = useState<Patient>();
  const [showModal, setShowModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [scheduled, setScheduled] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true); // Começa o carregamento antes de qualquer requisição

      try {
        // Buscar pacientes
        const patientsResponse = await getPatients();
        if (typeof patientsResponse === "string") {
          setMessage(patientsResponse);
          setShowMessage(true);
          return;
        }
        setPatients(patientsResponse);

        // Buscar agendamentos
        const schedulingResponse = await getScheduling();
        if (typeof schedulingResponse === "string") {
          setMessage(schedulingResponse);
          setShowMessage(true);
          return;
        }
        setScheduling(schedulingResponse); // Atualiza o estado de agendamentos
      } catch (error) {
        // Lida com erros inesperados
        setMessage("Ocorreu um erro ao buscar os dados.");
        setShowMessage(true);
      } finally {
        setIsLoading(false); // Finaliza o carregamento em todos os casos
      }
    }

    fetchData(); // Chama a função única para buscar ambos os dados
  }, []);

  function closeModal() {
    setShowModal(false);
  }

  async function handleRefresh() {
    setIsLoading(true);
    const response = await getPatients();
    if (typeof response === "string") {
      setMessage(response);
      setShowMessage(true);
      setIsLoading(false);
      return;
    }
    setPatients(response);

    const schedulingResponse = await getScheduling();
    console.log(schedulingResponse);
    if (typeof schedulingResponse === "string") {
      setMessage(schedulingResponse);
      setShowMessage(true);
      return;
    }
    setScheduling(schedulingResponse);

    setIsLoading(false);
  }

  function openConfirmModal(id: string) {
    setIdToDelete(id); // Armazena o ID do depoimento a ser excluído
    setShowConfirmModal(true);
  }

  function closeConfirmModal() {
    setShowConfirmModal(false);
    setIdToDelete(null); // Limpa o ID ao fechar o modal
  }

  async function handleDelete(): Promise<void> {
    if (idToDelete) {
      setIsLoading(true);
      const message = await deleteScheduling(idToDelete);
      if (typeof message === "string") {
        setIsLoading(false);
        setMessage(message);
        setShowMessage(true);
        closeConfirmModal();
        return;
      }
    }
    setIsLoading(false);
    closeConfirmModal();
  }

  async function handleConfirm(id: string): Promise<void> {
    setIsLoading(true);
    const message = await updateScheduling(id, {
      scheduled: scheduled,
      attended: true,
    });
    if (typeof message === "string") {
      setIsLoading(false);
      setMessage(message);
      setShowMessage(true);
      return;
    }
  }

  return (
    <>
      <button
        onClick={handleRefresh}
        className="lobby-patient-registration-refresh-btn"
      >
        <ArrowsClockwise size={32} />
      </button>
      <section className="lobby-patient-scheduling-container-1">
        <section className="lobby-patient-scheduling-container-3">
          <h1>Pacientes</h1>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Agendar</th>
              </tr>
            </thead>
            <tbody>
              {patients &&
                patients
                  .filter((patient) => {
                    return (
                      patient.name
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      patient.phone.includes(search) ||
                      patient.email.toLowerCase().includes(search.toLowerCase())
                    );
                  })
                  .map((patient, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{patient.name}</td>
                      <td>{patient.phone}</td>
                      <td>{patient.email}</td>
                      <td>
                        <button>
                          <Clock
                            size={32}
                            onClick={() => {
                              setPatient(patient);
                              setShowModal(true);
                            }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </section>
        <section className="lobby-patient-scheduling-container-4">
          <div>
            <h1>Serviços à confirmar</h1>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Tipo</th>
                  <th>Data</th>
                  <th>C</th>
                  <th>R</th>
                </tr>
              </thead>
              <tbody>
                {scheduling &&
                  scheduling
                    .filter((schedule) => schedule.attended === false)
                    .map((schedule, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{schedule.patientName}</td>
                        <td>{schedule.patientPhone}</td>
                        <td>{schedule.roleTranslated}</td>
                        <td>{schedule.scheduledFormatted}</td>
                        <td>
                          <button
                            onClick={() => {
                              setScheduled(schedule.scheduled);
                              schedule.id && handleConfirm(schedule.id); // Chama a função de confirmação
                            }}
                          >
                            <CheckCircle size={32} />
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              schedule.id && openConfirmModal(schedule.id);
                            }}
                          >
                            <Trash size={32} />
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <div>
            <h1>Serviços confirmados</h1>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Tipo</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {scheduling &&
                  scheduling
                    .filter((schedule) => schedule.attended === true)
                    .map((schedule, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{schedule.patientName}</td>
                        <td>{schedule.patientPhone}</td>
                        <td>{schedule.roleTranslated}</td>
                        <td>{schedule.scheduledFormatted}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
      {showModal && (
        <LobbyPatientSchedule closeModal={closeModal} patient={patient} />
      )}
      {showMessage && (
        <Message closeModal={() => setShowMessage(false)} message={message} />
      )}
      {isLoading && <Loading />}
      {showConfirmModal && (
        <Confirm
          closeModal={closeConfirmModal}
          confirmAction={handleDelete} // Passa a função de exclusão para o modal
          message="Tem certeza de que deseja excluir este agendamento?"
        />
      )}
    </>
  );
}

export default LobbyPatientScheduling;
