import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { API_URL } from "../../config";
import Loading from "./Loading";
import "./search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      loading: false,
      searchResults: []
    };
  }

  // render(){
  //     return(
  //         <form onSubmit={this.handleSubmit.bind(this)}>
  //             <input type='text' ref={input => this.searchQuery = input} />
  //             <button>Submit</button>
  //         </form>
  //     )
  // }
  renderSearchResults() {
    const { searchResults, searchQuery, loading } = this.state;

    if (!searchQuery) {
      return "";
    }

    if (searchResults.length > 0) {
      return (
        <div className="Search-result-container">
          {searchResults.map(result => (
            <div
              key={result.id}
              className="Search-result"
              onClick={() => this.handleRedirect(result.id)}
            >
              {result.name} ({result.symbol})
            </div>
          ))}
        </div>
      );
    }
    if (!loading) {
      return (
        <div className="Search-result-container">
          <div className="Search-result">No results found.</div>
        </div>
      );
    }
  }

  searchCurrency = async searchQuery => {
    this.setState({ loading: true });
    const response = await fetch(
      `${API_URL}autocomplete?searchQuery=${searchQuery}`
    );
    const data = await response.json();
    this.setState({ loading: false, searchResults: data });
  };

  handleChange(event) {
    const searchQuery = event.target.value;
    this.setState({ searchQuery });
    if (!searchQuery) {
      return "";
    }
    this.searchCurrency(searchQuery);
  };

  handleRedirect(currencyId) {
    this.setState({ searchQuery: "", searchResults: [] });
    this.props.history.push(`/currency/${currencyId}`);
  };

  render() {
    const { loading, searchQuery } = this.state;
    return (
      <div className="Search">

        <span className="Search-icon" />

        <input
          className="Search-input"
          type="text"
          onChange={this.handleChange.bind(this)}
          placeholder="Currency Name"
          value ={searchQuery}
        />

        {loading && (
          <div className="Search-loading">
            <Loading width="12px" height="12px" />
          </div>
        )}
        {this.renderSearchResults()}
        
      </div>
    );
  }
}

export default withRouter(Search);

