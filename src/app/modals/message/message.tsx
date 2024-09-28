import "./message.css";

interface MessageProps {
  closeModal: () => void;
  message: string;
}
function Message({ closeModal, message }: MessageProps) {
  return (
    <dialog className="message-container">
      <section>
        <h1>{message}</h1>
        <button onClick={closeModal}>Fechar</button>
      </section>
    </dialog>
  );
}

export default Message;
