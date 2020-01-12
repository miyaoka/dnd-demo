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

test('Move leaf', () => expect(moveNode(baseTree, 'A1', 'B')).toEqual(after1))
test('Move branch', () => expect(moveNode(baseTree, 'BA', 'A')).toEqual(after2))
test('Move to self', () =>
  expect(() => moveNode(baseTree, 'A1', 'A1')).toThrow(
    "Can't move to self or self children."
  ))
test('Move to self children', () =>
  expect(() => moveNode(baseTree, 'B', 'BBA')).toThrow(
    "Can't move to self or self children."
  ))
test('Select non-exist node(from)', () =>
  expect(() => moveNode(baseTree, 'A1', 'nonExistNode')).toThrow(
    "'nonExistNode' is not exist."
  ))
test('Select non-exist node(to)', () =>
  expect(() => moveNode(baseTree, 'nonExistNode', 'B')).toThrow(
    "'nonExistNode' is not exist."
  ))
test('Move root node', () =>
  expect(() => moveNode(baseTree, 'Root', 'B')).toThrow(
    "Can't move the root node."
  ))
