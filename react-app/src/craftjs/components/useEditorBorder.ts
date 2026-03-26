import { useNode } from '@craftjs/core';

export function useEditorBorder() {
  const { selected, hovered, connectors: { connect, drag } } = useNode((node) => ({
    selected: node.events.selected,
    hovered: node.events.hovered,
  }));

  const borderStyle = selected
    ? '2px solid #7c5cfc'
    : hovered
      ? '1px dashed rgba(124,92,252,0.5)'
      : '1px dashed transparent';

  return { selected, hovered, connect, drag, borderStyle };
}
