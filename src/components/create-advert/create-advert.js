import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import { createAdvert } from '../../actions/advert-actions';
import { advertValidation } from '../../utils/validation/validation';

import './create-advert.css';

class CreateAdvert extends Component {

  state = {
    validError: null,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const result = advertValidation(this.state);
    if (result === 'good') {
      this.props.createAdvert(this.state);
      this.props.history.push('/');
    } else {
      this.setValidError(result);
    }
  };

  setValidError(result) {
    this.setState( {
      validError: result
    });
  }

  render() {
    const { auth } = this.props;
    const { validError } = this.state;
    const options = ['Transport', 'Equipment', 'Fashion', 'For kids', 'For home', 'Hobbies & sports', 'Work & study', 'Animals'];

    if (!auth.uid) {
      return <Redirect to='/sign-in' />
    }

    return (
      <Fragment>
        <BreadcrumbsItem
          className="breadcrumbs-item"
          to="/create-advert"
        >
          Create Advert
        </BreadcrumbsItem>
        <form
          className="create-advert__form"
          onSubmit={this.handleSubmit}
        >
          <div className="create-advert__content">
            <label
              className="create-advert__label"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="create-advert__input"
              id="title"
              type="text"
              placeholder="Enter title ..."
              onChange={this.handleChange} />
          </div>
          <div className="create-advert__content">
            <label
              className="create-advert__label"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="create-advert__textarea"
              id="description"
              placeholder="Enter description ..."
              onChange={this.handleChange}
            />
          </div>
          <div className="create-advert__content">
            <label
              className="create-advert__label"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="create-advert__select"
              id="category"
              defaultValue="none"
              onChange={this.handleChange}>
              <option value="none" disabled hidden>Select ...</option>
              { options.map((option) => (
                <option value={option} key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="create-advert__content">
            <label
              className="create-advert__label"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="create-advert__input"
              id="price"
              type="text"
              placeholder="Enter price ..."
              onChange={this.handleChange} />
          </div>
          <button className="create-advert__button">Create</button>
          { validError ? <p className="create-advert__error">{validError}</p> : null }
        </form>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createAdvert: (advert) => dispatch(createAdvert(advert))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdvert);
