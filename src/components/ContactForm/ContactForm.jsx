import React, { Component } from 'react';
import { Formik } from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';
import {
  AddContactForm,
  Input,
  AddContactBtn,
  ErrorMesage,
} from './ContactForm.styled';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter the required field')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
  number: Yup.string()
    .matches(
      /^(?:\+38)?(0\d{9})$/,
      'Phone number is not valid. For example 0XXXXXXXXX'
    )
    .required('Please enter the required field'),
});

export default class ContactForm extends Component {
  render() {
    const { onAddContact } = this.props;

    return (
      <Formik
        initialValues={{ name: '', number: '', id: '' }}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={(values, actions) => {
          values.id = nanoid(5);
          actions.resetForm();
          onAddContact(values);
        }}
      >
        {({ errors, touched }) => (
          <AddContactForm noValidate>
            <label htmlFor="name">
              Name
              <Input type="text" name="name" id="name" required />
              {touched.name && errors.name && (
                <ErrorMesage>{errors.name}</ErrorMesage>
              )}
            </label>

            <label htmlFor="number">
              Number
              <Input type="tel" name="number" id="number" required />
              {touched.number && errors.number && (
                <ErrorMesage>{errors.number}</ErrorMesage>
              )}
            </label>

            <AddContactBtn type="submit">Add contact</AddContactBtn>
          </AddContactForm>
        )}
      </Formik>
    );
  }
}
