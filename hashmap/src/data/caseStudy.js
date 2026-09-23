// 5th-Grade Story Dataset: The Magic Lunchbox Locker

export const LUNCHBOX_PRESETS = [
  { key: 'Timmy', value: '🍕 Pizza Box' },
  { key: 'Aarav', value: '🍜 Noodles' },
  { key: 'Priya', value: '🥪 Sandwich' },
  { key: 'Bella', value: '🍔 Burger & Fries' },
  { key: 'Kavya', value: '🍎 Apple & Juice' }
];

export const COLLISION_PRESETS = [
  { key: 'Timmy', value: '🍕 Pizza Box' },
  { key: 'Tina', value: '🌮 Tacos' }
];

export const STORY_STEPS = {
  1: {
    badge: 'Act 1 • The Messy Pile',
    title: 'The Messy Lunch Box Floor',
    headline: '1,000 lunchboxes thrown in one giant pile!',
    storyLine: 'Every morning, 1,000 kids dump their lunchboxes in a huge messy pile on the gym floor. At lunchtime, Timmy has to search through all 1,000 boxes one by one. By the time he finds his lunch, lunch break is OVER! 😢',
    pythonSnippet: `# The Slow Way: A List of 1,000 lunchboxes
lunch_pile = ["Aarav", "Bella", ..., "Timmy"]

# Searching one-by-one takes up to 1,000 checks!
"Timmy" in lunch_pile  # Slow O(n) scan`,
    pythonOutput: `Found Timmy's lunchbox! (Scanned 1,000 boxes — Took all lunch period!)`,
    quiz: {
      question: 'Why does searching a messy pile (a Python list) take so long when there are 1,000 items?',
      options: ['Because you have to check items one by one from the start', 'Because lunchboxes are heavy', 'Because lists only hold 5 items'],
      correctIndex: 0,
      feedback: 'Correct! Searching a list requires checking items one by one (Linear Search).'
    }
  },

  2: {
    badge: 'Act 2 • The Magic Rule',
    title: 'The Magic Secret Formula',
    headline: 'Don’t search the pile—use the Magic Locker rule!',
    storyLine: 'The Principal installs 7 Magic Lockers (numbered 0 to 6) and makes a rule: Look at your name. Your first letter gives you your magic locker number automatically! Timmy doesn’t touch the pile—he walks straight to Locker #5! 🚀',
    pythonSnippet: `# The Hash Function: Turn a Name into a Locker Number (0-6)
name = "Timmy"
locker_num = abs(hash(name)) % 7
print(f"{name} -> Magic Locker #{locker_num}")`,
    pythonOutput: `Timmy -> Magic Locker #5 (Calculated in 0.00001 seconds!)`,
    quiz: {
      question: 'How does a Hash Map find your lunchbox so fast?',
      options: ['It uses a formula to calculate your exact locker number instantly', 'It hires 100 fast robots to search', 'It guesses randomly'],
      correctIndex: 0,
      feedback: 'Spot on! The hash function calculates the exact slot address immediately.'
    }
  },

  3: {
    badge: 'Act 3 • Meeting Python',
    title: 'The Python Dictionary (`dict`)',
    headline: 'Python connects a Name directly to a Lunchbox!',
    storyLine: 'In Python, we write this magic locker system as a Dictionary (`dict`). `lockers["Timmy"] = "Pizza Box"` drops Timmy’s pizza into Locker #5 in a split second.',
    pythonSnippet: `# Create Python Lockers (Dictionary)
lockers = {}

# File lunchboxes by name in O(1) instant time!
lockers["Timmy"] = "🍕 Pizza Box"
lockers["Aarav"] = "🍜 Noodles"

print("Timmy's Lunch:", lockers["Timmy"])`,
    pythonOutput: `Timmy's Lunch: 🍕 Pizza Box (O(1) Instant Grab!)`,
    quiz: {
      question: 'What is Python’s dictionary syntax for storing key-value pairs?',
      options: ['lockers = {"Timmy": "Pizza Box"}', 'lockers = ["Timmy", "Pizza Box"]', 'lockers = (Timmy = Pizza)'],
      correctIndex: 0,
      feedback: 'Correct! Curly braces {key: value} are Python dictionary syntax.'
    }
  },

  4: {
    badge: 'Act 4 • Locker Roommates',
    title: 'Two Kids, One Locker',
    headline: 'Timmy & Tina both calculate to Locker #5!',
    storyLine: 'Uh oh! Both Timmy and Tina start with T, so the magic formula sends both to Locker #5. Does the locker throw Tina’s tacos away? No! Locker #5 holds both boxes side-by-side as roommates! 🌮🍕',
    pythonSnippet: `# Python handles collisions automatically!
lockers["Timmy"] = "🍕 Pizza Box"
lockers["Tina"] = "🌮 Tacos"

print("Locker #5 contents:", lockers["Timmy"], "&", lockers["Tina"])`,
    pythonOutput: `Locker #5 contents: 🍕 Pizza Box & 🌮 Tacos (Both saved!)`,
    quiz: {
      question: 'What happens when two names calculate to the same locker number?',
      options: ['Python stores both items safely side-by-side (Collision handling)', 'The second item erases the first', 'The computer explodes'],
      correctIndex: 0,
      feedback: 'Exactly! Python accommodates both items safely.'
    }
  },

  5: {
    badge: 'Act 5 • Safe Inquiries',
    headline: '“Is Sam’s Lunch Here Today?”',
    title: 'Checking Missing Lunch Without Crashing',
    storyLine: 'If a teacher asks `lockers["Sam"]` for an absent student, basic Python freaks out and crashes (`KeyError`). Using `lockers.get("Sam", "No lunch brought")` answers politely without blowing up the school!',
    pythonSnippet: `lockers = {"Timmy": "🍕 Pizza Box"}

# Safe lookup with polite default:
status = lockers.get("Sam", "No lunch brought today")
print("Sam status:", status)`,
    pythonOutput: `Sam status: No lunch brought today (Safe & polite fallback)`,
    quiz: {
      question: 'Why should you use `.get(key, default)` when looking up a key that might be missing?',
      options: ['It returns a friendly default string instead of crashing with a KeyError', 'It deletes the locker', 'It orders new pizza'],
      correctIndex: 0,
      feedback: 'Correct! .get() gracefully prevents app crashes.'
    }
  },

  6: {
    badge: 'Act 6 • Magic in Real Life',
    title: 'How Roblox, Fortnite & YouTube Work',
    headline: 'The invisible magic running the world!',
    storyLine: 'By lunchtime, all 1,000 kids grabbed their lunch in 1 second flat! This exact Magic Locker trick is what Roblox, Fortnite, YouTube, and Google Pay use millions of times every single second to load your profile, V-Bucks, and videos instantly!',
    pythonSnippet: `from collections import defaultdict, Counter

# Group lunchboxes by class automatically
classes = defaultdict(list)
classes["5th Grade"].append("Timmy")

print("5th Grade list:", dict(classes))`,
    pythonOutput: `{'5th Grade': ['Timmy']} (Instant high-speed scale)`,
    quiz: {
      question: 'How do video games like Roblox load millions of player profiles so fast?',
      options: ['They use Hash Maps / Dictionaries for instant O(1) lookups', 'They search players one by one', 'They guess randomly'],
      correctIndex: 0,
      feedback: 'Spot on! Hash maps power every major digital app on Earth.'
    }
  }
};
