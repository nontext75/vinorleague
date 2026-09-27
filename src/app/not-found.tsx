import Link from 'next/link';
export default function NotFound() { return <section className="container page-content page-heading"><p>404</p><h1>Lost your way?</h1><p className="page-description">페이지를 찾을 수 없습니다.</p><Link className="btn primary-button" href="/">홈으로 돌아가기</Link></section>; }
