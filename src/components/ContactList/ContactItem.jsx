import React, { Component } from 'react';

export default class ContactItem extends Component {
  render() {
    const { id, name, number, onDeleteContact } = this.props;

    return (
      <li>
        <span>{name} </span>
        <span>{number} </span>
        <button type="button" onClick={() => onDeleteContact(id)}>
          delete
        </button>
      </li>
    );
  }
}
