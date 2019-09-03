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
          logo1,
          logo2,
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
          {logo1 && logo1.image
            && <img alt="welcome 1" src={`${config.backendURL}${logo1.image.url}`} />
          }
          <div className="welcome-title">
            <div>{editionNumber}</div>
            <div>{title}</div>
          </div>
          <div className="welcome-subtitle">{subTitle}</div>
          {logo2 && logo2.image
            && <img alt="welcome 2" src={`${config.backendURL}${logo2.image.url}`} />
          }
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
