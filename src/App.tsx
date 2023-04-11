import { ReactNode } from "react";
import "antd/dist/reset.css";
import "./App.css";

function App({ children }: { children: ReactNode }) {
  return (
    <div className="App">
      <header className="App-header">
        <h3>DG / Fitness</h3>
      </header>
      <main className="App-main">{children}</main>
    </div>
  );
}

export default App;
