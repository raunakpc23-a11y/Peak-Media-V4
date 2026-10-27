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
    const baseMovies = dedupeList([...rawMoviesCore, ...rawMoviesExpanded, ...rawMoviesMore, ...extraMovieSeeds, ...expandedMovieVault, ...expandedVaultBatch2Movies]);
    const baseShows = dedupeList([...rawShowsCore, ...rawShowsExpanded, ...rawShowsMore, ...extraShowSeeds, ...expandedShowVault, ...expandedVaultBatch2Shows]);
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

    const platforms = ["Netflix", "Max", "Prime Video", "Disney+", "Hulu"];
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
      if (/avengers|iron man|captain america|thor|guardians of the galaxy|black panther|doctor strange|ant-man|black widow|shang-chi|eternals|marvels|thunderbolts|fantastic four|wandavision|loki|hawkeye|moon knight|ms\. marvel|she-hulk|secret invasion|agatha all along|daredevil|punisher|star wars|mandalorian|andor|ahsoka|obi-wan|boba fett|acolyte|skeleton crew|clone wars|rebels|bad batch|toy story|finding nemo|finding dory|incredibles|ratatouille|wall-e|inside out|coco|soul|zootopia|moana|frozen|lion king|aladdin|beauty and the beast|simpsons|bluey/.test(l)) return "Disney+";
      if (/sopranos|the wire|game of thrones|house of the dragon|knight of the seven kingdoms|succession|chernobyl|band of brothers|the pacific|last of us|white lotus|euphoria|true detective|barry|silicon valley|veep|curb your enthusiasm|deadwood|rome|boardwalk empire|six feet under|leftovers|watchmen|peacemaker|the penguin|creature commandos|the pitt|batman|dark knight|man of steel|justice league|wonder woman|aquaman|shazam|suicide squad|joker|harry potter|fantastic beasts|dune|lord of the rings: the|the hobbit/.test(l)) return "Max";
      if (/stranger things|squid game|wednesday|black mirror|the crown|dark|money heist|la casa de papel|narcos|ozark|mindhunter|bridgerton|queen's gambit|arcane|blue eye samurai|bojack horseman|castlevania|cyberpunk|love, death|sex education|heartstopper|witcher|lupin|3 body problem|beef|baby reindeer|adolescence|glass onion|roma|irishman|marriage story|all quiet on the western front|sacred games|delhi crime|kohrra|heeramandi|railway men|black warrant/.test(l)) return "Netflix";
      if (/the boys|gen v|invincible|fallout|reacher|rings of power|fleabag|marvelous mrs\. maisel|jack ryan|bosch|wheel of time|mr\. & mrs\. smith|the expanse|good omens|legend of vox machina|family man|mirzapur|panchayat|paatal lok|farzi|made in heaven|jubilee/.test(l)) return "Prime Video";
      if (/shogun|shōgun|the bear|only murders in the building|handmaid's tale|fargo|atlanta|always sunny|what we do in the shadows|reservation dogs|buffy|firefly|x-files|arrested development|community|bob's burgers|archer|futurama|rick and morty|family guy/.test(l)) return "Hulu";
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

    // Direct Cinejoy movie streaming URLs for the Top 500 IMDb movies (exact TMDb ID + slug)
    const CINEJOY_TOP500_URLS = {
      "96": "https://cinejoy.pk/movie/441717-96-2018",
      "1917": "https://cinejoy.pk/movie/530915-1917-2019",
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
      "Where Is the Friend's Home?": "https://cinejoy.pk/movie/30020-where-is-the-friends-home-1987"
};
    window.CINEJOY_TOP500_URLS = CINEJOY_TOP500_URLS;
    window.CINEJOY_TOP100_URLS = CINEJOY_TOP500_URLS; // backwards-compatible alias

    // Top 500 movies strictly according to IMDb rating (with rank as tiebreaker)
    const top500ImdbList = movies.slice()
      .sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0) || (a.rank - b.rank))
      .slice(0, 500);
    const top500ImdbSet = new Set(Object.keys(CINEJOY_TOP500_URLS));
    window.top500ImdbSet = top500ImdbSet;
    window.top100ImdbSet = top500ImdbSet; // backwards-compatible alias

    window.getCinejoyMovieUrl = function(title) {
      return CINEJOY_TOP500_URLS[title] || null;
    };
    window.isTop100ImdbMovie = function(title) {
      return Boolean(CINEJOY_TOP500_URLS[title]);
    };
    window.isTopCinejoyMovie = function(title) {
      return Boolean(CINEJOY_TOP500_URLS[title]);
    };
    window.getCinejoyTop500Titles = function() {
      return Object.keys(CINEJOY_TOP500_URLS);
    };
    window.getCinejoyTop100Titles = function() {
      return Object.keys(CINEJOY_TOP500_URLS);
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

    async function fetchPoster(item, forceSynopsis = false) {
      if (!item) return null;
      const cacheKey = item.type + ':' + item.title;
      if (KNOWN_POSTER_OVERRIDES[cacheKey]) {
        posterCache[cacheKey] = KNOWN_POSTER_OVERRIDES[cacheKey];
        return KNOWN_POSTER_OVERRIDES[cacheKey];
      }
      // All titles are eligible for poster resolution
      if (posterCache[cacheKey] !== undefined && (!forceSynopsis || summaryCache[cacheKey])) return posterCache[cacheKey];
      if (inFlightFetches[cacheKey]) return inFlightFetches[cacheKey];

      inFlightFetches[cacheKey] = (async () => {
        // Concurrency governor (max 6 active requests)
        if (activeFetches >= 6) {
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

        // Pipeline 2: TV Shows -> Free TVMaze Single Search API
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
        }

        // Pipeline 3: Universal Fallback -> Wikipedia Summary API
        try {
          const wikiCandidates = [
            `${queryName}_(${item.year}_TV_series)`,
            `${queryName}_(${item.year}_film)`,
            `${queryName}_(TV_series)`,
            `${queryName}_(film)`,
            `${queryName}_(Indian_TV_series)`,
            `${rawQuery.replace(/ /g, '_')}`,
            queryName
          ];
          for (const cand of wikiCandidates) {
            const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cand.replace(/ /g, '_'))}`;
            const res = await fetch(url);
            if (res.ok) {
              const data = await res.json();
              if (data.type === 'standard') {
                if (data.extract && !summaryCache[cacheKey]) {
                  summaryCache[cacheKey] = data.extract;
                }
                if (data.thumbnail && data.thumbnail.source) {
                  posterCache[cacheKey] = data.thumbnail.source;
                  scheduleSavePosterCache();
                  return data.thumbnail.source;
                }
              }
            }
          }
        } catch (e) {}

        posterCache[cacheKey] = null;
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
        showToast(`Unmarked "${title}" as watched`, "fa-rotate-left", "text-gray-400");
      } else {
        watchedTitles.push(title);
        showToast(`Marked "${title}" as Watched!`, "fa-circle-check", "text-emerald-400");
      }
      updateAllCountersAndViews();
    }

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
        <div class="p-3 flex-1 flex flex-col justify-between gap-1">
          <h3 class="font-bold text-xs sm:text-sm text-white group-hover:text-brand-gold transition-colors line-clamp-1" title="${attrTitle}">${item.cleanName || item.title}</h3>
          <div class="flex items-center justify-between text-xs text-gray-400">
            <span>${item.year}</span>
            <span class="text-brand-gold font-bold flex items-center gap-1"><i class="fa-solid fa-star text-[10px]"></i> ${item.rating}</span>
          </div>
          ${(item.type === 'movie' && window.isTop100ImdbMovie && window.isTop100ImdbMovie(item.title)) ? `
          <div class="pt-2 mt-1 border-t border-white/10" onclick="event.stopPropagation()">
            <a href="${(window.getCinejoyMovieUrl && window.getCinejoyMovieUrl(item.title)) || 'https://cinejoy.pk/search?keyword=' + encodeURIComponent(item.cleanName || item.title)}" target="_blank" rel="noopener noreferrer" class="w-full py-1.5 px-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-black font-extrabold text-[11px] flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition-all">
              <i class="fa-solid fa-circle-play text-xs"></i> <span>Watch Now</span>
            </a>
          </div>` : ''}
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

    function renderHeroSpotlight(idx = 0, animate = true) {
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
      banner.style.background = `linear-gradient(115deg, #07090e 0%, ${theme.c1}cc 55%, ${theme.c2}66 100%)`;

      banner.innerHTML = `
        <!-- JioCinema-style Full-Bleed Poster Backdrop on Mobile + Ambient Backdrop on Desktop -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <img src="${posterUrl}" data-title="${attrTitle}" onerror="this.onerror=null;this.src='${fallbackSvg}';" alt="" class="lazy-poster absolute inset-0 sm:left-auto sm:right-0 sm:w-3/4 w-full h-full object-cover opacity-45 sm:opacity-25 sm:blur-2xl sm:scale-110 transition-all duration-700" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#06080d] via-[#06080d]/80 to-black/20 sm:bg-gradient-to-r sm:from-[#07090e] sm:via-[#07090e]/85 sm:to-transparent"></div>
        </div>

        <!-- Top natural editorial bar (Desktop Only to keep Mobile Hero clean like JioCinema) -->
        <div class="hidden sm:flex relative z-10 items-center justify-between gap-4 text-xs text-gray-400 border-b border-white/[0.07] pb-3.5 mb-6">
          <div class="flex items-center gap-2">
            <span class="inline-block w-2 h-2 rounded-full" style="background:${theme.accent}"></span>
            <span class="font-medium text-gray-200">${getGreetingForTime()}${profName ? `, <strong class="text-white">${profName.replace(/</g, '&lt;')}</strong>` : ''}</span>
            <span class="text-white/20">·</span>
            <span class="text-gray-400">Spotlight ${currentSpotlightIdx + 1} of ${spotlightTitles.length}</span>
          </div>
          <div class="flex items-center gap-3 text-[11px] text-gray-400">
            <button type="button" onclick="openLangCompareModal()" class="text-brand-gold hover:underline font-semibold"><i class="fa-solid fa-scale-unbalanced mr-1"></i>EN vs HI Top 10s</button>
            <span>·</span>
            <span>Press <kbd class="px-1.5 py-0.5 rounded bg-white/10 text-gray-300 font-mono text-[10px]">/</kbd> to search</span>
          </div>
        </div>

        <!-- Main Hero Body + Interactive Poster / Dot Switcher -->
        <div class="relative z-10 w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 sm:gap-8 ${animate ? 'fade-in' : ''}">
          <div class="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6 max-w-3xl w-full">
            <img src="${posterUrl}" data-title="${attrTitle}" onerror="this.onerror=null;this.src='${fallbackSvg}';" alt="${attrTitle}" class="lazy-poster hidden sm:block w-36 md:w-44 rounded-xl border border-white/15 shadow-2xl object-cover poster-aspect shrink-0 cursor-pointer hover:scale-[1.02] transition-transform" onclick="openDetailModal('${escTitle}')" />
            <div class="space-y-2 sm:space-y-3 w-full">
              <div class="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
                <span class="px-2 py-0.5 rounded bg-brand-gold text-black font-extrabold uppercase text-[10px]">Spotlight</span>
                <span class="font-bold uppercase tracking-wide" style="color:${theme.accent}">${item.genre}</span>
                <span class="text-white/30">•</span>
                <span class="text-gray-200 font-semibold">${item.year}</span>
                <span class="text-white/30">•</span>
                <span class="text-brand-gold font-extrabold">★ ${item.rating}</span>
                <span class="text-white/30">•</span>
                <span class="px-2 py-0.5 rounded bg-white/10 text-gray-200 text-[10px] font-semibold">${item.platformName}</span>
              </div>
              <h1 class="text-2xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">${item.cleanName || item.title}</h1>
              <p class="hidden sm:block text-gray-300 font-medium text-sm italic opacity-90">"${spot.tagline}"</p>
              <p class="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-3">${spot.blurb}</p>
              <div class="pt-1 sm:pt-2 flex items-center gap-2 sm:gap-2.5">
                <button type="button" onclick="openDetailModal('${escTitle}')" class="flex-1 sm:flex-initial justify-center px-4 sm:px-5 py-2.5 rounded-xl bg-brand-gold text-black hover:opacity-95 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95">
                  <i class="fa-solid fa-play text-xs"></i> <span>Watch &amp; Details</span>
                </button>
                <button type="button" onclick="toggleWishlist('${escTitle}', event); renderHeroSpotlight(${currentSpotlightIdx}, false);" class="px-3.5 sm:px-4 py-2.5 rounded-xl ${isW ? 'bg-rose-500 text-white border-rose-500' : 'bg-white/10 hover:bg-white/15 text-white border-white/15'} font-bold text-xs sm:text-sm flex items-center gap-1.5 border transition-all">
                  <i class="fa-solid ${isW ? 'fa-check' : 'fa-plus'} text-xs"></i> <span>${isW ? 'Saved' : 'Watchlist'}</span>
                </button>
                <button type="button" onclick="toggleWatched('${escTitle}', event); renderHeroSpotlight(${currentSpotlightIdx}, false);" class="hidden sm:flex px-3.5 py-2.5 rounded-xl ${isSeen ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-white/[0.04] hover:bg-white/[0.1] text-gray-300 border-white/10'} font-medium text-xs sm:text-sm items-center gap-1.5 border transition-all">
                  <i class="fa-solid fa-check text-xs"></i> <span>${isSeen ? 'Watched' : 'Seen'}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- JioCinema-Style Pill Dots on Mobile + Poster Strip Switcher on Desktop -->
          <div class="w-full lg:w-auto flex items-center justify-center lg:justify-end gap-1.5 sm:gap-2 pt-1 sm:pt-0">
            ${spotlightTitles.map((s, i) => {
              const sItem = globalDatabase[s.title] || movies[0];
              const sFb = generateStylizedPosterDataURI(sItem);
              const sPoster = posterCache[sItem.type + ':' + sItem.title] || sFb;
              const active = i === currentSpotlightIdx;
              return `
                <button type="button" onclick="renderHeroSpotlight(${i})" class="sm:hidden h-1.5 rounded-full transition-all ${active ? 'w-6 bg-brand-gold' : 'w-2 bg-white/30'}" aria-label="Slide ${i + 1}"></button>
                <button type="button" onclick="renderHeroSpotlight(${i})" class="hidden sm:block group relative rounded-xl overflow-hidden border transition-all shrink-0 ${active ? 'w-14 sm:w-16 border-brand-gold ring-2 ring-brand-gold/40 -translate-y-1' : 'w-11 sm:w-12 border-white/15 opacity-55 hover:opacity-95'}" title="${s.title.replace(/"/g, '&quot;')}">
                  <img src="${sPoster}" data-title="${sItem.title.replace(/"/g, '&quot;')}" onerror="this.onerror=null;this.src='${sFb}';" class="lazy-poster w-full poster-aspect object-cover" alt="" />
                </button>
              `;
            }).join('')}
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

      if (sort === 'popular') list.sort((a, b) => a.rank - b.rank);
      else if (sort === 'rating_desc') list.sort((a, b) => b.rating - a.rating);
      else if (sort === 'top100_watch') list = list.filter(item => top500ImdbSet.has(item.title)).sort((a, b) => b.rating - a.rating);
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

      if (sort === 'popular') list.sort((a, b) => a.rank - b.rank);
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
      else btn.innerHTML = `<i class="fa-solid fa-plus mr-1.5"></i>Show ${Math.min(CAT_STEP, left)} more of ${left} remaining`;
    }

    function renderCategoriesTab() {
      const genres = Object.keys(categoryData).sort();
      const pillsEl = document.getElementById('genreQuickPills');
      pillsEl.innerHTML = genres.map(g => {
        const theme = genreThemes[g] || genreThemes["Drama"];
        return `<button onclick="document.getElementById('genre-sec-${g}').scrollIntoView({behavior:'smooth'})" class="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 flex items-center gap-2 transition-all">
          <i class="fa-solid ${theme.icon} cat-icon-anim" style="color:${theme.accent}"></i> <span>${g}</span> <span class="text-gray-500">(${categoryData[g].length})</span>
        </button>`;
      }).join('');

      const catList = document.getElementById('categoriesList');
      catList.innerHTML = genres.map(g => {
        const theme = genreThemes[g] || genreThemes["Drama"];
        return `
          <div id="genre-sec-${g}" class="space-y-3 scroll-mt-24">
            <div class="flex items-center justify-between border-b border-white/10 pb-2">
              <h2 class="text-xl font-display font-bold text-white flex items-center gap-2.5">
                <span class="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"><i class="fa-solid ${theme.icon} cat-icon-anim" style="color:${theme.accent}"></i></span>
                <span>${g}</span>
                <span class="text-xs font-normal text-gray-400">(${categoryData[g].length} titles)</span>
              </h2>
            </div>
            <div class="has-arrows">
              <div class="hscroll flex gap-4 overflow-x-auto pb-4 pt-1 snap-x">
                ${categoryData[g].slice(0, CAT_CAP).map(m => createCardHTML(m, true)).join('')}
              </div>
            </div>
            ${categoryData[g].length > CAT_CAP ? `<button id="catmore-${g}" onclick="expandGenre('${g}')" class="mt-1 px-4 py-2 rounded-xl bg-white/5 hover:bg-brand-gold hover:text-black border border-white/10 text-xs font-semibold text-gray-300 transition-all"><i class="fa-solid fa-plus mr-1.5"></i>Show ${Math.min(CAT_STEP, categoryData[g].length - CAT_CAP)} more of ${categoryData[g].length - CAT_CAP} remaining</button>` : ''}
          </div>`;
      }).join('');

      attachThumbObservers(catList);
      catList.querySelectorAll('.hscroll').forEach(addHorizontalArrows);
    }

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
      showToast("Exported complete cinema backup (Watchlist, Watched, Favourites, Capsules & Universes)!", "fa-download", "text-brand-gold");
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
    async function openDetailModal(title) {
      const item = globalDatabase[title];
      if (!item) return;
      const modal = document.getElementById('detailModal');
      const content = document.getElementById('detailModalContent');
      const fallbackSvg = generateStylizedPosterDataURI(item);
      const posterUrl = posterCache[item.type + ':' + item.title] || fallbackSvg;
      const isW = wishlistTitles.includes(item.title);
      const isWatched = watchedTitles.includes(item.title);
      const escTitle = item.title.replace(/'/g, "\\'");
      const userRating = myRatings[item.title] || 0;

      const similar = (categoryData[item.genre] || [])
        .filter(x => x.title !== item.title)
        .slice(0, 4);

      const defaultSynopsis = `${item.cleanName || item.title} (${item.year}) is a critically celebrated ${item.genre.toLowerCase()} ${item.type === 'show' ? 'series' : 'motion picture'} rated ★ ${item.rating} on IMDb. Streamable now on ${item.platformName}.`;
      const cachedSynopsis = summaryCache[item.type + ':' + item.title] || defaultSynopsis;

      content.innerHTML = `
        <div class="flex flex-col sm:flex-row gap-6 p-6 sm:p-8">
          <div class="w-40 sm:w-52 shrink-0 mx-auto sm:mx-0 rounded-2xl overflow-hidden border border-white/15 shadow-xl poster-aspect bg-black">
            <img id="modalPosterImg" src="${posterUrl}" onerror="this.onerror=null;this.src='${fallbackSvg}';" class="w-full h-full object-cover" alt="${item.title}">
          </div>
          <div class="flex-1 space-y-4">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-md bg-brand-gold text-black font-extrabold text-xs">★ ${item.rating}</span>
              <span class="px-2.5 py-0.5 rounded-md bg-white/10 text-gray-200 text-xs font-semibold">#${item.rank} Ranked</span>
              <span class="px-2.5 py-0.5 rounded-md bg-white/10 text-gray-300 text-xs">${item.genre} · ${item.year}</span>
              <span class="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 text-[11px] font-semibold">${item.platformName}</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight">${item.cleanName || item.title}</h2>
            <p id="modalSynopsisText" class="text-xs sm:text-sm text-gray-300 leading-relaxed max-h-36 overflow-y-auto pr-1">${cachedSynopsis}</p>

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

            <!-- Action Buttons -->
            <div class="pt-1 flex flex-wrap gap-2.5">
              <button onclick="toggleWishlist('${escTitle}', event); openDetailModal('${escTitle}');" class="px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${isW ? 'bg-rose-500 text-white' : 'bg-white/10 hover:bg-white/15 text-white border border-white/15'}">
                <i class="fa-solid fa-heart"></i> ${isW ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
              <button onclick="toggleWatched('${escTitle}', event); openDetailModal('${escTitle}');" class="px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${isWatched ? 'bg-emerald-500 text-black' : 'bg-white/10 hover:bg-white/15 text-white border border-white/15'}">
                <i class="fa-solid fa-check"></i> ${isWatched ? 'Marked Watched' : 'Mark Watched'}
              </button>
              <button onclick="toggleFav('${escTitle}', event); openDetailModal('${escTitle}');" class="px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${favTitles.includes(item.title) ? 'bg-brand-gold text-black' : 'bg-white/10 hover:bg-white/15 text-white border border-white/15'}">
                <i class="fa-solid fa-star"></i> ${favTitles.includes(item.title) ? 'Favourited' : 'Favourite'}
              </button>
              <a href="https://www.youtube.com/results?search_query=${encodeURIComponent((item.rawName || item.cleanName) + ' ' + item.year + ' official trailer')}" target="_blank" rel="noopener" class="px-4 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-bold flex items-center gap-2 transition-all">
                <i class="fa-brands fa-youtube"></i> Trailer
              </a>
              ${(item.type === 'movie' && window.isTop100ImdbMovie && window.isTop100ImdbMovie(item.title)) ? `
              <a href="${(window.getCinejoyMovieUrl && window.getCinejoyMovieUrl(item.title)) || 'https://cinejoy.pk/search?keyword=' + encodeURIComponent(item.cleanName || item.title)}" target="_blank" rel="noopener noreferrer" class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all">
                <i class="fa-solid fa-circle-play text-sm"></i> <span>Watch Now on Cinejoy</span>
              </a>` : ''}
            </div>

            <!-- More in Genre -->
            <div class="pt-3 border-t border-white/10">
              <div class="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">More Top Titles in ${item.genre}</div>
              <div class="flex flex-wrap gap-2">
                ${similar.map(s => {
                  const escS = s.title.replace(/'/g, "\\'");
                  return `<button onclick="openDetailModal('${escS}')" class="px-2.5 py-1.5 rounded-lg bg-black/50 hover:bg-brand-gold hover:text-black border border-white/10 text-xs font-medium text-gray-200 transition-colors">
                    ${s.cleanName || s.title} <span class="opacity-70">★${s.rating}</span>
                  </button>`;
                }).join('')}
              </div>
            </div>
          </div>
        </div>
      `;

      modal.classList.remove('hidden');
      modal.classList.add('flex');

      // Fetch poster & synopsis asynchronously if not cached
      const realUrl = await fetchPoster(item);
      const modalImg = document.getElementById('modalPosterImg');
      if (realUrl && modalImg) modalImg.src = realUrl;
      const modalSyn = document.getElementById('modalSynopsisText');
      if (summaryCache[item.type + ':' + item.title] && modalSyn) {
        modalSyn.textContent = summaryCache[item.type + ':' + item.title];
      }
    }

    function closeDetailModal() {
      const modal = document.getElementById('detailModal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }

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
      const initP = document.getElementById('recInitialPrompt'); if (initP) initP.classList.add('hidden'); document.getElementById('recResultBox').classList.remove('hidden');
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
      document.getElementById('rejectCount').textContent = rejectsLeft;
      const rejectBtn = document.getElementById('rejectBtn');
      rejectBtn.disabled = false;

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
