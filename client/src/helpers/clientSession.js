import axios from 'axios';

let sessionToken = window.localStorage.getItem('sessionToken');

const session = {
  validate: (token = sessionToken) => {
    axios.post('/auth/verify', token);
  },

  expired: (token = sessionToken) => {
    if (token) {
      const sessionParams = this.data(token);
      const elapsed = (new Date().getTime() - sessionParams.date) / 1000;
      if (elapsed > 7776000) {
        alert('Session expired. Please sign in to continue.');
        return true;
      } else {
        let remainingTime;
        const daysRemaining = Number.parseFloat((7776000 - elapsed) / 86400).toPrecision(2);
        if (daysRemaining < 1) {
          remainingTime = `less than ${Number.parseFloat(daysRemaining * 24).toPrecision(2)} hours`;
        } else {
          remainingTime = daysRemaining + ' days';
        }
        console.log(`Session expires in ${remainingTime}`);
        return false;
      }
    }
    return true;
  },

  household: (token = window.localStorage.getItem('sessionToken')) => {
    console.log('Decoding username', token);
    return atob(token.household);
  },

  duration: (token = window.localStorage.getItem('sessionToken')) => {
    // return JSON.parse(at ob(token));
  },

  data: (token = window.localStorage.getItem('sessionToken')) => {
    return JSON.parse(atob(token));
  }
};

export default session;
