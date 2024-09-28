import "./confirm.css";

interface ConfirmProps {
  closeModal: () => void;
  confirmAction: () => void; // Função para confirmar a ação
  message: string;
}

function Confirm({ closeModal, confirmAction, message }: ConfirmProps) {
  return (
    <dialog className="confirm-container">
      <section>
        <h1>{message}</h1>
        <div className="confirm-buttons">
          <button onClick={confirmAction} className="confirm-button">
            Confirmar
          </button>
          <button onClick={closeModal} className="cancel-button">
            Cancelar
          </button>
        </div>
      </section>
    </dialog>
  );
}

export default Confirm;
