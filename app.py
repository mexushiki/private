from flask import Flask, render_template

app = Flask(__name__)

# ---------------------------------------------------------
# EDIT THESE to personalize the site — no HTML/CSS knowledge needed
# ---------------------------------------------------------
CONFIG = {
    "her_name": "My Love",          # her name, shown on interface 1
    "your_name": "Your Love",              # your name, signs the speech on interface 3
    "anniversary_text": "2 Months Together",
    "surprise_title": "Happy 2 Months, {name}! 🌸",
    "surprise_message": (
        "Every day with you feels like a new page in the best story I've ever "
        "been part of. Here's to many more months, memories, and little moments "
        "like this one. I love you. 💕"
    ),
    "photos": [
        {"src": "photo1.jpg", "caption": "Zoo adventure with you"},
        {"src": "photo2.jpg", "caption": "That random photobooth we took"},
        {"src": "photo3.jpg", "caption": "Eating dessert with my love"},
        {"src": "photo4.jpg", "caption": "Random photo of us"},
        {"src": "photo5.jpg", "caption": "The first flower I got you"},
        {"src": "photo6.jpg", "caption": "Us eating dinner together"},
    ],
    "speech": (
        "Sayang if you're reading this, it means you scrolled all the way here "
        "just like how you've stuck with me through everything these past two "
        "months.\n\n"
        "I don't think I've ever smiled this much over text messages, or "
        "looked forward to a day this much just because I knew I'd get to "
        "talk to you.\n\n"
        "Thank you for accepting me, for laughing at my bad jokes, for being "
        "patient with me, and for making even the ordinary days feel special.\n\n"
        "Here's to us, and to many more months worth celebrating.\n\n"
        "I love you sayangg, i do and always<3."
    ),
}


@app.route("/")
def index():
    return render_template("index.html", cfg=CONFIG)


if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host="0.0.0.0", port=port)
