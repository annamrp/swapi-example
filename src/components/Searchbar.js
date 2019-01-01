import React, { Component } from 'react';
import swapi from "../swapi/client";
import PeopleList from "../People/PeopleList";

export default class Searchbar extends Component {

  render() {
    return (
      <div>
        <form className="search-form" >
          <input onChange={ this.props.onChange } autoComplete="off" type="text" className="input" placeholder="Search character" required />
        </form>
      </div>
    )
  }
}
