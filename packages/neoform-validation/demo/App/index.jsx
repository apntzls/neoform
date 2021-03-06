import React, { Component } from 'react';
import { getValue, setValue } from '~/neoform-plain-object-helpers/src/';

import Form from '../Form';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = props.data;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(name, value) {
    this.setState((prevState) => setValue(prevState, name, value));
  }

  onSubmit() {
    console.log('submit', this.state);
  }

  render() {
    return (
      <Form
        data={this.state}
        getValue={getValue}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default App;
