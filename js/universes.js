// ==========================================
// FEATURE 10: UNIVERSES (Linear Card Sequence + Complete Film & Series Rosters)
// ==========================================
(function(){
  const $=id=>document.getElementById(id);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  // Node format: [name, year, chronoRank, firstTimerOrder (0 = optional/skip), role ('start'|'essential'|'skip'|''), prefType ('movie'|'show'), linkType]
  const U=[
    {
      k:'mcu', n:'Marvel Cinematic Universe', c:'#ef4444', start:'Iron Man',
      N:[
        // Phase 1
        ['Iron Man',2008,3,1,'start','movie','launches the Infinity Saga'],
        ['The Incredible Hulk',2008,4,0,'skip','movie','crossover with Stark'],
        ['Iron Man 2',2010,5,2,'','movie','introduces Black Widow & SHIELD'],
        ['Thor',2011,6,3,'','movie','introduces Asgard & Loki'],
        ['Captain America: The First Avenger',2011,1,4,'essential','movie','introduces the Tesseract'],
        ['The Avengers',2012,7,5,'essential','movie','Phase 1 crossover finale'],
        // Phase 2 & Early Series
        ['Iron Man 3',2013,8,6,'','movie','post-New York aftermath'],
        ['Agents of S.H.I.E.L.D.',2013,9,0,'skip','show','Coulson leads SHIELD team'],
        ['Thor: The Dark World',2013,10,7,'','movie','introduces the Reality Stone'],
        ['Captain America: The Winter Soldier',2014,11,8,'essential','movie','the fall of SHIELD'],
        ['Guardians of the Galaxy',2014,12,9,'essential','movie','introduces the Power Stone'],
        ['Agent Carter',2015,2,0,'skip','show','SSR origins after WWII'],
        ['Daredevil',2015,14,10,'essential','show','Hell\'s Kitchen street saga'],
        ['Avengers: Age of Ultron',2015,15,11,'essential','movie','introduces Vision & Wanda'],
        ['Ant-Man',2015,16,12,'','movie','introduces the Quantum Realm'],
        ['Jessica Jones',2015,17,0,'skip','show','Defenders street-level noir'],
        // Phase 3 & Defenders Saga
        ['Captain America: Civil War',2016,18,13,'essential','movie','fractures the Avengers'],
        ['Luke Cage',2016,19,0,'skip','show','Harlem hero crossover'],
        ['Doctor Strange',2016,20,14,'essential','movie','introduces the Time Stone'],
        ['Iron Fist',2017,21,0,'skip','show','leads into The Defenders'],
        ['Guardians of the Galaxy Vol. 2',2017,13,15,'','movie','cosmic family sequel'],
        ['Spider-Man: Homecoming',2017,22,16,'','movie','Peter Parker\'s solo debut'],
        ['The Defenders',2017,23,0,'skip','show','street-level team-up series'],
        ['Thor: Ragnarok',2017,24,17,'essential','movie','leads directly into Infinity War'],
        ['The Punisher',2017,25,0,'skip','show','Daredevil spin-off series'],
        ['Black Panther',2018,26,18,'essential','movie','introduces Wakanda'],
        ['Avengers: Infinity War',2018,27,19,'essential','movie','Thanos collects the Stones'],
        ['Ant-Man and the Wasp',2018,28,20,'','movie','Quantum Realm post-credits'],
        ['Captain Marvel',2019,2,21,'','movie','1995 prequel & Fury origins'],
        ['Avengers: Endgame',2019,29,22,'essential','movie','Infinity Saga culmination'],
        ['Spider-Man: Far From Home',2019,30,23,'','movie','Infinity Saga epilogue'],
        // Phase 4 (Multiverse Saga)
        ['WandaVision',2021,31,24,'essential','show','transforms Wanda into Scarlet Witch'],
        ['The Falcon and the Winter Soldier',2021,32,25,'','show','Sam Wilson claims the shield'],
        ['Loki',2021,33,26,'essential','show','breaks open the Multiverse'],
        ['Black Widow',2021,26,27,'','movie','introduces Yelena Belova'],
        ['What If...?',2021,34,0,'skip','show','animated Multiverse anthology'],
        ['Shang-Chi and the Legend of the Ten Rings',2021,35,28,'','movie','introduces the Ten Rings'],
        ['Eternals',2021,36,0,'skip','movie','Celestials cosmic history'],
        ['Hawkeye',2021,37,29,'','show','introduces Kate Bishop & Kingpin'],
        ['Spider-Man: No Way Home',2021,38,30,'essential','movie','three-generation Spider-Verse'],
        ['Moon Knight',2022,39,0,'skip','show','supernatural Egyptian avatar'],
        ['Doctor Strange in the Multiverse of Madness',2022,40,31,'essential','movie','WandaVision direct continuation'],
        ['Ms. Marvel',2022,41,32,'','show','introduces Kamala Khan'],
        ['Thor: Love and Thunder',2022,42,0,'skip','movie','Gorr the God Butcher arc'],
        ['She-Hulk: Attorney at Law',2022,43,0,'skip','show','Daredevil crossover comedy'],
        ['Black Panther: Wakanda Forever',2022,44,33,'essential','movie','introduces Namor & new Panther'],
        // Phase 5 & 6
        ['Ant-Man and the Wasp: Quantumania',2023,45,0,'skip','movie','Quantum Realm Kang conflict'],
        ['Guardians of the Galaxy Vol. 3',2023,46,34,'essential','movie','Guardians trilogy finale'],
        ['Secret Invasion',2023,47,0,'skip','show','Fury vs rogue Skrulls'],
        ['The Marvels',2023,48,0,'skip','movie','Captain Marvel, Monica & Kamala'],
        ['Echo',2024,49,0,'skip','show','Hawkeye & Daredevil spin-off'],
        ['Deadpool & Wolverine',2024,50,35,'essential','movie','TVA & Fox X-Men crossover'],
        ['Agatha All Along',2024,51,36,'','show','WandaVision dark sequel series'],
        ['Captain America: Brave New World',2025,52,37,'','movie','Sam Wilson vs Red Hulk'],
        ['Daredevil: Born Again',2025,53,38,'essential','show','Matt Murdock vs Mayor Fisk'],
        ['Thunderbolts*',2025,54,39,'essential','movie','anti-hero Avengers team-up'],
        ['Ironheart',2025,55,0,'skip','show','Wakanda Forever tech spin-off'],
        ['The Fantastic Four: First Steps',2025,56,40,'essential','movie','launches Marvel\'s First Family']
      ],
      E:[
        [0,2,'direct sequel'],[0,5,'crossover'],[3,5,'crossover'],[4,5,'crossover'],[5,13,'direct sequel'],
        [4,9,'direct sequel'],[9,16,'direct sequel'],[10,20,'direct sequel'],[16,25,'crossover'],[16,21,'crossover'],
        [23,26,'direct sequel'],[26,29,'direct sequel'],[29,30,'direct sequel'],[29,31,'direct sequel'],[29,33,'crossover'],
        [31,41,'direct sequel'],[30,39,'direct sequel'],[20,47,'direct sequel'],[12,54,'direct sequel'],[34,55,'crossover']
      ]
    },
    {
      k:'dc', n:'DCEU / DCU & Batman Saga', c:'#3b82f6', start:'Man of Steel',
      N:[
        // Dark Knight Trilogy (Elseworlds)
        ['Batman Begins',2005,1,1,'essential','movie','Dark Knight Trilogy Act I'],
        ['The Dark Knight',2008,2,2,'essential','movie','Dark Knight Trilogy Act II'],
        ['Watchmen',2009,3,0,'skip','movie','Zack Snyder graphic novel epic'],
        ['The Dark Knight Rises',2012,4,3,'essential','movie','Dark Knight Trilogy finale'],
        // DCEU Core
        ['Man of Steel',2013,6,4,'start','movie','launches the DCEU'],
        ['Batman v Superman: Dawn of Justice',2016,7,5,'essential','movie','introduces DCEU Batman & Wonder Woman'],
        ['Suicide Squad',2016,8,0,'skip','movie','introduces Harley Quinn & Task Force X'],
        ['Wonder Woman',2017,5,6,'essential','movie','WWI origin story'],
        ['Justice League',2017,9,0,'skip','movie','theatrical cut'],
        ['Aquaman',2018,11,7,'','movie','Atlantis solo blockbuster'],
        ['Shazam!',2019,12,8,'','movie','Billy Batson origin'],
        ['Joker',2019,13,9,'essential','movie','standalone Elseworlds origin'],
        ['Watchmen (Series)',2019,14,0,'skip','show','HBO sequel limited series'],
        ['Birds of Prey',2020,15,0,'skip','movie','Harley Quinn spin-off'],
        ['Zack Snyder\'s Justice League',2021,10,10,'essential','movie','definitive 4-hour Justice League'],
        ['The Suicide Squad',2021,16,11,'essential','movie','James Gunn\'s Task Force X'],
        ['Peacemaker',2022,17,12,'essential','show','direct series sequel to The Suicide Squad'],
        ['The Batman',2022,18,13,'essential','movie','Matt Reeves Gotham crime saga'],
        ['Black Adam',2022,19,0,'skip','movie','introduces the Justice Society'],
        ['Shazam! Fury of the Gods',2023,20,0,'skip','movie','Shazam family sequel'],
        ['The Flash',2023,21,0,'skip','movie','Flashpoint multiverse reset'],
        ['Blue Beetle',2023,22,14,'','movie','Jaime Reyes origin'],
        ['Aquaman and the Lost Kingdom',2023,23,0,'skip','movie','DCEU final chapter'],
        ['The Penguin',2024,24,15,'essential','show','direct series bridge from The Batman'],
        ['Joker: Folie à Deux',2024,25,0,'skip','movie','Joker musical sequel'],
        ['Creature Commandos',2024,26,16,'','show','kicks off the new DCU Chapter 1'],
        ['Superman',2025,27,17,'essential','movie','flagship launch of the new DCU']
      ],
      E:[
        [0,1,'direct sequel'],[1,3,'direct sequel'],[4,5,'direct sequel'],[5,7,'prequel link'],
        [5,14,'direct sequel'],[6,15,'direct sequel'],[15,16,'direct sequel'],[17,23,'direct sequel'],
        [11,24,'direct sequel'],[16,25,'crossover'],[25,26,'crossover']
      ]
    },
    {
      k:'sw', n:'Star Wars Galaxy', c:'#facc15', start:'Star Wars: Episode IV - A New Hope',
      N:[
        ['Star Wars: Episode I - The Phantom Menace',1999,2,0,'skip','movie','Prequel Trilogy Episode I'],
        ['Star Wars: Episode II - Attack of the Clones',2002,3,6,'','movie','begins the Clone Wars'],
        ['Star Wars: The Clone Wars',2008,4,7,'essential','show','bridges Episode II & III'],
        ['Star Wars: Episode III - Revenge of the Sith',2005,5,8,'essential','movie','rise of Darth Vader'],
        ['Star Wars: The Bad Batch',2021,6,0,'skip','show','Clone Force 99 post-Order 66'],
        ['Solo: A Star Wars Story',2018,7,0,'skip','movie','young Han Solo & Chewbacca'],
        ['Obi-Wan Kenobi',2022,8,9,'','show','Kenobi & Vader rematch'],
        ['Andor',2022,10,4,'essential','show','prequel spy thriller to Rogue One'],
        ['Star Wars: Rebels',2014,9,10,'','show','Ghost crew & Rebel Alliance birth'],
        ['Rogue One: A Star Wars Story',2016,11,5,'essential','movie','stealing the Death Star plans'],
        ['Star Wars: Episode IV - A New Hope',1977,12,1,'start','movie','Original Trilogy Episode IV'],
        ['Star Wars: Episode V - The Empire Strikes Back',1980,13,2,'essential','movie','Original Trilogy Episode V'],
        ['Star Wars: Episode VI - Return of the Jedi',1983,14,3,'essential','movie','Original Trilogy finale'],
        ['The Mandalorian',2019,15,11,'essential','show','Din Djarin & Grogu saga'],
        ['The Book of Boba Fett',2021,16,0,'skip','show','Tatooine underworld & Mando bridge'],
        ['Ahsoka',2023,17,12,'','show','sequel to Rebels & The Mandalorian'],
        ['Skeleton Crew',2024,18,0,'skip','show','New Republic era adventure'],
        ['The Acolyte',2024,1,0,'skip','show','High Republic era mystery'],
        ['Star Wars: The Force Awakens',2015,19,13,'','movie','Sequel Trilogy Episode VII'],
        ['Star Wars: The Last Jedi',2017,20,14,'','movie','Sequel Trilogy Episode VIII'],
        ['Star Wars: The Rise of Skywalker',2019,21,15,'','movie','Skywalker Saga conclusion']
      ],
      E:[
        [0,1,'direct sequel'],[1,2,'direct sequel'],[2,3,'direct sequel'],[3,4,'direct sequel'],
        [7,9,'direct sequel'],[9,10,'direct sequel'],[10,11,'direct sequel'],[11,12,'direct sequel'],
        [12,13,'direct sequel'],[13,14,'crossover'],[13,15,'crossover'],[18,19,'direct sequel'],[19,20,'direct sequel']
      ]
    },
    {
      k:'conj', n:'The Conjuring Universe', c:'#a78bfa', start:'The Conjuring',
      N:[
        ['The Nun',2018,1,5,'','movie','1952 Valak origin in Romania'],
        ['Annabelle: Creation',2017,2,4,'','movie','1955 doll creation prequel'],
        ['The Nun II',2023,3,0,'skip','movie','1956 Valak sequel'],
        ['Annabelle',2014,4,0,'skip','movie','1967 Mia & John form link to The Conjuring'],
        ['The Conjuring',2013,5,1,'start','movie','1971 Perron family case'],
        ['Annabelle Comes Home',2019,6,6,'','movie','1972 Warrens artifact room'],
        ['The Curse of La Llorona',2019,7,0,'skip','movie','1973 Father Perez spin-off'],
        ['The Conjuring 2',2016,8,2,'essential','movie','1977 Enfield poltergeist'],
        ['The Conjuring: The Devil Made Me Do It',2021,9,3,'','movie','1981 Arne Johnson trial'],
        ['The Conjuring: Last Rites',2025,10,7,'essential','movie','Warrens final case conclusion']
      ],
      E:[
        [0,2,'direct sequel'],[1,3,'direct sequel'],[3,4,'prequel link'],[4,5,'direct sequel'],
        [4,7,'direct sequel'],[7,0,'crossover'],[7,8,'direct sequel'],[8,9,'direct sequel']
      ]
    },
    {
      k:'wiz', n:'Wizarding World', c:'#f59e0b', start:"Harry Potter and the Sorcerer's Stone",
      N:[
        ['Fantastic Beasts and Where to Find Them',2016,1,0,'skip','movie','1926 Newt Scamander prequel'],
        ['Fantastic Beasts: The Crimes of Grindelwald',2018,2,0,'skip','movie','1927 Dumbledore & Grindelwald'],
        ['Fantastic Beasts: The Secrets of Dumbledore',2022,3,0,'skip','movie','1932 wizarding war prelude'],
        ["Harry Potter and the Sorcerer's Stone",2001,4,1,'start','movie','Year 1 at Hogwarts'],
        ['Harry Potter and the Chamber of Secrets',2002,5,2,'','movie','Year 2 & first Horcrux'],
        ['Harry Potter and the Prisoner of Azkaban',2004,6,3,'essential','movie','Year 3 & Sirius Black'],
        ['Harry Potter and the Goblet of Fire',2005,7,4,'essential','movie','Year 4 & Voldemort\'s return'],
        ['Harry Potter and the Order of the Phoenix',2007,8,5,'','movie','Year 5 & Dumbledore\'s Army'],
        ['Harry Potter and the Half-Blood Prince',2009,9,6,'essential','movie','Year 6 & Horcrux secrets'],
        ['Harry Potter and the Deathly Hallows: Part 1',2010,10,7,'essential','movie','Year 7 hunt for Horcruxes'],
        ['Harry Potter and the Deathly Hallows: Part 2',2011,11,8,'essential','movie','Battle of Hogwarts finale']
      ],
      E:[
        [0,1,'direct sequel'],[1,2,'direct sequel'],[2,3,'prequel link'],[3,4,'direct sequel'],
        [4,5,'direct sequel'],[5,6,'direct sequel'],[6,7,'direct sequel'],[7,8,'direct sequel'],
        [8,9,'direct sequel'],[9,10,'direct sequel']
      ]
    },
    {
      k:'me', n:'Middle-earth Saga', c:'#22c55e', start:'The Lord of the Rings: The Fellowship of the Ring',
      N:[
        ['The Lord of the Rings: The Rings of Power',2022,1,0,'skip','show','Second Age forging of the Rings'],
        ['The Hobbit: An Unexpected Journey',2012,2,4,'','movie','Bilbo Baggins finds the One Ring'],
        ['The Hobbit: The Desolation of Smaug',2013,3,5,'','movie','Smaug & the Lonely Mountain'],
        ['The Hobbit: The Battle of the Five Armies',2014,4,6,'','movie','Hobbit trilogy conclusion'],
        ['The Lord of the Rings: The Fellowship of the Ring',2001,5,1,'start','movie','Frodo begins the quest'],
        ['The Lord of the Rings: The Two Towers',2002,6,2,'essential','movie','Battle of Helm\'s Deep'],
        ['The Lord of the Rings: The Return of the King',2003,7,3,'essential','movie','War of the Ring & Mount Doom']
      ],
      E:[
        [0,1,'prequel link'],[1,2,'direct sequel'],[2,3,'direct sequel'],[3,4,'prequel link'],
        [4,5,'direct sequel'],[5,6,'direct sequel']
      ]
    },
    {
      k:'mv', n:'Monsterverse', c:'#06b6d4', start:'Godzilla',
      N:[
        ['Kong: Skull Island',2017,1,2,'','movie','1973 Monarch expedition to Skull Island'],
        ['Godzilla',2014,2,1,'start','movie','2014 San Francisco Titan awakening'],
        ['Monarch: Legacy of Monsters',2023,3,3,'','show','bridges 1950s Monarch founders & 2015'],
        ['Godzilla: King of the Monsters',2019,4,4,'essential','movie','Ghidorah, Mothra & Rodan clash'],
        ['Godzilla vs. Kong',2021,5,5,'essential','movie','Apex Cybernetics & Hollow Earth'],
        ['Godzilla x Kong: The New Empire',2024,6,6,'','movie','Hollow Earth team-up']
      ],
      E:[
        [0,1,'prequel link'],[1,2,'direct sequel'],[2,3,'direct sequel'],[3,4,'direct sequel'],
        [0,4,'crossover'],[4,5,'direct sequel']
      ]
    },
    {
      k:'ff', n:'The Fast Saga', c:'#f97316', start:'The Fast and the Furious',
      N:[
        ['The Fast and the Furious',2001,1,1,'start','movie','LA street racing origins'],
        ['2 Fast 2 Furious',2003,2,0,'skip','movie','Brian & Roman in Miami'],
        ['The Fast and the Furious: Tokyo Drift',2006,6,5,'essential','movie','introduces Han in Tokyo'],
        ['Fast & Furious',2009,3,2,'','movie','reunites Dom & Brian'],
        ['Fast Five',2011,4,3,'essential','movie','Rio heist & Hobbs debut'],
        ['Fast & Furious 6',2013,5,4,'essential','movie','Owen Shaw & Tokyo Drift link'],
        ['Furious 7',2015,7,6,'essential','movie','Deckard Shaw & Paul Walker tribute'],
        ['The Fate of the Furious',2017,8,7,'','movie','Cipher cyber-terrorist arc'],
        ['Hobbs & Shaw',2019,9,0,'skip','movie','Hobbs & Deckard spin-off'],
        ['F9',2021,10,8,'','movie','Jakob Toretto & Han\'s return'],
        ['Fast X',2023,11,9,'essential','movie','Dante Reyes seeks vengeance for Rio']
      ],
      E:[
        [0,1,'direct sequel'],[0,3,'direct sequel'],[3,4,'direct sequel'],[4,5,'direct sequel'],
        [5,2,'post-credits tease'],[2,6,'direct sequel'],[6,7,'direct sequel'],[7,8,'crossover'],
        [7,9,'direct sequel'],[9,10,'direct sequel']
      ]
    },
    {
      k:'av', n:'Arrowverse', c:'#16a34a', start:'Arrow',
      N:[
        ['Arrow',2012,1,1,'start','show','Oliver Queen launches the Arrowverse'],
        ['The Flash (Series)',2014,2,2,'essential','show','Barry Allen & the Multiverse'],
        ['Constantine',2014,3,0,'skip','show','joins Legends of Tomorrow later'],
        ['Supergirl',2015,4,3,'','show','Earth-38 hero joins the crossover'],
        ['Legends of Tomorrow',2016,5,4,'','show','time-traveling team-up spin-off'],
        ['Black Lightning',2018,6,0,'skip','show','joins during Crisis on Infinite Earths'],
        ['Batwoman',2019,7,0,'skip','show','Gotham vigilante series'],
        ['Crisis on Infinite Earths',2019,8,5,'essential','show','5-show multiverse crossover event'],
        ['Superman & Lois',2021,9,6,'essential','show','acclaimed post-Crisis family drama']
      ],
      E:[
        [0,1,'crossover'],[1,3,'crossover'],[0,4,'crossover'],[2,4,'crossover'],
        [1,7,'direct sequel'],[3,7,'crossover'],[4,7,'crossover'],[7,8,'direct sequel']
      ]
    },
    {
      k:'who', n:'Whoniverse', c:'#2563eb', start:'Doctor Who',
      N:[
        ['Doctor Who',2005,1,1,'start','show','modern TARDIS revival (9th to 15th Doctors)'],
        ['Torchwood',2006,2,2,'essential','show','Captain Jack Harkness adult sci-fi spin-off'],
        ['Sarah Jane Adventures',2007,3,3,'','show','Sarah Jane Smith earthbound adventures'],
        ['Class',2016,4,0,'skip','show','Coal Hill Academy spin-off']
      ],
      E:[
        [0,1,'crossover'],[0,2,'crossover'],[1,2,'crossover'],[0,3,'post-credits tease']
      ]
    },
    {
      k:'st', n:'Star Trek Universe', c:'#38bdf8', start:'Star Trek: The Next Generation',
      N:[
        ['Star Trek: Enterprise',2001,1,0,'skip','show','22nd-century NX-01 Enterprise prequel'],
        ['Star Trek: Discovery',2017,2,6,'','show','23rd-to-32nd century Burnham saga'],
        ['Star Trek: Strange New Worlds',2022,3,2,'essential','show','Captain Pike\'s USS Enterprise'],
        ['Star Trek (Series)',1966,4,3,'essential','show','Kirk & Spock Original Series'],
        ['Star Trek: The Motion Picture',1979,5,0,'skip','movie','Original crew big-screen debut'],
        ['Star Trek II: The Wrath of Khan',1982,6,4,'essential','movie','Kirk vs Khan classic film'],
        ['Star Trek: The Next Generation',1987,7,1,'start','show','Picard & the Enterprise-D'],
        ['Star Trek: Deep Space Nine',1993,8,5,'essential','show','Dominion War space station epic'],
        ['Star Trek: Voyager',1995,9,7,'','show','Janeway in the Delta Quadrant'],
        ['Star Trek: First Contact',1996,10,8,'essential','movie','Picard vs the Borg Queen'],
        ['Star Trek',2009,11,9,'','movie','J.J. Abrams Kelvin timeline reboot'],
        ['Star Trek: Picard',2020,12,10,'','show','TNG & Seven of Nine reunion']
      ],
      E:[
        [0,2,'prequel link'],[1,2,'direct sequel'],[2,3,'prequel link'],[3,4,'direct sequel'],
        [4,5,'direct sequel'],[3,6,'crossover'],[6,7,'crossover'],[6,8,'crossover'],
        [6,9,'direct sequel'],[9,11,'direct sequel'],[3,10,'crossover']
      ]
    }    ,{
      k:'wick', n:'John Wick Continental', c:'#f43f5e', start:'John Wick',
      N:[
        ['John Wick',2014,1,1,'start','movie','Baba Yaga comes out of retirement'],
        ['John Wick: Chapter 2',2017,2,2,'essential','movie','blood oath in Rome & excommunicado'],
        ['John Wick: Chapter 3 - Parabellum',2019,3,3,'essential','movie','war against the High Table'],
        ['Ballerina',2025,4,0,'skip','movie','Ruska Roma assassin spin-off'],
        ['John Wick: Chapter 4',2023,5,4,'essential','movie','duel at Sacré-Cœur in Paris']
      ],
      E:[[0,1,'direct sequel'],[1,2,'direct sequel'],[2,3,'crossover'],[2,4,'direct sequel']]
    },
    {
      k:'matrix', n:'The Matrix Saga', c:'#10b981', start:'The Matrix',
      N:[
        ['The Matrix',1999,1,1,'start','movie','Neo awakens from the simulation'],
        ['The Matrix Reloaded',2003,2,2,'essential','movie','Zion siege & the Architect'],
        ['The Matrix Revolutions',2003,3,3,'essential','movie','Machine City truce & Neo vs Smith'],
        ['The Matrix Resurrections',2021,4,0,'skip','movie','legacy sequel 20 years later']
      ],
      E:[[0,1,'direct sequel'],[1,2,'direct sequel'],[2,3,'direct sequel']]
    },
    {
      k:'mi', n:'Mission: Impossible Saga', c:'#f59e0b', start:'Mission: Impossible',
      N:[
        ['Mission: Impossible',1996,1,1,'start','movie','Ethan Hunt framed in Prague'],
        ['Mission: Impossible III',2006,2,2,'','movie','Owen Davian & the Rabbits Foot'],
        ['Mission: Impossible - Ghost Protocol',2011,3,3,'essential','movie','Kremlin bombing & Burj Khalifa climb'],
        ['Mission: Impossible - Rogue Nation',2015,4,4,'essential','movie','introduces Ilsa Faust & the Syndicate'],
        ['Mission: Impossible - Fallout',2018,5,5,'essential','movie','Solomon Lane & plutonium showdown'],
        ['Mission: Impossible - Dead Reckoning Part One',2023,6,6,'essential','movie','the Entity AI global hunt'],
        ['Mission: Impossible - The Final Reckoning',2025,7,7,'essential','movie','culmination of Ethan Hunts saga']
      ],
      E:[[0,1,'direct sequel'],[1,2,'direct sequel'],[2,3,'direct sequel'],[3,4,'direct sequel'],[4,5,'direct sequel'],[5,6,'direct sequel']]
    },
    {
      k:'dune', n:'Dune Imperium', c:'#eab308', start:'Dune',
      N:[
        ['Dune: Prophecy',2024,1,0,'skip','show','10,000 years before Paul: Bene Gesserit origins'],
        ['Dune',2021,2,1,'start','movie','House Atreides arrives on Arrakis'],
        ['Dune: Part Two',2024,3,2,'essential','movie','Paul Atreides & Fremen holy war']
      ],
      E:[[0,1,'prequel link'],[1,2,'direct sequel']]
    },
    {
      k:'bb', n:'Breaking Bad & Saul Gilliganverse', c:'#84cc16', start:'Breaking Bad',
      N:[
        ['Better Call Saul',2015,1,2,'essential','show','Jimmy McGill transforms into Saul Goodman'],
        ['Breaking Bad',2008,2,1,'start','show','Walter White becomes Heisenberg'],
        ['El Camino: A Breaking Bad Movie',2019,3,3,'essential','movie','Jesse Pinkmans escape epilogue']
      ],
      E:[[0,1,'prequel link'],[1,2,'direct sequel']]
    },
    // INDIAN "CONNECTED FILMS" UNIVERSES (Compact Chronological Strip Format)
    {
      k:'yrf', n:'YRF Spy Universe (Indian Connected Films)', c:'#f97316', start:'Ek Tha Tiger', indianCompact:true,
      N:[
        ['Ek Tha Tiger',2012,1,1,'start','movie','RAW agent Tiger & ISI agent Zoya go rogue'],
        ['Tiger Zinda Hai',2017,2,2,'essential','movie','Tiger & Zoya reunite for Iraq hostage rescue'],
        ['War',2019,3,3,'essential','movie','introduces Kabir Dhaliwal in high-stakes mentor duel'],
        ['Pathaan',2023,4,4,'essential','movie','Pathaan & Tiger team up in mid-film crossover'],
        ['Tiger 3',2023,5,5,'essential','movie','Pathaan & Kabir cameo as Tiger faces Aatish']
      ],
      E:[[0,1,'direct sequel'],[1,3,'crossover'],[2,3,'crossover'],[3,4,'direct sequel']]
    },
    {
      k:'cop', n:'Rohit Shetty Cop Universe (Indian Connected Films)', c:'#dc2626', start:'Singham', indianCompact:true,
      N:[
        ['Singham',2011,1,1,'start','movie','Bajirao Singham takes on Jaykant Shikre'],
        ['Singham Returns',2014,2,2,'','movie','Singham battles Mumbai black-money nexus'],
        ['Simmba',2018,3,3,'essential','movie','Singham rescues Simmba & teases Sooryavanshi'],
        ['Sooryavanshi',2021,4,4,'essential','movie','ATS chief Sooryavanshi teams up with Singham & Simmba'],
        ['Singham Again',2024,5,5,'essential','movie','full Cop Universe crossover ensemble']
      ],
      E:[[0,1,'direct sequel'],[1,2,'crossover'],[2,3,'post-credits tease'],[3,4,'crossover']]
    },
    {
      k:'maddock', n:'Maddock Horror-Comedy Universe (Connected Films)', c:'#ec4899', start:'Stree', indianCompact:true,
      N:[
        ['Stree',2018,1,1,'start','movie','Chanderi folklore ghost & Vickys gang'],
        ['Bhediya',2022,2,2,'essential','movie','Arunachal werewolf curse; Vicky & Jana cameo'],
        ['Munjya',2024,3,3,'','movie','Konkan folklore spirit; Bhediya post-credits link'],
        ['Stree 2',2024,4,4,'essential','movie','Sarkata terror; Bhediya joins Chanderi climax']
      ],
      E:[[0,1,'crossover'],[1,2,'post-credits tease'],[1,3,'crossover'],[0,3,'direct sequel']]
    },
    {
      k:'lcu', n:'Lokesh Cinematic Universe / LCU (Connected Films)', c:'#06b6d4', start:'Kaithi', indianCompact:true,
      N:[
        ['Kaithi',2019,1,1,'start','movie','Dilli intercepts massive Trichy drug bust'],
        ['Vikram',2022,2,2,'essential','movie','Black Squad commander Vikram & Rolex; Dilli voice cameo'],
        ['Leo',2023,3,3,'essential','movie','Parthibans past collides with Vikram & Napolean']
      ],
      E:[[0,1,'crossover'],[1,2,'crossover']]
    },
    {
      k:'neel', n:'KGF & Salaar Universe (Indian Connected Films)', c:'#eab308', start:'KGF: Chapter 1', indianCompact:true,
      N:[
        ['KGF: Chapter 1',2018,1,1,'start','movie','Rocky rises through Kolar Gold Fields'],
        ['K.G.F: Chapter 2',2022,2,2,'essential','movie','Rocky rules Narachi & faces Adheera'],
        ['Salaar: Part 1 - Ceasefire',2023,3,3,'essential','movie','Deva & Varadha in Khansaar blood-throne war']
      ],
      E:[[0,1,'direct sequel'],[1,2,'crossover']]
    },
    {
      k:'munna', n:'Munna Bhai Duology (Indian Connected Films)', c:'#14b8a6', start:'Munna Bhai M.B.B.S.', indianCompact:true,
      N:[
        ['Munna Bhai M.B.B.S.',2003,1,1,'start','movie','Munna & Circuit bring jadoo ki jhappi to medical school'],
        ['Lage Raho Munna Bhai',2006,2,2,'essential','movie','Munna & Circuit reinvent Gandhigiri on the radio']
      ],
      E:[[0,1,'direct sequel']]
    }
  ];

  const ECOL={'crossover':'#f472b6','post-credits tease':'#facc15','direct sequel':'#60a5fa','prequel link':'#a3e635'};
  const ALIASES={
    'rogue one':'Rogue One: A Star Wars Story',
    'star wars: a new hope':'Star Wars: Episode IV - A New Hope',
    'star wars: the empire strikes back':'Star Wars: Episode V - The Empire Strikes Back',
    'star wars: return of the jedi':'Star Wars: Episode VI - Return of the Jedi',
    'star wars: the phantom menace':'Star Wars: Episode I - The Phantom Menace',
    'star wars: attack of the clones':'Star Wars: Episode II - Attack of the Clones',
    'star wars: revenge of the sith':'Star Wars: Episode III - Revenge of the Sith',
    "dc's legends of tomorrow":'Legends of Tomorrow',
    'the sarah jane adventures':'Sarah Jane Adventures',
    'star trek: the original series':'Star Trek (Series)',
    'the lord of the rings: the rings of power':'Rings of Power'
  };

  function dbFind(name, prefType){
    const raw=(ALIASES[name.toLowerCase()]||name).toLowerCase();
    const all=Object.values(globalDatabase);
    if(prefType){
      const byType=all.find(i=>i.type===prefType&&((i.cleanName||i.title).toLowerCase()===raw||i.title.toLowerCase()===raw||(i.rawName&&i.rawName.toLowerCase()===raw)));
      if(byType)return byType;
    }
    return all.find(i=>(i.cleanName||i.title).toLowerCase()===raw||i.title.toLowerCase()===raw||(i.rawName&&i.rawName.toLowerCase()===raw));
  }

  let seen=[];try{seen=JSON.parse(localStorage.getItem('cs_univ_seen')||'[]')}catch(e){}
  const key=(u,i)=>u.k+':'+i;
  const isSeen=(u,i)=>{const d=dbFind(u.N[i][0],u.N[i][5]);return seen.includes(key(u,i))||(d&&watchedTitles.includes(d.title));};

  function toggleSeen(u,i){
    const k=key(u,i),d=dbFind(u.N[i][0],u.N[i][5]),on=!isSeen(u,i);
    seen=seen.filter(x=>x!==k);if(on)seen.push(k);
    if(d){
      const has=watchedTitles.includes(d.title);
      if(on&&!has)watchedTitles.push(d.title);
      if(!on&&has)watchedTitles=watchedTitles.filter(t=>t!==d.title);
      updateAllCountersAndViews();
    }
    try{localStorage.setItem('cs_univ_seen',JSON.stringify(seen));}catch(e){}
  }

  const ring=(p,c)=>{const r=20,L=2*Math.PI*r;return`<svg viewBox="0 0 50 50" class="w-14 h-14 -rotate-90"><circle cx="25" cy="25" r="${r}" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="5"/><circle cx="25" cy="25" r="${r}" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-dasharray="${L*p} ${L}" style="transition:stroke-dasharray .8s"/></svg>`;};

  function grid(){
    $('uniGrid').innerHTML=U.map((u,ui)=>{
      const n=u.N.length,w=u.N.filter((_,i)=>isSeen(u,i)).length;
      const filmCnt=u.N.filter(nd=>nd[5]==='movie').length,showCnt=u.N.filter(nd=>nd[5]==='show').length;
      return`<button data-u="${ui}" class="text-left rounded-2xl p-4 border border-white/10 hover:border-white/25 hover:scale-[1.02] transition-all" style="background:linear-gradient(160deg,${u.c}38,#0b0d14 72%)">
        <div class="flex items-start justify-between gap-2">
          <div>
            <div class="text-base font-display font-extrabold text-white leading-tight">${esc(u.n)}</div>
            <div class="text-[11px] text-gray-400 mt-1">${filmCnt} film${filmCnt===1?'':'s'}${showCnt?` · ${showCnt} series`:''}</div>
          </div>
          <div class="relative shrink-0">${ring(w/n,u.c)}<span class="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-white">${w}/${n}</span></div>
        </div>
        <div class="text-xs text-gray-400 mt-3">Start with <b class="text-gray-200">${esc(u.start)}</b></div>
      </button>`;
    }).join('');
  }

  let cur=null,order='release',typeFilter='all',layoutMode='line',sel=null;

  function seq(u){
    let idx=u.N.map((_,i)=>i);
    if(typeFilter!=='all')idx=idx.filter(i=>u.N[i][5]===typeFilter);
    if(order==='release')return idx.sort((a,b)=>u.N[a][1]-u.N[b][1]||u.N[a][2]-u.N[b][2]);
    if(order==='chrono')return idx.sort((a,b)=>u.N[a][2]-u.N[b][2]);
    return idx.filter(i=>u.N[i][3]>0&&u.N[i][4]!=='skip').sort((a,b)=>u.N[a][3]-u.N[b][3]);
  }

  function view(){
    const u=cur,S=seq(u);
    const totalW=u.N.filter((_,i)=>isSeen(u,i)).length;
    const next=S.find(i=>!isSeen(u,i));
    if(sel==null||!S.includes(sel))sel=next!=null?next:S[0];

    const cardsHTML=S.map((i,stepIdx)=>{
      const nd=u.N[i],d=dbFind(nd[0],nd[5]),sn=isSeen(u,i),isNext=(i===next),isSel=(i===sel);
      const isW=d&&wishlistTitles.includes(d.title),isFav=d&&favTitles.includes(d.title);
      const fb=d?generateStylizedPosterDataURI(d):'';
      const posterUrl=d?(posterCache[d.type+':'+d.title]||fb):'';
      const attrT=d?esc(d.title):'';
      const escT=d?d.title.replace(/'/g,"\\'").replace(/"/g,"&quot;"):'';
      const roleMeta={
        start:{lbl:'Start Here',cls:'bg-brand-gold text-black'},
        essential:{lbl:'Essential',cls:'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'},
        skip:{lbl:'Optional',cls:'bg-white/10 text-gray-400'}
      }[nd[4]]||{lbl:'Core Chapter',cls:'bg-white/10 text-gray-200'};

      // Check relationship to next card in line
      const nextNodeIdx=S[stepIdx+1];
      const directEdge=nextNodeIdx!=null?u.E.find(([a,b])=>(a===i&&b===nextNodeIdx)||(b===i&&a===nextNodeIdx)):null;
      const edgeType=directEdge?directEdge[2]:(stepIdx<S.length-1?'next in order':null);
      const edgeColor=directEdge?(ECOL[directEdge[2]]||u.c):'#64748b';

      const cardBox=`
        <div class="uni-node group relative ${layoutMode==='line'?'w-48 sm:w-52 shrink-0 snap-start':'w-full'} rounded-2xl overflow-hidden bg-brand-card border-2 transition-all cursor-pointer flex flex-col ${isSel?'border-brand-gold shadow-xl shadow-brand-gold/20':sn?'border-emerald-500/50':'border-white/10 hover:border-white/30'} ${isNext?'uni-next-card':''}" data-i="${i}">
          <div class="relative poster-aspect w-full overflow-hidden bg-[#0c0f16]">
            ${d?`<img src="${posterUrl}" data-title="${attrT}" onerror="this.onerror=null;this.src='${fb}';" alt="${attrT}" class="lazy-poster w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy"/>`:''}
            <div class="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-transparent to-black/40 opacity-90"></div>
            <div class="absolute top-2.5 left-2.5 flex items-center gap-1.5">
              <span class="px-2 py-0.5 rounded-lg bg-black/85 text-white font-display font-extrabold text-xs border border-white/20">#${stepIdx+1}</span>
              ${d?`<span class="px-2 py-0.5 rounded-lg bg-black/80 text-brand-gold font-extrabold text-[11px] border border-brand-gold/30">★ ${d.rating}</span>`:''}
            </div>
            <div class="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
              ${d?`<button data-wish-btn="${attrT}" onclick="toggleWishlist('${escT}', event)" title="Toggle Watchlist" class="w-8 h-8 rounded-full flex items-center justify-center transition-all ${isW?'bg-rose-500 text-white shadow-lg':'bg-black/70 text-gray-300 hover:bg-black hover:text-white'}"><i class="fa-solid fa-heart text-xs"></i></button>`:''}
              <button data-seen-idx="${i}" title="Mark Watched" class="uni-seen-btn w-8 h-8 rounded-full flex items-center justify-center transition-all ${sn?'bg-emerald-500 text-black shadow-lg':'bg-black/70 text-gray-300 hover:bg-black hover:text-white'}"><i class="fa-solid fa-check text-xs"></i></button>
              ${d?`<button data-fav-btn="${attrT}" onclick="toggleFav('${escT}', event)" title="Toggle Favourite" class="w-8 h-8 rounded-full flex items-center justify-center transition-all ${isFav?'bg-brand-gold text-black shadow-lg':'bg-black/70 text-gray-300 hover:bg-black hover:text-white'}"><i class="fa-solid fa-star text-xs"></i></button>`:''}
            </div>
            <div class="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1">
              <span class="text-[10px] font-bold px-2 py-0.5 rounded ${roleMeta.cls}">${roleMeta.lbl}</span>
              <span class="text-[10px] font-semibold text-gray-200 bg-black/75 px-2 py-0.5 rounded">${nd[5]==='show'?'TV Series':'Film'} · ${nd[1]}</span>
            </div>
          </div>
          <div class="p-3 flex-1 flex flex-col justify-between space-y-2">
            <div>
              <div class="text-[10px] font-bold uppercase tracking-wider text-gray-400">${d?esc(d.genre):'Franchise'} · ${d?esc(d.platformName):''}</div>
              <h4 class="font-bold text-xs sm:text-sm text-white group-hover:text-brand-gold transition-colors line-clamp-1" title="${esc(nd[0])}">${esc(nd[0])}</h4>
              <p class="text-[11px] text-gray-400 line-clamp-1 mt-0.5">${esc(nd[6]||'')}</p>
            </div>
            <div class="pt-1.5 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span class="${sn?'text-emerald-400 font-bold':isNext?'text-brand-gold font-bold':'text-gray-400'}">${sn?'✓ Watched':isNext?'▶ Up Next':'Unwatched'}</span>
              ${d?`<button data-open-title="${attrT}" class="uni-card-open text-brand-gold hover:underline font-semibold">Details →</button>`:''}
            </div>
          </div>
        </div>`;

      if(layoutMode==='line'){
        const arrow=stepIdx<S.length-1?`<div class="flex flex-col items-center justify-center px-1.5 shrink-0 select-none"><div class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 mb-1 whitespace-nowrap" style="color:${edgeColor}">${esc(edgeType)}</div><div class="w-8 h-0.5 rounded" style="background:${edgeColor}"></div><i class="fa-solid fa-chevron-right text-xs mt-1" style="color:${edgeColor}"></i></div>`:'';
        return`<div class="flex items-center shrink-0 snap-start">${cardBox}${arrow}</div>`;
      }
      return cardBox;
    }).join('');

    const legend=Object.entries(ECOL).map(([t,c])=>`<span class="flex items-center gap-1.5"><i style="background:${c}" class="w-4 h-1 rounded"></i>${t}</span>`).join('');

    $('uniView').innerHTML=`
      <div class="glass-card rounded-3xl border border-white/10 p-4 sm:p-5 space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <button id="uniBack" class="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs sm:text-sm font-bold text-gray-200"><i class="fa-solid fa-arrow-left mr-1.5"></i>All universes</button>
            <div>
              <h2 class="text-xl sm:text-2xl font-display font-extrabold text-white">${esc(u.n)}</h2>
              <div class="text-xs text-gray-400">${totalW} of ${u.N.length} watched · Showing ${S.length} chapters in <b class="text-brand-gold">${order==='release'?'Release order':order==='chrono'?'Chronological order':'First-timer essential path'}</b></div>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <button id="uniWishAll" class="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-bold"><i class="fa-solid fa-heart mr-1"></i>Add Path to Watchlist</button>
            <div class="flex gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
              ${[['line','fa-arrows-left-right','Line'],['grid','fa-grip','Grid']].map(([m,ic,lbl])=>`<button data-layout="${m}" class="px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${layoutMode===m?'bg-brand-gold text-black':'text-gray-300 hover:text-white'}"><i class="fa-solid ${ic}"></i>${lbl}</button>`).join('')}
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
          <div class="flex flex-wrap gap-1.5">
            ${[['release','Release order'],['chrono','Chronological'],['path','First-timer path']].map(([k,l])=>`<button data-o="${k}" class="sub-pill ${order===k?'on':''}" style="min-width:0;flex-direction:row;padding:6px 13px;font-size:12px">${l}</button>`).join('')}
          </div>
          <div class="flex flex-wrap gap-1.5">
            ${[['all','All ('+u.N.length+')'],['movie','Movies ('+u.N.filter(x=>x[5]==='movie').length+')'],['show','Series ('+u.N.filter(x=>x[5]==='show').length+')']].map(([k,l])=>`<button data-tf="${k}" class="sub-pill ${typeFilter===k?'on':''}" style="min-width:0;flex-direction:row;padding:6px 12px;font-size:12px">${l}</button>`).join('')}
          </div>
        </div>

        ${layoutMode==='line'
          ? `<div class="has-arrows pt-1"><div id="uniTrack" class="hscroll flex items-stretch gap-1 overflow-x-auto pb-4 pt-2 snap-x">${cardsHTML}</div></div>`
          : `<div id="uniTrack" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-2">${cardsHTML}</div>`
        }

        <div class="flex flex-wrap items-center justify-between gap-3 text-[11px] text-gray-400 pt-1 border-t border-white/10">
          <div class="flex flex-wrap gap-4">${legend}</div>
          <div>Click any card to inspect its story connections · Glowing card is your next unwatched chapter</div>
        </div>
      </div>
      <div id="uniInfo" class="glass-card rounded-2xl border border-white/10 p-4 sm:p-5 text-sm text-gray-300"></div>`;

    const trackEl=$('uniTrack');
    attachThumbObservers(trackEl);
    if(layoutMode==='line')addHorizontalArrows(trackEl);
    if(sel!=null)info(sel);
  }

  function info(i){
    sel=i;const u=cur,nd=u.N[i];if(!nd)return;
    const sn=isSeen(u,i),d=dbFind(nd[0],nd[5]);
    const role={start:'Where to start',essential:'Essential chapter',skip:'Optional / Spin-off'}[nd[4]]||'Core chapter';
    const links=u.E.filter(e=>e[0]===i||e[1]===i).map(([a,b,t])=>{
      const otherIdx=a===i?b:a;
      return `<li class="cursor-pointer hover:text-white" data-jump="${otherIdx}"><span style="color:${ECOL[t]}" class="font-bold uppercase text-[11px]">${t}</span> ${a===i?'leads to':'connects from'} <b class="text-white underline decoration-white/30">${esc(u.N[otherIdx][0])}</b> (${u.N[otherIdx][1]})</li>`;
    }).join('');
    $('uniInfo').innerHTML=`<div class="flex flex-wrap items-center justify-between gap-3">
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-lg font-display font-bold text-white">${esc(nd[0])}</span>
          <span class="text-gray-400 text-xs">(${nd[1]} · ${nd[5]==='show'?'TV Series':'Film'}${d?' · ★ '+d.rating+' · '+d.platformName:''})</span>
          <span class="px-2.5 py-0.5 rounded-full border border-brand-gold/40 bg-brand-gold/10 text-brand-gold text-xs font-bold">${role}</span>
        </div>
        <p class="text-xs text-gray-400 mt-1">${esc(nd[6]||'Part of the '+u.n+' continuity.')}</p>
      </div>
      <div class="flex items-center gap-2">
        <button id="uniSeen" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold ${sn?'bg-emerald-500 text-black':'border border-white/20 text-gray-100 hover:bg-white/10'}">${sn?'✓ Watched':'Mark watched'}</button>
        ${d?`<button id="uniOpen" class="px-4 py-2 rounded-xl bg-brand-gold text-black text-xs sm:text-sm font-extrabold">Full Details & Trailer</button>`:''}
      </div>
    </div>
    <ul class="mt-3 text-xs space-y-1.5 list-disc list-inside text-gray-300">${links||'<li>Chronological chapter in the '+esc(u.n)+' timeline.</li>'}</ul>`;
    $('uniSeen').onclick=()=>{toggleSeen(u,i);view();};
    if($('uniOpen'))$('uniOpen').onclick=()=>openDetailModal(d.title);
    $('uniInfo').querySelectorAll('[data-jump]').forEach(li=>{
      li.onclick=()=>{const target=+li.dataset.jump;info(target);const card=$('uniTrack')&&$('uniTrack').querySelector(`[data-i="${target}"]`);if(card)card.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});};
    });
  }

  $('uniGrid').onclick=e=>{
    const b=e.target.closest('[data-u]');if(!b)return;
    cur=U[+b.dataset.u];sel=null;order='release';typeFilter='all';
    $('uniGrid').classList.add('hidden');$('uniView').classList.remove('hidden');view();
  };

  $('uniView').onclick=e=>{
    if(e.target.closest('#uniBack')){$('uniView').classList.add('hidden');$('uniGrid').classList.remove('hidden');grid();return;}
    if(e.target.closest('#uniWishAll')){
      const S=seq(cur);let added=0;
      S.forEach(i=>{const d=dbFind(cur.N[i][0],cur.N[i][5]);if(d&&!watchedTitles.includes(d.title)&&!wishlistTitles.includes(d.title)){wishlistTitles.push(d.title);added++;}});
      updateAllCountersAndViews();view();
      showToast(added?`Added ${added} unwatched ${cur.n} titles to your Watchlist!`:'All unwatched titles in this path are already on your Watchlist!','fa-heart','text-rose-400');
      return;
    }
    const lay=e.target.closest('[data-layout]');if(lay){layoutMode=lay.dataset.layout;view();return;}
    const o=e.target.closest('[data-o]');if(o){order=o.dataset.o;sel=null;view();return;}
    const tf=e.target.closest('[data-tf]');if(tf){typeFilter=tf.dataset.tf;sel=null;view();return;}
    const seenBtn=e.target.closest('.uni-seen-btn');
    if(seenBtn){e.stopPropagation();toggleSeen(cur,+seenBtn.dataset.seenIdx);view();return;}
    const openBtn=e.target.closest('.uni-card-open');
    if(openBtn){e.stopPropagation();openDetailModal(openBtn.dataset.openTitle);return;}
    const n=e.target.closest('.uni-node');
    if(n&&!e.target.closest('button')){const idx=+n.dataset.i;sel=idx;view();}
  };

  grid();
  const _sw=window.switchTab;window.switchTab=function(k){_sw.apply(this,arguments);if(k==='universes'&&!cur)grid();else if(k==='universes'&&!$('uniGrid').classList.contains('hidden'))grid();};
})();
