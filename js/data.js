/* =========================================================================
 * data.js — Yu-Gi-Oh! Website Recreation
 * ITE17 – Web Application Development 1 | Final Project
 * =========================================================================
 * All content data arrays. Loaded via <script> before script.js.
 * Every record uses a "slug" field (lowercase kebab-case) that determines
 * the image path, e.g. assets/images/cards/dark-magician.jpg
 *
 * ===== EXPECTED IMAGE FILENAMES PER FOLDER =====
 *
 * logo/         yugioh-logo.png, favicon.png
 * hero/         hero-01.jpg, hero-02.jpg, hero-03.jpg, hero-04.jpg
 * cards/        dark-magician.jpg, blue-eyes-white-dragon.jpg,
 *               red-eyes-black-dragon.jpg, exodia-the-forbidden-one.jpg,
 *               elemental-hero-neos.jpg, number-39-utopia.jpg,
 *               odd-eyes-dragon.jpg, stardust-dragon.jpg,
 *               100-year-awakening.jpg, 4-starred-ladybug-of-doom.jpg,
 *               8-claws-scorpion.jpg, a-deal-with-dark-ruler.jpg,
 *               a-feather-of-the-phoenix.jpg, a-hero-emerges.jpg,
 *               a-legendary-ocean.jpg, a-wingbeat-of-giant-dragon.jpg,
 *               ad-changer.jpg, abaki.jpg, absorb-spell.jpg,
 *               absurd-stealer.jpg, acceleration-zone.jpg, accelight.jpg,
 *               ace-of-sword.jpg, ace-of-wand.jpg, acheche-archer.jpg,
 *               acheche-chambers.jpg, acorno.jpg, acrobat-monkey.jpg,
 *               active-guard.jpg, adamantine-sword-revival.jpg,
 *               adapt-to-adversity.jpg, advance-draw.jpg
 * characters/   yami-yugi.png, yugi-muto.png, jaden-yuki.png,
 *               yusei-fudo.png, yuma-tsukumo.png, astral.png,
 *               yuya-sakaki.png, abidos-the-third.png, adrian-gecko.png,
 *               ai.png, akiza-izinski.png, alexis-rhodes.png,
 *               yusaku-fujiki-playmaker.png, yuga-ohdo.png,
 *               yudias-velgear.png, mai-valentine.png,
 *               joey-wheeler.png, seto-kaiba.png
 * episodes/     the-heart-of-the-cards.jpg, the-gauntlet-is-thrown.jpg,
 *               journey-to-the-duelist-kingdom.jpg,
 *               the-next-king-of-games.jpg,
 *               on-your-mark-get-set-duel.jpg,
 *               go-with-the-flow-part-1.jpg,
 *               go-with-the-flow-part-2.jpg, forever-zexal.jpg,
 *               outclassed-and-outmatched.jpg, last-final-duel.jpg,
 *               the-future-of-three-worlds.jpg,
 *               the-battle-of-three-worlds.jpg,
 *               the-fate-of-three-worlds.jpg,
 *               a-thousand-ways-to-lose.jpg, the-source-code.jpg
 * news/         all-new-yu-gi-oh-x-youtooz-collection.jpg,
 *               red-eyes-black-dragon-diorama-led-lamp.jpg,
 *               lego-ideas-x-yu-gi-oh.jpg,
 *               crocs-launches-first-collaboration.jpg,
 *               new-yu-gi-oh-tees-from-hypland.jpg,
 *               blazing-dominion-boosters-available-now.jpg,
 *               steady-hands-duelist-collection.jpg,
 *               lego-ideas-choose-your-favorite.jpg
 * series/       yu-gi-oh.jpg, gx.jpg, 5ds.jpg, zexal.jpg,
 *               arc-v.jpg, vrains.jpg, sevens.jpg, go-rush.jpg
 * banners/      banner-01.jpg, banner-02.jpg, banner-03.jpg
 * ui/           placeholder.svg, play-icon.svg
 * ========================================================================= */

/* ===== 1. HERO SLIDES (Home page split-screen carousel, 4 slides) ===== */
const HERO_SLIDES = [
  {
    slug: 'dark-magician',
    title: 'Dark Magician',
    summary: "Yugi's most trusted servant and the ultimate spellcaster in terms of attack and defense. A legend that answers every call of the heart of the cards.",
    hue: 270
  },
  {
    slug: 'blue-eyes-white-dragon',
    title: 'Blue-Eyes White Dragon',
    summary: 'The legendary dragon of incredible power. A virtually invincible card that few have faced and lived to tell the tale.',
    hue: 210
  },
  {
    slug: 'red-eyes-black-dragon',
    title: 'Red-Eyes Black Dragon',
    summary: 'A powerful engine of destruction. This legendary dragon is a force to be reckoned with on any battlefield.',
    hue: 0
  },
  {
    slug: 'exodia-the-forbidden-one',
    title: 'Exodia the Forbidden One',
    summary: 'An unstoppable force sealed away long ago. Assemble all five pieces and you will achieve instant victory.',
    hue: 45
  }
];

/* ===== 2. SERIES (8 series with taglines and descriptions) ===== */
const SERIES_DATA = [
  {
    slug: 'yu-gi-oh',
    title: "Yu-Gi-Oh!",
    tagline: "It's Time to Duel!",
    description: 'Yugi and his friends discover a card-battling game called Duel Monsters, where players pit mystical creatures against one another in action-packed duels.'
  },
  {
    slug: 'gx',
    title: 'Yu-Gi-Oh! GX',
    tagline: 'Get Your Game On!',
    description: 'Set several years later at a Duel Monsters boarding school where champions train to become the best.'
  },
  {
    slug: '5ds',
    title: "Yu-Gi-Oh! 5D's",
    tagline: "Let's Rev It Up!",
    description: 'In a futuristic New Domino City, dueling kicks into overdrive as Duel Runners battle in high-octane Turbo Duels.'
  },
  {
    slug: 'zexal',
    title: 'Yu-Gi-Oh! ZEXAL',
    tagline: "I'm Feelin' The Flow!",
    description: 'Aspiring duelist Yuma meets Astral, a mysterious visitor from another universe, and a new kind of dueling begins.'
  },
  {
    slug: 'arc-v',
    title: 'Yu-Gi-Oh! ARC-V',
    tagline: 'Swing into action!',
    description: "Yuya dreams of following his father's footsteps as an entertainment duelist and discovers Pendulum Summoning."
  },
  {
    slug: 'vrains',
    title: 'Yu-Gi-Oh! VRAINS',
    tagline: 'Link into the VRAINS!',
    description: 'Duelists plug into Link VRAINS, a cyberspace where a hero called Playmaker fights a team of hackers.'
  },
  {
    slug: 'sevens',
    title: 'Yu-Gi-Oh! SEVENS',
    tagline: 'Get Ready for the Rush!',
    description: 'Yuga Ohdo is an ordinary student about to take the Rush Duel world by storm.'
  },
  {
    slug: 'go-rush',
    title: 'Yu-Gi-Oh! GO RUSH!!',
    tagline: 'Feel the rush!',
    description: 'Rush Duels are faster and simpler, packed with awesome strategies.'
  }
];

/* ===== 3. EPISODES ===== */
const EPISODES = [
  {
    slug: 'the-heart-of-the-cards',
    title: 'The Heart of the Cards',
    series: "Yu-Gi-Oh!",
    seriesSlug: 'yu-gi-oh',
    season: 1,
    number: 1,
    duration: '20:09',
    level: 4,
    characters: ['yami-yugi', 'yugi-muto', 'seto-kaiba'],
    cards: ['dark-magician', 'blue-eyes-white-dragon', 'exodia-the-forbidden-one']
  },
  {
    slug: 'the-gauntlet-is-thrown',
    title: 'The Gauntlet Is Thrown',
    series: "Yu-Gi-Oh!",
    seriesSlug: 'yu-gi-oh',
    season: 1,
    number: 2,
    duration: '21:21',
    level: 4,
    characters: ['yugi-muto', 'seto-kaiba', 'joey-wheeler'],
    cards: ['dark-magician']
  },
  {
    slug: 'journey-to-the-duelist-kingdom',
    title: 'Journey to the Duelist Kingdom',
    series: "Yu-Gi-Oh!",
    seriesSlug: 'yu-gi-oh',
    season: 1,
    number: 3,
    duration: '21:22',
    level: 3,
    characters: ['yugi-muto', 'joey-wheeler', 'mai-valentine'],
    cards: ['dark-magician', 'red-eyes-black-dragon']
  },
  {
    slug: 'the-next-king-of-games',
    title: 'The Next King of Games',
    series: 'Yu-Gi-Oh! GX',
    seriesSlug: 'gx',
    season: 1,
    number: 1,
    duration: '21:17',
    level: 4,
    characters: ['jaden-yuki', 'alexis-rhodes'],
    cards: ['elemental-hero-neos']
  },
  {
    slug: 'on-your-mark-get-set-duel',
    title: 'On Your Mark, Get Set, Duel!',
    series: "Yu-Gi-Oh! 5D's",
    seriesSlug: '5ds',
    season: 1,
    number: 1,
    duration: '21:24',
    level: 4,
    characters: ['yusei-fudo', 'akiza-izinski'],
    cards: ['stardust-dragon']
  },
  {
    slug: 'go-with-the-flow-part-1',
    title: 'Go With the Flow, Part 1',
    series: 'Yu-Gi-Oh! ZEXAL',
    seriesSlug: 'zexal',
    season: 1,
    number: 1,
    duration: '21:18', // sample data
    level: 4,
    characters: ['yuma-tsukumo', 'astral'],
    cards: ['number-39-utopia']
  },
  {
    slug: 'go-with-the-flow-part-2',
    title: 'Go With the Flow, Part 2',
    series: 'Yu-Gi-Oh! ZEXAL',
    seriesSlug: 'zexal',
    season: 1,
    number: 2,
    duration: '21:15', // sample data
    level: 3,
    characters: ['yuma-tsukumo', 'astral'],
    cards: ['number-39-utopia']
  },
  {
    slug: 'forever-zexal',
    title: 'Forever ZEXAL',
    series: 'Yu-Gi-Oh! ZEXAL',
    seriesSlug: 'zexal',
    season: 2,
    number: 49,
    duration: '22:26', // sample data
    level: 5,
    characters: ['yuma-tsukumo', 'astral'],
    cards: ['number-39-utopia']
  },
  {
    slug: 'outclassed-and-outmatched',
    title: 'Outclassed and Outmatched',
    series: 'Yu-Gi-Oh! ZEXAL',
    seriesSlug: 'zexal',
    season: 2,
    number: 47,
    duration: '21:22', // sample data
    level: 4,
    characters: ['yuma-tsukumo'],
    cards: []
  },
  {
    slug: 'last-final-duel',
    title: 'Last Final Duel',
    series: 'Yu-Gi-Oh! ZEXAL',
    seriesSlug: 'zexal',
    season: 2,
    number: 48,
    duration: '20:43', // sample data
    level: 5,
    characters: ['yuma-tsukumo', 'astral'],
    cards: []
  },
  {
    slug: 'the-future-of-three-worlds',
    title: 'The Future of Three Worlds',
    series: 'Yu-Gi-Oh! ZEXAL',
    seriesSlug: 'zexal',
    season: 2,
    number: 52,
    duration: '21:21', // sample data
    level: 5,
    characters: ['yuma-tsukumo', 'astral'],
    cards: []
  },
  {
    slug: 'the-battle-of-three-worlds',
    title: 'The Battle of Three Worlds',
    series: 'Yu-Gi-Oh! ZEXAL',
    seriesSlug: 'zexal',
    season: 2,
    number: 44,
    duration: '21:36', // sample data
    level: 4,
    characters: ['yuma-tsukumo'],
    cards: []
  },
  {
    slug: 'the-fate-of-three-worlds',
    title: 'The Fate of Three Worlds',
    series: 'Yu-Gi-Oh! ZEXAL',
    seriesSlug: 'zexal',
    season: 2,
    number: 42,
    duration: '21:03', // sample data
    level: 4,
    characters: ['yuma-tsukumo'],
    cards: []
  },
  {
    slug: 'a-thousand-ways-to-lose',
    title: 'A Thousand Ways to Lose',
    series: 'Yu-Gi-Oh! ZEXAL',
    seriesSlug: 'zexal',
    season: 2,
    number: 43,
    duration: '21:20', // sample data
    level: 3,
    characters: ['yuma-tsukumo'],
    cards: []
  },
  {
    slug: 'the-source-code',
    title: 'The Source Code',
    series: 'Yu-Gi-Oh! ZEXAL',
    seriesSlug: 'zexal',
    season: 2,
    number: 41,
    duration: '21:31', // sample data
    level: 3,
    characters: ['yuma-tsukumo'],
    cards: []
  }
];

/* ===== 4. NEWS (8 articles) ===== */
const NEWS = [
  {
    slug: 'all-new-yu-gi-oh-x-youtooz-collection',
    title: 'All new Yu-Gi-Oh! X YOUTOOZ collection!',
    date: 'OCT 30',
    time: '12:00 PM',
    excerpt: 'Pot of Greed, Toon Dark Magician Girl, Blue-Eyes Too...',
    color: '#7b4fbf'
  },
  {
    slug: 'red-eyes-black-dragon-diorama-led-lamp',
    title: 'Red-Eyes Black Dragon Diorama LED Lamp from Forge Panda',
    date: 'SEP 21',
    time: '12:00 PM',
    excerpt: 'Unleash the power! The Red-Eyes Black Dragon Dior...',
    color: '#c4262e'
  },
  {
    slug: 'lego-ideas-x-yu-gi-oh',
    title: 'LEGO Ideas X Yu-Gi-Oh!',
    date: 'SEP 14',
    time: '12:00 PM',
    excerpt: "We're excited to announce that Step_on_a_Brick's The...",
    color: '#1f7fd0'
  },
  {
    slug: 'crocs-launches-first-collaboration',
    title: 'Crocs launches first collaboration with Yu-Gi-Oh!',
    date: 'SEP 02',
    time: '12:00 PM',
    excerpt: 'Foot Locker-exclusive models also available, with sp...',
    color: '#d6246e'
  },
  {
    slug: 'new-yu-gi-oh-tees-from-hypland',
    title: 'New Yu-Gi-Oh! tees are now available from Hypland!',
    date: 'JUN 21',
    time: '12:00 PM',
    excerpt: "The latest in Hypland's official collaboration with ...",
    color: '#4a3fb5'
  },
  {
    slug: 'blazing-dominion-boosters-available-now',
    title: 'Blazing Dominion boosters available now!',
    date: 'MAY 08',
    time: '12:00 PM',
    excerpt: 'Blazing Dominion burns bright with fantastic and fea...',
    color: '#c4262e'
  },
  {
    slug: 'steady-hands-duelist-collection',
    title: 'Steady Hands Duelist Collection is available now!',
    date: 'MAY 01',
    time: '12:00 PM',
    excerpt: 'Get your hands on this exclusive duelist collection featuring...',
    color: '#1f7fd0'
  },
  {
    slug: 'lego-ideas-choose-your-favorite',
    title: 'LEGO Ideas - Choose your favorite!',
    date: 'APR 14',
    time: '12:00 PM',
    excerpt: 'Vote for your favorite LEGO Ideas Yu-Gi-Oh! set design...',
    color: '#7b4fbf'
  }
];

/* ===== 5. CHARACTERS (18 characters) ===== */
const CHARACTERS = [
  {
    slug: 'yami-yugi',
    name: 'Yami Yugi',
    series: "Yu-Gi-Oh!",
    seriesSlug: 'yu-gi-oh',
    level: 5,
    nicknames: ['Pharaoh', 'Other Yugi', 'The Nameless Pharaoh'],
    bio: {
      born: 'Unknown (Ancient Egypt)',
      education: 'N/A',
      occupation: 'Pharaoh',
      sign: 'Unknown',
      food: 'N/A'
    },
    relatives: ['yugi-muto'],
    allies: ['yugi-muto', 'joey-wheeler', 'mai-valentine', 'seto-kaiba'],
    description: 'The spirit of the Millennium Puzzle and the King of Games.',
    episodes: ['the-heart-of-the-cards', 'the-gauntlet-is-thrown', 'journey-to-the-duelist-kingdom'],
    cards: ['dark-magician', 'exodia-the-forbidden-one']
  },
  {
    slug: 'yugi-muto',
    name: 'Yugi Muto',
    series: "Yu-Gi-Oh!",
    seriesSlug: 'yu-gi-oh',
    level: 5,
    nicknames: ['King of Games'],
    bio: {
      born: '06.04',
      education: '11th Grade',
      occupation: 'None',
      sign: 'Gemini',
      food: 'Hamburger'
    },
    relatives: ['solomon-muto'],
    allies: ['yami-yugi', 'joey-wheeler', 'mai-valentine', 'ishizu-ishtar', 'mako-tsunami', 'tea-gardner', 'tristan-taylor'],
    description: 'The spirit of the Millennium Puzzle and the King of Games.',
    episodes: ['the-heart-of-the-cards', 'the-gauntlet-is-thrown', 'journey-to-the-duelist-kingdom'],
    cards: ['dark-magician', 'exodia-the-forbidden-one']
  },
  {
    slug: 'jaden-yuki',
    name: 'Jaden Yuki',
    series: 'Yu-Gi-Oh! GX',
    seriesSlug: 'gx',
    level: 5,
    nicknames: ['Jay', 'Slacker'],
    bio: {
      born: 'Unknown',
      education: 'Duel Academy (Slifer Red)',
      occupation: 'Student',
      sign: 'Leo',
      food: 'Fried Shrimp'
    },
    relatives: [],
    allies: ['alexis-rhodes', 'adrian-gecko'],
    description: 'A spirited duelist and Slifer Red student at Duel Academy with a passion for fun.',
    episodes: ['the-next-king-of-games'],
    cards: ['elemental-hero-neos']
  },
  {
    slug: 'yusei-fudo',
    name: 'Yusei Fudo',
    series: "Yu-Gi-Oh! 5D's",
    seriesSlug: '5ds',
    level: 5,
    nicknames: ['Satellite\'s Shooting Star'],
    bio: {
      born: 'Unknown',
      education: 'Self-taught',
      occupation: 'Turbo Duelist',
      sign: 'Cancer',
      food: 'Cup Ramen'
    },
    relatives: [],
    allies: ['akiza-izinski'],
    description: 'A brilliant mechanic and Turbo Duelist from the Satellite district.',
    episodes: ['on-your-mark-get-set-duel'],
    cards: ['stardust-dragon']
  },
  {
    slug: 'yuma-tsukumo',
    name: 'Yuma Tsukumo',
    series: 'Yu-Gi-Oh! ZEXAL',
    seriesSlug: 'zexal',
    level: 5,
    nicknames: ['The Duel Champion'],
    bio: {
      born: 'Unknown',
      education: 'Heartland Academy',
      occupation: 'Student',
      sign: 'Leo',
      food: 'Rice Balls'
    },
    relatives: [],
    allies: ['astral'],
    description: "An enthusiastic young duelist who teams up with the mysterious Astral to collect the Number cards.",
    episodes: ['go-with-the-flow-part-1', 'go-with-the-flow-part-2', 'forever-zexal', 'outclassed-and-outmatched', 'last-final-duel', 'the-future-of-three-worlds', 'the-battle-of-three-worlds', 'the-fate-of-three-worlds', 'a-thousand-ways-to-lose', 'the-source-code'],
    cards: ['number-39-utopia']
  },
  {
    slug: 'astral',
    name: 'Astral',
    series: 'Yu-Gi-Oh! ZEXAL',
    seriesSlug: 'zexal',
    level: 4,
    nicknames: ['The Envoy of the Astral World'],
    bio: {
      born: 'Astral World',
      education: 'N/A',
      occupation: 'Emissary',
      sign: 'Unknown',
      food: 'N/A'
    },
    relatives: [],
    allies: ['yuma-tsukumo'],
    description: 'A mysterious being from the Astral World who partners with Yuma to collect the Number cards.',
    episodes: ['go-with-the-flow-part-1', 'go-with-the-flow-part-2', 'forever-zexal', 'last-final-duel', 'the-future-of-three-worlds'],
    cards: ['number-39-utopia']
  },
  {
    slug: 'yuya-sakaki',
    name: 'Yuya Sakaki',
    series: 'Yu-Gi-Oh! ARC-V',
    seriesSlug: 'arc-v',
    level: 5,
    nicknames: ['Entertainment Duelist'],
    bio: {
      born: 'Unknown',
      education: 'You Show Duel School',
      occupation: 'Student / Entertainer',
      sign: 'Leo',
      food: 'Pancakes'
    },
    relatives: [],
    allies: [],
    description: 'A fun-loving boy who discovers Pendulum Summoning and aims to follow in his father\'s footsteps.',
    episodes: [],
    cards: ['odd-eyes-dragon']
  },
  {
    slug: 'abidos-the-third',
    name: 'Abidos the Third',
    series: 'Yu-Gi-Oh! GX',
    seriesSlug: 'gx',
    level: 3,
    nicknames: ['The Pharaoh Duelist'],
    bio: {
      born: 'Ancient Egypt',
      education: 'Royal tutoring',
      occupation: 'Pharaoh',
      sign: 'Unknown',
      food: 'Unknown'
    },
    relatives: [],
    allies: [],
    description: 'An ancient pharaoh and one of the Shadow Riders who never lost a duel in his lifetime.',
    episodes: [],
    cards: []
  },
  {
    slug: 'adrian-gecko',
    name: 'Adrian Gecko',
    series: 'Yu-Gi-Oh! GX',
    seriesSlug: 'gx',
    level: 3,
    nicknames: ['Amon Garam'],
    bio: {
      born: 'Unknown',
      education: 'East Academy',
      occupation: 'Student',
      sign: 'Unknown',
      food: 'Unknown'
    },
    relatives: [],
    allies: ['jaden-yuki'],
    description: 'A transfer student from East Academy who wields the power of Exodia.',
    episodes: [],
    cards: []
  },
  {
    slug: 'ai',
    name: 'Ai',
    series: 'Yu-Gi-Oh! VRAINS',
    seriesSlug: 'vrains',
    level: 4,
    nicknames: ['Ignis', 'Dark Ignis'],
    bio: {
      born: 'Cyberse World',
      education: 'N/A',
      occupation: 'AI / Ignis',
      sign: 'N/A',
      food: 'N/A'
    },
    relatives: [],
    allies: ['yusaku-fujiki-playmaker'],
    description: 'A free-willed AI and one of the six Ignis, partnered with Playmaker.',
    episodes: [],
    cards: []
  },
  {
    slug: 'akiza-izinski',
    name: 'Akiza Izinski',
    series: "Yu-Gi-Oh! 5D's",
    seriesSlug: '5ds',
    level: 4,
    nicknames: ['Black Rose'],
    bio: {
      born: 'Unknown',
      education: 'Duel Academy',
      occupation: 'Psychic Duelist',
      sign: 'Scorpio',
      food: 'Unknown'
    },
    relatives: [],
    allies: ['yusei-fudo'],
    description: 'A psychic duelist who can bring Duel Monster cards to life, known as the Black Rose.',
    episodes: ['on-your-mark-get-set-duel'],
    cards: []
  },
  {
    slug: 'alexis-rhodes',
    name: 'Alexis Rhodes',
    series: 'Yu-Gi-Oh! GX',
    seriesSlug: 'gx',
    level: 4,
    nicknames: ['Queen of Obelisk Blue'],
    bio: {
      born: 'Unknown',
      education: 'Duel Academy (Obelisk Blue)',
      occupation: 'Student',
      sign: 'Unknown',
      food: 'Unknown'
    },
    relatives: [],
    allies: ['jaden-yuki'],
    description: 'A top student at Duel Academy and one of the best female duelists in the GX era.',
    episodes: ['the-next-king-of-games'],
    cards: []
  },
  {
    slug: 'yusaku-fujiki-playmaker',
    name: 'Yusaku Fujiki / Playmaker',
    series: 'Yu-Gi-Oh! VRAINS',
    seriesSlug: 'vrains',
    level: 5,
    nicknames: ['Playmaker'],
    bio: {
      born: 'Unknown',
      education: 'Den City High School',
      occupation: 'Student / Hacker',
      sign: 'Unknown',
      food: 'Hot Dogs'
    },
    relatives: [],
    allies: ['ai'],
    description: 'A mysterious duelist who fights the Knights of Hanoi in the virtual world of Link VRAINS.',
    episodes: [],
    cards: []
  },
  {
    slug: 'yuga-ohdo',
    name: 'Yuga Ohdo',
    series: 'Yu-Gi-Oh! SEVENS',
    seriesSlug: 'sevens',
    level: 4,
    nicknames: ['King of Duels'],
    bio: {
      born: 'Unknown',
      education: 'Goha 7th Elementary',
      occupation: 'Student / Inventor',
      sign: 'Unknown',
      food: 'Curry Rice'
    },
    relatives: [],
    allies: ['yudias-velgear'],
    description: 'An inventive elementary schooler who creates Rush Duels to make dueling fun again.',
    episodes: [],
    cards: []
  },
  {
    slug: 'yudias-velgear',
    name: 'Yudias Velgear',
    series: 'Yu-Gi-Oh! GO RUSH!!',
    seriesSlug: 'go-rush',
    level: 4,
    nicknames: ['The Alien Duelist'],
    bio: {
      born: 'Velgear Star Cluster',
      education: 'N/A',
      occupation: 'Alien Warrior',
      sign: 'Unknown',
      food: 'Unknown'
    },
    relatives: [],
    allies: ['yuga-ohdo'],
    description: 'An alien visitor from the Velgear Star Cluster who comes to Earth seeking the power of Rush Duels.',
    episodes: [],
    cards: []
  },
  {
    slug: 'mai-valentine',
    name: 'Mai Valentine',
    series: "Yu-Gi-Oh!",
    seriesSlug: 'yu-gi-oh',
    level: 4,
    nicknames: ['Mai Kujaku'],
    bio: {
      born: 'Unknown',
      education: 'Unknown',
      occupation: 'Professional Duelist',
      sign: 'Scorpio',
      food: 'Unknown'
    },
    relatives: [],
    allies: ['yugi-muto', 'joey-wheeler'],
    description: 'A strong-willed professional duelist who eventually becomes an ally to Yugi and his friends.',
    episodes: ['journey-to-the-duelist-kingdom'],
    cards: []
  },
  {
    slug: 'joey-wheeler',
    name: 'Joey Wheeler',
    series: "Yu-Gi-Oh!",
    seriesSlug: 'yu-gi-oh',
    level: 4,
    nicknames: ['The Godfather of Games', 'Jounouchi'],
    bio: {
      born: '01.25',
      education: '11th Grade',
      occupation: 'None',
      sign: 'Aquarius',
      food: 'Steak'
    },
    relatives: ['serenity-wheeler'],
    allies: ['yugi-muto', 'yami-yugi', 'mai-valentine'],
    description: "Yugi's best friend and a passionate duelist who fights for his sister Serenity.",
    episodes: ['the-gauntlet-is-thrown', 'journey-to-the-duelist-kingdom'],
    cards: ['red-eyes-black-dragon']
  },
  {
    slug: 'seto-kaiba',
    name: 'Seto Kaiba',
    series: "Yu-Gi-Oh!",
    seriesSlug: 'yu-gi-oh',
    level: 5,
    nicknames: ['Kaiba', 'CEO of KaibaCorp'],
    bio: {
      born: '10.25',
      education: 'Private tutoring',
      occupation: 'CEO of KaibaCorp',
      sign: 'Scorpio',
      food: 'Unknown'
    },
    relatives: ['mokuba-kaiba'],
    allies: [],
    description: 'The ruthless CEO of KaibaCorp and Yugi\'s greatest rival, wielding the Blue-Eyes White Dragon.',
    episodes: ['the-heart-of-the-cards', 'the-gauntlet-is-thrown'],
    cards: ['blue-eyes-white-dragon']
  }
];

/* ===== 6. CARDS (8 featured + 24 alphabetical grid cards = 32 total) ===== */
const CARDS = [
  /* --- Featured cards (used in hero carousels) --- */
  {
    slug: 'dark-magician',
    name: 'Dark Magician',
    level: 5,
    type: 'Normal Monster',
    attribute: 'DARK',
    race: 'Spellcaster',
    atk: 2500,
    def: 2100,
    aka: ['Black Magician'],
    text: "The ultimate wizard in terms of attack and defense.",
    related: ['blue-eyes-white-dragon', 'red-eyes-black-dragon', 'exodia-the-forbidden-one'],
    duelists: ['yami-yugi', 'yugi-muto'],
    episodes: ['the-heart-of-the-cards', 'the-gauntlet-is-thrown', 'journey-to-the-duelist-kingdom']
  },
  {
    slug: 'elemental-hero-neos',
    name: 'Elemental HERO Neos',
    level: 5,
    type: 'Normal Monster',
    attribute: 'LIGHT',
    race: 'Warrior',
    atk: 2500,
    def: 2000,
    aka: ['E-HERO Neos'],
    text: 'A new Elemental HERO has arrived from Neo-Space! When he initiates a Contact Fusion with a Neo-Spacian, his unknown powers are unleashed.',
    related: ['dark-magician', 'stardust-dragon'],
    duelists: ['jaden-yuki'],
    episodes: ['the-next-king-of-games']
  },
  {
    slug: 'number-39-utopia',
    name: 'Number 39: Utopia',
    level: 4,
    type: 'Xyz Monster / Effect Monster',
    attribute: 'LIGHT',
    race: 'Warrior',
    atk: 2500,
    def: 2000,
    aka: ['Numbers 39: King of Wishes, Hope'],
    text: '2 Level 4 monsters. When a monster declares an attack: You can detach 1 material; negate the attack.',
    related: ['stardust-dragon', 'odd-eyes-dragon'],
    duelists: ['yuma-tsukumo'],
    episodes: ['go-with-the-flow-part-1', 'go-with-the-flow-part-2', 'forever-zexal']
  },
  {
    slug: 'odd-eyes-dragon',
    name: 'Odd-Eyes Dragon',
    level: 4,
    type: 'Effect Monster',
    attribute: 'DARK',
    race: 'Dragon',
    atk: 2500,
    def: 2000,
    aka: ['Odd-Eyes'],
    text: 'If this card destroys an opponent\'s monster by battle: Inflict damage to your opponent equal to half that monster\'s ATK.',
    related: ['number-39-utopia', 'dark-magician'],
    duelists: ['yuya-sakaki'],
    episodes: []
  },
  {
    slug: 'stardust-dragon',
    name: 'Stardust Dragon',
    level: 5,
    type: 'Synchro Monster / Effect Monster',
    attribute: 'WIND',
    race: 'Dragon',
    atk: 2500,
    def: 2000,
    aka: ['Stardust'],
    text: '1 Tuner + 1 or more non-Tuner monsters. When a card or effect that would destroy a card(s) on the field activates: You can Tribute this card; negate the activation, and destroy it.',
    related: ['red-eyes-black-dragon', 'blue-eyes-white-dragon'],
    duelists: ['yusei-fudo'],
    episodes: ['on-your-mark-get-set-duel']
  },
  {
    slug: 'blue-eyes-white-dragon',
    name: 'Blue-Eyes White Dragon',
    level: 5,
    type: 'Normal Monster',
    attribute: 'LIGHT',
    race: 'Dragon',
    atk: 3000,
    def: 2500,
    aka: ['Blue-Eyes'],
    text: 'This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and lived to tell the tale.',
    related: ['dark-magician', 'red-eyes-black-dragon', 'exodia-the-forbidden-one'],
    duelists: ['seto-kaiba'],
    episodes: ['the-heart-of-the-cards', 'the-gauntlet-is-thrown']
  },
  {
    slug: 'red-eyes-black-dragon',
    name: 'Red-Eyes Black Dragon',
    level: 5,
    type: 'Normal Monster',
    attribute: 'DARK',
    race: 'Dragon',
    atk: 2400,
    def: 2000,
    aka: ['Red-Eyes B. Dragon'],
    text: 'A ferocious dragon with a deadly attack.',
    related: ['dark-magician', 'blue-eyes-white-dragon'],
    duelists: ['joey-wheeler'],
    episodes: ['journey-to-the-duelist-kingdom']
  },
  {
    slug: 'exodia-the-forbidden-one',
    name: 'Exodia the Forbidden One',
    level: 5,
    type: 'Effect Monster',
    attribute: 'DARK',
    race: 'Spellcaster',
    atk: 1000,
    def: 1000,
    aka: ['Exodia', 'The Forbidden One'],
    text: 'If you have "Right Leg of the Forbidden One", "Left Leg of the Forbidden One", "Right Arm of the Forbidden One" and "Left Arm of the Forbidden One" in addition to this card in your hand, you win the Duel.',
    related: ['dark-magician', 'blue-eyes-white-dragon'],
    duelists: ['yami-yugi', 'yugi-muto'],
    episodes: ['the-heart-of-the-cards']
  },
  /* --- Alphabetical grid cards --- */
  {
    slug: '100-year-awakening',
    name: '100-Year Awakening',
    level: 2,
    type: 'Trap',
    attribute: 'TRAP',
    race: 'Normal Trap',
    atk: null,
    def: null,
    aka: [],
    text: 'Target 1 face-up Xyz Monster you control; attach this card to it as material.',
    related: [],
    duelists: [],
    episodes: []
  },
  {
    slug: '4-starred-ladybug-of-doom',
    name: '4-Starred Ladybug of Doom',
    level: 2,
    type: 'Monster',
    attribute: 'WIND',
    race: 'Insect',
    atk: 800,
    def: 1200,
    aka: [],
    text: 'FLIP: Destroy all Level 4 monsters your opponent controls.',
    related: [],
    duelists: [],
    episodes: []
  },
  {
    slug: '8-claws-scorpion',
    name: '8-Claws Scorpion',
    level: 1,
    type: 'Monster',
    attribute: 'DARK',
    race: 'Insect',
    atk: 300,
    def: 200,
    aka: [],
    text: 'If this card attacks a face-down Defense Position monster, this card\'s ATK becomes 2400 during damage calculation only.',
    related: [],
    duelists: [],
    episodes: []
  },
  {
    slug: 'a-deal-with-dark-ruler',
    name: 'A Deal with Dark Ruler',
    level: 2,
    type: 'Spell',
    attribute: 'SPELL',
    race: 'Quick-Play Spell',
    atk: null,
    def: null,
    aka: [],
    text: 'If a Level 8 or higher monster is sent to your GY: Special Summon 1 "Berserk Dragon" from your hand or Deck.',
    related: [],
    duelists: [],
    episodes: []
  },
  {
    slug: 'a-feather-of-the-phoenix',
    name: 'A Feather of the Phoenix',
    level: 2,
    type: 'Spell',
    attribute: 'SPELL',
    race: 'Normal Spell',
    atk: null,
    def: null,
    aka: [],
    text: 'Discard 1 card, then target 1 card in your GY; return that target to the top of your Deck.',
    related: [],
    duelists: [],
    episodes: []
  },
  {
    slug: 'a-hero-emerges',
    name: 'A Hero Emerges',
    level: 2,
    type: 'Trap',
    attribute: 'TRAP',
    race: 'Normal Trap',
    atk: null,
    def: null,
    aka: [],
    text: 'When an opponent\'s monster declares an attack: Your opponent chooses 1 random card from your hand; if it is a monster, Special Summon it.',
    related: ['elemental-hero-neos'],
    duelists: ['jaden-yuki'],
    episodes: []
  },
  {
    slug: 'a-legendary-ocean',
    name: 'A Legendary Ocean',
    level: 2,
    type: 'Spell',
    attribute: 'SPELL',
    race: 'Field Spell',
    atk: null,
    def: null,
    aka: ['Umi'],
    text: 'This card\'s name becomes "Umi" while on the field. All WATER monsters gain 200 ATK/DEF. Reduce the Level of all WATER monsters in hands and on the field by 1.',
    related: [],
    duelists: [],
    episodes: []
  },
  {
    slug: 'a-wingbeat-of-giant-dragon',
    name: 'A Wingbeat of Giant Dragon',
    level: 2,
    type: 'Spell',
    attribute: 'SPELL',
    race: 'Normal Spell',
    atk: null,
    def: null,
    aka: [],
    text: 'Return 1 Level 5 or higher Dragon monster you control to the hand, and destroy all Spell/Trap Cards on the field.',
    related: ['blue-eyes-white-dragon'],
    duelists: [],
    episodes: []
  },
  {
    slug: 'ad-changer',
    name: 'A/D Changer',
    level: 1,
    type: 'Monster',
    attribute: 'LIGHT',
    race: 'Warrior',
    atk: 100,
    def: 100,
    aka: [],
    text: 'You can banish this card from your GY, then target 1 monster on the field; change that target\'s battle position.',
    related: [],
    duelists: [],
    episodes: []
  },
  {
    slug: 'abaki',
    name: 'Abaki',
    level: 2,
    type: 'Monster',
    attribute: 'FIRE',
    race: 'Fiend',
    atk: 1700,
    def: 1100,
    aka: [],
    text: 'When this card is destroyed by battle: Both players take 500 damage.',
    related: [],
    duelists: [],
    episodes: []
  },
  {
    slug: 'absorb-spell',
    name: 'Absorb Spell',
    level: 1,
    type: 'Spell',
    attribute: 'SPELL',
    race: 'Normal Spell',
    atk: null,
    def: null,
    aka: [],
    text: 'When a Spell Card is activated: Gain 500 LP.',
    related: [],
    duelists: [],
    episodes: []
  },
  {
    slug: 'absurd-stealer',
    name: 'Absurd Stealer',
    level: 1,
    type: 'Monster',
    attribute: 'DARK',
    race: 'Fiend',
    atk: 100,
    def: 0,
    aka: [],
    text: 'If this card is used as Synchro Material: Draw 1 card.',
    related: [],
    duelists: [],
    episodes: []
  },
  {
    slug: 'acceleration-zone',
    name: 'Acceleration Zone',
    level: 1,
    type: 'Trap',
    attribute: 'TRAP',
    race: 'Normal Trap',
    atk: null,
    def: null,
    aka: [],
    text: 'Draw 2 cards, then discard 1 card.',
    related: [],
    duelists: [],
    episodes: []
  },
  {
    slug: 'accelight',
    name: 'Accelight',
    level: 1,
    type: 'Spell',
    attribute: 'SPELL',
    race: 'Normal Spell',
    atk: null,
    def: null,
    aka: [],
    text: 'Special Summon 1 Level 4 or lower "Photon" or "Galaxy" monster from your Deck.',
    related: ['number-39-utopia'],
    duelists: [],
    episodes: []
  },
  {
    slug: 'ace-of-sword',
    name: 'Ace of Sword',
    level: 1,
    type: 'Monster',
    attribute: 'LIGHT',
    race: 'Fairy',
    atk: 700,
    def: 300,
    aka: [],
    text: 'A mystical fairy wielding a powerful enchanted sword.',
    related: ['ace-of-wand'],
    duelists: [],
    episodes: []
  },
  {
    slug: 'ace-of-wand',
    name: 'Ace of Wand',
    level: 1,
    type: 'Monster',
    attribute: 'FIRE',
    race: 'Spellcaster',
    atk: 600,
    def: 400,
    aka: [],
    text: 'A mystical spellcaster channeling the power of the wand.',
    related: ['ace-of-sword'],
    duelists: [],
    episodes: []
  },
  {
    slug: 'acheche-archer',
    name: 'Acheche Archer',
    level: 1,
    type: 'Monster',
    attribute: 'FIRE',
    race: 'Warrior',
    atk: 1400,
    def: 200,
    aka: [],
    text: 'When an Xyz Monster you control is destroyed: Inflict 600 damage to your opponent.',
    related: ['acheche-chambers'],
    duelists: [],
    episodes: []
  },
  {
    slug: 'acheche-chambers',
    name: 'Acheche Chambers',
    level: 1,
    type: 'Spell',
    attribute: 'SPELL',
    race: 'Continuous Spell',
    atk: null,
    def: null,
    aka: [],
    text: 'Each time an Xyz Monster you control is Xyz Summoned: Draw 1 card.',
    related: ['acheche-archer'],
    duelists: [],
    episodes: []
  },
  {
    slug: 'acorno',
    name: 'Acorno',
    level: 1,
    type: 'Monster',
    attribute: 'EARTH',
    race: 'Plant',
    atk: 200,
    def: 400,
    aka: [],
    text: 'When this card is sent to the GY: Special Summon 1 "Pinecono" from your Deck.',
    related: [],
    duelists: [],
    episodes: []
  },
  {
    slug: 'acrobat-monkey',
    name: 'Acrobat Monkey',
    level: 2,
    type: 'Monster',
    attribute: 'EARTH',
    race: 'Machine',
    atk: 1000,
    def: 1800,
    aka: [],
    text: 'An acrobatic monkey robot. Its dexterity allows it to avoid almost any attack.',
    related: [],
    duelists: [],
    episodes: []
  },
  {
    slug: 'active-guard',
    name: 'Active Guard',
    level: 2,
    type: 'Monster',
    attribute: 'EARTH',
    race: 'Rock',
    atk: 300,
    def: 1600,
    aka: [],
    text: 'During the End Phase, if this card was flipped face-up this turn: Gain LP equal to the damage you took this turn.',
    related: [],
    duelists: [],
    episodes: []
  },
  {
    slug: 'adamantine-sword-revival',
    name: 'Adamantine Sword Revival',
    level: 2,
    type: 'Trap',
    attribute: 'TRAP',
    race: 'Normal Trap',
    atk: null,
    def: null,
    aka: [],
    text: 'Target 1 monster in your GY; Special Summon it in Defense Position, and equip it with this card. It gains 500 DEF.',
    related: [],
    duelists: [],
    episodes: []
  },
  {
    slug: 'adapt-to-adversity',
    name: 'Adapt to Adversity',
    level: 1,
    type: 'Trap',
    attribute: 'TRAP',
    race: 'Counter Trap',
    atk: null,
    def: null,
    aka: [],
    text: 'When a card or effect is activated that targets a card you control: Negate the activation, and destroy it.',
    related: [],
    duelists: [],
    episodes: []
  },
  {
    slug: 'advance-draw',
    name: 'Advance Draw',
    level: 1,
    type: 'Spell',
    attribute: 'SPELL',
    race: 'Normal Spell',
    atk: null,
    def: null,
    aka: [],
    text: 'Tribute 1 Level 8 or higher monster; draw 2 cards.',
    related: [],
    duelists: [],
    episodes: []
  }
];

/* ===== 7. WATCH PAGE PROMO BANNERS ===== */
const WATCH_BANNERS = [
  {
    slug: 'banner-01',
    title: 'SEE WHERE IT ALL BEGAN',
    subtitle: "Watch Yu-Gi-Oh! from the very beginning!",
    link: 'watch.html#series=yu-gi-oh'
  },
  {
    slug: 'banner-02',
    title: 'YU-GI-OH! ZEXAL',
    subtitle: 'Every episode of ZEXAL now available streaming.',
    link: 'watch.html#series=zexal'
  },
  {
    slug: 'banner-03',
    title: 'DUEL SCHOOL',
    subtitle: 'Watch Yu-Gi-Oh! GX from the very beginning!',
    link: 'watch.html#series=gx'
  }
];

/* ===== 8. HELPER: Characters / cards referenced in allies/relatives but not in main arrays ===== */
/* These are non-playable characters referenced as allies or relatives.
   The rendering code gracefully falls back to placeholder images for these. */
const EXTRA_NAMES = {
  'solomon-muto': 'Solomon Muto',
  'serenity-wheeler': 'Serenity Wheeler',
  'mokuba-kaiba': 'Mokuba Kaiba',
  'ishizu-ishtar': 'Ishizu Ishtar',
  'mako-tsunami': 'Mako Tsunami',
  'tea-gardner': 'Tea Gardner',
  'tristan-taylor': 'Tristan Taylor'
};

/* ===== 9. HELPER FUNCTIONS (used by script.js) ===== */

/** Look up any name by slug — searches CHARACTERS, CARDS, and EXTRA_NAMES */
function getNameBySlug(slug) {
  var c = CHARACTERS.find(function(ch) { return ch.slug === slug; });
  if (c) return c.name;
  var card = CARDS.find(function(cd) { return cd.slug === slug; });
  if (card) return card.name;
  if (EXTRA_NAMES[slug]) return EXTRA_NAMES[slug];
  // Convert slug to title case as fallback
  return slug.replace(/-/g, ' ').replace(/\b\w/g, function(l) { return l.toUpperCase(); });
}

/** Build image path from folder and slug */
function imgPath(folder, slug, ext) {
  ext = ext || (folder === 'characters' ? 'png' : 'jpg');
  return 'assets/images/' + folder + '/' + slug + '.' + ext;
}

/** Placeholder path */
var PLACEHOLDER = 'assets/images/ui/placeholder.svg';
