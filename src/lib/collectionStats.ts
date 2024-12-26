import { formatDistanceToNow } from 'date-fns';
import type { Shoe } from './types';

export function getCollectionStats(shoes: Shoe[]) {
  if (!shoes.length) return null;

  // Get category counts
  const categories = shoes.reduce((acc, shoe) => {
    acc[shoe.category] = (acc[shoe.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get most recent shoe
  const recentShoes = [...shoes].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const newestShoe = recentShoes[0];

  // Get most recently worn shoe
  const lastWornShoe = shoes
    .filter(shoe => shoe.last_worn)
    .sort((a, b) => 
      new Date(b.last_worn!).getTime() - new Date(a.last_worn!).getTime()
    )[0];

  return {
    totalCount: shoes.length,
    categories,
    newestShoe,
    lastWornShoe,
  };
}

export function formatCollectionDescription(shoes: Shoe[]): string {
  const stats = getCollectionStats(shoes);
  if (!stats) return '';

  const { totalCount, categories, newestShoe, lastWornShoe } = stats;

  const categoryHighlight = Object.entries(categories)
    .filter(([_, count]) => count > 0)
    .map(([category, count]) => `${count} ${category.toLowerCase()}`)
    .join(', ');

  const recentAddition = newestShoe
    ? `Recently added: ${newestShoe.name}.`
    : '';

  const lastWorn = lastWornShoe
    ? `Last worn: ${lastWornShoe.name} (${formatDistanceToNow(new Date(lastWornShoe.last_worn!), { addSuffix: true })}).`
    : '';

  return `This collection features ${totalCount} pieces, including ${categoryHighlight}. ${recentAddition} ${lastWorn}`.trim();
}