import React, { Component } from 'react';
import { Choices } from './Choices.js';

export class FieldBox extends Component {
  render() {
    return (
      <div className="fieldBox">
        <div className="fieldDescr">{this.props.field.description}</div>
        <Choices choices={this.props.field.choices} />
      </div>
    );
  }
}
