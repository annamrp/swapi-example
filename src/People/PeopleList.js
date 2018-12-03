import React from "react";

export default class PeopleList extends React.Component {
  render() {
    if (!this.props.people || this.props.people.length <= 0) return null;

    const list = this.props.people.map((person, index) => (
      <div>
        <li className="list" key={index}>{person.name} {person.birth_year}</li>
      </div>
    ));

    return <ul>{list}</ul>;
  }
}
