export type Node = Branch | Leaf
export type Branch = Record<string, Node[]>
export type Leaf = string
