import './sass/main.scss';

const refs = {
    ClockFace: document.querySelector('#timer-1'),
    ClockFaceDays: document.querySelector('[data-value="days"]'),
    ClockFaceHours: document.querySelector('[data-value="hours"]'),
    ClockFaceMinuts: document.querySelector('[data-value="mins"]'),
    ClockFaceSeconds: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
    constructor({selector, targetDate, onTick}) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.onTick = onTick;
    }

    start() {
        setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = this.targetDate - currentTime;
            const time = getTimeComponents(deltaTime);
            this.onTick(time);
        }, 1000);
    };
}

const timer = new CountdownTimer({
    // нихрена не понял как можно повесить значения таймера на весь div контейнер
    // selector: '#timer-1', через функцию?
    targetDate: new Date('Jul 17, 2021'),
    onTick: updateClockface,
    
});

timer.start();

function updateClockface({days, hours, mins, secs}) {
    refs.ClockFaceDays.textContent = `${days}`;
    refs.ClockFaceHours.textContent = `${hours}`;
    refs.ClockFaceMinuts.textContent = `${mins}`;
    refs.ClockFaceSeconds.textContent = `${secs}`;
};

function pad(value) {
    return String(value).padStart(2, '0');
};

function getTimeComponents(time) {
    /*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
    const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    /*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
    const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    /*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    /*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
};
