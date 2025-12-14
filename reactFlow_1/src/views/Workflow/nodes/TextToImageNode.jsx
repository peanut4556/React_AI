import React, { memo, useCallback } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Card, Input, Button, Tag, Select } from 'antd';
import { PlayCircleFilled, PictureOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const TextToImageNode = ({ id, data, isConnectable }) => {
  const { deleteElements, updateNodeData } = useReactFlow();

  const handleDelete = useCallback(() => {
    deleteElements({ nodes: [{ id }] });
  }, [id, deleteElements]);

  const handleTextChange = useCallback((e) => {
    updateNodeData(id, { text: e.target.value });
  }, [id, updateNodeData]);

  const handleRatioChange = useCallback((value) => {
    updateNodeData(id, { aspectRatio: value });
  }, [id, updateNodeData]);

  return (
    <div className="nodrag cursor-default group">
      <Card
        className="w-[320px] border-2 border-blue-400 rounded-xl overflow-hidden shadow-md transition-shadow hover:shadow-lg"
        styles={{ body: { padding: 0 } }}
        bordered={false}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
              <PictureOutlined className="text-lg text-blue-500" />
            </div>
            <span className="font-semibold text-gray-800">Text to Image</span>
            <span className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 flex items-center gap-1">
              ⏱ 5s-30s
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              type="text" 
              danger
              icon={<DeleteOutlined />} 
              onClick={handleDelete}
              className="flex items-center justify-center hover:bg-red-50 rounded-full w-8 h-8 p-0"
              title="Delete Node"
            />
            <Button 
              type="text" 
              icon={<PlayCircleFilled className="text-green-500 text-xl" />} 
              className="flex items-center justify-center hover:bg-gray-100 rounded-full w-8 h-8 p-0"
              title="Run Node"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-4 bg-white">
          {/* Creative Instruction */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold text-gray-800">Creative Instruction *</span>
            <Input.TextArea 
              placeholder="Describe the image subjects and styles" 
              autoSize={{ minRows: 3, maxRows: 5 }}
              className="text-sm rounded-lg bg-gray-50 border-gray-200 hover:bg-white focus:bg-white transition-colors"
              variant="filled"
              value={data.text || ''}
              onChange={handleTextChange}
            />
          </div>

          {/* Aspect Ratio */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold text-gray-800">Aspect Ratio</span>
            <Select
              defaultValue="16:9"
              value={data.aspectRatio || '16:9'}
              onChange={handleRatioChange}
              className="w-full"
              options={[
                { value: '16:9', label: '16:9' },
                { value: '4:3', label: '4:3' },
                { value: '1:1', label: '1:1' },
              ]}
            />
          </div>

          {/* Choose AI Model */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold text-gray-800">Choose AI Model(s) *</span>
            <div className="flex items-center gap-2 flex-wrap">
              <Button 
                type="dashed" 
                icon={<PlusOutlined />} 
                className="bg-gray-800 text-white border-gray-800 hover:!bg-gray-700 hover:!border-gray-700 hover:!text-white rounded-full text-xs h-8 px-3"
              >
                Add models
              </Button>
              <Tag 
                closable 
                closeIcon={<DeleteOutlined className="text-gray-400 hover:text-gray-600" />}
                className="flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white text-gray-700 text-xs h-8 m-0"
              >
                <span className="text-lg">🍭</span> Hailuo Image 01
              </Tag>
            </div>
          </div>
        </div>
        
        {/* Handles */}
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
          className="!w-3 !h-3 !bg-blue-400 !border-2 !border-white transition-transform hover:scale-125"
        />
        <Handle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
          className="!w-3 !h-3 !bg-blue-400 !border-2 !border-white transition-transform hover:scale-125"
        />
      </Card>
    </div>
  );
};

export default memo(TextToImageNode);
