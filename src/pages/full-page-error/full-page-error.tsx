import { Nullable } from 'vitest';

function FullPageError({
  message,
}: {
  message?: Nullable<string>;
}): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Error. Something went wrong.</h1>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a
                className="locations__item-link"
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  window.location.reload();
                }}
              >
                <span>{message || 'Something went wrong'}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default FullPageError;
