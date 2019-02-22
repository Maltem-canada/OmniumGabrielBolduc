import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { agglomerateFetchData } from '../../actions/agglomerate';
import Image from '../Common/Image';
import './gallery.scss';

export class Gallery extends Component {
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
        galleries,
      },
    } = this.props;

    const gallery = galleries[0] || { galleryPhotos: [] };

    return (
      <div id="photos" className="gallery">
        {
          gallery
            .galleryPhotos
            .slice(0, 4)
            .map(photo => (
              <Image image={{ image: photo }} key={photo.id} />
            ))
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
