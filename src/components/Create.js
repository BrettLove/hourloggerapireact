import React from 'react';
import { Redirect } from 'react-router-dom';

export class CreateDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hours: '',
            date: '',
            created: false,
            canceled: false,
        }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

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

    handleCancel() {
        this.setState({ canceled: true });
    }

    render() {
        if(this.state.created) {
            return <Redirect to= {{
                pathname: '/',
                state: { message: 'Created.' }
            }} />
        }

        if(this.state.canceled) {
            return <Redirect to= {{
                pathname: '/'
            }} />
        }

        return (
            <div class="columns is-centered">
                <div class="column is-one-quarter">
                <form onSubmit={this.handleSubmit}>



                <div class="field">
                    <label class="label">Hours</label>
                    <div class="control">
                        <input type="number" name="hours" min="0" step="0.5" onChange={this.handleChange} value={this.state.hours} />
                    </div> 
                </div> 
                <div class="field">
                    <label class="label">Date</label>                
                    <div class="control">
                        <input type="date" name="date" onChange={this.handleChange} value={this.state.date} />
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <button class="button is-primary">Create</button>
                        <button class="button is-text" onClick={this.handleCancel}>Cancel</button>
                    </div>
                </div>
                </form>
            </div>
            </div>
        );
    }
}