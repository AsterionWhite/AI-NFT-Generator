import "./App.css";
import { useEffect } from "react";

import GenerateNFTForm from "./GenerateNFTForm";

function App() {
  console.log(process.env.REACT_APP_OPEN_AI, "yeah >>>>");

  return (
    <div className="App-header">
      <GenerateNFTForm />
    </div>
  );
}

export default App;
