import { useAppSelector } from '../../store';
import { getAppError } from '../../store/app/selectors';

import './error-message.css';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(getAppError);

  return error ? <div className="error-message">{error}</div> : null;
}

export default ErrorMessage;
