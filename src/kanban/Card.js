import React, { Component } from 'react';
import CheckList from './CheckList';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { DragSource } from 'react-dnd';
import constants from '../constants';

const cardDragSpec = {
    beginDrag(props) {
        console.log(props);
        return {
            id: props.id,
            status: props.status
        };
    },
    endDrag(props) {
        props.cardCallbacks.persistCardDrag(props.id, props.status);
    }
}
let collectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource()
    };
}

class Card extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            showDetails: false
        };
    }

    toggleDetails() {
        this.setState({showDetails: !this.state.showDetails});
    }

    render() {
        const { connectDragSource } = this.props;
        let cardDetails;
        if (this.state.showDetails) {
            cardDetails = (
                <div className="card__details">
                    {this.props.description}
                    <CheckList cardId={this.props.id} tasks={this.props.tasks} taskCallbacks={this.props.taskCallbacks}/>
                </div>
            );
        }
        let sideColor = {
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 7,
            backgroundColor: this.props.color
        };
        return connectDragSource(
            <div className="card">
                <div style={sideColor}/>
                <div className={this.state.showDetails ? "card__title card__title--is-open" : "card__title"} onClick={this.toggleDetails.bind(this)}>
                    {this.props.title}
                </div>
                <ReactCSSTransitionGroup transitionName="toggle"
                                         transitionEnterTimeout={250}
                                         transitionLeaveTimeout={250} >
                    {cardDetails}
                </ ReactCSSTransitionGroup>
            </div>
        );
    }
}
export default DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
