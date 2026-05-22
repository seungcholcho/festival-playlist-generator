import anthropic
import base64
import imghdr
import json
import os

from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

PROMPT = """
이 이미지는 음악 페스티벌 라인업 포스터입니다.
날짜별 아티스트 목록을 추출해서 아래 JSON 형식으로만 응답해주세요.
다른 텍스트나 마크다운 없이 JSON만 출력하세요.

{
  "festival_name": "페스티벌 이름",
  "days": [
    {
      "date": "FRI. JUL 31",
      "artists": ["KHRUANGBIN", "더 발룬티어스", ...]
    }
  ]
}
"""

def get_media_type(image_bytes: bytes) -> str:
    import imghdr, io
    kind = imghdr.what(io.BytesIO(image_bytes))
    mapping = {
        "png": "image/png",
        "jpeg": "image/jpeg",
        "webp": "image/webp",
        "gif": "image/gif"
    }
    return mapping.get(kind, "image/png")

def parse_lineup(image_bytes: bytes) -> dict:
    media_type = get_media_type(image_bytes)
    image_data = base64.b64encode(image_bytes).decode("utf-8")

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": media_type,
                            "data": image_data
                        }
                    },
                    {
                        "type": "text",
                        "text": PROMPT
                    }
                ]
            }
        ]
    )

    return json.loads(response.content[0].text.strip())