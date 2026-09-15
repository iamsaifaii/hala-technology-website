import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function GET()    { return methodNotAllowed(); }
export async function PUT()    { return methodNotAllowed(); }
export async function PATCH()  { return methodNotAllowed(); }
export async function DELETE() { return methodNotAllowed(); }
function methodNotAllowed() {
  return NextResponse.json({ error: 'Method not allowed' }, {
    status: 405,
    headers: { Allow: 'POST' },
  });
}

export async function POST(req: NextRequest) {
  try {
    const webhookSecret = process.env.SANITY_REVALIDATE_SECRET;

    if (!webhookSecret) {
      console.error('[revalidate] SANITY_REVALIDATE_SECRET is missing');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    const { isValidSignature, body } = await parseBody<{ _type: string; slug?: string }>(
      req,
      webhookSecret
    );

    if (!isValidSignature) {
      return NextResponse.json({ error: 'Unauthorized request' }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }

    // Revalidate main website layout, home page, and blogs index
    revalidatePath('/', 'layout');
    revalidatePath('/blogs');

    // Revalidate specific blog page if slug provided
    if (body.slug) {
      const cleanSlug = body.slug.toLowerCase().trim().replace(/[\s_]+/g, '-');
      revalidatePath(`/blogs/${cleanSlug}`);
      if (cleanSlug !== body.slug) {
        revalidatePath(`/blogs/${body.slug}`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('[revalidate] Internal error occurred during revalidation processing');
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
