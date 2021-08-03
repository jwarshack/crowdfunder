import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';

class DonateForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            amountIsOver: false
        }
      }

    
    render() {
        return(
            <Modal show={this.props.modalIsOpen} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.fund.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        let amount = this.donation.value;
                        amount = window.web3.utils.toWei(amount, "Ether")
                        const fund = this.props.fund;
                        const current = fund.currentAmount;
                        const target = fund.targetAmount;
                        const deficit = target-current;
                        console.log(amount, deficit);

                        if(amount > deficit) {
                            this.setState({ amountIsOver: true });
                        } else {
                            const id = this.props.fund.id;
                            this.props.donate(id, amount);
                            this.props.closeModal();
                        }



                    }}>
                        <div className="input-group">

                   
                        <input
                        type="number"
                        ref={(input) => { this.donation = input }}
                        step="0.1"
                        min="0.1"
                        id="donation"
                        className="form-control"
                        required />
                       <div class="input-group-append">
                         <span class="input-group-text">ETH</span>
                        </div>
                        </div>
                        <p>&nbsp;</p>
                            <button type="submit" className="btn btn-primary btn-block btn-lg">Donate</button>


                    </form>

                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    { this.state.amountIsOver 
                    ? <p className="text-danger">The amount you selected is over the target</p>
                    : null
                }
                </Modal.Footer>
            </Modal>
        );
        
    }
}

export default DonateForm;