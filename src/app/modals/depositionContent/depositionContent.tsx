import { GetTestimonial } from "../../../services/testimonials";
import "./depositionContent.css";

interface DepositionContentProps {
  closeModal: () => void;
  deposition?: GetTestimonial;
}

function DepositionContent({ closeModal, deposition }: DepositionContentProps) {
  return (
    <section className="deposition-modal">
      <div className="deposition-container-1">
        <h1>{deposition?.name}</h1>
        <p>{deposition?.testimony}</p>
        <button onClick={closeModal}>Fechar</button>
      </div>
    </section>
  );
}

export default DepositionContent;
