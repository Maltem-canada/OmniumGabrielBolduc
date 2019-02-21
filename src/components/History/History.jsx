import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { agglomerateFetchData } from '../../actions/agglomerate';
import config from '../../config';
import './history.scss';

export class History extends Component {
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
        history: {
          historyitems,
          donation,
          enfantSoleil,
          lastPhoto,
        },
      },
    } = this.props;

    return (
      <div className="history">
        {
          historyitems.map((item, i) => (
            <div key={item.id} className="history-item">
              <div className="history-item-header">
                <h1 className="history-item-header-title">
                  <span className="history-item-header-title-first">{item.title.slice(0, 1)}</span>
                  <span>{item.title.slice(1)}</span>
                </h1>
                {
                  (historyitems.length - 1) === i
                  && (
                    <div className="history-item-header-right">
                      <img
                        className="history-item-header-right-image"
                        src={config.backendURL + enfantSoleil.image.url}
                        alt={enfantSoleil.description}
                      />
                      <a className="history-item-header-right-button" target={donation.doesOpenNewWindow ? '_blank' : ''} href={donation.link}>{donation.text}</a>
                    </div>
                  )
                }
              </div>
              <div className="history-item-content">
                {
                  item.content.split('\n').map(content => <p key={content}>{content}</p>)
                }
              </div>
            </div>
          ))
        }
        <div className="history-last">
          <img src={config.backendURL + lastPhoto.image.url} alt={lastPhoto.description} />
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

export default connect(mapStateToProps, mapDispatchToProps)(History);
