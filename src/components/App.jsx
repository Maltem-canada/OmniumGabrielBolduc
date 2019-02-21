import React, { Component } from 'react';
import SlideComponent from './Common/Slide/Slide';
import Welcome from './Welcome/Welcome';
import InfoComp from './Info/Info';
import PackageComp from './Package/Package';
import TransitionComp from './Transition/Transition';
import HistoryComp from './History/History';
import SponsorComp from './Sponsor/Sponsor';
import GalleryComp from './Gallery/Gallery';
import TeamComp from './Team/Team';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: {
        content: '',
        display: false,
      },
    };
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup(display, content) {
    this.setState({
      popup: {
        content: display ? content : '',
        display,
      },
    });
  }

  render() {
    const {
      popup: {
        display,
        content,
      },
    } = this.state;

    const classPopup = display ? 'popup-show' : 'popup-hide';

    return (
      <div id="app-content">
        <SlideComponent className="slide-welcome" id="welcome">
          <Welcome />
          <InfoComp />
          <PackageComp />
          <TransitionComp />
          <HistoryComp />
          <SponsorComp />
          <GalleryComp />
          <TeamComp />
        </SlideComponent>
        <div id="popup" className={classPopup}>{content}</div>
      </div>
    );
  }
}
