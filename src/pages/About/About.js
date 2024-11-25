import React from "react";
import './About.css'

const About = () => {

    return (
        <div className="about-page">
          <h1>About Us</h1>
          <section className="about-story">
            <h2>Our Story</h2>
            <p>
              At <strong>Buzzy Sweets</strong>, we’re passionate about bringing joy through baked goods. 
              What started as a love for baking has grown into a cherished local business in Oak Creek. 
              <strong> Our team</strong> works tirelessly to bring you the finest cakes, pastries, and treats, all crafted with care and dedication.
            </p>
          </section>
    
          <section className="about-mission">
            <h2>Our Mission</h2>
            <p>To create high-quality, handcrafted cakes and pastries that bring people together.</p>
          </section>
    
          <section className="about-why-choose-us">
            <h2>Why Choose Us?</h2>
            <ul>
              <li>Fresh, premium ingredients</li>
              <li>Unique, customizable designs</li>
              <li>A commitment to customer satisfaction</li>
            </ul>
          </section>
        </div>
      );
    };

export default About;