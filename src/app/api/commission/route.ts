import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { COMMISSION_EMAIL } from "@/lib/links";
import { supabaseAdmin } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, serviceType, purpose, deadline, quantity, budget, referenceUrl, detail, honeypot } = body;

    // Honeypot check
    if (honeypot) {
      return NextResponse.json({ message: "ok" }, { status: 200 });
    }

    // Required field validation
    if (!name || !email || !serviceType || !purpose || !detail) {
      return NextResponse.json({ message: "필수 항목을 모두 입력해 주세요." }, { status: 400 });
    }
    if (detail.trim().length < 50) {
      return NextResponse.json({ message: "작업 상세 내용을 50자 이상 입력해 주세요." }, { status: 400 });
    }

    // Save to Supabase
    const { error: dbError } = await supabaseAdmin.from("commissions").insert([
      {
        name,
        email,
        phone,
        service_type: serviceType,
        purpose,
        deadline,
        quantity,
        budget,
        reference_url: referenceUrl,
        detail,
        status: 'pending',
      },
    ]);

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      // We continue with email even if DB fails, to ensure redundancy
    }

    const rows = [
      ["의뢰인", name],
      ["이메일", email],
      ["전화번호", phone || "-"],
      ["의뢰 유형", serviceType],
      ["사용 목적", purpose],
      ["납기 희망일", deadline || "-"],
      ["예상 수량", quantity || "-"],
      ["예산 범위", budget || "-"],
      ["레퍼런스 URL", referenceUrl || "-"],
    ];

    const tableRows = rows
      .map(([k, v]) => `<tr><td style="padding:8px 16px;font-weight:700;color:#5a4838;background:#f9f5f1;white-space:nowrap">${k}</td><td style="padding:8px 16px;color:#5a4838">${v}</td></tr>`)
      .join("");

    const html = `
      <div style="font-family:'Outfit',sans-serif;max-width:640px;margin:0 auto;color:#5a4838">
        <div style="background:#FD2F79;padding:32px;border-radius:16px 16px 0 0">
          <h1 style="color:white;font-size:24px;font-weight:900;margin:0;letter-spacing:-0.5px">새 제작의뢰가 접수되었습니다</h1>
          <p style="color:rgba(255,255,255,0.7);font-size:13px;margin:8px 0 0">Vinorleague Commission</p>
        </div>
        <div style="background:#fff;padding:32px;border:1px solid #f0ece8;border-top:none">
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;border-radius:8px;overflow:hidden">
            ${tableRows}
          </table>
          <div style="background:#f9f5f1;border-radius:12px;padding:20px">
            <p style="font-weight:700;color:#5a4838;margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:2px">작업 상세 내용</p>
            <p style="color:#5a4838;line-height:1.7;margin:0;white-space:pre-wrap">${detail}</p>
          </div>
        </div>
        <div style="background:#f0ece8;padding:16px 32px;border-radius:0 0 16px 16px">
          <p style="color:#5a4838;opacity:0.4;font-size:11px;margin:0;letter-spacing:2px;text-transform:uppercase">Vinorleague — vinus@vinus.co.kr</p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "Vinorleague <onboarding@resend.dev>",
      to: COMMISSION_EMAIL,
      replyTo: email,
      subject: `[제작의뢰] ${serviceType} — ${name}`,
      html,
    });

    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    console.error("Commission email error:", error);
    return NextResponse.json({ message: "이메일 발송 중 오류가 발생했습니다." }, { status: 500 });
  }
}
