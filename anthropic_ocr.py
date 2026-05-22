import anthropic
import base64
import json
from pathlib import Path
import imghdr
from dotenv import load_dotenv
import os

load_dotenv()
client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
BASE_DIR = Path(__file__).resolve().parent
img_path = BASE_DIR / "img" / "pentaport2026.png"

# 이미지 형식 자동 감지
def get_media_type(image_path):
    kind = imghdr.what(image_path)
    mapping = {
        "png": "image/png",
        "jpeg": "image/jpeg",
        "webp": "image/webp",
        "gif": "image/gif"
    }
    return mapping.get(kind, "image/png")

with open(img_path, "rb") as f:
    image_data = base64.b64encode(f.read()).decode("utf-8")

media_type = get_media_type(img_path)
print(f"감지된 이미지 형식: {media_type}")  # 확인용

prompt = """
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
                        "media_type": media_type,  # 자동 감지된 형식 사용
                        "data": image_data
                    }
                },
                {
                    "type": "text",
                    "text": prompt
                }
            ]
        }
    ]
)

data = json.loads(response.content[0].text.strip())

print(f"페스티벌: {data['festival_name']}\n")
for day in data['days']:
    print(f"[{day['date']}]")
    for artist in day['artists']:
        print(f"  - {artist}")