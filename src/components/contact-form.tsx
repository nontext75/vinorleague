'use client';
import { useState } from 'react';
import { ArrowUpRight, Copy, Check } from '@phosphor-icons/react';
import { Button } from './actions';
import { FormField } from './form-field';
import { Body } from './typography';

export function ContactForm() {
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  function prepare(form: HTMLFormElement) {
    const data = new FormData(form);
    return `회사: ${data.get('company') || '미입력'}\n담당자: ${data.get('name')}\n이메일: ${data.get('email')}\n연락처: ${data.get('phone') || '미입력'}\n분야: ${data.getAll('service').join(', ') || '상담 필요'}\n예산: ${data.get('budget')}\n\n${data.get('details')}`;
  }
  return <form className="inquiry-form" data-reveal-children onSubmit={event => { event.preventDefault(); const form = event.currentTarget; const data = new FormData(form); window.location.href = `mailto:vinus@vinus.co.kr?subject=${encodeURIComponent(`[프로젝트 문의] ${data.get('company') || data.get('name')}`)}&body=${encodeURIComponent(prepare(form))}`; setMessage('메일 앱에서 내용을 확인하고 전송해주세요. 앱이 열리지 않으면 내용을 복사해 vinus@vinus.co.kr로 보내주세요.'); }}>
    <fieldset><legend>어떤 작업을 함께할까요?</legend><div className="service-options">{['웹사이트', '모바일 앱', '브랜딩', '캐릭터', '편집 디자인', '기타'].map(service => <label key={service}><input type="checkbox" name="service" value={service} className="checkbox checkbox-sm" /><span>{service}</span></label>)}</div></fieldset>
    <div className="form-grid" data-reveal-children><FormField label="회사명"><input name="company" autoComplete="organization" placeholder="회사 또는 브랜드 이름" maxLength={100} className="input" /></FormField><FormField label="담당자 이름" required><input name="name" autoComplete="name" placeholder="성함" required maxLength={80} className="input" /></FormField><FormField label="이메일" required><input name="email" type="email" autoComplete="email" placeholder="hello@company.com" required className="input" /></FormField><FormField label="연락처"><input name="phone" type="tel" autoComplete="tel" placeholder="010-0000-0000" maxLength={40} className="input" /></FormField></div>
    <FormField label="예상 예산"><select className="select" name="budget" defaultValue="상담 후 결정"><option>상담 후 결정</option><option>500만 원 미만</option><option>500만–1,000만 원</option><option>1,000만–3,000만 원</option><option>3,000만 원 이상</option></select></FormField>
    <FormField label="프로젝트 이야기" required><textarea name="details" className="textarea" placeholder="만들고 싶은 것, 필요한 작업, 예상 일정을 편하게 알려주세요." required minLength={10} maxLength={2500} rows={5} /></FormField>
    <Body size="small" className="form-note">작성한 내용을 메일 앱으로 전달합니다. 자료는 메일에 첨부해주세요.</Body><div className="form-actions"><Button type="submit">메일로 문의하기 <ArrowUpRight size={20} /></Button><Button type="button" appearance="outline" onClick={async event => { const form = event.currentTarget.form!; if (!form.reportValidity()) return; try { await navigator.clipboard.writeText(prepare(form)); setCopied(true); setMessage('문의 내용을 복사했습니다. vinus@vinus.co.kr로 보내주세요.'); } catch { setMessage('복사할 수 없습니다. 메일로 문의하기를 이용해주세요.'); } }}>{copied ? <Check size={18} /> : <Copy size={18} />}{copied ? '복사 완료' : '내용 복사'}</Button></div><p className="form-status" role="status">{message}</p>
  </form>;
}
