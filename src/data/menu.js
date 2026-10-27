import specialitiesOne from '../assets/specialities/specialities-item-one.png';
import specialitiesTwo from '../assets/specialities/specialities-item-two.png';
import specialitiesThree from '../assets/specialities/specialities-item-three.png';

import salmonAvocadoRollImage from '../assets/menu/salmon-avocado-roll.jpg';
import shrimpTempuraRollImage from '../assets/menu/shrimp-tempura-roll.jpg';
import shiitakeGardenRollImage from '../assets/menu/shiitake-garden-roll-sushi.avif';
import misoButterRibeyeImage from '../assets/menu/miso-butter-ribeye.jpg';
import garlicTenderloinImage from '../assets/menu/garlic-tendorloin.jpg';
import sesameStriploinImage from '../assets/menu/sesame-striploin.jpg';
import teriyakiSalmonBowlImage from '../assets/menu/teriyaki-salmon-bowl.jpg';
import chickenTeriyakiBowlImage from '../assets/menu/chicken-teriyaki-bowl.png';
import misoMushroomBowlImage from '../assets/menu/miso-mushroom-bowl.jpg';
import yuzuMartiniImage from '../assets/menu/yuzu-martini.jpg';
import lycheeBlossomImage from '../assets/menu/lychee-blossom.jpeg';
import japaneseOldFashionedImage from '../assets/menu/japanese-old-fashioned.jpg';
import chardonnayImage from '../assets/menu/chardonay.webp';
import pinotNoirImage from '../assets/menu/pinot-noir.jpg';
import sauvignonBlancImage from '../assets/menu/sauvignon-blanc.jpg';
import porkGyozaImage from '../assets/menu/pork-gyoza.jpg';
import shrimpTempuraImage from '../assets/menu/shrimp-tempura.jpg';
import calamariImage from '../assets/menu/calamari.avif';
export const menuCategories = [
  {
    "slug": "specialties",
    "label": "Specialities",
    "descriptionLabel": "Ingredients",
    "items": [
      {
        "id": "dragon-sushi",
        "name": "Dragon Sushi",
        "ingredients": "Tempura lobster, buttery avocado, seasoned sushi rice, premium unagi glaze, golden tobiko, toasted sesame, Japanese cucumber, spicy mayonnaise, and nori.",
        "price": "$50",
        "image": specialitiesOne
      },
      {
        "id": "creamy-sushi",
        "name": "Creamy Sushi",
        "ingredients": "Fresh crab, silken cream cheese, ripe avocado, seasoned sushi rice, truffle mayonnaise, premium caviar, nori.",
        "price": "$50",
        "image": specialitiesTwo
      },
      {
        "id": "roll-salmon-sushi",
        "name": "Roll Salmon Sushi",
        "ingredients": "Premium salmon, fragrant sushi rice, crisp cucumber, buttery avocado, ruby ikura, fresh yuzu, toasted nori.",
        "price": "$50",
        "image": specialitiesThree
      }
    ]
  },
  {
    "slug": "homestyle-sushi",
    "label": "Homestyle Sushi",
    "descriptionLabel": "Ingredients",
    "items": [
      {
        "id": "salmon-avocado-roll",
        "name": "Salmon Avocado Roll",
        "ingredients": "Fresh salmon, ripe avocado, seasoned sushi rice, nori, toasted sesame, Japanese mayonnaise.",
        "price": "$24",
        "image": salmonAvocadoRollImage
      },
      {
        "id": "shrimp-tempura-roll",
        "name": "Shrimp Tempura Roll",
        "ingredients": "Crispy shrimp tempura, cucumber, avocado, seasoned sushi rice, nori, spicy mayonnaise, unagi sauce.",
        "price": "$28",
        "image": shrimpTempuraRollImage
      },
      {
        "id": "shiitake-garden-roll",
        "name": "Shiitake Garden Roll",
        "ingredients": "Soy-glazed shiitake mushrooms, cucumber, avocado, pickled carrot, seasoned sushi rice, nori, sesame.",
        "price": "$20",
        "image": shiitakeGardenRollImage
      }
    ]
  },
  {
    "slug": "steak",
    "label": "Steak",
    "descriptionLabel": "Ingredients",
    "items": [
      {
        "id": "miso-butter-ribeye",
        "name": "Miso Butter Ribeye",
        "ingredients": "Grilled ribeye, white miso butter, roasted garlic, shimeji mushrooms, scallions, flaky sea salt.",
        "price": "$58",
        "image": misoButterRibeyeImage
      },
      {
        "id": "garlic-tenderloin",
        "name": "Garlic Tenderloin",
        "ingredients": "Beef tenderloin, garlic butter, asparagus, shiitake mushrooms, soy reduction, cracked black pepper.",
        "price": "$64",
        "image": garlicTenderloinImage
      },
      {
        "id": "sesame-striploin",
        "name": "Sesame Striploin",
        "ingredients": "Seared striploin, toasted sesame, ginger soy sauce, broccolini, crispy garlic, spring onions.",
        "price": "$48",
        "image": sesameStriploinImage
      }
    ]
  },
  {
    "slug": "with-rice",
    "label": "With Rice",
    "descriptionLabel": "Ingredients",
    "items": [
      {
        "id": "teriyaki-salmon-bowl",
        "name": "Teriyaki Salmon Bowl",
        "ingredients": "Grilled salmon, steamed Japanese rice, teriyaki glaze, cucumber, edamame, pickled ginger, sesame.",
        "price": "$32",
        "image": teriyakiSalmonBowlImage
      },
      {
        "id": "chicken-teriyaki-bowl",
        "name": "Chicken Teriyaki Bowl",
        "ingredients": "Grilled chicken thigh, Japanese rice, teriyaki sauce, broccoli, shredded carrot, scallions, sesame.",
        "price": "$26",
        "image": chickenTeriyakiBowlImage
      },
      {
        "id": "miso-mushroom-bowl",
        "name": "Miso Mushroom Bowl",
        "ingredients": "Shiitake and shimeji mushrooms, Japanese rice, miso glaze, bok choy, pickled radish, sesame.",
        "price": "$23",
        "image": misoMushroomBowlImage
      }
    ]
  },
  {
    "slug": "cocktails",
    "label": "Cocktails",
    "descriptionLabel": "Ingredients",
    "items": [
      {
        "id": "yuzu-martini",
        "name": "Yuzu Martini",
        "ingredients": "Gin, dry vermouth, yuzu juice, simple syrup, lemon twist.",
        "price": "$18",
        "image": yuzuMartiniImage
      },
      {
        "id": "lychee-blossom",
        "name": "Lychee Blossom",
        "ingredients": "Vodka, lychee liqueur, lychee juice, fresh lime, rose water.",
        "price": "$17",
        "image": lycheeBlossomImage
      },
      {
        "id": "japanese-old-fashioned",
        "name": "Japanese Old Fashioned",
        "ingredients": "Japanese whisky, demerara syrup, aromatic bitters, orange peel, clear ice.",
        "price": "$21",
        "image": japaneseOldFashionedImage
      }
    ]
  },
  {
    "slug": "wine",
    "label": "Wine",
    "descriptionLabel": "Tasting notes",
    "items": [
      {
        "id": "chardonnay",
        "name": "Chardonnay",
        "ingredients": "Golden apple, ripe pear, citrus, gentle vanilla, rounded finish.",
        "price": "$14 / $56",
        "image": chardonnayImage
      },
      {
        "id": "pinot-noir",
        "name": "Pinot Noir",
        "ingredients": "Red cherry, raspberry, subtle spice, delicate earthy notes.",
        "price": "$16 / $64",
        "image": pinotNoirImage
      },
      {
        "id": "sauvignon-blanc",
        "name": "Sauvignon Blanc",
        "ingredients": "Lime zest, green apple, passionfruit, fresh herbal notes.",
        "price": "$13 / $52",
        "image": sauvignonBlancImage
      }
    ]
  },
  {
    "slug": "appetizer",
    "label": "Appetizer",
    "descriptionLabel": "Ingredients",
    "items": [
      {
        "id": "pork-gyoza",
        "name": "Pork Gyoza",
        "ingredients": "Ground pork, cabbage, garlic chives, ginger, wheat wrappers, sesame oil, soy vinegar dip.",
        "price": "$16",
        "image": porkGyozaImage
      },
      {
        "id": "shrimp-tempura",
        "name": "Shrimp Tempura",
        "ingredients": "Tiger prawns, light tempura batter, daikon radish, ginger, tentsuyu dipping sauce.",
        "price": "$19",
        "image": shrimpTempuraImage
      },
      {
        "id": "calamari",
        "name": "Calamari",
        "ingredients": "Crispy squid rings, seasoned flour, lemon, parsley, garlic aioli.",
        "price": "$10",
        "image": calamariImage
      }
    ]
  }
];
