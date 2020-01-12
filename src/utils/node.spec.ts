import { moveNode } from './node'
import { Node } from '@/types/node'

const baseTree: Node = {
  id: 'Root',
  children: [
    {
      id: 'A',
      children: [{ id: 'A0' }, { id: 'A1' }, { id: 'A2' }]
    },
    {
      id: 'B',
      children: [
        {
          id: 'BA',
          children: [{ id: 'BA0' }]
        },
        {
          id: 'BB',
          children: [
            {
              id: 'BBA',
              children: [{ id: 'BBA0' }]
            }
          ]
        },
        { id: 'B0' }
      ]
    }
  ]
}

const after1: Node = {
  id: 'Root',
  children: [
    {
      id: 'A',
      children: [{ id: 'A0' }, { id: 'A2' }]
    },
    {
      id: 'B',
      children: [
        {
          id: 'BA',
          children: [{ id: 'BA0' }]
        },
        {
          id: 'BB',
          children: [
            {
              id: 'BBA',
              children: [{ id: 'BBA0' }]
            }
          ]
        },
        { id: 'A1' },
        { id: 'B0' }
      ]
    }
  ]
}

const after2: Node = {
  id: 'Root',
  children: [
    {
      id: 'A',
      children: [
        {
          id: 'BA',
          children: [{ id: 'BA0' }]
        },
        { id: 'A0' },
        { id: 'A1' },
        { id: 'A2' }
      ]
    },
    {
      id: 'B',
      children: [
        {
          id: 'BB',
          children: [
            {
              id: 'BBA',
              children: [{ id: 'BBA0' }]
            }
          ]
        },
        { id: 'B0' }
      ]
    }
  ]
}

test('move leaf', () => expect(moveNode(baseTree, 'A1', 'B')).toEqual(after1))
test('move branch', () => expect(moveNode(baseTree, 'BA', 'A')).toEqual(after2))
