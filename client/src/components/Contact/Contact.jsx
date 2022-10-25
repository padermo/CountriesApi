import React, { useState } from 'react'
import axios from 'axios';
import Alert from '../Activities/Alert';

function Contact() {
  const [msg, setMsg] = useState("")
  const [inputContact, setInputContact] = useState({
    name: "",
    email: "",
    affair: "",
    description: ""
  });

  const captureInputs = (e) => {
    setInputContact({ ...inputContact, [e.target.name]: e.target.value });
  }

  const validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  const sendContact = async (e) => {
    const { name, email, affair, description } = inputContact;
    e.preventDefault();
    if (name === "" || email === "" || affair === "" || description === "") {
      setMsg("There are empty fields");
    } else {
      if (validarEmail.test(inputContact.email)) {
        await axios.post('http://localhost:3001/contact', inputContact);
        setMsg("Message send")
        setInputContact({
          name: "",
          email: "",
          affair: "",
          description: ""
        })
      } else {
        setMsg("Invalid email")
      }
    }
  }

  return (
    <div className='container-contact'>
      <div className='container-form-contact'>
        <h2>Contact Us</h2>
        <form className='form-contact' onSubmit={sendContact} >
          <label className='lbl-form' htmlFor="name">Name</label>
          <input className='inputs-contact' id='name' type="text" name='name' value={inputContact.name} onChange={captureInputs} placeholder='Name...' />

          <label className='lbl-form' htmlFor="email">Email</label>
          <input className='inputs-contact' id='email' type="email" name='email' value={inputContact.email} onChange={captureInputs} placeholder='Email...' />

          <label className='lbl-form' htmlFor="affair">Affair</label>
          <input className='inputs-contact' id='affair' type="text" name='affair' value={inputContact.affair} onChange={captureInputs} placeholder='Affair...' />

          <label className='lbl-form' htmlFor="description">Description</label>
          <textarea className='text-contact' name="description" value={inputContact.description} onChange={captureInputs} id="description" cols="30" rows="10" placeholder='Description...'></textarea>

          <div className='container-btn-contact'>
            <button className='btn-form-contact btn-form' onClick={sendContact}>Send</button>
          </div>
        </form>
        <div className="container-alert">
          <Alert msg={msg} />
        </div>
      </div>
    </div>
  )
}

export default Contact