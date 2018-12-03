import React from "react";
import PeopleList from "./PeopleList";
import swapi from "../swapi/client";

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

    render() {
        return (
            <div>
                <PeopleList people={this.state.data.results}/>
            </div>
        );
    }
}
