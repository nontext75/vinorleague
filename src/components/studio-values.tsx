import { Heading, Body } from './typography';
import { SectionHeader } from './editorial';

const values = [
  { label: 'Think', title: '목표를 함께 정합니다.', text: '여러 가능성을 살피고, 같은 목표를 향해 가장 적합한 방법을 찾습니다.', quote: 'Set a shared goal and choose the best path.' },
  { label: 'Mind', title: '새로운 가치를 만듭니다.', text: '브랜드가 가진 가치를 목적에 맞는 디자인으로 표현합니다.', quote: 'Create new value for a more beautiful today.' },
  { label: 'Behavior', title: '탐구하고 실험합니다.', text: '익숙한 답에 머무르지 않고, 더 나은 표현과 경험을 찾아갑니다.', quote: 'Explore, experiment, and enjoy the challenge.' },
];

export function StudioValues() {
  return <section className="container studio-values" aria-labelledby="studio-values-title">
    <SectionHeader id="studio-values-title" kicker="How we think" title="A clear point of view." />
    <div className="values-grid">
      {values.map(({ label, title, text, quote }) => <section key={label}>
        <Body size="small">{label}</Body>
        <Heading scale="compact" language="ko">{title}</Heading>
        <Body>{text}</Body>
        <Body size="small" className="studio-value-quote">{quote}</Body>
      </section>)}
    </div>
  </section>;
}
