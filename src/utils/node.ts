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

export const moveNode = (tree: Node, fromId: string, toId: string): Node => {
  const clonedTree = JSON.parse(JSON.stringify(tree))
  const map = nodeMap(clonedTree)

  const getNode = (id: string) => {
    const obj = map[id]
    if (!obj) {
      throw Error(`'${id}' is not exist.`)
    }
    return obj
  }
  const getAncestors = (id: string): string[] => {
    const node = getNode(id)
    if (!node.parent) return [id]
    return [id, ...getAncestors(node.parent)]
  }

  // remove
  const fromNode = getNode(fromId)
  const toNode = getNode(toId)

  if (!fromNode.parent) {
    throw Error(`Can't move the root node.`)
  }
  if (getAncestors(toId).some(ancId => ancId === fromId)) {
    throw Error(`Can't move to self or self children.`)
  }
  const parent = getNode(fromNode.parent)
  const parentChildren = parent.node.children
  if (!parentChildren) {
    throw Error(`Parent has no children. (something wrong)`)
  }

  const fromIndex = parentChildren.findIndex(
    parentChild => parentChild === fromNode.node
  )
  if (fromIndex < 0) {
    throw Error(
      `Selecting node is not exist in the parent children. (something wrong)`
    )
  }
  parentChildren.splice(fromIndex, 1)

  // push
  const toChildren = toNode.node.children
  if (!toChildren) {
    throw Error(`Can't move to leaf node.`)
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
