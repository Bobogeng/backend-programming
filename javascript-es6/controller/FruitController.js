const fruits = require("../utils/fruits.js");

const index = () => {
    for (const fruit of fruits) {
        console.log(fruit);
    }
};

const store = (name) => {
    fruits.push(name);
    console.log(`Method store - Menambahkan buah ${name}`);
    index();
};

const update = (position, name) => {
    fruits[position] = name;
    console.log(`Method update - Update data ${position} menjadi ${name}`);
    index();
};

const destroy = (position) => {
    const value = fruits.indexOf(fruits[position]);
    if (value > -1) {
        fruits.splice(value, 1);
    }
    console.log(`Method destroy - Menghapus data ${position}`);
    index();
};

module.exports = { index, store, update, destroy };
