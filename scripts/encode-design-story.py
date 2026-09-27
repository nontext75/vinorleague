"""Encode the original design-process film. Requires imageio-ffmpeg."""
from pathlib import Path
import subprocess
import sys
root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(root / 'output' / 'tools'))
import imageio_ffmpeg
for name, filters in [('design-story-desktop','format=yuv420p'),('design-story-mobile','crop=750:1000:760:0,scale=720:960,format=yuv420p')]:
    target = root / 'public' / 'videos' / f'{name}.mp4'
    subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-y','-hide_banner','-loglevel','error','-framerate','24','-i',str(root/'output/design-story-frames/%04d.png'),'-vf',filters,'-an','-c:v','libx264','-crf','22','-preset','medium','-movflags','+faststart',str(target)],check=True)
    print(name,target.stat().st_size,'bytes')
