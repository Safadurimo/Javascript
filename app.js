/*
The dino data has been copied into the Javascript code. Usually, it's good practice to separate code from data. In this case I decided 
not to do it, because there are disadvantages:
The data could be loaded asynchronously from the given the JSON file. This would require to serve the website via a http server. In order
to keep things simple and to make it possible to load the website by open the index.html file I decided against this option.
The data could also be seperated into a JavaScript file with one singe assignment. This would require to load it also from the index.html 
file and make the origin of the data more obscure, so I decided also against this option. 
*/
const dinodata = {
    "Dinos": [{
            "species": "Triceratops",
            "weight": 13000,
            "height": 114,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "First discovered in 1889 by Othniel Charles Marsh"
        },
        {
            "species": "Tyrannosaurus Rex",
            "weight": 11905,
            "height": 144,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "The largest known skull measures in at 5 feet long."
        },
        {
            "species": "Anklyosaurus",
            "weight": 10500,
            "height": 55,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Anklyosaurus survived for approximately 135 million years."
        },
        {
            "species": "Brachiosaurus",
            "weight": 70000,
            "height": "372",
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Jurasic",
            "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
        },
        {
            "species": "Stegosaurus",
            "weight": 11600,
            "height": 79,
            "diet": "herbavor",
            "where": "North America, Europe, Asia",
            "when": "Late Jurasic to Early Cretaceous",
            "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
        },
        {
            "species": "Elasmosaurus",
            "weight": 16000,
            "height": 59,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
        },
        {
            "species": "Pteranodon",
            "weight": 44,
            "height": 20,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
        },
        {
            "species": "Pigeon",
            "weight": 0.5,
            "height": 9,
            "diet": "herbavor",
            "where": "World Wide",
            "when": "Holocene",
            "fact": "All birds are living dinosaurs."
        }
    ]
}

/**
 * @description Shuffles an array.
 * Randomize array in-place using Durstenfeld shuffle algorithm.
 * Taken from: https://stackoverflow.com/a/12646864
 * @param {array} array The array to shuffle.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


/**
 * @description Represent a dino
 * @constructor
 * @param {string} species The species
 * @param {number} weight The weight in lbs
 * @param {number} height The height in inches
 * @param {string} diet The diet
 * @param {string} where The place the dino existed
 * @param {string} when The time dino existed
 * @param {string} fact A fact about the dino
 */
function Dino(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;

    this.title = species;
    this.image = 'images\\' + encodeURI(species.toLowerCase()) + '.png';
}

Dino.prototype.generateFacts = function(human, cmp1, cmp2, cmp3) {
    const factList = [];
    factList.push(this.fact);
    factList.push(cmp1(human, this));
    factList.push(cmp2(human, this));
    factList.push(cmp3(human, this));
    shuffleArray(factList);
    this.fact = factList[0];
};

/**
 * @description Represent a human
 * @constructor
 * @param {string} name The name
 * @param {number} feet Hight (feet)
 * @param {number} inches Hight(inches)
 * @param {number} weight The weight in lbs
 * @param {string} diet The diet
 */
function Human(name, feet, inches, weight, diet) {
    this.name = name;
    this.feet = feet;
    this.inches = inches;
    this.weight = weight;
    this.diet = diet.toLowerCase();
    this.title = this.name;
    this.image = 'images\\human.png';
    this.fact = '';
}


// Create dino objects from the data
const dinos = dinodata.Dinos.map(
    (dinodataobject) => {
        return new Dino(
            dinodataobject.species,
            dinodataobject.weight,
            dinodataobject.height,
            dinodataobject.diet,
            dinodataobject.where,
            dinodataobject.when,
            dinodataobject.fact,

        );
    },
);


/**
 * @description Compare human height with dino height.
 * @param {object} human The human
 * @param {object} dino The dino
 * @returns {string} The result of the comparison as a fact
 */
function compareHeight(human, dino) { // feet, inch, dinoheight) {
    const humanheight = human.feet * 12 + human.inches;
    if (humanheight > dino.height) {
        return 'Your are bigger!';
    } else if (humanheight < dino.height) {
        return 'Your are smaller!';
    } else {
        return 'You have equal size!';
    }
}


/**
 * @description Compare human weight with dino weight.
 * @param {object} human The human
 * @param {object} dino The dino
 * @returns {string} The result of the comparison as a fact
 */
function compareWeight(human, dino) {
    if (human.weight > dino.weight) {
        return 'Your are heavier!';
    } else if (human.weight < dino.weight) {
        return 'Your are more lightweight!';
    } else {
        return 'You have equal weight!';
    }
}


/**
 * @description Compare human diet with dino diet.
 * @param {object} human The human
 * @param {object} dino The dino
 * @returns {string} The result of the comparison as a fact
 */
function compareDiet(human, dino) {
    if (dino.diet === human.diet) {
        return 'Your like to eat the same things';
    } else {
        return 'You should\'t have Dinner together';
    }
}


// On button click, prepare and display infographic
const elem = document.getElementById('btn');
elem.addEventListener('click',
    function() {

        // hide the form
        document.getElementById('dino-compare').style.display = 'none';

        // extract the data from the form
        const form = document.querySelector('form');
        const data = Object.fromEntries(new FormData(form).entries());

        const human = new Human(data.name, data.feet, data.inches, data.weight, data.diet);

        const tiles = dinos;

        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].species !== 'Pigeon') {
                tiles[i].generateFacts(
                    human, compareHeight, compareWeight, compareDiet);
            }
        }

        shuffleArray(tiles);
        tiles.splice(4, 0, human);

        for (let i = 0; i < tiles.length; i++) {
            const tile = tiles[i];
            const temp = document.createElement('div');
            temp.className = 'grid-item';
            temp.innerHTML = '<h3>' + tile.title + '</h3>' +
                '<img src=' + tile.image + ' />' +
                '<p>' + tile.fact + '</p>';

            document.getElementById('grid').append(temp);
        }
    },

);