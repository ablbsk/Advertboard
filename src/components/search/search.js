import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchAdverts } from '../../actions/filter-action';

import './search.css';

class Search extends Component {

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
      <form
        className="search__form"
        onSubmit={this.handleSubmit}
      >
        <input
          className="search__input"
          type="text"
          id="search"
          placeholder="Enter advert title ..."
          onChange={this.handleChange}
        />
        <button className="search__button">
          <img src="../../../public/img/search.png" alt="search"/>
        </button>
      </form>
    );
  };
}

const mapDispatchToProps =  {
  searchAdverts
};

export default connect(null, mapDispatchToProps)(Search);
