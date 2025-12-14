import React from 'react';
import { Card, Button, List, Typography } from 'antd';
import { PlusOutlined, AppstoreAddOutlined, ThunderboltOutlined, PictureOutlined } from '@ant-design/icons';

const templates = [
  {
    id: 'text-gen',
    name: 'Text Generation',
    description: 'A simple text generation node',
    nodes: [
      { id: 'n1', type: 'textToText', data: { label: 'Text Generation' }, position: { x: 0, y: 0 } }
    ],
    edges: []
  },
  {
    id: 'text-to-image',
    name: 'Text to Image',
    description: 'Generate text and convert to image',
    nodes: [
      { id: 'n1', type: 'textToText', data: { label: 'Story Generator' }, position: { x: 0, y: 0 } },
      { id: 'n2', type: 'textToImage', data: { label: 'Illustration' }, position: { x: 450, y: 0 } }
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2', animated: true }
    ]
  },
  {
    id: 'image-gen',
    name: 'Image Generation',
    description: 'Direct text to image node',
    nodes: [
      { id: 'n1', type: 'textToImage', data: { label: 'Image Gen' }, position: { x: 0, y: 0 } }
    ],
    edges: []
  }
];

const TemplatePanel = ({ onAddTemplate }) => {
  return (
    <div className="w-80 h-full bg-white border-r border-gray-200 flex flex-col z-10 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-2 p-4 border-b border-gray-100 bg-gray-50">
             <AppstoreAddOutlined className="text-xl text-blue-500"/>
             <span className="font-semibold text-lg text-gray-800">Templates</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50">
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={templates}
                renderItem={item => (
                    <List.Item>
                        <Card 
                            hoverable
                            className="w-full shadow-sm hover:shadow-md transition-all border-gray-200"
                            styles={{ body: { padding: '12px' } }}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="bg-blue-50 p-1.5 rounded-lg text-blue-500">
                                        {item.nodes.some(n => n.type === 'textToImage') ? <PictureOutlined /> : <ThunderboltOutlined />}
                                    </div>
                                    <span className="font-medium text-gray-800">{item.name}</span>
                                </div>
                            </div>
                            
                            <Typography.Paragraph type="secondary" className="text-xs mb-3 text-gray-500" ellipsis={{ rows: 2 }}>
                                {item.description}
                            </Typography.Paragraph>

                            <Button 
                                type="primary" 
                                ghost 
                                size="small" 
                                block
                                icon={<PlusOutlined />} 
                                onClick={() => onAddTemplate(item)}
                            >
                                Add to Workflow
                            </Button>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    </div>
  );
};

export default TemplatePanel;

