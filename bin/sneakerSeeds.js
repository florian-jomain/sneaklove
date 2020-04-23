require('dotenv').config();
const mongoose = require("mongoose");
const Sneaker = require("../models/sneaker");

const sneakers = [{
        name: "Nike Air Force 1 Mid 07 en cuir Noir",
        ref: "315123-001-BLACK/BLACK-BLACK",
        sizes: ['40', '41', '42', '43', '44'],
        description: "Profil mi-montant avec sangle sur la cheville pour un maintien sûr",
        price: "110€",
        category: ["men"],
        // id_tags: "",
        image: "https://medias-cache.citadium.com/fr/nike-nike-air-force-1-mid-07-en-cuir-noir/image/75/8/1610758.129.jpg"
    },
    {
        name: "Adidas Torsion TRDC Rouge",
        ref: "EF4804-ECARLA/ECARLA/BORCOL-ECARLA/ECARLA/BORCOL",
        sizes: ['40', '41', '42', '43', '44'],
        description: "Tige en cuir verni et satin",
        price: "129,95€",
        category: ["men"],
        // id_tags: "",
        image: "https://medias-cache.citadium.com/fr/adidas-adidas-torsion-trdc-rouge/image/19/8/2504198.129.jpg"
    },
    {
        name: "Reebok Club C 1985 TV en cuir Blanc",
        ref: "DV6434-CLUB C 1985 TV-TOP-CHALK/PAPERWHITE/GLEN GREEN-TOP-CHALK/PAPERWHITE/GLEN GREEN",
        sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
        description: "Semelle intérieure amovible en EVA, adaptée au port dorthèses.",
        price: "100€",
        category: ["men", "women"],
        // id_tags: "",
        image: "https://medias-cache.citadium.com/fr/reebok-reebok-club-c-1985-tv-en-cuir-blanc/image/31/3/2097313.129.jpg"
    },
    {
        name: "Adidas Americana Hi Blanc",
        ref: "EG5784-FTWBLA/NOIESS/ROUGLO-FTWBLA/NOIESS/ROUGLO",
        sizes: ['36', '37', '38', '39'],
        description: "Semelle extérieure en caoutchouc",
        price: "89,95 €",
        category: ["women"],
        // id_tags: "",
        image: "https://medias-cache.citadium.com/fr/adidas-adidas-americana-hi-blanc/image/70/5/2511705.129.jpg"
    },
    {
        name: "Baskets basses RS-X à talons compensés imprimé ethnique Vert",
        ref: "373183-02-GREEN",
        sizes: ['34', '35', '36', '37', '38', '39', '40'],
        description: "Baskets basses RS-X à talons compensés imprimé ethnique by Puma pour Femme.",
        price: "120,00€",
        category: ["women", "kids"],
        // id_tags: "",
        image: "https://medias-cache.citadium.com/fr/puma-baskets-basses-rs-x-a-talons-compenses-imprime-ethnique-vert/image/18/3/2542183.129.jpg"
    }, {
        name: "Converse All Star basses en toile Rouge",
        ref: "015810-550-OX-018-BORDEAUX",
        sizes: ['34', '35', '36', '37', '38', '39', '40'],
        description: "Converse All Star basses en toile by Converse",
        price: "65,00€",
        category: ["men", "women", "kids"],
        // id_tags: "",
        image: "https://medias-cache.citadium.com/fr/converse-converse-all-star-basses-en-toile-rouge/image/60/9/2187609.129.jpg"
    },
    {
        name: "Nike Classic Cortez en cuir Blanc",
        ref: "749571-154-WHITE/VARSITY RED-VARSITY ROYAL",
        sizes: ['36', '37', '40', '41', '42', '43', '44'],
        description: "La chaussure Nike Classic Cortez est la chaussure de running originale de Nike",
        price: "85,00€",
        category: ["men", "kids"],
        // id_tags: "",
        image: "https://medias-cache.citadium.com/fr/nike-nike-classic-cortez-en-cuir-blanc/image/40/0/1908400.129.jpg"
    }
];

mongoose
    .connect(process.env.MONGODB_URI)
    .then((self) => {
        console.log(`Connected to ${self.connection.name}`);
        Sneaker.create(sneakers)
            .then(sneakers => {
                sneakers.forEach(sneaker => {
                    console.log(sneaker);
                })
            })
            .catch(dbErr => {
                console.log(dbErr);
            })
    })
    .catch(dbErr => {
        console.log(dbErr);
    });