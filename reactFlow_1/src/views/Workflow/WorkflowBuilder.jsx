import React, { useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  ReactFlowProvider,
  useReactFlow,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button, Tooltip } from 'antd';
import { UndoOutlined, RedoOutlined } from '@ant-design/icons';

import TextToTextNode from './nodes/TextToTextNode';
import TextToImageNode from './nodes/TextToImageNode';
import TemplatePanel from './components/TemplatePanel';

const nodeTypes = {
  textToText: TextToTextNode,
  textToImage: TextToImageNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'textToText',
    position: { x: 100, y: 100 },
    data: { label: 'Text to Text' },
  },
];

const initialEdges = [];

const WorkflowFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition, getNodes } = useReactFlow();

  // History State
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);

  const takeSnapshot = useCallback(() => {
    setPast((old) => [...old, { nodes, edges }]);
    setFuture([]);
  }, [nodes, edges]);

  const undo = useCallback(() => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    
    setFuture((old) => [{ nodes, edges }, ...old]);
    setNodes(previous.nodes);
    setEdges(previous.edges);
    setPast(newPast);
  }, [past, nodes, edges, setNodes, setEdges]);

  const redo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);

    setPast((old) => [...old, { nodes, edges }]);
    setNodes(next.nodes);
    setEdges(next.edges);
    setFuture(newFuture);
  }, [future, nodes, edges, setNodes, setEdges]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'z') {
        event.preventDefault();
        if (event.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
      if ((event.metaKey || event.ctrlKey) && event.key === 'y') {
        event.preventDefault();
        redo();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const onNodesChangeWrapped = useCallback(
    (changes) => {
      if (changes.some((c) => c.type === 'remove' || c.type === 'replace')) {
        takeSnapshot();
      }
      onNodesChange(changes);
    },
    [onNodesChange, takeSnapshot]
  );

  const onEdgesChangeWrapped = useCallback(
    (changes) => {
      if (changes.some((c) => c.type === 'remove' || c.type === 'replace')) {
        takeSnapshot();
      }
      onEdgesChange(changes);
    },
    [onEdgesChange, takeSnapshot]
  );

  const onConnect = useCallback(
    (params) => {
      takeSnapshot();
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges, takeSnapshot],
  );

  const onNodeDragStart = useCallback(() => {
    takeSnapshot();
  }, [takeSnapshot]);

  const handleAddTemplate = (template) => {
    takeSnapshot();
    const idPrefix = `tmpl-${Date.now()}`;
    const offset = { x: 100 + Math.random() * 50, y: 100 + Math.random() * 50 }; // Random offset to avoid exact overlap

    // Calculate a safe position (simple approach: append below existing nodes or top left + offset)
    // A better way would be to get center of view, but for now fixed offset or random is ok.
    // Let's use getNodes to find max Y and append below? No, random offset from top-left is safer for demo.
    
    const newNodes = template.nodes.map((node) => ({
      ...node,
      id: `${idPrefix}-${node.id}`,
      position: {
        x: node.position.x + offset.x,
        y: node.position.y + offset.y,
      },
      data: { ...node.data }, // Copy data to avoid reference issues
    }));

    const newEdges = template.edges.map((edge) => ({
      ...edge,
      id: `${idPrefix}-${edge.id}`,
      source: `${idPrefix}-${edge.source}`,
      target: `${idPrefix}-${edge.target}`,
    }));

    setNodes((nds) => [...nds, ...newNodes]);
    setEdges((eds) => [...eds, ...newEdges]);
  };

  return (
    <div className="w-full h-screen flex bg-gray-50">
      <TemplatePanel onAddTemplate={handleAddTemplate} />
      <div className="flex-1 h-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChangeWrapped}
          onEdgesChange={onEdgesChangeWrapped}
          onConnect={onConnect}
          onNodeDragStart={onNodeDragStart}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <Panel position="top-left" className="flex gap-2 bg-white p-1 rounded-md shadow-sm border border-gray-200">
            <Tooltip title="Undo (Ctrl+Z)">
              <Button 
                type="text" 
                icon={<UndoOutlined />} 
                onClick={undo} 
                disabled={past.length === 0}
              />
            </Tooltip>
            <Tooltip title="Redo (Ctrl+Shift+Z)">
              <Button 
                type="text" 
                icon={<RedoOutlined />} 
                onClick={redo} 
                disabled={future.length === 0}
              />
            </Tooltip>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};

const WorkflowBuilder = () => (
  <ReactFlowProvider>
    <WorkflowFlow />
  </ReactFlowProvider>
);

export default WorkflowBuilder;

