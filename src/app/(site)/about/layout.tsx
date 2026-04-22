import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description: "바이너리그의 탄생과 비전. 단순한 캐릭터를 넘어 일상의 에너지가 되는 우리의 이야기를 들어보세요.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
