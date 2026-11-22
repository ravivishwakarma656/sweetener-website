// ✏️ Edit this file to change the products and text across the whole site.
// Items marked "placeholder" need your real details.

export const brand = {
  first: "Sweetzy",
  second: "Natura",
  name: "Sweetzy Natura",
  tagline: "Nature's Sweetness, Without Sugar",
  intro:
    "A sweetener made from monk fruit extract. Stir it into chai, bake it into laddoos, and enjoy every spoonful without the sugar.",
  email: "hello@sweetzynatura.example", // placeholder
  phone: "+91 00000 00000", // placeholder
};

// The four claims printed on the pack
export const badges = [
  { icon: "leaf", label: "100% Natural" },
  { icon: "nosugar", label: "Zero Sugar" },
  { icon: "heart", label: "Calorie Free" },
  { icon: "plant", label: "Plant Based" },
] as const;

export const product = {
  name: "Monk Fruit Sweetener",
  weight: "200 g",
  price: "₹349", // placeholder
  points: [
    "Made from monk fruit extract",
    "Zero sugar, calorie free",
    "Dissolves easily in hot and cold drinks",
    "Use in tea, coffee, desserts and baking",
  ],
};

export const stats = [
  { value: 0, suffix: "g", label: "Sugar" },
  { value: 0, suffix: "", label: "Calories" },
  { value: 100, suffix: "%", label: "Natural" },
  { value: 200, suffix: "g", label: "Pack size" },
];

export const steps = [
  { title: "Grown", text: "Monk fruit (luo han guo) is grown on vines and picked when ripe." },
  { title: "Extracted", text: "The fruit's natural sweetness is extracted from it." },
  { title: "Blended", text: "The extract is blended into a fine sweetener that's easy to spoon." },
  { title: "Enjoyed", text: "In your chai, coffee, kheer, smoothies and cakes." },
];

export const uses = ["Masala chai", "Filter coffee", "Kheer", "Lemonade", "Smoothies", "Laddoos", "Banana bread", "Overnight oats"];

export const faqs = [
  {
    q: "What is monk fruit?",
    a: "Monk fruit (luo han guo) is a small round fruit. The sweetness in its extract comes from natural compounds called mogrosides, not from sugar.",
  },
  {
    q: "How much do I use instead of sugar?",
    a: "Start with a little less than you would use of sugar, then adjust to taste. Check the pack for the exact amount to use.", // placeholder
  },
  {
    q: "Can I cook and bake with it?",
    a: "Yes. It works in hot drinks, desserts and baking.",
  },
  {
    q: "Is it suitable for people watching their sugar?",
    a: "Sweetzy Natura contains zero sugar. If you have a medical condition, please check with your doctor first.",
  },
  {
    q: "Where can I buy it?",
    a: "Contact us for stockists near you, online orders or bulk orders for cafés and shops.",
  },
];
