import Main from '../pages/main/main';

type NumberOfPlaces = {
  placesCount: number;
}

function App({placesCount}: NumberOfPlaces): JSX.Element {
  return (
    <Main placesCount={placesCount} />
  );
}

export default App;
