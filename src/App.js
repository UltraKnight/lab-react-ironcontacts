import React, {Component} from 'react';
import contacts from "./contacts.json";
import './App.css';

export default class App extends Component {
  state = {
    fiveFirst: contacts.slice(0, 5)
  }

  handleNewContact = () => {
    this.setState(state => {
      return {
        fiveFirst: state.fiveFirst.concat(contacts[Math.floor(Math.random() * contacts.length)])
      }
    })
  }
  
  handleSortByName = () => {
    const newArr = [... this.state.fiveFirst];
    this.setState({
        fiveFirst: newArr.sort((a, b) => a.name.localeCompare(b.name))
    })
  }

  handleSortByPopularity = () => {
    const newArr = [... this.state.fiveFirst];
    this.setState({
        //dont access this.state here because the state can be being set yet
        fiveFirst: newArr.fiveFirst.sort((a, b) => b.popularity - a.popularity)
    })
  }

  handleDelete = (id) => {
    this.setState(state => {
      return {
        fiveFirst: state.fiveFirst.filter(contact => contact.id !== id)
      }
    })
  }

  render() {
    const {fiveFirst} = this.state;
    return (
    <div className="App">
      <h1 style={{fontSize: '4rem'}}>IronContacts</h1>
      <button onClick={this.handleNewContact}>Add Random Contact</button>
      <button onClick={this.handleSortByName}>Sort by name</button>
      <button onClick={this.handleSortByPopularity}>Sort by popularity</button>
      <table style={{margin: '0 auto', fontSize: '2.5rem'}}>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
          </tr>
        </thead>
        <tbody style={{textAlign: 'justify'}}>
            {
              fiveFirst.map(contact => {
                return (
                  <tr key={contact.id}>
                    <td><img src={contact.pictureUrl} width="100px" /></td>
                    <td>{contact.name}</td>
                    <td>{contact.popularity.toFixed(2)}</td>
                    <td><button onClick={this.handleDelete.bind(this, contact.id)}>Delete</button></td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
    </div>
  )};
}