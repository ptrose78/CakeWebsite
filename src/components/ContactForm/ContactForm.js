import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, checkHuman, resetForm, selectContactForm, postContactForm } from '../../features/contactForm/contactFormSlice';
import './ContactForm.css'

const ContactForm = () => {
  const dispatch = useDispatch();
  const contact = useSelector(selectContactForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };

  const handleHumanCheck = (e) => {
    dispatch(updateField({ field: 'humanCheck', value: e.target.value }));
    dispatch(checkHuman());
  };

  const handleSubmit = (contact) => {
    console.log('handle submit of contact form')
    const handleForm = async() =>{
      await dispatch(postContactForm(contact));
    }
    
    handleForm();
  };

  const clearForm = () => {
    dispatch(resetForm());
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault(); // Prevent the default form submission
      handleSubmit(contact); // Call your function with `contact`
    }}>
      <label>
        Name*
        <div>
          <input
            type="text"
            name="name.first"
            placeholder="First"
            value={contact.name.first}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name.last"
            placeholder="Last"
            value={contact.name.last}
            onChange={handleChange}
            required
          />
        </div>
      </label>

      <label>
        Email*
        <input
          type="email"
          name="email"
          value={contact.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Address
        <input
          type="text"
          name="address.street"
          placeholder="Street Address"
          value={contact.address.street}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address.addressLine2"
          placeholder="Address Line 2"
          value={contact.address.addressLine2}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address.city"
          placeholder="City"
          value={contact.address.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address.state"
          placeholder="State"
          value={contact.address.state}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address.zip"
          placeholder="ZIP Code"
          value={contact.address.zip}
          onChange={handleChange}
        />
      </label>

      <label>
        Phone
        <input
          type="tel"
          name="phone"
          value={contact.phone}
          onChange={handleChange}
        />
      </label>

      <label>
        Message*
        <textarea
          name="message"
          value={contact.message}
          onChange={handleChange}
          required
        ></textarea>
      </label>

      <label>
        Show us that you are human to see the submit button, please enter the value of 1+1*
        <input
          type="text"
          name="humanCheck"
          value={contact.humanCheck}
          onChange={handleHumanCheck}
          required
        />
      </label>

      {contact.isSubmitVisible && (
      <> 
        <button className="clearForm-button-contact" onClick={(e) => clearForm(e)}>Clear Form</button>
        <button className="submit-button-contact" type="submit">Submit</button>
      </>
      )}

      {contact.submissionResult && (
        <p className="submission-message">"Form successfully submitted. We'll get back to you in 1 business day."</p>
      )}
    </form>
  );
};

export default ContactForm;
