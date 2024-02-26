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
  attributes: {
    Title: string;
    Description: string;
  }
};
