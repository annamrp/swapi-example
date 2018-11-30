import React from "react";

export default class PeopleList extends React.Component {
  render() {
    if (!this.props.people || this.props.people.length <= 0) return null;

    const list = this.props.people.map((person, index) => (
      <li key={index}>{person.name}</li>
    ));

    return <ul>{list}</ul>;
  }
}
