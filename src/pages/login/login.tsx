import { FormEvent, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../store';
import Header from '../../components/header/header';

export default function LoginScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isAuthLoading = useAppSelector((state) => state.isAuthLoading);

  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }
  }, [authorizationStatus, navigate]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!loginRef.current || !passwordRef.current) {
      return;
    }

    const email = loginRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!email) {
      setLoginError('Email is required');
      return;
    } else if (!validateEmail(email)) {
      setLoginError('Please enter a valid email address');
      return;
    } else {
      setLoginError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      return;
    } else if (!validatePassword(password)) {
      setPasswordError(
        'Password must contain at least one letter and one number'
      );
      return;
    } else {
      setPasswordError('');
    }

    setIsLoading(true);
    try {
      await dispatch(
        loginAction({
          login: email,
          password: password,
        })
      ).unwrap();
    } catch (error) {
      setLoginError('Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page page--gray page--login">
      <Header showNav={false} />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              onSubmit={handleSubmit}
              method="post"
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className={`login__input form__input ${
                    loginError ? 'input-error' : ''
                  }`}
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  disabled={isAuthLoading}
                />
                {loginError && (
                  <div
                    className="login__error"
                    style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}
                  >
                    {loginError}
                  </div>
                )}
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className={`login__input form__input ${
                    passwordError ? 'input-error' : ''
                  }`}
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  disabled={isAuthLoading}
                />
                {passwordError && (
                  <div
                    className="login__error"
                    style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}
                  >
                    {passwordError}
                  </div>
                )}
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={isAuthLoading}
              >
                {isAuthLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
