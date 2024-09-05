import { useState } from "react";
import "./createDeposition.css";
import Loading from "../loading/loading";
import { createDeposition } from "@/services/depositions";
import ReCAPTCHA from "react-google-recaptcha";

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
      phone,
      content,
      file,
    };
    if (deposition.name && deposition.phone && deposition.content) {
      setIsLoading(true);
      const status = await createDeposition(deposition);
      if (status === 201) {
        alert("Depoimento enviado com sucesso.");
        setIsLoading(false);
        closeModal();
      } else {
        alert("Erro ao enviar depoimento.");
        setIsLoading(false);
      }
    } else {
      alert("Preencha todos os campos para enviar o depoimento.");
      setIsLoading(false);
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
              maxLength={25}
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
              maxLength={2500}
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
    </>
  );
}

export default CreateDeposition;
