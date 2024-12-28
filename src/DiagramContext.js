import React, { createContext, useReducer } from 'react';

const DiagramContext = createContext();

const initialState = {
  nodes: [],
  edges: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NODES':
      return { ...state, nodes: action.payload };
    case 'SET_EDGES':
      return { ...state, edges: action.payload };
    default:
      return state;
  }
};

export const DiagramProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DiagramContext.Provider value={{ state, dispatch }}>
      {children}
    </DiagramContext.Provider>
  );
};

export default DiagramContext;
