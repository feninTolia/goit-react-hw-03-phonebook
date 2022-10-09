import React, { Component } from 'react';
import ContactItem from './ContactItem';

export default class ContactList extends Component {
  render() {
    const { contacts, filter, onDeleteContact } = this.props;

    return (
      <ul>
        {(filter || contacts).map(({ id, name, number }) => (
          <ContactItem
            key={id}
            name={name}
            number={number}
            onDeleteContact={onDeleteContact}
            id={id}
          />
        ))}
      </ul>
    );
  }
}
