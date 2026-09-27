"""Encode frames rendered by cinematic-hero.html into web-friendly silent loops."""
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'output' / 'tools'))
import imageio_ffmpeg

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
frames = ROOT / 'output' / 'video-frames' / '%04d.png'
target = ROOT / 'public' / 'videos'
target.mkdir(exist_ok=True)
for name, filters in [
    ('cinematic-desktop', 'format=yuv420p'),
    ('cinematic-mobile', 'crop=674:900:520:0,scale=720:960,format=yuv420p'),
]:
    subprocess.run([
        ffmpeg, '-y', '-hide_banner', '-loglevel', 'error',
        '-framerate', '24', '-i', str(frames), '-vf', filters,
        '-an', '-c:v', 'libx264', '-crf', '21', '-preset', 'medium',
        '-movflags', '+faststart', str(target / f'{name}.mp4'),
    ], check=True)
    print(name, (target / f'{name}.mp4').stat().st_size, 'bytes')
