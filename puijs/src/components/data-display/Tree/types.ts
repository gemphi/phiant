import React from 'react';

export interface TreeNode {
  id: string | number;
  label: string;
  icon?: React.ReactNode;
  secondaryLabel?: string;
  isExpanded?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
  childNodes?: TreeNode[];
  data?: any;
}

export interface TreeProps {
  nodes: TreeNode[];
  onNodeClick?: (node: TreeNode, nodePath: number[]) => void;
  onNodeCollapse?: (node: TreeNode, nodePath: number[]) => void;
  onNodeExpand?: (node: TreeNode, nodePath: number[]) => void;
  className?: string;
}
