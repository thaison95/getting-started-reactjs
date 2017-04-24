import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as firebase from 'firebase';
import KanbanBoardContainer from './kanban/KanbanBoardContainer';
// import AnimatedShoppingList from './animated-shopping/AnimatedShoppingList';
// import Container from './drag-drop/Container';
let config = {
    apiKey: "AIzaSyAU7auaUdy_gfExBBuRy5zbP1MjT7z__V8",
    authDomain: "blazing-fire-3588.firebaseapp.com",
    databaseURL: "https://blazing-fire-3588.firebaseio.com",
    projectId: "blazing-fire-3588",
    storageBucket: "blazing-fire-3588.appspot.com",
    messagingSenderId: "192122373630"
};
firebase.initializeApp(config);

ReactDOM.render(

  <KanbanBoardContainer/>,
  document.getElementById('root')
);
