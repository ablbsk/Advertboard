import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import { createAdvert } from '../../../actions/advert-actions';
import { advertValidation } from '../../../utils/validation/advert-validation';

class CreateAdvert extends Component {

  state = {
    errors: {}
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
      this.addErrors(result);
    }
  };

  addErrors = (result) => {
    this.setState({
      errors: result
    }, () => {
      console.log(this.state.errors);
    })
  };

  render() {
    const { errors } = this.state;
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
              className={ "input" + ('title' in errors ? " input_color_red" : "")}
              id="title"
              type="text"
              placeholder="Enter title ..."
              onChange={this.handleChange}
            />
            { 'title' in errors ? <span className="error">{errors.title}</span> : null }
          </div>
          <div className="content">
            <label
              className="label"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className={ "textarea" + ('description' in errors ? " textarea_color_red" : "")}
              id="description"
              placeholder="Enter description ..."
              onChange={this.handleChange}
            />
            { 'description' in errors ? <span className="error">{errors.description}</span> : null }
          </div>
          <div className="content">
            <label
              className="label"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className={ "select" + ('category' in errors ? " select_color_red" : "" ) }
              id="category"
              defaultValue="none"
              onChange={this.handleChange}>
              <option value="none" disabled hidden>Select ...</option>
              { options.map((option) => (
                <option value={option} key={option}>{option}</option>
              ))}
            </select>
            { 'category' in errors ? <span className="error">{errors.category}</span> : null }
          </div>
          <div className="content">
            <label
              className="label"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className={ "input" + ('price' in errors ? " input_color_red" : "") }
              id="price"
              type="text"
              placeholder="Enter price ..."
              onChange={this.handleChange}
            />
            { 'price' in errors ? <span className="error">{errors.price}</span> : null }
          </div>
          <button className="button button_color_blue">create advert</button>
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
