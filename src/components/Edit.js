import React from 'react';
import {Redirect} from 'react-router-dom';


export class EditDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hours: '',
            date: '',
            loading: true,
            edited: false,
            canceled: false,
        };

        var url = this.props.baseUrl + this.props.location.state.guid;

        fetch(url)
        .then(response => response.json())
        .then(data => {
        
        const regex = new RegExp('[T]');
        const date = data.date;
        const date_formatted = date.includes("T") 
                                        ? date.slice(0,date.search(regex)) 
                                        : date;
        this.setState({
            hours: data.hours,
            date: date_formatted,
            loading: false,
        });
    })

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    // handleSubmit() {
    //     const url = baseUrl + this.props.location.state.guid;
    //     fetch(url, {
    //         method: 'PUT',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             guid: this.props.location.state.guid,
    //             hours: this.state.hours,
    //             date: this.state.date,
    //         })
    //     }).then (() => this.setState(() => ({ edited: true })));

    // }


    handleSubmit(e) {
        const url = this.props.baseUrl + this.props.location.state.guid;
        // console.log(this.props.location.state.guid);
        // console.log(url);
        e.preventDefault();
        // var json = JSON.stringify({guid: this.props.location.state.guid,
        //     hours: this.state.hours,
        //     date: this.state.date,});
        //  console.log(json);
        fetch(url, {
            method: 'PUT',
            headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
            },
            body: JSON.stringify({
            guid: this.props.location.state.guid,
            hours: this.state.hours,
            date: this.state.date,
            }),
        })
    .then(() => this.setState(() => ({
        edited: true
    })));
    }

    handleCancel() {
        this.setState({ canceled: true });
    }

    render() {
        if(this.state.edited) {
            return <Redirect to = {{
                pathname: '/',
                state: { message: 'Record updated.' }
            }} />
        }

        if(this.state.canceled) {
            return <Redirect to="/" />;
        }

        return (
            <div className="columns is-centered  has-padding-20">
            <div className="column is-one-quarter">
            <form onSubmit={this.handleSubmit}>
                <div className="field">
                    <label className="label">Hours</label>
                    <div className="control">
                        <input type="number" name="hours" min="0" step="0.5" onChange={this.handleChange} value={this.state.hours} />
                    </div> 
                </div> 
                <div className="field">
                    <label className="label">Date</label>                
                    <div className="control">
                        <input type="date" name="date" onChange={this.handleChange} value={this.state.date} />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button className="button is-info">Update</button>
                        <button className="button is-text" onClick={this.handleCancel}>Cancel</button>
                    </div>
                </div>
            </form>
            </div>
            </div>
        )
    }
}