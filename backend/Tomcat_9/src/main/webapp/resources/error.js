let background = document.querySelector('.background');
let astronaut = document.querySelector('.astronaut');
function stars() {
    let newStar = document.createElement('span');
    newStar.className = 'star';
    newStar.style.top = Math.random() * 100 + "%";
    newStar.style.left = Math.random() * 100 + "%";
    newStar.style.setProperty("--side", `${parseInt(Math.random() * 2) + 1}px`);
    newStar.style.setProperty("--delay", Math.random() * 25 + "s");
    background.appendChild(newStar);
    newStar.onanimationend = (e) => {
        e.currentTarget.parentNode.removeChild(e.currentTarget);
        stars();
    }
}

for (let index = 0; index < 40; index++) {
    stars();
}

let lastX = 0 + "px";
let lastY = 0 + "px";

let newX = 60 + "px";
let newY = 60 + "px";

astronaut.style.setProperty("--x-move", newX);
astronaut.style.setProperty("--y-move", newY);

astronaut.style.setProperty("--last-x", lastX);
astronaut.style.setProperty("--last-y", lastY);

astronaut.onanimationiteration = () => {
    lastX = newX;
    lastY = newY;
    astronaut.style.setProperty("--last-x", lastX);
    astronaut.style.setProperty("--last-y", lastY);

    newX = `${parseInt(Math.random() * 200) + 120}px`;
    newY = `${parseInt(Math.random() * 200) + 120}px`;

    astronaut.style.setProperty("--x-move", newX);
    astronaut.style.setProperty("--y-move", newY);
}