"""Render a seamless camera-motion loop from the generated sculpture artwork.

Local tooling only: python -m pip install --target output/tools imageio-ffmpeg
Run from the repository root: python scripts/render-hero-video.py
"""
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'output' / 'tools'))
import imageio_ffmpeg

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
source = ROOT / 'public' / 'images' / 'growth-sculpture.webp'
target = ROOT / 'public' / 'videos'
target.mkdir(exist_ok=True)

for name, size, scale, x_range, y_range in [
    ('growth-desktop', (1920, 1080), 2200, 95, 90),
    ('growth-mobile', (720, 960), 1152, 40, 35),
]:
    width, height = size
    # Sine/cosine camera paths return to the same position and velocity at 12s.
    filters = (
        f'scale={scale}:{scale},'
        f"crop={width}:{height}:x='(iw-ow)/2+{x_range}*sin(2*PI*t/12)':"
        f"y='(ih-oh)/2-{y_range}*cos(2*PI*t/12)',"
        'format=yuv420p'
    )
    subprocess.run([
        ffmpeg, '-y', '-hide_banner', '-loglevel', 'error',
        '-loop', '1', '-framerate', '24', '-i', str(source),
        '-t', '12', '-vf', filters, '-an', '-c:v', 'libx264',
        '-preset', 'medium', '-crf', '24', '-movflags', '+faststart',
        str(target / f'{name}.mp4'),
    ], check=True)
    print(name, (target / f'{name}.mp4').stat().st_size, 'bytes')
