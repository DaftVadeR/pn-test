
'use client';

import { LikeIcon } from './like-icon';
import {Button} from './style';
import addLike from '@/lib/actions/add-like';

type LikeProps = {foodItemId: string};

export default function Like({ foodItemId }: LikeProps) {
  return (
    <Button onClick={() => addLike(foodItemId)}>
      <LikeIcon />
    </Button>
  );
}