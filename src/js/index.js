const refs = {
  body: document.querySelector('body'),
  floors: document.querySelector('.floors'),
  lift: document.querySelector('[lift]'),
  btnCall: document.querySelectorAll('.button__call'),
  liftBtn: document.querySelectorAll('.lift-button'),
  tabNum: document.querySelectorAll('.tab__quad-num'),
  doors: document.querySelectorAll('.outdoor'),
};

const ACTIVE_COLOR = '#ff3535';
const INACTIVE_COLOR = '#efefef';
const DOORS_TIMEOUT = 4000;
const LIFT_SPEED = 7;
let LIFT_DELAY = 0;
let doorNumb = 1;

refs.body.addEventListener('click', onLiftActiveate);

function onLiftActiveate(e) {
  if (e.target.nodeName === 'BUTTON') {
    const liftCurrentPosition = parseInt(refs.lift.style.top);
    let whereLiftBecome = parseInt(refs.lift.style.top);
    switch (e.target.id) {
      case 'f1':
      case 'f-1-btn':
        whereLiftBecome = 844;
        break;
      case 'f2':
      case 'f-2-btn':
        whereLiftBecome = 644;
        break;
      case 'f3':
      case 'f-3-btn':
        whereLiftBecome = 444;
        break;
      case 'f4':
      case 'f-4-btn':
        whereLiftBecome = 244;
        break;
      case 'f5':
      case 'f-5-btn':
        whereLiftBecome = 44;
        break;
    }
    if (e.target.className === 'lift-button') {
      closeDoorsMomentaly();
      LIFT_DELAY = 2000;
    }
    setTimeout(() => {
      whereSendLift(e, liftCurrentPosition, whereLiftBecome);
    }, LIFT_DELAY);
    activateLiftBtn(e);
    if (e.target.className === 'button__call') {
      e.target.style.backgroundColor = '#88ff3e';
    }
  }
}

function whereSendLift(e, liftCurrentPosition, whereLiftBecome) {
  if (liftCurrentPosition > whereLiftBecome) {
    const plus = '1';
    liftToGo(e, liftCurrentPosition, whereLiftBecome, plus);
    floorCounter(liftCurrentPosition, whereLiftBecome, plus);
  } else if (liftCurrentPosition < whereLiftBecome) {
    const minus = '-1';
    liftToGo(e, liftCurrentPosition, whereLiftBecome, minus);
    floorCounter(liftCurrentPosition, whereLiftBecome, minus);
  } else if (liftCurrentPosition === whereLiftBecome) {
    activateLiftBtn(e);
    setTimeout(() => {
      inActiveLiftBtn(e);
    }, 500);
    onToggleDoor(doorNumb);
  }
}

function floorCounter(liftCurrentPosition, whereLiftBecome, op) {
  const counterId = setInterval(() => {
    let num = liftCurrentPosition - `${op}`;
    liftCurrentPosition = num;
    if (844 > liftCurrentPosition && 744 < liftCurrentPosition) {
      doorNumb = 1;
    } else if (744 > liftCurrentPosition && 544 < liftCurrentPosition) {
      doorNumb = 2;
    } else if (544 > liftCurrentPosition && 344 < liftCurrentPosition) {
      doorNumb = 3;
    } else if (344 > liftCurrentPosition && 144 < liftCurrentPosition) {
      doorNumb = 4;
    } else if (144 > liftCurrentPosition && 44 < liftCurrentPosition) {
      doorNumb = 5;
    }
    if (liftCurrentPosition === whereLiftBecome) {
      clearInterval(counterId);
    }
    setNumberOfFloor(doorNumb);
  }, LIFT_SPEED);
}

function liftToGo(e, liftCurrentPosition, whereLiftBecome, op) {
  const intervalId = setInterval(() => {
    let val = liftCurrentPosition - `${op}`;
    liftCurrentPosition = val;
    refs.lift.style.top = `${liftCurrentPosition}px`;
    if (liftCurrentPosition === whereLiftBecome) {
      onOpenDoor(doorNumb);
      clearInterval(intervalId);
      if (e.target.className === 'button__call') {
        onLiftWaiting();
      }
      inActiveLiftBtn(e);
      setTimeout(() => {
        LIFT_DELAY = 0;
        closeDoorsMomentaly();
      }, DOORS_TIMEOUT);
    }
  }, LIFT_SPEED);
}

function onToggleDoor(doorNumb) {
  closeDoorsTimeout();
  for (let i = 0; i < refs.tabNum.length; i += 1) {
    if (i === 0) {
      refs.doors.forEach(door => {
        const numOfFloor = doorNumb;
        if (door.id === `d${numOfFloor}`) {
          door.classList.toggle('outdoor-open');
        }
      });
      break;
    }
  }
}

function onOpenDoor(doorNumb) {
  closeDoorsTimeout();
  for (let i = 0; i < refs.tabNum.length; i += 1) {
    if (i === 0) {
      refs.doors.forEach(door => {
        const numOfFloor = doorNumb;
        if (door.id === `d${numOfFloor}`) {
          door.classList.add('outdoor-open');
        }
      });
      break;
    }
  }
}

function closeDoorsTimeout() {
  setTimeout(() => {
    closeDoorsMomentaly();
  }, DOORS_TIMEOUT);
}

function closeDoorsMomentaly() {
  refs.doors.forEach(door => {
    door.classList.remove('outdoor-open');
  });
}

function activateLiftBtn(e) {
  e.target.style.backgroundColor = '#3f86ff';
  e.target.style.color = '#ffffff';
  refs.lift.removeEventListener('click', onLiftActiveate);
  activeCallBtns();
}

function inActiveLiftBtn(e) {
  e.target.style.backgroundColor = INACTIVE_COLOR;
  e.target.style.color = '#000000';
  refs.lift.addEventListener('click', onLiftActiveate);
  inActiveCallBtns();
}

function activeCallBtns() {
  refs.btnCall.forEach(btn => {
    btn.disabled = true;
    btn.style.backgroundColor = ACTIVE_COLOR;
  });
}

function inActiveCallBtns() {
  refs.btnCall.forEach(btn => {
    btn.disabled = false;
    btn.style.backgroundColor = INACTIVE_COLOR;
  });
}

function setNumberOfFloor(doorNumb) {
  refs.tabNum.forEach(floorNum => {
    floorNum.textContent = doorNumb;
  });
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
