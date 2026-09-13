export interface StepMeta {
  id: number;
  title: string;
  drawerLabel: string;
}

export const STEPS: StepMeta[] = [
  { id: 1, title: 'What is a hashmap?', drawerLabel: 'Intro' },
  { id: 2, title: 'The hash function', drawerLabel: 'Hashing' },
  { id: 3, title: 'Filing entries', drawerLabel: 'Insertion' },
  { id: 4, title: 'Collisions & chaining', drawerLabel: 'Collisions' },
  { id: 5, title: 'Lookup & delete', drawerLabel: 'Lookup' },
  { id: 6, title: 'Complexity & recap', drawerLabel: 'Recap' }
];

export const TOTAL_STEPS = STEPS.length;
