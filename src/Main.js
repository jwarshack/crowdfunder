import React, { Component } from 'react';
import DonateForm from './DonateForm';
import { ProgressBar } from "react-bootstrap";



class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fund: null
        }

    }
    render() {
        return(
            <div className="container-fluid mt-5">
                { this.props.modalIsOpen ?
                    <DonateForm
                        closeModal={this.props.closeModal}
                        modalIsOpen={this.props.modalIsOpen}
                        fund={this.state.fund}
                        donate={this.props.donate}
                        />
                        : null
                }
                <div className="row">
                    <div className="col-lg ml-auto mr-auto" style={{ maxWidth: "500px"}}>
                        <div className="content mr-auto ml-auto">
                            <p>&nbsp;</p>
                            <h2>Create Campaign</h2>
                            <form onSubmit={(event) => {
                                event.preventDefault();
                                const name = this.fundName.value;
                                const targetAmount = this.targetAmount.value;
                                this.props.createFund(name, targetAmount);
                            }}>
                                <div className="form-group mr-sm-2">
                                    <input
                                    type="text"
                                    id="fundName"
                                    ref={(input => { this.fundName = input })}
                                    className="form-control"
                                    placeholder="Fund name"
                                    required />
                                    <br></br>
                                    <div className="input-group">
                                        <input
                                        type="number"
                                        step="0.1"
                                        min="0.1"
                                        id="targetAmount"
                                        ref={(input => { this.targetAmount = input})}
                                        className="form-control"
                                        placeholder="Target Amount"
                                        required />
                                        <div class="input-group-append">
                                            <span class="input-group-text">ETH</span>
                                        </div>

                                    </div>

                                </div>
                                <br></br>
                                <button type="submit" className="btn btn-primary btn-block btn-lg">Create Fund</button>
                                </form>

                        </div>
                    </div>
                    <div className="col-lg">
                        <div className="content mr-auto ml-auto">
                            <p>&nbsp;</p>
                            <h2>Active Campaigns</h2>
                            { 
                            this.props.funds.map((fund, key) => {
                                return(
                                    <div className="card mb-4" key={key}>
                                        <div className="card-header">
                                            <small className="text-muted">{fund.name}</small>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li key={key} className="list-group-item">
                                                <p className="text-muted">Current amount: {window.web3.utils.fromWei(fund.currentAmount, "Ether")} ETH</p>
                                                <p className="text-muted">Target amount: {window.web3.utils.fromWei(fund.targetAmount, "Ether")} ETH</p>

                                                <ProgressBar now={fund.currentAmount/fund.targetAmount*100} label={`${(fund.currentAmount/fund.targetAmount*100).toFixed(2)}% complete`}/>
                                                {console.log(fund.currentAmount, fund.targetAmount, fund.name)}
                                                <p>&nbsp;</p>

                                                <button 
                                                    className="btn btn-primary btn-sm pt-0"
                                                    onClick={(event) =>{
                                                        this.props.openModal();
                                                        this.setState({ fund: fund})
                                                    }}
                                                    >
                                                    Donate
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;