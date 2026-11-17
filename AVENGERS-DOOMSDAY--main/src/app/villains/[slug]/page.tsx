import { notFound } from 'next/navigation';
import { characters, getCharacterBySlug } from '@/data/characters';
import VillainProfileView from './VillainProfileView';

export function generateStaticParams() {
  return characters
    .filter((c) => c.type === 'villain')
    .map((c) => ({
      slug: c.slug,
    }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function VillainDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const villain = getCharacterBySlug(slug);

  if (!villain || villain.type !== 'villain') {
    notFound();
  }

  return <VillainProfileView slug={slug} />;
}
