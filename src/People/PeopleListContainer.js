import React from "react";
import PeopleList from "./PeopleList";
import swapi from "../swapi/client";
import Buttons from "../components/Buttons";
import Searchbar from "../components/Searchbar";

export default class PeopleListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentPage: 1, 
      data: { results: [] }, 
      isLoading: true ,
      inputSearch: '',
      character: null
    };
  }

  componentDidMount() {
    this.loadList();
  }

  loadList() {
    swapi.getPeople(this.state.currentPage, response => {
      this.setState({
        data: response,
        isLoading: false
      });
    });
  }

  handleUp = () => {
    const { currentPage } = this.state;
    this.setState({
        currentPage: currentPage + 1
      }, this.loadList);
  };

  handleDown = () => {
    const { currentPage, data } = this.state;
    if (data.previous) {
      this.setState({
          currentPage: currentPage - 1
        }, this.loadList);
    }
  };

  handleInput = event => {
    const {inputSearch} = this.state
    this.setState({
      inputSearch: event.target.value
    },
      event.persist(),
      swapi.searchCharacter(inputSearch, response => {
        const filteredChar = response.results.filter(char => {
          return char.name.toLowerCase().includes(this.state.inputSearch.toLowerCase())
        })
        this.setState({
          character: filteredChar,
        })
      }) 
    )
  }

  render() {
    const { currentPage, data, isLoading, inputSearch, character } = this.state;
    return (
      <div className="main">
        {isLoading ? <div className="loading"><img src="img/loading.png" alt="loading page"/></div> : <div className="container">       
          <Searchbar value={inputSearch} onChange={this.handleInput}/>
          {inputSearch ? <PeopleList people={character}/> : <div>
            <PeopleList people={data.results} />
            <div className="btn-container">
              {data.previous ? <Buttons onClick={this.handleDown}>&lt;&lt;</Buttons> : null}
              {data.next ? <Buttons onClick={this.handleUp}>&gt;&gt;</Buttons> : null}           
            </div> 
          </div>
          }
        </div>
        }
      </div>
    );
  }
}
