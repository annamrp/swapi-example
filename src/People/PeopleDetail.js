import React, { Component } from 'react';
import Swapi from "../swapi/client";


export default class PeopleDetail extends Component {

  state = {
    isLoading: true,
    filmsList: [],
    personSpecies: null,
    personHomeworld: null
  }

  componentDidMount(){   
    this.setState({
      isLoading: true
    })
    this.load()
  }

  load(){ 
    const {films, species, homeworld} = this.props.person;
    const homeworldId = homeworld.match(/[0-9]+/);
    let speciesId;
    
    if(species[0] === undefined){
      this.setState({
        personSpecies: {name: 'n/a', language: 'n/a'}
      });
    }else{
      speciesId = species[0].match(/[0-9]+/)
      Swapi.getSpecies(speciesId, response => {
        this.setState({
          personSpecies: response,
        })
      })
    }

    Swapi.getPlanet(homeworldId, response => {
      this.setState({
        personHomeworld: response
      },
        films.forEach(film => {
          let filmId = film.match(/[0-9]+/)
          Swapi.getFilm(filmId, response => {
            this.setState({
              filmsList: this.state.filmsList.concat(response),
              isLoading: false
            });
          });
        }) 
      )
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
    const {isLoading, personSpecies, personHomeworld} = this.state;

    return (
      <div className="detail">
      {isLoading ? <div className="small-loading"><img src="img/loading.png" alt="loading page"/></div> : <div>
          <p>Homeworld: {personHomeworld.name}</p>
          <p>Species: {personSpecies.name}</p>
          <p>Gender: {person.gender}</p>
          <p>Language: {personSpecies.language}</p>
          <p>Films:</p>
          <ul>{this.renderFilms()}</ul>
        </div>}
      </div>
    )
  }
}
