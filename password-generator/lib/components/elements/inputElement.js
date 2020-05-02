import React from 'react';
import {TextInputElement} from './textInputElement';
import {CheckBoxElement} from './checkboxElement';
import {SliderElement} from './sliderElement';

export const InputElement = function InputElement(props) {
  const {type, ...otherProps} = props;

  let Element;
  switch (type) {
    case 'slider':
      Element = SliderElement;
      break;
    case 'checkbox':
      Element = CheckBoxElement;
      break;
    case 'text':
    default:
      Element = TextInputElement;
  }

  return <Element type={type} {...otherProps} />;
};
