const refs = {
  body: document.querySelector('body'),
  lift: document.querySelector('[lift]'),
  btnCall: document.querySelectorAll('.button__call'),
  tabNum: document.querySelectorAll('.tab__quad-num'),
};

const ACTIVE_COLOR = '#c156ff';
const INACTIVE_COLOR = '#e6e6e6';
const DOORS_TIMEOUT = 4000;
const LIFT_SPEED = 7;
let LIFT_DELAY = 0;

refs.body.addEventListener('focusin', onLiftCall);

function onLiftCall(e) {
  let liftCurrentPosition = parseInt(refs.lift.style.top);
  let whereLiftBecome = parseInt(refs.lift.style.top);
  if (e.target.id === 'f-1-btn') {
    whereLiftBecome = 700;
  } else if (e.target.id === 'f-2-btn') {
    whereLiftBecome = 529;
  } else if (e.target.id === 'f-3-btn') {
    whereLiftBecome = 359;
  } else if (e.target.id === 'f-4-btn') {
    whereLiftBecome = 187;
  } else if (e.target.id === 'f-5-btn') {
    whereLiftBecome = 20;
  }
  setTimeout(() => {
    onActivateLift(e, liftCurrentPosition, whereLiftBecome);
  }, LIFT_DELAY);
  activeCallBtns(e, liftCurrentPosition, whereLiftBecome);
}

function onActivateLift(e, liftCurrentPosition, whereLiftBecome) {
  if (liftCurrentPosition > whereLiftBecome) {
    const plus = '1';
    liftToGo(e, liftCurrentPosition, whereLiftBecome, plus);
    tabCounter(liftCurrentPosition, whereLiftBecome, plus);
  } else if (liftCurrentPosition < whereLiftBecome) {
    const minus = '-1';
    liftToGo(e, liftCurrentPosition, whereLiftBecome, minus);
    tabCounter(liftCurrentPosition, whereLiftBecome, minus);
  } else if ((liftCurrentPosition = whereLiftBecome)) {
    onOpenDoors(e);
  }
}

function liftToGo(e, liftCurrentPosition, whereLiftBecome, op) {
  const intervalId = setInterval(() => {
    let val = liftCurrentPosition - `${op}`;
    liftCurrentPosition = val;
    refs.lift.style.top = `${liftCurrentPosition}px`;
    if (liftCurrentPosition === whereLiftBecome) {
      clearInterval(intervalId);
      onLiftWaiting();
      inActiveCallBtns(e);
      e.target.previousElementSibling.classList.add('outdoor-open');
      setTimeout(() => {
        LIFT_DELAY = 0;
        e.target.previousElementSibling.classList.remove('outdoor-open');
      }, DOORS_TIMEOUT);
    }
  }, LIFT_SPEED);
}

function tabCounter(liftCurrentPosition, whereLiftBecome, op) {
  const counterId = setInterval(() => {
    let num = liftCurrentPosition - `${op}`;
    liftCurrentPosition = num;
    if (700 > liftCurrentPosition && 615 < liftCurrentPosition) {
      refs.tabNum.forEach(floorNum => {
        floorNum.textContent = 1;
      });
    } else if (615 > liftCurrentPosition && 445 < liftCurrentPosition) {
      refs.tabNum.forEach(floorNum => {
        floorNum.textContent = 2;
      });
    } else if (445 > liftCurrentPosition && 275 < liftCurrentPosition) {
      refs.tabNum.forEach(floorNum => {
        floorNum.textContent = 3;
      });
    } else if (275 > liftCurrentPosition && 105 < liftCurrentPosition) {
      refs.tabNum.forEach(floorNum => {
        floorNum.textContent = 4;
      });
    } else if (105 > liftCurrentPosition && 20 < liftCurrentPosition) {
      refs.tabNum.forEach(floorNum => {
        floorNum.textContent = 5;
      });
    }
    if (liftCurrentPosition === whereLiftBecome) {
      clearInterval(counterId);
    }
  }, LIFT_SPEED);
}

function onLiftWaiting() {
  const currentTime = Date.now();
  const liftInterval = setInterval(() => {
    const delayTime = Date.now() - 6000;
    LIFT_DELAY = currentTime - delayTime;
    LIFT_DELAY = parseInt(LIFT_DELAY / 100) * 100;
    if (LIFT_DELAY === 0) {
      clearInterval(liftInterval);
    }
  }, 100);
}

function onOpenDoors(e) {
  e.target.previousElementSibling.classList.toggle('outdoor-open');
  onCloseDoors(e);
  setTimeout(() => {
    inActiveCallBtns();
  }, 500);
}

function onCloseDoors(e) {
  setTimeout(() => {
    e.target.previousElementSibling.classList.remove('outdoor-open');
  }, DOORS_TIMEOUT);
}

function activeCallBtns(e) {
  refs.btnCall.forEach(btn => {
    btn.disabled = true;
    btn.style.backgroundColor = ACTIVE_COLOR;
  });
  e.target.style.backgroundColor = '#ff5689';
}

function inActiveCallBtns() {
  refs.btnCall.forEach(btn => {
    btn.disabled = false;
    btn.style.backgroundColor = INACTIVE_COLOR;
  });
}
