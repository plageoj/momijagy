import { Component, Event, Time } from 'ical.js';

export const download = (jigenRawData: HTMLTableCellElement[]): void => {
  const eventString = sessionStorage.getItem('evt');
  const events = new Component(eventString || 'vevent');

  const yearContainer = document.querySelector('td[align="center"] b');
  if (!yearContainer) return;

  const button = document.createElement('button');
  button.style.marginLeft = '1ex';

  button.innerText = 'この週以降のデータをダウンロード';

  const addEvent = () => {
    button.disabled = true;
    button.innerText = 'ダウンロード準備中…';
    const year = Number(yearContainer.textContent);
    const jigenData = jigenRawData.map((elm) => elm.textContent);
    const dates = jigenData.map((value) => {
      const dt = value
        ?.replace(/[^0-9]+/g, '/')
        .split('/')
        .map((str: string) => Number(str));
      if (!dt) throw new Error('日付情報が取得できませんでした!');
      return +new Date(year, dt[1] - 1, dt[2]);
    });

    const classes = Array.from(
      document.querySelectorAll('.kyuko-kyukohoko td table'),
    ) as HTMLTableElement[];
    for (const [i, classItem] of classes.entries()) {
      const classList = classItem.parentElement?.classList;
      if (
        !classList ||
        (!classList.contains('kyuko-kaiko') &&
          !classList.contains('kyuko-hoko') &&
          !classList.contains('kyuko-multi-henko') &&
          !classList.contains('kyuko-part-kyuko') &&
          !classList.contains('kyuko-part-hoko'))
      )
        continue;
      const classDetail = classItem.querySelectorAll('td');
      const evinfo = classDetail[0].innerText.split('\n');
      const time = classDetail[1].textContent
        ?.replace(/[^0-9,]+/g, '')
        .split(',')
        .map((val) => Number(val) - 1);

      if (!time) throw new Error('時限情報が取得できませんでした!');

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

      const event = new Event(events);
      event.startDate = Time.fromJSDate(
        new Date(dates[i % 7] + 3600000 * jigen[time[0]][0]),
        false,
      );
      event.endDate = Time.fromJSDate(
        new Date(dates[i % 7] + 3600000 * jigen[time.pop() ?? time[0]][1]),
        false,
      );
      event.summary = evinfo[4];
      event.location = evinfo[1];
      event.description = `${evinfo[0].trim()} - ${evinfo[2].trim()}`;
    }
    sessionStorage.setItem('evt', events.toString());

    (
      document.querySelector('td[align="right"] a+a') as HTMLAnchorElement
    ).click();
  };

  yearContainer.appendChild(button);

  if (eventString) {
    if (document.getElementsByClassName('kyuko-kaiko').length === 1) {
      button.innerText = 'ダウンロード';
      sessionStorage.removeItem('evt');
      button.onclick = (e) => {
        e.preventDefault();
        const comp = new Component([
          'vcalendar',
          [['version', {}, 'text', '2.0']],
          [],
        ]);
        comp.addSubcomponent(events);
      };
      return;
    } else {
      addEvent();
    }
  }

  button.onclick = (event) => {
    event.preventDefault();
    sessionStorage.removeItem('evt');
    addEvent();
  };
};
