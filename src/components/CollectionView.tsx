import React, { useState } from 'react';
import { Grid, Table, Search } from 'lucide-react';
import { ShoeCollection } from './ShoeCollection';
import { ShoeTable } from './ShoeTable';
import { RandomShoePicker } from './RandomShoePicker';
import { CopyCollectionButton } from './CopyCollectionButton';
import type { Shoe } from '../lib/types';
import { Loader2 } from 'lucide-react';

interface CollectionViewProps {
  shoes: Shoe[];
  refreshTrigger: number;
  loading: boolean;
  onUpdate: () => void;
}

export function CollectionView({ shoes, refreshTrigger, loading, onUpdate }: CollectionViewProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredShoes = shoes.filter((shoe) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      shoe.name.toLowerCase().includes(searchLower) ||
      shoe.colors.some((color) => color.toLowerCase().includes(searchLower)) ||
      (shoe.nickname && shoe.nickname.toLowerCase().includes(searchLower)) ||
      shoe.model.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-byu-navy" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1 max-w-md w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search shoes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <RandomShoePicker shoes={shoes} />
          <CopyCollectionButton shoes={shoes} />
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex-1 sm:flex-initial p-2 rounded-md ${
                viewMode === 'grid'
                  ? 'bg-byu-navy text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid className="w-5 h-5 mx-auto" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex-1 sm:flex-initial p-2 rounded-md ${
                viewMode === 'table'
                  ? 'bg-byu-navy text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Table className="w-5 h-5 mx-auto" />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <ShoeCollection shoes={filteredShoes} onUpdate={onUpdate} />
      ) : (
        <ShoeTable
          shoes={filteredShoes}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
}