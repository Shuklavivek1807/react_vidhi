import { Container, Row, Col } from "reactstrap";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import { vidhiMantraIntroduction } from './const'

const About = () => {

 useEffect(()=>{
  window.scrollTo(0, 0);
 },[])
  const [benefit, setBenefit] = useState([
    {
      title: "Mastery from the Basics:",
      description:
        "Embark on a journey of knowledge where each subject begins with a thorough exploration of its foundational elements. We empower our students, irrespective of their prior preparation, laying the groundwork for comprehensive understanding."
    },
    {
      title: "A Decade of Distinction:",
      description:
        "Benefit from a legacy of excellence spanning over a decade. Ambition takes pride in being the unrivaled leader in providing top-tier preparatory legal education. Our proven track record speaks volumes about our commitment to fostering success."
    },
    {
      title: "Tailored Student-Centric Approach:",
      description:
        "Immerse yourself in a learning environment crafted with you in mind. Our faculty and staff are dedicated to creating classrooms that cater to your unique needs and aspirations. The pace, intensity, and support mechanisms are finely tuned to keep you at the center of your educational journey."
    },
    {
      title: "Dedicated Expertise, Around the Clock:",
      description:
        "Prepare for success with a dedicated team of experts working tirelessly to curate the most up-to-date, relevant, and concise educational materials. At Ambition, our commitment to excellence is reflected in the quality of resources we provide for your success."
    },
    {
      title: "Holistic Growth and Personal Development:",
      description:
        "Experience growth not only academically but also personally. We believe in shaping well-rounded individuals, emphasizing a positive and pleasing personality. Our investment in each student ensures a transformative journey towards marked improvement."
    },
    {
      title: "Practice with Purpose:",
      description:
        "Unlock your potential through our Practice Module, meticulously designed around previous year question papers. This integral part of our 'ALL INDIA SERVICES EXAMINATION TEST PROGRAMME' ensures focused preparation, aligning you perfectly with the demands of your examinations."
    }
  ]);


  return (
    <section>
      <div class="text-center mb-5 col-lg-12" style={{ paddingTop: "15px" }}><h2 class="fw-bold">About Us</h2></div>
      <Container>
        <Row>
          <div className="about__content">
            <div style={{ paddingBottom: "20px" }}>{vidhiMantraIntroduction.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
            </div>
            <section style={{paddingTop:"0px"}}>
              <h2 className="about_heading">Unveiling the Advantage</h2>

              {benefit.map((item, key) => (
                <div key={key}>
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </div>
              ))}


            </section>
          </div>
        </Row>
      </Container>
    </section>
  )
}

export default About;