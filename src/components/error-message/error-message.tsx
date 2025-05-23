import { useAppSelector } from '../../store';
import { getHasError } from '../../store/offers/selectors';
import './error-message.css';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(getHasError);

  return error ? <div className="error-message">{error}</div> : null;
}

export default ErrorMessage;
