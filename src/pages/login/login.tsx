import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store';
import Header from '../../components/header/header';

import {
  getAuthorizationStatus,
  getAuthLoadingStatus,
} from '../../store/user/selectors';

import { loginAction } from '../../store/user/user-slice';
import { setError } from '../../store/app/app-slice';
import { CITIES } from '../../const/cities';
import { City } from '../../types/offer';
import { changeCity } from '../../store/offers/offers-slice';

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
  return passwordRegex.test(password);
};

export default function LoginScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const isAuthLoading = useAppSelector(getAuthLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [randomCity, setRandomCity] = useState<City | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [, setEmail] = useState('');
  const [, setPassword] = useState('');

  useEffect(
    () => () => {
      setEmail('');
      setPassword('');
    },
    []
  );

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * CITIES.length);
    setRandomCity(CITIES[randomIndex]);
  }, []);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }
  }, [authorizationStatus, navigate]);

  const handleSubmit = async () => {
    if (!loginRef.current || !passwordRef.current) {
      return;
    }

    const testEmail = loginRef.current.value.trim();
    const testPassword = passwordRef.current.value.trim();

    const isValid = validateEmail(testEmail) && validatePassword(testPassword);

    if (!isValid) {
      dispatch(
        setError(
          'password should contain at least one letter and one number and email should be valid'
        )
      );
      return;
    }

    try {
      await dispatch(
        loginAction({
          login: testEmail,
          password: testPassword,
        })
      ).unwrap();
      setEmail('');
      setPassword('');
    } catch (error) {
      dispatch(setError('Failed to login. Please try again.'));
    }
  };

  const handleCityClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (randomCity) {
      dispatch(changeCity(randomCity));
      navigate(AppRoute.Root);
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
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              method="post"
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  disabled={isAuthLoading}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  disabled={isAuthLoading}
                />
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
              <a
                className="locations__item-link"
                href="#"
                onClick={handleCityClick}
              >
                <span>{randomCity?.name}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
