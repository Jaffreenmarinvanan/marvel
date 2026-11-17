import { notFound } from 'next/navigation';
import { infinityStones, getStoneBySlug } from '@/data/infinity-stones';
import StoneDetailView from './StoneDetailView';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return infinityStones.map((stone) => ({
    slug: stone.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const stone = getStoneBySlug(slug);
  if (!stone) return { title: 'Infinity Stone Not Found | Marvel Cinematic Universe' };

  return {
    title: `${stone.name} — Cosmic Singularity Dossier | Marvel Archives`,
    description: stone.description,
  };
}

export default async function StonePage({ params }: Props) {
  const { slug } = await params;
  const stone = getStoneBySlug(slug);

  if (!stone) {
    notFound();
  }

  return <StoneDetailView stone={stone} />;
}

