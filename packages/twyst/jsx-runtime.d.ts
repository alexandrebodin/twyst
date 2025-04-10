type NodeType = 'div' | 'span' | ((props: any) => Node);
type Element = Node | string;
declare class Node {
    type: NodeType;
    props: any;
    children: Element[];
    constructor(type: NodeType, props: any, children: Node[]);
    toHtml(): string;
}
export declare const jsx: (type: NodeType, props: any, key: any) => Node;
export declare const jsxs: (type: NodeType, props: any, key: any) => Node;
export declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}
export {};
//# sourceMappingURL=jsx-runtime.d.ts.map