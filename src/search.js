import React from 'react'
import PeopleList from "./peopleList"
import CreatePerson from "./createPerson"
import { Button, } from "semantic-ui-react"

class Search extends React.Component{
  constructor() {
    super()
    this.state = {
      input: "",
      clicked: false
    }
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  clicked = (event) => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  render() {
    let people
    if (this.state.input === "") {
      people = this.props.people
    } else {
      people = this.props.people.filter(person => {
        return this.state.input.toLowerCase() === person.name.substring(0,this.state.input.length).toLowerCase() ||  this.state.input.toLowerCase() === person.ig.substring(0,this.state.input.length).toLowerCase()
      })
    }

    let persons = <PeopleList chars={this.props.chars} people={people}/>
    let find = <div  class="ui left icon input">
    <input class="prompt"
      type="text"
      onChange={this.handleChange}
      value= {this.state.input}
      placeholder= "find a person"/>
       <i class="users icon"></i>
       </div>


    return (
      <div className="ui search" >
        <div>
          <Button onClick = {this.clicked}>Find Person</Button>{this.state.clicked && find}
        </div>
        <CreatePerson
          addPersonToPeople={this.props.addPersonToPeople}
          chars={this.props.chars}
        />
        <div>{persons}</div>
      </div>
    )
  }
}

export default Search;
