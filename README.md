# 2 Months Together 🌸

A cute pink one-page site with 3 interfaces:

1. **The flower** — tap it, it blooms, a surprise popup appears.
2. **The gallery** — your photos in a cute polaroid grid. Scroll to the
   bottom and a button appears.
3. **The speech** — a typewritten love note to her.

## How to run it

```bash
pip install -r requirements.txt
python3 app.py
```

Then open **http://localhost:5000** in a browser (works great on phone
too — just open it on her phone, or deploy it and send her the link).

## How to personalize it (no coding needed)

Open **`app.py`** and edit the `CONFIG` dictionary at the top:

- `her_name` — shown on interface 1
- `your_name` — signs the speech
- `surprise_title` / `surprise_message` — the popup text (use `{name}`
  in the title to auto-insert her name)
- `photos` — list of `{"src": "yourfile.jpg", "caption": "..."}`
- `speech` — the full love-letter text on interface 3 (use `\n\n` for
  new paragraphs)

## How to add your real photos

1. Drop your photos into `static/images/` (jpg or png).
2. In `app.py`, update the `photos` list so each `src` matches the
   filename you added, and write your own captions.
3. Delete the placeholder `photo1.jpg`–`photo6.jpg` files once you've
   swapped them out (or just overwrite them with the same names).

## Deploying so she can open it from a link

Easiest free options: [Render](https://render.com), [Railway](https://railway.app),
or [PythonAnywhere](https://www.pythonanywhere.com) — all can host a small
Flask app for free. Push this folder to a GitHub repo, connect it, and
set the start command to `python app.py` (or `gunicorn app:app` if the
host asks for one).

## Structure

```
anniversary_website/
├── app.py                 # edit CONFIG here
├── requirements.txt
├── templates/
│   └── index.html
└── static/
    ├── css/style.css
    ├── js/script.js
    └── images/             # your photos go here
```
