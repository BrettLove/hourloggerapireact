import React from 'react';
import { NavBar } from './Navbar';

export class Layout extends React.Component {

    render() {
        return (
            <div>
                <NavBar />
                <div className="Container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}