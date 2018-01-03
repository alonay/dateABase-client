import React from "react"

class peopleList extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      clicked: {},
    }
  }

  showImages(personId) {
    const person = this.props.people.find(person => {
      return person.id === personId
    })
    return person && person.photos.map((photo, index) => {
      return <img key={index} src={photo.url}/>
    })
  }

  showInsta(personId) {
    const clicked = this.state.clicked
    clicked[personId] = !this.state.clicked[personId]

    this.setState({
      clicked: clicked,
    })
  }

  render(){

    // let beef = this.people.forEach(person => person.name)
    const people = this.props.people.map((person, index) => {
      const personChars = []

      for (let i = 0; i < this.props.chars.length; i++) {
        const currentPersonChar = person.person_chars.find(char => {
          return char.id === i + 1
        })
        const input = (currentPersonChar && currentPersonChar.input) || ''
        personChars.push(<td key={input + i}>{input}</td>)
      }

      return (
        <tr key={index}>
          <td>{person.name}</td>
          <td>
            {person.ig}
            <button onClick={() => this.showInsta(person.id)}>See Insta!</button>
            {this.state.clicked[person.id] && this.showImages(person.id)}
          </td>
          <td>{person.fit}</td>
          {personChars}
        </tr>
      )
    })

    const chars = this.props.chars.map((char, index) => {
      return <th key={char.name + index}>{char.name}</th>
    })

    return(
      <table className="ui celled padded table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Instagram</th>
            <th>Rating</th>
            {chars}
          </tr>
        </thead>
        <tbody>
          {people}
        </tbody>

      </table>
    )
  }
}

export default peopleList ;
