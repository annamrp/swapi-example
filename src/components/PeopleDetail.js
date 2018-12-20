import React, { Component } from 'react';
import Swapi from "../swapi/client";


export default class PeopleDetail extends Component {

  state = {
    isLoading: true,
    filmsList: [],
    personSpecies: null,
  }

  componentDidMount(){   
    this.setState({
      isLoading: true
    })
    this.load()
    // this.setState({
    //   isLoading: false
    //   })
  }

  load(){ 
    const {films, species} = this.props.person;
    
    films.forEach(film => {
      let filmId = film.match(/[0-9]+/)
      Swapi.getFilm(filmId, response => {
        this.setState({
          filmsList: this.state.filmsList.concat(response)
        });
      });
    }) 
    
    let speciesId = species[0].match(/[0-9]+/)
    Swapi.getSpecies(speciesId, response => {
      this.setState({
        personSpecies: response,
        isLoading: false
      })
    })
  }

  renderFilms(){
    const {filmsList} = this.state;
    return filmsList.map((film,index) => {
      return <li key={index}>{film.title}</li>
    })
  }

  render() {
    const {person} = this.props;
    const {isLoading, personSpecies} = this.state;

    return (
      <div className="detail">
      {isLoading ? <div className="small-loading"><img src="img/loading.png" alt="loading page"/></div> : <div>
          {/* <p>Birth year: {person.birth_year}</p> */}
          <p>Species: {personSpecies.name}</p>
          <p>Gender: {person.gender}</p>
          <p>Films:</p>
          <ul>{this.renderFilms()}</ul>
        </div>}
      </div>
    )
  }
}
