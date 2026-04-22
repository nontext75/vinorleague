import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Wallpapers",
  description: "바이너리그의 감성이 담긴 고해상도 디지털 스킨. 모바일 기기에 최적화된 배경화면을 만나보세요.",
};

export default function WallpapersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
