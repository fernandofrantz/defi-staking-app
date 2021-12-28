import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar.js";
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";
import RWD from "../truffle_abis/RWD.json";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({account: accounts[0]})
    const networkId = await web3.eth.net.getId()

    //LOAD Tether TOKEN
    const tetherData = Tether.networks[networkId]
    if(tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address)
      this.setState({tether})
      let tetherBalance = await tether.methods.balanceOf(this.state.account).call()
      this.setState({ tetherBalance: tetherBalance.toString()})
    } else {
      window.alert("tether contract not deployed to detect network")
    }

      //LOAD RWD TOKEN
      const rwdTokenData = RWD.networks[networkId]
      if(rwdTokenData) {
        const rwd = new web3.eth.Contract(RWD.abi, rwdTokenData.address)
        this.setState({RWD})
        let rwdTokenBalance = await rwd.methods.balanceOf(this.state.account).call()
        this.setState({ rwdTokenBalance: rwdTokenBalance.toString()})
      } else {
        window.alert("Reward Token contract not deployed to detect network")
      }

          //Load DecentralBank
          const decentralBankData = DecentralBank.networks[networkId]
          if(decentralBankData) {
            const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
            this.setState({decentralBank})
            let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call()
            this.setState({ stakingBalance: stakingBalance.toString()})
          } else {
            window.alert("TokenForm contract not deployed to detect network")
          }

          this.setState({loading: false})
  }

  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non ethereum browser detected. You should consider Metamask!')
    }
  }


  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      tether: {},
      rwd: {},
      decentralBank: {},
      tetherBalance: "0",
      rwdBalance: "0",
      stakingBalance: "0",
      loading: true,
    };
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <h1>{console.log(this.state.loading)}</h1>
      </div>
    );
  }
}

export default App;
