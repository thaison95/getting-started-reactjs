import React from 'react';
import KanbanBoard from './KanbanBoard';
import * as firebase from 'firebase';

export class KanbanBoardContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            cardsList: [],
            db: null
        };
    }

    componentWillMount() {
        this.setState({db: firebase.database()});
    }

    componentDidMount() {
        const bag = this.state.db.ref('Todo');
        bag.on('value', snap => {
            console.log(snap.val());
            this.setState({cardsList: snap.val()});
        });

    }

    addTask(cardId, taskName) {
        let cardIndex = this.state.cardsList.findIndex((card)=>card.id === cardId);
        if(this.state.cardsList[cardIndex].tasks) {
            this.state.db.ref(`Todo/${cardIndex}/tasks/${this.state.cardsList[cardIndex].tasks.length}`).update({
                done: false,
                id: this.state.cardsList[cardIndex].tasks[this.state.cardsList[cardIndex].tasks.length - 1].id + 1,
                name: taskName
            });
        }
        else {
            this.state.db.ref(`Todo/${cardIndex}/tasks/0`).update({
                done: false,
                id: 1,
                name: taskName
            });
        }
    }

    deleteTask(cardId, taskId, taskIndex) {
        let cardIndex = this.state.cardsList.findIndex((card)=>card.id === cardId);
        this.state.db.ref(`Todo/${cardIndex}/tasks/${taskIndex}`).remove();
    }

    toggleTask(cardId, taskId, taskIndex) {
        let cardIndex = this.state.cardsList.findIndex((card)=>card.id === cardId);
        this.state.db.ref(`Todo/${cardIndex}/tasks/${taskIndex}`).update({done: !this.state.cardsList[cardIndex].tasks[taskIndex].done});
    }

    render() {
        return (
            <KanbanBoard cards={this.state.cardsList}
                         taskCallbacks={{
                             add: this.addTask.bind(this),
                             toggle: this.toggleTask.bind(this),
                             delete: this.deleteTask.bind(this)
                         }}
            />
        );
    }
}

KanbanBoardContainer.propTypes = {};


export default KanbanBoardContainer;