// Case Study & Social Story Data: The Community Hub & The Magic of Hashing

export const STORY_METADATA = {
  title: 'The Endless Line',
  subtitle: 'A human story of chaos, clever social inventions, and the Python dictionary',
  location: 'City Community Relief & Distribution Center',
  protagonist: 'Dev, a first-day volunteer coordinator'
};

export const CITIZEN_PRESETS = [
  { key: 'Aarav', value: 'Ration Kit A', category: 'Family Ration' },
  { key: 'Priya', value: 'First Aid Pack', category: 'Medical' },
  { key: 'Kabir', value: 'Baby Care Kit', category: 'Infant' },
  { key: 'Fatima', value: 'Blanket & Warm Clothes', category: 'Shelter' },
  { key: 'Ananya', value: 'Clean Water Voucher', category: 'Essentials' },
  { key: 'Rohan', value: 'Emergency Radio', category: 'Communication' }
];

export const COLLISION_CITIZENS = [
  { key: 'Amit', value: 'Emergency Kit A', note: 'Char sum: 407 → Shelf 1' },
  { key: 'Mita', value: 'Medical Kit B', note: 'Char sum: 407 → Shelf 1 (Same letters, same shelf!)' }
];

export const STORY_STEPS = {
  1: {
    badge: 'Scene 1 • The Human Dilemma',
    headline: 'The Endless Line in the Summer Sun',
    story: [
      'It is 11 AM outside the city relief center. The temperature has crossed 42°C.',
      'A line of 10,000 citizens stretches down three city blocks. Dev, a nervous new volunteer, is sitting behind a table with a giant 1,000-page paper binder.',
      'When Mrs. Verma reaches the front and gives her name, Dev has to flip page by page, scanning thousands of handwritten names from the top. Every single lookup takes 4 whole minutes. People are fainting in the heat.'
    ],
    quote: {
      speaker: 'Elderly Citizen in Line',
      text: 'Beta, there has to be a smarter way. Why must you read every stranger’s name just to find mine?'
    },
    insight: 'In human society, searching sequentially from the beginning (Linear Scan, O(n)) is disastrous when crowds grow. We desperately need a direct shortcut.'
  },

  2: {
    badge: 'Scene 2 • The Clever Trick',
    headline: 'The Secret of the Coat Check & Postal PINs',
    story: [
      'Dev remembers how a theater coat-check works: when 5,000 people hand over their jackets, the attendant never searches through 5,000 hangers.',
      'Instead, they give you a token number. That number directly tells them which shelf and rack to open instantly.',
      'Even better: Postal PIN codes! A postal clerk doesn’t read 1.4 billion addresses. The PIN code instantly routes the letter to one specific delivery box.'
    ],
    quote: {
      speaker: 'Dev, the Volunteer',
      text: 'What if we turn each person’s name into a shelf number using a simple rule? No searching. Just jump straight to the shelf!'
    },
    insight: 'A hash function is simply a deterministic calculation: it turns a human name into an exact shelf slot.'
  },

  3: {
    badge: 'Scene 3 • Meeting Python',
    headline: 'Enter the Python Dictionary: The Instant Helper',
    story: [
      'Dev pulls out a laptop and opens Python. In Python, there is a built-in superhero designed specifically for this human need: the Dictionary (`dict`).',
      'Instead of a list of names that requires scanning, a Python dictionary lets Dev pair each citizen’s name (the Key) directly with their relief kit (the Value).',
      'With just one line, `hub["Aarav"] = "Ration Kit"`, Python computes the slot and files it instantly.'
    ],
    quote: {
      speaker: 'Dev',
      text: 'Watch this: whether we have 7 families or 7 million families, finding a kit takes the exact same split-second!'
    },
    insight: 'Keys are like unique name tags; values are the packages. Python guarantees instant filing without searching.'
  },

  4: {
    badge: 'Scene 4 • The Social Clash',
    headline: 'Two People, One Shelf: The Polite Roommate Rule',
    story: [
      'Suddenly, Amit arrives, followed immediately by Mita. Both their names are made of the exact same letters (A-M-I-T), so the math puts them on the exact same shelf!',
      'Does Dev throw away Amit’s kit? Of course not! That would be a social disaster.',
      'Instead, the shelf simply makes room for both. In computer science, this is called a collision, and keeping both is called chaining.'
    ],
    quote: {
      speaker: 'Amit & Mita',
      text: 'Our names have the same letters, but we are completely different people!'
    },
    insight: 'Collisions in real life and computers are natural. A well-designed system politely accommodates roommates without losing anything.'
  },

  5: {
    badge: 'Scene 5 • Preventing Panic',
    headline: '“Has My Sister Checked In?”',
    story: [
      'A worried boy runs up to the desk: “Has Priya registered yet? I lost her in the crowd!”',
      'In basic Python code, asking for someone who is not yet in the dictionary (`hub["Priya"]`) can trigger a dreaded `KeyError`—the digital equivalent of a volunteer screaming in panic and dropping the ledger.',
      'Dev uses the polite Python method instead: `hub.get("Priya", "Not yet checked in")`. Calm, safe, and reassuring.'
    ],
    quote: {
      speaker: 'Dev to the Boy',
      text: 'She hasn’t checked in yet, beta. But don’t worry, we won’t panic or crash. We’ll watch out for her.'
    },
    insight: 'Never crash when data is missing. Python’s `.get()` provides a gentle, graceful fallback.'
  },

  6: {
    badge: 'Scene 6 • The Invisible Society',
    headline: 'The Invisible Machinery of the Modern World',
    story: [
      'By the end of the day, 10,000 citizens received their kits with zero waiting in line. The sun sets over a calm, happy center.',
      'Look around your daily life: when you make a UPI payment with Google Pay, book a cab on Uber, verify your Aadhaar, or search a friend on Instagram, you are using this exact social magic.',
      'Python makes running society effortless with tools like `defaultdict` (grouping families by neighborhood) and `Counter` (tracking supplies).'
    ],
    quote: {
      speaker: 'Center Director',
      text: 'You didn’t just write code, Dev. You respected people’s time and dignity.'
    },
    insight: 'Hash maps are not just an academic algorithm; they are the invisible architecture that keeps modern human society moving.'
  }
};

export const PYTHON_GENTLE_LESSONS = {
  1: {
    title: 'The Real World vs. The Slow List',
    concept: 'Why lists make people wait',
    explanation: 'Imagine keeping names in a simple Python list. To find if someone is there, Python has to look at item 0, then item 1, all the way to 10,000.',
    snippet: `# The Slow Way: A list of people in line
waiting_line = ["Rohan", "Fatima", "Kabir", "Priya"]

# Finding "Priya" means checking Rohan, then Fatima, then Kabir...
# In a list of 10,000 people, this takes 10,000 checks!
print("Is Priya in line?", "Priya" in waiting_line)`,
    output: `Is Priya in line? True\n(Checked sequentially from start to end)`,
    oneLinerTitle: 'The Human Revelation:',
    oneLinerNote: 'Lists are great for ordered lines, but terrible for instant lookups.',
    challenge: {
      question: 'If a line has 10,000 people, how many people do you have to check in the worst case to find someone in a standard list?',
      options: ['10,000 people (every single one)', 'Only 1 person', '7 people', 'Zero'],
      correctIndex: 0,
      feedback: 'Exactly! If the person is at the very end (or not there at all), you have to examine all 10,000.'
    }
  },

  2: {
    title: 'Turning a Name into a Shelf Number',
    concept: 'The hash() function & Immutability',
    explanation: 'Python has a built-in `hash()` function. It takes any permanent identity (a string, a number, a tuple) and gives back an integer finger-print.',
    snippet: `# Python turns a name into a giant unique number
name = "Priya"
fingerprint = hash(name)
print(f"Fingerprint of {name}: {fingerprint}")

# Map it to our 7 shelves with modulo (% 7)
shelf_number = abs(fingerprint) % 7
print(f"Assign {name} to Shelf #{shelf_number}")`,
    output: `Fingerprint of Priya: 58291049281920192
Assign Priya to Shelf #3\n(Direct calculation: no searching required!)`,
    oneLinerTitle: 'The Immutability Rule:',
    oneLinerNote: 'A person’s name or token cannot change mid-flight. That is why Python requires dictionary keys to be immutable (strings, numbers, tuples).',
    challenge: {
      question: 'Why can a string like "Aarav" be a dictionary key, but a mutable list like ["Aarav"] cannot?',
      options: [
        'Because strings cannot be accidentally altered, keeping their shelf address permanent.',
        'Because Python dislikes square brackets.',
        'Because strings take up less memory than lists.',
        'Because lists are only for numbers.'
      ],
      correctIndex: 0,
      feedback: 'Spot on! If you could change a key while it was on a shelf, you would never be able to find it again!'
    }
  },

  3: {
    title: 'Meeting the Python Dictionary (dict)',
    concept: 'Key-Value Pairing & Instant Assignment',
    explanation: 'A dictionary connects a Name (the Key) directly to an Item (the Value) using curly braces `{}` or assignment.',
    snippet: `# Dev creates the community hub ledger
relief_hub = {}

# Arriving citizens get their kits stored instantly
relief_hub["Aarav"] = "Ration Kit A"
relief_hub["Priya"] = "First Aid Pack"
relief_hub["Kabir"] = "Baby Care Kit"

print("Who is registered?", list(relief_hub.keys()))
print("Priya's kit:", relief_hub["Priya"])`,
    output: `Who is registered? ['Aarav', 'Priya', 'Kabir']
Priya's kit: First Aid Pack\n(Looked up in 0.00001 seconds!)`,
    oneLinerTitle: 'Updating in Place:',
    oneLinerNote: 'If Aarav upgrades to "Ration Kit B", `relief_hub["Aarav"] = "Ration Kit B"` updates his existing box without creating a messy duplicate.',
    challenge: {
      question: 'What is the syntax to create a dictionary connecting citizen "Dev" with "Volunteer"?',
      options: [
        'staff = {"Dev": "Volunteer"}',
        'staff = ["Dev", "Volunteer"]',
        'staff = ("Dev" -> "Volunteer")',
        'staff = <Dev = Volunteer>'
      ],
      correctIndex: 0,
      feedback: 'Correct! Curly braces with key: value (`{"Dev": "Volunteer"}`) is Python’s iconic dictionary syntax.'
    }
  },

  4: {
    title: 'When Shelves Collide',
    concept: 'How Python handles multiple people in one spot',
    explanation: 'When two different names land on the same shelf, real Python uses a smart internal sequence (Open Addressing) to find the nearest open pocket in memory.',
    snippet: `# In Python, you never have to worry about collisions manually!
relief_hub = {}

# Amit and Mita produce the same hash bucket in our 7-shelf wall
relief_hub["Amit"] = "Emergency Kit"
relief_hub["Mita"] = "Medical Kit"

# Python gracefully stores both without missing a beat
print("Amit gets:", relief_hub["Amit"])
print("Mita gets:", relief_hub["Mita"])
print("Total families safely helped:", len(relief_hub))`,
    output: `Amit gets: Emergency Kit
Mita gets: Medical Kit
Total families safely helped: 2\n(Zero loss. Both families are safe.)`,
    oneLinerTitle: 'Behind the Scenes:',
    oneLinerNote: 'Python automatically expands its memory table whenever it gets 2/3 full, ensuring shelves never get overcrowded.',
    challenge: {
      question: 'What happens in Python when two different keys calculate to the same slot?',
      options: [
        'Python resolves the collision automatically; both keys and values are preserved safely.',
        'The second key overwrites and erases the first key.',
        'Python crashes with a CollisionError.',
        'The computer deletes the entire dictionary.'
      ],
      correctIndex: 0,
      feedback: 'Exactly! Python’s internal collision resolver ensures every unique key is kept safely and separately.'
    }
  },

  5: {
    title: 'The Courteous Lookup: Using .get()',
    concept: 'Preventing KeyError crashes',
    explanation: 'If a citizen has not arrived yet, asking `hub["Stranger"]` throws an ugly `KeyError`. Using `.get()` responds politely and keeps the center running smoothly.',
    snippet: `relief_hub = {"Aarav": "Ration Kit A", "Priya": "First Aid"}

# The risky way: crashes if the name isn't there!
# print(relief_hub["UnknownPerson"]) # -> Crashes with KeyError!

# The courteous Python way: .get(key, friendly_fallback)
inquiry = relief_hub.get("Rohan", "Not registered yet — please register at Desk 1")
print("Rohan inquiry status:", inquiry)

found = relief_hub.get("Priya", "Not found")
print("Priya inquiry status:", found)`,
    output: `Rohan inquiry status: Not registered yet — please register at Desk 1
Priya inquiry status: First Aid\n(Safe and polite. Zero crashes.)`,
    oneLinerTitle: 'Pro-Tip:',
    oneLinerNote: 'Always use `.get()` whenever user input might search for something that isn’t guaranteed to exist.',
    challenge: {
      question: 'What does `relief_hub.get("Sunil", "Pending")` return if "Sunil" has not yet registered?',
      options: [
        '"Pending"',
        'It crashes with a KeyError',
        'None',
        'False'
      ],
      correctIndex: 0,
      feedback: 'Correct! Instead of blowing up, .get() peacefully returns your custom fallback message ("Pending").'
    }
  },

  6: {
    title: 'The Superpowers Running Our World',
    concept: 'defaultdict & Counter for Social Good',
    explanation: 'Python’s standard library gives you superpowers: `defaultdict` automatically groups people into neighborhoods, and `Counter` counts supplies instantly.',
    snippet: `from collections import defaultdict, Counter

# 1. Group families by Neighborhood automatically
shelters = defaultdict(list)
shelters["Ward 4"].append("Aarav's Family")
shelters["Ward 4"].append("Fatima's Family")
shelters["Ward 9"].append("Kabir's Family")

print("Ward 4 families:", shelters["Ward 4"])

# 2. Count required relief kits in 1 line
requests = ["Ration Kit", "Medical", "Ration Kit", "Blanket", "Ration Kit"]
inventory = Counter(requests)
print("Top needed item:", inventory.most_common(1))`,
    output: `Ward 4 families: ["Aarav's Family", "Fatima's Family"]
Top needed item: [('Ration Kit', 3)]\n(Instant social logistics for thousands of people)`,
    oneLinerTitle: 'The Big Picture:',
    oneLinerNote: 'From emergency relief to global networks, hash maps turn impossible human scale into simple, kind, instant connections.',
    challenge: {
      question: 'Why is `collections.defaultdict(list)` so beloved by Python developers?',
      options: [
        'It automatically creates a fresh list when a new key is accessed, so you never have to check `if key not in dict`.',
        'It runs on blockchain.',
        'It makes code look like JavaScript.',
        'It deletes keys that are not used.'
      ],
      correctIndex: 0,
      feedback: 'Spot on! No more tedious checking if a key exists before appending. It is pure Python elegance.'
    }
  }
};
