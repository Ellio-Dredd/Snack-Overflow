
import './Contact.css'
import ContactInfo from './Contactinfo'
import { MdEmail, MdLocalPhone } from 'react-icons/md'

const Contact = () => {
  return (

    
  
    <section className='contact'>

      
      <div>
        <ContactInfo icon={<MdLocalPhone/>} text="+94 0760547176"/>
        <ContactInfo icon ={<MdEmail/>} text="sample@gmail.com"/>
        <ContactInfo text="Kelaniya, Colombo"/>
      </div>

      <div style={{ margin: '20px 0' }}></div>

      <form>
        <h2>Contact Form</h2>
        <div className="input-box">
          <label>Full Name</label>
          <input type="text" name="name" className="field" placeholder='Enter Your Name' required/>
        </div>

        <div className="input-box">
          <label>Phone Number</label>
          <input type="tel" className="field" placeholder='Enter Your Number' required/>
        </div>
        <div className="input-box">
          <label>Email Address</label> 
          <input type="email" className="field" placeholder='Enter Your Email' required/>
        </div>
        <div className="input-box">
          <label>Your Message</label> 
          <textarea name =" " id =""  className="field mess" placeholder='Enter Your Message' required></textarea>
        </div>
        <div className="btn-box">
        <button type="submit">Send Message</button>
        </div>
      </form>
    
    </section>
  )
}

export default Contact