import React, {Component} from 'react';
import contacts from "./contacts.json";
import './App.css';

let myContacts = contacts.slice(5);

export default class App extends Component {
  state = {
    fiveFirst: contacts.slice(0, 5)
  }

  handleNewContact = () => {
    if(myContacts.length) {
      const index = Math.floor(Math.random() * myContacts.length);
      this.setState(state => {
        return {
          fiveFirst: state.fiveFirst.concat(myContacts.splice(index, 1))
        }
      })
      console.log(myContacts.length)
    } else {
      alert('You added all the contacts!')
    }
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
        fiveFirst: newArr.sort((a, b) => b.popularity - a.popularity)
    })
  }

  handleDelete = (id) => {
    myContacts.push(this.state.fiveFirst.filter(c => c.id === id)[0])
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
      <h1>IronContacts</h1>
      <button onClick={this.handleNewContact}>Add Random Contact</button>
      <button onClick={this.handleSortByName}>Sort by name</button>
      <button onClick={this.handleSortByPopularity}>Sort by popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {
              fiveFirst.map(contact => {
                return (
                  <tr key={contact.id}>
                    <td><img src={contact.pictureUrl} width="100px" /></td>
                    <td>{contact.name}</td>
                    <td>{contact.popularity.toFixed(2)}</td>
                    <td><button className='delete' onClick={this.handleDelete.bind(this, contact.id)}>Delete</button></td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
    </div>
  )};
}