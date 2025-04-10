type NodeType = 'div' | 'span' | ((props: any) => Node);

type Element = Node | string;

class Node {
  type: NodeType;
  props: any;
  children: Element[];

  constructor(type: NodeType, props: any, children: Node[]) {
    this.type = type;
    this.props = props;
    this.children = children;
  }

  toHtml(): string {
    if (typeof this.type === 'function') {
      return this.type({
        ...this.props,
        children: this.children,
      }).toHtml();
    }

    const children = this.children
      .map((child) => {
        if (typeof child === 'string') {
          return child;
        }

        return child.toHtml();
      })
      .join('');

    return `<${this.type}>${children}</${this.type}>`;
  }
}

export const jsx = (type: NodeType, props: any, key: any): Node => {
  const { children = [], ...restProps } = props;

  return new Node(
    type,
    restProps,
    Array.isArray(children) ? children : [children]
  );
};

export const jsxs = jsx;

// export const Fragment = (...args: any[]) => {
//   console.log('args:', args);

//   return args;
// };

export namespace JSX {
  export interface IntrinsicElements {
    [elemName: string]: any;
  }
}
