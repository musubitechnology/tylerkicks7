import React from 'react';
import { formatCollectionDescription } from '../lib/collectionStats';
import type { Shoe } from '../lib/types';

interface CollectionDescriptionProps {
  shoes: Shoe[];
}

export function CollectionDescription({ shoes }: CollectionDescriptionProps) {
  const description = formatCollectionDescription(shoes);
  
  if (!description) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
}