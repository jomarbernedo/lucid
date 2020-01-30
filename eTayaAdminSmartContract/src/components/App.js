import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import Navbar from './Navbar'
import eTaya from '../abis/eTaya.json'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log("Account:",accounts)
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = eTaya.networks[networkId]
//    console.log(networkData.address)
    if(networkData) {
      const ETAYA = web3.eth.Contract(eTaya.abi, networkData.address)
      this.setState({ ETAYA })
//      console.log(ETAYA)


      const data = await ETAYA.methods.getLength().call()
      console.log(data)

      const length = data[0].toNumber()

      const dates = data[1].toString().split(",")
//      console.log("length:",data[0].toNumber(), data[1].toString().split(","))
//      console.log("length",length)
      console.log("dates:",dates)
//      this.setState({ length })
      // Load dates

      this.setState({
        winningDates: [...this.state.winningDates, dates]
      })

      console.log("setstate winningDates updated:",this.state.winningDates.toString().split(","))

      for (var i = 0; i < length; i++) {
        const winner = await ETAYA.methods.getWinners(dates[i]).call()
  //      console.log("dates:",winningDates.toString())
        this.setState({
          winnersDB: [...this.state.winnersDB, {"date":winner[0],"winningNumbers":winner[1],"prize":winner[2]}]
        })

/*        const winnermap = await ETAYA.methods.WinnersDB(20200101).call()
  //      console.log("dates:",winningDates.toString())
        this.setState({
          winnersDBmap: [...this.state.winnersDBmap, winnermap]
        }) */
      } 

      console.log("setstate winnersDB updated:",this.state.winnersDB)
//      console.log("extract first date posted:",this.state.winnersDB[0][0].toString())
//      console.log("setstate winnersDBmap updated:",this.state.winnersDBmap)
//      console.log("setstate winnersDBmap updated:",this.state.winnersDBmap[0]['prize'])

      this.setState({ loading: false })
    } else {
      window.alert('eTaya contract not deployed to detected network.')
    }    
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      length: 0,
      winningDates: [],
      winnersDB: [],
      winnersDBmap: [],
      loading: true
    }

    this.newBet = this.newBet.bind(this)
    this.getBetStatus = this.getBetStatus.bind(this)
    this.verifyClaim = this.verifyClaim.bind(this)
    this.postWinners = this.postWinners.bind(this)
    this.changeOwner = this.changeOwner.bind(this)
    this.changeVerifier = this.changeVerifier.bind(this)
    this.claimedWinnings = this.claimedWinnings.bind(this)


  }

  newBet(txnHash) {
    this.setState({ loading: true })
    this.state.ETAYA.methods.newBet(txnHash).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  getBetStatus(txnHash) {
    this.setState({ loading: true })
    this.state.ETAYA.methods.getBetStatus(txnHash).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  verifyClaim(txnHash) {
    this.setState({ loading: true })
    this.state.ETAYA.methods.verifyClaim(txnHash).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }  

  postWinners(drawdate, winners, prize) {
    this.setState({ loading: true })
    this.state.ETAYA.methods.postWinners(drawdate, winners, prize).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  changeOwner(newOwner) {
    this.setState({ loading: true })
    this.state.ETAYA.methods.changeOwner(newOwner).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  changeVerifier(newVerifier) {
    this.setState({ loading: true })
    this.state.ETAYA.methods.changeVerifier(newVerifier).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  claimedWinnings(txnHash) {
    this.setState({ loading: true })
    this.state.ETAYA.methods.claimedWinnings(txnHash).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main
                  winnersDB={this.state.winnersDB}
                  changeOwner={this.changeOwner}
                  changeVerifier={this.changeVerifier}
                  newBet={this.newBet}
                  getBetStatus={this.getBetStatus}
                  postWinners={this.postWinners}
                  claimedWinnings={this.claimedWinnings} />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
