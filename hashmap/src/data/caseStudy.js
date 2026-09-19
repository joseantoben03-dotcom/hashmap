// Case Study Data & Python Learning Modules
// Scenario: IIT Ropar High-Speed Campus Directory & Course Registry

export const CASE_STUDY_METADATA = {
  institution: 'IIT Ropar',
  systemName: 'Campus Course & Student Registry',
  scenarioTitle: 'Case Study: Engineering an O(1) Campus Registry',
  subtitle: 'Mastering Python Dictionaries under the hood through real-world system design'
};

export const COURSE_PRESETS = [
  { key: 'CS101', value: 'Intro to AI (4 Cr)', dept: 'CSE' },
  { key: 'EE201', value: 'Signals & Systems (3 Cr)', dept: 'EE' },
  { key: 'ME205', value: 'Fluid Mechanics (4 Cr)', dept: 'ME' },
  { key: 'MA101', value: 'Linear Algebra (4 Cr)', dept: 'MATH' },
  { key: 'HS301', value: 'Tech Ethics (2 Cr)', dept: 'HSS' },
  { key: 'PH102', value: 'Modern Physics (3 Cr)', dept: 'PHYS' }
];

export const COLLISION_COURSES = [
  { key: 'CS101', value: 'Intro to AI (4 Cr)', note: 'Sum: 296, Bucket: 2' },
  { key: 'CS011', value: 'Comp Architecture (3 Cr)', note: 'Sum: 296, Bucket: 2 (Anagram code collision)' }
];

export const PYTHON_STEP_CONTENT = {
  1: {
    tag: 'Python Syntax: Dictionaries vs Lists',
    title: 'Why Python Dictionaries Exist',
    explanation: `In Python, storing data in a list requires sequential scanning (O(n) time). With 5,000 courses, searching for a course means iterating through every single element.

A Python **dict** solves this using key-value pairs with instant O(1) lookup.`,
    pythonCode: `# 1. The Slow List Approach (O(n) search)
courses_list = [
    ("CS101", "Intro to AI"),
    ("EE201", "Signals & Systems"),
    ("ME205", "Fluid Mechanics")
]
# To find CS101, Python checks index 0, then index 1...

# 2. The Fast Dictionary Approach (O(1) lookup)
courses_dict = {
    "CS101": "Intro to AI",
    "EE201": "Signals & Systems",
    "ME205": "Fluid Mechanics"
}
print(courses_dict["CS101"])  # Instant direct lookup!`,
    sampleOutput: `Intro to AI
[O(1) lookup completed in ~0.00002s vs O(n) list scan]`,
    challenge: {
      question: 'Which of the following creates a valid empty dictionary in Python?',
      options: [
        'd = {} or d = dict()',
        'd = [] or d = list()',
        'd = () or d = tuple()',
        'd = set()'
      ],
      correctIndex: 0,
      feedback: 'Correct! Both {} and dict() initialize an empty dictionary in Python.'
    }
  },

  2: {
    tag: 'Python Internals: hash() & Immutability',
    title: 'The hash() Function & The Immutability Rule',
    explanation: `Python uses its built-in \`hash()\` function to map keys into integer hashes.

CRITICAL RULE: In Python, **only immutable objects can be dictionary keys!**
- Strings, integers, floats, and tuples are immutable (hashable).
- Lists and dictionaries are mutable, so they CANNOT be keys.`,
    pythonCode: `# Python's built-in hash() function
print(f"hash('CS101') = {hash('CS101')}")

# Valid key: Tuple (immutable)
course_coord = ("Lecture Hall 1", 9)
schedule = {course_coord: "CS101"}
print("Tuple key works:", schedule[course_coord])

# INVALID: Using a list as a key throws TypeError!
try:
    bad_dict = {["CS", 101]: "Intro to AI"}
except TypeError as err:
    print(f"Error caught: {err}")`,
    sampleOutput: `hash('CS101') = 7482910485918239012
Tuple key works: CS101
Error caught: unhashable type: 'list'`,
    challenge: {
      question: 'Which of the following can be used as a key in a Python dictionary?',
      options: [
        '("CS", 101) — a tuple of immutable items',
        '["CS", 101] — a list',
        '{"code": "CS101"} — another dictionary',
        '{"CS101"} — a set'
      ],
      correctIndex: 0,
      feedback: 'Spot on! Tuples containing immutable elements are hashable, whereas lists, dicts, and sets are mutable and unhashable.'
    }
  },

  3: {
    tag: 'Python Operations: Insertion & Updates',
    title: 'Inserting & Updating Records in Python',
    explanation: `When you assign \`dict[key] = value\`:
1. If the key is new, Python computes its hash and allocates a slot.
2. If the key already exists, Python **overwrites** the existing value in-place without duplicating the key.
3. You can check existence in O(1) time using the \`in\` operator.`,
    pythonCode: `registry = {}

# Enrolling courses (Insertion)
registry["CS101"] = "Intro to AI (4 Cr)"
registry["EE201"] = "Signals & Systems (3 Cr)"

# Checking membership in O(1) time
print("Is CS101 offered?", "CS101" in registry)

# Updating an existing course (replaces value)
registry["CS101"] = "Intro to AI & ML (4 Cr)"
print("Updated CS101:", registry["CS101"])

# Bulk insert/update with .update()
registry.update({"ME205": "Fluid Mech", "MA101": "Calculus"})
print(f"Total courses enrolled: {len(registry)}")`,
    sampleOutput: `Is CS101 offered? True
Updated CS101: Intro to AI & ML (4 Cr)
Total courses enrolled: 4`,
    challenge: {
      question: 'What happens if you run `registry["CS101"] = "New Title"` when "CS101" is already in `registry`?',
      options: [
        'It updates the value for "CS101" without adding a duplicate key.',
        'It raises a KeyAlreadyExistsError.',
        'It appends a duplicate "CS101" entry.',
        'It deletes the previous key entirely.'
      ],
      correctIndex: 0,
      feedback: 'Exactly! Dictionary keys are unique. Re-assigning to an existing key overwrites its associated value.'
    }
  },

  4: {
    tag: 'Python Architecture: How Python Handles Collisions',
    title: 'Collisions: Separate Chaining vs Python Open Addressing',
    explanation: `When two keys produce the same bucket index (like "CS101" and "CS011"), a collision occurs.

- In our visual model, we use **Separate Chaining** (linked cards in each drawer).
- In real Python (CPython), Python uses **Open Addressing with Perturbation**:
  All entries live in a contiguous array. When a collision occurs, Python calculates a pseudo-random probe sequence to find the next open slot.
- Python maintains a **Load Factor** (entries / capacity). When the table is ~66% full, Python automatically doubles the table size to prevent collisions from slowing down lookups.`,
    pythonCode: `# Simulating collision behavior in Python
# Even when two strings have the same modulo index,
# Python's dict resolves it seamlessly:

portal = {}
portal["CS101"] = "Artificial Intelligence"
portal["CS011"] = "Computer Architecture"

# Both keys remain completely distinct and accessible in O(1)
print("CS101:", portal["CS101"])
print("CS011:", portal["CS011"])
print("Stored keys:", list(portal.keys()))`,
    sampleOutput: `CS101: Artificial Intelligence
CS011: Computer Architecture
Stored keys: ['CS101', 'CS011']
[CPython resolved slot clash internally via probe sequence]`,
    challenge: {
      question: 'Why does Python resize its dictionary table when it is approximately 2/3 full?',
      options: [
        'To keep the load factor low and guarantee average O(1) lookup times.',
        'Because Python lists run out of memory at 66%.',
        'To re-sort keys in alphabetical order.',
        'Because Python only supports up to 64 items per dictionary.'
      ],
      correctIndex: 0,
      feedback: 'Correct! Keeping the load factor below ~66% ensures collisions stay rare, maintaining blazing fast O(1) operations.'
    }
  },

  5: {
    tag: 'Python Best Practices: Safe Lookups & Deletion',
    title: 'Avoiding KeyError: get(), del, & pop()',
    explanation: `Accessing a missing key with bracket notation \`dict[key]\` throws a **KeyError**, crashing your script!

Python gives you safe, idiomatic alternatives:
- \`dict.get(key, default)\`: Returns the default fallback value if key is not found.
- \`del dict[key]\`: Deletes the key (raises KeyError if missing).
- \`dict.pop(key, default)\`: Safely removes the key and returns its value.`,
    pythonCode: `registry = {"CS101": "Intro to AI", "EE201": "Signals"}

# 1. Dangerous Lookup (causes crash if missing)
try:
    print(registry["CS999"])
except KeyError as e:
    print(f"KeyError caught: {e} does not exist!")

# 2. Pythonic Safe Lookup with .get()
result = registry.get("CS999", "Course not found in IIT Ropar catalog")
print("Safe get result:", result)

# 3. Safe Deletion with .pop()
dropped = registry.pop("EE201", None)
print(f"Dropped course: {dropped}")
print("Remaining courses:", registry)`,
    sampleOutput: `KeyError caught: 'CS999' does not exist!
Safe get result: Course not found in IIT Ropar catalog
Dropped course: Signals
Remaining courses: {'CS101': 'Intro to AI'}`,
    challenge: {
      question: 'What is returned by `courses.get("BIO101", "Not Offered")` if "BIO101" is NOT in `courses`?',
      options: [
        '"Not Offered"',
        'Raises a KeyError exception',
        'None',
        'False'
      ],
      correctIndex: 0,
      feedback: 'Correct! .get() returns the fallback default value ("Not Offered") instead of raising a KeyError.'
    }
  },

  6: {
    tag: 'Advanced Python: Superpowers & Big-O',
    title: 'Production Superpowers: defaultdict, Counter & Comprehensions',
    explanation: `Python provides specialized dictionary subclasses in the standard library \`collections\` module that elevate your code:

- **defaultdict**: Never worry about initializing nested lists or counters.
- **Counter**: Instant frequency counting.
- **Dict Comprehensions**: Elegant, readable transformations.`,
    pythonCode: `from collections import defaultdict, Counter

# 1. Grouping enrollments with defaultdict
departments = defaultdict(list)
enrollments = [("CSE", "CS101"), ("CSE", "CS201"), ("EE", "EE201")]

for dept, code in enrollments:
    departments[dept].append(code)  # No need to check if key exists!

print("Departments:", dict(departments))

# 2. Counting department course loads with Counter
dept_counts = Counter(["CSE", "CSE", "EE", "ME", "CSE"])
print("Most popular department:", dept_counts.most_common(1))

# 3. Dict Comprehension: Uppercasing course codes
codes = ["cs101", "ee201", "me205"]
upper_map = {c.upper(): f"Course {c.upper()}" for c in codes}
print("Comprehension result:", upper_map)`,
    sampleOutput: `Departments: {'CSE': ['CS101', 'CS201'], 'EE': ['EE201']}
Most popular department: [('CSE', 3)]
Comprehension result: {'CS101': 'Course CS101', 'EE201': 'Course EE201', 'ME205': 'Course ME205'}`,
    challenge: {
      question: 'What is the primary benefit of collections.defaultdict over a standard dict?',
      options: [
        'It automatically provides a default value for nonexistent keys when accessed, eliminating manual existence checks.',
        'It makes lookups O(0.5) instead of O(1).',
        'It allows mutable objects to be used as keys.',
        'It automatically saves records to a SQLite database.'
      ],
      correctIndex: 0,
      feedback: 'Spot on! defaultdict provides a callable factory (like list, int, or set) that initializes missing keys automatically.'
    }
  }
};
