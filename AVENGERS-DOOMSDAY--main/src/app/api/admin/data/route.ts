import { NextResponse } from 'next/server';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'customData.json');

async function getCustomData() {
  try {
    const raw = await readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    const initial = {
      heroes: [],
      villains: [],
      movies: [],
      weapons: [],
      timeline: [],
      mediaMap: {},
    };
    await mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
    await writeFile(DATA_FILE_PATH, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
}

async function saveCustomData(data: any) {
  await mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
  await writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const data = await getCustomData();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to read data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, item } = body;

    if (!category || !item) {
      return NextResponse.json(
        { success: false, message: 'Category and item are required' },
        { status: 400 }
      );
    }

    const data = await getCustomData();

    if (category === 'mediaMap') {
      const slug = item.slug;
      if (!slug) {
        return NextResponse.json(
          { success: false, message: 'Slug is required for mediaMap' },
          { status: 400 }
        );
      }
      data.mediaMap = data.mediaMap || {};
      data.mediaMap[slug] = {
        image: item.image || item.posterUrl || '',
        accent: item.accent || item.posterColor || '#c9a84c',
        logo: item.logo || '',
      };
    } else {
      data[category] = data[category] || [];
      const list = data[category];

      // Generate id / slug if missing
      if (!item.id) {
        item.id = `custom_${category}_${Date.now()}`;
      }
      if (!item.slug && item.title) {
        item.slug = item.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
      } else if (!item.slug && item.name) {
        item.slug = item.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
      }

      // If item with same id or slug already exists, update it; else prepend
      const existingIdx = list.findIndex(
        (x: any) =>
          (item.id && x.id === item.id) || (item.slug && x.slug === item.slug)
      );

      if (existingIdx >= 0) {
        list[existingIdx] = { ...list[existingIdx], ...item };
      } else {
        list.unshift(item);
      }
    }

    await saveCustomData(data);

    return NextResponse.json({
      success: true,
      message: 'Item saved successfully',
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to save item' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');

    if (!category || (!id && !slug)) {
      return NextResponse.json(
        { success: false, message: 'Category and id or slug are required' },
        { status: 400 }
      );
    }

    const data = await getCustomData();

    if (category === 'mediaMap') {
      if (slug && data.mediaMap?.[slug]) {
        delete data.mediaMap[slug];
      }
    } else if (data[category]) {
      data[category] = data[category].filter(
        (x: any) => (id ? x.id !== id : true) && (slug ? x.slug !== slug : true)
      );
    }

    await saveCustomData(data);

    return NextResponse.json({
      success: true,
      message: 'Item deleted successfully',
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete item' },
      { status: 500 }
    );
  }
}
