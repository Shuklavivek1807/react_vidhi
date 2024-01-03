import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import About from './components/subPages/About';
import AboutLaw from './components/subPages/AboutLaw';
import SignInPage from './pages/Sign';
import SignUpPage from './pages/SignUp';
import CareerInLaw from './components/subPages/CareerInLaw';
import Syllabus from './components/subPages/Syllabus/Syllabus';
import Contact from './components/subPages/Contact';
import Course from './components/subPages/Courses';
import Gallery from './components/subPages/Gallery';
import QuestionSet from './components/Admin-Dashboard/Questionset';
import { useEffect, useState } from 'react';
import Student from './components/Admin-Dashboard/Student';
import Paper from './components/Student-Dashboard/Paper';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem('vmadmin');
    const student = localStorage.getItem('student');

    setIsAdmin(!!admin);
    setIsStudent(!!student);
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/About-Law-and-Legal-Profession" element={<AboutLaw />} />
          <Route path="/carrer-in-law" element={<CareerInLaw />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/course" element={<Course />} />
          <Route path="/gallery" element={<Gallery />} />
          {(isAdmin || isStudent) ? <Route path="/login" element={<Paper/>} /> : <Route path="/login" element={<SignInPage />} />}
          <Route path="/registration" element={<SignUpPage />} />
          {isAdmin && (
            <>
              {/* <Route path="/admin" element={<Admin_dashboard />} /> */}
              <Route path="/admin/exam-paper" element={<QuestionSet />} />
              <Route path="/admin/student" element={<Student />} />
            </>
          )}
          {isStudent && <Route path="/student" element={<Paper/>} />}
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
