import React from 'react';

const baseUrl = 'https://localhost:5001/api/hourlogger/';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            days: [], 
            loading: true
        };

    fetch(baseUrl)
        .then(response => response.json())
        .then(data => {
        this.setState({ days: data, loading: false});
        })

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    }

    renderDaysTable (days) {
    //this mutates the original array, could use .slice(0) to create a new array
    days.sort((a,b) => {
        const a_date = new Date(a.date);
        const b_date = new Date(b.date);
        return a_date > b_date ? 1 : -1;
    });
    console.table(days);
    var regex = new RegExp('[T]');
    const dayRows = days.map((day) => {
        return (
        <tr key={day.guid}>
            <td>{day.hours}</td>
            <td>{day.date.slice(0,(day.date.search(regex)))}</td>
            <td><button onClick={this.handleEdit} id={day.guid}>Edit</button></td>
            <td><button onClick={this.handleDelete} id={day.guid}>Delete</button></td>
        </tr>
        )
    });

    return (
        <table>
        <tbody>
        {dayRows}
        </tbody>
        </table>
    );
    }

    handleEdit(event) {
    const url = baseUrl + event.target.id;
    console.log(event.target.id);
    }

    handleDelete(event) {
    const url = baseUrl + event.target.id;
    fetch(url, {
        method: 'DELETE',
        headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        },
        body: JSON.stringify({
        guid: event.target.id,
        }),
    });
    console.log(event.target.id);
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