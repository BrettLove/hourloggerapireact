import React from 'react';
import {Route, Redirect, Link} from 'react-router-dom';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            days: [], 
            loading: true
        };

    fetch(this.props.baseUrl)
        .then(response => response.json())
        .then(data => {
        this.setState({ days: data, loading: false});
        })

    this.handleDelete = this.handleDelete.bind(this);

    }

    renderDaysTable (days) {
    //this mutates the original array, could use .slice(0) to create a new array
    days.sort((a,b) => {
        const a_date = new Date(a.date);
        const b_date = new Date(b.date);
        return a_date > b_date ? 1 : -1;
    });
    //console.table(days);
    var regex = new RegExp('[T]');
    const dayRows = days.map((day) => {
        return (
        <tr key={day.guid}>
            <td>{day.hours}</td>
            <td>{day.date.slice(0,(day.date.search(regex)))}</td>
            <td><Link to={{
                pathname: '/edit',
                state: { guid: day.guid }
            }}><button>Edit</button></Link></td>
            <td><Link to={{
                            pathname: "/delete",
                            state: { guid: day.guid }
                          }}><button>Delete</button></Link></td>
        </tr>
        )
    });

    var tableheader;
    let message;
    if(this.props.location.state) {
        message = this.props.location.state.message;
    }
    if(message) {
        tableheader = (
            <thead>
                <tr>
                    <th rowSpan='4'>
                        {message}
                    </th>
                </tr>
            </thead>);
    } 

    return (
        <table>
            {tableheader}
            <tbody>
            {dayRows}
            <tr><td><Link to="/create">Create a new entry.</Link></td></tr>
            </tbody>
        </table>
    );
    }


    // handleDelete(event) {
    // const url = baseUrl + event.target.id;
    // fetch(url, {
    //     method: 'DELETE',
    //     headers: {
    //     Accept: 'application/json',
    //     'content-type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //     guid: event.target.id,
    //     }),
    // });
    // console.log(event.target.id);
    // }

    handleDelete() {

    }

    render() {
    let contents = this.state.loading
    ? <p><em>Loading...</em></p>
    : this.renderDaysTable(this.state.days);

    return (
        <div>
        {contents}
        </div>
    )
    }
}