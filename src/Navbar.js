import React, { Component } from 'react';

class Navbar extends Component {
    
    render() {
        return(
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <div className="container-fluid">
                    <a className="navbar-brand">
                        Crowdfunder
                    </a>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <small className="text-secondary">
                                <small>{this.props.account}</small>
                            </small>
                        </li>
                    </ul>
                </div>

            </nav>
        );
    }
}

export default Navbar;