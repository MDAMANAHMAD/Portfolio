# Md Aman Ahmad | Premium Developer Portfolio

A premium, highly interactive single-page developer portfolio website showcasing full-stack capabilities, academic achievements, and projects. Featuring a sleek dark glassmorphic design system, canvas particle network backgrounds, a retro Unix shell terminal emulator, and a secure PIN-protected credential upload vault.

🚀 **Live Demo:** [portfolio-six-jade-56.vercel.app](https://portfolio-six-jade-56.vercel.app)

---

## 🛠️ Tech Stack & Libraries

*   **Structure:** Semantic HTML5
*   **Styling:** Custom CSS3 (Vanilla Custom Properties, Flexbox, Responsive Grid, Keyframe Animations)
*   **Interactivity:** Vanilla Javascript (ES6+, Intersection Observer, FileReader, Canvas API)
*   **Typography:** Google Fonts (*Outfit*, *Inter*, *Fira Code*)
*   **Icons:** FontAwesome v6.4.0 (loaded via CDN)
*   **Form Routing:** Formspree API Integration (AJAX-driven submission)

---

## ✨ Features

1.  **🌌 Interactive Canvas Particle Network:**
    A math-drawn node background system that drifts randomly, connects node linkages dynamically, and warp-repels when in proximity to the mouse cursor.

2.  **💻 Retro Developer Shell Terminal:**
    A fully operational Unix-themed CLI emulator. Recruits or developers can type commands to query your profile databases.
    *   *Commands:* `help`, `about`, `skills`, `projects`, `experience`, `contact`, `clear`, and `secret` (easter egg).

3.  **🔗 Skill Cross-Highlight Connection:**
    A dynamic relationship matrix. Clicking on any card in the "Technical Expertise" grid highlights the specific projects and internship items where that technology was utilized while dimming the rest.

4.  **🔒 PIN-Protected Credential Upload Vault:**
    An administrative dashboard for verification. You can upload proof documents (PDFs, images) for internships, certifications, and awards directly in the browser:
    *   Protected by security PIN: **`2004`**.
    *   Converts uploads to Base64 data and persists them in the browser's `localStorage`.
    *   Converts stored base64 strings back to sandboxed Blob URLs to render PDFs smoothly in viewer modals.

5.  **✉️ Ajax Contact Integration:**
    Sends messages directly to your email via Formspree without forcing a browser redirect, keeping the user experience seamless.

---

## 💻 Running Locally

Since this project is built using vanilla web standards, you can run it directly:

1.  Clone the repository:
    ```bash
    git clone https://github.com/MDAMANAHMAD/Portfolio.git
    cd Portfolio
    ```
2.  Open `index.html` in any modern web browser, or spin up a local development server:
    *   **Python:** `python -m http.server 8000` (Visit `http://localhost:8000`)
    *   **Node.js:** Install `http-server` globally and run it.

---

## 🎨 UI Mockups

The project includes premium dashboard previews generated for your portfolio:
*   **ChatPilot UI Dashboard Mockup:** Modern dark-theme messaging hub with AI text completions.
*   **WealthUp Stocks Dashboard Mockup:** financial market graphs and portfolio trackers.
*   **Smart Vision Schematic Concept:** Blue-and-orange futuristic IoT wiring chart.
