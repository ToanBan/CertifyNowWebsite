import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG, faLinkedinIn  } from '@fortawesome/free-brands-svg-icons';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false); 
  const [isRegister, setRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [verify, setVerify] = useState(false);
  
  const togglePanel = () => {
    setIsSignUp(!isSignUp); 
  };

  const HandleRegister = (e) => {
    e.preventDefault();
    const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
    const formData = new FormData(e.target);
    fetch('/register', {
      method:"POST", 
      body: formData, 
      headers: {
        'X-CSRF-TOKEN': csrfTokenMeta.content,
      }
    })
    .then(response => response.json())
    .then(data => {
      setRegister(true);
    })
    .catch(err => console.error(err));

  }

  const HandleLogin = (e) => {
    e.preventDefault();
    const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
    const formData = new FormData(e.target);
    fetch('/login', {
      method :"POST", 
      body: formData,
      headers : {
        'X-CSRF-TOKEN' : csrfTokenMeta.content,
      }
    })
    .then(response => response.json())
    .then(data => {
      window.location.href = '/verify';
    })
  }

 

  return (
    <div className="position-relative" style={{height:"100vh"}}>
      
        <div className={`alert alert-success alert-dismissible ${isRegister ? 'open-alert' : ''}`}>

            <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
            <strong>Success!</strong> Bạn Đã Đăng Ký Thành Công
        </div>
        
      

      <div className={`containerr ${isSignUp ? "right-panel-active" : ""}`}>
        <div className="form-container sign-up-container">
            <form onSubmit={HandleRegister}>
                <h1>Create Account</h1>
                <div className="social-container">
                <a href="#" className="social">
                    <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#" className="social">
                    <FontAwesomeIcon icon={faGooglePlusG} />
                </a>
                <a href="#" className="social">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
                </div>
                <span>or use your email for registration</span>
                <input type="text" placeholder="Name" name="username"/>
                <input type="email" placeholder="Email" name="email"/>
                <input type="password" placeholder="Password"  name="password"/>
                <button className="button">Sign Up</button>
            </form>
        </div>


        <div className="form-container sign-in-container">
          <form onSubmit={HandleLogin}>
                <h1>Sign in</h1>
                <div className="social-container d-flex justify-content-center align-items-center">
                <a href="#" className="social">
                    <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#" className="social">
                    <FontAwesomeIcon icon={faGooglePlusG} />
                </a>
                <a href="#" className="social">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                </a>

                <a href="#" className="social">
                    <img style={{width:"63px"}} src="https://img.freepik.com/premium-vector/face-id-approved-green-logo-simple-flat-trend-modern-faceid-logotype-graphic-design-isolated-white-concept-gaining-access-smart-phone-personal-information-facial-recognition-program_775815-565.jpg?w=360" alt="" />
                </a>

                </div>
                <span>or use your account</span>
                <input type="email" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="password"/>
                <a href="#">Forgot your password?</a>
                <button className="button">Sign In</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost button" onClick={togglePanel}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost button" onClick={togglePanel}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
    
  );
}
