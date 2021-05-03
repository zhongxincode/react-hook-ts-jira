import React from "react";

// https://github.com/bvaughn/react-error-boundary

// class Component<P, S>
// P : {children, fallbackBoundary}
// S : {state}

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// {children: ReactNode, fallbackRender: FallbackRender}
// React.PropsWithChildren<{fallbackRender: FallbackRender}>
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  // 当子组件抛出异常，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return error;
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
