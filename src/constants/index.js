import {
  people01,
  people02,
  people03,
  facebook,
  instagram,
  linkedin,
  twitter,
  binance,
  coinbase,
  send,
  shield,
  star,
} from "../assets";

export const navLinks = [
  {
    id: "home",
    title: "HOME",
    link: "/",
  },
  {
    id: "about",
    title: "ABOUT",
    link: "/About",
  },
  {
    id: "map",
    title: "MAP",
    link: "/Map",
  },
  {
    id: "walls",
    title: "WALLS",
    link: "/Walls",
  },
  {
    id: "community",
    title: "COMMUNITY",
    link: "/Community",
  },

  {
    id: "shop",
    title: "SHOP",
    link: "/Shop",
  },

  {
    id: "contact",
    title: "CONTACT",
    link: "/Contact",
  },
  {
    id: "login",
    title: "LOGIN",
    link: "/Login",
  },
];

export const navLinks2 = [];

export const about = [
  {
    id: "about-1",
    icon: star,
    title: "Community",
    content:
      "Work on your online presence and build a community that will support you when you need them!",
  },
  {
    id: "about-2",
    icon: shield,
    title: "Badges",
    content:
      "Get various badges for each of your achievements to motivate you to search for more.",
  },
  {
    id: "about-3",
    icon: send,
    title: "Map",
    content: "Find awesome locations for creating and visiting street art! ",
  },
];

export const feedback = [
  {
    id: "feedback-1",
    content:
      "Simply loved working with XYZ, as I was assisting with photography for the Wall X project. It was a fun and exciting experience and got a lot of work done alognside the best vibes!",
    name: "Melissa Fly",
    title: "Photographer",
    img: people01,
  },
  {
    id: "feedback-2",
    content:
      "Collaborating with XYZ was such an awesome experience. She is professional, knowledgeable and friendly to collaborate with and I would recommend contact with her when the time is right to make the next mural comission.",
    name: "David Stevens",
    title: "Artist",
    img: people02,
  },
  {
    id: "feedback-3",
    content:
      "ArtZoro is so amazing! I built my online presence, met amazing artists from all around the globe while finding legal spots to paint on with ease.",
    name: "Kenn Gallagher",
    title: "Artist",
    img: people03,
  },
];

export const stats = [
  {
    id: "stats-1",
    title: "Users Active",
    value: "3800+",
  },
  {
    id: "stats-2",
    title: "Wall Spots Added",
    value: "230+",
  },
  {
    id: "stats-3",
    title: "Artworks",
    value: "230K",
  },
  {
    id: "stats-4",
    title: "Products",
    value: "100+",
  },
];

export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        id: 1,
        name: "Profile",
        link: "/Profile",
      },
      {
        id: 2,
        name: "About",
        link: "/About",
      },
      {
        id: 3,
        name: "Shop",
        link: "/Shop",
      },
      {
        id: 4,
        name: "Reviews",
        link: "/Reviews",
      },
      {
        id: 5,
        name: "Contact",
        link: "/Contact",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Wall Feed",
        link: "/Walls",
      },
      {
        name: "Community Page",
        link: "/Community",
      },
      {
        name: "Map",
        link: "/Map",
      },
      {
        name: "Blog Posts",
        link: "/BlogPosts",
      },
      {
        name: "Artwork Feed",
        link: "/ArtworkFeed",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        name: "Terms & Conditions",
        link: "/TermsConditions",
      },
      {
        name: "Privacy Policy",
        link: "/PrivacyPolicy",
      },
      {
        name: "FAQ's",
        link: "/FAQS",
      },
      {
        name: "Help Center",
        link: "/Help",
      },
    ],
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];

export const clients = [
  {
    id: "client-2",
    logo: binance,
  },
  {
    id: "client-3",
    logo: coinbase,
  },
];

export const Menus = [
  { name: "Home", icon: "home-outline", link: "/", dis: "translate-x-0" },
  {
    name: "Profile",
    icon: "person-outline",
    link: "/Profile",
    dis: "translate-x-16",
  },
  {
    name: "Add",
    icon: "add-circle-outline",
    link: "/Community",
    dis: "translate-x-32",
  },
  {
    name: "Map",
    icon: "location-outline",
    link: "/Map",
    dis: "translate-x-48",
  },
  {
    name: "Settings",
    icon: "settings-outline",
    link: "/Profilesettings",
    dis: "translate-x-64",
  },
];
