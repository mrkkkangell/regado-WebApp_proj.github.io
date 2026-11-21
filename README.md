# Yu-Gi-Oh! Website Recreation

**ITE17 – Web Application Development 1 | Final Project**

A clean, responsive, multi-page front-end recreation of the official Yu-Gi-Oh! website.

## Quick Start

1. Add your images to the folders listed below (see expected filenames).
2. Open `index.html` directly in a web browser (works from `file://`).
3. No build step, no server, no npm required.

## Tech Stack

- HTML5, CSS3, Bootstrap 5.3.x (CDN), Vanilla JavaScript (ES6+)
- Google Fonts: Oswald + Inter

## Image Folders & Expected Filenames

### `assets/images/logo/`
- `yugioh-logo.png` — Site logo used in the navbar
- `favicon.png` — Browser tab icon

### `assets/images/hero/`
- `hero-01.jpg` — Dark Magician hero background (1920×1080)
- `hero-02.jpg` — Blue-Eyes White Dragon hero background
- `hero-03.jpg` — Red-Eyes Black Dragon hero background
- `hero-04.jpg` — Exodia the Forbidden One hero background

### `assets/images/cards/`
Portrait card art (421×614 or similar ratio). Filenames match the `slug` field in `data.js`:
- `dark-magician.jpg`
- `blue-eyes-white-dragon.jpg`
- `red-eyes-black-dragon.jpg`
- `exodia-the-forbidden-one.jpg`
- `elemental-hero-neos.jpg`
- `number-39-utopia.jpg`
- `odd-eyes-dragon.jpg`
- `stardust-dragon.jpg`
- `100-year-awakening.jpg`
- `4-starred-ladybug-of-doom.jpg`
- `8-claws-scorpion.jpg`
- `a-deal-with-dark-ruler.jpg`
- `a-feather-of-the-phoenix.jpg`
- `a-hero-emerges.jpg`
- `a-legendary-ocean.jpg`
- `a-wingbeat-of-giant-dragon.jpg`
- `ad-changer.jpg`
- `abaki.jpg`
- `absorb-spell.jpg`
- `absurd-stealer.jpg`
- `acceleration-zone.jpg`
- `accelight.jpg`
- `ace-of-sword.jpg`
- `ace-of-wand.jpg`
- `acheche-archer.jpg`
- `acheche-chambers.jpg`
- `acorno.jpg`
- `acrobat-monkey.jpg`
- `active-guard.jpg`
- `adamantine-sword-revival.jpg`
- `adapt-to-adversity.jpg`
- `advance-draw.jpg`

### `assets/images/characters/`
Portrait art. Filenames match the `slug` field in `data.js`:
- `yami-yugi.png`
- `yugi-muto.png`
- `jaden-yuki.png`
- `yusei-fudo.png`
- `yuma-tsukumo.png`
- `astral.png`
- `yuya-sakaki.png`
- `abidos-the-third.png`
- `adrian-gecko.png`
- `ai.png`
- `akiza-izinski.png`
- `alexis-rhodes.png`
- `yusaku-fujiki-playmaker.png`
- `yuga-ohdo.png`
- `yudias-velgear.png`
- `mai-valentine.png`
- `joey-wheeler.png`
- `seto-kaiba.png`

### `assets/images/episodes/`
Thumbnail art (480×270, 16:9). Filenames match the `slug` field in `data.js`:
- `the-heart-of-the-cards.jpg`
- `the-gauntlet-is-thrown.jpg`
- `journey-to-the-duelist-kingdom.jpg`
- `the-next-king-of-games.jpg`
- `on-your-mark-get-set-duel.jpg`
- `go-with-the-flow-part-1.jpg`
- `go-with-the-flow-part-2.jpg`
- `forever-zexal.jpg`
- `outclassed-and-outmatched.jpg`
- `last-final-duel.jpg`
- `the-future-of-three-worlds.jpg`
- `the-battle-of-three-worlds.jpg`
- `the-fate-of-three-worlds.jpg`
- `a-thousand-ways-to-lose.jpg`
- `the-source-code.jpg`

### `assets/images/news/`
Wide banner art (560×110 or 16:9). Filenames match the `slug` field in `data.js`:
- `all-new-yu-gi-oh-x-youtooz-collection.jpg`
- `red-eyes-black-dragon-diorama-led-lamp.jpg`
- `lego-ideas-x-yu-gi-oh.jpg`
- `crocs-launches-first-collaboration.jpg`
- `new-yu-gi-oh-tees-from-hypland.jpg`
- `blazing-dominion-boosters-available-now.jpg`
- `steady-hands-duelist-collection.jpg`
- `lego-ideas-choose-your-favorite.jpg`

### `assets/images/series/`
Series banner art (412×204 at 2×). Filenames match the `slug` field in `data.js`:
- `yu-gi-oh.jpg`
- `gx.jpg`
- `5ds.jpg`
- `zexal.jpg`
- `arc-v.jpg`
- `vrains.jpg`
- `sevens.jpg`
- `go-rush.jpg`

### `assets/images/banners/`
Watch page promo banners (400×174):
- `banner-01.jpg` — SEE WHERE IT ALL BEGAN
- `banner-02.jpg` — YU-GI-OH! ZEXAL
- `banner-03.jpg` — DUEL SCHOOL

### `assets/images/ui/`
- `placeholder.svg` — ✅ Already included
- `play-icon.svg` — Optional play button overlay

## File Structure

```
yugioh-site/
  index.html            Home
  series.html           Series
  watch.html            Watch episodes
  characters.html       Characters
  cards.html            Cards
  news.html             News
  css/style.css         All custom styling
  js/data.js            Content data arrays
  js/script.js          All behavior and interactivity
  assets/images/        (see folders above)
```

## Credits

Student project recreation (ITE17).
©1996 Kazuki Takahashi • ©2004 NAS • TV TOKYO
