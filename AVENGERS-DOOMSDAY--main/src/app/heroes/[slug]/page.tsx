import { notFound } from 'next/navigation';
import { characters, getCharacterBySlug } from '@/data/characters';
import HeroProfileView from './HeroProfileView';

export function generateStaticParams() {
  return characters
    .filter((c) => c.type !== 'villain')
    .map((c) => ({
      slug: c.slug,
    }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function HeroDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const hero = getCharacterBySlug(slug);

  if (!hero || hero.type === 'villain') {
    notFound();
  }

  return <HeroProfileView slug={slug} />;
}
