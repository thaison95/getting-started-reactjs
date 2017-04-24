import React from 'react';
import '../style/animated-shopping-list.css';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

export class AnimatedShoppingList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            items: [
                {id: 1, name: 'Milk'},
                {id: 2, name: 'Yogurt'},
                {id: 3, name: 'Orange Juice'},
            ]
        }
    }

    handleChange(evt) {
        if (evt.key === 'Enter') {
            // Create a new item and set the current time as it's id
            let newItem = {id: Date.now(), name: evt.target.value}
            // Create a new array with the previous items plus the value the user typed
            let newItems = this.state.items.concat(newItem);
            // Clear the text field
            evt.target.value = '';
            // Set the new state
            this.setState({items: newItems});
        }
    }

    handleRemove(i) {
        // Create a new array without the clicked item
        var newItems = this.state.items;
        newItems.splice(i, 1);
        // Set the new state
        this.setState({items: newItems});
    }

    render() {
        let shoppingItems = this.state.items.map((item, i) => (
            <div key={item.id}
                 className="item"
                 onClick={this.handleRemove.bind(this, i)}>
                {item.name}
            </div>
        ));
        return(
            <div>
                <ReactCSSTransitionGroup transitionName="example"
                                         transitionEnterTimeout={300}
                                         transitionLeaveTimeout={300}
                                         transitionAppear={true}
                                         transitionAppearTimeout={300}>
                    {shoppingItems}
                </ReactCSSTransitionGroup>
                <input type="text" value={this.state.newItem} onKeyDown={this.handleChange.bind(this)}/>
            </div>
        );
    }
}

AnimatedShoppingList.propTypes = {};

export default AnimatedShoppingList;