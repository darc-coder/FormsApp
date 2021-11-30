const Material = {
    Light: {
        red: "#ffcdd2", pink: "#f8bbd0", violet1: "#ce93d8", violet2: "#b39ddb", blue0: "#C5CAE9", blue1: "#bbdefb", blue2: "#b3e5fc", blue3: "#b2ebf2", green1: "#b2dfdb",
        green2: "#c8e6c9", yellow1: "#fff9c4", yellow2: "#ffecb3", orange1: "#ffe0b2", orange2: "#ffccbc", brown: "#d7ccc8", gray1: "#eeeeee", gray2: "#cfd8dc"
    }, Dark: {
        red: "#f44336", pink: "#e91e63", violet1: "#9c27b0", violet2: "#673ab7", blue0: "#3F51B5", blue1: "#2196F3", blue2: "#039be5", blue3: "#00acc1", green1: "#00897b",
        green2: "#43a047", yellow1: "#fdd835", yellow2: "#ffb300", orange1: "#fb8c00", orange2: "#f4511e", brown: "#6d4c41", gray1: "#546e7a", gray2: "#757575"
    }
}

const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

let calendarTop = document.querySelector(".calendar-img .top");
let circleAnim = document.querySelector(".img-circle-anim");
let circleMain = document.querySelector(".img-circle-main");

let randomKey = "";

const randomColorKey = (obj) => {
    var keys = Object.keys(obj);
    return keys[keys.length * Math.random() << 0];
};

setInterval(() => {
    randomKey = randomColorKey(Material.Dark);
    calendarTop.style.backgroundColor = Material.Dark[randomKey];
}, 3000);

setInterval(() => {
    circleAnim.style.backgroundColor = Material.Light[randomKey];
    circleAnim.classList.remove("open");
    setTimeout(() => {
        circleAnim.classList.add("open");
    }, 1000);

    setTimeout(() => {
        circleMain.style.backgroundColor = circleAnim.style.backgroundColor;
    }, 2000);

}, 3000);