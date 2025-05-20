import Logo from '../logo/logo';
import { logoutAction } from '../../store/user-slice';
import { useAppDispatch, useAppSelector } from '../../store';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const/const';

type HeaderProps = {
  showNav?: boolean;
};

function Header({ showNav = true }: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { authorizationStatus, userData } = useAppSelector(
    (state) => state.user
  );
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const handleLogout = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo type="header" />
          </div>
          {showNav && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isAuth ? (
                  <>
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.Favorites}
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">
                          {userData?.email}
                        </span>
                        <span className="header__favorite-count">3</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a
                        className="header__nav-link"
                        href="#"
                        onClick={handleLogout}
                      >
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={AppRoute.Login}>
                      <span className="header__signout">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
