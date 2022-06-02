import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthInput from '../components/AuthInput';
import { signIn, signUp } from '../redux/actions/authAction';
import { AUTH } from '../redux/constantsType/actionType';

const initialState = {
      username: "",
      email: '',
      phoneNumber: "",
      password: '',
      confirmPassword: ''
};

const Auth = () => {
      const [form, setForm] = useState(initialState);
      const [isSignUp, setIsSignUp] = useState(false);
      const [showPassword, setShowPassword] = useState(false);
      const handleShowPassword = () => setShowPassword(!showPassword);
      const [error, setError] = useState(false)
      const navigate = useNavigate();
      const dispatch = useDispatch();

      const handleChange = (e) => {
            setForm({ ...form, [e.target.name]: e.target.value });

      }

      const checkPassword = () => {
            if (form.password !== form.confirmPassword && isSignUp && form.confirmPassword.length > 6) {
                  setError(true);
            } else {
                  setError(false)
            }
      }

      const handleSwitch = () => {
            setIsSignUp(!isSignUp);
      }

      const handleClick = async (e) => {
            e.preventDefault();
            dispatch({ type: AUTH });
            if (isSignUp) {
                  dispatch(signUp(form, navigate));
            } else {
                  dispatch(signIn(form, navigate));
            }
      };

      return (
            <div className="login">
                  <div className="login__container">
                        <AuthInput name="username" type="text" placeholder="Username" handleChange={handleChange} className="login__container__input" />
                        <AuthInput name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" handleChange={handleChange} handleShowPassword={handleShowPassword} className="login__container__input" />
                        {isSignUp && (
                              <>
                                    <AuthInput placeholder='Confirm Password' name='confirmPassword' type='password' handleChange={handleChange} checkPassword={checkPassword} className="login__container__input" />
                                    <AuthInput placeholder='Email' name='email' type='text' handleChange={handleChange} className="login__container__input" />
                                    <AuthInput placeholder='Phone Number' name='phoneNumber' type='text' handleChange={handleChange} className="login__container__input" />
                              </>
                        )}
                        <button disabled={error} onClick={handleClick} onKeyUp={checkPassword} className="login__container__button">
                              {isSignUp ? 'Register' : 'Login'}
                        </button>
                        <span onClick={handleSwitch} className="login__container__switch">
                              {isSignUp ? 'Already have an account? Sign In' : 'Dont have an account? Sign Up'}
                        </span>
                        {error &&
                              <span className="login__container__error">Password does not match!</span>
                        }
                  </div>
            </div>
      )
}

export default Auth