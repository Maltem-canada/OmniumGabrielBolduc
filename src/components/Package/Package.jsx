import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { agglomerateFetchData } from '../../actions/agglomerate';
import './package.scss';

export class Package extends Component {
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
        packages,
        headers: {
          subscibe,
        },
      },
    } = this.props;

    return (
      <div id="packages" className="package">
        <div className="package-content">
          {
            packages.map(item => (
              <div key={item.id}>
                <h1 className="package-content-title decorate-title">{item.title}</h1>
                <div className="package-content-price">{item.price}</div>
                <div className="package-content-content">{item.content}</div>
                <div className="package-content-button">
                  <a
                    onClick={this.headerClicked}
                    className="header-content-button"
                    target={subscibe.doesOpenNewWindow ? '_blank' : ''}
                    href={subscibe.link}
                  >
                    {subscibe.text}
                  </a>
                </div>
              </div>
            ))
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

export default connect(mapStateToProps, mapDispatchToProps)(Package);
