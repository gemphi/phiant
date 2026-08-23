'use client';

import React from 'react';
import { cn } from '../../../utils/cn';
import { TreeProps } from './types';
import { TreeNodeItem } from './TreeNodeItem';
import styles from './styles.module.scss';

export * from './types';
export * from './TreeNodeItem';

export const Tree: React.FC<TreeProps> = ({
  nodes,
  onNodeClick,
  onNodeCollapse,
  onNodeExpand,
  className,
}) => {
  return (
    <ul className={cn(styles.treeRoot, className)}>
      {nodes.map((node, idx) => (
        <TreeNodeItem
          key={node.id ?? idx}
          node={node}
          path={[idx]}
          depth={0}
          onNodeClick={onNodeClick}
          onNodeCollapse={onNodeCollapse}
          onNodeExpand={onNodeExpand}
        />
      ))}
    </ul>
  );
};

export const TreeView = Tree;
export default Tree;
