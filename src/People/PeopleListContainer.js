import React from "react";
import PeopleList from "./PeopleList";
import swapi from "../swapi/client";
import Buttons from "../components/Buttons";

export default class PeopleListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 1, data: { results: [] }, isLoading: true };
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
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({
          currentPage: currentPage - 1
        }, this.loadList);
    }
  };

  render() {
    const { currentPage, data, isLoading } = this.state;
    return (
      <div className="main">
        {isLoading ? <div className="loading"><img src="img/loading.png" alt="loading page"/></div> : <div className="container">       
            <PeopleList people={data.results} />
            <div className="btn-container">
              {currentPage > 1 ? <Buttons onClick={this.handleDown}>&lt;&lt;</Buttons> : null}
              {currentPage < 9 ? <Buttons onClick={this.handleUp}>&gt;&gt;</Buttons> : null}
            </div>
          </div>
        }
      </div>
    );
  }
}
