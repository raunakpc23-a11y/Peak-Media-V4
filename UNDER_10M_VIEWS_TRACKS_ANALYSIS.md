# Granular Catalog Analysis: Language & Low-View Subdivisions

This analysis provides the exact breakdown requested: dividing the catalog by language (English vs. Hindi), isolating the exact number of covers, slowed/reverb edits, extended jukeboxes, karaoke tracks, and properly subdividing the "Various Artists" pool into actual cultural categories.

---

## 1. Overall Catalog Language Distribution
Across the total **4,552 tracks** currently loaded in the vault:
- **English Tracks**: **2,340 tracks** (51.4%)
- **Hindi Tracks**: **2,212 tracks** (48.6%)

---

## 2. Granular Category Breakdown (True Niche & Low-View Tracks)

Rather than treating low-view tracks as a single monolithic block, here is the exact breakdown by type and language:

| Category | Total Count | English | Hindi | Examples in Catalog |
| :--- | :---: | :---: | :---: | :--- |
| **Exact Covers** | **8** | 6 | 2 | *Rockabye (Kullsvik cover)*, *Tu Jaane Naa (Siddharth Khanna cover)*, *Pentatonix - Cheerleader (OMI Cover)* |
| **Slowed, Reverb & Lo-Fi** | **11** | 2 | 9 | *Misery - pupsies (slowed+reverb)*, *Rich Homie Quan - No No No (8D Audio)*, *Dil Kyun Yeh Mera (Slowed+Reverb)* |
| **Jukeboxes & Full Albums** | **25** | 0 | 25 | *Padosan Full Album (35 min)*, *Atif Aslam Greatest Hits Full Album (45 min)*, *Valentine Mashup Non-Stop* |
| **Instrumental & Karaoke** | **5** | 5 | 0 | *Uptown Funk (Instrumental Original)*, *Come What May (Karaoke Piano)*, *Suit & Tie (Karaoke Version)* |
| **Choreography & Dance Practice**| **3** | 2 | 1 | *KATSEYE - Gnarly (Choreography Ver.)*, *Genda Phool (Little Women Choreography)* |
| **Remixes & Club Mashups** | **71** | 36 | 35 | *Eminem - Killer (Remix)*, *Ed Sheeran - Take Me Back To London (Sir Spyro Remix)*, *T-Series Mixtape* |
| **Lyric Videos** | **373** | 222 | 151 | *The Chainsmokers - Closer (Lyric)* (3.1B views), *Sia - Cheap Thrills (Lyrics)* (1.9B views) |

---

## 3. Subdividing "Various Artists" (1,688 Tracks)

The 1,688 tracks labeled "Various Artists" (630 English, 1,058 Hindi) are **not** low-view songs. When decomposed into structural tiers:

1. **Standalone Mainstream Billboard Chartbusters (1,279 tracks - KEEPERS)**
   - Massive multi-hundred-million view hits where playlist scrapers omitted the specific artist string.
   - *English Examples*: Drake – *God's Plan* (1.5B+ views), Drake – *In My Feelings* (300M+ views), Queen – *Bohemian Rhapsody* (1.7B+ views), BTS – *Dynamite* (1.8B+ views).
   - *Verdict*: **Keep intact.**

2. **Bollywood Multi-Artist Film Soundtracks (365 tracks - KEEPERS)**
   - Official T-Series, Zee Music, and Sony Music film songs titled in `Song | Movie | Singers` format.
   - *Hindi Examples*: *Maan Meri Jaan* (King), *Jab Tak* (M.S. Dhoni / Armaan Malik), *Kaun Tujhe*, *Tum Se*.
   - *Verdict*: **Keep intact.**

3. **Embedded Artist Credits (44 tracks - KEEPERS)**
   - Songs where the artist is in the title string (e.g., *Sebastián Yatra, Daddy Yankee - Runaway ft. Jonas Brothers*).
   - *Verdict*: **Keep intact.**

---

## 4. Final Pruning Recommendation
The only songs that genuinely fail the "cultural relevance" test and clutter playlist playback are the **52 true anomalies**:
- The **25 continuous Jukeboxes / Full Albums** (all Hindi)
- The **11 Slowed / Reverb / Lo-Fi edits** (2 English, 9 Hindi)
- The **8 amateur Covers** (6 English, 2 Hindi)
- The **5 Karaoke / Instrumental tracks** (5 English)
- The **3 Choreography / Dance clips** (2 English, 1 Hindi)

Removing or swapping these 52 entries cleans up 100% of the non-song audio without disturbing the 4,500 mainstream singles.
