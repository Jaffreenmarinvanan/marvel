import { notFound } from 'next/navigation';
import { movies, getMovieBySlug } from '@/data/movies';
import MovieDetailView from './MovieDetailView';

export function generateStaticParams() {
  return movies.map((m) => ({
    slug: m.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const movie = getMovieBySlug(slug);

  if (!movie) {
    notFound();
  }

  return <MovieDetailView slug={slug} />;
}
