import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { agglomerateFetchData } from '../../actions/agglomerate';
import config from '../../config';
import './welcome.scss';

export class Welcome extends Component {
  static propTypes = {
    agglomerateFetch: PropTypes.func.isRequired,
    agglomerate: PropTypes.objectOf(Object).isRequired,
  };

  componentDidMount() {
    const { agglomerateFetch } = this.props;
    agglomerateFetch();
  }

  render() {
    const {
      agglomerate: {
        welcome: {
          background: {
            image,
          },
          title,
          subTitle,
          editionNumber,
        },
      },
    } = this.props;

    const style = {
      backgroundImage: `url("${config.backendURL + image.url}")`,
    };

    return (
      <div className="welcome" style={style}>
        <div>
          <div className="welcome-title">
            <div>{editionNumber}</div>
            <div>{title}</div>
          </div>
          <div className="welcome-subtitle">{subTitle}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
