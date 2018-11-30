import React from "react";
import PeopleList from "./PeopleList";
import swapi from "../swapi/client";

export default class PeopleListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 1, data: { results: [] } };
  }

  componentDidMount() {
    swapi.getPeople(this.state.currentPage, data => this.setState({ data }));
  }

  render() {
    return <PeopleList people={this.state.data.results} />;
  }
}
