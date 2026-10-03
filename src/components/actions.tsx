import Link from 'next/link';
import type { ReactNode, ButtonHTMLAttributes } from 'react';
export function ListBackLink({href,children}:{href:string;children:ReactNode}) {
 return <Link href={href} className="list-back-link">{children}</Link>;
}
export function TextLink({href,children,className='',external=false}:{href:string;children:ReactNode;className?:string;external?:boolean}) {
 return <Link href={href} className={`text-link ${className}`} {...(external?{target:'_blank',rel:'noreferrer'}:{})}>{children}</Link>;
}
export function ButtonLink({href,children,appearance='solid',className=''}:{href:string;children:ReactNode;appearance?:'solid'|'outline';className?:string}) {
 return <Link href={href} className={`action-button action-${appearance} ${className}`}>{children}</Link>;
}
export function Button({children,appearance='solid',className='',...props}:ButtonHTMLAttributes<HTMLButtonElement>&{appearance?:'solid'|'outline'}) {
 return <button className={`action-button action-${appearance} ${className}`} {...props}>{children}</button>;
}
