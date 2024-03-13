import { Category } from "./categories.interface";

export interface Blog {
  title: string;
  slug: string;
  image: string;
  description: string;
  content: string;
  _id: string;
  __v: number;
  category: Category;
}
