import './Loader.css'; // Импортируйте файл стилей

function Loader(): JSX.Element {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

export default Loader;
