import "./clinic.css";

function Clinic() {
  return (
    <main className="clinic-container-1">
      <div className="clinic-container-2">
        <h1>Serviços</h1>
        <ul className="two-columns">
          <li>
            <strong className="brown-paliar">
              Reabilitação Cardiovascular
            </strong>
            <p>
              <br />
              Cuidados para pacientes com doenças cardiovasculares como
              hipertensão arterial sistêmica (HAS), doença arterial coronariana,
              arritmias cardíacas, insuficiência cardíaca, insuficiência venosa
              crônica, e pré e pós-operatório, utilizando exercícios e recursos
              específicos para melhorar a função cardiovascular.
            </p>
          </li>
          <li>
            <strong className="brown-paliar">Drenagem Linfática </strong>
            <p>
              <br />
              Auxílio nas doenças circulatórias, linfedema e pós-operatório
              através de drenagem linfática manual.
            </p>
          </li>
          <li>
            <strong className="brown-paliar">Educação Familiar</strong>
            <p>
              <br />
              Orientação para familiares sobre o cuidado ao idoso com doença
              crônica, incluindo manejo da dor.
            </p>
          </li>
          <li>
            <strong className="brown-paliar">
              Cuidados Neurológicos e Cognitivos
            </strong>
            <p>
              <br />
              Estímulo da funcionalidade e cognição para pacientes com Alzheimer
              e Parkinson.
            </p>
          </li>
          <li>
            <strong className="brown-paliar">
              Reabilitação Funcional e Preventiva
            </strong>
            <p>
              <br />
              Exercícios individualizados para tratar sarcopenia, osteoporose e
              osteoartrite, proporcionando autonomia e funcionalidade,
              diminuindo o risco de quedas.
            </p>
          </li>
          <li>
            <strong className="brown-paliar">Reabilitação em Oncologia </strong>
            <p>
              <br />
              Cuidados durante a quimioterapia e radioterapia, proporcionando
              suporte ao longo do tratamento e aumento da capacidade funcional
              com exercícios específicos.
            </p>
          </li>
          <li>
            <strong className="brown-paliar">
              Reabilitação Cardiopulmonar{" "}
            </strong>
            <p>
              <br />
              Tratamento especializado para doenças pulmonares como DPOC, asma e
              pneumonia, utilizando exercícios e recursos para aumentar a
              capacidade funcional e respiratória.
            </p>
          </li>
          <li>
            <strong className="brown-paliar">Massagem Terapêutica</strong>
            <p>
              <br />
              Alívio do estresse e promoção do bem-estar.
            </p>
          </li>
        </ul>
      </div>
    </main>
  );
}

export default Clinic;
