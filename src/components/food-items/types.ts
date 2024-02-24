export type Likes = {
  id: string;
  userId: string;
  foodItemId: string;
};

export type Image = {
  id: string;
  url: string;
};

export type FoodItem = {
  id: string;
  name: string;
  nutritional_facts: string;
  images: Image[];
  description: string;
  likes: Likes[];
};

