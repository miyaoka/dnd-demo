import { mv } from './node'
import { Node, Leaf, Branch } from '@/types/node'

const baseTree: Node = {
  Root: [
    {
      'B.a': ['L.a-a', 'L.a-b']
    },
    {
      'B.b': [
        {
          'B.b-a': ['L.b-a-a']
        },
        {
          'B.b-b': [
            {
              'B.b-b-a': ['L.b-b-a-a']
            }
          ]
        },
        'L.b-c'
      ]
    }
  ]
}

const reorderedTree: Node = {
  Root: [
    {
      'B.a': ['L.a-b', 'L.a-a']
    },
    {
      'B.b': [
        {
          'B.b-a': ['L.b-a-a']
        },
        {
          'B.b-b': [
            {
              'B.b-b-a': ['L.b-b-a-a']
            }
          ]
        },
        'L.b-c'
      ]
    }
  ]
}

describe('mv tree node', () => {
  test('reorder leafs', () =>
    expect(mv(baseTree, 'L.a-a', 'B.a', 1)).toEqual(reorderedTree))
})
