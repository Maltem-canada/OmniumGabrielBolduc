import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { agglomerateFetchData } from '../../actions/agglomerate';
import config from '../../config';
import './team.scss';

export class Team extends Component {
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
        team: {
          members,
          title,
        },
      },
    } = this.props;

    return (
      <div id="team" className="team">
        <h1 className="team-title decorate-title">{title}</h1>
        <div className="team-content">
          {
            members.map(member => (
              <div key={member.id} className="team-content-member">
                <img
                  src={config.backendURL + member.photo.image.url}
                  alt={member.photo.description}
                />
                <div className="team-content-member-description">{member.name}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Team);
