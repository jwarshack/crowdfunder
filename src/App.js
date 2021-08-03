import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import Web3 from 'web3';
import Crowdfunder from './abis/Crowdfunder.json';
import Main from './Main.js';
import Navbar from './Navbar.js';
import { Nav } from 'react-bootstrap';






class App extends Component {

  async componentDidMount() {
    await this.ethEnabled();
    await this.loadBlockchainData();
  }



  ethEnabled = async () => {
    if (window.ethereum) {
      await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);
      return true;
    }
    return false;
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    
    const networkID = await web3.eth.net.getId();
    const networkData = Crowdfunder.networks[networkID];

    if(networkData) {
      const crowdfunder = new web3.eth.Contract(Crowdfunder.abi, networkData.address);
      this.setState({ crowdfunder });
      const fundCount = await crowdfunder.methods.fundCount().call();
      this.setState({ fundCount });

      for (var i = 1; i <= fundCount; i++) {
        const fund = await crowdfunder.methods.funds(i).call();
        if (fund.currentAmount < fund.targetAmount) {
          this.setState({
            funds: [...this.state.funds, fund]
          })
        }

      }

      this.setState({ loading: false });
    } else {
      window.alert('Crowdfunder has not been deployed');
    }
  }



  donate = (id, amount) => {
    this.setState({ loading: true });
    console.log("donating");
    this.state.crowdfunder.methods.donate(id).send({ from: this.state.account, value: amount }).on('transactionHash', (hash) => {
      this.setState({ loading: false });
      window.location.reload();
      alert("Successfully donated");


    })
  }

  createFund = (name, amount) => {
    console.log("creating fund");
    this.setState({ loading: true });
    amount = window.web3.utils.toWei(amount, "Ether");

    this.state.crowdfunder.methods.createFund(name, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false });
      console.log("Fund created successfully");
      alert('Successfully created fund')
      window.location.reload();
      
    })

  }


  openModal = () => this.setState({ modalIsOpen: true });
  closeModal = () => this.setState({ modalIsOpen: false });



   

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      crowdfunder: null,
      funds: [],
      loading: false,
      modalIsOpen: false
    }
  }
  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading 
        ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
        :<Main
        funds={this.state.funds}
        donate={this.donate}
        createFund={this.createFund}
        openModal={this.openModal}
        modalIsOpen={this.state.modalIsOpen}
        closeModal={this.closeModal}
        />
      }   
      </div>
    );
  }

}

export default App;
