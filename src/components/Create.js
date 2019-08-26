import React from 'react';
import { Redirect } from 'react-router-dom';

export class CreateDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hours: '',
            date: '',
            created: false,
        }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    }

    handleSubmit(e) {
//        console.log(this.state);
        console.log(this.props.baseUrl);
        fetch(this.props.baseUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                hours: this.state.hours,
                date: this.state.date,
            }),
        })
        .then(() => this.setState({ created: true }));
        e.preventDefault();
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    render() {
        if(this.state.created) {
            return <Redirect to= {{
                pathname: '/',
                state: { message: 'Created.' }
            }} />
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="number" name="hours" min="0" step="0.5" onChange={this.handleChange} value={this.state.hours}></input>
                    <input type="date" name="date" onChange={this.handleChange} value={this.state.date}></input>
                    <input type="submit" value="Create"></input>
                </form>
            </div>
        );
    }
}