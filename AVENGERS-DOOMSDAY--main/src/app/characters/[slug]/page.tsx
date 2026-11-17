import { notFound } from 'next/navigation';
import { characters, getCharacterBySlug } from '@/data/characters';
import CharacterDetailView from './CharacterDetailView';

export function generateStaticParams() {
  return characters
    .filter((c) => c.type === 'supporting' || c.type === 'cosmic')
    .map((c) => ({
      slug: c.slug,
    }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CharacterDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);

  if (!character) {
    notFound();
  }

  return <CharacterDetailView slug={slug} />;
}
