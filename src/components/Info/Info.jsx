import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { agglomerateFetchData } from '../../actions/agglomerate';
import config from '../../config';
import './info.scss';

export class Info extends Component {
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
        info: {
          title,
          items,
          content,
          button,
        },
      },
    } = this.props;

    return (
      <div id="info" className="info">
        <h1 className="info-title decorate-title">{title}</h1>
        <div className="info-content">
          {
            items.map(item => (
              <div key={item.id}>
                <img src={config.backendURL + item.image.image.url} alt={item.image.description} />
                <div>{item.content}</div>
              </div>
            ))
          }
        </div>
        <div className="info-sub">{content}</div>
        <div className="info-button"><a target={button.doesOpenNewWindow ? '_blank' : ''} href={button.link}>{button.text}</a></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Info);
