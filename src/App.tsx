import './App.css';
import {scalesOfSize} from "./theory";

function App() {
  const sizes = [...Array(12).keys()].map((i) => i + 1);
  return (
    <div className="App">
      <header className="App-header">
        {
          sizes.map(size => (
          <p>
           <strong>{scalesOfSize(size).length}</strong> {size}-note {size > 1 ? "scales" : "scale"}.
          </p>))
        }
      </header>
    </div>
  );
}

export default App;
