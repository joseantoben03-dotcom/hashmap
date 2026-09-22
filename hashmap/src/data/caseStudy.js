// Refined Storytelling Data: The Endless Line & The Magic of Hashing

export const STORY_METADATA = {
  title: 'The Endless Line',
  subtitle: 'How a simple social trick and Python dictionaries solve human chaos',
  location: 'City Community Relief Center',
  protagonist: 'Dev (Volunteer Coordinator)'
};

export const CITIZEN_PRESETS = [
  { key: 'Aarav', value: 'Ration Kit A', category: 'Food' },
  { key: 'Priya', value: 'First Aid Pack', category: 'Medical' },
  { key: 'Kabir', value: 'Baby Care Kit', category: 'Infant' },
  { key: 'Fatima', value: 'Warm Blanket', category: 'Shelter' },
  { key: 'Ananya', value: 'Water Voucher', category: 'Water' }
];

export const COLLISION_CITIZENS = [
  { key: 'Amit', value: 'Emergency Kit A', note: 'Hash -> Shelf #1' },
  { key: 'Mita', value: 'Medical Kit B', note: 'Hash -> Shelf #1 (Anagram collision!)' }
];

export const STORY_STEPS = {
  1: {
    badge: 'Scene 1 • The Bottleneck',
    headline: '10,000 People in the Summer Heat',
    microStory: 'Outside the city relief center, a line of 10,000 citizens stretches for blocks. Volunteer Dev sits with a 1,000-page paper binder, scanning name by name from page 1.',
    quote: {
      speaker: 'Elderly Citizen',
      text: 'Beta, why must you read thousands of strangers’ names just to find mine?'
    },
    takeaway: 'Scanning from start to end (O(n) Linear Search) breaks down when crowds grow.'
  },

  2: {
    badge: 'Scene 2 • The Eureka Moment',
    headline: 'Don’t Search—Calculate!',
    microStory: 'Dev remembers coat-checks and postal PIN codes: attendants don’t search 5,000 coats; a ticket number points straight to the right hanger.',
    quote: {
      speaker: 'Dev (Volunteer)',
      text: 'What if a person’s name automatically calculates their shelf number? No searching required!'
    },
    takeaway: 'A hash function turns a name (key) into an exact shelf slot (index).'
  },

  3: {
    badge: 'Scene 3 • Meeting Python',
    headline: 'The Python Dictionary (`dict`)',
    microStory: 'Python built a superhero for this exact need: the `dict`. Connect a Name directly to a Kit with `hub["Aarav"] = "Ration Kit"`. Filing takes 0.0001 seconds.',
    quote: {
      speaker: 'Dev',
      text: 'Whether we have 7 families or 7 million, finding a kit takes the exact same split-second!'
    },
    takeaway: 'Python dictionaries give instant O(1) storage and retrieval by key.'
  },

  4: {
    badge: 'Scene 4 • The Roommates',
    headline: 'Two People, One Shelf',
    microStory: 'Amit and Mita arrive. Both names use the exact same letters (A-M-I-T), so the formula sends both to Shelf #1. Instead of turning anyone away, the shelf holds both.',
    quote: {
      speaker: 'Amit & Mita',
      text: 'Our names have the same letters, but we are separate people!'
    },
    takeaway: 'Collisions are natural. A hash map stores multiple items per slot using chaining.'
  },

  5: {
    badge: 'Scene 5 • Safe Inquiries',
    headline: '“Is My Sister Here Yet?”',
    story: 'A worried boy asks if Priya has checked in. Asking for a missing name with `hub["Priya"]` crashes Python (`KeyError`). Dev uses `hub.get("Priya", "Not yet checked in")` instead.',
    quote: {
      speaker: 'Dev to the Boy',
      text: 'She hasn’t checked in yet, beta. But don’t worry, we won’t panic or crash.'
    },
    takeaway: 'Use `.get()` for safe lookups that gracefully handle missing keys.'
  },

  6: {
    badge: 'Scene 6 • The Big Picture',
    headline: 'How Modern Society Runs',
    microStory: 'By sunset, 10,000 families were served with zero line waiting. This exact hash map trick powers UPI payments, Uber dispatch, Aadhaar, and Instagram every millisecond.',
    quote: {
      speaker: 'Center Director',
      text: 'You didn’t just write code, Dev. You respected people’s time and dignity.'
    },
    takeaway: 'Hash maps are the invisible architecture of modern digital society.'
  }
};

export const PYTHON_GENTLE_LESSONS = {
  1: {
    title: 'The Problem with Lists',
    concept: 'Sequential O(n) scan',
    snippet: `# Scanning a list of 10,000 names takes up to 10,000 checks!
people_line = ["Rohan", "Fatima", "Kabir", "Priya"]

# Python checks index 0, then 1, then 2...
print("Is Priya here?", "Priya" in people_line)`,
    output: `Is Priya here? True\n(Checked sequentially from start to end)`,
    oneLinerNote: 'Lists are great for ordered items, but slow for lookups.',
    challenge: {
      question: 'How many items must Python check in the worst case to find a name in a list of 10,000?',
      options: ['10,000 checks (all of them)', 'Only 1 check', '7 checks'],
      correctIndex: 0,
      feedback: 'Correct! If the name is at the end (or missing), Python scans all 10,000 items.'
    }
  },

  2: {
    title: 'Calculating the Ticket with hash()',
    concept: 'hash() & Immutability',
    snippet: `# Python converts names into unique integers
name = "Priya"
ticket = abs(hash(name)) % 7  # Maps to Shelf #0-#6

print(f"{name} -> Shelf #{ticket}")`,
    output: `Priya -> Shelf #3\n(Direct formula: 0 searches needed!)`,
    oneLinerNote: 'Keys must be permanent (immutable) so their shelf location never shifts.',
    challenge: {
      question: 'Which of these can be used as a Python dictionary key?',
      options: ['"Priya" (immutable string)', '["Priya"] (mutable list)', '{"name": "Priya"} (dict)'],
      correctIndex: 0,
      feedback: 'Spot on! Strings, numbers, and tuples are immutable, making them reliable keys.'
    }
  },

  3: {
    title: 'Python Dictionary Syntax',
    concept: 'Key -> Value Storage',
    snippet: `# Create a dictionary
hub = {}

# File entries by key in O(1) time
hub["Aarav"] = "Ration Kit A"
hub["Priya"] = "First Aid"

print("Priya's Kit:", hub["Priya"])`,
    output: `Priya's Kit: First Aid\n(Retrieved instantly in 0.00001 seconds)`,
    oneLinerNote: 'Setting `hub["Aarav"] = "Kit B"` updates existing keys in place without duplicates.',
    challenge: {
      question: 'What is the correct syntax for a dictionary in Python?',
      options: ['hub = {"Aarav": "Ration Kit"}', 'hub = ["Aarav", "Ration Kit"]', 'hub = ("Aarav" = "Ration Kit")'],
      correctIndex: 0,
      feedback: 'Correct! Curly braces `{key: value}` are Python’s dictionary signature.'
    }
  },

  4: {
    title: 'Handling Collisions',
    concept: 'Multiple keys per slot',
    snippet: `# Python handles slot clashes automatically!
hub = {}

hub["Amit"] = "Emergency Kit"
hub["Mita"] = "Medical Kit"

print("Amit:", hub["Amit"])
print("Mita:", hub["Mita"])`,
    output: `Amit: Emergency Kit\nMita: Medical Kit\n(Both keys preserved safely!)`,
    oneLinerNote: 'Python automatically resizes tables when 2/3 full to keep collisions rare.',
    challenge: {
      question: 'What happens in Python when two keys calculate to the same slot?',
      options: ['Both are stored safely via internal collision resolution', 'The second key deletes the first', 'Python crashes'],
      correctIndex: 0,
      feedback: 'Exactly! Python preserves both keys seamlessly.'
    }
  },

  5: {
    title: 'Safe Lookups with .get()',
    concept: 'Avoiding KeyError',
    snippet: `hub = {"Aarav": "Ration Kit A"}

# Dangerous: hub["Rohan"] crashes with KeyError!
# Safe Pythonic lookup with fallback default:
status = hub.get("Rohan", "Not registered yet")
print("Rohan status:", status)`,
    output: `Rohan status: Not registered yet\n(Clean fallback! Zero crash.)`,
    oneLinerNote: 'Use `.get(key, fallback)` whenever a key might not be in the dictionary.',
    challenge: {
      question: 'What does `hub.get("Rohan", "Missing")` return if "Rohan" is not in `hub`?',
      options: ['"Missing"', 'KeyError exception', 'None'],
      correctIndex: 0,
      feedback: 'Correct! `.get()` safely returns your custom fallback string instead of crashing.'
    }
  },

  6: {
    title: 'Python Superpowers in Society',
    concept: 'defaultdict & Counter',
    snippet: `from collections import defaultdict, Counter

# Group families by neighborhood automatically
shelters = defaultdict(list)
shelters["Ward 4"].append("Aarav's Family")

# Count kit supplies instantly
inventory = Counter(["Ration", "Medical", "Ration"])
print("Top needed:", inventory.most_common(1))`,
    output: `Top needed: [('Ration', 2)]\n(Instant social logistics for thousands)`,
    oneLinerNote: 'Python’s standard library turns massive social scale into simple code.',
    challenge: {
      question: 'What makes `collections.defaultdict` so convenient?',
      options: ['It auto-initializes missing keys when accessed', 'It makes code run 100x faster', 'It deletes unused keys'],
      correctIndex: 0,
      feedback: 'Spot on! It eliminates boilerplate checks before appending to lists or adding counts.'
    }
  }
};
