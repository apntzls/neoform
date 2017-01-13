import React, { Component, PropTypes } from 'react';

export default (Target) => {
  class Value extends Component {
    constructor(props, context) {
      super(props, context);

      this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
      this.context.neoform.updateState('values', {
        [this.props.name]: this.props.initialValue
      });
    }

    onChange(value) {
      this.context.neoform.updateState('values', {
        [this.props.name]: value
      });
    }

    getValue() {
      const value = this.context.neoform.getValue('values', this.props.name);

      if (typeof value === 'undefined') {
        return this.props.initialValue;
      }

      return value;
    }

    render() {
      // TODO: omit
      const { initialValue, ...props } = this.props; // eslint-disable-line no-unused-vars

      return (
        <Target
          {...props}
          changeValue={this.onChange}
          value={this.getValue()}
        />
      );
    }
  }

  Value.contextTypes = {
    neoform: PropTypes.object
  };

  Value.propTypes = {
    initialValue: PropTypes.any,
    name: PropTypes.string,
    value: PropTypes.any
  };

  return Value;
};