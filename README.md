# My Portfolio

A personal portfolio site for showing off coding projects. Plain HTML, CSS and JavaScript — no build step.

## Files

| File | What it's for |
|---|---|
| `index.html` | Page structure and text (your name, bio, contact links) |
| `styles.css` | Colors, layout, dark mode |
| `script.js` | Filters, dark-mode toggle, project popup |
| `projects.js` | **Your project list and skills — this is the file you edit most** |
| `images/` | (create it) screenshots of your projects |

## Personalize it

1. In `index.html`, search for `Your Name`, `YN`, `you@example.com` and `kasra122` and replace them.
2. Rewrite the "About me" paragraphs.
3. Edit `SKILLS` in `projects.js`.

## Add a project

Open `projects.js`, copy a `{ ... }` block, paste it at the top of `PROJECTS`, and fill it in.
For a screenshot, put the image in an `images/` folder and set `image: "images/my-project.png"`.

---

## Publish it online (free) with GitHub Pages

### One-time setup
1. Create a free account at https://github.com.
2. Install Git: https://git-scm.com/download/win (keep all default options).
3. Tell Git who you are (run in a terminal):
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "the-email-you-used-on-github"
   ```

### Create the repository
1. On GitHub, click **+ → New repository**.
2. Name it **`kasra122.github.io`** (exactly your username). This gives you the address `https://kasra122.github.io`.
3. Set it to **Public**, leave everything else unticked, click **Create repository**.

### Upload the site
In a terminal inside this folder:
```bash
git init
git add .
git commit -m "First version of my portfolio"
git branch -M main
git remote add origin https://github.com/kasra122/kasra122.github.io.git
git push -u origin main
```
(The first push opens a browser window to sign in to GitHub.)

### Turn on Pages
1. In the repo on GitHub: **Settings → Pages**.
2. Under **Source** choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
3. Wait 1–2 minutes, then open `https://kasra122.github.io`. 🎉

### Updating later
Every time you change something:
```bash
git add .
git commit -m "Add new project"
git push
```
The live site updates within a minute or two.

### No-Git alternative
On the empty repo page, click **uploading an existing file**, drag in all the files, and **Commit changes**. Then do the "Turn on Pages" step. (Fine to start, but learning the Git commands above pays off.)
