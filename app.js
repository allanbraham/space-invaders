



const world = document.querySelector('#gameBoard');
world.style.width = '80%';
world.style.height = '400px';
let frames = 0;

class Alien {
    constructor({position}) {
        this.position = position;
        this.imgElement = new Image();
        this.imgElement.src = './images/alien.png';
        this.imgElement.classList.add('alien');
        this.imgElement.style.position = 'absolute';
        this.imgElement.style.left = `${this.position.x}px`;
        this.imgElement.style.top = `${this.position.y}px`;
        this.imgElement.style.width = '30px';
        this.imgElement.style.height = '30px';
        world.appendChild(this.imgElement);
        this.velocity = { x: 1, y: 0 }; // Définir une vélocité initiale horizontale
    }

    miseAJour() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + 30 >= world.clientHeight || this.position.y <= 0) {
            this.velocity.y = -this.velocity.y; // Inverser la vélocité sur l'axe Y lorsque l'alien touche le bord
            this.position.y += this.velocity.y; // Ajuster la position pour éviter de rester collé au bord
            this.position.x += 32 * this.velocity.x; // Descendre de 32 pixels sur l'axe X
            this.velocity.x = -this.velocity.x; // Inverser la direction sur l'axe X
        }

        if (this.position.x <= 0 || this.position.x + 30 >= world.clientWidth) {
            this.velocity.x = -this.velocity.x; // Inverser la vélocité sur l'axe X lorsque l'alien touche le bord
        }

        this.position.x = Math.max(0, Math.min(this.position.x, world.clientWidth - 30));
        this.position.y = Math.max(0, Math.min(this.position.y, world.clientHeight - 30));
        this.imgElement.style.left = `${this.position.x}px`;
        this.imgElement.style.top = `${this.position.y}px`;
    }
}

class Grid {
    constructor() {
        this.invaders = [];
        const rows = 5;
        const columns = 10;
        const alienWidth = 30;
        const alienHeight = 30;
        const horizontalSpacing = 2;
        const verticalSpacing = 2;
        const gridWidth = columns * (alienWidth + horizontalSpacing) - horizontalSpacing;
        const gridHeight = rows * (alienHeight + verticalSpacing) - verticalSpacing;
        const startX = 2;
        const startY = 2;
        let x = startX;
        let y = startY;
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                this.invaders.push(new Alien({
                    position: {
                        x: x,
                        y: y
                    }
                }));
                y += alienHeight + verticalSpacing;
            }
            x += alienWidth + horizontalSpacing;
            y = startY;
        }
    }

    miseAJour() {
        const minX = Math.min(...this.invaders.map(invader => invader.position.x));
        const maxX = Math.max(...this.invaders.map(invader => invader.position.x));
        this.invaders.forEach((invader) => {
            invader.miseAJour();
        });
        if (minX <= 0 || maxX + 30 >= world.clientWidth) {
            this.invaders.forEach((invader) => {
                invader.position.y += 32; // Faire descendre de 32 pixels
            });
        }
    }
}

const grids = [new Grid()];
console.log(grids);
const boucleAnimation = () => {
    grids.forEach((grid) => {
        grid.miseAJour();
    });
    requestAnimationFrame(boucleAnimation);
    frames++;
};
boucleAnimation();












