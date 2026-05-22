from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
from services.vision import parse_lineup
from services.lastfm import generate_playlist
from services.spotify import get_access_token, export_to_spotify_with_token

router = APIRouter()

class PlaylistRequest(BaseModel):
    artists: list[str]

class TokenRequest(BaseModel):
    code: str

class SpotifyExportRequest(BaseModel):
    access_token: str
    playlist_name: str
    playlist: list[dict]

@router.post("/parse-lineup")
async def parse_lineup_endpoint(file: UploadFile = File(...)):
    image_bytes = await file.read()
    data = parse_lineup(image_bytes)
    return data

@router.post("/generate-playlist")
async def generate_playlist_endpoint(req: PlaylistRequest):
    data = generate_playlist(req.artists)
    return data

@router.post("/spotify/token")
async def spotify_token(req: TokenRequest):
    token = get_access_token(req.code)
    return {"access_token": token}

@router.post("/export/spotify")
async def export_spotify(req: SpotifyExportRequest):
    playlist_id = export_to_spotify_with_token(req.access_token, req.playlist_name, req.playlist)
    return {"playlist_id": playlist_id, "url": f"https://open.spotify.com/playlist/{playlist_id}"}


from services.youtube import get_access_token as get_youtube_token, export_to_youtube

class YoutubeTokenRequest(BaseModel):
    code: str

class YoutubeExportRequest(BaseModel):
    access_token: str
    playlist_name: str
    playlist: list[dict]

@router.post("/youtube/token")
async def youtube_token(req: YoutubeTokenRequest):
    token = get_youtube_token(req.code)
    return {"access_token": token}

@router.post("/export/youtube")
async def export_youtube(req: YoutubeExportRequest):
    playlist_id = export_to_youtube(req.access_token, req.playlist_name, req.playlist)
    return {"playlist_id": playlist_id, "url": f"https://music.youtube.com/playlist?list={playlist_id}"}