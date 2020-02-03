import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { agglomerateFetchData } from '../../actions/agglomerate';
import Gallery from '../Gallery/Gallery';
import './galleries.scss';

export class Galleries extends Component {
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

        let newGalleries = []
        for (let index = 0; index < galleries.length; index++) {
            newGalleries[index] = galleries[index] || { galleryPhotos: [] };
        }

        //Sort the galleries in ascending date/name order
        newGalleries.sort(function (a, b) {
            if (a.name < b.name) {
                return -1
            }
            if (b.name > a.name) {
                return 1
            }
            return 0
        })

        return (
            <div id="photos" className="galleries">
                <div className="galleries-header">
                    <h1 className="decorate-title">Photos</h1>
                </div>
                <div className="galleries-buttons">{
                    newGalleries.map((gallery) =>
                        <div key={gallery._id} className="galleries-buttons-button">
                            <Gallery gallery={gallery} />
                        </div>
                    )
                }
                </div>
            </div>
        )
    }
}

export const mapStateToProps = ({ agglomerate }) => ({
    agglomerate,
});

export const mapDispatchToProps = dispatch => ({
    agglomerateFetch: () => dispatch(agglomerateFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Galleries);
