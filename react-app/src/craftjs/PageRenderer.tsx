import React from 'react';
import { Editor, Frame } from '@craftjs/core';
import { craftResolver } from './components';

interface PageRendererProps {
  json: string;
}

export function PageRenderer({ json }: PageRendererProps) {
  return (
    <Editor enabled={false} resolver={craftResolver}>
      <Frame data={json} />
    </Editor>
  );
}
