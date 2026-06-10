# PROJECT: Romantic Birthday Website

## Overview

Create a premium romantic birthday website as a digital gift.

The website should feel emotional, elegant, cinematic, and modern.

Target audience: a girlfriend opening a birthday surprise from her boyfriend.

The website must work perfectly on:

* iPhone Safari
* Android Chrome
* Desktop Chrome
* Desktop Edge
* Desktop Safari
* Tablet devices

The design must be fully responsive.

Deploy target: Vercel.

Technology stack:

* Next.js 15 (App Router)
* TypeScript
* TailwindCSS
* Framer Motion
* React
* Howler.js for audio
* No backend required

The entire website should be a single-page experience with animated sections.

---

# SECTION 1 - CLOSED BIRTHDAY CARD

When the website loads, show ONLY a closed birthday card in the center of the screen.

Background:

* Soft animated particles
* Floating hearts
* Pink and purple gradient
* Slight glow effect

Card front text:

💌

Happy Birthday
My Love ❤️

Tap To Open

Animation:

* Card gently floats up and down
* Slight hover scale effect
* Hearts slowly moving in background

Desktop:

* Mouse hover effect

Mobile:

* Tap effect

Music should NOT autoplay immediately.

---

# SECTION 2 - OPENING ENVELOPE ANIMATION

When user taps the card:

Animate:

1. Card zooms slightly
2. Envelope flap opens
3. Letter slides out
4. Background darkens slightly
5. Romantic piano music starts

Animation duration:

2–3 seconds

Use Framer Motion.

Must feel smooth at 60 FPS.

---

# SECTION 3 - LOVE LETTER

Show a paper letter in the center.

The letter content is loaded from:

/public/data/love-letter.txt

Display text using a typewriter animation.

Paper style:

* Elegant cream paper
* Soft shadow
* Rounded corners

Typing speed:

40–60ms per character

After typing completes:

Wait 5 seconds.

Then fade out the letter.

---

# SECTION 4 - MEMORIES INTRO

Display:

"Our Memories ✨"

with fade-in animation.

Under title:

"A journey of love, laughter and beautiful moments."

Display for 3 seconds.

Then continue automatically.

---

# SECTION 5 - CINEMATIC PHOTO SLIDESHOW

Photos are stored in:

/public/images/

The website must automatically load all images from this folder.

No hardcoded image list.

Requirements:

* Full screen slideshow
* Ken Burns effect
* Slow zoom animation
* Crossfade transition

Each image:

8–10 seconds

Animation:

scale(1.0) → scale(1.15)

Opacity transitions smoothly.

Overlay:

Dark gradient

Bottom caption area.

Image metadata loaded from:

/public/data/memories.json

Example:

[
{
"file": "1.jpg",
"title": "Our First Meeting",
"date": "15/03/2024",
"description": "The day everything began."
}
]

Display:

Date
Title
Description

with fade animation.

---

# SECTION 6 - FLOATING POLAROID MEMORIES

After slideshow:

Show floating polaroid photos.

Photos enter from:

* top
* left
* right

Random rotation:

-15deg to +15deg

Random sizes.

Photos should never overlap excessively.

Use Framer Motion.

This section should feel playful and nostalgic.

---

# SECTION 7 - LOVE COUNTER

Display:

❤️ Together Since ❤️

Then a realtime counter.

Show:

Years
Months
Days
Hours
Minutes
Seconds

Calculate from configurable date:

const LOVE_START_DATE

Display with large elegant typography.

Background:

Stars and hearts.

---

# SECTION 8 - SURPRISE GIFT BUTTON

Center screen button:

🎁 Open Your Birthday Gift

Large glowing button.

Pulse animation.

When pressed:

Fade everything out.

---

# SECTION 9 - FINAL SURPRISE

Dark background.

Show sequential messages.

Message 1:

Happy Birthday ❤️

Message 2:

Thank You For Being In My Life

Message 3:

May All Your Dreams Come True

Message 4:

I Love You ❤️

Messages appear one by one.

Fade transition between messages.

---

# SECTION 10 - HEART PHOTO MOSAIC

Final climax.

Generate a large heart shape composed of many uploaded photos.

Requirements:

* Use all images available
* Heart shape centered
* Photos animate into position
* Final heart slowly pulses

Background:

Particles
Sparkles
Floating hearts

This should be the most emotional moment of the website.

---

# MUSIC

Music file location:

/public/music/background.mp3

Requirements:

* Start only after card opens
* Loop playback
* Volume control button
* Mute button
* Mobile compatible

---

# PERFORMANCE

Requirements:

* Lazy load images
* Use next/image
* Optimize for mobile
* Lighthouse score above 90
* Smooth animations on iPhone

---

# RESPONSIVE DESIGN

Mobile First.

Support:

320px width up to 4K screens.

Portrait and landscape.

Safe area support for iPhone notch.

Use:

env(safe-area-inset-top)
env(safe-area-inset-bottom)

---

# ACCESSIBILITY

* Proper aria labels
* Keyboard navigation
* Reduced motion support
* Image alt text support

---

# FILE STRUCTURE

/app
/components
/hooks
/lib
/public/images
/public/music
/public/data

/public/data/love-letter.txt

/public/data/memories.json

---

# DELIVERABLES

Generate:

1. Complete Next.js project
2. All React components
3. TypeScript types
4. Tailwind styling
5. Framer Motion animations
6. README deployment guide
7. Vercel-ready configuration

The final result should feel like a premium interactive romantic birthday experience, comparable to a modern digital greeting card and emotional storytelling website.
