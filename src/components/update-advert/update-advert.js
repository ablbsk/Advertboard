import React, { Component } from 'react';
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { updateAdvert } from "../../actions/advert-actions";
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import './update-advert.css';
import {advertValidation} from "../../utils/validation/validation";

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
    console.log(this.state);
    return (
      <div className="update-div">

        <BreadcrumbsItem to={`/advert/${advert.id}/update-advert`}>Update</BreadcrumbsItem>

       <form onSubmit={this.handleSubmit}>
          <table>
            <tbody>
            <tr>
              <td>Заголовок</td>
              <td>
                <input type="text" id="title" defaultValue={advert.title} onChange={this.handleChange} />
              </td>
            </tr>
            <tr>
              <td>Описание</td>
              <td>
                <textarea id="description" defaultValue={advert.description} onChange={this.handleChange} />
              </td>
            </tr>
            <tr>
              <td>Стоимость</td>
              <td>
                <input type="text" id="price" defaultValue={advert.price} onChange={this.handleChange} />
              </td>
            </tr>
            <tr>
              <td>Категория</td>
              <td>
                <input type="text" id="category" defaultValue={advert.category} onChange={this.handleChange} />
              </td>
            </tr>
            </tbody>
          </table>
         <button>ACCEPT</button>
        </form>
      </div>
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
