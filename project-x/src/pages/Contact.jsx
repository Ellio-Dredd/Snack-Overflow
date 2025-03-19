
import '../components/Contact.css'
import InfoCard from '../components/InfoCard';
import FormCard from '../components/FormCard';



const Contact = () => {
  return (
    <div className="contact-container" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        gap: "50px", /* Increase space between cards */
        padding: "20px",
        maxWidth: "1200px",
        margin: "auto"
      }}>
        <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
          <InfoCard />
        </div>
        <div style={{ flex: "1", display: "flex", justifyContent: "center" }}>
          <FormCard />
        </div>
      </div>
  );
};



export default Contact;