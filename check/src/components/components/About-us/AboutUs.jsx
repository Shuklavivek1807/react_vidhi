import React from "react";
import "./about.css";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import aboutImg from "../../assests/images/about-us.png";
import CountUp from "react-countup";
import { FaLongArrowAltRight } from "react-icons/fa";


const vidhiMantraIntroduction =
  "Welcome to Vidhi Mantraa, your ultimate destination for judiciary coaching! We are committed to offering expert guidance and personalized coaching to empower you for success in judiciary exams. With experienced faculty, a unique teaching methodology, and a proven track record, Vidhi Mantraa is the ideal choice for aspiring legal professionals. Join us on the journey to excel in your judiciary exams and build a successful career in the field of law."

const AboutUs = () => {
  const navigate  = useNavigate();
  return (
    <section>
      <Container>
        <Row style={{paddingBottom:"10vh"}}>
          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__content">
              <h2>About Us</h2>
              <p>{vidhiMantraIntroduction}</p>
              <span><a className="read_button" onClick={()=>navigate('/about')}>Read More <FaLongArrowAltRight className="arrow"/></a></span>
            </div>
          </Col>
        </Row>
        <Row>
        <div className="about__counter">
                <div className=" d-flex gap-5 align-items-center" style={{backgroundColor:"#EAECCC"}}>
                    <Row className="count_up">
                        <Col lg="6" md="6">
                        <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={100} duration={2} suffix="+" />
                    </span>

                    <p className="counter__title">Registration done</p>
                  </div>
                        </Col>
                        <Col lg="6" md="6">
                            <div className="single__counter">
                    <span className="counter">
                      <CountUp start={0} end={10} duration={2} suffix="+" />
                    </span>

                    <p className="counter__title">Test Paper</p>
                  </div>
                        </Col>
                    </Row>      
                </div>
              </div>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
