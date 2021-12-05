const game = document.querySelector('.gameGrid');
const grassInventory = document.querySelector('.inventory .grass');
const rockInventory = document.querySelector('.inventory .rock');
const landInventory = document.querySelector('.inventory .land');
const leavesInventory = document.querySelector('.inventory .leaves');
const woodInventory = document.querySelector('.inventory .wood');
const axe = document.querySelector('.axe');
const picaxe = document.querySelector('.picaxe');
const shovel = document.querySelector('.shovel');
const resetButton = document.querySelector('.resetButton');
const startButton = document.querySelector('.startButton');
const startScreen = document.querySelector('.startScreen');
const instructionScreen = document.querySelector('.instruction');
const instructionsButton = document.querySelector('.instructionsButton');
const inventory = {};
const collectedObj = {};
let material, currentTool, currentMaterial;

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    game.style.visibility = 'visible'

})

const materialsAndTools = {
    'axe': ['leaves', 'wood'],
    'picaxe': ['rock'],
    'shovel': ['land', 'grass']
}

const gameBoardGrid = (terrain, rowStart = 1, rowEnd = 20, columnStart = 1, columnEnd = 25) => {
    for (let row = rowStart; row <= rowEnd; row++) {
        for (let column = columnStart; column <= columnEnd; column++) {
            collectedObj[`${row}.${column}`].classList.add(terrain);
        }
    }
}

const landDraw = (length = 25) => {
    gameBoardGrid('grass', 14, 14, 1, length)
    gameBoardGrid('land', 15, 20, 1, length);


}

const cloudDraw = () => {
    gameBoardGrid('cloud', 5, 5, 7, 14);
    gameBoardGrid('cloud', 4, 4, 8, 11);
    gameBoardGrid('cloud', 4, 4, 13, 14);
    gameBoardGrid('cloud', 3, 3, 10, 10);
    gameBoardGrid('cloud', 6, 6, 10, 11);
}

const treeDraw = (x = 20) => {
    gameBoardGrid('wood', 10, 13, x, x);
    gameBoardGrid('leaves', 7, 9, x - 1, x + 1);
}

const rockDraw = (x) => {
    gameBoardGrid('rock', 13, 13, x, x);
}

const grassDraw = (x = 5) => {
    gameBoardGrid('leaves', 13, 13, x, x + 2);
    gameBoardGrid('leaves', 12, 12, x + 1, x + 1);
}

const gameMapDrawer = () => {
    landDraw();
    treeDraw();
    treeDraw(16);
    rockDraw(13);
    rockDraw(12);
    rockDraw(25);
    grassDraw();
    cloudDraw();
}

const resetGame = (columnEnd = 25) => {
    for (let row = 1; row <= 13; row++) {
        for (let column = 1; column <= columnEnd; column++) {
            collectedObj[`${row}.${column}`].classList[1] &&
                collectedObj[`${row}.${column}`].classList.remove(`${collectedObj[`${row}.${column}`].classList[1]}`);
        }
    }
    landDraw();
}

// collect the specific material on the target position 
const collectMaterial = (e) => {
    material = e.target.classList[1];

    let [row, column] = [e.target.style.gridRow.slice(0, -6) - 1,
    parseInt(e.target.style.gridColumn.slice(0, -7))];
    if (collectedObj[`${row}.${column}`].classList.length == 1
        || collectedObj[`${row + 1}.${column + 1}`].classList.length == 1
        || collectedObj[`${row + 1}.${column - 1}`].classList.length == 1
        || collectedObj[`${row + 2}.${column}`].classList.length == 1) {
        if (materialsAndTools[tool].includes(material)) {
            inventory[material] ? inventory[material] += 1 : inventory[material] = 1;
            e.target.classList.remove(material);
            updateInventory()
        } else wrongChoice(e);
    } else wrongChoice(e);
}

// update collected inventory ammount and save it as an object
const updateInventory = () => {
    for (let [material, amount] of Object.entries(inventory)) {
        switch (material) {
            case 'grass':
                grassInventory.innerHTML = `<p>${amount}</p>`;
                break;
            case 'rock':
                rockInventory.innerHTML = `<p>${amount}</p>`;
                break;
            case 'land':
                landInventory.innerHTML = `<p>${amount}</p>`;
                break;
            case 'leaves':
                leavesInventory.innerHTML = `<p>${amount}</p>`;
                break;
            case 'wood':
                woodInventory.innerHTML = `<p>${amount}</p>`;
                break;
        }
    }
}

const rebuildMaterials = (e) => {
    if (inventory[material]) {
        if (e.target.classList.length == 1) {
            e.target.classList.add(material)
            inventory[material] -= 1;
            updateInventory();
        }
    }
}

const wrongChoice = (e) => {
    e.target.style.border = '1px solid red';
    setTimeout(() => {
        e.target.style.border = 'none';
    }, 50);
}

const removeOtherEventListeners = () => {
    game.removeEventListener('click', collectMaterial)
    game.removeEventListener('click', rebuildMaterials)
}

const toolsBackround = () => {
    axe.classList.contains('red') && axe.classList.remove('red');
    axe.classList.contains('blue') && axe.classList.remove('blue');
    picaxe.classList.contains('red') && picaxe.classList.remove('red');
    picaxe.classList.contains('blue') && picaxe.classList.remove('blue');
    shovel.classList.contains('red') && shovel.classList.remove('red');
    shovel.classList.contains('blue') && shovel.classList.remove('blue');
}

let numberOfBoxes = 0;

const gameCreator = (rowStart = 1, rowEnd = 20, columnStart = 1, columnEnd = 25) => {
    for (let row = rowStart; row <= rowEnd; row++) {
        for (let column = columnStart; column <= columnEnd; column++) {
            let sky = document.createElement('div');
            sky.classList.add('sky');
            game.appendChild(sky);
            sky.style.gridRow = row;
            sky.style.gridColumn = column;
            collectedObj[`${row}.${column}`] = sky;
            numberOfBoxes++;
        }
    }
}

const inventoryReset = () => {
    for (let material of Object.keys(inventory)) {
        inventory[material] = 0;
    }
    updateInventory();
}

axe.addEventListener('click', (e) => {
    tool = 'axe';
    removeOtherEventListeners();
    toolsBackround();
    e.currentTarget.classList.add('blue')
    game.addEventListener('click', collectMaterial);
})


shovel.addEventListener('click', (e) => {
    tool = 'shovel';
    removeOtherEventListeners()
    toolsBackround();
    e.currentTarget.classList.add('blue')
    game.addEventListener('click', collectMaterial)
})

picaxe.addEventListener('click', (e) => {
    tool = 'picaxe'
    removeOtherEventListeners()
    toolsBackround();
    e.currentTarget.classList.add('blue');
    game.addEventListener('click', collectMaterial);
})


woodInventory.addEventListener('click', (event) => {
    removeOtherEventListeners()
    material = 'wood';
    toolsBackround();
    woodInventory.style.opacity = 1;
    game.addEventListener('click', rebuildMaterials);
})

grassInventory.addEventListener('click', (event) => {
    removeOtherEventListeners()
    material = 'grass';
    toolsBackround();
    grassInventory.style.opacity = 1;
    game.addEventListener('click', rebuildMaterials);
})



rockInventory.addEventListener('click', () => {
    removeOtherEventListeners()
    material = 'rock';
    toolsBackround();
    rockInventory.style.opacity = 1;
    game.addEventListener('click', rebuildMaterials);
})

landInventory.addEventListener('click', () => {
    removeOtherEventListeners()
    material = 'land';
    toolsBackround();
    landInventory.style.opacity = 1;
    game.addEventListener('click', rebuildMaterials);
})

leavesInventory.addEventListener('click', () => {
    removeOtherEventListeners()
    material = 'leaves';
    toolsBackround();
    leavesInventory.style.opacity = 1;
    game.addEventListener('click', rebuildMaterials);
})

resetButton.addEventListener('click', () => {
    inventoryReset()
    updateInventory();
    resetGame();
    gameMapDrawer();

})

instructionsButton.addEventListener('mouseover', () => {
    instructionScreen.style.visibility = 'visible'
})

instructionsButton.addEventListener('mouseout', () => {
    instructionScreen.style.visibility = 'hidden'
})

gameCreator();
gameMapDrawer();
