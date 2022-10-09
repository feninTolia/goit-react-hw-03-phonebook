import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const lsContacts = localStorage.getItem('contacts');
    const parsedLsContacts = JSON.parse(lsContacts);

    if (parsedLsContacts) {
      this.setState({ contacts: parsedLsContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddContactForm = contact => {
    const { contacts } = this.state;
    if (contacts && contacts.some(el => el.number === contact.number)) {
      window.alert(`${contact.number} is already exist in your phonebook`);
      return;
    }

    if (contacts && contacts.some(el => el.name === contact.name)) {
      window.alert(`${contact.name} is already exist in your phonebook`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  handleDeleteContact = userId => {
    const { contacts, filter } = this.state;

    const updatedContactList = contacts.filter(el => el.id !== userId);

    const updateFilterdList = filter && filter.filter(el => el.id !== userId);

    this.setState(() => ({
      contacts: updatedContactList,
      filter: updateFilterdList,
    }));
  };

  handleContactsFilter = namePart => {
    const { contacts } = this.state;

    let FiltredContacts = contacts.filter(e =>
      e.name.toLowerCase().includes(namePart.toLowerCase())
    );

    if (namePart === '') {
      FiltredContacts = '';
    }

    this.setState(() => ({
      filter: FiltredContacts,
    }));
  };

  render() {
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.handleAddContactForm} />

        <h2>Contacts</h2>
        <Filter onContactsFilter={this.handleContactsFilter} />
        <ContactList
          filter={this.state.filter}
          contacts={this.state.contacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </>
    );
  }
}
