import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import { agglomerateFetchData } from '../../actions/agglomerate';
import { setLanguage } from '../../services/language';
import Image from '../Common/Image';
import './header.scss';

export class Header extends Component {
  static propTypes = {
    agglomerateFetch: PropTypes.func.isRequired,
    agglomerate: PropTypes.objectOf(Object).isRequired,
  };

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.headerClicked = this.headerClicked.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      percentageScroll: 0,
    };
  }

  componentDidMount() {
    const { agglomerateFetch } = this.props;
    agglomerateFetch();
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleScroll() {
    const windowHeight = window.innerHeight;
    const scrollPos = document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight;
    this.setState({
      percentageScroll: (scrollPos) * 100 / (documentHeight - windowHeight),
    });
  }

  headerClicked() {
    const { displayHeader } = this.state;
    this.setState({
      displayHeader: (displayHeader === 'hide') ? 'show' : 'hide',
    });
  }

  handleClickOutside(event) {
    const {
      wrapperRef,
      state: {
        displayHeader,
      },
    } = this;
    const isMenuHandler = event.target.className.constructor.name === 'SVGAnimatedString';
    if (
      wrapperRef
      && !wrapperRef.contains(event.target)
      && displayHeader === 'show'
      && !isMenuHandler
    ) {
      this.setState({
        displayHeader: 'hide',
      });
    }
  }

  changeLanguage(event) {
    const lang = event.target.value;
    setLanguage(lang);
    const { agglomerateFetch } = this.props;
    agglomerateFetch();
  }

  render() {
    const {
      agglomerate: {
        headers: {
          ball,
          logo,
          info,
          packages,
          history,
          sponsors,
          photos,
          team,
          contact,
          subscibe,
        },
      },
    } = this.props;
    const {
      percentageScroll,
    } = this.state;
    const indicatorStyle = {
      width: `${percentageScroll}%`,
    };
    const imageStyle = {
      left: `${percentageScroll}%`,
      transform: `rotateZ(${percentageScroll * 50}deg)`,
    };

    return (
      <nav className="header header-fixed">
        <div className="header-content" ref={this.setWrapperRef}>
          <div>
            <a href="#welcome">
              <Image image={logo} />
            </a>
            <a href="#info">{info}</a>
            <a href="#packages">{packages}</a>
            <a href="#history">{history}</a>
            <a href="#sponsors">{sponsors}</a>
            <a href="#photos">{photos}</a>
            <a href="#team">{team}</a>
            <a href="#contact">{contact}</a>
          </div>
          <div>
            <a className="header-content-button" target={subscibe.doesOpenNewWindow ? '_blank' : ''} href={subscibe.link}>{subscibe.text}</a>
          </div>
        </div>
        <div className="header-scroll">
          <div className="header-scroll-indicator" style={indicatorStyle} />
          <Image image={ball} style={imageStyle} />
        </div>
        <FontAwesomeIcon onClick={this.headerClicked} className="header-handler" icon={faGripLines} />
      </nav>
    );
  }
}

export const mapStateToProps = ({ agglomerate }) => ({
  agglomerate,
});

export const mapDispatchToProps = dispatch => ({
  agglomerateFetch: () => dispatch(agglomerateFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
