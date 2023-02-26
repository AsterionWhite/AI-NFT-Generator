import "./App.css";

import GenerateNFTForm from "./GenerateNFTForm";

function App() {
  console.log(process.env.REACT_APP_OPEN_AI_KEY, "yeah >>>>");
  console.log(process.env.REACT_APP_GOERLI_TESTNET_URL, "??????");

  return (
    <div className="App-header">
      <GenerateNFTForm />
    </div>
  );
}

export default App;
