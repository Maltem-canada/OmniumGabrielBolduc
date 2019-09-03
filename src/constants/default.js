const image = {
  image: { url: '' },
  description: '',
};

const link = {
  text: '',
  link: '',
  doesOpenNewWindow: true,
};

export default {
  logo: image,
  headers: {
    ball: image,
    logo: image,
    contact: '',
    history: '',
    info: '',
    packages: '',
    photos: '',
    sponsors: '',
    subscibe: link,
    team: '',
  },
  galleries: {
    galleryPhotos: [],
  },
  history: {
    historyitems: [],
    donation: link,
    enfantSoleil: image,
    lastPhoto: image,
  },
  info: {
    title: '',
    content: '',
    button: link,
    items: [],
  },
  packages: [],
  sponsor: {
    presentationTitle: '',
    presentationButton: link,
    presentationLogos: [],
    sponsorTitle: '',
    sponsorButton: link,
    sponsorLogos: [],
  },
  team: {
    members: [],
    title: '',
    defaultProfile: image,
  },
  transition: image,
  welcome: {
    background: image,
    title: '',
    subTitle: '',
    editionNumber: '',
    logo1: image,
    logo2: image,
  },
  footer: {
    address: '',
    phoneNumber: '',
    email: '',
    locationTitle: '',
    contactTitle: '',
    facebook: link,
  },
};
