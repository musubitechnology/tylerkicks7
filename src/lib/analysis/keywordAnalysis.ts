import type { Shoe } from '../types';

export function analyzeKeywords(shoes: Shoe[]) {
  // Extract words from names and models
  const words = shoes.flatMap(shoe => {
    const nameWords = shoe.name.toLowerCase().split(/\s+/);
    const modelWords = shoe.model.toLowerCase().split(/\s+/);
    const nicknameWords = shoe.nickname?.toLowerCase().split(/\s+/) || [];
    return [...nameWords, ...modelWords, ...nicknameWords];
  });

  // Count word frequencies (excluding common words)
  const commonWords = new Set(['the', 'and', 'or', 'a', 'an', 'in', 'on', 'at', 'to', 'for']);
  const wordCounts = words.reduce((acc, word) => {
    if (!commonWords.has(word) && word.length > 2) {
      acc[word] = (acc[word] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Get top keywords
  return Object.entries(wordCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);
}