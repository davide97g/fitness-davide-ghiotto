import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Fitness Davide Ghiotto</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Rep count: {count}
        </button>
      </div>
    </div>
  );
}

export default App;
