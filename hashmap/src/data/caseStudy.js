// Rich Character-Driven Storytelling Data

export const CHARACTERS = {
  dev: { name: 'Dev', role: 'Volunteer Coordinator', avatar: '🧑‍💼' },
  shastri: { name: 'Uncle Shastri', role: 'Elderly Resident (Age 72)', avatar: '👴' },
  priya: { name: 'Priya', role: 'Young Mother', avatar: '👩‍🦱' },
  amitMita: { name: 'Amit & Mita', role: 'Arriving Relatives', avatar: '👨‍👩‍👧' },
  chintu: { name: 'Little Chintu', role: 'Lost Brother', avatar: '🧒' },
  city: { name: 'The City at Sunset', role: 'Modern Digital Society', avatar: '🌆' }
};

export const CITIZEN_PRESETS = [
  { key: 'Priya', value: 'First Aid Pack', category: 'Medical' },
  { key: 'Aarav', value: 'Ration Kit A', category: 'Food' },
  { key: 'Kabir', value: 'Baby Care Kit', category: 'Infant' },
  { key: 'Fatima', value: 'Warm Blanket', category: 'Shelter' },
  { key: 'Ananya', value: 'Water Voucher', category: 'Water' }
];

export const COLLISION_CITIZENS = [
  { key: 'Amit', value: 'Emergency Kit A' },
  { key: 'Mita', value: 'Medical Kit B' }
];

export const STORY_STEPS = {
  1: {
    badge: 'Act I • The Crisis',
    character: CHARACTERS.shastri,
    headline: 'The Endless Line in the Heat',
    dialogue: '“Beta Dev, I’ve been standing in this 42°C sun for 2 hours. Why must you read thousands of strangers’ names in your paper binder just to find mine?”',
    narrative: 'Dev is frantically flipping page-by-page through a 1,000-page paper ledger. Every lookup takes 4 whole minutes. Scanning sequentially (O(n)) is crushing the crowd.',
    pythonSnippet: `# The Slow Way: Scanning a list item by item
line = ["Rohan", "Fatima", "Shastri", "Priya"]
"Shastri" in line  # Up to 10,000 checks!`,
    pythonOutput: `Found Uncle Shastri! (Scanned 10,000 pages — Took 4 minutes)`,
    quiz: {
      question: 'Why does scanning a paper binder (or a Python list) slow down as the crowd grows?',
      options: ['Because searching sequentially requires checking items one by one from page 1', 'Because computer screens get hot', 'Because lists can only hold 10 items'],
      correctIndex: 0,
      feedback: 'Exactly! Searching a list requires O(n) checks, which fails when scale increases.'
    }
  },

  2: {
    badge: 'Act II • The Eureka Moment',
    character: CHARACTERS.dev,
    headline: 'The Secret of the Coat Check',
    dialogue: '“A theater coat-check attendant never searches 5,000 hangers! A coat ticket number takes them straight to the exact hanger. What if we calculate a ticket for each name?”',
    narrative: 'Dev turns each citizen’s name into a ticket using a simple math rule (hash function). No searching required—just jump straight to the shelf!',
    pythonSnippet: `# Python hash(): calculates an exact shelf slot (0-6)
name = "Priya"
shelf = abs(hash(name)) % 7
print(f"{name} -> Shelf #{shelf}")`,
    pythonOutput: `Priya -> Shelf #3 (Calculated in 0.00001 seconds!)`,
    quiz: {
      question: 'Why must dictionary keys in Python be permanent/immutable (strings, tuples)?',
      options: ['So their calculated shelf address never shifts position', 'Because Python dislikes lists', 'To make files smaller'],
      correctIndex: 0,
      feedback: 'Spot on! Immutable keys guarantee a permanent, unchanging shelf slot.'
    }
  },

  3: {
    badge: 'Act III • The Python Tool',
    character: CHARACTERS.priya,
    headline: 'Meeting the Python Dictionary (`dict`)',
    dialogue: '“I need a First Aid kit for my daughter. Can you store my record without keeping me waiting in line?”',
    narrative: 'Dev opens Python. The `dict` connects a Name directly to a Kit (`hub["Priya"] = "First Aid"`). Filing and retrieving take a split second.',
    pythonSnippet: `hub = {}
hub["Aarav"] = "Ration Kit A"
hub["Priya"] = "First Aid"
print("Priya's Kit:", hub["Priya"])`,
    pythonOutput: `Priya's Kit: First Aid (O(1) Direct Access!)`,
    quiz: {
      question: 'What happens when you run `hub["Priya"] = "Upgraded Kit"` if Priya is already registered?',
      options: ['It updates Priya’s existing shelf value without adding a duplicate key', 'It creates a second Priya entry', 'It throws an error'],
      correctIndex: 0,
      feedback: 'Correct! Dictionary keys are unique, so re-assigning updates the value in place.'
    }
  },

  4: {
    badge: 'Act IV • The Roommates',
    character: CHARACTERS.amitMita,
    headline: 'Two Families, One Shelf',
    dialogue: '“Our names have the exact same letters (A-M-I-T & M-I-T-A)! The formula sent us both to Shelf #1. Will one of us be turned away?”',
    narrative: 'Dev smiles and makes room for both on Shelf #1. In Python, slot clashes (collisions) are natural, and keeping both safely is called separate chaining.',
    pythonSnippet: `hub["Amit"] = "Emergency Kit"
hub["Mita"] = "Medical Kit"
print("Shelf #1:", hub["Amit"], "&", hub["Mita"])`,
    pythonOutput: `Shelf #1: Emergency Kit & Medical Kit (Zero loss!)`,
    quiz: {
      question: 'How does Python handle two keys that calculate to the same slot?',
      options: ['Python resolves collisions safely; both keys stay stored', 'The second key overwrites the first', 'The program crashes'],
      correctIndex: 0,
      feedback: 'Exactly! Python accommodates both keys seamlessly.'
    }
  },

  5: {
    badge: 'Act V • The Reassuring Inquiry',
    character: CHARACTERS.chintu,
    headline: '“Is My Sister Here Yet?”',
    dialogue: '“Bhaiya, I lost my sister Priya in the crowd! Has she registered at Desk 4 yet?”',
    narrative: 'If Dev searches `hub["Rohan"]` for a missing name, basic Python crashes with a terrifying `KeyError`. Dev uses `hub.get("Rohan", "Not registered yet")` to answer calmly.',
    pythonSnippet: `hub = {"Priya": "First Aid"}
# Safe lookup with polite default:
status = hub.get("Rohan", "Not registered yet — check Desk 1")
print("Rohan:", status)`,
    pythonOutput: `Rohan: Not registered yet — check Desk 1 (Safe fallback!)`,
    quiz: {
      question: 'Why should you use `.get(key, default)` instead of `dict[key]` when looking up unknown user input?',
      options: ['To safely return a default message instead of crashing with a KeyError', 'To delete the key', 'To sort the dictionary'],
      correctIndex: 0,
      feedback: 'Correct! .get() gracefully prevents application crashes when keys are missing.'
    }
  },

  6: {
    badge: 'Act VI • The Invisible City',
    character: CHARACTERS.city,
    headline: 'How Modern Society Runs',
    dialogue: '“10,000 citizens served with zero line waiting. Every millisecond, millions of humans connect through this exact hash map magic.”',
    narrative: 'Dev looks out at the sunset. UPI payments (GPay/PhonePe), Uber driver dispatch, Aadhaar ID verification, and WhatsApp chats all use hash maps to make society instant and kind.',
    pythonSnippet: `from collections import defaultdict, Counter
shelters = defaultdict(list)
shelters["Ward 4"].append("Aarav's Family")
print(dict(shelters))`,
    pythonOutput: `{'Ward 4': ["Aarav's Family"]} (Instant Social Logistics)`,
    quiz: {
      question: 'What makes `collections.defaultdict` so powerful in Python applications?',
      options: ['It automatically initializes missing keys (like creating empty lists) when accessed', 'It makes code run on GPU', 'It encrypts data'],
      correctIndex: 0,
      feedback: 'Spot on! defaultdict eliminates tedious checks before appending to lists or adding counters.'
    }
  }
};
