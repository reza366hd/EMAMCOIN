let score = loadScore();
let energy = 150;
const maxEnergy = 150;
const scoreElement = document.getElementById('score');
const goldenImage = document.getElementById('golden-image');
const rankText = document.getElementById('rank-text');
const energyElement = document.getElementById('energy');
const energyBar = document.getElementById('energy-bar');
const bodyElement = document.body;

scoreElement.textContent = score;

function handleClick() {
    if (energy > 0) {
        score++;
        energy--;
        scoreElement.textContent = score;
        energyElement.textContent = energy;
        updateEnergyBar();
        updateRankText(score);
        saveScore(score);
        goldenImage.style.transform = 'scale(0.9)';
        setTimeout(() => {
            goldenImage.style.transform = 'scale(1)';
        }, 100);
    }
}

function updateRankText(score) {
    if (score < 1000) {
        rankText.innerHTML = 'لیگ برنزی 🥉'; // اضافه کردن ایموجی برنز
        bodyElement.style.background = 'linear-gradient(180deg, #000000, #cd7f32)';
        energyBar.style.backgroundColor = '#cd7f32'; /* رنگ نوار شارژ برای لیگ برنزی */
    } else if (score < 2000) {
        rankText.innerHTML = 'لیگ نقره‌ای 🥈'; // اضافه کردن ایموجی نقره
        bodyElement.style.background = 'linear-gradient(180deg, #000000, #c0c0c0)';
        energyBar.style.backgroundColor = '#c0c0c0'; /* رنگ نوار شارژ برای لیگ نقره‌ای */
    } else if (score < 3000) {
        rankText.innerHTML = 'لیگ طلایی 🥇'; // اضافه کردن ایموجی طلا
        bodyElement.style.background = 'linear-gradient(180deg, #000000, #f9a602)';
        energyBar.style.backgroundColor = '#f9a602'; /* رنگ نوار شارژ برای لیگ طلایی */
    } else {
        rankText.innerHTML = 'لیگ الماس 💎'; // اضافه کردن ایموجی الماس
        bodyElement.style.background = 'linear-gradient(180deg, #000000, #b9f2ff)';
        energyBar.style.backgroundColor = '#b9f2ff'; /* رنگ نوار شارژ برای لیگ الماس */
    }
}

function updateEnergyBar() {
    const energyPercentage = (energy / maxEnergy) * 100;
    energyBar.style.width = energyPercentage + '%';
}

// شارژ انرژی هر دو ثانیه یک واحد تا رسیدن به 150
setInterval(() => {
    if (energy < maxEnergy) {
        energy++;
        energyElement.textContent = energy;
        updateEnergyBar();
    }
}, 2000);

// نمایش پیام خاص وقتی انرژی به 0 رسید
function showSpecialMessage() {
    goldenImage.textContent = "صلوات شما به حد نصاب رسید";
    goldenImage.classList.add('special-message');
    setTimeout(() => {
        goldenImage.textContent = "امام";
        goldenImage.classList.remove('special-message');
    }, 3000);
}

// نظارت بر انرژی و نمایش پیام خاص
setInterval(() => {
    if (energy === 0) {
        showSpecialMessage();
    }
}, 1000);

// ذخیره‌سازی امتیاز
function saveScore(score) {
    localStorage.setItem('userScore', score);
}

// بازیابی امتیاز
function loadScore() {
    return parseInt(localStorage.getItem('userScore')) || 0;
}

// به‌روزرسانی رنگ پس‌زمینه و متن لیگ هنگام بارگذاری صفحه
updateRankText(score);
updateEnergyBar();

// جلوگیری از انتخاب و کشیدن تصویر
goldenImage.addEventListener('mousedown', function(event) {
    event.preventDefault();
});

goldenImage.addEventListener('touchstart', function(event) {
    event.preventDefault();
});
