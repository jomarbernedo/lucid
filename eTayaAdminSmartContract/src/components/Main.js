import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">

        <h1>Change Owner</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const newOwner = this.newOwner.value
          this.props.changeOwner(newOwner)
          console.log("new owner is",newOwner)
        }}>

          <div className="form-group row">
            <label className="col-2 col-form-label">New Owner</label>
            <div className="col-10">
              <input
                className="form-control"
                id="newOwner"
                type="text"
                ref={(input) => { this.newOwner = input }}
                placeholder="Input new owner"
                required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Submit New Owner</button>
        </form>
        <p>&nbsp;</p>

        <h1>Change Verifier</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const newVerifier = this.newVerifier.value
          this.props.changeVerifier(newVerifier)
          console.log("new verifier is",newVerifier)
        }}>

          <div className="form-group row">
            <label className="col-2 col-form-label">New Verifier</label>
            <div className="col-10">
              <input
                className="form-control"
                id="newVerifier"
                type="text"
                ref={(input) => { this.newVerifier = input }}
                placeholder="Input new owner"
                required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Submit New Verifier</button>
        </form>
        <p>&nbsp;</p>





        <h1>Post Winning Numbers</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const _drawdate = this._drawdate.value
          const winners = this.winningNos.value.split(",")
          const prize = this.jackpot.value
          this.props.postWinners(_drawdate, winners, prize)
          console.log("user input of winners submitted.",_drawdate, winners, prize)
        }}>

          <div className="form-group row">
            <label className="col-2 col-form-label">Draw Date</label>
            <div className="col-10">
              <input
                className="form-control"
                id="_drawdate"
                type="text"
                ref={(input) => { this._drawdate = input }}
                placeholder="Input Draw Date (yyyymmdd)"
                required />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-2 col-form-label">Winners</label>
            <div className="col-10">
              <input
                className="form-control"
                id="winningNos"
                type="text"
                ref={(input) => { this.winningNos = input }}
                placeholder="Input Winning Numbers (1,2,3,4,5,6)"
                required />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-2 col-form-label">Prize</label>
            <div className="col-10">
              <input
                className="form-control"
                id="jackpot"
                type="text"
                ref={(input) => { this.jackpot = input }}
                placeholder="Input Prize Amount (10000000)"
                required />
            </div>
          </div>


          <button type="submit" className="btn btn-primary">Submit Winning Numbers</button>
        </form>
        <p>&nbsp;</p>

        <h2>Historical Record of Winning Numbers</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Winning Numbers</th>
              <th scope="col">Prize</th>
            </tr>
          </thead>
          <tbody id="productList">

            { this.props.winnersDB.map((winner, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{winner.date.toString()}</th>
                  <td>{winner.winningNumbers.toString()}</td>
                  <td>{winner.prize.toString()}</td>
                </tr>
              )
            })}

          </tbody>
        </table>

        <h1>Post New Bet</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const txnHash = this.txnHash.value
          this.props.newBet(txnHash)
          console.log("bet posted",txnHash)
        }}>

          <div className="form-group row">
            <label className="col-2 col-form-label">Txn Hash</label>

            <div className="col-10">
              <input
                className="form-control"
                id="txnHash"
                type="text"
                ref={(input) => { this.txnHash = input }}
                placeholder="Input hash"
                required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit Bet</button>
        </form>

        <h1>Get Bet Status</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const txnHash = this.txnHash.value
          this.props.getBetStatus(txnHash)
//          console.log("bet status",txnHash)
        }}>

          <div className="form-group row">
            <label className="col-2 col-form-label">Txn Hash</label>

            <div className="col-10">
              <input
                className="form-control"
                id="txnHash"
                type="text"
                ref={(input) => { this.txnHash = input }}
                placeholder="Input hash"
                required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Query Bet Status</button>
        </form>

        <p>&nbsp;</p>
      </div>
    );
  }
}

export default Main;