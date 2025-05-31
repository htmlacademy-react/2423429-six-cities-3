import Logo from '../logo/logo';
import { useAppDispatch, useAppSelector } from '../../store';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/user/user-slice';
import { getFavorites } from '../../store/favorites/selectors';

type HeaderProps = {
  showNav?: boolean;
};

function Header({ showNav = true }: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleLogout = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  const { authorizationStatus, userData } = useAppSelector(
    (state) => state.user
  );
  const currentFavorites = useAppSelector(getFavorites);

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

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
                        className="header__nav-link header__nav-link--profile header__login"
                        to={AppRoute.Favorites}
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">
                          {userData?.email}
                        </span>
                        <span className="header__favorite-count">
                          {currentFavorites.length}
                        </span>
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
                    <Link
                      className="header__nav-link header__nav-link--profile header__login"
                      to={AppRoute.Login}
                    >
                      <span className="header__signin">Sign in</span>
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
