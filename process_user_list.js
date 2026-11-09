const fs = require('fs');

const raw = `Everyday Normal Guy 2 - https://www.youtube.com/watch?v=GmG4X9PGOXs
Bon Jovi - You Give Love A Bad Name - https://www.youtube.com/watch?v=KrZHPOeOxQQ
Yeh Tune Kya Kia by Javed Bashir - https://www.youtube.com/watch?v=mt-5ZbKqiDc
Teri Yaadon Mein (Full Song) | The Killer - https://www.youtube.com/watch?v=8UjuVi_-dvc
Padosan | Full Album | Sunil Dutt, Saira Banu, Kishore Kumar | Mere Samnewali Khidki Mein| Kehna Hai - https://www.youtube.com/watch?v=A3DfWw9MKZM
Dekha Ek Khwab Song | Silsila | Amitabh Bachchan, Rekha | Kishore Kumar, Lata Mangeshkar, Shiv-Hari - https://www.youtube.com/watch?v=7dO_MS9tZ5E
Lyrical | Bulleya Song with Lyrics | Sultan | Salman, Anushka, Vishal & Shekhar, Irshad Kamil, Papon - https://www.youtube.com/watch?v=_51KXfwcPMs
A.R. Rahman - Luka Chuppi Best Video|Rang De Basanti|Aamir Khan|Lata Mangeshkar|Soha Ali - https://www.youtube.com/watch?v=FFpgYjL2aJo
Rockstar | Naadaan Parindey | Official A.R.Rahman HD - https://www.youtube.com/watch?v=HVyqSG-0kl8
The Local Train - Aaoge Tum Kabhi (Official) - https://www.youtube.com/watch?v=i96UO8-GFvw
Breathless   Shankar Mahadevan Full Version !!! - https://www.youtube.com/watch?v=W15KUnxvZ7A
The Local Train - Aalas Ka Pedh - Choo Lo (Official Audio) - https://www.youtube.com/watch?v=sFMRqxCexDk
Charka - Mukhtar Sahota & Wadali's - Unpredictable - https://www.youtube.com/watch?v=hakbF6uijas
West Virginia Polka - https://www.youtube.com/watch?v=rKdc4Oz84lM
ROCKSTAR: Kun Faya Kun (Full Video Song) | Ranbir Kapoor | A.R. Rahman, Javed Ali, Mohit Chauhan - https://www.youtube.com/watch?v=T94PHkuydcw
Justh - Chor (Official Music Video) - https://www.youtube.com/watch?v=Gg48H-lrZHo
Which of the Pickwick Triplets Did It? (From "Only Murders in the Building: Season 3") - https://www.youtube.com/watch?v=aeKwyK8SRtI
Tom Odell - Another Love (Official Video) - https://www.youtube.com/watch?v=MwpMEbgC7DA
Apna Bana Le - Bhediya | Varun Dhawan, Kriti Sanon| Sachin-Jigar, Arijit Singh, Amitabh Bhattacharya - https://www.youtube.com/watch?v=ElZfdU54Cp8
Savera - https://www.youtube.com/watch?v=SC2sYyq0Zog
Hanumankind - Go To Sleep ft. Parimal Shais (Official Music Video) | DefJam India - https://www.youtube.com/watch?v=uXNEN-hGkZU
Main Zindagi Ka Saath Nibhaata - Hum Dono - Mohd Rafi - Dev Anand - HD - https://www.youtube.com/watch?v=ZwDvIZA-H9A
Ashe - Moral of the Story (Official Audio) - https://www.youtube.com/watch?v=WQq98YPV8yk
*NSYNC - Bye Bye Bye (Official Video) - https://www.youtube.com/watch?v=Eo-KmOd3i7s
Main Koi Aisa Geet Gaoon  | Yes Boss | Shahrukh | 90's song | Abhijeet - https://www.youtube.com/watch?v=76KtfFpogbw
Kanye West - Bound 2 - https://www.youtube.com/watch?v=BBAtAM7vtgc
Ishq Hai (Official Music Video) | Mismatched Season 3 | A Netflix Series | Anurag Saikia - https://www.youtube.com/watch?v=BcSejVIxB0E
O Meri Laila - Lyrical | Laila Majnu | Jyotica Tangri | Avinash Tiwary & Tripti Dimri - https://www.youtube.com/watch?v=ThPinA3THas
Do Patti: Raanjhan (Song) Kriti Sanon, Shaheer Sheikh | Parampara Tandon | Sachet-Parampara,Kausar M - https://www.youtube.com/watch?v=UCTzqlcar18
A.R. Rahman - Raanjhanaa (Lyric Video) - https://www.youtube.com/watch?v=OsTGp5n6w5E
There Is a Light That Never Goes Out (2011 Remaster) - https://www.youtube.com/watch?v=3r-qDvD3F3c
Prateek Kuhad - Co2 (Official Audio) - https://www.youtube.com/watch?v=U2SVCCENLjE
Mat Kar Maya Ko Ahankar : Neeraj Arya's Kabir Cafe - https://www.youtube.com/watch?v=fqix-11kMnY
A.R. Rahman - O Paalanhaare | Lagaan | Aamir Khan | Lata Mangeshkar | Udit Narayan - https://www.youtube.com/watch?v=kbMinfmC3E0
Main Chali Main Chali - Lata Mangeshkar & Asha Bhosle's Superhit Duet - Padosan - https://www.youtube.com/watch?v=SlwrHamGoIM
OneRepublic - Rescue Me - https://www.youtube.com/watch?v=Nym5stAJAt8
tadpaoge tadpa lo hum tadap tadap _Barkha1957_ShubhaKhote &Nanda_ Lata_Rajinder_Chitragupt _ a trib. - https://www.youtube.com/watch?v=qQFz0EN3wLM
Akon - Smack That (Official Music Video) ft. Eminem - https://www.youtube.com/watch?v=bKDdT_nyP54
Akon - Lonely (Official Music Video) - https://www.youtube.com/watch?v=6EEW-9NDM5k
Rocky Road to Dublin | Sinners (Original Motion Picture Soundtrack) - https://www.youtube.com/watch?v=Iapw_hbyBjE
Sinners 2025 Soundtrack | Will Ye Go, Lassie Go? – Lola Kirke, Peter Dreams | Original Score | - https://www.youtube.com/watch?v=rFDl_Wb5pJ8
The Black Eyed Peas - I Gotta Feeling (Official Music Video) - https://www.youtube.com/watch?v=uSD4vsh1zDA
Noah Kahan - Stick Season (Lyric Video) - https://www.youtube.com/watch?v=iWG6apzIWAk
Touch The Sky - https://www.youtube.com/watch?v=B95OUKk7alM
The Living Tombstone - It's Been So Long (Five Nights at Freddy's 2) LYRICS - https://www.youtube.com/watch?v=3ijUn5hi8kc
Five Nights at Freddy's 1 Song - The Living Tombstone - https://www.youtube.com/watch?v=l18A5BOTlzE
The Living Tombstone - I Can't Fix You (LYRICS) - https://www.youtube.com/watch?v=2e7W6qJZVT0
Five Nights at Freddy's 3 Song (Feat. EileMonty & Orko) - Die In A Fire (FNAF3)  - Living Tombstone - https://www.youtube.com/watch?v=AibtyCAhyQE
Djo - End Of Beginning (Official Audio) - https://www.youtube.com/watch?v=xy3AcmW0lrQ
Evergreen (Original Audio) Richy Mitch & The Coal Miners - https://www.youtube.com/watch?v=h2BIuhiL4o0
Gigi Perez - Sailor Song [Official Audio] - https://www.youtube.com/watch?v=m0NZ-aH0G1g
Benson Boone - Beautiful Things (Official Music Video) - https://www.youtube.com/watch?v=Oa_RSwwpPaA
Mark Ambor - Belong Together (Official Visualizer) - https://www.youtube.com/watch?v=r0c9Q21AfLA
Vance Joy - Riptide (Lyrics) - https://www.youtube.com/watch?v=lYoWuaw5nSk
Alex Warren - Ordinary (Official Video) - https://www.youtube.com/watch?v=u2ah9tWTkmk
sombr - back to friends (official video) - https://www.youtube.com/watch?v=c8zq4kAn_O0
Rosa Linn - Snap - Armenia 🇦🇲 - Official Music Video - Eurovision 2022 - https://www.youtube.com/watch?v=gVqGKkm7xBE
Daylight - https://www.youtube.com/watch?v=v8m1wqCfZAg
Noah Kahan - Dial Drunk (Official Lyric Video) - https://www.youtube.com/watch?v=m9Kev73C2cc
Ruth B. - Dandelions (Lyrics) - https://www.youtube.com/watch?v=WgTMeICssXY
FNAF SISTER LOCATION Song by JT Music - "Join Us For A Bite" [SFM] - https://www.youtube.com/watch?v=rLeQSd7R-jU
JVKE - her (official lyric video) - https://www.youtube.com/watch?v=f5-IY_Ja1RM
Ghost - Mary On A Cross (Official Audio) - https://www.youtube.com/watch?v=k5mX3NkA7jM
AURORA - Runaway - https://www.youtube.com/watch?v=d_HlPboLRL8
sapientdream - Pastlives (lyrics) - https://www.youtube.com/watch?v=-TXtyYZIiWc
Stephen Sanchez - "Until I Found You" (Official Audio) - https://www.youtube.com/watch?v=MlThQTo6D8A
blue - https://www.youtube.com/watch?v=6pQcD3xKAtA
I Wanna Be Yours - https://www.youtube.com/watch?v=nyuo9-OjNNg
One Direction - Night Changes - https://www.youtube.com/watch?v=syFZfO_wfMQ
Gym Class Heroes: Stereo Hearts ft. Adam Levine [OFFICIAL VIDEO] - https://www.youtube.com/watch?v=T3E9Wjbq44E
Lord Huron - The Night We Met (Official Lyric Video) - https://www.youtube.com/watch?v=wGF7PswOENQ
somewhere only we know - rhianne (cover) - https://www.youtube.com/watch?v=3oxjuUFj13w
Famy - Ava LYRICS - https://www.youtube.com/watch?v=9xmlnbmoOwM
New West - Those Eyes - https://www.youtube.com/watch?v=b_CpWmkhwq0
Christina Perri - A Thousand Years [Official Music Video] - https://www.youtube.com/watch?v=rtOvBOTyX00
Lady Gaga, Bruno Mars - Die With A Smile (Lyrics) - https://www.youtube.com/watch?v=zgaCZOQCpp8
Benson Boone -  In the Stars (Official Lyric Video) - https://www.youtube.com/watch?v=2n5GKLdrTfk
Ricky Montgomery - Line Without a Hook (Official Lyric Video) - https://www.youtube.com/watch?v=8JW6qzPCkE8
Whenever, Wherever - https://www.youtube.com/watch?v=fFW91xwQFXk
Baby Blue (Remastered 2010) - https://www.youtube.com/watch?v=33oAuvbRg-c
Misery. - pupsies (slowed + reverb)  - https://www.youtube.com/watch?v=b5VidSdC-ss
Somethin' Stupid - https://www.youtube.com/watch?v=LWXUdqvVO8Y
Something Stupid (From "Better Call Saul") - https://www.youtube.com/watch?v=F8dKVbP1Nzo
Earrings - https://www.youtube.com/watch?v=BI9HQCzpDgQ
Unwritten (Manny Marroquin Mix) - https://www.youtube.com/watch?v=dxB6Gqg26Kw
It's Not Like I Like You!! - https://www.youtube.com/watch?v=JVoxuINpizo
Teenage Dirtbag (2020) - https://www.youtube.com/watch?v=hlZdBaG8Kjg
Impostor Syndrome - https://www.youtube.com/watch?v=GwSSrwryxN0
Harvey - https://www.youtube.com/watch?v=T0Ry1m0Blug
Lover Girl - https://www.youtube.com/watch?v=Q8TFOBdXZj0
Dial Drunk - https://www.youtube.com/watch?v=revC5NkH5_I
Zaalima - https://www.youtube.com/watch?v=eXkHvT--DBU
Bulleya (From "Sultan") - https://www.youtube.com/watch?v=1b9poX5k7zo
O'Meri Laila - https://www.youtube.com/watch?v=KdRPDNDNho0
I Wonder - https://www.youtube.com/watch?v=MxEjnYdfLXU
Call Me Maybe - https://www.youtube.com/watch?v=k6jscLH3p2g
Kabira (Encore) - https://www.youtube.com/watch?v=cG4ME1stMS4
Viva La Vida - https://www.youtube.com/watch?v=ALsvdSA9tOU
her - https://www.youtube.com/watch?v=xITJ35Kwpv4
Tu Chahiye - https://www.youtube.com/watch?v=vl8YTnx3gso
I Want It That Way - https://www.youtube.com/watch?v=LwkrXybZ1uo
Bye Bye Bye - https://www.youtube.com/watch?v=fxHjlCBHuzA
Subhanallah - https://www.youtube.com/watch?v=pnJriqNxpcc
Daddy Cop (From the TV Show "The Rookie") - https://www.youtube.com/watch?v=qFmrO47hY9Y
I Thought I Saw Your Face Today - https://www.youtube.com/watch?v=HJstyRBLqBQ
Heaven Knows I'm Miserable Now (2011 Remaster) - https://www.youtube.com/watch?v=10z6-vQm23w`;

const lines = raw.trim().split('\n').map(l => l.trim()).filter(Boolean);
console.log('Total songs in user message:', lines.length);

const parsed = lines.map((line, idx) => {
  const parts = line.split(' - https://');
  const title = parts[0].trim();
  const url = parts[1] ? 'https://' + parts[1].trim() : '';
  const videoIdMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  const videoId = videoIdMatch ? videoIdMatch[1] : '';
  return { id: idx + 1, title, url, videoId };
});

fs.writeFileSync('user_104_playlist.json', JSON.stringify(parsed, null, 2), 'utf8');
console.log('Successfully written user_104_playlist.json!');
console.log('First:', parsed[0]);
console.log('Last:', parsed[parsed.length - 1]);
