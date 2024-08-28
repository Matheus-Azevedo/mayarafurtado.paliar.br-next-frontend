import Image from "next/image";
import "./app.css";
import Home from "./sections/home/home";
import Clinic from "./sections/clinic/clinic";
import Landing from "./sections/landing/landing";
import Biography from "./sections/biography/biography";
import Depositions from "./sections/depositions/depositions";

export default function App() {
  return (
    <main>
      <section
        id="home"
        className="bg-gradient-to-r from-greenLight-paliar to-white h-screen"
      >
        <div className="logo logo-right" />
        <Home />
      </section>
      <section
        id="biography"
        className="bg-gradient-to-r from-greenLight-paliar to-white h-screen"
      >
        <div className="logo logo-left" />
        <Biography />
      </section>
      <section
        id="clinic"
        className="bg-gradient-to-r from-greenLight-paliar to-white h-screen"
      >
        <div className="logo logo-center" />
        <Clinic />
      </section>
      <section
        id="depositions"
        className="bg-gradient-to-r from-greenLight-paliar to-white h-screen"
      >
        <div className="logo logo-right" />
        <Depositions />
      </section>
      <section
        id="contacts"
        className="bg-gradient-to-r from-greenLight-paliar to-white h-screen"
      >
        <div className="logo logo-left" />
        <Landing />
      </section>
    </main>
  );
}
