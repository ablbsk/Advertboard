import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchAdverts } from '../../actions/filter-action';

import './search.css';

class Search extends Component {

  state = {
    search: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {search} = this.state;
    this.props.searchAdverts(search);
  };

  render() {
    return (
      <div className="search">
        <form
          className="search-form"
          onSubmit={this.handleSubmit}
        >
          <input
            className="input"
            type="text"
            id="search"
            placeholder="Enter advert title ..."
            onChange={this.handleChange}
          />
          <button className="search-form__button">
            <img
              className="search-form__img"
              src="/assets/img/search.png"
              alt="search"
            />
          </button>
        </form>
      </div>
    );
  };
}

const mapDispatchToProps =  {
  searchAdverts
};

export default connect(null, mapDispatchToProps)(Search);
