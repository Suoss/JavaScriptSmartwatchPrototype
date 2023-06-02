function rotateClockHands() {
  const currentTime = new Date();
  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  const second = currentTime.getSeconds();

  const hourHand = document.querySelector('.hour-hand');
  const minuteHand = document.querySelector('.minute-hand');
  const secondHand = document.querySelector('.second-hand');

  const hourRotation = (360 / 12) * (hour % 12) + (360 / 12 / 60) * minute;
  const minuteRotation = (360 / 60) * minute + (360 / 60 / 60) * second;
  const secondRotation = (360 / 60) * second;

  hourHand.style.transform = `rotate(${hourRotation}deg)`;
  minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
  secondHand.style.transform = `rotate(${secondRotation}deg)`;

  updateComplications(hour); // Update the complications based on the current hour
}

// Update the clock every second
setInterval(rotateClockHands, 1000);

window.addEventListener('DOMContentLoaded', () => {
  const complicationIcons = document.querySelectorAll('.complication i');
  const complicationTexts = document.querySelectorAll('.complication-text');
  const cycleButton = document.querySelector(".cycle-button");

  // Icon sets for different time intervals
  const iconSets = [
    // 11:00 am - 5:00 pm
    {
      complication1: 'fa-envelope',
      complication2: 'fa-calendar-alt',
      complication3: 'fa-heart',
      complication4: 'fa-sms'
    },
    // 5:00 pm - 9:00 pm
    {
      complication1: 'fa-shoe-prints',
      complication2: 'fa-fire',
      complication3: 'fa-cloud',
      complication4: 'fa-battery-full'
    },
    // 9:00 pm - 6:00 am
    {
      complication1: 'fa-moon',
      complication2: 'fa-battery-half',
      complication3: 'fa-layer-group',
      complication4: 'fa-forward'
    },
    // 6:00 am - 11:00 am
    {
      complication1: 'fa-road',
      complication2: 'fa-bell',
      complication3: 'fa-calendar-day',
      complication4: 'fa-sun'
    }
  ];

  // Initial icon set
  let currentIconSet = 0;

  // Function to update complication icons and texts
  function updateComplications(hour) {
    let currentIconSet;
    if (isBetweenTimes(hour, 11, 17)) {
      currentIconSet = 0;
    } else if (isBetweenTimes(hour, 17, 21)) {
      currentIconSet = 1;
    } else if (isBetweenTimes(hour, 21, 6)) {
      currentIconSet = 2;
    } else {
      currentIconSet = 3;
    }

    const iconSet = iconSets[currentIconSet];
    complicationIcons.forEach((icon, index) => {
      icon.className = `fas ${iconSet[`complication${index + 1}`]}`;
    });

    // Update sample texts
    complicationTexts[0].textContent = getComplicationText(iconSet.complication1);
    complicationTexts[1].textContent = getComplicationText(iconSet.complication2);
    complicationTexts[2].textContent = getComplicationText(iconSet.complication3);
    complicationTexts[3].textContent = getComplicationText(iconSet.complication4);
  }

  // Function to get the sample text for a given icon
  function getComplicationText(iconClass) {
    switch (iconClass) {
      case 'fa-envelope':
        return '3 emails';
      case 'fa-calendar-alt':
        return '2 appointments';
      case 'fa-heart':
        return '89 BpM';
      case 'fa-sms':
        return '3 unread';
      case 'fa-shoe-prints':
        return '6117 steps';
      case 'fa-fire':
        return '518 kcal';
      case 'fa-cloud':
        return 'Cloudy, 19°C';
      case 'fa-battery-full':
        return '100%';
      case 'fa-moon':
        return 'Clear, 12°C';
      case 'fa-battery-half':
        return '45%';
      case 'fa-layer-group':
        return 'Currently open apps';
      case 'fa-forward':
        return 'Resume';
      case 'fa-road':
        return 'Traffic - A40';
      case 'fa-bell':
        return '4 notifications';
      case 'fa-calendar-day':
        return getCurrentDayAndDate();
      case 'fa-sun':
        return 'Sunny, 19°C';
      default:
        return '';
    }
  }

  // Function to get the current day and date
  function getCurrentDayAndDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return currentDate.toLocaleDateString(undefined, options);
  }

  // Function to check if the current hour is between two given hours
  function isBetweenTimes(currentHour, startHour, endHour) {
    if (startHour <= endHour) {
      return currentHour >= startHour && currentHour < endHour;
    } else {
      return currentHour >= startHour || currentHour < endHour;
    }
  }

  // Cycle through icon sets when the button is clicked
  cycleButton.addEventListener('click', () => {
    currentIconSet = (currentIconSet + 1) % iconSets.length;
    updateComplications(new Date().getHours()); // Update complications immediately after clicking the button
  });
  // Initial update of complications
  updateComplications(new Date().getHours());
});
