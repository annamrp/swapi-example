import React from "react";
import PeopleDetail from "../components/PeopleDetail";

export default class PeopleList extends React.Component {

  state = {
    personDetail: null,
  }

  getPersonInfo = (person) => {
    const {personDetail} = this.state;
    this.setState({
      personDetail: person
    })
  
    if(person === personDetail){
      this.setState({
        personDetail: null
      })}
  }

  render() {

    const {personDetail} = this.state;

    if (!this.props.people || this.props.people.length <= 0) return null;

    const list = this.props.people.map((person, index) => (
        <li onClick={() => {this.getPersonInfo(person)}} className="list" key={index}>{person.name}</li>
    ));

    return (
      <div onClick={this.clearData}>
        <ul>{list}</ul>
        {!personDetail ? null : <PeopleDetail person = {personDetail}/> }
      </div>
      );
  }
}
