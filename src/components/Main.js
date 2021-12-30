import React, { Component } from "react";
import tether from '../tether.png'
import Airdrop from "./Airdrop";

class Main extends Component {
  render() {
    return (
        <div id="content" className="mt-3" >
            <table className="table text-muted text-center">
                <thead>
                    <tr style={{color:'whitesmoke'}}>
                        <th scope="col">Staking Balance</th>
                        <th scope="col">Reward Balance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{color:'whitesmoke'}}>
                        <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} USDT</td>
                        <td>{window.web3.utils.fromWei(this.props.rwdBalance, 'Ether')} RWD</td>
                    </tr>
                </tbody>
            </table>
            <div className="card mb-2 bg-light" style={{opacity:'.9', padding: '15px', border: '2px solid gray' }}>
                <form 
                className="mb-3"
                onSubmit={(event) => {
                    event.preventDefault();
                    let amount = this.input.value.toString()
                    amount = window.web3.utils.toWei(amount, 'Ether')
                    this.props.stakeTokens(amount)
                }}
                >
                    <div style={{borderSpace:'0 1em'}}>
                        <label className="float-left" style={{marginLeft: '15px', marginTop: '15px'}}>
                            <h4>
                                Stake Tokens
                            </h4>
                        </label>
                        <span className="float-right" style={{marginRight:'8px'}}>
                            <h4>
                                Balance:
                            </h4>
                            <h5>
                                {window.web3.utils.fromWei(this.props.tetherBalance, 'Ether')} 
                                &nbsp;ETH
                            </h5>
                        </span>
                        <div className="input-group mb-4">
                            <input ref={(input) => this.input = input} type='text' placeholder="0" required style={{marginLeft: '15px'}}/>
                            <div className="input-group-open">
                                <div className="input-group-text">
                                    <img src={tether} alt='' height='32'></img>
                                    &nbsp;&nbsp; USDT
                                </div>
                            </div>
                        </div>
                        <button type='submit' className="btn btn-primary byn-lg btn-block">DEPOSIT</button>
                    </div>
                </form>
                <button 
                    type='submit' 
                    className="btn btn-primary byn-lg btn-block"
                    onClick={(evt) => {
                        evt.preventDefault(
                            this.props.unstakeTokens()
                        )
                    }} 
                >
                    WITHDRAW
                </button>
                <div 
                className="card-body text-center" 
                style={{color:'blue'}}
                >
                    AIRDROP 
                    <Airdrop 
                    stakingBalance={this.props.stakingBalance}
                    />
                </div>
            </div>
        </div>
    );
  }
}

export default Main;
