import React from 'react';
import { DropTarget } from 'react-dnd';
import constants from '../constants';

const ShoppingCartSpec = {
    drop() {
        return { name: 'ShoppingCart' };
    }
};

let collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}

export class ShoppingCart extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;
        let backgroundColor = '#FFFFFF';
        if (isActive) {
            backgroundColor = '#F7F7BD';
        } else if (canDrop) {
            backgroundColor = '#F7F7F7';
        }
        const style = {
            backgroundColor: backgroundColor
        };
        return  connectDropTarget(
            <div className='shopping-cart' style={style}>
                {isActive ?
                    'Hummmm, snack!' :
                    'Drag here to order!'
                }
            </div>
        );
    }
}

ShoppingCart.propTypes = {};

export default DropTarget(constants.SNACK, ShoppingCartSpec, collect)(ShoppingCart);