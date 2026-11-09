const fs = require('fs');

const text = `Everyday Normal Guy 2
Bon Jovi - You Give Love A Bad Name
Yeh Tune Kya Kia by Javed Bashir
Teri Yaadon Mein (Full Song) | The Killer
Padosan | Full Album | Sunil Dutt, Saira Banu, Kishore Kumar | Mere Samnewali Khidki Mein| Kehna Hai
Dekha Ek Khwab Song | Silsila | Amitabh Bachchan, Rekha | Kishore Kumar, Lata Mangeshkar, Shiv-Hari
Lyrical | Bulleya Song with Lyrics | Sultan | Salman, Anushka, Vishal & Shekhar, Irshad Kamil, Papon
A.R. Rahman - Luka Chuppi Best Video|Rang De Basanti|Aamir Khan|Lata Mangeshkar|Soha Ali
Rockstar | Naadaan Parindey | Official A.R.Rahman HD
The Local Train - Aaoge Tum Kabhi (Official)
Breathless   Shankar Mahadevan Full Version !!!
The Local Train - Aalas Ka Pedh - Choo Lo (Official Audio)
Charka - Mukhtar Sahota & Wadali's - Unpredictable
West Virginia Polka
ROCKSTAR: Kun Faya Kun (Full Video Song) | Ranbir Kapoor | A.R. Rahman, Javed Ali, Mohit Chauhan
Justh - Chor (Official Music Video)
Which of the Pickwick Triplets Did It? (From "Only Murders in the Building: Season 3")
Tom Odell - Another Love (Official Video)
Apna Bana Le - Bhediya | Varun Dhawan, Kriti Sanon| Sachin-Jigar, Arijit Singh, Amitabh Bhattacharya
Savera
Hanumankind - Go To Sleep ft. Parimal Shais (Official Music Video) | DefJam India
Main Zindagi Ka Saath Nibhaata - Hum Dono - Mohd Rafi - Dev Anand - HD
Ashe - Moral of the Story (Official Audio)
*NSYNC - Bye Bye Bye (Official Video)
Main Koi Aisa Geet Gaoon  | Yes Boss | Shahrukh | 90's song | Abhijeet
Kanye West - Bound 2
Ishq Hai (Official Music Video) | Mismatched Season 3 | A Netflix Series | Anurag Saikia
O Meri Laila - Lyrical | Laila Majnu | Jyotica Tangri | Avinash Tiwary & Tripti Dimri
Do Patti: Raanjhan (Song) Kriti Sanon, Shaheer Sheikh | Parampara Tandon | Sachet-Parampara,Kausar M
A.R. Rahman - Raanjhanaa (Lyric Video)
There Is a Light That Never Goes Out (2011 Remaster)
Prateek Kuhad - Co2 (Official Audio)
Mat Kar Maya Ko Ahankar : Neeraj Arya's Kabir Cafe
A.R. Rahman - O Paalanhaare | Lagaan | Aamir Khan | Lata Mangeshkar | Udit Narayan
Main Chali Main Chali - Lata Mangeshkar & Asha Bhosle's Superhit Duet - Padosan
OneRepublic - Rescue Me
tadpaoge tadpa lo hum tadap tadap _Barkha1957_ShubhaKhote &Nanda_ Lata_Rajinder_Chitragupt _ a trib.
Akon - Smack That (Official Music Video) ft. Eminem
Akon - Lonely (Official Music Video)
Rocky Road to Dublin | Sinners (Original Motion Picture Soundtrack)
Sinners 2025 Soundtrack | Will Ye Go, Lassie Go? – Lola Kirke, Peter Dreams | Original Score |
The Black Eyed Peas - I Gotta Feeling (Official Music Video)
Noah Kahan - Stick Season (Lyric Video)
Touch The Sky
The Living Tombstone - It's Been So Long (Five Nights at Freddy's 2) LYRICS
Five Nights at Freddy's 1 Song - The Living Tombstone
The Living Tombstone - I Can't Fix You (LYRICS)
Five Nights at Freddy's 3 Song (Feat. EileMonty & Orko) - Die In A Fire (FNAF3)  - Living Tombstone
Djo - End Of Beginning (Official Audio)
Evergreen (Original Audio) Richy Mitch & The Coal Miners
Gigi Perez - Sailor Song [Official Audio]
Benson Boone - Beautiful Things (Official Music Video)
Mark Ambor - Belong Together (Official Visualizer)
Vance Joy - Riptide (Lyrics)
Alex Warren - Ordinary (Official Video)
sombr - back to friends (official video)
Rosa Linn - Snap - Armenia 🇦🇲 - Official Music Video - Eurovision 2022
Daylight
Noah Kahan - Dial Drunk (Official Lyric Video)
Ruth B. - Dandelions (Lyrics)
FNAF SISTER LOCATION Song by JT Music - "Join Us For A Bite" [SFM]
JVKE - her (official lyric video)
Ghost - Mary On A Cross (Official Audio)
AURORA - Runaway
sapientdream - Pastlives (lyrics)
Stephen Sanchez - "Until I Found You" (Official Audio)
blue
I Wanna Be Yours
One Direction - Night Changes
Gym Class Heroes: Stereo Hearts ft. Adam Levine [OFFICIAL VIDEO]
Lord Huron - The Night We Met (Official Lyric Video)
somewhere only we know - rhianne (cover)
Famy - Ava LYRICS
New West - Those Eyes
Christina Perri - A Thousand Years [Official Music Video]
Lady Gaga, Bruno Mars - Die With A Smile (Lyrics)
Benson Boone -  In the Stars (Official Lyric Video)
Ricky Montgomery - Line Without a Hook (Official Lyric Video)
Whenever, Wherever
Baby Blue (Remastered 2010)
Misery. - pupsies (slowed + reverb) 
Somethin' Stupid
Something Stupid (From "Better Call Saul")`;

const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
console.log('EXACT COUNT:', lines.length);
lines.forEach((l, i) => console.log(`${i+1}: ${l}`));
