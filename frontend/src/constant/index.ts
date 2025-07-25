import { benz, logo } from "../assets";
import type { FooterProps, Product } from "../type";




export const products: Product[] = [
  {
    id: 1,
    title: "New Groove Retro Swirl Abstract Pattern Pink Orange Yellow Scarf",
    price: "$34.04",
    size: { label: "Default (55.1 x 55.1 in)" },
    delivery: ["Express by 16 June", "Standard between 27 June - 1 July"],
    features: {
      rating: 4.83,
      reviews: 64,
      list: [
        "Full print is visible on the front and reverse",
        "Soft, lightweight fabric for all-day comfort",
        "Made from 100% premium polyester",
        "Machine washable and wrinkle-resistant",
        "Perfect for casual wear or special occasions",
      ],
    },
    thumbnails: [benz, benz, logo],
    type: "frame",
    tag: "Acrylic",
  },
  {
    id: 2,
    title: "Rustic Wooden Wall Frame",
    price: "$45.00",
    size: { label: "Medium (40 x 60 cm)" },
    delivery: ["Express by 17 June", "Standard between 28 June - 2 July"],
    features: {
      rating: 4.7,
      reviews: 80,
      list: [
        "Handcrafted wood material",
        "Durable and stylish",
        "Includes hanging hooks",
        "Perfect for living rooms or hallways",
        "Eco-friendly polish",
      ],
    },
    thumbnails: [logo, benz, benz],
    type: "house decor",
    tag: "Wood",
  },
  {
    id: 3,
    title: "Abstract Digital Painting - Dreamscape",
    price: "$60.00",
    size: { label: "Canvas (30 x 40 in)" },
    delivery: ["Express by 19 June", "Standard between 30 June - 4 July"],
    features: {
      rating: 4.95,
      reviews: 95,
      list: [
        "High-resolution digital print",
        "Stretched on wooden canvas",
        "Bold and colorful abstract design",
        "Comes with wall mounting kit",
        "Fade-resistant ink",
      ],
    },
    thumbnails: [logo, logo, benz],
    type: "painting",
    tag: "Digital",
  },
  {
    id: 4,
    title: "Minimalist Frameless Mirror Set",
    price: "$38.99",
    size: { label: "Set of 3 (12 x 12 in each)" },
    delivery: ["Express by 16 June", "Standard between 27 June - 1 July"],
    features: {
      rating: 4.4,
      reviews: 52,
      list: [
        "Modern frameless design",
        "Easy to clean and install",
        "Shatterproof glass",
        "Ideal for bathroom or hallway",
        "Space-enhancing illusion",
      ],
    },
    thumbnails: [benz, logo, logo],
    type: "house decor",
    tag: "Frameless",
  },
  {
    id: 5,
    title: "Classic Oil Painting - Garden Serenity",
    price: "$120.00",
    size: { label: "Large (70 x 100 cm)" },
    delivery: ["Express by 20 June", "Standard between 1 July - 5 July"],
    features: {
      rating: 4.88,
      reviews: 112,
      list: [
        "Hand-painted oil on canvas",
        "Natural wood frame included",
        "Calming floral scenery",
        "Certificate of authenticity",
        "Ready to hang",
      ],
    },
    thumbnails: [benz, logo, benz],
    type: "painting",
    tag: "Oil",
  },
  {
    id: 6,
    title: "Contemporary Sofa - Light Grey",
    price: "$499.00",
    size: { label: "3-Seater (200 x 90 x 80 cm)" },
    delivery: ["Express by 25 June", "Standard between 5 July - 9 July"],
    features: {
      rating: 4.65,
      reviews: 43,
      list: [
        "Soft linen fabric",
        "Sturdy wooden legs",
        "Modern minimalist design",
        "Easy to assemble",
        "Comfortable high-density foam",
      ],
    },
    thumbnails: [logo, benz, logo],
    type: "furniture",
    tag: "Sofas",
  },
  {
    id: 7,
    title: "Vintage Candle Holder Set",
    price: "$27.99",
    size: { label: "Set of 2 (10 in height)" },
    delivery: ["Express by 18 June", "Standard between 29 June - 3 July"],
    features: {
      rating: 4.6,
      reviews: 67,
      list: [
        "Antique brass finish",
        "Perfect for dining tables or shelves",
        "Holds both pillar and taper candles",
        "Sturdy base, no tipping",
        "Elegant rustic vibe",
      ],
    },
    thumbnails: [benz, benz, logo],
    type: "house decor",
    tag: "Candles",
  },
  {
    id: 8,
    title: "Watercolor Landscape Art Print",
    price: "$34.50",
    size: { label: "Framed (18 x 24 in)" },
    delivery: ["Express by 22 June", "Standard between 2 July - 6 July"],
    features: {
      rating: 4.77,
      reviews: 85,
      list: [
        "Printed on premium watercolor paper",
        "Comes in a solid black frame",
        "Soft, serene landscape style",
        "Lightweight and easy to hang",
        "Great gift for art lovers",
      ],
    },
    thumbnails: [logo, logo, benz],
    type: "painting",
    tag: "Watercolor",
  },
];
export const footerLinks: FooterProps[] = [
  {
    title: "Quick Links",
    links: ["Explore", "Frame", "Painting", "Home Decor", "Furniture"],
    urls: ["/explores", "/frame", "/painting", "/home-decor", "/furniture"],
  },
  {
    title: "Social Media",
    links: ["TikTok", "Whatsapp"],     // "Facebook","Instagram", "Twitter",
    urls: [
      "https://www.tiktok.com/@cactuss929?_t=ZM-8xS67WuJmAo&_r=1",
      "https://wa.me/2348065137683"

    ],
  },
  {
    title: "Working Hours",
    links: ["Monday - Saturday", "(8 AM - 5 PM)"],
    urls: ["#", "#"],
  },
  {
    title: "Help",
    links: [ "Email", "Call"],
    urls: [ "mailto:cactusofficialstore752@gmail.com", "tel:+2348065137683"],
  },
];