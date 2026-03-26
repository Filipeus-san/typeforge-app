import React from 'react';
import { Editor, Frame } from '@craftjs/core';
import Box from '@mui/material/Box';
import { TextNode } from './nodes/TextNode';
import { ImageNode } from './nodes/ImageNode';
import { QuoteNode } from './nodes/QuoteNode';
import { DividerNode } from './nodes/DividerNode';
import { CodeNode } from './nodes/CodeNode';
import { ButtonNode } from './nodes/ButtonNode';
import { ContainerNode } from './nodes/ContainerNode';
import { ListNode } from './nodes/ListNode';

const resolver = {
  TextNode,
  ImageNode,
  QuoteNode,
  DividerNode,
  CodeNode,
  ButtonNode,
  ContainerNode,
  ListNode,
};

interface CraftRendererProps {
  content: string;
}

export function CraftRenderer({ content }: CraftRendererProps) {
  if (!content) return null;

  return (
    <Editor resolver={resolver} enabled={false}>
      <Frame data={content} />
    </Editor>
  );
}
