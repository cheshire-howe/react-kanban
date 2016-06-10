import React, { Component } from 'react';
import update from 'react-addons-update';

import KanbanBoard from './KanbanBoard';

import 'whatwg-fetch';
import 'babel-polyfill';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'literally-anything'
};

class KanbanBoardContainer extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      cards: []
    };
  }

  componentDidMount() {
    fetch(API_URL + '/cards', {headers: API_HEADERS})
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({cards: responseData})
    })
    .catch((error) => {
      console.log("Error fetching and parsing data", error);
    });
  }

  addTask(cardId, taskName) {

  }

  deleteTask(cardId, taskId, taskIndex) {
    // Keep a reference to the original state prior to the mutations
    // in case we need to revert the optimistic changes in the UI
    let prevState = this.state;

    // Find index of card
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

    // Create a new object without the task
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {$splice: [[taskIndex, 1]]}
      }
    });

    // set the component state to the mutated object
    this.setState({cards: nextState});

    // 
  }

  toggleTask(cardId, taskId, taskIndex) {

  }

  render() {
    return <KanbanBoard cards={this.state.cards}
                        taskCallbacks={{
                          toggle: this.toggleTask.bind(this),
                          delete: this.deleteTask.bind(this),
                          add: this.addTask.bind(this)
                        }} />;
  }
}

export default KanbanBoardContainer;
