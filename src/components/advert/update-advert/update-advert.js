import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import { updateAdvert } from '../../../actions/advert-actions';
import { advertValidation } from '../../../utils/validation/advert-validation';

class UpdateAdvert extends Component {

  state = {
    title: this.props.advert.title,
    description: this.props.advert.description,
    category: this.props.advert.category,
    price: this.props.advert.price,
    errors: {}
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const result = advertValidation(this.state);

    if (result === 'good') {
      this.props.updateAdvert(this.state, id);
      this.props.history.push(`/advert/${id}`);
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
    const { advert } = this.props;
    const { id } = this.props.match.params;
    const options = ['Transport', 'Equipment', 'Fashion', 'For kids', 'For home', 'Hobbies & sports', 'Work & study', 'Animals'];
    return (
      <Fragment>
        <BreadcrumbsItem
          className="breadcrumbs__item"
          to={`/advert/${id}`}
        >
          {advert.title}
        </BreadcrumbsItem>
        <BreadcrumbsItem
          className="breadcrumbs__item"
          to={`/advert/${id}/update-advert`}
        >
          Update
        </BreadcrumbsItem>
        <form
          className="block"
          onSubmit={this.handleSubmit}>
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
                defaultValue={advert.title}
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
                defaultValue={advert.description}
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
                className="select"
                id="category"
                defaultValue={advert.category}
                onChange={this.handleChange}
              >
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
                className={ "input" + ('price' in errors ? " input_color_red" : "") }
                id="price"
                type="text"
                placeholder="Enter price ..."
                defaultValue={advert.price}
                onChange={this.handleChange} />
            { 'price' in errors ? <span className="error">{errors.price}</span> : null }
          </div>
          <button className="button button_color_blue">change advert</button>
          </form>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { adverts } = state.firestore.data;
  const advert = adverts ? adverts[id] : null;
  return {
    advert
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateAdvert: (advert, id) => dispatch(updateAdvert(advert, id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAdvert);
