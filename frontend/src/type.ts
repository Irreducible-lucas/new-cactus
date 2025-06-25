export type Size = {
  label: string;
};

export type Features = {
  rating: number;
  reviews: number;
  list: string[];
};

export type Product = {
  id: number;
  title: string;
  price: string;
  size: Size;
  delivery: string[];
  features: Features;
  thumbnails: string[]; 
  type: string;
  tag: string;
};

export interface FooterProps {
  title: string;
  links: string[];
  urls: string[];
}