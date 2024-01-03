import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
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
import Swal from 'sweetalert2'

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
  
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address');
      return;
    }
  
    // Simple password validation
    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
  
    try {
      const result = await fetch('http://www.api.vidhimantraa.com/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (!result.ok) {
        console.log('Error:', result.statusText);
        // Handle error, maybe show a message to the user
        return;
      }
  
      const data = await result.json();
  
      // Check if email and password match
      if (data.email === email) {
        let domain = email.split("@")[1]
        // Successful sign-in
        if (domain === 'vm.com') {
          localStorage.setItem("vmadmin",email)
          // Redirect to the admin page
          window.location.href = '/admin';
        } else {
          localStorage.setItem("student",email)
          // Redirect to the student page
          window.location.href = '/student';
        }
      } else {
        console.log('Invalid email or password');
        // Display a sweet alert for the error
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid email or password!',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      // Display a sweet alert for the error
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };
  
  const handleSignUp = () => {
    navigate('/registration')
  };

  return (
    <section className='card_center'>
      <Card style={{ width: '400px', padding: '12px', border: '3px solid #17bf9e', backgroundColor:"#FFFBEB" }}>
        <CardBody>
          <CardTitle tag="h2">Sign In</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Welcome back! Sign in to your account.
          </CardSubtitle>
          <hr />
          <Form style={{ padding: '10px 0px' }}>
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
            <div>
              <button onClick={handleSignIn} className='card_button'>
                Sign In
              </button>
            </div>
          </Form>
          <hr />
          <div className="mt-3">
            <p>
              Not registered?{' '}
              <span onClick={handleSignUp} style={{ cursor: 'pointer', color: '#17bf9e' }}>
                Sign Up
              </span>
            </p>
          </div>
        </CardBody>
      </Card>
    </section>
  );
};

export default SignInPage;
