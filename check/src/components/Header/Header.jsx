import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import logo from '../../assests/images/logo.png'
import { IoCallSharp } from "react-icons/io5";

import "./header.css";

const navLinks = [
  {
    display: "Home",
    url: "/",
  },
  {
    display: "About Us",
    url: "/about",
  },
  {
    display: "Courses",
    url: "/course",
  },
  {
    display: "About Law",
    url: "#",
    subLinks: [
      {
        display: "Career in law",
        url: "/carrer-in-law",
      },
      {
        display: "About Law and Legal Profession",
        url: "/About-Law-and-Legal-Profession",
      },
    ],
  },
  {
    display: "Syllabus",
    url: "/syllabus",
  },
  {
    display: "Contact Us",
    url: "/contact",
  },
];
const Admin =[
  {
    display: "Home",
    url: "/admin",
  },
  {
    display: "Students",
    url: "/admin/student",
  },
  {
    display: "Exam Paper",
    url: "/admin/exam-paper",
  }
]
const Student =[
  {
    display: "Home",
    url: "/student"
  },
  {
    display: "About Us",
    url: "/about"
  },
  {
    display: "Courses",
    url: "/course"
  },
  {
    display: "Syllabus",
    url: "/syllabus"
  },
  {
    display: "Contact Us",
    url: "/contact"
  }
]

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    const checkUserRoles = () => {
      const admin = localStorage.getItem("vmadmin");
      const student = localStorage.getItem("student");
  
      setIsAdmin(!!admin);
      setIsStudent(!!student);
    };
  
    // Call the function on component mount
    checkUserRoles();
  
    const handleStorageChange = () => {
      // Call the function when storage changes
      checkUserRoles();
    };
  
    // Add event listener for storage change
    window.addEventListener("storage", handleStorageChange);
  
    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  
  const menuRef = useRef();
  const navigate = useNavigate();
  const loginPage = () => {
    navigate("/login");
  };
  const menuToggle = () => menuRef.current.classList.toggle("active__menu");
  const logoutPage = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("vmadmin");
  };

  return (
    <>
    <Container style={{display:"flex",justifyContent:"center"}}>
      <div className="logo">
          <img src={logo} alt="Logo" width="100px" height="100px"/>
        </div>
        <div className="heading-div">
          <h1 className="logo-heading">VIDHI MANTRAA</h1>
          <p className="logo-para">An Institute for preparation of all Judicial Service Examinations under the guidance of former HJS</p>
          <h2 className="logo-subheading">CENTRE OF EXCELLENCE</h2>
        </div>
        <div className="phone-div">
            <IoCallSharp className="logo-icon"/>
            <div>
          <a href="tel:+91-7309642020" className="phone">+91-7309642020</a><br/>
          <a href="tel:+91-7080499848" className="phone">+91-7080499848</a>
          </div>
          
          
        </div>
    </Container>
    
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center nav-centre">
          <div className="gap-0">
          <div className="mobile-logo">
          <img src={logo} alt="Logo" width="80px" height="80px"/>
          <div style={{color:"#1a9a81"}}>
          <h1 className="logo-heading">VIDHI MANTRAA</h1>
          <p className="logo-para" style={{lineHeight:"normal"}}>An Institute for preparation of all Judicial Service Examinations under the guidance of former HJS</p>
          <h2 className="logo-subheading">CENTRE OF EXCELLENCE</h2>
        </div>
          </div>
          </div>
          { (!isStudent && !isAdmin) && 
          <div className="nav d-flex align-items-center gap">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list" >
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item container_sublist">
                    <Link to={item.url}>{item.display}</Link>
                    {item.subLinks && (
                      <ul className="sub__nav__list">
                        {item.subLinks.map((subItem, subIndex) => (
                          <li key={subIndex} className="sub__nav__item">
                            <Link to={subItem.url}>{subItem.display}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
                <li className="login">
                <p className="mb-0 d-flex align-items-center gap-2">
                <button className="login_button" onClick={loginPage}>
                  Login
                </button></p>
                </li>
                
              </ul>
            </div>
            
               <div className="nav__right">
               <p className="mb-0 d-flex align-items-center gap-2">
                 <button className="login_button" onClick={loginPage}>
                   Login
                 </button>
               </p>
             </div>
           
          </div>
          }
          { isAdmin && 
          <div className="nav d-flex align-items-center gap">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list" >
                {Admin.map((item, index) => (
                  <li key={index} className="nav__item">
                    <Link to={item.url}>{item.display}</Link>
                  </li>
                ))}
                <li className="login">
                <p className="mb-0 d-flex align-items-center gap-2">
                  <a href="/">
                    <button className="login_button" onClick={logoutPage}>
                  Log Out
                </button>
                  </a>
                
                </p>
                </li>
              </ul>
            </div>
            
               <div className="nav__right">
               <p className="mb-0 d-flex align-items-center gap-2">
               <a href="/">
                    <button className="login_button" onClick={logoutPage}>
                  Log Out
                </button>
                  </a>
               </p>
             </div>
          
          </div>
          }
          { isStudent && 
          <div className="nav d-flex align-items-center gap">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list" >
                {Student.map((item, index) => (
                  <li key={index} className="nav__item">
                    <Link to={item.url}>{item.display}</Link>
                  </li>
                ))}
                <li className="login">
                <p className="mb-0 d-flex align-items-center gap-2">
                <a href="/">
                    <button className="login_button" onClick={logoutPage}>
                  Log Out
                </button>
                  </a></p>
                </li>
              </ul>
            </div>
            
               <div className="nav__right">
               <p className="mb-0 d-flex align-items-center gap-2">
               <a href="/">
                    <button className="login_button" onClick={logoutPage}>
                  Log Out
                </button>
                  </a>
               </p>
             </div>
          
          </div>
          }

          <div className="mobile__menu">
            <span>
              <i className="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
    </>
  );
};

export default Header;
