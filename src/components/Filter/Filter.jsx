import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import { Input, FilterLabel } from './Filter.styled';

export default class Filter extends Component {
  render() {
    const { onContactsFilter } = this.props;

    return (
      <Formik
        initialValues={{ filter: '' }}
        onSubmit={actions => {
          actions.resetForm();
        }}
      >
        {({ handleChange }) => (
          <Form>
            <FilterLabel htmlFor="filter">
              Find contacts by the name
              <Input
                name="filter"
                id="filter"
                type="text"
                onChange={e => {
                  onContactsFilter(e.target.value);
                  handleChange(e);
                }}
              />
            </FilterLabel>
          </Form>
        )}
      </Formik>
    );
  }
}
