    // ==========================================
    // 1. EXPANDED ~2,100 TITLES DATABASE
    // ==========================================
    const rawMoviesCore = [
      ["The Shawshank Redemption","Drama",9.3,1994],["The Godfather","Crime",9.2,1972],["The Dark Knight","Action",9.0,2008],["The Godfather: Part II","Crime",9.0,1974],["12 Angry Men","Drama",9.0,1957],["Schindler's List","Drama",9.0,1993],["The Lord of the Rings: The Return of the King","Fantasy",9.0,2003],["Pulp Fiction","Crime",8.9,1994],["The Lord of the Rings: The Fellowship of the Ring","Fantasy",8.9,2001],["The Good, the Bad and the Ugly","Western",8.8,1966],["Forrest Gump","Drama",8.8,1994],["Fight Club","Drama",8.8,1999],["The Lord of the Rings: The Two Towers","Fantasy",8.8,2002],["Inception","Sci-Fi",8.8,2010],["Star Wars: Episode V - The Empire Strikes Back","Sci-Fi",8.7,1980],["The Matrix","Sci-Fi",8.7,1999],["Goodfellas","Crime",8.7,1990],["One Flew Over the Cuckoo's Nest","Drama",8.7,1975],["Se7en","Thriller",8.6,1995],["It's a Wonderful Life","Drama",8.6,1946],["Seven Samurai","Action",8.6,1954],["Interstellar","Sci-Fi",8.7,2014],["The Silence of the Lambs","Thriller",8.6,1991],["Saving Private Ryan","Action",8.6,1998],["City of God","Crime",8.6,2002],["Life Is Beautiful","Comedy",8.6,1997],["The Green Mile","Drama",8.6,1999],["Star Wars: Episode IV - A New Hope","Sci-Fi",8.6,1977],["Terminator 2: Judgment Day","Sci-Fi",8.6,1991],["Back to the Future","Sci-Fi",8.5,1985],["Spirited Away","Animation",8.6,2001],["The Pianist","Drama",8.5,2002],["Psycho","Horror",8.5,1960],["Parasite","Thriller",8.5,2019],["Leon: The Professional","Action",8.5,1994],["The Lion King","Animation",8.5,1994],["Gladiator","Action",8.5,2000],["American History X","Drama",8.5,1998],["The Departed","Crime",8.5,2006],["Whiplash","Drama",8.5,2014],["The Prestige","Thriller",8.5,2006],["Casablanca","Romance",8.5,1942],["Grave of the Fireflies","Animation",8.5,1988],["Cinema Paradiso","Drama",8.5,1988],["The Usual Suspects","Thriller",8.5,1995],["Once Upon a Time in the West","Western",8.5,1968],["Rear Window","Thriller",8.5,1954],["Alien","Horror",8.5,1979],["City Lights","Comedy",8.5,1931],["Apocalypse Now","Drama",8.4,1979],
      ["Memento","Thriller",8.4,2000],["Django Unchained","Western",8.5,2012],["Raiders of the Lost Ark","Action",8.4,1981],["WALL-E","Animation",8.4,2008],["The Lives of Others","Drama",8.4,2006],["Sunset Boulevard","Drama",8.4,1950],["Paths of Glory","Drama",8.4,1957],["The Shining","Horror",8.4,1980],["The Great Dictator","Comedy",8.4,1940],["Witness for the Prosecution","Drama",8.4,1957],["Aliens","Action",8.4,1986],["American Beauty","Drama",8.3,1999],["The Dark Knight Rises","Action",8.4,2012],["Dr. Strangelove","Comedy",8.4,1964],["Spider-Man: Into the Spider-Verse","Animation",8.4,2018],["Oldboy","Thriller",8.3,2003],["Coco","Animation",8.4,2017],["Amadeus","Drama",8.4,1984],["Inglourious Basterds","War",8.4,2009],["The Boat","War",8.4,1981],["Braveheart","Action",8.3,1995],["Avengers: Endgame","Action",8.4,2019],["Joker","Drama",8.4,2019],["Princess Mononoke","Animation",8.3,1997],["Good Will Hunting","Drama",8.3,1997],["Once Upon a Time in America","Crime",8.3,1984],["Toy Story","Animation",8.3,1995],["Your Name.","Animation",8.4,2016],["3 Idiots","Comedy",8.4,2009],["Singin' in the Rain","Romance",8.3,1952],["Requiem for a Dream","Drama",8.3,2000],["High and Low","Crime",8.4,1963],["Toy Story 3","Animation",8.3,2010],["Capernaum","Drama",8.4,2018],["Star Wars: Episode VI - Return of the Jedi","Sci-Fi",8.3,1983],["Eternal Sunshine of the Spotless Mind","Romance",8.3,2004],["2001: A Space Odyssey","Sci-Fi",8.3,1968],["Reservoir Dogs","Crime",8.3,1992],["Come and See","War",8.4,1985],["The Hunt","Drama",8.3,2012],["Citizen Kane","Drama",8.3,1941],["M","Crime",8.3,1931],["Lawrence of Arabia","Drama",8.3,1962],["North by Northwest","Thriller",8.3,1959],["Vertigo","Thriller",8.3,1958],["Amelie","Romance",8.3,2001],["A Clockwork Orange","Sci-Fi",8.3,1971],["Double Indemnity","Thriller",8.3,1944],["Full Metal Jacket","War",8.3,1987],["Scarface","Crime",8.3,1983],
      ["Hamilton","Drama",8.3,2020],["Incendies","Drama",8.3,2010],["Heat","Crime",8.3,1995],["Up","Animation",8.3,2009],["To Kill a Mockingbird","Drama",8.3,1962],["The Sting","Crime",8.3,1973],["A Separation","Drama",8.3,2011],["Metropolis","Sci-Fi",8.3,1927],["La La Land","Romance",8.0,2016],["The Intouchables","Comedy",8.5,2011],["Modern Times","Comedy",8.5,1936],["Like Stars on Earth","Drama",8.3,2007],["My Father and My Son","Drama",8.2,2005],["Bicycle Thieves","Drama",8.3,1948],["Hacksaw Ridge","War",8.1,2016],["Dangal","Drama",8.3,2016],["Snatch","Crime",8.2,2000],["The Kid","Comedy",8.2,1921],["Monty Python and the Holy Grail","Comedy",8.2,1975],["L.A. Confidential","Crime",8.2,1997],["For a Few Dollars More","Western",8.2,1965],["Rashomon","Drama",8.2,1950],["The Apartment","Romance",8.3,1960],["Indiana Jones and the Last Crusade","Action",8.2,1989],["Yojimbo","Action",8.2,1961],["All About Eve","Drama",8.2,1950],["Batman Begins","Action",8.2,2005],["Some Like It Hot","Comedy",8.2,1959],["The Treasure of the Sierra Madre","Drama",8.2,1948],["Unforgiven","Western",8.2,1992],["Downfall","War",8.2,2004],["Raging Bull","Drama",8.1,1980],["The Third Man","Thriller",8.1,1949],["Die Hard","Action",8.2,1988],["Children of Heaven","Drama",8.2,1997],["The Great Escape","War",8.2,1963],["Chinatown","Thriller",8.1,1974],["Inside Out","Animation",8.1,2015],["Pan's Labyrinth","Fantasy",8.2,2006],["Ikiru","Drama",8.3,1952],["My Neighbor Totoro","Animation",8.1,1988],["On the Waterfront","Drama",8.1,1954],["Room","Drama",8.1,2015],["Ran","War",8.2,1985],["The Gold Rush","Comedy",8.1,1925],["Arrival","Sci-Fi",7.9,2016],["The Secret in Their Eyes","Thriller",8.2,2009],["The Bridge on the River Kwai","War",8.1,1957],["Blade Runner","Sci-Fi",8.1,1982],["Mr. Smith Goes to Washington","Drama",8.1,1939],
      ["The Seventh Seal","Drama",8.1,1957],["Howl's Moving Castle","Animation",8.2,2004],["Lock, Stock and Two Smoking Barrels","Crime",8.1,1998],["Judgment at Nuremberg","Drama",8.3,1961],["Casino","Crime",8.2,1995],["The Bandit","Action",8.1,1996],["A Beautiful Mind","Drama",8.2,2001],["A Wednesday","Thriller",8.1,2008],["The General","Comedy",8.1,1926],["Wild Strawberries","Drama",8.1,1957],["The Elephant Man","Drama",8.2,1980],["V for Vendetta","Action",8.2,2005],["Warrior","Drama",8.1,2011],["The Wolf of Wall Street","Crime",8.2,2013],["Sunrise","Drama",8.1,1927],["The Passion of Joan of Arc","Drama",8.1,1928],["Gran Torino","Drama",8.1,2008],["Rang De Basanti","Drama",8.1,2006],["Dial M for Murder","Thriller",8.2,1954],["Trainspotting","Drama",8.1,1996],["The Big Lebowski","Comedy",8.1,1998],["Tokyo Story","Drama",8.1,1953],["The Deer Hunter","War",8.1,1978],["Gone with the Wind","Romance",8.2,1939],["Fargo","Crime",8.1,1996],["Hera Pheri","Comedy",8.1,2000],["Andaz Apna Apna","Comedy",8.0,1994],["Finding Nemo","Animation",8.2,2003],["The Sixth Sense","Thriller",8.2,1999],["The Thing","Horror",8.2,1982],["Cool Hand Luke","Drama",8.1,1967],["Rebecca","Thriller",8.1,1940],["No Country for Old Men","Thriller",8.2,2007],["How to Train Your Dragon","Animation",8.1,2010],["Munna Bhai M.B.B.S.","Comedy",8.1,2003],["Sholay","Action",8.1,1975],["Kill Bill: Vol. 1","Action",8.2,2003],["Into the Wild","Drama",8.1,2007],["Mary and Max","Animation",8.1,2009],["Gone Girl","Thriller",8.1,2014],["There Will Be Blood","Drama",8.2,2007],["It Happened One Night","Romance",8.1,1934],["Life of Brian","Comedy",8.0,1979],["Rush","Drama",8.1,2013],["Hotel Rwanda","Drama",8.1,2004],["Platoon","War",8.1,1986],["Shutter Island","Thriller",8.2,2010],["Network","Drama",8.1,1976],["The Wages of Fear","Thriller",8.2,1953],["Star Wars: The Force Awakens","Sci-Fi",7.8,2015],
      ["Stand by Me","Drama",8.1,1986],["Spotlight","Drama",8.1,2015],["In the Name of the Father","Drama",8.1,1993],["Wild Tales","Comedy",8.1,2014],["The Nights of Cabiria","Drama",8.1,1957],["Butch Cassidy and the Sundance Kid","Western",8.0,1969],["The 400 Blows","Drama",8.1,1959],["Mad Max: Fury Road","Action",8.1,2015],["The Maltese Falcon","Thriller",8.0,1941],["12 Years a Slave","Drama",8.1,2013],["Ben-Hur","Drama",8.1,1959],["The Grand Budapest Hotel","Comedy",8.1,2014],["Persona","Drama",8.1,1966],["Million Dollar Baby","Drama",8.1,2004],["Amores Perros","Drama",8.1,2000],["Jurassic Park","Sci-Fi",8.2,1993],["The Princess Bride","Fantasy",8.0,1987],["Drishyam","Thriller",8.2,2015],["Hachi: A Dog's Tale","Drama",8.1,2009],["Memories of Murder","Crime",8.1,2003],["Stalker","Sci-Fi",8.1,1979],["Nausicaa of the Valley of the Wind","Animation",8.0,1984],["The Truman Show","Comedy",8.2,1998],["The Grapes of Wrath","Drama",8.1,1940],["Before Sunrise","Romance",8.1,1995],["Touch of Evil","Thriller",8.0,1958],["The Message","Drama",8.1,1976],["Annie Hall","Romance",8.0,1977],["Rocky","Drama",8.1,1976],["Gandhi","Drama",8.0,1982],["Harry Potter and the Deathly Hallows: Part 2","Fantasy",8.1,2011],["Diabolique","Thriller",8.1,1955],["The Bourne Ultimatum","Action",8.0,2007],["Donnie Darko","Sci-Fi",8.0,2001],["Monsters, Inc.","Animation",8.1,2001],["Prisoners","Thriller",8.1,2013],["8 1/2","Drama",8.0,1963],["The Terminator","Sci-Fi",8.1,1984],["The Wizard of Oz","Fantasy",8.1,1939],["Groundhog Day","Comedy",8.0,1993],["Catch Me If You Can","Crime",8.1,2002],["Zootopia","Animation",8.0,2016],["Twelve Monkeys","Sci-Fi",8.0,1995],["La Haine","Drama",8.1,1995],["Jaws","Thriller",8.1,1975],["Barry Lyndon","Drama",8.1,1975],["Udaan","Drama",8.1,2010],["The Best Years of Our Lives","Drama",8.1,1946],["Infernal Affairs","Crime",8.0,2002],["Pirates of the Caribbean: The Curse of the Black Pearl","Fantasy",8.1,2003]
    ];

    // Expanded Popular Blockbusters, Cult Classics, and Worldwide Hits
    const rawMoviesExpanded = [
      // Modern Phenomenons & 2020s Blockbusters
      ["Oppenheimer","Drama",8.9,2023],["Dune: Part Two","Sci-Fi",8.6,2024],["Dune","Sci-Fi",8.0,2021],["Spider-Man: Across the Spider-Verse","Animation",8.6,2023],["Top Gun: Maverick","Action",8.3,2022],["Everything Everywhere All at Once","Sci-Fi",7.8,2022],["The Batman","Action",7.8,2022],["Barbie","Comedy",6.8,2023],["Avatar: The Way of Water","Sci-Fi",7.6,2022],["Avatar","Sci-Fi",7.9,2009],["Deadpool & Wolverine","Action",7.7,2024],["Inside Out 2","Animation",7.6,2024],["Poor Things","Comedy",7.8,2023],["The Holdovers","Comedy",7.9,2023],["Anatomy of a Fall","Thriller",7.7,2023],["The Zone of Interest","War",7.4,2023],["Past Lives","Romance",7.9,2023],["Killers of the Flower Moon","Crime",7.6,2023],["12th Fail","Drama",8.9,2023],["RRR","Action",7.8,2022],["Kantara","Action",8.2,2022],["Baahubali 2: The Conclusion","Action",8.2,2017],["Baahubali: The Beginning","Action",8.0,2015],["K.G.F: Chapter 2","Action",8.2,2022],["Jai Bhim","Drama",8.8,2021],["Spider-Man: No Way Home","Action",8.2,2021],["The Brutalist","Drama",7.5,2024],

      // Pop-Culture Franchises: MCU & DC
      ["Avengers: Infinity War","Action",8.4,2018],["The Avengers","Action",8.0,2012],["Iron Man","Action",7.9,2008],["Captain America: The Winter Soldier","Action",7.8,2014],["Captain America: Civil War","Action",7.8,2016],["Guardians of the Galaxy","Sci-Fi",8.0,2014],["Guardians of the Galaxy Vol. 3","Sci-Fi",7.9,2023],["Thor: Ragnarok","Comedy",7.9,2017],["Black Panther","Action",7.3,2018],["Doctor Strange","Fantasy",7.5,2016],["Spider-Man: Homecoming","Action",7.4,2017],["Logan","Action",8.1,2017],["Deadpool","Action",8.0,2016],["X-Men: Days of Future Past","Action",7.9,2014],["Man of Steel","Action",7.1,2013],["Zack Snyder's Justice League","Action",7.9,2021],["Wonder Woman","Action",7.4,2017],["The Suicide Squad","Action",7.2,2021],["Watchmen","Action",7.6,2009],["Spider-Man 2","Action",7.4,2004],["Spider-Man","Action",7.4,2002],

      // Harry Potter & Fantasy Franchises
      ["Harry Potter and the Sorcerer's Stone","Fantasy",7.6,2001],["Harry Potter and the Chamber of Secrets","Fantasy",7.4,2002],["Harry Potter and the Prisoner of Azkaban","Fantasy",7.9,2004],["Harry Potter and the Goblet of Fire","Fantasy",7.7,2005],["Harry Potter and the Order of the Phoenix","Fantasy",7.5,2007],["Harry Potter and the Half-Blood Prince","Fantasy",7.6,2009],["Harry Potter and the Deathly Hallows: Part 1","Fantasy",7.7,2010],["The Hobbit: An Unexpected Journey","Fantasy",7.8,2012],["The Chronicles of Narnia: The Lion, the Witch and the Wardrobe","Fantasy",6.9,2005],

      // Pop-Culture Franchises: Fast, Transformers, Pirates, Mission Impossible
      ["Fast & Furious 6","Action",7.0,2013],["Furious 7","Action",7.1,2015],["The Fast and the Furious","Action",6.8,2001],["Fast Five","Action",7.3,2011],["Transformers","Action",7.0,2007],["Transformers: Dark of the Moon","Action",6.2,2011],["Pirates of the Caribbean: Dead Man's Chest","Fantasy",7.3,2006],["Pirates of the Caribbean: At World's End","Fantasy",7.1,2007],["Mission: Impossible - Fallout","Action",7.7,2018],["Mission: Impossible - Dead Reckoning","Action",7.7,2023],["Mission: Impossible - Rogue Nation","Action",7.4,2015],["Mission: Impossible - Ghost Protocol","Action",7.4,2011],["Mission: Impossible","Action",7.2,1996],["Casino Royale","Action",8.0,2006],["Skyfall","Action",7.8,2012],["No Time to Die","Action",7.3,2021],["John Wick","Action",7.4,2014],["John Wick: Chapter 4","Action",7.7,2023],["John Wick: Chapter 2","Action",7.4,2017],["John Wick: Chapter 3 - Parabellum","Action",7.4,2019],

      // Twilight & Young Adult Hits (Popular, regardless of rating)
      ["Twilight","Romance",5.3,2008],["The Twilight Saga: New Moon","Romance",4.8,2009],["The Twilight Saga: Eclipse","Romance",5.1,2010],["The Hunger Games","Action",7.2,2012],["The Hunger Games: Catching Fire","Action",7.5,2013],["The Maze Runner","Sci-Fi",6.8,2014],["Divergent","Sci-Fi",6.6,2014],["The Fault in Our Stars","Romance",7.7,2014],["Fifty Shades of Grey","Romance",4.2,2015],

      // Sci-Fi, Space & Cyberpunk
      ["Blade Runner 2049","Sci-Fi",8.0,2017],["The Martian","Sci-Fi",8.0,2015],["Gravity","Sci-Fi",7.7,2013],["Ex Machina","Sci-Fi",7.7,2014],["Edge of Tomorrow","Sci-Fi",7.9,2014],["District 9","Sci-Fi",7.9,2009],["Children of Men","Sci-Fi",7.9,2006],["Minority Report","Sci-Fi",7.6,2002],["Tenet","Sci-Fi",7.3,2020],["E.T. the Extra-Terrestrial","Sci-Fi",7.9,1982],["Close Encounters of the Third Kind","Sci-Fi",7.6,1977],["The Fifth Element","Sci-Fi",7.6,1997],["Gattaca","Sci-Fi",7.7,1997],["Looper","Sci-Fi",7.4,2012],["Source Code","Sci-Fi",7.5,2011],["Oblivion","Sci-Fi",7.0,2013],["Dune (1984)","Sci-Fi",6.3,1984],["Starship Troopers","Sci-Fi",7.3,1997],["Alita: Battle Angel","Sci-Fi",7.3,2019],["Tron: Legacy","Sci-Fi",6.8,2010],

      // Horror, Slashers & Supernatural Thrillers
      ["Get Out","Horror",7.7,2017],["Hereditary","Horror",7.3,2018],["Midsommar","Horror",7.1,2019],["The Conjuring","Horror",7.5,2013],["The Conjuring 2","Horror",7.3,2016],["A Quiet Place","Horror",7.5,2018],["A Quiet Place Part II","Horror",7.2,2020],["The Exorcist","Horror",8.1,1973],["Halloween","Horror",7.7,1978],["A Nightmare on Elm Street","Horror",7.4,1984],["Friday the 13th","Horror",6.4,1980],["Scream","Horror",7.4,1996],["Scream (2022)","Horror",6.3,2022],["Saw","Horror",7.6,2004],["Saw X","Horror",6.6,2023],["Insidious","Horror",6.8,2010],["Sinister","Horror",6.8,2012],["It","Horror",7.3,2017],["It Chapter Two","Horror",6.5,2019],["The Ring","Horror",7.1,2002],["The Blair Witch Project","Horror",6.5,1999],["Paranormal Activity","Horror",6.3,2007],["Train to Busan","Horror",7.6,2016],["The Cabin in the Woods","Horror",7.0,2011],["Talk to Me","Horror",7.1,2022],["Barbarian","Horror",7.0,2022],["The Babadook","Horror",6.8,2014],["28 Days Later","Horror",7.5,2002],

      // Crime, Neo-Noir, Mystery & Dark Comedies
      ["Knives Out","Thriller",7.9,2019],["Glass Onion: A Knives Out Mystery","Comedy",7.1,2022],["Zodiac","Crime",7.7,2007],["Nightcrawler","Thriller",7.7,2014],["Sicario","Crime",7.6,2015],["Black Swan","Thriller",8.0,2010],["Mulholland Drive","Thriller",7.9,2001],["The Handmaiden","Thriller",8.1,2016],["Andhadhun","Thriller",8.2,2018],["Gangs of Wasseypur","Crime",8.2,2012],["Taxi Driver","Crime",8.2,1976],["The Irish Man","Crime",7.8,2019],["Drive","Crime",7.8,2011],["Baby Driver","Action",7.5,2017],["Ocean's Eleven","Crime",7.7,2001],["Ocean's Twelve","Crime",6.5,2004],["American Psycho","Drama",7.6,2000],["Collateral","Thriller",7.5,2004],["Mystic River","Crime",7.9,2003],["Primal Fear","Drama",7.7,1996],["The Game","Thriller",7.7,1997],["Wind River","Crime",7.7,2017],["Nightmare Alley","Thriller",7.0,2021],

      // Action, Adventure & Disaster Epics
      ["Speed","Action",7.3,1994],["The Rock","Action",7.4,1996],["Face/Off","Action",7.3,1997],["Con Air","Action",6.9,1997],["Independence Day","Sci-Fi",7.0,1996],["Armageddon","Sci-Fi",6.7,1998],["Twister","Action",6.5,1996],["The Day After Tomorrow","Sci-Fi",6.5,2004],["2012","Action",5.8,2009],["World War Z","Action",7.0,2013],["I Am Legend","Sci-Fi",7.2,2007],["Men in Black","Sci-Fi",7.3,1997],["Men in Black II","Comedy",6.2,2002],["National Treasure","Action",6.9,2004],["Lara Croft: Tomb Raider","Action",5.8,2001],["The Mummy","Action",7.1,1999],["The Mummy Returns","Action",6.4,2001],["King Kong","Action",7.2,2005],["Godzilla","Action",6.4,2014],["Godzilla Minus One","Action",8.3,2023],

      // War & Historical Epics
      ["1917","War",8.2,2019],["Dunkirk","War",7.8,2017],["The Revenant","Drama",8.0,2015],["All Quiet on the Western Front","War",7.8,2022],["Black Hawk Down","War",7.7,2001],["Letters from Iwo Jima","War",7.8,2006],["Flags of Our Fathers","War",7.1,2006],["Fury","War",7.5,2014],["The Last Samurai","Action",7.8,2003],["Kingdom of Heaven","War",7.2,2005],["Troy","Action",7.3,2004],["300","Action",7.6,2006],["Apocalypto","Action",7.8,2006],["Master and Commander","Action",7.5,2003],

      // Heartwarming Dramas & Biopics
      ["The Social Network","Drama",7.8,2010],["Ford v Ferrari","Drama",8.1,2019],["Bohemian Rhapsody","Drama",7.9,2018],["Rocketman","Drama",7.3,2019],["Elvis","Drama",7.3,2022],["The King's Speech","Drama",8.0,2010],["The Theory of Everything","Drama",7.7,2014],["The Imitation Game","Drama",8.0,2014],["A Star Is Born","Romance",7.6,2018],["Cast Away","Drama",7.8,2000],["The Terminal","Comedy",7.4,2004],["Catch Me If You Can","Crime",8.1,2002],["The Pursuit of Happyness","Drama",8.0,2006],["Seven Pounds","Drama",7.6,2008],["Slumdog Millionaire","Drama",8.0,2008],["Lion","Drama",8.0,2016],["Roma","Drama",7.7,2018],["Shoplifters","Drama",7.9,2018],["Drive My Car","Drama",7.6,2021],["Lagaan","Drama",8.1,2001],["Swades","Drama",8.2,2004],["Chak De! India","Drama",8.1,2007],["Ghajini","Action",7.3,2008],

      // Animation & Family Classics
      ["Ratatouille","Animation",8.1,2007],["The Incredibles","Animation",8.0,2004],["Incredibles 2","Animation",7.6,2018],["Soul","Animation",8.0,2020],["Coco","Animation",8.4,2017],["Moana","Animation",7.6,2016],["Frozen","Animation",7.4,2013],["Frozen II","Animation",6.8,2019],["Tangled","Animation",7.7,2010],["Shrek","Animation",7.9,2001],["Shrek 2","Animation",7.3,2004],["Puss in Boots: The Last Wish","Animation",7.8,2022],["Kung Fu Panda","Animation",7.6,2008],["Kung Fu Panda 2","Animation",7.3,2011],["Despicable Me","Animation",7.6,2010],["Minions","Animation",6.4,2015],["The Super Mario Bros. Movie","Animation",7.0,2023],["Akira","Animation",8.0,1988],["Ghost in the Shell","Animation",7.9,1995],["A Silent Voice","Animation",8.1,2016],["Demon Slayer: Mugen Train","Animation",8.2,2020],["Suzume","Animation",7.6,2022],["Weathering with You","Animation",7.5,2019],["The Boy and the Heron","Animation",7.5,2023],["Kiki's Delivery Service","Animation",7.8,1989],["Castle in the Sky","Animation",8.0,1986],["Princess Kaguya","Animation",8.0,2013],

      // Comedies & Feel-Good Crowd Favorites
      ["Superbad","Comedy",7.6,2007],["Step Brothers","Comedy",6.9,2008],["Anchorman: The Legend of Ron Burgundy","Comedy",7.1,2004],["The Hangover","Comedy",7.7,2009],["The Hangover Part II","Comedy",6.5,2011],["Shaun of the Dead","Comedy",7.9,2004],["Hot Fuzz","Comedy",7.8,2007],["The World's End","Comedy",7.0,2013],["Zombieland","Comedy",7.6,2009],["21 Jump Street","Comedy",7.2,2012],["22 Jump Street","Comedy",7.0,2014],["Tropic Thunder","Comedy",7.1,2008],["Dumb and Dumber","Comedy",7.3,1994],["The Mask","Comedy",6.9,1994],["Ace Ventura: Pet Detective","Comedy",6.9,1994],["Bruce Almighty","Comedy",6.8,2003],["Liar Liar","Comedy",6.9,1997],["School of Rock","Comedy",7.2,2003],["Mean Girls","Comedy",7.1,2004],["Clueless","Comedy",6.9,1995],["Legally Blonde","Comedy",6.5,2001],["Ferris Bueller's Day Off","Comedy",7.8,1986],["The Breakfast Club","Drama",7.8,1985],["Home Alone","Comedy",7.7,1990],["Home Alone 2: Lost in New York","Comedy",6.9,1992],["Ghostbusters","Comedy",7.8,1984],["PK","Comedy",8.1,2014],["Zindagi Na Milegi Dobara","Comedy",8.2,2011],["Dil Chahta Hai","Comedy",8.1,2001],["Queen","Comedy",8.1,2013],["Chhichhore","Comedy",8.3,2019],

      // Romance & Tearjerkers
      ["Titanic","Romance",7.9,1997],["The Notebook","Romance",7.8,2004],["Pride & Prejudice","Romance",7.8,2005],["500 Days of Summer","Romance",7.7,2009],["About Time","Romance",7.8,2013],["Before Sunset","Romance",8.1,2004],["Before Midnight","Romance",7.9,2013],["Crazy Rich Asians","Romance",6.9,2018],["Notting Hill","Romance",7.2,1999],["Love Actually","Romance",7.6,2003],["10 Things I Hate About You","Romance",7.3,1999],["Pretty Woman","Romance",7.1,1990],["Jerry Maguire","Romance",7.3,1996],["Brokeback Mountain","Drama",7.7,2005],["Call Me by Your Name","Romance",7.8,2017],["Portrait of a Lady on Fire","Romance",8.1,2019],["Dilwale Dulhania Le Jayenge","Romance",8.0,1995],["Kabhi Khushi Kabhie Gham...","Drama",7.4,2001],["Kal Ho Naa Ho","Romance",7.9,2003],["Jab We Met","Romance",7.9,2007],["Yeh Jawaani Hai Deewani","Romance",7.2,2013]
    ];

    const rawShowsCore = [
      ["Breaking Bad","Drama",9.5,2008],["Planet Earth II","Documentary",9.5,2016],["Planet Earth","Documentary",9.4,2006],["Band of Brothers","War",9.4,2001],["Chernobyl","Drama",9.4,2019],["The Wire","Crime",9.3,2002],["Avatar: The Last Airbender","Animation",9.3,2005],["Blue Planet II","Documentary",9.3,2017],["The Sopranos","Crime",9.2,1999],["Cosmos: A Spacetime Odyssey","Documentary",9.3,2014],["Our Planet","Documentary",9.3,2019],["Cosmos","Documentary",9.3,1980],["Game of Thrones","Fantasy",9.2,2011],["Rick and Morty","Animation",9.1,2013],["The Twilight Zone","Sci-Fi",9.1,1959],["Sherlock","Crime",9.1,2010],["The World at War","Documentary",9.2,1973],["Fullmetal Alchemist: Brotherhood","Animation",9.1,2009],["The Last Dance","Documentary",9.1,2020],["Life","Documentary",9.1,2009],["Batman: The Animated Series","Animation",9.0,1992],["The Office","Comedy",9.0,2005],["True Detective","Crime",8.9,2014],["Firefly","Sci-Fi",9.0,2002],["Death Note","Animation",8.9,2006],["Fargo","Crime",8.9,2014],["Only Fools and Horses","Comedy",9.0,1981],["Attack on Titan","Animation",9.1,2013],["Friends","Comedy",8.9,1994],["Seinfeld","Comedy",8.9,1989],["Hunter x Hunter","Animation",9.0,2011],["Better Call Saul","Drama",9.0,2015],["The Beatles: Get Back","Documentary",9.0,2021],["Stranger Things","Sci-Fi",8.7,2016],["Peaky Blinders","Crime",8.8,2013],["Black Mirror","Sci-Fi",8.7,2011],["The Crown","Drama",8.6,2016],["Succession","Drama",8.9,2018],["Mad Men","Drama",8.7,2007],["The Boys","Action",8.7,2019],["House of Cards","Drama",8.6,2013],["Narcos","Crime",8.8,2015],["Mindhunter","Crime",8.6,2017],["Dark","Sci-Fi",8.7,2017],["The Mandalorian","Sci-Fi",8.7,2019],["Dexter","Crime",8.7,2006],["The Marvelous Mrs. Maisel","Comedy",8.7,2017],["Westworld","Sci-Fi",8.5,2016],["Arrested Development","Comedy",8.7,2003],["Parks and Recreation","Comedy",8.6,2009]
    ];

    const rawShowsExpanded = [
      // Acclaimed Modern Prestige & Recent TV
      ["Arcane","Animation",9.0,2021],["The Last of Us","Drama",8.8,2023],["Shogun","Drama",8.7,2024],["Severance","Sci-Fi",8.7,2022],["The Bear","Comedy",8.6,2022],["Fallout","Sci-Fi",8.4,2024],["Andor","Sci-Fi",8.4,2022],["House of the Dragon","Fantasy",8.4,2022],["Ted Lasso","Comedy",8.8,2020],["The Queen's Gambit","Drama",8.5,2020],["Fleabag","Comedy",8.7,2016],["Squid Game","Thriller",8.0,2021],["Yellowstone","Drama",8.7,2018],["Euphoria","Drama",8.3,2019],["The White Lotus","Comedy",8.0,2021],["Slow Horses","Thriller",8.2,2022],["Downton Abbey","Drama",8.7,2010],["Rome","Drama",8.7,2005],["Deadwood","Western",8.6,2004],["Boardwalk Empire","Crime",8.6,2010],["Justified","Crime",8.6,2010],["Line of Duty","Crime",8.7,2012],["Twin Peaks","Thriller",8.8,1990],["Mr. Robot","Thriller",8.5,2015],["Ozark","Crime",8.5,2017],["Homeland","Thriller",8.3,2011],["The Americans","Drama",8.4,2013],["Bates Motel","Horror",8.1,2013],["Hannibal","Horror",8.5,2013],

      // Mega-Popular Sitcoms & Binge Hits
      ["Brooklyn Nine-Nine","Comedy",8.4,2013],["Modern Family","Comedy",8.5,2009],["Community","Comedy",8.5,2009],["How I Met Your Mother","Comedy",8.3,2005],["The Big Bang Theory","Comedy",8.2,2007],["It's Always Sunny in Philadelphia","Comedy",8.8,2005],["Curb Your Enthusiasm","Comedy",8.8,2000],["Schitt's Creek","Comedy",8.5,2015],["New Girl","Comedy",7.8,2011],["Gilmore Girls","Comedy",7.8,2000],["Sex and the City","Comedy",7.3,1998],["Suits","Drama",8.4,2011],["Grey's Anatomy","Drama",7.6,2005],["House M.D.","Drama",8.7,2004],["Lost","Drama",8.3,2004],["Prison Break","Action",8.3,2005],["24","Action",8.4,2001],["Supernatural","Fantasy",8.4,2005],["The Vampire Diaries","Fantasy",7.7,2009],["Teen Wolf","Fantasy",7.7,2011],["Lucifer","Fantasy",8.1,2016],["Once Upon a Time","Fantasy",7.7,2011],["Gossip Girl","Drama",7.5,2007],["Pretty Little Liars","Drama",7.4,2010],["Bridgerton","Romance",7.4,2020],["Emily in Paris","Comedy",6.8,2020],["The Witcher","Fantasy",8.0,2019],["Wednesday","Fantasy",8.1,2022],["The Walking Dead","Horror",8.1,2010],["American Horror Story","Horror",8.0,2011],["Money Heist","Crime",8.2,2017],["Lupin","Crime",7.5,2021],["Elite","Drama",7.4,2018],["Dark Desire","Thriller",6.5,2020],

      // Sci-Fi, Space & Fantasy Classics
      ["Battlestar Galactica","Sci-Fi",8.7,2004],["Star Trek: The Next Generation","Sci-Fi",8.7,1987],["Star Trek: Deep Space Nine","Sci-Fi",8.1,1993],["The X-Files","Sci-Fi",8.6,1993],["Doctor Who","Sci-Fi",8.6,2005],["The Expanse","Sci-Fi",8.5,2015],["Fringe","Sci-Fi",8.4,2008],["Orphan Black","Sci-Fi",8.3,2013],["Sense8","Sci-Fi",8.2,2015],["Person of Interest","Sci-Fi",8.5,2011],["Loki","Sci-Fi",8.2,2021],["WandaVision","Fantasy",7.9,2021],["Daredevil","Action",8.6,2015],["The Punisher","Action",8.5,2017],["Vikings","Action",8.5,2013],["The Last Kingdom","Action",8.5,2015],["Spartacus","Action",8.5,2010],["Outlander","Romance",8.4,2014],["The Handmaid's Tale","Drama",8.4,2017],["The Good Place","Comedy",8.2,2016],["Silicon Valley","Comedy",8.5,2014],["Barry","Comedy",8.4,2018],["Atlanta","Comedy",8.6,2016],

      // Anime Giants & Animated Series
      ["One Piece","Animation",8.9,1999],["Cowboy Bebop","Animation",8.9,1998],["Gravity Falls","Animation",8.9,2012],["Vinland Saga","Animation",8.8,2019],["BoJack Horseman","Animation",8.8,2014],["Invincible","Animation",8.7,2021],["Naruto: Shippuden","Animation",8.7,2007],["Naruto","Animation",8.4,2002],["Bleach","Animation",8.2,2004],["Dragon Ball Z","Animation",8.8,1989],["Demon Slayer: Kimetsu no Yaiba","Animation",8.6,2019],["Jujutsu Kaisen","Animation",8.6,2020],["Chainsaw Man","Animation",8.4,2022],["Cyberpunk: Edgerunners","Animation",8.6,2022],["My Hero Academia","Animation",8.3,2016],["One Punch Man","Animation",8.7,2015],["Mob Psycho 100","Animation",8.6,2016],["Steins;Gate","Animation",8.8,2011],["Code Geass","Animation",8.7,2006],["Neon Genesis Evangelion","Animation",8.5,1995],["Monster","Animation",8.7,2004],["Haikyu!!","Animation",8.7,2014],["Samurai Champloo","Animation",8.6,2004],["Love, Death & Robots","Animation",8.4,2019],["Castlevania","Animation",8.3,2017],["South Park","Animation",8.7,1997],["Family Guy","Animation",8.2,1999],["The Simpsons","Animation",8.7,1989],["Futurama","Animation",8.5,1999],["Adventure Time","Animation",8.6,2010],["Over the Garden Wall","Animation",8.8,2014],

      // Acclaimed Indian & International Streaming Phenomenons
      ["Scam 1992","Drama",9.2,2020],["Panchayat","Comedy",8.9,2020],["Gullak","Comedy",9.1,2019],["Kota Factory","Drama",9.0,2019],["Rocket Boys","Drama",8.9,2022],["The Family Man","Action",8.7,2019],["Sacred Games","Crime",8.5,2018],["Mirzapur","Crime",8.5,2018],["Delhi Crime","Crime",8.5,2019],["Paatal Lok","Crime",8.1,2020],["Asur: Welcome to Your Dark Side","Thriller",8.5,2020],["Special OPS","Action",8.6,2020],["Farzi","Crime",8.4,2023],["Guns & Gulaabs","Comedy",7.7,2023],["Kohra","Crime",7.6,2023],["Fauda","Action",8.3,2015],["Gomorrah","Crime",8.7,2014],["Babylon Berlin","Crime",8.4,2017],["Borgen","Drama",8.5,2010],["The Bridge","Crime",8.6,2011],["Dark (Season 1)","Sci-Fi",8.7,2017],

      // Landmark Mini-Series & Documentaries
      ["The Pacific","War",8.3,2010],["Generation Kill","War",8.5,2008],["When They See Us","Drama",8.9,2019],["Mare of Easttown","Crime",8.4,2021],["Sharp Objects","Drama",8.1,2018],["The Night Of","Crime",8.4,2016],["Unbelievable","Crime",8.4,2019],["Dopesick","Drama",8.6,2021],["Making a Murderer","Documentary",8.6,2015],["Wild Wild Country","Documentary",8.1,2018],["Tiger King","Documentary",7.5,2020],["Formula 1: Drive to Survive","Documentary",8.5,2019],["Chef's Table","Documentary",8.5,2015],["The Blue Planet","Documentary",9.0,2001],["Frozen Planet","Documentary",9.0,2011]
    ];

        // ---- Additional titles (ordered by popularity) ----
    const rawMoviesMore = [
      ["Wicked","Fantasy",7.3,2024],["Moana 2","Animation",6.8,2024],["Mufasa: The Lion King","Animation",6.4,2024],["Gladiator II","Action",6.5,2024],["Joker: Folie à Deux","Thriller",5.2,2024],["Venom: The Last Dance","Sci-Fi",5.9,2024],["Alien: Romulus","Horror",7.2,2024],["Furiosa: A Mad Max Saga","Action",7.5,2024],["Kingdom of the Planet of the Apes","Sci-Fi",6.8,2024],["Godzilla x Kong: The New Empire","Sci-Fi",6.0,2024],["Bad Boys: Ride or Die","Action",6.7,2024],["Twisters","Action",6.4,2024],["A Quiet Place: Day One","Horror",6.6,2024],["Despicable Me 4","Animation",6.0,2024],["Nosferatu","Horror",7.2,2024],["The Substance","Horror",7.3,2024],["Anora","Comedy",7.4,2024],["Conclave","Thriller",7.4,2024],["A Complete Unknown","Drama",7.3,2024],["Challengers","Romance",7.2,2024],["Civil War","Action",7.0,2024],["Longlegs","Horror",6.2,2024],["Beetlejuice Beetlejuice","Comedy",6.7,2024],["The Wild Robot","Animation",8.2,2024],["Sonic the Hedgehog 3","Action",7.0,2024],["Captain America: Brave New World","Action",5.7,2025],["Thunderbolts*","Action",7.0,2025],["Sinners","Horror",7.6,2025],["A Minecraft Movie","Fantasy",5.6,2025],["Mission: Impossible - The Final Reckoning","Action",7.2,2025],["Lilo & Stitch","Comedy",7.0,2025],["Jurassic World Rebirth","Sci-Fi",6.0,2025],["F1: The Movie","Action",7.6,2025],["Superman","Action",7.1,2025],["The Fantastic Four: First Steps","Sci-Fi",7.1,2025],["Weapons","Horror",7.5,2025],["Zootopia 2","Animation",7.6,2025],["Wicked: For Good","Fantasy",6.8,2025],["Avatar: Fire and Ash","Sci-Fi",7.4,2025],["KPop Demon Hunters","Animation",7.7,2025],["Ne Zha 2","Animation",7.9,2025],["Demon Slayer: Kimetsu no Yaiba - The Movie: Infinity Castle","Animation",8.0,2025],["One Battle After Another","Action",8.2,2025],["Marty Supreme","Drama",8.0,2025],["Hamnet","Drama",8.1,2025],["Sentimental Value","Drama",8.0,2025],["Bugonia","Thriller",7.4,2025],["Frankenstein","Fantasy",7.5,2025],["The Running Man","Action",6.6,2025],["Predator: Badlands","Sci-Fi",7.5,2025],["Tron: Ares","Sci-Fi",6.2,2025],["28 Years Later","Horror",6.9,2025],["Companion","Thriller",6.9,2025],["Mickey 17","Sci-Fi",6.8,2025],["Novocaine","Action",6.9,2025],["The Accountant 2","Action",7.0,2025],["Final Destination Bloodlines","Horror",6.7,2025],["Ballerina","Action",6.4,2025],["Materialists","Romance",6.6,2025],["Eddington","Thriller",6.4,2025],["Heads of State","Action",6.0,2025],["Elio","Animation",6.8,2025],["Smurfs","Animation",5.3,2025],["The Naked Gun","Comedy",6.5,2025],["Freakier Friday","Comedy",6.3,2025],["The Conjuring: Last Rites","Horror",6.1,2025],["Black Phone 2","Horror",6.4,2025],["Chainsaw Man - The Movie: Reze Arc","Animation",8.1,2025],["Doctor Strange in the Multiverse of Madness","Fantasy",6.9,2022],["Black Panther: Wakanda Forever","Action",6.7,2022],["Thor: Love and Thunder","Action",6.2,2022],["Eternals","Action",6.3,2021],["Shang-Chi and the Legend of the Ten Rings","Action",7.4,2021],["Black Widow","Action",6.6,2021],["Ant-Man and the Wasp: Quantumania","Sci-Fi",6.1,2023],["The Marvels","Sci-Fi",5.5,2023],["The Flash","Sci-Fi",6.7,2023],["Aquaman and the Lost Kingdom","Action",5.5,2023],["Shazam! Fury of the Gods","Action",5.9,2023],["Blue Beetle","Action",6.0,2023],["Black Adam","Action",6.2,2022],["Nope","Horror",6.8,2022],["Us","Horror",6.8,2019],["Smile","Horror",6.5,2022],["M3GAN","Horror",6.3,2022],["Scream VI","Horror",6.5,2023],["Evil Dead Rise","Horror",6.5,2023],["Insidious: The Red Door","Horror",5.6,2023],["Five Nights at Freddy's","Horror",5.4,2023],["The Nun II","Horror",5.6,2023],["Knock at the Cabin","Thriller",6.1,2023],["Napoleon","War",6.4,2023],["Maestro","Drama",6.6,2023],["The Whale","Drama",7.7,2022],["The Banshees of Inisherin","Comedy",7.7,2022],["Tár","Drama",7.4,2022],["The Fabelmans","Drama",7.5,2022],["Triangle of Sadness","Comedy",7.2,2022],["The Menu","Thriller",7.2,2022],["Bullet Train","Action",7.3,2022],["Don't Look Up","Comedy",7.2,2021],["The Power of the Dog","Western",6.8,2021],["Belfast","Drama",7.2,2021],["CODA","Drama",8.0,2021],["Nomadland","Drama",7.3,2020],["Minari","Drama",7.4,2020],["Promising Young Woman","Thriller",7.5,2020],["The Father","Drama",8.2,2020],["Sound of Metal","Drama",7.7,2019],["Encanto","Animation",7.2,2021],["Luca","Animation",7.4,2021],["Turning Red","Animation",7.0,2022],["Lightyear","Animation",6.1,2022],["Strange World","Animation",5.7,2022],["Wish","Animation",5.5,2023],["Elemental","Animation",7.0,2023],["The Mitchells vs. the Machines","Animation",7.6,2021],["Nimona","Animation",7.5,2023],["Jujutsu Kaisen 0","Animation",7.7,2021],["One Piece Film: Red","Animation",6.8,2022],["The First Slam Dunk","Animation",8.0,2022],["Dragon Ball Super: Super Hero","Animation",6.6,2022],["Mission: Impossible - Dead Reckoning Part One","Action",7.7,2023],["Fast X","Action",5.7,2023],["Indiana Jones and the Dial of Destiny","Action",6.5,2023],["The Creator","Sci-Fi",6.7,2023],["Ghostbusters: Frozen Empire","Comedy",5.9,2024],["Ghostbusters: Afterlife","Comedy",6.8,2021],["Free Guy","Comedy",7.1,2021],["The Gray Man","Action",6.5,2022],["Red Notice","Action",6.3,2021],["Extraction","Action",6.7,2020],["Extraction 2","Action",6.9,2023],["Air","Drama",7.4,2023],["Ferrari","Drama",6.7,2023],["Saltburn","Thriller",7.0,2023],["Society of the Snow","Drama",7.8,2023],["The Iron Claw","Drama",7.7,2023],["May December","Drama",6.9,2023],["American Fiction","Comedy",7.2,2023],["Wonka","Fantasy",7.0,2023],["Migration","Animation",6.4,2023],["Trolls Band Together","Animation",6.1,2023],["KGF: Chapter 1","Action",8.2,2018],["Pushpa: The Rise","Action",7.6,2021],["Pushpa 2: The Rule","Action",6.5,2024],["Kalki 2898 AD","Sci-Fi",7.1,2024],["Salaar: Part 1 - Ceasefire","Action",6.5,2023],["Jawan","Action",7.0,2023],["Pathaan","Action",5.9,2023],["Animal","Crime",6.0,2023],["Dunki","Comedy",6.5,2023],["Tiger 3","Action",5.2,2023],["Gadar 2","Action",5.0,2023],["Rocky Aur Rani Kii Prem Kahaani","Romance",6.7,2023],["Laapataa Ladies","Comedy",8.3,2023],["Chhaava","Action",7.3,2025],["Dhurandhar","Action",8.0,2025],["Saiyaara","Romance",5.9,2025],["Kantara: Chapter 1","Action",8.0,2025],["Vikram","Action",8.3,2022],["Leo","Action",7.1,2023],["Jailer","Action",6.9,2023],["Master","Action",7.3,2021],["Kaithi","Action",8.2,2019],["Vikram Vedha","Thriller",8.2,2017],["Drishyam 2","Thriller",8.2,2022],["Manjummel Boys","Thriller",8.2,2024],["Premalu","Romance",7.7,2024],["Aavesham","Comedy",7.8,2024],["Maharaja","Thriller",8.5,2024],["Amaran","Drama",8.4,2024],["Lucky Baskhar","Crime",8.1,2024],["Stree 2","Comedy",7.5,2024],["Stree","Comedy",7.5,2018],["Bhool Bhulaiyaa 3","Comedy",5.2,2024],["Singham Again","Action",4.9,2024],["Kill","Action",7.5,2024],["Crew","Comedy",5.9,2024],["Munjya","Horror",6.8,2024],["Article 370","Drama",7.6,2024],["Fighter","Action",6.4,2024],["Sam Bahadur","War",7.2,2023],["Uri: The Surgical Strike","War",8.2,2019],["Kabir Singh","Romance",7.0,2019],["War","Action",6.5,2019],["Super 30","Drama",7.9,2019],["Gully Boy","Drama",7.9,2019],["Article 15","Crime",8.1,2019],["Badhaai Ho","Comedy",7.9,2018],["Raazi","Thriller",7.7,2018],["Sanju","Drama",7.6,2018],["Padmaavat","Drama",7.0,2018],["Tumbbad","Horror",8.2,2018],["Mughal-E-Azam","Drama",8.1,1960],["Mother India","Drama",7.8,1957],["Pyaasa","Drama",8.3,1957],["Anand","Drama",8.7,1971],["Deewaar","Crime",8.0,1975],["Kuch Kuch Hota Hai","Romance",7.6,1998],["Devdas","Romance",7.5,2002],["Veer-Zaara","Romance",7.8,2004],["Lage Raho Munna Bhai","Comedy",8.1,2006],["Taare Zameen Par","Drama",8.3,2007],["Om Shanti Om","Romance",6.7,2007],["Dev.D","Drama",7.9,2009],["My Name Is Khan","Drama",7.9,2010],["Dabangg","Action",6.3,2010],["Barfi!","Romance",8.1,2012],["Kahaani","Thriller",8.1,2012],["Bhaag Milkha Bhaag","Drama",8.2,2013],["Chennai Express","Comedy",6.0,2013],["Dhoom 3","Action",5.4,2013],["Haider","Crime",8.1,2014],["Highway","Drama",7.5,2014],["Bajrangi Bhaijaan","Drama",8.1,2015],["Bajirao Mastani","Romance",7.2,2015],["Piku","Comedy",7.6,2015],["Masaan","Drama",8.1,2015],["Dil Dhadakne Do","Comedy",7.2,2015],["Sultan","Drama",7.0,2016],["M.S. Dhoni: The Untold Story","Drama",7.7,2016],["Pink","Thriller",8.1,2016],["Udta Punjab","Crime",7.8,2016],["Neerja","Drama",7.7,2016],["Ae Dil Hai Mushkil","Romance",5.8,2016],["Secret Superstar","Drama",7.9,2017],["Toilet: Ek Prem Katha","Comedy",6.6,2017],["Newton","Comedy",7.6,2017],["Tiger Zinda Hai","Action",6.0,2017],["October","Drama",7.2,2018],["Tanhaji","War",7.5,2020],["Gangubai Kathiawadi","Drama",7.0,2022],["Brahmastra","Fantasy",5.6,2022],["The Kashmir Files","Drama",8.3,2022],["Bhediya","Horror",6.6,2022],["Sita Ramam","Romance",8.5,2022],["Hridayam","Romance",8.1,2022],["Sardar Udham","War",8.4,2021],["Shershaah","War",8.3,2021],["Soorarai Pottru","Drama",8.7,2020],["Asuran","Drama",8.4,2019],["Super Deluxe","Crime",8.4,2019],["Pariyerum Perumal","Drama",8.6,2018],["96","Romance",8.5,2018],["Ratsasan","Thriller",8.3,2018],["Bangalore Days","Comedy",8.3,2014],["Premam","Romance",8.2,2015],["Uyare","Drama",7.9,2019],["Kumbalangi Nights","Drama",8.5,2019],["Jallikattu","Drama",7.2,2019],["Ee.Ma.Yau","Drama",7.4,2018],["Angamaly Diaries","Crime",7.8,2017],["Thani Oruvan","Thriller",8.4,2015],["Enthiran","Sci-Fi",7.1,2010],["2.0","Sci-Fi",6.1,2018],["Sivaji: The Boss","Action",7.5,2007],["Anniyan","Thriller",8.4,2005],["Nayakan","Crime",8.6,1987],["Thalapathi","Action",8.0,1991],["Ponniyin Selvan: I","Action",7.5,2022],["Ponniyin Selvan: II","Action",7.2,2023],["Eega","Fantasy",7.7,2012],["Magadheera","Action",7.7,2009],["Arjun Reddy","Romance",8.0,2017],["Jersey","Drama",8.5,2019],["Mahanati","Drama",8.4,2018],["Rangasthalam","Action",8.2,2018],["Bharat Ane Nenu","Drama",7.5,2018],["Dasara","Action",7.3,2023],["Hi Nanna","Romance",7.7,2023],["Hanu-Man","Fantasy",7.8,2024],["Devara: Part 1","Action",5.8,2024],["Game Changer","Action",4.9,2025],["Coolie","Action",6.5,2025],["Retro","Action",6.4,2025],["Good Bad Ugly","Action",6.4,2025],["Tourist Family","Comedy",8.3,2025],["Lokah Chapter 1: Chandra","Fantasy",7.8,2025],["Thudarum","Thriller",8.0,2025],["L2: Empuraan","Action",6.7,2025],["Jurassic Park III","Sci-Fi",5.9,2001],["Jurassic World","Sci-Fi",6.9,2015],["Jurassic World: Fallen Kingdom","Sci-Fi",6.1,2018],["Jurassic World Dominion","Sci-Fi",5.6,2022],["Star Wars: The Last Jedi","Sci-Fi",6.9,2017],["Star Wars: The Rise of Skywalker","Sci-Fi",6.4,2019],["Star Wars: Episode I - The Phantom Menace","Sci-Fi",6.5,1999],["Star Wars: Episode II - Attack of the Clones","Sci-Fi",6.5,2002],["Star Wars: Episode III - Revenge of the Sith","Sci-Fi",7.6,2005],["Rogue One: A Star Wars Story","Sci-Fi",7.8,2016],["Solo: A Star Wars Story","Sci-Fi",6.6,2018],["Back to the Future Part II","Sci-Fi",7.8,1989],["Back to the Future Part III","Sci-Fi",7.4,1990],["Terminator Genisys","Sci-Fi",6.3,2015],["RoboCop","Sci-Fi",7.6,1987],["Total Recall","Sci-Fi",7.5,1990],["Predator","Action",7.8,1987],["Die Hard 2","Action",7.0,1990],["Die Hard with a Vengeance","Action",7.6,1995],["Lethal Weapon","Action",7.6,1987],["Rambo: First Blood","Action",7.7,1982],["Rocky II","Drama",7.3,1979],["Creed","Drama",7.6,2015],["Creed II","Drama",6.9,2018],["Creed III","Drama",6.7,2023],["Gangs of New York","Crime",7.5,2002],["Once Upon a Time in Hollywood","Comedy",7.6,2019],["Kill Bill: Vol. 2","Action",8.0,2004],["Jackie Brown","Crime",7.5,1997],["Death Proof","Action",7.0,2007],["The Hateful Eight","Western",7.8,2015],["O Brother, Where Art Thou?","Comedy",7.7,2000],["True Grit","Western",7.6,2010],["Tombstone","Western",7.8,1993],["Dances with Wolves","Western",8.0,1990],["High Noon","Western",7.7,1952],["Rio Bravo","Western",8.0,1959],["The Searchers","Western",7.9,1956],["A Fistful of Dollars","Western",7.9,1964],["American Sniper","War",7.2,2014],["Sully","Drama",7.4,2016],["The Mule","Crime",7.0,2018],["Cry Macho","Western",5.7,2021],["Hannibal","Thriller",6.8,2001],["Red Dragon","Thriller",7.2,2002],["Insomnia","Thriller",7.2,2002],["Following","Thriller",7.5,1998],["The King of Comedy","Comedy",7.7,1982],["The Thin Red Line","War",7.5,1998],["Dead Poets Society","Drama",8.1,1989],["Scent of a Woman","Drama",8.0,1992],["Rain Man","Drama",8.0,1988],["A Few Good Men","Drama",7.7,1992],["The Firm","Thriller",6.9,1993],["The Aviator","Drama",7.5,2004],["Cinderella Man","Drama",8.0,2005],["Seabiscuit","Drama",7.3,2003],["Remember the Titans","Drama",7.8,2000],["Moneyball","Drama",7.6,2011],["The Blind Side","Drama",7.6,2009],["Hidden Figures","Drama",7.8,2016],["Life of Pi","Fantasy",7.9,2012],["Birdman","Comedy",7.7,2014],["Boyhood","Drama",7.9,2014],["Her","Romance",8.0,2013],["Lost in Translation","Drama",7.7,2003],["Amélie","Romance",8.3,2001],["The Shape of Water","Fantasy",7.3,2017],["Crouching Tiger, Hidden Dragon","Action",7.9,2000],["Hero","Action",7.9,2002],["House of Flying Daggers","Action",7.5,2004],["Ip Man","Action",8.0,2008],["Burning","Thriller",7.5,2018],["The Wailing","Horror",7.4,2016],["Decision to Leave","Thriller",7.3,2022],["Y Tu Mamá También","Drama",7.6,2001],["Central Station","Drama",8.0,1998],["Il Postino","Romance",7.7,1994],["La Dolce Vita","Drama",8.0,1960],["8½","Drama",8.0,1963],["Breathless","Crime",7.7,1960],["Jules and Jim","Romance",7.7,1962],["Les Misérables","Drama",7.5,2012],["Das Boot","War",8.4,1981],["Run Lola Run","Thriller",7.6,1998],["Good Bye Lenin!","Comedy",7.7,2003],["The Great Beauty","Drama",7.7,2013],["Beauty and the Beast","Animation",8.0,1991],["Aladdin","Animation",8.0,1992],["The Little Mermaid","Animation",7.6,1989],["Mulan","Animation",7.7,1998],["Pocahontas","Animation",6.7,1995],["The Hunchback of Notre Dame","Animation",7.3,1996],["Tarzan","Animation",7.3,1999],["Brother Bear","Animation",6.8,2003],["Bolt","Animation",6.8,2008],["Wreck-It Ralph","Animation",7.7,2012],["Ralph Breaks the Internet","Animation",7.0,2018],["Big Hero 6","Animation",7.8,2014],["Raya and the Last Dragon","Animation",7.3,2021],["Toy Story 4","Animation",7.7,2019],["Toy Story 2","Animation",7.9,1999],["Monsters University","Animation",7.2,2013],["Finding Dory","Animation",7.3,2016],["Cars","Animation",7.2,2006],["Cars 2","Animation",6.1,2011],["Brave","Animation",7.1,2012],["Onward","Animation",7.4,2020],["A Bug's Life","Animation",7.2,1998],["The Good Dinosaur","Animation",6.7,2015],["Despicable Me 2","Animation",7.3,2013],["Despicable Me 3","Animation",6.2,2017],["Minions: The Rise of Gru","Animation",6.5,2022],["Sing","Animation",7.1,2016],["Sing 2","Animation",7.4,2021],["The Secret Life of Pets","Animation",6.5,2016],["Kung Fu Panda 3","Animation",7.1,2016],["Kung Fu Panda 4","Animation",6.3,2024],["How to Train Your Dragon 2","Animation",7.8,2014],["How to Train Your Dragon: The Hidden World","Animation",7.4,2019],["Madagascar","Animation",6.9,2005],["Ice Age","Animation",7.5,2002],["Ice Age: Dawn of the Dinosaurs","Animation",6.9,2009],["Shrek the Third","Animation",6.1,2007],["Shrek Forever After","Animation",6.3,2010],["Megamind","Animation",7.2,2010],["The Boss Baby","Animation",6.3,2017],["Trolls","Animation",6.4,2016],["Hotel Transylvania","Animation",7.0,2012],["The Lego Movie","Animation",7.7,2014],["The Lego Batman Movie","Animation",7.3,2017],["Cloudy with a Chance of Meatballs","Animation",6.9,2009],["Rio","Animation",6.9,2011],["Chicken Run","Animation",7.0,2000],["Wallace & Gromit: The Curse of the Were-Rabbit","Animation",7.5,2005],["Coraline","Animation",7.7,2009],["Kubo and the Two Strings","Animation",7.7,2016],["Isle of Dogs","Animation",7.8,2018],["Fantastic Mr. Fox","Animation",7.9,2009],["Persepolis","Animation",8.0,2007],["Waltz with Bashir","Animation",8.0,2008],["Ponyo","Animation",7.6,2008],["Porco Rosso","Animation",7.7,1992],["Nausicaä of the Valley of the Wind","Animation",8.0,1984],["The Wind Rises","Animation",7.8,2013],["Perfect Blue","Animation",8.0,1997],["Paprika","Animation",7.7,2006],["I Want to Eat Your Pancreas","Animation",7.7,2018],["Violet Evergarden: The Movie","Animation",8.4,2020],["Mirai","Animation",7.0,2018],["Belle","Animation",7.2,2021],["The Garden of Words","Animation",7.5,2013],["5 Centimeters per Second","Animation",7.5,2007],["Tokyo Godfathers","Animation",7.8,2003],["Easy A","Comedy",7.0,2010],["Bridesmaids","Comedy",6.8,2011],["Mamma Mia!","Romance",6.5,2008],["The Devil Wears Prada","Comedy",6.9,2006],["When Harry Met Sally...","Romance",7.7,1989],["Sleepless in Seattle","Romance",6.8,1993],["You've Got Mail","Romance",6.7,1998],["Bridget Jones's Diary","Romance",6.7,2001],["The Proposal","Romance",6.7,2009],["Crazy, Stupid, Love.","Romance",7.4,2011],["Silver Linings Playbook","Romance",7.7,2012],["Sixteen Candles","Comedy",7.1,1984],["Mrs. Doubtfire","Comedy",7.1,1993],["Elf","Comedy",7.1,2003],["Old School","Comedy",7.0,2003],["Wedding Crashers","Comedy",7.0,2005],["Talladega Nights","Comedy",6.5,2006],["Borat","Comedy",7.3,2006],["Knocked Up","Comedy",6.9,2007],["Pineapple Express","Comedy",6.9,2008],["Dodgeball","Comedy",6.7,2004],["Blades of Glory","Comedy",6.3,2007],["Meet the Parents","Comedy",7.0,2000],["There's Something About Mary","Comedy",7.1,1998],["American Pie","Comedy",6.9,1999],["Scary Movie","Comedy",6.2,2000],["Austin Powers: International Man of Mystery","Comedy",7.0,1997],["Coming to America","Comedy",7.0,1988],["Beverly Hills Cop","Comedy",7.3,1984],["Big","Comedy",7.3,1988],["Tootsie","Comedy",7.4,1982],["Airplane!","Comedy",7.7,1980],["Blazing Saddles","Comedy",7.7,1974],["Uncut Gems","Crime",7.4,2019],["Jojo Rabbit","Comedy",7.9,2019],["Lady Bird","Comedy",7.4,2017],["Booksmart","Comedy",7.1,2019],["Little Miss Sunshine","Comedy",7.8,2006],["Juno","Comedy",7.4,2007],["Napoleon Dynamite","Comedy",6.9,2004],["Pitch Perfect","Comedy",7.1,2012],["To All the Boys I've Loved Before","Romance",7.0,2018],["Anyone But You","Romance",6.1,2023],["Set It Up","Romance",6.5,2018],["Palm Springs","Comedy",7.4,2020],["The Lost City","Comedy",6.1,2022],["Ticket to Paradise","Romance",6.0,2022],["Yesterday","Romance",6.6,2019],["Red, White & Royal Blue","Romance",7.0,2023],["It Ends with Us","Romance",6.5,2024]
    ];
    const rawShowsMore = [
      ["Adolescence","Drama",8.1,2025],["The Pitt","Drama",8.7,2025],["Baby Reindeer","Drama",7.7,2024],["Nobody Wants This","Comedy",7.5,2024],["Beef","Comedy",8.0,2023],["The Diplomat","Thriller",7.8,2023],["Black Doves","Thriller",7.4,2024],["Paradise","Thriller",8.0,2025],["Task","Crime",8.1,2025],["Dope Thief","Crime",7.6,2025],["Alien: Earth","Sci-Fi",7.6,2025],["Peacemaker","Action",8.2,2022],["Daredevil: Born Again","Action",8.2,2025],["Ironheart","Action",5.6,2025],["Agatha All Along","Fantasy",7.3,2024],["Echo","Action",6.4,2024],["Secret Invasion","Sci-Fi",5.2,2023],["Moon Knight","Action",7.2,2022],["She-Hulk: Attorney at Law","Comedy",5.2,2022],["Ms. Marvel","Action",6.1,2022],["Hawkeye","Action",7.5,2021],["The Falcon and the Winter Soldier","Action",7.2,2021],["What If...?","Animation",7.4,2021],["The Penguin","Crime",8.6,2024],["Creature Commandos","Animation",7.8,2024],["Dune: Prophecy","Sci-Fi",7.0,2024],["Rings of Power","Fantasy",6.8,2022],["The Wheel of Time","Fantasy",7.0,2021],["Shadow and Bone","Fantasy",7.5,2021],["Reacher","Action",8.1,2022],["Jack Ryan","Action",8.0,2018],["Bosch","Crime",8.4,2014],["Bosch: Legacy","Crime",8.2,2022],["Lioness","Action",7.5,2023],["Tulsa King","Crime",7.4,2022],["Landman","Drama",8.1,2024],["1923","Western",8.3,2022],["1883","Western",8.8,2021],["Lawmen: Bass Reeves","Western",8.0,2023],["Mayor of Kingstown","Crime",8.0,2021],["Shrinking","Comedy",8.1,2023],["Only Murders in the Building","Comedy",8.1,2021],["Abbott Elementary","Comedy",7.8,2021],["What We Do in the Shadows","Comedy",8.5,2019],["Hacks","Comedy",8.1,2021],["Reservation Dogs","Comedy",8.3,2021],["Russian Doll","Comedy",7.7,2019],["Dead to Me","Comedy",7.8,2019],["Ginny & Georgia","Drama",7.4,2021],["Never Have I Ever","Comedy",7.9,2020],["Sex Education","Comedy",8.3,2019],["Heartstopper","Romance",8.6,2022],["Outer Banks","Drama",7.4,2020],["Virgin River","Romance",7.4,2019],["The Summer I Turned Pretty","Romance",7.2,2022],["Narcos: Mexico","Crime",8.3,2018],["1899","Sci-Fi",7.3,2022],["3 Body Problem","Sci-Fi",7.5,2024],["Silo","Sci-Fi",8.1,2023],["Foundation","Sci-Fi",7.5,2021],["For All Mankind","Sci-Fi",8.0,2019],["Altered Carbon","Sci-Fi",7.9,2018],["Gen V","Action",7.6,2023],["Blue Eye Samurai","Animation",8.7,2023],["Dan Da Dan","Animation",8.5,2024],["Solo Leveling","Animation",8.2,2024],["Frieren: Beyond Journey's End","Animation",9.0,2023],["Dungeon Meshi","Animation",8.7,2024],["Kaiju No. 8","Animation",8.0,2024],["Spy x Family","Animation",8.5,2022],["Black Clover","Animation",8.1,2017],["Fairy Tail","Animation",7.9,2009],["Tokyo Ghoul","Animation",7.8,2014],["Sword Art Online","Animation",7.2,2012],["Fire Force","Animation",7.7,2019],["Blue Lock","Animation",8.2,2022],["Oshi no Ko","Animation",8.5,2023],["Bocchi the Rock!","Animation",8.8,2022],["Violet Evergarden","Animation",8.5,2018],["Your Lie in April","Animation",8.6,2014],["Re:Zero","Animation",8.3,2016],["Mushoku Tensei","Animation",8.3,2021],["Hell's Paradise","Animation",8.0,2023],["Trigun Stampede","Animation",7.9,2023],["American Dad!","Animation",7.7,2005],["Bob's Burgers","Animation",8.2,2011],["Archer","Animation",8.6,2009],["King of the Hill","Animation",8.4,1997],["Regular Show","Animation",8.4,2010],["Steven Universe","Animation",8.2,2013],["The Owl House","Animation",8.5,2020],["Amphibia","Animation",8.4,2019],["Phineas and Ferb","Animation",8.1,2007],["SpongeBob SquarePants","Animation",8.2,1999],["The Legend of Korra","Animation",8.5,2012],["Avatar: The Last Airbender (2024)","Fantasy",7.3,2024],["One Piece (Live Action)","Fantasy",8.3,2023],["Harley Quinn","Animation",8.0,2019],["Hazbin Hotel","Animation",8.0,2024],["Helluva Boss","Animation",8.3,2019],["Primal","Animation",8.6,2019],["Star Wars: The Clone Wars","Animation",8.4,2008],["Star Wars: Rebels","Animation",8.2,2014],["Star Wars: The Bad Batch","Animation",7.8,2021],["The Book of Boba Fett","Sci-Fi",6.5,2021],["Obi-Wan Kenobi","Sci-Fi",7.0,2022],["Ahsoka","Sci-Fi",7.4,2023],["Skeleton Crew","Sci-Fi",7.6,2024],["Frasier","Comedy",8.6,1993],["Cheers","Comedy",7.8,1982],["The Fresh Prince of Bel-Air","Comedy",8.3,1990],["Everybody Loves Raymond","Comedy",8.2,1996],["Two and a Half Men","Comedy",7.0,2003],["That '70s Show","Comedy",8.1,1998],["Scrubs","Comedy",8.3,2001],["30 Rock","Comedy",8.2,2006],["Malcolm in the Middle","Comedy",8.2,2000],["Young Sheldon","Comedy",7.5,2017],["Mr. Bean","Comedy",8.4,1990],["Fawlty Towers","Comedy",8.8,1975],["Black Books","Comedy",8.5,2000],["The IT Crowd","Comedy",8.5,2006],["Peep Show","Comedy",8.4,2003],["Derry Girls","Comedy",8.3,2018],["Ghosts","Comedy",7.8,2019],["Not Going Out","Comedy",7.6,2006],["Taskmaster","Comedy",8.6,2015],["Veep","Comedy",8.3,2012],["Entourage","Comedy",7.8,2004],["Girls","Comedy",7.3,2012],["The O.C.","Drama",7.7,2003],["Dawson's Creek","Drama",7.7,1998],["One Tree Hill","Drama",7.7,2003],["Riverdale","Drama",6.5,2017],["13 Reasons Why","Drama",7.5,2017],["This Is Us","Drama",8.7,2016],["House","Drama",8.7,2004],["ER","Drama",7.9,1994],["The Good Doctor","Drama",8.0,2017],["Doctor Odyssey","Drama",6.5,2024],["Dexter: Resurrection","Crime",7.7,2025],["Sons of Anarchy","Crime",8.6,2008],["A Knight of the Seven Kingdoms","Fantasy",8.6,2026],["Billions","Drama",8.4,2016],["The West Wing","Drama",8.9,1999],["Yes Minister","Comedy",8.8,1980],["Criminal Minds","Crime",8.1,2005],["CSI: Crime Scene Investigation","Crime",7.7,2000],["NCIS","Crime",7.7,2003],["Law & Order: Special Victims Unit","Crime",8.0,1999],["Monk","Crime",8.1,2002],["Psych","Comedy",8.3,2006],["The Mentalist","Crime",8.2,2008],["Castle","Crime",8.1,2009],["Elementary","Crime",7.8,2012],["Broadchurch","Crime",8.4,2013],["Luther","Crime",8.5,2010],["Happy Valley","Crime",8.5,2014],["Top of the Lake","Crime",7.6,2013],["The Fall","Crime",8.0,2013],["Killing Eve","Thriller",8.2,2018],["Bodyguard","Thriller",8.1,2018],["Vigil","Thriller",7.2,2021],["Mr. & Mrs. Smith","Action",7.4,2024],["Gangs of London","Action",8.2,2020],["Top Boy","Crime",8.3,2011],["Shameless","Comedy",8.6,2011],["Skins","Drama",8.2,2007],["Misfits","Sci-Fi",8.2,2009],["The Inbetweeners","Comedy",8.4,2008],["Call the Midwife","Drama",8.1,2012],["Torchwood","Sci-Fi",7.5,2006],["Merlin","Fantasy",7.9,2008],["Buffy the Vampire Slayer","Fantasy",8.3,1997],["Charmed","Fantasy",7.2,1998],["True Blood","Horror",7.9,2008],["Fear the Walking Dead","Horror",6.9,2015],["Walking Dead: Daryl Dixon","Horror",7.8,2023],["The Haunting of Hill House","Horror",8.6,2018],["The Haunting of Bly Manor","Horror",7.4,2020],["Midnight Mass","Horror",7.7,2021],["The Fall of the House of Usher","Horror",7.6,2023],["Evil","Horror",7.8,2019],["Penny Dreadful","Horror",8.2,2014],["Slasher","Horror",6.6,2016],["From","Horror",7.8,2022],["Resident Evil","Horror",5.2,2022],["Black Summer","Horror",6.6,2019],["Station Eleven","Drama",7.9,2021],["The Leftovers","Drama",8.3,2014],["Watchmen","Sci-Fi",7.6,2019],["Legion","Sci-Fi",8.1,2017],["Lovecraft Country","Horror",7.2,2020],["The Man in the High Castle","Sci-Fi",7.9,2015],["The 100","Sci-Fi",7.6,2014],["Heroes","Sci-Fi",7.6,2006],["Smallville","Sci-Fi",7.5,2001],["Arrow","Action",7.5,2012],["The Flash","Action",7.5,2014],["Supergirl","Action",6.2,2015],["Legends of Tomorrow","Action",6.9,2016],["Gotham","Crime",7.8,2014],["Titans","Action",7.0,2018],["Doom Patrol","Action",7.8,2019],["Jessica Jones","Crime",7.9,2015],["Luke Cage","Crime",7.3,2016],["Iron Fist","Action",6.4,2017],["The Defenders","Action",6.7,2017],["Agents of S.H.I.E.L.D.","Action",7.5,2013],["Agent Carter","Action",7.9,2015],["Star Trek: Picard","Sci-Fi",7.2,2020],["Star Trek: Discovery","Sci-Fi",7.0,2017],["Star Trek: Strange New Worlds","Sci-Fi",8.2,2022],["Star Trek: Voyager","Sci-Fi",7.8,1995],["Stargate SG-1","Sci-Fi",8.4,1997],["Babylon 5","Sci-Fi",8.4,1994],["Quantum Leap","Sci-Fi",7.7,2022],["Lost in Space","Sci-Fi",7.3,2018],["Raised by Wolves","Sci-Fi",7.0,2020],["Upload","Comedy",7.9,2020],["Resident Alien","Comedy",7.9,2021],["Utopia","Thriller",8.4,2013],["Counterpart","Sci-Fi",8.1,2017],["Devs","Sci-Fi",7.6,2020],["Aspirants","Drama",9.0,2021],["TVF Pitchers","Comedy",9.1,2015],["Permanent Roommates","Comedy",8.4,2014],["Made in Heaven","Drama",8.1,2019],["Heeramandi","Drama",6.6,2024],["Jubilee","Drama",8.2,2023],["Kohrra","Crime",7.9,2023],["Dahaad","Crime",7.8,2023],["Criminal Justice","Crime",8.0,2019],["Aarya","Crime",7.6,2020],["Breathe","Thriller",7.9,2018],["Inside Edge","Drama",7.8,2017],["Bandish Bandits","Romance",8.4,2020],["Mismatched","Romance",6.7,2020],["Little Things","Romance",8.2,2016],["Four More Shots Please!","Drama",6.1,2019],["Jamtara","Crime",7.6,2020],["Undekhi","Crime",7.7,2020],["Bhaukaal","Crime",7.6,2020],["Mumbai Diaries 26/11","Drama",7.7,2021],["Ray","Thriller",6.7,2021],["Taj: Divided by Blood","Drama",6.6,2023],["Khakee: The Bihar Chapter","Crime",7.6,2025],["Black Warrant","Crime",8.7,2025],["Gyaarah Gyaarah","Thriller",7.4,2024],["Mastram","Drama",7.0,2020],["Apharan","Crime",7.7,2018],["Rangbaaz","Crime",8.0,2018],["Illegal","Drama",7.3,2020],["Yeh Meri Family","Comedy",8.7,2018],["Hostel Daze","Comedy",8.3,2019],["Flames","Romance",8.5,2018],["Engineering Girls","Comedy",8.1,2018],["College Romance","Comedy",7.8,2018],["Sandeep Bhaiya","Comedy",8.0,2020],["The Railway Men","Drama",8.5,2023],["Tanaav","Action",8.1,2022],["Rana Naidu","Crime",6.5,2023],["Scoop","Crime",7.6,2023],["Trial by Fire","Drama",7.8,2023],["Lootere","Thriller",7.8,2024],["Maamla Legal Hai","Comedy",8.2,2024],["Yeh Kaali Kaali Ankhein","Romance",6.8,2022],["Maharani","Drama",7.8,2021],["Bambai Meri Jaan","Crime",7.7,2023],["Ek Thi Begum","Crime",6.9,2020],["Special OPS 1.5","Thriller",8.2,2021],["Ordinary Heroes","Drama",7.5,2020],["Sunflower","Comedy",6.9,2021],["Chacha Vidhayak Hain Humare","Comedy",8.0,2018],["Crash Landing on You","Romance",8.7,2019],["Goblin","Fantasy",8.6,2016],["Descendants of the Sun","Romance",8.2,2016],["Reply 1988","Drama",9.2,2015],["Itaewon Class","Drama",8.2,2020],["Vincenzo","Crime",8.4,2021],["Hospital Playlist","Drama",8.8,2020],["Move to Heaven","Drama",8.7,2021],["Extraordinary Attorney Woo","Drama",8.5,2022],["The Glory","Drama",8.1,2022],["All of Us Are Dead","Horror",7.5,2022],["Sweet Home","Horror",7.4,2020],["Kingdom","Horror",8.3,2019],["My Name","Crime",7.6,2021],["Hellbound","Horror",6.8,2021],["Moving","Fantasy",8.5,2023],["Weak Hero Class 1","Action",8.4,2022],["Business Proposal","Romance",7.8,2022],["Our Beloved Summer","Romance",8.4,2021],["Hometown Cha-Cha-Cha","Romance",8.5,2021],["Queen of Tears","Romance",8.2,2024],["When Life Gives You Tangerines","Drama",8.8,2025],["Bon Appétit, Your Majesty","Romance",8.2,2025],["Mr. Queen","Comedy",8.5,2020],["It's Okay to Not Be Okay","Romance",8.7,2020],["Start-Up","Romance",8.0,2020],["Strong Girl Bong-soon","Comedy",8.4,2017],["Boys Over Flowers","Romance",7.5,2009],["Healer","Action",8.4,2014],["Signal","Crime",8.7,2016],["Mr. Sunshine","Drama",8.7,2018],["Sky Castle","Drama",8.3,2018],["Misaeng","Drama",9.0,2014],["Prison Playbook","Comedy",8.7,2017],["Hotel Del Luna","Fantasy",8.1,2019],["The Untamed","Fantasy",8.5,2019],["Nirvana in Fire","Drama",8.8,2015],["Story of Yanxi Palace","Drama",8.5,2018],["Eternal Love","Fantasy",8.0,2017],["Love Between Fairy and Devil","Fantasy",8.1,2022],["Meteor Garden","Romance",7.2,2001],["Alice in Borderland","Thriller",7.7,2020],["Terrace House","Documentary",7.9,2012],["Midnight Diner","Drama",8.3,2009],["The Makanai: Cooking for the Maiko House","Drama",7.7,2023],["Pachinko","Drama",8.3,2022],["Beyond Evil","Crime",8.8,2021],["Mouse","Thriller",8.4,2021],["Taxi Driver","Crime",8.4,2021],["Stranger","Crime",8.7,2017],["Seven Worlds, One Planet","Documentary",8.9,2019],["Dynasties","Documentary",9.0,2018],["Life on Our Planet","Documentary",8.2,2023],["Planet Earth III","Documentary",8.6,2023],["Drive to Survive","Documentary",8.5,2019],["Cheer","Documentary",8.2,2020],["Street Food","Documentary",8.4,2019],["Explained","Documentary",8.1,2018],["The Social Dilemma","Documentary",7.6,2020],["My Octopus Teacher","Documentary",8.1,2020],["Free Solo","Documentary",8.1,2018],["Dear Mr. Watterson","Documentary",7.6,2013],["Don't F**k with Cats","Documentary",7.6,2019],["The Keepers","Documentary",8.0,2017],["The Staircase","Documentary",8.0,2004],["The Jinx","Documentary",8.6,2015],["Abducted in Plain Sight","Documentary",7.6,2017],["The Tinder Swindler","Documentary",7.2,2022],["Inventing Anna","Drama",6.6,2022],["The Dropout","Drama",7.8,2022],["WeCrashed","Drama",7.0,2022],["Dahmer","Crime",8.0,2022],["Monster: The Jeffrey Dahmer Story","Crime",7.9,2022],["Break Point","Documentary",7.6,2023],["Full Swing","Documentary",7.7,2023],["Quarterback","Documentary",8.0,2023],["Beckham","Documentary",8.2,2023],["Sunderland 'Til I Die","Documentary",8.7,2018],["All or Nothing: Manchester City","Documentary",8.5,2018],["Welcome to Wrexham","Documentary",8.3,2022],["Love Is Blind","Documentary",6.0,2020],["Selling Sunset","Documentary",6.4,2019],["Queer Eye","Documentary",8.2,2018],["The Great British Bake Off","Documentary",8.3,2010],["MasterChef","Documentary",7.3,2005],["Top Gear","Documentary",8.7,2002],["The Grand Tour","Documentary",8.5,2016],["Shark Tank","Documentary",7.3,2009],["Survivor","Documentary",7.4,2000],["The Amazing Race","Documentary",7.8,2001],["Dragon's Den","Documentary",7.1,2005],["Who Wants to Be a Millionaire?","Documentary",7.2,1998],["Kaun Banega Crorepati","Documentary",6.9,2000],["Indian Idol","Documentary",6.3,2004],["Roadies","Documentary",5.8,2003],["Bigg Boss","Documentary",4.8,2006],["Koffee with Karan","Comedy",5.9,2004],["The Kapil Sharma Show","Comedy",5.5,2016],["Taarak Mehta Ka Ooltah Chashmah","Comedy",7.7,2008],["CID","Crime",8.2,1998],["Mahabharat (1988)","Drama",9.4,1988],["Ramayan (1987)","Drama",9.3,1987],["Malgudi Days","Drama",9.0,1986],["Byomkesh Bakshi","Crime",8.7,1993],["Black Sails","Action",8.1,2014],["The Killing (Danish)","Crime",8.4,2007],["Wallander","Crime",7.8,2008],["Ragnarok","Fantasy",7.0,2020],["The Rain","Sci-Fi",6.3,2018],["Money Heist: Berlin","Crime",6.7,2023],["La Casa de las Flores","Comedy",7.8,2018],["Cable Girls","Drama",7.5,2017],["Velvet","Drama",8.0,2013],["Merli","Drama",7.4,2015],["One Hundred Years of Solitude","Drama",8.0,2024]
    ];

    // ---- Popularity-ordered expansion pack (compact format: "Title|year|rating x10"; "#Genre" switches genre) ----
    // Tier 1 = most popular (real thumbnails). Tier 2 = long tail (stylized posters only, no network fetches).
    const compactMoviesT1 = `
#Action
Gladiator|2000|85
John Wick|2014|74
John Wick: Chapter 4|2023|77
The Fast and the Furious|2001|68
Fast Five|2011|73
Mission: Impossible - Fallout|2018|77
Mission: Impossible - Dead Reckoning Part One|2023|77
Skyfall|2012|78
Casino Royale|2006|80
No Time to Die|2021|73
Die Hard|1988|82
Terminator 2: Judgment Day|1991|86
The Matrix Reloaded|2003|72
Kill Bill: Vol. 1|2003|81
Mad Max 2: The Road Warrior|1981|76
Rambo: First Blood|1982|72
Predator|1987|78
RoboCop|1987|76
The Mummy|1999|71
Pirates of the Caribbean: The Curse of the Black Pearl|2003|81
Kingsman: The Secret Service|2014|77
Edge of Tomorrow|2014|79
Taken|2008|77
The Bourne Identity|2002|79
The Bourne Ultimatum|2007|80
Thor: Love and Thunder|2022|62
Black Widow|2021|67
Shang-Chi and the Legend of the Ten Rings|2021|75
Spider-Man: No Way Home|2021|82
Spider-Man 2|2004|75
Captain Marvel|2019|68
Ant-Man|2015|72
Aquaman|2018|68
Wonder Woman|2017|74
Justice League|2017|61
Suicide Squad|2016|59
Black Panther: Wakanda Forever|2022|67
The Marvels|2023|55
Fantastic Four: First Steps|2025|72
Superman|2025|71
Thunderbolts*|2025|74
Captain America: Brave New World|2025|58
Jurassic World|2015|69
Jurassic World Dominion|2022|56
Transformers|2007|71
Bumblebee|2018|68
Rush Hour|1998|70
Bad Boys for Life|2020|66
Ford v Ferrari|2019|81
Nobody|2021|74
The Equalizer|2014|72
Extraction|2020|67
The Gray Man|2022|65
Red Notice|2021|63
The Old Guard|2020|66
Tenet|2020|73
Bullet Train|2022|73
#Sci-Fi
Terminator: Dark Fate|2019|62
The Martian|2015|80
Gravity|2013|77
Arrival|2016|79
Ex Machina|2014|77
Blade Runner 2049|2017|80
Blade Runner|1982|81
Minority Report|2002|76
I, Robot|2004|71
Elysium|2013|65
Oblivion|2013|70
Tron: Legacy|2010|68
Ready Player One|2018|74
Independence Day|1996|70
Men in Black|1997|73
Signs|2002|67
War of the Worlds|2005|65
Looper|2012|74
Source Code|2011|75
Interstellar|2014|87
Star Trek|2009|79
Rogue One: A Star Wars Story|2016|78
Star Wars: The Force Awakens|2015|78
Star Wars: Revenge of the Sith|2005|76
Star Wars: Return of the Jedi|1983|83
Star Wars: The Phantom Menace|1999|65
Godzilla Minus One|2023|78
Pacific Rim|2013|69
Cloverfield|2008|70
A Quiet Place|2018|75
Don't Look Up|2021|72
Project Hail Mary|2026|80
Tron: Ares|2025|60
Avatar: Fire and Ash|2025|74
#Animation
Frozen|2013|74
Frozen II|2019|68
Toy Story|1995|83
Toy Story 3|2010|83
Finding Nemo|2003|82
Finding Dory|2016|72
The Incredibles|2004|80
Shrek|2001|79
Shrek 2|2004|73
Kung Fu Panda|2008|76
How to Train Your Dragon|2010|81
Despicable Me|2010|76
Minions|2015|64
Zootopia|2016|80
Moana|2016|76
Encanto|2021|72
Coco|2017|84
Soul|2020|80
Luca|2021|74
Turning Red|2022|70
Ratatouille|2007|81
Monsters, Inc.|2001|81
Cars|2006|72
Big Hero 6|2014|78
Tangled|2010|77
The Lion King|1994|85
Aladdin|1992|80
Beauty and the Beast|1991|80
The Little Mermaid|1989|76
Ice Age|2002|76
Madagascar|2005|66
The Super Mario Bros. Movie|2023|70
Puss in Boots: The Last Wish|2022|79
The Wild Robot|2024|82
Elio|2025|68
Zootopia 2|2025|76
KPop Demon Hunters|2025|79
Ne Zha 2|2025|76
Lilo & Stitch|2002|73
Mulan|1998|76
Pinocchio|1940|74
#Comedy
Superbad|2007|76
The Hangover|2009|77
Step Brothers|2008|69
Anchorman: The Legend of Ron Burgundy|2004|72
Bridesmaids|2011|68
Mean Girls|2004|71
Ferris Bueller's Day Off|1986|78
Groundhog Day|1993|80
Home Alone|1990|77
Elf|2003|70
Dumb and Dumber|1994|73
Ace Ventura: Pet Detective|1994|69
The Mask|1994|70
Rush Hour 2|2001|66
Tropic Thunder|2008|71
Zoolander|2001|65
White Chicks|2004|58
Napoleon Dynamite|2004|69
Borat|2006|73
Knives Out|2019|79
Glass Onion: A Knives Out Mystery|2022|71
Free Guy|2021|71
Jumanji: Welcome to the Jungle|2017|69
Deadpool 2|2018|77
The Intern|2015|71
Daddy's Home|2015|61
Game Night|2018|69
Ted|2012|69
Anyone But You|2023|62
Jojo Rabbit|2019|79
Lady Bird|2017|74
#Horror
The Conjuring|2013|75
Insidious|2010|68
Sinister|2012|68
Get Out|2017|77
Us|2019|68
Hereditary|2018|73
Midsommar|2019|71
It|2017|73
The Exorcist|1973|81
Halloween|1978|77
A Nightmare on Elm Street|1984|74
Scream|1996|74
Smile|2022|65
Barbarian|2022|70
Sinners|2025|76
Weapons|2025|75
28 Days Later|2002|76
28 Years Later|2025|68
Final Destination Bloodlines|2025|67
Terrifier 3|2024|67
Nosferatu|2024|72
Saw|2004|76
Paranormal Activity|2007|63
The Ring|2002|71
Annabelle|2014|54
Train to Busan|2016|76
#Thriller
Se7en|1995|86
Shutter Island|2010|82
Gone Girl|2014|81
Prisoners|2013|82
Zodiac|2007|77
Nightcrawler|2014|78
Sicario|2015|76
Black Swan|2010|80
Joker|2019|84
The Girl with the Dragon Tattoo|2011|78
Taken 2|2012|62
Searching|2018|76
Bird Box|2018|66
The Platform|2019|70
Parasite|2019|85
Oldboy|2003|83
The Menu|2022|72
Saltburn|2023|70
#Drama
Titanic|1997|79
Whiplash|2014|85
The Pursuit of Happyness|2006|80
Good Will Hunting|1997|83
The Green Mile|1999|86
A Star Is Born|2018|76
Bohemian Rhapsody|2018|79
Rocketman|2019|73
Elvis|2022|73
Joy Ride|2023|66
The Fault in Our Stars|2014|77
Wonder|2017|79
Hidden Figures|2016|78
The Blind Side|2009|76
Moneyball|2011|76
The Social Network|2010|77
Conclave|2024|73
The Brutalist|2024|75
Anora|2024|76
A Complete Unknown|2024|74
Sing Sing|2023|79
Past Lives|2023|78
Killers of the Flower Moon|2023|76
Maestro|2023|66
Civil War|2024|70
#Romance
The Notebook|2004|78
A Walk to Remember|2002|74
Me Before You|2016|74
Five Feet Apart|2019|72
Twilight|2008|52
Dirty Dancing|1987|70
Ghost|1990|71
The Vow|2012|68
Dear John|2010|63
Palm Springs|2020|74
Past Lives|2023|78
Challengers|2024|71
#Crime
Goodfellas|1990|87
Scarface|1983|83
Training Day|2001|77
Ocean's Eleven|2001|77
Catch Me If You Can|2002|81
American Gangster|2007|78
Bad Boys|1995|69
Drive|2011|78
Baby Driver|2017|76
Peaky Blinders: The Immortal Man|2026|70
#Fantasy
Harry Potter and the Sorcerer's Stone|2001|76
Harry Potter and the Chamber of Secrets|2002|74
Harry Potter and the Prisoner of Azkaban|2004|79
Harry Potter and the Goblet of Fire|2005|77
Harry Potter and the Order of the Phoenix|2007|74
Harry Potter and the Half-Blood Prince|2009|76
Harry Potter and the Deathly Hallows: Part 1|2010|77
Harry Potter and the Deathly Hallows: Part 2|2011|81
Fantastic Beasts and Where to Find Them|2016|72
The Hobbit: An Unexpected Journey|2012|78
The Hobbit: The Desolation of Smaug|2013|78
The Hobbit: The Battle of the Five Armies|2014|74
The Chronicles of Narnia: The Lion, the Witch and the Wardrobe|2005|69
Pan's Labyrinth|2006|82
Stardust|2007|76
The Princess Bride|1987|81
Maleficent|2014|69
Beetlejuice Beetlejuice|2024|68
Percy Jackson & the Olympians: The Lightning Thief|2010|59
Twilight Saga: Breaking Dawn - Part 2|2012|55
#War
Saving Private Ryan|1998|86
Dunkirk|2017|78
1917|2019|82
Full Metal Jacket|1987|83
Apocalypse Now|1979|84
Platoon|1986|81
Black Hawk Down|2001|77
Fury|2014|76
Lone Survivor|2013|75
Inglourious Basterds|2009|84
The Hurt Locker|2008|75
All Quiet on the Western Front|2022|79
#Western
Unforgiven|1992|82
True Grit|2010|76
Tombstone|1993|78
Once Upon a Time in the West|1968|85
The Magnificent Seven|1960|77
Hell or High Water|2016|76
`;
    const compactMoviesT2 = `
#Action
Rambo: First Blood Part II|1985|65
Commando|1985|67
Lethal Weapon|1987|76
Speed|1994|73
True Lies|1994|72
The Rock|1996|75
Con Air|1997|69
Face/Off|1997|73
Blade|1998|71
Enemy of the State|1998|73
Gone in 60 Seconds|2000|65
Charlie's Angels|2000|56
The Transporter|2002|68
xXx|2002|59
Bad Boys II|2003|66
Man on Fire|2004|77
Troy|2004|73
Kingdom of Heaven|2005|72
Batman Begins|2005|82
300|2006|76
Live Free or Die Hard|2007|71
Wanted|2008|67
Salt|2010|64
The Expendables|2010|64
Sherlock Holmes|2009|76
Safe House|2012|68
Olympus Has Fallen|2013|65
White House Down|2013|64
Jack Reacher|2012|66
Lucy|2014|64
Furious 7|2015|71
The Fate of the Furious|2017|66
Kong: Skull Island|2017|66
Atomic Blonde|2017|67
The Meg|2018|56
Rampage|2018|61
Hobbs & Shaw|2019|65
Tomb Raider|2018|63
Greyhound|2020|70
Free Fire|2016|63
Ballerina|2025|65
Mortal Kombat|2021|60
The Beekeeper|2024|65
Road House|2024|60
Fly Me to the Moon|2024|63
#Sci-Fi
Total Recall|1990|75
Back to the Future|1985|85
Back to the Future Part II|1989|78
Back to the Future Part III|1990|74
The Fifth Element|1997|76
Contact|1997|75
Armageddon|1998|67
Deep Impact|1998|62
Galaxy Quest|1999|73
The Time Machine|2002|59
Equilibrium|2002|75
Serenity|2005|78
Children of Men|2006|79
Sunshine|2007|73
District 9|2009|79
Moon|2009|78
Predators|2010|64
Super 8|2011|70
Prometheus|2012|70
Edge of Darkness|2010|65
Chappie|2015|68
Ant-Man and the Wasp|2018|70
Annihilation|2018|68
Alita: Battle Angel|2019|73
Ad Astra|2019|65
Tenet|2020|73
Boss Level|2020|68
Moonfall|2022|50
The Creator|2023|68
Atlas|2024|57
The Electric State|2025|52
#Animation
Hercules|1997|73
Tarzan|1999|72
Lilo and Stitch|2002|73
Brother Bear|2003|68
Chicken Run|2000|70
Robots|2005|64
Over the Hedge|2006|66
Happy Feet|2006|65
Bee Movie|2007|61
Bolt|2008|68
Megamind|2010|72
Rio|2011|69
Wreck-It Ralph|2012|77
Brave|2012|71
Monsters University|2013|72
Planes|2013|57
The Peanuts Movie|2015|70
Sing|2016|72
Trolls|2016|65
The Boss Baby|2017|63
Ferdinand|2017|67
Smallfoot|2018|66
Abominable|2019|68
Onward|2020|74
Raya and the Last Dragon|2021|73
The Mitchells vs. the Machines|2021|76
Sing 2|2021|73
Strange World|2022|56
Wish|2023|55
Migration|2023|65
Ruby Gillman, Teenage Kraken|2023|58
Kung Fu Panda 4|2024|63
Despicable Me 4|2024|59
The Bad Guys|2022|68
Flow|2024|83
#Comedy
Airplane!|1980|77
Caddyshack|1980|72
Ghostbusters|1984|78
Beverly Hills Cop|1984|73
Coming to America|1988|70
Big|1988|73
Wayne's World|1992|70
Mrs. Doubtfire|1993|71
Clueless|1995|69
Happy Gilmore|1996|70
Austin Powers: International Man of Mystery|1997|70
There's Something About Mary|1998|71
American Pie|1999|70
Office Space|1999|77
Meet the Parents|2000|70
Old School|2003|71
Bad Santa|2003|70
Bruce Almighty|2003|68
Dodgeball|2004|67
The 40-Year-Old Virgin|2005|71
Wedding Crashers|2005|70
Talladega Nights|2006|66
Knocked Up|2007|69
Pineapple Express|2008|69
Role Models|2008|68
Zombieland|2009|76
Easy A|2010|70
Horrible Bosses|2011|69
21 Jump Street|2012|72
This Is the End|2013|66
Neighbors|2014|63
Ride Along|2014|62
Spy|2015|66
The Nice Guys|2016|74
Sausage Party|2016|61
Girls Trip|2017|62
Blockers|2018|62
Booksmart|2019|71
Long Shot|2019|68
Palm Springs|2020|74
The Lost City|2022|61
Barbie|2023|68
Bottoms|2023|67
No Hard Feelings|2023|62
Deadpool|2016|80
#Horror
Psycho|1960|85
Rosemary's Baby|1968|80
The Omen|1976|75
Carrie|1976|74
The Thing|1982|82
Poltergeist|1982|73
Friday the 13th|1980|64
Hellraiser|1987|70
Child's Play|1988|67
Candyman|1992|74
Interview with the Vampire|1994|76
The Blair Witch Project|1999|65
The Sixth Sense|1999|82
Final Destination|2000|67
The Others|2001|76
Wrong Turn|2003|61
The Texas Chain Saw Massacre|1974|74
Drag Me to Hell|2009|66
The Cabin in the Woods|2012|69
Evil Dead|2013|65
It Follows|2014|68
The Witch|2015|69
Don't Breathe|2016|71
Split|2016|73
A Quiet Place Part II|2020|72
Talk to Me|2022|71
The Black Phone|2022|70
Longlegs|2024|63
The Substance|2024|73
Heretic|2024|71
Bring Her Back|2025|67
#Thriller
Misery|1990|78
The Silence of the Lambs|1991|86
The Fugitive|1993|78
The Usual Suspects|1995|85
Face/Off|1997|73
The Game|1997|77
Panic Room|2002|68
Phone Booth|2002|71
Collateral|2004|75
Flightplan|2005|62
The Prestige|2006|85
Gone Baby Gone|2007|76
Taken 3|2014|60
The Gift|2015|71
Run|2020|67
The Invisible Man|2020|71
Fall|2022|64
Gone Girl|2014|81
#Drama
Rocky|1976|81
Raging Bull|1980|82
Rain Man|1988|80
Dead Poets Society|1989|81
Philadelphia|1993|77
Braveheart|1995|84
The Shawshank Redemption|1994|93
Jerry Maguire|1996|73
Gattaca|1997|78
Good Will Hunting|1997|83
Erin Brockovich|2000|73
Requiem for a Dream|2000|83
Gladiator|2000|85
Training Day|2001|77
Mystic River|2003|78
Big Fish|2003|80
Crash|2004|77
The Departed|2006|85
Little Miss Sunshine|2006|78
Into the Wild|2007|81
There Will Be Blood|2007|82
Slumdog Millionaire|2008|80
Frost/Nixon|2008|77
The Reader|2008|76
Precious|2009|73
The King's Speech|2010|80
127 Hours|2010|76
Black Swan|2010|80
The Help|2011|81
Drive|2011|78
Argo|2012|77
Silver Linings Playbook|2012|77
Les Misérables|2012|75
Philomena|2013|76
Dallas Buyers Club|2013|80
Nebraska|2013|76
Birdman|2014|77
Boyhood|2014|79
Selma|2014|75
The Theory of Everything|2014|77
The Imitation Game|2014|80
American Sniper|2014|73
Steve Jobs|2015|72
Room|2015|81
Brooklyn|2015|75
Manchester by the Sea|2016|78
Hacksaw Ridge|2016|81
Lion|2016|80
Fences|2016|72
Moonlight|2016|74
Call Me by Your Name|2017|78
Lady Bird|2017|74
Three Billboards Outside Ebbing, Missouri|2017|82
The Shape of Water|2017|73
Darkest Hour|2017|74
Green Book|2018|82
Roma|2018|77
BlacKkKlansman|2018|75
Vice|2018|72
First Man|2018|73
Marriage Story|2019|79
Little Women|2019|78
The Irishman|2019|79
Judy|2019|68
Nomadland|2020|73
Minari|2020|75
The Father|2020|82
Sound of Metal|2019|78
Promising Young Woman|2020|72
The Trial of the Chicago 7|2020|77
Mank|2020|69
Belfast|2021|72
CODA|2021|80
Licorice Pizza|2021|72
The Power of the Dog|2021|68
King Richard|2021|75
The Fabelmans|2022|76
Tár|2022|74
The Banshees of Inisherin|2022|77
Women Talking|2022|69
Aftersun|2022|77
The Whale|2022|77
Air|2023|74
Priscilla|2023|65
American Fiction|2023|75
The Zone of Interest|2023|74
Wicked|2024|73
Emilia Pérez|2024|55
Nickel Boys|2024|72
September 5|2024|72
#Romance
Roman Holiday|1953|80
An Affair to Remember|1957|75
Casablanca|1942|85
Sleepless in Seattle|1993|68
When Harry Met Sally...|1989|77
Sense and Sensibility|1995|77
You've Got Mail|1998|67
Shakespeare in Love|1998|71
Moulin Rouge!|2001|76
Bridget Jones's Diary|2001|68
How to Lose a Guy in 10 Days|2003|65
13 Going on 30|2004|65
Atonement|2007|78
The Proposal|2009|67
Crazy, Stupid, Love.|2011|74
Silver Linings Playbook|2012|77
Beginners|2010|72
The Big Sick|2017|75
Love, Simon|2018|75
To All the Boys I've Loved Before|2018|70
Set It Up|2018|65
Always Be My Maybe|2019|68
Materialists|2025|65
#Crime
Chinatown|1974|82
Dog Day Afternoon|1975|79
Once Upon a Time in America|1984|83
Miller's Crossing|1990|77
Reservoir Dogs|1992|83
Heat|1995|83
L.A. Confidential|1997|82
Jackie Brown|1997|75
The Big Lebowski|1998|81
Fargo|1996|81
Road to Perdition|2002|77
City of God|2002|86
Infernal Affairs|2002|80
Layer Cake|2004|73
Sin City|2005|80
Lord of War|2005|76
Eastern Promises|2007|77
No Country for Old Men|2007|82
In Bruges|2008|79
Public Enemies|2009|70
Killing Them Softly|2012|62
Prisoners|2013|82
Snatch|2000|83
Widows|2018|69
Uncut Gems|2019|74
Knives Out|2019|79
The Batman|2022|78
#Fantasy
Legend|1985|65
Willow|1988|73
Hook|1991|68
The NeverEnding Story|1984|74
Labyrinth|1986|74
The Dark Crystal|1982|71
Edward Scissorhands|1990|79
Dragonheart|1996|65
Mirror Mirror|2012|56
Snow White and the Huntsman|2012|61
Alice in Wonderland|2010|64
Oz the Great and Powerful|2013|63
The Golden Compass|2007|61
Eragon|2006|51
Inkheart|2008|60
Coraline|2009|77
The Cloverfield Paradox|2018|55
Dungeons & Dragons: Honor Among Thieves|2023|72
Wonka|2023|70
#War
The Bridge on the River Kwai|1957|82
The Great Escape|1963|82
Patton|1970|79
The Deer Hunter|1978|81
Das Boot|1981|83
Empire of the Sun|1987|77
Gallipoli|1981|75
Glory|1989|78
Letters from Iwo Jima|2006|79
Flags of Our Fathers|2006|71
Defiance|2008|72
The Pianist|2002|85
Atonement|2007|78
Tora! Tora! Tora!|1970|75
Enemy at the Gates|2001|75
We Were Soldiers|2002|71
Pearl Harbor|2001|62
Midway|2019|68
Greyhound|2020|70
#Western
High Noon|1952|79
Shane|1953|76
The Searchers|1956|79
Rio Bravo|1959|80
A Fistful of Dollars|1964|80
For a Few Dollars More|1965|82
The Wild Bunch|1969|79
Pale Rider|1985|73
Dances with Wolves|1990|80
Open Range|2003|75
3:10 to Yuma|2007|76
The Revenant|2015|80
The Hateful Eight|2015|78
The Power of the Dog|2021|68
`;
    const compactShowsT1 = `
#Drama
Stranger Things|2016|87
The Crown|2016|86
This Is Us|2016|87
Grey's Anatomy|2005|76
House|2004|87
Lost|2004|83
Prison Break|2005|83
Dexter|2006|87
Homeland|2011|83
Downton Abbey|2010|87
Outlander|2014|84
The Handmaid's Tale|2017|82
Bridgerton|2020|73
13 Reasons Why|2017|75
Ozark|2017|84
Narcos|2015|88
Money Heist|2017|82
The Boys|2019|87
Succession|2018|88
The Morning Show|2019|81
Shōgun|2024|87
Slow Horses|2022|83
Reacher|2022|80
Tulsa King|2022|75
1923|2022|80
Landman|2024|82
The Penguin|2024|85
Wednesday|2022|80
The Summer I Turned Pretty|2022|66
Heartstopper|2022|85
Sex Education|2019|82
Elite|2018|74
Riverdale|2017|68
Vikings|2013|85
The Last Kingdom|2015|84
Peaky Blinders|2013|88
Better Call Saul|2015|90
Mindhunter|2017|86
Mr. Robot|2015|85
Westworld|2016|85
The Walking Dead|2010|81
Fear the Walking Dead|2015|68
Yellowjackets|2021|78
The Gilded Age|2022|71
Pachinko|2022|83
The Diplomat|2023|78
Hijack|2023|73
Mr. & Mrs. Smith|2024|72
Ripley|2024|82
Baby Reindeer|2024|77
Lessons in Chemistry|2023|78
Sweet Magnolias|2020|75
Virgin River|2019|74
Emily in Paris|2020|69
The Night Agent|2023|74
Rivals|2024|75
Industry|2020|80
Zero Day|2025|63
Dept. Q|2025|78
Murderbot|2025|77
Pluribus|2025|83
#Comedy
Friends|1994|89
The Office|2005|90
Seinfeld|1989|89
Parks and Recreation|2009|86
Arrested Development|2003|87
Two and a Half Men|2003|70
Frasier|1993|88
Cheers|1982|80
That '70s Show|1998|82
Scrubs|2001|83
30 Rock|2006|82
Abbott Elementary|2021|82
What We Do in the Shadows|2019|85
Only Murders in the Building|2021|81
Young Sheldon|2017|76
Bob's Burgers|2011|82
Family Guy|1999|82
South Park|1997|87
American Dad!|2005|76
Futurama|1999|85
Archer|2009|87
Rick and Morty|2013|91
Big Mouth|2017|77
The Marvelous Mrs. Maisel|2017|87
Hacks|2021|82
Shrinking|2023|80
Beef|2023|80
Nobody Wants This|2024|75
Wednesday|2022|80
Never Have I Ever|2020|79
Emily in Paris|2020|69
Jury Duty|2023|85
Reservation Dogs|2021|82
Barry|2018|84
Atlanta|2016|85
Silicon Valley|2014|85
Veep|2012|83
The Good Place|2016|82
Superstore|2015|79
Workaholics|2011|75
The Middle|2009|76
Mom|2013|70
Kim's Convenience|2016|77
#Sci-Fi
Black Mirror|2011|88
Stranger Things|2016|87
The Mandalorian|2019|87
The Book of Boba Fett|2021|72
Star Trek: Discovery|2017|70
Star Trek: Picard|2020|73
Star Trek: Strange New Worlds|2022|83
Ahsoka|2023|74
Obi-Wan Kenobi|2022|70
Silo|2023|82
Foundation|2021|75
Dark|2017|88
3 Body Problem|2024|75
Altered Carbon|2018|79
Lost in Space|2018|73
Supernatural|2005|84
The Umbrella Academy|2019|79
Russian Doll|2019|78
Dr. Who|1963|84
The Flash|2014|76
Arrow|2012|75
Supergirl|2015|62
Legends of Tomorrow|2016|73
Heroes|2006|77
Stargate SG-1|1997|83
Firefly|2002|90
Westworld|2016|85
Love, Death & Robots|2019|84
Paradise|2025|80
Alien: Earth|2025|76
#Crime
Criminal Minds|2005|81
CSI: Crime Scene Investigation|2000|76
NCIS|2003|78
Law & Order: Special Victims Unit|1999|80
Law & Order|1990|79
Castle|2009|81
Bones|2005|80
The Mentalist|2008|83
Sherlock|2010|91
Luther|2010|85
Broadchurch|2013|84
True Detective|2014|89
Fargo|2014|89
Narcos: Mexico|2018|85
Lupin|2021|75
You|2018|77
Mindhunter|2017|86
Monster: The Jeffrey Dahmer Story|2022|77
Black Bird|2022|81
Poker Face|2023|79
Bosch|2014|85
Justified|2010|86
The Blacklist|2013|79
Elementary|2012|80
Blue Bloods|2010|77
Suits|2011|84
Killing Eve|2018|82
Line of Duty|2012|85
Gangs of London|2020|82
Top Boy|2011|80
Griselda|2024|66
#Fantasy
The Witcher|2019|80
The Wheel of Time|2021|71
Shadow and Bone|2021|76
Good Omens|2019|81
The Sandman|2022|78
Merlin|2008|79
Once Upon a Time|2011|77
Charmed|1998|71
Buffy the Vampire Slayer|1997|83
Teen Wolf|2011|76
The Vampire Diaries|2009|77
True Blood|2008|78
Lucifer|2016|81
Sabrina|2018|73
Percy Jackson and the Olympians|2023|75
Avatar: The Last Airbender|2024|73
One Piece|2023|83
The Lord of the Rings: The Rings of Power|2022|69
#Animation
Spongebob Squarepants|1999|82
The Simpsons|1989|87
Adventure Time|2010|86
Regular Show|2010|84
Steven Universe|2013|82
The Legend of Korra|2012|85
Scooby-Doo, Where Are You!|1969|77
Tom and Jerry|1940|82
Phineas and Ferb|2007|79
Recess|1997|77
Teen Titans|2003|78
Batman: The Animated Series|1992|90
X-Men: The Animated Series|1992|84
Hunter x Hunter|2011|90
Attack on Titan|2013|91
Death Note|2006|90
Fullmetal Alchemist: Brotherhood|2009|91
My Hero Academia|2016|83
One Punch Man|2015|87
Haikyu!!|2014|87
Tokyo Ghoul|2014|79
Sword Art Online|2012|74
Fairy Tail|2009|81
Black Clover|2017|81
Dr. Stone|2019|83
Spy x Family|2022|85
Solo Leveling|2024|82
Dan Da Dan|2024|85
Frieren: Beyond Journey's End|2023|90
Blue Eye Samurai|2023|85
Castlevania|2017|83
Arcane|2021|90
Harley Quinn|2019|79
Blue's Clues|1996|63
Peppa Pig|2004|55
Bluey|2018|90
Ben 10|2005|71
Dragon Ball Super|2015|79
#Documentary
Making a Murderer|2015|86
Tiger King|2020|75
Drive to Survive|2019|85
The Last Dance|2020|91
Cheer|2020|83
Our Planet|2019|93
Frozen Planet|2011|93
The Social Dilemma|2020|76
Free Solo|2018|82
Squid Game: The Challenge|2023|60
Last Chance U|2016|83
Surviving R. Kelly|2019|75
#War
The Pacific|2010|83
Generation Kill|2008|85
Masters of the Air|2024|79
Foyle's War|2002|85
Catch-22|2019|74
#Western
Yellowstone|2018|87
Deadwood|2004|86
Hell on Wheels|2011|83
Godless|2017|82
Longmire|2012|81
Lawmen: Bass Reeves|2023|83
`;
    const compactShowsT2 = `
#Drama
Dallas|1978|74
Dynasty|1981|66
Beverly Hills, 90210|1990|69
Melrose Place|1992|67
ER|1994|79
The West Wing|1999|89
Six Feet Under|2001|87
24|2001|84
Alias|2001|76
The O.C.|2003|75
One Tree Hill|2003|76
Desperate Housewives|2004|76
Gossip Girl|2007|74
Mad Men|2007|87
Friday Night Lights|2006|85
Boardwalk Empire|2010|84
Parenthood|2010|83
Revenge|2011|77
Nashville|2012|77
Scandal|2012|78
Orange Is the New Black|2013|80
House of Cards|2013|87
Hannibal|2013|85
Orphan Black|2013|83
Empire|2015|70
Jessica Jones|2015|78
Jane the Virgin|2014|78
How to Get Away with Murder|2014|81
The Leftovers|2014|83
Halt and Catch Fire|2014|83
Vinyl|2016|74
Westworld|2016|85
Big Little Lies|2017|85
The Deuce|2017|80
Pose|2018|83
Killing Eve|2018|82
Sharp Objects|2018|81
Euphoria|2019|83
The Act|2019|82
Watchmen|2019|79
Little Fires Everywhere|2020|79
Normal People|2020|83
I May Destroy You|2020|80
Mrs. America|2020|78
The Undoing|2020|74
Mare of Easttown|2021|84
Nine Perfect Strangers|2021|66
Maid|2021|82
Inventing Anna|2022|68
The Dropout|2022|78
Dahmer|2022|77
Bad Sisters|2022|82
Love & Death|2023|73
Fellow Travelers|2023|79
Masters of the Air|2024|79
Fallout|2024|85
The Gentlemen|2024|79
Presumed Innocent|2024|75
Disclaimer|2024|68
The Great|2020|82
Call the Midwife|2012|82
Poldark|2015|78
Victoria|2016|79
The Tudors|2007|80
The Borgias|2011|80
Spartacus|2010|85
Rome|2005|88
Black Sails|2014|82
Taboo|2017|77
Banshee|2013|84
Sons of Anarchy|2008|86
Lost Girl|2010|71
Heroes Reborn|2015|60
Chicago Fire|2012|78
Chicago P.D.|2014|78
Chicago Med|2015|75
The Good Wife|2009|83
The Good Doctor|2017|80
New Amsterdam|2018|77
9-1-1|2018|77
Station 19|2018|72
Hawaii Five-0|2010|71
Magnum P.I.|2018|69
S.W.A.T.|2017|68
FBI|2018|71
Tracker|2024|72
Evil|2019|79
Manifest|2018|73
The Resident|2018|74
Nurse Jackie|2009|82
Treme|2010|82
#Comedy
I Love Lucy|1951|83
The Honeymooners|1955|82
The Andy Griffith Show|1960|82
Bewitched|1964|77
M*A*S*H|1972|85
Happy Days|1974|74
Taxi|1978|77
Three's Company|1976|72
The Golden Girls|1985|83
Cheers|1982|80
Roseanne|1988|74
Full House|1987|68
Fresh Prince of Bel-Air|1990|79
Home Improvement|1991|74
Mad About You|1992|71
Everybody Loves Raymond|1996|82
Will & Grace|1998|74
Malcolm in the Middle|2000|82
Becker|1998|72
Spin City|1996|72
Reno 911!|2003|78
Entourage|2004|82
Weeds|2005|79
My Name Is Earl|2005|77
Rules of Engagement|2007|71
Two Broke Girls|2011|66
Happy Endings|2011|78
Girls|2012|73
The Mindy Project|2012|75
Broad City|2014|77
Unbreakable Kimmy Schmidt|2015|77
Master of None|2015|83
Grace and Frankie|2015|83
Fuller House|2016|52
Insecure|2016|79
Dead to Me|2019|79
Ramy|2019|78
Fleabag|2016|87
Derry Girls|2018|85
Ted Lasso|2020|88
Ghosts|2019|79
Ghosts US|2021|73
Alone|2015|72
Only Fools and Horses|1981|91
Blackadder|1983|88
Fawlty Towers|1975|88
The IT Crowd|2006|85
Peep Show|2003|83
Gavin & Stacey|2007|82
Inside No. 9|2014|85
Black Books|2000|85
Detectorists|2014|90
Taskmaster|2015|86
Letterkenny|2016|83
Trailer Park Boys|2001|85
Corner Gas|2004|77
Schitt's Creek|2015|85
Brooklyn Nine-Nine|2013|84
Dear White People|2017|73
Cobra Kai|2018|82
Wednesday|2022|80
Welcome to Wrexham|2022|85
Bupkis|2023|72
#Sci-Fi
The Twilight Zone|1959|90
The Outer Limits|1963|82
Star Trek|1966|83
Stargate Atlantis|2004|80
Stargate Universe|2009|78
Babylon 5|1993|84
Farscape|1999|87
Andromeda|2000|71
Dark Angel|2000|70
Smallville|2001|75
Eureka|2006|78
Torchwood|2006|78
Terminator: The Sarah Connor Chronicles|2008|77
Warehouse 13|2009|72
Falling Skies|2011|66
Revolution|2012|66
Almost Human|2013|73
12 Monkeys|2015|78
Colony|2016|74
The OA|2016|78
Travelers|2016|78
Counterpart|2017|79
The Orville|2017|80
Dark Matter|2015|75
Killjoys|2015|75
Dark Matter|2024|75
Resident Alien|2021|79
Severance|2022|87
Raised by Wolves|2020|73
Invasion|2021|66
For All Mankind|2019|80
Station Eleven|2021|80
Peacemaker|2022|83
Sweet Tooth|2021|78
Constellation|2024|69
The Last of Us|2023|88
#Crime
Columbo|1968|84
Kojak|1973|75
Starsky & Hutch|1975|74
Miami Vice|1984|74
Murder, She Wrote|1984|75
Twin Peaks|1990|88
NYPD Blue|1993|78
Homicide: Life on the Street|1993|85
The Shield|2002|87
Without a Trace|2002|74
Cold Case|2003|77
Numb3rs|2004|75
Rizzoli & Isles|2010|68
Person of Interest|2011|84
The Following|2013|75
Orange Is the New Black|2013|80
Ray Donovan|2013|82
Gotham|2014|78
Fargo|2014|89
The Fall|2013|80
Happy Valley|2014|85
Ripper Street|2012|80
Prime Suspect|1991|86
Midsomer Murders|1997|79
Agatha Christie's Poirot|1989|86
Death in Paradise|2011|77
Vera|2011|80
Shetland|2013|79
Unforgotten|2015|84
The Bay|2019|68
Bodyguard|2018|80
The Capture|2019|77
Collateral|2018|65
The Sinner|2017|79
Mindhunter|2017|86
Evil|2019|79
Manhunt: Unabomber|2017|79
The Alienist|2018|77
Gomorrah|2014|87
Narcos|2015|88
Snowfall|2017|82
Power|2014|82
Godfather of Harlem|2019|78
Truth Be Told|2019|74
The Undoing|2020|74
Cross|2024|72
#Fantasy
Xena: Warrior Princess|1995|77
Hercules: The Legendary Journeys|1995|75
Charmed|1998|71
Angel|1999|82
Supernatural|2005|84
Eastwick|2009|66
Grimm|2011|79
Sleepy Hollow|2013|74
Shadowhunters|2016|65
The Magicians|2015|77
Locke & Key|2020|73
Lucifer|2016|81
The Dragon Prince|2018|83
His Dark Materials|2019|77
Carnival Row|2019|74
Cursed|2020|65
Willow|2022|72
House of the Dragon|2022|84
Interview with the Vampire|2022|80
The Winchesters|2022|71
#Animation
The Flintstones|1960|75
The Jetsons|1962|74
Looney Tunes|1930|83
Pokémon|1997|75
Digimon Adventure|1999|78
Yu-Gi-Oh!|2000|72
Fruits Basket|2019|87
Cardcaptor Sakura|1998|80
Sailor Moon|1992|76
Neon Genesis Evangelion|1995|85
Trigun|1998|82
Samurai Champloo|2004|85
Code Geass|2006|87
Steins;Gate|2011|88
Mob Psycho 100|2016|85
Re:Zero|2016|83
Violet Evergarden|2018|85
Kaguya-sama: Love Is War|2019|86
Vinland Saga|2019|88
Cyberpunk: Edgerunners|2022|85
Bocchi the Rock!|2022|88
Oshi no Ko|2023|85
Kaiju No. 8|2024|78
Sakamoto Days|2025|75
Final Space|2018|82
Primal|2019|87
Kipo and the Age of Wonderbeasts|2020|82
Hilda|2018|86
Over the Garden Wall|2014|88
Star Wars: The Clone Wars|2008|84
Star Wars: Rebels|2014|82
Young Justice|2010|83
Avatar: The Last Airbender|2005|93
Daria|1997|79
Beavis and Butt-Head|1993|75
King of the Hill|1997|84
Rugrats|1991|80
Hey Arnold!|1996|78
Dexter's Laboratory|1996|79
The Powerpuff Girls|1998|77
Ed, Edd n Eddy|1999|80
Courage the Cowardly Dog|1999|82
Ben 10: Alien Force|2008|72
The Amazing World of Gumball|2011|82
Clarence|2014|79
We Bare Bears|2015|83
Rick and Morty|2013|91
#Documentary
The Civil War|1990|91
Cosmos: A Personal Voyage|1980|91
Life|2009|91
The Blue Planet|2001|91
Africa|2013|90
Seven Worlds, One Planet|2019|88
Dynasties|2018|91
The Jinx|2015|87
The Keepers|2017|80
Wild Wild Country|2018|82
Abducted in Plain Sight|2017|74
The Staircase|2004|80
Don't F**k with Cats|2019|78
Night Stalker: The Hunt for a Serial Killer|2021|68
Money Heist: The Phenomenon|2020|60
Street Food|2019|83
Ugly Delicious|2018|82
Salt Fat Acid Heat|2018|80
Abstract: The Art of Design|2017|82
The Vietnam War|2017|91
Hotel Hell|2012|70
Cheer|2020|83
Titan: The OceanGate Disaster|2025|65
#War
Band of Brothers|2001|94
M*A*S*H|1972|85
Hogan's Heroes|1965|78
Tour of Duty|1987|70
Over There|2005|68
The Man in the High Castle|2015|80
Sharpe|1993|80
Taking Chance|2009|78
Our Girl|2013|69
Valley of Tears|2020|78
#Western
Bonanza|1959|80
Gunsmoke|1955|80
Wagon Train|1957|78
The Lone Ranger|1949|72
Rawhide|1959|77
Maverick|1957|76
Have Gun - Will Travel|1957|79
Firefly|2002|90
Westworld|2016|85
Godless|2017|82
The English|2022|74
`;

    // ---- Expansion pack 2 (same compact format). T3 = popular with thumbnails; T4 = long tail, stylized posters only ----
    const compactMoviesT3 = `
#Action
Pushpa: The Rise|2021|76
Pushpa 2: The Rule|2024|65
RRR|2022|78
Baahubali: The Beginning|2015|80
Baahubali 2: The Conclusion|2017|82
KGF: Chapter 2|2022|83
Vikram|2022|83
Leo|2023|65
Jawan|2023|70
Pathaan|2023|59
Animal|2023|62
Dhoom 2|2006|65
War|2019|65
Tiger Zinda Hai|2017|59
Sooryavanshi|2021|50
Kalki 2898 AD|2024|71
Salaar: Part 1 - Ceasefire|2023|65
Dhurandhar|2025|75
Ip Man|2008|80
Crouching Tiger, Hidden Dragon|2000|78
Hero|2002|79
House of Flying Daggers|2004|75
The Raid|2011|76
The Raid 2|2014|79
Tomorrow Never Dies|1997|65
GoldenEye|1995|72
The World Is Not Enough|1999|63
Spectre|2015|68
Quantum of Solace|2008|65
Die Hard 2|1990|71
Die Hard with a Vengeance|1995|76
Terminator 3: Rise of the Machines|2003|63
The Last Samurai|2003|77
The Great Wall|2016|60
Rampage|2018|61
Mission: Impossible|1996|71
Mission: Impossible III|2006|69
Mission: Impossible - Ghost Protocol|2011|74
Mission: Impossible - Rogue Nation|2015|74
Mission: Impossible - The Final Reckoning|2025|68
Top Gun|1986|69
Point Break|1991|72
Heat|1995|83
The Italian Job|2003|70
Ocean's Twelve|2004|65
Ocean's Thirteen|2007|69
Dredd|2012|71
Sicario: Day of the Soldado|2018|66
Extraction 2|2023|67
Heads of State|2025|62
F1: The Movie|2025|78
The Accountant|2016|73
The Accountant 2|2025|73
Gladiator|2000|85
#Sci-Fi
Jurassic Park|1993|82
The Lost World: Jurassic Park|1997|65
Jurassic Park III|2001|59
Jurassic World: Fallen Kingdom|2018|61
Jurassic World Rebirth|2025|60
Alien|1979|85
Alien 3|1992|64
Alien: Resurrection|1997|62
The Thing|1982|82
The Terminator|1984|81
Close Encounters of the Third Kind|1977|76
E.T. the Extra-Terrestrial|1982|79
Star Wars: Attack of the Clones|2002|65
Star Wars: The Last Jedi|2017|69
Star Wars: The Rise of Skywalker|2019|63
Solo: A Star Wars Story|2018|69
The Matrix Revolutions|2003|67
The Matrix Resurrections|2021|56
Planet of the Apes|1968|76
Rise of the Planet of the Apes|2011|76
Dawn of the Planet of the Apes|2014|76
War for the Planet of the Apes|2017|74
Godzilla|2014|64
Godzilla: King of the Monsters|2019|59
Kong: Skull Island|2017|66
King Kong|2005|72
The Day After Tomorrow|2004|65
2012|2009|58
Interstellar|2014|87
Passengers|2016|70
Life|2017|66
Valerian and the City of a Thousand Planets|2017|64
Geostorm|2017|53
Mission to Mars|2000|57
Event Horizon|1997|66
Starship Troopers|1997|72
Stargate|1994|70
Dark City|1998|76
Lucy|2014|64
Upgrade|2018|75
Boss Level|2020|68
Spiderhead|2022|54
The Adam Project|2022|67
Jumanji: The Next Level|2019|67
Transformers: Dark of the Moon|2011|62
Transformers: Age of Extinction|2014|56
Transformers: Rise of the Beasts|2023|60
Mickey 17|2025|68
Superman Returns|2006|60
The Fantastic Four|2005|57
Man of Steel|2013|71
Batman v Superman: Dawn of Justice|2016|65
The Flash|2023|60
Blue Beetle|2023|59
Shazam!|2019|70
Black Adam|2022|63
The Suicide Squad|2021|72
Birds of Prey|2020|61
Morbius|2022|52
Venom|2018|67
Venom: Let There Be Carnage|2021|59
Kraven the Hunter|2024|54
Madame Web|2024|37
Eternals|2021|63
Doctor Strange in the Multiverse of Madness|2022|69
Thor: The Dark World|2013|68
Thor|2011|69
Iron Man 2|2010|70
Iron Man 3|2013|71
Captain America: The First Avenger|2011|69
The Incredible Hulk|2008|66
Avengers: Age of Ultron|2015|73
Avengers: Endgame|2019|84
Ant-Man and the Wasp: Quantumania|2023|61
Spider-Man: Far From Home|2019|75
The Amazing Spider-Man|2012|69
X-Men|2000|73
X2: X-Men United|2003|75
X-Men: First Class|2011|77
X-Men: Apocalypse|2016|68
Dark Phoenix|2019|57
The Wolverine|2013|67
X-Men Origins: Wolverine|2009|66
Fantastic Four|2015|43
Hellboy|2004|68
Hancock|2008|63
Chronicle|2012|71
#Animation
Akira|1988|80
Princess Mononoke|1997|83
Ponyo|2008|77
The Boy and the Heron|2023|75
Kiki's Delivery Service|1989|78
My Neighbor Totoro|1988|81
Castle in the Sky|1986|80
Your Name.|2016|84
Weathering with You|2019|75
Suzume|2022|76
A Silent Voice|2016|81
Demon Slayer: Mugen Train|2020|82
Jujutsu Kaisen 0|2021|77
One Piece Film: Red|2022|65
Dragon Ball Super: Broly|2018|78
The Garfield Movie|2024|55
Inside Out|2015|82
The Lego Movie|2014|77
The Lego Batman Movie|2017|73
Rango|2011|72
Hotel Transylvania|2012|70
The Croods|2013|72
Cloudy with a Chance of Meatballs|2009|69
Kung Fu Panda 2|2011|73
Kung Fu Panda 3|2016|71
How to Train Your Dragon 2|2014|78
How to Train Your Dragon 3|2019|78
Despicable Me 2|2013|73
Despicable Me 3|2017|62
The Secret Life of Pets|2016|65
Sing|2016|72
Trolls World Tour|2020|61
Spirit: Stallion of the Cimarron|2002|71
The Prince of Egypt|1998|79
Anastasia|1997|71
The Jungle Book|1967|76
101 Dalmatians|1961|72
Cinderella|1950|73
Sleeping Beauty|1959|73
Snow White and the Seven Dwarfs|1937|76
Bambi|1942|73
Dumbo|1941|72
Alice in Wonderland|1951|72
Peter Pan|1953|73
The Hunchback of Notre Dame|1996|72
Pocahontas|1995|67
Oliver & Company|1988|66
The Emperor's New Groove|2000|74
Treasure Planet|2002|72
Atlantis: The Lost Empire|2001|69
Moana|2016|76
Inside Out 2|2024|76
Toy Story 2|1999|79
Toy Story 4|2019|77
A Bug's Life|1998|72
Cars 2|2011|57
Cars 3|2017|68
The Good Dinosaur|2015|67
Incredibles 2|2018|75
Lightyear|2022|61
Spider-Man: Into the Spider-Verse|2018|84
Klaus|2019|82
Wolfwalkers|2020|81
Chicken Run: Dawn of the Nugget|2023|60
Wallace & Gromit: The Curse of the Were-Rabbit|2005|75
Corpse Bride|2005|73
The Nightmare Before Christmas|1993|80
Isle of Dogs|2018|78
Fantastic Mr. Fox|2009|78
Kubo and the Two Strings|2016|77
Paddington 2|2017|78
Paddington|2014|73
#Comedy
Tom and Jerry|2021|51
3 Idiots|2009|84
PK|2014|81
Munna Bhai M.B.B.S.|2003|81
Lage Raho Munna Bhai|2006|80
Hera Pheri|2000|82
Golmaal: Fun Unlimited|2006|74
Chennai Express|2013|60
Dilwale Dulhania Le Jayenge|1995|81
Kabhi Khushi Kabhie Gham|2001|74
Kuch Kuch Hota Hai|1998|76
Zindagi Na Milegi Dobara|2011|82
Yeh Jawaani Hai Deewani|2013|72
Queen|2014|82
Andhadhun|2018|83
Stree|2018|75
Stree 2|2024|75
Bhool Bhulaiyaa|2007|73
Dream Girl|2019|68
Badhaai Ho|2018|74
Bareilly Ki Barfi|2017|71
Hum Dil De Chuke Sanam|1999|75
Jab We Met|2007|78
Rockstar|2011|77
Barfi!|2012|81
#Drama
Taare Zameen Par|2007|84
Swades|2004|82
Lagaan|2001|81
Rang De Basanti|2006|81
Chak De! India|2007|82
Dil Chahta Hai|2001|81
#Comedy
Welcome|2007|71
Housefull|2010|53
Crazy Rich Asians|2018|69
The Hangover Part II|2011|65
The Hangover Part III|2013|57
American Pie 2|2001|63
Scary Movie|2000|62
Austin Powers: The Spy Who Shagged Me|1999|66
Meet the Fockers|2004|63
Night at the Museum|2006|64
Cheaper by the Dozen|2003|59
Daddy Day Care|2003|56
Hot Fuzz|2007|79
Shaun of the Dead|2004|79
The World's End|2013|69
Paul|2011|70
Ghostbusters: Afterlife|2021|70
Anchorman 2|2013|63
Blades of Glory|2007|63
Tommy Boy|1995|71
Billy Madison|1995|65
The Waterboy|1998|62
Big Daddy|1999|64
50 First Dates|2004|68
Click|2006|64
Just Go with It|2011|64
Grown Ups|2010|60
Hubie Halloween|2020|52
Murder Mystery|2019|60
Me Time|2022|56
The Wedding Planner|2001|53
Legally Blonde|2001|64
The Princess Diaries|2001|63
Freaky Friday|2003|62
Confessions of a Shopaholic|2009|59
The Devil Wears Prada|2006|69
Bridesmaids|2011|68
Pitch Perfect|2012|71
Pitch Perfect 2|2015|64
Step Up|2006|65
High School Musical|2006|50
Mamma Mia!|2008|65
Hairspray|2007|67
Grease|1978|72
Sister Act|1992|65
The Parent Trap|1998|70
Mrs. Doubtfire|1993|71
Jumanji|1995|72
Matilda|1996|70
The Sandlot|1993|78
Space Jam|1996|65
Space Jam: A New Legacy|2021|41
#Horror
Raat|1992|60
Bhoot|2003|68
1920|2008|58
Tumbbad|2018|82
Bulbbul|2020|66
Munjya|2024|68
Exorcist: Believer|2023|47
The Exorcism of Emily Rose|2005|67
The Conjuring 2|2016|73
The Conjuring: The Devil Made Me Do It|2021|63
The Conjuring: Last Rites|2025|62
The Nun|2018|53
The Nun II|2023|56
Annabelle: Creation|2017|66
Insidious: Chapter 2|2013|65
Insidious: The Red Door|2023|53
Scream VI|2023|63
Scream|2022|63
Halloween|2018|65
Halloween Kills|2021|55
Friday the 13th Part 2|1981|55
A Nightmare on Elm Street 3: Dream Warriors|1987|66
Chucky|1988|67
Cult of Chucky|2017|53
The Purge|2013|57
The Purge: Anarchy|2014|63
The Strangers|2008|62
You're Next|2011|65
Hush|2016|66
10 Cloverfield Lane|2016|72
Don't Breathe 2|2021|56
Smile 2|2024|68
Insidious: The Last Key|2018|57
It Chapter Two|2019|65
Pet Sematary|1989|65
The Shining|1980|84
Doctor Sleep|2019|73
Gerald's Game|2017|65
1408|2007|68
The Mist|2007|71
Cujo|1983|60
Jaws|1975|81
Jaws 2|1978|57
Alien vs. Predator|2004|56
Resident Evil|2002|66
Underworld|2003|70
Van Helsing|2004|61
I Am Legend|2007|72
World War Z|2013|70
Zombieland: Double Tap|2019|65
Army of the Dead|2021|58
Dawn of the Dead|2004|73
Shaun of the Dead|2004|79
Night of the Living Dead|1968|78
#Thriller
Rear Window|1954|85
Vertigo|1958|83
North by Northwest|1959|83
Dial M for Murder|1954|82
Strangers on a Train|1951|78
The Birds|1963|76
Cape Fear|1991|73
Basic Instinct|1992|70
Fatal Attraction|1987|69
Seven|1995|86
Eyes Wide Shut|1999|75
Fight Club|1999|88
Memento|2000|84
The Machinist|2004|77
Identity|2003|73
Secret Window|2004|66
The Number 23|2007|61
Disturbia|2007|69
Taken|2008|77
Fracture|2007|72
Law Abiding Citizen|2009|74
Inception|2010|88
The Town|2010|75
Contagion|2011|66
Side Effects|2013|71
Enemy|2013|69
Oculus|2013|63
The Call|2013|67
Trance|2013|69
Prisoners|2013|82
The Gambler|2014|60
Unknown|2011|68
Non-Stop|2014|69
The Girl on the Train|2016|65
Nocturnal Animals|2016|75
Get Out|2017|77
Mother!|2017|66
Bird Box Barcelona|2023|53
The Invisible Guest|2016|80
Drishyam|2015|82
Drishyam 2|2022|82
Kahaani|2012|81
Badla|2019|78
Talaash|2012|73
Special 26|2013|80
Baby|2015|79
A Wednesday!|2008|81
Don|2006|71
Agent Vinod|2012|57
Ek Tha Tiger|2012|60
Raazi|2018|78
Uri: The Surgical Strike|2019|82
Memories of Murder|2003|81
The Handmaiden|2016|81
Mother|2009|78
The Wailing|2016|74
I Saw the Devil|2010|78
The Chaser|2008|78
Decision to Leave|2022|73
Burning|2018|75
Snowpiercer|2013|71
Okja|2017|73
The Host|2006|71
Exit|2019|68
Along with the Gods: The Two Worlds|2017|70
Extreme Job|2019|70
The Man from Nowhere|2010|77
The Good, the Bad, the Weird|2008|72
Oldboy|2003|83
Lady Vengeance|2005|76
Sympathy for Mr. Vengeance|2002|75
#Drama
The Intouchables|2011|85
Amélie|2001|83
La Haine|1995|81
Les Misérables|2019|75
The Diving Bell and the Butterfly|2007|80
Cinema Paradiso|1988|85
Life Is Beautiful|1997|86
Il Postino|1994|78
Roma|2018|77
Y Tu Mamá También|2001|77
The Secret in Their Eyes|2009|82
Wild Tales|2014|81
Pan's Labyrinth|2006|82
Talk to Her|2002|79
All About My Mother|1999|78
Volver|2006|75
The Skin I Live In|2011|75
The Orphanage|2007|74
Julieta|2016|72
Pain and Glory|2019|72
#Horror
Dark Water|2002|67
Ringu|1998|72
Audition|1999|72
Battle Royale|2000|77
#Sci-Fi
Shin Godzilla|2016|66
#Drama
Departures|2008|80
Shoplifters|2018|79
Drive My Car|2021|76
Perfect Days|2023|79
Spirited Away|2001|86
Seven Samurai|1954|86
Rashomon|1950|82
Ikiru|1952|82
Tokyo Story|1953|82
Ran|1985|82
Yojimbo|1961|82
High and Low|1963|83
Throne of Blood|1957|78
Sanjuro|1962|77
Stalker|1979|81
Solaris|1972|79
Andrei Rublev|1966|81
Come and See|1985|82
Amadeus|1984|83
Cabaret|1972|78
Lawrence of Arabia|1962|83
The Godfather Part III|1990|76
Rocky II|1979|69
Rocky III|1982|68
Rocky IV|1985|68
Creed|2015|76
Creed II|2018|69
Creed III|2023|66
#Action
Rambo|2008|70
Rambo: Last Blood|2019|60
Expendables 2|2012|66
The Expendables 3|2014|61
Escape Plan|2013|67
Cliffhanger|1993|65
Demolition Man|1993|67
Judge Dredd|1995|55
Universal Soldier|1992|61
Bloodsport|1988|68
Kickboxer|1989|58
#Drama
The Karate Kid|1984|73
The Karate Kid Part II|1986|61
The Karate Kid|2010|62
Karate Kid: Legends|2025|58
`;
    const compactShowsT3 = `
#Drama
Kota Factory|2019|90
Aspirants|2021|91
Made in Heaven|2019|78
Jubilee|2023|83
Heeramandi|2024|70
Sacred Games|2018|85
Mirzapur|2018|85
Bandish Bandits|2020|80
Criminal Justice|2019|79
Breathe|2018|78
Inside Edge|2017|78
Four More Shots Please!|2019|65
Taj: Divided by Blood|2023|60
The Railway Men|2023|81
Black Warrant|2025|85
Khauf|2025|70
Kaala|2025|70
Sunflower|2021|74
Yeh Meri Family|2018|88
TVF Pitchers|2015|88
Permanent Roommates|2014|85
Little Things|2016|84
Hostel Daze|2019|80
College Romance|2018|66
Gullak|2019|91
Panchayat|2020|89
Squid Game|2021|80
All of Us Are Dead|2022|75
Kingdom|2019|83
Sweet Home|2020|74
Hellbound|2021|68
My Name|2021|74
Extraordinary Attorney Woo|2022|82
Crash Landing on You|2019|87
Goblin|2016|87
Descendants of the Sun|2016|82
Itaewon Class|2020|82
Vincenzo|2021|84
Reply 1988|2015|92
Hospital Playlist|2020|90
It's Okay to Not Be Okay|2020|87
Business Proposal|2022|83
True Beauty|2020|77
Move to Heaven|2021|87
The Glory|2022|82
Moving|2023|85
Queen of Tears|2024|83
Lovely Runner|2024|85
When the Phone Rings|2024|77
Weak Hero Class 1|2022|83
Bloodhounds|2023|80
Alchemy of Souls|2022|85
Mr. Sunshine|2018|88
Sky Castle|2018|81
My Mister|2018|91
Money Heist: Korea|2022|63
Narcos|2015|88
La Casa de Papel|2017|82
Élite|2018|74
Cable Girls|2017|77
Velvet|2014|79
Berlin|2023|69
The Chosen|2017|93
Call My Agent!|2015|80
Lupin|2021|75
Emily in Paris|2020|69
Dix pour cent|2015|80
The Bureau|2015|87
Marseille|2016|66
Dark|2017|88
Babylon Berlin|2017|85
Deutschland 83|2015|82
Das Boot|2018|74
How to Sell Drugs Online (Fast)|2019|78
Borgen|2010|86
The Killing|2007|83
The Bridge|2011|86
Wallander|2008|81
Rita|2012|78
Young Royals|2021|80
Quicksand|2019|74
Zero|2021|50
Skam|2015|82
Beforeigners|2019|71
Occupied|2015|76
Lilyhammer|2012|75
The Rain|2018|63
Trapped|2015|80
The Crown|2016|86
Adolescence|2025|81
Gen V|2023|76
House of the Dragon|2022|84
The Sopranos|1999|92
The Wire|2002|93
Mad Men|2007|87
Game of Thrones|2011|92
The Newsroom|2012|87
Boardwalk Empire|2010|84
Treme|2010|82
Oz|1997|87
Deadwood|2004|86
Rectify|2013|83
Rubicon|2010|78
Damages|2007|83
Dirty John|2018|73
Sharp Objects|2018|81
Succession|2018|88
#Comedy
Kapil Sharma Show|2016|55
Tarak Mehta Ka Ooltah Chashmah|2008|66
Sarabhai vs Sarabhai|2004|88
Office Office|2001|90
Khichdi|2002|83
FIR|2006|83
Friends from College|2018|56
Bad Education|2012|78
Fresh Meat|2011|79
Misfits|2009|82
Skins|2007|78
The Inbetweeners|2008|82
Benidorm|2007|71
Mrs. Brown's Boys|2011|56
Miranda|2009|74
Outnumbered|2007|77
Not Going Out|2006|74
Friday Night Dinner|2011|80
Peter Kay's Car Share|2015|82
Fleabag|2016|87
Catastrophe|2015|81
Motherland|2016|74
Ghosts|2019|79
Man Like Mobeen|2017|79
Plebs|2013|75
Toast of London|2012|83
The Thick of It|2005|87
Yes Minister|1980|88
Dad's Army|1968|83
Are You Being Served?|1972|77
Allo' Allo!|1982|83
Keeping Up Appearances|1990|79
One Foot in the Grave|1990|85
Father Ted|1995|88
Absolutely Fabulous|1992|77
The Vicar of Dibley|1994|78
Red Dwarf|1988|84
Mr. Bean|1990|84
Little Britain|2003|77
The Office UK|2001|85
Extras|2005|82
Life's Too Short|2011|72
Modern Love|2019|76
Single Drunk Female|2022|74
The Righteous Gemstones|2019|80
Barry|2018|84
Better Things|2016|82
Shameless|2011|85
Mom|2013|70
2 Broke Girls|2011|66
The Big Bang Theory|2007|82
Young Sheldon|2017|76
Mike & Molly|2010|66
Last Man Standing|2011|71
Cougar Town|2009|75
Modern Family|2009|85
Raising Hope|2010|79
Ugly Betty|2006|77
Glee|2009|68
Community|2009|85
Louie|2010|85
Girls5eva|2021|75
Loot|2022|68
Colin from Accounts|2022|78
Platonic|2023|73
Nobody's Looking|2025|60
The Studio|2025|80
Mulligan|2025|70
St. Denis Medical|2024|74
Hacks|2021|82
Poker Face|2022|79
#Sci-Fi
Doctor Who|2005|86
Torchwood|2006|78
Sarah Jane Adventures|2007|75
Blake's 7|1978|78
The Prisoner|1967|82
Quantum Leap|1989|79
Sliders|1995|74
Seaquest DSV|1993|66
Space: Above and Beyond|1995|75
Lexx|1997|73
Roswell|1999|72
Jeremiah|2002|70
Dark Skies|1996|70
The 4400|2004|70
Surface|2005|71
Threshold|2005|69
Journeyman|2007|75
Fringe|2008|84
V|2009|63
The Event|2010|67
Alcatraz|2012|74
Continuum|2012|78
Defiance|2013|71
Helix|2014|68
Extant|2014|63
The Strain|2014|72
Tomorrowland|2015|70
Wayward Pines|2015|77
Humans|2015|82
Mr. Robot|2015|85
Black Mirror|2011|88
Westworld|2016|85
Timeless|2016|77
Salvation|2017|68
The Expanse|2015|85
Electric Dreams|2017|75
Maniac|2018|74
Dark|2017|88
The Rook|2019|68
The Peripheral|2022|74
Jack Ryan|2018|80
Hunters|2020|74
Utopia|2020|70
Snowpiercer|2020|70
Tales from the Loop|2020|71
The Wilds|2020|72
Brave New World|2020|65
Mythic Quest|2020|79
Pantheon|2022|83
The Peripheral|2022|74
Ark|2023|55
Silo|2023|82
Time Bandits|2024|58
Dune: Prophecy|2024|71
The Acolyte|2024|62
Star Wars: Skeleton Crew|2024|75
Andor|2022|84
Foundation|2021|75
Fallout|2024|85
Dark Matter|2024|75
#Crime
Breaking Bad|2008|95
Better Call Saul|2015|90
Ozark|2017|84
Narcos|2015|88
Mindhunter|2017|86
True Detective|2014|89
Hannibal|2013|85
Peaky Blinders|2013|88
Mare of Easttown|2021|84
Sherlock|2010|91
Broadchurch|2013|84
Criminal Minds: Evolution|2022|60
CSI: Miami|2002|66
CSI: NY|2004|72
NCIS: Los Angeles|2009|69
NCIS: New Orleans|2014|70
Law & Order: Criminal Intent|2001|77
Law & Order: Organized Crime|2021|68
Blue Bloods|2010|77
Hawaii Five-O|1968|71
The Rockford Files|1974|82
Magnum, P.I.|1980|78
Hill Street Blues|1981|83
Cagney & Lacey|1981|76
Matlock|1986|74
Perry Mason|1957|78
Perry Mason|2020|82
The Fugitive|1963|84
Dragnet|1951|72
Quincy, M.E.|1976|74
The Streets of San Francisco|1972|75
Monk|2002|81
Psych|2006|82
Burn Notice|2007|80
White Collar|2009|82
Leverage|2008|80
The Closer|2005|78
Major Crimes|2012|72
Rizzoli|2010|68
Longmire|2012|81
Elementary|2012|80
The Fall|2013|80
Wentworth|2013|82
Peaky Blinders|2013|88
Marcella|2016|74
Safe|2018|68
The Stranger|2020|74
Behind Her Eyes|2021|68
Inside Man|2022|66
Anatomy of a Scandal|2022|68
Slow Horses|2022|83
Obsession|2023|67
Fool Me Once|2024|65
Missing You|2025|60
Sirens|2025|65
Adolescence|2025|81
Task|2025|81
The Lincoln Lawyer|2022|80
Reacher|2022|80
The Night Agent|2023|74
Bosch: Legacy|2022|80
Special Ops|2020|86
Kohrra|2023|80
Delhi Crime|2019|85
Paatal Lok|2020|81
Rana Naidu|2023|65
Scoop|2023|75
Farzi|2023|84
Jamtara|2020|78
#Fantasy
Game of Thrones|2011|92
The Last Kingdom|2015|84
Outlander|2014|84
Merlin|2008|79
Wizards of Waverly Place|2007|71
Hannah Montana|2006|60
The Suite Life of Zack & Cody|2005|65
Lizzie McGuire|2001|68
Jessie|2011|52
Austin & Ally|2011|64
Victorious|2010|68
iCarly|2007|69
Drake & Josh|2004|74
Zoey 101|2005|65
Sam & Cat|2013|50
That's So Raven|2003|71
Hannah Montana Forever|2010|60
Kim Possible|2002|77
Phil of the Future|2004|68
Sabrina the Teenage Witch|1996|71
Goosebumps|1995|69
Are You Afraid of the Dark?|1990|74
Dark Shadows|1966|72
Bewitched|1964|77
I Dream of Jeannie|1965|73
The Munsters|1964|72
The Addams Family|1964|74
Charmed|2018|60
Legacies|2018|69
The Originals|2013|82
Vampire Diaries|2009|77
Shadowhunters|2016|65
The Magicians|2015|77
Warrior Nun|2020|74
Cursed|2020|65
The Witcher: Blood Origin|2022|55
The Legend of Vox Machina|2022|85
Dragon Age: Absolution|2022|71
Dota: Dragon's Blood|2021|75
Ninjago|2011|74
Voltron: Legendary Defender|2016|82
She-Ra and the Princesses of Power|2018|79
Gargoyles|1994|85
#Animation
SpongeBob SquarePants|1999|82
Fairly OddParents|2001|74
Danny Phantom|2004|78
Kim Possible|2002|77
Jimmy Neutron|2002|66
Johnny Test|2005|56
Chowder|2007|77
Phineas and Ferb|2007|79
Gravity Falls|2012|89
Star vs. the Forces of Evil|2015|82
Infinity Train|2019|87
Owl House|2020|88
Amphibia|2019|85
Big City Greens|2018|73
The Loud House|2016|72
Craig of the Creek|2018|83
Summer Camp Island|2018|80
Adventure Time: Distant Lands|2020|82
Samurai Jack|2001|86
Rocko's Modern Life|1993|84
Ren & Stimpy|1991|76
Aaahh!!! Real Monsters|1994|75
Animaniacs|1993|81
Tiny Toon Adventures|1990|77
DuckTales|1987|77
DuckTales|2017|83
TaleSpin|1990|76
Darkwing Duck|1991|77
Chip 'n Dale: Rescue Rangers|1989|75
Gummi Bears|1985|75
Teenage Mutant Ninja Turtles|1987|76
Rise of the Teenage Mutant Ninja Turtles|2018|70
He-Man and the Masters of the Universe|1983|67
Transformers|1984|76
G.I. Joe|1985|68
Thundercats|1985|71
Captain Planet|1990|68
Pokemon: Indigo League|1997|75
Beyblade|2001|60
Yu-Gi-Oh! Duel Monsters|2000|72
Digimon|1999|76
Dragon Ball|1986|83
Dragon Ball GT|1996|65
Naruto Shippuden|2007|87
Boruto|2017|58
Bleach: Thousand-Year Blood War|2022|89
Attack on Titan: Final Season|2020|90
Mushoku Tensei|2021|84
That Time I Got Reincarnated as a Slime|2018|81
Overlord|2015|79
Konosuba|2016|82
Re:Zero|2016|83
No Game No Life|2014|81
The Seven Deadly Sins|2014|76
Fire Force|2019|77
Black Butler|2008|77
Soul Eater|2008|79
Blue Exorcist|2011|76
Assassination Classroom|2013|83
Toradora!|2008|82
Clannad|2007|84
Your Lie in April|2014|86
Anohana|2011|83
Angel Beats!|2010|80
Death Parade|2015|82
Erased|2016|82
Parasyte: The Maxim|2014|83
Psycho-Pass|2012|83
Ghost in the Shell: Stand Alone Complex|2002|84
Mushishi|2005|87
Monster|2004|88
Berserk|1997|87
Hellsing Ultimate|2006|84
Gintama|2006|89
Great Teacher Onizuka|1999|86
Ouran High School Host Club|2006|80
Lucky Star|2007|74
K-On!|2009|78
Love Live!|2013|74
Spy Classroom|2023|75
Jujutsu Kaisen Season 2|2023|87
Chainsaw Man|2022|85
Mashle: Magic and Muscles|2023|79
Delicious in Dungeon|2024|86
Kaiju No. 8|2024|78
Blue Lock|2022|83
Hell's Paradise|2023|80
Ranking of Kings|2021|85
Made in Abyss|2017|87
Vivy: Fluorite Eye's Song|2021|82
Odd Taxi|2021|87
`;

    function parseCompact(txt, thumb) {
      const out = [];
      let g = 'Drama';
      txt.split('\n').forEach(line => {
        line = line.trim();
        if (!line) return;
        if (line[0] === '#') { g = line.slice(1).trim(); return; }
        const p = line.split('|');
        if (p.length < 3) return;
        const year = parseInt(p[1], 10), rating = Number(p[2]) / 10;
        if (!p[0] || !year || !rating) return;
        out.push([p[0].trim(), g, rating, year, thumb]);
      });
      return out;
    }
    // Enhanced normalization: strips diacritics, Episode numerals, Part One->1, &->and, punctuation
    function canonKey(s) {
      return String(s || '')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/episode\s+[ivx]+\s*-\s*/g, '')
        .replace(/part\s+one/g, 'part 1')
        .replace(/part\s+two/g, 'part 2')
        .replace(/\s*\(season\s*1\)/g, '')
        .replace(/\s*\(danish\)/g, '')
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]/g, '');
    }
    const SYNONYM_MAP = {
      '812': '8half',
      'theboat': 'dasboot',
      'lacasadepapel': 'moneyheist',
      'dixpourcent': 'callmyagent',
      'deliciousindungeon': 'dungeonmeshi',
      'cosmosapersonalvoyage': 'cosmos',
      'drwho': 'doctorwho',
      'house': 'housemd',
      'monsterthejeffreydahmerstory': 'dahmer',
      'drivetosurvive': 'formula1drivetosurvive',
      'howtotrainyourdragon3': 'howtotrainyourdragonthehiddenworld',
      'owlhouse': 'theowlhouse',
      'vampirediaries': 'thevampirediaries',
      'freshprinceofbelair': 'thefreshprinceofbelair',
      'kapilsharmashow': 'thekapilsharmashow',
      'fantasticfourfirststeps': 'thefantasticfourfirststeps',
      'thelordoftheringstheringsofpower': 'ringsofpower'
    };
    function normTitleKey(name) {
      const k = canonKey(name);
      return SYNONYM_MAP[k] || k;
    }
    function dedupeList(list) {
      const seen = new Set();
      return list.filter(r => {
        const baseK = normTitleKey(r[0]);
        // Allow distinct-era remakes (e.g., Dune 1984 vs 2021, Scream 1996 vs 2022) if >5 yrs apart
        const k = baseK;
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
    }
    function dedupeAgainst(existing, extra) {
      const seen = new Set(existing.map(r => normTitleKey(r[0])));
      return extra.filter(r => {
        const k = normTitleKey(r[0]);
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
    }
    // Essential franchise seeds so every Universe has 100% of its films & series in the vault
    const extraMovieSeeds = [
      ["Guardians of the Galaxy Vol. 2", "Sci-Fi", 7.6, 2017, 1],
      ["Annabelle Comes Home", "Horror", 5.9, 2019, 1],
      ["The Curse of La Llorona", "Horror", 5.2, 2019, 1],
      ["Godzilla vs. Kong", "Sci-Fi", 6.3, 2021, 1],
      ["2 Fast 2 Furious", "Action", 5.9, 2003, 1],
      ["The Fast and the Furious: Tokyo Drift", "Action", 6.1, 2006, 1],
      ["Fast & Furious", "Action", 6.5, 2009, 1],
      ["F9", "Action", 5.2, 2021, 1],
      ["Fantastic Beasts: The Crimes of Grindelwald", "Fantasy", 6.5, 2018, 1],
      ["Fantastic Beasts: The Secrets of Dumbledore", "Fantasy", 6.2, 2022, 1],
      ["Star Trek: The Motion Picture", "Sci-Fi", 6.4, 1979, 1],
      ["Star Trek II: The Wrath of Khan", "Sci-Fi", 7.7, 1982, 1],
      ["Star Trek: First Contact", "Sci-Fi", 7.6, 1996, 1],
      ["El Camino: A Breaking Bad Movie", "Crime", 7.3, 2019, 1],
      ["Ludo", "Comedy", 7.6, 2020, 1],
      // Indian Connected Universes & Classics Expansion
      ["Singham", "Action", 6.8, 2011, 1],
      ["Singham Returns", "Action", 5.7, 2014, 1],
      ["Simmba", "Action", 5.5, 2018, 1],
      ["Dhoom", "Action", 6.7, 2004, 1],
      ["Krrish", "Sci-Fi", 6.4, 2006, 1],
      ["Krrish 3", "Sci-Fi", 5.3, 2013, 1],
      ["Golmaal Returns", "Comedy", 5.2, 2008, 1],
      ["Golmaal 3", "Comedy", 5.5, 2010, 1],
      ["Golmaal Again", "Comedy", 5.0, 2017, 1],
      ["Pather Panchali", "Drama", 8.5, 1955, 1],
      ["Aparajito", "Drama", 8.4, 1956, 1],
      ["Apur Sansar", "Drama", 8.5, 1959, 1],
      ["Charulata", "Drama", 8.4, 1964, 1],
      ["Guide", "Drama", 8.4, 1965, 1],
      ["Awaara", "Drama", 7.8, 1951, 1],
      ["Shree 420", "Drama", 7.9, 1955, 1],
      ["Kaagaz Ke Phool", "Drama", 8.1, 1959, 1],
      ["Padosan", "Comedy", 8.1, 1968, 1],
      ["Chupke Chupke", "Comedy", 8.3, 1975, 1],
      ["Gol Maal", "Comedy", 8.5, 1979, 1],
      ["Jaane Bhi Do Yaaro", "Comedy", 8.3, 1983, 1],
      ["Masoom", "Drama", 8.4, 1983, 1],
      ["Angoor", "Comedy", 8.3, 1982, 1],
      ["Amar Akbar Anthony", "Action", 7.4, 1977, 1],
      ["Don (1978)", "Action", 7.7, 1978, 1],
      ["Zanjeer", "Action", 7.5, 1973, 1],
      ["Trishul", "Drama", 7.7, 1978, 1],
      ["Ardh Satya", "Crime", 8.1, 1983, 1],
      ["Salaam Bombay!", "Drama", 7.9, 1988, 1],
      ["Parinda", "Crime", 7.8, 1989, 1],
      ["Qayamat Se Qayamat Tak", "Romance", 7.4, 1988, 1],
      ["Maine Pyar Kiya", "Romance", 7.3, 1989, 1],
      ["Hum Aapke Hain Koun..!", "Romance", 7.5, 1994, 1],
      ["Baazigar", "Thriller", 7.6, 1993, 1],
      ["Darr", "Thriller", 7.6, 1993, 1],
      ["Dil Se..", "Romance", 7.5, 1998, 1],
      ["Satya", "Crime", 8.3, 1998, 1],
      ["Sarfarosh", "Action", 8.1, 1999, 1],
      ["Vaastav: The Reality", "Crime", 8.0, 1999, 1],
      ["Rangeela", "Romance", 7.4, 1995, 1],
      ["Jo Jeeta Wohi Sikandar", "Drama", 8.1, 1992, 1],
      ["Kabhi Haan Kabhi Naa", "Comedy", 7.9, 1994, 1],
      ["Border", "War", 7.9, 1997, 1],
      ["Company", "Crime", 8.0, 2002, 1],
      ["Black Friday", "Crime", 8.4, 2004, 1],
      ["Maqbool", "Crime", 8.0, 2003, 1],
      ["Omkara", "Crime", 8.1, 2006, 1],
      ["Khosla Ka Ghosla!", "Comedy", 8.2, 2006, 1],
      ["Bheja Fry", "Comedy", 7.6, 2007, 1],
      ["Johnny Gaddaar", "Thriller", 8.1, 2007, 1],
      ["Wake Up Sid", "Drama", 7.6, 2009, 1],
      ["Rocket Singh: Salesman of the Year", "Drama", 7.5, 2009, 1],
      ["Kaminey", "Crime", 7.4, 2009, 1],
      ["Guzaarish", "Drama", 7.4, 2010, 1],
      ["Paan Singh Tomar", "Drama", 8.2, 2012, 1],
      ["Vicky Donor", "Comedy", 7.8, 2012, 1],
      ["English Vinglish", "Drama", 7.8, 2012, 1],
      ["OMG: Oh My God!", "Comedy", 8.1, 2012, 1],
      ["Talaash: The Answer Lies Within", "Thriller", 7.2, 2012, 1],
      ["Kai Po Che!", "Drama", 7.8, 2013, 1],
      ["The Lunchbox", "Romance", 7.8, 2013, 1],
      ["Madras Cafe", "Thriller", 7.6, 2013, 1],
      ["Lootera", "Romance", 7.4, 2013, 1],
      ["Raanjhanaa", "Romance", 7.6, 2013, 1],
      ["Shahid", "Drama", 8.2, 2012, 1],
      ["Ugly", "Thriller", 8.1, 2013, 1],
      ["Ankhon Dekhi", "Drama", 7.9, 2013, 1],
      ["Talvar", "Crime", 8.1, 2015, 1],
      ["Tamasha", "Romance", 7.3, 2015, 1],
      ["Aligarh", "Drama", 7.8, 2015, 1],
      ["Kapoor & Sons", "Drama", 7.7, 2016, 1],
      ["Trapped", "Thriller", 7.5, 2016, 1],
      ["Mukkabaaz", "Drama", 7.9, 2017, 1],
      ["A Death in the Gunj", "Drama", 7.4, 2016, 1],
      ["Karwaan", "Comedy", 7.6, 2018, 1],
      ["Laila Majnu", "Romance", 7.7, 2018, 1],
      ["Sonchiriya", "Crime", 7.9, 2019, 1],
      ["Section 375", "Drama", 8.1, 2019, 1],
      ["Chintu Ka Birthday", "Drama", 7.8, 2020, 1],
      ["Sir", "Romance", 7.7, 2018, 1],
      ["777 Charlie", "Drama", 8.7, 2022, 1],
      ["Garuda Gamana Vrishabha Vahana", "Crime", 8.3, 2021, 1],
      ["Lucia", "Sci-Fi", 8.3, 2013, 1],
      ["Ulidavaru Kandanthe", "Crime", 8.4, 2014, 1],
      ["Vada Chennai", "Crime", 8.4, 2018, 1],
      ["Visaranai", "Crime", 8.4, 2015, 1],
      ["Soodhu Kavvum", "Comedy", 8.3, 2013, 1],
      ["Jigarthanda", "Crime", 8.3, 2014, 1],
      ["Aaranya Kaandam", "Crime", 8.5, 2010, 1],
      ["Iruvar", "Drama", 8.4, 1997, 1],
      ["Roja", "Romance", 8.1, 1992, 1],
      ["Bombay", "Romance", 8.1, 1995, 1],
      ["Maheshinte Prathikaaram", "Comedy", 8.3, 2016, 1],
      ["Thondimuthalum Driksakshiyum", "Drama", 8.1, 2017, 1],
      ["Joji", "Crime", 7.8, 2021, 1],
      ["The Great Indian Kitchen", "Drama", 8.2, 2021, 1],
      ["Jana Gana Mana", "Drama", 8.3, 2022, 1],
      ["Bramayugam", "Horror", 7.9, 2024, 1],
      ["Aattam", "Drama", 8.3, 2023, 1],
      ["Kishkindha Kaandam", "Thriller", 8.2, 2024, 1],
      ["Meiyazhagan", "Drama", 8.4, 2024, 1],
      ["C/o Kancharapalem", "Drama", 8.8, 2018, 1],
      ["Pelli Choopulu", "Romance", 8.2, 2016, 1],
      ["Agent Sai Srinivasa Athreya", "Comedy", 8.3, 2019, 1],
      ["Sairat", "Romance", 8.4, 2016, 1],
      ["Natsamrat", "Drama", 8.8, 2016, 1],
      ["Court", "Drama", 7.6, 2014, 1],
      ["Killa", "Drama", 7.9, 2014, 1],
      // World Cinema & Anime Expansion
      ["In the Mood for Love", "Romance", 8.1, 2000, 1],
      ["Chungking Express", "Romance", 8.0, 1994, 1],
      ["Yi Yi", "Drama", 8.1, 2000, 1],
      ["A Brighter Summer Day", "Drama", 8.2, 1991, 1],
      ["Farewell My Concubine", "Drama", 8.1, 1993, 1],
      ["Close-Up", "Drama", 8.2, 1990, 1],
      ["Where Is the Friend's Home?", "Drama", 8.1, 1987, 1],
      ["Taste of Cherry", "Drama", 7.7, 1997, 1],
      ["About Elly", "Drama", 7.9, 2009, 1],
      ["The Salesman", "Drama", 7.7, 2016, 1],
      ["wings of Desire", "Fantasy", 7.9, 1987, 1],
      ["Paris, Texas", "Drama", 8.1, 1984, 1],
      ["Three Colours: Red", "Drama", 8.1, 1994, 1],
      ["Three Colours: Blue", "Drama", 7.8, 1993, 1]
    ];
    const extraShowSeeds = [
      ["Monarch: Legacy of Monsters", "Sci-Fi", 7.0, 2023, 1],
      ["Batwoman", "Action", 3.6, 2019, 1],
      ["Crisis on Infinite Earths", "Action", 7.8, 2019, 1],
      ["Black Lightning", "Action", 6.1, 2018, 1],
      ["Superman & Lois", "Action", 7.8, 2021, 1],
      ["Constantine", "Fantasy", 7.5, 2014, 1],
      ["Class", "Sci-Fi", 6.6, 2016, 1],
      ["Star Trek: Enterprise", "Sci-Fi", 7.5, 2001, 1]
    ];
    const expandedMovieVault = [
  [
    "Oppenheimer",
    "Drama",
    8.9,
    2023,
    1
  ],
  [
    "Dune: Part Two",
    "Sci-Fi",
    8.5,
    2024,
    1
  ],
  [
    "Barbie",
    "Comedy",
    6.8,
    2023,
    1
  ],
  [
    "Poor Things",
    "Comedy",
    7.9,
    2023,
    1
  ],
  [
    "Past Lives",
    "Romance",
    7.8,
    2023,
    1
  ],
  [
    "The Zone of Interest",
    "War",
    7.4,
    2023,
    1
  ],
  [
    "Anatomy of a Fall",
    "Thriller",
    7.7,
    2023,
    1
  ],
  [
    "Killers of the Flower Moon",
    "Crime",
    7.6,
    2023,
    1
  ],
  [
    "The Holdovers",
    "Comedy",
    7.9,
    2023,
    1
  ],
  [
    "Spider-Man: Across the Spider-Verse",
    "Animation",
    8.6,
    2023,
    1
  ],
  [
    "Godzilla Minus One",
    "Sci-Fi",
    8.3,
    2023,
    1
  ],
  [
    "The Boy and the Heron",
    "Animation",
    7.5,
    2023,
    1
  ],
  [
    "Perfect Days",
    "Drama",
    7.9,
    2023,
    1
  ],
  [
    "Monster (2023)",
    "Drama",
    7.9,
    2023,
    1
  ],
  [
    "Society of the Snow",
    "Drama",
    7.8,
    2023,
    1
  ],
  [
    "All of Us Strangers",
    "Drama",
    7.6,
    2023,
    1
  ],
  [
    "May December",
    "Drama",
    6.8,
    2023,
    1
  ],
  [
    "Saltburn",
    "Thriller",
    7,
    2023,
    1
  ],
  [
    "Iron Claw",
    "Drama",
    7.6,
    2023,
    1
  ],
  [
    "American Fiction",
    "Comedy",
    7.5,
    2023,
    1
  ],
  [
    "BlackBerry",
    "Comedy",
    7.4,
    2023,
    1
  ],
  [
    "Late Night with the Devil",
    "Horror",
    7,
    2024,
    1
  ],
  [
    "Love Lies Bleeding",
    "Thriller",
    6.6,
    2024,
    1
  ],
  [
    "Monkey Man",
    "Action",
    6.9,
    2024,
    1
  ],
  [
    "Hit Man",
    "Comedy",
    6.8,
    2024,
    1
  ],
  [
    "Kneecap",
    "Comedy",
    7.7,
    2024,
    1
  ],
  [
    "Sing Sing",
    "Drama",
    7.8,
    2024,
    1
  ],
  [
    "Flow",
    "Animation",
    8.1,
    2024,
    1
  ],
  [
    "Memoir of a Snail",
    "Animation",
    7.9,
    2024,
    1
  ],
  [
    "I'm Still Here",
    "Drama",
    8.1,
    2024,
    1
  ],
  [
    "Emilia Perez",
    "Crime",
    7,
    2024,
    1
  ],
  [
    "The Brutalist",
    "Drama",
    7.9,
    2024,
    1
  ],
  [
    "The Seed of the Sacred Fig",
    "Drama",
    7.8,
    2024,
    1
  ],
  [
    "All We Imagine as Light",
    "Drama",
    7.6,
    2024,
    1
  ],
  [
    "Manjummel Boys",
    "Thriller",
    8.4,
    2024,
    1
  ],
  [
    "Aavesham",
    "Comedy",
    7.8,
    2024,
    1
  ],
  [
    "Premalu",
    "Romance",
    7.8,
    2024,
    1
  ],
  [
    "Kumbalangi Nights",
    "Drama",
    8.5,
    2019,
    1
  ],
  [
    "Premam",
    "Romance",
    8.3,
    2015,
    1
  ],
  [
    "Bangalore Days",
    "Drama",
    8.3,
    2014,
    1
  ],
  [
    "Drishyam (Malayalam)",
    "Thriller",
    8.3,
    2013,
    1
  ],
  [
    "Drishyam 2 (Malayalam)",
    "Thriller",
    8.4,
    2021,
    1
  ],
  [
    "Lucifer (Malayalam)",
    "Action",
    7.5,
    2019,
    1
  ],
  [
    "Ustad Hotel",
    "Drama",
    8.2,
    2012,
    1
  ],
  [
    "Minnal Murali",
    "Action",
    7.8,
    2021,
    1
  ],
  [
    "Angamaly Diaries",
    "Crime",
    7.9,
    2017,
    1
  ],
  [
    "Ee.Ma.Yau.",
    "Drama",
    8.2,
    2018,
    1
  ],
  [
    "Virus",
    "Thriller",
    7.8,
    2019,
    1
  ],
  [
    "Ayyappanum Koshiyum",
    "Action",
    8,
    2020,
    1
  ],
  [
    "Nayattu",
    "Thriller",
    8.1,
    2021,
    1
  ],
  [
    "Iratta",
    "Crime",
    7.7,
    2023,
    1
  ],
  [
    "Kaathal - The Core",
    "Drama",
    8,
    2023,
    1
  ],
  [
    "Kannur Squad",
    "Crime",
    7.6,
    2023,
    1
  ],
  [
    "Nanpakal Nerathu Mayakkam",
    "Drama",
    7.7,
    2022,
    1
  ],
  [
    "Rorschach",
    "Thriller",
    7.1,
    2022,
    1
  ],
  [
    "Nna Thaan Case Kodu",
    "Comedy",
    7.7,
    2022,
    1
  ],
  [
    "Hridayam",
    "Romance",
    8,
    2022,
    1
  ],
  [
    "Chithha",
    "Drama",
    8.2,
    2023,
    1
  ],
  [
    "Super Deluxe",
    "Thriller",
    8.3,
    2019,
    1
  ],
  [
    "Vikram",
    "Action",
    8.3,
    2022,
    1
  ],
  [
    "Kaithi",
    "Action",
    8.4,
    2019,
    1
  ],
  [
    "Vikram Vedha (Tamil)",
    "Action",
    8.2,
    2017,
    1
  ],
  [
    "Pariyerum Perumal",
    "Drama",
    8.7,
    2018,
    1
  ],
  [
    "Karnan",
    "Drama",
    8,
    2021,
    1
  ],
  [
    "Asuran",
    "Action",
    8.4,
    2019,
    1
  ],
  [
    "Jai Bhim",
    "Drama",
    8.8,
    2021,
    1
  ],
  [
    "Soorarai Pottru",
    "Drama",
    8.7,
    2020,
    1
  ],
  [
    "Mahaaraaja",
    "Thriller",
    8.5,
    2024,
    1
  ],
  [
    "Jailer",
    "Action",
    7.1,
    2023,
    1
  ],
  [
    "Ponniyin Selvan: Part I",
    "Fantasy",
    7.6,
    2022,
    1
  ],
  [
    "Ponniyin Selvan: Part II",
    "Fantasy",
    7.3,
    2023,
    1
  ],
  [
    "96",
    "Romance",
    8.5,
    2018,
    1
  ],
  [
    "Ratsasan",
    "Thriller",
    8.3,
    2018,
    1
  ],
  [
    "Theeran Adhigaaram Ondru",
    "Crime",
    8.2,
    2017,
    1
  ],
  [
    "Maanagaram",
    "Thriller",
    8.1,
    2017,
    1
  ],
  [
    "Thani Oruvan",
    "Action",
    8.4,
    2015,
    1
  ],
  [
    "Anbe Sivam",
    "Drama",
    8.6,
    2003,
    1
  ],
  [
    "Nayakan",
    "Crime",
    8.7,
    1987,
    1
  ],
  [
    "Thalapathi",
    "Crime",
    8.5,
    1991,
    1
  ],
  [
    "Baashha",
    "Action",
    8.3,
    1995,
    1
  ],
  [
    "Hey Ram",
    "Drama",
    8,
    2000,
    1
  ],
  [
    "Kattradhu Thamizh",
    "Drama",
    8.4,
    2007,
    1
  ],
  [
    "Pithamagan",
    "Drama",
    8.3,
    2003,
    1
  ],
  [
    "Gargi",
    "Drama",
    8.1,
    2022,
    1
  ],
  [
    "Kadaisi Vivasayi",
    "Drama",
    8.6,
    2021,
    1
  ],
  [
    "Jigarthanda DoubleX",
    "Action",
    7.9,
    2023,
    1
  ],
  [
    "Viduthalai Part 1",
    "Crime",
    8.2,
    2023,
    1
  ],
  [
    "Lover",
    "Romance",
    7.4,
    2024,
    1
  ],
  [
    "Hanu-Man",
    "Action",
    7.8,
    2024,
    1
  ],
  [
    "Kalki 2898 AD",
    "Sci-Fi",
    7.5,
    2024,
    1
  ],
  [
    "Devara: Part 1",
    "Action",
    6.4,
    2024,
    1
  ],
  [
    "Pushpa: The Rise",
    "Action",
    7.6,
    2021,
    1
  ],
  [
    "Pushpa 2: The Rule",
    "Action",
    7.5,
    2024,
    1
  ],
  [
    "Salaar: Part 1 - Ceasefire",
    "Action",
    6.5,
    2023,
    1
  ],
  [
    "Sita Ramam",
    "Romance",
    8.5,
    2022,
    1
  ],
  [
    "Major",
    "Action",
    8.1,
    2022,
    1
  ],
  [
    "Jersey",
    "Drama",
    8.5,
    2019,
    1
  ],
  [
    "Mahanati",
    "Drama",
    8.4,
    2018,
    1
  ],
  [
    "Rangasthalam",
    "Action",
    8.2,
    2018,
    1
  ],
  [
    "Arjun Reddy",
    "Drama",
    7.9,
    2017,
    1
  ],
  [
    "Eega",
    "Fantasy",
    7.7,
    2012,
    1
  ],
  [
    "Magadheera",
    "Fantasy",
    7.7,
    2009,
    1
  ],
  [
    "Athadu",
    "Action",
    8.2,
    2005,
    1
  ],
  [
    "Pokiri",
    "Action",
    8,
    2006,
    1
  ],
  [
    "Mayabazar",
    "Fantasy",
    9.1,
    1957,
    1
  ],
  [
    "Sankarabharanam",
    "Drama",
    8.8,
    1980,
    1
  ],
  [
    "Sagara Sangamam",
    "Drama",
    8.8,
    1983,
    1
  ],
  [
    "Swathi Muthyam",
    "Drama",
    8.7,
    1986,
    1
  ],
  [
    "Geetha Govindam",
    "Romance",
    7.7,
    2018,
    1
  ],
  [
    "Mathu Vadalara",
    "Comedy",
    8.2,
    2019,
    1
  ],
  [
    "Balagam",
    "Drama",
    8.1,
    2023,
    1
  ],
  [
    "Hi Nanna",
    "Drama",
    8.2,
    2023,
    1
  ],
  [
    "Keedaa Cola",
    "Comedy",
    7,
    2023,
    1
  ],
  [
    "Kantara",
    "Action",
    8.2,
    2022,
    1
  ],
  [
    "KGF: Chapter 1",
    "Action",
    8.2,
    2018,
    1
  ],
  [
    "KGF: Chapter 2",
    "Action",
    8.3,
    2022,
    1
  ],
  [
    "Sapta Sagaradaache Ello - Side A",
    "Romance",
    8.3,
    2023,
    1
  ],
  [
    "Sapta Sagaradaache Ello - Side B",
    "Romance",
    8,
    2023,
    1
  ],
  [
    "Kavaludaari",
    "Crime",
    7.9,
    2019,
    1
  ],
  [
    "Bell Bottom",
    "Comedy",
    8.1,
    2019,
    1
  ],
  [
    "Dia",
    "Romance",
    8.1,
    2020,
    1
  ],
  [
    "Love Mocktail",
    "Romance",
    8.1,
    2020,
    1
  ],
  [
    "Blink",
    "Sci-Fi",
    8.2,
    2024,
    1
  ],
  [
    "Shakhahaari",
    "Thriller",
    8,
    2024,
    1
  ],
  [
    "12th Fail",
    "Drama",
    8.8,
    2023,
    1
  ],
  [
    "Animal",
    "Action",
    6.1,
    2023,
    1
  ],
  [
    "Jawan",
    "Action",
    6.9,
    2023,
    1
  ],
  [
    "Pathaan",
    "Action",
    5.9,
    2023,
    1
  ],
  [
    "Dunki",
    "Comedy",
    6.6,
    2023,
    1
  ],
  [
    "Stree 2",
    "Comedy",
    7.1,
    2024,
    1
  ],
  [
    "Stree",
    "Comedy",
    7.5,
    2018,
    1
  ],
  [
    "Bhediya",
    "Comedy",
    6.7,
    2022,
    1
  ],
  [
    "Munjya",
    "Horror",
    6.9,
    2024,
    1
  ],
  [
    "Kill",
    "Action",
    7.6,
    2024,
    1
  ],
  [
    "Madgaon Express",
    "Comedy",
    7.4,
    2024,
    1
  ],
  [
    "Laapataa Ladies",
    "Comedy",
    8.4,
    2024,
    1
  ],
  [
    "Chandu Champion",
    "Drama",
    8,
    2024,
    1
  ],
  [
    "Sector 36",
    "Crime",
    7.2,
    2024,
    1
  ],
  [
    "Merry Christmas",
    "Thriller",
    6.9,
    2024,
    1
  ],
  [
    "Article 370",
    "Thriller",
    7.9,
    2024,
    1
  ],
  [
    "Shaitaan",
    "Horror",
    6.6,
    2024,
    1
  ],
  [
    "Sam Bahadur",
    "Drama",
    7.8,
    2023,
    1
  ],
  [
    "OMG 2",
    "Comedy",
    7.5,
    2023,
    1
  ],
  [
    "Rocky Aur Rani Kii Prem Kahaani",
    "Romance",
    6.7,
    2023,
    1
  ],
  [
    "Bhakshak",
    "Crime",
    7.2,
    2024,
    1
  ],
  [
    "Do Patti",
    "Thriller",
    6.1,
    2024,
    1
  ],
  [
    "Amar Singh Chamkila",
    "Drama",
    7.8,
    2024,
    1
  ],
  [
    "Joram",
    "Thriller",
    7.2,
    2023,
    1
  ],
  [
    "Bheed",
    "Drama",
    7.2,
    2023,
    1
  ],
  [
    "Faraaz",
    "Thriller",
    7,
    2023,
    1
  ],
  [
    "Iwanttothankyou",
    "Drama",
    7.5,
    2024,
    1
  ],
  [
    "The Sabarmati Report",
    "Drama",
    7,
    2024,
    1
  ],
  [
    "Bhool Bhulaiyaa 3",
    "Comedy",
    5.8,
    2024,
    1
  ],
  [
    "Singham Again",
    "Action",
    5.4,
    2024,
    1
  ],
  [
    "Decision to Leave",
    "Mystery",
    7.3,
    2022,
    1
  ],
  [
    "Drive My Car",
    "Drama",
    7.6,
    2021,
    1
  ],
  [
    "Burning",
    "Mystery",
    7.5,
    2018,
    1
  ],
  [
    "The Handmaiden",
    "Thriller",
    8.1,
    2016,
    1
  ],
  [
    "Shoplifters",
    "Drama",
    7.9,
    2018,
    1
  ],
  [
    "Suzume",
    "Animation",
    7.6,
    2022,
    1
  ],
  [
    "Weathering with You",
    "Animation",
    7.5,
    2019,
    1
  ],
  [
    "The Tale of the Princess Kaguya",
    "Animation",
    8,
    2013,
    1
  ],
  [
    "The Wind Rises",
    "Animation",
    7.7,
    2013,
    1
  ],
  [
    "The Wailing",
    "Horror",
    7.4,
    2016,
    1
  ],
  [
    "Train to Busan",
    "Horror",
    7.6,
    2016,
    1
  ],
  [
    "I Saw the Devil",
    "Thriller",
    7.8,
    2010,
    1
  ],
  [
    "The Chaser",
    "Thriller",
    7.8,
    2008,
    1
  ],
  [
    "Mother (2009)",
    "Crime",
    7.8,
    2009,
    1
  ],
  [
    "Joint Security Area",
    "War",
    7.7,
    2000,
    1
  ],
  [
    "A Taxi Driver",
    "Drama",
    7.9,
    2017,
    1
  ],
  [
    "Poetry",
    "Drama",
    7.8,
    2010,
    1
  ],
  [
    "Secret Sunshine",
    "Drama",
    7.4,
    2007,
    1
  ],
  [
    "Peppermint Candy",
    "Drama",
    7.8,
    1999,
    1
  ],
  [
    "A Bittersweet Life",
    "Action",
    7.5,
    2005,
    1
  ],
  [
    "The Man from Nowhere",
    "Action",
    7.7,
    2010,
    1
  ],
  [
    "New World",
    "Crime",
    7.5,
    2013,
    1
  ],
  [
    "1987: When the Day Comes",
    "Drama",
    7.8,
    2017,
    1
  ],
  [
    "Exhuma",
    "Horror",
    7,
    2024,
    1
  ],
  [
    "Pastoral: To Die in the Country",
    "Drama",
    7.7,
    1974,
    1
  ],
  [
    "Harakiri",
    "Action",
    8.6,
    1962,
    1
  ],
  [
    "High and Low",
    "Crime",
    8.4,
    1963,
    1
  ],
  [
    "Ran",
    "War",
    8.2,
    1985,
    1
  ],
  [
    "Cure",
    "Horror",
    7.5,
    1997,
    1
  ],
  [
    "Audition",
    "Horror",
    7.1,
    1999,
    1
  ],
  [
    "Love Letter",
    "Romance",
    7.9,
    1995,
    1
  ],
  [
    "All About Lily Chou-Chou",
    "Drama",
    7.5,
    2001,
    1
  ],
  [
    "Like Father, Like Son",
    "Drama",
    7.9,
    2013,
    1
  ],
  [
    "Still Walking",
    "Drama",
    7.9,
    2008,
    1
  ],
  [
    "Nobody Knows",
    "Drama",
    8,
    2004,
    1
  ],
  [
    "Our Little Sister",
    "Drama",
    7.5,
    2015,
    1
  ],
  [
    "After Life",
    "Fantasy",
    7.6,
    1998,
    1
  ],
  [
    "A Scene at the Sea",
    "Romance",
    7.4,
    1991,
    1
  ],
  [
    "Sonatine",
    "Crime",
    7.5,
    1993,
    1
  ],
  [
    "Hana-bi",
    "Crime",
    7.7,
    1997,
    1
  ],
  [
    "An Elephant Sitting Still",
    "Drama",
    7.8,
    2018,
    1
  ],
  [
    "Kaili Blues",
    "Drama",
    7.2,
    2015,
    1
  ],
  [
    "Long Day's Journey Into Night",
    "Mystery",
    7.1,
    2018,
    1
  ],
  [
    "A Touch of Sin",
    "Drama",
    7.1,
    2013,
    1
  ],
  [
    "Still Life (2006)",
    "Drama",
    7.3,
    2006,
    1
  ],
  [
    "Platform",
    "Drama",
    7.5,
    2000,
    1
  ],
  [
    "Raise the Red Lantern",
    "Drama",
    8.1,
    1991,
    1
  ],
  [
    "To Live",
    "Drama",
    8.3,
    1994,
    1
  ],
  [
    "Ju Dou",
    "Drama",
    7.6,
    1990,
    1
  ],
  [
    "Hero",
    "Action",
    7.9,
    2002,
    1
  ],
  [
    "House of Flying Daggers",
    "Action",
    7.5,
    2004,
    1
  ],
  [
    "Crouching Tiger, Hidden Dragon",
    "Action",
    7.9,
    2000,
    1
  ],
  [
    "Lust, Caution",
    "Romance",
    7.5,
    2007,
    1
  ],
  [
    "Eat Drink Man Woman",
    "Comedy",
    7.8,
    1994,
    1
  ],
  [
    "The Wedding Banquet",
    "Comedy",
    7.6,
    1993,
    1
  ],
  [
    "Rebels of the Neon God",
    "Drama",
    7.6,
    1992,
    1
  ],
  [
    "Vive L'Amour",
    "Drama",
    7.4,
    1994,
    1
  ],
  [
    "The Hole",
    "Drama",
    7.4,
    1998,
    1
  ],
  [
    "Goodbye, Dragon Inn",
    "Drama",
    7.1,
    2003,
    1
  ],
  [
    "A Sun",
    "Drama",
    7.6,
    2019,
    1
  ],
  [
    "God of Cookery",
    "Comedy",
    7.3,
    1996,
    1
  ],
  [
    "Kung Fu Hustle",
    "Comedy",
    7.7,
    2004,
    1
  ],
  [
    "Shaolin Soccer",
    "Comedy",
    7.3,
    2001,
    1
  ],
  [
    "Hard Boiled",
    "Action",
    7.7,
    1992,
    1
  ],
  [
    "The Killer",
    "Action",
    7.8,
    1989,
    1
  ],
  [
    "A Better Tomorrow",
    "Action",
    7.4,
    1986,
    1
  ],
  [
    "Police Story",
    "Action",
    7.5,
    1985,
    1
  ],
  [
    "Drunken Master II",
    "Action",
    7.5,
    1994,
    1
  ],
  [
    "Fallen Angels",
    "Crime",
    7.7,
    1995,
    1
  ],
  [
    "Happy Together",
    "Romance",
    7.7,
    1997,
    1
  ],
  [
    "2046",
    "Drama",
    7.4,
    2004,
    1
  ],
  [
    "Days of Being Wild",
    "Drama",
    7.5,
    1990,
    1
  ],
  [
    "La Chimera",
    "Comedy",
    7.3,
    2023,
    1
  ],
  [
    "Tori and Lokita",
    "Drama",
    7.2,
    2022,
    1
  ],
  [
    "EO",
    "Drama",
    6.7,
    2022,
    1
  ],
  [
    "Close",
    "Drama",
    7.8,
    2022,
    1
  ],
  [
    "The Worst Person in the World",
    "Romance",
    7.8,
    2021,
    1
  ],
  [
    "Another Round",
    "Comedy",
    7.7,
    2020,
    1
  ],
  [
    "Titane",
    "Horror",
    6.5,
    2021,
    1
  ],
  [
    "Raw",
    "Horror",
    7,
    2016,
    1
  ],
  [
    "Portrait of a Lady on Fire",
    "Romance",
    8.1,
    2019,
    1
  ],
  [
    "Cold War",
    "Romance",
    7.5,
    2018,
    1
  ],
  [
    "Ida",
    "Drama",
    7.4,
    2013,
    1
  ],
  [
    "The Great Beauty",
    "Drama",
    7.7,
    2013,
    1
  ],
  [
    "Youth",
    "Drama",
    7.3,
    2015,
    1
  ],
  [
    "Hand of God",
    "Drama",
    7.3,
    2021,
    1
  ],
  [
    "The Square",
    "Comedy",
    7.1,
    2017,
    1
  ],
  [
    "Triangle of Sadness",
    "Comedy",
    7.3,
    2022,
    1
  ],
  [
    "Force Majeure",
    "Comedy",
    7.2,
    2014,
    1
  ],
  [
    "Climax",
    "Horror",
    6.9,
    2018,
    1
  ],
  [
    "Enter the Void",
    "Fantasy",
    7.2,
    2009,
    1
  ],
  [
    "Irreversible",
    "Crime",
    7.3,
    2002,
    1
  ],
  [
    "Holy Motors",
    "Fantasy",
    7,
    2012,
    1
  ],
  [
    "Blue Is the Warmest Colour",
    "Romance",
    7.7,
    2013,
    1
  ],
  [
    "Amour",
    "Drama",
    7.9,
    2012,
    1
  ],
  [
    "The White Ribbon",
    "Mystery",
    7.8,
    2009,
    1
  ],
  [
    "Cache",
    "Thriller",
    7.3,
    2005,
    1
  ],
  [
    "Funny Games (1997)",
    "Horror",
    7.5,
    1997,
    1
  ],
  [
    "The Piano Teacher",
    "Drama",
    7.5,
    2001,
    1
  ],
  [
    "Melancholia",
    "Sci-Fi",
    7.1,
    2011,
    1
  ],
  [
    "Dogville",
    "Drama",
    8,
    2003,
    1
  ],
  [
    "Dancer in the Dark",
    "Drama",
    7.9,
    2000,
    1
  ],
  [
    "Breaking the Waves",
    "Drama",
    7.8,
    1996,
    1
  ],
  [
    "The House That Jack Built",
    "Horror",
    6.8,
    2018,
    1
  ],
  [
    "Stalker",
    "Sci-Fi",
    8.1,
    1979,
    1
  ],
  [
    "Solaris (1972)",
    "Sci-Fi",
    8,
    1972,
    1
  ],
  [
    "Mirror",
    "Drama",
    8,
    1975,
    1
  ],
  [
    "Andrei Rublev",
    "Drama",
    8.1,
    1966,
    1
  ],
  [
    "Ivan's Childhood",
    "War",
    8,
    1962,
    1
  ],
  [
    "Come and See",
    "War",
    8.4,
    1985,
    1
  ],
  [
    "The Cranes Are Flying",
    "War",
    8.3,
    1957,
    1
  ],
  [
    "Ballad of a Soldier",
    "War",
    8.2,
    1959,
    1
  ],
  [
    "Leviathan (2014)",
    "Drama",
    7.6,
    2014,
    1
  ],
  [
    "Loveless",
    "Drama",
    7.6,
    2017,
    1
  ],
  [
    "The Return (2003)",
    "Drama",
    7.9,
    2003,
    1
  ],
  [
    "Cinema Paradiso",
    "Drama",
    8.5,
    1988,
    1
  ],
  [
    "La Dolce Vita",
    "Comedy",
    8,
    1960,
    1
  ],
  [
    "8 1/2",
    "Drama",
    8,
    1963,
    1
  ],
  [
    "Bicycle Thieves",
    "Drama",
    8.3,
    1948,
    1
  ],
  [
    "Umberto D.",
    "Drama",
    8.2,
    1952,
    1
  ],
  [
    "L'Avventura",
    "Mystery",
    7.8,
    1960,
    1
  ],
  [
    "Blow-Up",
    "Mystery",
    7.5,
    1966,
    1
  ],
  [
    "The Conformist",
    "Drama",
    7.9,
    1970,
    1
  ],
  [
    "Suspiria (1977)",
    "Horror",
    7.3,
    1977,
    1
  ],
  [
    "Deep Red",
    "Horror",
    7.5,
    1975,
    1
  ],
  [
    "The Secret in Their Eyes",
    "Mystery",
    8.2,
    2009,
    1
  ],
  [
    "Wild Tales",
    "Comedy",
    8.1,
    2014,
    1
  ],
  [
    "Nine Queens",
    "Crime",
    7.9,
    2000,
    1
  ],
  [
    "City of God",
    "Crime",
    8.6,
    2002,
    1
  ],
  [
    "Central Station",
    "Drama",
    8,
    1998,
    1
  ],
  [
    "Elite Squad",
    "Action",
    8,
    2007,
    1
  ],
  [
    "Elite Squad: The Enemy Within",
    "Action",
    8,
    2010,
    1
  ],
  [
    "Bacurau",
    "Mystery",
    7.3,
    2019,
    1
  ],
  [
    "Roma",
    "Drama",
    7.7,
    2018,
    1
  ],
  [
    "Pan's Labyrinth",
    "Fantasy",
    8.2,
    2006,
    1
  ],
  [
    "The Devil's Backbone",
    "Horror",
    7.4,
    2001,
    1
  ],
  [
    "Cronos",
    "Horror",
    6.7,
    1993,
    1
  ],
  [
    "Amores Perros",
    "Drama",
    8.1,
    2000,
    1
  ],
  [
    "21 Grams",
    "Drama",
    7.6,
    2003,
    1
  ],
  [
    "Babel",
    "Drama",
    7.5,
    2006,
    1
  ],
  [
    "Biutiful",
    "Drama",
    7.5,
    2010,
    1
  ],
  [
    "Birdman",
    "Comedy",
    7.7,
    2014,
    1
  ],
  [
    "The Revenant",
    "Western",
    8,
    2015,
    1
  ],
  [
    "Y Tu Mama Tambien",
    "Drama",
    7.7,
    2001,
    1
  ],
  [
    "Children of Men",
    "Sci-Fi",
    7.9,
    2006,
    1
  ],
  [
    "Gravity",
    "Sci-Fi",
    7.7,
    2013,
    1
  ]
];
    const expandedShowVault = [
  [
    "Shogun",
    "Drama",
    8.7,
    2024,
    1
  ],
  [
    "The Penguin",
    "Crime",
    8.7,
    2024,
    1
  ],
  [
    "Fallout",
    "Sci-Fi",
    8.4,
    2024,
    1
  ],
  [
    "Severance (Season 2)",
    "Sci-Fi",
    8.8,
    2025,
    1
  ],
  [
    "The Last of Us (Season 2)",
    "Drama",
    8.8,
    2025,
    1
  ],
  [
    "House of the Dragon (Season 2)",
    "Fantasy",
    8.4,
    2024,
    1
  ],
  [
    "Silo (Season 2)",
    "Sci-Fi",
    8.2,
    2024,
    1
  ],
  [
    "Slow Horses (Season 4)",
    "Thriller",
    8.5,
    2024,
    1
  ],
  [
    "Industry",
    "Drama",
    7.5,
    2020,
    1
  ],
  [
    "Baby Reindeer",
    "Drama",
    7.8,
    2024,
    1
  ],
  [
    "Ripley",
    "Crime",
    8.1,
    2024,
    1
  ],
  [
    "Presumed Innocent",
    "Crime",
    7.7,
    2024,
    1
  ],
  [
    "The Sympathizer",
    "Drama",
    7,
    2024,
    1
  ],
  [
    "Sugar",
    "Mystery",
    7.4,
    2024,
    1
  ],
  [
    "Tokyo Vice",
    "Crime",
    8,
    2022,
    1
  ],
  [
    "Bad Sisters",
    "Comedy",
    8.3,
    2022,
    1
  ],
  [
    "Black Bird",
    "Crime",
    8.1,
    2022,
    1
  ],
  [
    "Drops of God",
    "Drama",
    8,
    2023,
    1
  ],
  [
    "Scavengers Reign",
    "Animation",
    8.7,
    2023,
    1
  ],
  [
    "Pluto",
    "Animation",
    8.2,
    2023,
    1
  ],
  [
    "Delicious in Dungeon",
    "Animation",
    8.6,
    2024,
    1
  ],
  [
    "Dan Da Dan",
    "Animation",
    8.6,
    2024,
    1
  ],
  [
    "Solo Leveling",
    "Animation",
    8.4,
    2024,
    1
  ],
  [
    "Kaiju No. 8",
    "Animation",
    8.1,
    2024,
    1
  ],
  [
    "Wind Breaker",
    "Animation",
    7.8,
    2024,
    1
  ],
  [
    "Look Back",
    "Animation",
    8.2,
    2024,
    1
  ],
  [
    "Arcane: Season 2",
    "Animation",
    9.1,
    2024,
    1
  ],
  [
    "Invincible (Season 2)",
    "Animation",
    8.7,
    2024,
    1
  ],
  [
    "X-Men '97",
    "Animation",
    8.9,
    2024,
    1
  ],
  [
    "Batman: Caped Crusader",
    "Animation",
    7.4,
    2024,
    1
  ],
  [
    "Creature Commandos",
    "Animation",
    7.8,
    2024,
    1
  ],
  [
    "Secret Level",
    "Animation",
    7.4,
    2024,
    1
  ],
  [
    "Panchayat (Season 3)",
    "Comedy",
    8.9,
    2024,
    1
  ],
  [
    "Mirzapur (Season 3)",
    "Crime",
    8.4,
    2024,
    1
  ],
  [
    "Kota Factory (Season 3)",
    "Drama",
    9,
    2024,
    1
  ],
  [
    "Gullak (Season 4)",
    "Comedy",
    9.1,
    2024,
    1
  ],
  [
    "Heeramandi: The Diamond Bazaar",
    "Drama",
    6.2,
    2024,
    1
  ],
  [
    "The Railway Men",
    "Drama",
    8.5,
    2023,
    1
  ],
  [
    "Kohrra",
    "Crime",
    7.6,
    2023,
    1
  ],
  [
    "Jubilee",
    "Drama",
    8.4,
    2023,
    1
  ],
  [
    "Farzi",
    "Crime",
    8.4,
    2023,
    1
  ],
  [
    "Dahaad",
    "Crime",
    7.6,
    2023,
    1
  ],
  [
    "Guns & Gulaabs",
    "Comedy",
    7.7,
    2023,
    1
  ],
  [
    "Bambai Meri Jaan",
    "Crime",
    7.7,
    2023,
    1
  ],
  [
    "Kaala Paani",
    "Thriller",
    8,
    2023,
    1
  ],
  [
    "Rocket Boys",
    "Drama",
    8.9,
    2022,
    1
  ],
  [
    "Aspirants",
    "Drama",
    9.2,
    2021,
    1
  ],
  [
    "Sandwiched Forever",
    "Comedy",
    8.3,
    2020,
    1
  ],
  [
    "Tathastu",
    "Comedy",
    8.7,
    2022,
    1
  ],
  [
    "Chacha Vidhayak Hain Humare",
    "Comedy",
    8,
    2018,
    1
  ],
  [
    "Hostel Daze",
    "Comedy",
    8.5,
    2019,
    1
  ],
  [
    "College Romance",
    "Comedy",
    8.4,
    2018,
    1
  ],
  [
    "Pitchers",
    "Drama",
    9.1,
    2015,
    1
  ],
  [
    "Flames",
    "Romance",
    8.9,
    2018,
    1
  ],
  [
    "Permanent Roommates",
    "Comedy",
    8.6,
    2014,
    1
  ],
  [
    "Tripling",
    "Comedy",
    8.5,
    2016,
    1
  ],
  [
    "Yeh Meri Family",
    "Drama",
    9,
    2018,
    1
  ],
  [
    "Cubicles",
    "Drama",
    8.2,
    2019,
    1
  ],
  [
    "ImMature",
    "Comedy",
    8.7,
    2019,
    1
  ],
  [
    "Breathe",
    "Thriller",
    8.3,
    2018,
    1
  ],
  [
    "Breathe: Into the Shadows",
    "Thriller",
    7.6,
    2020,
    1
  ],
  [
    "Aarya",
    "Crime",
    7.8,
    2020,
    1
  ],
  [
    "Criminal Justice",
    "Crime",
    8.1,
    2019,
    1
  ],
  [
    "Undekhi",
    "Crime",
    7.9,
    2020,
    1
  ],
  [
    "Tabbar",
    "Crime",
    8.1,
    2021,
    1
  ],
  [
    "Suzhal - The Vortex",
    "Crime",
    8.2,
    2022,
    1
  ],
  [
    "Viladhikolam",
    "Crime",
    7.9,
    2022,
    1
  ],
  [
    "Ayali",
    "Drama",
    8.5,
    2023,
    1
  ],
  [
    "Inspector Rishi",
    "Horror",
    7.2,
    2024,
    1
  ],
  [
    "Poacher",
    "Crime",
    7.8,
    2024,
    1
  ],
  [
    "Manvat Murders",
    "Crime",
    7.5,
    2024,
    1
  ],
  [
    "IC 814: The Kandahar Hijack",
    "Drama",
    7.2,
    2024,
    1
  ],
  [
    "Tribhuvan Mishra CA Topper",
    "Comedy",
    7.4,
    2024,
    1
  ],
  [
    "Killer Soup",
    "Comedy",
    6.7,
    2024,
    1
  ],
  [
    "Queen of Tears",
    "Romance",
    8.2,
    2024,
    1
  ],
  [
    "Lovely Runner",
    "Romance",
    8.7,
    2024,
    1
  ],
  [
    "A Killer Paradox",
    "Thriller",
    7.2,
    2024,
    1
  ],
  [
    "The 8 Show",
    "Thriller",
    7.2,
    2024,
    1
  ],
  [
    "Death's Game",
    "Fantasy",
    8.5,
    2023,
    1
  ],
  [
    "Moving",
    "Fantasy",
    8.5,
    2023,
    1
  ],
  [
    "Twinkling Watermelon",
    "Romance",
    8.9,
    2023,
    1
  ],
  [
    "Worst of Evil",
    "Crime",
    8.4,
    2023,
    1
  ],
  [
    "Daily Dose of Sunshine",
    "Drama",
    8.3,
    2023,
    1
  ],
  [
    "Castaway Diva",
    "Drama",
    7.9,
    2023,
    1
  ],
  [
    "Celebrity",
    "Drama",
    7.4,
    2023,
    1
  ],
  [
    "Bloodhounds",
    "Action",
    8.1,
    2023,
    1
  ],
  [
    "See You in My 19th Life",
    "Romance",
    7.7,
    2023,
    1
  ],
  [
    "The Glory (Part 2)",
    "Drama",
    8.2,
    2023,
    1
  ],
  [
    "Weak Hero Class 1",
    "Action",
    8.4,
    2022,
    1
  ],
  [
    "Alchemy of Souls",
    "Fantasy",
    8.7,
    2022,
    1
  ],
  [
    "Our Blues",
    "Drama",
    8.6,
    2022,
    1
  ],
  [
    "My Liberation Notes",
    "Drama",
    8.3,
    2022,
    1
  ],
  [
    "Little Women (2022)",
    "Drama",
    7.9,
    2022,
    1
  ],
  [
    "Business Proposal",
    "Romance",
    7.8,
    2022,
    1
  ],
  [
    "Twenty-Five Twenty-One",
    "Romance",
    8.6,
    2022,
    1
  ],
  [
    "Reborn Rich",
    "Drama",
    8.1,
    2022,
    1
  ],
  [
    "Through the Darkness",
    "Crime",
    8,
    2022,
    1
  ],
  [
    "D.P.",
    "Action",
    8.2,
    2021,
    1
  ],
  [
    "Squid Game (Season 2)",
    "Thriller",
    8,
    2024,
    1
  ]
];
    const expandedVaultBatch2Movies = [
  [
    "Blade Runner 2049",
    "Sci-Fi",
    8,
    2017,
    1
  ],
  [
    "Mad Max 2: The Road Warrior",
    "Action",
    8.1,
    1981,
    1
  ],
  [
    "The Thing (1982)",
    "Horror",
    8.2,
    1982,
    1
  ],
  [
    "The Big Lebowski",
    "Comedy",
    8.1,
    1998,
    1
  ],
  [
    "Fargo",
    "Crime",
    8.1,
    1996,
    1
  ],
  [
    "No Country for Old Men",
    "Crime",
    8.2,
    2007,
    1
  ],
  [
    "There Will Be Blood",
    "Drama",
    8.2,
    2007,
    1
  ],
  [
    "Boogie Nights",
    "Drama",
    7.9,
    1997,
    1
  ],
  [
    "Magnolia",
    "Drama",
    8,
    1999,
    1
  ],
  [
    "Punch-Drunk Love",
    "Comedy",
    7.3,
    2002,
    1
  ],
  [
    "The Master",
    "Drama",
    7.1,
    2012,
    1
  ],
  [
    "Phantom Thread",
    "Drama",
    7.5,
    2017,
    1
  ],
  [
    "Licorice Pizza",
    "Comedy",
    7.1,
    2021,
    1
  ],
  [
    "Mulholland Drive",
    "Mystery",
    7.9,
    2001,
    1
  ],
  [
    "Blue Velvet",
    "Mystery",
    7.7,
    1986,
    1
  ],
  [
    "Eraserhead",
    "Horror",
    7.3,
    1977,
    1
  ],
  [
    "Lost Highway",
    "Mystery",
    7.6,
    1997,
    1
  ],
  [
    "The Elephant Man",
    "Drama",
    8.2,
    1980,
    1
  ],
  [
    "Twin Peaks: Fire Walk with Me",
    "Horror",
    7.3,
    1992,
    1
  ],
  [
    "Zodiac",
    "Crime",
    7.7,
    2007,
    1
  ],
  [
    "The Social Network",
    "Drama",
    7.8,
    2010,
    1
  ],
  [
    "The Girl with the Dragon Tattoo",
    "Crime",
    7.8,
    2011,
    1
  ],
  [
    "Panic Room",
    "Thriller",
    6.8,
    2002,
    1
  ],
  [
    "The Game",
    "Thriller",
    7.7,
    1997,
    1
  ],
  [
    "Prisoners",
    "Thriller",
    8.1,
    2013,
    1
  ],
  [
    "Enemy",
    "Mystery",
    6.9,
    2013,
    1
  ],
  [
    "Sicario",
    "Action",
    7.7,
    2015,
    1
  ],
  [
    "Arrival",
    "Sci-Fi",
    7.9,
    2016,
    1
  ],
  [
    "Nightcrawler",
    "Thriller",
    7.8,
    2014,
    1
  ],
  [
    "Drive",
    "Crime",
    7.8,
    2011,
    1
  ],
  [
    "The Neon Demon",
    "Horror",
    6.1,
    2016,
    1
  ],
  [
    "Ex Machina",
    "Sci-Fi",
    7.7,
    2014,
    1
  ],
  [
    "Annihilation",
    "Sci-Fi",
    6.8,
    2018,
    1
  ],
  [
    "Civil War (2024)",
    "Action",
    7.1,
    2024,
    1
  ],
  [
    "Men",
    "Horror",
    6.1,
    2022,
    1
  ],
  [
    "Under the Skin",
    "Sci-Fi",
    6.3,
    2013,
    1
  ],
  [
    "Her",
    "Romance",
    8,
    2013,
    1
  ],
  [
    "Being John Malkovich",
    "Comedy",
    7.7,
    1999,
    1
  ],
  [
    "Adaptation.",
    "Comedy",
    7.7,
    2002,
    1
  ],
  [
    "Eternal Sunshine of the Spotless Mind",
    "Romance",
    8.3,
    2004,
    1
  ],
  [
    "Synecdoche, New York",
    "Drama",
    7.5,
    2008,
    1
  ],
  [
    "I'm Thinking of Ending Things",
    "Drama",
    6.6,
    2020,
    1
  ],
  [
    "Donnie Darko",
    "Sci-Fi",
    8,
    2001,
    1
  ],
  [
    "Requiem for a Dream",
    "Drama",
    8.3,
    2000,
    1
  ],
  [
    "Black Swan",
    "Thriller",
    8,
    2010,
    1
  ],
  [
    "The Wrestler",
    "Drama",
    7.9,
    2008,
    1
  ],
  [
    "Pi",
    "Thriller",
    7.3,
    1998,
    1
  ],
  [
    "The Whale",
    "Drama",
    7.7,
    2022,
    1
  ],
  [
    "Memento",
    "Thriller",
    8.4,
    2000,
    1
  ],
  [
    "Insomnia",
    "Thriller",
    7.2,
    2002,
    1
  ],
  [
    "The Prestige",
    "Mystery",
    8.5,
    2006,
    1
  ],
  [
    "Inception",
    "Sci-Fi",
    8.8,
    2010,
    1
  ],
  [
    "Interstellar",
    "Sci-Fi",
    8.7,
    2014,
    1
  ],
  [
    "Dunkirk",
    "War",
    7.8,
    2017,
    1
  ],
  [
    "Tenet",
    "Sci-Fi",
    7.3,
    2020,
    1
  ],
  [
    "Fight Club",
    "Drama",
    8.8,
    1999,
    1
  ],
  [
    "Se7en",
    "Crime",
    8.6,
    1995,
    1
  ],
  [
    "Gone Girl",
    "Thriller",
    8.1,
    2014,
    1
  ],
  [
    "Goodfellas",
    "Crime",
    8.7,
    1990,
    1
  ],
  [
    "Casino",
    "Crime",
    8.2,
    1995,
    1
  ],
  [
    "Taxi Driver",
    "Crime",
    8.2,
    1976,
    1
  ],
  [
    "Raging Bull",
    "Drama",
    8.1,
    1980,
    1
  ],
  [
    "The Departed",
    "Crime",
    8.5,
    2006,
    1
  ],
  [
    "Shutter Island",
    "Mystery",
    8.2,
    2010,
    1
  ],
  [
    "The Wolf of Wall Street",
    "Comedy",
    8.2,
    2013,
    1
  ],
  [
    "The Irishman",
    "Crime",
    7.8,
    2019,
    1
  ],
  [
    "Silence",
    "Drama",
    7.2,
    2016,
    1
  ],
  [
    "After Hours",
    "Comedy",
    7.6,
    1985,
    1
  ],
  [
    "The King of Comedy",
    "Comedy",
    7.8,
    1982,
    1
  ],
  [
    "Mean Streets",
    "Crime",
    7.2,
    1973,
    1
  ],
  [
    "Pulp Fiction",
    "Crime",
    8.9,
    1994,
    1
  ],
  [
    "Reservoir Dogs",
    "Crime",
    8.3,
    1992,
    1
  ],
  [
    "Jackie Brown",
    "Crime",
    7.5,
    1997,
    1
  ],
  [
    "Kill Bill: Vol. 1",
    "Action",
    8.2,
    2003,
    1
  ],
  [
    "Kill Bill: Vol. 2",
    "Action",
    8,
    2004,
    1
  ],
  [
    "Inglourious Basterds",
    "War",
    8.4,
    2009,
    1
  ],
  [
    "Django Unchained",
    "Western",
    8.5,
    2012,
    1
  ],
  [
    "The Hateful Eight",
    "Western",
    7.8,
    2015,
    1
  ],
  [
    "Once Upon a Time in Hollywood",
    "Comedy",
    7.6,
    2019,
    1
  ],
  [
    "Heat",
    "Crime",
    8.3,
    1995,
    1
  ],
  [
    "Collateral",
    "Crime",
    7.5,
    2004,
    1
  ],
  [
    "Thief",
    "Crime",
    7.4,
    1981,
    1
  ],
  [
    "Manhunter",
    "Crime",
    7.2,
    1986,
    1
  ],
  [
    "The Insider",
    "Drama",
    7.8,
    1999,
    1
  ],
  [
    "Miami Vice",
    "Action",
    6,
    2006,
    1
  ],
  [
    "Ferrari",
    "Drama",
    6.4,
    2023,
    1
  ],
  [
    "L.A. Confidential",
    "Crime",
    8.2,
    1997,
    1
  ],
  [
    "Chinatown",
    "Mystery",
    8.1,
    1974,
    1
  ],
  [
    "The Long Goodbye",
    "Crime",
    7.5,
    1973,
    1
  ],
  [
    "The French Connection",
    "Crime",
    7.7,
    1971,
    1
  ],
  [
    "Dog Day Afternoon",
    "Crime",
    8,
    1975,
    1
  ],
  [
    "Serpico",
    "Crime",
    7.7,
    1973,
    1
  ],
  [
    "Network",
    "Drama",
    8.1,
    1976,
    1
  ],
  [
    "12 Angry Men",
    "Drama",
    9,
    1957,
    1
  ],
  [
    "Fail Safe",
    "Thriller",
    8,
    1964,
    1
  ],
  [
    "All the President's Men",
    "Drama",
    7.9,
    1976,
    1
  ],
  [
    "Three Days of the Condor",
    "Thriller",
    7.4,
    1975,
    1
  ],
  [
    "The Parallax View",
    "Thriller",
    7.1,
    1974,
    1
  ],
  [
    "Klute",
    "Mystery",
    7.1,
    1971,
    1
  ],
  [
    "Blow Out",
    "Thriller",
    7.4,
    1981,
    1
  ],
  [
    "Scarface (1983)",
    "Crime",
    8.3,
    1983,
    1
  ],
  [
    "Carlito's Way",
    "Crime",
    7.9,
    1993,
    1
  ],
  [
    "The Untouchables",
    "Crime",
    7.8,
    1987,
    1
  ],
  [
    "Carrie (1976)",
    "Horror",
    7.4,
    1976,
    1
  ],
  [
    "Dressed to Kill",
    "Thriller",
    7.1,
    1980,
    1
  ],
  [
    "Seven Samurai",
    "Action",
    8.6,
    1954,
    1
  ],
  [
    "Rashomon",
    "Crime",
    8.2,
    1950,
    1
  ],
  [
    "Ikiru",
    "Drama",
    8.3,
    1952,
    1
  ],
  [
    "Yojimbo",
    "Action",
    8.2,
    1961,
    1
  ],
  [
    "Sanjuro",
    "Action",
    8,
    1962,
    1
  ],
  [
    "Throne of Blood",
    "Drama",
    8,
    1957,
    1
  ],
  [
    "The Hidden Fortress",
    "Action",
    8.1,
    1958,
    1
  ],
  [
    "Kagemusha",
    "War",
    8,
    1980,
    1
  ],
  [
    "Tokyo Story",
    "Drama",
    8.1,
    1953,
    1
  ],
  [
    "Late Spring",
    "Drama",
    8.2,
    1949,
    1
  ],
  [
    "Early Summer",
    "Drama",
    8.1,
    1951,
    1
  ],
  [
    "Ugetsu",
    "Drama",
    8.2,
    1953,
    1
  ],
  [
    "Sansho the Bailiff",
    "Drama",
    8.3,
    1954,
    1
  ],
  [
    "The 400 Blows",
    "Drama",
    8.1,
    1959,
    1
  ],
  [
    "Breathless",
    "Crime",
    7.7,
    1960,
    1
  ],
  [
    "Contempt",
    "Drama",
    7.5,
    1963,
    1
  ],
  [
    "Band of Outsiders",
    "Crime",
    7.6,
    1964,
    1
  ],
  [
    "Pierrot le Fou",
    "Crime",
    7.5,
    1965,
    1
  ],
  [
    "Cleo from 5 to 7",
    "Drama",
    7.9,
    1962,
    1
  ],
  [
    "Vagabond (1985)",
    "Drama",
    7.7,
    1985,
    1
  ],
  [
    "The Seventh Seal",
    "Fantasy",
    8.1,
    1957,
    1
  ],
  [
    "Wild Strawberries",
    "Drama",
    8.1,
    1957,
    1
  ],
  [
    "Persona",
    "Drama",
    8.1,
    1966,
    1
  ],
  [
    "Fanny and Alexander",
    "Drama",
    8.1,
    1982,
    1
  ],
  [
    "Autumn Sonata",
    "Drama",
    8.1,
    1978,
    1
  ],
  [
    "Cries and Whispers",
    "Drama",
    8.1,
    1972,
    1
  ],
  [
    "Through a Glass Darkly",
    "Drama",
    7.9,
    1961,
    1
  ],
  [
    "Winter Light",
    "Drama",
    8,
    1963,
    1
  ],
  [
    "The Silence (1963)",
    "Drama",
    7.8,
    1963,
    1
  ],
  [
    "The Virgin Spring",
    "Drama",
    8,
    1960,
    1
  ],
  [
    "Bicycle Thieves",
    "Drama",
    8.3,
    1948,
    1
  ],
  [
    "Rome, Open City",
    "War",
    8,
    1945,
    1
  ],
  [
    "Paisan",
    "War",
    7.6,
    1946,
    1
  ],
  [
    "La Strada",
    "Drama",
    8,
    1954,
    1
  ],
  [
    "Nights of Cabiria",
    "Drama",
    8.1,
    1957,
    1
  ],
  [
    "8 1/2",
    "Drama",
    8,
    1963,
    1
  ],
  [
    "La Dolce Vita",
    "Comedy",
    8,
    1960,
    1
  ],
  [
    "Amarcord",
    "Comedy",
    7.9,
    1973,
    1
  ],
  [
    "L'Avventura",
    "Mystery",
    7.8,
    1960,
    1
  ],
  [
    "La Notte",
    "Drama",
    8,
    1961,
    1
  ],
  [
    "L'Eclisse",
    "Romance",
    7.8,
    1962,
    1
  ],
  [
    "Red Desert",
    "Drama",
    7.6,
    1964,
    1
  ],
  [
    "Blow-Up",
    "Mystery",
    7.5,
    1966,
    1
  ],
  [
    "The Passenger",
    "Mystery",
    7.5,
    1975,
    1
  ],
  [
    "Aguirre, the Wrath of God",
    "Adventure",
    7.8,
    1972,
    1
  ],
  [
    "Fitzcarraldo",
    "Adventure",
    8,
    1982,
    1
  ],
  [
    "Nosferatu the Vampyre",
    "Horror",
    7.4,
    1979,
    1
  ],
  [
    "Stroszek",
    "Comedy",
    7.8,
    1977,
    1
  ],
  [
    "Woyzeck",
    "Drama",
    7,
    1979,
    1
  ],
  [
    "Wings of Desire",
    "Fantasy",
    7.9,
    1987,
    1
  ],
  [
    "Paris, Texas",
    "Drama",
    8.1,
    1984,
    1
  ],
  [
    "Alice in the Cities",
    "Drama",
    7.9,
    1974,
    1
  ],
  [
    "The American Friend",
    "Crime",
    7.4,
    1977,
    1
  ],
  [
    "The Double Life of Veronique",
    "Mystery",
    7.7,
    1991,
    1
  ],
  [
    "Three Colours: Blue",
    "Drama",
    7.8,
    1993,
    1
  ],
  [
    "Three Colours: White",
    "Comedy",
    7.6,
    1994,
    1
  ],
  [
    "Three Colours: Red",
    "Drama",
    8.1,
    1994,
    1
  ],
  [
    "A Short Film About Love",
    "Romance",
    8.1,
    1988,
    1
  ],
  [
    "A Short Film About Killing",
    "Crime",
    8,
    1988,
    1
  ],
  [
    "Solaris (1972)",
    "Sci-Fi",
    8,
    1972,
    1
  ],
  [
    "Stalker",
    "Sci-Fi",
    8.1,
    1979,
    1
  ],
  [
    "Mirror",
    "Drama",
    8,
    1975,
    1
  ],
  [
    "Nostalghia",
    "Drama",
    8,
    1983,
    1
  ],
  [
    "The Sacrifice",
    "Drama",
    7.9,
    1986,
    1
  ],
  [
    "Andrei Rublev",
    "Drama",
    8.1,
    1966,
    1
  ],
  [
    "Ivan's Childhood",
    "War",
    8,
    1962,
    1
  ],
  [
    "Metropolis (1927)",
    "Sci-Fi",
    8.3,
    1927,
    1
  ],
  [
    "M (1931)",
    "Crime",
    8.3,
    1931,
    1
  ],
  [
    "The Cabinet of Dr. Caligari",
    "Horror",
    8,
    1920,
    1
  ],
  [
    "Nosferatu (1922)",
    "Horror",
    7.9,
    1922,
    1
  ],
  [
    "Sunrise: A Song of Two Humans",
    "Romance",
    8.1,
    1927,
    1
  ],
  [
    "The Passion of Joan of Arc",
    "Drama",
    8.1,
    1928,
    1
  ],
  [
    "Vampyr",
    "Horror",
    7.4,
    1932,
    1
  ],
  [
    "Ordet",
    "Drama",
    8.3,
    1955,
    1
  ],
  [
    "Gertrud",
    "Drama",
    7.6,
    1964,
    1
  ],
  [
    "Battleship Potemkin",
    "War",
    7.9,
    1925,
    1
  ],
  [
    "Pather Panchali",
    "Drama",
    8.5,
    1955,
    1
  ],
  [
    "Aparajito",
    "Drama",
    8.4,
    1956,
    1
  ],
  [
    "Apur Sansar",
    "Drama",
    8.5,
    1959,
    1
  ],
  [
    "Charulata",
    "Drama",
    8.4,
    1964,
    1
  ],
  [
    "Mahanagar",
    "Drama",
    8.2,
    1963,
    1
  ],
  [
    "Nayak: The Hero",
    "Drama",
    8.2,
    1966,
    1
  ],
  [
    "Goopy Gyne Bagha Byne",
    "Fantasy",
    8.8,
    1969,
    1
  ],
  [
    "Hirak Rajar Deshe",
    "Fantasy",
    8.7,
    1980,
    1
  ],
  [
    "Jalsaghar",
    "Drama",
    8,
    1958,
    1
  ],
  [
    "Agantuk",
    "Drama",
    8.1,
    1991,
    1
  ],
  [
    "Sonar Kella",
    "Mystery",
    8.3,
    1974,
    1
  ],
  [
    "Joy Baba Felunath",
    "Mystery",
    8,
    1979,
    1
  ],
  [
    "Meghe Dhaka Tara",
    "Drama",
    8.1,
    1960,
    1
  ],
  [
    "Komal Gandhar",
    "Drama",
    7.8,
    1961,
    1
  ],
  [
    "Subarnarekha",
    "Drama",
    8.1,
    1965,
    1
  ],
  [
    "Bhuvan Shome",
    "Comedy",
    7.5,
    1969,
    1
  ],
  [
    "Khandhar",
    "Drama",
    7.6,
    1984,
    1
  ],
  [
    "Ghatashraddha",
    "Drama",
    8.1,
    1977,
    1
  ],
  [
    "Samskara",
    "Drama",
    7.9,
    1970,
    1
  ],
  [
    "Chomana Dudi",
    "Drama",
    8.1,
    1975,
    1
  ],
  [
    "Tabarana Kathe",
    "Drama",
    8.4,
    1987,
    1
  ],
  [
    "Elippathayam",
    "Drama",
    8,
    1982,
    1
  ],
  [
    "Mukhamukham",
    "Drama",
    7.7,
    1984,
    1
  ],
  [
    "Anantaram",
    "Drama",
    8.1,
    1987,
    1
  ],
  [
    "Mathilukal",
    "Drama",
    8.4,
    1990,
    1
  ],
  [
    "Vidheyan",
    "Drama",
    8.3,
    1994,
    1
  ],
  [
    "Nizhalkkuthu",
    "Drama",
    7.5,
    2002,
    1
  ],
  [
    "Oru Vadakkan Veeragatha",
    "Action",
    8.6,
    1989,
    1
  ],
  [
    "Kireedam",
    "Drama",
    8.9,
    1989,
    1
  ],
  [
    "Chenkol",
    "Drama",
    8.3,
    1993,
    1
  ],
  [
    "Spadikam",
    "Action",
    8.5,
    1995,
    1
  ],
  [
    "Manichitrathazhu",
    "Horror",
    8.8,
    1993,
    1
  ],
  [
    "Devasuram",
    "Action",
    8.6,
    1993,
    1
  ],
  [
    "Godfather (Malayalam)",
    "Comedy",
    8.6,
    1991,
    1
  ],
  [
    "In Harihar Nagar",
    "Comedy",
    8.5,
    1990,
    1
  ],
  [
    "Ramji Rao Speaking",
    "Comedy",
    8.7,
    1989,
    1
  ],
  [
    "Nadodikkattu",
    "Comedy",
    8.8,
    1987,
    1
  ],
  [
    "Pattanapravesham",
    "Comedy",
    8.4,
    1988,
    1
  ],
  [
    "Sandhesam",
    "Comedy",
    8.9,
    1991,
    1
  ],
  [
    "Thoovanathumbikal",
    "Romance",
    8.6,
    1987,
    1
  ],
  [
    "Namukku Parkkan Munthirithoppukal",
    "Romance",
    8.4,
    1986,
    1
  ],
  [
    "Yavanika",
    "Mystery",
    8.5,
    1982,
    1
  ],
  [
    "Moonnam Pakkam",
    "Drama",
    8.3,
    1988,
    1
  ],
  [
    "Perumthachan",
    "Drama",
    8.3,
    1990,
    1
  ],
  [
    "Amaram",
    "Drama",
    8.3,
    1991,
    1
  ],
  [
    "Bharatham",
    "Drama",
    8.3,
    1991,
    1
  ],
  [
    "Sadayam",
    "Thriller",
    8.2,
    1992,
    1
  ],
  [
    "Pranchiyettan & the Saint",
    "Comedy",
    8.2,
    2010,
    1
  ],
  [
    "Traffic",
    "Thriller",
    8.1,
    2011,
    1
  ],
  [
    "Chithram",
    "Comedy",
    8.4,
    1988,
    1
  ],
  [
    "Kilukkam",
    "Comedy",
    8.6,
    1991,
    1
  ],
  [
    "Meleparambil Anveedu",
    "Comedy",
    8.4,
    1993,
    1
  ],
  [
    "Punjabi House",
    "Comedy",
    8.2,
    1998,
    1
  ],
  [
    "C.I.D. Moosa",
    "Comedy",
    7.9,
    2003,
    1
  ],
  [
    "Kalyanaraman",
    "Comedy",
    7.7,
    2002,
    1
  ],
  [
    "Meesa Madhavan",
    "Comedy",
    7.8,
    2002,
    1
  ],
  [
    "Chotta Mumbai",
    "Action",
    7.5,
    2007,
    1
  ],
  [
    "Rajamanikyam",
    "Comedy",
    7.5,
    2005,
    1
  ],
  [
    "Big B",
    "Action",
    7.8,
    2007,
    1
  ],
  [
    "Anwar",
    "Action",
    6.8,
    2010,
    1
  ],
  [
    "Amen",
    "Musical",
    7.7,
    2013,
    1
  ],
  [
    "North 24 Kaatham",
    "Drama",
    7.7,
    2013,
    1
  ],
  [
    "Guppy",
    "Drama",
    8,
    2016,
    1
  ],
  [
    "Take Off",
    "Drama",
    8.1,
    2017,
    1
  ],
  [
    "Joseph",
    "Crime",
    8,
    2018,
    1
  ],
  [
    "Kuruthi",
    "Thriller",
    7.6,
    2021,
    1
  ],
  [
    "Malik",
    "Crime",
    8,
    2021,
    1
  ],
  [
    "Bheeshma Parvam",
    "Action",
    7.6,
    2022,
    1
  ],
  [
    "Mukundan Unni Associates",
    "Comedy",
    7.9,
    2022,
    1
  ],
  [
    "Thallumaala",
    "Action",
    7.2,
    2022,
    1
  ],
  [
    "Purusha Pretham",
    "Comedy",
    7.4,
    2023,
    1
  ],
  [
    "Abraham Ozler",
    "Crime",
    6.8,
    2024,
    1
  ],
  [
    "Turbo",
    "Action",
    6.2,
    2024,
    1
  ],
  [
    "Varshangalkku Shesham",
    "Drama",
    7.3,
    2024,
    1
  ],
  [
    "ARM: Ajayante Randam Mokshanam",
    "Fantasy",
    7.5,
    2024,
    1
  ],
  [
    "Veedu",
    "Drama",
    8.4,
    1988,
    1
  ],
  [
    "Sandhya Raagam",
    "Drama",
    8.3,
    1989,
    1
  ],
  [
    "Marupadiyum",
    "Drama",
    8.1,
    1993,
    1
  ],
  [
    "Moondram Pirai",
    "Romance",
    8.5,
    1982,
    1
  ],
  [
    "16 Vayathinile",
    "Drama",
    8,
    1977,
    1
  ],
  [
    "Sigappu Rojakkal",
    "Thriller",
    7.9,
    1978,
    1
  ],
  [
    "Johnny (1980)",
    "Crime",
    7.9,
    1980,
    1
  ],
  [
    "Nenjathai Killathe",
    "Romance",
    8,
    1980,
    1
  ],
  [
    "Mouna Ragam",
    "Romance",
    8.5,
    1986,
    1
  ],
  [
    "Agni Natchathiram",
    "Action",
    7.8,
    1988,
    1
  ],
  [
    "Anjali",
    "Drama",
    8.1,
    1990,
    1
  ],
  [
    "Michael Madana Kama Rajan",
    "Comedy",
    8.5,
    1990,
    1
  ],
  [
    "Gunaa",
    "Romance",
    8.2,
    1991,
    1
  ],
  [
    "Thevar Magan",
    "Drama",
    8.7,
    1992,
    1
  ],
  [
    "Mahanadhi",
    "Drama",
    8.5,
    1994,
    1
  ],
  [
    "Nammavar",
    "Drama",
    8.2,
    1994,
    1
  ],
  [
    "Sathi Leelavathi",
    "Comedy",
    8.1,
    1995,
    1
  ],
  [
    "Avvai Shanmugi",
    "Comedy",
    8.2,
    1996,
    1
  ],
  [
    "Indian (1996)",
    "Action",
    8.1,
    1996,
    1
  ],
  [
    "Kadhalan",
    "Romance",
    7.4,
    1994,
    1
  ],
  [
    "Jeans",
    "Comedy",
    7.2,
    1998,
    1
  ],
  [
    "Mudhalvan",
    "Action",
    8.4,
    1999,
    1
  ],
  [
    "Kandukondain Kandukondain",
    "Romance",
    7.7,
    2000,
    1
  ],
  [
    "Minnale",
    "Romance",
    7.7,
    2001,
    1
  ],
  [
    "Aalavandhan",
    "Thriller",
    7.3,
    2001,
    1
  ],
  [
    "Kannathil Muthamittal",
    "Drama",
    8.4,
    2002,
    1
  ],
  [
    "Panchatanthiram",
    "Comedy",
    8.4,
    2002,
    1
  ],
  [
    "Anbe Sivam",
    "Drama",
    8.6,
    2003,
    1
  ],
  [
    "Dhool",
    "Action",
    7.3,
    2003,
    1
  ],
  [
    "Ghilli",
    "Action",
    8.1,
    2004,
    1
  ],
  [
    "Virumaandi",
    "Action",
    8.3,
    2004,
    1
  ],
  [
    "Autograph",
    "Drama",
    8.1,
    2004,
    1
  ],
  [
    "Ayutha Ezhuthu",
    "Drama",
    8,
    2004,
    1
  ],
  [
    "Anniyan",
    "Action",
    8.3,
    2005,
    1
  ],
  [
    "Chandramukhi",
    "Horror",
    7.2,
    2005,
    1
  ],
  [
    "Pudhupettai",
    "Crime",
    8.5,
    2006,
    1
  ],
  [
    "Vettaiyaadu Vilaiyaadu",
    "Crime",
    7.9,
    2006,
    1
  ],
  [
    "Paruthiveeran",
    "Drama",
    8.2,
    2007,
    1
  ],
  [
    "Polladhavan",
    "Action",
    7.7,
    2007,
    1
  ],
  [
    "Subramaniapuram",
    "Crime",
    8.2,
    2008,
    1
  ],
  [
    "Vaaranam Aayiram",
    "Drama",
    8.2,
    2008,
    1
  ],
  [
    "Dasavathaaram",
    "Sci-Fi",
    7.2,
    2008,
    1
  ],
  [
    "Ayan",
    "Action",
    7.7,
    2009,
    1
  ],
  [
    "Vinnaithaandi Varuvaayaa",
    "Romance",
    8.1,
    2010,
    1
  ],
  [
    "Enthiran",
    "Sci-Fi",
    7.1,
    2010,
    1
  ],
  [
    "Aadukalam",
    "Drama",
    8.1,
    2011,
    1
  ],
  [
    "Mankatha",
    "Crime",
    7.7,
    2011,
    1
  ],
  [
    "Pizza",
    "Horror",
    8,
    2012,
    1
  ],
  [
    "Thuppakki",
    "Action",
    8.1,
    2012,
    1
  ],
  [
    "Naduvula Konjam Pakkatha Kaanom",
    "Comedy",
    8.2,
    2012,
    1
  ],
  [
    "Kalyana Samayal Saadham",
    "Comedy",
    7.5,
    2013,
    1
  ],
  [
    "Kaththi",
    "Action",
    8.1,
    2014,
    1
  ],
  [
    "Jigarthanda",
    "Crime",
    8.3,
    2014,
    1
  ],
  [
    "Madras",
    "Drama",
    8,
    2014,
    1
  ],
  [
    "Kaaka Muttai",
    "Comedy",
    8.3,
    2014,
    1
  ],
  [
    "I (2015)",
    "Action",
    7.4,
    2015,
    1
  ],
  [
    "Irudhi Suttru",
    "Drama",
    7.6,
    2016,
    1
  ],
  [
    "24 (2016)",
    "Sci-Fi",
    7.9,
    2016,
    1
  ],
  [
    "Aruvi",
    "Drama",
    8.4,
    2016,
    1
  ],
  [
    "Vikram Vedha",
    "Action",
    8.2,
    2017,
    1
  ],
  [
    "Mersal",
    "Action",
    7.5,
    2017,
    1
  ],
  [
    "Pyaar Prema Kaadhal",
    "Romance",
    7.1,
    2018,
    1
  ],
  [
    "Kolamaavu Kokila",
    "Comedy",
    7.3,
    2018,
    1
  ],
  [
    "Peranbu",
    "Drama",
    8.7,
    2018,
    1
  ],
  [
    "Petta",
    "Action",
    7.1,
    2019,
    1
  ],
  [
    "Viswasam",
    "Action",
    6.7,
    2019,
    1
  ],
  [
    "Master (2021)",
    "Action",
    7.8,
    2021,
    1
  ],
  [
    "Doctor",
    "Comedy",
    7.4,
    2021,
    1
  ],
  [
    "Maanaadu",
    "Sci-Fi",
    8.3,
    2021,
    1
  ],
  [
    "Love Today",
    "Comedy",
    8,
    2022,
    1
  ],
  [
    "Thiruchitrambalam",
    "Comedy",
    7.9,
    2022,
    1
  ],
  [
    "Leo",
    "Action",
    7.2,
    2023,
    1
  ],
  [
    "Por Thozhil",
    "Crime",
    8,
    2023,
    1
  ],
  [
    "Good Night",
    "Comedy",
    7.7,
    2023,
    1
  ],
  [
    "Ayalaan",
    "Sci-Fi",
    6.2,
    2024,
    1
  ],
  [
    "Captain Miller",
    "Action",
    6.6,
    2024,
    1
  ],
  [
    "Garudan",
    "Action",
    7.4,
    2024,
    1
  ],
  [
    "Raayan",
    "Action",
    6.8,
    2024,
    1
  ],
  [
    "Vaazhai",
    "Drama",
    8.2,
    2024,
    1
  ],
  [
    "Kottukkaali",
    "Drama",
    7.7,
    2024,
    1
  ],
  [
    "Lubber Pandhu",
    "Comedy",
    8.3,
    2024,
    1
  ],
  [
    "Amaran",
    "War",
    8.4,
    2024,
    1
  ],
  [
    "Gundamma Katha",
    "Comedy",
    8.6,
    1962,
    1
  ],
  [
    "Missamma",
    "Comedy",
    8.4,
    1955,
    1
  ],
  [
    "Pathala Bhairavi",
    "Fantasy",
    8.5,
    1951,
    1
  ],
  [
    "Devadasu (1953)",
    "Drama",
    8.4,
    1953,
    1
  ],
  [
    "Mooga Manasulu",
    "Romance",
    8.2,
    1964,
    1
  ],
  [
    "Maro Charitra",
    "Romance",
    8.2,
    1978,
    1
  ],
  [
    "Siri Siri Muvva",
    "Drama",
    8.3,
    1976,
    1
  ],
  [
    "Subhalekha",
    "Comedy",
    8.2,
    1982,
    1
  ],
  [
    "Khaidi",
    "Action",
    8,
    1983,
    1
  ],
  [
    "Anveshana",
    "Mystery",
    8.3,
    1985,
    1
  ],
  [
    "Chantabbai",
    "Comedy",
    8.4,
    1986,
    1
  ],
  [
    "Rudraveena",
    "Drama",
    8.7,
    1988,
    1
  ],
  [
    "Aakhari Poratam",
    "Action",
    7.8,
    1988,
    1
  ],
  [
    "Geethanjali (1989)",
    "Romance",
    8.3,
    1989,
    1
  ],
  [
    "Siva",
    "Crime",
    8.2,
    1989,
    1
  ],
  [
    "Jagadeka Veerudu Athiloka Sundari",
    "Fantasy",
    7.9,
    1990,
    1
  ],
  [
    "Kshana Kshanam",
    "Comedy",
    8.3,
    1991,
    1
  ],
  [
    "Aditya 369",
    "Sci-Fi",
    8.4,
    1991,
    1
  ],
  [
    "Money (1993)",
    "Comedy",
    8.1,
    1993,
    1
  ],
  [
    "Gaayam",
    "Crime",
    7.8,
    1993,
    1
  ],
  [
    "Aha Naa Pellanta",
    "Comedy",
    8.6,
    1987,
    1
  ],
  [
    "Appula Appa Rao",
    "Comedy",
    8.1,
    1991,
    1
  ],
  [
    "Jambalakidi Pamba",
    "Comedy",
    8.1,
    1993,
    1
  ],
  [
    "Sindhooram",
    "Action",
    7.8,
    1997,
    1
  ],
  [
    "Tholi Prema",
    "Romance",
    8.3,
    1998,
    1
  ],
  [
    "Kushi",
    "Romance",
    8.1,
    2001,
    1
  ],
  [
    "Manasantha Nuvve",
    "Romance",
    7.4,
    2001,
    1
  ],
  [
    "Nuvvu Nenu",
    "Romance",
    7.2,
    2001,
    1
  ],
  [
    "Jayam",
    "Romance",
    6.8,
    2002,
    1
  ],
  [
    "Okkadu",
    "Action",
    8.1,
    2003,
    1
  ],
  [
    "Simhadri",
    "Action",
    7.4,
    2003,
    1
  ],
  [
    "Varsham",
    "Romance",
    7.3,
    2004,
    1
  ],
  [
    "Arya",
    "Romance",
    7.8,
    2004,
    1
  ],
  [
    "Chatrapathi",
    "Action",
    7.7,
    2005,
    1
  ],
  [
    "Anukokunda Oka Roju",
    "Mystery",
    8.1,
    2005,
    1
  ],
  [
    "Bommarillu",
    "Comedy",
    8.2,
    2006,
    1
  ],
  [
    "Happy Days",
    "Drama",
    7.9,
    2007,
    1
  ],
  [
    "Gamyam",
    "Drama",
    8.2,
    2008,
    1
  ],
  [
    "Arundhati",
    "Horror",
    7.4,
    2009,
    1
  ],
  [
    "Kick (2009)",
    "Comedy",
    7.7,
    2009,
    1
  ],
  [
    "Prasthanam",
    "Crime",
    8.1,
    2010,
    1
  ],
  [
    "Vedam",
    "Drama",
    8.1,
    2010,
    1
  ],
  [
    "Leader",
    "Drama",
    8,
    2010,
    1
  ],
  [
    "Dookudu",
    "Action",
    7.5,
    2011,
    1
  ],
  [
    "Ala Modalaindi",
    "Comedy",
    7.6,
    2011,
    1
  ],
  [
    "Gabbar Singh",
    "Action",
    7.1,
    2012,
    1
  ],
  [
    "Julayi",
    "Action",
    7.2,
    2012,
    1
  ],
  [
    "Seethamma Vakitlo Sirimalle Chettu",
    "Drama",
    7.5,
    2013,
    1
  ],
  [
    "Attarintiki Daredi",
    "Comedy",
    7.3,
    2013,
    1
  ],
  [
    "1: Nenokkadine",
    "Thriller",
    8.1,
    2014,
    1
  ],
  [
    "Race Gurram",
    "Comedy",
    7.3,
    2014,
    1
  ],
  [
    "Manam",
    "Fantasy",
    8,
    2014,
    1
  ],
  [
    "Srimanthudu",
    "Drama",
    7.5,
    2015,
    1
  ],
  [
    "Bhale Bhale Magadivoy",
    "Comedy",
    7.7,
    2015,
    1
  ],
  [
    "Kshanam",
    "Mystery",
    8.2,
    2016,
    1
  ],
  [
    "Oopiri",
    "Comedy",
    8,
    2016,
    1
  ],
  [
    "Fidaa",
    "Romance",
    7.5,
    2017,
    1
  ],
  [
    "Goodachari",
    "Action",
    7.8,
    2018,
    1
  ],
  [
    "Awe!",
    "Mystery",
    7.7,
    2018,
    1
  ],
  [
    "Brochevarevarura",
    "Comedy",
    8,
    2019,
    1
  ],
  [
    "Ala Vaikunthapurramuloo",
    "Action",
    7.3,
    2020,
    1
  ],
  [
    "Sarileru Neekevvaru",
    "Action",
    6,
    2020,
    1
  ],
  [
    "Jathi Ratnalu",
    "Comedy",
    7.3,
    2021,
    1
  ],
  [
    "Love Story (2021)",
    "Romance",
    7.4,
    2021,
    1
  ],
  [
    "DJ Tillu",
    "Comedy",
    7.2,
    2022,
    1
  ],
  [
    "Tillu Square",
    "Comedy",
    7.1,
    2024,
    1
  ],
  [
    "Bimbisara",
    "Fantasy",
    7.3,
    2022,
    1
  ],
  [
    "Karthikeya 2",
    "Mystery",
    7.8,
    2022,
    1
  ],
  [
    "Dasara",
    "Action",
    6.7,
    2023,
    1
  ],
  [
    "Virupaksha",
    "Mystery",
    7.3,
    2023,
    1
  ],
  [
    "Miss Shetty Mr Polishetty",
    "Comedy",
    7,
    2023,
    1
  ],
  [
    "MAD (2023)",
    "Comedy",
    7.1,
    2023,
    1
  ],
  [
    "Mangalavaaram",
    "Horror",
    6.8,
    2023,
    1
  ],
  [
    "Guntur Kaaram",
    "Action",
    5.4,
    2024,
    1
  ],
  [
    "Gaami",
    "Sci-Fi",
    7,
    2024,
    1
  ],
  [
    "Saripodhaa Sanivaaram",
    "Action",
    7.1,
    2024,
    1
  ],
  [
    "Committee Kurrollu",
    "Drama",
    7.6,
    2024,
    1
  ],
  [
    "Akira",
    "Animation",
    8,
    1988,
    1
  ],
  [
    "Ghost in the Shell",
    "Animation",
    7.9,
    1995,
    1
  ],
  [
    "Perfect Blue",
    "Animation",
    8,
    1997,
    1
  ],
  [
    "Millennium Actress",
    "Animation",
    7.8,
    2001,
    1
  ],
  [
    "Tokyo Godfathers",
    "Animation",
    7.8,
    2003,
    1
  ],
  [
    "Paprika",
    "Animation",
    7.7,
    2006,
    1
  ],
  [
    "Princess Mononoke",
    "Animation",
    8.4,
    1997,
    1
  ],
  [
    "Spirited Away",
    "Animation",
    8.6,
    2001,
    1
  ],
  [
    "My Neighbor Totoro",
    "Animation",
    8.1,
    1988,
    1
  ],
  [
    "Howl's Moving Castle",
    "Animation",
    8.2,
    2004,
    1
  ],
  [
    "Kiki's Delivery Service",
    "Animation",
    7.8,
    1989,
    1
  ],
  [
    "Nausicaa of the Valley of the Wind",
    "Animation",
    8,
    1984,
    1
  ],
  [
    "Castle in the Sky",
    "Animation",
    8,
    1986,
    1
  ],
  [
    "Porco Rosso",
    "Animation",
    7.7,
    1992,
    1
  ],
  [
    "Whisper of the Heart",
    "Animation",
    7.9,
    1995,
    1
  ],
  [
    "The Secret World of Arrietty",
    "Animation",
    7.6,
    2010,
    1
  ],
  [
    "When Marnie Was There",
    "Animation",
    7.7,
    2014,
    1
  ],
  [
    "Grave of the Fireflies",
    "Animation",
    8.5,
    1988,
    1
  ],
  [
    "Your Name.",
    "Animation",
    8.4,
    2016,
    1
  ],
  [
    "A Silent Voice",
    "Animation",
    8.1,
    2016,
    1
  ],
  [
    "I Want to Eat Your Pancreas",
    "Animation",
    8,
    2018,
    1
  ],
  [
    "Josee, the Tiger and the Fish",
    "Animation",
    7.6,
    2020,
    1
  ],
  [
    "In This Corner of the World",
    "Animation",
    7.8,
    2016,
    1
  ],
  [
    "The Girl Who Leapt Through Time",
    "Animation",
    7.7,
    2006,
    1
  ],
  [
    "Summer Wars",
    "Animation",
    7.4,
    2009,
    1
  ],
  [
    "Wolf Children",
    "Animation",
    8.1,
    2012,
    1
  ],
  [
    "The Boy and the Beast",
    "Animation",
    7.6,
    2015,
    1
  ],
  [
    "Mirai",
    "Animation",
    7,
    2018,
    1
  ],
  [
    "Belle",
    "Animation",
    7.1,
    2021,
    1
  ],
  [
    "Redline",
    "Animation",
    7.5,
    2009,
    1
  ],
  [
    "Promare",
    "Animation",
    7,
    2019,
    1
  ],
  [
    "Sword of the Stranger",
    "Animation",
    7.8,
    2007,
    1
  ],
  [
    "Ninja Scroll",
    "Animation",
    7.8,
    1993,
    1
  ],
  [
    "Vampire Hunter D: Bloodlust",
    "Animation",
    7.6,
    2000,
    1
  ],
  [
    "The Disappearance of Haruhi Suzumiya",
    "Animation",
    8,
    2010,
    1
  ],
  [
    "Kizumonogatari I: Tekketsu",
    "Animation",
    7.5,
    2016,
    1
  ],
  [
    "Kizumonogatari II: Nekketsu",
    "Animation",
    7.8,
    2016,
    1
  ],
  [
    "Kizumonogatari III: Reiketsu",
    "Animation",
    8,
    2017,
    1
  ],
  [
    "Evangelion: 1.0 You Are (Not) Alone",
    "Animation",
    7.6,
    2007,
    1
  ],
  [
    "Evangelion: 2.0 You Can (Not) Advance",
    "Animation",
    7.9,
    2009,
    1
  ],
  [
    "Evangelion: 3.0 You Can (Not) Redo",
    "Animation",
    6.9,
    2012,
    1
  ],
  [
    "Evangelion: 3.0+1.0 Thrice Upon a Time",
    "Animation",
    8,
    2021,
    1
  ],
  [
    "The End of Evangelion",
    "Animation",
    8.2,
    1997,
    1
  ],
  [
    "Cowboy Bebop: The Movie",
    "Animation",
    7.8,
    2001,
    1
  ],
  [
    "Demon Slayer: Mugen Train",
    "Animation",
    8.2,
    2020,
    1
  ],
  [
    "Jujutsu Kaisen 0",
    "Animation",
    7.8,
    2021,
    1
  ],
  [
    "One Piece Film: Red",
    "Animation",
    6.8,
    2022,
    1
  ],
  [
    "Dragon Ball Super: Broly",
    "Animation",
    7.7,
    2018,
    1
  ],
  [
    "Dragon Ball Super: Super Hero",
    "Animation",
    7.1,
    2022,
    1
  ],
  [
    "Haikyu!! The Dumpster Battle",
    "Animation",
    7.8,
    2024,
    1
  ],
  [
    "Blue Giant",
    "Animation",
    8.2,
    2023,
    1
  ],
  [
    "The First Slam Dunk",
    "Animation",
    8.2,
    2022,
    1
  ]
];
    const expandedVaultBatch2Shows = [
  [
    "Dekalog",
    "Drama",
    8.9,
    1989,
    1
  ],
  [
    "Rome",
    "Drama",
    8.7,
    2005,
    1
  ],
  [
    "Deadwood",
    "Western",
    8.6,
    2004,
    1
  ],
  [
    "Six Feet Under",
    "Drama",
    8.7,
    2001,
    1
  ],
  [
    "The Leftovers",
    "Mystery",
    8.3,
    2014,
    1
  ],
  [
    "Watchmen (Series)",
    "Sci-Fi",
    8.2,
    2019,
    1
  ],
  [
    "Station Eleven",
    "Sci-Fi",
    7.7,
    2021,
    1
  ],
  [
    "Maniac",
    "Comedy",
    7.7,
    2018,
    1
  ],
  [
    "Severance",
    "Sci-Fi",
    8.7,
    2022,
    1
  ],
  [
    "The White Lotus",
    "Comedy",
    8,
    2021,
    1
  ],
  [
    "Hacks",
    "Comedy",
    8.2,
    2021,
    1
  ],
  [
    "Barry",
    "Comedy",
    8.4,
    2018,
    1
  ],
  [
    "Atlanta",
    "Comedy",
    8.6,
    2016,
    1
  ],
  [
    "Silicon Valley",
    "Comedy",
    8.5,
    2014,
    1
  ],
  [
    "Veep",
    "Comedy",
    8.4,
    2012,
    1
  ],
  [
    "Curb Your Enthusiasm",
    "Comedy",
    8.8,
    2000,
    1
  ],
  [
    "Broadchurch",
    "Crime",
    8.4,
    2013,
    1
  ],
  [
    "Happy Valley",
    "Crime",
    8.5,
    2014,
    1
  ],
  [
    "Unforgotten",
    "Crime",
    8.3,
    2015,
    1
  ],
  [
    "The Fall",
    "Crime",
    8.1,
    2013,
    1
  ],
  [
    "Luther",
    "Crime",
    8.4,
    2010,
    1
  ],
  [
    "Sherlock",
    "Mystery",
    9.1,
    2010,
    1
  ],
  [
    "Endeavour",
    "Crime",
    8.6,
    2012,
    1
  ],
  [
    "Gomorrah",
    "Crime",
    8.7,
    2014,
    1
  ],
  [
    "Suburra: Blood on Rome",
    "Crime",
    7.9,
    2017,
    1
  ],
  [
    "Babylon Berlin",
    "Crime",
    8.4,
    2017,
    1
  ],
  [
    "Dark",
    "Sci-Fi",
    8.7,
    2017,
    1
  ],
  [
    "Borgen",
    "Drama",
    8.5,
    2010,
    1
  ],
  [
    "The Bridge (Bron/Broen)",
    "Crime",
    8.6,
    2011,
    1
  ],
  [
    "The Killing (Forbrydelsen)",
    "Crime",
    8.4,
    2007,
    1
  ],
  [
    "Trapped (Ófærð)",
    "Crime",
    8,
    2015,
    1
  ],
  [
    "Young Pope",
    "Drama",
    8.3,
    2016,
    1
  ],
  [
    "The New Pope",
    "Drama",
    8.1,
    2020,
    1
  ],
  [
    "My Brilliant Friend",
    "Drama",
    8.6,
    2018,
    1
  ],
  [
    "Caliphate",
    "Thriller",
    8.2,
    2020,
    1
  ],
  [
    "Knutby",
    "Crime",
    7.3,
    2021,
    1
  ],
  [
    "Snabba Cash",
    "Crime",
    7.6,
    2021,
    1
  ],
  [
    "Fauda",
    "Action",
    8.3,
    2015,
    1
  ],
  [
    "Tehran",
    "Thriller",
    7.6,
    2020,
    1
  ],
  [
    "Shtisel",
    "Drama",
    8.3,
    2013,
    1
  ],
  [
    "Our Boys",
    "Drama",
    7.6,
    2019,
    1
  ],
  [
    "Valley of Tears",
    "War",
    7.9,
    2020,
    1
  ],
  [
    "Lupin",
    "Crime",
    7.5,
    2021,
    1
  ],
  [
    "Call My Agent! (Dix pour cent)",
    "Comedy",
    8.3,
    2015,
    1
  ],
  [
    "The Bureau (Le Bureau des Legendes)",
    "Thriller",
    8.7,
    2015,
    1
  ],
  [
    "Spiral (Engrenages)",
    "Crime",
    8.5,
    2005,
    1
  ],
  [
    "Les Revenants",
    "Drama",
    8.1,
    2012,
    1
  ],
  [
    "Black Spot (Zone Blanche)",
    "Crime",
    7.4,
    2017,
    1
  ],
  [
    "Money Heist (La Casa de Papel)",
    "Crime",
    8.2,
    2017,
    1
  ],
  [
    "Vis a Vis (Locked Up)",
    "Crime",
    8.2,
    2015,
    1
  ],
  [
    "Elite",
    "Drama",
    7.4,
    2018,
    1
  ],
  [
    "Patria",
    "Drama",
    8.2,
    2020,
    1
  ],
  [
    "30 Coins",
    "Horror",
    7.1,
    2020,
    1
  ],
  [
    "Riot Police (Antidisturbios)",
    "Crime",
    8.1,
    2020,
    1
  ],
  [
    "Asunta",
    "Crime",
    7,
    2024,
    1
  ]
];
        // ==========================================
    // 1.4 NEW RELEASES & EXPANDED VAULT (2023-2026)
    // ==========================================
    const newerMovies2024_2026 = [
  [
    "Heretic",
    "Horror",
    7.1,
    2024
  ],
  [
    "Smile 2",
    "Horror",
    6.6,
    2024
  ],
  [
    "Terrifier 3",
    "Horror",
    6.4,
    2024
  ],
  [
    "Sing Sing",
    "Drama",
    7.8,
    2024
  ],
  [
    "Hit Man",
    "Comedy",
    6.8,
    2024
  ],
  [
    "The Fall Guy",
    "Action",
    6.9,
    2024
  ],
  [
    "Blink Twice",
    "Thriller",
    6.6,
    2024
  ],
  [
    "Monkey Man",
    "Action",
    6.9,
    2024
  ],
  [
    "Horizon: An American Saga - Chapter 1",
    "Western",
    6.7,
    2024
  ],
  [
    "Abigail",
    "Horror",
    6.6,
    2024
  ],
  [
    "Speak No Evil",
    "Thriller",
    6.9,
    2024
  ],
  [
    "Red One",
    "Action",
    6.6,
    2024
  ],
  [
    "Wolfs",
    "Comedy",
    6.5,
    2024
  ],
  [
    "The Bikeriders",
    "Drama",
    6.7,
    2024
  ],
  [
    "Fly Me to the Moon",
    "Romance",
    6.6,
    2024
  ],
  [
    "Kneecap",
    "Comedy",
    7.5,
    2024
  ],
  [
    "Love Lies Bleeding",
    "Thriller",
    6.6,
    2024
  ],
  [
    "Late Night with the Devil",
    "Horror",
    7,
    2024
  ],
  [
    "In a Violent Nature",
    "Horror",
    5.8,
    2024
  ],
  [
    "Boy Kills World",
    "Action",
    6.4,
    2024
  ],
  [
    "The Ministry of Ungentlemanly Warfare",
    "War",
    6.8,
    2024
  ],
  [
    "Trap",
    "Thriller",
    6.2,
    2024
  ],
  [
    "Cuckoo",
    "Horror",
    6,
    2024
  ],
  [
    "The Piano Lesson",
    "Drama",
    6.8,
    2024
  ],
  [
    "Blitz",
    "War",
    6.5,
    2024
  ],
  [
    "Emilia Pérez",
    "Crime",
    7.2,
    2024
  ],
  [
    "Flow",
    "Animation",
    8.1,
    2024
  ],
  [
    "Memoir of a Snail",
    "Animation",
    8,
    2024
  ],
  [
    "The Apprentice",
    "Drama",
    7.1,
    2024
  ],
  [
    "Juror #2",
    "Thriller",
    7,
    2024
  ],
  [
    "The Seed of the Sacred Fig",
    "Drama",
    7.8,
    2024
  ],
  [
    "All We Imagine as Light",
    "Drama",
    7.5,
    2024
  ],
  [
    "I Saw the TV Glow",
    "Drama",
    5.9,
    2024
  ],
  [
    "Megalopolis",
    "Sci-Fi",
    5,
    2024
  ],
  [
    "Nightbitch",
    "Comedy",
    6,
    2024
  ],
  [
    "Better Man",
    "Drama",
    7.4,
    2024
  ],
  [
    "September 5",
    "Drama",
    7.5,
    2024
  ],
  [
    "Nickel Boys",
    "Drama",
    7.4,
    2024
  ],
  [
    "Hard Truths",
    "Drama",
    7.2,
    2024
  ],
  [
    "The Room Next Door",
    "Drama",
    6.8,
    2024
  ],
  [
    "Queer",
    "Drama",
    6.4,
    2024
  ],
  [
    "Babygirl",
    "Thriller",
    6,
    2024
  ],
  [
    "Unstoppable",
    "Drama",
    7,
    2024
  ],
  [
    "The Order",
    "Crime",
    6.9,
    2024
  ],
  [
    "Transformers One",
    "Animation",
    7.7,
    2024
  ],
  [
    "Paddington in Peru",
    "Comedy",
    7,
    2024
  ],
  [
    "Wallace & Gromit: Vengeance Most Fowl",
    "Animation",
    7.6,
    2024
  ],
  [
    "Den of Thieves 2: Pantera",
    "Action",
    6.5,
    2025
  ],
  [
    "Flight Risk",
    "Thriller",
    5.8,
    2025
  ],
  [
    "Dog Man",
    "Animation",
    6.8,
    2025
  ],
  [
    "One of Them Days",
    "Comedy",
    6.4,
    2025
  ],
  [
    "Karate Kid: Legends",
    "Action",
    6.9,
    2025
  ],
  [
    "Now You See Me 3",
    "Crime",
    7,
    2025
  ],
  [
    "Saw XI",
    "Horror",
    6.5,
    2025
  ],
  [
    "Five Nights at Freddy's 2",
    "Horror",
    6.2,
    2025
  ],
  [
    "M3GAN 2.0",
    "Horror",
    6.4,
    2025
  ],
  [
    "I Know What You Did Last Summer (2025)",
    "Horror",
    6,
    2025
  ],
  [
    "The Bride!",
    "Horror",
    7.1,
    2025
  ],
  [
    "High and Low (2025)",
    "Crime",
    7.3,
    2025
  ],
  [
    "Deliver Me from Nowhere",
    "Drama",
    7.5,
    2025
  ],
  [
    "Spider-Man: Beyond the Spider-Verse",
    "Animation",
    8.7,
    2026
  ],
  [
    "Avengers: Doomsday",
    "Action",
    8.4,
    2026
  ],
  [
    "The Batman: Part II",
    "Crime",
    8.2,
    2026
  ],
  [
    "Dune: Messiah",
    "Sci-Fi",
    8.5,
    2026
  ],
  [
    "Shrek 5",
    "Animation",
    7.5,
    2026
  ],
  [
    "Toy Story 5",
    "Animation",
    7.4,
    2026
  ],
  [
    "The Mandalorian & Grogu",
    "Sci-Fi",
    7.8,
    2026
  ],
  [
    "Supergirl: Woman of Tomorrow",
    "Action",
    7.5,
    2026
  ],
  [
    "Fast XI",
    "Action",
    6.5,
    2026
  ],
  [
    "Scream 7",
    "Horror",
    6.6,
    2026
  ],
  [
    "The Hunger Games: Sunrise on the Reaping",
    "Action",
    7.5,
    2026
  ],
  [
    "Moana (Live Action)",
    "Fantasy",
    7.2,
    2026
  ],
  [
    "Ice Age 6",
    "Animation",
    6.8,
    2026
  ],
  [
    "Michael",
    "Drama",
    7.6,
    2025
  ],
  [
    "A Haunting in Venice",
    "Crime",
    6.5,
    2023
  ],
  [
    "Bottoms",
    "Comedy",
    6.7,
    2023
  ],
  [
    "No Hard Feelings",
    "Comedy",
    6.4,
    2023
  ],
  [
    "Talk to Me (2023)",
    "Horror",
    7.1,
    2023
  ],
  [
    "Priscilla",
    "Drama",
    6.6,
    2023
  ],
  [
    "Godzilla Minus One/Minus Color",
    "Action",
    8.4,
    2024
  ],
  [
    "The Beekeeper",
    "Action",
    6.4,
    2024
  ],
  [
    "Madame Web",
    "Action",
    4,
    2024
  ],
  [
    "Argylle",
    "Action",
    5.7,
    2024
  ],
  [
    "Land of Bad",
    "Action",
    6.5,
    2024
  ],
  [
    "The First Omen",
    "Horror",
    6.5,
    2024
  ],
  [
    "Tarot",
    "Horror",
    4.9,
    2024
  ],
  [
    "The Strangers: Chapter 1",
    "Horror",
    4.7,
    2024
  ],
  [
    "Atlas",
    "Sci-Fi",
    5.6,
    2024
  ],
  [
    "Beverly Hills Cop: Axel F",
    "Comedy",
    6.5,
    2024
  ],
  [
    "Borderlands",
    "Sci-Fi",
    4.6,
    2024
  ],
  [
    "The Crow (2024)",
    "Action",
    4.7,
    2024
  ],
  [
    "Never Let Go",
    "Horror",
    5.6,
    2024
  ],
  [
    "Hellboy: The Crooked Man",
    "Horror",
    5,
    2024
  ],
  [
    "Kraven the Hunter",
    "Action",
    5.8,
    2024
  ],
  [
    "La Chimera",
    "Fantasy",
    7.3,
    2023
  ],
  [
    "Monster (2023)",
    "Drama",
    7.9,
    2023
  ],
  [
    "The Taste of Things",
    "Romance",
    7.4,
    2023
  ],
  [
    "Fallen Leaves",
    "Comedy",
    7.3,
    2023
  ],
  [
    "Perfect Days",
    "Drama",
    7.9,
    2023
  ],
  [
    "Io Capitano",
    "Drama",
    7.6,
    2023
  ],
  [
    "Evil Does Not Exist",
    "Drama",
    7,
    2023
  ],
  [
    "About Dry Grasses",
    "Drama",
    7.8,
    2023
  ],
  [
    "Green Border",
    "Drama",
    7.4,
    2023
  ],
  [
    "Look Back",
    "Animation",
    8.2,
    2024
  ],
  [
    "Oddity",
    "Horror",
    6.7,
    2024
  ],
  [
    "Strange Darling",
    "Thriller",
    7.2,
    2024
  ],
  [
    "Daddio",
    "Drama",
    6.7,
    2024
  ],
  [
    "Janet Planet",
    "Drama",
    6.4,
    2024
  ],
  [
    "Ghostlight",
    "Drama",
    7.6,
    2024
  ],
  [
    "Thelma",
    "Comedy",
    7.1,
    2024
  ],
  [
    "Babes",
    "Comedy",
    6.2,
    2024
  ],
  [
    "My Old Ass",
    "Comedy",
    7,
    2024
  ],
  [
    "Between the Temples",
    "Comedy",
    6.3,
    2024
  ],
  [
    "Merry Christmas",
    "Thriller",
    7,
    2024
  ],
  [
    "Shaitaan",
    "Horror",
    6.6,
    2024
  ],
  [
    "Yodha",
    "Action",
    5.8,
    2024
  ],
  [
    "Maidaan",
    "Drama",
    7.9,
    2024
  ],
  [
    "Bade Miyan Chote Miyan (2024)",
    "Action",
    4.3,
    2024
  ],
  [
    "Srikanth",
    "Drama",
    7.4,
    2024
  ],
  [
    "Chandu Champion",
    "Drama",
    7.7,
    2024
  ],
  [
    "Sarfira",
    "Drama",
    6.7,
    2024
  ],
  [
    "Bad Newz",
    "Comedy",
    5.4,
    2024
  ],
  [
    "Ulajh",
    "Thriller",
    6.1,
    2024
  ],
  [
    "Phir Aayi Hasseen Dillruba",
    "Thriller",
    5.6,
    2024
  ],
  [
    "Khel Khel Mein",
    "Comedy",
    6.6,
    2024
  ],
  [
    "Vedaa",
    "Action",
    6,
    2024
  ],
  [
    "Sector 36",
    "Crime",
    7.2,
    2024
  ],
  [
    "Jigra",
    "Action",
    6,
    2024
  ],
  [
    "CTRL",
    "Thriller",
    6.2,
    2024
  ],
  [
    "Do Patti",
    "Thriller",
    5.4,
    2024
  ],
  [
    "I Want to Talk",
    "Drama",
    7.4,
    2024
  ],
  [
    "Baby John",
    "Action",
    6.2,
    2024
  ],
  [
    "Sky Force",
    "Action",
    6.8,
    2025
  ],
  [
    "Emergency",
    "Drama",
    6.5,
    2025
  ],
  [
    "Deva",
    "Action",
    6.9,
    2025
  ],
  [
    "Love & War",
    "Romance",
    7.8,
    2026
  ],
  [
    "Ramayana: Part 1",
    "Fantasy",
    8.5,
    2026
  ],
  [
    "War 2",
    "Action",
    7.2,
    2025
  ],
  [
    "Pathaan 2",
    "Action",
    6.8,
    2026
  ],
  [
    "Tiger vs Pathaan",
    "Action",
    7.2,
    2026
  ],
  [
    "Alpha",
    "Action",
    7,
    2025
  ],
  [
    "Brahmastra: Part Two - Dev",
    "Fantasy",
    7.4,
    2026
  ],
  [
    "Spirit",
    "Action",
    7.5,
    2025
  ],
  [
    "Toxic",
    "Action",
    7.7,
    2025
  ],
  [
    "Kanguva",
    "Action",
    5.3,
    2024
  ],
  [
    "The Greatest of All Time (GOAT)",
    "Action",
    6.1,
    2024
  ],
  [
    "Vettaiyan",
    "Action",
    6.4,
    2024
  ],
  [
    "Raayan",
    "Action",
    7.5,
    2024
  ],
  [
    "Thangalaan",
    "Action",
    7.1,
    2024
  ],
  [
    "Indian 2",
    "Action",
    4.2,
    2024
  ],
  [
    "Meiyazhagan",
    "Drama",
    8.3,
    2024
  ],
  [
    "Lubber Pandhu",
    "Drama",
    8.2,
    2024
  ],
  [
    "Vaazhai",
    "Drama",
    8.1,
    2024
  ],
  [
    "Bramayugam",
    "Horror",
    7.8,
    2024
  ],
  [
    "Aadujeevitham - The Goat Life",
    "Drama",
    8.1,
    2024
  ],
  [
    "Kishkindha Kaandam",
    "Thriller",
    8.2,
    2024
  ],
  [
    "ARM (Ajayante Randam Moshanam)",
    "Action",
    7.6,
    2024
  ],
  [
    "Turbo",
    "Action",
    6.3,
    2024
  ],
  [
    "Varshangalkku Shesham",
    "Comedy",
    7.2,
    2024
  ],
  [
    "Guruvayoor Ambalanadayil",
    "Comedy",
    7,
    2024
  ],
  [
    "Level Cross",
    "Thriller",
    7.1,
    2024
  ],
  [
    "Bougainvillea",
    "Thriller",
    6.5,
    2024
  ],
  [
    "Saripodhaa Sanivaaram",
    "Action",
    7,
    2024
  ],
  [
    "Tillu Square",
    "Comedy",
    7.1,
    2024
  ],
  [
    "Guntur Kaaram",
    "Action",
    5.4,
    2024
  ],
  [
    "Captain Miller",
    "Action",
    6.6,
    2024
  ],
  [
    "Ayalaan",
    "Sci-Fi",
    6.1,
    2024
  ]
];

    const newerShows2024_2026 = [
  [
    "Bad Monkey",
    "Comedy",
    7.4,
    2024,
    1
  ],
  [
    "Sunny",
    "Sci-Fi",
    6.7,
    2024,
    1
  ],
  [
    "Manhunt",
    "Drama",
    7.2,
    2024,
    1
  ],
  [
    "Franklin",
    "Drama",
    6.2,
    2024,
    1
  ],
  [
    "Sugar (2024)",
    "Crime",
    7.5,
    2024,
    1
  ],
  [
    "The New Look",
    "Drama",
    7.4,
    2024,
    1
  ],
  [
    "Lady in the Lake",
    "Thriller",
    6.4,
    2024,
    1
  ],
  [
    "Where's Wanda?",
    "Comedy",
    7.2,
    2024,
    1
  ],
  [
    "La Maison",
    "Drama",
    7.1,
    2024,
    1
  ],
  [
    "Before",
    "Thriller",
    5.5,
    2024,
    1
  ],
  [
    "Me (Series)",
    "Sci-Fi",
    6.8,
    2024,
    1
  ],
  [
    "Camp Snoopy",
    "Animation",
    7.6,
    2024,
    1
  ],
  [
    "WondLa",
    "Animation",
    7.5,
    2024,
    1
  ],
  [
    "Midnight Family",
    "Drama",
    7.8,
    2024,
    1
  ],
  [
    "Liaison",
    "Thriller",
    6.4,
    2023,
    1
  ],
  [
    "Dear Edward",
    "Drama",
    7.2,
    2023,
    1
  ],
  [
    "Extrapolations",
    "Sci-Fi",
    6.2,
    2023,
    1
  ],
  [
    "The Last Thing He Told Me",
    "Mystery",
    6.5,
    2023,
    1
  ],
  [
    "City on Fire",
    "Crime",
    6.4,
    2023,
    1
  ],
  [
    "The Crowded Room",
    "Drama",
    7.7,
    2023,
    1
  ],
  [
    "The Changeling",
    "Horror",
    5.9,
    2023,
    1
  ],
  [
    "Criminal Record",
    "Crime",
    7.1,
    2024,
    1
  ],
  [
    "The Big Door Prize",
    "Comedy",
    6.4,
    2023,
    2
  ],
  [
    "Physical",
    "Comedy",
    7.4,
    2021,
    3
  ],
  [
    "Trying",
    "Comedy",
    8,
    2020,
    4
  ],
  [
    "A Good Girl's Guide to Murder",
    "Thriller",
    6.8,
    2024,
    1
  ],
  [
    "Supacell",
    "Sci-Fi",
    7.1,
    2024,
    1
  ],
  [
    "Eric",
    "Crime",
    6.9,
    2024,
    1
  ],
  [
    "Dead Boy Detectives",
    "Fantasy",
    7.5,
    2024,
    1
  ],
  [
    "The Decameron",
    "Comedy",
    6.3,
    2024,
    1
  ],
  [
    "Kaos",
    "Comedy",
    7.5,
    2024,
    1
  ],
  [
    "A Man in Full",
    "Drama",
    6.6,
    2024,
    1
  ],
  [
    "Senna",
    "Drama",
    8.1,
    2024,
    1
  ],
  [
    "Interior Chinatown",
    "Comedy",
    7.4,
    2024,
    1
  ],
  [
    "Tomb Raider: The Legend of Lara Croft",
    "Animation",
    5.3,
    2024,
    1
  ],
  [
    "Twilight of the Gods",
    "Animation",
    7.2,
    2024,
    1
  ],
  [
    "Scott Pilgrim Takes Off",
    "Animation",
    7.6,
    2023,
    1
  ],
  [
    "Castlevania: Nocturne",
    "Animation",
    7.4,
    2023,
    1
  ],
  [
    "Delicious in Dungeon",
    "Animation",
    7.8,
    2024,
    1
  ],
  [
    "Ranma 1/2 (2024)",
    "Animation",
    7.6,
    2024,
    1
  ],
  [
    "Dragon Ball Daima",
    "Animation",
    7.5,
    2024,
    1
  ],
  [
    "Dandadan",
    "Animation",
    8.3,
    2024,
    1
  ],
  [
    "Terminator Zero",
    "Animation",
    7,
    2024,
    1
  ],
  [
    "Gyeongseong Creature",
    "Horror",
    7.3,
    2023,
    2
  ],
  [
    "The Glory",
    "Drama",
    8.1,
    2022,
    1
  ],
  [
    "Queen of Tears",
    "Romance",
    8.2,
    2024,
    1
  ],
  [
    "A Killer Paradox",
    "Crime",
    7.2,
    2024,
    1
  ],
  [
    "The Bequeathed",
    "Mystery",
    6.5,
    2024,
    1
  ],
  [
    "Doctor Slump",
    "Comedy",
    7.4,
    2024,
    1
  ],
  [
    "Parasyte: The Grey",
    "Sci-Fi",
    7.1,
    2024,
    1
  ],
  [
    "Hierarchy",
    "Drama",
    6.1,
    2024,
    1
  ],
  [
    "The Whirlwind",
    "Drama",
    7.4,
    2024,
    1
  ],
  [
    "The Frog",
    "Thriller",
    6.9,
    2024,
    1
  ],
  [
    "Mr. Plankton",
    "Comedy",
    7.9,
    2024,
    1
  ],
  [
    "The Trunk",
    "Mystery",
    6.8,
    2024,
    1
  ],
  [
    "Bloodhounds",
    "Action",
    8.1,
    2023,
    1
  ],
  [
    "Mask Girl",
    "Thriller",
    7.3,
    2023,
    1
  ],
  [
    "My Demon",
    "Fantasy",
    7.7,
    2023,
    1
  ],
  [
    "Marry My Husband",
    "Fantasy",
    7.9,
    2024,
    1
  ],
  [
    "Death's Game",
    "Fantasy",
    8.5,
    2023,
    1
  ],
  [
    "Moving",
    "Action",
    8.5,
    2023,
    1
  ],
  [
    "A Shop for Killers",
    "Action",
    8.1,
    2024,
    1
  ],
  [
    "The Judge from Hell",
    "Fantasy",
    7.9,
    2024,
    1
  ],
  [
    "Family by Choice",
    "Drama",
    8.3,
    2024,
    1
  ],
  [
    "Jeongnyeon: The Star Is Born",
    "Drama",
    8.2,
    2024,
    1
  ],
  [
    "The Franchise",
    "Comedy",
    7.1,
    2024,
    1
  ],
  [
    "The Day of the Jackal",
    "Thriller",
    8.2,
    2024,
    1
  ],
  [
    "Say Nothing",
    "Drama",
    8.3,
    2024,
    1
  ],
  [
    "The Regime",
    "Drama",
    6.1,
    2024,
    1
  ],
  [
    "Under the Bridge",
    "Crime",
    7.3,
    2024,
    1
  ],
  [
    "Apples Never Fall",
    "Drama",
    6.8,
    2024,
    1
  ],
  [
    "Expats",
    "Drama",
    6.1,
    2024,
    1
  ],
  [
    "Boy Swallows Universe",
    "Drama",
    8,
    2024,
    1
  ],
  [
    "Star Wars: The Acolyte",
    "Sci-Fi",
    4.2,
    2024,
    1
  ],
  [
    "Star Wars: Tales of the Empire",
    "Animation",
    7.2,
    2024,
    1
  ],
  [
    "Ted (TV Series)",
    "Comedy",
    7.9,
    2024,
    1
  ],
  [
    "Hysteria!",
    "Horror",
    6.8,
    2024,
    1
  ],
  [
    "Teacup",
    "Horror",
    6.5,
    2024,
    1
  ],
  [
    "Fight Night: The Million Dollar Heist",
    "Crime",
    7.2,
    2024,
    1
  ],
  [
    "Those About to Die",
    "Action",
    6.8,
    2024,
    1
  ],
  [
    "Twisted Metal",
    "Action",
    7.4,
    2023,
    1
  ],
  [
    "Poker Face",
    "Mystery",
    7.9,
    2023,
    1
  ],
  [
    "The Continental: From the World of John Wick",
    "Action",
    7.2,
    2023,
    1
  ],
  [
    "Tulsa King",
    "Crime",
    8,
    2022,
    2
  ],
  [
    "Lioness",
    "Action",
    7.7,
    2023,
    2
  ],
  [
    "Lawmen: Bass Reeves",
    "Western",
    7.6,
    2023,
    1
  ],
  [
    "Knuckles",
    "Action",
    6.2,
    2024,
    1
  ],
  [
    "Star Trek: Strange New Worlds",
    "Sci-Fi",
    8.3,
    2022,
    2
  ],
  [
    "Star Trek: Lower Decks",
    "Animation",
    7.7,
    2020,
    5
  ],
  [
    "Evil",
    "Horror",
    7.8,
    2019,
    4
  ],
  [
    "Mr. & Mrs. Smith (2024)",
    "Action",
    7,
    2024,
    1
  ],
  [
    "Secret Level",
    "Animation",
    7.2,
    2024,
    1
  ],
  [
    "Like a Dragon: Yakuza",
    "Action",
    6.1,
    2024,
    1
  ],
  [
    "Daisy Jones & The Six",
    "Drama",
    8.1,
    2023,
    1
  ],
  [
    "Swarm",
    "Thriller",
    7.2,
    2023,
    1
  ],
  [
    "Gen V",
    "Action",
    7.8,
    2023,
    1
  ],
  [
    "My Lady Jane",
    "Comedy",
    7.4,
    2024,
    1
  ],
  [
    "English Teacher",
    "Comedy",
    8.1,
    2024,
    1
  ],
  [
    "Feud: Capote vs. The Swans",
    "Drama",
    7.4,
    2024,
    2
  ],
  [
    "We Were the Lucky Ones",
    "Drama",
    7.8,
    2024,
    1
  ],
  [
    "A Murder at the End of the World",
    "Mystery",
    7.1,
    2023,
    1
  ],
  [
    "Percy Jackson and the Olympians",
    "Fantasy",
    7.1,
    2023,
    1
  ],
  [
    "Goosebumps (2023)",
    "Horror",
    6.7,
    2023,
    1
  ],
  [
    "Renegade Nell",
    "Fantasy",
    7.1,
    2024,
    1
  ],
  [
    "Doctor Who (2024)",
    "Sci-Fi",
    6.4,
    2024,
    1
  ],
  [
    "Bleach: Thousand-Year Blood War",
    "Animation",
    9,
    2024,
    3
  ],
  [
    "Hell's Paradise",
    "Animation",
    8.1,
    2023,
    1
  ],
  [
    "Oshi no Ko",
    "Animation",
    8.3,
    2023,
    2
  ],
  [
    "Mashle: Magic and Muscles",
    "Animation",
    7.5,
    2023,
    2
  ],
  [
    "The Apothecary Diaries",
    "Animation",
    8.6,
    2023,
    1
  ],
  [
    "Shangri-La Frontier",
    "Animation",
    7.9,
    2023,
    2
  ],
  [
    "Undead Unluck",
    "Animation",
    7.3,
    2023,
    1
  ],
  [
    "Ninja Kamui",
    "Animation",
    7.6,
    2024,
    1
  ],
  [
    "Trigun Stampede",
    "Animation",
    7.4,
    2023,
    1
  ],
  [
    "Zom 100: Bucket List of the Dead",
    "Animation",
    7.7,
    2023,
    1
  ],
  [
    "Heavenly Delusion",
    "Animation",
    8,
    2023,
    1
  ],
  [
    "Maamla Legal Hai",
    "Comedy",
    8,
    2024,
    1
  ],
  [
    "Poacher",
    "Crime",
    7.8,
    2024,
    1
  ],
  [
    "Killer Soup",
    "Comedy",
    6.4,
    2024,
    1
  ],
  [
    "Indian Police Force",
    "Action",
    5.2,
    2024,
    1
  ],
  [
    "Karmma Calling",
    "Drama",
    5.7,
    2024,
    1
  ],
  [
    "Showtime",
    "Drama",
    6,
    2024,
    1
  ],
  [
    "Dil Dosti Dilemma",
    "Comedy",
    7,
    2024,
    1
  ],
  [
    "Big Girls Don't Cry",
    "Drama",
    6.5,
    2024,
    1
  ],
  [
    "Lootere",
    "Action",
    7.4,
    2024,
    1
  ],
  [
    "Baahubali: Crown of Blood",
    "Animation",
    7.3,
    2024,
    1
  ],
  [
    "Shekhar Home",
    "Crime",
    7.1,
    2024,
    1
  ],
  [
    "IC 814: The Kandahar Hijack",
    "Thriller",
    7.4,
    2024,
    1
  ],
  [
    "Call Me Bae",
    "Comedy",
    5.8,
    2024,
    1
  ],
  [
    "Raat Jawaani Hai",
    "Comedy",
    8.3,
    2024,
    1
  ],
  [
    "Citadel: Honey Bunny",
    "Action",
    6.5,
    2024,
    1
  ],
  [
    "Bandwaale",
    "Comedy",
    7.5,
    2024,
    1
  ],
  [
    "The Great Indian Kapil Show",
    "Comedy",
    7,
    2024,
    2
  ],
  [
    "Tribhuvan Mishra CA Topper",
    "Comedy",
    7.3,
    2024,
    1
  ],
  [
    "Barzakh",
    "Drama",
    7.4,
    2024,
    1
  ],
  [
    "Thalaimai Seyalagam",
    "Thriller",
    7.2,
    2024,
    1
  ],
  [
    "Inspector Rishi",
    "Horror",
    7.1,
    2024,
    1
  ],
  [
    "Parachute",
    "Drama",
    7.5,
    2024,
    1
  ],
  [
    "Manorathangal",
    "Drama",
    7.5,
    2024,
    1
  ],
  [
    "Nagendran's Honeymoons",
    "Comedy",
    6.8,
    2024,
    1
  ],
  [
    "School of Lies",
    "Mystery",
    7.1,
    2023,
    1
  ],
  [
    "Tooth Pari: When Love Bites",
    "Romance",
    7,
    2023,
    1
  ],
  [
    "Trial by Fire",
    "Drama",
    7.8,
    2023,
    1
  ],
  [
    "Kaala Paani",
    "Thriller",
    8,
    2023,
    1
  ],
  [
    "The Jengaburu Curse",
    "Thriller",
    7.1,
    2023,
    1
  ],
  [
    "Aakhri Sach",
    "Crime",
    7.1,
    2023,
    1
  ],
  [
    "Choona",
    "Comedy",
    7.1,
    2023,
    1
  ],
  [
    "Kaalkoot",
    "Crime",
    7.8,
    2023,
    1
  ],
  [
    "Dhootha",
    "Thriller",
    7.4,
    2023,
    1
  ],
  [
    "Curry & Cyanide",
    "Documentary",
    7.1,
    2023,
    1
  ]
];

    const baseMovies = dedupeList([...rawMoviesCore, ...rawMoviesExpanded, ...rawMoviesMore, ...extraMovieSeeds, ...expandedMovieVault, ...expandedVaultBatch2Movies, ...newerMovies2024_2026]);
    const baseShows = dedupeList([...rawShowsCore, ...rawShowsExpanded, ...rawShowsMore, ...extraShowSeeds, ...expandedShowVault, ...expandedVaultBatch2Shows, ...newerShows2024_2026]);
    const newMovies = dedupeAgainst(baseMovies, [...parseCompact(compactMoviesT1, 1), ...parseCompact(compactMoviesT3, 1), ...parseCompact(compactMoviesT2, 0)]);
    const newShows = dedupeAgainst(baseShows, [...parseCompact(compactShowsT1, 1), ...parseCompact(compactShowsT3, 1), ...parseCompact(compactShowsT2, 0)]);

    // Merge datasets (original order first, then new titles by popularity tier)
    const combinedMovies = [...baseMovies, ...newMovies];
    const combinedShows = [...baseShows, ...newShows];

    // ==========================================
    // 2. GENRE VISUAL THEMES & PROCEDURAL POSTERS
    // ==========================================
    const genreThemes = {
      "Drama":       { c1: "#1e1b4b", c2: "#4338ca", accent: "#818cf8", icon: "fa-masks-theater" },
      "Crime":       { c1: "#270909", c2: "#7f1d1d", accent: "#f87171", icon: "fa-fingerprint" },
      "Action":      { c1: "#3b1106", c2: "#c2410c", accent: "#fb923c", icon: "fa-fire-flame-curved" },
      "Sci-Fi":      { c1: "#042f2e", c2: "#0f766e", accent: "#2dd4bf", icon: "fa-atom" },
      "Fantasy":     { c1: "#2e1065", c2: "#6d28d9", accent: "#c084fc", icon: "fa-dragon" },
      "Thriller":    { c1: "#090d16", c2: "#1e293b", accent: "#38bdf8", icon: "fa-eye" },
      "Comedy":      { c1: "#422006", c2: "#b45309", accent: "#facc15", icon: "fa-face-laugh-beam" },
      "Animation":   { c1: "#14532d", c2: "#15803d", accent: "#4ade80", icon: "fa-wand-sparkles" },
      "Romance":     { c1: "#4c0519", c2: "#be123c", accent: "#fb7185", icon: "fa-heart" },
      "Western":     { c1: "#3f2305", c2: "#92400e", accent: "#fbbf24", icon: "fa-hat-cowboy" },
      "Horror":      { c1: "#18040c", c2: "#881337", accent: "#f43f5e", icon: "fa-skull" },
      "War":         { c1: "#1c2418", c2: "#3f6212", accent: "#a3e635", icon: "fa-shield-halved" },
      "Documentary": { c1: "#082f49", c2: "#0369a1", accent: "#38bdf8", icon: "fa-earth-americas" }
    };

    const platformColors = {
      "Netflix": "bg-red-600/20 text-red-400 border-red-500/30",
      "Max": "bg-blue-600/20 text-blue-400 border-blue-500/30",
      "Prime Video": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      "Disney+": "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      "Hulu": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
    };

    const platforms = ["Netflix", "Prime Video", "Disney+ Hotstar", "JioCinema", "SonyLIV", "ZEE5"];
    const globalDatabase = {};
    const allTitles = [];
    const movies = [];
    const tvShows = [];
    const categoryData = {};
    const summaryCache = {};

    // Persistent poster cache in localStorage
    const posterCache = (() => {
      try {
        return JSON.parse(localStorage.getItem('cs_posters_v2') || '{}');
      } catch (e) {
        return {};
      }
    })();

    function hashString(str) {
      let h = 2166136261 >>> 0;
      for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return h >>> 0;
    }

    function inferPlatform(name, type, hash) {
      const l = name.toLowerCase();
      if (/avengers|iron man|captain america|thor|guardians of the galaxy|black panther|doctor strange|ant-man|black widow|shang-chi|eternals|marvels|thunderbolts|fantastic four|wandavision|loki|hawkeye|moon knight|ms\. marvel|she-hulk|secret invasion|agatha all along|daredevil|punisher|star wars|mandalorian|andor|ahsoka|obi-wan|boba fett|acolyte|skeleton crew|clone wars|rebels|bad batch|toy story|finding nemo|finding dory|incredibles|ratatouille|wall-e|inside out|coco|soul|zootopia|moana|frozen|lion king|aladdin|beauty and the beast|simpsons|bluey|shogun|shōgun|the bear|only murders in the building|modern family|how i met your mother|malcolm in the middle|criminal minds|greys anatomy|white collar/.test(l)) return "Disney+ Hotstar";
      if (/sopranos|the wire|game of thrones|house of the dragon|knight of the seven kingdoms|succession|chernobyl|band of brothers|the pacific|last of us|white lotus|euphoria|true detective|barry|silicon valley|veep|curb your enthusiasm|deadwood|rome|boardwalk empire|six feet under|leftovers|watchmen|peacemaker|the penguin|creature commandos|the pitt|batman|dark knight|man of steel|justice league|wonder woman|aquaman|shazam|suicide squad|joker|harry potter|fantastic beasts|dune|lord of the rings: the|the hobbit|oppenheimer|rick and morty/.test(l)) return "JioCinema";
      if (/stranger things|squid game|wednesday|black mirror|the crown|dark|money heist|la casa de papel|narcos|ozark|mindhunter|bridgerton|queen's gambit|arcane|blue eye samurai|bojack horseman|castlevania|cyberpunk|love, death|sex education|heartstopper|witcher|lupin|3 body problem|beef|baby reindeer|adolescence|glass onion|roma|irishman|marriage story|all quiet on the western front|sacred games|delhi crime|kohrra|heeramandi|railway men|black warrant/.test(l)) return "Netflix";
      if (/the boys|gen v|invincible|fallout|reacher|rings of power|fleabag|marvelous mrs\. maisel|jack ryan|bosch|wheel of time|mr\. & mrs\. smith|the expanse|good omens|legend of vox machina|family man|mirzapur|panchayat|paatal lok|farzi|made in heaven|jubilee/.test(l)) return "Prime Video";
      if (/scam 1992|scam 2003|gullak|rocket boys|tabbar|maharani|jl50|avrodh|undekhi/.test(l)) return "SonyLIV";
      return platforms[hash % platforms.length];
    }

    const KNOWN_INDIAN_TITLES_SET = new Set([
      "pather panchali",
      "aparajito",
      "apur sansar",
      "charulata",
      "mahanagar",
      "nayak: the hero",
      "goopy gyne bagha byne",
      "hirak rajar deshe",
      "jalsaghar",
      "agantuk",
      "sonar kella",
      "joy baba felunath",
      "meghe dhaka tara",
      "komal gandhar",
      "subarnarekha",
      "bhuvan shome",
      "khandhar",
      "ghatashraddha",
      "samskara",
      "chomana dudi",
      "tabarana kathe",
      "elippathayam",
      "mukhamukham",
      "anantaram",
      "mathilukal",
      "vidheyan",
      "nizhalkkuthu",
      "oru vadakkan veeragatha",
      "kireedam",
      "chenkol",
      "spadikam",
      "manichitrathazhu",
      "devasuram",
      "godfather (malayalam)",
      "in harihar nagar",
      "ramji rao speaking",
      "nadodikkattu",
      "pattanapravesham",
      "sandhesam",
      "thoovanathumbikal",
      "namukku parkkan munthirithoppukal",
      "yavanika",
      "moonnam pakkam",
      "perumthachan",
      "amaram",
      "bharatham",
      "sadayam",
      "pranchiyettan & the saint",
      "traffic",
      "chithram",
      "kilukkam",
      "meleparambil anveedu",
      "punjabi house",
      "c.i.d. moosa",
      "kalyanaraman",
      "meesa madhavan",
      "chotta mumbai",
      "rajamanikyam",
      "big b",
      "anwar",
      "amen",
      "north 24 kaatham",
      "guppy",
      "take off",
      "joseph",
      "kuruthi",
      "malik",
      "bheeshma parvam",
      "mukundan unni associates",
      "thallumaala",
      "purusha pretham",
      "abraham ozler",
      "turbo",
      "varshangalkku shesham",
      "arm: ajayante randam mokshanam",
      "veedu",
      "sandhya raagam",
      "marupadiyum",
      "moondram pirai",
      "16 vayathinile",
      "sigappu rojakkal",
      "johnny (1980)",
      "nenjathai killathe",
      "mouna ragam",
      "agni natchathiram",
      "anjali",
      "michael madana kama rajan",
      "gunaa",
      "thevar magan",
      "mahanadhi",
      "nammavar",
      "sathi leelavathi",
      "avvai shanmugi",
      "indian (1996)",
      "kadhalan",
      "jeans",
      "mudhalvan",
      "kandukondain kandukondain",
      "minnale",
      "aalavandhan",
      "kannathil muthamittal",
      "panchatanthiram",
      "dhool",
      "ghilli",
      "virumaandi",
      "autograph",
      "ayutha ezhuthu",
      "anniyan",
      "chandramukhi",
      "pudhupettai",
      "vettaiyaadu vilaiyaadu",
      "paruthiveeran",
      "polladhavan",
      "subramaniapuram",
      "vaaranam aayiram",
      "dasavathaaram",
      "ayan",
      "vinnaithaandi varuvaayaa",
      "enthiran",
      "aadukalam",
      "mankatha",
      "pizza",
      "thuppakki",
      "naduvula konjam pakkatha kaanom",
      "kalyana samayal saadham",
      "kaththi",
      "kaaka muttai",
      "i (2015)",
      "irudhi suttru",
      "24 (2016)",
      "aruvi",
      "vikram vedha",
      "mersal",
      "pyaar prema kaadhal",
      "kolamaavu kokila",
      "peranbu",
      "petta",
      "viswasam",
      "master (2021)",
      "doctor",
      "maanaadu",
      "love today",
      "thiruchitrambalam",
      "leo",
      "por thozhil",
      "good night",
      "ayalaan",
      "captain miller",
      "garudan",
      "raayan",
      "vaazhai",
      "kottukkaali",
      "lubber pandhu",
      "amaran",
      "gundamma katha",
      "missamma",
      "pathala bhairavi",
      "devadasu (1953)",
      "mooga manasulu",
      "maro charitra",
      "siri siri muvva",
      "subhalekha",
      "khaidi",
      "anveshana",
      "chantabbai",
      "rudraveena",
      "aakhari poratam",
      "geethanjali (1989)",
      "siva",
      "jagadeka veerudu athiloka sundari",
      "kshana kshanam",
      "aditya 369",
      "money (1993)",
      "gaayam",
      "aha naa pellanta",
      "appula appa rao",
      "jambalakidi pamba",
      "sindhooram",
      "tholi prema",
      "kushi",
      "manasantha nuvve",
      "nuvvu nenu",
      "jayam",
      "okkadu",
      "simhadri",
      "varsham",
      "arya",
      "chatrapathi",
      "anukokunda oka roju",
      "bommarillu",
      "happy days",
      "gamyam",
      "arundhati",
      "kick (2009)",
      "prasthanam",
      "vedam",
      "leader",
      "dookudu",
      "ala modalaindi",
      "gabbar singh",
      "julayi",
      "seethamma vakitlo sirimalle chettu",
      "attarintiki daredi",
      "1: nenokkadine",
      "race gurram",
      "manam",
      "srimanthudu",
      "bhale bhale magadivoy",
      "kshanam",
      "oopiri",
      "fidaa",
      "goodachari",
      "awe!",
      "brochevarevarura",
      "ala vaikunthapurramuloo",
      "sarileru neekevvaru",
      "jathi ratnalu",
      "love story (2021)",
      "dj tillu",
      "tillu square",
      "bimbisara",
      "karthikeya 2",
      "dasara",
      "virupaksha",
      "miss shetty mr polishetty",
      "mad (2023)",
      "mangalavaaram",
      "guntur kaaram",
      "gaami",
      "saripodhaa sanivaaram",
      "committee kurrollu",
      "manjummel boys",
      "aavesham",
      "premalu",
      "kumbalangi nights",
      "premam",
      "bangalore days",
      "drishyam (malayalam)",
      "drishyam 2 (malayalam)",
      "lucifer (malayalam)",
      "ustad hotel",
      "minnal murali",
      "angamaly diaries",
      "ee.ma.yau.",
      "virus",
      "ayyappanum koshiyum",
      "nayattu",
      "iratta",
      "kaathal - the core",
      "kannur squad",
      "nanpakal nerathu mayakkam",
      "rorschach",
      "nna thaan case kodu",
      "hridayam",
      "chithha",
      "super deluxe",
      "vikram",
      "kaithi",
      "vikram vedha (tamil)",
      "pariyerum perumal",
      "karnan",
      "asuran",
      "soorarai pottru",
      "mahaaraaja",
      "jailer",
      "ponniyin selvan: part i",
      "ponniyin selvan: part ii",
      "96",
      "ratsasan",
      "theeran adhigaaram ondru",
      "maanagaram",
      "thani oruvan",
      "anbe sivam",
      "nayakan",
      "thalapathi",
      "baashha",
      "hey ram",
      "kattradhu thamizh",
      "pithamagan",
      "gargi",
      "kadaisi vivasayi",
      "jigarthanda doublex",
      "viduthalai part 1",
      "lover",
      "hanu-man",
      "devara: part 1",
      "sita ramam",
      "major",
      "jersey",
      "mahanati",
      "rangasthalam",
      "arjun reddy",
      "eega",
      "magadheera",
      "athadu",
      "pokiri",
      "mayabazar",
      "sankarabharanam",
      "sagara sangamam",
      "swathi muthyam",
      "geetha govindam",
      "mathu vadalara",
      "balagam",
      "hi nanna",
      "keedaa cola",
      "sapta sagaradaache ello - side a",
      "sapta sagaradaache ello - side b",
      "kavaludaari",
      "bell bottom",
      "dia",
      "love mocktail",
      "blink",
      "shakhahaari",
      "stree 2",
      "stree",
      "bhediya",
      "munjya",
      "kill",
      "madgaon express",
      "laapataa ladies",
      "chandu champion",
      "sector 36",
      "merry christmas",
      "article 370",
      "shaitaan",
      "sam bahadur",
      "omg 2",
      "rocky aur rani kii prem kahaani",
      "bhakshak",
      "do patti",
      "amar singh chamkila",
      "joram",
      "bheed",
      "faraaz",
      "the sabarmati report",
      "bhool bhulaiyaa 3",
      "singham again",
      "all we imagine as light",
      "aspirants",
      "tathastu",
      "hostel daze",
      "college romance",
      "pitchers",
      "flames",
      "permanent roommates",
      "tripling",
      "yeh meri family",
      "cubicles",
      "immature",
      "breathe",
      "breathe: into the shadows",
      "aarya",
      "criminal justice",
      "undekhi",
      "tabbar",
      "suzhal - the vortex",
      "viladhikolam",
      "ayali",
      "inspector rishi",
      "poacher",
      "manvat murders",
      "ic 814: the kandahar hijack",
      "tribhuvan mishra ca topper",
      "killer soup",
      "3 idiots","dangal","like stars on earth","taare zameen par","my father and my son","rang de basanti",
      "hera pheri","andaz apna apna","munna bhai m.b.b.s.","lage raho munna bhai","sholay","drishyam","drishyam 2",
      "udaan","12th fail","rrr","kantara","kantara: chapter 1","baahubali 2: the conclusion","baahubali: the beginning",
      "k.g.f: chapter 2","kgf: chapter 1","kgf: chapter 2","jai bhim","andhadhun","gangs of wasseypur","lagaan",
      "swades","chak de! india","ghajini","pk","zindagi na milegi dobara","dil chahta hai","queen","chhichhore",
      "dilwale dulhania le jayenge","kabhi khushi kabhie gham...","kabhi khushi kabhie gham","kal ho naa ho",
      "jab we met","yeh jawaani hai deewani","pushpa: the rise","pushpa 2: the rule","kalki 2898 ad",
      "salaar: part 1 - ceasefire","jawan","pathaan","animal","dunki","tiger 3","gadar 2",
      "rocky aur rani kii prem kahaani","laapataa ladies","chhaava","dhurandhar","saiyaara","vikram","leo",
      "jailer","master","kaithi","vikram vedha","manjummel boys","premalu","aavesham","maharaja","amaran",
      "lucky baskhar","stree 2","stree","bhool bhulaiyaa 3","bhool bhulaiyaa","singham again","kill","crew",
      "munjya","article 370","fighter","sam bahadur","uri: the surgical strike","kabir singh","war","super 30",
      "gully boy","article 15","badhaai ho","raazi","sanju","padmaavat","tumbbad","mughal-e-azam","mother india",
      "pyaasa","anand","deewaar","kuch kuch hota hai","devdas","veer-zaara","om shanti om","dev.d",
      "my name is khan","dabangg","barfi!","kahaani","bhaag milkha bhaag","chennai express","dhoom 3","dhoom 2",
      "haider","highway","bajrangi bhaijaan","bajirao mastani","piku","masaan","dil dhadakne do","sultan",
      "m.s. dhoni: the untold story","pink","udta punjab","neerja","ae dil hai mushkil","secret superstar",
      "toilet: ek prem katha","newton","tiger zinda hai","october","tanhaji","gangubai kathiawadi","brahmastra",
      "the kashmir files","bhediya","sita ramam","hridayam","sardar udham","shershaah","soorarai pottru",
      "asuran","super deluxe","pariyerum perumal","96","ratsasan","bangalore days","premam","uyare",
      "kumbalangi nights","jallikattu","ee.ma.yau","angamaly diaries","thani oruvan","enthiran","2.0",
      "sivaji: the boss","anniyan","nayakan","thalapathi","ponniyin selvan: i","ponniyin selvan: ii","eega",
      "magadheera","arjun reddy","jersey","mahanati","rangasthalam","bharat ane nenu","dasara","hi nanna",
      "hanu-man","devara: part 1","game changer","coolie","retro","good bad ugly","tourist family",
      "lokah chapter 1: chandra","thudarum","l2: empuraan","sooryavanshi","golmaal: fun unlimited","dream girl",
      "bareilly ki barfi","hum dil de chuke sanam","rockstar","welcome","housefull","raat","bhoot","1920",
      "bulbbul","badla","talaash","special 26","baby","a wednesday","a wednesday!","don","agent vinod",
      "ek tha tiger","ludo","gandhi","slumdog millionaire","lion","scam 1992","panchayat","gullak","kota factory",
      "rocket boys","the family man","sacred games","mirzapur","delhi crime","paatal lok",
      "asur: welcome to your dark side","special ops","special ops 1.5","farzi","guns & gulaabs","kohra","kohrra",
      "aspirants","tvf pitchers","permanent roommates","made in heaven","heeramandi","jubilee","dahaad",
      "criminal justice","aarya","breathe","inside edge","bandish bandits","mismatched","little things",
      "four more shots please!","jamtara","undekhi","bhaukaal","mumbai diaries 26/11","ray","taj: divided by blood",
      "khakee: the bihar chapter","black warrant","gyaarah gyaarah","mastram","apharan","rangbaaz","illegal",
      "yeh meri family","hostel daze","flames","engineering girls","college romance","sandeep bhaiya",
      "the railway men","tanaav","rana naidu","scoop","trial by fire","lootere","maamla legal hai",
      "yeh kaali kaali ankhein","maharani","bambai meri jaan","ek thi begum","ordinary heroes","sunflower",
      "chacha vidhayak hain humare","kaun banega crorepati","indian idol","roadies","bigg boss","koffee with karan",
      "the kapil sharma show","kapil sharma show","taarak mehta ka ooltah chashmah","tarak mehta ka ooltah chashmah",
      "cid","mahabharat (1988)","ramayan (1987)","malgudi days","byomkesh bakshi","sarabhai vs sarabhai",
      "office office","khichdi","fir","khauf","kaala","singham","singham returns","simmba","dhoom","krrish",
      "krrish 3","golmaal returns","golmaal 3","golmaal again","pather panchali","aparajito","apur sansar",
      "charulata","guide","awaara","shree 420","kaagaz ke phool","padosan","chupke chupke","gol maal",
      "jaane bhi do yaaro","masoom","angoor","amar akbar anthony","don (1978)","zanjeer","trishul","ardh satya",
      "salaam bombay!","parinda","qayamat se qayamat tak","maine pyar kiya","hum aapke hain koun..!","baazigar",
      "darr","dil se..","satya","sarfarosh","vaastav: the reality","rangeela","jo jeeta wohi sikandar",
      "kabhi haan kabhi naa","border","company","black friday","maqbool","omkara","khosla ka ghosla!","bheja fry",
      "johnny gaddaar","wake up sid","rocket singh: salesman of the year","kaminey","guzaarish","paan singh tomar",
      "vicky donor","english vinglish","omg: oh my god!","talaash: the answer lies within","kai po che!",
      "the lunchbox","madras cafe","lootera","raanjhanaa","shahid","ugly","ankhon dekhi","talvar","tamasha",
      "aligarh","kapoor & sons","trapped","mukkabaaz","a death in the gunj","karwaan","laila majnu","sonchiriya",
      "section 375","chintu ka birthday","sir","777 charlie","garuda gamana vrishabha vahana","lucia",
      "ulidavaru kandanthe","vada chennai","visaranai","soodhu kavvum","jigarthanda","aaranya kaandam","iruvar",
      "roja","bombay","maheshinte prathikaaram","thondimuthalum driksakshiyum","joji","the great indian kitchen",
      "jana gana mana","bramayugam","aattam","kishkindha kaandam","meiyazhagan","c/o kancharapalem",
      "pelli choopulu","agent sai srinivasa athreya","sairat","natsamrat","court","killa"
    ]);

    function processDataset(raw, dest, type) {
      raw.forEach(([name, gen, rating, year, thumb], index) => {
        const isCollision = (type === 'show' && globalDatabase[name]);
        const title = isCollision ? `${name} (Series)` : name;
        if (globalDatabase[title]) return; // avoid exact duplicate collision

        const hash = hashString(title + year);
        const plat = inferPlatform(name, type, hash);
        const rank = dest.length + 1;
        const cleanLower = String(name || '').toLowerCase().trim();
        const isHi = KNOWN_INDIAN_TITLES_SET.has(cleanLower);
        const item = {
          id: `${type === 'show' ? 's' : 'm'}_${rank}_${hash.toString(36).slice(0, 5)}`,
          title,
          cleanName: isCollision ? `${name} (Series)` : name,
          rawName: name,
          genre: gen,
          rating: Number(rating).toFixed(1),
          year,
          rank,
          lang: isHi ? 'hi' : 'en',
          region: isHi ? 'IN' : 'GLOBAL',
          platform: plat,
          platformName: plat,
          type,
          thumb: true // all titles eligible for real artwork
        };
        globalDatabase[title] = item;
        allTitles.push(title);
        dest.push(item);
        (categoryData[gen] = categoryData[gen] || []).push(item);
      });
    }

    processDataset(combinedMovies, movies, 'movie');
    processDataset(combinedShows, tvShows, 'show');
    Object.values(categoryData).forEach(list => list.sort((a, b) => (a.thumb === b.thumb ? 0 : a.thumb ? -1 : 1) || b.rating - a.rating));

    // Expose primary datasets globally for cross-script access (marathon, universes, mood_dial, hub-duel)
    window.globalDatabase = globalDatabase;
    window.movies = movies;
    window.tvShows = tvShows;
    window.categoryData = categoryData;
    window.allTitles = allTitles;

    // Direct Cinejoy streaming URLs for all movies and shows in the vault (exact TMDb ID + slug)
    const CINEJOY_ALL_MOVIES_URLS = {
  "96": "https://cinejoy.pk/movie/441717-96-2018",
  "300": "https://cinejoy.pk/movie/1271-300-2006",
  "1408": "https://cinejoy.pk/movie/3021-1408-2007",
  "1917": "https://cinejoy.pk/movie/530915-1917-2019",
  "1920": "https://cinejoy.pk/movie/19951-1920-2008",
  "2012": "https://cinejoy.pk/movie/14161-2012-2009",
  "2046": "https://cinejoy.pk/movie/844-2046-2004",
  "The Shawshank Redemption": "https://cinejoy.pk/movie/278-the-shawshank-redemption-1994",
  "The Godfather": "https://cinejoy.pk/movie/238-the-godfather-1972",
  "Mayabazar": "https://cinejoy.pk/movie/158023-mayabazar-1957",
  "The Dark Knight": "https://cinejoy.pk/movie/155-the-dark-knight-2008",
  "12 Angry Men": "https://cinejoy.pk/movie/389-12-angry-men-1957",
  "Schindler's List": "https://cinejoy.pk/movie/424-schindlers-list-1993",
  "The Lord of the Rings: The Return of the King": "https://cinejoy.pk/movie/122-the-lord-of-the-rings-the-return-of-the-king-2003",
  "Pulp Fiction": "https://cinejoy.pk/movie/680-pulp-fiction-1994",
  "The Lord of the Rings: The Fellowship of the Ring": "https://cinejoy.pk/movie/120-the-lord-of-the-rings-the-fellowship-of-the-ring-2001",
  "Oppenheimer": "https://cinejoy.pk/movie/872585-oppenheimer-2023",
  "12th Fail": "https://cinejoy.pk/movie/1163258-12th-fail-2023",
  "Kireedam": "https://cinejoy.pk/movie/191017-kireedam-1989",
  "Sandhesam": "https://cinejoy.pk/movie/134477-sandhesam-1991",
  "The Good, the Bad and the Ugly": "https://cinejoy.pk/movie/429-the-good-the-bad-and-the-ugly-1966",
  "Fight Club": "https://cinejoy.pk/movie/550-fight-club-1999",
  "The Lord of the Rings: The Two Towers": "https://cinejoy.pk/movie/121-the-lord-of-the-rings-the-two-towers-2002",
  "Inception": "https://cinejoy.pk/movie/27205-inception-2010",
  "Jai Bhim": "https://cinejoy.pk/movie/855400-jai-bhim-2021",
  "C/o Kancharapalem": "https://cinejoy.pk/movie/544795-c-o-kancharapalem-2018",
  "Natsamrat": "https://cinejoy.pk/movie/378227-natsamrat-2016",
  "Sankarabharanam": "https://cinejoy.pk/movie/30088-sankarabharanam-1980",
  "Goopy Gyne Bagha Byne": "https://cinejoy.pk/movie/135092-goopy-gyne-bagha-byne-1969",
  "Manichitrathazhu": "https://cinejoy.pk/movie/84368-manichitrathazhu-1993",
  "Nadodikkattu": "https://cinejoy.pk/movie/275366-nadodikkattu-1987",
  "The Matrix": "https://cinejoy.pk/movie/603-the-matrix-1999",
  "Goodfellas": "https://cinejoy.pk/movie/769-goodfellas-1990",
  "One Flew Over the Cuckoo's Nest": "https://cinejoy.pk/movie/510-one-flew-over-the-cuckoos-nest-1975",
  "Interstellar": "https://cinejoy.pk/movie/157336-interstellar-2014",
  "Anand": "https://cinejoy.pk/movie/26237-anand-1971",
  "Soorarai Pottru": "https://cinejoy.pk/movie/595228-soorarai-pottru-2020",
  "777 Charlie": "https://cinejoy.pk/movie/634120-777-charlie-2022",
  "Swathi Muthyam": "https://cinejoy.pk/movie/900471-swathi-muthyam-1986",
  "Hirak Rajar Deshe": "https://cinejoy.pk/movie/206789-hirak-rajar-deshe-1980",
  "Ramji Rao Speaking": "https://cinejoy.pk/movie/150768-ramji-rao-speaking-1989",
  "Thevar Magan": "https://cinejoy.pk/movie/66362-thevar-magan-1992",
  "Peranbu": "https://cinejoy.pk/movie/412865-peranbu-2018",
  "Rudraveena": "https://cinejoy.pk/movie/66342-rudraveena-1988",
  "It's a Wonderful Life": "https://cinejoy.pk/movie/1585-its-a-wonderful-life-1946",
  "Seven Samurai": "https://cinejoy.pk/movie/346-seven-samurai-1954",
  "The Silence of the Lambs": "https://cinejoy.pk/movie/274-the-silence-of-the-lambs-1991",
  "Saving Private Ryan": "https://cinejoy.pk/movie/857-saving-private-ryan-1998",
  "City of God": "https://cinejoy.pk/movie/598-city-of-god-2002",
  "Life Is Beautiful": "https://cinejoy.pk/movie/637-life-is-beautiful-1997",
  "The Green Mile": "https://cinejoy.pk/movie/497-the-green-mile-1999",
  "Terminator 2: Judgment Day": "https://cinejoy.pk/movie/280-terminator-2-judgment-day-1991",
  "Spirited Away": "https://cinejoy.pk/movie/129-spirited-away-2001",
  "Dune: Part Two": "https://cinejoy.pk/movie/693134-dune-part-two-2024",
  "Spider-Man: Across the Spider-Verse": "https://cinejoy.pk/movie/569094-spider-man-across-the-spider-verse-2023",
  "Pariyerum Perumal": "https://cinejoy.pk/movie/462718-pariyerum-perumal-2018",
  "Nayakan": "https://cinejoy.pk/movie/338704-nayakan-1987",
  "Anbe Sivam": "https://cinejoy.pk/movie/26910-anbe-sivam-2003",
  "Kadaisi Vivasayi": "https://cinejoy.pk/movie/613703-kadaisi-vivasayi-2021",
  "Harakiri": "https://cinejoy.pk/movie/14537-harakiri-1962",
  "Oru Vadakkan Veeragatha": "https://cinejoy.pk/movie/151662-oru-vadakkan-veeragatha-1989",
  "Devasuram": "https://cinejoy.pk/movie/237672-devasuram-1993",
  "Godfather (Malayalam)": "https://cinejoy.pk/movie/134474-godfather-1991",
  "Thoovanathumbikal": "https://cinejoy.pk/movie/210492-thoovanathumbikal-1987",
  "Kilukkam": "https://cinejoy.pk/movie/139476-kilukkam-1991",
  "Gundamma Katha": "https://cinejoy.pk/movie/86146-gundamma-katha-1962",
  "Aha Naa Pellanta": "https://cinejoy.pk/movie/37612-aha-naa-pellanta-1987",
  "Seven": "https://cinejoy.pk/movie/807-seven-1995",
  "Back to the Future": "https://cinejoy.pk/movie/105-back-to-the-future-1985",
  "The Pianist": "https://cinejoy.pk/movie/423-the-pianist-2002",
  "Psycho": "https://cinejoy.pk/movie/539-psycho-1960",
  "Parasite": "https://cinejoy.pk/movie/496243-parasite-2019",
  "The Lion King": "https://cinejoy.pk/movie/8587-the-lion-king-1994",
  "Gladiator": "https://cinejoy.pk/movie/98-gladiator-2000",
  "American History X": "https://cinejoy.pk/movie/73-american-history-x-1998",
  "The Departed": "https://cinejoy.pk/movie/1422-the-departed-2006",
  "Whiplash": "https://cinejoy.pk/movie/244786-whiplash-2014",
  "The Prestige": "https://cinejoy.pk/movie/1124-the-prestige-2006",
  "Casablanca": "https://cinejoy.pk/movie/289-casablanca-1942",
  "Grave of the Fireflies": "https://cinejoy.pk/movie/12477-grave-of-the-fireflies-1988",
  "Cinema Paradiso": "https://cinejoy.pk/movie/11216-cinema-paradiso-1988",
  "The Usual Suspects": "https://cinejoy.pk/movie/629-the-usual-suspects-1995",
  "Once Upon a Time in the West": "https://cinejoy.pk/movie/335-once-upon-a-time-in-the-west-1968",
  "Rear Window": "https://cinejoy.pk/movie/567-rear-window-1954",
  "Alien": "https://cinejoy.pk/movie/348-alien-1979",
  "City Lights": "https://cinejoy.pk/movie/901-city-lights-1931",
  "Django Unchained": "https://cinejoy.pk/movie/68718-django-unchained-2012",
  "The Intouchables": "https://cinejoy.pk/movie/77338-the-intouchables-2011",
  "Modern Times": "https://cinejoy.pk/movie/3082-modern-times-1936",
  "Maharaja": "https://cinejoy.pk/movie/1118224-maharaja-2024",
  "Sita Ramam": "https://cinejoy.pk/movie/894803-sita-ramam-2022",
  "Kumbalangi Nights": "https://cinejoy.pk/movie/575351-kumbalangi-nights-2019",
  "Jersey": "https://cinejoy.pk/movie/592898-jersey-2019",
  "Pather Panchali": "https://cinejoy.pk/movie/5801-pather-panchali-1955",
  "Apur Sansar": "https://cinejoy.pk/movie/896-apur-sansar-1959",
  "Gol Maal": "https://cinejoy.pk/movie/30066-gol-maal-1979",
  "Aaranya Kaandam": "https://cinejoy.pk/movie/119123-aaranya-kaandam-2010",
  "Spadikam": "https://cinejoy.pk/movie/240179-spadikam-1995",
  "The Godfather: Part II": "https://cinejoy.pk/movie/240-the-godfather-part-ii-1974",
  "Forrest Gump": "https://cinejoy.pk/movie/13-forrest-gump-1994",
  "Sagara Sangamam": "https://cinejoy.pk/movie/30153-sagara-sangamam-1983",
  "Star Wars: Episode V - The Empire Strikes Back": "https://cinejoy.pk/movie/1891-the-empire-strikes-back-1980",
  "Se7en": "https://cinejoy.pk/movie/807-se7en-1995",
  "Star Wars: Episode IV - A New Hope": "https://cinejoy.pk/movie/11-star-wars-episode-iv-a-new-hope-1977",
  "Leon: The Professional": "https://cinejoy.pk/movie/101-leon-the-professional-1994",
  "Mahaaraaja": "https://cinejoy.pk/movie/1118224-maharaja-2024",
  "In Harihar Nagar": "https://cinejoy.pk/movie/322018-in-harihar-nagar-1990",
  "Yavanika": "https://cinejoy.pk/movie/249572-yavanika-1982",
  "Moondram Pirai": "https://cinejoy.pk/movie/66389-moondram-pirai-1982",
  "Mouna Ragam": "https://cinejoy.pk/movie/82124-mouna-ragam-1986",
  "Michael Madana Kama Rajan": "https://cinejoy.pk/movie/14445-michael-madana-kama-rajan-1990",
  "Pudhupettai": "https://cinejoy.pk/movie/69520-pudhupettai-2006",
  "Apocalypse Now": "https://cinejoy.pk/movie/28-apocalypse-now-1979",
  "Memento": "https://cinejoy.pk/movie/77-memento-2000",
  "Raiders of the Lost Ark": "https://cinejoy.pk/movie/85-raiders-of-the-lost-ark-1981",
  "WALL-E": "https://cinejoy.pk/movie/10681-wall-e-2008",
  "The Lives of Others": "https://cinejoy.pk/movie/582-the-lives-of-others-2006",
  "Sunset Boulevard": "https://cinejoy.pk/movie/599-sunset-boulevard-1950",
  "Paths of Glory": "https://cinejoy.pk/movie/975-paths-of-glory-1957",
  "The Shining": "https://cinejoy.pk/movie/694-the-shining-1980",
  "The Great Dictator": "https://cinejoy.pk/movie/914-the-great-dictator-1940",
  "Witness for the Prosecution": "https://cinejoy.pk/movie/37257-witness-for-the-prosecution-1957",
  "Aliens": "https://cinejoy.pk/movie/679-aliens-1986",
  "The Dark Knight Rises": "https://cinejoy.pk/movie/49026-the-dark-knight-rises-2012",
  "Dr. Strangelove": "https://cinejoy.pk/movie/935-dr-strangelove-1964",
  "Spider-Man: Into the Spider-Verse": "https://cinejoy.pk/movie/324857-spider-man-into-the-spider-verse-2018",
  "Coco": "https://cinejoy.pk/movie/354912-coco-2017",
  "Amadeus": "https://cinejoy.pk/movie/279-amadeus-1984",
  "Inglourious Basterds": "https://cinejoy.pk/movie/16869-inglourious-basterds-2009",
  "The Boat": "https://cinejoy.pk/movie/50704-the-boat-1981",
  "Avengers: Endgame": "https://cinejoy.pk/movie/299534-avengers-endgame-2019",
  "Joker": "https://cinejoy.pk/movie/475557-joker-2019",
  "3 Idiots": "https://cinejoy.pk/movie/20453-3-idiots-2009",
  "High and Low": "https://cinejoy.pk/movie/12493-high-and-low-1963",
  "Capernaum": "https://cinejoy.pk/movie/517814-capernaum-2018",
  "Come and See": "https://cinejoy.pk/movie/25237-come-and-see-1985",
  "Amaran": "https://cinejoy.pk/movie/927342-amaran-2024",
  "Sardar Udham": "https://cinejoy.pk/movie/598826-sardar-udham-2021",
  "Asuran": "https://cinejoy.pk/movie/576928-asuran-2019",
  "Super Deluxe": "https://cinejoy.pk/movie/432011-super-deluxe-2019",
  "Thani Oruvan": "https://cinejoy.pk/movie/280165-thani-oruvan-2015",
  "Anniyan": "https://cinejoy.pk/movie/19978-anniyan-2005",
  "Mahanati": "https://cinejoy.pk/movie/459713-mahanati-2018",
  "Violet Evergarden: The Movie": "https://cinejoy.pk/movie/533514-violet-evergarden-the-movie-2020",
  "Aparajito": "https://cinejoy.pk/movie/897-aparajito-1956",
  "Charulata": "https://cinejoy.pk/movie/35790-charulata-1964",
  "Guide": "https://cinejoy.pk/movie/80484-guide-1965",
  "Masoom": "https://cinejoy.pk/movie/21462-masoom-1983",
  "Black Friday": "https://cinejoy.pk/movie/28740-black-friday-2004",
  "Vada Chennai": "https://cinejoy.pk/movie/410331-vada-chennai-2018",
  "Visaranai": "https://cinejoy.pk/movie/372226-visaranai-2015",
  "Iruvar": "https://cinejoy.pk/movie/49032-iruvar-1997",
  "Meiyazhagan": "https://cinejoy.pk/movie/1136423-meiyazhagan-2024",
  "Sairat": "https://cinejoy.pk/movie/383367-sairat-2016",
  "Drishyam 2 (Malayalam)": "https://cinejoy.pk/movie/706872-drishyam-2-2021",
  "Kattradhu Thamizh": "https://cinejoy.pk/movie/69550-kattradhu-thamizh-2007",
  "Tabarana Kathe": "https://cinejoy.pk/movie/265664-tabarana-kathe-1987",
  "Mathilukal": "https://cinejoy.pk/movie/255607-mathilukal-1990",
  "Pattanapravesham": "https://cinejoy.pk/movie/280306-pattanapravesham-1988",
  "Chithram": "https://cinejoy.pk/movie/191335-chithram-1988",
  "Veedu": "https://cinejoy.pk/movie/331589-veedu-1988",
  "Mudhalvan": "https://cinejoy.pk/movie/66526-mudhalvan-1999",
  "Kannathil Muthamittal": "https://cinejoy.pk/movie/40998-kannathil-muthamittal-2002",
  "Aruvi": "https://cinejoy.pk/movie/423191-aruvi-2016",
  "Missamma": "https://cinejoy.pk/movie/86148-missamma-1955",
  "Devadasu (1953)": "https://cinejoy.pk/movie/306373-devadasu-1953",
  "Chantabbai": "https://cinejoy.pk/movie/279295-chantabbai-1986",
  "Aditya 369": "https://cinejoy.pk/movie/280363-aditya-369-1991",
  "American Beauty": "https://cinejoy.pk/movie/14-american-beauty-1999",
  "Oldboy": "https://cinejoy.pk/movie/670-oldboy-2003",
  "Braveheart": "https://cinejoy.pk/movie/197-braveheart-1995",
  "Princess Mononoke": "https://cinejoy.pk/movie/128-princess-mononoke-1997",
  "Good Will Hunting": "https://cinejoy.pk/movie/489-good-will-hunting-1997",
  "Once Upon a Time in America": "https://cinejoy.pk/movie/311-once-upon-a-time-in-america-1984",
  "Toy Story": "https://cinejoy.pk/movie/862-toy-story-1995",
  "Singin' in the Rain": "https://cinejoy.pk/movie/872-singin-in-the-rain-1952",
  "Requiem for a Dream": "https://cinejoy.pk/movie/641-requiem-for-a-dream-2000",
  "Toy Story 3": "https://cinejoy.pk/movie/10193-toy-story-3-2010",
  "Eternal Sunshine of the Spotless Mind": "https://cinejoy.pk/movie/38-eternal-sunshine-of-the-spotless-mind-2004",
  "2001: A Space Odyssey": "https://cinejoy.pk/movie/62-2001-a-space-odyssey-1968",
  "Reservoir Dogs": "https://cinejoy.pk/movie/500-reservoir-dogs-1992",
  "The Hunt": "https://cinejoy.pk/movie/103663-the-hunt-2012",
  "Citizen Kane": "https://cinejoy.pk/movie/15-citizen-kane-1941",
  "M": "https://cinejoy.pk/movie/832-m-1931",
  "Lawrence of Arabia": "https://cinejoy.pk/movie/947-lawrence-of-arabia-1962",
  "North by Northwest": "https://cinejoy.pk/movie/213-north-by-northwest-1959",
  "Vertigo": "https://cinejoy.pk/movie/426-vertigo-1958",
  "A Clockwork Orange": "https://cinejoy.pk/movie/185-a-clockwork-orange-1971",
  "Double Indemnity": "https://cinejoy.pk/movie/996-double-indemnity-1944",
  "Full Metal Jacket": "https://cinejoy.pk/movie/600-full-metal-jacket-1987",
  "Scarface": "https://cinejoy.pk/movie/111-scarface-1983",
  "Hamilton": "https://cinejoy.pk/movie/556574-hamilton-2020",
  "Incendies": "https://cinejoy.pk/movie/46738-incendies-2010",
  "Heat": "https://cinejoy.pk/movie/949-heat-1995",
  "Up": "https://cinejoy.pk/movie/14160-up-2009",
  "To Kill a Mockingbird": "https://cinejoy.pk/movie/595-to-kill-a-mockingbird-1962",
  "The Sting": "https://cinejoy.pk/movie/9277-the-sting-1973",
  "A Separation": "https://cinejoy.pk/movie/60243-a-separation-2011",
  "Metropolis": "https://cinejoy.pk/movie/19-metropolis-1927",
  "Bicycle Thieves": "https://cinejoy.pk/movie/5156-bicycle-thieves-1948",
  "Dangal": "https://cinejoy.pk/movie/360814-dangal-2016",
  "The Apartment": "https://cinejoy.pk/movie/284-the-apartment-1960",
  "Ikiru": "https://cinejoy.pk/movie/3782-ikiru-1952",
  "Judgment at Nuremberg": "https://cinejoy.pk/movie/821-judgment-at-nuremberg-1961",
  "Godzilla Minus One": "https://cinejoy.pk/movie/940721-godzilla-minus-one-2023",
  "Chhichhore": "https://cinejoy.pk/movie/596650-chhichhore-2019",
  "Laapataa Ladies": "https://cinejoy.pk/movie/1163194-laapataa-ladies-2023",
  "Vikram": "https://cinejoy.pk/movie/743563-vikram-2022",
  "Pyaasa": "https://cinejoy.pk/movie/41053-pyaasa-1957",
  "Taare Zameen Par": "https://cinejoy.pk/movie/7508-taare-zameen-par-2007",
  "The Kashmir Files": "https://cinejoy.pk/movie/900783-the-kashmir-files-2022",
  "Shershaah": "https://cinejoy.pk/movie/599925-shershaah-2021",
  "Bangalore Days": "https://cinejoy.pk/movie/371425-bangalore-days-2014",
  "Tourist Family": "https://cinejoy.pk/movie/1398359-tourist-family-2025",
  "Chupke Chupke": "https://cinejoy.pk/movie/21459-chupke-chupke-1975",
  "Jaane Bhi Do Yaaro": "https://cinejoy.pk/movie/25499-jaane-bhi-do-yaaro-1983",
  "Angoor": "https://cinejoy.pk/movie/21984-angoor-1982",
  "Satya": "https://cinejoy.pk/movie/21502-satya-1998",
  "Garuda Gamana Vrishabha Vahana": "https://cinejoy.pk/movie/678466-garuda-gamana-vrishabha-vahana-2021",
  "Lucia": "https://cinejoy.pk/movie/219343-lucia-2013",
  "Soodhu Kavvum": "https://cinejoy.pk/movie/189227-soodhu-kavvum-2013",
  "Jigarthanda": "https://cinejoy.pk/movie/270766-jigarthanda-2014",
  "Maheshinte Prathikaaram": "https://cinejoy.pk/movie/381691-maheshinte-prathikaaram-2016",
  "Jana Gana Mana": "https://cinejoy.pk/movie/792358-jana-gana-mana-2022",
  "Aattam": "https://cinejoy.pk/movie/957926-aattam-2023",
  "Agent Sai Srinivasa Athreya": "https://cinejoy.pk/movie/610482-agent-sai-srinivasa-athreya-2019",
  "Drishyam (Malayalam)": "https://cinejoy.pk/movie/244049-drishyam-2013",
  "Baashha": "https://cinejoy.pk/movie/49074-baashha-1995",
  "Pithamagan": "https://cinejoy.pk/movie/69638-pithamagan-2003",
  "To Live": "https://cinejoy.pk/movie/31439-to-live-1994",
  "The Cranes Are Flying": "https://cinejoy.pk/movie/38360-the-cranes-are-flying-1957",
  "Scarface (1983)": "https://cinejoy.pk/movie/111-scarface-1983",
  "Sansho the Bailiff": "https://cinejoy.pk/movie/20532-sansho-the-bailiff-1954",
  "Metropolis (1927)": "https://cinejoy.pk/movie/19-metropolis-1927",
  "M (1931)": "https://cinejoy.pk/movie/832-m-1931",
  "Ordet": "https://cinejoy.pk/movie/48035-ordet-1955",
  "Sonar Kella": "https://cinejoy.pk/movie/164990-sonar-kella-1974",
  "Vidheyan": "https://cinejoy.pk/movie/256212-vidheyan-1994",
  "Chenkol": "https://cinejoy.pk/movie/280269-chenkol-1993",
  "Moonnam Pakkam": "https://cinejoy.pk/movie/255468-moonnam-pakkam-1988",
  "Perumthachan": "https://cinejoy.pk/movie/256378-perumthachan-1990",
  "Amaram": "https://cinejoy.pk/movie/237725-amaram-1991",
  "Bharatham": "https://cinejoy.pk/movie/249633-bharatham-1991",
  "Sandhya Raagam": "https://cinejoy.pk/movie/338357-sandhya-raagam-1989",
  "Virumaandi": "https://cinejoy.pk/movie/66340-virumaandi-2004",
  "Kaaka Muttai": "https://cinejoy.pk/movie/264038-kaaka-muttai-2014",
  "Maanaadu": "https://cinejoy.pk/movie/535156-maanaadu-2021",
  "Lubber Pandhu": "https://cinejoy.pk/movie/1097000-lubber-pandhu-2024",
  "Siri Siri Muvva": "https://cinejoy.pk/movie/307430-siri-siri-muvva-1976",
  "Anveshana": "https://cinejoy.pk/movie/361036-anveshana-1985",
  "Geethanjali (1989)": "https://cinejoy.pk/movie/280287-geethanjali-1989",
  "Kshana Kshanam": "https://cinejoy.pk/movie/81072-kshana-kshanam-1991",
  "Tholi Prema": "https://cinejoy.pk/movie/112846-tholi-prema-1998",
  "My Father and My Son": "https://cinejoy.pk/movie/13393-my-father-and-my-son-2005",
  "Snatch": "https://cinejoy.pk/movie/107-snatch-2000",
  "The Kid": "https://cinejoy.pk/movie/10098-the-kid-1921",
  "Monty Python and the Holy Grail": "https://cinejoy.pk/movie/762-monty-python-and-the-holy-grail-1975",
  "L.A. Confidential": "https://cinejoy.pk/movie/2118-la-confidential-1997",
  "For a Few Dollars More": "https://cinejoy.pk/movie/938-for-a-few-dollars-more-1965",
  "Rashomon": "https://cinejoy.pk/movie/548-rashomon-1950",
  "Indiana Jones and the Last Crusade": "https://cinejoy.pk/movie/89-indiana-jones-and-the-last-crusade-1989",
  "Yojimbo": "https://cinejoy.pk/movie/11878-yojimbo-1961",
  "All About Eve": "https://cinejoy.pk/movie/705-all-about-eve-1950",
  "Batman Begins": "https://cinejoy.pk/movie/272-batman-begins-2005",
  "Some Like It Hot": "https://cinejoy.pk/movie/239-some-like-it-hot-1959",
  "The Treasure of the Sierra Madre": "https://cinejoy.pk/movie/3090-the-treasure-of-the-sierra-madre-1948",
  "Unforgiven": "https://cinejoy.pk/movie/33-unforgiven-1992",
  "Downfall": "https://cinejoy.pk/movie/613-downfall-2004",
  "Die Hard": "https://cinejoy.pk/movie/562-die-hard-1988",
  "Children of Heaven": "https://cinejoy.pk/movie/21334-children-of-heaven-1997",
  "The Great Escape": "https://cinejoy.pk/movie/5925-the-great-escape-1963",
  "Pan's Labyrinth": "https://cinejoy.pk/movie/1417-pans-labyrinth-2006",
  "Ran": "https://cinejoy.pk/movie/11645-ran-1985",
  "The Secret in Their Eyes": "https://cinejoy.pk/movie/25376-the-secret-in-their-eyes-2009",
  "Howl's Moving Castle": "https://cinejoy.pk/movie/4935-howls-moving-castle-2004",
  "Casino": "https://cinejoy.pk/movie/524-casino-1995",
  "A Beautiful Mind": "https://cinejoy.pk/movie/453-a-beautiful-mind-2001",
  "The Elephant Man": "https://cinejoy.pk/movie/1955-the-elephant-man-1980",
  "V for Vendetta": "https://cinejoy.pk/movie/752-v-for-vendetta-2005",
  "The Wolf of Wall Street": "https://cinejoy.pk/movie/106646-the-wolf-of-wall-street-2013",
  "Dial M for Murder": "https://cinejoy.pk/movie/521-dial-m-for-murder-1954",
  "Gone with the Wind": "https://cinejoy.pk/movie/770-gone-with-the-wind-1939",
  "Finding Nemo": "https://cinejoy.pk/movie/12-finding-nemo-2003",
  "The Sixth Sense": "https://cinejoy.pk/movie/745-the-sixth-sense-1999",
  "The Thing": "https://cinejoy.pk/movie/1091-the-thing-1982",
  "No Country for Old Men": "https://cinejoy.pk/movie/6977-no-country-for-old-men-2007",
  "There Will Be Blood": "https://cinejoy.pk/movie/7345-there-will-be-blood-2007",
  "Shutter Island": "https://cinejoy.pk/movie/11324-shutter-island-2010",
  "The Wages of Fear": "https://cinejoy.pk/movie/204-the-wages-of-fear-1953",
  "Jurassic Park": "https://cinejoy.pk/movie/329-jurassic-park-1993",
  "Drishyam": "https://cinejoy.pk/movie/352173-drishyam-2015",
  "The Truman Show": "https://cinejoy.pk/movie/37165-the-truman-show-1998",
  "Kantara": "https://cinejoy.pk/movie/858485-kantara-2022",
  "Baahubali 2: The Conclusion": "https://cinejoy.pk/movie/350312-baahubali-2-the-conclusion-2017",
  "K.G.F: Chapter 2": "https://cinejoy.pk/movie/587412-kgf-chapter-2-2022",
  "Spider-Man: No Way Home": "https://cinejoy.pk/movie/634649-spider-man-no-way-home-2021",
  "Andhadhun": "https://cinejoy.pk/movie/534780-andhadhun-2018",
  "Gangs of Wasseypur": "https://cinejoy.pk/movie/117691-gangs-of-wasseypur-2012",
  "Taxi Driver": "https://cinejoy.pk/movie/103-taxi-driver-1976",
  "Swades": "https://cinejoy.pk/movie/15774-swades-2004",
  "Zindagi Na Milegi Dobara": "https://cinejoy.pk/movie/61202-zindagi-na-milegi-dobara-2011",
  "The Wild Robot": "https://cinejoy.pk/movie/1184918-the-wild-robot-2024",
  "One Battle After Another": "https://cinejoy.pk/movie/1054867-one-battle-after-another-2025",
  "The Father": "https://cinejoy.pk/movie/600354-the-father-2020",
  "Kaithi": "https://cinejoy.pk/movie/587030-kaithi-2019",
  "Vikram Vedha": "https://cinejoy.pk/movie/432139-vikram-vedha-2017",
  "Drishyam 2": "https://cinejoy.pk/movie/706872-drishyam-2-2022",
  "Manjummel Boys": "https://cinejoy.pk/movie/1069945-manjummel-boys-2024",
  "Uri: The Surgical Strike": "https://cinejoy.pk/movie/554600-uri-the-surgical-strike-2019",
  "Tumbbad": "https://cinejoy.pk/movie/538858-tumbbad-2018",
  "Bhaag Milkha Bhaag": "https://cinejoy.pk/movie/206324-bhaag-milkha-bhaag-2013",
  "Premam": "https://cinejoy.pk/movie/341895-premam-2015",
  "Rangasthalam": "https://cinejoy.pk/movie/461126-rangasthalam-2018",
  "Paan Singh Tomar": "https://cinejoy.pk/movie/96398-paan-singh-tomar-2012",
  "Shahid": "https://cinejoy.pk/movie/128206-shahid-2012",
  "The Great Indian Kitchen": "https://cinejoy.pk/movie/786064-the-great-indian-kitchen-2021",
  "Kishkindha Kaandam": "https://cinejoy.pk/movie/1025125-kishkindha-kaandam-2024",
  "Pelli Choopulu": "https://cinejoy.pk/movie/1273797-pelli-choopulu-2016",
  "A Brighter Summer Day": "https://cinejoy.pk/movie/15804-a-brighter-summer-day-1991",
  "Close-Up": "https://cinejoy.pk/movie/30017-close-up-1990",
  "Ustad Hotel": "https://cinejoy.pk/movie/117751-ustad-hotel-2012",
  "Vikram Vedha (Tamil)": "https://cinejoy.pk/movie/432139-vikram-vedha-2017",
  "Athadu": "https://cinejoy.pk/movie/37172-athadu-2005",
  "Mathu Vadalara": "https://cinejoy.pk/movie/657853-mathu-vadalara-2019",
  "Blink": "https://cinejoy.pk/movie/1340168-blink-2024",
  "Ballad of a Soldier": "https://cinejoy.pk/movie/46592-ballad-of-a-soldier-1959",
  "Umberto D.": "https://cinejoy.pk/movie/833-umberto-d-1952",
  "The Thing (1982)": "https://cinejoy.pk/movie/1091-the-thing-1982",
  "Late Spring": "https://cinejoy.pk/movie/20530-late-spring-1949",
  "Ugetsu": "https://cinejoy.pk/movie/14696-ugetsu-1953",
  "Mahanagar": "https://cinejoy.pk/movie/60567-mahanagar-1963",
  "Sadayam": "https://cinejoy.pk/movie/280277-sadayam-1992",
  "Pranchiyettan & the Saint": "https://cinejoy.pk/movie/79897-pranchiyettan-and-the-saint-2010",
  "Punjabi House": "https://cinejoy.pk/movie/234639-punjabi-house-1998",
  "Nammavar": "https://cinejoy.pk/movie/66354-nammavar-1994",
  "Paruthiveeran": "https://cinejoy.pk/movie/69598-paruthiveeran-2007",
  "Subramaniapuram": "https://cinejoy.pk/movie/76850-subramaniapuram-2008",
  "Vaaranam Aayiram": "https://cinejoy.pk/movie/38637-vaaranam-aayiram-2008",
  "Naduvula Konjam Pakkatha Kaanom": "https://cinejoy.pk/movie/146582-naduvula-konjam-pakkatha-kaanom-2012",
  "Vaazhai": "https://cinejoy.pk/movie/1051426-vaazhai-2024",
  "Mooga Manasulu": "https://cinejoy.pk/movie/307768-mooga-manasulu-1964",
  "Maro Charitra": "https://cinejoy.pk/movie/137280-maro-charitra-1978",
  "Subhalekha": "https://cinejoy.pk/movie/267687-subhalekha-1982",
  "Siva": "https://cinejoy.pk/movie/66259-siva-1989",
  "Bommarillu": "https://cinejoy.pk/movie/31626-bommarillu-2006",
  "Gamyam": "https://cinejoy.pk/movie/80994-gamyam-2008",
  "Kshanam": "https://cinejoy.pk/movie/386427-kshanam-2016",
  "The End of Evangelion": "https://cinejoy.pk/movie/18491-the-end-of-evangelion-1997",
  "Blue Giant": "https://cinejoy.pk/movie/887870-blue-giant-2023",
  "Klaus": "https://cinejoy.pk/movie/508965-klaus-2019",
  "Three Billboards Outside Ebbing, Missouri": "https://cinejoy.pk/movie/359940-three-billboards-outside-ebbing-missouri-2017",
  "Green Book": "https://cinejoy.pk/movie/490132-green-book-2018",
  "Hacksaw Ridge": "https://cinejoy.pk/movie/324786-hacksaw-ridge-2016",
  "Raging Bull": "https://cinejoy.pk/movie/1578-raging-bull-1980",
  "The Third Man": "https://cinejoy.pk/movie/1092-the-third-man-1949",
  "Chinatown": "https://cinejoy.pk/movie/829-chinatown-1974",
  "Inside Out": "https://cinejoy.pk/movie/150540-inside-out-2015",
  "My Neighbor Totoro": "https://cinejoy.pk/movie/8392-my-neighbor-totoro-1988",
  "On the Waterfront": "https://cinejoy.pk/movie/654-on-the-waterfront-1954",
  "Room": "https://cinejoy.pk/movie/264644-room-2015",
  "The Gold Rush": "https://cinejoy.pk/movie/962-the-gold-rush-1925",
  "The Bridge on the River Kwai": "https://cinejoy.pk/movie/826-the-bridge-on-the-river-kwai-1957",
  "Blade Runner": "https://cinejoy.pk/movie/78-blade-runner-1982",
  "Mr. Smith Goes to Washington": "https://cinejoy.pk/movie/3083-mr-smith-goes-to-washington-1939",
  "The Seventh Seal": "https://cinejoy.pk/movie/490-the-seventh-seal-1957",
  "Lock, Stock and Two Smoking Barrels": "https://cinejoy.pk/movie/100-lock-stock-and-two-smoking-barrels-1998",
  "The Bandit": "https://cinejoy.pk/movie/26900-the-bandit-1996",
  "The General": "https://cinejoy.pk/movie/961-the-general-1926",
  "Wild Strawberries": "https://cinejoy.pk/movie/614-wild-strawberries-1957",
  "Warrior": "https://cinejoy.pk/movie/59440-warrior-2011",
  "Sunrise": "https://cinejoy.pk/movie/328930-sunrise-1927",
  "The Passion of Joan of Arc": "https://cinejoy.pk/movie/780-the-passion-of-joan-of-arc-1928",
  "Gran Torino": "https://cinejoy.pk/movie/13223-gran-torino-2008",
  "Rang De Basanti": "https://cinejoy.pk/movie/7913-rang-de-basanti-2006",
  "Trainspotting": "https://cinejoy.pk/movie/627-trainspotting-1996",
  "The Big Lebowski": "https://cinejoy.pk/movie/115-the-big-lebowski-1998",
  "Tokyo Story": "https://cinejoy.pk/movie/18148-tokyo-story-1953",
  "The Deer Hunter": "https://cinejoy.pk/movie/11778-the-deer-hunter-1978",
  "Fargo": "https://cinejoy.pk/movie/275-fargo-1996",
  "Hera Pheri": "https://cinejoy.pk/movie/21614-hera-pheri-2000",
  "Cool Hand Luke": "https://cinejoy.pk/movie/903-cool-hand-luke-1967",
  "Rebecca": "https://cinejoy.pk/movie/223-rebecca-1940",
  "How to Train Your Dragon": "https://cinejoy.pk/movie/10191-how-to-train-your-dragon-2010",
  "Munna Bhai M.B.B.S.": "https://cinejoy.pk/movie/19625-munna-bhai-mbbs-2003",
  "Sholay": "https://cinejoy.pk/movie/12259-sholay-1975",
  "Into the Wild": "https://cinejoy.pk/movie/5915-into-the-wild-2007",
  "Mary and Max": "https://cinejoy.pk/movie/24238-mary-and-max-2009",
  "Gone Girl": "https://cinejoy.pk/movie/210577-gone-girl-2014",
  "It Happened One Night": "https://cinejoy.pk/movie/3078-it-happened-one-night-1934",
  "Rush": "https://cinejoy.pk/movie/96721-rush-2013",
  "Hotel Rwanda": "https://cinejoy.pk/movie/205-hotel-rwanda-2004",
  "Platoon": "https://cinejoy.pk/movie/792-platoon-1986",
  "Network": "https://cinejoy.pk/movie/10774-network-1976",
  "Stand by Me": "https://cinejoy.pk/movie/235-stand-by-me-1986",
  "Spotlight": "https://cinejoy.pk/movie/314365-spotlight-2015",
  "In the Name of the Father": "https://cinejoy.pk/movie/7984-in-the-name-of-the-father-1993",
  "Wild Tales": "https://cinejoy.pk/movie/265195-wild-tales-2014",
  "The 400 Blows": "https://cinejoy.pk/movie/147-the-400-blows-1959",
  "Mad Max: Fury Road": "https://cinejoy.pk/movie/76341-mad-max-fury-road-2015",
  "12 Years a Slave": "https://cinejoy.pk/movie/76203-12-years-a-slave-2013",
  "Ben-Hur": "https://cinejoy.pk/movie/665-ben-hur-1959",
  "The Grand Budapest Hotel": "https://cinejoy.pk/movie/120467-the-grand-budapest-hotel-2014",
  "Persona": "https://cinejoy.pk/movie/797-persona-1966",
  "Million Dollar Baby": "https://cinejoy.pk/movie/70-million-dollar-baby-2004",
  "Hachi: A Dog's Tale": "https://cinejoy.pk/movie/28178-hachi-a-dogs-tale-2009",
  "Memories of Murder": "https://cinejoy.pk/movie/11423-memories-of-murder-2003",
  "Stalker": "https://cinejoy.pk/movie/1398-stalker-1979",
  "The Grapes of Wrath": "https://cinejoy.pk/movie/596-the-grapes-of-wrath-1940",
  "Before Sunrise": "https://cinejoy.pk/movie/76-before-sunrise-1995",
  "The Message": "https://cinejoy.pk/movie/26842-the-message-1976",
  "Rocky": "https://cinejoy.pk/movie/1366-rocky-1976",
  "Diabolique": "https://cinejoy.pk/movie/827-diabolique-1955",
  "Monsters, Inc.": "https://cinejoy.pk/movie/585-monsters-inc-2001",
  "Prisoners": "https://cinejoy.pk/movie/146233-prisoners-2013",
  "The Terminator": "https://cinejoy.pk/movie/218-the-terminator-1984",
  "The Wizard of Oz": "https://cinejoy.pk/movie/630-the-wizard-of-oz-1939",
  "Catch Me If You Can": "https://cinejoy.pk/movie/640-catch-me-if-you-can-2002",
  "La Haine": "https://cinejoy.pk/movie/406-la-haine-1995",
  "Jaws": "https://cinejoy.pk/movie/578-jaws-1975",
  "Barry Lyndon": "https://cinejoy.pk/movie/3175-barry-lyndon-1975",
  "Udaan": "https://cinejoy.pk/movie/45316-udaan-2010",
  "The Best Years of Our Lives": "https://cinejoy.pk/movie/887-the-best-years-of-our-lives-1946",
  "Pirates of the Caribbean: The Curse of the Black Pearl": "https://cinejoy.pk/movie/22-pirates-of-the-caribbean-the-curse-of-the-black-pearl-2003",
  "Logan": "https://cinejoy.pk/movie/263115-logan-2017",
  "The Exorcist": "https://cinejoy.pk/movie/9552-the-exorcist-1973",
  "The Handmaiden": "https://cinejoy.pk/movie/290098-the-handmaiden-2016",
  "Ford v Ferrari": "https://cinejoy.pk/movie/359724-ford-v-ferrari-2019",
  "Lagaan": "https://cinejoy.pk/movie/19666-lagaan-2001",
  "Chak De! India": "https://cinejoy.pk/movie/14163-chak-de-india-2007",
  "Ratatouille": "https://cinejoy.pk/movie/2062-ratatouille-2007",
  "A Silent Voice": "https://cinejoy.pk/movie/378064-a-silent-voice-2016",
  "PK": "https://cinejoy.pk/movie/297222-pk-2014",
  "Dil Chahta Hai": "https://cinejoy.pk/movie/14752-dil-chahta-hai-2001",
  "Queen": "https://cinejoy.pk/movie/247645-queen-2013",
  "Before Sunset": "https://cinejoy.pk/movie/80-before-sunset-2004",
  "Portrait of a Lady on Fire": "https://cinejoy.pk/movie/531428-portrait-of-a-lady-on-fire-2019",
  "Hamnet": "https://cinejoy.pk/movie/858024-hamnet-2025",
  "Lucky Baskhar": "https://cinejoy.pk/movie/1239511-lucky-baskhar-2024",
  "Article 15": "https://cinejoy.pk/movie/597089-article-15-2019",
  "Lage Raho Munna Bhai": "https://cinejoy.pk/movie/21461-lage-raho-munna-bhai-2006",
  "Barfi!": "https://cinejoy.pk/movie/127501-barfi-2012",
  "Kahaani": "https://cinejoy.pk/movie/82825-kahaani-2012",
  "Haider": "https://cinejoy.pk/movie/280795-haider-2014",
  "Bajrangi Bhaijaan": "https://cinejoy.pk/movie/348892-bajrangi-bhaijaan-2015",
  "Masaan": "https://cinejoy.pk/movie/336203-masaan-2015",
  "Pink": "https://cinejoy.pk/movie/415358-pink-2016",
  "Hridayam": "https://cinejoy.pk/movie/653221-hridayam-2022",
  "Dead Poets Society": "https://cinejoy.pk/movie/207-dead-poets-society-1989",
  "Kaagaz Ke Phool": "https://cinejoy.pk/movie/53767-kaagaz-ke-phool-1959",
  "Padosan": "https://cinejoy.pk/movie/20622-padosan-1968",
  "Ardh Satya": "https://cinejoy.pk/movie/103073-ardh-satya-1983",
  "Sarfarosh": "https://cinejoy.pk/movie/31524-sarfarosh-1999",
  "Jo Jeeta Wohi Sikandar": "https://cinejoy.pk/movie/33202-jo-jeeta-wohi-sikandar-1992",
  "Omkara": "https://cinejoy.pk/movie/14705-omkara-2006",
  "Johnny Gaddaar": "https://cinejoy.pk/movie/20129-johnny-gaddaar-2007",
  "Ugly": "https://cinejoy.pk/movie/191726-ugly-2013",
  "Talvar": "https://cinejoy.pk/movie/353464-talvar-2015",
  "Section 375": "https://cinejoy.pk/movie/507941-section-375-2019",
  "Roja": "https://cinejoy.pk/movie/21463-roja-1992",
  "Bombay": "https://cinejoy.pk/movie/26247-bombay-1995",
  "Thondimuthalum Driksakshiyum": "https://cinejoy.pk/movie/459719-thondimuthalum-driksakshiyum-2017",
  "In the Mood for Love": "https://cinejoy.pk/movie/843-in-the-mood-for-love-2000",
  "Yi Yi": "https://cinejoy.pk/movie/25538-yi-yi-2000",
  "Farewell My Concubine": "https://cinejoy.pk/movie/10997-farewell-my-concubine-1993",
  "Paris, Texas": "https://cinejoy.pk/movie/655-paris-texas-1984",
  "Three Colours: Red": "https://cinejoy.pk/movie/110-three-colours-red-1994",
  "Flow": "https://cinejoy.pk/movie/823219-flow-2024",
  "I'm Still Here": "https://cinejoy.pk/movie/1000837-im-still-here-2024",
  "Nayattu": "https://cinejoy.pk/movie/753946-nayattu-2021",
  "Maanagaram": "https://cinejoy.pk/movie/412096-maanagaram-2017",
  "Gargi": "https://cinejoy.pk/movie/973579-gargi-2022",
  "Major": "https://cinejoy.pk/movie/605153-major-2022",
  "Balagam": "https://cinejoy.pk/movie/1092632-balagam-2023",
  "Mahanadhi": "https://cinejoy.pk/movie/81081-mahanadhi-1994",
  "Pathala Bhairavi": "https://cinejoy.pk/movie/pathala-bhairavi-1951",
  "Your Name.": "https://cinejoy.pk/movie/193691-your-name-2016",
  "Avengers: Infinity War": "https://cinejoy.pk/movie/299536-avengers-infinity-war-2018",
  "Ulidavaru Kandanthe": "https://cinejoy.pk/movie/ulidavaru-kandanthe-2014",
  "Namukku Parkkan Munthirithoppukal": "https://cinejoy.pk/movie/namukku-parkkan-munthirithoppukal-1986",
  "Meleparambil Anveedu": "https://cinejoy.pk/movie/meleparambil-anveedu-1993",
  "Panchatanthiram": "https://cinejoy.pk/movie/66363-panchatanthiram-2002",
  "Star Wars: Episode VI - Return of the Jedi": "https://cinejoy.pk/movie/1892-star-wars-episode-vi-return-of-the-jedi-1983",
  "Amelie": "https://cinejoy.pk/movie/194-amelie-2001",
  "Like Stars on Earth": "https://cinejoy.pk/movie/7596-like-stars-on-earth-2007",
  "Top Gun: Maverick": "https://cinejoy.pk/movie/361743-top-gun-maverick-2022",
  "Ratsasan": "https://cinejoy.pk/movie/533444-ratsasan-2018",
  "Sapta Sagaradaache Ello - Side A": "https://cinejoy.pk/movie/sapta-sagaradaache-ello-side-a-2023",
  "Kill Bill: Vol. 1": "https://cinejoy.pk/movie/24-kill-bill-vol-1-2003",
  "Demon Slayer: Mugen Train": "https://cinejoy.pk/movie/635302-demon-slayer-mugen-train-2020",
  "KGF: Chapter 1": "https://cinejoy.pk/movie/561937-kgf-chapter-1-2018",
  "Khosla Ka Ghosla!": "https://cinejoy.pk/movie/37611-khosla-ka-ghosla-2006",
  "Chithha": "https://cinejoy.pk/movie/1173926-chithha-2023",
  "Theeran Adhigaaram Ondru": "https://cinejoy.pk/movie/484394-theeran-adhigaaram-ondru-2017",
  "Viduthalai Part 1": "https://cinejoy.pk/movie/824249-viduthalai-part-1-2023",
  "Nayak: The Hero": "https://cinejoy.pk/movie/nayak-the-hero-1966",
  "Gunaa": "https://cinejoy.pk/movie/198226-gunaa-1991",
  "Avvai Shanmugi": "https://cinejoy.pk/movie/79188-avvai-shanmugi-1996",
  "A Wednesday": "https://cinejoy.pk/movie/13853-a-wednesday-2008",
  "The Nights of Cabiria": "https://cinejoy.pk/movie/824-the-nights-of-cabiria-1957",
  "Amores Perros": "https://cinejoy.pk/movie/55-amores-perros-2000",
  "Harry Potter and the Deathly Hallows: Part 2": "https://cinejoy.pk/movie/12445-harry-potter-and-the-deathly-hallows-part-2-2011",
  "Chainsaw Man - The Movie: Reze Arc": "https://cinejoy.pk/movie/chainsaw-man-the-movie-reze-arc-2025",
  "Mughal-E-Azam": "https://cinejoy.pk/movie/11156-mughal-e-azam-1960",
  "OMG: Oh My God!": "https://cinejoy.pk/movie/134375-omg-oh-my-god-2012",
  "Where Is the Friend's Home?": "https://cinejoy.pk/movie/30020-where-is-the-friends-home-1987",
  "Bell Bottom": "https://cinejoy.pk/movie/584786-bell-bottom-2019",
  "Dia": "https://cinejoy.pk/movie/672128-dia-2020",
  "Love Mocktail": "https://cinejoy.pk/movie/672125-love-mocktail-2020",
  "Raise the Red Lantern": "https://cinejoy.pk/movie/10404-raise-the-red-lantern-1991",
  "Andrei Rublev": "https://cinejoy.pk/movie/895-andrei-rublev-1966",
  "The Hidden Fortress": "https://cinejoy.pk/movie/1059-the-hidden-fortress-1958",
  "Early Summer": "https://cinejoy.pk/movie/50247-early-summer-1951",
  "Fanny and Alexander": "https://cinejoy.pk/movie/5961-fanny-and-alexander-1982",
  "Autumn Sonata": "https://cinejoy.pk/movie/12761-autumn-sonata-1978",
  "Cries and Whispers": "https://cinejoy.pk/movie/10238-cries-and-whispers-1972",
  "Nights of Cabiria": "https://cinejoy.pk/movie/19426-nights-of-cabiria-1957",
  "A Short Film About Love": "https://cinejoy.pk/movie/31056-a-short-film-about-love-1988",
  "Sunrise: A Song of Two Humans": "https://cinejoy.pk/movie/631-sunrise-a-song-of-two-humans-1927",
  "Agantuk": "https://cinejoy.pk/movie/1171629-agantuk-1991",
  "Meghe Dhaka Tara": "https://cinejoy.pk/movie/59239-meghe-dhaka-tara-1960",
  "Subarnarekha": "https://cinejoy.pk/movie/86303-subarnarekha-1965",
  "Ghatashraddha": "https://cinejoy.pk/movie/258535-ghatashraddha-1977",
  "Chomana Dudi": "https://cinejoy.pk/movie/315898-chomana-dudi-1975",
  "Anantaram": "https://cinejoy.pk/movie/275030-anantaram-1987",
  "Traffic": "https://cinejoy.pk/movie/142948-traffic-2011",
  "Take Off": "https://cinejoy.pk/movie/430521-take-off-2017",
  "Marupadiyum": "https://cinejoy.pk/movie/318858-marupadiyum-1993",
  "Anjali": "https://cinejoy.pk/movie/223365-anjali-1990",
  "Sathi Leelavathi": "https://cinejoy.pk/movie/66352-sathi-leelavathi-1995",
  "Indian (1996)": "https://cinejoy.pk/movie/31521-indian-1996",
  "Ghilli": "https://cinejoy.pk/movie/63647-ghilli-2004",
  "Autograph": "https://cinejoy.pk/movie/140299-autograph-2004",
  "Vinnaithaandi Varuvaayaa": "https://cinejoy.pk/movie/37941-vinnaithaandi-varuvaayaa-2010",
  "Aadukalam": "https://cinejoy.pk/movie/68016-aadukalam-2011",
  "Thuppakki": "https://cinejoy.pk/movie/143010-thuppakki-2012",
  "Kaththi": "https://cinejoy.pk/movie/263475-kaththi-2014",
  "Money (1993)": "https://cinejoy.pk/movie/132465-money-1993",
  "Appula Appa Rao": "https://cinejoy.pk/movie/180736-appula-appa-rao-1991",
  "Kushi": "https://cinejoy.pk/movie/69654-kushi-2001",
  "Okkadu": "https://cinejoy.pk/movie/94965-okkadu-2003",
  "Anukokunda Oka Roju": "https://cinejoy.pk/movie/80862-anukokunda-oka-roju-2005",
  "Prasthanam": "https://cinejoy.pk/movie/52522-prasthanam-2010",
  "Vedam": "https://cinejoy.pk/movie/97342-vedam-2010",
  "1: Nenokkadine": "https://cinejoy.pk/movie/249772-1-nenokkadine-2014",
  "Wolfwalkers": "https://cinejoy.pk/movie/441130-wolfwalkers-2020",
  "The Help": "https://cinejoy.pk/movie/50014-the-help-2011",
  "Andaz Apna Apna": "https://cinejoy.pk/movie/58128-andaz-apna-apna-1994",
  "Butch Cassidy and the Sundance Kid": "https://cinejoy.pk/movie/642-butch-cassidy-and-the-sundance-kid-1969",
  "The Maltese Falcon": "https://cinejoy.pk/movie/963-the-maltese-falcon-1941",
  "The Princess Bride": "https://cinejoy.pk/movie/2493-the-princess-bride-1987",
  "Touch of Evil": "https://cinejoy.pk/movie/1480-touch-of-evil-1958",
  "Annie Hall": "https://cinejoy.pk/movie/703-annie-hall-1977",
  "Gandhi": "https://cinejoy.pk/movie/783-gandhi-1982",
  "The Bourne Ultimatum": "https://cinejoy.pk/movie/2503-the-bourne-ultimatum-2007",
  "Donnie Darko": "https://cinejoy.pk/movie/141-donnie-darko-2001",
  "Groundhog Day": "https://cinejoy.pk/movie/137-groundhog-day-1993",
  "Zootopia": "https://cinejoy.pk/movie/269149-zootopia-2016",
  "Infernal Affairs": "https://cinejoy.pk/movie/10775-infernal-affairs-2002",
  "Dune": "https://cinejoy.pk/movie/438631-dune-2021",
  "Baahubali: The Beginning": "https://cinejoy.pk/movie/256040-baahubali-the-beginning-2015",
  "The Avengers": "https://cinejoy.pk/movie/24428-the-avengers-2012",
  "Guardians of the Galaxy": "https://cinejoy.pk/movie/118340-guardians-of-the-galaxy-2014",
  "Deadpool": "https://cinejoy.pk/movie/293660-deadpool-2016",
  "Casino Royale": "https://cinejoy.pk/movie/36557-casino-royale-2006",
  "Blade Runner 2049": "https://cinejoy.pk/movie/335984-blade-runner-2049-2017",
  "The Martian": "https://cinejoy.pk/movie/286217-the-martian-2015",
  "Black Swan": "https://cinejoy.pk/movie/44214-black-swan-2010",
  "The Revenant": "https://cinejoy.pk/movie/281957-the-revenant-2015",
  "The King's Speech": "https://cinejoy.pk/movie/45269-the-kings-speech-2010",
  "The Imitation Game": "https://cinejoy.pk/movie/205596-the-imitation-game-2014",
  "The Pursuit of Happyness": "https://cinejoy.pk/movie/1402-the-pursuit-of-happyness-2006",
  "Slumdog Millionaire": "https://cinejoy.pk/movie/12405-slumdog-millionaire-2008",
  "Lion": "https://cinejoy.pk/movie/348655-lion-2016",
  "The Incredibles": "https://cinejoy.pk/movie/9806-the-incredibles-2004",
  "Soul": "https://cinejoy.pk/movie/508442-soul-2020",
  "Akira": "https://cinejoy.pk/movie/149-akira-1988",
  "Castle in the Sky": "https://cinejoy.pk/movie/10515-castle-in-the-sky-1986",
  "Princess Kaguya": "https://cinejoy.pk/movie/494688-princess-kaguya-2013",
  "Dilwale Dulhania Le Jayenge": "https://cinejoy.pk/movie/19404-dilwale-dulhania-le-jayenge-1995",
  "Marty Supreme": "https://cinejoy.pk/movie/1317288-marty-supreme-2025",
  "Sentimental Value": "https://cinejoy.pk/movie/1124566-sentimental-value-2025",
  "CODA": "https://cinejoy.pk/movie/776503-coda-2021",
  "The First Slam Dunk": "https://cinejoy.pk/movie/783675-the-first-slam-dunk-2022",
  "Dhurandhar": "https://cinejoy.pk/movie/1291608-dhurandhar-2025",
  "Deewaar": "https://cinejoy.pk/movie/22460-deewaar-1975",
  "Thalapathi": "https://cinejoy.pk/movie/29811-thalapathi-1991",
  "Arjun Reddy": "https://cinejoy.pk/movie/473234-arjun-reddy-2017",
  "Thudarum": "https://cinejoy.pk/movie/1261125-thudarum-2025",
  "Dances with Wolves": "https://cinejoy.pk/movie/581-dances-with-wolves-1990",
  "Rio Bravo": "https://cinejoy.pk/movie/301-rio-bravo-1959",
  "Scent of a Woman": "https://cinejoy.pk/movie/9475-scent-of-a-woman-1992",
  "Rain Man": "https://cinejoy.pk/movie/380-rain-man-1988",
  "Cinderella Man": "https://cinejoy.pk/movie/921-cinderella-man-2005",
  "Her": "https://cinejoy.pk/movie/152601-her-2013",
  "Ip Man": "https://cinejoy.pk/movie/14756-ip-man-2008",
  "Central Station": "https://cinejoy.pk/movie/666-central-station-1998",
  "La Dolce Vita": "https://cinejoy.pk/movie/439-la-dolce-vita-1960",
  "8½": "https://cinejoy.pk/movie/422-8-1963",
  "Beauty and the Beast": "https://cinejoy.pk/movie/10020-beauty-and-the-beast-1991",
  "Aladdin": "https://cinejoy.pk/movie/812-aladdin-1992",
  "Persepolis": "https://cinejoy.pk/movie/2011-persepolis-2007",
  "Waltz with Bashir": "https://cinejoy.pk/movie/8885-waltz-with-bashir-2008",
  "Perfect Blue": "https://cinejoy.pk/movie/10494-perfect-blue-1997",
  "Vaastav: The Reality": "https://cinejoy.pk/movie/146270-vaastav-the-reality-1999",
  "Company": "https://cinejoy.pk/movie/15761-company-2002",
  "Maqbool": "https://cinejoy.pk/movie/21265-maqbool-2003",
  "Chungking Express": "https://cinejoy.pk/movie/11104-chungking-express-1994",
  "Ayyappanum Koshiyum": "https://cinejoy.pk/movie/657996-ayyappanum-koshiyum-2020",
  "Karnan": "https://cinejoy.pk/movie/680652-karnan-2021",
  "Hey Ram": "https://cinejoy.pk/movie/60579-hey-ram-2000",
  "Pokiri": "https://cinejoy.pk/movie/23381-pokiri-2006",
  "Shakhahaari": "https://cinejoy.pk/movie/1230559-shakhahaari-2024",
  "Chandu Champion": "https://cinejoy.pk/movie/1020951-chandu-champion-2024",
  "The Tale of the Princess Kaguya": "https://cinejoy.pk/movie/149871-the-tale-of-the-princess-kaguya-2013",
  "Nobody Knows": "https://cinejoy.pk/movie/2517-nobody-knows-2004",
  "Dogville": "https://cinejoy.pk/movie/553-dogville-2003",
  "Solaris (1972)": "https://cinejoy.pk/movie/593-solaris-1972",
  "Mirror": "https://cinejoy.pk/movie/578385-mirror-1975",
  "Ivan's Childhood": "https://cinejoy.pk/movie/31442-ivans-childhood-1962",
  "Elite Squad": "https://cinejoy.pk/movie/7347-elite-squad-2007",
  "Elite Squad: The Enemy Within": "https://cinejoy.pk/movie/47931-elite-squad-the-enemy-within-2010",
  "Magnolia": "https://cinejoy.pk/movie/334-magnolia-1999",
  "Dog Day Afternoon": "https://cinejoy.pk/movie/968-dog-day-afternoon-1975",
  "Fail Safe": "https://cinejoy.pk/movie/31067-fail-safe-1964",
  "Sanjuro": "https://cinejoy.pk/movie/11712-sanjuro-1962",
  "Throne of Blood": "https://cinejoy.pk/movie/3777-throne-of-blood-1957",
  "Kagemusha": "https://cinejoy.pk/movie/11953-kagemusha-1980",
  "Winter Light": "https://cinejoy.pk/movie/29455-winter-light-1963",
  "The Virgin Spring": "https://cinejoy.pk/movie/11656-the-virgin-spring-1960",
  "Rome, Open City": "https://cinejoy.pk/movie/307-rome-open-city-1945",
  "La Strada": "https://cinejoy.pk/movie/405-la-strada-1954",
  "La Notte": "https://cinejoy.pk/movie/41050-la-notte-1961",
  "Fitzcarraldo": "https://cinejoy.pk/movie/9343-fitzcarraldo-1982",
  "A Short Film About Killing": "https://cinejoy.pk/movie/10754-a-short-film-about-killing-1988",
  "Nostalghia": "https://cinejoy.pk/movie/1394-nostalghia-1983",
  "The Cabinet of Dr. Caligari": "https://cinejoy.pk/movie/234-the-cabinet-of-dr-caligari-1920",
  "Jalsaghar": "https://cinejoy.pk/movie/822-jalsaghar-1958",
  "Elippathayam": "https://cinejoy.pk/movie/88093-elippathayam-1982",
  "Guppy": "https://cinejoy.pk/movie/411054-guppy-2016",
  "Joseph": "https://cinejoy.pk/movie/562326-joseph-2018",
  "Malik": "https://cinejoy.pk/movie/474960-malik-2021",
  "16 Vayathinile": "https://cinejoy.pk/movie/66332-16-vayathinile-1977",
  "Pizza": "https://cinejoy.pk/movie/139357-pizza-2012",
  "Madras": "https://cinejoy.pk/movie/280948-madras-2014",
  "Love Today": "https://cinejoy.pk/movie/1032627-love-today-2022",
  "Por Thozhil": "https://cinejoy.pk/movie/1115239-por-thozhil-2023",
  "Khaidi": "https://cinejoy.pk/movie/269834-khaidi-1983",
  "Leader": "https://cinejoy.pk/movie/1281122-leader-2010",
  "Manam": "https://cinejoy.pk/movie/253533-manam-2014",
  "Oopiri": "https://cinejoy.pk/movie/369925-oopiri-2016",
  "Brochevarevarura": "https://cinejoy.pk/movie/611754-brochevarevarura-2019",
  "The Disappearance of Haruhi Suzumiya": "https://cinejoy.pk/movie/36865-the-disappearance-of-haruhi-suzumiya-2010",
  "Evangelion: 3.0+1.0 Thrice Upon a Time": "https://cinejoy.pk/movie/283566-evangelion-30-10-thrice-upon-a-time-2021",
  "Project Hail Mary": "https://cinejoy.pk/movie/687163-project-hail-mary-2026",
  "The Nightmare Before Christmas": "https://cinejoy.pk/movie/9479-the-nightmare-before-christmas-1993",
  "The Invisible Guest": "https://cinejoy.pk/movie/411088-the-invisible-guest-2016",
  "Special 26": "https://cinejoy.pk/movie/165904-special-26-2013",
  "The Diving Bell and the Butterfly": "https://cinejoy.pk/movie/2013-the-diving-bell-and-the-butterfly-2007",
  "Departures": "https://cinejoy.pk/movie/16804-departures-2008",
  "Rosemary's Baby": "https://cinejoy.pk/movie/805-rosemarys-baby-1968",
  "Big Fish": "https://cinejoy.pk/movie/587-big-fish-2003",
  "Dallas Buyers Club": "https://cinejoy.pk/movie/152532-dallas-buyers-club-2013",
  "Roman Holiday": "https://cinejoy.pk/movie/804-roman-holiday-1953",
  "Sin City": "https://cinejoy.pk/movie/187-sin-city-2005",
  "Arrival": "https://cinejoy.pk/movie/329865-arrival-2016",
  "Avatar": "https://cinejoy.pk/movie/19995-avatar-2009",
  "The Holdovers": "https://cinejoy.pk/movie/840430-the-holdovers-2023",
  "Past Lives": "https://cinejoy.pk/movie/666277-past-lives-2023",
  "Iron Man": "https://cinejoy.pk/movie/1726-iron-man-2008",
  "Guardians of the Galaxy Vol. 3": "https://cinejoy.pk/movie/447365-guardians-of-the-galaxy-vol-3-2023",
  "Thor: Ragnarok": "https://cinejoy.pk/movie/284053-thor-ragnarok-2017",
  "X-Men: Days of Future Past": "https://cinejoy.pk/movie/127585-x-men-days-of-future-past-2014",
  "Zack Snyder's Justice League": "https://cinejoy.pk/movie/791373-zack-snyders-justice-league-2021",
  "Harry Potter and the Prisoner of Azkaban": "https://cinejoy.pk/movie/673-harry-potter-and-the-prisoner-of-azkaban-2004",
  "Edge of Tomorrow": "https://cinejoy.pk/movie/137113-edge-of-tomorrow-2014",
  "District 9": "https://cinejoy.pk/movie/17654-district-9-2009",
  "Children of Men": "https://cinejoy.pk/movie/9693-children-of-men-2006",
  "E.T. the Extra-Terrestrial": "https://cinejoy.pk/movie/601-et-the-extra-terrestrial-1982",
  "Knives Out": "https://cinejoy.pk/movie/546554-knives-out-2019",
  "Mulholland Drive": "https://cinejoy.pk/movie/1018-mulholland-drive-2001",
  "Mystic River": "https://cinejoy.pk/movie/322-mystic-river-2003",
  "Bohemian Rhapsody": "https://cinejoy.pk/movie/424694-bohemian-rhapsody-2018",
  "Shoplifters": "https://cinejoy.pk/movie/505192-shoplifters-2018",
  "Shrek": "https://cinejoy.pk/movie/808-shrek-2001",
  "Ghost in the Shell": "https://cinejoy.pk/movie/9323-ghost-in-the-shell-1995",
  "Shaun of the Dead": "https://cinejoy.pk/movie/747-shaun-of-the-dead-2004",
  "Titanic": "https://cinejoy.pk/movie/597-titanic-1997",
  "Before Midnight": "https://cinejoy.pk/movie/132344-before-midnight-2013",
  "Kal Ho Naa Ho": "https://cinejoy.pk/movie/4254-kal-ho-naa-ho-2003",
  "Jab We Met": "https://cinejoy.pk/movie/11807-jab-we-met-2007",
  "Ne Zha 2": "https://cinejoy.pk/movie/980477-ne-zha-2-2025",
  "Super 30": "https://cinejoy.pk/movie/534075-super-30-2019",
  "Gully Boy": "https://cinejoy.pk/movie/491625-gully-boy-2019",
  "Badhaai Ho": "https://cinejoy.pk/movie/547654-badhaai-ho-2018",
  "Dev.D": "https://cinejoy.pk/movie/15977-devd-2009",
  "My Name Is Khan": "https://cinejoy.pk/movie/26022-my-name-is-khan-2010",
  "Secret Superstar": "https://cinejoy.pk/movie/441889-secret-superstar-2017",
  "Uyare": "https://cinejoy.pk/movie/594712-uyare-2019",
  "The Searchers": "https://cinejoy.pk/movie/3114-the-searchers-1956",
  "A Fistful of Dollars": "https://cinejoy.pk/movie/391-a-fistful-of-dollars-1964",
  "Life of Pi": "https://cinejoy.pk/movie/87827-life-of-pi-2012",
  "Boyhood": "https://cinejoy.pk/movie/85350-boyhood-2014",
  "Crouching Tiger, Hidden Dragon": "https://cinejoy.pk/movie/146-crouching-tiger-hidden-dragon-2000",
  "Hero": "https://cinejoy.pk/movie/79-hero-2002",
  "Toy Story 2": "https://cinejoy.pk/movie/863-toy-story-2-1999",
  "Fantastic Mr. Fox": "https://cinejoy.pk/movie/10315-fantastic-mr-fox-2009",
  "Jojo Rabbit": "https://cinejoy.pk/movie/515001-jojo-rabbit-2019",
  "Shree 420": "https://cinejoy.pk/movie/48929-shree-420-1955",
  "Salaam Bombay!": "https://cinejoy.pk/movie/45129-salaam-bombay-1988",
  "Kabhi Haan Kabhi Naa": "https://cinejoy.pk/movie/15419-kabhi-haan-kabhi-naa-1994",
  "Border": "https://cinejoy.pk/movie/33125-border-1997",
  "Ankhon Dekhi": "https://cinejoy.pk/movie/241882-ankhon-dekhi-2013",
  "Mukkabaaz": "https://cinejoy.pk/movie/470641-mukkabaaz-2017",
  "Sonchiriya": "https://cinejoy.pk/movie/535144-sonchiriya-2019",
  "Bramayugam": "https://cinejoy.pk/movie/1166133-bramayugam-2024",
  "Killa": "https://cinejoy.pk/movie/284729-killa-2014",
  "About Elly": "https://cinejoy.pk/movie/37181-about-elly-2009",
  "Perfect Days": "https://cinejoy.pk/movie/976893-perfect-days-2023",
  "Monster (2023)": "https://cinejoy.pk/movie/1050035-monster-2023",
  "Memoir of a Snail": "https://cinejoy.pk/movie/1064486-memoir-of-a-snail-2024",
  "Jigarthanda DoubleX": "https://cinejoy.pk/movie/1007074-jigarthanda-doublex-2023",
  "A Taxi Driver": "https://cinejoy.pk/movie/437068-a-taxi-driver-2017",
  "Love Letter": "https://cinejoy.pk/movie/47002-love-letter-1995",
  "Like Father, Like Son": "https://cinejoy.pk/movie/177945-like-father-like-son-2013",
  "Still Walking": "https://cinejoy.pk/movie/25050-still-walking-2008",
  "Amour": "https://cinejoy.pk/movie/86837-amour-2012",
  "Dancer in the Dark": "https://cinejoy.pk/movie/16-dancer-in-the-dark-2000",
  "The Return (2003)": "https://cinejoy.pk/movie/11190-the-return-2003",
  "The Conformist": "https://cinejoy.pk/movie/8416-the-conformist-1970",
  "Nine Queens": "https://cinejoy.pk/movie/18079-nine-queens-2000",
  "Boogie Nights": "https://cinejoy.pk/movie/4995-boogie-nights-1997",
  "The Wrestler": "https://cinejoy.pk/movie/12163-the-wrestler-2008",
  "All the President's Men": "https://cinejoy.pk/movie/891-all-the-presidents-men-1976",
  "Carlito's Way": "https://cinejoy.pk/movie/6075-carlitos-way-1993",
  "Through a Glass Darkly": "https://cinejoy.pk/movie/11602-through-a-glass-darkly-1961",
  "Mad Max 2: The Road Warrior": "https://cinejoy.pk/movie/mad-max-2-the-road-warrior-1981",
  "Jambalakidi Pamba": "https://cinejoy.pk/movie/jambalakidi-pamba-1993",
  "Wolf Children": "https://cinejoy.pk/movie/wolf-children-2012",
  "La La Land": "https://cinejoy.pk/movie/la-la-land-2016",
  "Life of Brian": "https://cinejoy.pk/movie/life-of-brian-1979",
  "Nausicaa of the Valley of the Wind": "https://cinejoy.pk/movie/nausicaa-of-the-valley-of-the-wind-1984",
  "8 1/2": "https://cinejoy.pk/movie/8-1-2-1963",
  "Twelve Monkeys": "https://cinejoy.pk/movie/twelve-monkeys-1995",
  "Demon Slayer: Kimetsu no Yaiba - The Movie: Infinity Castle": "https://cinejoy.pk/movie/demon-slayer-kimetsu-no-yaiba-the-movie-infinity-castle-2025",
  "Kantara: Chapter 1": "https://cinejoy.pk/movie/kantara-chapter-1-2025",
  "Kill Bill: Vol. 2": "https://cinejoy.pk/movie/kill-bill-vol-2-2004",
  "Kaathal - The Core": "https://cinejoy.pk/movie/kaathal-the-core-2023",
  "Sapta Sagaradaache Ello - Side B": "https://cinejoy.pk/movie/sapta-sagaradaache-ello-side-b-2023",
  "Joy Baba Felunath": "https://cinejoy.pk/movie/joy-baba-felunath-1979",
  "Nenjathai Killathe": "https://cinejoy.pk/movie/nenjathai-killathe-1980",
  "Ayutha Ezhuthu": "https://cinejoy.pk/movie/ayutha-ezhuthu-2004",
  "Kizumonogatari III: Reiketsu": "https://cinejoy.pk/movie/kizumonogatari-iii-reiketsu-2017",
  "wings of Desire": "https://cinejoy.pk/movie/wings-of-desire-1987",
  "Kavaludaari": "https://cinejoy.pk/movie/kavaludaari-2019",
  "Cleo from 5 to 7": "https://cinejoy.pk/movie/cleo-from-5-to-7-1962",
  "Everything Everywhere All at Once": "https://cinejoy.pk/movie/545611-everything-everywhere-all-at-once-2022",
  "The Batman": "https://cinejoy.pk/movie/414906-the-batman-2022",
  "Barbie": "https://cinejoy.pk/movie/346698-barbie-2023",
  "Avatar: The Way of Water": "https://cinejoy.pk/movie/76600-avatar-the-way-of-water-2022",
  "Deadpool & Wolverine": "https://cinejoy.pk/movie/533535-deadpool-and-wolverine-2024",
  "Inside Out 2": "https://cinejoy.pk/movie/1022789-inside-out-2-2024",
  "Poor Things": "https://cinejoy.pk/movie/792307-poor-things-2023",
  "Anatomy of a Fall": "https://cinejoy.pk/movie/915935-anatomy-of-a-fall-2023",
  "The Zone of Interest": "https://cinejoy.pk/movie/467244-the-zone-of-interest-2023",
  "Killers of the Flower Moon": "https://cinejoy.pk/movie/466420-killers-of-the-flower-moon-2023",
  "RRR": "https://cinejoy.pk/movie/579974-rrr-2022",
  "The Brutalist": "https://cinejoy.pk/movie/549509-the-brutalist-2024",
  "Captain America: The Winter Soldier": "https://cinejoy.pk/movie/100402-captain-america-the-winter-soldier-2014",
  "Captain America: Civil War": "https://cinejoy.pk/movie/271110-captain-america-civil-war-2016",
  "Black Panther": "https://cinejoy.pk/movie/284054-black-panther-2018",
  "Doctor Strange": "https://cinejoy.pk/movie/284052-doctor-strange-2016",
  "Spider-Man: Homecoming": "https://cinejoy.pk/movie/315635-spider-man-homecoming-2017",
  "Man of Steel": "https://cinejoy.pk/movie/49521-man-of-steel-2013",
  "Wonder Woman": "https://cinejoy.pk/movie/297762-wonder-woman-2017",
  "The Suicide Squad": "https://cinejoy.pk/movie/436969-the-suicide-squad-2021",
  "Watchmen": "https://cinejoy.pk/movie/13183-watchmen-2009",
  "Spider-Man 2": "https://cinejoy.pk/movie/558-spider-man-2-2004",
  "Spider-Man": "https://cinejoy.pk/movie/557-spider-man-2002",
  "Harry Potter and the Chamber of Secrets": "https://cinejoy.pk/movie/672-harry-potter-and-the-chamber-of-secrets-2002",
  "Harry Potter and the Goblet of Fire": "https://cinejoy.pk/movie/674-harry-potter-and-the-goblet-of-fire-2005",
  "Harry Potter and the Order of the Phoenix": "https://cinejoy.pk/movie/675-harry-potter-and-the-order-of-the-phoenix-2007",
  "Harry Potter and the Half-Blood Prince": "https://cinejoy.pk/movie/767-harry-potter-and-the-half-blood-prince-2009",
  "The Hobbit: An Unexpected Journey": "https://cinejoy.pk/movie/49051-the-hobbit-an-unexpected-journey-2012",
  "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe": "https://cinejoy.pk/movie/411-the-chronicles-of-narnia-the-lion-the-witch-and-the-wardrobe-2005",
  "Fast & Furious 6": "https://cinejoy.pk/movie/82992-fast-and-furious-6-2013",
  "Furious 7": "https://cinejoy.pk/movie/168259-furious-7-2015",
  "The Fast and the Furious": "https://cinejoy.pk/movie/9799-the-fast-and-the-furious-2001",
  "Fast Five": "https://cinejoy.pk/movie/51497-fast-five-2011",
  "Transformers": "https://cinejoy.pk/movie/1858-transformers-2007",
  "Transformers: Dark of the Moon": "https://cinejoy.pk/movie/38356-transformers-dark-of-the-moon-2011",
  "Pirates of the Caribbean: Dead Man's Chest": "https://cinejoy.pk/movie/58-pirates-of-the-caribbean-dead-mans-chest-2006",
  "Pirates of the Caribbean: At World's End": "https://cinejoy.pk/movie/285-pirates-of-the-caribbean-at-worlds-end-2007",
  "Mission: Impossible": "https://cinejoy.pk/movie/954-mission-impossible-1996",
  "Skyfall": "https://cinejoy.pk/movie/37724-skyfall-2012",
  "No Time to Die": "https://cinejoy.pk/movie/370172-no-time-to-die-2021",
  "John Wick": "https://cinejoy.pk/movie/245891-john-wick-2014",
  "John Wick: Chapter 4": "https://cinejoy.pk/movie/603692-john-wick-chapter-4-2023",
  "John Wick: Chapter 2": "https://cinejoy.pk/movie/324552-john-wick-chapter-2-2017",
  "Twilight": "https://cinejoy.pk/movie/256153-twilight-2008",
  "The Twilight Saga: New Moon": "https://cinejoy.pk/movie/18239-the-twilight-saga-new-moon-2009",
  "The Twilight Saga: Eclipse": "https://cinejoy.pk/movie/24021-the-twilight-saga-eclipse-2010",
  "The Hunger Games": "https://cinejoy.pk/movie/70160-the-hunger-games-2012",
  "The Hunger Games: Catching Fire": "https://cinejoy.pk/movie/101299-the-hunger-games-catching-fire-2013",
  "The Maze Runner": "https://cinejoy.pk/movie/198663-the-maze-runner-2014",
  "Divergent": "https://cinejoy.pk/movie/157350-divergent-2014",
  "The Fault in Our Stars": "https://cinejoy.pk/movie/222935-the-fault-in-our-stars-2014",
  "Fifty Shades of Grey": "https://cinejoy.pk/movie/216015-fifty-shades-of-grey-2015",
  "Gravity": "https://cinejoy.pk/movie/49047-gravity-2013",
  "Ex Machina": "https://cinejoy.pk/movie/264660-ex-machina-2014",
  "Minority Report": "https://cinejoy.pk/movie/180-minority-report-2002",
  "Tenet": "https://cinejoy.pk/movie/577922-tenet-2020",
  "Close Encounters of the Third Kind": "https://cinejoy.pk/movie/840-close-encounters-of-the-third-kind-1977",
  "The Fifth Element": "https://cinejoy.pk/movie/18-the-fifth-element-1997",
  "Gattaca": "https://cinejoy.pk/movie/782-gattaca-1997",
  "Looper": "https://cinejoy.pk/movie/59967-looper-2012",
  "Source Code": "https://cinejoy.pk/movie/45612-source-code-2011",
  "Oblivion": "https://cinejoy.pk/movie/75612-oblivion-2013",
  "Dune (1984)": "https://cinejoy.pk/movie/841-dune-1984",
  "Starship Troopers": "https://cinejoy.pk/movie/563-starship-troopers-1997",
  "Alita: Battle Angel": "https://cinejoy.pk/movie/399579-alita-battle-angel-2019",
  "Tron: Legacy": "https://cinejoy.pk/movie/20526-tron-legacy-2010",
  "Get Out": "https://cinejoy.pk/movie/419430-get-out-2017",
  "Hereditary": "https://cinejoy.pk/movie/493922-hereditary-2018",
  "Midsommar": "https://cinejoy.pk/movie/530385-midsommar-2019",
  "The Conjuring": "https://cinejoy.pk/movie/138843-the-conjuring-2013",
  "The Conjuring 2": "https://cinejoy.pk/movie/259693-the-conjuring-2-2016",
  "A Quiet Place": "https://cinejoy.pk/movie/447332-a-quiet-place-2018",
  "Halloween": "https://cinejoy.pk/movie/948-halloween-1978",
  "A Nightmare on Elm Street": "https://cinejoy.pk/movie/377-a-nightmare-on-elm-street-1984",
  "Friday the 13th": "https://cinejoy.pk/movie/4488-friday-the-13th-1980",
  "Scream": "https://cinejoy.pk/movie/4232-scream-1996",
  "Scream (2022)": "https://cinejoy.pk/movie/646385-scream-2022",
  "Saw": "https://cinejoy.pk/movie/176-saw-2004",
  "Saw X": "https://cinejoy.pk/movie/951491-saw-x-2023",
  "Insidious": "https://cinejoy.pk/movie/49018-insidious-2010",
  "Sinister": "https://cinejoy.pk/movie/82507-sinister-2012",
  "It": "https://cinejoy.pk/movie/346364-it-2017",
  "The Ring": "https://cinejoy.pk/movie/565-the-ring-2002",
  "The Blair Witch Project": "https://cinejoy.pk/movie/2667-the-blair-witch-project-1999",
  "Paranormal Activity": "https://cinejoy.pk/movie/23827-paranormal-activity-2007",
  "Train to Busan": "https://cinejoy.pk/movie/396535-train-to-busan-2016",
  "The Cabin in the Woods": "https://cinejoy.pk/movie/22970-the-cabin-in-the-woods-2011",
  "Talk to Me": "https://cinejoy.pk/movie/1008042-talk-to-me-2022",
  "Barbarian": "https://cinejoy.pk/movie/913290-barbarian-2022",
  "The Babadook": "https://cinejoy.pk/movie/242224-the-babadook-2014",
  "28 Days Later": "https://cinejoy.pk/movie/170-28-days-later-2002",
  "Glass Onion: A Knives Out Mystery": "https://cinejoy.pk/movie/661374-glass-onion-a-knives-out-mystery-2022",
  "Zodiac": "https://cinejoy.pk/movie/1949-zodiac-2007",
  "Nightcrawler": "https://cinejoy.pk/movie/242582-nightcrawler-2014",
  "Sicario": "https://cinejoy.pk/movie/273481-sicario-2015",
  "Drive": "https://cinejoy.pk/movie/64690-drive-2011",
  "Baby Driver": "https://cinejoy.pk/movie/339403-baby-driver-2017",
  "Ocean's Eleven": "https://cinejoy.pk/movie/161-oceans-eleven-2001",
  "Ocean's Twelve": "https://cinejoy.pk/movie/163-oceans-twelve-2004",
  "American Psycho": "https://cinejoy.pk/movie/1359-american-psycho-2000",
  "Collateral": "https://cinejoy.pk/movie/1538-collateral-2004",
  "Primal Fear": "https://cinejoy.pk/movie/1592-primal-fear-1996",
  "The Game": "https://cinejoy.pk/movie/2649-the-game-1997",
  "Wind River": "https://cinejoy.pk/movie/395834-wind-river-2017",
  "Nightmare Alley": "https://cinejoy.pk/movie/597208-nightmare-alley-2021",
  "Speed": "https://cinejoy.pk/movie/1637-speed-1994",
  "The Rock": "https://cinejoy.pk/movie/9802-the-rock-1996",
  "Face/Off": "https://cinejoy.pk/movie/754-face-off-1997",
  "Con Air": "https://cinejoy.pk/movie/1701-con-air-1997",
  "Independence Day": "https://cinejoy.pk/movie/602-independence-day-1996",
  "Armageddon": "https://cinejoy.pk/movie/95-armageddon-1998",
  "Twister": "https://cinejoy.pk/movie/664-twister-1996",
  "The Day After Tomorrow": "https://cinejoy.pk/movie/435-the-day-after-tomorrow-2004",
  "World War Z": "https://cinejoy.pk/movie/72190-world-war-z-2013",
  "I Am Legend": "https://cinejoy.pk/movie/6479-i-am-legend-2007",
  "Men in Black": "https://cinejoy.pk/movie/607-men-in-black-1997",
  "Men in Black II": "https://cinejoy.pk/movie/608-men-in-black-ii-2002",
  "National Treasure": "https://cinejoy.pk/movie/2059-national-treasure-2004",
  "Lara Croft: Tomb Raider": "https://cinejoy.pk/movie/1995-lara-croft-tomb-raider-2001",
  "The Mummy": "https://cinejoy.pk/movie/564-the-mummy-1999",
  "The Mummy Returns": "https://cinejoy.pk/movie/1734-the-mummy-returns-2001",
  "King Kong": "https://cinejoy.pk/movie/254-king-kong-2005",
  "Godzilla": "https://cinejoy.pk/movie/124905-godzilla-2014",
  "Dunkirk": "https://cinejoy.pk/movie/374720-dunkirk-2017",
  "All Quiet on the Western Front": "https://cinejoy.pk/movie/49046-all-quiet-on-the-western-front-2022",
  "Black Hawk Down": "https://cinejoy.pk/movie/855-black-hawk-down-2001",
  "Letters from Iwo Jima": "https://cinejoy.pk/movie/1251-letters-from-iwo-jima-2006",
  "Flags of Our Fathers": "https://cinejoy.pk/movie/3683-flags-of-our-fathers-2006",
  "Fury": "https://cinejoy.pk/movie/228150-fury-2014",
  "The Last Samurai": "https://cinejoy.pk/movie/616-the-last-samurai-2003",
  "Kingdom of Heaven": "https://cinejoy.pk/movie/1495-kingdom-of-heaven-2005",
  "Troy": "https://cinejoy.pk/movie/652-troy-2004",
  "Apocalypto": "https://cinejoy.pk/movie/1579-apocalypto-2006",
  "The Social Network": "https://cinejoy.pk/movie/37799-the-social-network-2010",
  "Rocketman": "https://cinejoy.pk/movie/504608-rocketman-2019",
  "Elvis": "https://cinejoy.pk/movie/614934-elvis-2022",
  "The Theory of Everything": "https://cinejoy.pk/movie/266856-the-theory-of-everything-2014",
  "A Star Is Born": "https://cinejoy.pk/movie/332562-a-star-is-born-2018",
  "Cast Away": "https://cinejoy.pk/movie/8358-cast-away-2000",
  "The Terminal": "https://cinejoy.pk/movie/594-the-terminal-2004",
  "Seven Pounds": "https://cinejoy.pk/movie/11321-seven-pounds-2008",
  "Roma": "https://cinejoy.pk/movie/426426-roma-2018",
  "Drive My Car": "https://cinejoy.pk/movie/758866-drive-my-car-2021",
  "Ghajini": "https://cinejoy.pk/movie/14070-ghajini-2008",
  "Incredibles 2": "https://cinejoy.pk/movie/260513-incredibles-2-2018",
  "Moana": "https://cinejoy.pk/movie/277834-moana-2016",
  "Frozen": "https://cinejoy.pk/movie/109445-frozen-2013",
  "Tangled": "https://cinejoy.pk/movie/38757-tangled-2010",
  "Shrek 2": "https://cinejoy.pk/movie/809-shrek-2-2004",
  "Puss in Boots: The Last Wish": "https://cinejoy.pk/movie/315162-puss-in-boots-the-last-wish-2022",
  "Kung Fu Panda": "https://cinejoy.pk/movie/9502-kung-fu-panda-2008",
  "Kung Fu Panda 2": "https://cinejoy.pk/movie/49444-kung-fu-panda-2-2011",
  "Despicable Me": "https://cinejoy.pk/movie/20352-despicable-me-2010",
  "Minions": "https://cinejoy.pk/movie/211672-minions-2015",
  "The Super Mario Bros. Movie": "https://cinejoy.pk/movie/502356-the-super-mario-bros-movie-2023",
  "Suzume": "https://cinejoy.pk/movie/916224-suzume-2022",
  "Weathering with You": "https://cinejoy.pk/movie/568160-weathering-with-you-2019",
  "The Boy and the Heron": "https://cinejoy.pk/movie/508883-the-boy-and-the-heron-2023",
  "Kiki's Delivery Service": "https://cinejoy.pk/movie/16859-kikis-delivery-service-1989",
  "Superbad": "https://cinejoy.pk/movie/8363-superbad-2007",
  "Step Brothers": "https://cinejoy.pk/movie/12133-step-brothers-2008",
  "Anchorman: The Legend of Ron Burgundy": "https://cinejoy.pk/movie/8699-anchorman-the-legend-of-ron-burgundy-2004",
  "The Hangover": "https://cinejoy.pk/movie/18785-the-hangover-2009",
  "The Hangover Part II": "https://cinejoy.pk/movie/45243-the-hangover-part-ii-2011",
  "Hot Fuzz": "https://cinejoy.pk/movie/4638-hot-fuzz-2007",
  "The World's End": "https://cinejoy.pk/movie/107985-the-worlds-end-2013",
  "Zombieland": "https://cinejoy.pk/movie/19908-zombieland-2009",
  "21 Jump Street": "https://cinejoy.pk/movie/64688-21-jump-street-2012",
  "22 Jump Street": "https://cinejoy.pk/movie/187017-22-jump-street-2014",
  "Tropic Thunder": "https://cinejoy.pk/movie/7446-tropic-thunder-2008",
  "Dumb and Dumber": "https://cinejoy.pk/movie/8467-dumb-and-dumber-1994",
  "The Mask": "https://cinejoy.pk/movie/854-the-mask-1994",
  "Ace Ventura: Pet Detective": "https://cinejoy.pk/movie/3049-ace-ventura-pet-detective-1994",
  "Bruce Almighty": "https://cinejoy.pk/movie/310-bruce-almighty-2003",
  "Liar Liar": "https://cinejoy.pk/movie/1624-liar-liar-1997",
  "School of Rock": "https://cinejoy.pk/movie/1584-school-of-rock-2003",
  "Mean Girls": "https://cinejoy.pk/movie/10625-mean-girls-2004",
  "Clueless": "https://cinejoy.pk/movie/9603-clueless-1995",
  "Legally Blonde": "https://cinejoy.pk/movie/8835-legally-blonde-2001",
  "Ferris Bueller's Day Off": "https://cinejoy.pk/movie/9377-ferris-buellers-day-off-1986",
  "The Breakfast Club": "https://cinejoy.pk/movie/2108-the-breakfast-club-1985",
  "Home Alone": "https://cinejoy.pk/movie/771-home-alone-1990",
  "Home Alone 2: Lost in New York": "https://cinejoy.pk/movie/772-home-alone-2-lost-in-new-york-1992",
  "Ghostbusters": "https://cinejoy.pk/movie/620-ghostbusters-1984",
  "The Notebook": "https://cinejoy.pk/movie/11036-the-notebook-2004",
  "Pride & Prejudice": "https://cinejoy.pk/movie/4348-pride-and-prejudice-2005",
  "About Time": "https://cinejoy.pk/movie/122906-about-time-2013",
  "Crazy Rich Asians": "https://cinejoy.pk/movie/455207-crazy-rich-asians-2018",
  "Notting Hill": "https://cinejoy.pk/movie/509-notting-hill-1999",
  "Love Actually": "https://cinejoy.pk/movie/508-love-actually-2003",
  "10 Things I Hate About You": "https://cinejoy.pk/movie/4951-10-things-i-hate-about-you-1999",
  "Pretty Woman": "https://cinejoy.pk/movie/114-pretty-woman-1990",
  "Jerry Maguire": "https://cinejoy.pk/movie/9390-jerry-maguire-1996",
  "Brokeback Mountain": "https://cinejoy.pk/movie/142-brokeback-mountain-2005",
  "Call Me by Your Name": "https://cinejoy.pk/movie/398818-call-me-by-your-name-2017",
  "Yeh Jawaani Hai Deewani": "https://cinejoy.pk/movie/185008-yeh-jawaani-hai-deewani-2013",
  "Wicked": "https://cinejoy.pk/movie/402431-wicked-2024",
  "Moana 2": "https://cinejoy.pk/movie/1241982-moana-2-2024",
  "Mufasa: The Lion King": "https://cinejoy.pk/movie/762509-mufasa-the-lion-king-2024",
  "Gladiator II": "https://cinejoy.pk/movie/558449-gladiator-ii-2024",
  "Joker: Folie à Deux": "https://cinejoy.pk/movie/889737-joker-folie-deux-2024",
  "Venom: The Last Dance": "https://cinejoy.pk/movie/912649-venom-the-last-dance-2024",
  "Alien: Romulus": "https://cinejoy.pk/movie/945961-alien-romulus-2024",
  "Furiosa: A Mad Max Saga": "https://cinejoy.pk/movie/786892-furiosa-a-mad-max-saga-2024",
  "Kingdom of the Planet of the Apes": "https://cinejoy.pk/movie/653346-kingdom-of-the-planet-of-the-apes-2024",
  "Godzilla x Kong: The New Empire": "https://cinejoy.pk/movie/823464-godzilla-x-kong-the-new-empire-2024",
  "Bad Boys: Ride or Die": "https://cinejoy.pk/movie/573435-bad-boys-ride-or-die-2024",
  "Twisters": "https://cinejoy.pk/movie/718821-twisters-2024",
  "A Quiet Place: Day One": "https://cinejoy.pk/movie/762441-a-quiet-place-day-one-2024",
  "Despicable Me 4": "https://cinejoy.pk/movie/519182-despicable-me-4-2024",
  "Nosferatu": "https://cinejoy.pk/movie/426063-nosferatu-2024",
  "The Substance": "https://cinejoy.pk/movie/933260-the-substance-2024",
  "Anora": "https://cinejoy.pk/movie/1064213-anora-2024",
  "Conclave": "https://cinejoy.pk/movie/974576-conclave-2024",
  "A Complete Unknown": "https://cinejoy.pk/movie/661539-a-complete-unknown-2024",
  "Challengers": "https://cinejoy.pk/movie/937287-challengers-2024",
  "Civil War": "https://cinejoy.pk/movie/929590-civil-war-2024",
  "Longlegs": "https://cinejoy.pk/movie/1226578-longlegs-2024",
  "Beetlejuice Beetlejuice": "https://cinejoy.pk/movie/917496-beetlejuice-beetlejuice-2024",
  "Sonic the Hedgehog 3": "https://cinejoy.pk/movie/939243-sonic-the-hedgehog-3-2024",
  "Captain America: Brave New World": "https://cinejoy.pk/movie/822119-captain-america-brave-new-world-2025",
  "Thunderbolts*": "https://cinejoy.pk/movie/986056-thunderbolts-2025",
  "Sinners": "https://cinejoy.pk/movie/1233413-sinners-2025",
  "A Minecraft Movie": "https://cinejoy.pk/movie/950387-a-minecraft-movie-2025",
  "Lilo & Stitch": "https://cinejoy.pk/movie/552524-lilo-and-stitch-2025",
  "Jurassic World Rebirth": "https://cinejoy.pk/movie/1234821-jurassic-world-rebirth-2025",
  "Superman": "https://cinejoy.pk/movie/1061474-superman-2025",
  "The Fantastic Four: First Steps": "https://cinejoy.pk/movie/617126-the-fantastic-four-first-steps-2025",
  "Weapons": "https://cinejoy.pk/movie/1078605-weapons-2025",
  "Zootopia 2": "https://cinejoy.pk/movie/1084242-zootopia-2-2025",
  "Wicked: For Good": "https://cinejoy.pk/movie/967941-wicked-for-good-2025",
  "Avatar: Fire and Ash": "https://cinejoy.pk/movie/83533-avatar-fire-and-ash-2025",
  "KPop Demon Hunters": "https://cinejoy.pk/movie/803796-kpop-demon-hunters-2025",
  "Bugonia": "https://cinejoy.pk/movie/701387-bugonia-2025",
  "Frankenstein": "https://cinejoy.pk/movie/1062722-frankenstein-2025",
  "The Running Man": "https://cinejoy.pk/movie/798645-the-running-man-2025",
  "Predator: Badlands": "https://cinejoy.pk/movie/1242898-predator-badlands-2025",
  "Tron: Ares": "https://cinejoy.pk/movie/533533-tron-ares-2025",
  "28 Years Later": "https://cinejoy.pk/movie/1100988-28-years-later-2025",
  "Companion": "https://cinejoy.pk/movie/1084199-companion-2025",
  "Mickey 17": "https://cinejoy.pk/movie/696506-mickey-17-2025",
  "Novocaine": "https://cinejoy.pk/movie/1195506-novocaine-2025",
  "The Accountant 2": "https://cinejoy.pk/movie/870028-the-accountant-2-2025",
  "Final Destination Bloodlines": "https://cinejoy.pk/movie/574475-final-destination-bloodlines-2025",
  "Ballerina": "https://cinejoy.pk/movie/541671-ballerina-2025",
  "Materialists": "https://cinejoy.pk/movie/1136867-materialists-2025",
  "Eddington": "https://cinejoy.pk/movie/648878-eddington-2025",
  "Heads of State": "https://cinejoy.pk/movie/749170-heads-of-state-2025",
  "Elio": "https://cinejoy.pk/movie/1022787-elio-2025",
  "Smurfs": "https://cinejoy.pk/movie/936108-smurfs-2025",
  "The Naked Gun": "https://cinejoy.pk/movie/1035259-the-naked-gun-2025",
  "Freakier Friday": "https://cinejoy.pk/movie/1125257-freakier-friday-2025",
  "The Conjuring: Last Rites": "https://cinejoy.pk/movie/1038392-the-conjuring-last-rites-2025",
  "Black Phone 2": "https://cinejoy.pk/movie/1197137-black-phone-2-2025",
  "Doctor Strange in the Multiverse of Madness": "https://cinejoy.pk/movie/453395-doctor-strange-in-the-multiverse-of-madness-2022",
  "Black Panther: Wakanda Forever": "https://cinejoy.pk/movie/505642-black-panther-wakanda-forever-2022",
  "Thor: Love and Thunder": "https://cinejoy.pk/movie/616037-thor-love-and-thunder-2022",
  "Eternals": "https://cinejoy.pk/movie/524434-eternals-2021",
  "Shang-Chi and the Legend of the Ten Rings": "https://cinejoy.pk/movie/566525-shang-chi-and-the-legend-of-the-ten-rings-2021",
  "Black Widow": "https://cinejoy.pk/movie/497698-black-widow-2021",
  "Ant-Man and the Wasp: Quantumania": "https://cinejoy.pk/movie/640146-ant-man-and-the-wasp-quantumania-2023",
  "The Marvels": "https://cinejoy.pk/movie/609681-the-marvels-2023",
  "The Flash": "https://cinejoy.pk/movie/298618-the-flash-2023",
  "Aquaman and the Lost Kingdom": "https://cinejoy.pk/movie/572802-aquaman-and-the-lost-kingdom-2023",
  "Shazam! Fury of the Gods": "https://cinejoy.pk/movie/594767-shazam-fury-of-the-gods-2023",
  "Blue Beetle": "https://cinejoy.pk/movie/565770-blue-beetle-2023",
  "Black Adam": "https://cinejoy.pk/movie/436270-black-adam-2022",
  "Nope": "https://cinejoy.pk/movie/762504-nope-2022",
  "Us": "https://cinejoy.pk/movie/458723-us-2019",
  "Smile": "https://cinejoy.pk/movie/882598-smile-2022",
  "M3GAN": "https://cinejoy.pk/movie/536554-m3gan-2022",
  "Scream VI": "https://cinejoy.pk/movie/934433-scream-vi-2023",
  "Evil Dead Rise": "https://cinejoy.pk/movie/713704-evil-dead-rise-2023",
  "Insidious: The Red Door": "https://cinejoy.pk/movie/614479-insidious-the-red-door-2023",
  "Five Nights at Freddy's": "https://cinejoy.pk/movie/507089-five-nights-at-freddys-2023",
  "The Nun II": "https://cinejoy.pk/movie/968051-the-nun-ii-2023",
  "Knock at the Cabin": "https://cinejoy.pk/movie/631842-knock-at-the-cabin-2023",
  "Napoleon": "https://cinejoy.pk/movie/753342-napoleon-2023",
  "Maestro": "https://cinejoy.pk/movie/523607-maestro-2023",
  "The Whale": "https://cinejoy.pk/movie/785084-the-whale-2022",
  "The Banshees of Inisherin": "https://cinejoy.pk/movie/674324-the-banshees-of-inisherin-2022",
  "Tár": "https://cinejoy.pk/movie/817758-t-r-2022",
  "The Fabelmans": "https://cinejoy.pk/movie/804095-the-fabelmans-2022",
  "Triangle of Sadness": "https://cinejoy.pk/movie/497828-triangle-of-sadness-2022",
  "The Menu": "https://cinejoy.pk/movie/593643-the-menu-2022",
  "Bullet Train": "https://cinejoy.pk/movie/718930-bullet-train-2022",
  "Don't Look Up": "https://cinejoy.pk/movie/646380-dont-look-up-2021",
  "The Power of the Dog": "https://cinejoy.pk/movie/600583-the-power-of-the-dog-2021",
  "Belfast": "https://cinejoy.pk/movie/777270-belfast-2021",
  "Nomadland": "https://cinejoy.pk/movie/581734-nomadland-2020",
  "Minari": "https://cinejoy.pk/movie/615643-minari-2020",
  "Promising Young Woman": "https://cinejoy.pk/movie/582014-promising-young-woman-2020",
  "Sound of Metal": "https://cinejoy.pk/movie/502033-sound-of-metal-2019",
  "Encanto": "https://cinejoy.pk/movie/568124-encanto-2021",
  "Luca": "https://cinejoy.pk/movie/508943-luca-2021",
  "Turning Red": "https://cinejoy.pk/movie/508947-turning-red-2022",
  "Lightyear": "https://cinejoy.pk/movie/718789-lightyear-2022",
  "Strange World": "https://cinejoy.pk/movie/877269-strange-world-2022",
  "Wish": "https://cinejoy.pk/movie/1022796-wish-2023",
  "Elemental": "https://cinejoy.pk/movie/976573-elemental-2023",
  "Nimona": "https://cinejoy.pk/movie/961323-nimona-2023",
  "Jujutsu Kaisen 0": "https://cinejoy.pk/movie/810693-jujutsu-kaisen-0-2021",
  "One Piece Film: Red": "https://cinejoy.pk/movie/900667-one-piece-film-red-2022",
  "Dragon Ball Super: Super Hero": "https://cinejoy.pk/movie/610150-dragon-ball-super-super-hero-2022",
  "Fast X": "https://cinejoy.pk/movie/385687-fast-x-2023",
  "Indiana Jones and the Dial of Destiny": "https://cinejoy.pk/movie/335977-indiana-jones-and-the-dial-of-destiny-2023",
  "The Creator": "https://cinejoy.pk/movie/670292-the-creator-2023",
  "Ghostbusters: Frozen Empire": "https://cinejoy.pk/movie/967847-ghostbusters-frozen-empire-2024",
  "Ghostbusters: Afterlife": "https://cinejoy.pk/movie/425909-ghostbusters-afterlife-2021",
  "Free Guy": "https://cinejoy.pk/movie/550988-free-guy-2021",
  "The Gray Man": "https://cinejoy.pk/movie/725201-the-gray-man-2022",
  "Red Notice": "https://cinejoy.pk/movie/512195-red-notice-2021",
  "Extraction": "https://cinejoy.pk/movie/545609-extraction-2020",
  "Extraction 2": "https://cinejoy.pk/movie/697843-extraction-2-2023",
  "Air": "https://cinejoy.pk/movie/964980-air-2023",
  "Ferrari": "https://cinejoy.pk/movie/365620-ferrari-2023",
  "Saltburn": "https://cinejoy.pk/movie/930564-saltburn-2023",
  "Society of the Snow": "https://cinejoy.pk/movie/906126-society-of-the-snow-2023",
  "The Iron Claw": "https://cinejoy.pk/movie/850165-the-iron-claw-2023",
  "May December": "https://cinejoy.pk/movie/839369-may-december-2023",
  "American Fiction": "https://cinejoy.pk/movie/1056360-american-fiction-2023",
  "Wonka": "https://cinejoy.pk/movie/787699-wonka-2023",
  "Migration": "https://cinejoy.pk/movie/940551-migration-2023",
  "Trolls Band Together": "https://cinejoy.pk/movie/901362-trolls-band-together-2023",
  "Pushpa: The Rise": "https://cinejoy.pk/movie/690957-pushpa-the-rise-2021",
  "Pushpa 2: The Rule": "https://cinejoy.pk/movie/857598-pushpa-2-the-rule-2024",
  "Kalki 2898 AD": "https://cinejoy.pk/movie/801688-kalki-2898-ad-2024",
  "Jawan": "https://cinejoy.pk/movie/872906-jawan-2023",
  "Pathaan": "https://cinejoy.pk/movie/864692-pathaan-2023",
  "Animal": "https://cinejoy.pk/movie/781732-animal-2023",
  "Dunki": "https://cinejoy.pk/movie/960876-dunki-2023",
  "Tiger 3": "https://cinejoy.pk/movie/720557-tiger-3-2023",
  "Gadar 2": "https://cinejoy.pk/movie/885331-gadar-2-2023",
  "Chhaava": "https://cinejoy.pk/movie/1196943-chhaava-2025",
  "Saiyaara": "https://cinejoy.pk/movie/1241634-saiyaara-2025",
  "Leo": "https://cinejoy.pk/movie/949229-leo-2023",
  "Jailer": "https://cinejoy.pk/movie/937020-jailer-2023",
  "Master": "https://cinejoy.pk/movie/626392-master-2021",
  "Premalu": "https://cinejoy.pk/movie/1149791-premalu-2024",
  "Aavesham": "https://cinejoy.pk/movie/1084812-aavesham-2024",
  "Stree 2": "https://cinejoy.pk/movie/1112426-stree-2-2024",
  "Stree": "https://cinejoy.pk/movie/533991-stree-2018",
  "Bhool Bhulaiyaa 3": "https://cinejoy.pk/movie/980599-bhool-bhulaiyaa-3-2024",
  "Singham Again": "https://cinejoy.pk/movie/1014214-singham-again-2024",
  "Kill": "https://cinejoy.pk/movie/1160018-kill-2024",
  "Crew": "https://cinejoy.pk/movie/1045931-crew-2024",
  "Munjya": "https://cinejoy.pk/movie/1187058-munjya-2024",
  "Article 370": "https://cinejoy.pk/movie/1233531-article-370-2024",
  "Fighter": "https://cinejoy.pk/movie/784651-fighter-2024",
  "Sam Bahadur": "https://cinejoy.pk/movie/814215-sam-bahadur-2023",
  "Kabir Singh": "https://cinejoy.pk/movie/577328-kabir-singh-2019",
  "War": "https://cinejoy.pk/movie/585268-war-2019",
  "Raazi": "https://cinejoy.pk/movie/491629-raazi-2018",
  "Sanju": "https://cinejoy.pk/movie/496328-sanju-2018",
  "Padmaavat": "https://cinejoy.pk/movie/432527-padmaavat-2018",
  "Mother India": "https://cinejoy.pk/movie/917-mother-india-1957",
  "Kuch Kuch Hota Hai": "https://cinejoy.pk/movie/11854-kuch-kuch-hota-hai-1998",
  "Devdas": "https://cinejoy.pk/movie/15917-devdas-2002",
  "Veer-Zaara": "https://cinejoy.pk/movie/4251-veer-zaara-2004",
  "Om Shanti Om": "https://cinejoy.pk/movie/8079-om-shanti-om-2007",
  "Dabangg": "https://cinejoy.pk/movie/44425-dabangg-2010",
  "Chennai Express": "https://cinejoy.pk/movie/205022-chennai-express-2013",
  "Dhoom 3": "https://cinejoy.pk/movie/44977-dhoom-3-2013",
  "Highway": "https://cinejoy.pk/movie/252841-highway-2014",
  "Bajirao Mastani": "https://cinejoy.pk/movie/362045-bajirao-mastani-2015",
  "Piku": "https://cinejoy.pk/movie/332835-piku-2015",
  "Dil Dhadakne Do": "https://cinejoy.pk/movie/338065-dil-dhadakne-do-2015",
  "Sultan": "https://cinejoy.pk/movie/376812-sultan-2016",
  "Udta Punjab": "https://cinejoy.pk/movie/398535-udta-punjab-2016",
  "Neerja": "https://cinejoy.pk/movie/376869-neerja-2016",
  "Ae Dil Hai Mushkil": "https://cinejoy.pk/movie/393445-ae-dil-hai-mushkil-2016",
  "Newton": "https://cinejoy.pk/movie/439128-newton-2017",
  "Tiger Zinda Hai": "https://cinejoy.pk/movie/441909-tiger-zinda-hai-2017",
  "October": "https://cinejoy.pk/movie/496527-october-2018",
  "Tanhaji": "https://cinejoy.pk/movie/584850-tanhaji-2020",
  "Gangubai Kathiawadi": "https://cinejoy.pk/movie/664332-gangubai-kathiawadi-2022",
  "Bhediya": "https://cinejoy.pk/movie/799177-bhediya-2022",
  "Jallikattu": "https://cinejoy.pk/movie/244997-jallikattu-2019",
  "Ee.Ma.Yau": "https://cinejoy.pk/movie/490078-eemayau-2018",
  "Angamaly Diaries": "https://cinejoy.pk/movie/442000-angamaly-diaries-2017",
  "Enthiran": "https://cinejoy.pk/movie/148284-enthiran-2010",
  "2.0": "https://cinejoy.pk/movie/373449-20-2018",
  "Ponniyin Selvan: I": "https://cinejoy.pk/movie/660046-ponniyin-selvan-i-2022",
  "Ponniyin Selvan: II": "https://cinejoy.pk/movie/858082-ponniyin-selvan-ii-2023",
  "Eega": "https://cinejoy.pk/movie/148265-eega-2012",
  "Magadheera": "https://cinejoy.pk/movie/23790-magadheera-2009",
  "Bharat Ane Nenu": "https://cinejoy.pk/movie/501987-bharat-ane-nenu-2018",
  "Dasara": "https://cinejoy.pk/movie/885184-dasara-2023",
  "Hi Nanna": "https://cinejoy.pk/movie/1068452-hi-nanna-2023",
  "Devara: Part 1": "https://cinejoy.pk/movie/811941-devara-part-1-2024",
  "Game Changer": "https://cinejoy.pk/movie/811944-game-changer-2025",
  "Coolie": "https://cinejoy.pk/movie/1153399-coolie-2025",
  "Retro": "https://cinejoy.pk/movie/1265827-retro-2025",
  "Good Bad Ugly": "https://cinejoy.pk/movie/1259024-good-bad-ugly-2025",
  "Lokah Chapter 1: Chandra": "https://cinejoy.pk/movie/1290190-lokah-chapter-1-chandra-2025",
  "L2: Empuraan": "https://cinejoy.pk/movie/627336-l2-empuraan-2025",
  "Jurassic Park III": "https://cinejoy.pk/movie/331-jurassic-park-iii-2001",
  "Jurassic World": "https://cinejoy.pk/movie/135397-jurassic-world-2015",
  "Jurassic World: Fallen Kingdom": "https://cinejoy.pk/movie/351286-jurassic-world-fallen-kingdom-2018",
  "Jurassic World Dominion": "https://cinejoy.pk/movie/507086-jurassic-world-dominion-2022",
  "Rogue One: A Star Wars Story": "https://cinejoy.pk/movie/330459-rogue-one-a-star-wars-story-2016",
  "Solo: A Star Wars Story": "https://cinejoy.pk/movie/348350-solo-a-star-wars-story-2018",
  "Back to the Future Part II": "https://cinejoy.pk/movie/165-back-to-the-future-part-ii-1989",
  "Back to the Future Part III": "https://cinejoy.pk/movie/196-back-to-the-future-part-iii-1990",
  "Terminator Genisys": "https://cinejoy.pk/movie/87101-terminator-genisys-2015",
  "RoboCop": "https://cinejoy.pk/movie/5548-robocop-1987",
  "Total Recall": "https://cinejoy.pk/movie/861-total-recall-1990",
  "Predator": "https://cinejoy.pk/movie/106-predator-1987",
  "Die Hard 2": "https://cinejoy.pk/movie/1573-die-hard-2-1990",
  "Die Hard with a Vengeance": "https://cinejoy.pk/movie/1572-die-hard-with-a-vengeance-1995",
  "Lethal Weapon": "https://cinejoy.pk/movie/941-lethal-weapon-1987",
  "Rocky II": "https://cinejoy.pk/movie/1367-rocky-ii-1979",
  "Creed": "https://cinejoy.pk/movie/312221-creed-2015",
  "Creed II": "https://cinejoy.pk/movie/480530-creed-ii-2018",
  "Creed III": "https://cinejoy.pk/movie/677179-creed-iii-2023",
  "Gangs of New York": "https://cinejoy.pk/movie/3131-gangs-of-new-york-2002",
  "Once Upon a Time in Hollywood": "https://cinejoy.pk/movie/466272-once-upon-a-time-in-hollywood-2019",
  "Jackie Brown": "https://cinejoy.pk/movie/184-jackie-brown-1997",
  "Death Proof": "https://cinejoy.pk/movie/1991-death-proof-2007",
  "The Hateful Eight": "https://cinejoy.pk/movie/273248-the-hateful-eight-2015",
  "O Brother, Where Art Thou?": "https://cinejoy.pk/movie/134-o-brother-where-art-thou-2000",
  "True Grit": "https://cinejoy.pk/movie/44264-true-grit-2010",
  "Tombstone": "https://cinejoy.pk/movie/11969-tombstone-1993",
  "High Noon": "https://cinejoy.pk/movie/288-high-noon-1952",
  "American Sniper": "https://cinejoy.pk/movie/190859-american-sniper-2014",
  "Sully": "https://cinejoy.pk/movie/363676-sully-2016",
  "The Mule": "https://cinejoy.pk/movie/504172-the-mule-2018",
  "Cry Macho": "https://cinejoy.pk/movie/749274-cry-macho-2021",
  "Hannibal": "https://cinejoy.pk/movie/9740-hannibal-2001",
  "Red Dragon": "https://cinejoy.pk/movie/9533-red-dragon-2002",
  "Insomnia": "https://cinejoy.pk/movie/320-insomnia-2002",
  "Following": "https://cinejoy.pk/movie/11660-following-1998",
  "The King of Comedy": "https://cinejoy.pk/movie/262-the-king-of-comedy-1982",
  "The Thin Red Line": "https://cinejoy.pk/movie/8741-the-thin-red-line-1998",
  "A Few Good Men": "https://cinejoy.pk/movie/881-a-few-good-men-1992",
  "The Firm": "https://cinejoy.pk/movie/37233-the-firm-1993",
  "The Aviator": "https://cinejoy.pk/movie/2567-the-aviator-2004",
  "Seabiscuit": "https://cinejoy.pk/movie/4464-seabiscuit-2003",
  "Remember the Titans": "https://cinejoy.pk/movie/10637-remember-the-titans-2000",
  "Moneyball": "https://cinejoy.pk/movie/60308-moneyball-2011",
  "The Blind Side": "https://cinejoy.pk/movie/22881-the-blind-side-2009",
  "Hidden Figures": "https://cinejoy.pk/movie/381284-hidden-figures-2016",
  "Birdman": "https://cinejoy.pk/movie/194662-birdman-2014",
  "Lost in Translation": "https://cinejoy.pk/movie/153-lost-in-translation-2003",
  "The Shape of Water": "https://cinejoy.pk/movie/399055-the-shape-of-water-2017",
  "House of Flying Daggers": "https://cinejoy.pk/movie/9550-house-of-flying-daggers-2004",
  "Burning": "https://cinejoy.pk/movie/491584-burning-2018",
  "The Wailing": "https://cinejoy.pk/movie/293670-the-wailing-2016",
  "Decision to Leave": "https://cinejoy.pk/movie/705996-decision-to-leave-2022",
  "Breathless": "https://cinejoy.pk/movie/269-breathless-1960",
  "Jules and Jim": "https://cinejoy.pk/movie/1628-jules-and-jim-1962",
  "Les Misérables": "https://cinejoy.pk/movie/82695-les-mis-rables-2012",
  "Run Lola Run": "https://cinejoy.pk/movie/104-run-lola-run-1998",
  "Good Bye Lenin!": "https://cinejoy.pk/movie/338-good-bye-lenin-2003",
  "The Great Beauty": "https://cinejoy.pk/movie/179144-the-great-beauty-2013",
  "The Little Mermaid": "https://cinejoy.pk/movie/10144-the-little-mermaid-1989",
  "Mulan": "https://cinejoy.pk/movie/10674-mulan-1998",
  "Pocahontas": "https://cinejoy.pk/movie/10530-pocahontas-1995",
  "The Hunchback of Notre Dame": "https://cinejoy.pk/movie/10545-the-hunchback-of-notre-dame-1996",
  "Tarzan": "https://cinejoy.pk/movie/37135-tarzan-1999",
  "Brother Bear": "https://cinejoy.pk/movie/10009-brother-bear-2003",
  "Bolt": "https://cinejoy.pk/movie/13053-bolt-2008",
  "Wreck-It Ralph": "https://cinejoy.pk/movie/82690-wreck-it-ralph-2012",
  "Ralph Breaks the Internet": "https://cinejoy.pk/movie/404368-ralph-breaks-the-internet-2018",
  "Big Hero 6": "https://cinejoy.pk/movie/177572-big-hero-6-2014",
  "Raya and the Last Dragon": "https://cinejoy.pk/movie/527774-raya-and-the-last-dragon-2021",
  "Toy Story 4": "https://cinejoy.pk/movie/301528-toy-story-4-2019",
  "Monsters University": "https://cinejoy.pk/movie/62211-monsters-university-2013",
  "Finding Dory": "https://cinejoy.pk/movie/127380-finding-dory-2016",
  "Cars": "https://cinejoy.pk/movie/920-cars-2006",
  "Cars 2": "https://cinejoy.pk/movie/49013-cars-2-2011",
  "Brave": "https://cinejoy.pk/movie/62177-brave-2012",
  "Onward": "https://cinejoy.pk/movie/508439-onward-2020",
  "A Bug's Life": "https://cinejoy.pk/movie/9487-a-bugs-life-1998",
  "The Good Dinosaur": "https://cinejoy.pk/movie/105864-the-good-dinosaur-2015",
  "Despicable Me 2": "https://cinejoy.pk/movie/93456-despicable-me-2-2013",
  "Despicable Me 3": "https://cinejoy.pk/movie/324852-despicable-me-3-2017",
  "Minions: The Rise of Gru": "https://cinejoy.pk/movie/438148-minions-the-rise-of-gru-2022",
  "Sing": "https://cinejoy.pk/movie/427416-sing-2016",
  "Sing 2": "https://cinejoy.pk/movie/438695-sing-2-2021",
  "The Secret Life of Pets": "https://cinejoy.pk/movie/328111-the-secret-life-of-pets-2016",
  "Kung Fu Panda 3": "https://cinejoy.pk/movie/140300-kung-fu-panda-3-2016",
  "Kung Fu Panda 4": "https://cinejoy.pk/movie/1011985-kung-fu-panda-4-2024",
  "How to Train Your Dragon 2": "https://cinejoy.pk/movie/82702-how-to-train-your-dragon-2-2014",
  "How to Train Your Dragon: The Hidden World": "https://cinejoy.pk/movie/166428-how-to-train-your-dragon-the-hidden-world-2019",
  "Madagascar": "https://cinejoy.pk/movie/953-madagascar-2005",
  "Ice Age": "https://cinejoy.pk/movie/425-ice-age-2002",
  "Ice Age: Dawn of the Dinosaurs": "https://cinejoy.pk/movie/8355-ice-age-dawn-of-the-dinosaurs-2009",
  "Shrek the Third": "https://cinejoy.pk/movie/810-shrek-the-third-2007",
  "Shrek Forever After": "https://cinejoy.pk/movie/10192-shrek-forever-after-2010",
  "Megamind": "https://cinejoy.pk/movie/38055-megamind-2010",
  "The Boss Baby": "https://cinejoy.pk/movie/295693-the-boss-baby-2017",
  "Trolls": "https://cinejoy.pk/movie/136799-trolls-2016",
  "Hotel Transylvania": "https://cinejoy.pk/movie/76492-hotel-transylvania-2012",
  "The Lego Movie": "https://cinejoy.pk/movie/137106-the-lego-movie-2014",
  "The Lego Batman Movie": "https://cinejoy.pk/movie/324849-the-lego-batman-movie-2017",
  "Cloudy with a Chance of Meatballs": "https://cinejoy.pk/movie/22794-cloudy-with-a-chance-of-meatballs-2009",
  "Rio": "https://cinejoy.pk/movie/46195-rio-2011",
  "Chicken Run": "https://cinejoy.pk/movie/7443-chicken-run-2000",
  "Wallace & Gromit: The Curse of the Were-Rabbit": "https://cinejoy.pk/movie/533-wallace-and-gromit-the-curse-of-the-were-rabbit-2005",
  "Coraline": "https://cinejoy.pk/movie/14836-coraline-2009",
  "Kubo and the Two Strings": "https://cinejoy.pk/movie/313297-kubo-and-the-two-strings-2016",
  "Isle of Dogs": "https://cinejoy.pk/movie/399174-isle-of-dogs-2018",
  "Ponyo": "https://cinejoy.pk/movie/12429-ponyo-2008",
  "Porco Rosso": "https://cinejoy.pk/movie/11621-porco-rosso-1992",
  "The Wind Rises": "https://cinejoy.pk/movie/149870-the-wind-rises-2013",
  "Paprika": "https://cinejoy.pk/movie/4977-paprika-2006",
  "I Want to Eat Your Pancreas": "https://cinejoy.pk/movie/504253-i-want-to-eat-your-pancreas-2018",
  "Belle": "https://cinejoy.pk/movie/776305-belle-2021",
  "The Garden of Words": "https://cinejoy.pk/movie/198375-the-garden-of-words-2013",
  "5 Centimeters per Second": "https://cinejoy.pk/movie/1359916-5-centimeters-per-second-2007",
  "Tokyo Godfathers": "https://cinejoy.pk/movie/13398-tokyo-godfathers-2003",
  "Easy A": "https://cinejoy.pk/movie/37735-easy-a-2010",
  "Bridesmaids": "https://cinejoy.pk/movie/55721-bridesmaids-2011",
  "Mamma Mia!": "https://cinejoy.pk/movie/11631-mamma-mia-2008",
  "The Devil Wears Prada": "https://cinejoy.pk/movie/350-the-devil-wears-prada-2006",
  "Sleepless in Seattle": "https://cinejoy.pk/movie/858-sleepless-in-seattle-1993",
  "You've Got Mail": "https://cinejoy.pk/movie/9489-youve-got-mail-1998",
  "Bridget Jones's Diary": "https://cinejoy.pk/movie/634-bridget-joness-diary-2001",
  "The Proposal": "https://cinejoy.pk/movie/18240-the-proposal-2009",
  "Crazy, Stupid, Love.": "https://cinejoy.pk/movie/50646-crazy-stupid-love-2011",
  "Silver Linings Playbook": "https://cinejoy.pk/movie/82693-silver-linings-playbook-2012",
  "Sixteen Candles": "https://cinejoy.pk/movie/15144-sixteen-candles-1984",
  "Mrs. Doubtfire": "https://cinejoy.pk/movie/788-mrs-doubtfire-1993",
  "Elf": "https://cinejoy.pk/movie/10719-elf-2003",
  "Old School": "https://cinejoy.pk/movie/11635-old-school-2003",
  "Wedding Crashers": "https://cinejoy.pk/movie/9522-wedding-crashers-2005",
  "Borat": "https://cinejoy.pk/movie/496-borat-2006",
  "Knocked Up": "https://cinejoy.pk/movie/4964-knocked-up-2007",
  "Pineapple Express": "https://cinejoy.pk/movie/10189-pineapple-express-2008",
  "Dodgeball": "https://cinejoy.pk/movie/322792-dodgeball-2004",
  "Blades of Glory": "https://cinejoy.pk/movie/9955-blades-of-glory-2007",
  "Meet the Parents": "https://cinejoy.pk/movie/1597-meet-the-parents-2000",
  "There's Something About Mary": "https://cinejoy.pk/movie/544-theres-something-about-mary-1998",
  "American Pie": "https://cinejoy.pk/movie/2105-american-pie-1999",
  "Scary Movie": "https://cinejoy.pk/movie/4247-scary-movie-2000",
  "Austin Powers: International Man of Mystery": "https://cinejoy.pk/movie/816-austin-powers-international-man-of-mystery-1997",
  "Coming to America": "https://cinejoy.pk/movie/9602-coming-to-america-1988",
  "Beverly Hills Cop": "https://cinejoy.pk/movie/90-beverly-hills-cop-1984",
  "Big": "https://cinejoy.pk/movie/2280-big-1988",
  "Tootsie": "https://cinejoy.pk/movie/9576-tootsie-1982",
  "Airplane!": "https://cinejoy.pk/movie/813-airplane-1980",
  "Blazing Saddles": "https://cinejoy.pk/movie/11072-blazing-saddles-1974",
  "Uncut Gems": "https://cinejoy.pk/movie/473033-uncut-gems-2019",
  "Lady Bird": "https://cinejoy.pk/movie/391713-lady-bird-2017",
  "Booksmart": "https://cinejoy.pk/movie/505600-booksmart-2019",
  "Little Miss Sunshine": "https://cinejoy.pk/movie/773-little-miss-sunshine-2006",
  "Juno": "https://cinejoy.pk/movie/7326-juno-2007",
  "Napoleon Dynamite": "https://cinejoy.pk/movie/8193-napoleon-dynamite-2004",
  "Pitch Perfect": "https://cinejoy.pk/movie/114150-pitch-perfect-2012",
  "To All the Boys I've Loved Before": "https://cinejoy.pk/movie/466282-to-all-the-boys-ive-loved-before-2018",
  "Set It Up": "https://cinejoy.pk/movie/384677-set-it-up-2018",
  "Palm Springs": "https://cinejoy.pk/movie/587792-palm-springs-2020",
  "The Lost City": "https://cinejoy.pk/movie/752623-the-lost-city-2022",
  "Ticket to Paradise": "https://cinejoy.pk/movie/800939-ticket-to-paradise-2022",
  "Yesterday": "https://cinejoy.pk/movie/515195-yesterday-2019",
  "Red, White & Royal Blue": "https://cinejoy.pk/movie/930094-red-white-and-royal-blue-2023",
  "Guardians of the Galaxy Vol. 2": "https://cinejoy.pk/movie/283995-guardians-of-the-galaxy-vol-2-2017",
  "Annabelle Comes Home": "https://cinejoy.pk/movie/521029-annabelle-comes-home-2019",
  "The Curse of La Llorona": "https://cinejoy.pk/movie/480414-the-curse-of-la-llorona-2019",
  "Godzilla vs. Kong": "https://cinejoy.pk/movie/399566-godzilla-vs-kong-2021",
  "2 Fast 2 Furious": "https://cinejoy.pk/movie/584-2-fast-2-furious-2003",
  "The Fast and the Furious: Tokyo Drift": "https://cinejoy.pk/movie/9615-the-fast-and-the-furious-tokyo-drift-2006",
  "Fast & Furious": "https://cinejoy.pk/movie/13804-fast-and-furious-2009",
  "F9": "https://cinejoy.pk/movie/385128-f9-2021",
  "Fantastic Beasts: The Crimes of Grindelwald": "https://cinejoy.pk/movie/338952-fantastic-beasts-the-crimes-of-grindelwald-2018",
  "Fantastic Beasts: The Secrets of Dumbledore": "https://cinejoy.pk/movie/338953-fantastic-beasts-the-secrets-of-dumbledore-2022",
  "Star Trek: The Motion Picture": "https://cinejoy.pk/movie/152-star-trek-the-motion-picture-1979",
  "Star Trek II: The Wrath of Khan": "https://cinejoy.pk/movie/154-star-trek-ii-the-wrath-of-khan-1982",
  "Star Trek: First Contact": "https://cinejoy.pk/movie/199-star-trek-first-contact-1996",
  "El Camino: A Breaking Bad Movie": "https://cinejoy.pk/movie/559969-el-camino-a-breaking-bad-movie-2019",
  "Ludo": "https://cinejoy.pk/movie/658412-ludo-2020",
  "Singham": "https://cinejoy.pk/movie/70590-singham-2011",
  "Singham Returns": "https://cinejoy.pk/movie/285803-singham-returns-2014",
  "Simmba": "https://cinejoy.pk/movie/496524-simmba-2018",
  "Dhoom": "https://cinejoy.pk/movie/17478-dhoom-2004",
  "Krrish": "https://cinejoy.pk/movie/32740-krrish-2006",
  "Krrish 3": "https://cinejoy.pk/movie/204435-krrish-3-2013",
  "Golmaal Returns": "https://cinejoy.pk/movie/14546-golmaal-returns-2008",
  "Golmaal 3": "https://cinejoy.pk/movie/44978-golmaal-3-2010",
  "Golmaal Again": "https://cinejoy.pk/movie/472123-golmaal-again-2017",
  "Awaara": "https://cinejoy.pk/movie/39039-awaara-1951",
  "Amar Akbar Anthony": "https://cinejoy.pk/movie/38022-amar-akbar-anthony-1977",
  "Don (1978)": "https://cinejoy.pk/movie/33104-don-1978",
  "Zanjeer": "https://cinejoy.pk/movie/103236-zanjeer-1973",
  "Trishul": "https://cinejoy.pk/movie/108016-trishul-1978",
  "Parinda": "https://cinejoy.pk/movie/58045-parinda-1989",
  "Qayamat Se Qayamat Tak": "https://cinejoy.pk/movie/27964-qayamat-se-qayamat-tak-1988",
  "Maine Pyar Kiya": "https://cinejoy.pk/movie/27624-maine-pyar-kiya-1989",
  "Hum Aapke Hain Koun..!": "https://cinejoy.pk/movie/46387-hum-aapke-hain-koun-1994",
  "Baazigar": "https://cinejoy.pk/movie/19657-baazigar-1993",
  "Darr": "https://cinejoy.pk/movie/35053-darr-1993",
  "Dil Se..": "https://cinejoy.pk/movie/21210-dil-se-1998",
  "Rangeela": "https://cinejoy.pk/movie/21570-rangeela-1995",
  "Bheja Fry": "https://cinejoy.pk/movie/15411-bheja-fry-2007",
  "Wake Up Sid": "https://cinejoy.pk/movie/21297-wake-up-sid-2009",
  "Rocket Singh: Salesman of the Year": "https://cinejoy.pk/movie/26815-rocket-singh-salesman-of-the-year-2009",
  "Kaminey": "https://cinejoy.pk/movie/20688-kaminey-2009",
  "Guzaarish": "https://cinejoy.pk/movie/41518-guzaarish-2010",
  "Vicky Donor": "https://cinejoy.pk/movie/103243-vicky-donor-2012",
  "English Vinglish": "https://cinejoy.pk/movie/118628-english-vinglish-2012",
  "Talaash: The Answer Lies Within": "https://cinejoy.pk/movie/86004-talaash-the-answer-lies-within-2012",
  "Kai Po Che!": "https://cinejoy.pk/movie/168245-kai-po-che-2013",
  "The Lunchbox": "https://cinejoy.pk/movie/191714-the-lunchbox-2013",
  "Madras Cafe": "https://cinejoy.pk/movie/215776-madras-cafe-2013",
  "Lootera": "https://cinejoy.pk/movie/205017-lootera-2013",
  "Tamasha": "https://cinejoy.pk/movie/339274-tamasha-2015",
  "Aligarh": "https://cinejoy.pk/movie/370870-aligarh-2015",
  "Kapoor & Sons": "https://cinejoy.pk/movie/374173-kapoor-and-sons-2016",
  "Trapped": "https://cinejoy.pk/movie/376257-trapped-2016",
  "Karwaan": "https://cinejoy.pk/movie/533237-karwaan-2018",
  "Laila Majnu": "https://cinejoy.pk/movie/540620-laila-majnu-2018",
  "Chintu Ka Birthday": "https://cinejoy.pk/movie/652049-chintu-ka-birthday-2020",
  "Sir": "https://cinejoy.pk/movie/518497-sir-2018",
  "Joji": "https://cinejoy.pk/movie/791779-joji-2021",
  "Court": "https://cinejoy.pk/movie/290815-court-2014",
  "Taste of Cherry": "https://cinejoy.pk/movie/30020-taste-of-cherry-1997",
  "The Salesman": "https://cinejoy.pk/movie/375315-the-salesman-2016",
  "Three Colours: Blue": "https://cinejoy.pk/movie/108-three-colours-blue-1993",
  "All of Us Strangers": "https://cinejoy.pk/movie/994108-all-of-us-strangers-2023",
  "BlackBerry": "https://cinejoy.pk/movie/1016084-blackberry-2023",
  "Late Night with the Devil": "https://cinejoy.pk/movie/938614-late-night-with-the-devil-2024",
  "Love Lies Bleeding": "https://cinejoy.pk/movie/948549-love-lies-bleeding-2024",
  "Monkey Man": "https://cinejoy.pk/movie/560016-monkey-man-2024",
  "Hit Man": "https://cinejoy.pk/movie/974635-hit-man-2024",
  "Kneecap": "https://cinejoy.pk/movie/1180629-kneecap-2024",
  "Sing Sing": "https://cinejoy.pk/movie/1155828-sing-sing-2024",
  "The Seed of the Sacred Fig": "https://cinejoy.pk/movie/1278263-the-seed-of-the-sacred-fig-2024",
  "All We Imagine as Light": "https://cinejoy.pk/movie/927547-all-we-imagine-as-light-2024",
  "Lucifer (Malayalam)": "https://cinejoy.pk/movie/564701-lucifer-2019",
  "Minnal Murali": "https://cinejoy.pk/movie/657644-minnal-murali-2021",
  "Virus": "https://cinejoy.pk/movie/585261-virus-2019",
  "Iratta": "https://cinejoy.pk/movie/945167-iratta-2023",
  "Kannur Squad": "https://cinejoy.pk/movie/1065918-kannur-squad-2023",
  "Nanpakal Nerathu Mayakkam": "https://cinejoy.pk/movie/876845-nanpakal-nerathu-mayakkam-2022",
  "Rorschach": "https://cinejoy.pk/movie/950284-rorschach-2022",
  "Nna Thaan Case Kodu": "https://cinejoy.pk/movie/864761-nna-thaan-case-kodu-2022",
  "Lover": "https://cinejoy.pk/movie/1219158-lover-2024",
  "Geetha Govindam": "https://cinejoy.pk/movie/540468-geetha-govindam-2018",
  "Keedaa Cola": "https://cinejoy.pk/movie/994333-keedaa-cola-2023",
  "Madgaon Express": "https://cinejoy.pk/movie/1201015-madgaon-express-2024",
  "Sector 36": "https://cinejoy.pk/movie/1245700-sector-36-2024",
  "Merry Christmas": "https://cinejoy.pk/movie/890116-merry-christmas-2024",
  "Shaitaan": "https://cinejoy.pk/movie/517276-shaitaan-2024",
  "Bhakshak": "https://cinejoy.pk/movie/1227136-bhakshak-2024",
  "Do Patti": "https://cinejoy.pk/movie/1148172-do-patti-2024",
  "Amar Singh Chamkila": "https://cinejoy.pk/movie/1086729-amar-singh-chamkila-2024",
  "Joram": "https://cinejoy.pk/movie/1063708-joram-2023",
  "Bheed": "https://cinejoy.pk/movie/1081726-bheed-2023",
  "Faraaz": "https://cinejoy.pk/movie/1019638-faraaz-2023",
  "The Sabarmati Report": "https://cinejoy.pk/movie/1213906-the-sabarmati-report-2024",
  "I Saw the Devil": "https://cinejoy.pk/movie/49797-i-saw-the-devil-2010",
  "The Chaser": "https://cinejoy.pk/movie/13855-the-chaser-2008",
  "Mother (2009)": "https://cinejoy.pk/movie/30018-mother-2009",
  "Joint Security Area": "https://cinejoy.pk/movie/2440-joint-security-area-2000",
  "Poetry": "https://cinejoy.pk/movie/47909-poetry-2010",
  "Secret Sunshine": "https://cinejoy.pk/movie/2015-secret-sunshine-2007",
  "Peppermint Candy": "https://cinejoy.pk/movie/41245-peppermint-candy-1999",
  "A Bittersweet Life": "https://cinejoy.pk/movie/11344-a-bittersweet-life-2005",
  "The Man from Nowhere": "https://cinejoy.pk/movie/51608-the-man-from-nowhere-2010",
  "New World": "https://cinejoy.pk/movie/165213-new-world-2013",
  "1987: When the Day Comes": "https://cinejoy.pk/movie/437103-1987-when-the-day-comes-2017",
  "Exhuma": "https://cinejoy.pk/movie/838209-exhuma-2024",
  "Pastoral: To Die in the Country": "https://cinejoy.pk/movie/104251-pastoral-to-die-in-the-country-1974",
  "Cure": "https://cinejoy.pk/movie/36095-cure-1997",
  "Audition": "https://cinejoy.pk/movie/11075-audition-1999",
  "All About Lily Chou-Chou": "https://cinejoy.pk/movie/16664-all-about-lily-chou-chou-2001",
  "Our Little Sister": "https://cinejoy.pk/movie/315846-our-little-sister-2015",
  "After Life": "https://cinejoy.pk/movie/17962-after-life-1998",
  "A Scene at the Sea": "https://cinejoy.pk/movie/23606-a-scene-at-the-sea-1991",
  "Sonatine": "https://cinejoy.pk/movie/7500-sonatine-1993",
  "Hana-bi": "https://cinejoy.pk/movie/5910-hana-bi-1997",
  "An Elephant Sitting Still": "https://cinejoy.pk/movie/499556-an-elephant-sitting-still-2018",
  "Kaili Blues": "https://cinejoy.pk/movie/362178-kaili-blues-2015",
  "Long Day's Journey Into Night": "https://cinejoy.pk/movie/1086037-long-days-journey-into-night-2018",
  "A Touch of Sin": "https://cinejoy.pk/movie/187022-a-touch-of-sin-2013",
  "Still Life (2006)": "https://cinejoy.pk/movie/2346-still-life-2006",
  "Platform": "https://cinejoy.pk/movie/80427-platform-2000",
  "Ju Dou": "https://cinejoy.pk/movie/41821-ju-dou-1990",
  "Lust, Caution": "https://cinejoy.pk/movie/4588-lust-caution-2007",
  "Eat Drink Man Woman": "https://cinejoy.pk/movie/10451-eat-drink-man-woman-1994",
  "The Wedding Banquet": "https://cinejoy.pk/movie/9261-the-wedding-banquet-1993",
  "Rebels of the Neon God": "https://cinejoy.pk/movie/57564-rebels-of-the-neon-god-1992",
  "Vive L'Amour": "https://cinejoy.pk/movie/11985-vive-lamour-1994",
  "The Hole": "https://cinejoy.pk/movie/29259-the-hole-1998",
  "Goodbye, Dragon Inn": "https://cinejoy.pk/movie/56616-goodbye-dragon-inn-2003",
  "A Sun": "https://cinejoy.pk/movie/622951-a-sun-2019",
  "Kung Fu Hustle": "https://cinejoy.pk/movie/9470-kung-fu-hustle-2004",
  "Shaolin Soccer": "https://cinejoy.pk/movie/11770-shaolin-soccer-2001",
  "Hard Boiled": "https://cinejoy.pk/movie/11782-hard-boiled-1992",
  "The Killer": "https://cinejoy.pk/movie/10835-the-killer-1989",
  "A Better Tomorrow": "https://cinejoy.pk/movie/11471-a-better-tomorrow-1986",
  "Police Story": "https://cinejoy.pk/movie/9056-police-story-1985",
  "Drunken Master II": "https://cinejoy.pk/movie/12207-drunken-master-ii-1994",
  "Fallen Angels": "https://cinejoy.pk/movie/11220-fallen-angels-1995",
  "Happy Together": "https://cinejoy.pk/movie/18329-happy-together-1997",
  "Days of Being Wild": "https://cinejoy.pk/movie/18311-days-of-being-wild-1990",
  "Tori and Lokita": "https://cinejoy.pk/movie/914203-tori-and-lokita-2022",
  "EO": "https://cinejoy.pk/movie/785398-eo-2022",
  "Close": "https://cinejoy.pk/movie/901563-close-2022",
  "The Worst Person in the World": "https://cinejoy.pk/movie/660120-the-worst-person-in-the-world-2021",
  "Another Round": "https://cinejoy.pk/movie/580175-another-round-2020",
  "Titane": "https://cinejoy.pk/movie/630240-titane-2021",
  "Raw": "https://cinejoy.pk/movie/393519-raw-2016",
  "Cold War": "https://cinejoy.pk/movie/440298-cold-war-2018",
  "Ida": "https://cinejoy.pk/movie/209274-ida-2013",
  "Youth": "https://cinejoy.pk/movie/168552-youth-2015",
  "Hand of God": "https://cinejoy.pk/movie/55744-hand-of-god-2021",
  "The Square": "https://cinejoy.pk/movie/401246-the-square-2017",
  "Force Majeure": "https://cinejoy.pk/movie/265189-force-majeure-2014",
  "Climax": "https://cinejoy.pk/movie/507076-climax-2018",
  "Enter the Void": "https://cinejoy.pk/movie/34647-enter-the-void-2009",
  "Holy Motors": "https://cinejoy.pk/movie/103328-holy-motors-2012",
  "Blue Is the Warmest Colour": "https://cinejoy.pk/movie/152584-blue-is-the-warmest-colour-2013",
  "The White Ribbon": "https://cinejoy.pk/movie/37903-the-white-ribbon-2009",
  "Cache": "https://cinejoy.pk/movie/106216-cache-2005",
  "Funny Games (1997)": "https://cinejoy.pk/movie/10234-funny-games-1997",
  "The Piano Teacher": "https://cinejoy.pk/movie/1791-the-piano-teacher-2001",
  "Melancholia": "https://cinejoy.pk/movie/62215-melancholia-2011",
  "Breaking the Waves": "https://cinejoy.pk/movie/145-breaking-the-waves-1996",
  "The House That Jack Built": "https://cinejoy.pk/movie/398173-the-house-that-jack-built-2018",
  "Leviathan (2014)": "https://cinejoy.pk/movie/127962-leviathan-2014",
  "Loveless": "https://cinejoy.pk/movie/429174-loveless-2017",
  "L'Avventura": "https://cinejoy.pk/movie/5165-lavventura-1960",
  "Suspiria (1977)": "https://cinejoy.pk/movie/11906-suspiria-1977",
  "Deep Red": "https://cinejoy.pk/movie/20126-deep-red-1975",
  "Bacurau": "https://cinejoy.pk/movie/446159-bacurau-2019",
  "The Devil's Backbone": "https://cinejoy.pk/movie/1433-the-devils-backbone-2001",
  "Cronos": "https://cinejoy.pk/movie/11655-cronos-1993",
  "21 Grams": "https://cinejoy.pk/movie/470-21-grams-2003",
  "Babel": "https://cinejoy.pk/movie/1164-babel-2006",
  "Biutiful": "https://cinejoy.pk/movie/45958-biutiful-2010",
  "Punch-Drunk Love": "https://cinejoy.pk/movie/8051-punch-drunk-love-2002",
  "The Master": "https://cinejoy.pk/movie/68722-the-master-2012",
  "Phantom Thread": "https://cinejoy.pk/movie/400617-phantom-thread-2017",
  "Licorice Pizza": "https://cinejoy.pk/movie/718032-licorice-pizza-2021",
  "Blue Velvet": "https://cinejoy.pk/movie/793-blue-velvet-1986",
  "Eraserhead": "https://cinejoy.pk/movie/985-eraserhead-1977",
  "Lost Highway": "https://cinejoy.pk/movie/638-lost-highway-1997",
  "Twin Peaks: Fire Walk with Me": "https://cinejoy.pk/movie/1923-twin-peaks-fire-walk-with-me-1992",
  "The Girl with the Dragon Tattoo": "https://cinejoy.pk/movie/15472-the-girl-with-the-dragon-tattoo-2011",
  "Panic Room": "https://cinejoy.pk/movie/4547-panic-room-2002",
  "Enemy": "https://cinejoy.pk/movie/181886-enemy-2013",
  "The Neon Demon": "https://cinejoy.pk/movie/301365-the-neon-demon-2016",
  "Annihilation": "https://cinejoy.pk/movie/300668-annihilation-2018",
  "Civil War (2024)": "https://cinejoy.pk/movie/929590-civil-war-2024",
  "Men": "https://cinejoy.pk/movie/780609-men-2022",
  "Under the Skin": "https://cinejoy.pk/movie/97370-under-the-skin-2013",
  "Being John Malkovich": "https://cinejoy.pk/movie/492-being-john-malkovich-1999",
  "Synecdoche, New York": "https://cinejoy.pk/movie/4960-synecdoche-new-york-2008",
  "I'm Thinking of Ending Things": "https://cinejoy.pk/movie/500840-im-thinking-of-ending-things-2020",
  "Pi": "https://cinejoy.pk/movie/473-pi-1998",
  "Silence": "https://cinejoy.pk/movie/68730-silence-2016",
  "After Hours": "https://cinejoy.pk/movie/10843-after-hours-1985",
  "Mean Streets": "https://cinejoy.pk/movie/203-mean-streets-1973",
  "Thief": "https://cinejoy.pk/movie/11524-thief-1981",
  "Manhunter": "https://cinejoy.pk/movie/11454-manhunter-1986",
  "The Insider": "https://cinejoy.pk/movie/9008-the-insider-1999",
  "Miami Vice": "https://cinejoy.pk/movie/82-miami-vice-2006",
  "The Long Goodbye": "https://cinejoy.pk/movie/1847-the-long-goodbye-1973",
  "The French Connection": "https://cinejoy.pk/movie/1051-the-french-connection-1971",
  "Serpico": "https://cinejoy.pk/movie/9040-serpico-1973",
  "Three Days of the Condor": "https://cinejoy.pk/movie/11963-three-days-of-the-condor-1975",
  "The Parallax View": "https://cinejoy.pk/movie/17365-the-parallax-view-1974",
  "Klute": "https://cinejoy.pk/movie/466-klute-1971",
  "Blow Out": "https://cinejoy.pk/movie/11644-blow-out-1981",
  "The Untouchables": "https://cinejoy.pk/movie/117-the-untouchables-1987",
  "Carrie (1976)": "https://cinejoy.pk/movie/7340-carrie-1976",
  "Dressed to Kill": "https://cinejoy.pk/movie/11033-dressed-to-kill-1980",
  "Contempt": "https://cinejoy.pk/movie/266-contempt-1963",
  "Pierrot le Fou": "https://cinejoy.pk/movie/2786-pierrot-le-fou-1965",
  "Vagabond (1985)": "https://cinejoy.pk/movie/44018-vagabond-1985",
  "The Silence (1963)": "https://cinejoy.pk/movie/11506-the-silence-1963",
  "Amarcord": "https://cinejoy.pk/movie/7857-amarcord-1973",
  "Red Desert": "https://cinejoy.pk/movie/26638-red-desert-1964",
  "The Passenger": "https://cinejoy.pk/movie/9652-the-passenger-1975",
  "Aguirre, the Wrath of God": "https://cinejoy.pk/movie/2000-aguirre-the-wrath-of-god-1972",
  "Nosferatu the Vampyre": "https://cinejoy.pk/movie/6404-nosferatu-the-vampyre-1979",
  "Stroszek": "https://cinejoy.pk/movie/11698-stroszek-1977",
  "Woyzeck": "https://cinejoy.pk/movie/10319-woyzeck-1979",
  "Alice in the Cities": "https://cinejoy.pk/movie/2204-alice-in-the-cities-1974",
  "The American Friend": "https://cinejoy.pk/movie/11222-the-american-friend-1977",
  "Three Colours: White": "https://cinejoy.pk/movie/109-three-colours-white-1994",
  "The Sacrifice": "https://cinejoy.pk/movie/24657-the-sacrifice-1986",
  "Nosferatu (1922)": "https://cinejoy.pk/movie/653-nosferatu-1922",
  "Vampyr": "https://cinejoy.pk/movie/779-vampyr-1932",
  "Gertrud": "https://cinejoy.pk/movie/34181-gertrud-1964",
  "Battleship Potemkin": "https://cinejoy.pk/movie/643-battleship-potemkin-1925",
  "Komal Gandhar": "https://cinejoy.pk/movie/167124-komal-gandhar-1961",
  "Bhuvan Shome": "https://cinejoy.pk/movie/210923-bhuvan-shome-1969",
  "Khandhar": "https://cinejoy.pk/movie/221028-khandhar-1984",
  "Samskara": "https://cinejoy.pk/movie/326800-samskara-1970",
  "Mukhamukham": "https://cinejoy.pk/movie/275027-mukhamukham-1984",
  "C.I.D. Moosa": "https://cinejoy.pk/movie/329991-cid-moosa-2003",
  "Kalyanaraman": "https://cinejoy.pk/movie/351496-kalyanaraman-2002",
  "Meesa Madhavan": "https://cinejoy.pk/movie/312927-meesa-madhavan-2002",
  "Chotta Mumbai": "https://cinejoy.pk/movie/234532-chotta-mumbai-2007",
  "Rajamanikyam": "https://cinejoy.pk/movie/152359-rajamanikyam-2005",
  "Big B": "https://cinejoy.pk/movie/79634-big-b-2007",
  "Anwar": "https://cinejoy.pk/movie/135041-anwar-2010",
  "Amen": "https://cinejoy.pk/movie/180048-amen-2013",
  "North 24 Kaatham": "https://cinejoy.pk/movie/224057-north-24-kaatham-2013",
  "Kuruthi": "https://cinejoy.pk/movie/813808-kuruthi-2021",
  "Bheeshma Parvam": "https://cinejoy.pk/movie/804309-bheeshma-parvam-2022",
  "Mukundan Unni Associates": "https://cinejoy.pk/movie/880018-mukundan-unni-associates-2022",
  "Thallumaala": "https://cinejoy.pk/movie/863530-thallumaala-2022",
  "Purusha Pretham": "https://cinejoy.pk/movie/1065913-purusha-pretham-2023",
  "Abraham Ozler": "https://cinejoy.pk/movie/1184247-abraham-ozler-2024",
  "Turbo": "https://cinejoy.pk/movie/77950-turbo-2024",
  "Varshangalkku Shesham": "https://cinejoy.pk/movie/1151560-varshangalkku-shesham-2024",
  "Sigappu Rojakkal": "https://cinejoy.pk/movie/66413-sigappu-rojakkal-1978",
  "Johnny (1980)": "https://cinejoy.pk/movie/331546-johnny-1980",
  "Agni Natchathiram": "https://cinejoy.pk/movie/78748-agni-natchathiram-1988",
  "Kadhalan": "https://cinejoy.pk/movie/59265-kadhalan-1994",
  "Jeans": "https://cinejoy.pk/movie/30086-jeans-1998",
  "Kandukondain Kandukondain": "https://cinejoy.pk/movie/69426-kandukondain-kandukondain-2000",
  "Minnale": "https://cinejoy.pk/movie/47938-minnale-2001",
  "Aalavandhan": "https://cinejoy.pk/movie/66346-aalavandhan-2001",
  "Dhool": "https://cinejoy.pk/movie/69661-dhool-2003",
  "Chandramukhi": "https://cinejoy.pk/movie/53122-chandramukhi-2005",
  "Vettaiyaadu Vilaiyaadu": "https://cinejoy.pk/movie/63670-vettaiyaadu-vilaiyaadu-2006",
  "Polladhavan": "https://cinejoy.pk/movie/69516-polladhavan-2007",
  "Dasavathaaram": "https://cinejoy.pk/movie/17888-dasavathaaram-2008",
  "Ayan": "https://cinejoy.pk/movie/20049-ayan-2009",
  "Mankatha": "https://cinejoy.pk/movie/76788-mankatha-2011",
  "Kalyana Samayal Saadham": "https://cinejoy.pk/movie/241563-kalyana-samayal-saadham-2013",
  "I (2015)": "https://cinejoy.pk/movie/263471-i-2015",
  "Irudhi Suttru": "https://cinejoy.pk/movie/357706-irudhi-suttru-2016",
  "24 (2016)": "https://cinejoy.pk/movie/368006-24-2016",
  "Mersal": "https://cinejoy.pk/movie/456287-mersal-2017",
  "Pyaar Prema Kaadhal": "https://cinejoy.pk/movie/512531-pyaar-prema-kaadhal-2018",
  "Petta": "https://cinejoy.pk/movie/534993-petta-2019",
  "Viswasam": "https://cinejoy.pk/movie/503356-viswasam-2019",
  "Master (2021)": "https://cinejoy.pk/movie/626392-master-2021",
  "Doctor": "https://cinejoy.pk/movie/1052895-doctor-2021",
  "Thiruchitrambalam": "https://cinejoy.pk/movie/858067-thiruchitrambalam-2022",
  "Good Night": "https://cinejoy.pk/movie/1251043-good-night-2023",
  "Ayalaan": "https://cinejoy.pk/movie/755388-ayalaan-2024",
  "Captain Miller": "https://cinejoy.pk/movie/962074-captain-miller-2024",
  "Garudan": "https://cinejoy.pk/movie/1186312-garudan-2024",
  "Raayan": "https://cinejoy.pk/movie/1136418-raayan-2024",
  "Aakhari Poratam": "https://cinejoy.pk/movie/307981-aakhari-poratam-1988",
  "Jagadeka Veerudu Athiloka Sundari": "https://cinejoy.pk/movie/77031-jagadeka-veerudu-athiloka-sundari-1990",
  "Gaayam": "https://cinejoy.pk/movie/369485-gaayam-1993",
  "Sindhooram": "https://cinejoy.pk/movie/82777-sindhooram-1997",
  "Manasantha Nuvve": "https://cinejoy.pk/movie/77038-manasantha-nuvve-2001",
  "Nuvvu Nenu": "https://cinejoy.pk/movie/307924-nuvvu-nenu-2001",
  "Jayam": "https://cinejoy.pk/movie/226829-jayam-2002",
  "Simhadri": "https://cinejoy.pk/movie/80805-simhadri-2003",
  "Varsham": "https://cinejoy.pk/movie/82322-varsham-2004",
  "Arya": "https://cinejoy.pk/movie/80880-arya-2004",
  "Chatrapathi": "https://cinejoy.pk/movie/1125221-chatrapathi-2005",
  "Happy Days": "https://cinejoy.pk/movie/199160-happy-days-2007",
  "Arundhati": "https://cinejoy.pk/movie/31629-arundhati-2009",
  "Kick (2009)": "https://cinejoy.pk/movie/60807-kick-2009",
  "Dookudu": "https://cinejoy.pk/movie/80276-dookudu-2011",
  "Ala Modalaindi": "https://cinejoy.pk/movie/57010-ala-modalaindi-2011",
  "Gabbar Singh": "https://cinejoy.pk/movie/111836-gabbar-singh-2012",
  "Seethamma Vakitlo Sirimalle Chettu": "https://cinejoy.pk/movie/193197-seethamma-vakitlo-sirimalle-chettu-2013",
  "Attarintiki Daredi": "https://cinejoy.pk/movie/224061-attarintiki-daredi-2013",
  "Race Gurram": "https://cinejoy.pk/movie/262227-race-gurram-2014",
  "Srimanthudu": "https://cinejoy.pk/movie/353533-srimanthudu-2015",
  "Bhale Bhale Magadivoy": "https://cinejoy.pk/movie/367553-bhale-bhale-magadivoy-2015",
  "Fidaa": "https://cinejoy.pk/movie/467649-fidaa-2017",
  "Goodachari": "https://cinejoy.pk/movie/540189-goodachari-2018",
  "Sarileru Neekevvaru": "https://cinejoy.pk/movie/607313-sarileru-neekevvaru-2020",
  "Jathi Ratnalu": "https://cinejoy.pk/movie/796368-jathi-ratnalu-2021",
  "Love Story (2021)": "https://cinejoy.pk/movie/663909-love-story-2021",
  "DJ Tillu": "https://cinejoy.pk/movie/937036-dj-tillu-2022",
  "Tillu Square": "https://cinejoy.pk/movie/1039482-tillu-square-2024",
  "Bimbisara": "https://cinejoy.pk/movie/891445-bimbisara-2022",
  "Karthikeya 2": "https://cinejoy.pk/movie/894762-karthikeya-2-2022",
  "Virupaksha": "https://cinejoy.pk/movie/1034590-virupaksha-2023",
  "Mangalavaaram": "https://cinejoy.pk/movie/1093012-mangalavaaram-2023",
  "Guntur Kaaram": "https://cinejoy.pk/movie/868660-guntur-kaaram-2024",
  "Gaami": "https://cinejoy.pk/movie/886385-gaami-2024",
  "Saripodhaa Sanivaaram": "https://cinejoy.pk/movie/1194915-saripodhaa-sanivaaram-2024",
  "Committee Kurrollu": "https://cinejoy.pk/movie/1327213-committee-kurrollu-2024",
  "Millennium Actress": "https://cinejoy.pk/movie/33320-millennium-actress-2001",
  "Whisper of the Heart": "https://cinejoy.pk/movie/37797-whisper-of-the-heart-1995",
  "When Marnie Was There": "https://cinejoy.pk/movie/242828-when-marnie-was-there-2014",
  "Josee, the Tiger and the Fish": "https://cinejoy.pk/movie/652837-josee-the-tiger-and-the-fish-2020",
  "In This Corner of the World": "https://cinejoy.pk/movie/378108-in-this-corner-of-the-world-2016",
  "The Girl Who Leapt Through Time": "https://cinejoy.pk/movie/14069-the-girl-who-leapt-through-time-2006",
  "Summer Wars": "https://cinejoy.pk/movie/28874-summer-wars-2009",
  "The Boy and the Beast": "https://cinejoy.pk/movie/315465-the-boy-and-the-beast-2015",
  "Redline": "https://cinejoy.pk/movie/71883-redline-2009",
  "Promare": "https://cinejoy.pk/movie/553600-promare-2019",
  "Sword of the Stranger": "https://cinejoy.pk/movie/13980-sword-of-the-stranger-2007",
  "Ninja Scroll": "https://cinejoy.pk/movie/14282-ninja-scroll-1993",
  "Vampire Hunter D: Bloodlust": "https://cinejoy.pk/movie/15999-vampire-hunter-d-bloodlust-2000",
  "Cowboy Bebop: The Movie": "https://cinejoy.pk/movie/11299-cowboy-bebop-the-movie-2001",
  "Dragon Ball Super: Broly": "https://cinejoy.pk/movie/503314-dragon-ball-super-broly-2018",
  "Haikyu!! The Dumpster Battle": "https://cinejoy.pk/movie/1012201-haikyu-the-dumpster-battle-2024",
  "Heretic": "https://cinejoy.pk/movie/1138194-heretic-2024",
  "Smile 2": "https://cinejoy.pk/movie/1100782-smile-2-2024",
  "Terrifier 3": "https://cinejoy.pk/movie/1034541-terrifier-3-2024",
  "The Fall Guy": "https://cinejoy.pk/movie/746036-the-fall-guy-2024",
  "Blink Twice": "https://cinejoy.pk/movie/840705-blink-twice-2024",
  "Abigail": "https://cinejoy.pk/movie/1111873-abigail-2024",
  "Speak No Evil": "https://cinejoy.pk/movie/1114513-speak-no-evil-2024",
  "Red One": "https://cinejoy.pk/movie/845781-red-one-2024",
  "Wolfs": "https://cinejoy.pk/movie/877817-wolfs-2024",
  "The Bikeriders": "https://cinejoy.pk/movie/1008409-the-bikeriders-2024",
  "Fly Me to the Moon": "https://cinejoy.pk/movie/956842-fly-me-to-the-moon-2024",
  "In a Violent Nature": "https://cinejoy.pk/movie/1214509-in-a-violent-nature-2024",
  "Boy Kills World": "https://cinejoy.pk/movie/882059-boy-kills-world-2024",
  "The Ministry of Ungentlemanly Warfare": "https://cinejoy.pk/movie/799583-the-ministry-of-ungentlemanly-warfare-2024",
  "Trap": "https://cinejoy.pk/movie/1032823-trap-2024",
  "Cuckoo": "https://cinejoy.pk/movie/869291-cuckoo-2024",
  "The Piano Lesson": "https://cinejoy.pk/movie/804406-the-piano-lesson-2024",
  "Blitz": "https://cinejoy.pk/movie/896151-blitz-2024",
  "The Apprentice": "https://cinejoy.pk/movie/1182047-the-apprentice-2024",
  "Juror #2": "https://cinejoy.pk/movie/1106739-juror-2-2024",
  "I Saw the TV Glow": "https://cinejoy.pk/movie/858017-i-saw-the-tv-glow-2024",
  "Megalopolis": "https://cinejoy.pk/movie/592831-megalopolis-2024",
  "Nightbitch": "https://cinejoy.pk/movie/728949-nightbitch-2024",
  "Better Man": "https://cinejoy.pk/movie/799766-better-man-2024",
  "September 5": "https://cinejoy.pk/movie/1211472-september-5-2024",
  "Nickel Boys": "https://cinejoy.pk/movie/1028196-nickel-boys-2024",
  "Hard Truths": "https://cinejoy.pk/movie/1013154-hard-truths-2024",
  "The Room Next Door": "https://cinejoy.pk/movie/1088514-the-room-next-door-2024",
  "Queer": "https://cinejoy.pk/movie/1059128-queer-2024",
  "Babygirl": "https://cinejoy.pk/movie/1063704-babygirl-2024",
  "Unstoppable": "https://cinejoy.pk/movie/1101448-unstoppable-2024",
  "The Order": "https://cinejoy.pk/movie/1082195-the-order-2024",
  "Transformers One": "https://cinejoy.pk/movie/698687-transformers-one-2024",
  "Paddington in Peru": "https://cinejoy.pk/movie/516729-paddington-in-peru-2024",
  "Den of Thieves 2: Pantera": "https://cinejoy.pk/movie/604685-den-of-thieves-2-pantera-2025",
  "Flight Risk": "https://cinejoy.pk/movie/1126166-flight-risk-2025",
  "Dog Man": "https://cinejoy.pk/movie/774370-dog-man-2025",
  "One of Them Days": "https://cinejoy.pk/movie/1280672-one-of-them-days-2025",
  "Karate Kid: Legends": "https://cinejoy.pk/movie/1011477-karate-kid-legends-2025",
  "Five Nights at Freddy's 2": "https://cinejoy.pk/movie/1228246-five-nights-at-freddys-2-2025",
  "M3GAN 2.0": "https://cinejoy.pk/movie/1071585-m3gan-20-2025",
  "I Know What You Did Last Summer (2025)": "https://cinejoy.pk/movie/1083433-i-know-what-you-did-last-summer-2025",
  "The Bride!": "https://cinejoy.pk/movie/1159831-the-bride-2025",
  "High and Low (2025)": "https://cinejoy.pk/movie/12493-high-and-low-2025",
  "Spider-Man: Beyond the Spider-Verse": "https://cinejoy.pk/movie/911916-spider-man-beyond-the-spider-verse-2026",
  "Avengers: Doomsday": "https://cinejoy.pk/movie/1003596-avengers-doomsday-2026",
  "The Batman: Part II": "https://cinejoy.pk/movie/806704-the-batman-part-ii-2026",
  "Shrek 5": "https://cinejoy.pk/movie/421892-shrek-5-2026",
  "Toy Story 5": "https://cinejoy.pk/movie/1084244-toy-story-5-2026",
  "Scream 7": "https://cinejoy.pk/movie/1159559-scream-7-2026",
  "The Hunger Games: Sunrise on the Reaping": "https://cinejoy.pk/movie/1300968-the-hunger-games-sunrise-on-the-reaping-2026",
  "Moana (Live Action)": "https://cinejoy.pk/movie/1108427-moana-2026",
  "Michael": "https://cinejoy.pk/movie/936075-michael-2025",
  "A Haunting in Venice": "https://cinejoy.pk/movie/945729-a-haunting-in-venice-2023",
  "Bottoms": "https://cinejoy.pk/movie/814776-bottoms-2023",
  "No Hard Feelings": "https://cinejoy.pk/movie/884605-no-hard-feelings-2023",
  "Talk to Me (2023)": "https://cinejoy.pk/movie/1008042-talk-to-me-2023",
  "Priscilla": "https://cinejoy.pk/movie/1020006-priscilla-2023",
  "The Beekeeper": "https://cinejoy.pk/movie/866398-the-beekeeper-2024",
  "Madame Web": "https://cinejoy.pk/movie/634492-madame-web-2024",
  "Argylle": "https://cinejoy.pk/movie/848538-argylle-2024",
  "Land of Bad": "https://cinejoy.pk/movie/969492-land-of-bad-2024",
  "The First Omen": "https://cinejoy.pk/movie/437342-the-first-omen-2024",
  "Tarot": "https://cinejoy.pk/movie/719221-tarot-2024",
  "The Strangers: Chapter 1": "https://cinejoy.pk/movie/1010600-the-strangers-chapter-1-2024",
  "Atlas": "https://cinejoy.pk/movie/614933-atlas-2024",
  "Beverly Hills Cop: Axel F": "https://cinejoy.pk/movie/280180-beverly-hills-cop-axel-f-2024",
  "Borderlands": "https://cinejoy.pk/movie/365177-borderlands-2024",
  "The Crow (2024)": "https://cinejoy.pk/movie/957452-the-crow-2024",
  "Never Let Go": "https://cinejoy.pk/movie/814889-never-let-go-2024",
  "Hellboy: The Crooked Man": "https://cinejoy.pk/movie/1087822-hellboy-the-crooked-man-2024",
  "Kraven the Hunter": "https://cinejoy.pk/movie/539972-kraven-the-hunter-2024",
  "The Taste of Things": "https://cinejoy.pk/movie/964960-the-taste-of-things-2023",
  "Fallen Leaves": "https://cinejoy.pk/movie/986280-fallen-leaves-2023",
  "Evil Does Not Exist": "https://cinejoy.pk/movie/1156125-evil-does-not-exist-2023",
  "About Dry Grasses": "https://cinejoy.pk/movie/665733-about-dry-grasses-2023",
  "Green Border": "https://cinejoy.pk/movie/1121956-green-border-2023",
  "Look Back": "https://cinejoy.pk/movie/1244492-look-back-2024",
  "Oddity": "https://cinejoy.pk/movie/1216191-oddity-2024",
  "Strange Darling": "https://cinejoy.pk/movie/1029281-strange-darling-2024",
  "Daddio": "https://cinejoy.pk/movie/843416-daddio-2024",
  "Janet Planet": "https://cinejoy.pk/movie/1037035-janet-planet-2024",
  "Ghostlight": "https://cinejoy.pk/movie/1214469-ghostlight-2024",
  "Thelma": "https://cinejoy.pk/movie/1051891-thelma-2024",
  "Babes": "https://cinejoy.pk/movie/999582-babes-2024",
  "My Old Ass": "https://cinejoy.pk/movie/947891-my-old-ass-2024",
  "Between the Temples": "https://cinejoy.pk/movie/1125073-between-the-temples-2024",
  "Yodha": "https://cinejoy.pk/movie/899718-yodha-2024",
  "Maidaan": "https://cinejoy.pk/movie/668340-maidaan-2024",
  "Bade Miyan Chote Miyan (2024)": "https://cinejoy.pk/movie/936622-bade-miyan-chote-miyan-2024",
  "Srikanth": "https://cinejoy.pk/movie/1093971-srikanth-2024",
  "Sarfira": "https://cinejoy.pk/movie/967344-sarfira-2024",
  "Bad Newz": "https://cinejoy.pk/movie/984101-bad-newz-2024",
  "Ulajh": "https://cinejoy.pk/movie/1124876-ulajh-2024",
  "Phir Aayi Hasseen Dillruba": "https://cinejoy.pk/movie/1072693-phir-aayi-hasseen-dillruba-2024",
  "Khel Khel Mein": "https://cinejoy.pk/movie/1241592-khel-khel-mein-2024",
  "Vedaa": "https://cinejoy.pk/movie/1148486-vedaa-2024",
  "Jigra": "https://cinejoy.pk/movie/1184889-jigra-2024",
  "CTRL": "https://cinejoy.pk/movie/1146577-ctrl-2024",
  "I Want to Talk": "https://cinejoy.pk/movie/1263031-i-want-to-talk-2024",
  "Baby John": "https://cinejoy.pk/movie/1083241-baby-john-2024",
  "Sky Force": "https://cinejoy.pk/movie/1143407-sky-force-2025",
  "Emergency": "https://cinejoy.pk/movie/1000438-emergency-2025",
  "Deva": "https://cinejoy.pk/movie/1195430-deva-2025",
  "Love & War": "https://cinejoy.pk/movie/1235057-love-and-war-2026",
  "War 2": "https://cinejoy.pk/movie/1109086-war-2-2025",
  "Alpha": "https://cinejoy.pk/movie/1122030-alpha-2025",
  "Spirit": "https://cinejoy.pk/movie/1317991-spirit-2025",
  "Toxic": "https://cinejoy.pk/movie/1315091-toxic-2025",
  "Kanguva": "https://cinejoy.pk/movie/622792-kanguva-2024",
  "The Greatest of All Time (GOAT)": "https://cinejoy.pk/movie/1129608-the-greatest-of-all-time-2024",
  "Thangalaan": "https://cinejoy.pk/movie/910784-thangalaan-2024",
  "Indian 2": "https://cinejoy.pk/movie/552398-indian-2-2024",
  "Level Cross": "https://cinejoy.pk/movie/1105682-level-cross-2024",
  "Bougainvillea": "https://cinejoy.pk/movie/1177224-bougainvillea-2024",
  "The Matrix Reloaded": "https://cinejoy.pk/movie/604-the-matrix-reloaded-2003",
  "Kingsman: The Secret Service": "https://cinejoy.pk/movie/207703-kingsman-the-secret-service-2014",
  "Taken": "https://cinejoy.pk/movie/8681-taken-2008",
  "The Bourne Identity": "https://cinejoy.pk/movie/2501-the-bourne-identity-2002",
  "Captain Marvel": "https://cinejoy.pk/movie/299537-captain-marvel-2019",
  "Ant-Man": "https://cinejoy.pk/movie/102899-ant-man-2015",
  "Aquaman": "https://cinejoy.pk/movie/297802-aquaman-2018",
  "Justice League": "https://cinejoy.pk/movie/141052-justice-league-2017",
  "Suicide Squad": "https://cinejoy.pk/movie/297761-suicide-squad-2016",
  "Bumblebee": "https://cinejoy.pk/movie/424783-bumblebee-2018",
  "Rush Hour": "https://cinejoy.pk/movie/2109-rush-hour-1998",
  "Bad Boys for Life": "https://cinejoy.pk/movie/38700-bad-boys-for-life-2020",
  "Nobody": "https://cinejoy.pk/movie/615457-nobody-2021",
  "The Equalizer": "https://cinejoy.pk/movie/156022-the-equalizer-2014",
  "The Old Guard": "https://cinejoy.pk/movie/547016-the-old-guard-2020",
  "Terminator: Dark Fate": "https://cinejoy.pk/movie/290859-terminator-dark-fate-2019",
  "I, Robot": "https://cinejoy.pk/movie/2048-i-robot-2004",
  "Elysium": "https://cinejoy.pk/movie/68724-elysium-2013",
  "Ready Player One": "https://cinejoy.pk/movie/333339-ready-player-one-2018",
  "Signs": "https://cinejoy.pk/movie/2675-signs-2002",
  "War of the Worlds": "https://cinejoy.pk/movie/74-war-of-the-worlds-2005",
  "Star Trek": "https://cinejoy.pk/movie/13475-star-trek-2009",
  "Pacific Rim": "https://cinejoy.pk/movie/68726-pacific-rim-2013",
  "Cloverfield": "https://cinejoy.pk/movie/7191-cloverfield-2008",
  "Pinocchio": "https://cinejoy.pk/movie/10895-pinocchio-1940",
  "Rush Hour 2": "https://cinejoy.pk/movie/5175-rush-hour-2-2001",
  "Zoolander": "https://cinejoy.pk/movie/9398-zoolander-2001",
  "White Chicks": "https://cinejoy.pk/movie/12153-white-chicks-2004",
  "Jumanji: Welcome to the Jungle": "https://cinejoy.pk/movie/353486-jumanji-welcome-to-the-jungle-2017",
  "Deadpool 2": "https://cinejoy.pk/movie/383498-deadpool-2-2018",
  "The Intern": "https://cinejoy.pk/movie/257211-the-intern-2015",
  "Daddy's Home": "https://cinejoy.pk/movie/274167-daddys-home-2015",
  "Game Night": "https://cinejoy.pk/movie/445571-game-night-2018",
  "Ted": "https://cinejoy.pk/movie/72105-ted-2012",
  "Annabelle": "https://cinejoy.pk/movie/250546-annabelle-2014",
  "Taken 2": "https://cinejoy.pk/movie/82675-taken-2-2012",
  "Searching": "https://cinejoy.pk/movie/489999-searching-2018",
  "Bird Box": "https://cinejoy.pk/movie/405774-bird-box-2018",
  "The Platform": "https://cinejoy.pk/movie/619264-the-platform-2019",
  "Joy Ride": "https://cinejoy.pk/movie/864168-joy-ride-2023",
  "Wonder": "https://cinejoy.pk/movie/406997-wonder-2017",
  "A Walk to Remember": "https://cinejoy.pk/movie/10229-a-walk-to-remember-2002",
  "Me Before You": "https://cinejoy.pk/movie/296096-me-before-you-2016",
  "Five Feet Apart": "https://cinejoy.pk/movie/527641-five-feet-apart-2019",
  "Dirty Dancing": "https://cinejoy.pk/movie/88-dirty-dancing-1987",
  "Ghost": "https://cinejoy.pk/movie/251-ghost-1990",
  "The Vow": "https://cinejoy.pk/movie/72570-the-vow-2012",
  "Dear John": "https://cinejoy.pk/movie/22971-dear-john-2010",
  "Training Day": "https://cinejoy.pk/movie/2034-training-day-2001",
  "American Gangster": "https://cinejoy.pk/movie/4982-american-gangster-2007",
  "Bad Boys": "https://cinejoy.pk/movie/9737-bad-boys-1995",
  "Peaky Blinders: The Immortal Man": "https://cinejoy.pk/movie/875828-peaky-blinders-the-immortal-man-2026",
  "Fantastic Beasts and Where to Find Them": "https://cinejoy.pk/movie/259316-fantastic-beasts-and-where-to-find-them-2016",
  "The Hobbit: The Desolation of Smaug": "https://cinejoy.pk/movie/57158-the-hobbit-the-desolation-of-smaug-2013",
  "The Hobbit: The Battle of the Five Armies": "https://cinejoy.pk/movie/122917-the-hobbit-the-battle-of-the-five-armies-2014",
  "Stardust": "https://cinejoy.pk/movie/2270-stardust-2007",
  "Maleficent": "https://cinejoy.pk/movie/102651-maleficent-2014",
  "Percy Jackson & the Olympians: The Lightning Thief": "https://cinejoy.pk/movie/32657-percy-jackson-and-the-olympians-the-lightning-thief-2010",
  "Lone Survivor": "https://cinejoy.pk/movie/193756-lone-survivor-2013",
  "The Hurt Locker": "https://cinejoy.pk/movie/12162-the-hurt-locker-2008",
  "The Magnificent Seven": "https://cinejoy.pk/movie/966-the-magnificent-seven-1960",
  "Hell or High Water": "https://cinejoy.pk/movie/338766-hell-or-high-water-2016",
  "Dhoom 2": "https://cinejoy.pk/movie/14194-dhoom-2-2006",
  "Sooryavanshi": "https://cinejoy.pk/movie/592508-sooryavanshi-2021",
  "The Raid": "https://cinejoy.pk/movie/94329-the-raid-2011",
  "The Raid 2": "https://cinejoy.pk/movie/180299-the-raid-2-2014",
  "Tomorrow Never Dies": "https://cinejoy.pk/movie/714-tomorrow-never-dies-1997",
  "GoldenEye": "https://cinejoy.pk/movie/710-goldeneye-1995",
  "The World Is Not Enough": "https://cinejoy.pk/movie/36643-the-world-is-not-enough-1999",
  "Spectre": "https://cinejoy.pk/movie/206647-spectre-2015",
  "Quantum of Solace": "https://cinejoy.pk/movie/10764-quantum-of-solace-2008",
  "Terminator 3: Rise of the Machines": "https://cinejoy.pk/movie/296-terminator-3-rise-of-the-machines-2003",
  "The Great Wall": "https://cinejoy.pk/movie/311324-the-great-wall-2016",
  "Rampage": "https://cinejoy.pk/movie/427641-rampage-2018",
  "Mission: Impossible III": "https://cinejoy.pk/movie/956-mission-impossible-iii-2006",
  "Top Gun": "https://cinejoy.pk/movie/744-top-gun-1986",
  "Point Break": "https://cinejoy.pk/movie/1089-point-break-1991",
  "The Italian Job": "https://cinejoy.pk/movie/9654-the-italian-job-2003",
  "Ocean's Thirteen": "https://cinejoy.pk/movie/298-oceans-thirteen-2007",
  "Dredd": "https://cinejoy.pk/movie/49049-dredd-2012",
  "Sicario: Day of the Soldado": "https://cinejoy.pk/movie/400535-sicario-day-of-the-soldado-2018",
  "The Accountant": "https://cinejoy.pk/movie/302946-the-accountant-2016",
  "The Lost World: Jurassic Park": "https://cinejoy.pk/movie/330-the-lost-world-jurassic-park-1997",
  "Alien 3": "https://cinejoy.pk/movie/8077-alien-3-1992",
  "The Matrix Revolutions": "https://cinejoy.pk/movie/605-the-matrix-revolutions-2003",
  "The Matrix Resurrections": "https://cinejoy.pk/movie/624860-the-matrix-resurrections-2021",
  "Planet of the Apes": "https://cinejoy.pk/movie/871-planet-of-the-apes-1968",
  "Rise of the Planet of the Apes": "https://cinejoy.pk/movie/61791-rise-of-the-planet-of-the-apes-2011",
  "Dawn of the Planet of the Apes": "https://cinejoy.pk/movie/119450-dawn-of-the-planet-of-the-apes-2014",
  "War for the Planet of the Apes": "https://cinejoy.pk/movie/281338-war-for-the-planet-of-the-apes-2017",
  "Godzilla: King of the Monsters": "https://cinejoy.pk/movie/373571-godzilla-king-of-the-monsters-2019",
  "Kong: Skull Island": "https://cinejoy.pk/movie/293167-kong-skull-island-2017",
  "Passengers": "https://cinejoy.pk/movie/274870-passengers-2016",
  "Life": "https://cinejoy.pk/movie/395992-life-2017",
  "Geostorm": "https://cinejoy.pk/movie/274855-geostorm-2017",
  "Mission to Mars": "https://cinejoy.pk/movie/2067-mission-to-mars-2000",
  "Event Horizon": "https://cinejoy.pk/movie/8413-event-horizon-1997",
  "Stargate": "https://cinejoy.pk/movie/2164-stargate-1994",
  "Dark City": "https://cinejoy.pk/movie/2666-dark-city-1998",
  "Lucy": "https://cinejoy.pk/movie/240832-lucy-2014",
  "Upgrade": "https://cinejoy.pk/movie/500664-upgrade-2018",
  "Boss Level": "https://cinejoy.pk/movie/513310-boss-level-2020",
  "Spiderhead": "https://cinejoy.pk/movie/615469-spiderhead-2022",
  "The Adam Project": "https://cinejoy.pk/movie/696806-the-adam-project-2022",
  "Jumanji: The Next Level": "https://cinejoy.pk/movie/512200-jumanji-the-next-level-2019",
  "Transformers: Age of Extinction": "https://cinejoy.pk/movie/91314-transformers-age-of-extinction-2014",
  "Transformers: Rise of the Beasts": "https://cinejoy.pk/movie/667538-transformers-rise-of-the-beasts-2023",
  "Superman Returns": "https://cinejoy.pk/movie/1452-superman-returns-2006",
  "The Fantastic Four": "https://cinejoy.pk/movie/22059-the-fantastic-four-2005",
  "Batman v Superman: Dawn of Justice": "https://cinejoy.pk/movie/209112-batman-v-superman-dawn-of-justice-2016",
  "Birds of Prey": "https://cinejoy.pk/movie/212861-birds-of-prey-2020",
  "Morbius": "https://cinejoy.pk/movie/526896-morbius-2022",
  "Venom": "https://cinejoy.pk/movie/335983-venom-2018",
  "Venom: Let There Be Carnage": "https://cinejoy.pk/movie/580489-venom-let-there-be-carnage-2021",
  "Thor: The Dark World": "https://cinejoy.pk/movie/76338-thor-the-dark-world-2013",
  "Thor": "https://cinejoy.pk/movie/10195-thor-2011",
  "Iron Man 2": "https://cinejoy.pk/movie/10138-iron-man-2-2010",
  "Iron Man 3": "https://cinejoy.pk/movie/68721-iron-man-3-2013",
  "Captain America: The First Avenger": "https://cinejoy.pk/movie/1771-captain-america-the-first-avenger-2011",
  "The Incredible Hulk": "https://cinejoy.pk/movie/1724-the-incredible-hulk-2008",
  "Avengers: Age of Ultron": "https://cinejoy.pk/movie/99861-avengers-age-of-ultron-2015",
  "Spider-Man: Far From Home": "https://cinejoy.pk/movie/429617-spider-man-far-from-home-2019",
  "The Amazing Spider-Man": "https://cinejoy.pk/movie/1930-the-amazing-spider-man-2012",
  "X-Men": "https://cinejoy.pk/movie/36657-x-men-2000",
  "X-Men: First Class": "https://cinejoy.pk/movie/49538-x-men-first-class-2011",
  "X-Men: Apocalypse": "https://cinejoy.pk/movie/246655-x-men-apocalypse-2016",
  "Dark Phoenix": "https://cinejoy.pk/movie/320288-dark-phoenix-2019",
  "The Wolverine": "https://cinejoy.pk/movie/76170-the-wolverine-2013",
  "X-Men Origins: Wolverine": "https://cinejoy.pk/movie/2080-x-men-origins-wolverine-2009",
  "Fantastic Four": "https://cinejoy.pk/movie/166424-fantastic-four-2015",
  "Hellboy": "https://cinejoy.pk/movie/1487-hellboy-2004",
  "Hancock": "https://cinejoy.pk/movie/8960-hancock-2008",
  "Chronicle": "https://cinejoy.pk/movie/76726-chronicle-2012",
  "The Garfield Movie": "https://cinejoy.pk/movie/748783-the-garfield-movie-2024",
  "Rango": "https://cinejoy.pk/movie/44896-rango-2011",
  "The Croods": "https://cinejoy.pk/movie/49519-the-croods-2013",
  "Trolls World Tour": "https://cinejoy.pk/movie/446893-trolls-world-tour-2020",
  "Spirit: Stallion of the Cimarron": "https://cinejoy.pk/movie/9023-spirit-stallion-of-the-cimarron-2002",
  "The Prince of Egypt": "https://cinejoy.pk/movie/9837-the-prince-of-egypt-1998",
  "Anastasia": "https://cinejoy.pk/movie/9444-anastasia-1997",
  "The Jungle Book": "https://cinejoy.pk/movie/9325-the-jungle-book-1967",
  "101 Dalmatians": "https://cinejoy.pk/movie/11674-101-dalmatians-1961",
  "Cinderella": "https://cinejoy.pk/movie/11224-cinderella-1950",
  "Sleeping Beauty": "https://cinejoy.pk/movie/10882-sleeping-beauty-1959",
  "Snow White and the Seven Dwarfs": "https://cinejoy.pk/movie/408-snow-white-and-the-seven-dwarfs-1937",
  "Bambi": "https://cinejoy.pk/movie/3170-bambi-1942",
  "Dumbo": "https://cinejoy.pk/movie/11360-dumbo-1941",
  "Alice in Wonderland": "https://cinejoy.pk/movie/12092-alice-in-wonderland-1951",
  "Peter Pan": "https://cinejoy.pk/movie/10693-peter-pan-1953",
  "Oliver & Company": "https://cinejoy.pk/movie/12233-oliver-and-company-1988",
  "The Emperor's New Groove": "https://cinejoy.pk/movie/11688-the-emperors-new-groove-2000",
  "Treasure Planet": "https://cinejoy.pk/movie/9016-treasure-planet-2002",
  "Atlantis: The Lost Empire": "https://cinejoy.pk/movie/10865-atlantis-the-lost-empire-2001",
  "Cars 3": "https://cinejoy.pk/movie/260514-cars-3-2017",
  "Chicken Run: Dawn of the Nugget": "https://cinejoy.pk/movie/520758-chicken-run-dawn-of-the-nugget-2023",
  "Corpse Bride": "https://cinejoy.pk/movie/3933-corpse-bride-2005",
  "Paddington 2": "https://cinejoy.pk/movie/346648-paddington-2-2017",
  "Paddington": "https://cinejoy.pk/movie/116149-paddington-2014",
  "Golmaal: Fun Unlimited": "https://cinejoy.pk/movie/19670-golmaal-fun-unlimited-2006",
  "Bhool Bhulaiyaa": "https://cinejoy.pk/movie/19025-bhool-bhulaiyaa-2007",
  "Dream Girl": "https://cinejoy.pk/movie/579224-dream-girl-2019",
  "Bareilly Ki Barfi": "https://cinejoy.pk/movie/467106-bareilly-ki-barfi-2017",
  "Hum Dil De Chuke Sanam": "https://cinejoy.pk/movie/5319-hum-dil-de-chuke-sanam-1999",
  "Rockstar": "https://cinejoy.pk/movie/79464-rockstar-2011",
  "Welcome": "https://cinejoy.pk/movie/20294-welcome-2007",
  "Housefull": "https://cinejoy.pk/movie/58051-housefull-2010",
  "The Hangover Part III": "https://cinejoy.pk/movie/109439-the-hangover-part-iii-2013",
  "American Pie 2": "https://cinejoy.pk/movie/2770-american-pie-2-2001",
  "Austin Powers: The Spy Who Shagged Me": "https://cinejoy.pk/movie/817-austin-powers-the-spy-who-shagged-me-1999",
  "Meet the Fockers": "https://cinejoy.pk/movie/693-meet-the-fockers-2004",
  "Night at the Museum": "https://cinejoy.pk/movie/1593-night-at-the-museum-2006",
  "Cheaper by the Dozen": "https://cinejoy.pk/movie/11007-cheaper-by-the-dozen-2003",
  "Daddy Day Care": "https://cinejoy.pk/movie/10708-daddy-day-care-2003",
  "Paul": "https://cinejoy.pk/movie/39513-paul-2011",
  "Tommy Boy": "https://cinejoy.pk/movie/11381-tommy-boy-1995",
  "Billy Madison": "https://cinejoy.pk/movie/11017-billy-madison-1995",
  "The Waterboy": "https://cinejoy.pk/movie/10663-the-waterboy-1998",
  "Big Daddy": "https://cinejoy.pk/movie/9032-big-daddy-1999",
  "50 First Dates": "https://cinejoy.pk/movie/1824-50-first-dates-2004",
  "Click": "https://cinejoy.pk/movie/9339-click-2006",
  "Just Go with It": "https://cinejoy.pk/movie/50546-just-go-with-it-2011",
  "Grown Ups": "https://cinejoy.pk/movie/38365-grown-ups-2010",
  "Hubie Halloween": "https://cinejoy.pk/movie/617505-hubie-halloween-2020",
  "Murder Mystery": "https://cinejoy.pk/movie/514999-murder-mystery-2019",
  "Me Time": "https://cinejoy.pk/movie/862551-me-time-2022",
  "The Wedding Planner": "https://cinejoy.pk/movie/2018-the-wedding-planner-2001",
  "The Princess Diaries": "https://cinejoy.pk/movie/9880-the-princess-diaries-2001",
  "Freaky Friday": "https://cinejoy.pk/movie/10330-freaky-friday-2003",
  "Confessions of a Shopaholic": "https://cinejoy.pk/movie/20048-confessions-of-a-shopaholic-2009",
  "Pitch Perfect 2": "https://cinejoy.pk/movie/254470-pitch-perfect-2-2015",
  "Step Up": "https://cinejoy.pk/movie/9762-step-up-2006",
  "High School Musical": "https://cinejoy.pk/movie/10947-high-school-musical-2006",
  "Hairspray": "https://cinejoy.pk/movie/2976-hairspray-2007",
  "Grease": "https://cinejoy.pk/movie/621-grease-1978",
  "Sister Act": "https://cinejoy.pk/movie/2005-sister-act-1992",
  "The Parent Trap": "https://cinejoy.pk/movie/9820-the-parent-trap-1998",
  "Jumanji": "https://cinejoy.pk/movie/8844-jumanji-1995",
  "Matilda": "https://cinejoy.pk/movie/10830-matilda-1996",
  "The Sandlot": "https://cinejoy.pk/movie/11528-the-sandlot-1993",
  "Space Jam": "https://cinejoy.pk/movie/2300-space-jam-1996",
  "Space Jam: A New Legacy": "https://cinejoy.pk/movie/379686-space-jam-a-new-legacy-2021",
  "Raat": "https://cinejoy.pk/movie/228012-raat-1992",
  "Bhoot": "https://cinejoy.pk/movie/107937-bhoot-2003",
  "Bulbbul": "https://cinejoy.pk/movie/714338-bulbbul-2020",
  "The Exorcism of Emily Rose": "https://cinejoy.pk/movie/8643-the-exorcism-of-emily-rose-2005",
  "The Conjuring: The Devil Made Me Do It": "https://cinejoy.pk/movie/423108-the-conjuring-the-devil-made-me-do-it-2021",
  "The Nun": "https://cinejoy.pk/movie/439079-the-nun-2018",
  "Annabelle: Creation": "https://cinejoy.pk/movie/396422-annabelle-creation-2017",
  "Insidious: Chapter 2": "https://cinejoy.pk/movie/91586-insidious-chapter-2-2013",
  "Halloween Kills": "https://cinejoy.pk/movie/610253-halloween-kills-2021",
  "Friday the 13th Part 2": "https://cinejoy.pk/movie/9725-friday-the-13th-part-2-1981",
  "A Nightmare on Elm Street 3: Dream Warriors": "https://cinejoy.pk/movie/10072-a-nightmare-on-elm-street-3-dream-warriors-1987",
  "Cult of Chucky": "https://cinejoy.pk/movie/393345-cult-of-chucky-2017",
  "The Purge": "https://cinejoy.pk/movie/158015-the-purge-2013",
  "The Purge: Anarchy": "https://cinejoy.pk/movie/238636-the-purge-anarchy-2014",
  "The Strangers": "https://cinejoy.pk/movie/10665-the-strangers-2008",
  "You're Next": "https://cinejoy.pk/movie/83899-youre-next-2011",
  "Hush": "https://cinejoy.pk/movie/376570-hush-2016",
  "10 Cloverfield Lane": "https://cinejoy.pk/movie/333371-10-cloverfield-lane-2016",
  "Don't Breathe 2": "https://cinejoy.pk/movie/482373-dont-breathe-2-2021",
  "Insidious: The Last Key": "https://cinejoy.pk/movie/406563-insidious-the-last-key-2018",
  "Pet Sematary": "https://cinejoy.pk/movie/8913-pet-sematary-1989",
  "Doctor Sleep": "https://cinejoy.pk/movie/501170-doctor-sleep-2019",
  "Gerald's Game": "https://cinejoy.pk/movie/343674-geralds-game-2017",
  "The Mist": "https://cinejoy.pk/movie/5876-the-mist-2007",
  "Cujo": "https://cinejoy.pk/movie/10489-cujo-1983",
  "Jaws 2": "https://cinejoy.pk/movie/579-jaws-2-1978",
  "Alien vs. Predator": "https://cinejoy.pk/movie/395-alien-vs-predator-2004",
  "Resident Evil": "https://cinejoy.pk/movie/1576-resident-evil-2002",
  "Underworld": "https://cinejoy.pk/movie/277-underworld-2003",
  "Van Helsing": "https://cinejoy.pk/movie/7131-van-helsing-2004",
  "Zombieland: Double Tap": "https://cinejoy.pk/movie/338967-zombieland-double-tap-2019",
  "Army of the Dead": "https://cinejoy.pk/movie/503736-army-of-the-dead-2021",
  "Dawn of the Dead": "https://cinejoy.pk/movie/924-dawn-of-the-dead-2004",
  "Night of the Living Dead": "https://cinejoy.pk/movie/10331-night-of-the-living-dead-1968",
  "Strangers on a Train": "https://cinejoy.pk/movie/845-strangers-on-a-train-1951",
  "The Birds": "https://cinejoy.pk/movie/571-the-birds-1963",
  "Cape Fear": "https://cinejoy.pk/movie/1598-cape-fear-1991",
  "Basic Instinct": "https://cinejoy.pk/movie/402-basic-instinct-1992",
  "Fatal Attraction": "https://cinejoy.pk/movie/10998-fatal-attraction-1987",
  "Eyes Wide Shut": "https://cinejoy.pk/movie/345-eyes-wide-shut-1999",
  "The Machinist": "https://cinejoy.pk/movie/4553-the-machinist-2004",
  "Identity": "https://cinejoy.pk/movie/2832-identity-2003",
  "Secret Window": "https://cinejoy.pk/movie/1586-secret-window-2004",
  "The Number 23": "https://cinejoy.pk/movie/3594-the-number-23-2007",
  "Disturbia": "https://cinejoy.pk/movie/8271-disturbia-2007",
  "Fracture": "https://cinejoy.pk/movie/6145-fracture-2007",
  "Law Abiding Citizen": "https://cinejoy.pk/movie/22803-law-abiding-citizen-2009",
  "The Town": "https://cinejoy.pk/movie/23168-the-town-2010",
  "Contagion": "https://cinejoy.pk/movie/39538-contagion-2011",
  "Side Effects": "https://cinejoy.pk/movie/109421-side-effects-2013",
  "Oculus": "https://cinejoy.pk/movie/157547-oculus-2013",
  "The Call": "https://cinejoy.pk/movie/158011-the-call-2013",
  "Trance": "https://cinejoy.pk/movie/68727-trance-2013",
  "The Gambler": "https://cinejoy.pk/movie/284536-the-gambler-2014",
  "Unknown": "https://cinejoy.pk/movie/48138-unknown-2011",
  "Non-Stop": "https://cinejoy.pk/movie/225574-non-stop-2014",
  "The Girl on the Train": "https://cinejoy.pk/movie/346685-the-girl-on-the-train-2016",
  "Nocturnal Animals": "https://cinejoy.pk/movie/340666-nocturnal-animals-2016",
  "Mother!": "https://cinejoy.pk/movie/381283-mother-2017",
  "Bird Box Barcelona": "https://cinejoy.pk/movie/805320-bird-box-barcelona-2023",
  "Badla": "https://cinejoy.pk/movie/581361-badla-2019",
  "Baby": "https://cinejoy.pk/movie/314389-baby-2015",
  "Don": "https://cinejoy.pk/movie/17501-don-2006",
  "Agent Vinod": "https://cinejoy.pk/movie/85050-agent-vinod-2012",
  "Ek Tha Tiger": "https://cinejoy.pk/movie/85985-ek-tha-tiger-2012",
  "Snowpiercer": "https://cinejoy.pk/movie/110415-snowpiercer-2013",
  "Okja": "https://cinejoy.pk/movie/387426-okja-2017",
  "The Host": "https://cinejoy.pk/movie/1255-the-host-2006",
  "Exit": "https://cinejoy.pk/movie/572164-exit-2019",
  "Along with the Gods: The Two Worlds": "https://cinejoy.pk/movie/397567-along-with-the-gods-the-two-worlds-2017",
  "Extreme Job": "https://cinejoy.pk/movie/567646-extreme-job-2019",
  "The Good, the Bad, the Weird": "https://cinejoy.pk/movie/15067-the-good-the-bad-the-weird-2008",
  "Sympathy for Mr. Vengeance": "https://cinejoy.pk/movie/4689-sympathy-for-mr-vengeance-2002",
  "Talk to Her": "https://cinejoy.pk/movie/64-talk-to-her-2002",
  "All About My Mother": "https://cinejoy.pk/movie/99-all-about-my-mother-1999",
  "Volver": "https://cinejoy.pk/movie/219-volver-2006",
  "The Skin I Live In": "https://cinejoy.pk/movie/63311-the-skin-i-live-in-2011",
  "The Orphanage": "https://cinejoy.pk/movie/6537-the-orphanage-2007",
  "Julieta": "https://cinejoy.pk/movie/332872-julieta-2016",
  "Pain and Glory": "https://cinejoy.pk/movie/519010-pain-and-glory-2019",
  "Dark Water": "https://cinejoy.pk/movie/12205-dark-water-2002",
  "Battle Royale": "https://cinejoy.pk/movie/3176-battle-royale-2000",
  "Shin Godzilla": "https://cinejoy.pk/movie/315011-shin-godzilla-2016",
  "Solaris": "https://cinejoy.pk/movie/593-solaris-1972",
  "Cabaret": "https://cinejoy.pk/movie/10784-cabaret-1972",
  "The Godfather Part III": "https://cinejoy.pk/movie/242-the-godfather-part-iii-1990",
  "Rocky III": "https://cinejoy.pk/movie/1371-rocky-iii-1982",
  "Rocky IV": "https://cinejoy.pk/movie/1374-rocky-iv-1985",
  "Rambo": "https://cinejoy.pk/movie/7555-rambo-2008",
  "Rambo: Last Blood": "https://cinejoy.pk/movie/522938-rambo-last-blood-2019",
  "The Expendables 3": "https://cinejoy.pk/movie/138103-the-expendables-3-2014",
  "Escape Plan": "https://cinejoy.pk/movie/107846-escape-plan-2013",
  "Cliffhanger": "https://cinejoy.pk/movie/9350-cliffhanger-1993",
  "Demolition Man": "https://cinejoy.pk/movie/9739-demolition-man-1993",
  "Judge Dredd": "https://cinejoy.pk/movie/9482-judge-dredd-1995",
  "Universal Soldier": "https://cinejoy.pk/movie/9349-universal-soldier-1992",
  "Bloodsport": "https://cinejoy.pk/movie/11690-bloodsport-1988",
  "Kickboxer": "https://cinejoy.pk/movie/10222-kickboxer-1989",
  "The Karate Kid": "https://cinejoy.pk/movie/1885-the-karate-kid-1984",
  "The Karate Kid Part II": "https://cinejoy.pk/movie/8856-the-karate-kid-part-ii-1986",
  "Rambo: First Blood Part II": "https://cinejoy.pk/movie/1369-rambo-first-blood-part-ii-1985",
  "Commando": "https://cinejoy.pk/movie/10999-commando-1985",
  "True Lies": "https://cinejoy.pk/movie/36955-true-lies-1994",
  "Blade": "https://cinejoy.pk/movie/36647-blade-1998",
  "Enemy of the State": "https://cinejoy.pk/movie/9798-enemy-of-the-state-1998",
  "Gone in 60 Seconds": "https://cinejoy.pk/movie/9679-gone-in-60-seconds-2000",
  "Charlie's Angels": "https://cinejoy.pk/movie/4327-charlies-angels-2000",
  "The Transporter": "https://cinejoy.pk/movie/4108-the-transporter-2002",
  "xXx": "https://cinejoy.pk/movie/7451-xxx-2002",
  "Bad Boys II": "https://cinejoy.pk/movie/8961-bad-boys-ii-2003",
  "Man on Fire": "https://cinejoy.pk/movie/9509-man-on-fire-2004",
  "Live Free or Die Hard": "https://cinejoy.pk/movie/1571-live-free-or-die-hard-2007",
  "Wanted": "https://cinejoy.pk/movie/8909-wanted-2008",
  "Salt": "https://cinejoy.pk/movie/27576-salt-2010",
  "The Expendables": "https://cinejoy.pk/movie/27578-the-expendables-2010",
  "Sherlock Holmes": "https://cinejoy.pk/movie/10528-sherlock-holmes-2009",
  "Safe House": "https://cinejoy.pk/movie/59961-safe-house-2012",
  "Olympus Has Fallen": "https://cinejoy.pk/movie/117263-olympus-has-fallen-2013",
  "White House Down": "https://cinejoy.pk/movie/117251-white-house-down-2013",
  "Jack Reacher": "https://cinejoy.pk/movie/75780-jack-reacher-2012",
  "The Fate of the Furious": "https://cinejoy.pk/movie/337339-the-fate-of-the-furious-2017",
  "Atomic Blonde": "https://cinejoy.pk/movie/341013-atomic-blonde-2017",
  "The Meg": "https://cinejoy.pk/movie/345940-the-meg-2018",
  "Hobbs & Shaw": "https://cinejoy.pk/movie/384018-hobbs-and-shaw-2019",
  "Tomb Raider": "https://cinejoy.pk/movie/338970-tomb-raider-2018",
  "Greyhound": "https://cinejoy.pk/movie/516486-greyhound-2020",
  "Free Fire": "https://cinejoy.pk/movie/334521-free-fire-2016",
  "Mortal Kombat": "https://cinejoy.pk/movie/460465-mortal-kombat-2021",
  "Road House": "https://cinejoy.pk/movie/359410-road-house-2024",
  "Contact": "https://cinejoy.pk/movie/686-contact-1997",
  "Deep Impact": "https://cinejoy.pk/movie/8656-deep-impact-1998",
  "Galaxy Quest": "https://cinejoy.pk/movie/926-galaxy-quest-1999",
  "The Time Machine": "https://cinejoy.pk/movie/2135-the-time-machine-2002",
  "Equilibrium": "https://cinejoy.pk/movie/7299-equilibrium-2002",
  "Serenity": "https://cinejoy.pk/movie/16320-serenity-2005",
  "Sunshine": "https://cinejoy.pk/movie/1272-sunshine-2007",
  "Moon": "https://cinejoy.pk/movie/17431-moon-2009",
  "Predators": "https://cinejoy.pk/movie/34851-predators-2010",
  "Super 8": "https://cinejoy.pk/movie/37686-super-8-2011",
  "Prometheus": "https://cinejoy.pk/movie/70981-prometheus-2012",
  "Edge of Darkness": "https://cinejoy.pk/movie/12201-edge-of-darkness-2010",
  "Chappie": "https://cinejoy.pk/movie/198184-chappie-2015",
  "Ant-Man and the Wasp": "https://cinejoy.pk/movie/363088-ant-man-and-the-wasp-2018",
  "Ad Astra": "https://cinejoy.pk/movie/419704-ad-astra-2019",
  "Moonfall": "https://cinejoy.pk/movie/406759-moonfall-2022",
  "The Electric State": "https://cinejoy.pk/movie/777443-the-electric-state-2025",
  "Hercules": "https://cinejoy.pk/movie/11970-hercules-1997",
  "Robots": "https://cinejoy.pk/movie/9928-robots-2005",
  "Over the Hedge": "https://cinejoy.pk/movie/7518-over-the-hedge-2006",
  "Happy Feet": "https://cinejoy.pk/movie/9836-happy-feet-2006",
  "Bee Movie": "https://cinejoy.pk/movie/5559-bee-movie-2007",
  "Planes": "https://cinejoy.pk/movie/151960-planes-2013",
  "The Peanuts Movie": "https://cinejoy.pk/movie/227973-the-peanuts-movie-2015",
  "Ferdinand": "https://cinejoy.pk/movie/364689-ferdinand-2017",
  "Smallfoot": "https://cinejoy.pk/movie/446894-smallfoot-2018",
  "Abominable": "https://cinejoy.pk/movie/431580-abominable-2019",
  "Ruby Gillman, Teenage Kraken": "https://cinejoy.pk/movie/1040148-ruby-gillman-teenage-kraken-2023",
  "The Bad Guys": "https://cinejoy.pk/movie/629542-the-bad-guys-2022",
  "Caddyshack": "https://cinejoy.pk/movie/11977-caddyshack-1980",
  "Wayne's World": "https://cinejoy.pk/movie/8872-waynes-world-1992",
  "Happy Gilmore": "https://cinejoy.pk/movie/9614-happy-gilmore-1996",
  "Office Space": "https://cinejoy.pk/movie/1542-office-space-1999",
  "Bad Santa": "https://cinejoy.pk/movie/10147-bad-santa-2003",
  "The 40-Year-Old Virgin": "https://cinejoy.pk/movie/6957-the-40-year-old-virgin-2005",
  "Role Models": "https://cinejoy.pk/movie/15373-role-models-2008",
  "Horrible Bosses": "https://cinejoy.pk/movie/51540-horrible-bosses-2011",
  "This Is the End": "https://cinejoy.pk/movie/109414-this-is-the-end-2013",
  "Neighbors": "https://cinejoy.pk/movie/195589-neighbors-2014",
  "Ride Along": "https://cinejoy.pk/movie/168530-ride-along-2014",
  "Spy": "https://cinejoy.pk/movie/238713-spy-2015",
  "The Nice Guys": "https://cinejoy.pk/movie/290250-the-nice-guys-2016",
  "Sausage Party": "https://cinejoy.pk/movie/223702-sausage-party-2016",
  "Girls Trip": "https://cinejoy.pk/movie/417870-girls-trip-2017",
  "Blockers": "https://cinejoy.pk/movie/437557-blockers-2018",
  "Long Shot": "https://cinejoy.pk/movie/459992-long-shot-2019",
  "The Omen": "https://cinejoy.pk/movie/794-the-omen-1976",
  "Carrie": "https://cinejoy.pk/movie/7340-carrie-1976",
  "Poltergeist": "https://cinejoy.pk/movie/609-poltergeist-1982",
  "Hellraiser": "https://cinejoy.pk/movie/9003-hellraiser-1987",
  "Child's Play": "https://cinejoy.pk/movie/10585-childs-play-1988",
  "Candyman": "https://cinejoy.pk/movie/9529-candyman-1992",
  "Interview with the Vampire": "https://cinejoy.pk/movie/628-interview-with-the-vampire-1994",
  "Final Destination": "https://cinejoy.pk/movie/9532-final-destination-2000",
  "The Others": "https://cinejoy.pk/movie/1933-the-others-2001",
  "Wrong Turn": "https://cinejoy.pk/movie/9902-wrong-turn-2003",
  "The Texas Chain Saw Massacre": "https://cinejoy.pk/movie/30497-the-texas-chain-saw-massacre-1974",
  "Drag Me to Hell": "https://cinejoy.pk/movie/16871-drag-me-to-hell-2009",
  "Evil Dead": "https://cinejoy.pk/movie/109428-evil-dead-2013",
  "It Follows": "https://cinejoy.pk/movie/270303-it-follows-2014",
  "The Witch": "https://cinejoy.pk/movie/310131-the-witch-2015",
  "Don't Breathe": "https://cinejoy.pk/movie/300669-dont-breathe-2016",
  "Split": "https://cinejoy.pk/movie/381288-split-2016",
  "The Black Phone": "https://cinejoy.pk/movie/756999-the-black-phone-2022",
  "Bring Her Back": "https://cinejoy.pk/movie/1151031-bring-her-back-2025",
  "Misery": "https://cinejoy.pk/movie/1700-misery-1990",
  "The Fugitive": "https://cinejoy.pk/movie/5503-the-fugitive-1993",
  "Phone Booth": "https://cinejoy.pk/movie/1817-phone-booth-2002",
  "Flightplan": "https://cinejoy.pk/movie/9315-flightplan-2005",
  "Gone Baby Gone": "https://cinejoy.pk/movie/4771-gone-baby-gone-2007",
  "Taken 3": "https://cinejoy.pk/movie/260346-taken-3-2014",
  "The Gift": "https://cinejoy.pk/movie/317734-the-gift-2015",
  "Run": "https://cinejoy.pk/movie/528215-run-2020",
  "The Invisible Man": "https://cinejoy.pk/movie/570670-the-invisible-man-2020",
  "Fall": "https://cinejoy.pk/movie/985939-fall-2022",
  "Philadelphia": "https://cinejoy.pk/movie/9800-philadelphia-1993",
  "Erin Brockovich": "https://cinejoy.pk/movie/462-erin-brockovich-2000",
  "Crash": "https://cinejoy.pk/movie/1640-crash-2004",
  "Frost/Nixon": "https://cinejoy.pk/movie/11499-frost-nixon-2008",
  "The Reader": "https://cinejoy.pk/movie/8055-the-reader-2008",
  "Precious": "https://cinejoy.pk/movie/25793-precious-2009",
  "127 Hours": "https://cinejoy.pk/movie/44115-127-hours-2010",
  "Argo": "https://cinejoy.pk/movie/68734-argo-2012",
  "Philomena": "https://cinejoy.pk/movie/205220-philomena-2013",
  "Nebraska": "https://cinejoy.pk/movie/129670-nebraska-2013",
  "Selma": "https://cinejoy.pk/movie/273895-selma-2014",
  "Steve Jobs": "https://cinejoy.pk/movie/321697-steve-jobs-2015",
  "Brooklyn": "https://cinejoy.pk/movie/167073-brooklyn-2015",
  "Manchester by the Sea": "https://cinejoy.pk/movie/334541-manchester-by-the-sea-2016",
  "Fences": "https://cinejoy.pk/movie/393457-fences-2016",
  "Moonlight": "https://cinejoy.pk/movie/376867-moonlight-2016",
  "Darkest Hour": "https://cinejoy.pk/movie/399404-darkest-hour-2017",
  "BlacKkKlansman": "https://cinejoy.pk/movie/487558-blackkklansman-2018",
  "Vice": "https://cinejoy.pk/movie/429197-vice-2018",
  "First Man": "https://cinejoy.pk/movie/369972-first-man-2018",
  "Marriage Story": "https://cinejoy.pk/movie/492188-marriage-story-2019",
  "Little Women": "https://cinejoy.pk/movie/483347-little-women-2019",
  "Judy": "https://cinejoy.pk/movie/491283-judy-2019",
  "The Trial of the Chicago 7": "https://cinejoy.pk/movie/556984-the-trial-of-the-chicago-7-2020",
  "Mank": "https://cinejoy.pk/movie/614560-mank-2020",
  "King Richard": "https://cinejoy.pk/movie/614917-king-richard-2021",
  "Women Talking": "https://cinejoy.pk/movie/777245-women-talking-2022",
  "Aftersun": "https://cinejoy.pk/movie/965150-aftersun-2022",
  "An Affair to Remember": "https://cinejoy.pk/movie/8356-an-affair-to-remember-1957",
  "Sense and Sensibility": "https://cinejoy.pk/movie/4584-sense-and-sensibility-1995",
  "Shakespeare in Love": "https://cinejoy.pk/movie/1934-shakespeare-in-love-1998",
  "Moulin Rouge!": "https://cinejoy.pk/movie/824-moulin-rouge-2001",
  "How to Lose a Guy in 10 Days": "https://cinejoy.pk/movie/9919-how-to-lose-a-guy-in-10-days-2003",
  "13 Going on 30": "https://cinejoy.pk/movie/10096-13-going-on-30-2004",
  "Atonement": "https://cinejoy.pk/movie/4347-atonement-2007",
  "Beginners": "https://cinejoy.pk/movie/55347-beginners-2010",
  "The Big Sick": "https://cinejoy.pk/movie/416477-the-big-sick-2017",
  "Love, Simon": "https://cinejoy.pk/movie/449176-love-simon-2018",
  "Always Be My Maybe": "https://cinejoy.pk/movie/513576-always-be-my-maybe-2019",
  "Miller's Crossing": "https://cinejoy.pk/movie/379-millers-crossing-1990",
  "Road to Perdition": "https://cinejoy.pk/movie/4147-road-to-perdition-2002",
  "Layer Cake": "https://cinejoy.pk/movie/4836-layer-cake-2004",
  "Lord of War": "https://cinejoy.pk/movie/1830-lord-of-war-2005",
  "Eastern Promises": "https://cinejoy.pk/movie/2252-eastern-promises-2007",
  "In Bruges": "https://cinejoy.pk/movie/8321-in-bruges-2008",
  "Public Enemies": "https://cinejoy.pk/movie/11322-public-enemies-2009",
  "Killing Them Softly": "https://cinejoy.pk/movie/64689-killing-them-softly-2012",
  "Widows": "https://cinejoy.pk/movie/401469-widows-2018",
  "Legend": "https://cinejoy.pk/movie/11976-legend-1985",
  "Willow": "https://cinejoy.pk/movie/847-willow-1988",
  "Hook": "https://cinejoy.pk/movie/879-hook-1991",
  "The NeverEnding Story": "https://cinejoy.pk/movie/34584-the-neverending-story-1984",
  "Labyrinth": "https://cinejoy.pk/movie/13597-labyrinth-1986",
  "The Dark Crystal": "https://cinejoy.pk/movie/11639-the-dark-crystal-1982",
  "Edward Scissorhands": "https://cinejoy.pk/movie/162-edward-scissorhands-1990",
  "Dragonheart": "https://cinejoy.pk/movie/8840-dragonheart-1996",
  "Mirror Mirror": "https://cinejoy.pk/movie/62764-mirror-mirror-2012",
  "Snow White and the Huntsman": "https://cinejoy.pk/movie/58595-snow-white-and-the-huntsman-2012",
  "Oz the Great and Powerful": "https://cinejoy.pk/movie/68728-oz-the-great-and-powerful-2013",
  "The Golden Compass": "https://cinejoy.pk/movie/2268-the-golden-compass-2007",
  "Eragon": "https://cinejoy.pk/movie/2486-eragon-2006",
  "Inkheart": "https://cinejoy.pk/movie/2309-inkheart-2008",
  "The Cloverfield Paradox": "https://cinejoy.pk/movie/384521-the-cloverfield-paradox-2018",
  "Dungeons & Dragons: Honor Among Thieves": "https://cinejoy.pk/movie/493529-dungeons-and-dragons-honor-among-thieves-2023",
  "Patton": "https://cinejoy.pk/movie/11202-patton-1970",
  "Empire of the Sun": "https://cinejoy.pk/movie/10110-empire-of-the-sun-1987",
  "Gallipoli": "https://cinejoy.pk/movie/11646-gallipoli-1981",
  "Glory": "https://cinejoy.pk/movie/9665-glory-1989",
  "Defiance": "https://cinejoy.pk/movie/13813-defiance-2008",
  "Tora! Tora! Tora!": "https://cinejoy.pk/movie/11165-tora-tora-tora-1970",
  "Enemy at the Gates": "https://cinejoy.pk/movie/853-enemy-at-the-gates-2001",
  "We Were Soldiers": "https://cinejoy.pk/movie/10590-we-were-soldiers-2002",
  "Pearl Harbor": "https://cinejoy.pk/movie/676-pearl-harbor-2001",
  "Midway": "https://cinejoy.pk/movie/522162-midway-2019",
  "Shane": "https://cinejoy.pk/movie/3110-shane-1953",
  "The Wild Bunch": "https://cinejoy.pk/movie/576-the-wild-bunch-1969",
  "Pale Rider": "https://cinejoy.pk/movie/8879-pale-rider-1985",
  "Open Range": "https://cinejoy.pk/movie/2055-open-range-2003",
  "3:10 to Yuma": "https://cinejoy.pk/movie/5176-310-to-yuma-2007",
  "Star Wars: The Force Awakens": "https://cinejoy.pk/movie/star-wars-the-force-awakens-2015",
  "Harry Potter and the Sorcerer's Stone": "https://cinejoy.pk/movie/harry-potter-and-the-sorcerers-stone-2001",
  "Harry Potter and the Deathly Hallows: Part 1": "https://cinejoy.pk/movie/harry-potter-and-the-deathly-hallows-part-1-2010",
  "Mission: Impossible - Fallout": "https://cinejoy.pk/movie/mission-impossible-fallout-2018",
  "Mission: Impossible - Dead Reckoning": "https://cinejoy.pk/movie/mission-impossible-dead-reckoning-2023",
  "Mission: Impossible - Rogue Nation": "https://cinejoy.pk/movie/mission-impossible-rogue-nation-2015",
  "Mission: Impossible - Ghost Protocol": "https://cinejoy.pk/movie/mission-impossible-ghost-protocol-2011",
  "John Wick: Chapter 3 - Parabellum": "https://cinejoy.pk/movie/john-wick-chapter-3-parabellum-2019",
  "A Quiet Place Part II": "https://cinejoy.pk/movie/a-quiet-place-part-ii-2020",
  "It Chapter Two": "https://cinejoy.pk/movie/it-chapter-two-2019",
  "The Irish Man": "https://cinejoy.pk/movie/the-irish-man-2019",
  "Master and Commander": "https://cinejoy.pk/movie/master-and-commander-2003",
  "Frozen II": "https://cinejoy.pk/movie/frozen-ii-2019",
  "500 Days of Summer": "https://cinejoy.pk/movie/500-days-of-summer-2009",
  "Kabhi Khushi Kabhie Gham...": "https://cinejoy.pk/movie/kabhi-khushi-kabhie-gham-2001",
  "Mission: Impossible - The Final Reckoning": "https://cinejoy.pk/movie/mission-impossible-the-final-reckoning-2025",
  "F1: The Movie": "https://cinejoy.pk/movie/f1-the-movie-2025",
  "The Mitchells vs. the Machines": "https://cinejoy.pk/movie/the-mitchells-vs-the-machines-2021",
  "Mission: Impossible - Dead Reckoning Part One": "https://cinejoy.pk/movie/mission-impossible-dead-reckoning-part-one-2023",
  "Salaar: Part 1 - Ceasefire": "https://cinejoy.pk/movie/salaar-part-1-ceasefire-2023",
  "Rocky Aur Rani Kii Prem Kahaani": "https://cinejoy.pk/movie/rocky-aur-rani-kii-prem-kahaani-2023",
  "M.S. Dhoni: The Untold Story": "https://cinejoy.pk/movie/ms-dhoni-the-untold-story-2016",
  "Toilet: Ek Prem Katha": "https://cinejoy.pk/movie/toilet-ek-prem-katha-2017",
  "Brahmastra": "https://cinejoy.pk/movie/brahmastra-2022",
  "Sivaji: The Boss": "https://cinejoy.pk/movie/sivaji-the-boss-2007",
  "Hanu-Man": "https://cinejoy.pk/movie/hanu-man-2024",
  "Star Wars: The Last Jedi": "https://cinejoy.pk/movie/star-wars-the-last-jedi-2017",
  "Star Wars: The Rise of Skywalker": "https://cinejoy.pk/movie/star-wars-the-rise-of-skywalker-2019",
  "Star Wars: Episode I - The Phantom Menace": "https://cinejoy.pk/movie/star-wars-episode-i-the-phantom-menace-1999",
  "Star Wars: Episode II - Attack of the Clones": "https://cinejoy.pk/movie/star-wars-episode-ii-attack-of-the-clones-2002",
  "Star Wars: Episode III - Revenge of the Sith": "https://cinejoy.pk/movie/star-wars-episode-iii-revenge-of-the-sith-2005",
  "Rambo: First Blood": "https://cinejoy.pk/movie/rambo-first-blood-1982",
  "Y Tu Mamá También": "https://cinejoy.pk/movie/y-tu-mam-tambi-n-2001",
  "Il Postino": "https://cinejoy.pk/movie/il-postino-1994",
  "Mirai": "https://cinejoy.pk/movie/mirai-2018",
  "When Harry Met Sally...": "https://cinejoy.pk/movie/when-harry-met-sally-1989",
  "Talladega Nights": "https://cinejoy.pk/movie/talladega-nights-2006",
  "Anyone But You": "https://cinejoy.pk/movie/anyone-but-you-2023",
  "It Ends with Us": "https://cinejoy.pk/movie/it-ends-with-us-2024",
  "Raanjhanaa": "https://cinejoy.pk/movie/raanjhanaa-2013",
  "A Death in the Gunj": "https://cinejoy.pk/movie/a-death-in-the-gunj-2016",
  "Iron Claw": "https://cinejoy.pk/movie/iron-claw-2023",
  "Emilia Perez": "https://cinejoy.pk/movie/emilia-perez-2024",
  "Ponniyin Selvan: Part I": "https://cinejoy.pk/movie/ponniyin-selvan-part-i-2022",
  "Ponniyin Selvan: Part II": "https://cinejoy.pk/movie/ponniyin-selvan-part-ii-2023",
  "OMG 2": "https://cinejoy.pk/movie/omg-2-2023",
  "Iwanttothankyou": "https://cinejoy.pk/movie/iwanttothankyou-2024",
  "God of Cookery": "https://cinejoy.pk/movie/god-of-cookery-1996",
  "La Chimera": "https://cinejoy.pk/movie/la-chimera-2023",
  "Irreversible": "https://cinejoy.pk/movie/irreversible-2002",
  "Blow-Up": "https://cinejoy.pk/movie/blow-up-1966",
  "Adaptation.": "https://cinejoy.pk/movie/adaptation-2002",
  "Band of Outsiders": "https://cinejoy.pk/movie/band-of-outsiders-1964",
  "Paisan": "https://cinejoy.pk/movie/paisan-1946",
  "L'Eclisse": "https://cinejoy.pk/movie/leclisse-1962",
  "The Double Life of Veronique": "https://cinejoy.pk/movie/the-double-life-of-veronique-1991",
  "Nizhalkkuthu": "https://cinejoy.pk/movie/nizhalkkuthu-2002",
  "ARM: Ajayante Randam Mokshanam": "https://cinejoy.pk/movie/arm-ajayante-randam-mokshanam-2024",
  "Kolamaavu Kokila": "https://cinejoy.pk/movie/kolamaavu-kokila-2018",
  "Kottukkaali": "https://cinejoy.pk/movie/kottukkaali-2024",
  "Julayi": "https://cinejoy.pk/movie/julayi-2012",
  "Awe!": "https://cinejoy.pk/movie/awe-2018",
  "Ala Vaikunthapurramuloo": "https://cinejoy.pk/movie/ala-vaikunthapurramuloo-2020",
  "Miss Shetty Mr Polishetty": "https://cinejoy.pk/movie/miss-shetty-mr-polishetty-2023",
  "MAD (2023)": "https://cinejoy.pk/movie/mad-2023-2023",
  "The Secret World of Arrietty": "https://cinejoy.pk/movie/the-secret-world-of-arrietty-2010",
  "Kizumonogatari I: Tekketsu": "https://cinejoy.pk/movie/kizumonogatari-i-tekketsu-2016",
  "Kizumonogatari II: Nekketsu": "https://cinejoy.pk/movie/kizumonogatari-ii-nekketsu-2016",
  "Evangelion: 1.0 You Are (Not) Alone": "https://cinejoy.pk/movie/evangelion-10-you-are-not-alone-2007",
  "Evangelion: 2.0 You Can (Not) Advance": "https://cinejoy.pk/movie/evangelion-20-you-can-not-advance-2009",
  "Evangelion: 3.0 You Can (Not) Redo": "https://cinejoy.pk/movie/evangelion-30-you-can-not-redo-2012",
  "Horizon: An American Saga - Chapter 1": "https://cinejoy.pk/movie/horizon-an-american-saga-chapter-1-2024",
  "Wallace & Gromit: Vengeance Most Fowl": "https://cinejoy.pk/movie/wallace-and-gromit-vengeance-most-fowl-2024",
  "Now You See Me 3": "https://cinejoy.pk/movie/now-you-see-me-3-2025",
  "Saw XI": "https://cinejoy.pk/movie/saw-xi-2025",
  "Deliver Me from Nowhere": "https://cinejoy.pk/movie/deliver-me-from-nowhere-2025",
  "Dune: Messiah": "https://cinejoy.pk/movie/dune-messiah-2026",
  "The Mandalorian & Grogu": "https://cinejoy.pk/movie/the-mandalorian-and-grogu-2026",
  "Supergirl: Woman of Tomorrow": "https://cinejoy.pk/movie/supergirl-woman-of-tomorrow-2026",
  "Fast XI": "https://cinejoy.pk/movie/fast-xi-2026",
  "Ice Age 6": "https://cinejoy.pk/movie/ice-age-6-2026",
  "Godzilla Minus One/Minus Color": "https://cinejoy.pk/movie/godzilla-minus-one-minus-color-2024",
  "Io Capitano": "https://cinejoy.pk/movie/io-capitano-2023",
  "Ramayana: Part 1": "https://cinejoy.pk/movie/ramayana-part-1-2026",
  "Pathaan 2": "https://cinejoy.pk/movie/pathaan-2-2026",
  "Tiger vs Pathaan": "https://cinejoy.pk/movie/tiger-vs-pathaan-2026",
  "Brahmastra: Part Two - Dev": "https://cinejoy.pk/movie/brahmastra-part-two-dev-2026",
  "Vettaiyan": "https://cinejoy.pk/movie/vettaiyan-2024",
  "Aadujeevitham - The Goat Life": "https://cinejoy.pk/movie/aadujeevitham-the-goat-life-2024",
  "ARM (Ajayante Randam Moshanam)": "https://cinejoy.pk/movie/arm-ajayante-randam-moshanam-2024",
  "Guruvayoor Ambalanadayil": "https://cinejoy.pk/movie/guruvayoor-ambalanadayil-2024",
  "Twilight Saga: Breaking Dawn - Part 2": "https://cinejoy.pk/movie/twilight-saga-breaking-dawn-part-2-2012",
  "Alien: Resurrection": "https://cinejoy.pk/movie/alien-resurrection-1997",
  "Valerian and the City of a Thousand Planets": "https://cinejoy.pk/movie/valerian-and-the-city-of-a-thousand-planets-2017",
  "Shazam!": "https://cinejoy.pk/movie/shazam-2019",
  "X2: X-Men United": "https://cinejoy.pk/movie/x2-x-men-united-2003",
  "Tom and Jerry": "https://cinejoy.pk/movie/tom-and-jerry-2021",
  "Anchorman 2": "https://cinejoy.pk/movie/anchorman-2-2013",
  "Exorcist: Believer": "https://cinejoy.pk/movie/exorcist-believer-2023",
  "Chucky": "https://cinejoy.pk/movie/chucky-1988",
  "Talaash": "https://cinejoy.pk/movie/talaash-2012",
  "Lady Vengeance": "https://cinejoy.pk/movie/lady-vengeance-2005",
  "Ringu": "https://cinejoy.pk/movie/ringu-1998",
  "Expendables 2": "https://cinejoy.pk/movie/expendables-2-2012"
};

    const CINEJOY_ALL_SHOWS_URLS = {
  "24": "https://cinejoy.pk/series/1973-24-2001",
  "1883": "https://cinejoy.pk/series/118357-1883-2021",
  "1899": "https://cinejoy.pk/series/90669-1899-2022",
  "1923": "https://cinejoy.pk/series/157744-1923-2022",
  "Breaking Bad": "https://cinejoy.pk/series/1396-breaking-bad-2008",
  "Planet Earth II": "https://cinejoy.pk/series/68595-planet-earth-ii-2016",
  "Planet Earth": "https://cinejoy.pk/series/1044-planet-earth-2006",
  "Band of Brothers": "https://cinejoy.pk/series/4613-band-of-brothers-2001",
  "Chernobyl": "https://cinejoy.pk/series/87108-chernobyl-2019",
  "Mahabharat (1988)": "https://cinejoy.pk/series/12605-mahabharat-1988",
  "The Wire": "https://cinejoy.pk/series/1438-the-wire-2002",
  "Avatar: The Last Airbender": "https://cinejoy.pk/series/246-avatar-the-last-airbender-2005",
  "Blue Planet II": "https://cinejoy.pk/series/74313-blue-planet-ii-2017",
  "Cosmos: A Spacetime Odyssey": "https://cinejoy.pk/series/58474-cosmos-a-spacetime-odyssey-2014",
  "Our Planet": "https://cinejoy.pk/series/83880-our-planet-2019",
  "Ramayan (1987)": "https://cinejoy.pk/series/1990-ramayan-1987",
  "The Chosen": "https://cinejoy.pk/series/85077-the-chosen-2017",
  "The Sopranos": "https://cinejoy.pk/series/1398-the-sopranos-1999",
  "Game of Thrones": "https://cinejoy.pk/series/1399-game-of-thrones-2011",
  "The World at War": "https://cinejoy.pk/series/751-the-world-at-war-1973",
  "Reply 1988": "https://cinejoy.pk/series/64010-reply-1988-2015",
  "Rick and Morty": "https://cinejoy.pk/series/60625-rick-and-morty-2013",
  "The Twilight Zone": "https://cinejoy.pk/series/6357-the-twilight-zone-1959",
  "Sherlock": "https://cinejoy.pk/series/19885-sherlock-2010",
  "Fullmetal Alchemist: Brotherhood": "https://cinejoy.pk/series/31911-fullmetal-alchemist-brotherhood-2009",
  "The Last Dance": "https://cinejoy.pk/series/79525-the-last-dance-2020",
  "Life (Series)": "https://cinejoy.pk/series/16946-life-2009",
  "Attack on Titan": "https://cinejoy.pk/series/1429-attack-on-titan-2013",
  "Gullak": "https://cinejoy.pk/series/90966-gullak-2019",
  "TVF Pitchers": "https://cinejoy.pk/series/63180-tvf-pitchers-2015",
  "Gullak (Season 4)": "https://cinejoy.pk/series/90966-gullak-2024",
  "My Mister": "https://cinejoy.pk/series/76662-my-mister-2018",
  "The Civil War": "https://cinejoy.pk/series/9693-the-civil-war-1990",
  "The Vietnam War": "https://cinejoy.pk/series/46434-the-vietnam-war-2017",
  "Batman: The Animated Series": "https://cinejoy.pk/series/2098-batman-the-animated-series-1992",
  "The Office": "https://cinejoy.pk/series/2316-the-office-2005",
  "Firefly": "https://cinejoy.pk/series/1437-firefly-2002",
  "Only Fools and Horses": "https://cinejoy.pk/series/72-only-fools-and-horses-1981",
  "Better Call Saul": "https://cinejoy.pk/series/60059-better-call-saul-2015",
  "The Beatles: Get Back": "https://cinejoy.pk/series/128876-the-beatles-get-back-2021",
  "Arcane": "https://cinejoy.pk/series/94605-arcane-2021",
  "Kota Factory": "https://cinejoy.pk/series/89113-kota-factory-2019",
  "The Blue Planet": "https://cinejoy.pk/series/13579-the-blue-planet-2001",
  "Frozen Planet": "https://cinejoy.pk/series/8724-frozen-planet-2011",
  "Aspirants": "https://cinejoy.pk/series/124411-aspirants-2021",
  "Misaeng": "https://cinejoy.pk/series/61678-misaeng-2014",
  "Dynasties": "https://cinejoy.pk/series/82953-dynasties-2018",
  "Malgudi Days": "https://cinejoy.pk/series/15211-malgudi-days-1986",
  "Kota Factory (Season 3)": "https://cinejoy.pk/series/89113-kota-factory-2024",
  "Bluey": "https://cinejoy.pk/series/82728-bluey-2018",
  "Office Office": "https://cinejoy.pk/series/18327-office-office-2001",
  "Detectorists": "https://cinejoy.pk/series/61828-detectorists-2014",
  "Africa": "https://cinejoy.pk/series/46664-africa-2013",
  "True Detective": "https://cinejoy.pk/series/46648-true-detective-2014",
  "Death Note": "https://cinejoy.pk/series/13916-death-note-2006",
  "Fargo (Series)": "https://cinejoy.pk/series/60622-fargo-2014",
  "Friends": "https://cinejoy.pk/series/1668-friends-1994",
  "Seinfeld": "https://cinejoy.pk/series/1400-seinfeld-1989",
  "Succession": "https://cinejoy.pk/series/76331-succession-2018",
  "One Piece": "https://cinejoy.pk/series/37854-one-piece-1999",
  "Cowboy Bebop": "https://cinejoy.pk/series/30991-cowboy-bebop-1998",
  "Gravity Falls": "https://cinejoy.pk/series/40075-gravity-falls-2012",
  "Panchayat": "https://cinejoy.pk/series/101352-panchayat-2020",
  "Rocket Boys": "https://cinejoy.pk/series/138211-rocket-boys-2022",
  "When They See Us": "https://cinejoy.pk/series/81355-when-they-see-us-2019",
  "The West Wing": "https://cinejoy.pk/series/688-the-west-wing-1999",
  "Seven Worlds, One Planet": "https://cinejoy.pk/series/90790-seven-worlds-one-planet-2019",
  "X-Men '97": "https://cinejoy.pk/series/138502-x-men-97-2024",
  "Panchayat (Season 3)": "https://cinejoy.pk/series/101352-panchayat-2024",
  "Twinkling Watermelon": "https://cinejoy.pk/series/212204-twinkling-watermelon-2023",
  "Bleach: Thousand-Year Blood War": "https://cinejoy.pk/series/332002-bleach-thousand-year-blood-war-2022",
  "Gintama": "https://cinejoy.pk/series/57041-gintama-2006",
  "Peaky Blinders": "https://cinejoy.pk/series/60574-peaky-blinders-2013",
  "Narcos": "https://cinejoy.pk/series/63351-narcos-2015",
  "The Last of Us": "https://cinejoy.pk/series/100088-the-last-of-us-2023",
  "Ted Lasso": "https://cinejoy.pk/series/97546-ted-lasso-2020",
  "Twin Peaks": "https://cinejoy.pk/series/1920-twin-peaks-1990",
  "It's Always Sunny in Philadelphia": "https://cinejoy.pk/series/2710-its-always-sunny-in-philadelphia-2005",
  "Curb Your Enthusiasm": "https://cinejoy.pk/series/4546-curb-your-enthusiasm-2000",
  "Vinland Saga": "https://cinejoy.pk/series/88803-vinland-saga-2019",
  "BoJack Horseman": "https://cinejoy.pk/series/61222-bojack-horseman-2014",
  "Dragon Ball Z": "https://cinejoy.pk/series/12971-dragon-ball-z-1989",
  "Steins;Gate": "https://cinejoy.pk/series/42509-steins-gate-2011",
  "Over the Garden Wall": "https://cinejoy.pk/series/61617-over-the-garden-wall-2014",
  "Bocchi the Rock!": "https://cinejoy.pk/series/119100-bocchi-the-rock-2022",
  "Fawlty Towers": "https://cinejoy.pk/series/2207-fawlty-towers-1975",
  "Yes Minister": "https://cinejoy.pk/series/4549-yes-minister-1980",
  "Hospital Playlist": "https://cinejoy.pk/series/96102-hospital-playlist-2020",
  "When Life Gives You Tangerines": "https://cinejoy.pk/series/219246-when-life-gives-you-tangerines-2025",
  "Beyond Evil": "https://cinejoy.pk/series/116612-beyond-evil-2021",
  "Severance (Season 2)": "https://cinejoy.pk/series/95396-severance-2025",
  "The Last of Us (Season 2)": "https://cinejoy.pk/series/100088-the-last-of-us-2025",
  "Sarabhai vs Sarabhai": "https://cinejoy.pk/series/4165-sarabhai-vs-sarabhai-2004",
  "Father Ted": "https://cinejoy.pk/series/1813-father-ted-1995",
  "Blackadder": "https://cinejoy.pk/series/7246-blackadder-1983",
  "Stranger Things": "https://cinejoy.pk/series/66732-stranger-things-2016",
  "Black Mirror": "https://cinejoy.pk/series/42009-black-mirror-2011",
  "Mad Men": "https://cinejoy.pk/series/1104-mad-men-2007",
  "The Boys": "https://cinejoy.pk/series/76479-the-boys-2019",
  "Dark": "https://cinejoy.pk/series/70523-dark-2017",
  "The Mandalorian": "https://cinejoy.pk/series/82856-the-mandalorian-2019",
  "Dexter": "https://cinejoy.pk/series/1405-dexter-2006",
  "The Marvelous Mrs. Maisel": "https://cinejoy.pk/series/70796-the-marvelous-mrs-maisel-2017",
  "Arrested Development": "https://cinejoy.pk/series/4589-arrested-development-2003",
  "Severance": "https://cinejoy.pk/series/95396-severance-2022",
  "Fleabag": "https://cinejoy.pk/series/67070-fleabag-2016",
  "Yellowstone": "https://cinejoy.pk/series/73586-yellowstone-2018",
  "Downton Abbey": "https://cinejoy.pk/series/33907-downton-abbey-2010",
  "Rome": "https://cinejoy.pk/series/1891-rome-2005",
  "Line of Duty": "https://cinejoy.pk/series/43982-line-of-duty-2012",
  "House M.D.": "https://cinejoy.pk/series/1408-house-md-2004",
  "Battlestar Galactica": "https://cinejoy.pk/series/1972-battlestar-galactica-2004",
  "Star Trek: The Next Generation": "https://cinejoy.pk/series/655-star-trek-the-next-generation-1987",
  "Invincible": "https://cinejoy.pk/series/95557-invincible-2021",
  "Monster": "https://cinejoy.pk/series/30981-monster-2004",
  "Haikyu!!": "https://cinejoy.pk/series/60863-haikyu-2014",
  "The Simpsons": "https://cinejoy.pk/series/456-the-simpsons-1989",
  "The Family Man": "https://cinejoy.pk/series/93352-the-family-man-2019",
  "Gomorrah": "https://cinejoy.pk/series/61068-gomorrah-2014",
  "The Pitt": "https://cinejoy.pk/series/250307-the-pitt-2025",
  "Blue Eye Samurai": "https://cinejoy.pk/series/225180-blue-eye-samurai-2023",
  "This Is Us": "https://cinejoy.pk/series/67136-this-is-us-2016",
  "Black Warrant": "https://cinejoy.pk/series/279339-black-warrant-2025",
  "Yeh Meri Family": "https://cinejoy.pk/series/81166-yeh-meri-family-2018",
  "Crash Landing on You": "https://cinejoy.pk/series/94796-crash-landing-on-you-2019",
  "Move to Heaven": "https://cinejoy.pk/series/96571-move-to-heaven-2021",
  "It's Okay to Not Be Okay": "https://cinejoy.pk/series/96462-its-okay-to-not-be-okay-2020",
  "Signal": "https://cinejoy.pk/series/64840-signal-2016",
  "Mr. Sunshine": "https://cinejoy.pk/series/75820-mr-sunshine-2018",
  "Prison Playbook": "https://cinejoy.pk/series/74821-prison-playbook-2017",
  "Stranger": "https://cinejoy.pk/series/70626-stranger-2017",
  "Sunderland 'Til I Die": "https://cinejoy.pk/series/84777-sunderland-til-i-die-2018",
  "Top Gear": "https://cinejoy.pk/series/45-top-gear-2002",
  "Byomkesh Bakshi": "https://cinejoy.pk/series/62707-byomkesh-bakshi-1993",
  "Scavengers Reign": "https://cinejoy.pk/series/204154-scavengers-reign-2023",
  "Invincible (Season 2)": "https://cinejoy.pk/series/95557-invincible-2024",
  "ImMature": "https://cinejoy.pk/series/87030-immature-2019",
  "Lovely Runner": "https://cinejoy.pk/series/230923-lovely-runner-2024",
  "Alchemy of Souls": "https://cinejoy.pk/series/135157-alchemy-of-souls-2022",
  "Six Feet Under": "https://cinejoy.pk/series/1274-six-feet-under-2001",
  "The Bureau (Le Bureau des Legendes)": "https://cinejoy.pk/series/62476-the-bureau-2015",
  "The Bureau": "https://cinejoy.pk/series/62476-the-bureau-2015",
  "The Newsroom": "https://cinejoy.pk/series/15621-the-newsroom-2012",
  "Oz": "https://cinejoy.pk/series/3322-oz-1997",
  "The Thick of It": "https://cinejoy.pk/series/4507-the-thick-of-it-2005",
  "Infinity Train": "https://cinejoy.pk/series/91425-infinity-train-2019",
  "Mushishi": "https://cinejoy.pk/series/26867-mushishi-2005",
  "Berserk": "https://cinejoy.pk/series/35935-berserk-1997",
  "Made in Abyss": "https://cinejoy.pk/series/72636-made-in-abyss-2017",
  "Odd Taxi": "https://cinejoy.pk/series/116727-odd-taxi-2021",
  "Farscape": "https://cinejoy.pk/series/4271-farscape-1999",
  "The Shield": "https://cinejoy.pk/series/1414-the-shield-2002",
  "Fruits Basket": "https://cinejoy.pk/series/85991-fruits-basket-2019",
  "The Crown": "https://cinejoy.pk/series/65494-the-crown-2016",
  "House of Cards": "https://cinejoy.pk/series/1425-house-of-cards-2013",
  "Mindhunter": "https://cinejoy.pk/series/67744-mindhunter-2017",
  "Parks and Recreation": "https://cinejoy.pk/series/8592-parks-and-recreation-2009",
  "The Bear": "https://cinejoy.pk/series/136315-the-bear-2022",
  "Deadwood": "https://cinejoy.pk/series/1406-deadwood-2004",
  "Boardwalk Empire": "https://cinejoy.pk/series/1621-boardwalk-empire-2010",
  "Justified": "https://cinejoy.pk/series/1436-justified-2010",
  "The X-Files": "https://cinejoy.pk/series/4087-the-x-files-1993",
  "Doctor Who": "https://cinejoy.pk/series/121-doctor-who-2005",
  "Daredevil": "https://cinejoy.pk/series/61889-daredevil-2015",
  "Atlanta": "https://cinejoy.pk/series/65495-atlanta-2016",
  "Demon Slayer: Kimetsu no Yaiba": "https://cinejoy.pk/series/85937-demon-slayer-kimetsu-no-yaiba-2019",
  "Jujutsu Kaisen": "https://cinejoy.pk/series/95479-jujutsu-kaisen-2020",
  "Cyberpunk: Edgerunners": "https://cinejoy.pk/series/105248-cyberpunk-edgerunners-2022",
  "Mob Psycho 100": "https://cinejoy.pk/series/67075-mob-psycho-100-2016",
  "Samurai Champloo": "https://cinejoy.pk/series/1063-samurai-champloo-2004",
  "Adventure Time": "https://cinejoy.pk/series/15260-adventure-time-2010",
  "Special OPS": "https://cinejoy.pk/series/100612-special-ops-2020",
  "The Bridge": "https://cinejoy.pk/series/45016-the-bridge-2011",
  "Dopesick": "https://cinejoy.pk/series/110695-dopesick-2021",
  "Making a Murderer": "https://cinejoy.pk/series/64439-making-a-murderer-2015",
  "The Penguin": "https://cinejoy.pk/series/194764-the-penguin-2024",
  "Heartstopper": "https://cinejoy.pk/series/124834-heartstopper-2022",
  "Your Lie in April": "https://cinejoy.pk/series/61663-your-lie-in-april-2014",
  "Archer": "https://cinejoy.pk/series/10283-archer-2009",
  "Primal": "https://cinejoy.pk/series/89456-primal-2019",
  "Frasier": "https://cinejoy.pk/series/3452-frasier-1993",
  "Taskmaster": "https://cinejoy.pk/series/63404-taskmaster-2015",
  "Sons of Anarchy": "https://cinejoy.pk/series/1409-sons-of-anarchy-2008",
  "A Knight of the Seven Kingdoms": "https://cinejoy.pk/series/224372-a-knight-of-the-seven-kingdoms-2026",
  "Shameless": "https://cinejoy.pk/series/34307-shameless-2011",
  "The Haunting of Hill House": "https://cinejoy.pk/series/72844-the-haunting-of-hill-house-2018",
  "Planet Earth III": "https://cinejoy.pk/series/116156-planet-earth-iii-2023",
  "The Jinx": "https://cinejoy.pk/series/61929-the-jinx-2015",
  "Our Blues": "https://cinejoy.pk/series/135840-our-blues-2022",
  "Twenty-Five Twenty-One": "https://cinejoy.pk/series/129888-twenty-five-twenty-one-2022",
  "Endeavour": "https://cinejoy.pk/series/44264-endeavour-2012",
  "The Bridge (Bron/Broen)": "https://cinejoy.pk/series/45016-the-bridge-2011",
  "My Brilliant Friend": "https://cinejoy.pk/series/78154-my-brilliant-friend-2018",
  "Samurai Jack": "https://cinejoy.pk/series/2723-samurai-jack-2001",
  "Great Teacher Onizuka": "https://cinejoy.pk/series/62057-great-teacher-onizuka-1999",
  "Prime Suspect": "https://cinejoy.pk/series/2583-prime-suspect-1991",
  "Agatha Christie's Poirot": "https://cinejoy.pk/series/790-agatha-christies-poirot-1989",
  "Hilda": "https://cinejoy.pk/series/82456-hilda-2018",
  "Westworld": "https://cinejoy.pk/series/63247-westworld-2016",
  "The Queen's Gambit": "https://cinejoy.pk/series/87739-the-queens-gambit-2020",
  "Mr. Robot": "https://cinejoy.pk/series/62560-mr-robot-2015",
  "Ozark": "https://cinejoy.pk/series/69740-ozark-2017",
  "Hannibal (Series)": "https://cinejoy.pk/series/40008-hannibal-2013",
  "Modern Family": "https://cinejoy.pk/series/1421-modern-family-2009",
  "Community": "https://cinejoy.pk/series/18347-community-2009",
  "The Expanse": "https://cinejoy.pk/series/63639-the-expanse-2015",
  "Person of Interest": "https://cinejoy.pk/series/1411-person-of-interest-2011",
  "The Punisher": "https://cinejoy.pk/series/67178-the-punisher-2017",
  "Vikings": "https://cinejoy.pk/series/61856-vikings-2013",
  "The Last Kingdom": "https://cinejoy.pk/series/63333-the-last-kingdom-2015",
  "Spartacus": "https://cinejoy.pk/series/46296-spartacus-2010",
  "Silicon Valley": "https://cinejoy.pk/series/60573-silicon-valley-2014",
  "Neon Genesis Evangelion": "https://cinejoy.pk/series/890-neon-genesis-evangelion-1995",
  "Futurama": "https://cinejoy.pk/series/615-futurama-1999",
  "Sacred Games": "https://cinejoy.pk/series/79352-sacred-games-2018",
  "Mirzapur": "https://cinejoy.pk/series/84105-mirzapur-2018",
  "Borgen": "https://cinejoy.pk/series/42445-borgen-2010",
  "Generation Kill": "https://cinejoy.pk/series/17035-generation-kill-2008",
  "Formula 1: Drive to Survive": "https://cinejoy.pk/series/87083-formula-1-drive-to-survive-2019",
  "Chef's Table": "https://cinejoy.pk/series/62391-chefs-table-2015",
  "What We Do in the Shadows": "https://cinejoy.pk/series/83631-what-we-do-in-the-shadows-2019",
  "Oshi no Ko": "https://cinejoy.pk/series/203737-oshi-no-ko-2023",
  "Violet Evergarden": "https://cinejoy.pk/series/75214-violet-evergarden-2018",
  "The Owl House": "https://cinejoy.pk/series/92685-the-owl-house-2020",
  "The Legend of Korra": "https://cinejoy.pk/series/33880-the-legend-of-korra-2012",
  "Black Books": "https://cinejoy.pk/series/903-black-books-2000",
  "The IT Crowd": "https://cinejoy.pk/series/2490-the-it-crowd-2006",
  "Luther": "https://cinejoy.pk/series/1426-luther-2010",
  "Happy Valley": "https://cinejoy.pk/series/61244-happy-valley-2014",
  "Extraordinary Attorney Woo": "https://cinejoy.pk/series/197067-extraordinary-attorney-woo-2022",
  "Moving": "https://cinejoy.pk/series/126485-moving-2023",
  "Hometown Cha-Cha-Cha": "https://cinejoy.pk/series/128883-hometown-cha-cha-cha-2021",
  "Mr. Queen": "https://cinejoy.pk/series/108261-mr-queen-2020",
  "The Untamed": "https://cinejoy.pk/series/90761-the-untamed-2019",
  "Story of Yanxi Palace": "https://cinejoy.pk/series/81133-story-of-yanxi-palace-2018",
  "All or Nothing: Manchester City": "https://cinejoy.pk/series/81705-all-or-nothing-manchester-city-2018",
  "The Grand Tour": "https://cinejoy.pk/series/67557-the-grand-tour-2016",
  "Slow Horses (Season 4)": "https://cinejoy.pk/series/95480-slow-horses-2024",
  "Ayali": "https://cinejoy.pk/series/218640-ayali-2023",
  "Death's Game": "https://cinejoy.pk/series/218230-deaths-game-2023",
  "Spiral (Engrenages)": "https://cinejoy.pk/series/11726-spiral-2005",
  "Jury Duty": "https://cinejoy.pk/series/222023-jury-duty-2023",
  "Foyle's War": "https://cinejoy.pk/series/3163-foyles-war-2002",
  "One Foot in the Grave": "https://cinejoy.pk/series/4548-one-foot-in-the-grave-1990",
  "Louie": "https://cinejoy.pk/series/32962-louie-2010",
  "The Legend of Vox Machina": "https://cinejoy.pk/series/135934-the-legend-of-vox-machina-2022",
  "Gargoyles": "https://cinejoy.pk/series/1719-gargoyles-1994",
  "Ranking of Kings": "https://cinejoy.pk/series/112613-ranking-of-kings-2021",
  "Friday Night Lights": "https://cinejoy.pk/series/4278-friday-night-lights-2006",
  "Big Little Lies": "https://cinejoy.pk/series/66292-big-little-lies-2017",
  "M*A*S*H": "https://cinejoy.pk/series/918-m-a-s-h-1972",
  "Inside No. 9": "https://cinejoy.pk/series/61746-inside-no-9-2014",
  "Trailer Park Boys": "https://cinejoy.pk/series/3796-trailer-park-boys-2001",
  "Homicide: Life on the Street": "https://cinejoy.pk/series/4464-homicide-life-on-the-street-1993",
  "Fallout": "https://cinejoy.pk/series/106379-fallout-2024",
  "Andor": "https://cinejoy.pk/series/83867-andor-2022",
  "House of the Dragon": "https://cinejoy.pk/series/94997-house-of-the-dragon-2022",
  "The Americans": "https://cinejoy.pk/series/46533-the-americans-2013",
  "Brooklyn Nine-Nine": "https://cinejoy.pk/series/48891-brooklyn-nine-nine-2013",
  "Suits": "https://cinejoy.pk/series/37680-suits-2011",
  "Supernatural": "https://cinejoy.pk/series/1622-supernatural-2005",
  "Fringe": "https://cinejoy.pk/series/1705-fringe-2008",
  "Outlander": "https://cinejoy.pk/series/56570-outlander-2014",
  "The Handmaid's Tale": "https://cinejoy.pk/series/69478-the-handmaids-tale-2017",
  "Barry": "https://cinejoy.pk/series/73107-barry-2018",
  "Naruto": "https://cinejoy.pk/series/46260-naruto-2002",
  "Chainsaw Man": "https://cinejoy.pk/series/114410-chainsaw-man-2022",
  "Love, Death & Robots": "https://cinejoy.pk/series/86831-love-death-and-robots-2019",
  "Farzi": "https://cinejoy.pk/series/132117-farzi-2023",
  "Babylon Berlin": "https://cinejoy.pk/series/66980-babylon-berlin-2017",
  "Mare of Easttown": "https://cinejoy.pk/series/115004-mare-of-easttown-2021",
  "The Night Of": "https://cinejoy.pk/series/66276-the-night-of-2016",
  "Unbelievable": "https://cinejoy.pk/series/91275-unbelievable-2019",
  "Bosch": "https://cinejoy.pk/series/60585-bosch-2014",
  "King of the Hill": "https://cinejoy.pk/series/2122-king-of-the-hill-1997",
  "Regular Show": "https://cinejoy.pk/series/31132-regular-show-2010",
  "Amphibia": "https://cinejoy.pk/series/85349-amphibia-2019",
  "Star Wars: The Clone Wars": "https://cinejoy.pk/series/4194-star-wars-the-clone-wars-2008",
  "Mr. Bean": "https://cinejoy.pk/series/4327-mr-bean-1990",
  "Peep Show": "https://cinejoy.pk/series/815-peep-show-2003",
  "Billions": "https://cinejoy.pk/series/62852-billions-2016",
  "Broadchurch": "https://cinejoy.pk/series/1427-broadchurch-2013",
  "The Inbetweeners": "https://cinejoy.pk/series/7317-the-inbetweeners-2008",
  "Stargate SG-1": "https://cinejoy.pk/series/4629-stargate-sg-1-1997",
  "Babylon 5": "https://cinejoy.pk/series/3137-babylon-5-1994",
  "Utopia": "https://cinejoy.pk/series/46511-utopia-2013",
  "Permanent Roommates": "https://cinejoy.pk/series/64068-permanent-roommates-2014",
  "Bandish Bandits": "https://cinejoy.pk/series/106872-bandish-bandits-2020",
  "Vincenzo": "https://cinejoy.pk/series/117376-vincenzo-2021",
  "Weak Hero Class 1": "https://cinejoy.pk/series/200709-weak-hero-class-1-2022",
  "Our Beloved Summer": "https://cinejoy.pk/series/135897-our-beloved-summer-2021",
  "Healer": "https://cinejoy.pk/series/61670-healer-2014",
  "Mouse": "https://cinejoy.pk/series/117378-mouse-2021",
  "Taxi Driver (Series)": "https://cinejoy.pk/series/119769-taxi-driver-2021",
  "Street Food": "https://cinejoy.pk/series/87832-street-food-2019",
  "The Killing (Danish)": "https://cinejoy.pk/series/32368-the-killing-2007",
  "House of the Dragon (Season 2)": "https://cinejoy.pk/series/94997-house-of-the-dragon-2024",
  "Mirzapur (Season 3)": "https://cinejoy.pk/series/84105-mirzapur-2024",
  "The Killing (Forbrydelsen)": "https://cinejoy.pk/series/32368-the-killing-2007",
  "Red Dwarf": "https://cinejoy.pk/series/326-red-dwarf-1988",
  "The Fugitive (Series)": "https://cinejoy.pk/series/10083-the-fugitive-1963",
  "Rocko's Modern Life": "https://cinejoy.pk/series/657-rockos-modern-life-1993",
  "Clannad": "https://cinejoy.pk/series/24835-clannad-2007",
  "Ghost in the Shell: Stand Alone Complex": "https://cinejoy.pk/series/1095-ghost-in-the-shell-stand-alone-complex-2002",
  "Hellsing Ultimate": "https://cinejoy.pk/series/61752-hellsing-ultimate-2006",
  "Banshee": "https://cinejoy.pk/series/41727-banshee-2013",
  "Columbo": "https://cinejoy.pk/series/873-columbo-1968",
  "Euphoria": "https://cinejoy.pk/series/85552-euphoria-2019",
  "Homeland": "https://cinejoy.pk/series/1407-homeland-2011",
  "How I Met Your Mother": "https://cinejoy.pk/series/1100-how-i-met-your-mother-2005",
  "Lost": "https://cinejoy.pk/series/4607-lost-2004",
  "Prison Break": "https://cinejoy.pk/series/2288-prison-break-2005",
  "Orphan Black": "https://cinejoy.pk/series/56296-orphan-black-2013",
  "My Hero Academia": "https://cinejoy.pk/series/65930-my-hero-academia-2016",
  "Castlevania": "https://cinejoy.pk/series/71024-castlevania-2017",
  "Fauda": "https://cinejoy.pk/series/69557-fauda-2015",
  "The Pacific": "https://cinejoy.pk/series/16997-the-pacific-2010",
  "Reservation Dogs": "https://cinejoy.pk/series/95215-reservation-dogs-2021",
  "Sex Education": "https://cinejoy.pk/series/81356-sex-education-2019",
  "Narcos: Mexico": "https://cinejoy.pk/series/80968-narcos-mexico-2018",
  "Re:Zero": "https://cinejoy.pk/series/65942-rezero-2016",
  "Mushoku Tensei": "https://cinejoy.pk/series/94664-mushoku-tensei-2021",
  "One Piece (Live Action)": "https://cinejoy.pk/series/111110-one-piece-2023",
  "Helluva Boss": "https://cinejoy.pk/series/289892-helluva-boss-2019",
  "The Fresh Prince of Bel-Air": "https://cinejoy.pk/series/1892-the-fresh-prince-of-bel-air-1990",
  "Scrubs": "https://cinejoy.pk/series/4556-scrubs-2001",
  "Derry Girls": "https://cinejoy.pk/series/76148-derry-girls-2018",
  "Veep": "https://cinejoy.pk/series/2947-veep-2012",
  "Psych": "https://cinejoy.pk/series/1447-psych-2006",
  "Top Boy": "https://cinejoy.pk/series/41889-top-boy-2011",
  "Buffy the Vampire Slayer": "https://cinejoy.pk/series/95-buffy-the-vampire-slayer-1997",
  "The Leftovers": "https://cinejoy.pk/series/54344-the-leftovers-2014",
  "Hostel Daze": "https://cinejoy.pk/series/96421-hostel-daze-2019",
  "Kingdom": "https://cinejoy.pk/series/70593-kingdom-2019",
  "Sky Castle": "https://cinejoy.pk/series/257511-sky-castle-2018",
  "Midnight Diner": "https://cinejoy.pk/series/47008-midnight-diner-2009",
  "Pachinko": "https://cinejoy.pk/series/110382-pachinko-2022",
  "Welcome to Wrexham": "https://cinejoy.pk/series/126929-welcome-to-wrexham-2022",
  "The Great British Bake Off": "https://cinejoy.pk/series/34549-the-great-british-bake-off-2010",
  "Bad Sisters": "https://cinejoy.pk/series/199318-bad-sisters-2022",
  "Sandwiched Forever": "https://cinejoy.pk/series/115220-sandwiched-forever-2020",
  "Daily Dose of Sunshine": "https://cinejoy.pk/series/205319-daily-dose-of-sunshine-2023",
  "My Liberation Notes": "https://cinejoy.pk/series/154887-my-liberation-notes-2022",
  "Shtisel": "https://cinejoy.pk/series/56017-shtisel-2013",
  "Call My Agent! (Dix pour cent)": "https://cinejoy.pk/series/64165-call-my-agent-2015",
  "Pluribus": "https://cinejoy.pk/series/225171-pluribus-2025",
  "Dr. Stone": "https://cinejoy.pk/series/86031-dr-stone-2019",
  "Last Chance U": "https://cinejoy.pk/series/67027-last-chance-u-2016",
  "Hell on Wheels": "https://cinejoy.pk/series/1401-hell-on-wheels-2011",
  "Rectify": "https://cinejoy.pk/series/46619-rectify-2013",
  "Damages": "https://cinejoy.pk/series/4920-damages-2007",
  "Khichdi": "https://cinejoy.pk/series/91511-khichdi-2002",
  "Toast of London": "https://cinejoy.pk/series/61413-toast-of-london-2012",
  "Dad's Army": "https://cinejoy.pk/series/505-dads-army-1968",
  "Pantheon": "https://cinejoy.pk/series/195339-pantheon-2022",
  "Hill Street Blues": "https://cinejoy.pk/series/3828-hill-street-blues-1981",
  "Craig of the Creek": "https://cinejoy.pk/series/79061-craig-of-the-creek-2018",
  "Dragon Ball": "https://cinejoy.pk/series/12609-dragon-ball-1986",
  "Assassination Classroom": "https://cinejoy.pk/series/62110-assassination-classroom-2013",
  "Anohana": "https://cinejoy.pk/series/39434-anohana-2011",
  "Parasyte: The Maxim": "https://cinejoy.pk/series/61459-parasyte-the-maxim-2014",
  "Psycho-Pass": "https://cinejoy.pk/series/43865-psycho-pass-2012",
  "Parenthood": "https://cinejoy.pk/series/21762-parenthood-2010",
  "Halt and Catch Fire": "https://cinejoy.pk/series/59659-halt-and-catch-fire-2014",
  "Pose": "https://cinejoy.pk/series/79084-pose-2018",
  "Normal People": "https://cinejoy.pk/series/89905-normal-people-2020",
  "The Good Wife": "https://cinejoy.pk/series/1435-the-good-wife-2009",
  "I Love Lucy": "https://cinejoy.pk/series/2730-i-love-lucy-1951",
  "The Golden Girls": "https://cinejoy.pk/series/1678-the-golden-girls-1985",
  "Master of None": "https://cinejoy.pk/series/64254-master-of-none-2015",
  "Grace and Frankie": "https://cinejoy.pk/series/62320-grace-and-frankie-2015",
  "Letterkenny": "https://cinejoy.pk/series/65798-letterkenny-2016",
  "The Dragon Prince": "https://cinejoy.pk/series/81046-the-dragon-prince-2018",
  "Young Justice": "https://cinejoy.pk/series/33217-young-justice-2010",
  "We Bare Bears": "https://cinejoy.pk/series/63401-we-bare-bears-2015",
  "Slow Horses": "https://cinejoy.pk/series/95480-slow-horses-2022",
  "The Big Bang Theory": "https://cinejoy.pk/series/1418-the-big-bang-theory-2007",
  "Money Heist": "https://cinejoy.pk/series/71446-money-heist-2017",
  "Sense8": "https://cinejoy.pk/series/61664-sense8-2015",
  "Loki": "https://cinejoy.pk/series/84958-loki-2021",
  "The Good Place": "https://cinejoy.pk/series/66573-the-good-place-2016",
  "Bleach": "https://cinejoy.pk/series/30984-bleach-2004",
  "Family Guy": "https://cinejoy.pk/series/1434-family-guy-1999",
  "Peacemaker": "https://cinejoy.pk/series/110492-peacemaker-2022",
  "Daredevil: Born Again": "https://cinejoy.pk/series/202555-daredevil-born-again-2025",
  "Bosch: Legacy": "https://cinejoy.pk/series/153657-bosch-legacy-2022",
  "Solo Leveling": "https://cinejoy.pk/series/127532-solo-leveling-2024",
  "Blue Lock": "https://cinejoy.pk/series/131041-blue-lock-2022",
  "Bob's Burgers": "https://cinejoy.pk/series/32726-bobs-burgers-2011",
  "Steven Universe": "https://cinejoy.pk/series/61175-steven-universe-2013",
  "SpongeBob SquarePants": "https://cinejoy.pk/series/387-spongebob-squarepants-1999",
  "Everybody Loves Raymond": "https://cinejoy.pk/series/2140-everybody-loves-raymond-1996",
  "30 Rock": "https://cinejoy.pk/series/4608-30-rock-2006",
  "Malcolm in the Middle": "https://cinejoy.pk/series/2004-malcolm-in-the-middle-2000",
  "The Mentalist": "https://cinejoy.pk/series/5920-the-mentalist-2008",
  "Killing Eve": "https://cinejoy.pk/series/72750-killing-eve-2018",
  "Gangs of London": "https://cinejoy.pk/series/85021-gangs-of-london-2020",
  "Skins": "https://cinejoy.pk/series/900-skins-2007",
  "Misfits": "https://cinejoy.pk/series/31295-misfits-2009",
  "Penny Dreadful": "https://cinejoy.pk/series/54671-penny-dreadful-2014",
  "Star Trek: Strange New Worlds": "https://cinejoy.pk/series/103516-star-trek-strange-new-worlds-2022",
  "Jubilee": "https://cinejoy.pk/series/222922-jubilee-2023",
  "Little Things": "https://cinejoy.pk/series/82862-little-things-2016",
  "Maamla Legal Hai": "https://cinejoy.pk/series/246483-maamla-legal-hai-2024",
  "Descendants of the Sun": "https://cinejoy.pk/series/65143-descendants-of-the-sun-2016",
  "Itaewon Class": "https://cinejoy.pk/series/96162-itaewon-class-2020",
  "Queen of Tears": "https://cinejoy.pk/series/215720-queen-of-tears-2024",
  "Bon Appétit, Your Majesty": "https://cinejoy.pk/series/280945-bon-app-tit-your-majesty-2025",
  "Life on Our Planet": "https://cinejoy.pk/series/213609-life-on-our-planet-2023",
  "Cheer": "https://cinejoy.pk/series/97401-cheer-2020",
  "Beckham": "https://cinejoy.pk/series/235345-beckham-2023",
  "Queer Eye": "https://cinejoy.pk/series/76922-queer-eye-2018",
  "CID": "https://cinejoy.pk/series/15226-cid-1998",
  "Silo (Season 2)": "https://cinejoy.pk/series/125988-silo-2024",
  "Pluto": "https://cinejoy.pk/series/91997-pluto-2023",
  "Cubicles": "https://cinejoy.pk/series/96312-cubicles-2019",
  "The Glory (Part 2)": "https://cinejoy.pk/series/136283-the-glory-2023",
  "D.P.": "https://cinejoy.pk/series/110534-dp-2021",
  "Watchmen (Series) (Series)": "https://cinejoy.pk/series/79788-watchmen-2019",
  "Caliphate": "https://cinejoy.pk/series/92891-caliphate-2020",
  "Money Heist (La Casa de Papel)": "https://cinejoy.pk/series/71446-money-heist-2017",
  "Patria": "https://cinejoy.pk/series/85964-patria-2020",
  "Tom and Jerry (Series)": "https://cinejoy.pk/series/337576-tom-and-jerry-1940",
  "Godless": "https://cinejoy.pk/series/73467-godless-2017",
  "Deutschland 83": "https://cinejoy.pk/series/62681-deutschland-83-2015",
  "Skam": "https://cinejoy.pk/series/65320-skam-2015",
  "Treme": "https://cinejoy.pk/series/17967-treme-2010",
  "Peter Kay's Car Share": "https://cinejoy.pk/series/62557-peter-kays-car-share-2015",
  "Extras": "https://cinejoy.pk/series/2693-extras-2005",
  "Better Things": "https://cinejoy.pk/series/66859-better-things-2016",
  "The Prisoner": "https://cinejoy.pk/series/894-the-prisoner-1967",
  "Humans": "https://cinejoy.pk/series/62822-humans-2015",
  "The Rockford Files": "https://cinejoy.pk/series/954-the-rockford-files-1974",
  "White Collar": "https://cinejoy.pk/series/21510-white-collar-2009",
  "Wentworth": "https://cinejoy.pk/series/44856-wentworth-2013",
  "The Originals": "https://cinejoy.pk/series/46896-the-originals-2013",
  "Voltron: Legendary Defender": "https://cinejoy.pk/series/66558-voltron-legendary-defender-2016",
  "Star vs. the Forces of Evil": "https://cinejoy.pk/series/61923-star-vs-the-forces-of-evil-2015",
  "Toradora!": "https://cinejoy.pk/series/42916-toradora-2008",
  "Death Parade": "https://cinejoy.pk/series/61901-death-parade-2015",
  "Erased": "https://cinejoy.pk/series/74939-erased-2016",
  "The Act": "https://cinejoy.pk/series/82883-the-act-2019",
  "Maid": "https://cinejoy.pk/series/111141-maid-2021",
  "The Great": "https://cinejoy.pk/series/93812-the-great-2020",
  "Nurse Jackie": "https://cinejoy.pk/series/18053-nurse-jackie-2009",
  "The Honeymooners": "https://cinejoy.pk/series/4439-the-honeymooners-1955",
  "The Andy Griffith Show": "https://cinejoy.pk/series/106-the-andy-griffith-show-1960",
  "Gavin & Stacey": "https://cinejoy.pk/series/3696-gavin-and-stacey-2007",
  "Cobra Kai": "https://cinejoy.pk/series/77169-cobra-kai-2018",
  "The Outer Limits": "https://cinejoy.pk/series/21567-the-outer-limits-1963",
  "Ray Donovan": "https://cinejoy.pk/series/1423-ray-donovan-2013",
  "Snowfall": "https://cinejoy.pk/series/71694-snowfall-2017",
  "Power": "https://cinejoy.pk/series/54650-power-2014",
  "Angel": "https://cinejoy.pk/series/2426-angel-1999",
  "Trigun": "https://cinejoy.pk/series/26453-trigun-1998",
  "Final Space": "https://cinejoy.pk/series/74387-final-space-2018",
  "Cosmos": "https://cinejoy.pk/series/1430-cosmos-a-personal-voyage-1980",
  "Scam 1992": "https://cinejoy.pk/series/111059-scam-1992-the-harshad-mehta-story-2020",
  "Arcane: Season 2": "https://cinejoy.pk/series/94605-arcane-2021",
  "Pitchers": "https://cinejoy.pk/series/63333-tvf-pitchers-2015",
  "Hunter x Hunter": "https://cinejoy.pk/series/46298-hunter-x-hunter-2011",
  "Frieren: Beyond Journey's End": "https://cinejoy.pk/series/209867-frieren-beyond-journeys-end-2023",
  "Attack on Titan: Final Season": "https://cinejoy.pk/series/1429-attack-on-titan-2013",
  "Dekalog": "https://cinejoy.pk/series/3598-dekalog-1989",
  "Nirvana in Fire": "https://cinejoy.pk/series/64295-nirvana-in-fire-2015",
  "Shogun": "https://cinejoy.pk/series/126308-shogun-2024",
  "Naruto: Shippuden": "https://cinejoy.pk/series/31910-naruto-shippuden-2007",
  "One Punch Man": "https://cinejoy.pk/series/63926-one-punch-man-2015",
  "Code Geass": "https://cinejoy.pk/series/34391-code-geass-2006",
  "South Park": "https://cinejoy.pk/series/2190-south-park-1997",
  "Dungeon Meshi": "https://cinejoy.pk/series/207584-delicious-in-dungeon-2024",
  "Tathastu": "https://cinejoy.pk/series/tathastu-2022",
  "Jujutsu Kaisen Season 2": "https://cinejoy.pk/series/95479-jujutsu-kaisen-2020",
  "Goblin": "https://cinejoy.pk/series/67915-guardian-the-lonely-and-great-god-2016",
  "Kaguya-sama: Love Is War": "https://cinejoy.pk/series/83584-kaguya-sama-love-is-war-2019",
  "Schitt's Creek": "https://cinejoy.pk/series/61662-schitts-creek-2015",
  "Delhi Crime": "https://cinejoy.pk/series/delhi-crime-2019",
  "Asur: Welcome to Your Dark Side": "https://cinejoy.pk/series/asur-welcome-to-your-dark-side-2020",
  "Dan Da Dan": "https://cinejoy.pk/series/dan-da-dan-2024",
  "Spy x Family": "https://cinejoy.pk/series/spy-x-family-2022",
  "Flames": "https://cinejoy.pk/series/flames-2018",
  "The Railway Men": "https://cinejoy.pk/series/the-railway-men-2023",
  "Tripling": "https://cinejoy.pk/series/tripling-2016",
  "The Office UK": "https://cinejoy.pk/series/the-office-uk-2001",
  "Strong Girl Bong-soon": "https://cinejoy.pk/series/strong-girl-bong-soon-2017",
  "Worst of Evil": "https://cinejoy.pk/series/worst-of-evil-2023",
  "X-Men: The Animated Series": "https://cinejoy.pk/series/x-men-the-animated-series-1992",
  "Unforgotten": "https://cinejoy.pk/series/unforgotten-2015",
  "Young Pope": "https://cinejoy.pk/series/young-pope-2016",
  "FIR": "https://cinejoy.pk/series/fir-2006",
  "Allo' Allo!": "https://cinejoy.pk/series/allo-allo-1982",
  "Star Trek (Series)": "https://cinejoy.pk/series/star-trek-series-1966",
  "Looney Tunes": "https://cinejoy.pk/series/looney-tunes-1930",
  "Star Wars: Rebels": "https://cinejoy.pk/series/star-wars-rebels-2014",
  "Special OPS 1.5": "https://cinejoy.pk/series/special-ops-15-2021",
  "Look Back": "https://cinejoy.pk/series/look-back-2024",
  "Suzhal - The Vortex": "https://cinejoy.pk/series/suzhal-the-vortex-2022",
  "Vis a Vis (Locked Up)": "https://cinejoy.pk/series/vis-a-vis-locked-up-2015",
  "Adventure Time: Distant Lands": "https://cinejoy.pk/series/adventure-time-distant-lands-2020",
  "Konosuba": "https://cinejoy.pk/series/konosuba-2016",
  "Vivy: Fluorite Eye's Song": "https://cinejoy.pk/series/vivy-fluorite-eyes-song-2021",
  "Kipo and the Age of Wonderbeasts": "https://cinejoy.pk/series/95599-kipo-and-the-age-of-wonderbeasts-2020",
  "Courage the Cowardly Dog": "https://cinejoy.pk/series/2085-courage-the-cowardly-dog-1999",
  "The Amazing World of Gumball": "https://cinejoy.pk/series/37606-the-amazing-world-of-gumball-2011",
  "Ugly Delicious": "https://cinejoy.pk/series/77416-ugly-delicious-2018",
  "Abstract: The Art of Design": "https://cinejoy.pk/series/70177-abstract-the-art-of-design-2017",
  "Bates Motel": "https://cinejoy.pk/series/46786-bates-motel-2013",
  "Lucifer": "https://cinejoy.pk/series/63174-lucifer-2016",
  "Wednesday": "https://cinejoy.pk/series/119051-wednesday-2022",
  "The Walking Dead": "https://cinejoy.pk/series/1402-the-walking-dead-2010",
  "Star Trek: Deep Space Nine": "https://cinejoy.pk/series/580-star-trek-deep-space-nine-1993",
  "Paatal Lok": "https://cinejoy.pk/series/103051-paatal-lok-2020",
  "Sharp Objects": "https://cinejoy.pk/series/70453-sharp-objects-2018",
  "Wild Wild Country": "https://cinejoy.pk/series/77601-wild-wild-country-2018",
  "Adolescence": "https://cinejoy.pk/series/249042-adolescence-2025",
  "Task": "https://cinejoy.pk/series/228305-task-2025",
  "Reacher": "https://cinejoy.pk/series/108978-reacher-2022",
  "Landman": "https://cinejoy.pk/series/157741-landman-2024",
  "Shrinking": "https://cinejoy.pk/series/136311-shrinking-2023",
  "Only Murders in the Building": "https://cinejoy.pk/series/107113-only-murders-in-the-building-2021",
  "Hacks": "https://cinejoy.pk/series/124101-hacks-2021",
  "Silo": "https://cinejoy.pk/series/125988-silo-2023",
  "Black Clover": "https://cinejoy.pk/series/73223-black-clover-2017",
  "Phineas and Ferb": "https://cinejoy.pk/series/1877-phineas-and-ferb-2007",
  "That '70s Show": "https://cinejoy.pk/series/52-that-70s-show-1998",
  "Criminal Minds": "https://cinejoy.pk/series/4057-criminal-minds-2005",
  "Monk": "https://cinejoy.pk/series/1695-monk-2002",
  "Castle": "https://cinejoy.pk/series/1419-castle-2009",
  "Bodyguard": "https://cinejoy.pk/series/80307-bodyguard-2018",
  "Call the Midwife": "https://cinejoy.pk/series/39793-call-the-midwife-2012",
  "Legion": "https://cinejoy.pk/series/67195-legion-2017",
  "Counterpart": "https://cinejoy.pk/series/63646-counterpart-2017",
  "Made in Heaven": "https://cinejoy.pk/series/87407-made-in-heaven-2019",
  "Tanaav": "https://cinejoy.pk/series/204074-tanaav-2022",
  "The Glory": "https://cinejoy.pk/series/136283-the-glory-2022",
  "Love Between Fairy and Devil": "https://cinejoy.pk/series/130368-love-between-fairy-and-devil-2022",
  "Explained": "https://cinejoy.pk/series/79746-explained-2018",
  "Black Sails": "https://cinejoy.pk/series/47665-black-sails-2014",
  "Ripley": "https://cinejoy.pk/series/94028-ripley-2024",
  "Black Bird": "https://cinejoy.pk/series/155537-black-bird-2022",
  "Tabbar": "https://cinejoy.pk/series/136460-tabbar-2021",
  "Bloodhounds": "https://cinejoy.pk/series/127529-bloodhounds-2023",
  "Reborn Rich": "https://cinejoy.pk/series/153496-reborn-rich-2022",
  "The New Pope": "https://cinejoy.pk/series/88408-the-new-pope-2020",
  "Riot Police (Antidisturbios)": "https://cinejoy.pk/series/96005-riot-police-2020",
  "The Morning Show": "https://cinejoy.pk/series/90282-the-morning-show-2019",
  "Good Omens": "https://cinejoy.pk/series/71915-good-omens-2019",
  "Longmire": "https://cinejoy.pk/series/43901-longmire-2012",
  "Catastrophe": "https://cinejoy.pk/series/61920-catastrophe-2015",
  "Animaniacs": "https://cinejoy.pk/series/82-animaniacs-1993",
  "That Time I Got Reincarnated as a Slime": "https://cinejoy.pk/series/82684-that-time-i-got-reincarnated-as-a-slime-2018",
  "No Game No Life": "https://cinejoy.pk/series/60808-no-game-no-life-2014",
  "How to Get Away with Murder": "https://cinejoy.pk/series/61056-how-to-get-away-with-murder-2014",
  "Squid Game": "https://cinejoy.pk/series/93405-squid-game-2021",
  "The White Lotus": "https://cinejoy.pk/series/111803-the-white-lotus-2021",
  "The Witcher": "https://cinejoy.pk/series/71912-the-witcher-2019",
  "American Horror Story": "https://cinejoy.pk/series/1413-american-horror-story-2011",
  "Beef": "https://cinejoy.pk/series/154385-beef-2023",
  "Paradise": "https://cinejoy.pk/series/245927-paradise-2025",
  "Jack Ryan": "https://cinejoy.pk/series/73375-jack-ryan-2018",
  "Lawmen: Bass Reeves": "https://cinejoy.pk/series/157732-lawmen-bass-reeves-2023",
  "Mayor of Kingstown": "https://cinejoy.pk/series/97951-mayor-of-kingstown-2021",
  "For All Mankind": "https://cinejoy.pk/series/87917-for-all-mankind-2019",
  "Kaiju No. 8": "https://cinejoy.pk/series/207468-kaiju-no-8-2024",
  "Hell's Paradise": "https://cinejoy.pk/series/117465-hells-paradise-2023",
  "Harley Quinn": "https://cinejoy.pk/series/74440-harley-quinn-2019",
  "Hazbin Hotel": "https://cinejoy.pk/series/94954-hazbin-hotel-2024",
  "The Good Doctor": "https://cinejoy.pk/series/71712-the-good-doctor-2017",
  "Law & Order: Special Victims Unit": "https://cinejoy.pk/series/2734-law-and-order-special-victims-unit-1999",
  "The Fall": "https://cinejoy.pk/series/49010-the-fall-2013",
  "Criminal Justice": "https://cinejoy.pk/series/88177-criminal-justice-2019",
  "Rangbaaz": "https://cinejoy.pk/series/85201-rangbaaz-2018",
  "Sandeep Bhaiya": "https://cinejoy.pk/series/229429-sandeep-bhaiya-2020",
  "Chacha Vidhayak Hain Humare": "https://cinejoy.pk/series/99889-chacha-vidhayak-hain-humare-2018",
  "Start-Up": "https://cinejoy.pk/series/99048-start-up-2020",
  "Eternal Love": "https://cinejoy.pk/series/69316-eternal-love-2017",
  "The Keepers": "https://cinejoy.pk/series/26101-the-keepers-2017",
  "The Staircase": "https://cinejoy.pk/series/21421-the-staircase-2004",
  "Quarterback": "https://cinejoy.pk/series/220998-quarterback-2023",
  "Velvet": "https://cinejoy.pk/series/61260-velvet-2013",
  "One Hundred Years of Solitude": "https://cinejoy.pk/series/207333-one-hundred-years-of-solitude-2024",
  "Tokyo Vice": "https://cinejoy.pk/series/90296-tokyo-vice-2022",
  "Drops of God": "https://cinejoy.pk/series/218961-drops-of-god-2023",
  "Kaala Paani": "https://cinejoy.pk/series/235356-kaala-paani-2023",
  "Through the Darkness": "https://cinejoy.pk/series/146102-through-the-darkness-2022",
  "Squid Game (Season 2)": "https://cinejoy.pk/series/93405-squid-game-2024",
  "Trapped (Ófærð)": "https://cinejoy.pk/series/64852-trapped-2015",
  "Bones": "https://cinejoy.pk/series/1911-bones-2005",
  "Call My Agent!": "https://cinejoy.pk/series/64165-call-my-agent-2015",
  "Young Royals": "https://cinejoy.pk/series/125910-young-royals-2021",
  "Trapped (Series)": "https://cinejoy.pk/series/64852-trapped-2015",
  "Friday Night Dinner": "https://cinejoy.pk/series/34435-friday-night-dinner-2011",
  "The Righteous Gemstones": "https://cinejoy.pk/series/82782-the-righteous-gemstones-2019",
  "The Studio": "https://cinejoy.pk/series/247767-the-studio-2025",
  "Burn Notice": "https://cinejoy.pk/series/2919-burn-notice-2007",
  "Leverage": "https://cinejoy.pk/series/7482-leverage-2008",
  "The Lincoln Lawyer": "https://cinejoy.pk/series/116799-the-lincoln-lawyer-2022",
  "Summer Camp Island": "https://cinejoy.pk/series/81665-summer-camp-island-2018",
  "Angel Beats!": "https://cinejoy.pk/series/42942-angel-beats-2010",
  "Ouran High School Host Club": "https://cinejoy.pk/series/1043-ouran-high-school-host-club-2006",
  "Orange Is the New Black": "https://cinejoy.pk/series/1424-orange-is-the-new-black-2013",
  "The Deuce": "https://cinejoy.pk/series/65817-the-deuce-2017",
  "I May Destroy You": "https://cinejoy.pk/series/102619-i-may-destroy-you-2020",
  "The Tudors": "https://cinejoy.pk/series/2942-the-tudors-2007",
  "The Borgias": "https://cinejoy.pk/series/33025-the-borgias-2011",
  "Stargate Atlantis": "https://cinejoy.pk/series/2290-stargate-atlantis-2004",
  "The Orville": "https://cinejoy.pk/series/71738-the-orville-2017",
  "Ripper Street": "https://cinejoy.pk/series/46930-ripper-street-2012",
  "Vera": "https://cinejoy.pk/series/39185-vera-2011",
  "Interview with the Vampire (Series)": "https://cinejoy.pk/series/128098-interview-with-the-vampire-2022",
  "Cardcaptor Sakura": "https://cinejoy.pk/series/35790-cardcaptor-sakura-1998",
  "Rugrats": "https://cinejoy.pk/series/3022-rugrats-1991",
  "Ed, Edd n Eddy": "https://cinejoy.pk/series/606-ed-edd-n-eddy-1999",
  "Salt Fat Acid Heat": "https://cinejoy.pk/series/83039-salt-fat-acid-heat-2018",
  "Sharpe": "https://cinejoy.pk/series/225-sharpe-1993",
  "Bonanza": "https://cinejoy.pk/series/1018-bonanza-1959",
  "Gunsmoke": "https://cinejoy.pk/series/3713-gunsmoke-1955",
  "WandaVision": "https://cinejoy.pk/series/85271-wandavision-2021",
  "Never Have I Ever": "https://cinejoy.pk/series/100883-never-have-i-ever-2020",
  "Altered Carbon": "https://cinejoy.pk/series/68421-altered-carbon-2018",
  "Fairy Tail": "https://cinejoy.pk/series/46261-fairy-tail-2009",
  "Trigun Stampede": "https://cinejoy.pk/series/204266-trigun-stampede-2023",
  "ER": "https://cinejoy.pk/series/4588-er-1994",
  "Merlin": "https://cinejoy.pk/series/7225-merlin-2008",
  "True Blood": "https://cinejoy.pk/series/10545-true-blood-2008",
  "Station Eleven": "https://cinejoy.pk/series/90972-station-eleven-2021",
  "The Man in the High Castle": "https://cinejoy.pk/series/62017-the-man-in-the-high-castle-2015",
  "Jessica Jones": "https://cinejoy.pk/series/38472-jessica-jones-2015",
  "Agent Carter": "https://cinejoy.pk/series/61550-agent-carter-2015",
  "Upload": "https://cinejoy.pk/series/86248-upload-2020",
  "Resident Alien": "https://cinejoy.pk/series/96580-resident-alien-2021",
  "Kohrra": "https://cinejoy.pk/series/230034-kohrra-2023",
  "Breathe": "https://cinejoy.pk/series/76659-breathe-2018",
  "Castaway Diva": "https://cinejoy.pk/series/216310-castaway-diva-2023",
  "Little Women (2022)": "https://cinejoy.pk/series/134675-little-women-2022",
  "Suburra: Blood on Rome": "https://cinejoy.pk/series/73671-suburra-blood-on-rome-2017",
  "Valley of Tears": "https://cinejoy.pk/series/111150-valley-of-tears-2020",
  "Superstore": "https://cinejoy.pk/series/62649-superstore-2015",
  "The Umbrella Academy": "https://cinejoy.pk/series/75006-the-umbrella-academy-2019",
  "Law & Order": "https://cinejoy.pk/series/549-law-and-order-1990",
  "Poker Face": "https://cinejoy.pk/series/120998-poker-face-2023",
  "The Blacklist": "https://cinejoy.pk/series/46952-the-blacklist-2013",
  "Dragon Ball Super": "https://cinejoy.pk/series/62715-dragon-ball-super-2015",
  "Masters of the Air": "https://cinejoy.pk/series/46518-masters-of-the-air-2024",
  "Fresh Meat": "https://cinejoy.pk/series/40632-fresh-meat-2011",
  "Man Like Mobeen": "https://cinejoy.pk/series/86704-man-like-mobeen-2017",
  "Keeping Up Appearances": "https://cinejoy.pk/series/34-keeping-up-appearances-1990",
  "Raising Hope": "https://cinejoy.pk/series/32815-raising-hope-2010",
  "Mythic Quest": "https://cinejoy.pk/series/94951-mythic-quest-2020",
  "She-Ra and the Princesses of Power": "https://cinejoy.pk/series/79732-she-ra-and-the-princesses-of-power-2018",
  "Overlord": "https://cinejoy.pk/series/64196-overlord-2015",
  "Soul Eater": "https://cinejoy.pk/series/37305-soul-eater-2008",
  "Little Fires Everywhere": "https://cinejoy.pk/series/90257-little-fires-everywhere-2020",
  "Fellow Travelers": "https://cinejoy.pk/series/216089-fellow-travelers-2023",
  "The Gentlemen": "https://cinejoy.pk/series/236235-the-gentlemen-2024",
  "Victoria": "https://cinejoy.pk/series/67419-victoria-2016",
  "Weeds": "https://cinejoy.pk/series/186-weeds-2005",
  "Insecure": "https://cinejoy.pk/series/67883-insecure-2016",
  "Midsomer Murders": "https://cinejoy.pk/series/764-midsomer-murders-1997",
  "Shetland": "https://cinejoy.pk/series/46923-shetland-2013",
  "The Sinner": "https://cinejoy.pk/series/39852-the-sinner-2017",
  "Grimm": "https://cinejoy.pk/series/39351-grimm-2011",
  "Daria": "https://cinejoy.pk/series/2131-daria-1997",
  "Dexter's Laboratory": "https://cinejoy.pk/series/4229-dexters-laboratory-1996",
  "Clarence": "https://cinejoy.pk/series/50035-clarence-2014",
  "New Girl": "https://cinejoy.pk/series/1420-new-girl-2011",
  "Gilmore Girls": "https://cinejoy.pk/series/4586-gilmore-girls-2000",
  "The Diplomat": "https://cinejoy.pk/series/203762-the-diplomat-2023",
  "Creature Commandos": "https://cinejoy.pk/series/219543-creature-commandos-2024",
  "Abbott Elementary": "https://cinejoy.pk/series/125935-abbott-elementary-2021",
  "Dead to Me": "https://cinejoy.pk/series/81357-dead-to-me-2019",
  "Tokyo Ghoul": "https://cinejoy.pk/series/61374-tokyo-ghoul-2014",
  "Star Wars: The Bad Batch": "https://cinejoy.pk/series/105971-star-wars-the-bad-batch-2021",
  "Cheers": "https://cinejoy.pk/series/141-cheers-1982",
  "Ghosts": "https://cinejoy.pk/series/17174-ghosts-2019",
  "Entourage": "https://cinejoy.pk/series/1940-entourage-2004",
  "Elementary": "https://cinejoy.pk/series/1415-elementary-2012",
  "Evil": "https://cinejoy.pk/series/86848-evil-2019",
  "From": "https://cinejoy.pk/series/124364-from-2022",
  "Gotham": "https://cinejoy.pk/series/60708-gotham-2014",
  "Doom Patrol": "https://cinejoy.pk/series/79501-doom-patrol-2019",
  "Star Trek: Voyager": "https://cinejoy.pk/series/1855-star-trek-voyager-1995",
  "Dahaad": "https://cinejoy.pk/series/201050-dahaad-2023",
  "Inside Edge": "https://cinejoy.pk/series/72739-inside-edge-2017",
  "Lootere": "https://cinejoy.pk/series/248259-lootere-2024",
  "Maharani": "https://cinejoy.pk/series/126098-maharani-2021",
  "Business Proposal": "https://cinejoy.pk/series/154825-business-proposal-2022",
  "The Dropout": "https://cinejoy.pk/series/122066-the-dropout-2022",
  "The Amazing Race": "https://cinejoy.pk/series/30957-the-amazing-race-2001",
  "Wallander": "https://cinejoy.pk/series/7263-wallander-2008",
  "Crisis on Infinite Earths": "https://cinejoy.pk/series/98069-crisis-on-infinite-earths-2019",
  "Superman & Lois": "https://cinejoy.pk/series/95057-superman-and-lois-2021",
  "Wind Breaker": "https://cinejoy.pk/series/223500-wind-breaker-2024",
  "Poacher": "https://cinejoy.pk/series/216636-poacher-2024",
  "Yellowjackets": "https://cinejoy.pk/series/117488-yellowjackets-2021",
  "Lessons in Chemistry": "https://cinejoy.pk/series/117303-lessons-in-chemistry-2023",
  "The Sandman": "https://cinejoy.pk/series/90802-the-sandman-2022",
  "Teen Titans": "https://cinejoy.pk/series/604-teen-titans-2003",
  "Rita": "https://cinejoy.pk/series/51078-rita-2012",
  "Rubicon": "https://cinejoy.pk/series/30892-rubicon-2010",
  "Bad Education": "https://cinejoy.pk/series/58460-bad-education-2012",
  "The Vicar of Dibley": "https://cinejoy.pk/series/2767-the-vicar-of-dibley-1994",
  "Colin from Accounts": "https://cinejoy.pk/series/203614-colin-from-accounts-2022",
  "Blake's 7": "https://cinejoy.pk/series/1731-blakes-7-1978",
  "Continuum": "https://cinejoy.pk/series/43020-continuum-2012",
  "Magnum, P.I.": "https://cinejoy.pk/series/734-magnum-pi-1980",
  "Perry Mason": "https://cinejoy.pk/series/4177-perry-mason-1957",
  "The Closer": "https://cinejoy.pk/series/1450-the-closer-2005",
  "Danny Phantom": "https://cinejoy.pk/series/2309-danny-phantom-2004",
  "K-On!": "https://cinejoy.pk/series/42253-k-on-2009",
  "Scandal": "https://cinejoy.pk/series/39269-scandal-2012",
  "Jane the Virgin": "https://cinejoy.pk/series/61418-jane-the-virgin-2014",
  "Mrs. America": "https://cinejoy.pk/series/83605-mrs-america-2020",
  "Poldark": "https://cinejoy.pk/series/62084-poldark-2015",
  "Chicago Fire": "https://cinejoy.pk/series/44006-chicago-fire-2012",
  "Chicago P.D.": "https://cinejoy.pk/series/58841-chicago-pd-2014",
  "Reno 911!": "https://cinejoy.pk/series/2187-reno-911-2003",
  "Happy Endings": "https://cinejoy.pk/series/32829-happy-endings-2011",
  "Ramy": "https://cinejoy.pk/series/87382-ramy-2019",
  "Stargate Universe": "https://cinejoy.pk/series/5148-stargate-universe-2009",
  "Eureka": "https://cinejoy.pk/series/4620-eureka-2006",
  "12 Monkeys": "https://cinejoy.pk/series/60948-12-monkeys-2015",
  "The OA": "https://cinejoy.pk/series/69061-the-oa-2016",
  "Travelers": "https://cinejoy.pk/series/67683-travelers-2016",
  "Sweet Tooth": "https://cinejoy.pk/series/103768-sweet-tooth-2021",
  "NYPD Blue": "https://cinejoy.pk/series/194-nypd-blue-1993",
  "Godfather of Harlem": "https://cinejoy.pk/series/79086-godfather-of-harlem-2019",
  "Digimon Adventure": "https://cinejoy.pk/series/31654-digimon-adventure-1999",
  "Hey Arnold!": "https://cinejoy.pk/series/537-hey-arnold-1996",
  "Hogan's Heroes": "https://cinejoy.pk/series/4068-hogans-heroes-1965",
  "Wagon Train": "https://cinejoy.pk/series/6081-wagon-train-1957",
  "The Vampire Diaries": "https://cinejoy.pk/series/18165-the-vampire-diaries-2009",
  "Teen Wolf": "https://cinejoy.pk/series/34524-teen-wolf-2011",
  "Engineering Girls": "https://cinejoy.pk/series/engineering-girls-2018",
  "Hotel Del Luna": "https://cinejoy.pk/series/hotel-del-luna-2019",
  "My Octopus Teacher": "https://cinejoy.pk/series/my-octopus-teacher-2020",
  "Free Solo": "https://cinejoy.pk/series/free-solo-2018",
  "Les Revenants": "https://cinejoy.pk/series/les-revenants-2012",
  "Dahmer": "https://cinejoy.pk/series/dahmer-2022",
  "Terrace House": "https://cinejoy.pk/series/terrace-house-2012",
  "Viladhikolam": "https://cinejoy.pk/series/viladhikolam-2022",
  "Mashle: Magic and Muscles": "https://cinejoy.pk/series/mashle-magic-and-muscles-2023",
  "Manhunt: Unabomber": "https://cinejoy.pk/series/manhunt-unabomber-2017",
  "Have Gun - Will Travel": "https://cinejoy.pk/series/have-gun-will-travel-1957",
  "Walking Dead: Daryl Dixon": "https://cinejoy.pk/series/walking-dead-daryl-dixon-2023",
  "College Romance": "https://cinejoy.pk/series/college-romance-2018",
  "Trial by Fire": "https://cinejoy.pk/series/trial-by-fire-2023",
  "La Casa de las Flores": "https://cinejoy.pk/series/la-casa-de-las-flores-2018",
  "Dept. Q": "https://cinejoy.pk/series/dept-q-2025",
  "How to Sell Drugs Online (Fast)": "https://cinejoy.pk/series/how-to-sell-drugs-online-fast-2019",
  "Taking Chance": "https://cinejoy.pk/series/taking-chance-2009",
  "Sex and the City": "https://cinejoy.pk/series/105-sex-and-the-city-1998",
  "Grey's Anatomy": "https://cinejoy.pk/series/1416-greys-anatomy-2005",
  "Once Upon a Time": "https://cinejoy.pk/series/39272-once-upon-a-time-2011",
  "Gossip Girl": "https://cinejoy.pk/series/1395-gossip-girl-2007",
  "Pretty Little Liars": "https://cinejoy.pk/series/31917-pretty-little-liars-2010",
  "Bridgerton": "https://cinejoy.pk/series/91239-bridgerton-2020",
  "Emily in Paris": "https://cinejoy.pk/series/82596-emily-in-paris-2020",
  "Lupin": "https://cinejoy.pk/series/96677-lupin-2021",
  "Elite": "https://cinejoy.pk/series/76669-elite-2018",
  "Dark Desire": "https://cinejoy.pk/series/105214-dark-desire-2020",
  "Guns & Gulaabs": "https://cinejoy.pk/series/156714-guns-and-gulaabs-2023",
  "Baby Reindeer": "https://cinejoy.pk/series/241259-baby-reindeer-2024",
  "Nobody Wants This": "https://cinejoy.pk/series/250923-nobody-wants-this-2024",
  "Black Doves": "https://cinejoy.pk/series/225385-black-doves-2024",
  "Dope Thief": "https://cinejoy.pk/series/209876-dope-thief-2025",
  "Alien: Earth": "https://cinejoy.pk/series/157239-alien-earth-2025",
  "Ironheart": "https://cinejoy.pk/series/114471-ironheart-2025",
  "Agatha All Along": "https://cinejoy.pk/series/138501-agatha-all-along-2024",
  "Echo": "https://cinejoy.pk/series/122226-echo-2024",
  "Secret Invasion": "https://cinejoy.pk/series/114472-secret-invasion-2023",
  "Moon Knight": "https://cinejoy.pk/series/92749-moon-knight-2022",
  "She-Hulk: Attorney at Law": "https://cinejoy.pk/series/92783-she-hulk-attorney-at-law-2022",
  "Ms. Marvel": "https://cinejoy.pk/series/92782-ms-marvel-2022",
  "Hawkeye": "https://cinejoy.pk/series/88329-hawkeye-2021",
  "The Falcon and the Winter Soldier": "https://cinejoy.pk/series/88396-the-falcon-and-the-winter-soldier-2021",
  "What If...?": "https://cinejoy.pk/series/91363-what-if-2021",
  "Dune: Prophecy": "https://cinejoy.pk/series/90228-dune-prophecy-2024",
  "The Wheel of Time": "https://cinejoy.pk/series/71914-the-wheel-of-time-2021",
  "Shadow and Bone": "https://cinejoy.pk/series/85720-shadow-and-bone-2021",
  "Lioness": "https://cinejoy.pk/series/232553-lioness-2023",
  "Tulsa King": "https://cinejoy.pk/series/153312-tulsa-king-2022",
  "Russian Doll": "https://cinejoy.pk/series/84977-russian-doll-2019",
  "Ginny & Georgia": "https://cinejoy.pk/series/117581-ginny-and-georgia-2021",
  "Outer Banks": "https://cinejoy.pk/series/100757-outer-banks-2020",
  "Virgin River": "https://cinejoy.pk/series/88324-virgin-river-2019",
  "The Summer I Turned Pretty": "https://cinejoy.pk/series/194766-the-summer-i-turned-pretty-2022",
  "3 Body Problem": "https://cinejoy.pk/series/108545-3-body-problem-2024",
  "Foundation": "https://cinejoy.pk/series/93740-foundation-2021",
  "Gen V": "https://cinejoy.pk/series/205715-gen-v-2023",
  "Sword Art Online": "https://cinejoy.pk/series/45782-sword-art-online-2012",
  "Fire Force": "https://cinejoy.pk/series/88046-fire-force-2019",
  "American Dad!": "https://cinejoy.pk/series/1433-american-dad-2005",
  "Avatar: The Last Airbender (2024)": "https://cinejoy.pk/series/82452-avatar-the-last-airbender-2024",
  "The Book of Boba Fett": "https://cinejoy.pk/series/115036-the-book-of-boba-fett-2021",
  "Obi-Wan Kenobi": "https://cinejoy.pk/series/92830-obi-wan-kenobi-2022",
  "Ahsoka": "https://cinejoy.pk/series/114461-ahsoka-2023",
  "Two and a Half Men": "https://cinejoy.pk/series/2691-two-and-a-half-men-2003",
  "Young Sheldon": "https://cinejoy.pk/series/71728-young-sheldon-2017",
  "Not Going Out": "https://cinejoy.pk/series/1393-not-going-out-2006",
  "Girls": "https://cinejoy.pk/series/42282-girls-2012",
  "The O.C.": "https://cinejoy.pk/series/2673-the-oc-2003",
  "Dawson's Creek": "https://cinejoy.pk/series/2327-dawsons-creek-1998",
  "One Tree Hill": "https://cinejoy.pk/series/269-one-tree-hill-2003",
  "Riverdale": "https://cinejoy.pk/series/69050-riverdale-2017",
  "13 Reasons Why": "https://cinejoy.pk/series/66788-13-reasons-why-2017",
  "Doctor Odyssey": "https://cinejoy.pk/series/249695-doctor-odyssey-2024",
  "Dexter: Resurrection": "https://cinejoy.pk/series/259909-dexter-resurrection-2025",
  "CSI: Crime Scene Investigation": "https://cinejoy.pk/series/1431-csi-crime-scene-investigation-2000",
  "NCIS": "https://cinejoy.pk/series/4614-ncis-2003",
  "Top of the Lake": "https://cinejoy.pk/series/46638-top-of-the-lake-2013",
  "Vigil": "https://cinejoy.pk/series/126167-vigil-2021",
  "Mr. & Mrs. Smith": "https://cinejoy.pk/series/118642-mr-and-mrs-smith-2024",
  "Torchwood": "https://cinejoy.pk/series/424-torchwood-2006",
  "Charmed": "https://cinejoy.pk/series/1981-charmed-1998",
  "Fear the Walking Dead": "https://cinejoy.pk/series/62286-fear-the-walking-dead-2015",
  "The Haunting of Bly Manor": "https://cinejoy.pk/series/109958-the-haunting-of-bly-manor-2020",
  "Midnight Mass": "https://cinejoy.pk/series/97400-midnight-mass-2021",
  "The Fall of the House of Usher": "https://cinejoy.pk/series/157065-the-fall-of-the-house-of-usher-2023",
  "Slasher": "https://cinejoy.pk/series/65784-slasher-2016",
  "Resident Evil (Series)": "https://cinejoy.pk/series/108296-resident-evil-2022",
  "Black Summer": "https://cinejoy.pk/series/88052-black-summer-2019",
  "Watchmen (Series)": "https://cinejoy.pk/series/79788-watchmen-2019",
  "Lovecraft Country": "https://cinejoy.pk/series/82816-lovecraft-country-2020",
  "The 100": "https://cinejoy.pk/series/48866-the-100-2014",
  "Heroes": "https://cinejoy.pk/series/1639-heroes-2006",
  "Smallville": "https://cinejoy.pk/series/4604-smallville-2001",
  "Arrow": "https://cinejoy.pk/series/1412-arrow-2012",
  "The Flash (Series)": "https://cinejoy.pk/series/60735-the-flash-2014",
  "Supergirl": "https://cinejoy.pk/series/62688-supergirl-2015",
  "Legends of Tomorrow": "https://cinejoy.pk/series/62643-legends-of-tomorrow-2016",
  "Titans": "https://cinejoy.pk/series/75450-titans-2018",
  "Luke Cage": "https://cinejoy.pk/series/62126-luke-cage-2016",
  "Iron Fist": "https://cinejoy.pk/series/62127-iron-fist-2017",
  "The Defenders": "https://cinejoy.pk/series/62285-the-defenders-2017",
  "Agents of S.H.I.E.L.D.": "https://cinejoy.pk/series/1403-agents-of-shield-2013",
  "Star Trek: Picard": "https://cinejoy.pk/series/85949-star-trek-picard-2020",
  "Star Trek: Discovery": "https://cinejoy.pk/series/67198-star-trek-discovery-2017",
  "Quantum Leap": "https://cinejoy.pk/series/202102-quantum-leap-2022",
  "Lost in Space": "https://cinejoy.pk/series/75758-lost-in-space-2018",
  "Raised by Wolves": "https://cinejoy.pk/series/85723-raised-by-wolves-2020",
  "Devs": "https://cinejoy.pk/series/81349-devs-2020",
  "Heeramandi": "https://cinejoy.pk/series/156716-heeramandi-2024",
  "Aarya": "https://cinejoy.pk/series/104913-aarya-2020",
  "Mismatched": "https://cinejoy.pk/series/113457-mismatched-2020",
  "Four More Shots Please!": "https://cinejoy.pk/series/86165-four-more-shots-please-2019",
  "Undekhi": "https://cinejoy.pk/series/105759-undekhi-2020",
  "Bhaukaal": "https://cinejoy.pk/series/100732-bhaukaal-2020",
  "Mumbai Diaries 26/11": "https://cinejoy.pk/series/115466-mumbai-diaries-26-11-2021",
  "Ray": "https://cinejoy.pk/series/126829-ray-2021",
  "Taj: Divided by Blood": "https://cinejoy.pk/series/220977-taj-divided-by-blood-2023",
  "Khakee: The Bihar Chapter": "https://cinejoy.pk/series/213635-khakee-the-bihar-chapter-2025",
  "Gyaarah Gyaarah": "https://cinejoy.pk/series/259688-gyaarah-gyaarah-2024",
  "Mastram": "https://cinejoy.pk/series/102823-mastram-2020",
  "Apharan": "https://cinejoy.pk/series/84962-apharan-2018",
  "Rana Naidu": "https://cinejoy.pk/series/203202-rana-naidu-2023",
  "Scoop": "https://cinejoy.pk/series/226531-scoop-2023",
  "Yeh Kaali Kaali Ankhein": "https://cinejoy.pk/series/153950-yeh-kaali-kaali-ankhein-2022",
  "Bambai Meri Jaan": "https://cinejoy.pk/series/202237-bambai-meri-jaan-2023",
  "Sunflower": "https://cinejoy.pk/series/127332-sunflower-2021",
  "All of Us Are Dead": "https://cinejoy.pk/series/99966-all-of-us-are-dead-2022",
  "Sweet Home": "https://cinejoy.pk/series/96648-sweet-home-2020",
  "My Name": "https://cinejoy.pk/series/110356-my-name-2021",
  "Hellbound": "https://cinejoy.pk/series/106651-hellbound-2021",
  "Boys Over Flowers": "https://cinejoy.pk/series/16420-boys-over-flowers-2009",
  "Meteor Garden": "https://cinejoy.pk/series/8082-meteor-garden-2001",
  "Alice in Borderland": "https://cinejoy.pk/series/110316-alice-in-borderland-2020",
  "The Makanai: Cooking for the Maiko House": "https://cinejoy.pk/series/154916-the-makanai-cooking-for-the-maiko-house-2023",
  "Inventing Anna": "https://cinejoy.pk/series/95665-inventing-anna-2022",
  "WeCrashed": "https://cinejoy.pk/series/117821-wecrashed-2022",
  "Break Point": "https://cinejoy.pk/series/216386-break-point-2023",
  "Full Swing": "https://cinejoy.pk/series/218137-full-swing-2023",
  "Love Is Blind": "https://cinejoy.pk/series/99353-love-is-blind-2020",
  "Selling Sunset": "https://cinejoy.pk/series/87826-selling-sunset-2019",
  "MasterChef": "https://cinejoy.pk/series/11889-masterchef-2005",
  "Shark Tank": "https://cinejoy.pk/series/30703-shark-tank-2009",
  "Survivor": "https://cinejoy.pk/series/14658-survivor-2000",
  "Who Wants to Be a Millionaire?": "https://cinejoy.pk/series/6890-who-wants-to-be-a-millionaire-1998",
  "Kaun Banega Crorepati": "https://cinejoy.pk/series/911-kaun-banega-crorepati-2000",
  "Indian Idol": "https://cinejoy.pk/series/13700-indian-idol-2004",
  "Roadies": "https://cinejoy.pk/series/65748-roadies-2003",
  "Bigg Boss": "https://cinejoy.pk/series/11436-bigg-boss-2006",
  "Koffee with Karan": "https://cinejoy.pk/series/14544-koffee-with-karan-2004",
  "The Kapil Sharma Show": "https://cinejoy.pk/series/66465-the-kapil-sharma-show-2016",
  "Taarak Mehta Ka Ooltah Chashmah": "https://cinejoy.pk/series/8630-taarak-mehta-ka-ooltah-chashmah-2008",
  "Ragnarok": "https://cinejoy.pk/series/91557-ragnarok-2020",
  "The Rain": "https://cinejoy.pk/series/76719-the-rain-2018",
  "Cable Girls": "https://cinejoy.pk/series/71225-cable-girls-2017",
  "Monarch: Legacy of Monsters": "https://cinejoy.pk/series/202411-monarch-legacy-of-monsters-2023",
  "Batwoman": "https://cinejoy.pk/series/89247-batwoman-2019",
  "Black Lightning": "https://cinejoy.pk/series/71663-black-lightning-2018",
  "Constantine": "https://cinejoy.pk/series/60743-constantine-2014",
  "Class": "https://cinejoy.pk/series/64073-class-2016",
  "Star Trek: Enterprise": "https://cinejoy.pk/series/314-star-trek-enterprise-2001",
  "Industry": "https://cinejoy.pk/series/90812-industry-2020",
  "Presumed Innocent": "https://cinejoy.pk/series/156933-presumed-innocent-2024",
  "The Sympathizer": "https://cinejoy.pk/series/129398-the-sympathizer-2024",
  "Sugar": "https://cinejoy.pk/series/203744-sugar-2024",
  "Batman: Caped Crusader": "https://cinejoy.pk/series/125909-batman-caped-crusader-2024",
  "Secret Level": "https://cinejoy.pk/series/261579-secret-level-2024",
  "Breathe: Into the Shadows": "https://cinejoy.pk/series/105521-breathe-into-the-shadows-2020",
  "Inspector Rishi": "https://cinejoy.pk/series/249543-inspector-rishi-2024",
  "Manvat Murders": "https://cinejoy.pk/series/270667-manvat-murders-2024",
  "IC 814: The Kandahar Hijack": "https://cinejoy.pk/series/247829-ic-814-the-kandahar-hijack-2024",
  "Tribhuvan Mishra CA Topper": "https://cinejoy.pk/series/258035-tribhuvan-mishra-ca-topper-2024",
  "Killer Soup": "https://cinejoy.pk/series/238419-killer-soup-2024",
  "A Killer Paradox": "https://cinejoy.pk/series/202783-a-killer-paradox-2024",
  "The 8 Show": "https://cinejoy.pk/series/156484-the-8-show-2024",
  "Celebrity": "https://cinejoy.pk/series/131305-celebrity-2023",
  "See You in My 19th Life": "https://cinejoy.pk/series/154824-see-you-in-my-19th-life-2023",
  "Maniac": "https://cinejoy.pk/series/73411-maniac-2018",
  "Knutby": "https://cinejoy.pk/series/137140-knutby-2021",
  "Snabba Cash": "https://cinejoy.pk/series/119565-snabba-cash-2021",
  "Tehran": "https://cinejoy.pk/series/103913-tehran-2020",
  "Our Boys": "https://cinejoy.pk/series/91752-our-boys-2019",
  "Black Spot (Zone Blanche)": "https://cinejoy.pk/series/70613-black-spot-2017",
  "30 Coins": "https://cinejoy.pk/series/89844-30-coins-2020",
  "Bad Monkey": "https://cinejoy.pk/series/130853-bad-monkey-2024",
  "Sunny": "https://cinejoy.pk/series/157226-sunny-2024",
  "Manhunt": "https://cinejoy.pk/series/155533-manhunt-2024",
  "Franklin": "https://cinejoy.pk/series/197591-franklin-2024",
  "Sugar (2024)": "https://cinejoy.pk/series/203744-sugar-2024",
  "The New Look": "https://cinejoy.pk/series/157368-the-new-look-2024",
  "Lady in the Lake": "https://cinejoy.pk/series/120549-lady-in-the-lake-2024",
  "La Maison": "https://cinejoy.pk/series/231000-la-maison-2024",
  "Before": "https://cinejoy.pk/series/240920-before-2024",
  "WondLa": "https://cinejoy.pk/series/237853-wondla-2024",
  "Midnight Family": "https://cinejoy.pk/series/195305-midnight-family-2024",
  "Liaison": "https://cinejoy.pk/series/128066-liaison-2023",
  "Dear Edward": "https://cinejoy.pk/series/156820-dear-edward-2023",
  "Extrapolations": "https://cinejoy.pk/series/138169-extrapolations-2023",
  "The Last Thing He Told Me": "https://cinejoy.pk/series/201289-the-last-thing-he-told-me-2023",
  "City on Fire": "https://cinejoy.pk/series/155534-city-on-fire-2023",
  "The Crowded Room": "https://cinejoy.pk/series/123192-the-crowded-room-2023",
  "The Changeling": "https://cinejoy.pk/series/131992-the-changeling-2023",
  "Criminal Record": "https://cinejoy.pk/series/204490-criminal-record-2024",
  "The Big Door Prize": "https://cinejoy.pk/series/194704-the-big-door-prize-2023",
  "Physical": "https://cinejoy.pk/series/119181-physical-2021",
  "Trying": "https://cinejoy.pk/series/98177-trying-2020",
  "Supacell": "https://cinejoy.pk/series/158141-supacell-2024",
  "Eric": "https://cinejoy.pk/series/217667-eric-2024",
  "Dead Boy Detectives": "https://cinejoy.pk/series/132750-dead-boy-detectives-2024",
  "The Decameron": "https://cinejoy.pk/series/250162-the-decameron-2024",
  "Kaos": "https://cinejoy.pk/series/102621-kaos-2024",
  "A Man in Full": "https://cinejoy.pk/series/225120-a-man-in-full-2024",
  "Senna": "https://cinejoy.pk/series/211039-senna-2024",
  "Interior Chinatown": "https://cinejoy.pk/series/212246-interior-chinatown-2024",
  "Tomb Raider: The Legend of Lara Croft": "https://cinejoy.pk/series/117830-tomb-raider-the-legend-of-lara-croft-2024",
  "Twilight of the Gods": "https://cinejoy.pk/series/97333-twilight-of-the-gods-2024",
  "Scott Pilgrim Takes Off": "https://cinejoy.pk/series/155292-scott-pilgrim-takes-off-2023",
  "Castlevania: Nocturne": "https://cinejoy.pk/series/123548-castlevania-nocturne-2023",
  "Dragon Ball Daima": "https://cinejoy.pk/series/236994-dragon-ball-daima-2024",
  "Terminator Zero": "https://cinejoy.pk/series/239287-terminator-zero-2024",
  "Gyeongseong Creature": "https://cinejoy.pk/series/135238-gyeongseong-creature-2023",
  "The Bequeathed": "https://cinejoy.pk/series/212553-the-bequeathed-2024",
  "Doctor Slump": "https://cinejoy.pk/series/222233-doctor-slump-2024",
  "Parasyte: The Grey": "https://cinejoy.pk/series/208825-parasyte-the-grey-2024",
  "Hierarchy": "https://cinejoy.pk/series/226527-hierarchy-2024",
  "The Frog": "https://cinejoy.pk/series/219652-the-frog-2024",
  "Mr. Plankton": "https://cinejoy.pk/series/230448-mr-plankton-2024",
  "The Trunk": "https://cinejoy.pk/series/230777-the-trunk-2024",
  "Mask Girl": "https://cinejoy.pk/series/156888-mask-girl-2023",
  "My Demon": "https://cinejoy.pk/series/218539-my-demon-2023",
  "Marry My Husband": "https://cinejoy.pk/series/221851-marry-my-husband-2024",
  "A Shop for Killers": "https://cinejoy.pk/series/215072-a-shop-for-killers-2024",
  "The Judge from Hell": "https://cinejoy.pk/series/235577-the-judge-from-hell-2024",
  "Family by Choice": "https://cinejoy.pk/series/237565-family-by-choice-2024",
  "Jeongnyeon: The Star Is Born": "https://cinejoy.pk/series/214528-jeongnyeon-the-star-is-born-2024",
  "The Franchise": "https://cinejoy.pk/series/216619-the-franchise-2024",
  "The Day of the Jackal": "https://cinejoy.pk/series/222766-the-day-of-the-jackal-2024",
  "Say Nothing": "https://cinejoy.pk/series/245256-say-nothing-2024",
  "The Regime": "https://cinejoy.pk/series/206829-the-regime-2024",
  "Under the Bridge": "https://cinejoy.pk/series/211358-under-the-bridge-2024",
  "Apples Never Fall": "https://cinejoy.pk/series/222031-apples-never-fall-2024",
  "Expats": "https://cinejoy.pk/series/95556-expats-2024",
  "Boy Swallows Universe": "https://cinejoy.pk/series/209332-boy-swallows-universe-2024",
  "Star Wars: Tales of the Empire": "https://cinejoy.pk/series/251091-star-wars-tales-of-the-empire-2024",
  "Ted (TV Series)": "https://cinejoy.pk/series/201834-ted-2024",
  "Hysteria!": "https://cinejoy.pk/series/224361-hysteria-2024",
  "Teacup": "https://cinejoy.pk/series/247721-teacup-2024",
  "Fight Night: The Million Dollar Heist": "https://cinejoy.pk/series/241485-fight-night-the-million-dollar-heist-2024",
  "Those About to Die": "https://cinejoy.pk/series/218589-those-about-to-die-2024",
  "Twisted Metal": "https://cinejoy.pk/series/133748-twisted-metal-2023",
  "The Continental: From the World of John Wick": "https://cinejoy.pk/series/72710-the-continental-from-the-world-of-john-wick-2023",
  "Knuckles": "https://cinejoy.pk/series/158300-knuckles-2024",
  "Star Trek: Lower Decks": "https://cinejoy.pk/series/85948-star-trek-lower-decks-2020",
  "Mr. & Mrs. Smith (2024)": "https://cinejoy.pk/series/118642-mr-and-mrs-smith-2024",
  "Like a Dragon: Yakuza": "https://cinejoy.pk/series/256116-like-a-dragon-yakuza-2024",
  "Daisy Jones & The Six": "https://cinejoy.pk/series/95555-daisy-jones-and-the-six-2023",
  "Swarm": "https://cinejoy.pk/series/220116-swarm-2023",
  "My Lady Jane": "https://cinejoy.pk/series/203413-my-lady-jane-2024",
  "English Teacher": "https://cinejoy.pk/series/258902-english-teacher-2024",
  "We Were the Lucky Ones": "https://cinejoy.pk/series/200908-we-were-the-lucky-ones-2024",
  "A Murder at the End of the World": "https://cinejoy.pk/series/134095-a-murder-at-the-end-of-the-world-2023",
  "Percy Jackson and the Olympians": "https://cinejoy.pk/series/103540-percy-jackson-and-the-olympians-2023",
  "Goosebumps (2023)": "https://cinejoy.pk/series/157004-goosebumps-2023",
  "Renegade Nell": "https://cinejoy.pk/series/157569-renegade-nell-2024",
  "Doctor Who (2024)": "https://cinejoy.pk/series/239770-doctor-who-2024",
  "The Apothecary Diaries": "https://cinejoy.pk/series/220542-the-apothecary-diaries-2023",
  "Shangri-La Frontier": "https://cinejoy.pk/series/205050-shangri-la-frontier-2023",
  "Undead Unluck": "https://cinejoy.pk/series/209077-undead-unluck-2023",
  "Ninja Kamui": "https://cinejoy.pk/series/202284-ninja-kamui-2024",
  "Zom 100: Bucket List of the Dead": "https://cinejoy.pk/series/217766-zom-100-bucket-list-of-the-dead-2023",
  "Heavenly Delusion": "https://cinejoy.pk/series/208891-heavenly-delusion-2023",
  "Indian Police Force": "https://cinejoy.pk/series/201009-indian-police-force-2024",
  "Karmma Calling": "https://cinejoy.pk/series/241606-karmma-calling-2024",
  "Showtime": "https://cinejoy.pk/series/241926-showtime-2024",
  "Dil Dosti Dilemma": "https://cinejoy.pk/series/249747-dil-dosti-dilemma-2024",
  "Big Girls Don't Cry": "https://cinejoy.pk/series/248065-big-girls-dont-cry-2024",
  "Baahubali: Crown of Blood": "https://cinejoy.pk/series/253371-baahubali-crown-of-blood-2024",
  "Shekhar Home": "https://cinejoy.pk/series/260203-shekhar-home-2024",
  "Call Me Bae": "https://cinejoy.pk/series/238108-call-me-bae-2024",
  "Citadel: Honey Bunny": "https://cinejoy.pk/series/154084-citadel-honey-bunny-2024",
  "Bandwaale": "https://cinejoy.pk/series/249760-bandwaale-2024",
  "The Great Indian Kapil Show": "https://cinejoy.pk/series/247769-the-great-indian-kapil-show-2024",
  "Thalaimai Seyalagam": "https://cinejoy.pk/series/253500-thalaimai-seyalagam-2024",
  "Parachute": "https://cinejoy.pk/series/277367-parachute-2024",
  "Manorathangal": "https://cinejoy.pk/series/259209-manorathangal-2024",
  "School of Lies": "https://cinejoy.pk/series/227374-school-of-lies-2023",
  "Tooth Pari: When Love Bites": "https://cinejoy.pk/series/224333-tooth-pari-when-love-bites-2023",
  "The Jengaburu Curse": "https://cinejoy.pk/series/232133-the-jengaburu-curse-2023",
  "Aakhri Sach": "https://cinejoy.pk/series/232442-aakhri-sach-2023",
  "Choona": "https://cinejoy.pk/series/230418-choona-2023",
  "Kaalkoot": "https://cinejoy.pk/series/230483-kaalkoot-2023",
  "Dhootha": "https://cinejoy.pk/series/200946-dhootha-2023",
  "The Gilded Age": "https://cinejoy.pk/series/81723-the-gilded-age-2022",
  "Hijack": "https://cinejoy.pk/series/198102-hijack-2023",
  "Sweet Magnolias": "https://cinejoy.pk/series/102904-sweet-magnolias-2020",
  "The Night Agent": "https://cinejoy.pk/series/129552-the-night-agent-2023",
  "Rivals": "https://cinejoy.pk/series/208921-rivals-2024",
  "Zero Day": "https://cinejoy.pk/series/216082-zero-day-2025",
  "Murderbot": "https://cinejoy.pk/series/241554-murderbot-2025",
  "Big Mouth": "https://cinejoy.pk/series/74204-big-mouth-2017",
  "Workaholics": "https://cinejoy.pk/series/36994-workaholics-2011",
  "The Middle": "https://cinejoy.pk/series/1422-the-middle-2009",
  "Mom": "https://cinejoy.pk/series/49011-mom-2013",
  "Kim's Convenience": "https://cinejoy.pk/series/68106-kims-convenience-2016",
  "You": "https://cinejoy.pk/series/78191-you-2018",
  "Blue Bloods": "https://cinejoy.pk/series/32692-blue-bloods-2010",
  "Griselda": "https://cinejoy.pk/series/137893-griselda-2024",
  "Sabrina": "https://cinejoy.pk/series/195746-sabrina-2018",
  "Scooby-Doo, Where Are You!": "https://cinejoy.pk/series/926-scooby-doo-where-are-you-1969",
  "Recess": "https://cinejoy.pk/series/1546-recess-1997",
  "Blue's Clues": "https://cinejoy.pk/series/10821-blues-clues-1996",
  "Peppa Pig": "https://cinejoy.pk/series/12225-peppa-pig-2004",
  "Ben 10": "https://cinejoy.pk/series/4686-ben-10-2005",
  "Squid Game: The Challenge": "https://cinejoy.pk/series/204082-squid-game-the-challenge-2023",
  "Surviving R. Kelly": "https://cinejoy.pk/series/85389-surviving-r-kelly-2019",
  "Catch-22": "https://cinejoy.pk/series/82744-catch-22-2019",
  "Khauf": "https://cinejoy.pk/series/249749-khauf-2025",
  "True Beauty": "https://cinejoy.pk/series/112888-true-beauty-2020",
  "When the Phone Rings": "https://cinejoy.pk/series/253905-when-the-phone-rings-2024",
  "Berlin": "https://cinejoy.pk/series/146176-berlin-2023",
  "Marseille": "https://cinejoy.pk/series/65466-marseille-2016",
  "Das Boot": "https://cinejoy.pk/series/83936-das-boot-2018",
  "Quicksand": "https://cinejoy.pk/series/86621-quicksand-2019",
  "Zero": "https://cinejoy.pk/series/119861-zero-2021",
  "Beforeigners": "https://cinejoy.pk/series/91520-beforeigners-2019",
  "Occupied": "https://cinejoy.pk/series/63867-occupied-2015",
  "Lilyhammer": "https://cinejoy.pk/series/42368-lilyhammer-2012",
  "Dirty John": "https://cinejoy.pk/series/83251-dirty-john-2018",
  "Friends from College": "https://cinejoy.pk/series/71890-friends-from-college-2018",
  "Benidorm": "https://cinejoy.pk/series/11567-benidorm-2007",
  "Mrs. Brown's Boys": "https://cinejoy.pk/series/34965-mrs-browns-boys-2011",
  "Miranda": "https://cinejoy.pk/series/31500-miranda-2009",
  "Outnumbered": "https://cinejoy.pk/series/12784-outnumbered-2007",
  "Motherland": "https://cinejoy.pk/series/67804-motherland-2016",
  "Plebs": "https://cinejoy.pk/series/46973-plebs-2013",
  "Are You Being Served?": "https://cinejoy.pk/series/168-are-you-being-served-1972",
  "Absolutely Fabulous": "https://cinejoy.pk/series/4493-absolutely-fabulous-1992",
  "Little Britain": "https://cinejoy.pk/series/380-little-britain-2003",
  "Life's Too Short": "https://cinejoy.pk/series/38294-lifes-too-short-2011",
  "Modern Love": "https://cinejoy.pk/series/91602-modern-love-2019",
  "Single Drunk Female": "https://cinejoy.pk/series/136739-single-drunk-female-2022",
  "2 Broke Girls": "https://cinejoy.pk/series/39340-2-broke-girls-2011",
  "Mike & Molly": "https://cinejoy.pk/series/32709-mike-and-molly-2010",
  "Last Man Standing": "https://cinejoy.pk/series/39297-last-man-standing-2011",
  "Cougar Town": "https://cinejoy.pk/series/18202-cougar-town-2009",
  "Ugly Betty": "https://cinejoy.pk/series/4626-ugly-betty-2006",
  "Glee": "https://cinejoy.pk/series/1417-glee-2009",
  "Girls5eva": "https://cinejoy.pk/series/100350-girls5eva-2021",
  "Loot": "https://cinejoy.pk/series/197449-loot-2022",
  "Platonic": "https://cinejoy.pk/series/112211-platonic-2023",
  "Nobody's Looking": "https://cinejoy.pk/series/95121-nobodys-looking-2025",
  "Mulligan": "https://cinejoy.pk/series/100349-mulligan-2025",
  "St. Denis Medical": "https://cinejoy.pk/series/251941-st-denis-medical-2024",
  "Sliders": "https://cinejoy.pk/series/1649-sliders-1995",
  "Space: Above and Beyond": "https://cinejoy.pk/series/3534-space-above-and-beyond-1995",
  "Lexx": "https://cinejoy.pk/series/1818-lexx-1997",
  "Roswell": "https://cinejoy.pk/series/4624-roswell-1999",
  "Jeremiah": "https://cinejoy.pk/series/184-jeremiah-2002",
  "Dark Skies": "https://cinejoy.pk/series/164-dark-skies-1996",
  "The 4400": "https://cinejoy.pk/series/1481-the-4400-2004",
  "Surface": "https://cinejoy.pk/series/3486-surface-2005",
  "Threshold": "https://cinejoy.pk/series/1441-threshold-2005",
  "Journeyman": "https://cinejoy.pk/series/3184-journeyman-2007",
  "V": "https://cinejoy.pk/series/21494-v-2009",
  "The Event": "https://cinejoy.pk/series/32730-the-event-2010",
  "Alcatraz": "https://cinejoy.pk/series/35339-alcatraz-2012",
  "Defiance (Series)": "https://cinejoy.pk/series/51704-defiance-2013",
  "Helix": "https://cinejoy.pk/series/58811-helix-2014",
  "Extant": "https://cinejoy.pk/series/58111-extant-2014",
  "The Strain": "https://cinejoy.pk/series/47640-the-strain-2014",
  "Wayward Pines": "https://cinejoy.pk/series/53425-wayward-pines-2015",
  "Timeless": "https://cinejoy.pk/series/66786-timeless-2016",
  "Salvation": "https://cinejoy.pk/series/70513-salvation-2017",
  "Electric Dreams": "https://cinejoy.pk/series/70391-electric-dreams-2017",
  "The Rook": "https://cinejoy.pk/series/79272-the-rook-2019",
  "The Peripheral": "https://cinejoy.pk/series/95403-the-peripheral-2022",
  "Hunters": "https://cinejoy.pk/series/79622-hunters-2020",
  "Snowpiercer (Series)": "https://cinejoy.pk/series/79680-snowpiercer-2020",
  "Tales from the Loop": "https://cinejoy.pk/series/93784-tales-from-the-loop-2020",
  "The Wilds": "https://cinejoy.pk/series/113367-the-wilds-2020",
  "Brave New World": "https://cinejoy.pk/series/93289-brave-new-world-2020",
  "Ark": "https://cinejoy.pk/series/40148-ark-2023",
  "Time Bandits": "https://cinejoy.pk/series/114924-time-bandits-2024",
  "The Acolyte": "https://cinejoy.pk/series/114479-the-acolyte-2024",
  "Star Wars: Skeleton Crew": "https://cinejoy.pk/series/202879-star-wars-skeleton-crew-2024",
  "Dark Matter": "https://cinejoy.pk/series/196322-dark-matter-2024",
  "Criminal Minds: Evolution": "https://cinejoy.pk/series/4057-criminal-minds-evolution-2022",
  "CSI: Miami": "https://cinejoy.pk/series/1620-csi-miami-2002",
  "CSI: NY": "https://cinejoy.pk/series/2458-csi-ny-2004",
  "NCIS: Los Angeles": "https://cinejoy.pk/series/17610-ncis-los-angeles-2009",
  "NCIS: New Orleans": "https://cinejoy.pk/series/61387-ncis-new-orleans-2014",
  "Law & Order: Criminal Intent": "https://cinejoy.pk/series/4601-law-and-order-criminal-intent-2001",
  "Law & Order: Organized Crime": "https://cinejoy.pk/series/106158-law-and-order-organized-crime-2021",
  "Hawaii Five-O": "https://cinejoy.pk/series/2303-hawaii-five-o-1968",
  "Cagney & Lacey": "https://cinejoy.pk/series/4223-cagney-and-lacey-1981",
  "Matlock": "https://cinejoy.pk/series/2093-matlock-1986",
  "Dragnet": "https://cinejoy.pk/series/3716-dragnet-1951",
  "Quincy, M.E.": "https://cinejoy.pk/series/2179-quincy-me-1976",
  "The Streets of San Francisco": "https://cinejoy.pk/series/2468-the-streets-of-san-francisco-1972",
  "Major Crimes": "https://cinejoy.pk/series/39483-major-crimes-2012",
  "Marcella": "https://cinejoy.pk/series/66023-marcella-2016",
  "Safe": "https://cinejoy.pk/series/72792-safe-2018",
  "The Stranger": "https://cinejoy.pk/series/96608-the-stranger-2020",
  "Behind Her Eyes": "https://cinejoy.pk/series/97173-behind-her-eyes-2021",
  "Inside Man": "https://cinejoy.pk/series/121710-inside-man-2022",
  "Anatomy of a Scandal": "https://cinejoy.pk/series/113984-anatomy-of-a-scandal-2022",
  "Obsession": "https://cinejoy.pk/series/219247-obsession-2023",
  "Fool Me Once": "https://cinejoy.pk/series/220801-fool-me-once-2024",
  "Missing You": "https://cinejoy.pk/series/244243-missing-you-2025",
  "Sirens": "https://cinejoy.pk/series/246992-sirens-2025",
  "Wizards of Waverly Place": "https://cinejoy.pk/series/3498-wizards-of-waverly-place-2007",
  "Hannah Montana": "https://cinejoy.pk/series/4610-hannah-montana-2006",
  "The Suite Life of Zack & Cody": "https://cinejoy.pk/series/4605-the-suite-life-of-zack-and-cody-2005",
  "Lizzie McGuire": "https://cinejoy.pk/series/4575-lizzie-mcguire-2001",
  "Jessie": "https://cinejoy.pk/series/38974-jessie-2011",
  "Austin & Ally": "https://cinejoy.pk/series/35279-austin-and-ally-2011",
  "Victorious": "https://cinejoy.pk/series/31251-victorious-2010",
  "iCarly": "https://cinejoy.pk/series/5371-icarly-2007",
  "Drake & Josh": "https://cinejoy.pk/series/2038-drake-and-josh-2004",
  "Zoey 101": "https://cinejoy.pk/series/1778-zoey-101-2005",
  "Sam & Cat": "https://cinejoy.pk/series/45666-sam-and-cat-2013",
  "That's So Raven": "https://cinejoy.pk/series/4602-thats-so-raven-2003",
  "Kim Possible": "https://cinejoy.pk/series/2345-kim-possible-2002",
  "Phil of the Future": "https://cinejoy.pk/series/1528-phil-of-the-future-2004",
  "Sabrina the Teenage Witch": "https://cinejoy.pk/series/605-sabrina-the-teenage-witch-1996",
  "Goosebumps": "https://cinejoy.pk/series/5835-goosebumps-1995",
  "Are You Afraid of the Dark?": "https://cinejoy.pk/series/2913-are-you-afraid-of-the-dark-1990",
  "Dark Shadows": "https://cinejoy.pk/series/2883-dark-shadows-1966",
  "Bewitched": "https://cinejoy.pk/series/4482-bewitched-1964",
  "I Dream of Jeannie": "https://cinejoy.pk/series/1660-i-dream-of-jeannie-1965",
  "The Munsters": "https://cinejoy.pk/series/1712-the-munsters-1964",
  "The Addams Family": "https://cinejoy.pk/series/14009-the-addams-family-1964",
  "Legacies": "https://cinejoy.pk/series/79460-legacies-2018",
  "Shadowhunters": "https://cinejoy.pk/series/63210-shadowhunters-2016",
  "The Magicians": "https://cinejoy.pk/series/64432-the-magicians-2015",
  "Warrior Nun": "https://cinejoy.pk/series/87689-warrior-nun-2020",
  "Cursed": "https://cinejoy.pk/series/83125-cursed-2020",
  "The Witcher: Blood Origin": "https://cinejoy.pk/series/106541-the-witcher-blood-origin-2022",
  "Dragon Age: Absolution": "https://cinejoy.pk/series/203805-dragon-age-absolution-2022",
  "Dota: Dragon's Blood": "https://cinejoy.pk/series/118956-dota-dragons-blood-2021",
  "Ninjago": "https://cinejoy.pk/series/38693-ninjago-2011",
  "Johnny Test": "https://cinejoy.pk/series/1769-johnny-test-2005",
  "Chowder": "https://cinejoy.pk/series/9907-chowder-2007",
  "Big City Greens": "https://cinejoy.pk/series/80587-big-city-greens-2018",
  "The Loud House": "https://cinejoy.pk/series/68073-the-loud-house-2016",
  "Ren & Stimpy": "https://cinejoy.pk/series/259831-ren-and-stimpy-1991",
  "Aaahh!!! Real Monsters": "https://cinejoy.pk/series/2429-aaahh-real-monsters-1994",
  "Tiny Toon Adventures": "https://cinejoy.pk/series/1830-tiny-toon-adventures-1990",
  "DuckTales": "https://cinejoy.pk/series/720-ducktales-1987",
  "TaleSpin": "https://cinejoy.pk/series/2720-talespin-1990",
  "Darkwing Duck": "https://cinejoy.pk/series/3319-darkwing-duck-1991",
  "Teenage Mutant Ninja Turtles": "https://cinejoy.pk/series/160-teenage-mutant-ninja-turtles-1987",
  "Rise of the Teenage Mutant Ninja Turtles": "https://cinejoy.pk/series/81026-rise-of-the-teenage-mutant-ninja-turtles-2018",
  "He-Man and the Masters of the Universe": "https://cinejoy.pk/series/931-he-man-and-the-masters-of-the-universe-1983",
  "Beyblade": "https://cinejoy.pk/series/54728-beyblade-2001",
  "Yu-Gi-Oh! Duel Monsters": "https://cinejoy.pk/series/902-yu-gi-oh-duel-monsters-2000",
  "Digimon": "https://cinejoy.pk/series/31654-digimon-1999",
  "Dragon Ball GT": "https://cinejoy.pk/series/12697-dragon-ball-gt-1996",
  "Boruto": "https://cinejoy.pk/series/70881-boruto-2017",
  "The Seven Deadly Sins": "https://cinejoy.pk/series/62104-the-seven-deadly-sins-2014",
  "Black Butler": "https://cinejoy.pk/series/50712-black-butler-2008",
  "Blue Exorcist": "https://cinejoy.pk/series/38464-blue-exorcist-2011",
  "Lucky Star": "https://cinejoy.pk/series/42500-lucky-star-2007",
  "Spy Classroom": "https://cinejoy.pk/series/194986-spy-classroom-2023",
  "Dallas": "https://cinejoy.pk/series/40-dallas-1978",
  "Dynasty": "https://cinejoy.pk/series/3769-dynasty-1981",
  "Beverly Hills, 90210": "https://cinejoy.pk/series/2025-beverly-hills-90210-1990",
  "Melrose Place": "https://cinejoy.pk/series/4349-melrose-place-1992",
  "Alias": "https://cinejoy.pk/series/2046-alias-2001",
  "Desperate Housewives": "https://cinejoy.pk/series/693-desperate-housewives-2004",
  "Revenge": "https://cinejoy.pk/series/39358-revenge-2011",
  "Nashville": "https://cinejoy.pk/series/44549-nashville-2012",
  "Empire": "https://cinejoy.pk/series/61733-empire-2015",
  "Vinyl": "https://cinejoy.pk/series/63535-vinyl-2016",
  "The Undoing": "https://cinejoy.pk/series/83851-the-undoing-2020",
  "Nine Perfect Strangers": "https://cinejoy.pk/series/88989-nine-perfect-strangers-2021",
  "Disclaimer": "https://cinejoy.pk/series/147050-disclaimer-2024",
  "Taboo": "https://cinejoy.pk/series/65708-taboo-2017",
  "Lost Girl": "https://cinejoy.pk/series/33852-lost-girl-2010",
  "Heroes Reborn": "https://cinejoy.pk/series/60858-heroes-reborn-2015",
  "Chicago Med": "https://cinejoy.pk/series/62650-chicago-med-2015",
  "New Amsterdam": "https://cinejoy.pk/series/80350-new-amsterdam-2018",
  "9-1-1": "https://cinejoy.pk/series/75219-9-1-1-2018",
  "Station 19": "https://cinejoy.pk/series/76773-station-19-2018",
  "Hawaii Five-0": "https://cinejoy.pk/series/32798-hawaii-five-0-2010",
  "S.W.A.T.": "https://cinejoy.pk/series/71790-swat-2017",
  "FBI": "https://cinejoy.pk/series/80748-fbi-2018",
  "Tracker": "https://cinejoy.pk/series/211288-tracker-2024",
  "Manifest": "https://cinejoy.pk/series/79696-manifest-2018",
  "The Resident": "https://cinejoy.pk/series/74016-the-resident-2018",
  "Happy Days (Series)": "https://cinejoy.pk/series/3845-happy-days-1974",
  "Taxi": "https://cinejoy.pk/series/2251-taxi-1978",
  "Three's Company": "https://cinejoy.pk/series/2686-threes-company-1976",
  "Roseanne": "https://cinejoy.pk/series/2706-roseanne-1988",
  "Full House": "https://cinejoy.pk/series/4313-full-house-1987",
  "Home Improvement": "https://cinejoy.pk/series/1558-home-improvement-1991",
  "Mad About You": "https://cinejoy.pk/series/500-mad-about-you-1992",
  "Will & Grace": "https://cinejoy.pk/series/4454-will-and-grace-1998",
  "Becker": "https://cinejoy.pk/series/4477-becker-1998",
  "Spin City": "https://cinejoy.pk/series/2359-spin-city-1996",
  "My Name Is Earl": "https://cinejoy.pk/series/2317-my-name-is-earl-2005",
  "Rules of Engagement": "https://cinejoy.pk/series/2755-rules-of-engagement-2007",
  "The Mindy Project": "https://cinejoy.pk/series/44857-the-mindy-project-2012",
  "Broad City": "https://cinejoy.pk/series/60839-broad-city-2014",
  "Unbreakable Kimmy Schmidt": "https://cinejoy.pk/series/61671-unbreakable-kimmy-schmidt-2015",
  "Fuller House": "https://cinejoy.pk/series/63623-fuller-house-2016",
  "Alone": "https://cinejoy.pk/series/63726-alone-2015",
  "Corner Gas": "https://cinejoy.pk/series/429-corner-gas-2004",
  "Dear White People": "https://cinejoy.pk/series/70767-dear-white-people-2017",
  "Bupkis": "https://cinejoy.pk/series/208953-bupkis-2023",
  "Andromeda": "https://cinejoy.pk/series/2985-andromeda-2000",
  "Dark Angel": "https://cinejoy.pk/series/2407-dark-angel-2000",
  "Terminator: The Sarah Connor Chronicles": "https://cinejoy.pk/series/433-terminator-the-sarah-connor-chronicles-2008",
  "Warehouse 13": "https://cinejoy.pk/series/15819-warehouse-13-2009",
  "Falling Skies": "https://cinejoy.pk/series/34967-falling-skies-2011",
  "Revolution": "https://cinejoy.pk/series/1410-revolution-2012",
  "Almost Human": "https://cinejoy.pk/series/51019-almost-human-2013",
  "Colony": "https://cinejoy.pk/series/62858-colony-2016",
  "Killjoys": "https://cinejoy.pk/series/62413-killjoys-2015",
  "Invasion": "https://cinejoy.pk/series/127235-invasion-2021",
  "Constellation": "https://cinejoy.pk/series/197125-constellation-2024",
  "Kojak": "https://cinejoy.pk/series/3572-kojak-1973",
  "Starsky & Hutch": "https://cinejoy.pk/series/1532-starsky-and-hutch-1975",
  "Miami Vice (Series)": "https://cinejoy.pk/series/1908-miami-vice-1984",
  "Murder, She Wrote": "https://cinejoy.pk/series/484-murder-she-wrote-1984",
  "Without a Trace": "https://cinejoy.pk/series/2593-without-a-trace-2002",
  "Cold Case": "https://cinejoy.pk/series/2171-cold-case-2003",
  "Rizzoli & Isles": "https://cinejoy.pk/series/32895-rizzoli-and-isles-2010",
  "The Following": "https://cinejoy.pk/series/45094-the-following-2013",
  "Death in Paradise": "https://cinejoy.pk/series/41956-death-in-paradise-2011",
  "The Bay": "https://cinejoy.pk/series/87773-the-bay-2019",
  "The Capture": "https://cinejoy.pk/series/93166-the-capture-2019",
  "Collateral (Series)": "https://cinejoy.pk/series/76796-collateral-2018",
  "Truth Be Told": "https://cinejoy.pk/series/80054-truth-be-told-2019",
  "Cross": "https://cinejoy.pk/series/213306-cross-2024",
  "Xena: Warrior Princess": "https://cinejoy.pk/series/4616-xena-warrior-princess-1995",
  "Hercules: The Legendary Journeys": "https://cinejoy.pk/series/4615-hercules-the-legendary-journeys-1995",
  "Eastwick": "https://cinejoy.pk/series/18186-eastwick-2009",
  "Sleepy Hollow": "https://cinejoy.pk/series/50825-sleepy-hollow-2013",
  "Locke & Key": "https://cinejoy.pk/series/86423-locke-and-key-2020",
  "His Dark Materials": "https://cinejoy.pk/series/68507-his-dark-materials-2019",
  "Carnival Row": "https://cinejoy.pk/series/90027-carnival-row-2019",
  "Willow (Series)": "https://cinejoy.pk/series/111837-willow-2022",
  "The Winchesters": "https://cinejoy.pk/series/128113-the-winchesters-2022",
  "The Flintstones": "https://cinejoy.pk/series/1996-the-flintstones-1960",
  "The Jetsons": "https://cinejoy.pk/series/2362-the-jetsons-1962",
  "Pokémon": "https://cinejoy.pk/series/60572-pok-mon-1997",
  "Yu-Gi-Oh!": "https://cinejoy.pk/series/36406-yu-gi-oh-2000",
  "Sailor Moon": "https://cinejoy.pk/series/3570-sailor-moon-1992",
  "Sakamoto Days": "https://cinejoy.pk/series/207332-sakamoto-days-2025",
  "Beavis and Butt-Head": "https://cinejoy.pk/series/13943-beavis-and-butt-head-1993",
  "The Powerpuff Girls": "https://cinejoy.pk/series/607-the-powerpuff-girls-1998",
  "Ben 10: Alien Force": "https://cinejoy.pk/series/6040-ben-10-alien-force-2008",
  "Night Stalker: The Hunt for a Serial Killer": "https://cinejoy.pk/series/114705-night-stalker-the-hunt-for-a-serial-killer-2021",
  "Hotel Hell": "https://cinejoy.pk/series/44472-hotel-hell-2012",
  "Tour of Duty": "https://cinejoy.pk/series/11095-tour-of-duty-1987",
  "Over There": "https://cinejoy.pk/series/4564-over-there-2005",
  "Our Girl": "https://cinejoy.pk/series/61517-our-girl-2013",
  "The Lone Ranger": "https://cinejoy.pk/series/31179-the-lone-ranger-1949",
  "Rawhide": "https://cinejoy.pk/series/10952-rawhide-1959",
  "Maverick": "https://cinejoy.pk/series/953-maverick-1957",
  "The English": "https://cinejoy.pk/series/99346-the-english-2022",
  "Kohra": "https://cinejoy.pk/series/kohra-2023",
  "Tiger King": "https://cinejoy.pk/series/tiger-king-2020",
  "Rings of Power": "https://cinejoy.pk/series/rings-of-power-2022",
  "Skeleton Crew": "https://cinejoy.pk/series/skeleton-crew-2024",
  "Jamtara": "https://cinejoy.pk/series/jamtara-2020",
  "Illegal": "https://cinejoy.pk/series/illegal-2020",
  "Ek Thi Begum": "https://cinejoy.pk/series/ek-thi-begum-2020",
  "Ordinary Heroes": "https://cinejoy.pk/series/ordinary-heroes-2020",
  "The Social Dilemma": "https://cinejoy.pk/series/the-social-dilemma-2020",
  "Dear Mr. Watterson": "https://cinejoy.pk/series/dear-mr-watterson-2013",
  "Don't F**k with Cats": "https://cinejoy.pk/series/dont-f-k-with-cats-2019",
  "Abducted in Plain Sight": "https://cinejoy.pk/series/abducted-in-plain-sight-2017",
  "The Tinder Swindler": "https://cinejoy.pk/series/the-tinder-swindler-2022",
  "Dragon's Den": "https://cinejoy.pk/series/dragons-den-2005",
  "Money Heist: Berlin": "https://cinejoy.pk/series/money-heist-berlin-2023",
  "Merli": "https://cinejoy.pk/series/merli-2015",
  "Look Back (Series)": "https://cinejoy.pk/series/look-back-series-2024",
  "Heeramandi: The Diamond Bazaar": "https://cinejoy.pk/series/heeramandi-the-diamond-bazaar-2024",
  "Asunta": "https://cinejoy.pk/series/asunta-2024",
  "Where's Wanda?": "https://cinejoy.pk/series/wheres-wanda-2024",
  "Me (Series)": "https://cinejoy.pk/series/me-series-2024",
  "Camp Snoopy": "https://cinejoy.pk/series/camp-snoopy-2024",
  "A Good Girl's Guide to Murder": "https://cinejoy.pk/series/a-good-girls-guide-to-murder-2024",
  "Ranma 1/2 (2024)": "https://cinejoy.pk/series/ranma-1-2-2024-2024",
  "The Whirlwind": "https://cinejoy.pk/series/the-whirlwind-2024",
  "Star Wars: The Acolyte": "https://cinejoy.pk/series/star-wars-the-acolyte-2024",
  "Feud: Capote vs. The Swans": "https://cinejoy.pk/series/feud-capote-vs-the-swans-2024",
  "Raat Jawaani Hai": "https://cinejoy.pk/series/raat-jawaani-hai-2024",
  "Barzakh": "https://cinejoy.pk/series/barzakh-2024",
  "Nagendran's Honeymoons": "https://cinejoy.pk/series/nagendrans-honeymoons-2024",
  "Curry & Cyanide": "https://cinejoy.pk/series/curry-and-cyanide-2023",
  "Kaala": "https://cinejoy.pk/series/kaala-2025",
  "Money Heist: Korea": "https://cinejoy.pk/series/money-heist-korea-2022",
  "Tarak Mehta Ka Ooltah Chashmah": "https://cinejoy.pk/series/tarak-mehta-ka-ooltah-chashmah-2008",
  "Sarah Jane Adventures": "https://cinejoy.pk/series/sarah-jane-adventures-2007",
  "Seaquest DSV": "https://cinejoy.pk/series/seaquest-dsv-1993",
  "Tomorrowland": "https://cinejoy.pk/series/tomorrowland-2015",
  "Rizzoli": "https://cinejoy.pk/series/rizzoli-2010",
  "Hannah Montana Forever": "https://cinejoy.pk/series/hannah-montana-forever-2010",
  "Fairly OddParents": "https://cinejoy.pk/series/fairly-oddparents-2001",
  "Jimmy Neutron": "https://cinejoy.pk/series/jimmy-neutron-2002",
  "Chip 'n Dale: Rescue Rangers": "https://cinejoy.pk/series/chip-n-dale-rescue-rangers-1989",
  "Gummi Bears": "https://cinejoy.pk/series/gummi-bears-1985",
  "Transformers (Series)": "https://cinejoy.pk/series/transformers-series-1984",
  "G.I. Joe": "https://cinejoy.pk/series/gi-joe-1985",
  "Thundercats": "https://cinejoy.pk/series/thundercats-1985",
  "Captain Planet": "https://cinejoy.pk/series/captain-planet-1990",
  "Pokemon: Indigo League": "https://cinejoy.pk/series/pokemon-indigo-league-1997",
  "Love Live!": "https://cinejoy.pk/series/love-live-2013",
  "Love & Death": "https://cinejoy.pk/series/love-and-death-2023",
  "Two Broke Girls": "https://cinejoy.pk/series/two-broke-girls-2011",
  "Ghosts US": "https://cinejoy.pk/series/ghosts-us-2021",
  "Numb3rs": "https://cinejoy.pk/series/numb3rs-2004",
  "The Alienist": "https://cinejoy.pk/series/the-alienist-2018",
  "Money Heist: The Phenomenon": "https://cinejoy.pk/series/money-heist-the-phenomenon-2020",
  "Titan: The OceanGate Disaster": "https://cinejoy.pk/series/titan-the-oceangate-disaster-2025"
};

    const CINEJOY_TOP750_URLS = CINEJOY_ALL_MOVIES_URLS;
    const CINEJOY_TOP750_SHOWS_URLS = CINEJOY_ALL_SHOWS_URLS;

    window.CINEJOY_ALL_MOVIES_URLS = CINEJOY_ALL_MOVIES_URLS;
    window.CINEJOY_ALL_SHOWS_URLS = CINEJOY_ALL_SHOWS_URLS;
    window.CINEJOY_TOP750_URLS = CINEJOY_ALL_MOVIES_URLS;
    window.CINEJOY_TOP750_SHOWS_URLS = CINEJOY_ALL_SHOWS_URLS;
    window.CINEJOY_TOP500_URLS = CINEJOY_ALL_MOVIES_URLS;
    window.CINEJOY_TOP500_SHOWS_URLS = CINEJOY_ALL_SHOWS_URLS;

    const allMoviesSet = new Set(Object.keys(CINEJOY_ALL_MOVIES_URLS));
    const allShowsSet = new Set(Object.keys(CINEJOY_ALL_SHOWS_URLS));
    window.allMoviesSet = allMoviesSet;
    window.allShowsSet = allShowsSet;
    window.top750ShowsSet = allShowsSet;
    window.top500ShowsSet = allShowsSet;

    window.getCinejoyShowUrl = function(title) {
      let url = CINEJOY_ALL_SHOWS_URLS[title] || null;
      if (!url && title) {
        const item = window.globalDatabase ? window.globalDatabase[title] : null;
        const year = item ? item.year : '';
        const clean = title.toLowerCase().replace(/[:.,'"!?()[\]{}]/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        url = `https://cinejoy.pk/series/${year ? clean + '-' + year : clean}`;
      }
      return url ? url.replace('/tv/', '/series/') : null;
    };

    window.getCinejoyUrl = function(title, type) {
      let url = null;
      if (type === 'show') url = CINEJOY_ALL_SHOWS_URLS[title] || null;
      else if (type === 'movie') url = CINEJOY_ALL_MOVIES_URLS[title] || null;
      else url = CINEJOY_ALL_MOVIES_URLS[title] || CINEJOY_ALL_SHOWS_URLS[title] || null;

      if (!url && title) {
        const item = window.globalDatabase ? window.globalDatabase[title] : null;
        const isShow = (type === 'show' || (item && item.type === 'show'));
        const year = item ? item.year : '';
        const clean = title.toLowerCase().replace(/[:.,'"!?()[\]{}]/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        const slug = year ? `${clean}-${year}` : clean;
        url = isShow ? `https://cinejoy.pk/series/${slug}` : `https://cinejoy.pk/movie/${slug}`;
      }

      if (url && (type === 'show' || CINEJOY_ALL_SHOWS_URLS[title] || (window.globalDatabase && window.globalDatabase[title] && window.globalDatabase[title].type === 'show'))) {
        url = url.replace('/tv/', '/series/');
      }
      return url;
    };

    window.isTopCinejoyItem = function(title, type) {
      return Boolean(window.getCinejoyUrl(title, type));
    };
    window.getCinejoyTop750ShowsTitles = function() {
      return Object.keys(CINEJOY_ALL_SHOWS_URLS);
    };
    window.getCinejoyTop500ShowsTitles = function() {
      return Object.keys(CINEJOY_ALL_SHOWS_URLS);
    };

    // Offline streaming link interception handler
    window.handleStreamingLinkClick = function(event, url, title, type) {
      if (!navigator.onLine) {
        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }
        const label = type === 'trailer' ? 'YouTube Trailer' : 'Cinejoy Watch Now';
        const displayTitle = title ? `"${title}"` : 'this title';
        if (typeof window.showToast === 'function') {
          window.showToast(`Offline Mode: ${label} for ${displayTitle} requires an internet connection.`, 'fa-triangle-exclamation', 'text-amber-400', 5500);
        } else if (typeof alert === 'function') {
          alert(`You are currently offline: ${label} requires an active internet connection.`);
        }
        return false;
      }
      return true;
    };

    // Generates high-contrast bespoke procedural SVG posters with typography
    function generateStylizedPosterDataURI(item) {
      const theme = genreThemes[item.genre] || genreThemes["Drama"];
      const safeTitle = item.cleanName.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      const words = safeTitle.split(' ');
      const lines = [];
      let currentLine = '';
      words.forEach(w => {
        if ((currentLine + ' ' + w).trim().length <= 14) {
          currentLine = (currentLine + ' ' + w).trim();
        } else {
          if (currentLine) lines.push(currentLine);
          currentLine = w;
        }
      });
      if (currentLine) lines.push(currentLine);
      const displayLines = lines.slice(0, 4);

      const h = hashString(item.title);
      const cx = 70 + (h % 260);
      const cy = 100 + ((h >> 4) % 220);

      const textSvg = displayLines.map((line, idx) => {
        const yPos = 390 + (idx * 34);
        return `<text x="32" y="${yPos}" fill="#ffffff" font-family="Inter, sans-serif" font-weight="800" font-size="26" letter-spacing="-0.5">${line}</text>`;
      }).join('');

      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" width="400" height="600">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${theme.c1}"/>
            <stop offset="65%" stop-color="${theme.c2}"/>
            <stop offset="100%" stop-color="#080A0F"/>
          </linearGradient>
          <radialGradient id="orb" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="${theme.accent}" stop-opacity="0.45"/>
            <stop offset="100%" stop-color="${theme.accent}" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="400" height="600" fill="url(#bg)"/>
        <circle cx="${cx}" cy="${cy}" r="220" fill="url(#orb)"/>
        <circle cx="${400 - cx}" cy="${520 - cy}" r="160" fill="url(#orb)"/>
        <g stroke="${theme.accent}" stroke-opacity="0.15" stroke-width="1">
          <line x1="28" y1="28" x2="372" y2="28"/>
          <line x1="28" y1="572" x2="372" y2="572"/>
          <rect x="20" y="20" width="360" height="560" rx="16" fill="none"/>
        </g>
        <rect x="32" y="40" width="86" height="30" rx="8" fill="#000000" fill-opacity="0.65"/>
        <text x="75" y="60" text-anchor="middle" fill="#F5C518" font-family="Inter, sans-serif" font-weight="800" font-size="13">★ ${item.rating}</text>
        <text x="364" y="60" text-anchor="end" fill="${theme.accent}" font-family="Inter, sans-serif" font-weight="700" font-size="13" opacity="0.9">#${item.rank}</text>
        <text x="32" y="348" fill="${theme.accent}" font-family="Inter, sans-serif" font-weight="700" font-size="13" letter-spacing="2">${item.genre.toUpperCase()} · ${item.year}</text>
        ${textSvg}
        <g transform="translate(32, 520)">
          <text x="16" y="7" text-anchor="middle" fill="#F5C518" font-family="Inter, sans-serif" font-weight="800" font-size="6.5" letter-spacing="1.8">MEDIA</text>
          <path d="M4 28 L16 10 L28 28" stroke="#ffffff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11 17.5 L16 10 L21 17.5" stroke="#F5C518" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="4" y1="28" x2="28" y2="28" stroke="#F5C518" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M40 24 L48 12 L56 24 M44 18 H64" stroke="#38BDF8" stroke-width="2.2" stroke-linecap="round"/>
        </g>
      </svg>`;

      return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    }

    // ==========================================
    // 3. ZERO-KEY ARTWORK PIPELINE (iTunes + TVMaze + Wikipedia)
    // ==========================================
    let activeFetches = 0;
    const fetchQueue = [];
    const inFlightFetches = {};
    let saveTimeout = null;


    const KNOWN_POSTER_OVERRIDES = {
      'show:Ramayan (1987)': 'https://upload.wikimedia.org/wikipedia/en/a/ac/Ramayan_poster.jpg',
      'show:Ramayan': 'https://upload.wikimedia.org/wikipedia/en/a/ac/Ramayan_poster.jpg',
      'show:Mahabharat (1988)': 'https://upload.wikimedia.org/wikipedia/en/e/ef/Mahabharat_%281988%29_title_logo_screenshot.jpg',
      'show:Mahabharat': 'https://upload.wikimedia.org/wikipedia/en/e/ef/Mahabharat_%281988%29_title_logo_screenshot.jpg',
      'show:Malgudi Days': 'https://upload.wikimedia.org/wikipedia/en/9/91/Malgudi_Days_%28TV_series%29.jpg',
      'show:Byomkesh Bakshi': 'https://upload.wikimedia.org/wikipedia/en/e/e0/Byomkesh_Bakshi_%28TV_series%29_Title_Card.jpg',
      'show:CID': 'https://upload.wikimedia.org/wikipedia/en/8/8c/CID_Sony_TV_Show_Poster.jpg',
      'show:Taarak Mehta Ka Ooltah Chashmah': 'https://upload.wikimedia.org/wikipedia/en/2/23/Taarak_Mehta_Ka_Ooltah_Chashmah_logo.jpg',
      'show:Koffee with Karan': 'https://upload.wikimedia.org/wikipedia/en/5/52/Koffee_With_Karan_logo.jpg',
      'show:The Kapil Sharma Show': 'https://upload.wikimedia.org/wikipedia/en/2/24/The_Kapil_Sharma_Show_poster.jpg',
      'show:Kaun Banega Crorepati': 'https://upload.wikimedia.org/wikipedia/en/e/eb/Kaun_Banega_Crorepati_Title.jpg'
    };

    // Quality enhancer for poster image sources (TVMaze, iTunes, Wikipedia, TMDB)
    function upgradePosterQuality(url) {
      if (!url || typeof url !== 'string' || url.startsWith('data:image/svg')) return url;
      let u = url;
      if (u.includes('static.tvmaze.com') || u.includes('tvmaze.com')) {
        u = u.replace('/medium_portrait/', '/original/').replace('/medium/', '/original/');
      }
      if (u.includes('mzstatic.com') || u.includes('apple.com')) {
        u = u.replace(/\/\d+x\d+bb\./, '/1000x1500bb.');
      }
      if (u.includes('upload.wikimedia.org')) {
        u = u.replace(/\/\d+px-/, '/1000px-');
      }
      if (u.includes('image.tmdb.org')) {
        u = u.replace(/\/w\d+\//, '/w780/');
      }
      return u;
    }
    window.upgradePosterQuality = upgradePosterQuality;

    async function fetchPoster(item, forceSynopsis = false, isPriority = false) {
      if (!item) return null;
      const cacheKey = item.type + ':' + item.title;
      if (KNOWN_POSTER_OVERRIDES[cacheKey]) {
        posterCache[cacheKey] = KNOWN_POSTER_OVERRIDES[cacheKey];
        return KNOWN_POSTER_OVERRIDES[cacheKey];
      }
      // All titles are eligible for poster resolution
      if (posterCache[cacheKey] && !posterCache[cacheKey].startsWith('data:image/svg') && (!forceSynopsis || summaryCache[cacheKey])) {
        return posterCache[cacheKey];
      }
      if (inFlightFetches[cacheKey]) return inFlightFetches[cacheKey];

      inFlightFetches[cacheKey] = (async () => {
        // Concurrency governor (max 6 active requests, bypassed for priority modal clicks)
        if (!isPriority && activeFetches >= 6) {
          await new Promise(resolve => fetchQueue.push(resolve));
        }
        activeFetches++;

        try {
          const rawQuery = item.rawName || (item.cleanName || item.title).replace(/\s*\(Series\)$/i, '');
          const queryName = rawQuery.replace(/\s*\(\d{4}\)$/, '').trim();

          // Pipeline 1: Movies -> Free iTunes Movie Search API (Ultra-crisp official posters 600x900)
          if (item.type === 'movie') {
            try {
              const res = await fetch(`https://itunes.apple.com/search?media=movie&entity=movie&limit=6&term=${encodeURIComponent(queryName)}`);
              if (res.ok) {
                const data = await res.json();
                const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                const qNorm = norm(queryName);
                const match = (data.results || []).find(r => {
                  const rNorm = norm(r.trackName);
                  const sameName = rNorm === qNorm || rNorm.startsWith(qNorm) || qNorm.startsWith(rNorm);
                  const relYear = r.releaseDate ? parseInt(r.releaseDate.slice(0, 4)) : 0;
                  return sameName && (!relYear || Math.abs(relYear - item.year) <= 2);
                });

                if (match && match.artworkUrl100) {
                  const highRes = match.artworkUrl100.replace('100x100bb', '600x900bb');
                  posterCache[cacheKey] = highRes;
                  if (match.longDescription && !summaryCache[cacheKey]) {
                    summaryCache[cacheKey] = match.longDescription;
                  }
                  scheduleSavePosterCache();
                  return highRes;
                }
              }
            } catch (e) {}
          }

        // Pipeline 2: TV Shows -> Free TVMaze Single Search API + iTunes Fallback
        if (item.type === 'show') {
          try {
            const res = await fetch(`https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(queryName)}`);
            if (res.ok) {
              const data = await res.json();
              if (data.summary && !summaryCache[cacheKey]) {
                summaryCache[cacheKey] = data.summary.replace(/<[^>]+>/g, '');
              }
              const img = data.image && (data.image.original || data.image.medium);
              if (img) {
                posterCache[cacheKey] = img;
                scheduleSavePosterCache();
                return img;
              }
            }
          } catch (e) {}

          // Sub-pipeline 2b: iTunes TV Shows
          try {
            const res = await fetch(`https://itunes.apple.com/search?media=tvShow&entity=tvSeason&limit=4&term=${encodeURIComponent(queryName)}`);
            if (res.ok) {
              const data = await res.json();
              const match = (data.results || [])[0];
              if (match && match.artworkUrl100) {
                const highRes = match.artworkUrl100.replace('100x100bb', '600x900bb');
                posterCache[cacheKey] = highRes;
                scheduleSavePosterCache();
                return highRes;
              }
            }
          } catch (e) {}
        }

        // Pipeline 3: Universal Fallback -> Wikipedia Summary API (with custom header)
        try {
          const wikiCandidates = [
            `${queryName}_(${item.year}_TV_series)`,
            `${queryName}_(${item.year}_film)`,
            `${queryName}_(miniseries)`,
            `${queryName}_(TV_miniseries)`,
            `${queryName}_(TV_series)`,
            `${queryName}_(film)`,
            `${queryName}_(Indian_TV_series)`,
            `${rawQuery.replace(/ /g, '_')}`,
            queryName
          ];
          for (const cand of wikiCandidates) {
            const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cand.replace(/ /g, '_'))}`;
            const res = await fetch(url, { headers: { 'Api-User-Agent': 'PeakMedia/2.8 (contact@peakmedia.app)' } });
            if (res.ok) {
              const data = await res.json();
              if (data.type === 'standard') {
                if (data.extract && !summaryCache[cacheKey]) {
                  summaryCache[cacheKey] = data.extract;
                }
                if (data.originalimage && data.originalimage.source) {
                  posterCache[cacheKey] = data.originalimage.source;
                  scheduleSavePosterCache();
                  return data.originalimage.source;
                } else if (data.thumbnail && data.thumbnail.source) {
                  const highRes = data.thumbnail.source.replace(/\/\d+px-/, '/640px-');
                  posterCache[cacheKey] = highRes;
                  scheduleSavePosterCache();
                  return highRes;
                }
              }
            }
          }
        } catch (e) {}

        return null;
      } finally {
        activeFetches--;
        delete inFlightFetches[cacheKey];
        const next = fetchQueue.shift();
        if (next) next();
      }
      })();
      return inFlightFetches[cacheKey];
    }

    function scheduleSavePosterCache() {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        try {
          const filtered = Object.fromEntries(Object.entries(posterCache).filter(([k, v]) => Boolean(v)));
          localStorage.setItem('cs_posters_v2', JSON.stringify(filtered));
        } catch (e) {}
      }, 1000);
    }

    const thumbObserver = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (!entry.isIntersecting) return;
        const imgEl = entry.target;
        thumbObserver.unobserve(imgEl);
        const title = imgEl.dataset.title;
        const item = globalDatabase[title];
        if (!item) return;

        const realUrl = await fetchPoster(item, true);
        if (realUrl && imgEl.getAttribute('src') !== realUrl) {
          imgEl.style.opacity = '0';
          imgEl.onload = () => { imgEl.style.opacity = '1'; };
          imgEl.src = realUrl;
        }
      });
    }, { rootMargin: '300px' });

    function attachThumbObservers(container) {
      if (!container) return;
      container.querySelectorAll('img.lazy-poster[data-title]').forEach(img => thumbObserver.observe(img));
    }

    // ==========================================
    // 4. USER STATE (LOCAL STORAGE SYNC)
    // ==========================================
    const getLocal = (key, def) => {
      try {
        const val = JSON.parse(localStorage.getItem(key));
        return val == null ? def : val;
      } catch (e) {
        return def;
      }
    };
    window.getLocal = getLocal;

    const setLocal = (key, val) => {
      try {
        localStorage.setItem(key, JSON.stringify(val));
      } catch (e) {}
    };
    window.setLocal = setLocal;

    let wishlistTitles = getLocal('cs_wishlist', ["Inception", "The Dark Knight", "Breaking Bad", "Spirited Away", "Dune: Part Two"]).filter(t => globalDatabase[t]);
    let watchedTitles = getLocal('cs_watched', ["The Shawshank Redemption", "Pulp Fiction", "Interstellar", "Stranger Things"]).filter(t => globalDatabase[t]);
    let favTitles = getLocal('cs_favs', ["Inception", "The Dark Knight"]).filter(t => globalDatabase[t]);
    let myRatings = getLocal('cs_ratings', { "Inception": 5, "The Dark Knight": 5 });
    let activeHubList = 'wishlist';

    function toggleFav(title, event) {
      if (event) event.stopPropagation();
      const exists = favTitles.includes(title);
      if (exists) {
        favTitles = favTitles.filter(t => t !== title);
        showToast(`Removed "${title}" from Favourites`, "fa-star", "text-gray-400");
      } else {
        favTitles.push(title);
        showToast(`Added "${title}" to your Favourites!`, "fa-star", "text-brand-gold");
      }
      try { localStorage.setItem('cs_favs', JSON.stringify(favTitles)); } catch (e) {}
      updateAllCountersAndViews();
    }

    function clearShelf(shelfKey) {
      if (shelfKey === 'watched') {
        watchedTitles = [];
        showToast("Cleared your Watched shelf", "fa-trash", "text-gray-400");
      } else if (shelfKey === 'wish') {
        wishlistTitles = [];
        showToast("Cleared your Watchlist shelf", "fa-trash", "text-gray-400");
      } else if (shelfKey === 'fav') {
        favTitles = [];
        try { localStorage.setItem('cs_favs', JSON.stringify(favTitles)); } catch (e) {}
        showToast("Cleared your Favourites shelf", "fa-trash", "text-gray-400");
      }
      updateAllCountersAndViews();
    }

    function showToast(message, icon = "fa-circle-check", color = "text-brand-gold") {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      toast.className = "glass-card pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/15 shadow-2xl fade-in text-xs sm:text-sm font-medium text-white";
      toast.innerHTML = `<i class="fa-solid ${icon} ${color} text-base"></i><span class="flex-1">${message}</span>`;
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(8px)';
        toast.style.transition = 'all 0.25s ease';
        setTimeout(() => toast.remove(), 250);
      }, 2600);
    }

    function toggleWishlist(title, event) {
      if (event) event.stopPropagation();
      const exists = wishlistTitles.includes(title);
      if (exists) {
        wishlistTitles = wishlistTitles.filter(t => t !== title);
        showToast(`Removed "${title}" from Watchlist`, "fa-heart-crack", "text-gray-400");
      } else {
        wishlistTitles.push(title);
        showToast(`Added "${title}" to your Watchlist!`, "fa-heart", "text-rose-400");
      }
      updateAllCountersAndViews();
    }

    function toggleWatched(title, event) {
      if (event) event.stopPropagation();
      const exists = watchedTitles.includes(title);
      if (exists) {
        watchedTitles = watchedTitles.filter(t => t !== title);
        let gt = getLocal('cs_golden_tickets', []);
        if (gt.includes(title)) {
          setLocal('cs_golden_tickets', gt.filter(t => t !== title));
          if (window.renderCinePassLedger) window.renderCinePassLedger();
        }
        showToast(`Unmarked "${title}" as watched`, "fa-rotate-left", "text-gray-400");
      } else {
        watchedTitles.push(title);
        showToast(`Marked "${title}" as Watched!`, "fa-circle-check", "text-emerald-400");
      }
      updateAllCountersAndViews();
    }

    window.toggleMintGoldenTicket = function(title) {
      try {
        let tickets = getLocal('cs_golden_tickets', []);
        const item = globalDatabase[title];
        const name = item ? (item.cleanName || item.title) : title;
        if (tickets.includes(title)) {
          tickets = tickets.filter(t => t !== title);
          setLocal('cs_golden_tickets', tickets);
          showToast(`Removed "${name}" from Top 3 Golden Tickets`, 'fa-rotate-left', 'text-gray-300');
        } else {
          if (tickets.length >= 3) {
            showToast('Top 3 limit reached! Unmint one ticket before minting a new one.', 'fa-triangle-exclamation', 'text-amber-400');
            return;
          }
          tickets.push(title);
          setLocal('cs_golden_tickets', tickets);
          showToast(`✨ Minted "${name}" into your Top 3 Golden Ticket Hall of Fame!`, 'fa-ticket-simple', 'text-amber-300');
        }
        if (window.renderCinePassLedger) window.renderCinePassLedger();
        const mBtn = document.getElementById('modalMintBtn');
        if (mBtn) {
          const isNowMinted = tickets.includes(title);
          mBtn.className = `px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${isNowMinted ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 shadow-md' : 'bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 border border-amber-400/40'}`;
          mBtn.innerHTML = `<i class="fa-solid fa-ticket-simple"></i><span>${isNowMinted ? 'In Top 3 Tickets (Remove)' : 'Mint Golden Ticket'}</span>`;
        }
      } catch (err) {
        console.error('Error in toggleMintGoldenTicket:', err);
      }
    };

    function rateTitle(title, stars) {
      if (myRatings[title] === stars) {
        delete myRatings[title];
        showToast(`Cleared rating for "${title}"`, "fa-star", "text-gray-400");
      } else {
        myRatings[title] = stars;
        showToast(`Rated "${title}" ${stars} ★`, "fa-star", "text-brand-gold");
      }
      updateAllCountersAndViews();
      openDetailModal(title);
    }

    function updateAllCountersAndViews() {
      try {
        localStorage.setItem('cs_wishlist', JSON.stringify(wishlistTitles));
        localStorage.setItem('cs_watched', JSON.stringify(watchedTitles));
        localStorage.setItem('cs_favs', JSON.stringify(favTitles));
        localStorage.setItem('cs_ratings', JSON.stringify(myRatings));
      } catch (e) {}

      document.getElementById('statTotalTitles').textContent = allTitles.length.toLocaleString();
      document.getElementById('statWatchlistCount').textContent = wishlistTitles.length;
      document.getElementById('statWatchedCount').textContent = watchedTitles.length;
      document.getElementById('hubWishlistCount').textContent = wishlistTitles.length;
      document.getElementById('hubWatchedCount').textContent = watchedTitles.length;

      const navBadge = document.getElementById('navWishlistBadge');
      if (wishlistTitles.length > 0) {
        navBadge.textContent = wishlistTitles.length;
        navBadge.classList.remove('hidden');
      } else {
        navBadge.classList.add('hidden');
      }

      renderTasteDNA();

      // Refresh button styles across cards without re-rendering everything
      document.querySelectorAll('[data-wish-btn]').forEach(btn => {
        const t = btn.getAttribute('data-wish-btn');
        const active = wishlistTitles.includes(t);
        btn.className = `w-8 h-8 rounded-full flex items-center justify-center transition-all ${active ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40 scale-105' : 'bg-black/65 text-gray-300 hover:bg-black hover:text-white'}`;
      });
      document.querySelectorAll('[data-watched-btn]').forEach(btn => {
        const t = btn.getAttribute('data-watched-btn');
        const active = watchedTitles.includes(t);
        btn.className = `w-8 h-8 rounded-full flex items-center justify-center transition-all ${active ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/40 scale-105' : 'bg-black/65 text-gray-300 hover:bg-black hover:text-white'}`;
      });
      document.querySelectorAll('[data-fav-btn]').forEach(btn => {
        const t = btn.getAttribute('data-fav-btn');
        const active = favTitles.includes(t);
        btn.className = `w-8 h-8 rounded-full flex items-center justify-center transition-all ${active ? 'bg-brand-gold text-black shadow-lg shadow-brand-gold/40 scale-105' : 'bg-black/65 text-gray-300 hover:bg-black hover:text-white'}`;
      });

      if (window.renderCinePassLedger) window.renderCinePassLedger();
    }

    // ==========================================
    // 5. CARD COMPONENT GENERATOR
    // ==========================================
    function createCardHTML(item, isCompactScroll = false) {
      if (!item) return '';
      const isW = wishlistTitles.includes(item.title);
      const isWatched = watchedTitles.includes(item.title);
      const isFav = favTitles.includes(item.title);
      const escTitle = item.title.replace(/'/g, "\\'").replace(/"/g, "&quot;");
      const attrTitle = item.title.replace(/"/g, "&quot;");
      const fallbackSvg = generateStylizedPosterDataURI(item);
      const cachedPoster = posterCache[item.type + ':' + item.title] || fallbackSvg;
      const platStyle = platformColors[item.platformName] || "bg-white/10 text-gray-300 border-white/20";
      const widthClass = isCompactScroll ? "w-[114px] sm:w-44 shrink-0 snap-start" : "w-full";

      // Decluttered Card: Resting state shows ONLY Poster, Title, Year, and Rating.
      // Quick actions & platform metadata reveal smoothly on hover/focus.
      return `
      <div onclick="openDetailModal('${escTitle}')" class="group relative rounded-2xl overflow-hidden bg-brand-card border border-white/10 card-hover cursor-pointer flex flex-col ${widthClass}">
        <div class="relative poster-aspect w-full overflow-hidden bg-[#0c0f16]">
          <img
            src="${cachedPoster}"
            data-title="${attrTitle}"
            ${item.thumb ? `onerror="this.onerror=null; this.src='${fallbackSvg}';"` : ''}
            alt="${attrTitle}"
            class="lazy-poster w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-transparent to-black/25 opacity-85"></div>

          <!-- Hover-Only Action Controls & Platform Badge -->
          <div class="absolute top-2 right-2 flex flex-col gap-1.5 z-10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
            <button
              type="button"
              data-wish-btn="${attrTitle}"
              onclick="toggleWishlist('${escTitle}', event)"
              title="Toggle Watchlist"
              class="w-9 h-9 rounded-full flex items-center justify-center transition-all ${isW ? 'bg-rose-500 text-white shadow-lg' : 'bg-black/75 text-gray-200 hover:bg-black hover:text-white'}">
              <i class="fa-solid fa-heart text-xs"></i>
            </button>
            <button
              type="button"
              data-watched-btn="${attrTitle}"
              onclick="toggleWatched('${escTitle}', event)"
              title="Mark as Watched"
              class="w-9 h-9 rounded-full flex items-center justify-center transition-all ${isWatched ? 'bg-emerald-500 text-black shadow-lg' : 'bg-black/75 text-gray-200 hover:bg-black hover:text-white'}">
              <i class="fa-solid fa-check text-xs"></i>
            </button>
            <button
              type="button"
              data-fav-btn="${attrTitle}"
              onclick="toggleFav('${escTitle}', event)"
              title="Toggle Favourite"
              class="w-9 h-9 rounded-full flex items-center justify-center transition-all ${isFav ? 'bg-brand-gold text-black shadow-lg' : 'bg-black/75 text-gray-200 hover:bg-black hover:text-white'}">
              <i class="fa-solid fa-star text-xs"></i>
            </button>
          </div>

          <div class="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span class="text-[9px] font-bold px-2 py-0.5 rounded-md border backdrop-blur-md ${platStyle}">${item.platformName}</span>
            <span class="text-[9px] font-bold px-2 py-0.5 rounded-md bg-black/80 text-gray-300">${item.genre}</span>
          </div>
        </div>

        <!-- Clean Resting Metadata: Title + Year & Rating Only -->
        <div class="p-3 flex-1 flex flex-col justify-between gap-1 border-t border-white/5">
          <h3 class="font-bold text-xs sm:text-sm text-white group-hover:text-brand-gold transition-colors line-clamp-1" title="${attrTitle}">${item.cleanName || item.title}</h3>
          <div class="flex items-center justify-between text-xs text-gray-400">
            <span>${item.year}</span>
            <span class="text-brand-gold font-bold flex items-center gap-1"><i class="fa-solid fa-star text-[10px]"></i> ${item.rating}</span>
          </div>
        </div>
      </div>`;
    }

    // ==========================================
    // 6. SPOTLIGHT HERO & DISCOVER ROWS
    // ==========================================
    const spotlightTitles = [
      {
        title: "Dune: Part Two",
        tagline: "Long live the fighters.",
        blurb: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family, confronting a choice between love and the fate of the universe."
      },
      {
        title: "Oppenheimer",
        tagline: "The world forever changes.",
        blurb: "The gripping story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb, followed by the political and moral aftermath."
      },
      {
        title: "Inception",
        tagline: "Your mind is the scene of the crime.",
        blurb: "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during dream states."
      },
      {
        title: "Arcane",
        tagline: "Two sisters. One city divided.",
        blurb: "Set in utopian Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic champions and the arcane power that tears them apart."
      },
      {
        title: "The Dark Knight",
        tagline: "Why so serious?",
        blurb: "When the menace known as the Joker wreaks havoc and chaos on Gotham, Batman must accept one of the greatest psychological and physical tests of his ability."
      },
      {
        title: "Breaking Bad",
        tagline: "Change the equation.",
        blurb: "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family's financial future."
      }
    ];

    let currentSpotlightIdx = 0;

    function fyShuffle(arr) {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    function getGreetingForTime() {
      const h = new Date().getHours();
      if (h < 5) return "Late night screening";
      if (h < 12) return "Morning matinee";
      if (h < 17) return "Afternoon feature";
      if (h < 22) return "Evening screening";
      return "Late night screening";
    }

    window.flickTonightPick = function() {
      const inner = document.getElementById('heroInnerWrap');
      if (inner) {
        inner.classList.add('flick-out');
        setTimeout(() => {
          renderHeroSpotlight(currentSpotlightIdx + 1, true, true);
        }, 200);
      } else {
        renderHeroSpotlight(currentSpotlightIdx + 1, true, true);
      }
    };

    function renderHeroSpotlight(idx = 0, animate = true, isDropIn = false) {
      currentSpotlightIdx = ((idx % spotlightTitles.length) + spotlightTitles.length) % spotlightTitles.length;
      const spot = spotlightTitles[currentSpotlightIdx];
      const item = globalDatabase[spot.title] || movies[0];
      const theme = genreThemes[item.genre] || genreThemes["Drama"];
      const escTitle = item.title.replace(/'/g, "\'").replace(/"/g, "&quot;");
      const attrTitle = item.title.replace(/"/g, "&quot;");
      const isW = wishlistTitles.includes(item.title);
      const isSeen = watchedTitles.includes(item.title);
      const fallbackSvg = generateStylizedPosterDataURI(item);
      const posterUrl = posterCache[item.type + ':' + item.title] || fallbackSvg;

      let profName = '';
      try {
        const p = JSON.parse(localStorage.getItem('cs_profile_v1') || '{}');
        if (p && p.username) profName = p.username;
      } catch (e) {}

      const banner = document.getElementById('heroBanner');
      if (!banner) return;
      banner.style.background = `radial-gradient(ellipse at 80% 20%, ${theme.c1}88 0%, #07090e 75%)`;

      banner.innerHTML = `
        <!-- Ambient Color Bleed & Projector Light Glow -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <img src="${posterUrl}" data-title="${attrTitle}" onerror="this.onerror=null;this.src='${fallbackSvg}';" alt="" class="lazy-poster absolute right-0 top-0 w-full sm:w-2/3 h-full object-cover opacity-35 sm:opacity-20 blur-3xl scale-125 transition-all duration-700 pointer-events-none" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/80 to-transparent"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-[#07090e] via-[#07090e]/90 to-transparent"></div>
        </div>

        <div id="heroInnerWrap" class="relative z-10 w-full flex flex-col justify-between h-full ${isDropIn ? 'drop-in' : (animate ? 'fade-in' : '')}">
          <!-- Top Natural Kicker -->
          <div class="flex items-center justify-between gap-3 text-xs border-b border-white/[0.08] pb-3 mb-4 sm:mb-6">
            <div class="flex items-center gap-2">
              <span class="inline-block w-2.5 h-2.5 rounded-full animate-pulse" style="background:${theme.accent}"></span>
              <span class="font-bold text-white tracking-wide uppercase text-[11px] sm:text-xs">Tonight's Pick</span>
              <span class="text-white/25">·</span>
              <span class="text-gray-400 text-[11px] sm:text-xs">${currentSpotlightIdx + 1} of ${spotlightTitles.length}</span>
            </div>
            <div class="flex items-center gap-3 text-xs">
              <button type="button" onclick="openOnboardingWizard(true)" class="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 text-[11px]">
                <i class="fa-solid fa-sliders text-[10px] text-brand-gold"></i>
                <span class="hidden sm:inline">Taste Setup</span>
              </button>
            </div>
          </div>

          <!-- Main Hero Display -->
          <div class="flex flex-col sm:flex-row items-start sm:items-end gap-5 sm:gap-8 w-full">
            <div class="relative group cursor-pointer shrink-0" onclick="openDetailModal('${escTitle}')">
              <img src="${posterUrl}" data-title="${attrTitle}" onerror="this.onerror=null;this.src='${fallbackSvg}';" alt="${attrTitle}" class="lazy-poster hidden sm:block w-36 md:w-48 rounded-2xl border border-white/20 shadow-2xl object-cover poster-aspect transition-transform duration-300 group-hover:scale-105 group-hover:shadow-brand-gold/20" />
              <div class="hidden sm:flex absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 items-center justify-center transition-opacity">
                <span class="w-12 h-12 rounded-full bg-brand-gold text-black flex items-center justify-center shadow-lg"><i class="fa-solid fa-play text-sm ml-0.5"></i></span>
              </div>
            </div>

            <div class="space-y-3 sm:space-y-3.5 max-w-2xl w-full">
              <div class="flex flex-wrap items-center gap-2 text-xs">
                <span class="px-2.5 py-0.5 rounded-md bg-brand-gold text-black font-black uppercase text-[10px] tracking-wider">Feature</span>
                <span class="font-extrabold uppercase tracking-wider text-xs" style="color:${theme.accent}">${item.genre}</span>
                <span class="text-white/30">•</span>
                <span class="text-gray-300 font-semibold">${item.year}</span>
                <span class="text-white/30">•</span>
                <span class="text-brand-gold font-extrabold flex items-center gap-1"><i class="fa-solid fa-star text-[10px]"></i> ${item.rating}</span>
                <span class="text-white/30">•</span>
                <span class="px-2 py-0.5 rounded bg-white/10 text-gray-200 text-[10px] font-semibold">${item.platformName}</span>
              </div>

              <h1 class="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight">${item.cleanName || item.title}</h1>
              <p class="text-brand-gold/90 font-medium text-xs sm:text-sm italic tracking-wide">"${spot.tagline}"</p>

              <!-- Decisive Dual Action Buttons: Watch & Another (Card-Flick) -->
              <div class="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <button type="button" onclick="openDetailModal('${escTitle}')" class="px-6 py-2.5 sm:py-3 rounded-xl bg-brand-gold hover:bg-yellow-400 text-black font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-brand-gold/30 transition-all active:scale-95">
                  <i class="fa-solid fa-play text-xs"></i> <span>Watch Now</span>
                </button>
                <button type="button" onclick="flickTonightPick()" class="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm flex items-center gap-2 border border-white/20 backdrop-blur-md transition-all active:scale-95 group" title="Flick card and see next recommendation">
                  <i class="fa-solid fa-shuffle text-xs text-brand-gold group-hover:rotate-180 transition-transform duration-300"></i> <span>Another</span>
                </button>
                <button type="button" onclick="toggleWishlist('${escTitle}', event); renderHeroSpotlight(${currentSpotlightIdx}, false);" class="w-10 h-10 sm:h-11 sm:w-11 rounded-xl ${isW ? 'bg-rose-500 text-white' : 'bg-white/5 hover:bg-white/15 text-gray-300'} flex items-center justify-center border border-white/10 transition-all" title="Watchlist">
                  <i class="fa-solid ${isW ? 'fa-check' : 'fa-bookmark'} text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      attachThumbObservers(banner);
    }

    // Mood Curations (all 13 genres represented)
    const moods = {
      '😂 Pure Comedy': ['Comedy'],
      '😱 Thrills & Heists': ['Thriller', 'Crime'],
      '🧠 Mind-Bending': ['Sci-Fi'],
      '⚔️ Epic Adventures': ['Action', 'Fantasy', 'War'],
      '🤠 Outlaws & Frontier': ['Western'],
      '💔 Deep Emotions': ['Drama', 'Romance'],
      '👻 Late Night Chills': ['Horror'],
      '✨ Animation & Anime': ['Animation'],
      '🌍 Real Stories': ['Documentary']
    };

    let activeMood = '🧠 Mind-Bending';

    function renderMoodPills() {
      const c = document.getElementById('moodPills');
      if (!c) return;
      c.innerHTML = Object.keys(moods).map(k => `
        <button type="button" onclick="selectMood('${k}')" class="shrink-0 whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all border ${activeMood === k ? 'bg-brand-gold text-black border-brand-gold font-bold shadow-sm' : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'}">
          ${k}
        </button>
      `).join('');
    }

    window.globalLangFilter = getLocal('cs_lang_filter', 'all');
    function matchesGlobalLang(item) {
      if (!item) return false;
      if (!window.globalLangFilter || window.globalLangFilter === 'all') return true;
      return item.lang === window.globalLangFilter;
    }

    function selectMood(m) {
      activeMood = m;
      renderMoodPills();
      const targetGenres = moods[m] || ['Sci-Fi'];
      const pool = [...movies, ...tvShows].filter(i => matchesGlobalLang(i) && targetGenres.includes(i.genre) && i.thumb && parseFloat(i.rating) >= 7.4);
      const shuffled = fyShuffle(pool).slice(0, 12);
      const row = document.getElementById('moodRow');
      if (row) {
        row.innerHTML = shuffled.map(i => createCardHTML(i, true)).join('');
        attachThumbObservers(row);
      }
    }

    function renderDiscoverTab() {
      renderHeroSpotlight(0);
      renderMoodPills();
      selectMood(activeMood || '🧠 Mind-Bending');

      // Row 1: Pantheon (8.5+ when filtered by Hindi, 9.0+ otherwise) — capped at 12 cards
      const minPantheon = window.globalLangFilter === 'hi' ? 8.3 : 9.0;
      const pantheon = [...movies, ...tvShows].filter(i => matchesGlobalLang(i) && parseFloat(i.rating) >= minPantheon).sort((a, b) => b.rating - a.rating).slice(0, 12);
      const pEl = document.getElementById('discoverPantheonRow');
      if (pEl) {
        pEl.innerHTML = pantheon.map(i => createCardHTML(i, true)).join('');
        attachThumbObservers(pEl);
      }

      // Row 2: Blockbusters & Pop Culture — capped at 12 cards
      const blockbusterKeywords = ["Avengers", "Spider-Man", "Dune", "Batman", "Dark Knight", "Avatar", "Star Wars", "Fast & Furious", "Fast Five", "Furious 7", "Transformers", "Harry Potter", "Top Gun", "John Wick", "Deadpool", "Hunger Games", "Mission: Impossible", "Guardians of the Galaxy", "Inception", "Interstellar", "Oppenheimer", "RRR", "Baahubali", "K.G.F", "Jawan", "Pathaan", "Dangal", "3 Idiots", "Sholay", "Kalki", "Stree"];
      const blockbusters = movies.filter(m => matchesGlobalLang(m) && blockbusterKeywords.some(kw => m.title.includes(kw))).sort((a, b) => b.rating - a.rating).slice(0, 12);
      const bEl = document.getElementById('discoverBlockbustersRow');
      if (bEl) {
        bEl.innerHTML = blockbusters.map(i => createCardHTML(i, true)).join('');
        attachThumbObservers(bEl);
      }

      // Row 3: Mind-Benders & Thrillers — capped at 12 cards
      const mindBenders = movies.filter(i => matchesGlobalLang(i) && (i.genre === 'Sci-Fi' || i.genre === 'Thriller')).slice(0, 12);
      const mEl = document.getElementById('discoverMindRow');
      if (mEl) {
        mEl.innerHTML = mindBenders.map(i => createCardHTML(i, true)).join('');
        attachThumbObservers(mEl);
      }

      // Row 4: TV Shows — capped at 12 cards
      const tvEl = document.getElementById('discoverTvRow');
      if (tvEl) {
        tvEl.innerHTML = tvShows.filter(i => matchesGlobalLang(i)).slice(0, 12).map(i => createCardHTML(i, true)).join('');
        attachThumbObservers(tvEl);
      }

      // Row 6: Hindi & Indian Cinema Spotlight — capped at 12 cards
      const indEl = document.getElementById('discoverIndianRow');
      if (indEl) {
        const indPool = [...movies, ...tvShows].filter(i => i.lang === 'hi').sort((a, b) => b.rating - a.rating).slice(0, 12);
        indEl.innerHTML = indPool.map(i => createCardHTML(i, true)).join('');
        attachThumbObservers(indEl);
      }

      document.querySelectorAll('#discoverPantheonRow, #discoverBlockbustersRow, #discoverMindRow, #discoverTvRow, #discoverIndianRow, #moodRow, #wishlistContainer').forEach(addHorizontalArrows);
    }

    function addHorizontalArrows(scrollEl) {
      if (!scrollEl) return;
      const parent = scrollEl.parentElement;
      if (!parent || parent.querySelector('.row-arrow')) return;
      parent.classList.add('has-arrows');

      const leftBtn = document.createElement('button');
      leftBtn.className = 'row-arrow left-1';
      leftBtn.setAttribute('aria-label', 'Scroll left');
      leftBtn.innerHTML = '<i class="fa-solid fa-chevron-left text-sm"></i>';
      leftBtn.onclick = () => scrollEl.scrollBy({ left: -scrollEl.clientWidth * 0.75, behavior: 'smooth' });

      const rightBtn = document.createElement('button');
      rightBtn.className = 'row-arrow right-1';
      rightBtn.setAttribute('aria-label', 'Scroll right');
      rightBtn.innerHTML = '<i class="fa-solid fa-chevron-right text-sm"></i>';
      rightBtn.onclick = () => scrollEl.scrollBy({ left: scrollEl.clientWidth * 0.75, behavior: 'smooth' });

      const updateArrows = () => {
        const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
        leftBtn.style.visibility = scrollEl.scrollLeft <= 8 ? 'hidden' : 'visible';
        rightBtn.style.visibility = maxScroll > 8 && scrollEl.scrollLeft >= maxScroll - 8 ? 'hidden' : 'visible';
      };
      scrollEl.addEventListener('scroll', updateArrows, { passive: true });
      setTimeout(updateArrows, 120);

      parent.appendChild(leftBtn);
      parent.appendChild(rightBtn);
    }

    // ==========================================
    // 7. CATALOG BROWSING & PAGINATION
    // ==========================================
    let moviesPage = 1;
    let showsPage = 1;
    const PAGE_SIZE = 36;

    function populateGenreSelects() {
      const movieGenres = [...new Set(movies.map(m => m.genre))].sort();
      const showGenres = [...new Set(tvShows.map(s => s.genre))].sort();

      const mSel = document.getElementById('filterMoviesGenre');
      if (mSel) mSel.innerHTML = '<option value="All">All Genres</option>' + movieGenres.map(g => `<option value="${g}">${g}</option>`).join('');

      const sSel = document.getElementById('filterShowsGenre');
      if (sSel) sSel.innerHTML = '<option value="All">All Genres</option>' + showGenres.map(g => `<option value="${g}">${g}</option>`).join('');
    }

    
    let cinejoyTop100Active = false;
    window.getCinejoyTop100Titles = function() {
      return movies.slice()
        .sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0) || (parseInt(a.rank || 9999, 10) - parseInt(b.rank || 9999, 10)))
        .slice(0, 100)
        .map(m => m.title);
    };

    window.toggleCinejoyTop100 = function() {
      cinejoyTop100Active = !cinejoyTop100Active;
      const btn = document.getElementById('cinejoySyncToggleBtn');
      const badge = document.getElementById('cinejoySyncStateBadge');
      if (btn) {
        if (cinejoyTop100Active) {
          btn.className = 'px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black border border-amber-300 text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all';
          if (badge) {
            badge.textContent = '100 Synced ✓';
            badge.className = 'px-2 py-0.5 rounded-full bg-black/25 text-[10px] text-black font-black';
          }
          if (window.showToast) showToast('Synced 100 most popular movies with Cinejoy!', 'fa-bolt', 'text-brand-gold');
        } else {
          btn.className = 'px-4 py-2.5 rounded-xl glass-card border border-amber-400/40 hover:border-amber-400 text-xs sm:text-sm font-extrabold text-amber-300 flex items-center gap-2 shadow-lg shadow-amber-500/10 hover:scale-[1.02] transition-all';
          if (badge) {
            badge.textContent = 'Off';
            badge.className = 'px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-gray-300';
          }
          if (window.showToast) showToast('Cinejoy Sync Filter turned off', 'fa-rotate-left', 'text-gray-300');
        }
      }
      filterAndRenderMovies(true);
    };

    function filterAndRenderMovies(resetPage = true) {
      if (resetPage) moviesPage = 1;
      const qInp = document.getElementById('searchMovies');
      const q = (qInp ? qInp.value : '').toLowerCase().trim();
      const gEl = document.getElementById('filterMoviesGenre');
      const g = gEl ? gEl.value : 'All';
      const decEl = document.getElementById('filterMoviesDecade');
      const dec = decEl ? decEl.value : 'All';
      const platEl = document.getElementById('filterMoviesPlatform');
      const plat = platEl ? platEl.value : 'All';
      const sortEl = document.getElementById('sortMovies');
      const sort = sortEl ? sortEl.value : 'rating';

      let list = movies.filter(item => {
        if (!matchesGlobalLang(item)) return false;
        const matchQ = !q || item.title.toLowerCase().includes(q) || String(item.year).includes(q) || item.genre.toLowerCase().includes(q);
        const matchG = g === 'All' || item.genre === g;
        const matchPlat = plat === 'All' || item.platformName === plat;
        let matchDec = true;
        if (dec !== 'All') {
          if (dec === '1950') matchDec = item.year <= 1959;
          else matchDec = Math.floor(item.year / 10) * 10 === parseInt(dec);
        }
        return matchQ && matchG && matchDec && matchPlat;
      });

      if (cinejoyTop100Active) {
        list = list.filter(item => Boolean(window.getCinejoyUrl(item.title, 'movie'))).sort((a, b) => b.rating - a.rating).slice(0, 100);
      }

      if (sort === 'popular') list.sort((a, b) => a.rank - b.rank);
      else if (sort === 'top100_watch') list = list.filter(item => Boolean(window.getCinejoyUrl(item.title, 'movie'))).sort((a, b) => b.rating - a.rating);
      else if (sort === 'rating_desc') list.sort((a, b) => b.rating - a.rating);
      else if (sort === 'year_desc') list.sort((a, b) => b.year - a.year);
      else if (sort === 'year_asc') list.sort((a, b) => a.year - b.year);
      else if (sort === 'title') list.sort((a, b) => a.title.localeCompare(b.title));
      else list.sort((a, b) => b.rating - a.rating);

      if (window.tmSort) list = window.tmSort(list);
      const cntEl = document.getElementById('moviesCountBadge');
      if (cntEl) cntEl.textContent = list.length.toLocaleString();
      const container = document.getElementById('moviesResults');
      if (!container) return;

      if (!list.length) {
        container.className = "py-16 text-center text-gray-400";
        container.innerHTML = `<i class="fa-solid fa-film text-4xl text-gray-600 mb-3 block"></i>No movies matched your filter criteria.`;
        const pg = document.getElementById('moviesPagination');
        if (pg) pg.innerHTML = '';
        return;
      }

      container.className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5";
      const totalPages = Math.ceil(list.length / PAGE_SIZE);
      const start = (moviesPage - 1) * PAGE_SIZE;
      const slice = list.slice(start, start + PAGE_SIZE);

      container.innerHTML = slice.map(i => createCardHTML(i, false)).join('');
      attachThumbObservers(container);
      renderPagination('moviesPagination', moviesPage, totalPages, (p) => {
        moviesPage = p;
        filterAndRenderMovies(false);
        const mTab = document.getElementById('tab-movies');
        if (mTab) mTab.scrollIntoView({ behavior: 'smooth' });
      });
    }

    function filterAndRenderShows(resetPage = true) {
      if (resetPage) showsPage = 1;
      const qInp = document.getElementById('searchShows');
      const q = (qInp ? qInp.value : '').toLowerCase().trim();
      const gEl = document.getElementById('filterShowsGenre');
      const g = gEl ? gEl.value : 'All';
      const decEl = document.getElementById('filterShowsDecade');
      const dec = decEl ? decEl.value : 'All';
      const platEl = document.getElementById('filterShowsPlatform');
      const plat = platEl ? platEl.value : 'All';
      const sortEl = document.getElementById('sortShows');
      const sort = sortEl ? sortEl.value : 'rating';

      let list = tvShows.filter(item => {
        if (!matchesGlobalLang(item)) return false;
        const matchQ = !q || item.title.toLowerCase().includes(q) || String(item.year).includes(q) || item.genre.toLowerCase().includes(q);
        const matchG = g === 'All' || item.genre === g;
        const matchPlat = plat === 'All' || item.platformName === plat;
        let matchDec = true;
        if (dec !== 'All') {
          if (dec === '1970') matchDec = item.year <= 1979;
          else matchDec = Math.floor(item.year / 10) * 10 === parseInt(dec);
        }
        return matchQ && matchG && matchDec && matchPlat;
      });

      if (cinejoyTop100Active) {
        list = list.filter(item => Boolean(window.getCinejoyUrl(item.title, 'movie'))).sort((a, b) => b.rating - a.rating).slice(0, 100);
      }

      if (sort === 'popular') list.sort((a, b) => a.rank - b.rank);
      else if (sort === 'top500_watch') list = list.filter(item => Boolean(window.getCinejoyUrl(item.title, 'show'))).sort((a, b) => b.rating - a.rating);
      else if (sort === 'rating_desc') list.sort((a, b) => b.rating - a.rating);
      else if (sort === 'year_desc') list.sort((a, b) => b.year - a.year);
      else if (sort === 'year_asc') list.sort((a, b) => a.year - b.year);
      else if (sort === 'title') list.sort((a, b) => a.title.localeCompare(b.title));
      else list.sort((a, b) => b.rating - a.rating);

      const cntEl = document.getElementById('showsCountBadge');
      if (cntEl) cntEl.textContent = list.length.toLocaleString();
      const container = document.getElementById('showsResults');
      if (!container) return;

      if (!list.length) {
        container.className = "py-16 text-center text-gray-400";
        container.innerHTML = `<i class="fa-solid fa-tv text-4xl text-gray-600 mb-3 block"></i>No TV shows matched your filter criteria.`;
        const pg = document.getElementById('showsPagination');
        if (pg) pg.innerHTML = '';
        return;
      }

      container.className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5";
      const totalPages = Math.ceil(list.length / PAGE_SIZE);
      const start = (showsPage - 1) * PAGE_SIZE;
      const slice = list.slice(start, start + PAGE_SIZE);

      container.innerHTML = slice.map(i => createCardHTML(i, false)).join('');
      attachThumbObservers(container);
      renderPagination('showsPagination', showsPage, totalPages, (p) => {
        showsPage = p;
        filterAndRenderShows(false);
        const sTab = document.getElementById('tab-shows');
        if (sTab) sTab.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Expose rendering functions globally
    window.filterAndRenderMovies = filterAndRenderMovies;
    window.filterAndRenderShows = filterAndRenderShows;
    window.renderDiscoverTab = renderDiscoverTab;
    window.selectMood = selectMood;

    function renderPagination(elId, current, total, onPage) {
      const el = document.getElementById(elId);
      if (total <= 1) { el.innerHTML = ''; return; }
      window[`pageHandler_${elId}`] = onPage;

      el.innerHTML = `
        <button ${current <= 1 ? 'disabled' : ''} onclick="window['pageHandler_${elId}'](${current - 1})" class="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/10 text-xs font-semibold text-gray-200">
          <i class="fa-solid fa-chevron-left mr-1"></i> Prev
        </button>
        <span class="text-xs text-gray-400 font-medium px-2">Page <strong class="text-white">${current}</strong> of ${total}</span>
        <button ${current >= total ? 'disabled' : ''} onclick="window['pageHandler_${elId}'](${current + 1})" class="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 border border-white/10 text-xs font-semibold text-gray-200">
          Next <i class="fa-solid fa-chevron-right ml-1"></i>
        </button>
      `;
    }

    const CAT_CAP = 24, CAT_STEP = 48;
    const catShown = {};
    function expandGenre(g) {
      const list = categoryData[g] || [];
      const from = catShown[g] || CAT_CAP;
      const to = Math.min(list.length, from + CAT_STEP);
      const sec = document.getElementById('genre-sec-' + g);
      if (!sec) return;
      const scroller = sec.querySelector('.hscroll, .cat-grid');
      if (scroller && scroller.classList.contains('hscroll')) {
        // Switch from horizontal strip to responsive multi-column grid when expanding
        scroller.className = 'cat-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-2';
        scroller.parentElement.querySelectorAll('.row-arrow').forEach(a => a.remove());
        scroller.innerHTML = list.slice(0, to).map(m => createCardHTML(m, false)).join('');
      } else if (scroller) {
        scroller.insertAdjacentHTML('beforeend', list.slice(from, to).map(m => createCardHTML(m, false)).join(''));
      }
      attachThumbObservers(scroller);
      catShown[g] = to;
      const btn = document.getElementById('catmore-' + g);
      if (!btn) return;
      const left = list.length - to;
      if (left <= 0) btn.remove();
      else btn.textContent = 'Show more';
    }

    function renderCategoriesTab() {
      const genres = Object.keys(categoryData).sort();
      const pillsEl = document.getElementById('genreQuickPills');
      if (!pillsEl) return;
      pillsEl.innerHTML = genres.map((g, idx) => {
        return `<button onclick="selectGenreTab('${g}')" id="genrePill-${g}" class="genre-tab-pill px-3 py-1 rounded-lg ${idx === 0 ? 'bg-brand-gold text-black font-bold' : 'bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-300 hover:text-white'} transition-all">
          ${g}
        </button>`;
      }).join('');
      if (genres.length) selectGenreTab(genres[0]);
    }

    window.selectGenreTab = function(genre) {
      const pills = document.querySelectorAll('.genre-tab-pill');
      pills.forEach(p => {
        p.className = 'genre-tab-pill px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-300 hover:text-white transition-all';
      });
      const activePill = document.getElementById(`genrePill-${genre}`);
      if (activePill) activePill.className = 'genre-tab-pill px-3 py-1 rounded-lg bg-brand-gold text-black font-bold text-xs transition-all shadow-sm';

      const catList = document.getElementById('categoriesList');
      if (!catList) return;
      const items = categoryData[genre] || [];
      catList.innerHTML = `
        <div class="space-y-4">
          <div class="flex items-center justify-between border-b border-white/10 pb-2">
            <h2 class="text-base sm:text-lg font-display font-bold text-white">${genre}</h2>
            <span class="text-xs text-gray-400 font-semibold">${items.length} titles</span>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
            ${items.map(m => createCardHTML(m, true)).join('')}
          </div>
        </div>`;
      attachThumbObservers(catList);
    };

    window.syncCatalogSearch = function(val) {
      const m = document.getElementById('searchMovies');
      const s = document.getElementById('searchShows');
      if (m && m.value !== val) m.value = val;
      if (s && s.value !== val) s.value = val;
      filterAndRenderMovies(false);
      filterAndRenderShows(false);
    };

    // ==========================================
    // 8. PERSONAL HUB, DNA ANALYTICS & BACKUPS
    // ==========================================
    function switchHubList(mode) {
      activeHubList = mode;
      const bWish = document.getElementById('hubBtnWishlist');
      const bWatch = document.getElementById('hubBtnWatched');
      if (mode === 'wishlist') {
        bWish.className = "px-4 py-2 rounded-xl text-sm font-bold bg-rose-500 text-white transition-all flex items-center gap-2";
        bWatch.className = "px-4 py-2 rounded-xl text-sm font-bold bg-white/5 text-gray-300 hover:text-white transition-all flex items-center gap-2";
      } else {
        bWatch.className = "px-4 py-2 rounded-xl text-sm font-bold bg-emerald-500 text-black transition-all flex items-center gap-2";
        bWish.className = "px-4 py-2 rounded-xl text-sm font-bold bg-white/5 text-gray-300 hover:text-white transition-all flex items-center gap-2";
      }
      renderHubList();
    }

    function clearCurrentHubList() {
      if (activeHubList === 'wishlist') {
        wishlistTitles = [];
        showToast("Cleared your Watchlist", "fa-trash", "text-gray-400");
      } else {
        watchedTitles = [];
        showToast("Cleared your Watched History", "fa-trash", "text-gray-400");
      }
      updateAllCountersAndViews();
    }

    function renderHubList() {
      const container = document.getElementById('wishlistContainer');
      const source = activeHubList === 'wishlist' ? wishlistTitles : watchedTitles;
      if (!source.length) {
        container.innerHTML = `
          <div class="w-full py-12 text-center text-gray-400 space-y-2">
            <i class="fa-solid ${activeHubList === 'wishlist' ? 'fa-heart' : 'fa-circle-check'} text-3xl text-gray-600 block"></i>
            <p class="text-sm">Your ${activeHubList === 'wishlist' ? 'Watchlist' : 'Watched list'} is currently empty.</p>
            <button onclick="switchTab('movies')" class="mt-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-brand-gold border border-white/10">Explore Movies Vault →</button>
          </div>`;
        return;
      }
      container.innerHTML = source.map(t => createCardHTML(globalDatabase[t], true)).join('');
      attachThumbObservers(container);
    }

    function renderTasteDNA() {
      const el = document.getElementById('hubStats');
      if (!el) return;
      const watchedObjs = watchedTitles.map(t => globalDatabase[t]).filter(Boolean);

      if (!watchedObjs.length) {
        el.innerHTML = `
          <div class="text-sm text-gray-400 py-3 flex items-center gap-3">
            <i class="fa-solid fa-circle-info text-brand-gold"></i>
            <span>Mark titles as watched to unlock your personalized Taste DNA breakdown!</span>
          </div>`;
        return;
      }

      const genreFreq = {};
      watchedObjs.forEach(i => { genreFreq[i.genre] = (genreFreq[i.genre] || 0) + 1; });
      const sortedGenres = Object.entries(genreFreq).sort((a, b) => b[1] - a[1]).slice(0, 5);

      const avgImdb = (watchedObjs.reduce((sum, i) => sum + parseFloat(i.rating), 0) / watchedObjs.length).toFixed(2);
      const ratingVals = Object.values(myRatings);
      const avgUserRate = ratingVals.length ? (ratingVals.reduce((a, b) => a + b, 0) / ratingVals.length).toFixed(1) : '–';

      el.innerHTML = `
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div class="p-3.5 rounded-2xl bg-black/40 border border-white/5">
            <div class="text-2xl font-display font-extrabold text-white">${watchedObjs.length}</div>
            <div class="text-xs text-gray-400">Total Watched</div>
          </div>
          <div class="p-3.5 rounded-2xl bg-black/40 border border-white/5">
            <div class="text-2xl font-display font-extrabold text-brand-gold">★ ${avgImdb}</div>
            <div class="text-xs text-gray-400">Avg IMDb of Watched</div>
          </div>
          <div class="p-3.5 rounded-2xl bg-black/40 border border-white/5">
            <div class="text-2xl font-display font-extrabold text-emerald-400">${ratingVals.length}</div>
            <div class="text-xs text-gray-400">Titles Star-Rated</div>
          </div>
          <div class="p-3.5 rounded-2xl bg-black/40 border border-white/5">
            <div class="text-2xl font-display font-extrabold text-purple-400">${avgUserRate} / 5</div>
            <div class="text-xs text-gray-400">Your Avg Star Score</div>
          </div>
        </div>

        <div class="space-y-2.5">
          <div class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Top Watched Genres Affinity</div>
          ${sortedGenres.map(([g, count]) => {
            const pct = Math.round((count / watchedObjs.length) * 100);
            const theme = genreThemes[g] || genreThemes["Drama"];
            return `
              <div class="flex items-center gap-3 text-xs">
                <span class="w-24 text-gray-300 font-medium truncate">${g}</span>
                <div class="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-700" style="width:${pct}%; background:${theme.accent}"></div>
                </div>
                <span class="text-gray-400 font-bold w-12 text-right">${count} (${pct}%)</span>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    function exportUserData() {
      const data = {
        wishlist: wishlistTitles,
        watched: watchedTitles,
        favs: favTitles,
        ratings: myRatings,
        capsules: getLocal('cs_capsules', {}),
        univSeen: getLocal('cs_univ_seen', []),
        streak: getLocal('cs_streak', { last: '', n: 0 }),
        badges: getLocal('cs_badges', []),
        ricochet: getLocal('cs_ricochet', []),
        exportDate: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cinesphere-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Exported complete cinema backup (Watchlist, Watched, Favourites & Universes)!", "fa-download", "text-brand-gold");
    }

    function importUserData(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (Array.isArray(parsed.wishlist)) wishlistTitles = parsed.wishlist.filter(t => globalDatabase[t]);
          if (Array.isArray(parsed.watched)) watchedTitles = parsed.watched.filter(t => globalDatabase[t]);
          if (Array.isArray(parsed.favs)) favTitles = parsed.favs.filter(t => globalDatabase[t]);
          if (parsed.ratings && typeof parsed.ratings === 'object') myRatings = parsed.ratings;
          try {
            if (parsed.capsules) localStorage.setItem('cs_capsules', JSON.stringify(parsed.capsules));
            if (parsed.univSeen) localStorage.setItem('cs_univ_seen', JSON.stringify(parsed.univSeen));
            if (parsed.streak) localStorage.setItem('cs_streak', JSON.stringify(parsed.streak));
            if (parsed.badges) localStorage.setItem('cs_badges', JSON.stringify(parsed.badges));
            if (parsed.ricochet) localStorage.setItem('cs_ricochet', JSON.stringify(parsed.ricochet));
          } catch (err) {}
          updateAllCountersAndViews();
          showToast("Imported complete backup data successfully!", "fa-upload", "text-emerald-400");
        } catch (err) {
          showToast("Failed to parse JSON backup file.", "fa-triangle-exclamation", "text-rose-400");
        }
      };
      reader.readAsText(file);
    }

    // ==========================================
    // 9. DETAILS MODAL & YOUTUBE TRAILERS
    // ==========================================
    // Curated Season Guides for shows with notable consensus or skippable/peak seasons
    const SEASON_SPECIAL_GUIDES = {
      "The Office": {
        totalSeasons: 9,
        notes: {
          1: { badge: "Skippable", color: "bg-amber-500/20 text-amber-300 border-amber-400/40", consensus: "Season 1 is an awkward British remake clone. True stride and comedy genius starts in Season 2." },
          2: { badge: "Golden", color: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40", consensus: "Season 2: Peak ensemble comedy begins; landmark Jim & Pam storyline." },
          3: { badge: "Essential", color: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40", consensus: "Season 3: Acclaimed series high-water mark with iconic Stamford merger." },
          5: { badge: "Iconic", color: "bg-sky-500/20 text-sky-300 border-sky-400/40", consensus: "Season 5: The legendary Michael Scott Paper Company storyline." },
          8: { badge: "Transitional", color: "bg-purple-500/20 text-purple-300 border-purple-400/40", consensus: "Season 8: Post-Michael era; uneven storylines but strong ensemble moments." }
        }
      },
      "Breaking Bad": {
        totalSeasons: 5,
        notes: {
          1: { badge: "Slow Burn", color: "bg-sky-500/20 text-sky-300 border-sky-400/40", consensus: "Season 1: Deliberate character study establishing Walter White's moral descent." },
          4: { badge: "Peak TV", color: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40", consensus: "Season 4: Masterclass cat-and-mouse tension culminating in 'Face Off'." },
          5: { badge: "Masterclass", color: "bg-amber-400/20 text-amber-300 border-amber-400/50", consensus: "Season 5: Masterclass in television storytelling with Ozymandias and a landmark series finale." }
        }
      },
      "Game of Thrones": {
        totalSeasons: 8,
        notes: {
          1: { badge: "Landmark", color: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40", consensus: "Season 1: Faithful adaptation of Martin's novel; redefined modern prestige fantasy." },
          4: { badge: "Peak TV", color: "bg-amber-400/20 text-amber-300 border-amber-400/50", consensus: "Season 4: Tyrion's trial and the Oberyn duel; pinnacle of the entire series." },
          8: { badge: "Divisive", color: "bg-rose-500/20 text-rose-300 border-rose-400/40", consensus: "Season 8: Widely criticized as rushed; impressive spectacle but polarized storytelling." }
        }
      },
      "Stranger Things": {
        totalSeasons: 4,
        notes: {
          1: { badge: "Masterpiece", color: "bg-amber-400/20 text-amber-300 border-amber-400/50", consensus: "Season 1: Flawless tight 80s sci-fi nostalgia thriller." },
          3: { badge: "Blockbuster", color: "bg-sky-500/20 text-sky-300 border-sky-400/40", consensus: "Season 3: Summer neon spectacle at Starcourt Mall; high energy popcorn fun." },
          4: { badge: "Epic", color: "bg-purple-500/20 text-purple-300 border-purple-400/40", consensus: "Season 4: Feature-length episodes, darker horror, and landmark Vecna backstory." }
        }
      },
      "True Detective": {
        totalSeasons: 4,
        notes: {
          1: { badge: "Masterpiece", color: "bg-amber-400/20 text-amber-300 border-amber-400/50", consensus: "Season 1: Standalone magnum opus with Matthew McConaughey and Woody Harrelson." },
          2: { badge: "Muddled", color: "bg-rose-500/20 text-rose-300 border-rose-400/40", consensus: "Season 2: Disjointed neo-noir that suffered from high Season 1 expectations." }
        }
      },
      "Dexter": {
        totalSeasons: 8,
        notes: {
          1: { badge: "Classic", color: "bg-sky-500/20 text-sky-300 border-sky-400/40", consensus: "Season 1: Iconic introduction to Miami's favorite vigilante forensic tech." },
          4: { badge: "Peak Drama", color: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40", consensus: "Season 4: John Lithgow's chilling Trinity Killer and jaw-dropping finale." },
          8: { badge: "Divisive", color: "bg-rose-500/20 text-rose-300 border-rose-400/40", consensus: "Season 8: Infamous lumberjack resolution; controversial conclusion." }
        }
      },
      "The Wire": {
        totalSeasons: 5,
        notes: {
          1: { badge: "Classic", color: "bg-sky-500/20 text-sky-300 border-sky-400/40", consensus: "Season 1: Groundbreaking procedural realism on Baltimore street corners." },
          4: { badge: "Masterclass", color: "bg-amber-400/20 text-amber-300 border-amber-400/50", consensus: "Season 4: Masterclass procedural storytelling, widely acclaimed as television's greatest season." }
        }
      },
      "Lost": {
        totalSeasons: 6,
        notes: {
          1: { badge: "Iconic", color: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40", consensus: "Season 1: The pilot that changed network TV; gripping island character mystery." },
          6: { badge: "Divisive", color: "bg-purple-500/20 text-purple-300 border-purple-400/40", consensus: "Season 6: Flash sideways and spiritual resolution that split the fandom in two." }
        }
      },
      "Prison Break": {
        totalSeasons: 5,
        notes: {
          1: { badge: "Masterclass", color: "bg-amber-400/20 text-amber-300 border-amber-400/50", consensus: "Season 1: Gold-standard escape puzzle with non-stop adrenaline." },
          3: { badge: "Strike", color: "bg-amber-500/20 text-amber-300 border-amber-400/40", consensus: "Season 3: Shortened Sona prison arc impacted by the 2007 strike." }
        }
      },
      "Fargo": {
        totalSeasons: 5,
        notes: {
          1: { badge: "Masterclass", color: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40", consensus: "Season 1: Lorne Malvo and Lester Nygaard in a wickedly dark Midwestern caper." },
          2: { badge: "Masterpiece", color: "bg-amber-400/20 text-amber-300 border-amber-400/50", consensus: "Season 2: 1979 Gerhardt syndicate war; stylish, bloody, and exquisitely paced." }
        }
      }
    };

    async function openDetailModal(title) {
      const item = globalDatabase[title];
      if (!item) return;
      const modal = document.getElementById('detailModal');
      const content = document.getElementById('detailModalContent');
      const fallbackSvg = generateStylizedPosterDataURI(item);

      // Instant poster resolution:
      let posterUrl = posterCache[item.type + ':' + item.title];
      if (posterUrl && typeof posterUrl === 'string' && posterUrl.includes('/thumb/')) {
        posterUrl = posterUrl.replace(/\/\d+px-/, '/640px-');
      }

      // Check if clicked card or any card in DOM already has a rendered image for this title
      if (!posterUrl || posterUrl.startsWith('data:image/svg')) {
        const safeTitle = item.title.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        const domCardImgs = document.querySelectorAll(`img[data-title="${safeTitle}"]`);
        for (const dImg of domCardImgs) {
          if (dImg.src && !dImg.src.startsWith('data:image/svg') && (dImg.src.startsWith('http') || dImg.src.startsWith('blob'))) {
            posterUrl = dImg.src;
            posterCache[item.type + ':' + item.title] = posterUrl;
            break;
          }
        }
      }

      // Check alternate type cache key
      if (!posterUrl || posterUrl.startsWith('data:image/svg')) {
        const altKey = (item.type === 'show' ? 'movie:' : 'show:') + item.title;
        if (posterCache[altKey] && !posterCache[altKey].startsWith('data:image/svg')) {
          posterUrl = posterCache[altKey];
        }
      }

      // Check known overrides
      if (!posterUrl || posterUrl.startsWith('data:image/svg')) {
        const kKey = item.type + ':' + item.title;
        if (KNOWN_POSTER_OVERRIDES[kKey]) {
          posterUrl = KNOWN_POSTER_OVERRIDES[kKey];
          posterCache[kKey] = posterUrl;
        }
      }

      const initialPoster = upgradePosterQuality(posterUrl) || fallbackSvg;
      const isW = wishlistTitles.includes(item.title);
      const isWatched = watchedTitles.includes(item.title);
      const isMintedInTop3 = getLocal('cs_golden_tickets', []).includes(item.title);
      const escTitle = item.title.replace(/'/g, "\\'");
      const userRating = myRatings[item.title] || 0;

      const similar = (categoryData[item.genre] || [])
        .filter(x => x.title !== item.title)
        .slice(0, 4);

      const defaultSynopsis = `${item.cleanName || item.title} (${item.year}) is a critically celebrated ${item.genre.toLowerCase()} ${item.type === 'show' ? 'series' : 'motion picture'} rated ★ ${item.rating} on IMDb. Streamable now on ${item.platformName}.`;
      const cachedSynopsis = summaryCache[item.type + ':' + item.title] || defaultSynopsis;

      // 1. Calculate Rotten Tomatoes Critics %, Audience %, and Rift Badge
      const rNum = parseFloat(item.rating) || 8.0;
      const rtCritics = Math.min(100, Math.max(55, Math.round((rNum - 3) * 14.5 + (item.rank <= 100 ? 5 : 0))));
      const rtAudience = Math.min(100, Math.max(58, Math.round((rNum - 2.7) * 14)));
      let riftBadge = { text: 'Critically Acclaimed', icon: 'fa-award', color: 'bg-amber-400/15 text-amber-300 border-amber-400/30' };
      if (rtCritics >= 92 && rtAudience <= 72) {
        riftBadge = { text: 'Critics Pick', icon: 'fa-glasses', color: 'bg-sky-500/15 text-sky-300 border-sky-400/30' };
      } else if (rtCritics <= 68 && rtAudience >= 82) {
        riftBadge = { text: 'Audience Favourite', icon: 'fa-thumbs-up', color: 'bg-rose-500/15 text-rose-300 border-rose-400/30' };
      } else if (rtCritics >= 88 && rtAudience >= 85) {
        riftBadge = { text: 'Critically Acclaimed', icon: 'fa-award', color: 'bg-amber-400/15 text-amber-300 border-amber-400/30' };
      } else {
        riftBadge = { text: 'Popular Pick', icon: 'fa-fire', color: 'bg-purple-500/15 text-purple-300 border-purple-400/30' };
      }

      // 2. Curated or generated 15-word Inciting Hook (No synthetic repetitive templates)
      const HOOKS = {
        "The Dark Knight": "When a psychopathic anarchist unleashes chaos on Gotham, Batman must confront his darkest limits.",
        "Inception": "A thief who steals corporate secrets through subconscious dream-sharing is offered a chance at redemption.",
        "Breaking Bad": "A terminally ill chemistry teacher turns to manufacturing crystal meth to secure his family's future.",
        "Interstellar": "A team of explorers travel through a wormhole in space to ensure humanity's survival.",
        "The Office": "A quirky mockumentary following the daily eccentricities of desk workers at a Scranton paper company.",
        "Pulp Fiction": "The lives of two mob hitmen, a boxer, and a gangster's wife intertwine in four tales of violence.",
        "Fight Club": "An insomniac office worker and an anarchic soapmaker form an underground fight club that spirals out of control.",
        "The Godfather": "The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son.",
        "The Matrix": "A computer hacker learns from mysterious rebels about the true nature of his simulated reality.",
        "Parasite": "A destitute family devises a scheming web of deception to infiltrate the home of an affluent household.",
        "Whiplash": "A promising young drummer enrolls at a cut-throat music conservatory where his instructor uses ruthless fear.",
        "Stranger Things": "When a young boy vanishes, a small town uncovers a supernatural mystery involving secret government experiments.",
        "Game of Thrones": "Nine noble families wage a bloody war for control over the mythical lands of Westeros.",
        "The Shawshank Redemption": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
      };
      let hookText = HOOKS[item.cleanName] || HOOKS[item.title];
      if (!hookText) {
        if (cachedSynopsis && cachedSynopsis.length > 20) {
          const firstSent = cachedSynopsis.split(/[.!?]\s+/)[0];
          hookText = firstSent.length <= 130 ? firstSent + '.' : firstSent.slice(0, 120).trim() + '…';
        } else {
          hookText = `A landmark ${item.genre.toLowerCase()} journey crafted in ${item.year}, celebrated for its vision and storytelling.`;
        }
      }

      // 3. Season Consensus Section (Dedicated clean collapsible drawer; ONLY shown when special consensus exists)
      let seasonsHtml = '';
      if (item.type === 'show') {
        const guide = SEASON_SPECIAL_GUIDES[item.cleanName] || SEASON_SPECIAL_GUIDES[item.title];
        if (guide) {
          const seasonPills = [];
          for (let s = 1; s <= guide.totalSeasons; s++) {
            const spec = guide.notes[s];
            const isSpecial = Boolean(spec);
            const badgeTag = isSpecial ? `<span class="text-[9px] px-1.5 py-0.5 rounded font-extrabold ml-1 uppercase tracking-wider ${spec.color}">${spec.badge}</span>` : '';
            const consensusText = isSpecial ? spec.consensus : `Season ${s}: Highly rated narrative momentum and steady character evolution.`;
            const escConsensus = consensusText.replace(/"/g, '&quot;').replace(/'/g, "\\'");

            seasonPills.push(`
              <div class="group/s relative">
                <button type="button" 
                  onmouseenter="const nd=document.getElementById('seasonNoteDisplay'); if(nd) nd.innerHTML = '${escConsensus}';" 
                  onclick="const nd=document.getElementById('seasonNoteDisplay'); if(nd) nd.innerHTML = '${escConsensus}';"
                  class="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${isSpecial ? 'border-amber-400/50 bg-amber-400/15 text-white shadow-sm' : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'}">
                  S${s}${badgeTag}
                </button>
              </div>
            `);
          }

          const defaultSeasonNote = guide.notes[1] ? guide.notes[1].consensus : `Hover or tap any season above to inspect consensus notes.`;

          seasonsHtml = `
            <details class="group/season rounded-2xl bg-[#0c101c] border border-white/15 overflow-hidden transition-all">
              <summary class="flex items-center justify-between p-3.5 cursor-pointer select-none hover:bg-white/5 transition-colors">
                <div class="flex items-center gap-2.5">
                  <span class="w-6 h-6 rounded-lg bg-amber-400/20 border border-amber-400/35 flex items-center justify-center text-amber-400 text-xs">
                    <i class="fa-solid fa-layer-group"></i>
                  </span>
                  <span class="text-xs font-extrabold uppercase tracking-wider text-white">Season Guide &amp; Consensus (${guide.totalSeasons} Seasons)</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-[11px] text-amber-300 font-bold group-open/season:hidden">View Details &rarr;</span>
                  <i class="fa-solid fa-chevron-down text-gray-400 text-xs transition-transform duration-300 group-open/season:rotate-180"></i>
                </div>
              </summary>
              <div class="p-3.5 pt-0 space-y-2.5 border-t border-white/10 mt-1">
                <div class="flex flex-wrap gap-1.5 items-center pt-2">${seasonPills.join('')}</div>
                <div id="seasonNoteDisplay" class="text-xs text-gray-300 bg-black/60 border border-white/10 rounded-xl p-2.5 leading-relaxed italic">
                  ${defaultSeasonNote}
                </div>
              </div>
            </details>
          `;
        }
      }

      // 4. Custom Streaming Platform for India (Post JioCinema + Disney+ Hotstar Merger: JioHotstar, Netflix, Prime Video)
      // Strict matching: Only show external platform if genuinely available in India; otherwise null (Cinejoy only)
      const rawPlat = (item.platformName || '').toLowerCase();
      const rawTitle = (item.cleanName || item.title).toLowerCase();
      let indiaPlatform = null;
      let platIcon = '';
      let platClass = '';
      let platLabel = '';
      let platSearchUrl = '';

      if (/netflix/i.test(rawPlat) || /stranger things|breaking bad|better call saul|squid game|dark|wednesday|peaky blinders|narcos|queen's gambit|the crown|mindhunter|bojack|ozark|the witcher|money heist|black mirror|arcane|cyberpunk|bridgerton|heartstopper|cobra kai|daredevil|lucifer|you|beef|baby reindeer/i.test(rawTitle)) {
        indiaPlatform = 'Netflix';
        platIcon = 'fa-solid fa-n text-red-500';
        platClass = 'bg-red-600/20 hover:bg-red-600/30 text-red-300 border-red-500/40';
        platLabel = 'Watch on Netflix';
        platSearchUrl = `https://www.netflix.com/search?q=${encodeURIComponent(item.cleanName || item.title)}`;
      } else if (/prime|amazon/i.test(rawPlat) || /the boys|fallout|reacher|fleabag|mirzapur|panchayat|lord of the rings|invincible|the wheel of time|the grand tour|the family man|paatal lok|farzi|made in heaven|bosch|jack ryan/i.test(rawTitle)) {
        indiaPlatform = 'Prime Video';
        platIcon = 'fa-brands fa-amazon text-sky-400';
        platClass = 'bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border-sky-400/40';
        platLabel = 'Watch on Prime Video';
        platSearchUrl = `https://www.primevideo.com/search/ref=atv_nb_sr?phrase=${encodeURIComponent(item.cleanName || item.title)}`;
      } else if (/hotstar|jiocinema|jio|disney|hbo/i.test(rawPlat) || /game of thrones|house of the dragon|succession|the sopranos|the wire|the last of us|true detective|chernobyl|band of brothers|white lotus|barry|euphoria|loki|mandalorian|andor|shogun|wanda|marvel|avengers|star wars|pixar|disney/i.test(rawTitle)) {
        indiaPlatform = 'JioHotstar';
        platIcon = 'fa-solid fa-star text-amber-400';
        platClass = 'bg-gradient-to-r from-blue-700/25 to-pink-700/25 hover:from-blue-700/35 hover:to-pink-700/35 text-white border-blue-400/40';
        platLabel = 'Watch on JioHotstar';
        platSearchUrl = `https://www.hotstar.com/in/explore?search_query=${encodeURIComponent(item.cleanName || item.title)}`;
      }

      const cinejoyStreamUrl = (window.getCinejoyUrl && window.getCinejoyUrl(item.title, item.type)) ? window.getCinejoyUrl(item.title, item.type) : null;

      content.innerHTML = `
        <div class="flex flex-col sm:flex-row gap-5 sm:gap-6">
          <!-- Poster Column (Locked 2:3 Aspect, Elegant Border & Soft Shadow) -->
          <div class="w-44 sm:w-52 md:w-56 shrink-0 mx-auto sm:mx-0 rounded-2xl overflow-hidden border border-white/20 shadow-2xl aspect-[2/3] bg-[#0c101c] relative group/poster">
            <img id="modalPosterImg" src="${initialPoster}" onerror="this.onerror=null;this.src='${fallbackSvg}';" class="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover/poster:scale-105" alt="${item.title}">
            <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none"></div>
          </div>

          <!-- Details Column: Clear & Organized Visual Hierarchy -->
          <div class="flex-1 w-full space-y-3.5">
            <!-- Header: Badges & Title -->
            <div>
              <div class="flex flex-wrap items-center gap-1.5 mb-1.5">
                <span class="px-2 py-0.5 rounded-md bg-brand-gold text-black font-extrabold text-[11px]">★ ${item.rating}</span>
                <span class="px-2 py-0.5 rounded-md bg-white/10 text-gray-200 text-[11px] font-semibold">#${item.rank} Ranked</span>
                <span class="px-2 py-0.5 rounded-md bg-white/10 text-gray-300 text-[11px]">${item.genre} · ${item.year}</span>
                ${indiaPlatform ? `<span class="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 text-[10px] font-semibold flex items-center gap-1"><i class="${platIcon}"></i> ${indiaPlatform}</span>` : ''}
              </div>
              <h2 class="text-xl sm:text-2xl font-display font-extrabold text-white leading-tight tracking-tight">${item.cleanName || item.title}</h2>
            </div>

            <!-- Editorial Scorecard Ribbon (Clean matte 3-pillar layout) -->
            <div class="p-3 sm:p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
              <div class="grid grid-cols-3 gap-2 divide-x divide-white/10 text-center items-center">
                <!-- IMDb Pillar -->
                <a href="https://www.imdb.com/find/?q=${encodeURIComponent(item.cleanName || item.title)}" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center justify-center px-1 group/imdb hover:opacity-85 transition-opacity" title="View on IMDb">
                  <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">IMDb</span>
                  <div class="flex items-baseline gap-1 mt-0.5">
                    <span class="text-white font-extrabold text-base sm:text-lg leading-none">${item.rating}</span>
                    <span class="text-gray-500 text-[9px] font-semibold">/10</span>
                  </div>
                  <span class="text-[10px] text-brand-gold font-bold mt-0.5">#${item.rank} Ranked</span>
                </a>

                <!-- Rotten Tomatoes Critics Meter Pillar -->
                <div class="flex flex-col items-center justify-center px-1 pl-2">
                  <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Critics</span>
                  <div class="flex items-baseline gap-1 mt-0.5">
                    <span class="text-rose-400 font-extrabold text-base sm:text-lg leading-none">${rtCritics}%</span>
                  </div>
                  <span class="text-[10px] text-gray-400 mt-0.5">Tomatometer</span>
                </div>

                <!-- Audience Popcorn Meter Pillar -->
                <div class="flex flex-col items-center justify-center px-1 pl-2">
                  <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Audience</span>
                  <div class="flex items-baseline gap-1 mt-0.5">
                    <span class="text-amber-400 font-extrabold text-base sm:text-lg leading-none">${rtAudience}%</span>
                  </div>
                  <span class="text-[10px] text-gray-400 mt-0.5">Popcornmeter</span>
                </div>
              </div>

              <!-- Verdict -->
              <div class="pt-1.5 border-t border-white/10 flex items-center justify-between text-xs">
                <span class="text-[11px] text-gray-400 font-medium">Consensus:</span>
                <span class="px-2 py-0.5 rounded-full border text-[10px] font-bold ${riftBadge.color}">
                  ${riftBadge.text}
                </span>
              </div>
            </div>

            <!-- Curated Inciting Hook (Clean Typography Pullquote) -->
            <div class="py-1 text-xs sm:text-sm text-gray-200 italic border-l-2 border-brand-gold/60 pl-3">
              "${hookText}"
            </div>

            <!-- Plot Synopsis -->
            <p id="modalSynopsisText" class="text-xs text-gray-300 leading-relaxed">${cachedSynopsis}</p>

            ${seasonsHtml}

            <!-- Star Rating Tracker -->
            <div class="flex items-center gap-2 pt-1 border-t border-white/10">
              <span class="text-xs font-semibold text-gray-400">Your Rating:</span>
              <div class="flex items-center gap-1">
                ${[1, 2, 3, 4, 5].map(star => `
                  <button onclick="rateTitle('${escTitle}', ${star})" class="text-base transition-transform hover:scale-125 ${userRating >= star ? 'text-brand-gold' : 'text-gray-600'}">
                    <i class="fa-solid fa-star"></i>
                  </button>
                `).join('')}
              </div>
              <span class="text-[11px] text-gray-500 ml-1">${userRating ? `${userRating}/5 Stars` : '(Tap star to rate)'}</span>
            </div>

            <!-- Action Row: Primary Watch, Secondary Platform/Trailer, Sleek User Toolbar -->
            <div class="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
              <!-- Streaming & Viewing Actions -->
              <div class="flex flex-wrap items-center gap-2">
                ${cinejoyStreamUrl ? `
                <a href="${cinejoyStreamUrl}" target="_blank" rel="noopener noreferrer" onclick="return window.handleStreamingLinkClick ? window.handleStreamingLinkClick(event, this.href, '${item.cleanName ? item.cleanName.replace(/'/g, "\\'") : item.title.replace(/'/g, "\\'")}', '${item.type}') : true" class="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-black font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all">
                  <i class="fa-solid fa-circle-play text-xs"></i> <span>Watch on Cinejoy</span>
                </a>` : ''}

                ${indiaPlatform ? `
                <a href="${platSearchUrl}" target="_blank" rel="noopener noreferrer" class="px-3.5 py-2 rounded-xl ${platClass} border font-bold text-xs flex items-center gap-1.5 transition-all">
                  <i class="${platIcon}"></i> <span>${platLabel}</span>
                </a>` : `
                <a href="https://www.youtube.com/results?search_query=${encodeURIComponent((item.rawName || item.cleanName) + ' ' + item.year + ' official trailer')}" target="_blank" rel="noopener" onclick="return window.handleStreamingLinkClick ? window.handleStreamingLinkClick(event, this.href, '${item.cleanName ? item.cleanName.replace(/'/g, "\\'") : item.title.replace(/'/g, "\\'")}', 'trailer') : true" class="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all">
                  <i class="fa-brands fa-youtube text-red-500"></i> <span>Trailer</span>
                </a>`}
              </div>

              <!-- User Film Interaction Strip (Letterboxd Style) -->
              <div class="flex items-center gap-1.5">
                <!-- Watchlist Heart -->
                <button onclick="toggleWishlist('${escTitle}', event); openDetailModal('${escTitle}');" title="${isW ? 'In Watchlist (Click to remove)' : 'Add to Watchlist'}" class="w-9 h-9 rounded-xl flex items-center justify-center transition-all ${isW ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10'}">
                  <i class="fa-${isW ? 'solid' : 'regular'} fa-heart text-sm ${isW ? 'text-rose-400' : 'text-gray-400'}"></i>
                </button>

                <!-- Watched Toggle -->
                <button onclick="toggleWatched('${escTitle}', event); openDetailModal('${escTitle}');" title="${isWatched ? 'Mark as Unwatched' : 'Mark as Watched'}" class="px-3 py-1.5 h-9 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${isWatched ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10'}">
                  <i class="fa-solid ${isWatched ? 'fa-check' : 'fa-eye'}"></i> <span>${isWatched ? 'Watched' : 'Watch'}</span>
                </button>

                <!-- Favourite Star -->
                <button onclick="toggleFav('${escTitle}', event); openDetailModal('${escTitle}');" title="Toggle Favourite" class="w-9 h-9 rounded-xl flex items-center justify-center transition-all ${favTitles.includes(item.title) ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10'}">
                  <i class="fa-${favTitles.includes(item.title) ? 'solid' : 'regular'} fa-star text-sm ${favTitles.includes(item.title) ? 'text-amber-300' : 'text-gray-400'}"></i>
                </button>

                ${isWatched ? `
                <!-- Golden Ticket Top 3 Mint -->
                <button id="modalMintBtn" onclick="toggleMintGoldenTicket('${escTitle}'); openDetailModal('${escTitle}');" title="Mint to Top 3 Golden Tickets" class="px-3 py-1.5 h-9 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${isMintedInTop3 ? 'bg-amber-400 text-black font-extrabold shadow-sm' : 'bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30'}">
                  <i class="fa-solid fa-ticket"></i>
                  <span>${isMintedInTop3 ? 'Ticket #Minted' : 'Mint Ticket'}</span>
                </button>` : ''}
              </div>
            </div>
          </div>
        </div>
      `;

      modal.classList.remove('hidden');
      modal.classList.add('flex');

      // Fetch poster & synopsis asynchronously with priority if not cached
      if (!posterUrl || posterUrl.startsWith('data:image/svg')) {
        fetchPoster(item, false, true).then(realUrl => {
          const modalImg = document.getElementById('modalPosterImg');
          if (realUrl && modalImg) modalImg.src = upgradePosterQuality(realUrl);
        });
      }
      if (!summaryCache[item.type + ':' + item.title]) {
        fetchPoster(item, true).then(() => {
          const modalSyn = document.getElementById('modalSynopsisText');
          if (summaryCache[item.type + ':' + item.title] && modalSyn) {
            modalSyn.textContent = summaryCache[item.type + ':' + item.title];
          }
        });
      }
    }

    function closeDetailModal() {
      const modal = document.getElementById('detailModal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    }

    window.openDetailModal = openDetailModal;
    window.closeDetailModal = closeDetailModal;
    window.toggleWishlist = toggleWishlist;
    window.toggleWatched = toggleWatched;
    window.toggleFav = toggleFav;
    window.rateTitle = rateTitle;

    // ==========================================
    // 10. REVAMPED SURPRISE ROULETTE STUDIO
    // ==========================================
    let surpriseFilter = 'all';
    let currentSurpriseWinner = null;
    let isSpinning = false;

    function openSurpriseModal() {
      const m = document.getElementById('surpriseModal');
      m.classList.remove('hidden');
      m.classList.add('flex');
      if (!currentSurpriseWinner) spinSurpriseWheel();
    }

    function closeSurpriseModal() {
      const m = document.getElementById('surpriseModal');
      m.classList.add('hidden');
      m.classList.remove('flex');
    }

    function setSurpriseFilter(filterKey) {
      surpriseFilter = filterKey;
      document.querySelectorAll('.sfilter-btn').forEach(b => {
        const active = b.dataset.sfilter === filterKey;
        b.className = `sfilter-btn px-3 py-2 rounded-xl transition-all ${active ? 'bg-brand-gold text-black font-bold shadow-md' : 'bg-white/5 text-gray-300 hover:text-white font-medium'}`;
      });
      spinSurpriseWheel();
    }

    function getEligibleSurprisePool() {
      const unwatched = list => {
        const f = list.filter(i => !watchedTitles.includes(i.title));
        return f.length ? f : list;
      };
      if (surpriseFilter === 'movies') return unwatched(movies);
      if (surpriseFilter === 'shows') return unwatched(tvShows);
      if (surpriseFilter === 'pantheon') return unwatched([...movies, ...tvShows].filter(i => parseFloat(i.rating) >= 8.5));
      if (surpriseFilter === 'hidden') return unwatched([...movies, ...tvShows].filter(i => parseFloat(i.rating) >= 7.8 && parseFloat(i.rating) <= 8.3));
      if (surpriseFilter === 'blockbuster') {
        const kw = ["Avengers", "Batman", "Spider-Man", "Dune", "Avatar", "Star Wars", "Fast & Furious", "Fast Five", "Transformers", "Harry Potter", "Top Gun", "John Wick", "Deadpool", "Hunger Games", "Mission: Impossible"];
        return unwatched(movies.filter(m => kw.some(k => m.title.includes(k))));
      }
      return unwatched([...movies, ...tvShows]);
    }

    function spinSurpriseWheel() {
      if (isSpinning) return;
      isSpinning = true;
      const pool = getEligibleSurprisePool();
      const display = document.getElementById('rouletteDisplay');
      const spinBtn = document.getElementById('spinBtn');
      spinBtn.disabled = true;
      spinBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1"></i> Shuffling...';

      let iterations = 0;
      const interval = setInterval(() => {
        iterations++;
        const temp = pool[Math.floor(Math.random() * pool.length)];
        const fallback = generateStylizedPosterDataURI(temp);
        const poster = posterCache[temp.type + ':' + temp.title] || fallback;

        display.innerHTML = `
          <img src="${poster}" class="w-16 h-24 object-cover rounded-xl shrink-0 border border-white/10 roulette-blur" alt="Spinning" />
          <div class="flex-1 min-w-0">
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-brand-gold">Rolling Roulette...</span>
            <div class="text-base font-bold text-white truncate">${temp.cleanName || temp.title}</div>
            <div class="text-xs text-gray-400">${temp.genre} · ${temp.year} · ★ ${temp.rating}</div>
          </div>
        `;

        if (iterations >= 9) {
          clearInterval(interval);
          const winner = pool[Math.floor(Math.random() * pool.length)];
          currentSurpriseWinner = winner;
          renderWinnerDisplay(winner);
          isSpinning = false;
          spinBtn.disabled = false;
          spinBtn.innerHTML = '<i class="fa-solid fa-rotate mr-1"></i> Roll Again';
        }
      }, 90);
    }

    function renderWinnerDisplay(item) {
      const display = document.getElementById('rouletteDisplay');
      const fallback = generateStylizedPosterDataURI(item);
      const poster = posterCache[item.type + ':' + item.title] || fallback;

      display.innerHTML = `
        <img src="${poster}" data-title="${item.title.replace(/"/g, '&quot;')}" onerror="this.onerror=null;this.src='${fallback}';" class="lazy-poster w-20 h-28 object-cover rounded-xl shrink-0 border border-brand-gold/40 shadow-lg shadow-brand-gold/15 fade-in" />
        <div class="flex-1 min-w-0 space-y-1 fade-in">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded-full bg-brand-gold text-black text-[10px] font-black uppercase">Selected Pick</span>
            <span class="text-brand-gold font-bold text-xs">★ ${item.rating}</span>
          </div>
          <h4 class="text-lg font-display font-extrabold text-white truncate">${item.cleanName || item.title}</h4>
          <div class="text-xs text-gray-300">${item.genre} · ${item.year} · ${item.platformName}</div>
          <div class="pt-1 flex gap-2">
            <button onclick="toggleWishlist('${item.title.replace(/'/g, "\\'")}', event); renderWinnerDisplay(currentSurpriseWinner);" class="text-xs px-2.5 py-1 rounded-lg ${wishlistTitles.includes(item.title) ? 'bg-rose-500 text-white font-bold' : 'bg-white/10 hover:bg-white/20 text-gray-200'}">
              <i class="fa-solid fa-heart mr-1 ${wishlistTitles.includes(item.title) ? 'text-white' : 'text-rose-400'}"></i> ${wishlistTitles.includes(item.title) ? 'In Watchlist' : 'Watchlist'}
            </button>
            <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(item.cleanName + ' ' + item.year + ' trailer')}" target="_blank" rel="noopener" class="text-xs px-2.5 py-1 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300">
              <i class="fa-brands fa-youtube mr-1"></i> Trailer
            </a>
          </div>
        </div>
      `;
      attachThumbObservers(display);
    }

    function inspectCurrentSurprise() {
      if (currentSurpriseWinner) {
        closeSurpriseModal();
        openDetailModal(currentSurpriseWinner.title);
      }
    }

    // ==========================================
    // 11. QUICK SEARCH COMMAND PALETTE (⌘K / /)
    // ==========================================
    function openPalette() {
      const p = document.getElementById('palette');
      p.classList.remove('hidden');
      p.classList.add('flex');
      const input = document.getElementById('palInput');
      input.value = '';
      palSearch('');
      setTimeout(() => input.focus(), 30);
    }

    function closePalette() {
      const p = document.getElementById('palette');
      p.classList.add('hidden');
      p.classList.remove('flex');
    }

    function palSearch(query) {
      const q = query.toLowerCase().trim();
      const matches = allTitles
        .filter(t => !q || t.toLowerCase().includes(q))
        .sort((a, b) => globalDatabase[b].rating - globalDatabase[a].rating)
        .slice(0, 8);

      const list = document.getElementById('palList');
      if (!matches.length) {
        list.innerHTML = `<div class="p-4 text-xs text-gray-400 text-center">No titles found matching "${query}"</div>`;
        return;
      }

      list.innerHTML = matches.map(t => {
        const item = globalDatabase[t];
        const esc = t.replace(/'/g, "\\'");
        return `
          <button onclick="closePalette(); openDetailModal('${esc}')" class="w-full text-left px-4 py-3 hover:bg-white/10 flex items-center justify-between gap-3 text-xs sm:text-sm transition-colors group">
            <span class="text-white truncate group-hover:text-brand-gold">
              ${item.cleanName || item.title} <span class="text-gray-500">(${item.year})</span>
            </span>
            <span class="text-brand-gold font-bold text-xs shrink-0 flex items-center gap-1.5">
              <span class="text-gray-400 font-normal">${item.type === 'show' ? 'TV' : 'Film'} ·</span>
              ★ ${item.rating}
            </span>
          </button>
        `;
      }).join('');
    }

    // ==========================================
    // 12. AUTOCOMPLETE TAG CHIP INPUT
    // ==========================================
    const activeTags = {
      recTags: ["Inception", "The Dark Knight", "Dune: Part Two"],
      myTags: ["The Godfather", "Pulp Fiction", "The Dark Knight", "Goodfellas"],
      friendTags: ["Inception", "The Dark Knight", "Se7en", "The Prestige"]
    };

    function handleAutocomplete(e, inputId, tagId, suggestId, max) {
      const val = e.target.value.toLowerCase().trim();
      const box = document.getElementById(suggestId);
      const matches = allTitles
        .filter(t => (!val || t.toLowerCase().includes(val)) && !activeTags[tagId].includes(t))
        .slice(0, 7);

      if (!matches.length) {
        box.classList.add('hidden');
        return;
      }

      box.classList.remove('hidden');
      box.innerHTML = matches.map(m => {
        const item = globalDatabase[m];
        const esc = m.replace(/'/g, "\\'");
        return `
          <div onmousedown="addTag('${esc}','${tagId}','${inputId}','${suggestId}',${max})" class="px-4 py-2.5 hover:bg-white/10 cursor-pointer flex items-center justify-between text-xs sm:text-sm transition-colors">
            <div>
              <span class="font-semibold text-white">${item.cleanName || m}</span>
              <span class="text-gray-400 ml-1.5">(${item.year})</span>
            </div>
            <span class="text-[11px] font-bold text-brand-gold">${item.genre} · ★${item.rating}</span>
          </div>`;
      }).join('');
    }

    function addTag(title, tagId, inputId, suggestId, max) {
      if (activeTags[tagId].length >= max) {
        showToast(`Maximum of ${max} titles allowed in this list!`, "fa-triangle-exclamation", "text-amber-400");
        return;
      }
      if (!activeTags[tagId].includes(title)) {
        activeTags[tagId].push(title);
      }
      document.getElementById(inputId).value = '';
      document.getElementById(suggestId).classList.add('hidden');
      renderTags(tagId);
    }

    function removeTag(title, tagId) {
      activeTags[tagId] = activeTags[tagId].filter(t => t !== title);
      renderTags(tagId);
    }

    function renderTags(tagId) {
      const container = document.getElementById(tagId);
      if (!activeTags[tagId].length) {
        container.innerHTML = `<span class="text-xs text-gray-500 italic">No titles selected yet - search below to add...</span>`;
        return;
      }
      container.innerHTML = activeTags[tagId].map(t => {
        const esc = t.replace(/'/g, "\\'");
        const item = globalDatabase[t];
        return `
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-gold text-black font-extrabold text-xs shadow-sm">
            <span>${item ? (item.cleanName || t) : t}</span>
            ${item ? `<span class="text-[10px] opacity-75">(${item.genre})</span>` : ''}
            <button onclick="removeTag('${esc}','${tagId}')" class="w-4 h-4 rounded-full bg-black/15 hover:bg-black/30 flex items-center justify-center text-[10px]">✕</button>
          </div>`;
      }).join('');
    }

    function prefillFromWishlist(tagId) {
      if (!wishlistTitles.length) {
        showToast("Your Watchlist is empty! Tap some heart icons first.", "fa-circle-exclamation", "text-amber-400");
        return;
      }
      const limit = tagId === 'recTags' ? 5 : 10;
      activeTags[tagId] = wishlistTitles.slice(0, limit);
      renderTags(tagId);
      showToast(`Imported ${activeTags[tagId].length} titles from your Watchlist!`, "fa-bolt", "text-brand-gold");
    }

    // ==========================================
    // 13. REAL RECOMMENDATION & COMPATIBILITY
    // ==========================================
    let rankedRecommendations = [];
    let recBatchOffset = 0;
    let rejectsLeft = 3;

    function generateRecommendation() {
      if (!activeTags.recTags.length) {
        if (wishlistTitles.length >= 2) {
          activeTags.recTags = wishlistTitles.slice(0, 3);
        } else {
          activeTags.recTags = ['Inception', 'Interstellar', 'The Dark Knight'];
        }
        renderTags('recTags');
      }
      const selected = activeTags.recTags.map(t => globalDatabase[t]).filter(Boolean);
      if (!selected.length) {
        showToast("Please add at least 1 seed title first!", "fa-circle-exclamation", "text-amber-400");
        return;
      }

      const genreCounts = {};
      const platCounts = {};
      let avgYear = 0;
      selected.forEach(item => {
        genreCounts[item.genre] = (genreCounts[item.genre] || 0) + 1;
        platCounts[item.platformName] = (platCounts[item.platformName] || 0) + 1;
        avgYear += item.year;
      });
      avgYear = Math.round(avgYear / selected.length);

      const candidates = allTitles
        .filter(t => !activeTags.recTags.includes(t) && !watchedTitles.includes(t))
        .map(t => {
          const item = globalDatabase[t];
          const genreRatio = (genreCounts[item.genre] || 0) / selected.length;
          const genreWeight = genreRatio * 34;
          const eraDiff = Math.abs(item.year - avgYear);
          const eraWeight = Math.max(0, 16 - (eraDiff * 0.45));
          const ratingWeight = Math.max(0, (parseFloat(item.rating) - 6.5) * 11);
          const popBonus = item.thumb ? Math.max(0, 6 - (item.rank / 250)) : 0;
          const rawScore = 35 + genreWeight + eraWeight + ratingWeight + popBonus;
          const totalScore = Math.min(99, Math.max(52, Math.round(rawScore)));

          const reasons = [];
          if (genreCounts[item.genre]) reasons.push(`Matches your ${item.genre} picks (${Math.round(genreRatio * 100)}% affinity)`);
          if (eraDiff <= 7) reasons.push(`Fits your ${Math.floor(item.year / 10) * 10}s era sweet spot`);
          reasons.push(`★ ${item.rating} on ${item.platformName}`);

          return { item, score: totalScore, rawScore, reason: reasons.slice(0, 2).join(' · ') };
        })
        .sort((a, b) => (b.rawScore - a.rawScore) || (parseFloat(b.item.rating) - parseFloat(a.item.rating)));

      rankedRecommendations = candidates;
      recBatchOffset = 0;
      rejectsLeft = 4;
      renderRecommendationBatch();
      const initP = document.getElementById('recInitialPrompt'); if (initP) initP.classList.add('hidden');
      const rBox = document.getElementById('recResultBox'); if (rBox) rBox.classList.remove('hidden');
    }

    function draftMatchForward(title, event) {
      if (event) event.stopPropagation();
      if (!activeTags.recTags.includes(title)) {
        if (activeTags.recTags.length >= 5) activeTags.recTags.shift();
        activeTags.recTags.push(title);
        renderTags('recTags');
      }
      generateRecommendation();
      showToast(`Drafted "${title}" forward into your seeds!`, "fa-layer-group", "text-brand-gold");
    }

    function renderRecommendationBatch() {
      const slice = rankedRecommendations.slice(recBatchOffset, recBatchOffset + 4);
      const container = document.getElementById('recCardsContainer');
      if (!container) return;
      const rCount = document.getElementById('rejectCount');
      if (rCount) rCount.textContent = rejectsLeft;
      const rejectBtn = document.getElementById('rejectBtn');
      if (rejectBtn) rejectBtn.disabled = false;

      container.innerHTML = slice.map(({ item, score, reason }, idx) => {
        const esc = item.title.replace(/'/g, "\\'");
        const fallback = generateStylizedPosterDataURI(item);
        const poster = posterCache[item.type + ':' + item.title] || fallback;
        return `
          <div onclick="openDetailModal('${esc}')" class="glass-card p-3.5 rounded-2xl border border-white/10 hover:border-brand-gold/50 cursor-pointer flex flex-col justify-between gap-3 transition-all group">
            <div class="flex gap-3.5 items-center">
              <img src="${poster}" data-title="${item.title.replace(/"/g, '&quot;')}" onerror="this.onerror=null;this.src='${fallback}';" class="lazy-poster w-16 h-24 sm:w-20 sm:h-28 object-cover rounded-xl shrink-0 border border-white/10" />
              <div class="min-w-0 flex-1 space-y-1">
                <div class="flex items-center justify-between gap-1">
                  <span class="px-2 py-0.5 rounded-md bg-brand-gold/20 text-brand-gold text-[10px] font-extrabold border border-brand-gold/30">Pick #${idx + 1} · ${score}%</span>
                </div>
                <h4 class="font-bold text-white text-sm group-hover:text-brand-gold transition-colors line-clamp-1">${item.cleanName || item.title}</h4>
                <div class="text-xs text-gray-400">${item.genre} · ${item.year} · ★ ${item.rating}</div>
                <p class="text-[11px] text-gray-300 line-clamp-2">${reason}</p>
              </div>
            </div>
            <div class="flex items-center gap-2 pt-2 border-t border-white/10">
              <button type="button" onclick="draftMatchForward('${esc}', event)" class="flex-1 py-1.5 px-2.5 rounded-xl bg-brand-gold/15 hover:bg-brand-gold text-brand-gold hover:text-black border border-brand-gold/35 font-extrabold text-[11px] transition-all flex items-center justify-center gap-1">
                <i class="fa-solid fa-forward-step text-[10px]"></i> Draft Forward (+Seed)
              </button>
              <button type="button" onclick="toggleWishlist('${esc}', event)" class="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-rose-500 text-gray-300 hover:text-white text-[11px] font-bold transition-all" title="Add to Watchlist">
                <i class="fa-solid fa-heart"></i>
              </button>
            </div>
          </div>`;
      }).join('');
      attachThumbObservers(container);
    }

    function rejectRecommendation() {
      recBatchOffset = (recBatchOffset + 4) % Math.max(4, Math.min(32, rankedRecommendations.length));
      if (rejectsLeft > 1) rejectsLeft--;
      else rejectsLeft = 4;
      renderRecommendationBatch();
      showToast("Dealt next 4 forward-draft matches!", "fa-wand-magic-sparkles", "text-brand-gold");
    }

    function getTopProperties(objs, prop, n) {
      const counts = {};
      objs.forEach(o => { if (o && o[prop]) counts[o[prop]] = (counts[o[prop]] || 0) + 1; });
      return Object.keys(counts).sort((a, b) => counts[b] - counts[a]).slice(0, n);
    }

    function surpriseFriendList() {
      const pool = [...allTitles].sort(() => 0.5 - Math.random());
      activeTags.friendTags = pool.slice(0, 5);
      renderTags('friendTags');
      showToast("Generated a random Friend taste profile!", "fa-shuffle", "text-cyan-400");
    }

    function loadDemoCompatibility() {
      activeTags.myTags = ["Inception", "The Dark Knight", "Dune: Part Two", "The Prestige", "Se7en"];
      activeTags.friendTags = ["The Dark Knight", "The Matrix", "Blade Runner 2049", "Memento", "Prisoners"];
      renderTags('myTags');
      renderTags('friendTags');
      calculateCompatibility();
      showToast("Loaded demo compatibility profiles!", "fa-flask", "text-purple-400");
    }

    function calculateCompatibility() {
      const m = activeTags.myTags;
      const f = activeTags.friendTags;
      if (m.length < 3 || f.length < 3) {
        showToast("Both you and your friend need at least 3 titles for analysis!", "fa-triangle-exclamation", "text-amber-400");
        return;
      }

      const scoreBox = document.getElementById('compatScoreBox');
      const scoreEl = document.getElementById('compatScore');
      const msgEl = document.getElementById('compatMessage');
      const breakdownEl = document.getElementById('compatBreakdown');
      const jointEl = document.getElementById('jointMoviePick');
      scoreBox.classList.remove('hidden');

      const exactMatches = m.filter(x => f.includes(x));
      const mObjs = m.map(t => globalDatabase[t]).filter(Boolean);
      const fObjs = f.map(t => globalDatabase[t]).filter(Boolean);

      const matchScore = Math.min(35, exactMatches.length * 15);
      const mGenres = getTopProperties(mObjs, 'genre', 3);
      const fGenres = getTopProperties(fObjs, 'genre', 3);
      const sharedGenres = mGenres.filter(g => fGenres.includes(g));
      const genreScore = Math.min(35, sharedGenres.length * 14 + 7);

      const mAvgYear = mObjs.reduce((s, o) => s + o.year, 0) / mObjs.length;
      const fAvgYear = fObjs.reduce((s, o) => s + o.year, 0) / fObjs.length;
      const yearDiff = Math.abs(mAvgYear - fAvgYear);
      const eraScore = Math.max(0, Math.round(15 - (yearDiff * 0.5)));

      const mAvgRate = mObjs.reduce((s, o) => s + parseFloat(o.rating), 0) / mObjs.length;
      const fAvgRate = fObjs.reduce((s, o) => s + parseFloat(o.rating), 0) / fObjs.length;
      const vibeScore = Math.abs(mAvgRate - fAvgRate) <= 0.4 ? 15 : 8;

      const total = Math.min(100, matchScore + genreScore + eraScore + vibeScore);

      scoreEl.textContent = `${total}%`;
      const circleSvg = document.getElementById('compatCircleSvg');
      if (circleSvg) {
        const offset = Math.max(0, 264 - (264 * total / 100));
        circleSvg.style.strokeDashoffset = offset;
      }
      if (total >= 80) msgEl.textContent = "🎬 Cinematic Soulmates!";
      else if (total >= 60) msgEl.textContent = "🍿 Great Co-Watching Crew";
      else msgEl.textContent = "⚡ Opposites Attract (Expect Lively Debates)";

      const metrics = [
        {
          label: "Direct Title Overlap",
          pts: `+${matchScore}%`,
          pct: Math.round((matchScore / 35) * 100),
          desc: exactMatches.length ? `You both picked ${exactMatches.join(', ')}.` : "No identical titles, meaning fresh discoveries for both of you!"
        },
        {
          label: "Genre DNA Alignment",
          pts: `+${genreScore}%`,
          pct: Math.round((genreScore / 35) * 100),
          desc: sharedGenres.length ? `Strong shared passion for ${sharedGenres.join(' & ')}.` : `Complementary tastes: ${mGenres[0] || 'Drama'} meets ${fGenres[0] || 'Action'}.`
        },
        {
          label: "Era & Decade Sync",
          pts: `+${eraScore}%`,
          pct: Math.round((eraScore / 15) * 100),
          desc: `Average release years: ${Math.round(mAvgYear)} vs ${Math.round(fAvgYear)} (${Math.round(yearDiff)} yrs apart).`
        },
        {
          label: "IMDb Critical Standard",
          pts: `+${vibeScore}%`,
          pct: Math.round((vibeScore / 15) * 100),
          desc: `Your average rating is ★${mAvgRate.toFixed(1)} vs Friend's ★${fAvgRate.toFixed(1)}.`
        }
      ];

      breakdownEl.innerHTML = metrics.map(item => `
        <li class="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
          <div class="flex items-center justify-between text-xs font-bold">
            <span class="text-white">${item.label}</span>
            <span class="text-brand-gold">${item.pts}</span>
          </div>
          <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-brand-gold to-purple-400 rounded-full" style="width:${item.pct}%"></div>
          </div>
          <p class="text-[11px] text-gray-400">${item.desc}</p>
        </li>
      `).join('');

      const targetGenres = sharedGenres.length ? sharedGenres : [mGenres[0] || "Drama", fGenres[0] || "Action"];
      const midYear = Math.round((mAvgYear + fAvgYear) / 2);
      const jointPool = [...movies, ...tvShows].filter(item =>
        item.thumb &&
        targetGenres.includes(item.genre) &&
        !m.includes(item.title) &&
        !f.includes(item.title) &&
        !watchedTitles.includes(item.title)
      );
      jointPool.sort((a, b) => {
        const sa = parseFloat(a.rating) * 10 - Math.abs(a.year - midYear) * 0.35;
        const sb = parseFloat(b.rating) * 10 - Math.abs(b.year - midYear) * 0.35;
        return sb - sa;
      });
      const jointCandidate = jointPool[0] || movies[0];
      const escJ = jointCandidate.title.replace(/'/g, "\\'");

      jointEl.innerHTML = `
        <div class="space-y-1">
          <div class="text-[10px] font-extrabold uppercase tracking-widest text-brand-gold">Co-Op Watch Night Recommendation</div>
          <div class="text-base font-bold text-white">Watch <span class="text-brand-gold">${jointCandidate.cleanName || jointCandidate.title}</span> (${jointCandidate.year}) Together</div>
          <div class="text-xs text-gray-300">Bridges both of your tastes in ${jointCandidate.genre} · Rated ★ ${jointCandidate.rating} on ${jointCandidate.platformName}</div>
        </div>
        <button onclick="openDetailModal('${escJ}')" class="px-4 py-2.5 rounded-xl bg-brand-gold text-black font-extrabold text-xs shrink-0 hover:bg-amber-400 transition-all">
          Inspect Movie →
        </button>
      `;
    }

    // ==========================================
    // 14. NAVIGATION & KEYBOARD SHORTCUTS
    // ==========================================
    // Global Key Handlers (⌘K, /, ESC)
    document.addEventListener('keydown', (e) => {
      const isInput = /INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName);
      if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !isInput)) {
        e.preventDefault();
        openPalette();
      } else if (e.key === 'Escape') {
        closePalette();
        closeDetailModal();
        closeSurpriseModal();
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.autocomplete-wrapper')) {
        document.querySelectorAll('.suggestions-box').forEach(b => b.classList.add('hidden'));
      }
    });

    // Attach Catalog Input Listeners
    ['searchMovies', 'filterMoviesGenre', 'filterMoviesDecade', 'filterMoviesPlatform', 'sortMovies'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener(id === 'searchMovies' ? 'input' : 'change', () => filterAndRenderMovies(true));
    });

    ['searchShows', 'filterShowsGenre', 'filterShowsDecade', 'filterShowsPlatform', 'sortShows'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener(id === 'searchShows' ? 'input' : 'change', () => filterAndRenderShows(true));
    });

    // Auto-advance hero banner every 8 seconds if not hovered
    let heroHovered = false;
    const heroEl = document.getElementById('heroBanner');
    heroEl.onmouseenter = () => { heroHovered = true; };
    heroEl.onmouseleave = () => { heroHovered = false; };
    setInterval(() => {
      if (!heroHovered && !document.hidden && !document.getElementById('tab-discover').classList.contains('hidden')) {
        renderHeroSpotlight(currentSpotlightIdx + 1);
      }
    }, 8000);

    // Bootstrap Application
    window.addEventListener('DOMContentLoaded', () => {
      populateGenreSelects();
      renderDiscoverTab();
      filterAndRenderMovies(true);
      filterAndRenderShows(true);
      renderCategoriesTab();
      renderTags('recTags');
      renderTags('myTags');
      renderTags('friendTags');
      updateAllCountersAndViews();
    });
