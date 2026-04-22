import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "바이너리그의 공식 아카이브. 와썹, 오대리, 깍두기파의 최신 아트워크와 비하인드 씬을 확인하세요.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
