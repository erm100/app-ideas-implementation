import React from 'react';
import {TextInputElement} from './textInputElement';
import {DateTimeElement} from './dateTimeElement';

export class InputElement extends React.Component {
  render() {
    const {type, ...otherProps} = this.props;

    let Element;
    switch (type) {
      case 'datetime':
      case 'time':
      case 'date':
        Element = DateTimeElement;
        break;
      default:
        Element = TextInputElement;
    }

    return <Element type={type} {...otherProps} />;
  }
}
