import type {ReactNode} from 'react';
export function FormField({label,required=false,children}:{label:string;required?:boolean;children:ReactNode}){return <label className="form-field">{label}{required&&<span> *</span>}{children}</label>;}
