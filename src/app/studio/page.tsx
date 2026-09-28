import type {Metadata} from 'next';
import { Heading,Body } from '@/components/typography';
import { StatementSection,ServicesSection } from '@/components/editorial-sections';

export const metadata:Metadata={title:'Studio'};

const values=[
  ['Think','목표를 함께 정합니다.','여러 가능성을 살피고, 같은 목표를 향해 가장 적합한 방법을 찾습니다.'],
  ['Mind','새로운 가치를 만듭니다.','브랜드가 가진 가치를 목적에 맞는 디자인으로 표현합니다.'],
  ['Behavior','탐구하고 실험합니다.','익숙한 답에 머무르지 않고, 더 나은 표현과 경험을 찾아갑니다.'],
];

export default function Studio(){
  return <>
    <StatementSection headingAs="h1" title={<>Many minds.<br/>One direction.</>} lead="서로 다른 생각을 모아, 브랜드의 본질을 디자인합니다." studio>
      시대가 바뀌어도 변하지 않는 가치를 찾습니다. 제품의 방향, 사용자의 경험, 브랜드의 표현을 함께 고민하고, 아이디어가 세상에 닿는 마지막 디테일까지 살핍니다.
    </StatementSection>
    <div className="container values-grid">
      {values.map(([label,title,text])=><section key={label}>
        <Body size="small">{label}</Body>
        <Heading scale="compact" language="ko">{title}</Heading>
        <Body>{text}</Body>
      </section>)}
    </div>
    <ServicesSection studio/>
  </>;
}
