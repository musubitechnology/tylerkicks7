import type { Shoe } from '../types';
import { COMMON_COLORS, COLOR_CATEGORIES } from './colors';

interface ColorAnalysis {
  colorCounts: Record<string, number>;
  missingColors: string[];
  totalColors: number;
  colorCategories: Record<string, number>;
  suggestions: string[];
}

export function analyzeColors(shoes: Shoe[]): ColorAnalysis {
  // Flatten and normalize all colors
  const allColors = shoes.flatMap(shoe => 
    shoe.colors.map(color => color.toLowerCase())
  );

  // Count color frequencies
  const colorCounts = allColors.reduce((acc, color) => {
    acc[color] = (acc[color] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Find missing common colors
  const missingColors = COMMON_COLORS.filter(color => 
    !allColors.some(c => c.includes(color))
  );

  // Analyze color categories
  const colorCategories = Object.entries(COLOR_CATEGORIES).reduce((acc, [category, colors]) => {
    acc[category] = colors.reduce((count, color) => 
      count + (allColors.filter(c => c.includes(color)).length), 0
    );
    return acc;
  }, {} as Record<string, number>);

  // Generate suggestions based on gaps
  const suggestions = generateSuggestions(colorCounts, colorCategories);

  return {
    colorCounts,
    missingColors,
    totalColors: allColors.length,
    colorCategories,
    suggestions
  };
}

function generateSuggestions(
  colorCounts: Record<string, number>,
  categoryCount: Record<string, number>
): string[] {
  const suggestions: string[] = [];

  // Suggest based on missing primary colors
  const missingPrimaries = COLOR_CATEGORIES.primary.filter(
    color => !Object.keys(colorCounts).some(c => c.includes(color))
  );
  if (missingPrimaries.length > 0) {
    suggestions.push(`Consider adding primary colors: ${missingPrimaries.join(', ')}`);
  }

  // Suggest based on category balance
  const maxCategory = Math.max(...Object.values(categoryCount));
  const underrepresentedCategories = Object.entries(categoryCount)
    .filter(([_, count]) => count < maxCategory / 2)
    .map(([category]) => category);

  if (underrepresentedCategories.length > 0) {
    suggestions.push(
      `Your collection could use more ${underrepresentedCategories.join(' and ')} colors`
    );
  }

  return suggestions;
}