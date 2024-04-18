import abi from "./contract/chai.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import chai from "./todo.png";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [data, setData] = useState();
  const [account, setAccount] = useState("None");
  const [contracts, setContracts] = useState([]);
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xCc7A3AE597443d3d581d34E728C3CBc4CbaD5CEA";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  console.log(data, "datadatadata");
  return (
    <>
      {" "}
      <div
        style={{ backgroundColor: "#EFEFEF", height: "100%" }}
        className="text-center"
      >
        <img
          src={chai}
          className="img-fluid"
          alt=".."
          // height="500px"
          width="20%"
        />
        <p
          class="text-muted lead "
          style={{ marginTop: "10px", marginLeft: "5px" }}
        >
          <small>Connected With - {account}</small>
        </p>
      </div>
      <div>
        <div className="container">
          <Buy state={state} setData={setData} contracts={contracts} />
          <Memos state={state} data={contracts} />
        </div>
      </div>
    </>
  );
}

export default App;
