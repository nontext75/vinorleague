import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commission",
  description: "당신만의 캐릭터 세계를 만듭니다. 바이너리그의 제작 의뢰 서비스와 포트폴리오를 확인하세요.",
};

export default function CommissionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
