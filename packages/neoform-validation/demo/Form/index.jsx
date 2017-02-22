import React from 'react';
import { compose } from 'recompact';
import getByPath from 'lodash.get';

import Form from '~/neoform/src/Form';
import FormValidation from '~/neoform-validation/src/Form';

import Input from '../Input';

const requiredValidator = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return Promise.reject('required');
  }

  return Promise.resolve();
};

const MyForm = ({ data, validation, ...props }) => (
  <form {...props}>
    <h1>simple form</h1>
    <h2>personal data</h2>
    <div>
      <label>
        first name (required)
        <Input defaultValue="" name="firstName" validator={requiredValidator}/>
      </label>
    </div>
    <div>
      <label>
        last name (required)
        <Input defaultValue="" name="lastName" validator={requiredValidator}/>
      </label>
    </div>
    <h2>phone numbers</h2>
    <ul>
      {
        data.phoneNumbers.map((phoneNumber, index) => (
          <li key={index}>
            <Input name={`phoneNumbers[${index}]`}/>
          </li>
        ))
      }
    </ul>
    <h2>friends</h2>
    <ul>
      {
        data.friends.map((friend, index) => (
          <li key={index}>
            <div>
              <label>
                first name
                <Input name={`friends[${index}].firstName`}/>
              </label>
            </div>
            <div>
              <label>
                last name
                <Input name={`friends[${index}].lastName`}/>
              </label>
            </div>
          </li>
        ))
      }
    </ul>
    <button type="submit">submit</button>
    {
      validation.status === false && (
        <div style={{ color: 'red' }}>Form is invalid</div>
      )
    }
  </form>
);

export default compose(
  Form(getByPath),
  FormValidation('onSubmit')
)(MyForm);
