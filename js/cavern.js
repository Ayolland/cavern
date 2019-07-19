// TO-DO

// - chasms + bridges
// - lanterns!
// - corpses
//      - can you encounter people who knew them?
// - trades
//      - can currently trade things you don't have!!!
//      - should not trade animals that force you to drop anything
//      - maybe trades should exclude certain goods/animals? IE: same for same
//      - some merchants can take advantage of you?
// - fights / alteractions
//      - bruised ego, broken leg
//      - winners / losers
// - roads
//      - troll subEvent
//      - ZOX subevent
//      - shrine subEvent
//      - take drugs subEvent
// - inns
// - shrines
//      - redo to take leader religion into account
// - more curiosities
// - leaders
//      - attractive / memorable traits
//      - addictions
//      - add immunites directly to leaders
// - backstory details
// - cites
//      - schools
//      - fortune tellers
//      - surgeons
//      - gates guarded by cultures
//      - libraries
//      - mingling
//      - performers
//      - holidays (track ones that have passed)
// - jokes
//      - more jokes
// - caves
//      - magma furnaces cause alchol to explode?
//      - add swamps
//      - encounter leviathans in tunnels
// - graveyard
//      - keep track of leaders who have died this journey
//      - leaders who have died in previous journeys in abandoned camps
// - Journeys / Cards
//      - more Cards
//      - more Journeys
// - cultures
//      - add proverbs
// - Win State
//      - epilouges for all surving leaders

// - books (done for now)
// - goods (done for now)
// - sicknesses (done for now)
// - preset parties (done for now)

// - non-bitsy UI
//      - splash modal
//      - status modal
//      - glossary modal
//      - settings modal
//      - about modal
//      - help modal
//      - trade modal
//      - slaughter animals modal
//      - win game modal (done for now)
//      - start settings (music/vegetarian/rations) modal
//      - custom party modal (done for now)
//      - save last party
//      - ford river choices
//      - trail display
//      - print CSS
//      - error catching

// BUGS
// - banned jobs not working
// - despair starvation immunity too easy
// - eating way too much food?
// - can currently trade things you don't have - fixed? maybe animals only
// - spider event 'Papa Rye is undefined wounded'
// - finding corpse in cave triggers wrong landmark
// - leaders can have negative stats - fixed?

// helpers

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollDice(number,sides){
    number = (typeof(number) === 'number') ? number : 1;
    sides = (typeof(sides) === 'number') ? sides : 20;
    var total = 0;
    for (var i = number; i > 0; i--) {
        total += getRandomInt(1,sides);
    }
    return total;
}

function shuffle(array) {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function listForm(arrOfStrings){
    if (arrOfStrings.length <= 0){
        return "";
    }
    return arrOfStrings.join('\n');
}

function sentenceForm(input,plural){
    if ( typeof(input) !== "object"){
        return;
    }
    if( Array.isArray(input)){
        if( arraysEqual(input,Object.keys(trailGame.sicknesses)) ){
            return 'all known ailments';
        }
        if (plural){
            var newInput = [];
            input.map(function(string){
                newInput.push(pluralize(string));
            });
            input = newInput;
        }
        switch (input.length){
            case 0:
                return 'nothing';
            case 1:
                return input[0];
            break;
            case 2:
                return input[0] + ' and ' + input[1];
            break;
            case 3:
            default:
                return input.slice(0, input.length - 1).join(', ') + ", and " + input.slice(-1);
            break;
        } 
    } else {
        var keys = Object.keys(input);
        var array = [];
        if( keys.length > 0){
            for (var i = 0; i <= keys.length - 1; i++) {
                var key = keys[i];
                var fragment = input[key] === 1 ? indefiniteArticle(key) : `${input[key]} ${pluralize(key)}`;
                array.push(fragment);
            }
            return sentenceForm(array);
        } else {
            return "nothing";
        }
    }
}

function pluralize(string){
    string = string.toLowerCase();

    var specialCases = trailGame.pluralSpecialCases || {};
    var ignoreCases = trailGame.pluralIgnoreCases || [];

    var lastChar = string.substring(string.length - 1);
    var lastTwoChar = string.substring(string.length - 2);
    if( Object.keys(specialCases).indexOf(string) > -1){
        return specialCases[string];
    }
    if(ignoreCases.indexOf(string) > -1){
        return string
    }
    if (lastTwoChar === 'ch' || lastTwoChar === 'ss'){
        return string + 'es';
    }
    if (lastChar === 's'){
        return string;
    }
    if (lastChar === 'y'){
        return string.substring(0,string.length - 1) + 'ies';
    }
    if (lastChar === 'x'){
        return string.substring(0,string.length - 1) + 'es';
    }
    return string + 's';
}

function ordinalSuffix(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function romanNumeral (num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

function zeroToTenString (num) {
    var words = ['zero','one','two','three','four','five','six','seven','eight','nine','ten'];
    return words[num];
}

function spacesToDashes(string){
    return string.replace(/ /g, '-');
}

function toClassName(string){
    return spacesToDashes(string).toLowerCase();
}

function clamp(value,min, max) {
  return Math.min(Math.max(value, min), max);
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function toTitleCase(str) {
    return str.replace(/[\w']+/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1);
    });
}

function indefiniteArticle(word){
    var letter = word.charAt(0);
    var article = ("aeiouAEIOU".indexOf(letter) === -1) || letter === '' ? 'a' : 'an';
    return article + ' ' + word;
}

function debug(value){
    console.log("GAME DEBUG MESSAGE: " + value);
}

// global variables

var trailGame = {};

trailGame.gods = {
    "The Deep Saints": {
        follower: 'acolyte of the Deep Saints',
        followerPlural: 'acolytes of the Deep Saints',
        objects: ['illuminated icons','code book'],
        markings: [],
        burial: 'cremate them on a pyre',
        holiday: 'the week of the Saints',
        canHaveImage: true,
        enemies: ['Gravity'],
        material: 'platinum',
        craftPairs: [['crystal sunlight','cook'],['spider camel parmesan','make']],
    },
    "ZOX": {
        follower: 'agent of ZOX',
        followerPlural: 'agents of ZOX',
        objects: ['crystal amulet','vial of dark energy'],
        markings: ['interplanar scars'],
        burial: 'send their body through an interdimensional gate',
        holiday: 'Feast of Many Planes',
        canHaveImage: false,
        enemies: ["Sister Serpent-Eyes","The Hanged One","The Purple Mask","The First Crab","Magol"],
        material: 'obsidian',
        craftPairs: [['black milk','condense'],['bone figurine','craft']],
    },
    "Sister Serpent-Eyes": {
        follower: 'serpent cultist',
        followerPlural: 'serpent cultists',
        objects: ['serpent staff'],
        markings: ["scales", "slitted eyes", "serpentine tattoo"],
        burial: "mummify them with salt",
        holiday: "Sister Serpent-Eyes' ascendance",
        canHaveImage: true,
        enemies: ['ZOX','The Turtle-Father'],
        material: 'salt',
        craftPairs: [['salt','mine'],['dowsing rod','enchant']],
    },
    "The Hanged One": {
        follower: 'disciple of the Hanged One',
        followerPlural: 'disciples of the Hanged One',
        objects: ["knotted rosary","divination cards","ankle bracelets"],
        markings: [],
        burial: "pierce their heart and hang them by their feet",
        holiday: "Banishment Day",
        canHaveImage: true,
        enemies: ['Magol','ZOX'],
        material: 'copper',
        craftPairs: [['spider-silk rope','braid'],['hanging tea','grow'],['Roshian blue cheese','make']],
    },
    "Gravity": {
        follower: 'Gravity worshiper',
        followerPlural: 'Gravity worshipers',
        objects: ["engraved plumb bob", "book of ritual formulae", "leaden pendant"],
        markings: ["algebraic tattoo"],
        burial: "leave them be",
        holiday: "The Magnetic Solstice",
        canHaveImage: false,
        enemies: ['The Deep Saints','The Turtle-Father'],
        material: 'lead',
        craftPairs: [['plumb bob','smelt'],["deepwater whiskey",'distill']],
    },
    "The Air-Bringer": {
        follower: 'ancient wind worshiper',
        followerPlural: 'ancient wind worshipers',
        objects: ["pinwheel","chimes"],
        markings: ["archaic attire"],
        burial: "cremate them and scatter their ashes",
        holiday: "The Wind Festival",
        canHaveImage: true,
        enemies: [],
        material: 'granite',
        craftPairs: [['mystic sextant','enchant'],['mushroom ale','brew']]
    },
    "The Purple Mask": {
        follower: 'follower of The Purple Mask',
        followerPlural: 'followers of The Purple Mask',
        objects: ["marotte","belled collar"],
        markings: ["facial tattoo"],
        burial: "compost their body",
        holiday: "the Harvest Dance",
        canHaveImage: true,
        enemies: ['ZOX'],
        material: 'marble',
        craftPairs: [['gas mask','craft'],['harness','craft']],
    },
    "The First Crab": {
        follower: 'crab-folk',
        followerPlural: 'crab-folk',
        objects: ["carapace"],
        markings: ["carapace","eye-stalks","pincers"],
        burial: "leave them for scavengers",
        holiday: "the Crab New Year",
        canHaveImage: true,
        enemies: ['ZOX'],
        material: 'sandstone',
        craftPairs: [['fishing rod','craft'],['ruby','mine']]
    },
    "Magol": {
        follower: 'loyal thrall of Magol',
        followerPlural: 'thralls of Magol',
        objects: ['infernal candle',"brimstone prayer beads"],
        markings: ["forked tongue","dark aura"],
        burial: "say an infernal prayer as we burn their body",
        holiday: "Banishment Day",
        canHaveImage: true,
        enemies: ['The Hanged One','ZOX'],
        material: 'brimstone',
        craftPairs: [['hell cheddar','make'],["Magol's best absinthe",'distill'],["infernal coffee",'cultivate'],["Magol's root",'grow']]
    },
    "The Turtle-Father": {
        follower: 'separatist turtle catcher',
        followerPlural: 'separatist turtle catchers',
        objects: ['turtle-battle medals','field guide','antique turtle-balls'],
        markings: [],
        burial: 'grind their bones for turtle food',
        holiday: 'the start of burmation season',
        canHaveImage: true,
        enemies: ['ZOX','Sister Serpent-Eyes','Gravity'],
        material: 'calcite',
        craftPairs: [['turtle cage','craft'],["mother leaf",'grow']]
    }
};

trailGame.characterClasses = {};
trailGame.characterClasses.mainClasses = {
    'brawler': {
        stats: {
            culture: 0, wits: 1, bravery: 4
        }
    },
    'schemer': {
        stats: {
            culture: 1, wits: 3, bravery: 1
        }
    },
    'academic': {
        stats: {
            culture: 3, wits: 2, bravery: 0
        }
    },
    'generalist': {
        stats: {
            culture: 2, wits: 2, bravery: 2
        }
    },
    'wizard': {
        stats: {
            culture: 3, wits: 3, bravery: 0
        }
    },
    'fool': {
        stats: {
            culture: 2, wits: 0, bravery: 3
        }
    }
};

trailGame.maxLeaderStat = 5;

function generateMagic(getAll){
    var magic = ["ice", "fire", "void", "storm"];
    return getAll === true ? magic : shuffle(magic).shift();
}

function generateWizard(getAll){
    var wizards = ["sorcerer", "sorceress", "warlock", "conjurer", "summoner", "artificer", "geomancer", "necromancer", "alchemist", "pyromancer", "demonologist"];
    generateMagic(true).map(function(magic){
        wizards.push(`${magic} witch`);
        wizards.push(`${magic} wizard`);
    });
    return getAll === true ? wizards : shuffle(wizards).shift();
}

function generateEntertainer(getAll){
    var fools = ["piper", "harper", "singer", "dancer", "jester", "juggler", "acrobat", "drummer", "horn player", "storyteller", "actor", "mime"];
    return getAll === true ? fools : shuffle(fools).shift();
}

trailGame.characterClasses.subClasses = {

};

trailGame.universalJobs = [];

function addJobsToSubClasses(cultureObj,pushTo,racesArr){
    var jobClasses = ['brawler','schemer','academic','generalist'];
    jobClasses.map(function(jobClass){
        cultureObj[jobClass+'s'].map(function(subClass){
            var subClassObj = trailGame.characterClasses.subClasses[subClass];
            if(subClassObj === undefined){
                trailGame.characterClasses.subClasses[subClass] = {
                    mainClass: jobClass,
                    races: [...racesArr],
                };
            } else {
                racesArr.map(function(raceName){
                    if(subClassObj.races.indexOf(raceName) === -1){
                       subClassObj.races.push(raceName); 
                    }
                });
            }
            pushTo.push(subClass);
        });
    });
}

trailGame.cultures = {
    'Roshian': {
        brawlers: ["mercenary", "knight"],
        schemers: ["turtle catcher"],
        academics: ["aristocrat"],
        generalists: ["miner","cooper"],
        bannedJobs : [],
        gods : ['Gravity','ZOX','The Deep Saints','The Hanged One','The Purple Mask','The Turtle-Father'],
        capital: 'Ulm-Rosh',
        immunities: [],
        statBonuses: {},
        insults : ['pig-headed','ignorant'],
    },
    'Fungaloid': {
        brawlers: ["musketeer", "centurion"],
        schemers: ["overseer", "agent"],
        academics: ["bureaucrat","engineer"],
        generalists: ["legionaire","miner"],
        bannedJobs : [],
        gods : ['Gravity'],
        capital: 'Fungaloid-Ancestral-Homeland',
        immunities: ['starvation'],
        statBonuses: {bravery: -1},
        insults : ['soulless','rotting'],
    },
    'Crab-Folk': {
        brawlers: ["wrestler", "mutant","brute"],
        schemers: ["spawner"],
        academics: ["logician","scribe"],
        generalists: ["pilgrim"],
        bannedJobs : [],
        gods : ["The First Crab","The First Crab","The First Crab","ZOX","Gravity"],
        capital: 'The City in the Sea',
        immunities: [],
        statBonuses: {bravery: 2},
        insults : ['thick-skulled','pea-brained'],
    },
    'Amazon': {
        brawlers: ['archer','dragoon','valkyrie'],
        schemers: ['ranger','rogue',"turtle catcher"],
        academics: ['mystic'],
        generalists: ['hoplite'],
        bannedJobs : [],
        gods : ['The Air-Bringer','ZOX','The Deep Saints','The Purple Mask','The Turtle-Father'],
        capital: 'Ancient Themiscyra',
        immunities: [],
        statBonuses: {wits: 1, bravery: 1},
        insults : ['ugly','emotional'],
    },
    'Tud': {
        brawlers: [],
        schemers: ["explorer","rogue"],
        academics: ["emmisary",'mystic'],
        generalists: ["brood porter", "miner"],
        bannedJobs : [],
        gods : ['ZOX','The Deep Saints','The Hanged One','The Purple Mask','Gravity'],
        capital: 'the Spawning Pools',
        immunities: [],
        statBonuses: {culture: 1, wits: 1},
        insults : ['cowardly','disgusting'],
    },
    'Serpent Cultist': {
        brawlers: ["brute", "death-spitter"],
        schemers: ["hydra"],
        academics: ["high gorgon"],
        generalists: ["flagellant", "acolyte"],
        bannedJobs : ["priest"],
        gods : ['Sister Serpent-Eyes'],
        capital: 'the birthplace of Sister Serpent-Eyes',
        immunities: ['despair','starvation'],
        statBonuses: {},
        insults : ['two-faced','bottom-feeder'],
    },
    'Snout Goblin': {
        brawlers: ["archer", "irregular"],
        schemers: ["sprinter",],
        academics: ["mayor"],
        generalists: ["howler","bean farmer"],
        bannedJobs : [],
        gods : ["Magol","The Hanged One","ZOX","The Deep Saints"],
        capital: `Goblintown`,
        immunities: true,
        statBonuses: {wits: -1, bravery: -1},
        insults : ['puny','idiotic'],
    },
    'Demon': {
        brawlers: ["blood knight", "helldog tamer", "forge beast"],
        schemers: ["incubus", "succubus","helldog tamer"],
        academics: ["grief elemental"],
        generalists: ["sulfur imp"],
        bannedJobs : [],
        gods : ["Magol"],
        capital: `the Halls of Magol's Court`,
        immunities: true,
        statBonuses: {},
        insults : ['unholy','cursed'],
    },

};

addJobsToSubClasses({
    brawlers: ["guard"],
    schemers: ["adventurer","navigator","guide","turtle catcher","trapper","trader"],
    academics: ["chaplain","scribe","engineer","priest"],
    generalists: ["pilgrim","cook"],
},trailGame.universalJobs,Object.keys(trailGame.cultures));

Object.keys(trailGame.cultures).map(function(cultureName,index){
    var cultureObj = trailGame.cultures[cultureName];
    cultureObj.name = cultureName;
    cultureObj.jobs = [...trailGame.universalJobs];
    cultureObj.rarity = index;
    addJobsToSubClasses(cultureObj,cultureObj.jobs,[cultureName]);
    cultureObj.bannedJobs.map(function(bannedJob){
        var bannedIndex = cultureObj.jobs.indexOf(bannedJob);
        if (bannedIndex !== -1){
            cultureObj.bannedJobs.splice(bannedIndex,1);
        }
    });
    cultureObj.gods.map(function(godName){
        if(trailGame.gods[godName].races !== undefined){
            trailGame.gods[godName].races.push(cultureName);
        } else {
            trailGame.gods[godName].races = [cultureName];
        }
    });

});

generateWizard(true).map(function(wizard){
    trailGame.characterClasses.subClasses[wizard] = {
        mainClass: 'wizard',
        races: Object.keys(trailGame.cultures)
    };
});

generateEntertainer(true).map(function(fool){
    trailGame.characterClasses.subClasses[fool] = {
        mainClass: 'fool',
        races: Object.keys(trailGame.cultures)
    };
});

trailGame.animalClasses = {
    'zebraphant':{
        speed: 2,
        shoes: 4,
        capacity: 150,
        hunger: 3,
        dexterity: 1,
        ferocity: 15,
        meat: 200,
        buy: 400,
        sell: 300,
        pet: false,
        turtle: false,
    },
    'spider camel':{
        speed: 10,
        shoes: 8,
        capacity: 45,
        hunger: 1,
        dexterity: 6,
        ferocity: 3,
        meat: 60,
        buy: 150,
        sell: 90,
        pet: false,
        turtle: false,
    },
    'skeletal steed':{
        speed:7,
        shoes: 4,
        capacity: 25,
        hunger: 0,
        dexterity: 4,
        ferocity: 5,
        meat: 0,
        buy: 100,
        sell: 90,
        pet: false,
        turtle: false,
    },
    'fungaloid-quadruped':{
        speed: 5,
        shoes: 4,
        capacity: 90,
        hunger: 2,
        dexterity: 3,
        ferocity: 2,
        meat: 90,
        buy: 100,
        sell: 50,
        pet: false,
        turtle: false,
    },
    'pack millipede':{
        speed: 1,
        shoes: 300,
        capacity: 150,
        hunger: 2,
        dexterity: 10,
        ferocity: 1,
        meat: 30,
        buy: 300,
        sell: 250,
        pet: false,
        turtle: false,
    },
    'hell dog':{
        speed: 5,
        shoes: 0,
        capacity: 5,
        hunger: 1,
        dexterity: 4,
        ferocity: 3,
        meat: 10,
        buy: 25,
        sell: 20,
        pet: true,
        turtle: false,
    },
    'cave chicken':{
        speed: 4,
        shoes: 0,
        capacity: 0,
        hunger: 1,
        dexterity: 5,
        ferocity: 0,
        meat: 10,
        buy: 10,
        sell: 15,
        pet: true,
        turtle: false,
    },
    'land crab':{
        speed: 3,
        shoes: 0,
        capacity: 2,
        hunger: 1,
        dexterity: 5,
        ferocity: 4,
        meat: 15,
        buy: 15,
        sell: 20,
        pet: true,
        turtle: false,
    },
    'spore pup':{
        speed: 4,
        shoes: 0,
        capacity: 1,
        hunger: 1,
        dexterity: 6,
        ferocity: 0,
        meat: 5,
        buy: 5,
        sell: 15,
        pet: true,
        turtle: false,
    },
    'cat':{
        speed: 4,
        shoes: 0,
        capacity: 0,
        hunger: 1,
        dexterity: 10,
        ferocity: 3,
        meat: 5,
        buy: 5,
        sell: 6,
        pet: true,
        turtle: false,
    },
    'fungaloid-small-quadruped':{
        speed: 5,
        shoes: 0,
        capacity: 3,
        hunger: 1,
        dexterity: 2,
        ferocity: 1,
        meat: 40,
        buy: 25,
        sell: 50,
        pet: true,
        turtle: false,
    },
};

trailGame.turtleClasses = [
    "mud", "spotted", "brown", "green", "mottled", "grass", "horned", "moss"
];
generateStone(true).map(function(stone){
    trailGame.turtleClasses.push(stone);
});
generateMetal(true).map(function(metal){
    trailGame.turtleClasses.push(metal);
});
generateMagic(true).map(function(magic){
    trailGame.turtleClasses.push(magic);
});
generateGem(true).map(function(gemPair){
    trailGame.turtleClasses.push(gemPair[0]);
});
["king", "psi", "ghost", "blue", "skull", "winged", "seven-headed"].map(function(rare){
    trailGame.turtleClasses.push(rare);
});

trailGame.turtleClasses.map(function(turtleClass,index){
    var animalClass = turtleClass + ' turtle';
    trailGame.animalClasses[animalClass] = {
        speed: 1,
        shoes: 0,
        capacity: turtleClass === 'ghost' ? 0 : Math.round(index * .25),
        hunger: turtleClass === 'ghost' ? 0 : 1,
        dexterity: 0,
        ferocity: 0,
        meat: turtleClass === 'ghost' ? 0 : clamp(1 + Math.round(index),1,35),
        buy: 10 + Math.round(index * index * .1),
        sell: 15 + Math.round(index * index * .33),
        pet: false,
        turtle: true,
    }
});

trailGame.riverClasses = {
    'dried up':{
        minSpeed: 1,
        maxSpeed: 1,
        minDepth: 0,
        maxDepth: 2,
        minWidth: 1,
        maxWidth: 4
    },
    'tranquil':{
        minSpeed: 1,
        maxSpeed: 4,
        minDepth: 1,
        maxDepth: 5,
        minWidth: 1,
        maxWidth: 6
    },
    'trickling':{
        minSpeed: 1,
        maxSpeed: 2,
        minDepth: 1,
        maxDepth: 3,
        minWidth: 3,
        maxWidth: 7
    },
    'crystal clear':{
        minSpeed: 1,
        maxSpeed: 2,
        minDepth: 1,
        maxDepth: 8,
        minWidth: 4,
        maxWidth: 10
    },
    'rushing':{
        minSpeed: 5,
        maxSpeed: 7,
        minDepth: 4,
        maxDepth: 8,
        minWidth: 5,
        maxWidth: 10
    },
    'raging':{
        minSpeed: 7,
        maxSpeed: 10,
        minDepth: 7,
        maxDepth: 10,
        minWidth: 1,
        maxWidth: 5
    },
}

trailGame.trapClasses = {
    'fire':{
        damageMin: 2,
        damageMax: 10,
        sicknessName: 'third-degree burns',
        causeOfDeath: 'burnt to a charred husk',
        activation: 'ignites',
        escape: 'escape only slightly singed',
        verbPastTense: 'burnt',
        trapSpeed: 8,
    },
    'acid':{
        damageMin: 2,
        damageMax: 10,
        sicknessName: 'acid burns',
        causeOfDeath: 'disintegrated by a gout of acid',
        activation: 'unleashes',
        escape: 'shield themselves from the splatter',
        verbPastTense: 'disfigured',
        trapSpeed: 8,
    },
    'spikes':{
        damageMin: 4,
        damageMax: 10,
        sicknessName: 'battle wounds',
        causeOfDeath: 'impaled on slender spikes',
        activation: 'springs',
        escape: 'quickly dodge out of the way',
        verbPastTense: 'wounded',
        trapSpeed: 6,
    },
    'crusher':{
        damageMin: 7,
        damageMax: 10,
        sicknessName: 'a broken leg',
        causeOfDeath: 'crushed beneath the descending ceiling',
        activation: 'triggers',
        escape: 'squeeze out from underneath at the last minute',
        verbPastTense: 'cronched',
        trapSpeed: 4,
    },
    'suction':{
        damageMin: 10,
        damageMax: 10,
        sicknessName: undefined,
        causeOfDeath: 'sucked beneath the surface, never to be seen again',
        activation: 'is caught in',
        escape: 'pull themselves away before going under',
        verbPastTense: 'slorped',
        trapSpeed: 3,
    }
}

Object.keys(trailGame.animalClasses).map(function(animalName,index){
    var animal = trailGame.animalClasses[animalName];
    
    animal.appetizing = ( (animal.meat * animal.meat) / ( (animal.capacity + animal.sell) * (animal.pet ? 5 : 1) ) );
});

trailGame.animalsByAppetizing = Object.keys(trailGame.animalClasses).sort(function(animalNameA,animalNameB){
    return trailGame.animalClasses[animalNameB].appetizing -  trailGame.animalClasses[animalNameA].appetizing;
});

trailGame.animalsByCapacity = Object.keys(trailGame.animalClasses).sort(function(animalA,animalB){
    return trailGame.animalClasses[animalA].capacity -  trailGame.animalClasses[animalB].capacity;
});

trailGame.pachyderms = [];
Object.keys(trailGame.animalClasses).map(function(animalName,index){
    if (trailGame.animalClasses[animalName].shoes > 0){
        trailGame.pachyderms.push(animalName);
    }
});

trailGame.nonPachyderms = [];
Object.keys(trailGame.animalClasses).map(function(animalName,index){
    if (trailGame.animalClasses[animalName].shoes === 0){
        trailGame.nonPachyderms.push(animalName);
    }
});

trailGame.pets = [];
Object.keys(trailGame.animalClasses).map(function(animalName,index){
    if (trailGame.animalClasses[animalName].pet){
        trailGame.pets.push(animalName);
    }
});

trailGame.turtles = [];
Object.keys(trailGame.animalClasses).map(function(animalName,index){
    if (trailGame.animalClasses[animalName].turtle){
        trailGame.turtles.push(animalName);
    }
});

trailGame.sicknesses = {
    'starvation':{
        cureChance: 20,
        damageMax: 2,
        damageMin: 0,
        contractable: false,
        contractPhrase: 'become weak with',
        contagiousness: 0,
    },
    'spore fever':{
        cureChance: 5,
        damageMax: 1,
        damageMin: 1,
        contractable: true,
        contractPhrase: 'begun showing signs of',
        contagiousness: 5,
    },
    'ghoul rot':{
        cureChance: 7,
        damageMax: 3,
        damageMin: 0,
        contractable: true,
        contractPhrase: 'developed',
        contagiousness: 2,
    },
    'demon flu':{
        cureChance: 5,
        damageMax: 2,
        damageMin: 1,
        contractable: true,
        contractPhrase: 'become sick with',
        contagiousness: 5,
    },
    'rune rash':{
        cureChance: 6,
        damageMax: 1,
        damageMin: 0,
        contractable: true,
        contractPhrase: 'come down with a bad case of',
        contagiousness: 4,
    },
    'mole pox':{
        cureChance: 8,
        damageMax: 4,
        damageMin: 0,
        contractable: true,
        contractPhrase: 'developed',
        contagiousness: 4,
    },
    'moth cough':{
        cureChance: 7,
        damageMax: 1,
        damageMin: 0,
        contractable: true,
        contractPhrase: 'contracted',
        contagiousness: 4,
    },
    'internal bleeding':{
        cureChance: 8,
        damageMax: 2,
        damageMin: 0,
        contractable: false,
        contractPhrase: 'shown symptoms of',
        contagiousness: 0,
    },
    'battle wounds':{
        cureChance: 7,
        damageMax: 3,
        damageMin: 1,
        contractable: false,
        contractPhrase: 'taken some',
        contagiousness: 0,
    },
    'third-degree burns':{
        cureChance: 8,
        damageMax: 4,
        damageMin: 1,
        contractable: false,
        contractPhrase: 'become covered in',
        contagiousness: 0,
    },
    'acid burns':{
        cureChance: 5,
        damageMax: 4,
        damageMin: 1,
        contractable: false,
        contractPhrase: 'lingering damage from',
        contagiousness: 0,
    },
    'despair':{
        cureChance: 20,
        damageMax: 1,
        damageMin: 1,
        contractable: false,
        contractPhrase: 'fallen into',
        contagiousness: 0,
    },
    'dysentery':{
        cureChance: 6,
        damageMax: 4,
        damageMin: 1,
        contractable: true,
        contractPhrase: 'contracted',
        contagiousness: 2,
    },
    'black stripe':{
        cureChance: 9,
        damageMax: 10,
        damageMin: 0,
        contractPhrase: 'have begun showing symptoms of',
        contagiousness: 5,
    },
    'prysmatic fever':{
        cureChance: 5,
        damageMax: 5,
        damageMin: 0,
        contractable: false,
        contractPhrase: 'become wild with',
        contagiousness: 0,
    },
    'frostbite':{
        cureChance: 2,
        damageMax: 3,
        damageMin: 0,
        contractable: false,
        contractPhrase: 'contracted',
        contagiousness: 0,
    },
    'nightmares':{
        cureChance: 2,
        damageMax: 1,
        damageMin: 0,
        contractable: false,
        contractPhrase: 'become haunted by',
        contagiousness: 0,
    },
    'an ancient curse':{
        cureChance: 9,
        damageMax: 2,
        damageMin: 1,
        contractable: false,
        contractPhrase: 'become ensorceled by',
        contagiousness: 0,
    },
    'a broken leg':{
        cureChance: 8,
        damageMax: 3,
        damageMin: 1,
        contractable: false,
        contractPhrase: 'gone and got',
        contagiousness: 0,
    },
    'a bruised ego':{
        cureChance: 2,
        damageMax: 1,
        damageMin: 0,
        contractable: false,
        contractPhrase: 'suffered',
        contagiousness: 0,
    },
    'pneumonia':{
        cureChance: 7,
        damageMax: 2,
        damageMin: 1,
        contractable: false,
        contractPhrase: 'developed',
        contagiousness: 0,
    },
    'centipede venom': {
        cureChance: 5,
        damageMax: 3,
        damageMin: 0,
        contractable: false,
        contractPhrase: 'has developed a reaction to',
        contagiousness: 0,
    }
}

trailGame.contractableSickneses = [];
Object.keys(trailGame.sicknesses).map(function(sicknessName,index){
    if (trailGame.sicknesses[sicknessName].contractable){
        trailGame.contractableSickneses.push(sicknessName);
    }
});

trailGame.monsterClasses = {
    'filth ogre':{
        speed: 5,
        ferocity: 10,
        wits: 1,
        maxPackSize: 8,
        packName: 'family',
        sickness : 'dysentery',
    },
    'pit mauler':{
        speed: 2,
        ferocity: 12,
        wits: 4,
        maxPackSize: 3,
        packName: 'confusion'
    },
    'feral hell dog':{
        speed: 5,
        ferocity: 6,
        wits: 2,
        maxPackSize: 20,
        packName: 'pack',
        sickness: 'third-degree burns',
    },'flue harpy':{
        speed: 7,
        ferocity: 6,
        wits: 5,
        maxPackSize: 10,
        packName: 'affliction',
    },'cave lion':{
        speed: 4,
        ferocity: 25,
        wits: 3,
        maxPackSize: 3,
        packName: 'pride'
    },'six-legged tiger':{
        speed: 6,
        ferocity: 17,
        wits: 5,
        maxPackSize: 3,
        packName: 'ambush',
        sickness: 'a broken leg'
    },'yeti':{
        speed: 5,
        ferocity: 10,
        wits: 6,
        maxPackSize: 10,
        packName: 'tribe',
        sickness: 'internal bleeding'
    },'centipede':{
        speed: 5,
        ferocity: 8,
        wits: 4,
        maxPackSize: 5,
        packName: 'writhing mass',
        sickness: 'centipede venom'
    }
};

//"skeleton", "vampyre", "wraith", "ghoul", "wight", "corpse-worm", "spectre", "phantasm"
trailGame.undeadClasses = {
    'skeleton':{
        speed: 4,
        ferocity: 1,
        wits: 1,
        maxPackSize: 20,
        packName: 'procession'
    },
    'wight':{
        speed: 2,
        ferocity: 2,
        wits: 1,
        maxPackSize: 20,
        packName: 'horde'
    },
    'ghoul':{
        speed: 2,
        ferocity: 3,
        wits: 2,
        maxPackSize: 15,
        packName: 'shroud',
        sickness: 'ghoul rot',
    },
    'spectre':{
        speed: 3,
        ferocity: 4,
        wits: 2,
        maxPackSize: 15,
        packName: 'congress'
    },
    'phantasm':{
        speed: 4,
        ferocity: 5,
        wits: 3,
        maxPackSize: 15,
        packName: 'congress',
        sickness: 'nightmares',
    },
    'wraith':{
        speed: 5,
        ferocity: 6,
        wits: 4,
        maxPackSize: 10,
        packName: 'congress',
        sickness: 'demon flu',
    },
    'vampyre':{
        speed: 6,
        ferocity: 7,
        wits: 4,
        maxPackSize: 10,
        packName: 'congress',
        sickness: 'an ancient curse',
    },

};

// goods functions

function generateCommodity(getAll){
    var commodities = [
        ["grub honey", "comb", true],
        ["pemmican", "bag", true], 
        ["kefir", "jar", true],
        ["iron rations", "crate", true],
        ["hanging tea", "crate", false], 
        ["spices", "bundle", false],
        ["salt", "hunk", false],
        ["jerky", "side", true],
        ["infernal coffee", "bag", false],
        ["crude oil", "barrel", false],
    ];
    return getAll === true ? commodities : shuffle(commodities).shift()[0];
}

function generateGem(getAll){
    var gems = [
        ["agate", "geode"],
        ["amethyst", "cluster"],
        ["garnet", "cluster"],
        ["sapphire", "cluster"],
        ["emerald", "cluster"],
        ["ruby", "cluster"],
        ["diamond", "trove"]
    ];
    return getAll === true ? gems : shuffle(gems).shift()[0];
}

function generateCraft(getAll){
    var crafts = [
        ["fungus pillow",'bundle'], 
        ["mushroom cap bowl",'crate'], 
        ["mandrake doll",'collection'], 
        ["bone figurine",'collection'], 
        ["hex quilt",'bolt'], 
        ["spider-silk bracelet",'array'], 
        ["mollusk shell pendant",'assortment']
    ];
    return getAll === true ? crafts : shuffle(crafts).shift()[0];
}

function generateEquipment(getAll){
    var tools = [
        ["blanket","bundle"],
        ["bell", "menagerie"],
        ["plumb bob", "collection"],
        ["piton","crate"],
        ["cooking pot", "collection"],
        ["turtle cage", "palette"],
        ["machete", "crate"],
        ["ladder", "assortment"],
        ["fishing rod", "case"],
        ["pickaxe", "crate"],
        ["spider-silk rope", "cord"],
        ["explosive squib", "case"],
        ["gas mask", "crate"],
        ["compass","case"], 
        ["dowsing rod", "array"],
        ["flare", "magazine"],
        ["harness", "variety"],
        ["mystic sextant","set"],
    ];
    return getAll === true ? tools : shuffle(tools).shift()[0];
}

function generateDrug(getAll){
    var drugs = [
        ["moth dust", 'brick'],
        ["pineal extract", 'bottle'],
        ["crystal sunlight", 'jar'],
        ["Magol's root", 'crate'],
        ["mother leaf", 'stash'],
        ["black milk", 'jug'],
        ["centipede venom", 'ampoule'],
    ];
    return getAll === true ? drugs : shuffle(drugs).shift()[0];
}

function generateCheese(getAll){
    var cheese = [
        ["fungaloid-cheese-like-paste", "amphora"],
        ["Roshian blue cheese", "wheel"],
        ["spider camel parmesan", "wheel"],
        ["zebraphant mozzarella", "plait"],
        ["hell cheddar", "wheel"],
    ];
    return getAll === true ? cheese : shuffle(cheese).shift()[0];
}

function generateAlcohol(getAll){
    var alcohol = [
        ["grub mead", "pouch"],
        ["mushroom ale", "gourd"],
        ["deepwater whiskey", "jug"],
        ["Roshian gin", "bottle"],
        ["spiderwine", "cask"],  
        ["Magol's best absinthe", "decanter"],
    ];
    return getAll === true ? alcohol : shuffle(alcohol).shift()[0];
}

trailGame.goodsClasses = {
    'food' : { buy:1, sell:0, cacheName: 'crate', edible: true },
    'fools gold' : { buy:50, sell:10, cacheName: 'chunk', edible: false },
    'ancient artifact' : {buy: 100, sell: 125, cacheName: 'cache', edible: false},
    'fossil' : {buy: 75, sell: 100, cacheName: 'deposit', edible: false},
};

generateCommodity(true).map(function(commodity,index){
    trailGame.goodsClasses[commodity[0]] = {
        buy: 2 + Math.round(index * index * .33),
        sell: 4 + Math.round(index * index * .75),
        cacheName: commodity[1],
        edible: commodity[2],
    }
});

generateGem(true).map(function(gem,index){
    trailGame.goodsClasses[gem[0]] = {
        buy: 15 + 15 * index,
        sell: 25 + 25 * index,
        cacheName: gem[1],
        edible: false,
    }
});

generateCraft(true).map(function(craft,index){
    trailGame.goodsClasses[craft[0]] = {
        buy: 2 + 2 * index,
        sell: 4 + 5 * index,
        cacheName: craft[1],
        edible: false,
    }
});

generateEquipment(true).map(function(tool,index){
    trailGame.goodsClasses[tool[0]] = {
        buy: 2 + 1 * index,
        sell: 3 + 3 * index,
        cacheName: tool[1],
        edible: false,
    }
});

generateDrug(true).map(function(drug,index){
    trailGame.goodsClasses[drug[0]] = {
        buy: 10 + 7 * index,
        sell: 15 + 9 * index,
        cacheName: drug[1],
        edible: false,
    }
});

generateCheese(true).map(function(cheese,index){
    trailGame.goodsClasses[cheese[0]] = {
        buy: 7 + 4 * index,
        sell: 18 + 6 * index,
        cacheName: cheese[1],
        edible: true,
    }
});

generateAlcohol(true).map(function(alcohol,index){
    trailGame.goodsClasses[alcohol[0]] = {
        buy: 9 + 10 * index,
        sell: 15 + 17 * index,
        cacheName: alcohol[1],
        edible: false,
    }
});

trailGame.goodsBySellPrice = Object.keys(trailGame.goodsClasses).sort(function(goodsA,goodsB){
    return trailGame.goodsClasses[goodsA].sell -  trailGame.goodsClasses[goodsB].sell;
});
trailGame.goodsBySellPrice.splice(trailGame.goodsBySellPrice.indexOf('food'),1);

trailGame.weekLength = 5;

trailGame.pluralIgnoreCases = [
    'salt',
    'fools gold',
    'grub honey',
    'hanging tea',
    'tud teeth',
    'crude oil',
    'food',
    'jerky',
    'kefir',
    'pemmican',
    'infernal coffee',
    'ulm-rosh',
    'crab-folk',
    'roshian',
];

generateDrug(true).map(function(drugPair){
    trailGame.pluralIgnoreCases.push(drugPair[0].toLowerCase());
});
generateCheese(true).map(function(cheesePair){
    trailGame.pluralIgnoreCases.push(cheesePair[0].toLowerCase());
});
generateAlcohol(true).map(function(boozePair){
    trailGame.pluralIgnoreCases.push(boozePair[0].toLowerCase());
});
trailGame.pluralIgnoreCases = trailGame.pluralIgnoreCases.concat(generateLiquid(true));
trailGame.pluralIgnoreCases = trailGame.pluralIgnoreCases.concat(generateMetal(true));
trailGame.pluralIgnoreCases = trailGame.pluralIgnoreCases.concat(generateStone(true));
trailGame.pluralIgnoreCases = trailGame.pluralIgnoreCases.concat(Object.keys(trailGame.sicknesses));

trailGame.pluralSpecialCases = {
    'day':'days',
    'snake staff': 'snake staves',
    'book of ritual formulae' : 'books of ritual formulae',
    'centipede larva' : 'centipede larvae',
    'eldritch larva' : 'eldritch larvae',
};

// preset caravans

trailGame.parties = {
    cakeTheBlack : {
        title : 'Cake the Black',
        relative: 'Auntie Spider-ella',
        description: 'Cake runs a tight ship: just them and their two companions, speeding through the darkness laden with precious gems.',
        leaders : [
            { 
                name: 'Cake the Black',
                job: 'void witch',
                god: 'The Purple Mask',
                race: 'Amazon'
            },{
                name: 'Corvin',
                job: 'adventurer',
                god: 'Sister Serpent-Eyes',
                race: 'Serpent Cultist'
            },{
                name: 'Stephan',
                job: 'scribe',
                god: 'Sister Serpent-Eyes',
                race: 'Serpent Cultist'
            }
        ],
        animals : {
            'skeletal steed' : 6,
            'cat' : 2,
        },
        goods : {
            'mystic sextant' : 10,
            'garnet' : 70,
            'ruby' : 20,
            'food' : 200,
        }
    },
    clanRye : {
        title: 'Clan Rye',
        description: `The Rye are a family with a long tradition of turtle-catching. It's a slow march as they drive their herd to market.`,
        relative: 'Papa Jay Rye',
        leaders : [
            { 
                name: 'Brendon Jr.',
                job: 'turtle catcher',
                god: 'Gravity',
                race: 'Tud'
            },{
                name: 'Madlynn',
                job: 'guide',
                god: 'The Hanged One',
                race: 'Roshian'
            },{
                name: 'Dr. Brendon Rye',
                job: 'turtle catcher',
                god: 'Gravity',
                race: 'Tud'
            },{
                name: 'Kenan',
                job: 'explorer',
                god: 'Gravity',
                race: 'Tud'
            },{
                name: 'Large Angimus',
                job: 'wrestler',
                god: 'The First Crab',
                race: 'Crab-Folk'
            }
        ],
        animals : {
            'zebraphant' : 3,
            'moss turtle' : 100,
            'granite turtle': 50,
            'ghost turtle': 1,
        },
        goods : {
            'mother leaf' : 30,
            'grub honey' : 100,
            'jerky' : 40,
            'food' : 600 ,
        }
    },
    slimeSquad:{
        title: 'Slime-coated Squadron',
        relative: 'Uncle Ducko III',
        description: 'The Slime-coated Squadron is a ragtag band of adventurers. Can they keep the peace on their long journey?',
        leaders : [
            { 
                name: 'Gingham Jay',
                job: 'singer',
                god: 'Magol',
                race: 'Demon'
            },{ 
                name: "Lil' Grabthar",
                job: 'centurion',
                god: 'Gravity',
                race: 'Fungaloid'
            },{ 
                name: "Bluebell",
                job: 'brute',
                god: 'Sister Serpent-Eyes',
                race: 'Serpent Cultist'
            },{ 
                name: "Mirabelle Amethyst",
                job: 'high gorgon',
                god: 'Sister Serpent-Eyes',
                race: 'Serpent Cultist'
            },{ 
                name: "Petunia",
                job: 'howler',
                god: 'The Hanged One',
                race: 'Snout Goblin'
            },{ 
                name: "Joynar",
                job: 'mutant',
                god: 'The First Crab',
                race: 'Crab-Folk'
            },
        ],
        animals : {
            'spider camel' : 8,
        },
        goods : {
            'hex quilt' : 50,
            'bone figurine' : 50,
            'spider-silk rope' : 50,
            'food' : 240 ,
        }
    }
}

// card + journey functions

trailGame.cards = {
    start : {
        eventFunc: eventStartJourney,
        args: {}
    },
    caveHauntedPyramid : {
        eventFunc: eventCave,
        args: {caveType: 'haunted', hauntedType: 'ancient pyramid'}
    },
    caveStrangeCamp : {
        eventFunc: eventCave,
        args: {caveType: 'strange', strangeType: 'abandoned camp'}
    },
    caveTunnelRandom : {
        eventFunc: eventCave,
        args: {caveType: 'tunnel'}
    },
    safe : {
        eventFunc : eventSafeFlavor,
        args: {}
    },
    reshoe : {
        eventFunc : eventReshoe,
        args: {}
    },
    simpleTrade : {
        eventFunc : eventMakeTrade,
        args: {}
    },
}

trailGame.levels = {
    test : {
        title : 'Test City',
        description: `It's just a test level.`,
        sellMultiplier: 1,
        legs : {
            start : {
                cards : ['safe'],
                min: 3,
                max: 7,
                intervalCards: ['reshoe'],
                firstCard: 'simpleTrade',
                lastCard: 'caveHauntedPyramid',
                exits : [
                    {
                        key: 'legA',
                        title: 'take the long road', 
                        description: 'To the south runs a long, but relatively safe path.', 
                    },
                    {
                        key: 'legB',
                        title: 'take the dangerous road',
                        description: 'To the north there lies a short, dangerous path.', 
                    }
                ]
            },
            legA : {
                cards : ['safe','safe','caveTunnelRandom'],
                min: 7,
                max: 14,
                intervalCards: ['reshoe','reshoe'],
                firstCard: 'caveStrangeCamp',
                lastCard: 'caveStrangeCamp',
                exits : []
            },
            legB : {
                cards : ['caveTunnelRandom'],
                min: 3,
                max: 5,
                exits : [
                    {
                        key: 'legC',
                        title: 'this should be invisible', 
                        description: 'This leg is automatic.'
                    }
                ]
            },
            legC : {
                cards : ['caveHauntedPyramid'],
                exits : []
            }
        }
    }
}

function newJourney(journeyName){
    journeyName = journeyName || shuffle(Object.keys(trailGame.levels))[0];

    trailGame.journey = {...trailGame.levels[journeyName]};
    loadLegOfJourney();
}

function loadLegOfJourney(legName){
    legName = legName || 'start';
    var leg = trailGame.journey.legs[legName];
    leg.min = leg.min || leg.cards.length;
    leg.max = leg.max || leg.cards.length;
    leg.intervalCards = leg.intervalCards || [];
    var numberOfCards = getRandomInt(leg.min,leg.max);
    leg.deck = [];
    var cardPool = shuffle([...leg.cards]);
    var totalNumberOfIntervals = leg.intervalCards.length + 1;
    var intervalCounter = 1;
    for (var i = 1; i <= numberOfCards; i++) {
        if (!cardPool.length){
            cardPool = shuffle([...leg.cards]);
        }
        if (leg.firstCard !== undefined && i === 1){
            leg.deck.push(leg.firstCard);
        } else if (leg.lastCard !== undefined && i === numberOfCards){
            leg.deck.push(leg.lastCard);
        } else if (leg.intervalCards.length && i === Math.ceil(intervalCounter * numberOfCards / totalNumberOfIntervals)){
            leg.deck.push(leg.intervalCards[intervalCounter - 1]);
            intervalCounter++;
        } else {
            leg.deck.push(cardPool.shift());
        }
    }
    trailGame.journey.currentLeg = leg;
}

function runCardEvent(cardName){
    cardName = cardName || shuffle(Object.keys(trailGame.cards))[0];
    var cardObj = trailGame.cards[cardName];
    return cardObj.eventFunc(cardObj.args);
}

function runNextCard(){
    if(trailGame.journey.currentLeg.deck.length > 0){
        var cardName = 'start';
        if (trailGame.caravan.daysElapsed !== 0){
            cardName = trailGame.journey.currentLeg.deck.shift();
        }
        runAndLogEvent(runCardEvent,cardName);
    } else if (trailGame.journey.currentLeg.exits.length > 1){
        runAndLogEvent(eventStartCrossroads);
    } else if (trailGame.journey.currentLeg.exits.length === 1){
        var legKey = trailGame.journey.currentLeg.exits[0].key;
        loadLegOfJourney(legKey);
        runNextCard();
    } else {
        runAndLogEvent(eventGameWin);
    }
}

// leader functions

function generateSubClass(){
    var subClasses = Object.keys(trailGame.characterClasses.subClasses);
    shuffle(subClasses);
    return subClasses[0];
}

function generateName(argsObj){
    argsObj = argsObj || {};
    var prefixes = [
        `The `,
        `Large `,
        `Mr. `,
        `Mx. `,
        `Ms. `,
        `Dr. `,
        `Lil' `,
        `Old `,
        `Smelly `,
        "Cousin ",
        "Uncle ",
        "Auntie ",
        "Ultra ",
        "Papa ",
        "Mama ",
        "Mecha",
        "Spider-",
        "Rev. ",
        "Super ",
        "Dark "
    ]
    var partAs = [
        "Chris",
        "Brian",
        "Andre",
        "Jess",
        "Gerald",
        "Sofi",
        "Ed",
        "Rob",
        "Ann",
        "Laur",
        "Em",
        "Brend",
        "Shel",
        "Angel",
        "Demon",
        "Charl",
        "Britt",
        "Ben",
        "Eliz",
        "Beth",
        "Honk",
        "Punch",
        "Kat",
        "Glen",
        "Skip",
        "Pik",
        "Koop",
        "Mari",
        "Pip",
        "Harp",
        "Chad",
        "Meow",
        "Jon",
        "Jan",
        "Mitch",
        "Clar",
        "Max",
        "Steph",
        "Black",
        "Stank",
        "Al",
        "Meg",
        "Skull",
        "Flash",
        "Cake",
        "Nan",
        "Bows",
        "Toad",
        "Peach",
        "Sam",
        "Shy",
        "Bloop",
        "Pep",
        "Butt",
        "Cheas",
        'Tom',
        'Phil',
        'Jer',
        'Mad',
        'Beth',
        'Don',
        'Cor',
        'Ken',
        'Ang',
        'Mark',
        'Jay',
        'Spider',
        'God',
        'Mir',
        'Gin',
        'Blue',
        'Red',
        'Grab',
        'Joy',
        'Petun',
        'Boo',
        'Pig',
        'Gwen',
        'Duck',
        'Max',
    ];
    var midfixes = {
        "Chris": "t",
        "Em": "m",
        "Ben": "j",
        "Glen": "d",
        "Phil": "l",
        "Spider": "-",
        "Gin": "g",
        "Meg": 'a',
    };
    var onlyTwoParts = [
        "Sofi",
        "Laur",
        "Brend",
        "Shel",
        "Charl",
        "Eliz",
        "Clar",
        "God",
        "Mir",
        "Grab",
        "Petun",
        "Cheas",
        "Demon",
    ];
    var partBs = [
        "opher",
        "ina",
        "a",
        "ine",
        "ert",
        "e",
        "a",
        "don",
        "ie",
        'ia',
        "any",
        "in",
        "amin",
        "ish",
        "abeth",
        "achu",
        "lynn",
        "ica",
        "o",
        "er",
        "wick",
        "otron",
        "smith",
        "abelle",
        "imus",
        "amillian",
        "en",
        "beard",
        "tooth",
        "ward",
        "lee",
        "man",
        "boy",
        "ette",
        "bread",
        "ica",
        "us",
        "guy",
        "erony",
        "ip",
        "as",
        'emy',
        'ella',
        'an',
        'vin',
        'girl',
        'zilla',
        'ham',
        'bell',
        'thar',
        'nar',
    ];
    var suffixes = [
        " Monster",
        " Jones",
        " Smith",
        " Cooper",
        " Sponch",
        " Rye",
        ` ${capitalizeFirstLetter(shuffle(partAs)[0])}son`,
        ", PhD",
        ", DDS",
        ", MD",
        " the Grey",
        " the Black",
        " the White",
        " the Red",
        " Jr.",
        " III",
        ` of the ${generateAnimal().animalClass} clan`,
        ` ${toTitleCase(generateGem())}`,
        ` ${toTitleCase(generateMaterial())}`,
        ` ${toTitleCase(generateMetal())}smith`,
        ` the ${toTitleCase(generateLeviathan())} Killer`

    ];
    var partA = argsObj.partA || shuffle(partAs)[0];
    var forceTwoParts = onlyTwoParts.indexOf(partA) > 0;
    var isOnePart = argsObj.partB === false || (Math.random() >= 0.75 && !forceTwoParts);
    partA += midfixes[partA] !== undefined && !isOnePart ? midfixes[partA] : '';

    var possiblePrefix = (Math.random() >= 0.9 || argsObj.prefix === true) ? shuffle(prefixes)[0] : '';
    argsObj.prefix = argsObj.prefix === true ? possiblePrefix : argsObj.prefix;
    var prefix = argsObj.prefix || possiblePrefix;
    prefix = (prefix === '' || argsObj.prefix === false) ? '' : prefix;

    argsObj.partB = argsObj.partB === true ? shuffle(partBs)[0] : argsObj.partB;
    var partB = argsObj.partB || (!isOnePart ? shuffle(partBs)[0] : '');

    var possibleSuffix = (Math.random() >= 0.65 || argsObj.suffix === true) ? shuffle(suffixes)[0] : '';
    argsObj.suffix = argsObj.suffix === true ? possibleSuffix : argsObj.suffix;
    var suffix = argsObj.suffix || possibleSuffix;
    suffix = argsObj.suffix === false ? '' : suffix;
    suffix = (suffix === '' || rollDice() <= 15) ? suffix : generateExtravagantLastName();

    return `${prefix}${partA}${partB}${suffix}`;
}

function generateExtravagantLastName(){
    var possiblities = [
        ` ${generateName({partB:'er',prefix:false,suffix:false})}`,
        ` ${generateName({partB:'smith',prefix:false,suffix:false})}`,
        ` ${generateName({partB:'man',prefix:false,suffix:false})}`,
        ` ${generateName({prefix:false,suffix:false})}`,
        ` ${generateName({prefix:false,suffix:false})} ${generateName({prefix:false,suffix:false})}${rollDice() < 15 ? "" : ` the ${ordinalSuffix(rollDice(1,4))}`}`,
    ];
    return shuffle(possiblities)[0];
}

function addStatObjectToLeader(statObj,leaderObj){
    var statArr = Object.keys(statObj);
    statArr.map(function(statKey){
        var newVal = clamp(leaderObj['_'+statKey] + statObj[statKey], 0, trailGame.maxLeaderStat)
        leaderObj['_'+statKey] = newVal;
    });
}

function generateLeader(argObj){
    argObj = argObj || {};
    var leader = {};
    if ( argObj.god !== undefined ){
        argObj.religion = trailGame.gods[argObj.god];
    }
    if ( argObj.job !== undefined ){
        argObj.subClassName = argObj.job;
    }
    if ( argObj.race !== undefined ){
        argObj.cultureName = argObj.race;
    }
    if (argObj.subClassName !== undefined || argObj.religion !== undefined){
        var validRacesByJob = [];
        if ((argObj.job || argObj.subClassName) !== undefined){
            validRacesByJob = trailGame.characterClasses.subClasses[(argObj.job || argObj.subClassName)].races;
        }
        var validRacesByReligion = [];
        if (argObj.religion !== undefined){
            validRacesByReligion = argObj.religion.races;
        }
        var validRaces = [];
        validRacesByJob.map(function(raceName){
            if(validRacesByReligion.indexOf(raceName) !== -1){
                validRaces.push(raceName);
            }
        });
        argObj.cultureName = argObj.cultureName || shuffle(validRaces)[0];
    }
    var culture = generateCulture(false,argObj.cultureName);
    var generatedSubClassName = '';
    var diceRoll = rollDice(1,8);
    diceRoll = (argObj.job || argObj.subClassName) === 'wizard' ? 7 : diceRoll;
    diceRoll = (argObj.job || argObj.subClassName) === 'entertainer' ? 8 : diceRoll;
    switch(diceRoll){
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            generatedSubClassName = shuffle(culture.jobs)[0] ;
            break;
        case 6:
        case 7:
            generatedSubClassName = generateWizard();
            break;
        case 8:
            generatedSubClassName = generateEntertainer();
            break;
        default:
            generatedSubClassName = generateSubClass();
    }
    leader._god = argObj.god || shuffle(culture.gods)[0];
    leader._religion = generateReligion(false,leader._god);
    //exceptions
    generatedSubClassName = leader._god === 'The Turtle-Father' ? 'turtle catcher' : generatedSubClassName;
    var subClassName = (argObj.job || argObj.subClassName) || generatedSubClassName;
    subClassName = subClassName.toLowerCase();
    var subclass = trailGame.characterClasses.subClasses[subClassName];
    if(typeof(subclass) === "undefined"){
        subClassName = generateSubClass();
        subclass = trailGame.characterClasses.subClasses[subClassName];
    }
    var mainClass = trailGame.characterClasses.mainClasses[subclass.mainClass];
    leader._mainClass = subclass.mainClass;
    leader._race = culture;
    leader._raceName = culture.name
    leader._homeland = culture.capital;
    leader._name = argObj.name || generateName();
    leader._title = subClassName;
    var isPriest = subClassName === 'priest';
    leader._title += !isPriest ? '' : `${rollDice() > 10 ? '' : 'ess'} of ${leader._god}`;
    leader._health = 10;
    leader._culture = mainClass.stats.culture;
    leader._wits = mainClass.stats.wits;
    leader._bravery = mainClass.stats.bravery;
    leader._sicknesses = {};
    leader._immunities = {};
    leader._pastSicknesses = [];
    addStatObjectToLeader(leader._race.statBonuses,leader);
    gainImmunities([[[leader._id],leader._race.immunities]],true,leader);
    var totalLeaders = Object.keys(trailGame.leaders).length;
    leader._id = Date.now() + totalLeaders;
    return leader;
}

function addLeader(argObj){
    argObj = argObj || {};
    var leader = argObj.leader || generateLeader(argObj);
    var isOriginal = Object.keys(trailGame.leaders).length === 0;
    trailGame.leaders[leader._id] = leader;
    var action = isOriginal ? 'started a caravan!' : 'joined the caravan.';
    if ( isOriginal ){
        trailGame.caravan.founder = leader;
    }
    var message = `${leader._name} the ${leader._raceName} ${leader._title} has ${action}`;
    addToLedger(message);
    addMorale(1);
    return message;
}

function removeLeader(id,reason){
    var leader = trailGame.leaders[id];
    reason = reason !== undefined ? reason : leader._malady !== undefined ? `dies of ${leader._malady}` : 'dies unexpectedly';
    addToLedger( `${leader._name} the ${leader,_raceName} ${leader._title} ${reason}.`);
    delete trailGame.leaders[id];
    var moraleHit = Math.ceil(trailGame.caravan.morale / 3);
    removeMorale(moraleHit);
    //removeMorale(3);
}

function getRandomLeader(notThisLeaderId){
    var leaders = Object.keys(trailGame.leaders);
    if (leaders.length < 1){
        return generateLeader();
    }
    leaders = shuffle(leaders);
    var leader = trailGame.leaders[leaders[0]];
    if (notThisLeaderId !== undefined && notThisLeaderId.toString() === leaders[0] && leaders.length > 1){
        leader = trailGame.leaders[leaders[1]];
    }
    return leader;
}

function getLeadersFavoringGod(godName){
    var leaders = [];
    Object.keys(trailGame.leaders).map(function(leaderId){
        var leader = trailGame.leaders[leaderId];
        if (leader._god === godName){
            leaders.push(leader);
        }
    });
    return leaders;
}

function getLeadersOpposingGod(godName){
    var leaders = [];
    Object.keys(trailGame.leaders).map(function(leaderId){
        var leader = trailGame.leaders[leaderId];
        var religion = generateReligion(false,leader._god);
        if (religion.enemies.indexOf(godName) > -1){
            leaders.push(leader);
        }
    });
    return leaders;
}

function getLeadersNeutralToGod(godName){
    var leaders = [];
    Object.keys(trailGame.leaders).map(function(leaderId){
        var leader = trailGame.leaders[leaderId];
        var religion = generateReligion(false,leader._god);
        if (religion.enemies.indexOf(godName) < 0){
            leaders.push(leader);
        }
    });
    return leaders;
}

function getLeaderNames(arrayOfLeaders){
    var arrayOfNames = [];
    arrayOfLeaders.map(function(leaderObj){
        arrayOfNames.push(leaderObj._name);
    });
    return arrayOfNames;
}

function getLeaderIds(arrayOfLeaders){
    var arrayOfIds = [];
    arrayOfLeaders.map(function(leaderObj){
        arrayOfIds.push(leaderObj._id);
    });
    return arrayOfIds;
}

function modStat(statKey,min,max,leaderId,sicknessName){
    if ( leaderId === true ) {
        Object.keys(trailGame.leaders).map(function(indvLeaderId,index){
            modStat(statKey,min,max,indvLeaderId,sicknessName);
        });
    } else {
        leaderObj = trailGame.leaders[Number(leaderId)];
        var amount = getRandomInt(min,max);
        var changeVerb = "changed"
        switch (statKey){
            case 'health':
                leaderObj._health += amount;
                clamp(leaderObj._health,0,10);
                leaderObj._malady = sicknessName;
            break;
            case 'wits':
                modSocialStat(leaderObj,'wits',amount);
            break;
            case 'culture':
                modSocialStat(leaderObj,'culture',amount);
            break;
            case 'bravery':
                modSocialStat(leaderObj,'bravery',amount);
            break;
        }
    }
}

function modSocialStat(leader,statName,amount){
    var maxSocial = trailGame.maxLeaderStat;
    var changeVerb = "";
    var clampPhrase = "";
    if (amount === 0){
        return;
    } else if (amount > 0){
        changeVerb = "increase";
        clampPhrase = `max of ${maxSocial}`;
    } else {
        changeVerb = "decrease";
        clampPhrase = "min of 0";
    }
    var conjugator = statName === 'wits' ? '' : 's'
    var oldVal = leader['_'+statName];
    var newVal = clamp(oldVal + amount,0,maxSocial);
    leader['_'+statName] = newVal;
    var changeMsg = `(${leader._name}'s ${statName} ${changeVerb}${conjugator} from ${oldVal} to ${newVal}.)`;
    var clampMsg = `(${leader._name}'s ${statName} would ${changeVerb} but they are already at the ${clampPhrase}.)`;
    var msg = oldVal <= 0 || oldVal >= maxSocial ? clampMsg : changeMsg;
    addToLedger(msg);
}

function modHealth(min,max,leaderId,sicknessName){
    modStat('health',min,max,leaderId,sicknessName);
}

function addHealth(min,max,leaderId,sicknessName){
    modHealth(min,max,leaderId,sicknessName);
}

function removeHealth(min,max,leaderId,sicknessName){
    modHealth(max * -1,min * -1,leaderId,sicknessName);
}

function modWits(min,max,leaderId){
    modStat('wits',min,max,leaderId);
}

function addWits(min,max,leaderId){
    modWits(min,max,leaderId);
}

function removeWits(min,max,leaderId){
    modWits(max * -1,min * -1,leaderId);
}

function modCulture(min,max,leaderId){
    modStat('culture',min,max,leaderId);
}

function addCulture(min,max,leaderId){
    modCulture(min,max,leaderId);
}

function removeCulture(min,max,leaderId){
    modCulture(max * -1,min * -1,leaderId);
}

function modBravery(min,max,leaderId){
    modStat('bravery',min,max,leaderId);
}

function addBravery(min,max,leaderId){
    modBravery(min,max,leaderId);
}

function removeBravery(min,max,leaderId){
    modBravery(max * -1,min * -1,leaderId);
}

function addSicknesses(sicknessArray,silent){
    // sicknessArray should be array of 2 length arrays, holding arrays or true in each
    // [0]: array of leaderIds, [1]: array of sickness names
    // if [0] === true : all leaders
    // if [1] === true : all sicknesses
    var sicknessesLedger = {};
    sicknessArray.map(function(sicknessPair){
        var leaderIdArr = sicknessPair[0] === true ? Object.keys(trailGame.leaders) : sicknessPair[0];
        var sicknessesArr = sicknessPair[1] === true ? Object.keys(trailGame.sicknesses) : sicknessPair[1];
        leaderIdArr.map(function(leaderId){
            var leaderObj = trailGame.leaders[leaderId];
            if (leaderObj === undefined){
                return;
            }
            var sicknessKeys = Object.keys(leaderObj._sicknesses);
            sicknessesArr.map(function(sicknessName){
                var doesntHaveSickness = sicknessKeys.indexOf(sicknessName) === -1;
                var isNotImmune = leaderObj._immunities[sicknessName] !== true;
                if (doesntHaveSickness && isNotImmune){
                    leaderObj._sicknesses[sicknessName] = 0;
                    if (sicknessesLedger[sicknessName] === undefined ){
                        sicknessesLedger[sicknessName] = [leaderId];
                    } else {
                        sicknessesLedger[sicknessName].push(leaderId);
                    }
                }
            });

        });
    });
    if (!silent){
        announceSicknesses(sicknessesLedger);
    }
}

function announceSicknesses(sicknessesLedger){
    Object.keys(sicknessesLedger).map(function(sicknessName){
        var leaderIds = sicknessesLedger[sicknessName];
        var leaderNames = [];
        var again = true;
        leaderIds.map(function(leaderId){
            var leader = trailGame.leaders[leaderId];
            leaderNames.push(leader._name);
            if (leader._pastSicknesses.indexOf(sicknessName) === -1){
                again = false;
            }
        });
        var sicknessObj = trailGame.sicknesses[sicknessName];
        var verb = leaderNames.length > 1 ? 'have' : 'has';
        var all = leaderNames.length > 2 ? ' all' : ' both';

        addToLedger(`${sentenceForm(leaderNames)} ${verb}${leaderNames.length <= 1 ? '' : all} ${sicknessObj.contractPhrase} ${sicknessName}${again ? ' again' : ''}.`);

        var leaderName = leaderNames.length > 1 ? 'they' : leaderNames[0];
        var possessive = leaderNames.length > 1 ? 'their' : `${leaderNames[0]}'s`;
        var ess = leaderNames.length > 1 ? 's' : ``;
        var worries = [
            [
                `This is gravely serious.`,
                `It a matter of life and death.`
            ],
            [
                `This is the last thing ${sentenceForm(leaderNames)} need${ess}.`,
                `We are all worried about ${sentenceForm(leaderNames)}.`,
            ],
            [
                `Given time, hopefully it will ${sicknessObj.contractable ? 'clear up' : 'heal'} on its own.`,
                `We hope for the best.`
            ],
            
        ];
        if (leaderNames.length == 1 && Object.keys(trailGame.leaders).length > 1){
            var worshiper = getRandomLeader(leaderIds[0]);
            worries[0].push(`${worshiper._name} prays to ${worshiper._god} for ${leaderName}'s sake.`);
        }
        if (sicknessObj.contractable){
            worries[2].push(`Hopefully it isn't catching.`);
            worries[2].push(`We worry it will spread.`);
        }
        var sicknessStrength = clamp(Math.round(sicknessObj.damageMax / 2.5),0,3) - 1;
        var worries = worries[sicknessStrength]
        if ( sicknessStrength > -1){
            addToLedger(shuffle(worries)[0]);
        }
    });
};

function addSickness(leaderId,sicknessName,silent){
    var leaderIdArr = leaderId === true ? true : [leaderId];
    var sicknessNamesArr = sicknessName === true ? true : [sicknessName];
    addSicknesses([[leaderIdArr,sicknessNamesArr]],silent);
}

function boostLeaderImmunity(leaderObj,sicknessName){
    var immunityLevel = leaderObj._immunities[sicknessName] || 0;
    if (immunityLevel === true){
        return false;
    }
    var sicknessObj = trailGame.sicknesses[sicknessName];
    var immunityChance = clamp(sicknessObj.cureChance - immunityLevel,1,10) * 2;
    var hasGainedImmunity = rollDice(1,immunityChance) === immunityChance;
    if (!hasGainedImmunity){
        leaderObj._immunities[sicknessName] = immunityLevel + 1;
    }
    return hasGainedImmunity;
}

function gainImmunities(immunitiesArray,silent,optionalLeaderObj){
    // immunitiesArray should be array of 2 length arrays, holding arrays or true in each
    // [0]: array of leaderIds, [1]: array of sickness names
    // if [0] === true : all leaders
    // if [1] === true : all sicknesses
    var immunityLedger = {};
    immunitiesArray.map(function(immunityPair){
        var leaderIdArr = immunityPair[0] === true ? Object.keys(trailGame.leaders) : immunityPair[0];
        var immunitiesArr = immunityPair[1] === true ? Object.keys(trailGame.sicknesses) : immunityPair[1];
        leaderIdArr.map(function(leaderId){
            var leaderObj = optionalLeaderObj || trailGame.leaders[leaderId];
            if (leaderObj === undefined){
                return;
            }
            var immunitiesList = [];
            var immunitiesKeys = [];
            Object.keys(leaderObj._immunities).map(function(immunityName){
                if (leaderObj._immunities[immunityName] === true ){
                    immunitiesKeys.push(immunityName);
                }
            });
            immunitiesArr.map(function(sicknessName){
                var isNotYetImmune = immunitiesKeys.indexOf(sicknessName) === -1;
                var starvationDespairCheck = true;
                if (['despair','starvation'].indexOf(sicknessName) > -1 && leaderObj._immunities[sicknessName] < 4 ){
                    starvationDespairCheck = false
                }
                if (isNotYetImmune && starvationDespairCheck){
                    leaderObj._immunities[sicknessName] = true;
                    immunitiesList.push(sicknessName);
                    var hasThisSickness = Object.keys(leaderObj._sicknesses).indexOf(sicknessName) > -1;
                    if (hasThisSickness){
                        delete leaderObj._sicknesses[sicknessName];
                    }
                }
            });
            var immunitiesPhrase = sentenceForm(immunitiesList);
            if (immunitiesPhrase !== 'nothing'){
                if (immunityLedger[immunitiesPhrase] === undefined ){
                    immunityLedger[immunitiesPhrase] = [leaderObj._name];
                } else {
                    immunityLedger[immunitiesPhrase].push(leaderObj._name);
                }
            }
        });
    });
    if (!silent){
        announceImmunities(immunityLedger);
    }
}

function announceImmunities(immunityLedger){
    var exclamations = generateExclamation(true);
    Object.keys(immunityLedger).map(function(immunityPhrase,index){
        var leaderNames = immunityLedger[immunityPhrase];
        var allSicknesses = sentenceForm(Object.keys(trailGame.sicknesses));
        //immunityPhrase = immunityPhrase === allSicknesses ? 'all known ailments' : immunityPhrase;
        var verb = leaderNames.length > 1 ? 'have' : 'has';
        var all = leaderNames.length > 2 ? ' all' : ' both';
        var exclamation = exclamations[(index + 1)%exclamations.length - 1];
        addToLedger(`${exclamation} ${sentenceForm(leaderNames)} ${verb}${leaderNames.length <= 1 ? '' : all} developed an immunity to ${immunityPhrase}.`);
    });
}

function gainImmunity(leaderId,sicknessName,silent){
    var leaderIdArr = leaderId === true ? true : [leaderId];
    var sicknessNamesArr = sicknessName === true ? true : [sicknessName];
    gainImmunities([[leaderIdArr,sicknessNamesArr]],silent);
}

function cureSicknesses(cureArray,silent){
    // cureArray should be array of 2 length arrays, holding arrays or true in each
    // [0]: array of leaderIds, [1]: array of sickness names
    // if [0] === true : all leaders
    // if [1] === true : all sicknesses
    var cureLedger = {};
    var immunityPairs = [];
    cureArray.map(function(sicknessPair){
        var leaderIdArr = sicknessPair[0] === true ? Object.keys(trailGame.leaders) : sicknessPair[0];
        var sicknessArr = sicknessPair[1] === true ? Object.keys(trailGame.sicknesses) : sicknessPair[1];
        leaderIdArr.map(function(leaderId){
            var leaderObj = trailGame.leaders[leaderId];
            var immunityPair = [[leaderId],[]];
            if (leaderObj === undefined){
                return;
            }
            var sicknessList = [];
            var sicknessKeys = Object.keys(leaderObj._sicknesses);
            sicknessArr.map(function(sicknessName){
                var hasThisSickness = sicknessKeys.indexOf(sicknessName) > -1;
                if (hasThisSickness){
                    delete leaderObj._sicknesses[sicknessName];
                    sicknessList.push(sicknessName);
                    if (leaderObj._pastSicknesses.indexOf(sicknessName) === -1){
                        leaderObj._pastSicknesses.push(sicknessName);
                    }
                }
                var gainThisImmunity = boostLeaderImmunity(leaderObj,sicknessName);
                if (gainThisImmunity){
                    immunityPair[1].push(sicknessName);
                }
            });
            var sicknessPhrase = sentenceForm(sicknessList);
            if (sicknessPhrase !== 'nothing'){
                if (cureLedger[sicknessPhrase] === undefined ){
                    cureLedger[sicknessPhrase] = [leaderObj._name];
                } else {
                    cureLedger[sicknessPhrase].push(leaderObj._name);
                }
            }
            if(immunityPair[1].length){
                immunityPairs.push(immunityPair);
            }
        });
    });
    if (!silent){
        announceCures(cureLedger);
    }
    if(immunityPairs.length){
        gainImmunities(immunityPairs,silent);
    }
}

function announceCures(cureList){
    var exclamations = generateExclamation(true);
    Object.keys(cureList).map(function(ailmentPhrase,index){
        var leaderNames = cureList[ailmentPhrase];
        var verb = leaderNames.length > 1 ? 'have' : 'has';
        var all = leaderNames.length > 2 ? ' all' : ' both';
        var exclamation = exclamations[(index + 1)%exclamations.length - 1];
        addToLedger(`${exclamation} ${sentenceForm(leaderNames)} ${verb}${leaderNames.length <= 1 ? '' : all} recovered from ${ailmentPhrase}.`);
    });
}

function cureSickness(leaderId,sicknessName,silent){
    var leaderIdArr = leaderId === true ? true : [leaderId];
    var sicknessNamesArr = sicknessName === true ? true : [sicknessName];
    cureSicknesses([[leaderIdArr,sicknessNamesArr]],silent);
}

function sufferSicknesses(sicknessArray){
    // sicknessArray should be array of 2 length arrays, holding arrays or true in each
    // [0]: array of leaderIds, [1]: array of sickness names
    // if [0] === true : all leaders
    // if [1] === true : all sicknesses

    var sufferingLedger = {};
    var contagions = [];
    sicknessArray.map(function(sicknessPair){
        var leaderIdArr = sicknessPair[0] === true ? Object.keys(trailGame.leaders) : sicknessPair[0];
        var sicknessArr = sicknessPair[1] === true ? Object.keys(trailGame.sicknesses) : sicknessPair[1];
        leaderIdArr.map(function(leaderId){
            var leader = trailGame.leaders[leaderId];
            if (leader._health <= 0){
                var cause = sicknessArr.length ? `dies of ${sentenceForm(sicknessArr)}` : undefined;
                removeLeader(leader._id, cause);
            } else if (sicknessArr.length){
                var ailmentsPhrase = sentenceForm(sicknessArr);
                if(sufferingLedger[ailmentsPhrase] !== undefined){
                    sufferingLedger[ailmentsPhrase].push(leader._name);
                } else {
                    sufferingLedger[ailmentsPhrase] = [leader._name];
                }
                sicknessArr.map(function(sicknessName){
                    var sickness = trailGame.sicknesses[sicknessName];
                    removeHealth(sickness.damageMin,sickness.damageMax,leaderId,sicknessName);
                    leader._sicknesses[sicknessName]++;
                    if (Object.keys(trailGame.leaders).length){
                        var newLeader = getRandomLeader(leader._id);
                        var sicknessSpreads = rollDice(1,10) < sickness.contagiousness;
                        var leaderHasSickness = Object.keys(newLeader._sicknesses).indexOf(sicknessName) > -1;
                        if (sickness.contractable && sicknessSpreads && !leaderHasSickness){
                            contagions.push([[newLeader._id],[sicknessName]]);
                        }

                    }
                });
            }
        });

    });
    announceSuffering(sufferingLedger);
    if(contagions.length){
        addSicknesses(contagions);
    }
}

function announceSuffering(sufferingLedger){
    Object.keys(sufferingLedger).map(function(ailmentPhrase){
        var leaderNames = sufferingLedger[ailmentPhrase];
        var verb = leaderNames.length > 1 ? 'are' : 'is';
        var all = leaderNames.length > 2 ? ' all' : ' both';
        addToLedger(`${sentenceForm(leaderNames)} ${verb}${leaderNames.length <= 1 ? '' : all} suffering from ${ailmentPhrase}.`);
    });
}

function runSickness(leaderId){
    var leader = trailGame.leaders[Number(leaderId)];
    var curePair = [[leaderId],[]];
    var sicknessPair = [[leaderId],[]];
    Object.keys(leader._sicknesses).map(function(sicknessName,index){
        var sickness = trailGame.sicknesses[sicknessName];
        var daysSick = leader._sicknesses[sicknessName];
        var isCured = rollDice(1,10) > (sickness.cureChance - daysSick) && daysSick > 0 && sickness.cureChance < 10;
        if ( isCured ){
            curePair[1].push(sicknessName);
        } else if (leader._immunities[sicknessName] !== true){
            sicknessPair[1].push(sicknessName);
        }
    });
    return {cure: curePair, suffering: sicknessPair};
}

function savingThrow(leaderId,level){
    var leader = trailGame.leaders[leaderId];
    var roll = rollDice(1,6);
    var isSaved = leader._wits + roll >= level;
    isSaved = roll === 1 ? false : isSaved;
    //isSaved = roll === 6 ? true : isSaved;
    return isSaved;
}

// caravan functions

function newCaravan(){
    trailGame.caravan = {};
    trailGame.leaders = {};
    trailGame.animals = {};
    trailGame.goods = {};
    trailGame.ledger = {};
    trailGame.lostGame = false;

    //party setup
    trailGame.temp = {};
    trailGame.temp.roster = [];
    trailGame.temp.shoppingCart = {};
    
    // start values
    trailGame.caravan.morale = 10;
    trailGame.caravan.food = 0;
    trailGame.caravan.lamps = 0;
    trailGame.caravan.daysElapsed = 0;
    trailGame.caravan.daysSinceLastMeal = 0;
    trailGame.caravan.rations = 3;
    trailGame.caravan.isVegetarian = false;
    trailGame.caravan.timesRobbed = 0;
}

function getCaravanCapacity(){
    var totalCapacity = 0;
    Object.keys(trailGame.animals).map(function(animalName, index) {
        var number = trailGame.animals[animalName];
        var capacity = number * trailGame.animalClasses[animalName].capacity;
        totalCapacity += capacity;
    });
    var totalLeaders = Object.keys(trailGame.leaders).length
    totalCapacity += totalLeaders * 5;
    return totalCapacity;
}

function getCaravanCarrying(){
    var totalCarrying = 0;
    Object.keys(trailGame.goods).map(function(goodsName, index) {
        var number = trailGame.goods[goodsName];
        totalCarrying += number;
    });
    totalCarrying += trailGame.caravan.food;
    totalCarrying += trailGame.caravan.lamps;
    return totalCarrying;
}

function getCaravanSpeed(){
    var totalLeaders = Object.keys(trailGame.leaders).length;
    var leaderModifier = clamp( 4 / totalLeaders,0,1);
    var speedSum = 0;
    var totalAnimals = 0;
    Object.keys(trailGame.animals).map(function(animalName, index) {
        var number = trailGame.animals[animalName];
        totalAnimals += number;
        speedSum += (number * trailGame.animalClasses[animalName].speed);
    });
    var meanSpeed = 1;
    var animalModifier = 1
    if (totalAnimals > 0){
        meanSpeed = speedSum / totalAnimals;
        animalModifier = clamp( 6 * (totalLeaders / totalAnimals) ,0,1);
    }
    var actualSpeed = meanSpeed * animalModifier * leaderModifier;
    return (clamp(Math.round(actualSpeed), 1 , 10));
}

function getCaravanFerocity(){
    var totalLeaderBravery = 0;
    Object.keys(trailGame.leaders).map(function(leaderId, index) {
        var bravery = trailGame.leaders[leaderId]._bravery;
        totalLeaderBravery += bravery;
    });
    var totalAnimalFerocity = 0;
    Object.keys(trailGame.animals).map(function(animalClassName, index) {
        var thisAnimalTotal = trailGame.animals[animalClassName];
        totalAnimalFerocity += thisAnimalTotal * trailGame.animalClasses[animalClassName].ferocity;
    });
    var moraleModifier = Math.ceil(trailGame.caravan.morale / 2);
    return (totalLeaderBravery * moraleModifier) + totalAnimalFerocity;
}

function getCaravanAverage(stat){
    var total = 0;
    var totalLeaders = Object.keys(trailGame.leaders).length;
    Object.keys(trailGame.leaders).map(function(leaderId, index) {
        var indv = trailGame.leaders[leaderId][stat];
        total += indv;
    });
    return Math.round(total / totalLeaders);
}

function getCaravanWits(){
    return getCaravanAverage('_wits');
}

function getCaravanCulture(){
    return getCaravanAverage('_culture');
}

function getCaravanBravery(){
    return getCaravanAverage('_bravery');
}

function getCaravanStarving(){
    var isStarving = false;
    Object.keys(trailGame.leaders).map(function(leaderId, index) {
        var leader = trailGame.leaders[leaderId];
        isStarving = leader._sicknesses['starvation'] === undefined ? false : true;
    });
    return isStarving;
}

function getDropGoodsTrade(){
    var trade = {};
    var goodsKeys = Object.keys(trailGame.goods);
    goodsKeys.push('food');
    goodsKeys = sortByTradeType(goodsKeys);
    goodsKeys.map(function(key){
        addToTrade(trade,0,key);
    });
    var amountToDrop = getCaravanCarrying() - getCaravanCapacity();
    for (var i = 0; i < trailGame.goodsBySellPrice.length; i++) {
        if(amountToDrop <= 0){
            break;
        }
        var goodsKey = trailGame.goodsBySellPrice[i];
        var amountCarrying = trailGame.goods[goodsKey] || 0;
        if (amountCarrying > 0){
            var amountToAdd = Math.min(amountToDrop,amountCarrying);
            addToTrade(trade,amountToAdd,goodsKey);
            amountToDrop -= amountToAdd;
        }

    }
    if(amountToDrop > 0){
        addToTrade(trade,Math.min(trailGame.caravan.food,amountToDrop),'food');
    }
    return trade;
}

function dinnerFlavorText(hadDinner){
    var leaderName = getRandomLeader()._name;
    var msgs = [
        /*0*/[
            `The dinner fire reveals our sunken eyes and protruding ribs.`,
            `${leaderName} remarks that it's been a pleasure knowing us all.`,
            `It is deadly silent in our camp that night.`
        ],
        /*1*/[
            `Desperation sets in. There is a wild look in all our eyes.`,
            `Is this the end? How much longer can we go on like this?`
        ],
        /*2*/[
            `It is unclear how many more days like this we can take.`,
            `We are worn down and beaten. May ${generateGod()} help us.`
        ],
        /*3*/[
            `Few smiles are seen at dinner.`,
            `Morale is failing. Crying can be heard at night.`
        ],
        /*4*/[
            `Little comfort is taken from the meal that night.`,
            `Our bones and hearts ache as we eat.`,
            `A fight breaks out at night. ${leaderName} gets a black eye.`
        ],
        /*5*/[
            `Tensions flare at dinner, but no one is seriously hurt.`,
            `No one speaks at dinner.`
        ],
        /*6*/[
            `It is hard not to reminisce of better days at dinner.`,
            `No one says it, but we all wonder if this journey was a mistake.`,
            `${leaderName} spends dinner by themselves, away from the rest of the caravan.`
        ],
        /*7*/[
            `We've had better days, but dinner helps.`,
            `${leaderName}'s feet ache.`,
            `${leaderName} is in foul mood. We stay out of their way.`,
            `${leaderName} sees only strangers in the faces around the campfire.`
        ],
        /*8*/[
            `We knew this journey would be hard when we set out.`,
            `${leaderName} stares blankly into the fire all night.`,
            `${leaderName} just can't get us to laugh tonight.`
        ],
        /*9*/[
            `We are weary, but we gladly welcome the evening meal.`,
            `${leaderName} seems homesick.`,
            `${leaderName} tries to get us to play ${generateGame()}, but no one is feeling it.`,
            `${leaderName}'s cooking tastes like ${generatePachyderm().animalClass} dung.`
        ],
        /*10*/[
            `Spirits are high, though we know challenges lie ahead.`,
            `Sleep is a welcome respite after a long day's journey.`,
            `${leaderName} cannot sleep at all.`
        ],
        /*11*/[
            `We eat and rest for the night. Tomorrow brings new challenges.`,
            `${leaderName} thought they heard something, so they stay up for a double watch.`,
            `${leaderName} spins a dubious tale of when they encountered a ${indefiniteArticle(generateLeviathan())}.`,
            `It seems ${leaderName} might be cheating us at ${generateGame()}...`,
        ],
        /*12*/[
            `Some of us stay up late telling stories and singing songs.`,
            `${leaderName} leads us all in a game of ${generateGame()} after dinner.`,
            `${leaderName} tells of stories of their homeland.`,
            `${leaderName} recites an ancient poem at dinner.`,
            `We chat around the fire late into the night.`,
            `${leaderName} shares dark tales of magic...`
        ],
        /*13*/[
            `Laughter echoes into the night as we eat.`,
            `${leaderName} gives a toast to our success. Everyone cheers.`,
            `${leaderName} regales us with tales of past adventures.`,
            `We can barely wait to greet the days ahead.`,
            `${leaderName} blows smoke rings by the fire.`,
            `We play ${generateGame()}. ${leaderName} wins.`,
            `${leaderName} prays to ${generateGod()} before the evening meal.`
        ]
    ];
    var index = clamp(trailGame.caravan.morale + trailGame.caravan.rations,0,13);
    index = hadDinner !== false ? index : index - 5;
    return( shuffle(msgs[clamp(index,0,13)]).shift() );
}

function healthUpdate(){
    var cureList = [];
    var sufferingList = [];
    var leadersIdsArr = Object.keys(trailGame.leaders);
    leadersIdsArr.map(function(leaderId,index){
        var leader = trailGame.leaders[leaderId];
        var cureSufferingObj = runSickness(leader._id);
        if (cureSufferingObj.cure[1].length){
            cureList.push(cureSufferingObj.cure);
        }
        if (cureSufferingObj.suffering[1].length){
            sufferingList.push(cureSufferingObj.suffering);
        }
    });

    cureSicknesses(cureList);
    sufferSicknesses(sufferingList);

    leadersIdsArr.map(function(leaderId,index){
        var leader = trailGame.leaders[leaderId];
        if (leader !== undefined && leader._health < 2){
            var msgs = [
                `It's not looking good for ${leader._name}.`,
                `${leader._name} may not have much time left.`,
                `${leader._name} is gaunt and weak.`,
                `${leader._name} is in a bad way.`
            ];
            addToLedger(shuffle(msgs).shift());
        }
    });
    return settleLedger();
}

function getLeaderDinner(){
    var totalLeaders = Object.keys(trailGame.leaders).length;
    var days = trailGame.caravan.daysSinceLastMeal;
    if ( days <= 0 ){
        return 1;
    }
    return Math.ceil( totalLeaders * trailGame.caravan.rations * days);
}

function numAnimalDinners(){
    if (Object.keys(trailGame.animals).length < 1){
        return 0;
    }
    var days = trailGame.caravan.daysSinceLastMeal;
    var daysTillAnimalsFedNext = (trailGame.caravan.daysElapsed - days) % trailGame.weekLength;
    var numAnimalDinners = Math.floor((days + daysTillAnimalsFedNext)/trailGame.weekLength);
    return numAnimalDinners;
}

function dinnerTime(){
    var lines = [];
    var resultsObj = {events: lines, ledgerLines: [], ledgerStats: []};
    if (trailGame.caravan.morale <= 2){
        addSickness(true,'despair');
    } else {
        cureSickness(true,'despair');
    }
    if (trailGame.caravan.daysSinceLastMeal === 0){
        //return [];
        return resultsObj;
    }
    var dinnerAmount = getLeaderDinner();
    if( trailGame.caravan.food < dinnerAmount ){
        lines.push(`There isn't enough food to feed everyone!`);

        var eatenGoods = {};
        trailGame.goodsBySellPrice.map(function(goodsName){
            var isEdible = trailGame.goodsClasses[goodsName].edible;
            var amount = trailGame.goods[goodsName];
            if (isEdible && amount && dinnerAmount > 0){
                var amountToEat = Math.min(amount,dinnerAmount);
                removeGoods(goodsName,amountToEat);
                dinnerAmount = Math.max(dinnerAmount - amountToEat,0);
                eatenGoods[goodsName] = amountToEat;
            }
        });
        if (Object.keys(eatenGoods).length){
           lines.push(`We eat ${sentenceForm(eatenGoods)} from our wares.`);
        }

        if (dinnerAmount > 0){
            lines.push(dinnerFlavorText(false));
            removeMorale(Math.ceil(trailGame.caravan.daysSinceLastMeal / 3));
            if( (trailGame.caravan.morale <= 4 || true) && Object.keys(trailGame.animals).length && !trailGame.caravan.isVegetarian){
                slaughterAnimals(dinnerAmount);
            } else {
                addSickness(true,'starvation');
            }
        } else {
            lines.push(dinnerFlavorText(true));
        }
    } else {
        trailGame.caravan.daysSinceLastMeal = 0;
        cureSickness(true,'starvation');
        var moraleBonus = 0;
        var healthBonus = 0;
        switch (trailGame.caravan.rations){
            case 1:
                moraleBonus = 0;
                healthBonus = 0;
            break;
            case 2:
                moraleBonus = ( trailGame.caravan.morale <= 5 ) ? 1 : 0;
                healthBonus = (getRandomInt(1,6) === 6) ? 1 : 0;
            break
            case 3:
                moraleBonus = ( trailGame.caravan.morale <= 7 ) ? 1 : 0;
                healthBonus = (getRandomInt(1,4) === 6) ? 1 : 0;
            break;
        }
        addMorale(moraleBonus);
        addHealth(healthBonus,healthBonus,true);
        lines.push(dinnerFlavorText(true));
    }
    removeFood(dinnerAmount);
    var animalDinners = numAnimalDinners();
    if (animalDinners > 0){
        feedAnimals(animalDinners);
    }
    ledgerObj = settleLedger();
    resultsObj.ledgerLines = ledgerObj.lines;
    resultsObj.ledgerStats = ledgerObj.stats;
    return resultsObj;
}

function slaughterAnimals(foodNeeded){
    var index = 0;
    var slaughter = {}
    while (foodNeeded > 0 && index <= trailGame.animalsByAppetizing.length - 1){
        var animalName = trailGame.animalsByAppetizing[index];
        var numberOfAnimal = trailGame.animals[animalName];
        var meatAmount = trailGame.animalClasses[animalName].meat;
        if( meatAmount > 0 && typeof(numberOfAnimal) !== "undefined" ){
            var numberNeeded = Math.ceil( foodNeeded / meatAmount );
            var numberToKill = clamp(numberNeeded,1,numberOfAnimal);
            var plural = (numberToKill > 1) ? 's' : '';
            var totalMeat = numberToKill * meatAmount;
            slaughter[animalName] = numberToKill;
            removeAnimals(animalName,numberToKill);
            addFood(totalMeat);
            foodNeeded -= totalMeat;
        }
        index++;
    }
    if(Object.keys(slaughter).length > 0){
        addToLedger(`We slaughter and eat ${sentenceForm(slaughter)} for ${totalMeat} food.`);
    }
    if (foodNeeded > 0){
        addSickness(true,'starvation');
    }
}

function feedAnimals(times){
    var totalFeed = 0;
    addToLedger(`The animals need to be fed.`);
    Object.keys(trailGame.animals).map(function(animalName,index){
        var hunger = trailGame.animalClasses[animalName].hunger;
        var numberOf = trailGame.animals[animalName];
        totalFeed += hunger * numberOf * times;
    });
    if ( totalFeed > trailGame.caravan.food ){
        addToLedger(`There isn't enough food to feed all the animals!`);
        removeMorale(1);
    } else if ( totalFeed > 0) {
        var multiple = (times > 1) ? ` ${times} times` : ``;
        addToLedger(`We feed the animals${multiple} for a total of ${totalFeed} food.`);
    }
    removeFood(totalFeed);
}

// morale functions

function validateMorale(){
    if ( trailGame.caravan.morale < 0 || typeof(trailGame.caravan.morale) !== "number" ){
        trailGame.caravan.morale = 0;
    } else {
        trailGame.caravan.morale = clamp( trailGame.caravan.morale,0,10 );
    }
}

function modMorale(value){
    validateMorale();
    var oldValue = trailGame.caravan.morale;
    var newValue = clamp(oldValue + value, 0, 10)
    trailGame.caravan.morale = newValue;
    var actualChange = newValue - oldValue;
    addToLedger('morale',actualChange);
    validateMorale();
}

function addMorale(number){
    modMorale(number);
}

function removeMorale(number){
    modMorale(number * -1);
}

// food functions

function validateFood(){
    if ( trailGame.caravan.food < 0 || typeof(trailGame.caravan.food) !== "number" ){
        trailGame.caravan.food = 0;
    }
}

function modFood(number){
    validateFood();
    var oldValue = trailGame.caravan.food;
    trailGame.caravan.food += number;
    if ( trailGame.caravan.food <= 0 ){
        trailGame.caravan.food = 0;
        number = oldValue * -1;
    }
    if ( number !== 0 ){
        addToLedger('food',number); 
    }
    validateFood();
}

function addFood(number){
    modFood(number);
}

function removeFood(number){
    modFood(number * -1);
}

function dropFood(number){
    modFood(number * -1);
}

function setRations(rations){
    trailGame.caravan.rations = clamp(rations,1,3);
}

// lamps functions

function validateLamps(){
    if ( trailGame.caravan.lamps < 0 || typeof(trailGame.caravan.lamps) !== "number" ){
        trailGame.caravan.lamps = 0;
    }
}

function modLamps(number){
    validateLamps();
    var oldValue = trailGame.caravan.lamps;
    trailGame.caravan.lamps += number;
    if ( trailGame.caravan.lamps <= 0 ){
        trailGame.caravan.lamps = 0;
        number = oldValue * -1;
    }
    if ( number !== 0){
        addToLedger('lamps',number); 
    }
    if ( trailGame.caravan.lamps < 0 || typeof(trailGame.caravan.lamps) !== "number" ){
        trailGame.caravan.lamps = 0;
    }
    validateLamps();
}

function addLamps(number){
    modLamps(number);
}

function removeLamps(number){
    modLamps(number * -1);
}

function dropLamps(number){
    modLamps(number * -1,true);
}

// goods functions

function validateGoods(className){
    var goods = trailGame.goods[className];
    if ( goods < 0 || typeof(goods) !== "number" ){
        delete trailGame.goods[className];
    }
}

function modGoods(className,number){
    if ( className === 'food'){
        return modFood(number);
    }
    var haveNone = typeof(trailGame.goods[className]) === "undefined";
    var pluralName = pluralize(className);
    if ( number > 0){
        if ( haveNone ){
            trailGame.goods[className] = number;
        } else {
            trailGame.goods[className] += number;
        }
        addToLedger(pluralName,number);
    } else {
        if ( haveNone ){
            return;
        }
        newNumber = trailGame.goods[className] + number;
        if ( newNumber > 0 ){
            trailGame.goods[className] = newNumber;
        } else {
            delete trailGame.goods[className];
        }
        addToLedger(pluralName,number); 
    }
    validateGoods(className);
}

function addGoods(className,number){
    modGoods(className,number);
}

function removeGoods(className,number){
    modGoods(className,number * -1);
}

function generateGood(goodsName,allowFood){
    allowFood = allowFood === false ? false : true;
    var goodsTypes = Object.keys(trailGame.goodsClasses);
    if (!allowFood){
        delete goodsTypes[goodsTypes.indexOf('food')];
    }
    goodsName = goodsName || shuffle(goodsTypes).shift();
    var good = Object.assign({},trailGame.goodsClasses[goodsName]);
    good.goodsType = goodsName;
    return good;
}

function getRandomGood(){
    var goods = Object.keys(trailGame.goods);
    return shuffle(goods)[0];
}

function getRandomGoodOrAnimal(){
    var items = Object.keys(trailGame.goods);
    items = items.concat(Object.keys(trailGame.animals))
    return shuffle(items)[0];
}

function getGoodsBySell(){
    var goods = Object.keys(trailGame.goods);
    goods.sort(function(goodsA,goodsB){
        return trailGame.goodsClasses[goodsA].sell - trailGame.goodsClasses[goodsB].sell;
    });
    return goods;
}

// trade functions

function sortByTradeType(arrayOfNames){

    function getSortValue(name){
        var value = 0;
        value = trailGame.pachyderms.indexOf(name) !== -1 ? 50000 : value;
        value = trailGame.pets.indexOf(name) !== -1 ? 10000 : value;
        value = trailGame.turtles.indexOf(name) !== -1 ? 5000 : value;
        value = trailGame.goodsBySellPrice.indexOf(name) !== -1 ? 1000 : value;
        var tradeClass = findItemFromKey(name);
        value += tradeClass.sell || 0;
        return value
    }

    return arrayOfNames.sort(function(nameA,nameB){
        return getSortValue(nameB) - getSortValue(nameA);
    })
}

function enactTradeObj(tradeObj,adding){
    var modifier = adding === true ? 1 : -1;
    var goodsClasses = Object.keys(trailGame.goodsClasses);
    var animalClasses = Object.keys(trailGame.animalClasses);
    var tradeKeys = Object.keys(tradeObj);
    for (var i = tradeKeys.length - 1; i >= 0; i--) {
        var key = tradeKeys[i];
        var value = tradeObj[key];
        if ( goodsClasses.indexOf(key) > -1 ){
            modGoods(key,value * modifier, false);
        }
        if ( animalClasses.indexOf(key) > -1 ){
            modAnimals(key,value * modifier, false);
        }
    }
}

function addTrade(tradeObj){
    enactTradeObj(tradeObj,true);
}

function removeTrade(tradeObj){
    enactTradeObj(tradeObj,false);
}

function addToTrade(tradeObj,number,key,price){
    tradeObj.actualValue = tradeObj.actualValue || 0;
    var item = findItemFromKey(key);
    price = price || item.sell;
    tradeObj[key] = tradeObj[key] === undefined ? number : tradeObj[key] + number;
    tradeObj.actualValue += number * price;
    tradeObj.capacity = tradeObj.capacity || 0;
    tradeObj.capacity += (item.capacity || 0) * number;
    tradeObj.weight = tradeObj.weight || 0;
    if (item.goodsType !== undefined){
        tradeObj.weight += number * 1;
    }
    return tradeObj;
}

function removeFromTrade(tradeObj,number,key,price){
    var currentNum = tradeObj[key] || 0;
    var actualChange = clamp(number,0,currentNum);
    var item = findItemFromKey(key);
    price = price || item.sell;
    if( currentNum > number ){
        tradeObj[key] -= number;
    } else {
        delete tradeObj[key]
    }
    if (item.animalClass !== undefined){
        tradeObj.capacity = Math.max(0,tradeObj.capacity - (item.capacity * number));
    }
    if (item.goodsType !== undefined){
        tradeObj.weight = Math.max(0,tradeObj.weight - number);
    }
    tradeObj.actualValue -= Math.min(actualChange * price,tradeObj.actualValue);
    return tradeObj;
}

function setTradeValue(tradeObj,number,key,price){
    var currentNum = tradeObj[key];
    removeFromTrade(tradeObj,currentNum,key,price);
    addToTrade(tradeObj,number,key,price);
    return tradeObj;
}

function zeroOutTradeValues(tradeObj){
    var goodsKeys = Object.keys(scrubTradeObj(tradeObj));
    goodsKeys.map(function(key){
        setTradeValue(tradeObj,0,key,0);
    });
    tradeObj.actualValue = 0;
    return tradeObj;
}

function scrubTradeObj(trade){
    var clone = {...trade};
    delete clone.expectedValue;
    delete clone.actualValue;
    delete clone.weight;
    delete clone.capacity;
    return clone;
}

function removeZerosFromTrade(trade){
    var clone = {...trade};
    var keys = Object.keys(clone);
    keys.map(function(key){
        if (parseInt(clone[key]) === 0){
            delete clone[key];
        }
    });
    return clone;
}

function mergeTradeObjs(tradeA,tradeB){
    Object.keys(tradeB).map(function(key,index){
        if ( tradeA[key] !== undefined ){
            tradeA[key] += tradeB[key];
        } else {
            tradeA[key] = tradeB[key];
        }
    });
    return tradeA;
}

function getTradeOffer(argsObj){
    argsObj = argsObj || {};
    argsObj.level = clamp(argsObj.level,1,20) || rollDice(1,20);
    argsObj.approxValue = argsObj.approxValue || rollDice(argsObj.level,50);
    var cultureModifier = 1;
    var approxValue = Math.round(argsObj.approxValue * cultureModifier);
    var offer = { actualValue: 0, expectedValue: argsObj.approxValue };
    var numAnimalTypes = getRandomInt(0,3);
    while ( approxValue > 0 && numAnimalTypes > 0){
        var animal = generateAnimal();
        var number = getRandomInt(1,Math.ceil( approxValue / animal.sell ));
        if (number > 0){
            var key = animal.animalClass;
            addToTrade(offer,number,key);
            approxValue -= number * animal.sell;
        }
        numAnimalTypes--;
    }
    var numGoodsTypes = getRandomInt(1,3);
    while ( approxValue > 0 && numGoodsTypes > 0){
        var good = generateGood();
        var number = getRandomInt(1,Math.ceil( approxValue / Math.max(good.sell,1) ));
        if (number > 0){
            var key = good.goodsType;
            addToTrade(offer,number,key);
            approxValue -= number * good.sell;
        }
        numGoodsTypes--;
    }
    return offer;
}

function getTradeProposal(argsObj){
    argsObj = argsObj || {};
    argsObj.level = clamp(argsObj.level,1,20) || rollDice(1,20);
    argsObj.approxValue = argsObj.approxValue || rollDice(argsObj.level,50);
    var approxValue = Math.round(argsObj.approxValue);

    var leader = argsObj.leader || getRandomLeader();
    var smarterThanAverage = leader._wits > (trailGame.maxLeaderStat / 2);
    var stupidity = trailGame.maxLeaderStat - leader._wits;
    var cultureShift = smarterThanAverage ? Math.ceil(getCaravanCulture() / 2) : 0;
    var modifierMin = -1 * stupidity - cultureShift;
    var modifierMax = stupidity - cultureShift;
    var witsModifier = 1 + 0.05 * getRandomInt(modifierMin, modifierMax);
    approxValue = Math.round(approxValue * witsModifier);

    var proposal = { actualValue: 0, expectedValue: approxValue };

    var allItems = Object.keys(trailGame.goods).concat(Object.keys(trailGame.animals));
    allItems.map(function(itemKey){
        addToTrade(proposal,0,itemKey);
    })

    var timesTried = 0;
    var remainingValue = approxValue
    while(remainingValue > 0 && timesTried < 10){
        var itemKey = shuffle(allItems)[0];
        var itemObj = findItemFromKey(itemKey);
        var isGood = itemObj.goodsType !== undefined;
        var amountOwned = isGood ? trailGame.goods[itemKey] : trailGame.animals[itemKey];
        var amountAlreadyProposed = proposal[itemKey] || 0;
        var amountWeightCanGain = Math.min(0,(getCaravanCapacity() - proposal.capacity) - (getCaravanCarrying() - proposal.weight));
        var amountWeightAllows = isGood ? amountWeightCanGain : Math.floor(amountWeightCanGain / itemObj.capacity);
        amountWeightAllows = smarterThanAverage ? amountWeightAllows : 99999;
        var maxToAdd = clamp(Math.round(remainingValue / itemObj.sell),0,amountWeightAllows);
        maxToAdd = clamp(maxToAdd,0,amountOwned - amountAlreadyProposed);
        var amountToAdd = getRandomInt(0,maxToAdd);
        addToTrade(proposal,amountToAdd,itemKey);
        remainingValue -= itemObj.sell * amountToAdd;
        timesTried++;
    }

    return proposal;
}

function findItemFromKey(key){
    var isGoods = Object.keys(trailGame.goodsClasses).indexOf(key) !== -1;
    var isAnimal = Object.keys(trailGame.animalClasses).indexOf(key) !== -1;
    var item = {};
    item = isGoods ? generateGood(key) : item;
    item = isAnimal ? generateAnimal(key) : item;
    return item;
}

function getFinalSale(){
    var tradeObj = {};
    Object.keys(trailGame.goods).map(function(key,index){
        var item = findItemFromKey(key);
        var amount = trailGame.goods[key];
        addToTrade(tradeObj,amount,key);
    });
    Object.keys(trailGame.animals).map(function(key,index){
        var item = findItemFromKey(key);
        var amount = trailGame.animals[key];
        addToTrade(tradeObj,amount,key);
    });
    tradeObj.actualValue = tradeObj.actualValue || 0;
    return tradeObj;
}

// animal functions

function modAnimals(className,number,removeGoods){
    removeGoods = (removeGoods === true) ? true : false; // not currently used
    if ( trailGame.animals[className] === undefined ){
        if( number > 0 ){
            trailGame.animals[className] = number;
        } else {
            return;
        }
    } else {
        var newNumber = trailGame.animals[className] + number;
        if ( newNumber > 0 ){
            trailGame.animals[className] = newNumber;
        } else {
            delete trailGame.animals[className];
        }
    }
    addToLedger(pluralize(className),number);
    var animalClass = trailGame.animalClasses[className];
    var modifier = Math.sign(number);
    if (animalClass.pet){
        modMorale(1 * modifier);
    }
}

function addAnimals(className,number){
    modAnimals(className,number);
}

function removeAnimals(className,number,removeGoods){
    modAnimals(className,number * -1);
}

function generateAnimal(animalClass){
    var animalClasses = Object.keys(trailGame.animalClasses);
    animalClass = animalClass === undefined ? shuffle(animalClasses).shift() : animalClass;
    var animal = Object.assign({},trailGame.animalClasses[animalClass]);
    animal.animalClass = animalClass;
    return animal;
}

function generatePet(petClass){
    petClass = petClass || shuffle(trailGame.pets)[0];
    return generateAnimal(petClass);
}

function generatePachyderm(pachydermClass){
    pachydermClass = pachydermClass || shuffle(trailGame.pachyderms)[0];
    return generateAnimal(pachydermClass);
}

function generateNonPachyderm(animalClass){
    animalClass = animalClass || shuffle(trailGame.nonPachyderms)[0];
    return generateAnimal(animalClass);
}

function generateTurtle(turtleClass){
    var turtles = trailGame.turtles;
    var max = getRandomInt(1,turtles.length);
    var index = rollDice(1,max) - 1;
    turtleClass = turtleClass || turtles[index];
    return generateAnimal(turtleClass);
}

function getRandomAnimal(){
    var animals = Object.keys(trailGame.animals);
    return shuffle(animals)[0];
}

function getRandomPachyderm(){
    var pachyderms = [];
    trailGame.pachyderms.map(function(animalName,index){
        if( typeof(trailGame.animals[animalName]) !== "undefined" ){
            pachyderms.push(animalName);
        }
    });
    return shuffle(pachyderms)[0];
}

function damageAnimals(damage){
    var animalsLost = {};
    var totalAnimals = shuffle(Object.keys(trailGame.animals));
    var index = 0;
    for (var i = totalAnimals.length - 1; i >= 0; i--) {
        var animalName = totalAnimals[i];
        var totalOfThis = trailGame.animals[animalName];
        var hp = trailGame.animalClasses[animalName].capacity + trailGame.animalClasses[animalName].meat / 3;
        if (damage > 0){
            var numberToKill = clamp( Math.round(damage / hp) ,0,totalOfThis);
            if (numberToKill > 0){
                removeAnimals(animalName,numberToKill);
                damage -= (numberToKill * hp);
                animalsLost[animalName] =  numberToKill;
            }
        }
    }
    return animalsLost;
}

// monster functions

function generateMonsters(argObj){
    argObj = argObj || {};
    var monsterTypes = Object.keys(trailGame.monsterClasses);
    monsterName = argObj.monsterName || shuffle(monsterTypes).shift();
    var horde = Object.assign({},trailGame.monsterClasses[monsterName]);
    horde.monsterType = monsterName;
    horde.packSize = clamp(argObj.number,1,horde.maxPackSize) || getRandomInt(1,horde.maxPackSize);
    horde.totalFerocity = Math.round(horde.packSize * horde.ferocity);
    return horde;
}

function generateUndead(argObj){
    argObj = argObj || {};
    var undeadTypes = Object.keys(trailGame.undeadClasses);
    undeadName = argObj.monsterName || shuffle(undeadTypes).shift();
    var horde = Object.assign({},trailGame.undeadClasses[undeadName]);
    var possibleVarieties = generateUndeadDesc(true);
    var variety = argObj.variety || shuffle([...possibleVarieties])[0];
    var bonusIndex = clamp(possibleVarieties.indexOf(variety),0,possibleVarieties.length - 1);
    horde.monsterType = `${variety} ${undeadName}`;
    horde.speed += bonusIndex;
    horde.ferocity += (bonusIndex * 0.25);
    horde.packSize = clamp(argObj.number,1,horde.maxPackSize) || getRandomInt(1,horde.maxPackSize);
    horde.totalFerocity = Math.round(horde.packSize * (horde.ferocity));
    return horde;
}

// river functions

function generateRiver(riverName){
    riverName = riverName || shuffle(Object.keys(trailGame.riverClasses))[0];
    var river = Object.assign({},trailGame.riverClasses[riverName]);
    river.riverType = riverName;
    var pair = generateLiquidSicknessPair();
    river._liquid = pair[0];
    river._sickness = pair[1];
    river._speed = getRandomInt(river.minSpeed,river.maxSpeed);
    river._depth = getRandomInt(river.minDepth,river.maxDepth);
    river._width = getRandomInt(river.minWidth,river.maxWidth);
    river._ferryPrice = clamp(river._speed * (river._width + river._depth) * 11,100,10000);
    return river;
}

// multipurpose subevents

function subEventHearJoke(argObj,lines){
    argObj = argObj || {};
    argObj.leader = argObj.leader || getRandomLeader();
    argObj.joke = argObj.joke || generateJokeSubject(argObj.jokeType);
    argObj.preamble = argObj.preamble || 'We hear a joke about';
    lines.push(`${argObj.preamble} ${argObj.joke.punchline}.`);
    addendums = [
        `${argObj.leader._name} is irritated with how bad the joke is.`,
        `It's just a terrible joke.`,
        `It's... not very funny.`,
        `It gets a chuckle out of ${argObj.leader._name}.`,
        `${argObj.leader._name} laughs heartily.`,
        `It's the best joke ${argObj.leader._name} has heard in a while.`
    ];
    var jokeIndex = getRandomInt(0,5);
    var isHurt = argObj.joke.offensive && ((argObj.leader._raceName === argObj.joke.race) || (argObj.leader._god === argObj.joke.god));
    var jokeBombs = argObj.joke.offensive && (argObj.leader._culture > jokeIndex);
    var moraleBoost = 0;
    var addendum = addendums[jokeIndex];
    if (isHurt){
        moraleBoost = -2;
        var identitySingle = argObj.leader._god === argObj.joke.god ? argObj.leader._religion.follower : argObj.leader._raceName;
            var identityPlural = argObj.leader._god === argObj.joke.god ? argObj.leader._religion.followerPlural : pluralize(argObj.leader._raceName);
        var addendum = shuffle([
            `They try to brush it off, but as ${indefiniteArticle(identity)}, ${argObj.leader._name} is hurt.`,
            `${argObj.leader._name} eyes flash red for their fellow ${identityPlural}.`,
            `As ${indefiniteArticle(identity)}, ${argObj.leader._name} finds this deeply unamusing.`
        ])[0];
    } else if (jokeBombs){
        addendum = `${argObj.leader._name} does not appreciate the low-brow humor.`
    } else {
        moraleBoost = clamp(jokeIndex - 2,-1,3);
    }
    addMorale(moraleBoost);
    lines.push(addendum);
}

function subEventStatCheck(argObj,lines){
    argObj = argObj || {};
    var leader = argObj.leader || getRandomLeader();
    var stat = argObj.stat || shuffle(['wits','culture','bravery','chance'])[0];
    var check = argObj.check || getRandomInt(1,5);
    var description = argObj.description || 'pass the test';
    var success = stat !== 'chance' ? leader['_' + stat] >= check : rollDice(1,check) === check;
    var result = success ? 'manages to' : 'is unable to';
    var punctuation = success ? '!' : '...';
    var sadly = ['Sadly','Unfortunately','Alas'];
    var preamble = success ? `${generateExclamation()}` : `${shuffle(sadly)[0]},`;
    lines.push(`${preamble} ${leader._name} ${result} ${description}${punctuation}`);
    return success;
}

function subEventLeaderStumbles(argObj,lines){
    argObj = argObj || {};
    var leaderOne = argObj.leader || getRandomLeader();
    var leaderTwo = argObj.leaderTwo || getRandomLeader(leaderOne._id);
    var check = argObj.check || getRandomInt(1,6);
    var death = argObj.death || 'is lost to the abyss below';
    lines.push(`${leaderOne._name} stumbles near the edge!`);
    var success = subEventStatCheck({leader: leaderOne, stat: 'wits', check: check, description: 'catch themselves'},lines);
    if (success){
        lines.push(`${leaderTwo._name} admonishes everyone to be more careful.`)
    } else {
        var successTwo = false;
        if ( leaderOne !== leaderTwo){
            lines.push(`... But ${leaderTwo._name} rushes over to catch them!`)
            successTwo = subEventStatCheck({leader: leaderTwo, stat: 'wits', check: check, description: `grab ${leaderOne._name} before they go over`},lines);
        }
        if( successTwo ){
            lines.push('Everyone breathes a sigh of relief.');
        } else {
            removeLeader(leaderOne._id,death);
        }
    }
    return lines;
}

function subEventAnimalStumbles(argObj,lines){
    argObj = argObj || {};
    var animalName = argObj.animal || getRandomAnimal();
    var danger = argObj.danger || rollDice(1,10);
    var death = argObj.death || 'plummets into the blackness';
    if( animalName !== undefined ){
        var animalPhrase = trailGame.animals[animalName] === 1 ? `Our only ${animalName}` : `One of our ${pluralize(animalName)}`;
        lines.push(`${animalPhrase} stumbles near the edge...`);
        var animalObj = trailGame.animalClasses[animalName];
        if (animalObj.dexterity < danger ){
            lines.push(`...It ${death}.`);
            removeAnimals(animalName,1);
        } else {
            lines.push(`...It steadies itself and continues on.`)
        }
    } else {
        var good = getRandomGood();
        if ( good !== undefined ){
            lines.push(`A few ${pluralize(good)} fall out of our packs...`);
            removeGoods(good,rollDice(3));
        } else{
            lines.push('The going is treacherous, we almost loose our footing.');
        }
    }
    return lines;
}

function subEventDecipherText(argObj,lines){
    argObj = argObj || {};
    argObj.leader = argObj.leader || getRandomLeader();
    argObj.stat = 'culture';
    argObj.bookDesc = argObj.bookDesc || generatePuzzleBookDesc();
    argObj.check = argObj.check || getRandomInt(1,5);
    argObj.preamble = argObj.preamble || 'We discover a strange text:';
    argObj.result = argObj.result || `It appears to be ${indefiniteArticle(generateHistoricDesc())} ${generateBookTypeAndPreposition()[0]}.`;
    lines.push(`${argObj.preamble} ${argObj.bookDesc}.`);
    argObj.description = 'decipher the text';
    var success = subEventStatCheck(argObj,lines);
    if (success){
        lines.push(argObj.result);
        addMorale(1);
    }
    return success;
}

function subEventHearRumor(argObj,lines){
    argObj = argObj || {};
    argObj.leader = argObj.leader || getRandomLeader();
    argObj.stat = 'wits';
    argObj.check = argObj.check || getRandomInt(1,5);
    argObj.rumor = argObj.rumor || generateRumor();
    argObj.preamble = argObj.preamble || 'We hear a rumor that';
    argObj.description = 'fact-check this rumor for us';
    lines.push(`${argObj.preamble} ${argObj.rumor.rumor}.`);
    var success = subEventStatCheck(argObj,lines);
    if (success){
        if (argObj.rumor.rumorType === true){
            lines.push(`${argObj.leader._name} confirms it is indeed true.`);
        } else {
            lines.push(`${argObj.leader._name} assures us that it is a lie.`);
        }
        addMorale(1);
    }
    return success;
}

function subEventReadBook(argsObj,lines){
    argsObj = argsObj || {};
    var validBookTypes = [
        'romance',
        'ya',
        'game',
        'puzzle',
        'empty',
        'culture',
        'non-fiction',
        'novel',
        'turtle',
        'engineering',
        'guide',
        'self-help',
        'evil',
        'bad',
        'rumor',
        'joke',
    ];
    //argsObj.bookType = argsObj.bookType || rollDice(1,11);
    if (argsObj.bookType === undefined || validBookTypes.indexOf(argsObj.bookType) === -1){
        argsObj.bookType = shuffle(validBookTypes)[0];
    }
    argsObj.leader = argsObj.leader || getRandomLeader();
    argsObj.verb = argsObj.verb || 'discovers';
    var location = argsObj.location !== undefined ? ' ' + argsObj.location : '';
    var bookLine = `${argsObj.leader._name} ${argsObj.verb} a book${location}:`;
    var books = [];
    var addendum = "";
    switch (argsObj.bookType){
        case 'romance':
            lines.push(`${bookLine} "${generateRomanceTitle()}."`);
            addendum = shuffle([
                `It's quite the saucy read.`,
                `${argsObj.leader._name} blushes deeply.`,
                `${getRandomLeader(argsObj.leader.id)._name} saves this book for later.`
            ])[0];
            lines.push(addendum);
            addMorale(1);
            break;
        case 'ya':
            lines.push(`${bookLine} "${generateYATitle()}."`);
            addendum = shuffle([
                `Our spirits are lifted by the diversion.`,
                `It's an enjoyable read. We pass it around.`,
                `Reading it brings some much needed levity.`
            ])[0];
            lines.push(addendum);
            addMorale(1);
            break;
        case 'game':
            lines.push(`${bookLine} "${generateGamebookTitle()}."`);
            addendum = shuffle([
                `${getRandomLeader()._name} can't wait to play again.`,
                `Who knew there were so many different ways to play?`,
                `${getRandomLeader()._name} is engrossed by the strategy tips.`
            ])[0];
            lines.push(addendum);
            addMorale(1);
            break;
        case 'puzzle':
            subEventDecipherText({ leader: argsObj.leader, preamble: bookLine},lines);
            break;
        case 'empty':
            lines.push(`${bookLine} ${generateEmptyBookDesc()}`);
            break;
        case 'culture':
            lines.push(`${bookLine} ${generateBiographyDesc({culture: generateCulture(false,argsObj.culture)})}`);
            addCulture(1,2,argsObj.leader._id);
            break;
        case 'non-fiction':
            lines.push(`${bookLine} "${generateNonFictionTitle()}."`);
            addCulture(1,2,argsObj.leader._id);
            break;
        case 'novel':
            lines.push(`${bookLine} "${generateNonFictionTitle()}."`);
            addCulture(1,2,argsObj.leader._id);
            break;
        case 'turtle':
            lines.push(`${bookLine} ${generateTurtleBookDesc()}`);
            //addCulture(1,2,argsObj.leader._id);
            break;
        case 'engineering':
            lines.push(`${bookLine} "${generateEngineeringTitle()}."`);
            addWits(1,2,argsObj.leader._id);
            break;
        case 'guide':
            lines.push(`${bookLine} "${generateGuideTitle()}."`);
            addWits(1,2,argsObj.leader._id);
            break;
        case 'self-help':
            lines.push(`${bookLine} "${generateSelfHelpTitle()}."`);
            addBravery(1,2,argsObj.leader._id);
            break;
        case 'evil':
            lines.push(`${bookLine} ${generateEvilBookDesc()}`);
            addendum = shuffle([
                `A truly disturbing and disheartening read.`,
                `We were better off not having read it.`,
                `Deeply unnerving.`
            ])[0];
            lines.push(addendum);
            removeMorale(1);
            break;
        case 'bad':
            lines.push(`${bookLine} "${generateBookTitle()}."`);
            addendums = [
                `It's truly bad. Just awful.`,
                `It's... not a particularly thrilling read.`,
                `It's so bad it's actually good.`
            ];
            var index = getRandomInt(0,2);
            lines.push(addendums[index]);
            if (index === 0){
                removeMorale(1);
            } else if (index === 2){
                addMorale(1);
            }
            break;
        case 'rumor':
            subEventHearRumor({leader: argsObj.leader, preamble: `${bookLine} it claims that`},lines);
            break;
        case 'joke':
            subEventHearJoke({leader: argsObj.leader, preamble: `${bookLine} it contains a joke about`, jokeType: argsObj.jokeType},lines);
            break;
    }
    //lines.push(`bookType: ${argsObj.bookType}`); // debug
    return lines;
}

function subEventVisitLibrary(argsObj,lines){
    argsObj = argsObj || {};
    var bookTypes = argsObj.bookTypes || [];
    var leaders = argsObj.leaders || [getRandomLeader(),getRandomLeader(),getRandomLeader()];
    leaders = shuffle(leaders);
    bookTypes = shuffle(bookTypes);
    var locations = shuffle([
        'from a pile of books open on a table',
        'from the highest shelf',
        'that was reccommended by the librarian',
        'they found hidden behind some others',
        'at random',
        'that looks interesting',
        'from the locked cabinet of rare books'
    ]);
    var verbs = shuffle(['picks up','reads','peruses','flips through','studies','skims']);
    subEventReadBook({leader: shuffle(leaders)[0], verb: verbs[0], location: locations[0], bookType: bookTypes[0]},lines);
    subEventReadBook({leader: shuffle(leaders)[0], verb: verbs[1], location: locations[1], bookType: bookTypes[1]},lines);
    subEventReadBook({leader: shuffle(leaders)[0], verb: verbs[2], location: locations[2], bookType: bookTypes[2]},lines);
    return lines;
}

function subEventNewLeader(argsObj,lines){
    argsObj = argsObj || {};
    var newLeader = generateLeader(argsObj);
    argsObj.oldLeader = argsObj.oldLeader || getRandomLeader();
    argsObj.leaderMorale = argsObj.leaderMorale || rollDice(1,10);
    argsObj.leaderMorale = clamp(argsObj.leaderMorale,1,10);
    newLeader._health = argsObj.leaderMorale;
    argsObj.description = argsObj.description || '';
    argsObj.verb = argsObj.verb || 'meet';
    var otherLeaderName = getRandomLeader(argsObj.oldLeader._id)._name;
    var posssibleShapes = ['quite desperate','in bad shape','to have seen better days','in good health','in excellent spirits'];
    var condition = posssibleShapes[clamp(Math.floor(argsObj.leaderMorale/2),0,4)];
    var seem = shuffle(['seem','appear','look'])[0];
    lines.push(`We ${argsObj.verb} ${newLeader._name} the ${newLeader._raceName} ${newLeader._title}${argsObj.description}. They ${seem} ${condition}.`);
    var possibleFlavor = [
        `${newLeader._name} hails from the surface lands, and still, at times, longs for the touch of the sun.`, 
        `${argsObj.oldLeader._name} is already smitten with ${newLeader._name}'s ${generateAttractiveTrait()}...`, 
        `${otherLeaderName} suspects they are actually ${indefiniteArticle(generateWizard())} in disguise...`,
        `${newLeader._name} also moonlights as an ${generateEntertainer()}.`,
        `${otherLeaderName} suspects they have a problem with ${generateDrug()}...`,
        `A wicked scar runs across ${newLeader._name}'s ${generateBodyPart()}.`,
        `${newLeader._name}'s ${generateBodyPart()} bears a tattoo of ${indefiniteArticle(generateCreature())}.`,
    ];
    lines.push(shuffle(possibleFlavor)[0]);
    lines.push(`${argsObj.oldLeader._name} invites them to join our caravan.`);
    var caravanStatus = trailGame.caravan.morale + getCaravanAverage('_health');
    if (caravanStatus >= argsObj.leaderMorale * 2){
        lines.push(`${newLeader._name} agrees to join us.`);
        addLeader({leader: newLeader});
    } else {
        lines.push(`Seeing the condition of our crew, ${newLeader._name} is skeptical.`);
        var gamePair = shuffle(generateGame(true))[0];
        lines.push(`${newLeader._name} challenges ${argsObj.oldLeader._name} to a game of ${gamePair[0]} to decide if they should join.`);
        var outcome = gamePair[1] === 'chance' ? '(50% odds)' : `(${newLeader['_'+gamePair[1]]} to ${argsObj.oldLeader['_'+gamePair[1]]})`;
        var success = subEventStatCheck({
            leader: argsObj.oldLeader,
            stat: gamePair[1],
            check: gamePair[1] === 'chance' ? 2 : newLeader['_'+gamePair[1]],
            description: `beat ${newLeader._name} at the game of ${gamePair[1]}`
        },lines);
        if (success){
            addLeader({leader: newLeader});
        } else {
            lines.push(`We bid ${newLeader._name} farewell.`);
        }
    }
    return lines;
}

function subEventBottomOfAPit(argsObj,lines){
    argsObj = argsObj || {};
    var tool = generateEquipment();
    argsObj.verb = 'find'
    argsObj.description = ` down the bottom of a pit, with nothing but ${indefiniteArticle(tool)}`,
    argsObj.leaderMorale = argsObj.leaderMorale || rollDice(1,6);
    subEventNewLeader(argsObj,lines);
    addGoods(tool,1);
    return lines;
}

// cave functions

function generateCave(argsObj){
    argsObj = argsObj || {};
    var types = ["tunnel","natural","structure","haunted","tower","stairs","strange"];
    if (types.indexOf(argsObj.caveType) < 0 || argsObj.caveType === undefined){
        argsObj.caveType = shuffle(types)[0];
    }
    return window[`generate${toTitleCase(argsObj.caveType)}Cave`](argsObj);
}

function generateBaseCave(){
    var cave = {
        _length : 0,
        _complexity : 0,
        _trapChance : 0, // all chances represent 1:X chance per day to add subEvent
        _monsterChance : 0, 
        _spiderChance : 0, 
        _wormChance : 0,
        _lootTypes: ['goods','goods','book'],
        _trapTypes : [],
        _monsterTypes : [],
        _undeadTypes : [],
        _lootChance: 20,
        _corpseChance: 0,
        _name : 'eerie void',
        _pluralName : 'eerie voids',
        _lootLocation: 'in a stray pocket dimension',
        _depths : 'another dimension',
        _tower : 'into the nothingness',
        _lair : 'somewhere in the void',
        _stone : generateStone(),
        _metal : generateMetal(),
        _hutType : generateHutDesc(),
        _leviathan: generateLeviathan(),
        _religion: generateReligion(),
        _verb : 'pass through',
        _exitVerb : 'emerge',
        _preposition : 'in',
        _additionalAction : undefined,
        _additionalChance : 40,
        _bookTypes: [],
    }
    return cave;
}

function generateTowerCave(argsObj){
    var cave = generateBaseCave();
    argsObj = argsObj || {};
    var rooms = shuffle(generateRoom(true));
    var towerType = generateTowerDesc();
    var culture = generateAncientCulture();
    var history = shuffle([
        "was where suicides once came to jump",
        "was made by some strange, unknown builders",
        `is an abandoned outpost of ${culture}`,
        `which was once home to a powerful ${generateWizard()}`,
        "was where perpetrators of the most heinous crimes were kept",
        "is built upon a foundation of corpses",
        "once crawled about on insectile legs",
        `is where ${indefiniteArticle(generateEvilDesc())} witch monarch is sealed away for all eternity`
    ])[0];
    cave._length = rollDice(1,10);
    cave._complexity = rollDice(1,10);
    cave._trapChance = 20; // all chances represent 1:X chance per day to add subEvent
    cave._monsterChance = 20;
    cave._spiderChance = 20;
    cave._wormChance = 20;
    cave._lootTypes = ['animal','goods','book'];
    cave._bookTypes = ['evil','empty','culture','engineering','non-fiction','novel','turtle','game'];
    cave._trapTypes = ['fire','acid','spikes','crusher'];
    cave._monsterTypes = Object.keys(trailGame.monsterClasses);
    cave._undeadTypes = Object.keys(trailGame.undeadClasses);
    cave._lootChance = 10;
    cave._name = `${towerType} ${cave._stone} tower`;
    cave._pluralName = `${towerType} towers of ${cave._stone}`,
    cave._lootLocation = `in ${indefiniteArticle(generateAbandonedDesc())} ${rooms[0]}`;
    cave._depths = `a ${rooms[1]} below us`;
    cave._tower = `the ${cave._stone} walls`;
    cave._verb = shuffle(['explore','investigate','enter'])[0];
    cave._exitVerb = 'continue on';
    cave._corpseChance = 20;
    cave._additionalChance = 6;
    cave._additionalAction = function(argObj,lines){
        var leader = getRandomLeader();
        var text = shuffle([`${generateMaterial()} plaque`,'inscription','logbook','mural','diagram','placard'])[0];
        var writing = shuffle([`etched with ${generateRunesDesc()} runes`,`written in ${generateLanguage(false,culture)}`,`written in ${generateHistoricDesc()} verse`])[0];
        subEventDecipherText({
            leader: leader,
            preamble: `In a ${indefiniteArticle(generateAbandonedDesc())} ${rooms[2]}, ${leader._name} ${shuffle(['finds','discovers','uncovers'])[0]} a`,
            bookDesc: `${text} ${writing}`,
            result: `We learn this tower ${history}.`
        },lines);
    };
    return cave;
}

function generateStairsCave(argsObj){
    var cave = generateBaseCave();
    argsObj = argsObj || {};
    var goingUp = rollDice() > 10;
    cave._verb = goingUp ? 'ascend' : 'descend';
    var stones = generateStone(true);
    var tunnelStone =  argsObj.stone || cave._stone;
    var stairTypes = generateStaircaseDesc(true);
    var thisType = shuffle([...stairTypes])[0];
    var diceNum = (stones.indexOf(tunnelStone) + 1) + (stairTypes.indexOf(thisType) + 1);
    cave._length = rollDice(diceNum,5);
    var feature = argsObj.feature || shuffle([
        generateNaturalCave(),
        generateTowerCave(),
        generateHauntedCave(),
        generateStructureCave()
    ])[0];
    var liquid = argsObj.liquid || generateLiquid();
    var flavor = shuffle([
        `through a layer of ${cave._stone}`, 
        `overlooking ${indefiniteArticle(feature._name)}`, 
        `behind a cascade of ${liquid}`, 
        //"along a #chasm_desc# chasm", TODO chasms
        `wrapped around ${indefiniteArticle(generateTowerDesc())} pillar`
    ])[0];
    cave._name = `${generateStaircaseDesc()} staircase ${flavor}`;
    cave._lootLocation = 'abandoned on one of the steps';
    cave._exitVerb = `reach the ${goingUp ? 'upper' : 'lower'} landing`;
    cave._monsterTypes = ["flue harpy"];
    cave._monsterChance = 50;
    cave_undeadTypes = ['spectre','phantasm','wraith'];
    cave._undeadChance = 100;
    cave._additionalChance = 10;
    cave._preposition = 'on';
    cave._additionalAction = function(argObj,lines){
        var chance = rollDice();
        if (chance === 1 ){
            subEventLeaderStumbles({check: 3},lines);
        } else if (chance < 15){
            subEventAnimalStumbles({danger: 4},lines);
        } else {
            subEventNewLeader({verb: 'are greeted by', description: ', headed in the opposite direction', leaderMorale: rollDice(2,5)},lines);
        }
    }
    return cave;
}

function generateTunnelCave(argsObj){
    var cave = generateBaseCave();
    argsObj = argsObj || {};
    var stones = generateStone(true);
    var leviathans = generateLeviathan(true);
    var tunnelStone =  argsObj.stone || cave._stone;
    var diceNum = (stones.indexOf(tunnelStone) + 1) * (leviathans.indexOf(cave._leviathan) + 1);
    cave._wormChance = 50;
    cave._length = rollDice(diceNum,10);
    cave._name = `${tunnelStone} tunnel carved by ${indefiniteArticle(cave._leviathan)}`;
    cave._pluralName = `${tunnelStone} tunnels carved by ${pluralize(cave._leviathan)}`;
    var possibleLocations = [
        'in a hidden chamber intersected by the tunnel',
        `in a nest of ${pluralize(generatePrey())}`,
        `just lying on the tunnel floor`
    ];
    cave._lootLocation = shuffle(possibleLocations)[0];
    cave._depths = 'ahead of us in the tunnel';
    return cave;
}

function generateStrangeCave(argObj){
    var cave = generateBaseCave();
    argObj = argObj || {};
    var hermitType = typeof(argObj.hermitType) === "number" && argObj.hermitType <= 8 ? argObj.hermitType : getRandomInt(0,8);
    var strangeLib = {
        'beacon': {
            _name: `${generateBeaconDesc()} beacon`,
            _exitVerb: 'continue on',
            _preposition: 'outside',
            _corpseChance: 20,
            _additionalAction : function(argObj,lines){
                var ancientCulture = generateAncientCulture();
                var beaconBehaviors = [
                    " forever broadcasts its final warning...", 
                    ` was long ago smashed by the enemies of ${ancientCulture}.`, 
                    "'s purpose has been forgotten.", 
                    "'s power has been slowly dwindling over centuries.",
                    ` appears to have been left by ${ancientCulture}.`, 
                    " is casting out a chaotic signal."
                ];
                var chance = rollDice();
                if (chance == 20){
                    lines.push(`The beacon${shuffle(beaconBehaviors)[0]}`);
                    subEventNewLeader({verb: 'encounter', description: `, who has come here to study ${ancientCulture}`, leaderMorale: 10},lines);
                } else if (chance > 17){
                    var howMany = rollDice();
                    var animal = getRandomAnimal();
                    var phrase = howMany === 1 ? 'one' : 'a few';
                    var verb = howMany === 1 ? 'has' : 'have';
                    lines.push(`The beacon suddenly comes suddenly to life!`);
                    lines.push(`The ground quakes as a ${generateLeviathan()} bursts forth!`);
                    if( animal !== undefined){
                        lines.push(`We manage to escape, but ${phrase} of our ${pluralize(animal)} ${verb} gone missing.`);
                        removeAnimals(animal,howMany);
                    } else {
                        lines.push(`We barely escape with our lives.`);
                    }
                } else {
                    lines.push(`The beacon${shuffle(beaconBehaviors)[0]}`);
                    lines.push(`We collect a few artifacts from ${ancientCulture} before we leave.`);
                    addGoods('ancient artifacts',rollDice(1,10));
                }
            }
        },
        "hermit's hut" : {
            _name: `hermit's ${cave._hutType} hut`,
            _exitVerb: 'continue on',
            _hermitType: hermitType,
            _additionalAction : function(argObj,lines){
                var goods = generateGood();
                var leader = argObj.leader || getRandomLeader();
                var pet = generatePet();
                var hermits = [
                    "oddly shaped skulls", // 0
                    "a quaint mushroom garden", // 1  
                    `${pluralize(goods.goodsType)} put out for trade`, // 2
                    "idols to an invented god", // 3
                    "shrines of every religion", // 4
                    "refuse", // 5
                    `unnervingly realistic ${cave._stone} statues`, // 6
                    "glittering gems, strewn carelessly about", // 7
                    `${generatePetDesc()} ${pluralize(pet.animalClass)}` // 8
                ];
                var hermitPhrase = hermits[Math.round(cave._hermitType)];
                lines.push(`The hut is surrounded by ${hermitPhrase}...`);
                switch (cave._hermitType){
                    case 0:
                        lines.push(`The hermit thrusts a few of them into ${leader._name}'s' hands while muttering angrily, then walks away.`);
                        addGoods('fossil',rollDice(1,10));
                    break;
                    case 1:
                        lines.push(`The hermit introduces themselves as ${generateName()}.`);
                        lines.push(`They cordially invite us to dinner in their hut, and gift us with some of their crafts after we eat.`);
                        addFood(rollDice(trailGame.leaders.length,6));
                        addGoods('mushroom-cap bowl',rollDice(1,10));
                        addGoods('fungus pillow',rollDice(1,10));
                        addGoods('mushroom ale',rollDice(1,10));
                    break;
                    case 2:
                        // trade
                        //tradeObj,number,key,keySellPrice
                        var offer = {};
                        addToTrade(offer,rollDice(),goods.goodsType);
                        var proposal = getTradeProposal({approxValue: offer.actualValue});
                        var textOffer = sentenceForm(scrubTradeObj(offer));
                        var textProposal = sentenceForm(scrubTradeObj(proposal));
                        lines.push(`We propose to give the hermit ${textProposal} for ${textOffer}.`);
                        isAccepted = subEventTradeAttempt({offer: offer, proposal: proposal, merchantName: `The hermit`, giveExtra: true},lines);
                        if (isAccepted){
                            removeTrade(proposal);
                            addTrade(offer);
                        }
                    break;
                    case 3:
                        lines.push(`The hermit babbles incoherently about their religion. They return from their hut with a stack of books they insist will explain everthing.`);
                        subEventReadBook({leader: leader, verb: 'reads', location: 'from the stack', bookType: 'nothing'},lines);
                        lines.push(`The hermit winks at us with a look of understanding.`)
                    break;
                    case 4:
                        lines.push(`${leader._name} and the hermit strike up a conversation about the nature of ${generateGod()}.`);
                        if( Object.keys(trailGame.leaders).length > 1){
                            lines.push(`${getRandomLeader(leader._id)._name} rolls their eyes in boredom.`);
                        }
                        addCulture(1,2,leader._id);
                    break;
                    case 5:
                        subEventNewLeader({verb: "learn the hermit once went by", description: `, and they have lived here in self-exile for ${rollDice(2,15)} years`, leaderMorale: 1},lines);
                    break;
                    case 6:
                        var wormName = generateName();
                        lines.push(`The hermit greets us and asks if ${leader._name} would like to meet their friend ${wormName}.`);
                        var success = subEventStatCheck({leader: leader, stat: 'wits', check: 2, description: 'notice the warning signs'},lines);
                        if (success){
                            lines.push(`We leave in a hurry, the hermit calling out after us.`);
                        } else {
                            lines.push(`${leader._name} replies that they would gladly meet ${wormName}. The hermit gleefully claps.`);
                            subEventWormAttack({leader: leader, color: 'yellow', location: `behind the ${cave._hutType} hut`, stone: cave._stone},lines);
                            lines.push(`We flee before any more of us can be petrified.`)
                        }
                    break;
                    case 7:
                        lines.push(`Tearfully, the hermit hurls a handful of gems at us.`);
                        lines.push(`"Take them!" they cry. "They've brought me nothing but sorrow!"`);
                        addGoods(generateGem(),rollDice(1,10));
                    break;
                    case 8:
                        lines.push(`One of the ${pluralize(pet.animalClass)} takes a shining to ${leader._name}.`);
                        //tradeObj,number,key,keySellPrice
                        var offer = {};
                        addToTrade(offer,1,pet.animalClass);
                        var proposal = getTradeProposal({approxValue: offer.actualValue});
                        var textProposal = sentenceForm(scrubTradeObj(proposal));
                        lines.push(`We offer to give the hermit ${textProposal} in exchange for the ${pet.animalClass}.`);
                        isAccepted = subEventTradeAttempt({offer: offer, proposal: proposal, merchantName: `The hermit`, giveExtra: true},lines);
                        if (isAccepted){
                            removeTrade(proposal);
                            addTrade(offer);
                            lines.push(`${leader._name} is enamoured with their new friend.`);
                        }
                    break;
                }
            }
        },
        "monastery" : {
            _name: `${generateHutDesc()} monastery`,
            _exitVerb: 'continue on',
            _additionalAction : function(argObj,lines){
                lines.push(`The monastery is maintained by ${cave._religion.followerPlural}.`);
                var neutralLeaders = getLeadersNeutralToGod(cave._religion.god);
                var neutralLeaderNames = getLeaderNames(neutralLeaders);
                var opposingLeaderNames = getLeaderNames(getLeadersOpposingGod(cave._religion.god));
                lines.push(`The monks invite us to visit with them.`);
                var oS = opposingLeaderNames.length === 1 ? 's' : '';
                var opposition = opposingLeaderNames.length ?  `${sentenceForm(opposingLeaderNames)} remain${oS} outside on religious grounds, but ` : '';
                var jS = neutralLeaders.length === 1 ? 's' : '';
                var joining = !opposingLeaderNames.length ? 'All of us' : sentenceForm(neutralLeaderNames);
                joining = neutralLeaders.length ? joining : 'None of us';
                opposition = neutralLeaders.length ? opposition : '';
                lines.push(`${opposition}${joining} choose${jS} to accept the invitation.`);
                if (neutralLeaders.length){
                    var abbx = rollDice() > 10 ? 'abbess' : 'abbot';
                    var roll = rollDice();
                    if (roll < 6){
                        var craftPair = shuffle(cave._religion.craftPairs)[0];
                        var goodsObj = generateGood(craftPair[0]);
                        lines.push(`This monastery is known for a particularly refined variety of ${craftPair[0]} they ${craftPair[1]} here.`);
                        var diceNum = clamp(Math.ceil(4 - (goodsObj.sell / 25)),1,4);
                        var offer = {};
                        addToTrade(offer,rollDice(diceNum),goodsObj.goodsType);
                        var proposal = getTradeProposal({approxValue: offer.actualValue});
                        var textOffer = sentenceForm(scrubTradeObj(offer));
                        var textProposal = sentenceForm(scrubTradeObj(proposal));
                        var abbxJob = cave._religion.god === 'Sister Serpent-Eyes' ? 'high gorgon' : 'priest';
                        var merchant = generateLeader({name: `The ${abbx}`, job: abbxJob, religion: cave._religion});
                        lines.push(`${neutralLeaders[0]._name} speaks to the ${abbx} and proposes we trade ${textProposal} for ${textOffer}.`);
                        isAccepted = subEventTradeAttempt({offer: offer, proposal: proposal, merchant: merchant, giveExtra: true},lines);
                        if (isAccepted){
                            removeTrade(proposal);
                            addTrade(offer);
                        }
                    } else if (roll < 12) {
                        var we = neutralLeaders.length > 1 ? 'We' : neutralLeaders[0]._name;
                        var ess = neutralLeaders.length > 1 ? '' : 's';
                        lines.push(`${we} take${ess} a moment to visit the monks' library.`);
                        var bookTypes = shuffle(['non-fiction','non-fiction','puzzle','puzzle','culture','culture','romance','bad']);
                        if (cave._religion.god === 'The Turtle-Father'){
                            bookTypes = ['turtle','turtle','turtle','turtle'];
                        }
                        subEventVisitLibrary({bookTypes: bookTypes, leaders: neutralLeaders},lines);
                    } else if (roll < 18){
                        var us = neutralLeaders.length > 1 ? 'us' : neutralLeaders[0]._name;
                        if (rollDice > 10 && cave._religion.canHaveImage){
                            var creating = shuffle(['carving','painting','sculpting','embroidering','weaving','conjuring'])[0];
                            lines.push(`The monks are ${creating} an exquisite portait of ${cave._religion.god}.`);
                            lines.push(`Their artistry inspires ${us}.`);
                            lines.push(`Before we go, the monks kindly feed and gift us with provisions.`);
                        } else {
                            var alcohol = generateAlcohol();
                            var cheese = generateCheese();
                            lines.push(`We've arrived just in time for ${cave._religion.holiday}!`);
                            lines.push(`The monks invite ${us} to join in their feast of ${generateFood()}, ${cheese} and ${alcohol}.`);
                        }
                        addMorale(2);
                        addFood(rollDice(neutralLeaders.length));
                        addGoods(alcohol,neutralLeaders.length);
                        addGoods(cheese,neutralLeaders.length);
                    } else {
                        var descriptions = [
                            `, who yearns for life outside the monastery walls`,
                            `, who was recently told they 'might do better in a different setting' by the ${abbx}`,
                            `, who hates living such a cloistered life`,
                        ];
                        var racesWhoWorship = trailGame.gods[cave._religion.god].races;
                        var cultureName = shuffle(racesWhoWorship)[0];
                        var cultureObj = trailGame.cultures[cultureName];
                        var academics = [...cultureObj.academics];
                        if(cultureObj.jobs.indexOf('priest') > -1){
                            academics.push('priest');
                        }
                        subEventNewLeader({cultureName: cultureName, subClassName: shuffle(academics)[0], god: cave._religion.god, verb: "meet", description: shuffle(descriptions)[0], leaderMorale: 10},lines);
                    }
                }
                return lines;
            }
        },
        "observatory" : {
            _name: `${cave._metal} observatory`,
            _verb: 'visit',
            _exitVerb: 'continue on',
            _additionalAction : function(argObj,lines){
                var constructed = shuffle(['built','set up','constructed'])[0];
                var study = shuffle(['study','monitor','observe'])[0];
                var subjects = [
                    "that which moves within the core", 
                    "the far-away surface world", 
                    "the unseen and impertinent dance of solar and planetary bodies", 
                    "the far future and distant past", 
                    `the migrations of ${generatePrey()}`, 
                    "the shifting of the plates", 
                    "the alignment of the planes", 
                    "powerful psychic emanations", 
                    "the ineffable power of silence", 
                    "the true names of strange spirits", 
                    `the dissected corpse of ${generateLeviathan()}`
                ];
                var subjectIndex = getRandomInt(0,subjects.length - 1);
                lines.push(`The observatory has been ${constructed} to ${study} ${subjects[subjectIndex]}.`);
                var researchers = ['geomancer','logician','alchemist','engineer'];
                var dice = rollDice();
                if( dice < 8 ){
                    lines.push(`We stop and visit the researchers' library.`);
                    var bookTypes = shuffle(['non-fiction','non-fiction','engineering','engineering','guide','guide','ya','novel','joke']);
                    subEventVisitLibrary({bookTypes: bookTypes},lines);
                } else if (dice < 16){
                    var wants = [];
                    var howMany = 3 // rollDice(1,4);
                    var weHave = false;
                    for (var i = howMany; i >= 0; i--) {
                        var want = shuffle([generateEquipment(),generateEquipment(),generateCheese(),generateAlcohol(),generateCommodity()])[0];
                        if (wants.indexOf(want) < 0){
                            wants.push(want);
                            weHave = trailGame.goods[want] !== undefined ? true : weHave;
                        }
                    }
                    lines.push(`The researchers are running low on ${sentenceForm(wants,true)}.`);
                    var trader = generateLeader({job: shuffle(researchers)[0]});
                    var phrase = weHave ? `${trader._name}, the ${trader._title} in charge of logistics, is interested in trading with us.` : 'Alas, we are unable to help them.';
                    lines.push(phrase);
                    if (weHave){
                        var proposal = {};
                        for (var i = wants.length - 1; i >= 0; i--) {
                            var good = generateGood(wants[i]);
                            if (trailGame.goods[good.goodsType] !== undefined){
                                addToTrade(proposal,clamp(rollDice(2),1,trailGame.goods[good.goodsType]),good.goodsType);
                            }
                        }
                        var offer = getTradeOffer({approxValue: proposal.actualValue});
                        var textOffer = sentenceForm(scrubTradeObj(offer));
                        var textProposal = sentenceForm(scrubTradeObj(proposal));
                        lines.push(`We propose to give the researchers ${textProposal} for ${textOffer}.`);
                        isAccepted = subEventTradeAttempt({offer: offer, proposal: proposal, merchant: trader, giveExtra: true, properName: true},lines);
                        if (isAccepted){
                            removeTrade(proposal);
                            addTrade(offer);
                        }
                    }
                } else {
                    var descriptions = [
                        `, who has recently finished their dissertation here`,
                        `. They have grown disillusioned with the leadership at this institution`,
                        `. They are eager to put their theories to test in the field`,
                        `, who is no longer sure they're cut out for research work`
                    ];
                    subEventNewLeader({subClassName: shuffle(researchers)[0], verb: "meet", description: shuffle(descriptions)[0], leaderMorale: 10},lines);
                }
            }
        },
        "abandoned camp" : {
            _name: `hastily abandoned camp`,
            _lootChance: 2,
            _additionalChance: 2,
            _lootLocation: 'left behind among the tents and ashes',
            _lootTypes: ['book','goods','animal'],
            _additionalChance: 4,
            _bookTypes : ['romance','ya','game','guide','bad','novel'],
            _corpseChance : 8,
            _additionalAction : function(argObj,lines){
                var diceRoll = rollDice(1,2);
                var moods = [
                    `${getRandomLeader()._name} get a chill up their spine.`,
                    `A dark aura hangs over the place.`,
                    `A flurry of footsteps indicates some sort of struggle occured.`,
                    `An acrid smell lingers in the air.`,
                    `Some ${generateMonsters().monsterType} tracks lead away in the distance.`
                ];
                lines.push(shuffle(moods)[0]);
                if (diceRoll === 1){
                    // leftover food
                    lines.push(`We find a meal of ${generateFood()} still warm by the fire.`);
                    addFood(rollDice(Object.keys(trailGame.leaders).length));
                } 
            }
        }
    };
    cave._verb = 'come upon';
    cave._length = 1;
    cave._lootChance = 0;
    cave._monsterChance = 0;
    cave._undeadChance = 0;
    cave._wormChance = 0;
    cave._spiderChance = 0;
    cave._additionalChance = 1;
    var types = Object.keys(strangeLib);
    argObj.strangeType = argObj.strangeType === undefined || types.indexOf(argObj.strangeType) < 0 ? shuffle([...types])[0] : argObj.strangeType;
    var caveDetails = strangeLib[argObj.strangeType];
    Object.keys(caveDetails).map(function(key){
        cave[key] = caveDetails[key]
    });
    return cave;
}

function generateNaturalCave(argsObj){
    var cave = generateBaseCave();
    argsObj = argsObj || {};
    var naturalLib = {
        'weightless void': {
            _lootLocation: 'floating in midair',
            _pluralName: 'weightless voids',
            _exitVerb: 'touch ground',
            _monsterTypes: ['flue harpy'],
            _undeadTypes: ['spectre','wraith','phantasm'],
            _trapTypes: ['suction','fire'],
            _depths: 'the dark nothingness',
            _additionalChance: 50,
            _bookTypes : ['random'],
            _additionalAction: function(argObj,lines){
                if (rollDice() > 10){
                    var gem = generateGem();
                    lines.push(`${generateExclamation()} We light upon an asteroid composed entirely of ${gem}!`);
                    addGoods(gem,rollDice(4));
                } else {
                    var shipShape = shuffle(["manta ray", "cuttlefish", "octopus", "nautilus", "spider", "whale"])[0];
                    subEventOddFeature({preamble: `Drifting in the void, `, verb: 'discover', feature: `a strange ${cave._metal} ship fashioned in the shape of ${indefiniteArticle(shipShape)}`},lines);
                }
            }
        },
        'vast, shadowy plain': {
            _lootLocation: 'hidden in the mist', 
            _pluralName: 'shadowy plains',
            _monsterTypes: ["feral hell dog","flue harpy","six-legged tiger"],
            _undeadTypes: ['ghoul','wight','wraith'],
            _trapTypes: ['spikes','crusher'], 
            _depths: 'amidst the shadows',
            _undeadChance: 20,
            _additionalChance: 50,
            _additionalAction: function(argObj,lines){
                var leaderOne = getRandomLeader();
                var leaderTwo = getRandomLeader(leaderOne._id);
                lines.push('We are pursued by a rogue zebraphant...');
                lines.push(`It charges ${leaderOne._name}!`);
                var successOne = subEventStatCheck({leader: leaderOne, description: 'deter the beast', stat: 'bravery', check: 3},lines);
                if (successOne){
                    addMorale(2);
                    var successTwo = subEventStatCheck({leader: leaderTwo, description: 'calm and tame it', stat: 'wits', check: 3},lines);
                    if (successTwo){
                        addAnimals('zebraphant',1);
                    } else {
                        lines.push(`The zebraphant retreats.`);
                    }
                } else {
                    var verb = shuffle(['gores','tramples','tosses'])[0];
                    lines.push(`The zebraphant ${verb} ${leaderOne._name}.`);
                    subEventWoundLeader({leaderId: leaderOne._id, min: 4, max: 9},lines);
                }
            }
        },
        'frozen glacier': {
            _lootLocation: 'peeking out of the ice', 
            _pluralName: 'frozen glaciers',
            _monsterTypes: ['yeti','cave lion'],
            _undeadTypes: ['wight','skeleton','vampyre'],
            _trapTypes: ['spikes','crusher'], 
            _depths: 'amid the frozen crags',
            _tower: `a stalagmite of ice`,
            _spiderChance: 50,
            _additionalAction: function(argObj,lines){
                var leader = getRandomLeader();
                var bodypart = shuffle(["their nose", "an ear", `${rollDice(1,9)} fingers`, `${rollDice(1,9)} toes`])[0];
                lines.push(`${leader._name} loses ${bodypart} to frostbite.`);
                subEventWoundLeader({leaderId: leader._id, sicknessName: 'frostbite', verbPastTense: 'frostbitten', min: 3, max: 4},lines);
            },
        },
        'field of bones': {
            _leviathan: generateLeviathan(),
            _lootLocation: `under a pile of ${generateAnimal().animalClass} skulls`, 
            _pluralName: 'bone fields', 
            _monsterTypes: ['filth ogre','feral hell dog','pit mauler'],
            _undeadTypes: ['skeleton','spectre'],
            _trapTypes: ['spikes','crusher'], 
            _depths: `the skull of a ${cave._leviathan}`,
            _tower: `the rib of a ${cave._leviathan}`,
            _spiderChance: 20,
            _undeadChance: 20,
            _additionalAction: function(argObj,lines){
                if( rollDice() > 10 ){
                    subEventOddFeature({verb: 'stumble upon', leviathan: cave._leviathan},lines);
                } else {
                    subEventBottomOfAPit({},lines);
                }
            }
        },
        'fungus garden': {
            _lootLocation: 'under a blanket of lichen',
            _lootChance: 6,
            _pluralName: 'fungus gardens', 
            _monsterTypes: ['filth ogre','flue harpy','pit mauler','centipede'],
            _undeadTypes: ['ghoul'],
            _trapTypes: ['acid','suction'], 
            _depths: 'behind the mushrooms',
            _tower: `a mycelium column`,
            _spiderChance: 50,
            _wormChance: 0,
            _additionalChance: 100,
            _additionalAction: function(argObj,lines){
                lines.push(`We come across a miniature village populated by tiny blue imps!`);
                var evilStuff = generateEvilDesc(true);
                var feature = shuffle(['long, flowing hair','lustrous beard']);
                var addendum = shuffle([
                    `They tell of their struggles against ${indefiniteArticle(evilStuff[0])} ${generateWizard()} and their ${generatePetDesc()}, ${evilStuff[1]} cat.`,
                    `We try to join in their festivities but it is difficult to keep up with them.`,
                    `${getRandomLeader()._name} is particularly charmed by the one with the ${feature}.`,
                    `They seem to be a cheerful, if somewhat naive people.`,
                    `We are invited to join their feast of ${generateFood()}.`
                ])[0];
                lines.push(addendum);
                lines.push(`They generously give us provisions and send us on our way.`);
                addFood(rollDice(4));
                addGoods('mushroom cap bowl', rollDice(2));
                addGoods('fungus pillow', rollDice(2));
            }
        },
        'crystal cavern': {
            _lootChance: 6,
            _lootLocation: 'left by some previous explorers', 
            _pluralName: 'crystal caverns',
            _monsterTypes: ['yeti','six-legged tiger','cave lion','centipede'],
            _undeadTypes: ['phantasm','spectre'],
            _trapTypes: ['spikes','crusher'], 
            _depths: 'the glittering expanse',
            _wormChance: 50,
        },
        'petrified forest' : {
            _lootLocation: 'in a hollow in one of the trees', 
            _pluralName: 'petrified forests',
            _monsterTypes: ['cave lion','feral hell dog','six-legged tiger','centipede'],
            _undeadTypes: ['skeleton','spectre','wraith'],
            _trapTypes: ['spikes','crusher'], 
            _depths: `behind a towering trunk of ${cave._stone}`,
            _wormChance: 40,
            _undeadChance: 40,
            _additionalAction: function(argObj,lines){
                if (rollDice() < 18){
                    subEventDiscovery({findType: 'curiosity', preamble: '',verb: 'picks',curiosity: `an apple made of ${cave._stone}.`},lines);
                } else {
                    subEventOddFeature({preamble: 'In an eerie clearing, ', feature: 'tree with a beating black heart', verb: 'find'},lines);
                }
                
            },
        },
        'noxious bog' : {
            _lootChance: 6,
            _lootLocation: 'preserved in the muck', 
            _pluralName: 'noxious bogs',
            _monsterTypes: ['filth ogre','flue harpy','six-legged tiger','centipede'],
            _undeadTypes: ['ghoul','wraith'],
            _trapTypes: ['acid','suction','fire'], 
            _depths: 'the bubbling muck',
            _spiderChance: 50,
            _wormChance: 60,
        },
        'cave of living flesh' : {
            _lootLocation: 'protruding from a boil', 
            _pluralName: 'living caves',
            _monsterTypes: ['pit mauler','filth ogre'],
            _undeadTypes: ['skeleton'],
            _trapTypes: ['acid','suction'], 
            _depths: 'a puckering orifice',
            _wormChance: 30,
            _additionalAction: function(argObj,lines){
                if (rollDice() > 10){
                    lines.push(`We find a large pineal gland, which we harvest.`);
                    addGoods('pineal extract', rollDice(10));
                } else {
                    var taste = rollDice() > 10 ? `${generateCreature()} dung` : generateFood();
                    lines.push(`${getRandomLeader()._name} decides to fry up meat cut from the walls.`);
                    lines.push(`It tastes a bit like... ${taste}.`); //TODO food
                    addFood(rollDice(6));
                }
            }
        },
        'magma furnace' : {
            _lootLocation: 'marooned on a sulfuric island', 
            _pluralName: 'magma furnaces',
            _stone: 'brimstone',
            _monsterTypes: ['flue harpy','feral hell dog','pit mauler'],
            _undeadTypes: ['skeleton','spectre','vampyre'],
            _trapTypes: ['fire'], 
            _depths: 'the boiling rock',
            _wormChance: 20,
            _undeadChance: 20,
        },
    };
    var types = Object.keys(naturalLib);
    var naturalType = argsObj.naturalType === undefined || types.indexOf(argsObj.naturalType) < 0 ? shuffle([...types])[0] : argsObj.naturalType;
    cave._name = naturalType;
    var caveDetails = naturalLib[naturalType];
    var level = types.indexOf(naturalType) + 1;
    cave._length = rollDice(level,10);
    cave._lootChance = 8;
    cave._wormChance = 100;
    cave._monsterChance = 20;
    cave._undeadChance = 50;
    cave._monsterTypes = ['filth ogre'];
    cave._complexity = level;
    cave._trapChance = clamp(10 - level,2,10);
    cave._extraChance = 20;
    cave._bookTypes = ['evil','empty','culture','guide','rumor'];
    cave._corpseChance = 20;
    Object.keys(caveDetails).map(function(key){
        cave[key] = caveDetails[key]
    });
    return cave;
}

function generateStructureCave(argsObj){
    var cave = generateBaseCave();
    argsObj = argsObj || {};
    var structureLib = {
        'lost library': {
            _lootChance: 1,
            _lootLocation: 'from among the mouldy tomes', 
            _pluralName: 'lost libraries', 
            _depths: 'some unseen chamber',
            _undeadTypes: ['phantasm','spectre','vampyre'],
            _undeadChance: 100,
            _monsterTypes: [],
            _findVerb: 'picks out',
            _bookTypes : ['empty','random','random'],
            _additionalAction: function(argObj,lines){
                subEventDiscovery({
                    findType: 'curiosity',
                    preamble: 'On one of the shelves, ',
                    verb: 'finds',
                },lines);
            }
        },
        'abandoned dungeon': {
            _lootLocation: 'in an ancient chest',
            _pluralName: 'abandoned dungeons', 
            _depths: 'a hidden oubliette',
            _tower: `a ${cave._stone} shaft`,
            _spiderChance: 20,
        },
        'complex': {
            _lootLocation: 'on a raised dais of unknown purpose', 
            _pluralName: 'complexes', 
            _depths: 'deep within the furthest corridors'
        },
        'labyrinth': {
            _lootLocation: 'in an alcove of the maze', 
            _pluralName: 'labyrinths', 
            _depths: 'deep within the maze',
            _additionalAction: function(argObj,lines){
                subEventOddFeature({preamble: 'In the center of the labyrinth, ', verb: 'discover', stone: cave._stone},lines);
            },
        },
    };
    var types = Object.keys(structureLib);
    var structureType = argsObj.structureType === undefined || types.indexOf(argsObj.structureType) < 0 ? shuffle([...types])[0] : argsObj.structureType;
    var level = types.indexOf(structureType) + 1;
    var structureDetails = structureLib[structureType];
    cave._name = structureType;
    cave._exitVerb = 'find our way out';
    cave._lootChance = 10;
    cave._length = rollDice(level+2,10);
    cave._complexity = clamp(level * level,1,10);
    cave._wormChance = 50;
    cave._spiderChance = 0;
    cave._trapChance = 3;
    cave._monsterTypes = Object.keys(trailGame.monsterClasses);
    cave._monsterChance = 20;
    cave._undeadTypes = Object.keys(trailGame.undeadClasses);
    cave._undeadChance = 20;
    cave._bookTypes = ['evil','empty','culture','non-fiction','engineering','turtle'],
    cave._trapTypes = ['fire','crusher','acid','spikes'];
    cave._corpseChance = 10;
    Object.keys(structureDetails).map(function(key){
        cave[key] = structureDetails[key];
    });
    if ( structureType === `complex` ){
        var metals = generateMetal(true);
        var complexMetal = cave._metal;
        level = metals.indexOf(complexMetal) + 1;
        cave._name = `complex of ${complexMetal} corridors`;
        cave._pluralName = `complexes of ${complexMetal} corridors`;
    } else if ( structureType === `labyrinth` ){
        var stones = generateStone(true);
        var labyrinthStone = cave._stone;
        level = stones.indexOf(labyrinthStone) + 1;
        cave._name = `labyrinth of ${labyrinthStone}`;
        cave._pluralName = `labyrinths of ${labyrinthStone}`;
    } else if ( structureType === `lost library` ){
        cave._lootTypes = ['book'];
    }
    return cave;
}

function generateHauntedCave(argsObj){
    var cave = generateBaseCave();
    argsObj = argsObj || {};
    var altVerb = shuffle(['explore','investigate','search'])[0];
    var ancientCultures = shuffle(generateAncientCulture(true));
    var mainCulture = argsObj.ancientCulture || ancientCultures[0];
    var altCulture = mainCulture === ancientCultures[1] ? ancientCultures[2] : ancientCultures[1];
    var hauntedLib = {
        "gothic castle":{
            _lootLocation: `in sarcophagus made of ${cave._stone}`,
            _tower: `a buttress of ${cave._stone} masonry`,
            _pluralName: 'gothic castles',
            _trapTypes: ['spikes','crusher'],
            _trapChance: 6,
            _lootChance: 4,
            _lootTypes: ['goods'],
            _length: rollDice(1),
            _complexity: 5,
            _verb: altVerb,
            _additionalChance: 4,
            _additionalAction: function (argObj,lines){
                subEventReadBook({bookType: 'evil', verb: 'is drawn to', location: `they find in ${indefiniteArticle(generateAbandonedDesc())} ${generateRoom()}`},lines);
            }
        },
        "abandoned hut":{
            _lootLocation: `among the ${generateAbandonedDesc()} odds and ends`,
            _tower: `into the creaking rafters`,
            _pluralName: 'abandoned huts',
            _trapTypes: ['spikes','fire'],
            _trapChance: 3,
            _lootTypes: ['animal','book','goods'],
            _length: 1,
            _verb: altVerb,
            _bookTypes : ['empty','rumor','evil','random'],
            _additionalAction: function(argObj,lines){
                subEventNewLeader({verb: 'come upon', description: ', lost in memories of a time long past', leaderMorale: rollDice(1,6)},lines);
            }
        },
        "dusty graveyard":{
            _lootLocation: `in an open grave`,
            _tower: `onto a mausoleum`,
            _pluralName: 'dusty graveyards',
            _trapTypes: ['spikes'],
            _trapChance: 6,
            _lootTypes: ['animal','book','goods'],
            _length: 2,
            _complexity: 5,
            _bookTypes : ['empty','rumor','evil'],
            _additionalChance: function(argsObj,lines){
                subEventBottomOfAPit({},lines);
            }
        },
        "forgotten crypt-tunnel":{
            _lootLocation: `under a tattered burial shroud`,
            _tower: `into a tunnel above us`,
            _pluralName: 'forgotten crypt-tunnels',
            _trapTypes: ['spikes','fire','crusher'],
            _trapChance: 6,
            _length: rollDice(3),
            _verb: altVerb,
            _bookTypes : ['empty','evil','culture'],
        },
        "barrow mound":{
            _lootLocation: `pushing up from the earth`,
            _tower: `into a trap door`,
            _pluralName: 'barrow mound',
            _trapTypes: ['suction','spikes'],
            _trapChance: 4,
            _lootChance: 4,
            _length: 2,
            _complexity: 5,
            _verb: altVerb,
            _bookTypes : ['empty','evil','culture'],
            _additionalChance: function(argsObj,lines){
                subEventBottomOfAPit({},lines);
            }
        },
        "ancient pyramid":{
            _lootLocation: `in an ornate burial chamber decorated in ${cave._metal}`,
            _tower: `a ${cave._metal} pillar`,
            _pluralName: 'ancient pyramids',
            _trapTypes: ['fire','spikes','crusher','acid'],
            _trapChance: 6,
            _length: rollDice(2),
            _complexity: 5,
            _verb: altVerb,
            _bookTypes : ['empty','rumor','evil','culture'],
            _additionalAction: function(argObj,lines){
                var gem = generateGem();
                lines.push(`${getRandomLeader()._name} discovers a ${cave._metal} statue of a ${generateCreature()} encrusted with ${pluralize(gem)} in a tomb carved with spiderous shapes.`);
                lines.push(`A feeling of doom washes over us all.`);
                addGoods(gem,rollDice(4));
                addSickness(true,'an ancient curse');
            }
        },
        "gaping black portal":{
            _lootLocation: `surrounded by crackling dark energy`,
            _tower: `into the portal itself`,
            _pluralName: 'gaping black portals',
            _trapTypes: ['suction'],
            _trapChance: 2,
            _lootTypes: ['animal','book','goods'],
            _length: 2,
            _verb: 'encounter',
            _bookTypes : ['rumor','evil','random'],
            _preposition: 'by',
            _additionalAction: function (argObj,lines){
                if(rollDice() < 17 ){
                    subEventOddFeature({preamble: 'Beyond the portal, ', verb: 'catch a glimpse of', feature: generateBadPlace()},lines);
                } else {
                    subEventNewLeader({verb: 'are taken by surprise by', description: ' emerging from beyond the portal', leaderMorale: rollDice(1,10)},lines);
                }
            }
        },
         "ancient battlefield":{
            _lootLocation: `tangled in the remains of a soldier from ${indefiniteArticle(mainCulture)}`,
            _tower: `${indefiniteArticle(cave._stone)} obelisk`,
            _pluralName: 'ancient battlefields',
            _trapTypes: ['spikes'],
            _trapChance: 6,
            _lootTypes: ['animal','book','goods'],
            _length: rollDice(1),
            _complexity: 5,
            _bookTypes : ['empty','rumor','culture','evil'],
            _additionalAction: function (argObj,lines){
                var remains = generateSoliderRemains(false,mainCulture);
                remains += (rollDice() > 10) ? ` and ${generateSoliderRemains(false,altCulture)}` : '';
                lines.push(`The ground is strewn with ${remains}.`);
            }
        },
        "desecrated temple":{
            _lootLocation: `among the ${generateAbandonedDesc()} ${sentenceForm(shuffle(cave._religion.objects),true)}`,
            _tower: `into ${indefiniteArticle(generateStaircaseDesc())} skylight`,
            _trapTypes: ['acid'],
            _trapChance: 10,
            _complexity: 5,
            _length: rollDice(1,10),
            _verb: altVerb,
            _additionalChance: 4,
            _bookTypes : ['empty','rumor','evil','cuture'],
            _additionalAction: function (argObj,lines){
                var object = cave._religion.canHaveImage ? 'statue' : 'altar';
                var verb = cave._religion.canHaveImage ? 'depicting' : 'for the worship of';
                var enemyReligion = generateReligion(false,shuffle(cave._religion.enemies)[0]);
                var zealots = cave._religion.enemies.length ? enemyReligion.followerPlural : 'unknown zealots';
                var leader = argObj.leader || getRandomLeader();
                if (rollDice() > 10){
                    var  addendums = [
                        `. Blood stains smear the ${cave._religion.material} walls.`,
                        `: the rotten remains of some ${generateFood()} sit on the table.`,
                        `... They must have cleared out in a hurry.`,
                        `. ${capitalizeFirstLetter(zealots)} have scrawled a message of hate on the ${cave._religion.material} walls.`
                    ];
                    lines.push(`The halls are still decorated for ${cave._religion.holiday}${shuffle(addendums)[0]}`);
                } else {
                    lines.push(`${leader._name} discovers ${indefiniteArticle(generateAbandonedDesc())} ${cave._religion.material} ${object} ${verb} ${cave._religion.god}.`);
                    var addendums = [
                        `it smells of death.`,
                        `it has been rubbed with filth and scrawled with obscene messages.`,
                        `a chisel has been indiscriminately used to deface it.`,
                        `${indefiniteArticle(generateStaircaseDesc())} crack splits it in half.`
                    ];
                    lines.push(`The ${object} has been vandalized by ${zealots}: ${shuffle(addendums)[0]}`);
                }
                var fellows = shuffle(getLeadersFavoringGod(cave._religion.god));
                if (fellows.length){
                    var verb = fellows.length > 1 ? 'are' : 'is';
                    var all = fellows.length > 2 ? ' all' : ' both';
                    lines.push(`${sentenceForm(getLeaderNames(fellows))} ${verb}${fellows.length > 1 ? all : ''} deeply saddened and disturbed to see a temple to ${cave._religion.god} so violated.`);
                    addSicknesses([[getLeaderIds(fellows),['nightmares']]]);
                    removeMorale(fellows.length);
                } else {
                    var spooked = rollDice() > 10 ? `A chill runs up ${leader._name}'s spine.` : `${leader._name} feels a dark aura descend on them.`;
                    lines.push(spooked);
                    addSickness(leader._id,'nightmares');
                }
            }
        }

    }
    var types = Object.keys(hauntedLib);
    var hauntedType = argsObj.hauntedType === undefined || types.indexOf(argsObj.hauntedType) < 0 ? shuffle([...types])[0] : argsObj.hauntedType;
    var hauntedDetails = hauntedLib[hauntedType];
    cave._name = hauntedType;
    cave._exitVerb = 'continue on';
    cave._spiderChance = 30;
    cave._wormChance = 0;
    cave._lootChance = 6;
    cave._undeadTypes = Object.keys(trailGame.undeadClasses);
    cave._undeadChance = 10;
    Object.keys(hauntedDetails).map(function(key){
        cave[key] = hauntedDetails[key];
    });
    return cave;
}

// trap functions

function generateTrap(trapName){
    trapName = trapName || shuffle([...Object.keys(trailGame.trapClasses)])[0];
    var trap = {...trailGame.trapClasses[trapName]};
    trap.trapName = trapName;
    return trap;
}

// loan functions

function generateLoan(argsObj){
    argsObj = argsObj || {};
    var level = argsObj.level || rollDice(1,15);
    var loan = {};
    var relation = argsObj.relation || shuffle(['Auntie ','Uncle ','Mama ','Papa ','Cousin ','Grandpa ','Grandma '])[0];
    if (argsObj.max !== undefined){
        level = Math.round(argsObj.max / (1000));
    }
    loan.max = argsObj.max || rollDice(2*level,10) * 100;
    loan.interest = 4 + level;
    loan.giver = argsObj.name || generateName({prefix: relation});
    return loan;
}

function signLoan(loan){
    loan = loan || generateLoan();
    var founder = trailGame.caravan.founder || generateLeader();
    trailGame.caravan.loan = {...loan};
    var message = `${founder._name} takes out a loan of up to ${loan.max} silver at ${loan.interest}% interest from their ${loan.giver}.`
    addToLedger(message);
    return message;
}

function initialPurchase(tradeObj){
    addTrade(tradeObj);
    var message = `${trailGame.caravan.founder._name} spends ${tradeObj.actualValue} of ${trailGame.caravan.loan.giver}'s silver to buy ${sentenceForm(scrubTradeObj(tradeObj))}.`
    trailGame.caravan.loan.actualValue = tradeObj.actualValue;
    addToLedger(message);
    return message;
}

// time functions

function addDays(days){
    trailGame.caravan.daysSinceLastMeal = days;
    trailGame.caravan.daysElapsed += days;
}

function addHours(hours){
    var days = Math.ceil(hours / 12)
    addDays(days);
}

// ledger functions

function addToLedger(key,value){
    if ( value === 0 ){
        return;
    }
    if ( typeof(key) === "string" && typeof(value) === "undefined"){
        value = key;
        key = Date.now() + rollDice(2,20) + rollDice(2,20)*1000;
        trailGame.ledger[key] = value;
    } else {
        var currentVal = ( typeof(trailGame.ledger[key]) === "undefined") ? 0 : trailGame.ledger[key];
        var newVal = currentVal + value;
        if( newVal !== 0 ){
            trailGame.ledger[key] = newVal;
        } else {
            delete trailGame.ledger[key];
        }
    }
}

function settleLedger(){
    var first = [];
    var second = [];
    Object.keys(trailGame.ledger).map(function(key, index) {
        var value = trailGame.ledger[key];
        var divider = " ";
        if(typeof(value) === "number"){
            divider = ": ";
            value = (value > 0) ? "+" + value : value;
            var title = toTitleCase(key);
            var lineItem = title + divider + value;
            second.push(lineItem);
        } else {
            var lineItem = value;
            first.push(lineItem);
        }
        delete trailGame.ledger[key];
    });
    var resultsObj = {lines: scrubLines(first), stats: scrubLines(second)};
    return resultsObj;
}

// text functions

function generateReligion(getAll,godName,getGods){
    var religionsByGod = trailGame.gods;
    var gods = Object.keys(religionsByGod);
    godName = godName || shuffle(gods)[0];
    var religion = religionsByGod[godName];
    religion.god = godName;
    if(getGods){
        return gods;
    } else if (getAll){
        var religionArray = [];
        gods.map(function(god){
            var thisReligion = religionsByGod[god];
            religion.god = god;
            religionArray.push(thisReligion);
        });
        return religionArray;
    } else {
        return religion;
    }
}

function generateGod(getAll){
    if(getAll){
        return generateReligion(false,undefined,true);
    } else {
        return generateReligion().god;
    }
}

function generateStone(getAll){
    var stones = [ 
        `granite`,
        `calcite`,
        `basalt`,
        `sandstone`,
        `marble`,
        `obisidian`,
        `salt`,
        `brimstone`
    ];
    return getAll === true ? stones : shuffle(stones).shift();
}

function generateLeviathan(getAll){
    var leviathans = ["magma kraken", "abyssal whale", "core worm", "tectonic dragon", "primordial beast", "star god", "mountain elemental"];
    return getAll === true ? leviathans : shuffle(leviathans).shift();
}

function generateMetal(getAll){
    var metals = ["lead", "bronze", "brass", "steel", "copper", "silver", "gold", "platinum"];
    return getAll === true ? metals : shuffle(metals).shift();
}

function generateMaterial(getAll){
    var materials = generateStone(true).concat(generateMetal(true));
    return getAll === true ? materials : shuffle(materials).shift();
}

function generateLiquidSicknessPair(getAll,liquidName,justLiquids){
    var liquids = {
        'black water': 'black stripe',
        'protoplasm': 'rune rash',
        'churning mist': 'spore fever',
        'filth': 'dysentery',
        'ice' : 'frostbite',
        'dark energy': 'rune rash',
        'saltwater': 'pneumonia',
        'fresh water': 'moth cough',
        'blood': 'demon flu',
    };

    function getPair(liquidName){
        liquidName = keys.indexOf(liquidName) !== -1 ? liquidName : shuffle(keys)[0];
        var sickness = liquids[liquidName];
        return [liquidName,sickness];
    }

    var keys = Object.keys(liquids);

    if (justLiquids){
        return keys
    } else if (getAll){
        var pairs = [];
        keys.map(function(liquidName){
            pairs.push(getPair(liquidName));
        });
        return pairs;
    } else {
        return getPair(liquidName);
    }
}

function generateLiquid(getAll){
    var liquids = generateLiquidSicknessPair(false,false,true);
    return getAll === true ? liquids : shuffle(liquids).shift();
}

function generateExclamation(getAll){
    var exclamations = [
        `Fortunes abound!`,
        `Good tidings!`,
        `Praise be!`,
        `Blessed be ${generateGod()}!`,
        `Thank ${generateGod()}!`,
        `By ${generateGod()}!`
    ];
    return getAll === true ? shuffle(exclamations) : shuffle(exclamations).shift();
}

function generateLandmark(){
    var locations = [`by the roadside`];
    for (var i = 6; i >= 0; i--) {
        var cave = generateCave();
        locations.push(`${cave._preposition} ${indefiniteArticle(cave._name)}`);
    }
    for (var i = 1; i >= 0; i--) {
        locations.push(`along the banks of ${indefiniteArticle(generateRiver().riverType)} river of ${generateRiver()._liquid}`);
        locations.push(`in the ${generateAbandonedDesc()} ${generateRoom()} of a ${generateStaircaseDesc()} ${generateStone()} ${shuffle(['castle','mansion','temple','tower'])[0]}`);
        locations.push(`outside ${indefiniteArticle(generateStaircaseDesc())} ${generateMaterial()} ${generateBuilding()}`);
    }
    locations.push(`in ${generateBadPlace()}`);
    locations.push(`in ${generateIdyll()}`);
    return shuffle(locations)[0];
}

function generateOasis(getAll){
    var places = [
        `natural hot spring`,
        `pocket of sweet air`,
        `lake of fresh water`,
        `floating orb of fresh water`,
    ];
    return getAll === true ? places : shuffle(places).shift();
}

function generateGame(getAll){
    var games = [
        [`Snake`, 'wits'],
        [`Snails and Ogres`, 'wits'],
        [`dice`, 'chance'],
        [`Krickle`, 'chance'],
        [`cards`, 'bravery'],
        [`Queen's Chalice`, 'bravery'],
        [`Magol's Court`, 'culture'],
        [`Rumors and Lies`, 'culture']
    ];
    return getAll === true ? games : shuffle(games).shift()[0];
}

function generatePrey(getAll){
    var prey = ["corpse-worm", "dusk moth", "eldritch larva", "rock mole", "fossil mite", "sweet grub", "singing trilobite", "snail","centipede larva","hallucinogenic beetle"];
    return getAll === true ? prey : shuffle(prey).shift();
}

function generateFood(getAll){
    var foods = ["thief tentacle soup", "barbecued zebraphant ribs", "king mushroom hash", "grub cake", "yeti heart", "fungaloid-sweet-fluid", "raging hot curry", "fried cave chicken", `scrambled ${generateTurtle().animalClass} eggs`];
    return getAll === true ? foods : shuffle(foods).shift();
}

function generateCuriosity(getAll){
    var place = rollDice() > 10 ? generateBadPlace() : generateIdyll();
    var oddities = [
        "a preserved tud larva", 
        "a bright blue variant of the yellow-spotted thief", 
        `an ancient precursor to the ${generatePrey()} trapped in amber`, 
        `a ring of ${generateMaterial()} through which can be seen ${place}`, 
        //`${generateFood()} prepared for an ancient queen which is as fresh as the night it was first prepared`,
        `a seashell that whispers prayers to ${generateGod()}`, 
        `${indefiniteArticle(generateMetal())} organ that emulates the human voice`
    ];
    return getAll === true ? oddities : shuffle(oddities).shift();
}

function generateOddFeature(getAll,argsObj){
    argsObj.leviathan = argsObj.leviathan || generateLeviathan();
    argsObj.metal = argsObj.metal || generateMetal();
    argsObj.stone = argsObj.stone || generateStone();
    argsObj.god = argsObj.god || generateGod();
    argsObj.liquid = argsObj.liquid || generateLiquid();
    argsObj.prey = argsObj.prey || generatePrey();
    var possibleFeatures = [
        "a pulsing fragment of the sun", 
        `the complete remains of ${indefiniteArticle(argsObj.leviathan)}, cradled against the earth`, 
        `a large, intricate ${argsObj.metal} machine crackling with eldritch energy`, 
        `an outcropping of ${argsObj.stone} carved in the perfect likeness of #religious_figure_image#`, 
        `a floating, toroidal flow of ${argsObj.liquid}`, 
        `an enormous, seething nest of ${pluralize(argsObj.prey)}`, 
        `a towering ${argsObj.stone} monolith`, 
        `a ${generateTowerDesc()} castle, teleported down from the surface world`, 
        `a massive skeleton sitting atop a throne of ${argsObj.metal}`, 
        `a vast alkaline field, littered with the bones of angels`, 
        `a massive, ${generateUndeadDesc()} face rising from a pool of ${argsObj.liquid}`, 
    ];
    return getAll === true ? possibleFeatures : shuffle(possibleFeatures)[0];
}

function generateHutDesc(getAll){
    var huts = ["mother-stone", "mushroom-cap", "wattle and daub", "surface-wood", "dilapidated", "gaily painted", "fungus log", "overgrown", "eccentric"];
    return getAll === true ? huts : shuffle(huts).shift();
}

function generateBuilding(getAll){
    var structures = ['dungeon','library','tower','bridge','gate','city','well','beacon','monastery','labyrinth','castle','pyramid','crypt','observatory'];
    return getAll === true ? structures : shuffle(structures).shift();
}

function generateAncientCulture(getAll){
    var ancients = ["the Mertocenian Empire", "the Fungaloid Precursors", "the Long-Fingered Ones", "the Arachnoid Pharoahs", "the Shrieking Chorus"];
    return getAll === true ? ancients : shuffle(ancients).shift();
}

function generateCulture(getAll,cultureName){
    var cultureNames = Object.keys(trailGame.cultures);
    if (cultureName === undefined){
        var max = getRandomInt(1,cultureNames.length);
        var index = rollDice(1,max) - 1;
        cultureName = rollDice(1,4) === 4 ? cultureNames[index] : shuffle(cultureNames)[0];
    }
    return getAll === true ? cultureNames : trailGame.cultures[cultureName];
}

function generateLanguage(getAll,culture){
    var languages = {
        'serpent cultist' : "serpent script",
        'demon' : "the demon cant",
        'fungaloid' : "fungaloid-external-encodation",
        'crab folk' : "crab dialect",
        'amazon' : 'Amazonian',
        'tud' : 'Tud',
        'the deep saints' : 'code',
        'the mertocenian empire' : 'ancient Mertocenian',
        'roshian' : 'Roshian',
        'the arachnoid pharoahs' : 'necromantic glyphs',
        'the fungaloid precursors' : "archaic-proto-fungaloid-external-encodation",
        'snout goblin' : 'goblin scratch'

    }
    var randomCulture = shuffle(Object.keys(languages))[0];
    culture = typeof(culture) === 'string' ? culture.toLowerCase() : randomCulture ;
    var thisLanguage = languages[culture] === undefined ? 'an unknown tongue' : languages[culture];
    return getAll === true ? Object.values(languages) : thisLanguage;
}

function generateSoliderRemains(getAll,culture){
    //"the withered forms of fungaloid precursors", "Mertocenian armor", "the distinctive skeletons of the long-fingered ones", "the exoskeletons of great arachnoids", "the serrated beaks of singing horrors"
    var remains = {
        'the mertocenian empire' : 'Mertocenian armor',
        'the arachnoid pharoahs' : 'the exoskeletons of great arachnoids',
        'the fungaloid precursors' : "the withered forms of fungaloid precursors",
        "the long-fingered ones" : "the distinctive skeletons of the long-fingered ones",
        "the shrieking chorus" : "the serrated beaks of singing horrors"
    }
    var randomCulture = shuffle(Object.keys(remains))[0];
    culture = typeof(culture) === 'string' ? culture.toLowerCase() : randomCulture ;
    var thisRemains = remains[culture] === undefined ? 'some strange, unrecognizable remains' : remains[culture];
    return getAll === true ? Object.values(remains) : thisRemains;
}

function generateKnowledge(getAll){
    var words = ["rites","rituals","secrets","knowledge","way","teachings","traditions","path","philosophy","guiding principles","worldview"];
    return getAll === true ? words : shuffle(words).shift();
}

function generateFieldOfStudy(getAll){
    var words = [`${generateAnimal().animalClass} husbandry`,`${generateGood().goodsType} craftsmanship`,`${generateLiquid()} ecology`,`philosophy`,`${generatePrey()} cultivation`,`${generateStone()} carving`,`${generateMetal()} smithing`];
    return getAll === true ? words : shuffle(words).shift();
}

function generateUndeadDesc(getAll){
    var undead = ["desperate","whispering","restless","bleeding","hollow-eyed","slavering","shrieking","blood-soaked","noxious","cannibal"];
    return getAll === true ? undead : shuffle(undead).shift();
}

function generateHistoricDesc(getAll){
    var descriptors = ["enduring","entertaining","stimulating","infamous","historical","beloved","legendary","mythical","fearsome","ruthless","immortal","apocryphal","forbidden","forgotten","magical"];
    return getAll === true ? descriptors : shuffle(descriptors).shift();
}

function generateEvilDesc(getAll){
    var descriptors = ['infernal','cannibalistic','nihilistic','eldritch','bloodthirsty','malevolent','flesh-hungry','barbaric','wicked','cruel','sadistic','possessed','tyrannical','unhinged','abominable','xenophobic'];
    return getAll === true ? descriptors : shuffle(descriptors).shift();
}

function generateBadPlace(getAll){
    var places = ["a hell of ice", "an infinity of writhing worms", "a trackless desert", "the time after time", "the court of Magol", "a lightless labyrinth covering the surface of a vast black sphere", "an airless mountaintop"];
    return getAll === true ? places : shuffle(places).shift();
}

function generateAttractiveTrait(getAll){
    // [trait, whether to indefinite article]
    var traits = [
        ["bold stride", true],
        ["piercing eyes", false], 
        ["statuesque body", true], 
        ["lustrous hair", false], 
        ["kind heart", true] ,
        ["raucous sense of humor", true], 
        ["poetic tongue", true], 
        ["sharp wit", true], 
        ["talented hands", false]
    ];
    return getAll === true ? traits : shuffle(traits).shift()[0];
}

function generateBodyPart(getAll){
    var leftRight = shuffle(['left','right'])[0];
    var bodyParts = [`back`,`face`,`${leftRight} forearm`,`${leftRight} leg`,`${leftRight} bicep`];
    return getAll === true ? bodyParts : shuffle(bodyParts).shift();
}

function generateIdyll(getAll){
    var places = ["an enchanted wood", "an endless scintillating grassland situated on the inner surface of a vast flying ring", "the glades of the sacred moon", "an orchard in a hidden valley", "mossy isles with high, sheltered cliffs"];
    return getAll === true ? places : shuffle(places).shift();
}

function generatePetDesc(getAll){
    var pets = ["well-groomed", "prize-winning", "well-fed", "sickly-looking", "hungry"];
    return getAll === true ? pets : shuffle(pets).shift();
}

function generateTowerDesc(getAll){
    var towers = ["spindly", "squat", "sunken", "horizontal", "leaning", "cracked", "crenelated", "hanging", "fallen", "hexagonal", "cylindrical", "rectangular", "spiral"];
    return getAll === true ? towers : shuffle(towers).shift();
}

function generateBeaconDesc(getAll){
    var beacons = ["flaming", "interplanar", "crystalline", "cranio-form", "musical", "humming", "electromagnetic"];
    return getAll === true ? beacons : shuffle(beacons).shift();
}

function generateStaircaseDesc(getAll){
    var stairs = ["massive", "worn", "uneven", "crumbling", "smooth", "narrow", "twisting", "spiraling", "slime-coated"];
    return getAll === true ? stairs : shuffle(stairs).shift();
}

function generateRunesDesc(getAll){
    var runes = ["glowing", "long-defaced", "moss covered", "cryptic", "indecipherable", "curling", "cursed", "holy"];
    return getAll === true ? runes : shuffle(runes).shift();
}

function generateAbandonedDesc(getAll){
    var adjectives = ["forgotten","dusty","cobweb-covered","eeriely well-preserved","mouldering","musty","barren","ransacked","dank","drafty","once-beautiful","forboding","ruined","scorched"];
    return getAll === true ? adjectives : shuffle(adjectives).shift();
}

function generateRoom(getAll){
    var rooms = ["ambulatory","vestibule","chamber","hallway","laboratory","ballroom","courtyard","bedchamber","parlor","garden","antechamber","balcony","chapel","library","mezzanine","parapet","alcove","keep","dining room","attic","crawlspace"];
    return getAll === true ? rooms : shuffle(rooms).shift();
}

function generateBookPrefix(getAll){
    var prefixes = ['Complete','Exhaustive','Introductory','Annotated','Illustrated'];
    return getAll === true ? prefixes : shuffle(prefixes).shift();
}

function generatePaintingDesc(getAll){
    var desc = ['beautiful','crude','intricate','detailed','lush','rudimentary'];
    return getAll === true ? desc : shuffle(desc).shift();
}

function generateRumor(rumorType){
    rumorType = rumorType && (typeof(rumorType) === "boolean") || rollDice() > 10 ? true : false;
    var surfaceLies = [
        "folks hopping about on one leg",
        "cannibals around every corner",
        "that it's completely lifeless",
        "nothing but purple jelly",
    ];
    var surfaceTruths = [
        `an animal called a "greyhound" that looks like a snout goblin running about on four legs`,
        `violent vortexes of water and electricty that will sweep you away`,
        'a terrible and cruel god known as "the sky"',
        `very little magic at all`
    ]
    var trueRumors = [
        `wizards have a currency based on rapidly guessing true names`,
        `tud tadpoles can eat their broodmates and grow to enormous sizes`,
        `the Deep Saints were actually con artists`,
        `puppeteer spiders are not spiders but necromancers whose heads have swollen into arachnoid shapes`,
        `a prysmatic worm can emit light invisible to the human eye`,
        `rogue tuds have left their colonies of their own free will`,
        `the crab folk are breeding their messiah back into existence`,
        `puppeteer spider zombies will continue to move for up to seven days after you cut their umbilicals`,
        `the Hanged One wanders the underworld, taking the guise of a mortal`,
        `if you journey to the surface world, you'll find ${shuffle(surfaceTruths)[0]}`,
        `"he calls, and the worms answer" ??? Whatever that means`,
        `Magol fears the Hanged One, as only the Hanged One can send him back to Hell`,
        `spiderwine is made by spiders, not from them`
    ];
    var falseRumors = [
        "serpent girls eat their mates",
        "there is a secret song that will end the world",
        "there is a special breed of red tud with teeth harder than diamond",
        `the Turtle Father lives on in the belly of ${indefiniteArticle(generateLeviathan())}`,
        "gorgons need to feed their hair",
        "carrots from the surface will sometimes grow deep enough to penetrate the caverns below",
        "prysmatic worms take your soul after they kill you",
        "prysmatic worms are corpse-worms that have been infected by magic",
        "the Purple Mask is none other than Magol himself",
        `if you journey to the surface world, you'll find ${shuffle(surfaceLies)[0]}`,
        "tuds do have eyes. In their mouths",
        "elves are real",
        "the fungaloids all emerge from single giant mushroom hidden deep within their territory"
    ];
    var rumor = rumorType === true ? shuffle(trueRumors)[0] : shuffle(falseRumors)[0];
    return {rumor: rumor, rumorType: rumorType}
}

function generateFoocubus(){
    return rollDice() > 10 ? 'incubus' : 'succubus';
}

function generateJokeSubject(jokeType){
    var validJokeTypes = ['tud','serpent','demon','fungaloid','wizard','misc'];
    jokeType = validJokeTypes.indexOf(jokeType) !== -1 ? jokeType : shuffle(validJokeTypes)[0];
    var jokeSubjects = {
        'tud' : [
            { punchline: "tuds eating their own young", offensive: true, race: 'Tud' }, 
            { punchline: "a tud following careless instructions to the letter", offensive: true, race: 'Tud'}, 
            { punchline: "a tud eating something disgusting", offensive: true, race: 'Tud' }, 
            { punchline: `a tud ${generateEntertainer()}`, offensive: true, race: 'Tud' }
        ],
        'serpent' : [
            { punchline: "an enlightened hydra buying a sweater", offensive: false },
            { punchline: "a high gorgon commissioning a portrait", offensive: false },
            { punchline: "a serpent cultist shedding their skin", offensive: false }
        ],
        'demon' : [
            { punchline: `${indefiniteArticle(generateFoocubus())} and ${indefiniteArticle(generatePachyderm().animalClass)}`, offensive: true, race: 'Demon' }, 
            { punchline: "a gassy sulfur imp", offensive: false }, 
            { punchline: "a grief elemental that runs a wedding chapel", offensive: false }
        ],
        'fungaloid' : [
            { punchline: "three bureaucratic fungaloids", offensive: false },
            { punchline: `a fungaloid "rescuing" a puppy`, offensive: true, race: 'Fungaloid' }, 
            { punchline: "fungaloids' odd swaying motions", offensive: true, race: 'Fungaloid' }, 
            { punchline: "a fungaloid who manages to become the savior of Ulm-Rosh through entirely selfish actions", offensive: false }
        ],
        'wizard' : [
            { punchline: `a wizard who summons ${indefiniteArticle(generateFoocubus())} to escort them to the ball`, offensive: true, race: 'Demon' }, 
            { punchline: "the volatility of the wizards' truename currency", offensive: false }
        ],
        'misc' : [
            { punchline: "a shop owned by a puppeteer spider", offensive: false }, 
            { punchline: "the strange customs of the surface world", offensive: false }, 
            { punchline: "ZOX attempting to perform the simplest of tasks", offensive: true, god: 'ZOX' }
        ],
    }
    return shuffle(jokeSubjects[jokeType])[0];
}

function generateBookTypeAndPreposition(getAll,bookType){
    var possibleBookTypes = {
        'memoir' : 'by',
        'biography' : 'of',
        'book of poems': 'by',
        'collection of essays': 'by',
        'political treatise': 'by',
        'autobiography' : 'of',
        'novel' : 'about',
        'fiction' : 'about',
        'stream of consciousness' : 'by',
        'epic poem': 'by',
        'textbook' : 'by',
        'grimoire' : 'by'
    }
    var bookType = possibleBookTypes[bookType] !== undefined ? bookType: shuffle(Object.keys(possibleBookTypes))[0];
    var preposition = possibleBookTypes[bookType] || 'by';
    return [bookType, preposition]
}

function generateScaryBookTypeAndPreposition(getAll,bookType){
    var possibleBookTypes = {
        'screed' : 'by',
        'incantation' : 'summoning',
        'manifesto': 'by',
        'book of hexes': 'by',
        'polemic': 'by',
        'work of propaganda' : 'praising',
        'alchemical workbook' : 'by',
        'work of loggrheic ravings' : 'from the mind of',
        'work of horrific fiction': 'by',
        'handbook of torture methods' : 'by',
        'record of bloodshed' : 'commited by'
    }
    var bookType = possibleBookTypes[bookType] !== undefined ? bookType: shuffle(Object.keys(possibleBookTypes))[0];
    var preposition = possibleBookTypes[bookType] || 'by';
    return [bookType, preposition]
}

function generateNumeral(min,max){
    min = (min !== undefined && min > 0) ? min : 1;
    max = max || 50;
    return romanNumeral(rollDice(1,max));
}

function generateVolumes(){
    var sides = shuffle([2,4,6,8,10,20,100,500])[0];
    var number = rollDice(1,6);
    var max = rollDice(number,sides);
    var numMax = romanNumeral(max);
    var numMin = generateNumeral(1,max);
    return [numMin,numMax];
}

function generateCreature(getMany){
    var creatures = shuffle([
        generateAnimal().animalClass,
        generateMonsters().monsterType,
        generatePrey(),
        generateLeviathan()
    ]);
    return getMany === true ? creatures : creatures.shift();
}

function generateSubjectMatter(argsObj){
    argsObj = argsObj || {};
    var cultureName = argsObj.culture === undefined ?  generateCulture().name : argsObj.culture.name;
    includeSicknesses = argsObj.includeSicknesses === false ? false : true;
    includeMaterials = argsObj.includeMaterials === false ? false : true;
    var subjects = [
        generateGood().goodsType,
        generateCreature(),
        argsObj.job || generateLeader()._title,
        cultureName,
    ];
    if (includeSicknesses){
        subjects.push(shuffle(trailGame.contractableSickneses)[0]);
    }
    if (includeMaterials){
        subjects = subjects.concat([
            generateLiquid(),
            generateStone(),
            generateMetal(),
        ]);
    }
    subjects = shuffle(subjects);
    return argsObj.getMany === true ? subjects : subjects.shift();
}

function generateInnDesc(argObj){
    argObj = argObj || {};
    var job = argObj.job || generateSubClass();
    var subjects = generateSubjectMatter({job: job, getMany:true, includeMaterials: false, includeSicknesses: false});
    var subjectA = subjects[0];
    var subjectB = subjects[1];
    var adjectives = generateAdjective(true);
    var maybeAdjectiveA = rollDice(1,4) === 4 ? '' : adjectives[0] + ' ';
    var maybeAdjectiveB = rollDice(1,4) === 4 ? '' : adjectives[1] + ' ';
    var maybeThe = rollDice(1,4) === 4 ? '' : 'The ';
    var maybePub = rollDice(1,5) !== 5 ? '' : ' ' + shuffle(['Pub','Inn','Tavern'])[0];
    var maybeSuperlative = maybePub === '' || rollDice(1,2) === 2 ? '' : ' ' + shuffle(['Cavern-Famous','Famous','Old-Fashioned','Historic','Legendary'])[0];
    var cultures = generateCulture(true);
    var food = argObj.food || rollDice(1,4) !== 4 ? generateFood() : `${cultures[0]}-${cultures[1]} Fusion`;
    var restaurant = shuffle(['Shack','Place','Hut','Joint','Stand','Restaurant'])[0];
    var name = argObj.name || generateName();
    var innNames = [
        `The ${maybeAdjectiveA}${subjectA}${maybePub}`,
        `The ${subjectA} & ${maybeThe}${maybeAdjectiveB}${subjectB}${maybePub}`,
        `${name}'s${maybeSuperlative}${maybePub}`,
    ]
    if (rollDice(1,3)===3){
        innNames.push(`${maybeAdjectiveA}${name}'s${maybeSuperlative} ${food} ${restaurant}`);
    }
    if (rollDice(1,6)===6){
        `${cultures[0]} Food Restaurant`;
    }
    var innName = argObj.innName || toTitleCase(shuffle(innNames)[0]);
    var gem = generateGood(generateGem(argObj.gem));
    var alcohol = generateGood(generateAlcohol(argObj.alcohol));
    var creature = argObj.creature || generateCreature();
    var equipment = argObj.equipment || generateEquipment();
    var game = argObj.game || generateGame();
    var drug = argObj.drug || generateDrug();
    var pet = argObj.pet || generatePet().animalClass;
    var shapes = [
        `${gem.cacheName} of ${pluralize(gem.goodsType)}`,
        `${alcohol.cacheName} of ${pluralize(alcohol.goodsType)}`,
        creature,
        equipment,
        `flagon`,
    ];
    var signDescriptions = [
        ` above the door`,
        ` in the shape of ${indefiniteArticle(shuffle(shapes)[0])}`,
        ``
    ];
    var signAdjective = rollDice(1,2) === 2 ? '' : ` ${generateHutDesc()}`;
    var sign = signAdjective === '' ? 'A sign' : `${capitalizeFirstLetter(indefiniteArticle(signAdjective))} sign`
    var description = `${sign}${shuffle(signDescriptions)[0]} reads: "${innName}."`;
    var jobOrAnimal = rollDice(1,2) === 2 ? job : creature;
    var anotherCreature = jobOrAnimal === creature ? `another ${creature}` : `${indefiniteArticle(creature)}`;
    var foodOrAlcohol = rollDice(1,2) === 2 ? food : alcohol.goodsType;
    var note = shuffle([
        `No ${toTitleCase(pluralize(generatePet().animalClass))} Allowed!`,
        `Open At All Hours.`,
        `We will be closed for ${generateReligion().holiday}.`,
        `Free ${toTitleCase(alcohol.goodsType)} Tomorrow`,
        `${toTitleCase(pluralize(job))} Welcome!`,
        `Try Our ${toTitleCase(foodOrAlcohol)}!`,
        `Home of the Original ${toTitleCase(food)}!`,
        `Breakfast Served All Hours.`,
        `Our ${pet} bites.`,
        `Best ${foodOrAlcohol} in the Caverns!`
    ])[0];
    var advertisement = shuffle([
        `a smiling ${jobOrAnimal} cooking and eating ${anotherCreature}`,
        `a ${jobOrAnimal} playing ${game}`,
        `a ${jobOrAnimal} drinking ${alcohol.goodsType}`,
        `a ${jobOrAnimal} imbiding in ${drug}`,
    ])[0];
    var addendum = shuffle([
        `A smaller sign below reads "${note}"`,
        `A small note on the door reads "${note}"`,
        `Letters painted on the door read "${note}"`,
        `A statue outside depicts ${advertisement}.`,
        `On the wall, there is ${indefiniteArticle(generatePaintingDesc())} ${rollDice() > 10 ? 'painting' : 'carving'} of ${advertisement}.`
    ])[0];
    description = rollDice() > 10 ? description : description + ' ' + addendum;
    return description;
}

function generateAdjective(getMany){
    var adjectives = shuffle([generateRunesDesc(),generateHistoricDesc(),generateMaterial()]);
    return getMany === true ? adjectives : adjectives.shift();
}

function generateNonFictionTitle(argObj){
    argObj = argObj || {};
    var subjectMatter = rollDice() >= 19 ? 'Ulm-Rosh' : toTitleCase(pluralize(generateSubjectMatter({culture: argObj.culture})));
    var titleOne = `${rollDice() > 5 ? "" : toTitleCase(generateHistoricDesc()) + " "}${toTitleCase(generateKnowledge())} of ${generateAncientCulture()}`;
    var titleTwo = `${toTitleCase(generateFieldOfStudy())} in ${generateAncientCulture()}${rollDice() > 2 ? "" : `, circa ${generateNumeral(2000,5000)}`}`;
    var titleThree = `${shuffle(['','Beginner ','Intermediate ','Advanced '])[0]}${shuffle(['','Exercizes in ','Case Studies in ','Explorations in '])[0]}${toTitleCase(generateFieldOfStudy())}`;
    var titleFourPrefix = shuffle(['',generateBookPrefix()+' ',generateBookPrefix()+' ',generateBookPrefix()+' '])[0];
    var titleFour = `${titleFourPrefix === '' ? '' : toTitleCase(indefiniteArticle(titleFourPrefix))}${shuffle(['History of ','Guide to ','Primer on ','Catalog of '])[0]}${subjectMatter}`;
    
    var possibleTitles = [titleOne,titleTwo,titleThree,titleFour];
    var title = shuffle(possibleTitles)[0];

    var volumesArr = generateVolumes();
    var suffixOne = `: Volume ${volumesArr[0]}${rollDice() > 5 ? "" : ` of ${volumesArr[1]}`}`;
    var suffixTwo = `, ${rollDice() > 4 ? "" : "Revised "}${ordinalSuffix(rollDice(2,10))} Edition`;

    title = rollDice() > 2 ? title : title + suffixTwo;
    title = rollDice() > 2 ? title : title + suffixOne;
    
    return title;
}

function generateGuideTitle(){
    var author = generateName();
    var possibleThings = [];
    possibleThings = possibleThings.concat(Object.keys(trailGame.monsterClasses));
    possibleThings = possibleThings.concat(generatePrey(true));
    possibleThings =  shuffle(possibleThings);
    possibleThings = possibleThings.map(function(thing,index){
        return toTitleCase(pluralize(thing));
    })
    things = shuffle(['',possibleThings[0],possibleThings[0],possibleThings[0] + ' and ' + possibleThings[1]]);
    var subject = things[0];
    var useLocation = (subject === '' || rollDice() < 5);
    subject = (useLocation && subject !== '') ? 'the ' + subject + ' of ' : subject;
    var locationName = (subject === '' && rollDice() < 10 ? '' : 'the ' ) + toTitleCase(generateCave()._pluralName);
    var bookWord = shuffle(['Field Guide to ','Guide to ','Almanac of ','Compendium of ','Enyclopedia of '])[0];
    var prefixOne = shuffle([`${generateName()}'s `,'The ',`The ${generateBookPrefix()} `,''])[0];
    var titleOne = `${prefixOne}${bookWord}${subject}${useLocation ? locationName : ''}`;
    titleOne = prefixOne === '' ? capitalizeFirstLetter(indefiniteArticle(titleOne)) : titleOne;

    var possibleTitles = [titleOne];

    return shuffle(possibleTitles)[0];
}

function generateEngineeringTitle(){
    var structures = generateBuilding(true);
    var trap = toTitleCase(shuffle(Object.keys(trailGame.trapClasses))[0])+' Trap';
    var allPossibilities = [];
    structures.map(function(structure,index){
        allPossibilities.push(generateMaterial() + ' ' + structure);
    })
    allPossibilities.push(trap);
    var subject = shuffle(allPossibilities)[0]
    var concept = shuffle(['','Design Patterns ','Best Practices ','Core Concepts ','Systems Architecture '])[0];
    var prefix = shuffle(['','Practical ','Essential ', 'Fundamentals of ','Managing ','Teaching ','Learning ',`${toTitleCase(indefiniteArticle(generateBookPrefix()))} Guide to `])[0];
    var suffixes = shuffle(['',' Design',' Construction',' Engineering',' Maintenance']);
    var possibleFlavor = shuffle(['Asynchronous','Decentralized','Modern','Postmodern','Public-facing','Meditative','Enterprise'])[0];
    var flavor = rollDice() > 10 ? '' : possibleFlavor + ' ';
    var suffix = (prefix === '' && concept === '' && suffixes[0] === '') ? suffixes[1] : suffixes[0];

    var titleOne = `${prefix}${concept}${concept === '' ? '' : 'in '}${flavor}${suffix === '' ? toTitleCase(pluralize(subject)) : toTitleCase(subject) + suffix}`;
    return titleOne;
}

function generateYATitle(){
    var hero = generateName();
    var franchise = shuffle([
        `${hero}`,
        `Junior ${toTitleCase(generateLeader()._title)}`,
        `${toTitleCase(generateAnimal().animalClass)} Siblings`,
        `${toTitleCase(generateLiquid())} Saga`,
        `Teen ${toTitleCase(generateMonsters().monsterType)}`,
        `${toTitleCase(generateMaterial())} ${toTitleCase(pluralize(generateLeader()._title))}`
    ])[0];
    var creature = generateCreature();
    var adjectives = generateAdjective(true);
    var adjective = adjectives[0];
    var macguffin = shuffle([creature, generateBuilding()])[0];
    var mysterious = shuffle(['Mysterious ','Strange ','Puzzling ','Perplexing '])[0];
    var book = shuffle(['Mystery','Chronicle','Adventure'])[0];
    var caseOf = `${rollDice() > 10 ? '' : mysterious }Case of the `;
    var suffix = shuffle([`${toTitleCase(indefiniteArticle(franchise))} ${book}`,`Book ${rollDice(1,50)} of the ${franchise} ${toTitleCase(pluralize(book))}`])[0];

    var titleOne = `${rollDice() > 5 ? hero + ' and ' : ''}the ${rollDice() > 5 ? caseOf : ''}${toTitleCase(adjective + ' ' + macguffin)}`;
    var titleTwo = `Dear ${generateGod()}, it's me, ${hero}`;
    var titleThree = `${shuffle(['','My ',`${hero}'s `,'Our '])[0]}${shuffle([toTitleCase(adjectives[0]) + ' ',''])[0]}Life ${shuffle([`As A ${toTitleCase(creature)}`,`Among ${generateAncientCulture()}`])[0]}`;
    var titleFour = `${hero} and the ${toTitleCase(adjectives[0])}, ${toTitleCase(adjectives[1])}, ${toTitleCase(adjectives[2])} ${toTitleCase(macguffin)}`

    var bookTitle = shuffle([titleOne,titleOne,titleOne,titleOne,titleTwo,titleThree,titleFour])[0];
    bookTitle += (rollDice() > 5 ) ? ': ' + suffix : '';

    return bookTitle;
}

function generateGamebookTitle(){
    var author = generateName();
    var game = toTitleCase(generateGame());
    var variations = (10*rollDice(1,20)-getRandomInt(-1,1));
    var possibleAdjectives = generateBookPrefix(true).concat('Big');
    var adjective = shuffle(possibleAdjectives)[0];
    var possibleTitles = [
        `${author}'s ${adjective} Book of ${game}`,
        `${author} on ${game}`,
        `${game} for Dummies`,
        `${variations} Variations of ${game}`,
        `${game}: a Strategy Guide`,
        `The ${adjective} Guide to ${game}`,
        `${game}: ${indefiniteArticle(adjective)} Reference`,
        `The ${game} Player's Handbook`
    ];
    var title = shuffle(possibleTitles)[0];
    return title;
}

function generateSelfHelpTitle(argObj){
    argObj = argObj || {};
    var possibleSubjects = [];
    generateSubjectMatter({getMany: true, culture: argObj.culture}).map(function(subject,index){
        possibleSubjects.push( pluralize(subject) );
    });
    possibleSubjects.push(generateGod());
    var subject = toTitleCase(possibleSubjects[0]);
    var coolThing = shuffle([toTitleCase(generateLeviathan()),toTitleCase(generateLeader()._title)])[0];
    var dependents = [];
    shuffle([generateLeader()._title,generateAnimal().animalClass]).map(function(dependent,index){
        dependents.push(toTitleCase(pluralize(dependent)));
    });
    var niceNum = (10*rollDice(1,20)-getRandomInt(-1,1));
    var copies = numberWithCommas(rollDice() * (Math.pow(10,(rollDice(2,5) - 1))));
    var job = generateLeader()._title;

    var possibleTitles = [
        `How to Talk to Your ${dependents[0]} About ${subject}`,
        `Awake the ${toTitleCase(generateLeviathan())} Within`,
        `The ${niceNum} Habits of ${toTitleCase(generateHistoricDesc())} ${toTitleCase(pluralize(job))}`,
        `${niceNum} ${shuffle(['Facts About','Strategies For','Practical Tips On'])[0]} ${subject}`,
        `${shuffle([`Birthing`,`Self-Actualizing`,`Realizing`])[0]} Your Inner ${coolThing}`,
        `${toTitleCase(generateKnowledge())} of the ${shuffle([coolThing,dependents[0]])[0]}`,
        `The Last Book on ${subject} You'll Ever Need`
    ];
    if (argObj.originalIndex !== undefined){
        possibleTitles.splice(argObj.originalIndex, 1)
    }
    var titleIndex = getRandomInt(0,possibleTitles.length - 1);
    var bookTitle = possibleTitles[titleIndex];

    var possibleSuffixes = [
        `: Revised Edition for ${generateNumeral(1000,5000)}`,
        ` - ${copies} Copies Sold!`,
        `: The Classic ${shuffle(['',toTitleCase(generateAdjective())+' '])[0]}Book for ${dependents[1]}`
    ];
    if (!argObj.singleTitle){
        possibleSuffixes.push(': ' + generateSelfHelpTitle({singleTitle: true, originalIndex: titleIndex}))
    }
    bookTitle += (rollDice() < 15) ? '' : shuffle(possibleSuffixes)[0];
    return bookTitle;
}

function generateSeriousNovelTitle(argObj){
    argObj = argObj || {};
    var manyThings = generateSubjectMatter({getMany: true, culture: argObj.culture});
    var objectOne = manyThings[0];
    var objectTwo = manyThings[1];

    var titleOnePrefix = shuffle(['Of ','Children of ','The Years of ','A Song of ','A Tale of ','The House of ',''])[0];
    var bookTitleOne = `${titleOnePrefix}${toTitleCase(pluralize(objectOne))}`;
    bookTitleOne = ((titleOnePrefix === '' || titleOnePrefix === 'Of ') || rollDice() >= 7) ? bookTitleOne + ` and ${toTitleCase(pluralize(objectTwo))}` : bookTitleOne;

    var bookTitleTwo = `The ${toTitleCase(objectOne)}`
    bookTitleTwo = rollDice() >= 10 ? bookTitleTwo : bookTitleTwo + ` and The ${toTitleCase(objectTwo)}`;

    var titleThreePrefix = rollDice > 10 ? 'The ' : '';
    var bookTitleThree = titleThreePrefix === '' ? `${toTitleCase(indefiniteArticle(objectOne))}` : titleThreePrefix + toTitleCase(objectOne);
    var specialThing = `${generateRunesDesc()} ${rollDice(1,2) == 1 ? generateStone() : generateMetal()}`;
    var cultureName = argObj.culture === undefined ?  generateCulture().name : argObj.culture.name;
    var limitedObject = shuffle([
        'The ' + pluralize(generateAnimal().animalClass),
        'The ' + pluralize(generateLeader()._title),
        generateLiquid(),
        generateStone(),
        generateMetal(),
        'The ' + pluralize( cultureName ),
        specialThing,
        'Ulm-Rosh'
    ])[0];
    bookTitleThree += ` of ${toTitleCase(limitedObject)}`;

    var titleFourSuffix = shuffle([` of the ${toTitleCase(pluralize(shuffle([generateAnimal().animalClass,generateCulture().name])[0]))}`,` the ${toTitleCase(generateHistoricDesc())}`,` the ${toTitleCase(generateLeader()._title)}`])[0]
    var bookTitleFour = `${generateName()}${titleFourSuffix}`;

    var bookTitle = shuffle([bookTitleOne,bookTitleTwo,bookTitleThree,bookTitleFour])[0];

    var diceOne = rollDice();
    var subTitle = "";
    if (diceOne === 20){
        subTitle = `; or, ${generateSeriousNovelTitle()}`
    } else if ( diceOne >= 10 ){
        var novelType = generateBookTypeAndPreposition()[0];
        novelType = rollDice() < 5 ? `${indefiniteArticle(toTitleCase(generateHistoricDesc()))} ${toTitleCase(novelType)}` : indefiniteArticle(toTitleCase(novelType));
        novelType = rollDice() < 2 ? `${novelType} Told in ${shuffle(['Two','Three','Four','Five','Six','Seven','Eight','Nine'])[0]} Parts` : novelType;
        subTitle = `: ${novelType}`;
    }
    bookTitle += !argObj.singleTitle ? subTitle : "";
    return bookTitle;
}

function generateRomanceTitle(argObj){
    argObj = argObj || {};
    var romance = shuffle(['Passion','Romance','Love','A Night'])[0];
    var modifiedRomance = romance === 'A Night' ? 'For A Night' : romance;
    var job1 = toTitleCase(generateLeader()._title);
    var job2 = toTitleCase(generateLeader()._title);
    var inAnimate = generateGood();
    var taboo = shuffle([generateCreature(),`living ${inAnimate.cacheName} of ${pluralize(inAnimate.goodsType)}`])[0];
    var myTaboo = `My ${rollDice() < 17 ? '' : generateHistoricDesc()+' '}${taboo}`;
    var sexy = shuffle(['Hot ','Sexy ','Nubile ','Muscled ','Oiled ',''])[0];
    var desire = shuffle([indefiniteArticle(`${sexy}${job2}`),'a Rogue Tud',myTaboo,pluralize(job2),indefiniteArticle(generateCulture().name)])[0];
    var place = toTitleCase(generateLandmark());
    var explicitPastTense = shuffle(['Pounded','Sexed','Seduced','Taken', 'Ravaged', 'Impregnated'])[0];
    var parent = shuffle(['Dads','Moms','Daddy','Mommy'])[0];
    var hot = shuffle(["I'm Gay",'Hot', 'Hungry','Thirsty'])[0];
    var company = `${rollDice() < 15 ? '' : toTitleCase(generateAdjective()) + ' '}${toTitleCase(generateSubjectMatter({includeSicknesses: false}))}`;
    var possibleTitles = [
        `${romance} ${place}`,
        `${toTitleCase(indefiniteArticle(job1))}'s ${job2}`,
        `${toTitleCase(indefiniteArticle(job1))} for ${generateName()}`,
        `${toTitleCase(generateHistoricDesc())} ${modifiedRomance}`,
        `Confessions of ${toTitleCase(desire)}`,
        `${rollDice() > 10 ? '' : hot + ' and '}${explicitPastTense}!`,
        `All it Takes is ${romance}`,
        `${hot} for ${toTitleCase(desire)}`,
        `${explicitPastTense} ${rollDice() > 10 ? '': place + ' '}by ${toTitleCase(desire)}`,
        `${sexy}${job1} ${parent}`,
        `The Erotic Adventures of ${toTitleCase(desire)}`
    ];
    if (argObj.originalIndex !== undefined){
        possibleTitles.splice(argObj.originalIndex, 1);
    }
    var titleIndex = getRandomInt(0,possibleTitles.length - 1);
    var bookTitle = possibleTitles[titleIndex];
    var possibleSuffixes = [
        `: ${toTitleCase(indefiniteArticle(company))} Romance${rollDice() < 15 ? '' : `, Book ${rollDice(1,30)}`}`,
    ];
    if (!argObj.singleTitle){
        possibleSuffixes.push(` - By ${generateName()}, Author of '${generateRomanceTitle({singleTitle: true, originalIndex: titleIndex})}'`);
    }
    bookTitle += (rollDice() < 15 || argObj.singleTitle) ? '' : shuffle(possibleSuffixes)[0];
    return bookTitle;
}

function generateBiographyDesc(argObj){
    argObj = argObj || {};
    var titleOptions = {singleTitle: true, culture: argObj.culture};
    var bookTitle = argObj.bookTitle || (rollDice() !== 20 ? generateSeriousNovelTitle(titleOptions) : generateRomanceTitle(titleOptions));
    var typeAndPrep = argObj.typeAndPrep || generateBookTypeAndPreposition(argObj.bookType);
    var bookType = typeAndPrep[0];
    var preposition = typeAndPrep[1];
    var person = generateLeader();
    var adjective = argObj.adjective || generateHistoricDesc();
    var jobTitle = `${indefiniteArticle(adjective)} ${person._raceName} ${person._title}`;
    var desc = `"${bookTitle}," ${indefiniteArticle(bookType)} ${preposition} ${person._name}, ${jobTitle}.`
    return desc;
}

function generateTurtleBookDesc(argObj){
    argObj = argObj || {};
    var adjectives = generatePaintingDesc(true);
    var adjective = rollDice(1,2) === 2 ? '' : shuffle(adjectives)[0] + ' ';
    var drawings = shuffle(['sketches','drawings','paintings','illustrations','etchings'])[0];
    var allTurtles = [...trailGame.turtles];
    var startIndex = getRandomInt(0,allTurtles.length - 1);
    var turtles = [];
    for (var i = rollDice(1,4); i >= 0; i--) {
        var turtle = allTurtles[startIndex + i];
        if (turtle !== undefined){
            turtles.push(pluralize(turtle));
        }
    }
    var verb = shuffle(['contains','is filled with','is a catalog of','has page after page of'])[0];
    var many = shuffle(['a great variety of','many different','various rare and uncommon','the most common'])[0];
    var turtlePhrase = turtles.length >= 4 ? `${many} turtles` : sentenceForm(shuffle(turtles));
    var desc = `it ${verb} ${adjective}${drawings} of ${turtlePhrase}.`;
    return desc;
}

function generateEvilBiographyDesc(argObj){
    argObj = argObj || {};
    argObj.typeAndPrep = argObj.typeAndPrep || generateScaryBookTypeAndPreposition(argObj.bookType);
    argObj.adjective = argObj.adjective || generateEvilDesc();
    return generateBiographyDesc(argObj);
}

function generateEmptyBookDesc(){
    var culture = generateAncientCulture();
    var possibleDescriptions = [
        `The cover is bound in red leather, still vibrant.`,
        `It is dog-eared and worn.`,
        `"${generateBookTitle()}."`,
        `A massive, yellowed tome.`,
        `Some sort of ancient grimoire.`,
        `The diary of a traveler long-gone.`,
        `An archaic text from ${generateAncientCulture()}!`,
        `Its cover is engraved with ${generateHistoricDesc()} figures.`,
        `A handwritten manuscript apparently on ${generateFieldOfStudy()}.`

    ];
    var possibleConnectors = [
        `A shame that`,
        `However,`,
        `Disappointingly,`,
        `Unfortunately,`,
        `While intruging,`
    ]
    var possibleProblems = [
        `the pages were torn out by vandals...`,
        `mold has converted the pages into a solid brick...`,
        `it is completely blank??`,
        `it is filled from front to cover with the word for 'turtle' in ${generateLanguage(false,culture)}.`,
        `it disintegrates into dust at the slightest touch.`,
        `moisture long ago destroyed the text within.`,
        `a previous reader has drawn obscene illustrations all over it.`,
        `the interior has been eaten away by ${pluralize(generatePrey())}...`,
        `not much it remains after being chewed on by ${indefiniteArticle(generateAnimal().animalClass)}.`
    ]
    var description = `${shuffle(possibleDescriptions)[0]} ${shuffle(possibleConnectors)[0]} ${shuffle(possibleProblems)[0]}`;
    return description;
}

function generateEvilBookDesc(argObj){
    argObj = argObj || {};
    var typeAndPrep = argObj.typeAndPrep || generateScaryBookTypeAndPreposition();
    var author = argObj.author || generateName();
    var job = argObj.job || generateLeader()._title;
    var adjectives = shuffle(generateEvilDesc(true));
    var bookAdjective = argObj.bookAdjective || adjectives[0];
    var authorAdjective = argObj.authorAdjective || adjectives[1];
    authorAdjective = typeAndPrep[0] === 'incantation' ? 'banished, ' + authorAdjective : authorAdjective;
    var basics = `${capitalizeFirstLetter(indefiniteArticle(bookAdjective))} ${typeAndPrep[0]}`;
    var byline = `${typeAndPrep[1]} ${author}, ${indefiniteArticle(authorAdjective)} ${job}`
    var possibleSuffixes = shuffle([
        `is bound in human skin`,
        `is engraved with ${adjectives[2]}, ${generateRunesDesc()} runes`,
        `is festooned with a variety of teeth`,
        `bursts into flames upon opening`,
        `reeks of death`,
        `has a dark, festering aura`,
        `causes the reader to immediately forget its contents`,
        `is written in ${generateCreature()} blood`,
        `bears an inscription of "DO NOT OPEN" in ${generateLanguage()}`,
        `springs to life and bites ${getRandomLeader()._name}`
    ]);
    var useByline = rollDice() > 13;
    var suffix = useByline ? byline :`that ${possibleSuffixes[0]}`;
    var desc = rollDice() > 10 ? `It ${possibleSuffixes[0]}` : `${basics} ${suffix}`;
    desc += rollDice() < 17 || useByline ? '...' : `, and ${possibleSuffixes[1]}.`;
    return desc;
}

function generatePuzzleBookDesc(argObj){
    argObj = argObj || {};
    var place = argObj.place || generateBuilding();
    var hogwash = argObj.hogwash || shuffle(["power","truth","perception","reality","life","happiness"])[0];
    var knowledge = argObj.knowledge || generateKnowledge();
    var culture = argObj.culture || generateAncientCulture();
    var desc1 = `"The ${toTitleCase(place)} of ${toTitleCase(hogwash)}: ${toTitleCase(knowledge)} of ${culture}." It's written in ${generateLanguage(false,culture)}`;
    var desc2 = `${indefiniteArticle(generateStone())} tablet etched in ${generateRunesDesc()} runes`;
    var final = rollDice() > 10 ? desc1 : desc2;
    return final;
}

function generateFungaloidTitle(){
    var prefix = rollDice() > 10 ? "" : generateHistoricDesc() + ' ';
    var possibleSubjects = generateSubjectMatter({getMany: true});
    var subject = possibleSubjects[0] === 'Fungaloid' ? possibleSubjects[1] : possibleSubjects[0];
    var possibleSuffixes = ['meditations','histories','protocols','narratives','interactions','conflicts'];
    var suffix = shuffle(possibleSuffixes)[0];
    var title = spacesToDashes(toTitleCase(`${prefix}Fungaloid ${subject} ${suffix}`));
    return title;
}

function generateFungaloidBookDesc(){
    var volume = `Volume ${generateNumeral(1,2000)}`;
    var dateOne = generateNumeral(1,1000);
    var dateTwo = generateNumeral(dateOne,2000);
    var circa = `circa ${dateOne}-${dateTwo}`;
    var adjective = toTitleCase(generateHistoricDesc());
    var possibleDescriptions = [
        `"Fungaloid-Obsolete-Legal-Code, ${volume}"`,
        `"Fungaloid-Hegemonic-Parlimentary-Procedure, ${circa}"`,
        `"Harmonic-Fungaloid-Drone-Sonnets, ${volume}"`,
        `"Competetive-Fungaloid-Quadruped-Husbandry-Standards, ${circa}"`,
        `"Fungaloid-Taxonomic-Distinctions, ${volume}"`,
        `"${adjective}-Fungaloid-Nourishment-Methods, ${circa}"`,
        `"${adjective}-Fungaloid-Narratives, ${volume}"`,
        `"Non-Fungaloid-Cultural-Guidance, ${volume}"`,
        `"Fungaloid-Militia-Tactics, ${circa}"`,
    ];
    var desc = rollDice() > 10 ? shuffle(possibleDescriptions)[0] : generateBiographyDesc({bookTitle: generateFungaloidTitle(),culture: 'Fungaloid'});
    return desc;
}

function generateBookTitle(){
    var possibleTitles = [
        generateSeriousNovelTitle(),
        generateNonFictionTitle(),
        generateGuideTitle(),
        generateEngineeringTitle(),
        generateYATitle(),
        generateSelfHelpTitle(),
        generateRomanceTitle()
    ];
    return shuffle(possibleTitles)[0];
}

function generateBookLine(){
    var possibleBooks = [
        generateSeriousNovelTitle(),
        generateNonFictionTitle(),
        generateGuideTitle(),
        generateEngineeringTitle(),
        generateYATitle(),
        generateSelfHelpTitle(),
        generateRomanceTitle(),
        generateEvilBookDesc(),
        generateEvilBiographyDesc(),
        generateFungaloidBookDesc(),
        generateBiographyDesc(),
        generateEmptyBookDesc(),
        generateTurtleBookDesc(),
        generatePuzzleBookDesc(),
    ];
    return shuffle(possibleBooks)[0];
}

// event helpers

function scrubLines(lines){
    var newLines = [];
    for (var i = 0; i <= lines.length - 1; i++) {
        if(lines[i] !== ""){
            newLines.push(lines[i]);
        }
    }
    return newLines;
}

function dayPhase(eventFunc,argsObj){
    var lines = [];
    if (trailGame.lostGame){
        eventFunc = eventGameOver;
    }
    var events = eventFunc(argsObj);
    var updates = settleLedger();
    linesObj = {events: scrubLines(events), ledgerLines: updates.lines, ledgerStats: updates.stats}
    return linesObj;
}

function nightPhase(){
    if (trailGame.lostGame){
        return;
    }
    var linesObj = { events: [], ledgerLines: [], ledgerStats: []}
    var looseEnds = settleLedger();
    linesObj.ledgerLines = looseEnds.lines;
    linesObj.ledgerStats = looseEnds.stats;
    linesObj.events = healthUpdate().lines;
    if ( Object.keys(trailGame.leaders).length <= 0){
        trailGame.lostGame = true;
        return linesObj;
    }
    var dinnerObj = dinnerTime();
    linesObj.events = linesObj.events.concat(dinnerObj.events);
    linesObj.ledgerLines = linesObj.ledgerLines.concat(dinnerObj.ledgerLines);
    linesObj.ledgerStats = linesObj.ledgerStats.concat(dinnerObj.ledgerStats);

    return linesObj;
}

// subEvents

function subEventWoundLeader(argsObj,lines){
    argsObj = argsObj || {};
    var leaderId = argsObj.leaderId || getRandomLeader()._id; // also accepts leaderObj now
    var sicknessName = argsObj.sicknessName || 'battle wounds';
    var verbPastTense = argsObj.verbPastTense || 'wounded';
    var min = argsObj.min || 1;
    var max = argsObj.max || 1;
    var amount = getRandomInt(min,max);
    var leader = argsObj.leader || trailGame.leaders[leaderId];
    var howBad = Math.round( 0.3 * amount );
    var descriptors = ['lightly','moderately','seriously','gravely'];
    removeHealth(amount,amount,leaderId,sicknessName);
    var adverb = leader._health === 0 ? 'mortally' : descriptors[howBad];
    lines.push(`${leader._name} is ${adverb} ${verbPastTense}...`);
    if ( howBad >= 2){
        addSickness(leaderId,sicknessName);
    }
}

function subEventDiscovery(argsObj,lines){
    argsObj = argsObj || {};
    argsObj.leader = argsObj.leader || getRandomLeader();
    argsObj.verb = argsObj.verb || 'discovers';
    argsObj.preamble = argsObj.preamble === undefined ? generateExclamation() + ' ' : argsObj.preamble;
    var discoveryLine = `${argsObj.preamble}${argsObj.leader._name} ${argsObj.verb} `;
    var options = ['animal','goods','oasis','book','curiosity'];
    argsObj.findType = argsObj.findType || shuffle(options).shift();
    argsObj.location = argsObj.location === undefined ? generateLandmark() : argsObj.location;
    var addendums = [];
    var addAddendum = false;
    switch (argsObj.findType){
        case 'animal':
            var animal = {};
            if ( argsObj.animalClass === undefined){
                animal = getRandomInt(0,1) === 1 ? generatePet() : generatePachyderm();
            } else {
                animal = generateAnimal(argsObj.animalClass);
            }
            addAnimals(animal.animalClass,1);
            discoveryLine += `a lost ${animal.animalClass} ${argsObj.location}.`;
            addAddendum = (getRandomInt(0,3) === 3);
            addendums = [
                `There is some disagreement as to who will keep it.`
            ];
            if (Object.keys(trailGame.leaders).length > 1){
                addendums.concat([
                    `${getRandomLeader(argsObj.leader._id)._name} decides to adopt it.`,
                    `It doesn't seem to care for ${getRandomLeader(argsObj.leader._id)._name}, however.`
                ]);
            }
            lines.push(discoveryLine);
        break;
        case 'goods':
             var good = generateGood(argsObj.goodsType);
             var diceNum = clamp(20 - good.sell,1,20);
             addGoods(good.goodsType,rollDice(diceNum));
             addMorale(1);
             discoveryLine += `${indefiniteArticle(good.cacheName)} of ${pluralize(good.goodsType)} ${argsObj.location}.`;
             lines.push(discoveryLine);
        break;
        case 'book':
            subEventReadBook(argsObj,lines);
        break;
        case 'curiosity':
            argsObj.curiosity = argsObj.curiosity || generateCuriosity() + '.';
            discoveryLine += argsObj.curiosity;
            lines.push(discoveryLine);
            addMorale(rollDice(1,3));
            addAddendum = true;
            addendums = [
                `The strange beauty of this find gives us comfort.`,
                `We marvel at this rare curiosity...`,
                `${argsObj.leader._name} is very proud of their find.`,
                `${getRandomLeader(argsObj.leader._id)._name} is completely fascinated by this find.`
            ];
        break;
        case 'oasis':
            discoveryLine += indefiniteArticle(generateOasis()) +'.';
            addMorale(rollDice(1,3));
            addFood(Object.keys(trailGame.leaders).length);
            lines.push(discoveryLine);
        break;
    }
    if (addAddendum){
        lines.push(shuffle(addendums)[0]);
    }
};

function subEventOddFeature(argsObj,lines){
    argsObj = argsObj || {};
    argsObj.leader = argsObj.leader || getRandomLeader();
    argsObj.verb = argsObj.verb || 'encounter';
    argsObj.feature = argsObj.feature || generateOddFeature(false,argsObj);
    argsObj.preamble = argsObj.preamble || '';
    var we = argsObj.preamble === '' ? 'We' : 'we';
    lines.push(`${argsObj.preamble}${we} ${argsObj.verb} ${argsObj.feature}.`);
    if (rollDice() < 18 ){
        var addendums = [
            "It cries out to us in the dark.",
            "We ignore it, and try to forget.",
            "We pass it by unbidden.",
            "We leave marks to warn others."
        ];
        lines.push(shuffle(addendums)[0]);
        var adjectives = ['deeply','particularly','especially','profoundly'];
        lines.push(`${argsObj.leader._name} is ${shuffle(adjectives)[0]} disturbed by this encounter.`);
        addSickness(argsObj.leader._id,'nightmares');
    } else {
        var leaving = shuffle([
            [`${argsObj.leader._name} goes to investigate, but they are not heard from again.`,"has mysteriously disappeared"],
            [`${argsObj.leader._name} stays behind to worship.`,"has voluntarily left the caravan"]
        ])[0];
        lines.push(leaving[0]);
        removeLeader(argsObj.leader._id,leaving[1]);
    }
    return lines;
}

function subEventSpringTrap(argsObj,lines){
    argsObj = argsObj || {};
    var trap = argsObj.trap || generateTrap(argsObj.trapName);
    var leader = (argsObj.leaderId !== undefined)? trailGame.leaders[argsObj.leaderId] : getRandomLeader();
    lines.push(`${leader._name} ${trap.activation} ${indefiniteArticle(trap.trapName)} trap...`);
    var isSaved = savingThrow(leader._id,trap.trapSpeed);
    if (isSaved){
        var verbs = ['manage to','are able to','react in time and'];
        lines.push(`... but they ${shuffle(verbs)[0]} ${trap.escape}!`);
    } else {
        var damage = getRandomInt(trap.damageMin,trap.damageMax);
        if ( damage >= leader._health ){
            lines.push(`...they are ${trap.causeOfDeath}!`)
            removeLeader(leader._id,'will be sorely missed...');
        } else {
            subEventWoundLeader({min: damage,max: damage, leaderId: leader._id, verbPastTense: trap.verbPastTense, sicknessName: trap.sicknessName},lines);
        }
    };
}

function subEventFordRiver(argsObj,lines){
    argsObj = argsObj || {};
    var river = argsObj.river || generateRiver();
    var verb =  argsObj.forced === true ? 'are forced' : 'decide';
    lines.push(`We ${verb} to ford the ${river.riverType} river.`);
    var animalDamage = 0;
    var leadersDrowned = 0;
    for (var i = river._width; i >= 0; i--) {
        var roll = rollDice();
        animalDamage += roll < river._depth * 2 ? 1.5 : 0;
        leadersDrowned += roll < river._speed ? 1 : 0;
        //lines.push(`** rolled ${roll} A:${animalDamage}/L:${leadersDrowned}**`);
    }
    leadersDrowned = clamp(leadersDrowned, 0, Object.keys(trailGame.leaders).length);
    var savedLeaders = [];
    for (var i = leadersDrowned; i > 0; i--) {
        var leader = getRandomLeader();
        if ( savingThrow(leader._id, river._speed) ){
            if (savedLeaders.indexOf(leader._id) === -1){
                savedLeaders.push(leader._id);
            }
            var dangerLines = [
                `${leader._name} goes under the ${river._liquid} for a moment!`,
                `${leader._name} is barely able to keep from being swept away!`,
                `${leader._name} grabs hold of something in the nick of time!`
            ];
            lines.push(shuffle(dangerLines)[0]);
        } else {
            removeLeader(leader._id,`drowns in ${river._liquid}`);
        }
    }
    var survivedLeaderNames = [];
    var sickLeaderIds = [];
    var aliveLeaderIds = Object.keys(trailGame.leaders);
    savedLeaders.map(function(leaderId,index){
        var isAlive = aliveLeaderIds.indexOf(leaderId.toString()) !== -1;
        if (isAlive) {
            survivedLeaderNames.push(trailGame.leaders[leaderId]._name);
            if(rollDice(1,6) === 6){
                sickLeaderIds.push(leaderId);
            }
        }
    });
    if(survivedLeaderNames.length > 0){
        var verb = (survivedLeaderNames.length > 1)? 'thank' : 'thanks';
        addToLedger(`${sentenceForm(survivedLeaderNames)} ${verb} ${generateGod()} they made it across alive...`);
    }
    addSicknesses([[sickLeaderIds,[river._sickness]]]);
    var animalsDrowned = damageAnimals(animalDamage);
    if( Object.keys(animalsDrowned).length ){
        var keys = Object.keys(animalsDrowned);
        var lastKeyVal = animalsDrowned[keys[keys.length - 1]]
        var conjugator = lastKeyVal === 1 && keys.length === 1 ? "s" : "";
        lines.push(`${capitalizeFirstLetter(sentenceForm(animalsDrowned))} drown${conjugator} in ${river._liquid}.`);
    } else if (leadersDrowned <= 0){
        lines.push(`We ford the river without trouble.`);
    }
}

function subEventFerryRiver(argsObj,lines){
    argsObj = argsObj || {};
    var river = argsObj.river || generateRiver();
    var proposal = getTradeProposal({approxValue: river._ferryPrice});
    var offer = {actualValue: river._ferryPrice};
    var textProposal = sentenceForm(scrubTradeObj(proposal));
    lines.push(`We speak to the ferry pilot and offer ${textProposal} for passage across.`);
    var isAccepted = subEventTradeAttempt({offer: offer,proposal: proposal, merchantName: "The ferry pilot", giveExtra: true},lines);
    if (isAccepted){
        lines.push(`We are able to book passage safely across the ${river.riverType} river of ${river._liquid}.`);
        removeTrade(proposal);
        if(Object.keys(offer).length > 1){
            addTrade(offer);
        }
    } else {
        lines.push(`We are unable to book passage...`);
    }
    return isAccepted;
}

function subEventAnnounceRiver(argsObj,lines){
    river = argsObj.river || generateRiver();
    var lines = [];
    lines.push(`We come to a ${river.riverType} river of ${river._liquid}.`);
    var fancyWidth = river._width * 17 + rollDice(1,9);
    var fancyDepth = (river._depth * 1.1 + Math.random()).toFixed(2);
    lines.push(`The river is moving at ${river._speed} cubits/moment, ${fancyDepth} cubits deep, and ${fancyWidth} cubits wide.`);
    return lines;
}

function subEventScuffle(argsObj,lines){
    argsObj = argsObj || {};
    var angryLeader = argsObj.angryLeader || getRandomLeader();
    var targetLeader = argsObj.targetLeader || getRandomLeader();
    var insults = {};
    if (angryLeader._raceName !== targetLeader._raceName){
        insults[`${shuffle(targetLeader._race.insults)[0]} ${targetLeader._raceName}`] = 1;
    }
    if (angryLeader._religion.enemies.indexOf(targetLeader._god) !== -1 && targetLeader._religion.races.length > 1){
        insults[`damned ${targetLeader._religion.follower}`] = 1;
    }
    if (Object.keys(insults).length < 1){
        insults['idiot'] = 1;
    }
    var expresses = shuffle(['makes an obscene gesture','spits','swears','shouts'])[0];
    lines.push(`${angryLeader._name} ${expresses} and calls ${targetLeader._name} ${sentenceForm(insults)}!`);
    var fightAvoided = false;
    if (targetLeader._culture >= 3){
        var areFellows = (targetLeader._god === angryLeader._god);
        lines.push(`${targetLeader._name} insists they don't want to fight${areFellows ? ` a fellow ${targetLeader._religion.follower}` : ''}...`);
        fightAvoided = angryLeader._culture >= 2 && areFellows;
        if (fightAvoided){
            lines.push(`...Although still angry, ${angryLeader._name} agrees to walk away for the sake of ${angryLeader._god}.`);
        } else {
            lines.push(`... But ${angryLeader._name} doesn't care${areFellows ? ` about ${angryLeader._god} right now` : ''}.`);
        }
        if (!fightAvoided){
            if (targetLeader._wits > angryLeader._wits + 1){
                lines.push(`Fortunately, ${targetLeader._name} is able to dodge ${angryLeader._name} until they can be pulled apart.`);
                fightAvoided = true;
            }
        }
    }
    if (!fightAvoided){
        var fightLine = shuffle(['It comes to blows!',"There's a fight!",`The two wrestle to the ground!`])[0];
        lines.push(fightLine);
        subEventWoundLeader({min: 0,max: targetLeader._bravery,leader: angryLeader},lines);
        subEventWoundLeader({min: 0,max: targetLeader._bravery,leader: targetLeader},lines);
    }
    return lines;
}

function subEventSweetenProposal(argsObj,lines){
    argsObj = argsObj || {};
    var proposal = argsObj.proposal || getTradeProposal();
    var target = argsObj.target || proposal.actualValue / 5;
    var additionalProposal = {};
    var didAddValue = false;

    function checkAndAddValue(keyName,isGoods){
        var extra = 0;
        var sellPrice = 0;
        if (isGoods){
           extra = trailGame.goods[keyName] - (proposal[keyName] || 0);
           sellPrice = trailGame.goodsClasses[keyName].sell; 
        } else {
            extra = trailGame.animals[keyName] - (proposal[keyName] || 0);
            sellPrice = trailGame.animalClasses[keyName].sell; 
        }
        var max = Math.round(target / sellPrice);
        if (extra > 0 && max > 0){
            var amountAdded = getRandomInt(1,max);
            addToTrade(proposal,amountAdded,keyName);
            target -= (amountAdded * sellPrice);
            additionalProposal[keyName] = amountAdded;
            didAddValue = true;
        }
    }

    var goodsWeHave = shuffle(Object.keys(trailGame.goods));
    goodsWeHave.map(function(goodsName){
        checkAndAddValue(goodsName,true);
    });

    if ( target > 0 ){
        var animalsWeHave = shuffle(Object.keys(trailGame.animals));
        animalsWeHave.map(function(animalName){
            checkAndAddValue(animalName,false);
        });
    }

    if (didAddValue){
        lines.push(`We sweeten our proposal with ${sentenceForm(additionalProposal)}.`);
        return true;
    } else {
        var sadly = shuffle(['Sadly','Unfortunately','Alas'])[0];
        lines.push(`${sadly}, we have nothing additional we can offer.`);
        return false;
    }

}

function subEventTradeAttempt(argsObj,lines){
    argsObj = argsObj || {};
    var offer = argsObj.offer || getTradeOffer();
    var proposal = argsObj.proposal || getTradeProposal();
    var merchant = argsObj.merchant || generateLeader({
        name: argsObj.merchantName, 
        job: argsObj.merchantJob || argsObj.merchantSubclassName, 
        god: argsObj.merchantGod,
        cultureName: argsObj.merchantRace || argsObj.merchantCultureName
    });
    var capitalMerchant = capitalizeFirstLetter(merchant._name);
    var lowerMerchant = argsObj.properName === true ? merchant._name : merchant._name.toLowerCase();
    var leader = argsObj.leader || getRandomLeader();
    var giveExtra = argsObj.giveExtra === true ? true : false;
    var offerValue = offer.actualValue;
    var cultureModifier = getCaravanCulture() / trailGame.maxLeaderStat;
    var insultingThreshold = Math.round(offerValue - (cultureModifier * 0.5 * offerValue));
    var generousThreshold = Math.round(offerValue + ((1 - cultureModifier)* 0.5 * offerValue));
    var unit = Math.round(clamp((generousThreshold - insultingThreshold) / 3),1,trailGame.maxLeaderStat);
    var check = clamp(Math.round(offer.actualValue / proposal.actualValue),1,trailGame.maxLeaderStat);
    if (trailGame.caravan.morale < merchant._culture && rollDice(1,2) === 2 && proposal.actualValue < generousThreshold){
        lines.push(`${capitalMerchant} looks at the state of our company, and takes pity on us, agreeing to the deal.`);
        return true;
    } else if ( proposal.actualValue < insultingThreshold ){
        //insulted
        lines.push(`${capitalMerchant} is insulted by our proposal!`);
        lines.push(`${leader._name} tries to calm ${lowerMerchant} down.`);
        var difference = ((insultingThreshold) - proposal.actualValue);
        var calmed = subEventStatCheck({leader: leader, stat: 'culture', check: check, description: `de-escalate the situation`},lines);
        if ( calmed ){
            sweetenedDeal = subEventSweetenProposal({proposal: proposal, target: (difference / 2)},lines);
            var final = `${capitalMerchant} ${sweetenedDeal ? 'grumbles, but agrees.' : 'angrily asks us to leave!'}`;
            lines.push(final);
            return sweetenedDeal;
        } else if ( merchant._culture >= 3) {
            lines.push(`${capitalMerchant} angrily asks us to leave!`);
            return false;
        } else {
            subEventScuffle({angryLeader: merchant, targetLeader: getRandomLeader()},lines);
            lines.push(`We leave quickly before there's any more trouble!`);
            return false;
        }
    } else if ( proposal.actualValue < insultingThreshold + unit){
        // rejects
        lines.push(`${merchant._name} is uninterested in our proposal.`);
        var difference = ((insultingThreshold + unit) - proposal.actualValue);
        lines.push(`${leader._name} tries to convince ${lowerMerchant} to change their mind.`);
        var convinced = subEventStatCheck({leader: leader, stat: 'culture', check: check, description: `bring ${lowerMerchant} around`},lines);
        return convinced;
    } else if ( proposal.actualValue < insultingThreshold + 2*unit ){
        // bregrudingly
        lines.push(`${capitalMerchant} is irked by the slightness of our proposal but accepts it.`);
        return true;
    } else if ( proposal.actualValue < generousThreshold ){
        // accepts
        lines.push(`${capitalMerchant} accepts our proposal.`);
        return true;
    } else {
        // extra proffer
        lines.push(`${merchant._name} is embarrassed by the generosity of our proposal!`);
        var extraValue = (proposal.actualValue - offerValue) * 0.5;
        var extraOffer = getTradeOffer({approxValue: extraValue});
        lines.push(`${merchant._name} additionally gives us ${sentenceForm(scrubTradeObj(extraOffer))} out of a sense of fairness.`);
        mergeTradeObjs(offer,extraOffer);
        return true;
    }
}

function subEventSpiderAttack(argsObj,lines){
    argsObj = argsObj || {};
    var targetingAnimal = ( getRandomInt(0,1) === 1 ? true : false ) && Object.keys(trailGame.animals).length > 0;
    var stone = argsObj.stone || generateStone();
    var target = argsObj.target || null; // can only be leader rn
    var tower = argsObj.tower || `a ${indefiniteArticle(stone)} chimmney!`;
    var targetName = "";
    var attackFails = false;
    var addendums = [];

    if (targetingAnimal && target === null){
        target = getRandomAnimal();
        targetName = indefiniteArticle(target);
        attackFails = trailGame.animalClasses[target].ferocity > 3;
        bonus = attackFails && rollDice() >= 19;
    } else {
        target = target === null ? getRandomLeader() : target;
        targetName = target._name;
        attackFails = target._wits + rollDice(1,4) >= 5;
        bonus = attackFails && rollDice(1,2) === 2;
    }
    lines.push(`A puppeteer spider attempts to pull ${targetName} up ${tower}!`);
    targetName = targetingAnimal ? `the ${target}` : targetName;
    if (attackFails){
        if (targetingAnimal){
            lines.push (`But ${targetName} fights it off!`);
            if (bonus){
                lines.push(`The spider is killed in the struggle: ${getRandomLeader()._name} harvests its meat before we continue.`);
                addFood(3,20);
            } else {
                var addendums = [
                    `The spider scuttles back into the darkness as quickly as it appeared.`,
                    
                    `We all breathe a sigh of relief and catch our breath.`
                ];
                if (Object.keys(trailGame.leaders).length > 1){
                    addendums.concat([
                        `${getRandomLeader()._name} checks on ${targetName}, but it seems largely unharmed.`
                    ]);
                }
            }
        } else {
            var descriptor = bonus ? ' without a scratch' : ', but they are injured in the struggle'
            lines.push (`${targetName} reacts quickly and manages to escape${descriptor}.`);
            if (!bonus){
                subEventWoundLeader({min: 1, max: target._health, leaderId: target._id},lines);
            } else {
                var addendums = [
                    `${targetName} is still in shock, can barely speak.`
                ];
                if (Object.keys(trailGame.leaders).length > 1){
                    addendums.concat([
                        `${getRandomLeader(target._id)._name} embraces ${targetName} with tears of relief.`,
                        `${getRandomLeader(target._id)._name} yells at eveyone to stay vigilant.`,
                        `${getRandomLeader(target._id)._name} nervously jokes that ${targetName} should play more ${generateGame()} with that kind of luck...`
                    ]);
                }
            }
        }
    } else {
        lines.push (`The spider is too fast: we never see ${targetName} again...`);
        if (targetingAnimal){
            removeAnimals(target,1);
        } else {
            removeLeader(target._id,'becomes an arachnoid puppet...');
        }
    }
    if (addendums.length > 1){
        lines.push(shuffle(addendums)[0]);
    }
    return lines;
}

function subEventWormAttack(argObj,lines){
    argObj = argObj || {};
    var possibleColors = ['red','orange','yellow','green','blue','indigo','violet'];
    var color = (argObj.color !== undefined && possibleColors.indexOf(argObj.color) !== -1) ? argObj.color : shuffle(possibleColors)[0];
    var location = argObj.location || `the depths`;
    var leader = argObj.leader || getRandomLeader();
    var stone = argObj.stone || generateStone();
    lines.push(`A prysmatic worm emerges from ${location}!`);
    var possibleEffects = [];
    switch(color){
        case 'red':
            //heal
            lines.push(`It flashes red, and we feel a strange, healing warmth wash over us...`);
            addHealth(10,10,true,'healing red light');
            cureSickness(true,true);
        break;
        case 'orange':
            //vaporize animal/goods
            var animal = getRandomAnimal();
            var good = getRandomGood();
            var targetPhrase = '... well, nothing, actually. We have nothing with us.';
            var target = animal || good;
            var amount = 0;
            if (target !== undefined){
                if ( target === good ){
                    var goodObj = trailGame.goodsClasses[good];
                    amount = clamp(1,trailGame.goods[good],rollDice(5));
                    var pluralPhrase = `${indefiniteArticle(goodObj.cacheName)} of ${amount} ${pluralize(good)}!`;
                    var singlePhrase = `a single ${good},`
                    targetPhrase = amount === 1 ? singlePhrase : pluralPhrase;
                    removeGoods(good,amount);
                } else {
                    amount = clamp(1,trailGame.animals[animal],rollDice(1,6));
                    var pluralPhrase = `${amount} of our ${pluralize(animal)}!`;
                    var singlePhrase = `a lone ${animal}.`
                    targetPhrase = amount === 1 ? singlePhrase : pluralPhrase;
                    removeAnimals(animal,amount);
                }
            }
            lines.push(`It emits a beam of orange light, vaporizing ${targetPhrase}`);
        break;
        case 'yellow':
            // kills leader
            lines.push(`It emits a cone of yellow light, turning ${leader._name} to ${stone}!`);
            removeLeader(leader._id,`has become a ${stone} statue`);
        break;
        case 'green':
            // morale loss
            possibleEffects = [
                `causing vivid hallucinations.`,
                `making us turn on each other.`,
                `and we flee in terror.`
            ];
            lines.push(`It dazzles us with streamers of green light, ${shuffle(possibleEffects)[0]}`);
            removeMorale(2);
        break;
        case 'blue':
            // nothing
            possibleEffects = [
                `splitting into multiple illusory copies.`,
                `causing ${leader._name}'s spells to misfire.`
            ];
            lines.push(`It shimmers with blue light, ${shuffle(possibleEffects)[0]}`);
        break;
        case 'indigo':
            // sickness
            lines.push(`It emits an erratic mote of indigo light that causes everyone to feel nauseous and light-headed.`);
            addSickness(true,'prysmatic fever');
        break;
        case 'violet':
            // amnesia
            lines.push(`It dazzles us with streamers of violet light! Afterwards, ${leader._name} cannot even remember their name...`);
            removeWits(5,5,leader._id);
            removeCulture(5,5,leader._id);
            removeBravery(5,5,leader._id);
        break;
    }
    return lines;
}

function subEventMonsterAttack(argsObj,lines){
    argsObj = argsObj || {};
    var horde = argsObj.undead === true ? generateUndead(argsObj) : generateMonsters(argsObj);
    var isAmbush = getCaravanWits() < horde.wits;
    var outrun = getCaravanSpeed() - horde.speed;
    var attackverbs = ['attacked','beset','raided','besieged','harried'];
    var ambushverbs = ['ambushed','caught off gaurd','surprised','flanked'];
    var qualifiers = ['barely ','','handily '];
    var verbs = isAmbush ? ambushverbs : attackverbs;
    var grouping = horde.packSize === 1 ? `a lone` : `${indefiniteArticle(horde.packName)} of ${horde.packSize}`;
    var hordeName = horde.packSize === 1 ? horde.monsterType : pluralize(horde.monsterType);
    var conjugator = horde.packSize === 1 ? 's' : '';
    lines.push(`Our party is ${shuffle(verbs)[0]} by ${grouping} ${hordeName}!`);
    if( !isAmbush && outrun > 0 ){
        var byHowMuch = qualifiers[clamp(Math.round(outrun / getCaravanSpeed()),0,2)];
        lines.push(`...But we ${byHowMuch}outrun them! (faster by ${outrun})`);
        var goodsName = getRandomGood();
        if ( goodsName !== undefined){
            removeGoods(goodsName,rollDice(2));
            lines.push(`We drop a few ${goodsName} as we flee.`);
        }
    } else {
        var battleOutcome = getCaravanFerocity() - horde.totalFerocity;
        if ( battleOutcome > 0 ){
            var byHowMuch = qualifiers[clamp(Math.round(battleOutcome / horde.totalFerocity),0,2)];
            lines.push(`We ${byHowMuch}defeat them! (won by ${battleOutcome})`);
            addMorale(1);
        } else {
            var byHowMuch = qualifiers[clamp(Math.round(battleOutcome / getCaravanFerocity()),0,2)];
            lines.push(`The ${hordeName} ${byHowMuch}defeat${conjugator} us... (lost by ${battleOutcome})`);
            removeMorale(1);
            var totalLeaders = Object.keys(trailGame.leaders).length;
            var damage =  Math.abs(battleOutcome);
            var coinToss = getRandomInt(0,1) === 1 ? true : false;
            if (coinToss){
                var animalsLost = damageAnimals(damage);
                var typesLost = Object.keys(animalsLost);
                var strings = [];
                if( typesLost.length > 0){
                    lines.push(`The ${hordeName} make${conjugator} off with ${sentenceForm(animalsLost)}.`);
                }else {
                     lines.push(`However, the ${hordeName} fail${conjugator} to drag away any of our animals.`);
                }
            } else {
                var leader = getRandomLeader();
                subEventWoundLeader({min:1,max:clamp(damage,1,10),leaderId:leader._id, sicknessName: horde.sickness},lines);
            }
        }
    }
    return lines;
}

function subEventAdditionalActions(argObj,lines){
    argObj = argObj || {};
    if (typeof(argObj.callback) === 'function'){
        argObj.callback(argObj,lines);
    }
    return lines;
}

function subEventFindCorpse(argsObj,lines){
    argsObj = argsObj || {};
    argsObj.monsterType = argsObj.monsterType || generateMonsters().monsterType;
    argsObj.loverName = argsObj.loverName || generateName();
    argsObj.leader = argsObj.leader || getRandomLeader();
    argsObj.religion = argsObj.religion || generateReligion();
    argsObj.job = argsObj.job || shuffle(trailGame.cultures[shuffle(argsObj.religion.races)[0]].jobs)[0];
    argsObj.location = argsObj.location || generateLandmark();
    var corpseLeader = generateLeader(argsObj);
    var causesOfDeath = [
        `Crushed beneath collapsing rocks.`,
        `Looks like the work of ${indefiniteArticle(argsObj.monsterType)}.`,
        `...Starvation.`,
        `There is no sign of damage on the body.`,
        `The word 'Murderer' is written across their forehead.`,
        `...Bandits. Or Zealots. Hard to tell.`,
        `The body deteriorates at an advanced pace.`,
        `We find a letter on the body addressed to 'My Dearest ${argsObj.loverName}...'`,
        `A journal identifies the corpse as ${corpseLeader._name} the ${corpseLeader._raceName} ${corpseLeader._title}.`,

    ]
    var addCause = (getRandomInt(0,2) === 2);
    lines.push(`We come across the corpse of ${indefiniteArticle(corpseLeader._title)}.`);
    if (addCause){
        lines.push(shuffle(causesOfDeath)[0]);
    }
    var fellows = shuffle(getLeadersFavoringGod(argsObj.religion.god));
    if (fellows.length){
        var indicators = [...argsObj.religion.markings].concat(argsObj.religion.objects);
        var fellow = fellows[0];
        var ess = fellows.length <= 1 ? 's' : '';
        lines.push(`${fellow._name} recognizes them as a fellow ${argsObj.religion.follower} by their ${shuffle(indicators)[0]}.`);
        lines.push(`${sentenceForm(getLeaderNames(fellows))} instruct${ess} us to ${argsObj.religion.burial} in accordance with their beliefs.`);
    }
    var loseMorale = (getRandomInt(0,3) === 3);
    var diceRoll = rollDice(1,3);
    if (diceRoll === 1){
        lines.push(`${argsObj.leader._name} wonders quietly if anyone will ever find them dead ${argsObj.location}...`);
        removeMorale(1);
    } else if (diceRoll == 2 && argsObj.leader._immunities['nightmares'] !== true){
        lines.push(`Later, ${argsObj.leader._name}'s dreams are haunted by their dry, mummified eyes.`);
        addSickness(argsObj.leader._id,'nightmares')
    } else {
        lines.push(`${argsObj.leader._name} says a few words. We are all moved.`);
        cureSickness(true,'despair');
    }
    return lines;
}

// main event functions

function eventCorpse(argsObj){
    var lines = [];
    argsObj = argsObj || {};
    subEventFindCorpse(argsObj,lines);
    addDays(1);
    return lines;
}

function eventLibrary(argsObj){
    var lines = [];
    argsObj = argsObj || {};
    subEventVisitLibrary(argsObj,lines);
    addDays(1);
    return lines;
}

function eventDiscovery(argsObj){
    var lines = [];
    argsObj = argsObj || {};
    subEventDiscovery(argsObj,lines);
    addDays(1);
    return lines;
}

function eventReshoe(argsObj){
    var lines = [];
    var animalToShoe = getRandomPachyderm();
    if( typeof(animalToShoe) === "undefined" ){
        return eventSafeFlavor();
    } else {
        var totalAnimals = trailGame.animals[animalToShoe];
        var animalClass = trailGame.animalClasses[animalToShoe];
        var totalShoes = totalAnimals * animalClass.shoes;
        var workers = Object.keys(trailGame.leaders).length * clamp(trailGame.caravan.morale,1,10);
        var hours = Math.max(Math.ceil(totalShoes / workers),totalAnimals);
        var days = Math.ceil(hours/12);
        var plural = (totalAnimals > 1) ? pluralize(animalToShoe) : animalToShoe;
        lines.push(`We stop to re-shoe our ${totalAnimals} ${plural}.`);
        lines.push(`The task takes a total of ${hours} hours over ${days} days.`);
        addDays(days);
    }
    return lines;
}

function eventSafeFlavor(argObj){
    var lines = [];
    var pachyderm = shuffle(trailGame.pachyderms)[0];
    var leaderName = getRandomLeader()._name;
    var randomness = [
        `We stop to to check our charts.`,
        `${leaderName} steps in ${pachyderm} dung.`,
        `We stop at a shrine to ${generateGod()}. ${leaderName} says a silent prayer.`,
    ];
    lines.push(shuffle(randomness)[0]);
    addDays(1);
    return lines;
}

function eventSickness(argsObj){
    var lines = [];
    var leader = getRandomLeader();
    var sicknessName = shuffle(trailGame.contractableSickneses)[0];
    addSickness(leader._id,sicknessName);
    addDays(1);
    return lines;
}

function eventTraps(argsObj){
    argsObj = argsObj || {};
    var lines = [];
    var numberOfLeaders = Object.keys(trailGame.leaders).length;
    var diceResult = rollDice(1,10);
    var trapsCheck = argsObj.trapsResult || clamp(diceResult + Math.round(getCaravanWits() / numberOfLeaders),1,15);
    trapsCheck = diceResult <= 1 && argsObj.trapsResult === undefined ? 1 : trapsCheck;
    var leader = getRandomLeader();
    var leaderName = leader._name;
    var addendums = [];
    lines.push(`We check our traps.`);
    switch (trapsCheck){
        case 1:
            lines.push(`A yellow thief has managed to extract the bait, leaving behind only a single severed tentacle.`);
            var goodsName = getRandomGood();
            if (goodsName !== undefined){
                var number = rollDice(1,20);
                lines.push(`The thief also made off with ${number} of our ${pluralize(goodsName)}.`);
                trailGame.caravan.timesRobbed++;
                removeGoods(goodsName,number);
            }
            addendums = [
                `${leaderName} chases folks around holding the tentacle.`,
                `${leaderName} swears to ${generateGod()} that they will get that thief one of these days.`
            ];
            removeMorale(1);
        break;
        case 2:
        case 3:
            var badness = getRandomInt(0,1) === 1 ? 'empty' : 'broken';
            lines.push(`They are ${badness}.`);
            addendums = [
                `Better luck next time.`,
            ];
        break;
        case 4:
        case 5:
        case 6:
            var pet = generatePet();
            lines.push(`Drat! We've caught someone's ${pet.animalClass}.`);
            if( getCaravanStarving() && !trailGame.caravan.isVegetarian){
                lines.push(`We're too deparate for food. We quietly kill it.`);
                addFood(pet.meat);
                removeMorale(1);
                addendums = [
                    `${leaderName} can't believe we've come to this...`,
                ];
            } else {
                lines.push(`We let it go.`);
                addendums = [
                    `We're not heartless, after all.`,
                ];
            }
        break;
        case 7:
        case 8:
        case 9:
        case 10:
            lines.push(`We've caught a clutch of ${generatePrey()}s.`);
            addendums = [
                `${generateExclamation()}.`,
                `${leaderName} has some ideas for recipes for these.`,
            ];
            addFood(rollDice(numberOfLeaders,10));
        break;
        case 11:
            var article = (trailGame.caravan.timesRobbed > 0) ? `that` : `a`;
            var start = (trailGame.caravan.timesRobbed > 2) ? `At last, we've` : `We've`;
            lines.push(`${start} caught ${article} yellow thief! It gibbers and writhes.`);
            addendums = [
                `${leaderName} couldn't be happier: they really hate those buggers.`,
                `It really grosses ${leaderName} out.`
            ];
            trailGame.caravan.timesRobbed = 0;
            addMorale(2);
        break;
        case 12:
        case 13:
            var turtle = generateTurtle();
            lines.push(`We've caught a ${turtle.animalClass}.`);
            addendums = [
                `As ${leaderName}'s mother always said, 'You can never have enough turtles.'`,
                `${leaderName} has never seen one this big before!`,
                `${leaderName} mutters that we better not eat this one.`
            ];
            addAnimals(turtle.animalClass,1);
        break;
        case 14:
            var gem = generateGem();
            lines.push(`We've caught ${indefiniteArticle(gem)} elemental!`);
            addendums = [];
            if (leader._culture > rollDice(1,4)){
                lines.push(`${leaderName} thinks it's too cute to kill and harvest! We let it go.`);
            } else {
                lines.push(`${leaderName} harvests it for ${pluralize(gem)}.`);
                addGoods(gem,rollDice(1,4));
            }
        break;
        case 15:
            subEventDiscovery({findType:'curiosity', verb:'has caught', curiosity: 'a bright blue variant of the yellow-spotted thief.'},lines);
        break;
    }
    if (getRandomInt(0,1) === 1 && addendums.length){
        lines.push(shuffle(addendums)[0]);
    }
    addDays(1);
    return lines;
}

function eventThief(argsObj){
    var lines = [];
    var goodsName = getRandomGood();
    var leaderName = getRandomLeader()._name;
    if (goodsName === undefined && trailGame.caravan.food <= 0){
        lines.push(`A yellow thief gets into the camp, but we have nothing to steal.`);
    } else {
        var stealFood = rollDice(1,4) === 4 || goodsName === undefined;
        var word = stealFood ? 'food' : pluralize(goodsName);
        var number = rollDice(1,20);
        lines.push(`A yellow thief makes off with some of our ${word}.`);
        if (stealFood){
            removeFood(number);
        } else {
            removeGoods(goodsName,number);
        }
    }
    
    trailGame.caravan.timesRobbed++;
    if ( trailGame.caravan.timesRobbed > 3){
        removeMorale(1);
    }
    var addendums = [
        `${leaderName} is miffed about it.`,
        `${leaderName} is sure we'll catch them soon.`,
        `We double-check our traps.`,
        `${leaderName} smokes the caravan with noxious herbs to keep them away.`,
        `${leaderName} draws up plans for elaborate new traps to catch them`,
        `${leaderName} gives us all a lecture about securing the caravan.`,
        `We stay out of ${leaderName}'s way. They're obviously not pleased about this.`,
        `${leaderName} spits on the ground and curses them to ${generateGod()}.`
    ];
    if ( getRandomInt(0,1) === 1 ){
        lines.push(addendums[clamp(trailGame.caravan.timesRobbed - 1,0,7)]);
    }
    addDays(1);
    return lines;
}

function eventSpiderAttack(argsObj){
    var lines = [];
    argsObj = argsObj || {};
    subEventSpiderAttack(argsObj,lines);
    addDays(1);
    return lines;
}

function eventWormAttack(argsObj){
    var lines = [];
    argsObj = argsObj || {};
    subEventWormAttack(argsObj,lines);
    addDays(1);
    return lines;
}

function eventMonsterAttack(argsObj){
    var lines = [];
    argsObj = argsObj || {};
    subEventMonsterAttack(argsObj,lines);
    addDays(1);
    return lines;
}

function eventAnnounceFord(argsObj){
    argsObj = argsObj || {};
    var river = argsObj.river || generateRiver(argsObj.riverName);
    var lines = [];
    argsObj.river = river;
    lines = lines.concat(subEventAnnounceRiver({river: river},lines));
    subEventFordRiver({river: river,forced: false},lines);
    addDays(1);
    return lines;
}

function eventAnnounceFerryFord(argsObj){
    argsObj = argsObj || {};
    var river = argsObj.river || generateRiver(argsObj.riverName);
    var lines = [];
    argsObj.river = river;
    lines = lines.concat(subEventAnnounceRiver({river: river},lines));
    var ferryAttempt = subEventFerryRiver({river: river},lines);
    if (!ferryAttempt){
        subEventFordRiver({river: river,forced: true},lines);
    }
    addDays(1);
    return lines;
}

function eventMakeTrade(argsObj){
    argsObj = argsObj || {};
    var lines = [];
    var offer = argsObj.offer || getTradeOffer({level: argsObj.tradeLevel});
    lines.push(`We meet a merchant with wares for sale ${generateLandmark()}.`);
    trailGame.caravan.dayHasBeenPaused = true;
    createTradeModal({
        offer: offer,
        merchantName: `The merchant`,
        merchantJob: 'trader',
        giveExtra: true
    },lines);
    // lines.push(`We propose to give ${textProposal} in return.`);
    // isAccepted = subEventTradeAttempt({offer: offer, proposal: proposal, merchantName: `The merchant`, merchantJob: 'trader', giveExtra: true},lines);
    // if (isAccepted){
    //     removeTrade(proposal);
    //     addTrade(offer);
    // }
    // addDays(1);
    return lines;
}

function eventCave(argsObj){
    argsObj = argsObj || {};
    var lines = [];
    var cave = generateCave(argsObj);
    var amountLost = rollDice(1,6) + getCaravanWits() - cave._complexity; // negative numbers means lost I guess...
    var distance = amountLost > 0 ? cave._length : cave._length * Math.abs(amountLost);
    var days = Math.ceil((distance / getCaravanSpeed()) / 12 );
    days = Math.max(1,days);
    var verb = (amountLost > 0 || days <= 1) ? cave._verb : 'get lost in';
    lines.push(`We ${verb} ${indefiniteArticle(cave._name)}...`);
    var thingsToFind = shuffle(['loot','trap','worm','spider','monster','undead','corpse','additional']);
    var thingsFound = {};
    for (var i = days; i >= 1; i--) {
        thingsToFind.map(function(thing){
            if (Object.keys(trailGame.leaders).length <= 0){
                return lines;
            }
            var chance = cave[`_${thing}Chance`];
            var roll = rollDice(1,chance);
            var isLastChance = (i <= 1 && thingsToFind.indexOf(thing) === thingsToFind.length -1 && Object.keys(thingsFound).length < 1);
            var isActivated = roll >= chance || isLastChance;
            var discoveryArgs = {findType: shuffle(cave._lootTypes)[0], location: cave._lootLocation, verb: cave._findVerb, bookType: shuffle(cave._bookTypes)[0]};
            if (chance > 0 && isActivated){
                if (thing === 'loot' && cave._lootTypes.length && thingsFound.loot !== true){
                    subEventDiscovery(discoveryArgs,lines);
                    thingsFound[thing] = true;
                } else if (thing === 'trap' && cave._trapTypes.length && thingsFound.trap !== true){
                    subEventSpringTrap({trapName: shuffle(cave._trapTypes)[0]},lines);
                    thingsFound[thing] = true;
                } else if (thing === 'worm' && (thingsFound.worm !== true && thingsFound.spider !== true)){
                    subEventWormAttack({location: cave._depths},lines);
                    thingsFound[thing] = true;
                } else if (thing === 'spider' && (thingsFound.worm !== true && thingsFound.spider !== true)){
                    subEventSpiderAttack({tower: cave._tower},lines);
                    thingsFound[thing] = true;
                } else if (thing === 'monster' && cave._monsterTypes.length && (thingsFound.monster !== true && thingsFound.undead !== true) ){
                    subEventMonsterAttack({monsterName: shuffle(cave._monsterTypes)[0]},lines);
                    thingsFound[thing] = true;
                } else if (thing === 'undead' && cave._undeadTypes.length && (thingsFound.monster !== true && thingsFound.undead !== true) ){
                    subEventMonsterAttack({monsterName: shuffle(cave._undeadTypes)[0], undead: true},lines);
                    thingsFound[thing] = true;
                } else if (thing === 'corpse' && (thingsFound.corpse !== true) ){
                    subEventFindCorpse({religion: cave._religion, monsterType: shuffle(cave._monsterTypes)[0]},lines);
                    thingsFound[thing] = true;
                } else if ( thing === 'additional' && cave._additionalAction !== undefined && thingsFound.additional !== true){
                    subEventAdditionalActions({callback: cave._additionalAction},lines);
                    thingsFound[thing] = true;
                }
            }
            if (isLastChance && Object.keys(thingsFound).length < 1){
                var lootType = shuffle(cave._lootTypes)[0] || 'goods';
                subEventDiscovery(discoveryArgs,lines);
            }
        });
    }
    if (!Object.keys(trailGame.leaders).length <= 0){
        lines.push(`We ${cave._exitVerb} ${sentenceForm({'day' : days})} later.`);
    }
    addDays(days);
    return lines;
}

function eventStartJourney(){
    return [`${trailGame.caravan.founder._name} and their caravan set off on their journey to ${trailGame.journey.title}...`];
}

function eventStartCrossroads(){
    var lines = [];
    lines.push(`We come to a crossroads.`);
    trailGame.journey.currentLeg.exits.map(function(exitObj){
        lines.push(exitObj.description);
    });
    trailGame.caravan.dayHasBeenPaused = true;
    createCrossroadsModal(lines);
    return lines;
}

function eventResolveCrossroads(exitObj){
    var lines = [];
    if ( exitObj === undefined || typeof(exitObj) !== 'object'){
        lines.push(shuffle([
            `${getRandomLeader()._name} throws a stone in the air. We go where it lands.`,
            `A wild ${generateAnimal().animalClass} crosses our path. We take it as a sign.`,
            `${getRandomLeader()._name} points in a direction. We trust their gut.`
        ])[0]);
        exitObj = shuffle(trailGame.journey.currentLeg.exits)[0];
    }
    lines.push(`We choose to ${exitObj.title}.`);
    loadLegOfJourney(exitObj.key);
    addDays(1);
    return lines;
}

function eventGameOver(){
    var lines = [];
    var horde = generateMonsters();
    var goodsName = getRandomGood();
    var animalName = getRandomAnimal();
    var addendums = [
        `Our corpses serve as grim warning for other travelers.`,
        `We eventually become dinner for a ${horde.packName} of ${pluralize(horde.monsterType)}.`,
        `${trailGame.caravan.loan.giver} never finds out what happened to ${trailGame.caravan.founder._name} or their ${trailGame.caravan.loan.actualValue} silver.`,
        `May ${generateGod()} help us all find peace in the afterlife.`,
        `The cavern trail claims another party of brave adventurers...`,
        `Far away, ${trailGame.caravan.loan.giver} weeps for their beloved ${trailGame.caravan.founder._name}...`
    ];
    if (goodsName !== undefined){
        addendums.push(`Our cargo of ${pluralize(goodsName)} is scattered to the wind...`,);
    }
    if (animalName !== undefined){
        addendums.push(`Our remaining ${pluralize(animalName)} wander free, alone and beset by monsters.`);
    }
    lines.push(`Our entire caravan has perished.`);
    lines.push(shuffle(addendums)[0]);
    createGameOverModal(lines);
    return lines;
}

function eventGameWin(){
    var lines = [];
    lines.push(`We safely arrive at ${trailGame.journey.title}!`);
    var relativeName = trailGame.caravan.loan.giver;
    var finalSale = getFinalSale();
    var finalSaleValue = finalSale.actualValue * trailGame.journey.sellMultiplier;
    var founder = trailGame.caravan.founder;
    var founderAlive = Object.keys(trailGame.leaders).indexOf(founder._id.toString()) > -1;
    lines.push(`We sell ${sentenceForm(scrubTradeObj(finalSale))}...`);
    lines.push(`...earning us a total of ${finalSaleValue} silver.`);
    // if( cultureModifier > 1){
    //     lines.push(`We would've gotten less, but we're smooth salespeople.`);
    // }
    var founderMsg = "";
    if (founderAlive){
        founderMsg = `${founder._name} sends word to ${relativeName} that we have succesfully arrived`;
    } else {
        founderMsg = `We send word to ${relativeName} that ${founder._name} did not survive the journey`;
    }
    var amountOwed = Math.round(trailGame.caravan.loan.actualValue + trailGame.caravan.loan.actualValue * (trailGame.caravan.loan.interest / 100));
    var joiner = ' and '
    if ( founderAlive ){
        joiner = finalSaleValue > amountOwed ? ' and ' : ', but ';
    } else {
        joiner = finalSaleValue > amountOwed ? ', however ' : ', and additionally ';
    }
    var willing = finalSaleValue > amountOwed ? `happy` : `unable`;
    lines.push(`${founderMsg}${joiner}we will be ${willing} to repay the ${amountOwed} silver owed.`);
    if ( finalSaleValue > amountOwed ){
        lines.push(`We net a profit of ${finalSaleValue - amountOwed} silver.`);
    }
    var outcome = 0;
    outcome += finalSaleValue > amountOwed ? 1:0;
    outcome += founderAlive ? 1:0;
    outcome += (finalSaleValue - amountOwed) > (amountOwed / 2) ? 1:0;
    var adjectives = ['humiliating','disappointing','moderate','huge'];
    var descriptor = outcome > 1 ? 'success' : 'failure';
    lines.push(`Financially, our journey was a ${adjectives[outcome]} ${descriptor}.`);
    lines.push(`Most importantly, we're glad some of us made it here safely.`);
    var overallSuccess = outcome > 1;
    createGameWinModal(lines,overallSuccess);
    return lines;
}

function getRandomEvent(){
    var events = [
        'eventDiscovery',
        'eventCorpse',
        'eventReshoe',
        'eventSickness',
        'eventTraps',
        'eventThief',
        'eventSafeFlavor',
        'eventMonsterAttack',
        'eventAnnounceFerryFord',
        'eventCave',
        'eventMakeTrade',
        'eventSpiderAttack',
        'eventWormAttack'
    ];
    return shuffle(events).shift();
}

function registerParty(partyName){
    if (partyName !== undefined || !trailGame.temp.roster.length){
        loadPremadeParty(partyName);
    }
    trailGame.temp.roster.map(function(leaderObj){
        addLeader({leader: leaderObj});
    });
    signLoan(trailGame.temp.loan);
    initialPurchase(removeZerosFromTrade(trailGame.temp.shoppingCart));
    trailGame.temp = {};
}

function loadPremadeParty(partyName){
    newCaravan();
    partyName = partyName || shuffle(Object.keys(trailGame.parties))[0];
    var partyObj = trailGame.parties[partyName];
    partyObj.leaders.map(function(leaderArgs){
        trailGame.temp.roster.push(generateLeader(leaderArgs));
    });
    var shoppingCart = trailGame.temp.shoppingCart;
    Object.keys(partyObj.animals).map(function(animalClass){
        addToTrade(shoppingCart,partyObj.animals[animalClass],animalClass);
    });
    Object.keys(partyObj.goods).map(function(goodsClass){
        addToTrade(shoppingCart,partyObj.goods[goodsClass],goodsClass);
    });
    trailGame.temp.loan = generateLoan({max: shoppingCart.actualValue, name: partyObj.relative});
}

function loadUp(){
    newCaravan();
    addRandomLeader();
    for (var i = getRandomInt(1,5) - 1; i >= 0; i--) {
        addRandomLeader();
    }
    var loan = generateLoan();
    signLoan(loan);
    var shoppingList = getTradeOffer({approxValue: loan.max});
    shoppingList[generatePachyderm().animalClass] = rollDice(1,10);
    initialPurchase(shoppingList);

    addFood(rollDice(Object.keys(trailGame.leaders).length) * 2,20);

    return [`Randomly Loaded Up A Caravan!`];
}

// output functions

trailGame.UI = {};
trailGame.UI.log = document.body.querySelector('#log');
trailGame.UI.window = document.body.querySelector('#window');

function textArrayToP(textArray,className){
    var pTag = document.createElement("p");
    if (className !== undefined){
        pTag.className = className;
    }
    textArray.map(function(lineOfText,index){
        pTag.append(lineOfText);
        if (index < textArray.length){
            pTag.append(document.createElement("br"));
        }
    });
    return pTag
}

function addTextArrayToLog(textArray,className){
   if (textArray.length){
        trailGame.UI.log.append(textArrayToP(textArray,className));
    } 
}

function dropItemsAndLog(dropTrade){
    var intro = `Our caravan is overweight!`
    var dropLine = `We are forced to drop ${sentenceForm(scrubTradeObj(removeZerosFromTrade(dropTrade)))} in order to continue...`;
    addTextArrayToLog([intro,dropLine],'day updates');
    removeTrade(dropTrade);
}

function runAndLogEvent(funct,args,dayIsResolution){
    dayIsResolution = dayIsResolution === true ? true : false;
    disableMainControls();
    if ( Object.keys(trailGame.leaders).length <= 0 && !trailGame.lostGame){
        trailGame.UI.log.append(textArrayToP(['RANDOM NEW CARAVAN']));
        funct = loadPremadeParty;
    }

    if (!dayIsResolution){
        if (trailGame.caravan.daysElapsed){
            trailGame.UI.log.append(document.createElement("hr"));
        }
        var headline = document.createElement("h3");
        headline.className = 'day number';
        var headlineText = `Day ${trailGame.caravan.daysElapsed}`;
        headlineText = trailGame.caravan.daysElapsed === 0 ? 'Welcome to Cavern Caravan Trail!' : headlineText;
        headlineText = trailGame.lostGame ? 'Game Over' : headlineText;
        headlineText += funct === eventGameWin ? ' - Our Journey Comes to an End!' : '';
        headline.append(headlineText);
        trailGame.UI.log.append(headline);
    }

    if (getCaravanCarrying() - getCaravanCapacity() > 0 && trailGame.caravan.daysElapsed > 0){
        createOverweightModal(funct,args,true);
        return undefined;
    }

    if ( trailGame.caravan.daysElapsed === 0 ){
        trailGame.caravan.daysElapsed = 1;
    }

    var dayLines = dayPhase(funct,args);
    addTextArrayToLog(dayLines.events,'day events');
    addTextArrayToLog(dayLines.ledgerLines,'day updates');
    addTextArrayToLog(dayLines.ledgerStats,'day stats');

    if ((trailGame.caravan.daysSinceLastMeal > 0 || dayIsResolution) && !trailGame.lostGame){
        var nightLines = nightPhase();
        trailGame.caravan.dayIsResolution = false;
        trailGame.caravan.dayHasBeenPaused = false;
        addTextArrayToLog(nightLines.events,'night events');
        addTextArrayToLog(nightLines.ledgerLines,'night updates');
        addTextArrayToLog(nightLines.ledgerStats,'night stats');
    }
    
    trailGame.UI.window.scrollTop = trailGame.UI.window.scrollHeight;
    enableMainControls();
    return undefined;
}

function clearLog(){
    while (trailGame.UI.log.hasChildNodes()) {
      trailGame.UI.log.removeChild(trailGame.UI.log.firstChild);
   }
}

function toggleClass(selector,className){
    var element = document.querySelector(selector);
    if ( element !== undefined && element.classList.contains(className) ){
        element.classList.remove(className);
    } else if (element !== undefined) {
        element.classList.add(className);
    }
}

function toggleModal(selector){
    toggleClass(`${selector}.modal`,'active');
}

function createButton(argsObj){
    argsObj = argsObj || {};
    argsObj.useLi = argsObj.useLi === false ? false : true;
    argsObj.buttonText = argsObj.buttonText || 'button';
    argsObj.callback = argsObj.callback || function(){alert(`missing callback!`)};
    var button = document.createElement("button");
    var span = document.createElement("span");
    button.append(span);
    span.append(argsObj.buttonText);
    button.addEventListener("click",argsObj.callback);
    if (argsObj.buttonClassName !== undefined){
        button.className = argsObj.buttonClassName;
    }
    if (argsObj.buttonId !== undefined){
        button.setAttribute('id',argsObj.buttonId);
    }
    if (argsObj.useLi){
        var li = document.createElement("li");
        if (argsObj.liClassName !== undefined){
            li.className = argsObj.liClassName;
        }
        li.append(button);
        return li;
    } else {
        return button;
    }
}

function createModal(argsObj){
    argsObj = argsObj || {};
    argsObj.active = argsObj.active === false ? false : true;

    var modal = document.createElement("div");
    modal.className = 'modal';
    if (argsObj.modalId !== undefined){
        modal.setAttribute('id',argsObj.modal);
    }

    var modalWrapper = document.createElement("div");
    modalWrapper.className = 'column';
    modal.append(modalWrapper);

    var modalBg = document.createElement("div");
    modalBg.className = 'modal_background';
    modalWrapper.append(modalBg);

    var modalScroll = document.createElement("div");
    modalScroll.className = 'modal_scroll-container';
    modalBg.append(modalScroll);

    var modalContent = argsObj.contentNode || createModalContentContainer();
    modalScroll.append(modalContent);

    document.body.append(modal);
    if(argsObj.active){
        setTimeout(function(){
            activateModal(modal)
        },100);
    }

    return modal;
}

function createModalContentContainer(){
    var modalContent = document.createElement("div");
    modalContent.className = 'modal_content';
    return modalContent;
}

function activateModal(modalElement){
    dismissActiveModal();
    disableMainControls();
    modalElement.classList.add('active');
}

function dismissActiveModal(destroyModal){
    enableMainControls();
    var modal = document.body.querySelector('.modal.active');
    if (modal !== null){
        modal.classList.remove('active');
        if (destroyModal){
            setTimeout(function(){
                modal.parentNode.removeChild(modal);
            },1000);
        }
    }
}

function createControlsUl(buttonArr){
    var controls = document.createElement("ul");
    controls.className = 'modal_controls controls';
    buttonArr.map(function(buttonElement){
        controls.append(buttonElement);
    });
    return controls;
}

function createSimpleModal(argsObj){
    argsObj.buttons = argsObj.buttons || [];
    var modalContent = createModalContentContainer();

    if (argsObj.textNode !== undefined){
        modalContent.append(argsObj.textNode);
    }

    if (argsObj.buttons.length){
        var buttonArr = [];
        argsObj.buttons.map(function(buttonArgs){
            buttonArgs.liClassName = buttonArgs.liClassName || 'full-width';
            buttonArr.push(createButton(buttonArgs));
        });
        var modalControls = createControlsUl(buttonArr);
        modalContent.append(modalControls);
    };

    argsObj.contentNode = modalContent;
    return createModal(argsObj);
}

function createPartyChoiceModal(){
    var modalContent = createModalContentContainer();

    var headline = document.createElement("h2");
    headline.append('Choose Your Caravan:');
    modalContent.append(headline);

    var instructionsA = document.createElement("h5");
    instructionsA.append('Create a Caravan from Scratch:');
    modalContent.append(instructionsA);

    modalContent.append(createButton({
        buttonText: `Create a New Caravan`,
        useLi: false,
        callback: function(){
            dismissActiveModal(true);
            setTimeout(function(){
                createPartyCreationModal();
            },400);
        },
    }));

    modalContent.append(document.createElement("hr"));

    var instructionsB = document.createElement("h5");
    instructionsB.append('Or Choose a Pre-Loaded Caravan:');
    modalContent.append(instructionsB);

    Object.keys(trailGame.parties).sort().map(function(partyKey){
        partyObj = trailGame.parties[partyKey];

        var title = document.createElement("h3");
        modalContent.append(title);
        title.append(partyObj.title);

        var description = document.createElement("h6");
        modalContent.append(description);
        description.innerHTML = `${partyObj.description}`;

        modalContent.append(createButton({
            buttonText: `Play as ${partyObj.title}`,
            useLi: false,
            callback: function(){
                dismissActiveModal(true);
                setTimeout(function(){
                    createJourneyChoiceModal(partyKey);
                },400);
            },
        }));
    });

    return createModal({
        contentNode: modalContent,
        active: true,
    });
}

function createLeaderDisplay(argsObj){
    argsObj = argsObj || {};
    leader = argsObj.leader || generateLeader();
    argsObj.editable = argsObj.editable === true ? true : false;
    argsObj.showHealth = argsObj.showHealth === true ? true : false;
    argsObj.className = argsObj.className || ``;
    var leaderDisplay = document.createElement("li");
    leaderDisplay.className = `leader-display ${argsObj.className}`;

    var basics = document.createElement("div");
    basics.className = "leader-display_basics";

    var icon = document.createElement("span");
    icon.className = `leader-display_basics_icon icon ${toClassName(leader._raceName)} ${leader._mainClass}`;
    icon.append(`An icon of a ${leader._raceName} ${leader._mainClass}.`)
    basics.append(icon);

    var lockup = document.createElement("div");
    lockup.className = `leader-display_basics_lockup`;
    if(argsObj.editable){
        var nameField = document.createElement("input");
        nameField.className = `leader-display_basics_lockup_name-input`;
        nameField.value = leader._name;
        nameField.addEventListener('input', function(event){
            leader._name = this.value;
        });
        lockup.append(nameField);
    } else {
        var nameSpan = document.createElement("span");
        nameSpan.className = `leader-display_basics_lockup_name`;
        nameSpan.append(leader._name);
        lockup.append(nameSpan);
    }
    var nameSpan = document.createElement("span");
    nameSpan.className = `leader-display_basics_lockup_title`;
    nameSpan.append(`${leader._raceName} ${leader._title}`);
    lockup.append(nameSpan);
    var godSpan = document.createElement("span");
    godSpan.className = `leader-display_basics_lockup_worships`;
    godSpan.append(`Worships: ${leader._god}`);
    lockup.append(godSpan);
    basics.append(lockup);

    leaderDisplay.append(basics);

    var statDisplay = document.createElement("ul");
    statDisplay.className = 'leader-display_stats';
    var statsArray = argsObj.showHealth ? ['health'] : [];
    statsArray = statsArray.concat(['culture','wits','bravery']);
    for (var i = 0; i <= statsArray.length - 1; i++) {
        var statName = statsArray[i];
        var statValue = leader[`_${statName}`];
        var statLi = document.createElement("li");
        statLi.className = `leader-display_stats_stat-display ${statName}`;
        var label = document.createElement("span");
        label.className = `leader-display_stats_stat-display_label`;
        label.append(capitalizeFirstLetter(statName) + ':');
        statLi.append(label);
        var container = document.createElement("span");
        container.className = `leader-display_stats_stat-display_container`;
        var bar = document.createElement("span");
        bar.className = `leader-display_stats_stat-display_container_bar ${statName} ${zeroToTenString(statValue)}`;
        bar.append(statValue);
        container.append(bar);
        statLi.append(container);
        statDisplay.append(statLi);
    }
    leaderDisplay.append(statDisplay);

    var extraSections = ['sicknesses','immunities'];
    extraSections.map(function(objectName){
        var statObj = leader['_'+objectName];
        var keys = Object.keys(statObj);
        if (keys.length){
            var info = document.createElement("div");
            info.className = `leader-display_extra-info ${objectName}`;
            var label = document.createElement("span");
            label.append(`${capitalizeFirstLetter(objectName)}: `);
            info.append(label);
            info.append(capitalizeFirstLetter(sentenceForm(keys))+'.');
            leaderDisplay.append(info);
        }
    });

    return leaderDisplay;
}

function createPartyCreationModal(){
    var modalContent = createModalContentContainer();

    var headline = document.createElement("h2");
    headline.append('Create a New Caravan:');
    modalContent.append(headline);

    var instructionsA = document.createElement("h5");
    instructionsA.innerHTML = 'Add to your caravan from the leaders below.<br>You may edit their names after adding.'
    modalContent.append(instructionsA);

    var instructionsC = document.createElement("h4");
    instructionsC.innerHTML = 'Available Leaders:'
    modalContent.append(instructionsC);
    
    var leaderPool = document.createElement("ul");
    leaderPool.className = 'roster-display';
    modalContent.append(leaderPool);

    function addLeaderToPool(){
        var leader = generateLeader();
        var leaderButton = createLeaderDisplay({
            leader: leader,
            showHealth: false,
            className: 'button',
        });
        leaderButton.addEventListener('click',function(){
            leaderButton.parentNode.removeChild(leaderButton);
            moveLeaderToParty(leader); 
        })
        leaderPool.append(leaderButton);
    }

    modalContent.append(document.createElement("hr"));

    var instructionsD = document.createElement("h4");
    instructionsD.innerHTML = 'Your Caravan:'
    modalContent.append(instructionsD);

    var leaderRoster = [];
    trailGame.tempRoster = undefined;
    var rosterDisplay = document.createElement("ul");
    rosterDisplay.className = 'roster-display';
    modalContent.append(rosterDisplay);

    modalContent.append(document.createElement("hr"));
    var finishControls = document.createElement("ul");
    finishControls.className = 'controls';
    var finishButton = createButton({
        buttonText: "Let's Go!",
        buttonClassName: 'disabled',
        liClassName: 'full-width',
        callback: function(){
            trailGame.temp.roster = leaderRoster;
            dismissActiveModal();
            setTimeout(function(){
                createPartyConfirmModal();
            },400);
        }
    });
    finishControls.append(finishButton);
    modalContent.append(finishControls);

    function moveLeaderToParty(leader){
        leaderRoster.push(leader);
        rosterDisplay.prepend(createLeaderDisplay({leader: leader, editable: true, showHealth: false}));
        addLeaderToPool();
        finishButton.querySelector('button').classList.remove('disabled');
    }

    for (var i = 2; i >= 0; i--) {
        addLeaderToPool()
    }

    return createModal({
        contentNode: modalContent,
        active: true,
    });
}

function setBuyingOptions(){
    trailGame.temp.loanOptions = [
        generateLoan({level: getRandomInt(1,5)}),
        generateLoan({level: getRandomInt(6,10)}),
        generateLoan({level: getRandomInt(11,15)})
    ];

    var pachyderms = shuffle([...trailGame.pachyderms]);
    var pets = shuffle([...trailGame.pets]);
    var turtles = shuffle([...trailGame.turtles]);
    var goods = shuffle(Object.keys(trailGame.goodsClasses));
    delete goods[goods.indexOf('food')];

    trailGame.temp.shoppingCart = {};
    var store = [
        pachyderms[0],
        pachyderms[1],
        pachyderms[2],
        pets[0],
        pets[1],
        pets[2],
        turtles[0],
        turtles[1],
        turtles[2],
        goods[0],
        goods[1],
        goods[2],
        goods[3],
        goods[4],
        goods[5],
        'food'
    ];
    for (var i = store.length - 1; i >= 0; i--) {
        addToTrade(trailGame.temp.shoppingCart,0,store[i]);
    }
}

function createPartyConfirmModal(){
    var textNode = document.createElement("div");
    textNode.className = 'text-container';

    var headline = document.createElement("h2");
    headline.append('Your Caravan Leaders:');
    textNode.append(headline);

    var leaderList = [];
    trailGame.temp.roster.map(function(leader){
        leaderList.push(`- ${leader._name} the ${leader._raceName} ${leader._title}`);
    });
    textNode.append(textArrayToP(leaderList));

    var headlineB = document.createElement("h5");
    headlineB.append('Does this look correct?');
    textNode.append(headlineB);

    var buttons = [
        {
            buttonText: `Confirm`,
            callback: function(){
                dismissActiveModal(true);
                setBuyingOptions();
                setTimeout(function(){
                    createLoanChoiceModal();
                },400);
            }
        },{
            buttonText: `Start Over`,
            buttonClassName: 'warning',
            callback: function(){
                dismissActiveModal(true);
                setTimeout(function(){
                    createPartyCreationModal();
                },400);
            }
        }
    ];

    return createSimpleModal({textNode: textNode, buttons: buttons});
}

function createLoanChoiceModal(){
    var modalContent = createModalContentContainer();

    var headline = document.createElement("h2");
    headline.append('Take Out A Loan:');
    modalContent.append(headline);

    var instructionsA = document.createElement("h5");
    instructionsA.innerHTML = ('You need to get a loan from a relative to fund your expedition.<br>Loans accrue fixed interest that must be paid back upon arrival at your destination.');
    modalContent.append(instructionsA);

    trailGame.temp.loan = undefined;

    trailGame.temp.loanOptions.map(function(loan){
        var description = document.createElement("h6");
        modalContent.append(description);
        description.innerHTML = `${loan.giver} is willing to loan you up to ${loan.max} Silver at ${loan.interest}% interest.`;

        modalContent.append(createButton({
            buttonText: `${loan.max} at ${loan.interest}%`,
            useLi: false,
            callback: function(){
                dismissActiveModal(true);
                trailGame.temp.loan = loan;
                setTimeout(function(){
                    createShopModal();
                },400);
            },
        }));
    });

    return createModal({
        contentNode: modalContent
    });
}

function createTradeDisplay(argsObj){
    argsObj = argsObj || {};
    var trade = argsObj.trade || {};
    var loan = argsObj.loan || generateLoan(); // probably unecessary fail-safe
    argsObj.type = argsObj.type || 'shop';
    trade = argsObj.type === 'shop' ? trailGame.temp.shoppingCart : trade;
    loan = argsObj.type === 'shop' ? trailGame.temp.loan : loan;
    var isEditable = (['shop','overweight','proposal'].indexOf(argsObj.type) !== -1) // TODO fill in more types later
    debugTrade = trade // debug

    var tradeKeys = sortByTradeType(Object.keys(scrubTradeObj(trade)));
    var totalLeaders = argsObj.type === 'shop' ? trailGame.temp.roster.length : trailGame.leaders.length;

    var tradeDisplay = document.createElement("div");
    tradeDisplay.classList.add("trade-display");
    tradeDisplay.classList.add(argsObj.type);

    function updateTradeObject(event){
        var tradeKey = event.target.getAttribute('name');
        var max = 9999;
        if((['overweight','proposal'].indexOf(argsObj.type) !== -1)){
            if (tradeKey === 'food'){
                max = trailGame.caravan.food;
            } else {
                max = trailGame.goods[tradeKey] || trailGame.animals[tradeKey];
            }
        }
        if(event.target.value > max){
            event.target.value = max;
        }
        var itemObj = findItemFromKey(tradeKey);
        var value = argsObj.type === 'shop' ? itemObj.buy : itemObj.sell;
        setTradeValue(trade,event.target.value,tradeKey,value);
        updateTradeDisplay();
    }

    function updateTradeDisplay(updateAll){
        updateAll = updateAll === true ? true : false;
        if (updateAll){
           var inputs = tradeDisplay.querySelectorAll('input');
            for (var i = inputs.length - 1; i >= 0; i--) {
                var key = inputs[i].getAttribute('name');
                inputs[i].value = trade[key];
            } 
        }
        var overBudget = false;
        var overWeight = false;
        var errorMessage = ''
        var actualCapacityTotal = 0;
        switch (argsObj.type){
            case 'shop':
                actualCapacityTotal = trade.capacity + 10 * totalLeaders;
                overBudget = trade.actualValue > loan.max;
                overWeight = trade.weight > actualCapacityTotal;
                totalValue.innerHTML = trade.actualValue;
                tradeWeight.innerHTML = trade.weight;
                capacityMax.innerHTML = actualCapacityTotal;
            break;
            case 'overweight':
                actualCapacityTotal = getCaravanCapacity();
                overWeight = (getCaravanCarrying() - trade.weight) > actualCapacityTotal;
                totalValue.innerHTML = trade.actualValue;
                tradeWeight.innerHTML = (getCaravanCarrying() - trade.weight);
                capacityMax.innerHTML = actualCapacityTotal;
            break;
            case 'offer':
                totalValue.innerHTML = trade.actualValue;
                var netCapacity = (trade.capacity - trade.weight);
                tradeWeight.innerHTML = `${netCapacity > 0 ? '+':''}${netCapacity}`;
            break;
            case 'proposal':
                totalValue.innerHTML = trade.actualValue;
                var postWeight = (getCaravanCarrying() - trade.weight);
                var postCapacity = (getCaravanCapacity() - trade.capacity);
                overWeight = postWeight > postCapacity;
                tradeWeight.innerHTML = postWeight;
                capacityMax.innerHTML = postCapacity;
            break;
        }

        var hasAcceptButton = argsObj.acceptButton !== undefined;
        if (hasAcceptButton){
            var childButton = argsObj.acceptButton.querySelector('button') || document.createElement("button");
        }

        if(overBudget){
            valueDisplay.classList.add('over');
            errorMessage += 'Caravan is over-budget.';
        } else {
            valueDisplay.classList.remove('over');
        }

        if(overWeight && capacityDisplay !== undefined){
            capacityDisplay.classList.add('over');
            errorMessage += errorMessage === '' ? '' : ' ';
            errorMessage += 'Caravan is over-weight.';
        } else if (capacityDisplay !== undefined) {
            capacityDisplay.classList.remove('over');
        }

        errorDisplay.innerHTML = errorMessage;
        if (errorMessage.length){
            errorDisplay.classList.add('has-error');
        } else {
            errorDisplay.classList.remove('has-error');
        }

        var allowOverweight = (['proposal'].indexOf(argsObj.type) !== -1)

        if(( (overWeight && !allowOverweight) || overBudget) && hasAcceptButton){
            argsObj.acceptButton.classList.add('disabled');
            childButton.classList.add('disabled');
        } else if ( hasAcceptButton ){
            argsObj.acceptButton.classList.remove('disabled');
            childButton.classList.remove('disabled');
        }
    }

    function clearTrade(){
        zeroOutTradeValues(trade);
        updateTradeDisplay(true);
    }

    var itemList = document.createElement("ul");
    itemList.classList.add("trade-display_item-list");
    tradeDisplay.append(itemList);
    for (var i = 0; i <= tradeKeys.length - 1; i++) {
        var itemLi = document.createElement("li");
        itemLi.className = "trade-display_item-list_item";
        itemList.append(itemLi);

        var itemName = tradeKeys[i];
        var itemAmount = trade[itemName];
        var itemObj = findItemFromKey(itemName);

        var basics = document.createElement("div");
        if (isEditable){
            basics = document.createElement("label");
        }
        basics.className = "trade-display_item-list_item_basics";
        itemLi.append(basics);
        var basicsName = document.createElement("span");
        basicsName.className = "trade-display_item-list_item_basics_name";
        basicsName.append(toTitleCase(pluralize(itemName)) + ': ');
        basics.append(basicsName);
        if (isEditable){
            var amountInput = document.createElement("input");
            amountInput.className = "trade-display_item-list_item_basics_input-amount";
            amountInput.setAttribute('type','number');
            amountInput.setAttribute('min','0');
            amountInput.setAttribute('step','1');
            amountInput.setAttribute('name',itemName);
            amountInput.value = itemAmount;
            basics.append(amountInput);

            amountInput.addEventListener('input',updateTradeObject)
        } else {
            var amountSpan = document.createElement("span");
            amountSpan.className = "trade-display_item-list_item_basics_amount";
            amountSpan.append(itemAmount);
            basics.append(amountSpan);
        }

        var extras = document.createElement("ul");
        extras.className = "trade-display_item-list_item_extras";
        itemLi.append(extras);
        var extrasLegend = [
            ['sell','Value'],
            ['have','Have'],
            ['edible','Edible'],
            ['capacity','Carrying Capacity'],
            ['speed','Speed'],
            ['dexterity','Sure-Footedness'],
            ['ferocity', 'Ferocity'],
            ['hunger','Hunger'],
            ['meat','Meat'],
            ['shoes','Shoes Required'],
            ['pet','Adorable']
        ];
        if (argsObj.type === 'shop'){
            extrasLegend[1] = ['sell','Sell Value'];
            extrasLegend[1] = ['buy','Cost'];
        }
        var hasComplexInfo =  false;
        for (var j = 0; j <= extrasLegend.length - 1; j++) {
            var pair = extrasLegend[j];
            var value = null;
            if (pair[0] === 'have'){
                var isGood = findItemFromKey(itemName).goodsType !== undefined;
                value = isGood ? trailGame.goods[itemName] : trailGame.animals[itemName];
                value = value || 0;
            } else {
                value = itemObj[pair[0]];
            }
            if (value !== undefined){
                var extraItem = document.createElement("li");
                extraItem.className = "trade-display_item-list_item_extras_item";
                var outputString = '';
                if (typeof(value) === 'number'){
                    outputString = `${pair[1]}: ${value}`;
                } else if (value === true){
                   outputString = `${pair[1]}`;
                    
                }
                if (outputString !== '' && (['buy','sell','have'].indexOf(pair[0]) === -1)){
                    hasComplexInfo = true;
                }
                if (outputString !== ''){
                    extraItem.append(outputString);
                    extraItem.classList.add(pair[0]);
                    extras.append(extraItem);
                }
            }
        }
        if (hasComplexInfo){
            extras.classList.add('complex');
        }
    }
    var totals = document.createElement("div");
    totals.className = "trade-display_totals";
    tradeDisplay.append(totals);

    var valueDisplay = document.createElement("p");
    valueDisplay.className = "trade-display_totals_value-display";
    var valueLabelText = '';
    switch (argsObj.type){
        case 'shop':
            valueLabelText = 'Total Cost';
            break;
        case 'offer':
            valueLabelText = 'Offer Value';
            break;
        case 'proposal':
            valueLabelText = 'Proposal Value';
            break;
        case 'overweight':
            valueLabelText = 'Value of Dropped Goods';
            break;
        default:
            valueLabelText = 'Total Value'; 
    }
    valueDisplay.append(valueLabelText + ': ');
    totals.append(valueDisplay);
    var totalValue = document.createElement("span");
    totalValue.className = "trade-display_totals_value-display_total-value";
    var loanMax = document.createElement("span");
    loanMax.className = "trade-display_totals_value-display_loan-max";
    if (['shop','overweight','offer','proposal'].indexOf(argsObj.type) !== -1){
        valueDisplay.append(totalValue);
        totalValue.append(trade.actualValue);
    }
    if (['shop'].indexOf(argsObj.type) !== -1){
        valueDisplay.append('/');
        valueDisplay.append(loanMax);
        loanMax.append(loan.max);
    }
    valueDisplay.append(' silver');
    var showCapacity = (['shop','overweight','offer','proposal'].indexOf(argsObj.type) !== -1)
    if (showCapacity){
        var capacityDisplay = document.createElement("p");
        capacityDisplay.className = "trade-display_totals_capacity-display";
        var capacityLabelText = 'Caravan Capacity';
        var capacityLabelText = '';
        switch (argsObj.type){
            case 'shop':
            case 'overweight':
            case 'proposal':
                capacityLabelText = 'Caravan Capacity';
                break;
            case 'offer':
                capacityLabelText = 'Net Capacity Change';
                break;
            default:
                capacityLabelText = 'Capacity'; 
        }
        capacityDisplay.append(capacityLabelText + ': ');
        totals.append(capacityDisplay);
        var tradeWeight = document.createElement("span");
        tradeWeight.className = "trade-display_totals_capacity-display_weight";
        var capacityMax = document.createElement("span");
        capacityMax.className = "trade-display_totals_capacity-display_max";
        capacityDisplay.append(tradeWeight);
        if (['shop','proposal'].indexOf(argsObj.type) !== -1){
            capacityDisplay.append('/');
            capacityDisplay.append(capacityMax);
        } 
    }
    var errorDisplay = document.createElement("p");
    errorDisplay.className = "trade-display_totals_error-display";
    if(['shop','overweight','proposal'].indexOf(argsObj.type) !== -1){
        totals.append(errorDisplay);
    }
    updateTradeDisplay(true);

    if (argsObj.clearButton !== undefined){
        argsObj.clearButton.addEventListener('click',clearTrade);
    }

    return tradeDisplay;
}

function createShopModal(){
    var modalContent = createModalContentContainer();

    var headline = document.createElement("h2");
    headline.append('Purchase Supplies:');
    modalContent.append(headline);

    var instructionsA = document.createElement("h5");
    instructionsA.innerHTML = (`You need to use your loan to purchase supplies.<br>You'll need pachyderms to carry goods, goods and/or other animals to bring to sell, and most importantly, you need food!`);
    modalContent.append(instructionsA);

    var confirmButton = createButton({
        useLi: true,
        liClassName: 'full-width',
        buttonText: `Confirm Purchase`,
        callback: function(event){
            if (!event.target.classList.contains('disabled')){
                dismissActiveModal(true);
                setTimeout(function(){
                    createShopConfirmModal();
                },400);
            }
        },
    });

    var clearButton = createButton({
        useLi: true,
        liClassName: 'full-width',
        buttonText: `Clear Cart`,
        buttonClassName: 'warning',
        callback: function(event){
            //zeroOutTradeValues(trailGame.temp.shoppingCart);
        },
    });

    var tradeDisplay = createTradeDisplay({
        trade: zeroOutTradeValues(trailGame.temp.shoppingCart), 
        type: 'shop', 
        acceptButton: confirmButton,
        clearButton: clearButton
    });
    modalContent.append(tradeDisplay);

    modalContent.append(createControlsUl([confirmButton,clearButton]));

    return createModal({
        contentNode: modalContent
    });
}

function createShopConfirmModal(){
    var textNode = document.createElement("div");
    textNode.className = 'text-container';

    var headlineA = document.createElement("h2");
    headlineA.append('You Spent:');
    textNode.append(headlineA);

    textNode.append(textArrayToP([`${trailGame.temp.shoppingCart.actualValue} Silver at ${trailGame.temp.loan.interest}% interest`]));

    var headlineB = document.createElement("h2");
    headlineB.append('To Buy:');
    textNode.append(headlineB);
    var shoppingList = [];
    Object.keys(scrubTradeObj(trailGame.temp.shoppingCart)).map(function(key){
        var value = trailGame.temp.shoppingCart[key];
        if (value > 0){
            shoppingList.push(`- ${value} ${toTitleCase(pluralize(key))}`);
        }
    });
    if (!shoppingList.length){
        shoppingList.push(`- Nothing (It's your funeral, pal.)`);
    }
    textNode.append(textArrayToP(shoppingList));

    var headlineC = document.createElement("h5");
    headlineC.append('Does this look correct?');
    textNode.append(headlineC);

    var buttons = [
        {
            buttonText: `Confirm`,
            callback: function(){
                dismissActiveModal(true);
                setTimeout(function(){
                    createJourneyChoiceModal();
                },400);
            }
        },
        {
            buttonText: `Go Back to Loans`,
            buttonClassName: 'warning',
            callback: function(){
                dismissActiveModal(true);
                setTimeout(function(){
                    createLoanChoiceModal();
                },400);
            }
        },{
            buttonText: `Start Over`,
            buttonClassName: 'warning',
            callback: function(){
                dismissActiveModal(true);
                setTimeout(function(){
                    createPartyCreationModal();
                },400);
            }
        }
    ];

    return createSimpleModal({textNode: textNode, buttons: buttons});
}

function createJourneyChoiceModal(partyName){
    var modalContent = createModalContentContainer();

    var headline = document.createElement("h2");
    headline.append('Choose Your Destination:');
    modalContent.append(headline);

    Object.keys(trailGame.levels).sort().map(function(levelKey){
        levelObj = trailGame.levels[levelKey];

        var title = document.createElement("h3");
        modalContent.append(title);
        title.append(levelObj.title);

        var description = document.createElement("h5");
        modalContent.append(description);
        description.innerHTML = `${levelObj.description}`;

        modalContent.append(createButton({
            buttonText: `Set Out For ${levelObj.title}`,
            useLi: false,
            callback: function(){
                dismissActiveModal(true);
                newJourney(levelKey);
                setTimeout(function(){
                    registerParty(partyName);
                    runNextCard();
                },400);
            },
        }));
    });

    return createModal({
        contentNode: modalContent,
        active: true,
    });
}

function createCrossroadsModal(lines){
    var modalArgs = {
        active: true,
        modalId: 'crossroads',
        textNode : textArrayToP(lines),
        buttons: [],
    };
    trailGame.journey.currentLeg.exits.map(function(exitObj){
        var buttonArgs = {
            buttonText: toTitleCase(exitObj.title),
            callback: function(){
                dismissActiveModal();
                runAndLogEvent(eventResolveCrossroads,exitObj,true);
            }
        };
        modalArgs.buttons.push(buttonArgs);
    });
    modalArgs.buttons.push({ buttonText: 'Let Fate Decide', callback: function(){
        dismissActiveModal(true);
        runAndLogEvent(eventResolveCrossroads,undefined,true);
    }});

    return createSimpleModal(modalArgs);
}

function createGameOverModal(lines){
    var modalArgs = {
        active: true,
        modalId: 'game-over',
        textNode : textArrayToP(lines),
        buttons: [{
            buttonText: 'Alas!', callback: function(){
                switchToResetButton();
                dismissActiveModal(true);
            }
        }],
    };
    return createSimpleModal(modalArgs);
}

function createOverweightModal(funct,args,dayIsResolution){
    var modalContent = createModalContentContainer();

    var amountOverweight = getCaravanCarrying() - getCaravanCapacity();
    var unit = 'unit';

    var headline = document.createElement("h2");
    headline.append(`Our caravan is overweight!`);
    modalContent.append(headline);

    var instructionsA = document.createElement("h5");
    instructionsA.innerHTML = (`We are ${amountOverweight} ${amountOverweight > 1 ? pluralize(unit) : unit} overweight.<br>We need to drop some items before we can continue.`);
    modalContent.append(instructionsA);

    var dropTrade = getDropGoodsTrade();

    var confirmButton = createButton({
        useLi: true,
        liClassName: 'full-width',
        buttonText: `Drop These Items`,
        callback: function(event){
            if (!event.target.classList.contains('disabled')){
                dismissActiveModal(true);
                setTimeout(function(){
                    dropItemsAndLog(dropTrade);
                    runAndLogEvent(funct,args,dayIsResolution);
                },400);
            }
        },
    });

    var clearButton = createButton({
        useLi: true,
        liClassName: 'full-width',
        buttonText: `Clear Selection`,
        buttonClassName: 'warning',
        callback: function(event){
        },
    });

    var tradeDisplay = createTradeDisplay({
        trade: dropTrade, 
        type: 'overweight', 
        acceptButton: confirmButton,
        clearButton: clearButton
    });
    modalContent.append(tradeDisplay);
    modalContent.append(createControlsUl([confirmButton,clearButton]));

    return createModal({
        contentNode: modalContent
    });
}

function createTradeModal(argsObj,lines){
    argsObj = argsObj || {};
    lines = lines || ['Debug line 1...','Debug line 2...','Debug line 3...'];
    var modalContent = createModalContentContainer();

    var merchantName = argsObj.merchantName || 'The merchant';
    var offer = argsObj.offer || getTradeOffer();

    modalContent.append(textArrayToP(lines));
    var instructionsA = document.createElement("h5");
    instructionsA.innerHTML = (`${merchantName} is interested in trading us ${sentenceForm(scrubTradeObj(offer))}.`);
    modalContent.append(instructionsA);

    var offerDisplay = createTradeDisplay({
        trade: offer, 
        type: 'offer'
    });
    modalContent.append(offerDisplay);

    var leader = argsObj.leader || getRandomLeader()
    var proposal = argsObj.proposal || getTradeProposal({leader: leader});
    var proposalText = `${leader._name} proposes we give ${sentenceForm(scrubTradeObj(removeZerosFromTrade(proposal)))} in exchange.`;
    modalContent.append(textArrayToP([proposalText]));
    var instructionsB = document.createElement("h5");
    instructionsB.innerHTML = (`Select what to add or remove to this proposal, or refuse this trade entirely.`);
    modalContent.append(instructionsB);

    var confirmButton = createButton({
        useLi: true,
        liClassName: 'full-width',
        buttonText: `Attempt This Trade`,
        callback: function(event){
            dismissActiveModal(true);
            setTimeout(function(){
                
            },400);
        },
    });

    var clearButton = createButton({
        useLi: true,
        liClassName: 'full-width',
        buttonText: `Clear Selection`,
        buttonClassName: 'warning',
        callback: function(event){
        },
    });

    var refuseButton = createButton({
        useLi: true,
        liClassName: 'full-width',
        buttonText: `Politely Refuse This Trade`,
        buttonClassName: 'warning',
        callback: function(event){
            dismissActiveModal(true);
            setTimeout(function(){
                
            },400);
        },
    });

    var proposalDisplay = createTradeDisplay({
        trade: proposal, 
        type: 'proposal', 
        acceptButton: confirmButton,
        clearButton: clearButton,
    });
    modalContent.append(proposalDisplay);
    modalContent.append(createControlsUl([confirmButton,clearButton,refuseButton]));

    return createModal({
        contentNode: modalContent
    });
}

function createGameWinModal(lines,success){
    var buttonText = success ? generateExclamation() : shuffle(['Drat!','Curses!',`Sigh...`])[0];
    var modalArgs = {
        active: true,
        modalId: 'game-win',
        textNode : textArrayToP(lines),
        buttons: [{
            buttonText: buttonText, callback: function(){
                switchToResetButton();
                dismissActiveModal(true);
            }
        }],
    };
    return createSimpleModal(modalArgs);
}

function runFuncIfControlsEnabled(functionName,args){
    if (!trailGame.UI.isControlsDisabled){
        functionName(args);
    }
}

function continueButtonHandler(){
    runFuncIfControlsEnabled(runNextCard);
}

function resetButtonHandler(){
    runFuncIfControlsEnabled(setUpNewGame);
}

function setUpMainControls(){
    trailGame.UI.isControlsDisabled = false;
    trailGame.UI.continueButton = document.body.querySelector('button#continue');
    trailGame.UI.continueButton.innerHTML = '<span>Continue</span>';
    trailGame.UI.continueButton.addEventListener("click",continueButtonHandler);
    enableMainControls();
}

function disableMainControls(){
    trailGame.UI.isControlsDisabled = true;
    var buttonArray = [...document.body.querySelectorAll('#main-controls button')];
    buttonArray.map(function(buttonNode){
        buttonNode.classList.add('disabled');
    });
}

function enableMainControls(){
    trailGame.UI.isControlsDisabled = false;
    var buttonArray = [...document.body.querySelectorAll('#main-controls button')];
    buttonArray.map(function(buttonNode){
        buttonNode.classList.remove('disabled');
    });
}

function switchToResetButton(){
    trailGame.UI.continueButton.innerHTML = 'Reset Game';
    trailGame.UI.continueButton.removeEventListener("click",continueButtonHandler);
    trailGame.UI.continueButton.addEventListener("click",resetButtonHandler);
}

function setUpNewGame(){
    clearLog();
    newCaravan();
    setUpMainControls();
    createPartyChoiceModal();
}

function toggleFont(){
    var body = document.querySelector('body');
    if (body.classList.contains('thematic')){
        body.classList.remove('thematic');
        body.classList.add('sans-serif');
    } else {
        body.classList.add('thematic');
        body.classList.remove('sans-serif');
    }
}

// debug functions

function testModal(){
    createSimpleModal({
        active: true,
        modalId: 'test',
        textNode : textArrayToP(['Zombies reversus ab inferno, nam malum cerebro. De carne animata corpora quaeritis. Summus sit​​, morbo vel maleficia? De Apocalypsi undead dictum mauris. Hi mortuis soulless creaturas, imo monstra adventus vultus comedat cerebella viventium. Qui offenderit rapto, terribilem incessu. The voodoo sacerdos suscitat mortuos comedere carnem. Search for solum oculi eorum defunctis cerebro. Nescio an Undead zombies. Sicut malus movie horror.']),
        buttons: [
            { buttonText: 'Test1', callback: dismissActiveModal },
            { buttonText: 'Test2', callback: dismissActiveModal }
        ],
    });
}

// needs to be rebuilt!

// function cliEvent(functionName,argsObj){
//     if ( Object.keys(trailGame.leaders).length <= 0 ){
//         console.log('NEW CARAVAN\n----');
//         functionName = 'loadUp';
//     }
//     var dayLines = dayPhase(functionName,argsObj);
//     console.log(listForm(dayLines.events));
//     if (dayLines.ledger.length){
//         console.log( listForm(dayLines.ledger) );
//     }
//     console.log("---");
//     var nightLines = nightPhase();
//     if (nightLines.events.length){
//         console.log( listForm(nightLines.events) );
//     }
//     if (nightLines.ledger.length){
//         console.log( listForm(nightLines.ledger) );
//     }
// }

function killAll(){
    Object.keys(trailGame.leaders).map(function(id,index){
        removeLeader(id);
    });
    return ['Everyone died somehow.']
}

function addRandomLeader(){
    //var subClassName = generateSubClass();
    //var leaderName = generateName();
    addLeader();
}

function killRandomLeader(){
    var leaders = Object.keys(trailGame.leaders);
    var gonnaDie = shuffle(leaders).shift();
    removeLeader(gonnaDie);
}

function addRandomPachyderms(){
    var animalClassName = shuffle(trailGame.pachyderms)[0];
    var number = getRandomInt(1,5);
    addAnimals(animalClassName,number);
}

function addRandomAnimals(){
    var animalClasses = Object.keys(trailGame.animalClasses);
    shuffle(animalClasses);
    var animalClassName = animalClasses[0];
    var number = getRandomInt(1,10);
    addAnimals(animalClassName,number);
}

function addRandomGoods(){
    var goodsClasses = Object.keys(trailGame.goodsClasses);
    shuffle(goodsClasses);
    var goodsClasses = goodsClasses[0];
    var number = getRandomInt(1,100);
    addGoods(goodsClasses,number);
}

// twitter flexes

function log100Names(argsObj){
    var array = [];
    for (var i = 100; i >= 0; i--) {
        array.push(generateName(argsObj));
    }
    addTextArrayToLog(array);
}

function log100Books(argsObj){
    var array = [];
    for (var i = 100; i >= 0; i--) {
        array.push('- ' + generateBookLine(argsObj));
    }
    addTextArrayToLog(array);
}

function log100Inns(argsObj){
    var array = [];
    for (var i = 100; i >= 0; i--) {
        addTextArrayToLog([generateInnDesc(argsObj)]);
    }
}

// bitsy I/O functions

function getThreeJobs(){
    var subClasses = Object.keys(trailGame.characterClasses.subClasses);
    shuffle(subClasses);
    bitsySet('job_1',toTitleCase(subClasses[0]));
    bitsySet('job_2',toTitleCase(subClasses[1]));
    bitsySet('job_3',toTitleCase(subClasses[2]));
}

function getTwoLoans(level1,level2){
    trailGame.temp.loan1 = generateLoan({level: level1});
    trailGame.temp.loan2 = generateLoan({level: level2});
    bitsySet('loan_1_max',trailGame.temp.loan1.max);
    bitsySet('loan_1_giver',trailGame.temp.loan1.giver);
    bitsySet('loan_1_interest',trailGame.temp.loan1.interest);
    bitsySet('loan_2_max',trailGame.temp.loan2.max);
    bitsySet('loan_2_giver',trailGame.temp.loan2.giver);
    bitsySet('loan_2_interest',trailGame.temp.loan2.interest);
}

function confirmLoan(num){
    num = num === 2 ? 2:1;
    var loan = {}
    if ( num===2){
        var loan = trailGame.temp.loan2;
    } else {
        var loan = trailGame.temp.loan1;
    }
    return signLoan(loan);
}

function setupShop(){
    clearCart();
    var pachyderms = shuffle([...trailGame.pachyderms]);
    var nonPachyderms = shuffle([...trailGame.nonPachyderms]);
    var goods = shuffle(Object.keys(trailGame.goodsClasses));
    delete goods[goods.indexOf('food')];
    trailGame.temp.pac1 = trailGame.temp.pac1 || generateAnimal(pachyderms[0]);
    trailGame.temp.pac2 = trailGame.temp.pac2 || generateAnimal(pachyderms[1]);
    trailGame.temp.shopA = trailGame.temp.shopA || generateGood(goods[0]);
    trailGame.temp.shopB = trailGame.temp.shopB || generateGood(goods[1]);
    trailGame.temp.shopC = trailGame.temp.shopC || generateGood(goods[2]);
    trailGame.temp.shopD = trailGame.temp.shopD || generateAnimal(nonPachyderms[0]);
    trailGame.temp.shopE = trailGame.temp.shopE || generateAnimal(nonPachyderms[1]);
    trailGame.temp.food = trailGame.temp.food || generateGood('food');
}

function getAnimalInfo(animalObj){
    return [ `${toTitleCase(pluralize(animalObj.animalClass))}`,
        `Cost: ${animalObj.buy} silver ea.`,
        `${animalObj.capacity} capacity - ${animalObj.speed} speed - ${animalObj.ferocity} ferocity`,
        `End value: ${animalObj.sell} silver ea.`];
}

function getGoodsInfo(goodsObj){
    return [`${toTitleCase(pluralize(goodsObj.goodsType))}`,
        `Cost: ${goodsObj.buy} silver ea.`,
        `End value: ${goodsObj.sell} silver ea.`]; 
}

function clearCart(){
   trailGame.temp.cart = {actualValue:0};
   return trailGame.temp.cart;
}

function nowHaveMessage(key,value){
    var tempObj = {};
    tempObj[key] = value;
    return `You now have ${sentenceForm(tempObj)}.`;
}

function addToCart(key,number){
    trailGame.temp.cart = trailGame.temp.cart || clearCart();
    var item = findItemFromKey(key);
    addToTrade(trailGame.temp.cart,number,key,item.buy);
    if (trailGame.temp.cart.actualValue > trailGame.caravan.loan.max){
        removeFromTrade(trailGame.temp.cart,number,key,item.buy);
        return `You can't afford to buy ${number} ${toTitleCase(pluralize(key))}!`
    } else if ( item.goodsType !== undefined && getCartCarrying() > getCartCapacity()) {
        removeFromTrade(trailGame.temp.cart,number,key,item.buy);
        return `You can't carry ${number} ${toTitleCase(pluralize(key))}!`;
    } else {
        return nowHaveMessage(key,trailGame.temp.cart[key]);
    }
}

function removeFromCart(key,number){
    trailGame.temp.cart = trailGame.temp.cart || {};
    var item = findItemFromKey(key);
    removeFromTrade(trailGame.temp.cart,number,key,item.buy);
    var value = trailGame.temp.cart[key] || 0;
    return nowHaveMessage(key,value);
}

function toggleVegetarian(){
    trailGame.caravan.isVegetarian = trailGame.caravan.isVegetarian === true ? false : true;
    var is = trailGame.caravan.isVegetarian ? '' : 'non-';
    var will = trailGame.caravan.isVegetarian ? ' not' : '';
    return [`Our caravan is now ${is}vegetarian.`,`We will${will} eat our animals if we are starving.`];
}

function toggleRations(){
    trailGame.caravan.rations++;
    trailGame.caravan.rations = trailGame.caravan.rations >= 4 ? 1: trailGame.caravan.rations;
    var descriptor = ['meager','adequate','filling'][trailGame.caravan.rations - 1];
    return [`Our rations are now ${descriptor}.`,`Each leader will eat ${trailGame.caravan.rations} food every night.`];
}

function getCartCarrying(){
    var carrying = 0;
    Object.keys(trailGame.temp.cart).map(function(key,index){
        var good = findItemFromKey(key);
        carrying += good.goodsType !== undefined ? trailGame.temp.cart[key] : 0;
    });
    return carrying;
}

function getCartCapacity(){
    var capacity = 0;
    Object.keys(trailGame.temp.cart).map(function(key,index){
        var animal = findItemFromKey(key);
        capacity += animal.animalClass !== undefined ? animal.capacity * trailGame.temp.cart[key] : 0;
    });
    capacity += 5 * Object.keys(trailGame.leaders).length;
    return capacity;
}

function getShoppingStatus(){
    return  [`Carrying ${getCartCarrying()} out of ${getCartCapacity()} total capacity.`,
        `${trailGame.temp.cart.actualValue} silver spent out of ${trailGame.caravan.loan.max}.`];
}

function getCartList(){
    var receipt = sentenceForm(scrubTradeObj(trailGame.temp.cart));
    return `You decide to purchase ${receipt} for ${trailGame.temp.cart.actualValue} silver.`;
}

setUpNewGame();
