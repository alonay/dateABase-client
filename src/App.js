import React, { Component, } from 'react';
import './App.css';
import { Button, } from 'semantic-ui-react'
import Search from "./search"
import CreateChar from "./createChar"

class App extends Component {
  constructor() {
    super()
    this.state = {
      chars: [],
      people: []
    }
  }

  componentDidMount() {
    this.fetchPeople()
    this.fetchChars()
  }

  addPersonToPeople = (person) => {
    const people = this.state.people
    people.push(person)

    this.setState({
      people: people
    })
  }

  addCharToChars = (char) => {
    const chars = this.state.chars
    chars.push(char)

    this.setState({
      chars: chars
    })
  }

  fetchChars = () => {
    fetch("http://localhost:3000/chars")
    .then(res => res.json())
    .then(json =>
      this.setState({
        chars: json
      })
    )
  }

  fetchPeople = () => {
    fetch("http://localhost:3000/persons")
    .then(res => res.json())
    .then(json => this.setState({
      people: json
    }))
  }

  render() {
    return (
      <div className="App">
      <Button>Create New List</Button>
        <header className="App-header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Love_Heart_SVG.svg/2000px-Love_Heart_SVG.svg.png" className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to DateABase</h1>
        </header>
        <p className="App-intro">
          We help you organize all of the people in your life!
        </p>
        <CreateChar
          addCharToChars={this.addCharToChars}
          chars={this.state.chars}
        />
        <Search
          addPersonToPeople={this.addPersonToPeople}
          chars={this.state.chars}
          people={this.state.people}
        />
      </div>
    );
  }
}

export default App;
