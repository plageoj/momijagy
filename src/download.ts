export const download = (jigenRawData) => {
  const cal = ics();
  const yearContainer = document.querySelector('td[align="center"] b');

  const button = document.createElement('button');
  button.style.marginLeft = '1ex';

  button.innerText = 'この週以降のデータをダウンロード';

  const addEvent = () => {
    button.disabled = true;
    button.innerText = 'ダウンロード準備中…';
    const year = parseInt(yearContainer.textContent, 10);
    const jigenData = [];
    for (let i = 1; i < 8; i++) {
      jigenData.push(jigenRawData.item(i).textContent);
    }
    const dates = jigenData.map((value) => {
      const dt = value
        .replace(/[^0-9]+/g, '/')
        .split('/')
        .map((str: string) => Number(str));
      return +new Date(year, dt[1] - 1, dt[2]);
    });

    const classes = document.querySelectorAll('.kyuko-kyukohoko td table');
    for (let i = 0; i < classes.length; i++) {
      const classList = classes.item(i).parentElement.classList;
      if (
        !classList.contains('kyuko-kaiko') &&
        !classList.contains('kyuko-hoko') &&
        !classList.contains('kyuko-multi-henko') &&
        !classList.contains('kyuko-part-kyuko') &&
        !classList.contains('kyuko-part-hoko')
      )
        continue;
      const classDetail = classes.item(i).querySelectorAll('td');
      const evinfo = classDetail[0].innerText.split('\n');
      const time = classDetail[1].textContent
        .replace(/[^0-9,]+/g, '')
        .split(',')
        .map((val) => parseInt(val, 10) - 1);
      const jigen = [
        [8.75, 9.5],
        [9.5, 10.25],
        [10.5, 11.25],
        [11.25, 12],
        [12.8333333333, 13.5833333333],
        [13.5833333333, 14.3333333333],
        [14.5833333333, 15.3333333333],
        [15.3333333333, 16.0833333333],
        [16.3333333333, 17.0833333333],
        [17.0333333333, 17.8333333333],
      ];

      cal.addEvent(
        evinfo[4],
        `${evinfo[0]} - ${evinfo[2]}`,
        evinfo[1],
        new Date(dates[i % 7] + 3600000 * jigen[time[0]][0]).toISOString(),
        new Date(dates[i % 7] + 3600000 * jigen[time.pop()][1]).toISOString(),
      );
    }
    sessionStorage.setItem('evt', JSON.stringify(cal.events()));

    document.querySelector('td[align="right"] a+a').click();
  };

  const evs = sessionStorage.getItem('evt');
  if (evs) {
    cal.setEvents(JSON.parse(evs));
  }

  yearContainer.appendChild(button);

  if (cal.events().length) {
    if (document.getElementsByClassName('kyuko-kaiko').length === 1) {
      button.innerText = 'ダウンロード';
      sessionStorage.removeItem('evt');
      button.onclick = (e) => {
        e.preventDefault();
        cal.download('momiji_calendar');
      };
      return;
    } else {
      addEvent();
    }
  }

  button.onclick = (event) => {
    event.preventDefault();
    sessionStorage.removeItem('evt');
    cal.setEvents([]);
    addEvent();
  };
};
