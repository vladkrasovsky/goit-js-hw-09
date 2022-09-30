import flatpickr from 'flatpickr';
import { Notify } from 'notiflix';
import { convertMs, addLeadingZero } from '../helpers/time';
import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.5.min.css';

class Timer {
  constructor(el) {
    this.wrapper = el;
    this.createMarkup();
    this.datePicker = this.wrapper.querySelector('.datetime-picker');
    this.startBtn = this.wrapper.querySelector('[data-start]');
    this.stats = {
      days: this.wrapper.querySelector('[data-days]'),
      hours: this.wrapper.querySelector('[data-hours]'),
      minutes: this.wrapper.querySelector('[data-minutes]'),
      seconds: this.wrapper.querySelector('[data-seconds]'),
    };
    this.initDatepicker();
    this.addListeners();
  }

  createMarkup = () => {
    const markup = `
    <input type="text" class="datetime-picker" />
    <button type="button" data-start disabled>Start</button>
    
    <div class="timer">
      <div class="field">
        <span class="value" data-days>00</span>
        <span class="label">Days</span>
      </div>
      <div class="field">
        <span class="value" data-hours>00</span>
        <span class="label">Hours</span>
      </div>
      <div class="field">
        <span class="value" data-minutes>00</span>
        <span class="label">Minutes</span>
      </div>
      <div class="field">
        <span class="value" data-seconds>00</span>
        <span class="label">Seconds</span>
      </div>
    </div>
    `;
    this.wrapper.insertAdjacentHTML('beforeend', markup);
  };

  initDatepicker = () => {
    flatpickr(this.datePicker, {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose: this.onDatepickerClose,
    });
  };

  onDatepickerClose = ([selectedDate]) => {
    this.endDate = new Date(selectedDate);

    if (this.dateDiff() <= 0) {
      this.startBtn.setAttribute('disabled', true);
      return Notify.failure('Please choose a date in the future');
    }

    this.startBtn.removeAttribute('disabled');
  };

  addListeners = () => {
    this.startBtn.addEventListener('click', this.start);
  };

  start = () => {
    this.startBtn.setAttribute('disabled', true);
    this.datePicker.setAttribute('disabled', true);

    this.intervID = setInterval(() => {
      this.renderCount();
      this.dateDiff() <= 1000 && this.stop();
    }, 1000);

    this.renderCount();
    Notify.success('The countdown timer has started');
  };

  renderCount = () => {
    const stats = convertMs(this.dateDiff());
    Object.entries(stats).forEach(([key, value]) => {
      this.stats[key].textContent = addLeadingZero(value);
    });
  };

  stop = () => {
    clearInterval(this.intervID);
    this.datePicker.removeAttribute('disabled');
    Notify.success('The countdown timer has stoped');
  };

  dateDiff = () => this.endDate - Date.now();
}

export { Timer };
