import React from "react";
import {useNavigate} from 'react-router-dom'
import { Container, Row, Col } from "reactstrap";
import heroImg from "../../assests/images/hero-img1.png";
import "./hero-section.css";

const HeroSection = () => {
  const navigate= useNavigate();
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2 className="mb-4 hero__title">
              Unlocking Legal Excellence<br /> Anytime Anywhere
              </h2>
              <p className="mb-5">
               Join Vidhi Mantra and embark on a legal education journey<br/> that adapts to your lifestyle.
               Experience the freedom to<br/> learn, grow, and excel in the field of law.
              </p>
            </div>
              <button className="signup_button" onClick={()=>navigate('/registration')}>Get Started</button>
          </Col>

          <Col lg="6" md="6">
            <img src={heroImg} alt="" className="w-100 hero__img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
