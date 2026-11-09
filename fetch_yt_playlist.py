import urllib.request
import json
import re

url = "https://www.youtube.com/playlist?list=PLJgnCIrpclYY"
req = urllib.request.Request(
    url,
    headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9"
    }
)

try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        
    print("HTML length:", len(html))
    
    # Check title
    title_match = re.search(r'<title>(.*?)</title>', html)
    if title_match:
        print("Page Title:", title_match.group(1))

    # Look for ytInitialData
    data_match = re.search(r'var ytInitialData\s*=\s*({.*?});</script>', html)
    if not data_match:
        data_match = re.search(r'window\["ytInitialData"\]\s*=\s*({.*?});', html)
        
    if data_match:
        print("Found ytInitialData!")
        data = json.loads(data_match.group(1))
        # Save json for inspection
        with open("yt_playlist_raw.json", "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print("Saved yt_playlist_raw.json")
    else:
        print("ytInitialData not found via regex, searching for videos...")
        # fallback regex for videoId and title
        video_ids = re.findall(r'/watch\?v=([a-zA-Z0-9_-]{11})', html)
        print("Video IDs found:", len(set(video_ids)))
except Exception as e:
    print("Error:", e)
