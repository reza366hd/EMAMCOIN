document.addEventListener('DOMContentLoaded', () => {
    let score = loadScore();
    let energy = loadEnergy();
    let maxEnergy = loadMaxEnergy();
    const scoreElement = document.getElementById('score');
    const goldenImage = document.getElementById('golden-image');
    const rankText = document.getElementById('rank-text');
    const energyElement = document.getElementById('energy');
    const energyBar = document.getElementById('energy-bar');
    const bodyElement = document.body;

    scoreElement.textContent = score;
    energyElement.textContent = energy;
    updateEnergyBar();

    goldenImage.addEventListener('click', handleClick);

    function handleClick() {
        if (energy > 0) {
            score++;
            energy--;
            scoreElement.textContent = score;
            energyElement.textContent = energy;
            updateEnergyBar();
            updateRankText(score);
            saveScore(score);
            saveEnergy(energy);
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

    // شارژ انرژی هر دو ثانیه یک واحد تا رسیدن به maxEnergy
    setInterval(() => {
        if (energy < maxEnergy) {
            energy++;
            energyElement.textContent = energy;
            updateEnergyBar();
            saveEnergy(energy);
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

    // ذخیره‌سازی انرژی
    function saveEnergy(energy) {
        localStorage.setItem('userEnergy', energy);
    }

    // بازیابی انرژی
    function loadEnergy() {
        return parseInt(localStorage.getItem('userEnergy')) || 150;
    }

    // ذخیره‌سازی حداکثر انرژی
    function saveMaxEnergy(maxEnergy) {
        localStorage.setItem('maxEnergy', maxEnergy);
    }

    // بازیابی حداکثر انرژی
    function loadMaxEnergy() {
        return parseInt(localStorage.getItem('maxEnergy')) || 150;
    }

    // به‌روزرسانی رنگ پس‌زمینه و متن لیگ هنگام بارگذاری صفحه
    updateRankText(score);
    updateEnergyBar();

    // هدایت به صفحه mos.html هنگام کلیک بر روی مستحبات
    document.getElementById('mostahabat-link').addEventListener('click', () => {
        window.location.href = 'mos.html';
    });

    // بررسی بوسترها
    function checkBoosters() {
        const boost = localStorage.getItem('boost');
        if (boost === 'full-energy') {
            energy = maxEnergy;
            localStorage.removeItem('boost');
            updateEnergyBar();
            energyElement.textContent = energy;
            saveEnergy(energy);
        } else if (boost === 'turbo') {
            // افزایش ماین کردن به 5 برای 10 ثانیه
            localStorage.setItem('boost', 'turbo-active');
            goldenImage.classList.add('turbo-boost');
            setTimeout(() => {
                localStorage.removeItem('boost');
                goldenImage.classList.remove('turbo-boost');
            }, 10000);
        }
    }

    // بررسی بوسترها در هر بار بارگذاری صفحه
    checkBoosters();

    // محاسبه سکه‌های اضافی بر اساس زمان گذشته
    function calculateAdditionalCoins() {
        const lastVisit = parseInt(localStorage.getItem('lastVisit')) || new Date().getTime();
        const now = new Date().getTime();
        const minutesPassed = Math.floor((now - lastVisit) / (1000 * 60));
        const secondsPassed = Math.floor((now - lastVisit) / 1000);
        const additionalCoins = minutesPassed * 10;
        const additionalEnergy = Math.min(secondsPassed, maxEnergy - energy);
        const balance = parseInt(localStorage.getItem('userScore')) || 0;

        if (localStorage.getItem('divineQueenActive') === 'true') {
            localStorage.setItem('userScore', balance + additionalCoins);
        }

        energy += additionalEnergy;
        energyElement.textContent = energy;
        updateEnergyBar();
        saveEnergy(energy);

        localStorage.setItem('lastVisit', now);
    }

    // ذخیره‌سازی انرژی هنگام بستن صفحه
    window.addEventListener('beforeunload', () => {
        saveEnergy(energy);
    });

    // فراخوانی تابع محاسبه سکه‌های اضافی هنگام بارگذاری صفحه
    calculateAdditionalCoins();
});
