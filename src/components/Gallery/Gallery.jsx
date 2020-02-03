import React, { Component } from 'react';
import Carousel, { Modal, ModalGateway } from "react-images";
import config from '../../config';
import './gallery.scss';

export class Gallery extends Component {

  state = { modalIsOpen: false }
  toggleModal = () => {
    this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
  }

  render() {
    const { modalIsOpen } = this.state;
    const { gallery } = this.props;
    const photos = gallery.galleryPhotos.map(photo => ({ src: config.backendURL + photo.url }))

    return (
      <span>
        <span className="gallery-button" onClick={() => this.toggleModal()}>
          {gallery.name}
        </span>
        <ModalGateway>
          {modalIsOpen ? (
            <Modal onClose={this.toggleModal}>
              <Carousel views={photos} />
            </Modal>
          ) : null}
        </ModalGateway>
      </span>
    );
  }
}

export default Gallery;
