import React, { Component } from "react";
import { API_URL } from "../../config";
import Loading from "../common/Loading";
import { renderChangePercent } from '../../helpers';
import "./detail.css";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: {},
      loading: false,
      error: null
    };
  }

  componentDidMount() {
    const currency = this.props.match.params.id;
    this.fetchCurrency(currency);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.location.pathname !== nextProps.location.pathname){
      const nextCurrencyid = nextProps.match.params.id;
      this.fetchCurrency(nextCurrencyid);
    }
  }

  fetchCurrency = async currency => {
    this.setState({ loading: true });
    const response = await fetch(`${API_URL}cryptocurrencies/${currency}`);
    const data = await response.json();
    this.setState({ loading: false });
    if (data.errorMessage) {
      this.setState({ error: data.errorMessage });
    }
    this.setState({ currency: data });
  };

  render() {
    const { loading, error, currency } = this.state;
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
    
    return(
        <div className='Detail'>
            <h1 className='Detail-heading'>{currency.name} ({currency.symbol})</h1>
            <div className='Detail-container'>
                <div className='Detail-item'>
                 Price  <span className='Detail-value'>$ {currency.price}</span>
                </div>
                <div className='Detail-item'>
                 Rank  <span className='Detail-value'>{currency.rank}</span>
                </div>
                <div className='Detail-item'>
                 24H Change  <span className='Detail-value'>{renderChangePercent(currency.percentChange24h)}</span>
                </div>
                <div className='Detail-item'>
                   <span className='Detail-title'>Market Cap</span>
                   <span className='Detail-dollar'>$</span> {currency.marketCap}
                </div>
                <div className='Detail-item'>
                   <span className='Detail-title'>24H Volume</span>
                   <span className='Detail-dollar'>$</span> {currency.volume24h}
                </div>
                <div className='Detail-item'>
                   <span className='Detail-title'>Total Supply</span>
                   <span className='Detail-dollar'>$</span> {currency.totalSupply}
                </div>
            </div>
        </div>
    )
  }
}

export default Detail;
