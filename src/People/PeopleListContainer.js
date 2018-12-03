import React from "react";
import PeopleList from "./PeopleList";
import swapi from "../swapi/client";
import Buttons from "../components/Buttons"

export default class PeopleListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentPage: 1, data: {results: []}};
    }

    componentDidMount() {
        this.loadList();
    }

    loadList() {
        swapi.getPeople(this.state.currentPage, (response) => {
            this.setState({
                data: response
            });
        });
    }

    handleUp = () => {
        const {currentPage} = this.state;
        this.setState({
            currentPage: currentPage+1
        }, this.loadList)  
    }

    handleDown = () => {
        const {currentPage} = this.state;
        if(currentPage > 1){
            this.setState({
                currentPage: currentPage-1
            }, this.loadList)  
        }
    }

    render() {
        const {currentPage} = this.state;
        return (
            <div className="container">
                <PeopleList people={this.state.data.results}/>
                <div className="btn-container">
                    <Buttons onClick={this.handleUp}>+</Buttons>
                    { currentPage >1 ? <Buttons onClick={this.handleDown}>-</Buttons> : null }
                </div>
            </div>
        );
    }
}
