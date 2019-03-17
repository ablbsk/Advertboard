import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAdvert } from '../../actions/advert-actions';
import { Redirect } from 'react-router-dom';

import './create-advert.css';

class CreateAdvert extends Component {

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createAdvert(this.state);
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to='/sign-in' />
    }

    return (
      <form onSubmit={this.handleSubmit} className="create-advert-form">
        <div className="create-form-div">
          <label htmlFor="title">Title</label>
          <input id="title" type="text" onChange={this.handleChange}/>
        </div>
        <div className="create-form-div">
          <label htmlFor="description">Description</label>
          <textarea id="description" className="create-form-textarea" onChange={this.handleChange} />
        </div>
        <div className="create-form-div">
          <label htmlFor="category">Category</label>
          <input id="category" type="text" onChange={this.handleChange}/>
        </div>
        <div className="create-form-div">
          <label htmlFor="price">Price</label>
          <input id="price" type="text" onChange={this.handleChange}/>
        </div>
        <button className="create-btn">Create</button>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createAdvert: (advert) => dispatch(createAdvert(advert))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdvert);
