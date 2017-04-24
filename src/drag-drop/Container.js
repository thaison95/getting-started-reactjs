import React from 'react';
import ShoppingCart from './ShoppingCart';
import Snack from './Snack';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import '../style/drag-drop.css';
export class Container extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
        <div>
          <Snack name='Chips'/>
          <Snack name='Cupcake'/>
          <Snack name='Donut'/>
          <Snack name='Doritos'/>
          <Snack name='Popcorn'/>
          <ShoppingCart/>
        </div>
    );
  }
}

Container .propTypes = {

};

export default DragDropContext(HTML5Backend)(Container);