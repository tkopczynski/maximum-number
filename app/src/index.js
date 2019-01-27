import Web3 from "web3";
import maximumNumberArtifact from "../../build/contracts/MaximumNumber.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = maximumNumberArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        maximumNumberArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
      this.winningNumber();
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  winningNumber: async function() {
    const { winningNumber } = this.meta.methods;
    const currentWinningNumber = await winningNumber().call();

    const currentWinningNumberElement = document.getElementById("currentWinningNumber");
    currentWinningNumberElement.innerHTML = currentWinningNumber;
  },

  reset: async function() {
    const { reset } = this.meta.methods;
    await reset().send({ from: this.account });
    this.winningNumber();
  },

  sendNumber: async function() {
    const amount = parseInt(document.getElementById("numberToSend").value);

    this.setStatus("Initiating transaction... (please wait)");

    const { sendNumber } = this.meta.methods;
    await sendNumber(amount).send({ from: this.account });

    this.setStatus("Transaction complete!");

    this.winningNumber();
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },
};

window.App = App;

window.addEventListener("load", function() {
//  if (window.ethereum) {
//    // use MetaMask's provider
//    App.web3 = new Web3(window.ethereum);
//    window.ethereum.enable(); // get permission to access accounts
//  } else {
//    console.warn(
//      "No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",
//    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
    );
//  }

  App.start();
});
