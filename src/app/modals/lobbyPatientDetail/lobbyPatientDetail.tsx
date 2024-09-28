import { useState } from "react";
import { Patient, updatePatient } from "../../../services/patient";
import Message from "../message/message";
import Loading from "../loading/loading";
import "./lobbyPatientDetail.css";

interface PatientDetailProps {
  closeModal: () => void;
  patient?: Patient;
}

function LobbyPatientDetail({ closeModal, patient }: PatientDetailProps) {
  const [formData, setFormData] = useState({
    name: patient?.name || "",
    phone: patient?.phone || "",
    email: patient?.email || "",
    birthDate: patient?.birthDate || "",
    cpf: patient?.cpf || "",
    address: patient?.address || "",
    district: patient?.district || "",
    city: patient?.city || "",
    state: patient?.state || "",
    zipCode: patient?.zipCode || "",
  });
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const updatedPatient: Patient = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      birthDate: formData.birthDate,
      cpf: formData.cpf,
      address: formData.address,
      district: formData.district,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
    };
    const response = await updatePatient(patient?.id || "", updatedPatient);
    setIsLoading(false);
    setMessage(response);
    setShowMessage(true);
  }

  return (
    <>
      <section className="lobby-patient-detail-modal">
        <form
          className="lobby-patient-detail-container-1"
          onSubmit={handleSubmit}
        >
          <h1>Editar Paciente</h1>
          <div className="lobby-patient-detail-container-4">
            <div className="lobby-patient-detail-container-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nome"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Telefone"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                placeholder="Data de Nascimento"
              />
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="CPF"
              />
            </div>
            <div className="lobby-patient-detail-container-3">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Endereço"
              />
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="Bairro"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Cidade"
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Estado"
              />
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="CEP"
              />
            </div>
          </div>
          <button type="submit">Salvar</button>
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

export default LobbyPatientDetail;
