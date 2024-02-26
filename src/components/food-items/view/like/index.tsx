
'use client';

import { useCallback, useContext } from 'react';
import { LikeIcon } from './like-icon';
import {Button} from './style';
import { FoodItemContext } from '@/src/lib/contexts/food-item';

export default function Like() {
  const {isLiked, toggleLike, foodItem } = useContext(FoodItemContext);

  const onClick = useCallback(() => {
      toggleLike(!isLiked);
  }, [toggleLike, isLiked]);

  if(!foodItem) return null;

  // Would be better with optimistic rendering.
  return (
    <Button 
      type="button"
      onClick={onClick} 
      className={isLiked ? 'active' : ''}
    >
      <LikeIcon />
    </Button>
  );
}