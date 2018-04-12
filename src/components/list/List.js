import React from "react";
import { API_URL } from "../../config";
import Loading from "../common/Loading";
import Table from "./Table";
import Pagination from "./Pagination";

class List extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      currencies: [],
      error: null,
      totalPages: 0,
      page: 1
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    this.setState({ loading: true });
    const { page } = this.state;
    console.log(page);
    let response = await fetch(
      `${API_URL}cryptocurrencies?page=${page}&perPage=20`
    );
    try {
      let data = await response.json();
      const { currencies, totalPages } = data;
      this.setState({
        currencies,
        totalPages,
        loading: false
      });
    } catch (error) {
      this.setState({
        error: error.errorMessage,
        loading: false
      });
    }
  }

  handlePaginationClick(direction) {
    let nextPage = this.state.page;
    nextPage = direction === "next" ? ++nextPage : --nextPage;
    this.setState({ page: nextPage }, () => {
      this.fetchCurrencies();
    });
  }

  render() {
    const { loading, error, currencies, page, totalPages } = this.state;
    if (loading) {
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );
    }
    if (error) {
      return <div className="error">{error}</div>;
    }

    return (
      <div>
        <Table currencies={currencies} />

        <Pagination
          page={page}
          totalPages={totalPages}
          handlePaginationClick={this.handlePaginationClick.bind(this)}
        />
      </div>
    );
  }
}

export default List;
