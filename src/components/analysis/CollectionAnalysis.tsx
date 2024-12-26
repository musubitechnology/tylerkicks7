import React from 'react';
import { BarChart3, PieChart, Palette } from 'lucide-react';
import { analyzeColors } from '../../lib/analysis/colorAnalysis';
import { analyzeKeywords } from '../../lib/analysis/keywordAnalysis';
import type { Shoe } from '../../lib/types';

interface CollectionAnalysisProps {
  shoes: Shoe[];
  onClose: () => void;
}

export function CollectionAnalysis({ shoes, onClose }: CollectionAnalysisProps) {
  const { colorCounts, missingColors, colorCategories, suggestions } = analyzeColors(shoes);
  const topKeywords = analyzeKeywords(shoes);

  const maxColorCount = Math.max(...Object.values(colorCounts));
  const maxKeywordCount = Math.max(...topKeywords.map(([, count]) => count));
  const maxCategoryCount = Math.max(...Object.values(colorCategories));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Collection Analysis</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Color Distribution */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Color Distribution
              </h3>
              <div className="space-y-2">
                {Object.entries(colorCounts).map(([color, count]) => (
                  <div key={color} className="flex items-center gap-2">
                    <div className="w-32 truncate">{color}</div>
                    <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-byu-navy"
                        style={{ width: `${(count / maxColorCount) * 100}%` }}
                      />
                    </div>
                    <div className="w-8 text-right">{count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Color Categories
              </h3>
              <div className="space-y-2">
                {Object.entries(colorCategories).map(([category, count]) => (
                  <div key={category} className="flex items-center gap-2">
                    <div className="w-32 truncate capitalize">{category}</div>
                    <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-byu-royal"
                        style={{ width: `${(count / maxCategoryCount) * 100}%` }}
                      />
                    </div>
                    <div className="w-8 text-right">{count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Keywords */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Top Keywords
              </h3>
              <div className="space-y-2">
                {topKeywords.map(([word, count]) => (
                  <div key={word} className="flex items-center gap-2">
                    <div className="w-32 truncate">{word}</div>
                    <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-byu-royal"
                        style={{ width: `${(count / maxKeywordCount) * 100}%` }}
                      />
                    </div>
                    <div className="w-8 text-right">{count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Collection Insights */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Collection Insights</h3>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <p key={index} className="text-gray-600">{suggestion}</p>
              ))}
              {missingColors.length > 0 && (
                <p className="text-gray-600">
                  Missing colors: {missingColors.join(', ')}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Close Analysis
          </button>
        </div>
      </div>
    </div>
  );
}