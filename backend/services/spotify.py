
import requests
import os
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")

def get_access_token(code: str) -> str:
    res = requests.post(
        "https://accounts.spotify.com/api/token",
        data={
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": REDIRECT_URI,
        },
        auth=(CLIENT_ID, CLIENT_SECRET)
    )
    data = res.json()
    print(f"token 응답: {data}")
    print(f"scope: {data.get('scope')}")
    return data["access_token"]

def get_user_id(access_token: str) -> str:
    res = requests.get(
        "https://api.spotify.com/v1/me",
        headers={"Authorization": f"Bearer {access_token}"}
    )
    return res.json()["id"]

def create_playlist(access_token: str, user_id: str, name: str) -> str:
    res = requests.post(
        f"https://api.spotify.com/v1/me/playlists",  # users/{id} → me로 변경
        headers={
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        },
        json={"name": name, "public": False}
    )
    print(f"playlist 생성 응답: {res.json()}")
    return res.json()["id"]

def search_track(access_token: str, artist: str, track: str) -> str | None:
    res = requests.get(
        "https://api.spotify.com/v1/search",
        headers={"Authorization": f"Bearer {access_token}"},
        params={"q": f"artist:{artist} track:{track}", "type": "track", "limit": 1}
    )
    data = res.json()
    print(f"[{artist} - {track}] 검색 응답: {data}")  # 추가
    items = data["tracks"]["items"]
    return items[0]["uri"] if items else None

def add_tracks(access_token: str, playlist_id: str, uris: list[str]):
    res = requests.post(
        f"https://api.spotify.com/v1/playlists/{playlist_id}/items",  # tracks → items
        headers={
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        },
        json={"uris": uris}
    )
    print(f"add_tracks 응답: {res.json()}")
    
def export_to_spotify(code: str, playlist_name: str, playlist: list[dict]) -> str:
    access_token = get_access_token(code)
    user_id = get_user_id(access_token)
    playlist_id = create_playlist(access_token, user_id, playlist_name)

    uris = []
    for item in playlist:
        for track in item["tracks"]:
            uri = search_track(access_token, item["artist"], track)
            if uri:
                uris.append(uri)

    if uris:
        add_tracks(access_token, playlist_id, uris)

    return playlist_id

def export_to_spotify_with_token(access_token: str, playlist_name: str, playlist: list[dict]) -> str:
    user_id = get_user_id(access_token)
    playlist_id = create_playlist(access_token, user_id, playlist_name)

    uris = []
    for item in playlist:
        for track in item["tracks"]:
            uri = search_track(access_token, item["artist"], track)
            if uri:
                uris.append(uri)

    print(f"최종 uris: {uris}")  # 추가
    if uris:
        add_tracks(access_token, playlist_id, uris)

    return playlist_id