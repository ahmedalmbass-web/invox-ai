
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { MemberRole } from "@prisma/client";

const allowedIndustries = [
  "trading",
  "retail",
  "manufacturing",
  "services",
  "construction",
  "other",
];

const allowedCurrencies = ["YER", "SAR", "USD"];

export async function POST(request: Request) {
  try {
    // 1. التحقق من هوية المستخدم
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user || !user.email) {
      return NextResponse.json(
        { error: "يجب تسجيل الدخول أولاً." },
        { status: 401 }
      );
    }

    // 2. قراءة البيانات والتحقق منها
    const body = await request.json();

    const companyName =
      typeof body.companyName === "string"
        ? body.companyName.trim()
        : "";

    const industry =
      typeof body.industry === "string" ? body.industry : "";

    const country =
      typeof body.country === "string"
        ? body.country.trim()
        : "";

    const currency =
      typeof body.currency === "string" ? body.currency : "";

    if (companyName.length < 2 || companyName.length > 120) {
      return NextResponse.json(
        { error: "اسم الشركة غير صالح." },
        { status: 400 }
      );
    }

    if (!allowedIndustries.includes(industry)) {
      return NextResponse.json(
        { error: "مجال النشاط غير صالح." },
        { status: 400 }
      );
    }

    if (!country || country.length > 80) {
      return NextResponse.json(
        { error: "اسم الدولة غير صالح." },
        { status: 400 }
      );
    }

    if (!allowedCurrencies.includes(currency)) {
      return NextResponse.json(
        { error: "العملة المحددة غير مدعومة." },
        { status: 400 }
      );
    }

    // 3. إنشاء الملف الشخصي والشركة والعضوية
    const result = await prisma.$transaction(async (tx) => {
      const existingUser = await tx.userProfile.findUnique({
        where: { authId: user.id },
        include: { memberships: true },
      });

      if (existingUser && existingUser.memberships.length > 0) {
        throw new Error("COMPANY_ALREADY_EXISTS");
      }

      const profile = await tx.userProfile.upsert({
        where: { authId: user.id },
        update: {
          email: user.email!,
          fullName:
            typeof user.user_metadata?.full_name === "string"
              ? user.user_metadata.full_name
              : undefined,
        },
        create: {
          authId: user.id,
          email: user.email!,
          fullName:
            typeof user.user_metadata?.full_name === "string"
              ? user.user_metadata.full_name
              : null,
        },
      });

      const company = await tx.company.create({
        data: {
          name: companyName,
          industry,
          country,
          currency,
        },
      });

      await tx.companyMember.create({
        data: {
          companyId: company.id,
          userId: profile.id,
          role: MemberRole.OWNER,
        },
      });

      return { companyId: company.id };
    });

    return NextResponse.json(
      {
        success: true,
        companyId: result.companyId,
      },
      { status: 201 }
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "COMPANY_ALREADY_EXISTS"
    ) {
      return NextResponse.json(
        { error: "حسابك مرتبط بشركة بالفعل." },
        { status: 409 }
      );
    }

    console.error("Company onboarding error:", error);

    return NextResponse.json(
      { error: "حدث خطأ أثناء إنشاء الشركة." },
      { status: 500 }
    );
  }
}
