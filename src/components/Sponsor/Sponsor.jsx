import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { agglomerateFetchData } from '../../actions/agglomerate';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './sponsor.scss';
import config from '../../config';

export class Sponsor extends Component {
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
        sponsor: {
          presentationTitle,
          presentationButton,
          presentationLogos,
          sponsorTitle,
          sponsorButton,
          sponsorLogos,
        },
      },
    } = this.props;

    const settings = {
      dots: false,
      rows: 2,
      infinite: true,
      speed: 0,
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2000,
      initialSlide: 0,
      pauseOnFocus: false,
      pauseOnDotsHover: false,
      pauseOnHover: false,
    };

    return (
      <div id="sponsors" className="sponsor">
        <div className="sponsor-presentation">
          <div className="sponsor-presentation-header">
            <h1 className="sponsor-presentation-header-title decorate-title">{presentationTitle}</h1>
            <a
              className="sponsor-presentation-header-button"
              target={presentationButton.doesOpenNewWindow ? '_blank' : ''}
              href={presentationButton.link}
            >
              {presentationButton.text}
            </a>
          </div>
          <div className="sponsor-presentation-content">
            {
              presentationLogos.map(logo => (
                <img alt={logo.name.split('.')[0]} key={logo.id} src={config.backendURL + logo.url} />
              ))
            }
          </div>
        </div>
        <div className="sponsor-sponsor">
          <div className="sponsor-sponsor-header">
            <h1 className="sponsor-sponsor-header-title decorate-title">{sponsorTitle}</h1>
            <a
              className="sponsor-sponsor-header-button"
              target={sponsorButton.doesOpenNewWindow ? '_blank' : ''}
              href={sponsorButton.link}
            >
              {sponsorButton.text}
            </a>
          </div>
          <div className="sponsor-sponsor-content">
            <Slider {...settings}>
              {
                sponsorLogos.map(logo => (
                  <div className="sponsor-sponsor-content-item"><img alt={logo.name.split('.')[0]} key={logo.id} src={config.backendURL + logo.url} /></div>
                ))
              }
            </Slider>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sponsor);
