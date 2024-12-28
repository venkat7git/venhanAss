import React, {  useEffect, useCallback, useContext } from 'react';
import ReactFlow, { addEdge, applyNodeChanges, applyEdgeChanges, MiniMap, Controls, Background } from 'react-flow-renderer';
import Sidebar from './Sidebar';
import './App.css';
import metadata from './metadata.json';
import DiagramContext from './DiagramContext';

const App = () => {
  const { state, dispatch } = useContext(DiagramContext);

  useEffect(() => {
    dispatch({ type: 'SET_NODES', payload: metadata.nodes });
    dispatch({ type: 'SET_EDGES', payload: metadata.edges });
  }, [dispatch]);

  const onNodesChange = useCallback((changes) => {
    dispatch({ type: 'SET_NODES', payload: applyNodeChanges(changes, state.nodes) });
  }, [dispatch, state.nodes]);

  const onEdgesChange = useCallback((changes) => {
    dispatch({ type: 'SET_EDGES', payload: applyEdgeChanges(changes, state.edges) });
  }, [dispatch, state.edges]);

  const onConnect = useCallback((params) => {
    dispatch({ type: 'SET_EDGES', payload: addEdge(params, state.edges) });
  }, [dispatch, state.edges]);

  return (
    <div className="dndflow">
      <Sidebar />
      <ReactFlow
        nodes={state.nodes}
        edges={state.edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="react-flow"
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default App;
