const express = require('express');
const app = express();
const port = 3000;

const products = [
  {
    "id": 1,
    "title": "Quantum Quest: Galactic Odyssey",
    "description": "Embark on a mind-bending adventure across space and time in this immersive virtual reality game. Unleash your cosmic powers, solve mind-boggling puzzles, and discover hidden realms in a universe where the laws of physics are yours to bend.",
    "price": 59.99,
    "stock": 10,
    "keywords": ["adventure", "virtual reality", "puzzles", "cosmic", "hidden realms"]
  },
  {
    "id": 2,
    "title": "Pixel Warriors: Legends of the Mystic Realms",
    "description": "Immerse yourself in an enchanting pixelated world where ancient warriors come to life. Join forces with mythical creatures, master powerful spells, and engage in epic battles against fearsome beasts. Uncover the secrets of the Mystic Realms and become a true legend.",
    "price": 49.99,
    "stock": 5,
    "keywords": ["pixelated", "warriors", "mythical creatures", "spells", "epic battles"]
  },
  {
    "id": 3,
    "title": "CyberStrike: Neon Nemesis",
    "description": "Step into a neon-lit, cyberpunk cityscape as an elite hacker in this action-packed game. Engage in high-speed, adrenaline-pumping combat, hack into rival factions' systems, and manipulate the digital world to outsmart your enemies. With cutting-edge weapons and advanced hacking abilities, become the ultimate Neon Nemesis.",
    "price": 39.99,
    "stock": 15,
    "keywords": ["cyberpunk", "hacker", "action-packed", "combat", "digital world"]
  },
  {
    "id": 4,
    "title": "Mythical Mayhem: Realm Conqueror",
    "description": "Enter a world of mythical creatures and legendary battles. Choose your hero, harness elemental powers, and embark on a quest to conquer the realms. Unleash devastating attacks, summon mythical allies, and rise as the ultimate Realm Conqueror.",
    "price": 54.99,
    "stock": 8,
    "keywords": ["mythical creatures", "battles", "powers", "quest", "conquer"]
  },
  {
    "id": 5,
    "title": "Retro Racer: Turbo Blitz",
    "description": "Strap in and rev up for a nostalgic racing experience. Race through neon-lit city streets, dodge obstacles, and compete against AI opponents. Upgrade your vehicles, unlock new tracks, and unleash turbo boosts to secure victory in Retro Racer: Turbo Blitz.",
    "price": 29.99,
    "stock": 12,
    "keywords": ["retro", "racing", "neon-lit", "upgrades", "turbo boosts"]
  },
  {
    "id": 6,
    "title": "Fantasy Frontier: Kingdoms Clash",
    "description": "Embark on a journey through fantastical lands and build your kingdom from scratch. Gather resources, recruit heroes, and wage epic battles against other kingdoms. Expand your influence, forge alliances, and let your kingdom reign supreme in Fantasy Frontier: Kingdoms Clash.",
    "price": 44.99,
    "stock": 6,
    "keywords": ["fantasy", "kingdom-building", "heroes", "epic battles", "alliances"]
  },
  {
    "id": 7,
    "title": "Steampunk Solitude: Clockwork Chronicles",
    "description": "Enter a Victorian-era world powered by steam and intricate clockwork mechanisms. Solve challenging puzzles, navigate mesmerizing environments, and uncover the secrets of the Clockwork Chronicles. Immerse yourself in a steampunk adventure like no other.",
    "price": 49.99,
    "stock": 10,
    "keywords": ["steampunk", "puzzles", "clockwork", "Victorian", "adventure"]
  },
  {
    "id": 8,
    "title": "Galactic Guardians: Stellar Warfare",
    "description": "Command a fleet of powerful starships and engage in intense interstellar battles. Strategize, upgrade your vessels, and defend the galaxy against alien invasions. Lead the Galactic Guardians to victory in the epic saga of Stellar Warfare.",
    "price": 64.99,
    "stock": 3,
    "keywords": ["galactic", "starships", "interstellar battles", "strategy", "alien invasions"]
  },
  {
    "id": 9,
    "title": "Mystic Mage: Arcane Chronicles",
    "description": "Unleash your inner mage and delve into the world of arcane arts. Learn powerful spells, solve mystifying puzzles, and navigate treacherous dungeons. Uncover ancient secrets and become the renowned Mystic Mage in the legendary Arcane Chronicles.",
    "price": 54.99,
    "stock": 7,
    "keywords": ["mage", "arcane arts", "spells", "puzzles", "dungeons"]
  },
  {
    "id": 10,
    "title": "Apocalypse Arena: Survival Showdown",
    "description": "In a post-apocalyptic wasteland, fight for survival in brutal arena battles. Customize your warrior, scavenge for resources, and outmaneuver adversaries. Only the strongest will prevail in the unforgiving Apocalypse Arena: Survival Showdown.",
    "price": 39.99,
    "stock": 9,
    "keywords": ["post-apocalyptic", "arena battles", "survival", "customization", "resource scavenging"]
  }
]


app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/bienvenida', (req, res) => {
  res.send('<p style="color: blue">Hola a todos!</p>');
});

app.get('/user', (req, res) => {
  res.send({
    nombre: "Juan",
    edad: 25
  });
});

app.get('/products', (req, res) => {
  const { search } = req.query

  if (search) {
    res.send(products.filter(v => v.keywords.includes(search)));
  } else {
    res.send(products);
  }
  
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params
  for (const p of products) {
    if (id == p.id) {
      res.send(p)
      return
    }
  }

  res.sendStatus(404)
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});