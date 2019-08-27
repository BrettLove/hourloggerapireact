import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavBar extends React.Component {

    render() {
        return (
            <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <div className="navbar-item"><Link to="/"><button className="button is-dark">
                        HourLogger</button></Link>
                    </div>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item"><Link to="/"><button className="button is-dark">
                            View Log</button>
                            </Link>
                        </div>
                        <div className="navbar-item"><Link to="/create"><button className="button is-dark">
                            Add Entry
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}