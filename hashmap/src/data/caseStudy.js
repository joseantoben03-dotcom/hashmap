// Ultra-Clean Story & Gentle Python Data

export const CITIZEN_PRESETS = [
  { key: 'Aarav', value: 'Ration Kit A' },
  { key: 'Priya', value: 'First Aid Pack' },
  { key: 'Kabir', value: 'Baby Care Kit' },
  { key: 'Fatima', value: 'Warm Blanket' },
  { key: 'Ananya', value: 'Water Voucher' }
];

export const COLLISION_CITIZENS = [
  { key: 'Amit', value: 'Emergency Kit A' },
  { key: 'Mita', value: 'Medical Kit B' }
];

export const STORY_STEPS = {
  1: {
    badge: 'Scene 1',
    headline: 'The 10,000-Person Bottleneck',
    storyLine: '10,000 citizens wait in the 42°C sun. Scanning a 1,000-page paper binder page-by-page takes 4 minutes per person.',
    pythonSnippet: `# Linear List Scan: Python checks item by item from start to end
line = ["Rohan", "Fatima", "Kabir", "Priya"]
"Priya" in line  # Up to 10,000 checks!`,
    pythonOutput: `Is Priya in line? True (Scanned 10,000 items)`,
    quiz: {
      question: 'How many items does Python check in the worst case to find a name in a list of 10,000?',
      options: ['10,000 checks', '1 check', '0 checks'],
      correctIndex: 0,
      feedback: 'Correct! Lists require scanning items one by one.'
    }
  },

  2: {
    badge: 'Scene 2',
    headline: 'Don’t Search—Calculate!',
    storyLine: 'Coat checks and postal PINs don’t search—they use a magic formula to jump straight to the exact shelf slot.',
    pythonSnippet: `# Python hash(): turns a name into an exact shelf slot (0-6)
name = "Priya"
shelf = abs(hash(name)) % 7
print(f"{name} -> Shelf #{shelf}")`,
    pythonOutput: `Priya -> Shelf #3 (Calculated in 0.00001s)`,
    quiz: {
      question: 'Why must dictionary keys be immutable (strings/tuples)?',
      options: ['So their calculated shelf number never shifts', 'Because Python dislikes lists', 'To save memory'],
      correctIndex: 0,
      feedback: 'Spot on! Immutable keys guarantee a permanent shelf address.'
    }
  },

  3: {
    badge: 'Scene 3',
    headline: 'The Python Dictionary (`dict`)',
    storyLine: 'Python connects a Name directly to a Kit. `hub["Priya"] = "First Aid"` files packages onto shelves in 0.0001 seconds.',
    pythonSnippet: `hub = {}
hub["Aarav"] = "Ration Kit"
hub["Priya"] = "First Aid"
print(hub["Priya"])`,
    pythonOutput: `Priya's Kit: First Aid (O(1) Instant Lookup)`,
    quiz: {
      question: 'What is Python’s dictionary syntax for key-value pairing?',
      options: ['hub = {"Priya": "First Aid"}', 'hub = ["Priya", "First Aid"]', 'hub = (Priya -> First Aid)'],
      correctIndex: 0,
      feedback: 'Correct! Curly braces {key: value} are Python dict syntax.'
    }
  },

  4: {
    badge: 'Scene 4',
    headline: 'Two People, One Shelf',
    storyLine: 'Amit and Mita both calculate to Shelf #1. Python gracefully keeps both families stored side-by-side as roommates.',
    pythonSnippet: `hub["Amit"] = "Emergency Kit"
hub["Mita"] = "Medical Kit"
print(hub["Amit"], "|", hub["Mita"])`,
    pythonOutput: `Amit: Emergency Kit | Mita: Medical Kit (Zero loss!)`,
    quiz: {
      question: 'What happens when two keys calculate to the same slot?',
      options: ['Python resolves collisions safely; both keys stay', 'The second key deletes the first', 'Python crashes'],
      correctIndex: 0,
      feedback: 'Exactly! Python accommodates both keys seamlessly.'
    }
  },

  5: {
    badge: 'Scene 5',
    headline: 'Safe Inquiries (`.get()`)',
    storyLine: 'Asking for missing names with `hub["Missing"]` causes a `KeyError` crash. `.get()` responds politely without panicking.',
    pythonSnippet: `hub = {"Priya": "First Aid"}
# Safe lookup with default fallback:
status = hub.get("Rohan", "Not registered yet")
print(status)`,
    pythonOutput: `Rohan status: Not registered yet (Safe fallback)`,
    quiz: {
      question: 'What does `hub.get("Rohan", "Missing")` return if Rohan is not registered?',
      options: ['"Missing"', 'KeyError exception', 'None'],
      correctIndex: 0,
      feedback: 'Correct! .get() returns your fallback string safely.'
    }
  },

  6: {
    badge: 'Scene 6',
    headline: 'How Modern Society Runs',
    storyLine: 'UPI payments, Swiggy, Aadhaar, and Instagram use this exact hash map magic millions of times every single second.',
    pythonSnippet: `from collections import defaultdict, Counter
shelters = defaultdict(list)
shelters["Ward 4"].append("Aarav's Family")
print(shelters["Ward 4"])`,
    pythonOutput: `Ward 4 families: ["Aarav's Family"] (Instant scale)`,
    quiz: {
      question: 'What is the primary benefit of `defaultdict`?',
      options: ['Auto-initializes missing keys when accessed', 'Makes code 100x faster', 'Deletes unused keys'],
      correctIndex: 0,
      feedback: 'Spot on! It eliminates boilerplate checks before appending.'
    }
  }
};
