import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';

type LogoProps = {
  type: 'header' | 'footer';
};

const sizes = {
  header: {
    width: 81,
    height: 41,
  },
  footer: {
    width: 64,
    height: 33,
  },
};

function Logo({ type }: LogoProps): JSX.Element {
  const { width, height } = sizes[type];

  return (
    <Link to={AppRoute.Root} className={`${type}__logo-link`}>
      <img
        className={`${type}__logo`}
        src="img/logo.svg"
        alt="6 cities logo"
        width={width}
        height={height}
      />
    </Link>
  );
}

export default Logo;
