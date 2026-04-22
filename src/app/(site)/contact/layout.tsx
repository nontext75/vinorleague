import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "바이너리그 크루에게 직접 문의하세요. 협업, 라이선싱, 그리고 궁금한 모든 것에 답변해 드립니다.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
