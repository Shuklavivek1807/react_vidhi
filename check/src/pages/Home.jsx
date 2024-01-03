import React, { Fragment, useEffect } from "react";
import HeroSection from "../components/Hero-Section/HeroSection";
import AboutUs from "../components/About-us/AboutUs";
import ChooseUs from "../components/Choose-us/ChooseUs";
import Features from "../components/Feature-section/Features";
import Testimonials from "../components/Testimonial/Testimonials";
import Swal from 'sweetalert2';

const Home = () => {

  useEffect(() => {
    const popupShown = localStorage.getItem('popupShown');

    if (!popupShown) {
      showPopup();
    }
  }, []);

  const showPopup = async () => {
    // Use SweetAlert to show the pop-up
    let formValues = null;

    while (!formValues) {
      const { value, isConfirmed } = await Swal.fire({
        title: 'Welcome to Vidhi Mantra!',
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="Name">' +
          '<input id="swal-input2" class="swal2-input" placeholder="Contact">' +
          '<input id="swal-input3" class="swal2-input" placeholder="Email">' +
          '<select id="swal-input4" class="swal2-select">' +
          '<option value="" disabled selected>Select Course</option>' +
          '<option value="PCS(J)">PCS(J)</option>' +
          '<option value="APO">APO</option>' +
          '<option value="HJS">HJS</option>' +
          '<option value="OTHERS">OTHERS</option>' +
          '</select>',
        focusConfirm: false,
        showCancelButton: false,
        confirmButtonText: 'Enquiry',
        allowOutsideClick: false,
        allowEscapeKey: false, 
        preConfirm: () => {
          return {
            name: document.getElementById('swal-input1').value,
            contact: document.getElementById('swal-input2').value,
            email: document.getElementById('swal-input3').value,
            course: document.getElementById('swal-input4').value,
          };
        },
      });
  
      if (!isConfirmed) {
        return;
      }
  
      if (!value.name || !value.contact || !value.email || !value.course) {
        await Swal.fire({
          icon: 'error',
          title: 'All fields are compulsory',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        formValues = value;
        console.log(formValues)
        try {
          let result = await fetch('http://www.api.vidhimantraa.com/enquiry', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues)
          });
        
          if (!result.ok) {
            console.log('Error:', result.statusText);
          }else {
              localStorage.setItem('popupShown', 'true');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }

  };

  return (
    <Fragment>
      <HeroSection />
      <AboutUs />
      <ChooseUs />
      <Features />
      <Testimonials />
    </Fragment>
  );
};

export default Home;
