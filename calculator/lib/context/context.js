import React from 'react';
import {createStyle} from '../styles';

export const context = function() {
  return {
    style: createStyle(),
    updateContext: () => {},
  };
};

export const Context = React.createContext(context);
