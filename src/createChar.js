import React from "react"
import { Button } from 'semantic-ui-react'

class CreateChar extends React.Component {
  constructor() {
    super()
    this.state = {
      input: "",
      clicked: false
    }
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    })
  }

  handleCharFormSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/chars', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.input,
      })
    })
    .then(res => res.json())
    .then(json => {
      this.props.addCharToChars(json)
    })
  }

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }



  render(){
    let charForm =
    <div className="ui left icon input">
      <form>
        <input 
          type="text"
          onChange={this.handleChange}
          value= {this.state.input}
          placeholder= "Add a Column"/>
        <input type="submit" value="Add" onClick={this.handleCharFormSubmit}/>
      </form>
    </div>
    console.log(this.state)
    return (
      <div>

        <Button onClick= {this.handleClick}>
          New Column
        </Button>{this.state.clicked && charForm}

      </div>
    )
  }
}

export default CreateChar;
