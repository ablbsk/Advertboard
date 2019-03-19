/*import React, { Component } from 'react';
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";

class UpdateUser extends Component {

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.updateAdvert(this.state, this.props.match.params.id);
  };

  render() {
    const { advert } = this.props;
    return (
      <div className="update-div">
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
)(UpdateUser);*/
