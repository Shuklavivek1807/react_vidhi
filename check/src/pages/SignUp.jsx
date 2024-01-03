import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import Swal from 'sweetalert2';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSignUp =async (e) => {
    e.preventDefault();
    setNameError('');
    setEmailError('');
    setMobileError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Simple name validation
    if (!name) {
      setNameError('Please enter your name');
      console.log('Name error set');
      return;
    }

    // Simple email validation
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Simple mobile number validation
    if (!mobile || !/^\d{10}$/.test(mobile)) {
      setMobileError('Please enter a valid 10-digit mobile number');
      return;
    }

    // Simple password validation
    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }
   
    try{
        let result = await fetch('https://www.api.vidhimantraa.com/registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            contact: mobile,
          }),
        });
  
        if (!result.ok) {
          if(result.status==400){
            Swal.fire('Already Registered', 'User with the same contact or email already exists.', 'error');
          }
          throw new Error(`Error ${result.status}`);
        } else {
          navigate('/login')
        }
      } catch (error) {
        console.error(error.message);
      }
  };

  const handleSignIn = () => {
    navigate("/login")
  };

  return (
    <section className='card_center'>
      <Card style={{ width: '400px', padding: '12px', border: '3px solid #17bf9e',margin:"5px", backgroundColor:"#FFFBEB"  }}>
        <CardBody>
          <CardTitle tag="h2">Sign Up</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Create a new account.
          </CardSubtitle>
          <hr />
          <Form style={{ padding: '10px 0px' }}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ borderColor: nameError ? 'red' : '' }}
              />
              {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
            </FormGroup>

            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderColor: emailError ? 'red' : '' }}
              />
              {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
            </FormGroup>

            <FormGroup>
              <Label for="mobile">Mobile Number</Label>
              <Input
                type="text"
                name="mobile"
                id="mobile"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                style={{ borderColor: mobileError ? 'red' : '' }}
              />
              {mobileError && <p style={{ color: 'red' }}>{mobileError}</p>}
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderColor: passwordError ? 'red' : '' }}
              />
              {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
            </FormGroup>

            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ borderColor: confirmPasswordError ? 'red' : '' }}
              />
              {confirmPasswordError && <p style={{ color: 'red' }}>{confirmPasswordError}</p>}
            </FormGroup>

            <div>
              <button onClick={handleSignUp} className='card_button'>
                Sign Up
              </button>
            </div>
          </Form>
          <hr />
          <div className="mt-3">
            <p>
              Already have an account?{' '}
              <span onClick={handleSignIn} style={{ cursor: 'pointer', color: '#17bf9e' }}>
                Sign In
              </span>
            </p>
          </div>
        </CardBody>
      </Card>
    </section>
  );
};

export default SignUpPage;
