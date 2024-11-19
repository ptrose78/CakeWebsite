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
              Started by <strong>Beth Rose</strong> - a lifelong baker and resident of Oak Creek.
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