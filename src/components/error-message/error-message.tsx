import { useAppSelector } from '../../store';
import './error-message.css';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector((state) => state.AliantError);

  return error ? <div className="error-message">{error}</div> : null;
}

export default ErrorMessage;
