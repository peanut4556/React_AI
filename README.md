# React_AI
## 1. 核心工作流构建器 (`WorkflowBuilder.jsx`)
### 主要职责：
* 初始化 React Flow 画布。
* 管理节点 (`nodes`) 和连线 (`edges`) 的状态。
* 实现撤销 (`undo`) 和重做 (`redo`) 功能，支持快捷键 (`Ctrl+Z`, `Ctrl+Y`, `Command+Z`, `Command+Shift+Z`)。
* 处理模板添加逻辑 (`handleAddTemplate`)，生成不重复的 ID 并计算位置偏移。

## 2. 模板面板 (`components/TemplatePanel.jsx`)
### 主要职责：
* 展示预定义的模板列表 (`templates`)。
* 点击 "Add to Workflow" 触发父组件的回调 `onAddTemplate`。

## 3. 自定义节点实现--TextToTextNode (`nodes/TextToTextNode.jsx`)
### 主要职责：
* 提供文本输入框 (`Input.TextArea`) 用于输入提示词。
* 提供 AI 模型选择 UI。
* 使用 `Handle` (source) 允许输出连接。
* 使用 `useReactFlow` 实现节点删除和数据更新。

## 4. TextToImageNode (`nodes/TextToImageNode.jsx`)
### 主要职责：
* 类似 `TextToTextNode`，但包含 `aspectRatio` (宽高比) 选择。
* 同时具有输入 (`target`) 和输出 (`source`) Handle，支持串联.
