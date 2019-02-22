import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { agglomerateFetchData } from '../../actions/agglomerate';
import './footer.scss';

export class Footer extends Component {
  static propTypes = {
    agglomerateFetch: PropTypes.func.isRequired,
    agglomerate: PropTypes.objectOf(Object).isRequired,
  };

  componentDidMount() {
    const { agglomerateFetch } = this.props;
    agglomerateFetch('Footer');
  }

  render() {
    const {
      agglomerate: {
        footer: {
          address,
          phoneNumber,
          email,
          facebook,
          locationTitle,
          contactTitle,
        },
      },
    } = this.props;

    return (
      <div className="footer">
        <div>
          <div>
            <h1 className="footer-title-left decorate-title">{locationTitle.toUpperCase()}</h1>
            <div className="footer-address">{address}</div>
          </div>
          <div className="footer-right" id="contact">
            <h1 className="footer-title-right decorate-title-right">{contactTitle.toUpperCase()}</h1>
            <a href={`mailto:${email}`}>{email}</a>
            <br />
            <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
            <a target={facebook.doesOpenNewWindow ? '_blank' : ''} href={facebook.link}>{facebook.text}</a>
          </div>
        </div>
        <div className="footer-closure">
          Designed and Developed by
          {' '}
          <a rel="noopener noreferrer" target="_blank" href="http://maltem.ca">Maltem Canada</a>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = ({ agglomerate }) => ({
  agglomerate,
});

export const mapDispatchToProps = dispatch => ({
  agglomerateFetch: () => dispatch(agglomerateFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
