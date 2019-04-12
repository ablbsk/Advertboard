import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { toastr } from 'react-redux-toastr';

import { createAdvert } from '../../actions/advert-actions';
import { advertValidation } from '../../utils/validation/validation';

class CreateAdvert extends Component {

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
      toastr.error('Error', result);
    }
  };

  render() {
    const { auth } = this.props;
    const options = ['Transport', 'Equipment', 'Fashion', 'For kids', 'For home', 'Hobbies & sports', 'Work & study', 'Animals'];

    if (!auth.uid) {
      return <Redirect to='/sign-in' />
    }
    return (
      <Fragment>
        <BreadcrumbsItem
          className="breadcrumbs__item"
          to="/create-advert"
        >
          Create Advert
        </BreadcrumbsItem>
        <form
          className="block"
          onSubmit={this.handleSubmit}
        >
          <div className="content">
            <label
              className="label"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="input"
              id="title"
              type="text"
              placeholder="Enter title ..."
              onChange={this.handleChange} />
          </div>
          <div className="content">
            <label
              className="label"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="textarea"
              id="description"
              placeholder="Enter description ..."
              onChange={this.handleChange}
            />
          </div>
          <div className="content">
            <label
              className="label"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="select"
              id="category"
              defaultValue="none"
              onChange={this.handleChange}>
              <option value="none" disabled hidden>Select ...</option>
              { options.map((option) => (
                <option value={option} key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="content">
            <label
              className="label"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="input"
              id="price"
              type="text"
              placeholder="Enter price ..."
              onChange={this.handleChange} />
          </div>
          <button className="button">Create</button>
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
