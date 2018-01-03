import React from "react"
import { Button } from 'semantic-ui-react'

class CreatePerson extends React.Component{
  constructor(){
    super()
    this.state = {
      clicked: false,
      newName: '',
      newRating: '',
      newInstagram: '',
      newPersonChars: [],
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/persons', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.newName,
        ig: this.state.newInstagram,
        fit: this.state.newRating,
        person_chars: []
        // TODO - send person_chars to Server and update Database
        // person_chars: this.state.newPersonChars,
      })
    })
    .then(res => res.json())
    .then(json => {
      this.props.addPersonToPeople(json)
    })
  }

  toggleForm = (event) => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  updateNewInstagram = (event) => {
    this.setState({
      newInstagram: event.target.value
    })
  }

  updateNewName = (event) => {
    this.setState({
      newName: event.target.value
    })
  }

  updateNewRating = (event) => {
    this.setState({
      newRating: event.target.value
    })
  }

  updateNewPersonChar = (event, charId) => {
    const newPersonChars = this.state.newPersonChars
    let selectedPersonChar = newPersonChars.find(personChar => personChar.id === charId)

    if (selectedPersonChar) {
      const selectedPersonCharIndex = newPersonChars.indexOf(selectedPersonChar)
      selectedPersonChar.input = event.target.value
      newPersonChars[selectedPersonCharIndex] = selectedPersonChar
    } else {
      selectedPersonChar = {
        id: charId,
        input: event.target.value
      }
      newPersonChars.push(selectedPersonChar)
    }

    this.setState({
      newPersonChars: newPersonChars
    })
  }

  render() {
    let customInputs = this.props.chars.map((char, index) => {
      return (
        <div class="field" key={char.name + index}>
          <input type="text" name={char.name} placeholder= {char.name} onChange={(event) => this.updateNewPersonChar(event, char.id)}/>
        </div>
      )
    })
    let form =
 <center><div className='ui centered container'>
  <div class="ui form">
      <div class="ten wide field">
          <input type="text" name= "name" placeholder="Name" onChange={this.updateNewName}/>
      </div>
      <div class="ten wide field">
        <input type="text" placeholder="Instagram" onChange={this.updateNewInstagram}/>
      </div>
      <div class="ten wide field">
        <input type="text" placeholder= "Rating" onChange={this.updateNewRating}/>
      </div>
        {customInputs}
      <div class="field">
          <Button type="submit"onClick={this.handleFormSubmit}> Submit</Button>
      </div>
    </div>
  </div></center>


    return (
      //<Button>Add a Person</Button>
      <div>
        <Button onClick ={this.toggleForm}>Add Person</Button>{this.state.clicked && form}
      </div>
    )
  }
}

export default CreatePerson
