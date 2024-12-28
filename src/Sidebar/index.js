import React, { useState, useContext } from 'react';
import './index.css';
import DiagramContext from '../DiagramContext';

const Sidebar = () => {
  const [addNodeLabel, setAddNodeLabel] = useState('');
  const [editNodeId, setEditNodeId] = useState('');
  const [editNodeLabel, setEditNodeLabel] = useState('');
  const [nodeId, setNodeId] = useState('');
  const [edgeSource, setEdgeSource] = useState('');
  const [edgeTarget, setEdgeTarget] = useState('');
  const { state, dispatch } = useContext(DiagramContext);

  const handleAddNode = () => {
    const newNode = {
      id: `${state.nodes.length + 1}`,
      data: { label: `${state.nodes.length + 1}: ${addNodeLabel}` },
      position: { x: Math.random() * 250, y: Math.random() * 250 }
    };
    dispatch({ type: 'SET_NODES', payload: [...state.nodes, newNode] });
    setAddNodeLabel('');
  };

  const handleAddEdge = () => {
    const newEdge = {
      id: `e${edgeSource}-${edgeTarget}`,
      source: edgeSource,
      target: edgeTarget
    };
    dispatch({ type: 'SET_EDGES', payload: [...state.edges, newEdge] });
    setEdgeSource('');
    setEdgeTarget('');
  };

  const handleDeleteNode = () => {
    const updatedNodes = state.nodes.filter(node => node.id !== nodeId);
    const updatedEdges = state.edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId);
    dispatch({ type: 'SET_NODES', payload: updatedNodes });
    dispatch({ type: 'SET_EDGES', payload: updatedEdges });
    setNodeId('');
  };

  const handleEditNode = () => {
    const updatedNodes = state.nodes.map(node => 
      node.id === editNodeId ? { ...node, data: { label: `${editNodeId}: ${editNodeLabel}` } } : node
    );
    dispatch({ type: 'SET_NODES', payload: updatedNodes });
    setEditNodeId('');
    setEditNodeLabel('');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3>Add Node</h3>
        <label className="sidebar-label">Node Label:</label>
        <input type="text" className="sidebar-input" value={addNodeLabel} onChange={(e) => setAddNodeLabel(e.target.value)} />
        <button className="sidebar-button" onClick={handleAddNode}>Add Node</button>
      </div>

      <div className="sidebar-section">
        <h3>Edit Node</h3>
        <label className="sidebar-label">Node ID:</label>
        <input type="text" className="sidebar-input" value={editNodeId} onChange={(e) => setEditNodeId(e.target.value)} />
        <label className="sidebar-label">Node Label:</label>
        <input type="text" className="sidebar-input" value={editNodeLabel} onChange={(e) => setEditNodeLabel(e.target.value)} />
        <button className="sidebar-button" onClick={handleEditNode}>Edit Node</button>
      </div>

      <div className="sidebar-section">
        <h3>Delete Node</h3>
        <label className="sidebar-label">Node ID:</label>
        <input type="text" className="sidebar-input" value={nodeId} onChange={(e) => setNodeId(e.target.value)} />
        <button className="sidebar-button delete-button" onClick={handleDeleteNode}>Delete Node</button>
      </div>

      <div className="sidebar-section">
        <h3>Add Edge</h3>
        <label className="sidebar-label">Edge Source:</label>
        <input type="text" className="sidebar-input" value={edgeSource} onChange={(e) => setEdgeSource(e.target.value)} />
        <label className="sidebar-label">Edge Target:</label>
        <input type="text" className="sidebar-input" value={edgeTarget} onChange={(e) => setEdgeTarget(e.target.value)} />
        <button className="sidebar-button" onClick={handleAddEdge}>Add Edge</button>
      </div>
    </aside>
  );
};

export default Sidebar;
