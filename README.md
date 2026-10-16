# 💼 Job Portal System

A web-based platform that connects job seekers with employers. Candidates can browse and apply for jobs, while employers can post openings and manage applications, all in one place.

Built by a team of 4.

---

## 🚀 Demo

🔗 **Live Demo:** [https://your-demo-link.com](https://your-demo-link.com)

![Job Portal Screenshot](./docs/screenshot.png)

---

## ✨ Features

**For Job Seekers**
- Register, log in, and manage a personal profile
- Search and filter jobs by title, location, category, and salary
- Apply to jobs and track application status
- Save favorite jobs for later

**For Employers**
- Create a company profile
- Post, edit, and delete job listings
- View and manage applicants
- Shortlist or reject candidates

**General**
- Secure authentication and role-based access (Job Seeker / Employer / Admin)
- Responsive design for desktop, tablet, and mobile
- Clean icon system built with custom SVGs

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JWT |
| Icons | Custom SVG icon set |
| Version Control | Git & GitHub |

> Update this table to match the technologies your team actually uses.

---

## 📦 Installing

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later)
- [Git](https://git-scm.com/)
- A running database instance (e.g., MongoDB)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/job-portal-system.git

# 2. Go to the project folder
cd job-portal-system

# 3. Install dependencies
npm install

# 4. Create your environment file
cp .env.example .env
# Then edit .env with your database URL and secret keys

# 5. Start the development server
npm start
```

Open **http://localhost:3000** in your browser.

---

## 🤝 Contributing

Contributions are welcome! Please follow the guidelines below.

### 🐛 Issues

Found a bug or have an idea? Open an issue:

1. Go to the **Issues** tab of this repository.
2. Search to make sure it hasn't already been reported.
3. Click **New Issue** and choose a template (Bug report / Feature request).
4. Include a clear title, steps to reproduce (for bugs), expected vs. actual behavior, and screenshots if helpful.

### 🔀 Pull Requests

1. Fork the repository.
2. Create a branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add: short description"`
4. Push the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request and describe what you changed.

---

### 🎨 How to Add an Icon

Follow these three steps to add a new icon to the project.

#### Step 1: Create the SVG

1. Design your icon at **24 × 24 px** (use the same viewBox for consistency).
2. Use a single color (`currentColor`) so it can be styled with CSS.
3. Optimize the file (e.g., with [SVGO](https://jakearchibald.github.io/svgomg/)) and remove unnecessary attributes.
4. Save it in `assets/icons/` using a lowercase, hyphenated name, for example `briefcase.svg`.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="7" width="20" height="14" rx="2"/>
  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
</svg>
```

#### Step 2: Add the Data to the Icon Data File

Open the icon data file (e.g., `data/icons.json`) and add a new entry with these fields:

| Field | Description |
|-------|-------------|
| `name` | Unique icon name (lowercase, hyphenated) |
| `path` | Path to the SVG file |
| `iTog` | The icon's CSS class/tag used in HTML |
| `link` | Reference or source link (author, license, or docs) |

```json
{
  "name": "briefcase",
  "path": "assets/icons/briefcase.svg",
  "iTog": "i-briefcase",
  "link": "https://example.com/source-or-license"
}
```

#### Step 3: Add the Icon to the CSS

Register the icon in your stylesheet (e.g., `css/icons.css`) so it can be used through its `iTog` class:

```css
.i-briefcase {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: currentColor;
  -webkit-mask: url("../assets/icons/briefcase.svg") no-repeat center / contain;
          mask: url("../assets/icons/briefcase.svg") no-repeat center / contain;
}
```

Use it in HTML:

```html
<i class="i-briefcase"></i>
```

Finally, open a Pull Request with your new icon. 🎉

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 👥 Team

Built with ❤️ by a team of 4. Add your names and GitHub profiles here.
