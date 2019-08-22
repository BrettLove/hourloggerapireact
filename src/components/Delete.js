import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const baseUrl = 'https://localhost:5001/api/hourlogger/';

export class DeleteDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hours: 0,
            date: '',
            loading: true,
            deleted: false
        }

    const url = baseUrl + this.props.location.state.guid;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            this.setState({ hours: data.hours, date: data.date, loading: false});
        })

    this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        const url = baseUrl + this.props.location.state.guid;
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

        return (
            <div><h1>Delete entry on {date} for {this.state.hours} hours? </h1>
            <button onClick={this.handleDelete}>Yes, delete!</button></div>
        );
    }
}