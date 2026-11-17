import { notFound } from 'next/navigation';
import { weapons, getWeaponBySlug } from '@/data/weapons';
import WeaponDetailView from './WeaponDetailView';

export function generateStaticParams() {
  return weapons.map((w) => ({
    slug: w.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function WeaponDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getWeaponBySlug(slug);

  if (!item) {
    notFound();
  }

  return <WeaponDetailView slug={slug} />;
}
