import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export class DeleteDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hours: 0,
            date: '',
            loading: true,
            deleted: false,
            canceled: false,
        }

    const url = this.props.baseUrl + this.props.location.state.guid;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            this.setState({ hours: data.hours, date: data.date, loading: false});
        })

    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    }

    handleDelete() {
        const url = this.props.baseUrl + this.props.location.state.guid;
        fetch(url, {
            method: 'DELETE',
            headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
            },
            body: JSON.stringify({
            guid: this.props.location.state.guid,
            }),
        })
    .then(() => this.setState(() => ({
        deleted: true
    })));
    }
    
    handleCancel(e) {
        this.setState({ canceled: true });
        e.preventDefault();
    }

    render() {
        let regex = new RegExp('T')
        let date = this.state.date.slice(0,this.state.date.search(regex));
    
        if(this.state.deleted) {
            return <Redirect to= {{
                pathname: '/',
                state: {
                    message: 'Deleted.'
                }
            }} />
        }

        if(this.state.canceled) {
            return <Redirect to="/" />;
        }

        return (
            <div className="columns is-centered has-padding-20">
            <div className="column is-one-quarter">
                <div className = "control" ><h1>Delete entry on {date} for {this.state.hours} hours? </h1></div>
                <div className="control has-padding-5"><button className="button is-info" onClick={this.handleDelete}>Yes, delete!</button><button className="button is-text" onClick={this.handleCancel}>Cancel</button></div>
            </div>
            </div>
            
        );
    }
}