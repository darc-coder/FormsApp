const Material = {
    Light: {
        red: "#ffcdd2", pink: "#f8bbd0", violet1: "#ce93d8", violet2: "#b39ddb", blue0: "#C5CAE9", blue1: "#bbdefb", blue2: "#b3e5fc", blue3: "#b2ebf2", green1: "#b2dfdb",
        green2: "#c8e6c9", yellow1: "#fff9c4", yellow2: "#ffecb3", orange1: "#ffe0b2", orange2: "#ffccbc", brown: "#d7ccc8", gray1: "#dddddd", gray2: "#cfd8dc"
    }, Dark: {
        red: "#f44336", pink: "#e91e63", violet1: "#9c27b0", violet2: "#673ab7", blue0: "#3F51B5", blue1: "#2196F3", blue2: "#039be5", blue3: "#00acc1", green1: "#00897b",
        green2: "#43a047", yellow1: "#fbc02d", yellow2: "##ffa000", orange1: "#fb8c00", orange2: "#f4511e", brown: "#6d4c41", gray1: "#757575", gray2: "#546e7a"
    }
}

const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let calendarTop = document.querySelector(".calendar-img .top");
let circleAnim = document.querySelector(".img-circle-anim");
let circleMain = document.querySelector(".img-circle-main");
let domainIdInput = document.querySelector("#domainId");
let fullNameInput = document.querySelector("#fullName");
let domainIdDataList = document.querySelector(".Domain-datalist");
let fullNameDataList = document.querySelector(".Name-datalist");
let monthText = document.querySelector("#month-text");
let monthInput = document.querySelector("#month");
let monthPicker = document.querySelector(".month-picker");
let yearDiv = document.querySelector(".month-year .year");
let leftArrow = document.querySelector(".left-image .left-arrow");
let form = document.forms[0];

let randomKey = "";

const randomColorKey = (obj) => {
    const keys = Object.keys(obj);
    return keys[keys.length * Math.random() << 0];
};

let intervals = [];
function AnimateCircle() {
    intervals = [];
    let x = setInterval(() => {
        randomKey = randomColorKey(Material.Dark);
        calendarTop.style.backgroundColor = Material.Dark[randomKey];
    }, 3000);

    let y = setInterval(() => {
        circleAnim.style.backgroundColor = Material.Light[randomKey];
        circleAnim.classList.remove("open");
        setTimeout(() => {
            circleAnim.classList.add("open");
        }, 1000);

        setTimeout(() => {
            circleMain.style.backgroundColor = circleAnim.style.backgroundColor;
        }, 2000);

    }, 3000);
    intervals.push(x, y);
}

AnimateCircle();

let data = {};
async function LoadData() {
    const fetchResponse = await fetch('/data');
    data = await fetchResponse.json();
}
LoadData().then(r => r);

function getDomainIds() {
    return Object.keys(data)
}

function getFullNames(_singleDomainId = "") {
    if (_singleDomainId && data.hasOwnProperty(_singleDomainId))
        return data[_singleDomainId]["fullName"];

    let allNames = [];
    for (const key in data) {
        const element = data[key];
        allNames.push(element["fullName"]);
    }
    return allNames.sort();
}

function search(query, _search_names = false) {
    let result = new Set();
    query = query.toLowerCase();

    let dataArr = getDomainIds();

    dataArr.forEach(singleDomainId => {
        if (_search_names) { // search through names
            let fullName = getFullNames(singleDomainId).toLowerCase();
            if (fullName.includes(query))
                result.add(singleDomainId);
        }
        else { // search through domain IDs
            if (singleDomainId.includes(query))
                result.add(singleDomainId);
        }
    });
    result = Array.from(result).sort();
    return result;
}

function clickOption(ev, dataList) {
    dataList.innerHTML = '';
    domainIdDataList.classList.add('hidden');
    fullNameDataList.classList.add('hidden');
    domainIdDataList.nextElementSibling.classList.add('hidden');
    fullNameDataList.nextElementSibling.classList.add('hidden');

    if (dataList === domainIdDataList) {
        domainIdInput.value = ev.currentTarget.getAttribute('value');
        fullNameInput.value = getFullNames(domainIdInput.value);
    }
    else if (dataList === fullNameDataList) {
        fullNameInput.value = ev.currentTarget.getAttribute('value');
        domainIdInput.value = ev.currentTarget.querySelector('.value').innerText;
    }
}

function buildDataListOption(array = [], dataList) {
    domainIdDataList.innerHTML = '';
    fullNameDataList.innerHTML = '';

    if (dataList === domainIdDataList)
        domainIdDataList.classList.remove('hidden');
    else
        fullNameDataList.classList.remove('hidden');

    array.forEach((domainId) => {
        let newDiv = document.createElement('div');
        let newSpan1 = document.createElement('span');
        let newSpan2 = document.createElement('span');
        let fullName = getFullNames(domainId);

        if (dataList === domainIdDataList)
            newDiv.setAttribute('value', domainId);
        else
            newDiv.setAttribute('value', fullName);

        newDiv.className = 'options';
        newSpan1.className = 'value';
        newSpan1.innerText = domainId;
        newSpan2.className = 'text';
        newSpan2.innerText = fullName;

        newDiv.onclick = (ev) => { clickOption(ev, dataList) };
        newDiv.append(newSpan1, newSpan2);
        dataList.append(newDiv);
    });

    if (array.length < 1) {
        domainIdDataList.classList.add('hidden');
        fullNameDataList.classList.add('hidden');
        if (dataList === domainIdDataList)
            domainIdDataList.nextElementSibling.classList.remove('hidden');
        else
            fullNameDataList.nextElementSibling.classList.remove('hidden');
    }
}

domainIdInput.onkeyup = () => {
    if (domainIdInput.value)
        buildDataListOption(search(domainIdInput.value), domainIdDataList);
}

fullNameInput.onkeyup = () => {
    if (fullNameInput.value)
        buildDataListOption(search(fullNameInput.value, true), fullNameDataList);
}

// Month & Date Logic
let monthYearPicker = document.querySelector('.month-year');

function selectMonthYear(ev) {
    let monthSpans = monthPicker.querySelectorAll('.single-month');
    let yearText = yearDiv.querySelector('.year-text');

    monthSpans.forEach(monthSpan => {
        monthSpan.classList.remove('active-month');
    });
    ev.currentTarget.classList.add('active-month');
    monthInput.value = ev.currentTarget.innerText + ', ' + yearText.innerText;
    monthYearPicker.classList.add('inactive');

    setTimeout(() => {
        monthYearPicker.classList.add('hidden');
    }, 200);
}

function buildMonthPicker() {
    let date = new Date();
    let currentMonth = date.getMonth();
    let yearBack = yearDiv.querySelector('.year-back');
    let yearText = yearDiv.querySelector('.year-text');
    let yearNext = yearDiv.querySelector('.year-next');

    yearText.innerText = date.getFullYear();
    monthText.innerText = Months[date.getMonth()];

    monthInput.onclick = monthInput.onfocus = () => {
        monthYearPicker.classList.remove('inactive');
        monthYearPicker.classList.remove('hidden');
    }

    Months.forEach((month, index) => {
        let newMonthSpan = document.createElement('span');

        newMonthSpan.className = 'single-month';
        newMonthSpan.innerText = month;

        if (currentMonth === index)
            newMonthSpan.classList.add('active-month');

        newMonthSpan.onclick = (ev) => { selectMonthYear(ev) };

        monthPicker.append(newMonthSpan);
    });

    yearBack.onclick = () => {
        yearText.innerText = parseInt(yearText.innerText) - 1;
    }
    yearNext.onclick = () => {
        yearText.innerText = parseInt(yearText.innerText) + 1;
    }
}

buildMonthPicker();

// Form Handling
form.onsubmit = (ev) => {
    ev.preventDefault();

    let formData = new FormData(form);

    ShowHideSubmitted(true);

    function showSuccess() {
        document.querySelector('.server-msg #success').style.display = 'block';
        document.querySelector('.success.wrapper').style.display = "block";
    }

    function showError(reply) {
        reply = "Error: " + reply;
        document.querySelector('.server-msg #failure').style.display = 'block';
        document.querySelector('.failure.wrapper').style.display = "block";
        document.querySelector('.server-msg .message').innerText = reply;
    }

    fetch(form.action, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData)
    }).then(response => {
        document.querySelector('.right-submitted .loading').classList.add('hidden');
        document.querySelector('.right-submitted button').classList.remove('hidden');

        if (!response.ok)
            return Promise.reject(response);

        return response.text()
    }).then(reply => {
        if (reply.includes("OK")) {
            showSuccess();
        }
        else {
            showError(reply);
        }
    }).catch(reason => {
        document.querySelector('.right-submitted .loading').classList.add('hidden');
        document.querySelector('.right-submitted button').classList.remove('hidden');

        showError("Code: " + reason.status + " : " + reason.statusText);
    });

    document.querySelector('.right-submitted button').onclick = leftArrow.onclick = (ev) => {
        if (leftArrow.classList.contains("active"))
            ShowHideSubmitted(false)
        else if (ev.currentTarget.type === 'button')
            ShowHideSubmitted(false)
    }
}

function ShowHideSubmitted(show = true) {
    if (show) {
        circleAnim.classList.add("submit");
        circleMain.classList.add("submit");
        leftArrow.classList.add("active");
        document.querySelector('.left-image').style.overflow = 'unset';
        document.querySelector('.calendar-img').style.display = 'none';
        document.querySelector('.right-form').style.display = 'none';
        document.querySelector('.right-submitted').classList.remove('hidden');
        document.querySelector('.right-submitted .loading').classList.remove('hidden');
        document.querySelector('.server-msg .message').innerText = "";
    }
    else if (!show) {
        circleAnim.classList.remove("submit");
        circleMain.classList.remove("submit");

        // success top h2 message and success logo
        document.querySelector('.server-msg #success').style.display = 'none';
        document.querySelector('.success.wrapper').style.display = 'none';

        // failure top h2 message and failure logo
        document.querySelector('.server-msg #failure').style.display = 'none';
        document.querySelector('.failure.wrapper').style.display = 'none';

        // main things
        leftArrow.classList.remove("active");
        document.querySelector('.calendar-img').style.display = 'grid';
        document.querySelector('.right-form').style.display = 'block';
        document.querySelector('.right-submitted').classList.add('hidden');
        document.querySelector('.right-submitted .loading').classList.add('hidden');
        document.querySelector('.right-submitted button').classList.add('hidden');
    }
}