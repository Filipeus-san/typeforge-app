import React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  paddingTop?: boolean;
  paddingBottom?: boolean;
  minHeight?: boolean;
  className?: string;
}

export function PageWrapper({
  children,
  paddingTop = true,
  paddingBottom = true,
  minHeight = true,
  className,
}: PageWrapperProps) {
  const classes = [
    'page-wrapper',
    paddingTop ? 'pt-navbar' : '',
    paddingBottom ? 'pb-section' : '',
    minHeight ? 'min-vh-100' : '',
    className,
  ].filter(Boolean).join(' ');
  return <div className={classes}>{children}</div>;
}
