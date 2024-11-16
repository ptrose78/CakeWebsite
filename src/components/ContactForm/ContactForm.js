import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, checkHuman, resetForm, selectContactForm } from '../../features/contactForm/contactFormSlice';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', contact);
    dispatch(resetForm());
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <select
          name="address.state"
          value={contact.address.state}
          onChange={handleChange}
        >
          <option value="Wisconsin">Wisconsin</option>
          {/* Add more states as needed */}
        </select>
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
        <button type="submit">Submit</button>
      )}
    </form>
  );
};

export default ContactForm;
