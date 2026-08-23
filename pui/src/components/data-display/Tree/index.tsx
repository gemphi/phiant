'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, File, Circle } from 'lucide-react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

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

const TreeNodeItem: React.FC<{
  node: TreeNode;
  path: number[];
  depth: number;
  onNodeClick?: (node: TreeNode, nodePath: number[]) => void;
  onNodeCollapse?: (node: TreeNode, nodePath: number[]) => void;
  onNodeExpand?: (node: TreeNode, nodePath: number[]) => void;
}> = ({ node, path, depth, onNodeClick, onNodeCollapse, onNodeExpand }) => {
  const hasChildren = node.childNodes && node.childNodes.length > 0;
  const [expanded, setExpanded] = useState<boolean>(node.isExpanded ?? true);

  const handleCaretClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasChildren) return;
    const next = !expanded;
    setExpanded(next);
    if (next) {
      onNodeExpand?.(node, path);
    } else {
      onNodeCollapse?.(node, path);
    }
  };

  const handleRowClick = () => {
    if (node.isDisabled) return;
    onNodeClick?.(node, path);
  };

  return (
    <li className={cn(styles.treeItem, node.isDisabled && styles.disabled)}>
      <div
        className={cn(
          styles.treeRow,
          node.isSelected && styles.selected,
          node.isDisabled && styles.disabledRow
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={handleRowClick}
      >
        <span className={styles.treeCaret} onClick={handleCaretClick}>
          {hasChildren ? (
            expanded ? (
              <ChevronDown size={14} className={styles.caretIcon} />
            ) : (
              <ChevronRight size={14} className={styles.caretIcon} />
            )
          ) : (
            <span className={styles.caretSpacer} />
          )}
        </span>

        <span className={styles.treeIcon}>
          {node.icon ? (
            node.icon
          ) : hasChildren ? (
            <Folder size={15} className={styles.folderIcon} />
          ) : (
            <File size={14} className={styles.fileIcon} />
          )}
        </span>

        <span className={styles.treeLabel}>{node.label}</span>

        {node.secondaryLabel && (
          <span className={styles.treeSecondaryLabel}>{node.secondaryLabel}</span>
        )}
      </div>

      {hasChildren && expanded && (
        <ul className={styles.treeSublist}>
          {node.childNodes!.map((child, idx) => (
            <TreeNodeItem
              key={child.id ?? idx}
              node={child}
              path={[...path, idx]}
              depth={depth + 1}
              onNodeClick={onNodeClick}
              onNodeCollapse={onNodeCollapse}
              onNodeExpand={onNodeExpand}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

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
