import { Timer } from './modules/timer';

const refs = {
  timer1: document.querySelector('.timer-1'),
  timer2: document.querySelector('.timer-2'),
};

const timer1 = new Timer(refs.timer1);

// const timer2 = new Timer(refs.timer2);
