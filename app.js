var dinodata = {
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
 * Shuffles an array.
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


// eslint-disable-next-line valid-jsdoc
/**
 * Dino Constructor
 */
function Dino(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.factList = [];
    this.factList.push(fact);
    this.fact = fact;

    this.title = species;
    this.image = 'images\\' + encodeURI(species.toLowerCase()) + '.png';

    this.generateFacts = function(human, cmp1, cmp2, cmp3) {
        this.factList.push(cmp1(human, this));
        this.factList.push(cmp2(human, this));
        this.factList.push(cmp3(human, this));
        shuffleArray(this.factList);
        this.fact = this.factList[0];
    };
}

// Create Dino Objects
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


const tiles = dinos;

// eslint-disable-next-line valid-jsdoc
/**
 * Compare human height with dino height.
 */
function compareHeight(human, dino) { // feet, inch, dinoheight) {
    const humanheight = human.feet * 12 + human.inch;
    if (humanheight > dino.height) {
        return 'Your are bigger!';
    } else if (humanheight < dino.height) {
        return 'Your are smaller!';
    } else {
        return 'You have equal size!';
    }
}


// eslint-disable-next-line valid-jsdoc
/**
 * Compare human weight with dino weight.
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


// eslint-disable-next-line valid-jsdoc
/**
 * Compare human diet with dino diet.
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
    function(event) {
        document.getElementById('dino-compare').style.display = 'none';

        const form = document.querySelector('form');
        const data = Object.fromEntries(new FormData(form).entries());

        human = {};
        human.name = data.name;
        human.feet = data.feet;
        human.inches = data.inches;
        human.weight = data.weight;
        human.diet = data.diet.toLowerCase();
        human.title = human.name;
        human.image = 'images\\human.png';
        human.fact = '';

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
                '<img src=' + tile.image + ' style=\'max-width:100px\' />' +
                '<p>' + tile.fact + '</p>';

            document.getElementById('grid').append(temp);
        }
    },

);