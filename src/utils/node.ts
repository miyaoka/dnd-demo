import { Node } from '@/types/node'

type NodeMap = Record<
  string,
  {
    parent?: string
    node: Node
  }
>

const nodeOrder = (node: Node): number => {
  return node.children ? -10 : 0
}

export const moveNode = (tree: Node, from: string, to: string): Node => {
  const clonedTree = JSON.parse(JSON.stringify(tree))
  const map = nodeMap(clonedTree)

  const getNode = (id: string) => {
    const obj = map[id]
    if (!obj) {
      throw Error(`'${id}' is not exist.`)
    }
    return obj
  }

  // remove
  const fromNode = getNode(from)
  const toNode = getNode(to)

  if (!fromNode.parent) {
    throw Error(`can't move root node.`)
  }
  const parent = getNode(fromNode.parent)
  if (!parent || !parent.node.children) {
    throw Error(`no children.`)
  }
  const parentChildren = parent.node.children

  const fromIndex = parentChildren.findIndex(
    parentChild => parentChild === fromNode.node
  )
  if (fromIndex < 0) {
    throw Error(`not exist in parent children.`)
  }
  parent.node.children.splice(fromIndex, 1)

  // push
  const toChildren = toNode.node.children
  if (!toChildren) {
    throw Error(`can't move to leaf node.`)
  }
  toChildren.push(fromNode.node)
  toChildren.sort(
    (a, b) => nodeOrder(a) - nodeOrder(b) + a.id.localeCompare(b.id)
  )

  return clonedTree
}

const nodeMap = (node: Node, parent?: string): NodeMap => {
  return (node.children || []).reduce(
    (acc: NodeMap, child) => {
      return {
        ...acc,
        ...nodeMap(child, node.id)
      }
    },
    {
      [node.id]: {
        parent,
        node
      }
    }
  )
}
