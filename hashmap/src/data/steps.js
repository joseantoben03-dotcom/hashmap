export const STEPS = [
  {
    id: 1,
    title: 'Case Study: The Registry Bottleneck',
    drawerLabel: 'Problem',
    concept: 'List O(n) vs Dict O(1)',
    pythonTopic: 'dict creation & key-value syntax'
  },
  {
    id: 2,
    title: 'The Hash Dispatcher & Immutability',
    drawerLabel: 'Hashing',
    concept: 'Hash function & bucket mapping',
    pythonTopic: 'hash(), __hash__, & unhashable types'
  },
  {
    id: 3,
    title: 'Enrolling Courses (Filing Entries)',
    drawerLabel: 'Enrollment',
    concept: 'Insertion & in-place updates',
    pythonTopic: 'dict[key] = val, .update(), "in" keyword'
  },
  {
    id: 4,
    title: 'Collision Chaos & Resolution',
    drawerLabel: 'Collisions',
    concept: 'Collisions & chaining mechanisms',
    pythonTopic: 'Python open addressing & load factor'
  },
  {
    id: 5,
    title: 'Querying & Dropping Courses',
    drawerLabel: 'Lookup & Drop',
    concept: 'Chain traversal & node deletion',
    pythonTopic: 'dict.get(), handling KeyError, del & pop()'
  },
  {
    id: 6,
    title: 'Production Scale & Python Superpowers',
    drawerLabel: 'Superpowers',
    concept: 'Big-O complexity & memory tradeoffs',
    pythonTopic: 'defaultdict, Counter, dict comprehensions'
  }
];

export const TOTAL_STEPS = STEPS.length;
