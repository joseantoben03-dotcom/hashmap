# The Endless Line: A Human Story of Hashing & Python

An interactive, story-driven educational experience that explores **how Hash Maps work under the hood** through a real-world social scenario, while **gently introducing Python programming and dictionary internals**.

---

## The Story: The Endless Line

Outside a bustling city relief and community distribution center on a 42°C summer afternoon, 10,000 citizens wait in line. Dev, a first-day volunteer coordinator, sits with a 1,000-page paper binder. Searching sequentially from page 1 takes 4 minutes per family ($O(n)$ linear scan), and citizens are fainting in the heat.

Dev realizes human society already invented solutions for this:
1. **The Coat-Check Token & Postal PIN code**: Turning a name into an exact shelf slot without searching ($O(1)$).
2. **The Python Dictionary (`dict`)**: Storing records as key-value pairs (`hub["Aarav"] = "Ration Kit A"`).
3. **The Roommate Rule (Collisions)**: Accommodating multiple people when calculations clash (Amit & Mita).
4. **Courteous Inquiries**: Avoiding system crashes (`KeyError`) using `.get()`.
5. **The Invisible Machinery**: How UPI payments (GPay/PhonePe), food delivery (Zomato/Swiggy), Aadhaar, and WhatsApp run on hash maps every second.

---

## Features

- **Side-by-Side Workbench**:
  - **Left Pane (The Social Journey)**: Interactive narrative vignettes, citizen dialogue quotes, sequential search bottleneck simulator, and visual relief shelves (`BucketWall`).
  - **Right Pane (Gentle Python Companion)**:
    - **Try in Python**: Bite-sized, editable Python snippets with instant output.
    - **Why Python Does This**: Everyday parallels explaining data structure decisions.
    - **Quick Check**: Encouraging concept checks with immediate feedback.
- **Offline-First Persistence**: Progress is saved immediately in `localStorage` and syncs with the Express + MongoDB backend when available.

---

## Running Locally

### Frontend (`hashmap`)

```bash
cd hashmap
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Backend (`backend`) — Optional

```bash
cd backend
npm install
npm run dev
```
