import React, { Component } from 'react';
import Swapi from "../swapi/client";


export default class PeopleDetail extends Component {

  state = {
    isLoading: true,
    filmsList: []
  }

  componentDidMount(){   
    this.setState({
      isLoading: true
    })
    this.load()
  }

  load(){ 
    const {films} = this.props.person;
    
    films.forEach(film => {
      let id = film.match(/[0-9]+/)
      Swapi.getFilm(id, (response) => {
        this.setState({
          filmsList: this.state.filmsList.concat(response)
        });
      });
    }, this.setState({
    isLoading: false
    }))   
  }

  renderFilms(){
    const {filmsList} = this.state;
    return filmsList.map((film,index) => {
      return <li key={index}>{film.title}</li>
    })
  }

  render() {
    const {person} = this.props;
    const {isLoading} = this.state;

    return (
      <div className="detail">
      {isLoading ? null : <div>
          <p>Name: {person.name}</p>
          <p>Birth year: {person.birth_year}</p>
          <p>Gender: {person.gender}</p>
          <p>Films:</p>
          <ul>{this.renderFilms()}</ul>
        </div>}
      </div>
    )
  }
}
