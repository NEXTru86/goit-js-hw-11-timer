import './sass/main.scss';

class CountdownTimer {
    constructor({selector, targetDate}) {
        this.selector = selector;
        this.targetDate = targetDate;
    }

    start() {
        setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = this.targetDate - currentTime;
            const time = getTimeComponents(deltaTime);
            updateClockface(time);  
        }, 1000);

        function pad(value) {
            return String(value).padStart(2, '0');
        };

        function getTimeComponents(time) {
            const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
            const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
            const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
            return { days, hours, mins, secs };
        };

        function updateClockface({ days, hours, mins, secs }) {
            document.querySelector(`[data-value="days"]`).textContent = `${days}`;
            document.querySelector('[data-value="hours"]').textContent = `${hours}`;
            document.querySelector('[data-value="mins"]').textContent = `${mins}`;
            document.querySelector('[data-value="secs"]').textContent = `${secs}`;
        };
    };
}

const timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jul 17, 2021'),
    
});

timer.start();