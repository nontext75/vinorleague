import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { COMMISSION_EMAIL } from "@/lib/links";
import { supabaseAdmin } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, honeypot } = body;

    if (honeypot) {
      return NextResponse.json({ message: "ok" }, { status: 200 });
    }

    let subject: string;
    let html: string;

    if (type === "partnership") {
      const { company, name, email, phone, inquiryType, proposal } = body;
      if (!company || !name || !email || !inquiryType || !proposal) {
        return NextResponse.json({ message: "필수 항목을 모두 입력해 주세요." }, { status: 400 });
      }
      subject = `[제휴문의] ${inquiryType} — ${company}`;

      // Save to Supabase
      await supabaseAdmin.from("inquiries").insert([{
        type: "partnership",
        company,
        name,
        email,
        phone,
        inquiry_type: inquiryType,
        content: proposal,
        status: "pending",
      }]);

      const rows = [
        ["회사 / 브랜드명", company],
        ["담당자", name],
        ["이메일", email],
        ["연락처", phone || "-"],
        ["문의 유형", inquiryType],
      ];
      const tableRows = rows
        .map(([k, v]) => `<tr><td style="padding:8px 16px;font-weight:700;color:#5a4838;background:#f9f5f1;white-space:nowrap">${k}</td><td style="padding:8px 16px;color:#5a4838">${v}</td></tr>`)
        .join("");
      html = `
        <div style="font-family:'Outfit',sans-serif;max-width:640px;margin:0 auto;color:#5a4838">
          <div style="background:#FD2F79;padding:32px;border-radius:16px 16px 0 0">
            <h1 style="color:white;font-size:24px;font-weight:900;margin:0">새 제휴문의가 접수되었습니다</h1>
            <p style="color:rgba(255,255,255,0.7);font-size:13px;margin:8px 0 0">Vinorleague Partnership</p>
          </div>
          <div style="background:#fff;padding:32px;border:1px solid #f0ece8;border-top:none">
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;border-radius:8px;overflow:hidden">${tableRows}</table>
            <div style="background:#f9f5f1;border-radius:12px;padding:20px">
              <p style="font-weight:700;color:#5a4838;margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:2px">제안 내용</p>
              <p style="color:#5a4838;line-height:1.7;margin:0;white-space:pre-wrap">${proposal}</p>
            </div>
          </div>
          <div style="background:#f0ece8;padding:16px 32px;border-radius:0 0 16px 16px">
            <p style="color:#5a4838;opacity:0.4;font-size:11px;margin:0;letter-spacing:2px;text-transform:uppercase">Vinorleague — ${COMMISSION_EMAIL}</p>
          </div>
        </div>
      `;
    } else {
      const { name, email, message } = body;
      if (!name || !email || !message) {
        return NextResponse.json({ message: "필수 항목을 모두 입력해 주세요." }, { status: 400 });
      }
      subject = `[일반문의] ${name}`;

      // Save to Supabase
      await supabaseAdmin.from("inquiries").insert([{
        type: "general",
        name,
        email,
        content: message,
        status: "pending",
      }]);

      html = `
        <div style="font-family:'Outfit',sans-serif;max-width:640px;margin:0 auto;color:#5a4838">
          <div style="background:#5a4838;padding:32px;border-radius:16px 16px 0 0">
            <h1 style="color:white;font-size:24px;font-weight:900;margin:0">새 문의가 접수되었습니다</h1>
            <p style="color:rgba(255,255,255,0.5);font-size:13px;margin:8px 0 0">Vinorleague Contact</p>
          </div>
          <div style="background:#fff;padding:32px;border:1px solid #f0ece8;border-top:none">
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;border-radius:8px;overflow:hidden">
              <tr><td style="padding:8px 16px;font-weight:700;color:#5a4838;background:#f9f5f1;white-space:nowrap">이름</td><td style="padding:8px 16px;color:#5a4838">${name}</td></tr>
              <tr><td style="padding:8px 16px;font-weight:700;color:#5a4838;background:#f9f5f1;white-space:nowrap">이메일</td><td style="padding:8px 16px;color:#5a4838">${email}</td></tr>
            </table>
            <div style="background:#f9f5f1;border-radius:12px;padding:20px">
              <p style="font-weight:700;color:#5a4838;margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:2px">메시지</p>
              <p style="color:#5a4838;line-height:1.7;margin:0;white-space:pre-wrap">${message}</p>
            </div>
          </div>
          <div style="background:#f0ece8;padding:16px 32px;border-radius:0 0 16px 16px">
            <p style="color:#5a4838;opacity:0.4;font-size:11px;margin:0;letter-spacing:2px;text-transform:uppercase">Vinorleague — ${COMMISSION_EMAIL}</p>
          </div>
        </div>
      `;
    }

    await resend.emails.send({
      from: "Vinorleague <onboarding@resend.dev>",
      to: COMMISSION_EMAIL,
      replyTo: body.email,
      subject,
      html,
    });

    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    console.error("Contact email error:", error);
    return NextResponse.json({ message: "이메일 발송 중 오류가 발생했습니다." }, { status: 500 });
  }
}
