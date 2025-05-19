import { FormEvent, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../../store/user-slice';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { useAppDispatch, useAppSelector } from '../../store';
import Header from '../../components/header/header';
import { setError } from '../../store/offers-slice';

export default function LoginScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { isLoading: isAuthLoading } = useAppSelector((state) => state.user);
  const { authorizationStatus } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }
  }, [authorizationStatus, navigate]);

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }, []);

  const validatePassword = useCallback((password: string): boolean => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
    return passwordRegex.test(password);
  }, []);

  const handleSubmit = useCallback(
    (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      if (!loginRef.current || !passwordRef.current) {
        return;
      }

      const email = loginRef.current.value.trim();
      const password = passwordRef.current.value.trim();

      const isValid = validateEmail(email) && validatePassword(password);

      if (!isValid) {
        dispatch(
          setError(
            'password should contain at least one letter and one number and email should be valid'
          )
        );
        return;
      }

      void (async () => {
        try {
          await dispatch(
            loginAction({
              login: email,
              password: password,
            })
          ).unwrap();
        } catch (error) {
          dispatch(setError('Failed to login. Please try again.'));
        }
      })();
    },
    [dispatch, validateEmail, validatePassword]
  );

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
