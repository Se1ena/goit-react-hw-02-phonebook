import React, { Component } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Container, Title, TitleContacts } from 'components/Container.styles';

import { nanoid } from 'nanoid'


export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleInputChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  addContact = (data) => {
    const { name, number } = data;
    if (this.checkDoubleContact(data)) {
      alert(`${name} is already in your contacts!`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  checkDoubleContact = (inputData) => {
    return this.state.contacts.find(contact => contact.name === inputData.name);
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalized = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalized));
  };

  deleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.addContact} />
        <TitleContacts>Contacts</TitleContacts>
        <Filter value={this.state.filter} onFilter={this.handleInputChange} />
        <ContactList contacts={visibleContacts} deleteContact={this.deleteContact} />
      </Container>
    );
  }
}

