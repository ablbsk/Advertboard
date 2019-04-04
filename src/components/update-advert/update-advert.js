import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from "react-redux-firebase";
import { compose } from 'redux';
import { updateAdvert } from '../../actions/advert-actions';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import { advertValidation } from '../../utils/validation/validation';

import './update-advert.css';

class UpdateAdvert extends Component {

  state = {
    title: this.props.advert.title,
    description: this.props.advert.description,
    category: this.props.advert.category,
    price: this.props.advert.price,
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
      this.props.history.push(`/advert/${ id }`);
    } else {
      console.log(result);
    }
  };

  render() {
    const { advert } = this.props;
    const { id } = this.props.match.params;
    const options = ['Transport', 'Equipment', 'Fashion', 'For kids', 'For home', 'Hobbies & sports', 'Work & study', 'Animals'];
    return (
      <Fragment>
        <BreadcrumbsItem
          className="breadcrumbs-item"
          to={`/advert/${id}`}
        >
          {advert.title}
        </BreadcrumbsItem>

        <BreadcrumbsItem
          className="breadcrumbs-item"
          to={`/advert/${id}/update-advert`}
        >
          Update
        </BreadcrumbsItem>

       <form
         className="update-user__form"
         onSubmit={this.handleSubmit}>

         <div className="update-user__content">
           <label
             className="update-user__label"
             htmlFor="title"
           >
             Title
           </label>
           <input
             className="update-user__input"
             id="title"
             type="text"
             defaultValue={advert.title}
             placeholder="Enter title ..."
             onChange={this.handleChange} />
         </div>
         <div className="update-user__content">
           <label
             className="update-user__label"
             htmlFor="description"
           >
             Description
           </label>
           <textarea
             className="update-user__textarea"
             id="description"
             placeholder="Enter description ..."
             defaultValue={advert.description}
             onChange={this.handleChange}
           />
         </div>
         <div className="update-user__content">
           <label
             className="update-user__label"
             htmlFor="category"
           >
             Category
           </label>
           <select
             className="update-user__select"
             id="category"
             defaultValue={advert.category}
             onChange={this.handleChange}
           >
             { options.map((option) => (
               <option value={option} key={option}>{option}</option>
             ))}
           </select>
         </div>
         <div className="update-user__content">
           <label
             className="update-user__label"
             htmlFor="price"
           >
             Price
           </label>
           <input
             className="update-user__input"
             id="price"
             type="text"
             placeholder="Enter price ..."
             defaultValue={advert.price}
             onChange={this.handleChange} />
         </div>

         <button className="update-user__button">CHANGE ADVERT</button>
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{
    collection: 'adverts',
  }]),
)(UpdateAdvert);
