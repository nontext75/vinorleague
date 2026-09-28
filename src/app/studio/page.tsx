import type {Metadata} from 'next';
import Image from 'next/image';
import { ServicesSection,ClientsSection } from '@/components/editorial-sections';
import { PageIntro,SplitTitle } from '@/components/editorial';
import { StudioValues } from '@/components/studio-values';

export const metadata:Metadata={title:'Studio'};

export default function Studio(){
  return <>
    <div className="container page-content studio-intro">
      <PageIntro kicker="Studio" title={<SplitTitle first="Many minds." second="One direction."/>} description={<>서로 다른 생각을 모아, 브랜드의 본질을 디자인합니다.<br/>시대가 바뀌어도 변하지 않는 가치를 찾습니다. 제품의 방향, 사용자의 경험, 브랜드의 표현을 함께 고민하고, 아이디어가 세상에 닿는 마지막 디테일까지 살핍니다.</>}/>
    </div>
    <figure className="container studio-photo">
      <Image src="/images/studio-interior.png" alt="자연광이 들어오는 디자인 스튜디오의 작업 테이블" width={1536} height={1024} priority />
    </figure>
    <StudioValues />
    <ServicesSection studio/>
    <ClientsSection />
  </>;
}
