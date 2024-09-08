import { WhatsappLogo } from "@phosphor-icons/react";
import Link from "next/link";

function LinkWhatsApp() {
  return (
    <Link
      href="https://api.whatsapp.com/send?phone=5583991142751&amp;text=Olá, gostaria de agendar um consulta."
      className="green-paliar"
    >
      <WhatsappLogo className="link-whatsApp" size={82} />
    </Link>
  );
}

export default LinkWhatsApp;
