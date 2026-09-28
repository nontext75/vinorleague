import {notFound} from 'next/navigation';
import {stories} from '@/lib/content';
import {PageIntro} from '@/components/editorial';
import {Heading,Body} from '@/components/typography';
import {TextLink} from '@/components/actions';
export function generateStaticParams(){return stories.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return{title:stories.find(story=>story.slug===slug)?.title||'Story'};}
export default async function StoryDetail({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const story=stories.find(story=>story.slug===slug);if(!story)notFound();
 return <article className="container page-content article-page"><TextLink href="/news">모든 이야기</TextLink><PageIntro title={story.title} kicker={`Insight · ${story.date}`} className="article-heading" language="ko"/><div className="article-body"><Body strong>{story.summary}</Body>{slug==='design-principles'&&<><Heading scale="compact" language="ko">함께 판단할 수 있는 기준</Heading><Body>원칙이 없으면 피드백은 개인의 취향으로 흘러가기 쉽습니다. 가장 큰 목소리에 따라 방향이 바뀌고, 검토할 때마다 제품도 달라집니다.</Body><Body>몇 가지 분명한 원칙은 팀에 공통의 언어를 줍니다. 새로운 시도를 막지 않으면서도, 아이디어를 같은 기준으로 살펴볼 수 있습니다.</Body><Heading scale="compact" language="ko">실제 선택에 쓰이는 원칙</Heading><Body>쓸모 있는 원칙은 구체적인 디자인 결정에 영향을 줍니다. 어떤 경험을 우선할지, 어려운 상황에서 제품이 어떻게 작동해야 할지 알려줍니다.</Body><Body>원칙을 계속 적용하면 일관성은 단순한 반복이 아니라, 같은 방향으로 내린 결정의 결과가 됩니다.</Body></>}<TextLink href={`https://vinuspread.vercel.app/news/${story.slug}`} external>기존 사이트에서 원문 읽기</TextLink></div></article>;
}
