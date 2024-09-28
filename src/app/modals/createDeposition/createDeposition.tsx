import { useState } from "react";
import "./createDeposition.css";
import Loading from "../loading/loading";
import { createDeposition } from "@/services/depositions";
import ReCAPTCHA from "react-google-recaptcha";
import Message from "../message/message";

interface CreateDepositionProps {
  closeModal: () => void;
}

function CreateDeposition({ closeModal }: CreateDepositionProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;
    // Apenas letra inicial maiúscula e sem caracteres especiais
    const formattedName = name
      .replace(/[^a-zA-Z ]/g, "")
      .replace(/\b\w/g, (char) => char.toUpperCase());
    setName(formattedName);
  }

  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    const phone = event.target.value;
    const formattedPhone = phone
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2");
    setPhone(formattedPhone);
  }

  function handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  function handleCaptchaChange(value: string | null) {
    if (value) {
      setIsHuman(true);
    }
  }

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const deposition = {
      name,
      telephone: phone,
      testimony: content,
    };
    if (deposition.name && deposition.telephone && deposition.testimony) {
      setIsLoading(true);
      const message = await createDeposition(deposition);
      if (typeof message === "string") {
        setMessage(message);
        setShowMessage(true);
        setIsLoading(false);
        return;
      }
    }
  }

  return (
    <>
      <dialog className="create-deposition-modal">
        <section className="create-deposition-container-1">
          <h1>Escreva seu Depoimento</h1>
          <form className="create-deposition-form">
            <input
              className="create-deposition-input"
              type="text"
              placeholder="Nome"
              name="name"
              value={name}
              maxLength={20}
              onChange={handleNameChange}
            />
            <input
              className="create-deposition-input"
              type="text"
              placeholder="Telefone"
              name="phone"
              value={phone}
              maxLength={15}
              onChange={handlePhoneChange}
            />
            <textarea
              className="create-deposition-textarea"
              placeholder="Conteúdo"
              name="content"
              value={content}
              maxLength={905}
              onChange={handleContentChange}
            />
            <ReCAPTCHA
              className="create-deposition-recaptcha"
              sitekey={process.env.NEXT_PUBLIC_SITE_KEY || ""}
              onChange={handleCaptchaChange}
            />
            <label
              htmlFor="create-deposition-input-file"
              className="create-deposition-input-file-label"
            >
              Envie-nos uma foto sua (opcional)
              <input
                className="create-deposition-input-file"
                id="create-deposition-input-file"
                type="file"
                placeholder="Foto"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>

            <button
              className="create-deposition-button"
              onClick={handleSubmit}
              disabled={!isHuman}
            >
              Enviar Depoimento
            </button>
            <button className="create-deposition-button" onClick={closeModal}>
              Cancelar
            </button>
          </form>
        </section>
      </dialog>
      {isLoading && <Loading />}
      {showMessage && (
        <Message closeModal={() => setShowMessage(false)} message={message} />
      )}
    </>
  );
}

export default CreateDeposition;
