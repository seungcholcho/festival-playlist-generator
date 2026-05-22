import requests
import os
from pathlib import Path
from dotenv import load_dotenv
import re

load_dotenv()

API_KEY = os.getenv("LAST_FM_API_KEY")
print(f"API_KEY: {API_KEY}")
BASE_URL = "https://ws.audioscrobbler.com/2.0/"

def get_top_tracks(artist: str, limit: int = 3) -> list[str]:
    cleaned = clean_artist_name(artist)
    params = {
        "method": "artist.getTopTracks",
        "artist": cleaned,
        "api_key": API_KEY,
        "format": "json",
        "limit": limit
    }

    res = requests.get(BASE_URL, params=params)
    data = res.json()
    print(f"[{artist}] 응답: {data}")  # 추가

    if "error" in data:
        return []

    tracks = data["toptracks"]["track"]
    return [track["name"] for track in tracks]

def generate_playlist(artists: list[str]) -> dict:
    playlist = []

    for artist in artists:
        tracks = get_top_tracks(artist)
        playlist.append({
            "artist": artist,
            "tracks": tracks
        })

    return {"playlist": playlist}

def clean_artist_name(artist: str) -> str:
    korean = re.search(r'[가-힣ㄱ-ㅎㅏ-ㅣ][가-힣ㄱ-ㅎㅏ-ㅣ\s\w]*', artist)
    if korean:
        return korean.group().strip()
    return artist