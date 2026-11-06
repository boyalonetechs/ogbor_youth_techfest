import "./landing.css";
import About from "./About";
import Objectives from "./Objectives";
import Programme from "./Programme";
import Experience from "./Experience";
import GetInvolved from "./GetInvolved";
import Partners from "./Partners";
import SaveTheDate from "./SaveTheDate";
import Faq from "./Faq";
import Footer from "./Footer";

export default function Landing() {
  return (
    <div className="oytf">
      <About />
      <Objectives />
      <Programme />
      <Experience />
      <GetInvolved />
      <Partners />
      <SaveTheDate />
      <Faq />
      <Footer />
    </div>
  );
}
