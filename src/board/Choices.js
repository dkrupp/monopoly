import React, { Component } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export class Choices extends Component {
  render() {
    return this.props.choices && this.props.choices.length > 0 ? (
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        {this.props.choices.map((question, index) => (
          <Button key={index} onClick={question.action}>
            {question.text}
          </Button>
        ))}
      </ButtonGroup>
    ) : null;
  }
}
