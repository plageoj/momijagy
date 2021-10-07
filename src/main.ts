import { download } from './download';

const jigenRawData = Array.from(
  document.getElementsByClassName('kyuko-date-jigen'),
) as HTMLTableCellElement[];
if (jigenRawData.length) download(jigenRawData);

const frame = document.getElementsByName('topmenu')[0] as
  | HTMLIFrameElement // Actually HTMLFrameElement but to avoid deprecated warnings
  | undefined;
frame?.addEventListener('load', () => {
  if (!frame) return;
  const span = frame.contentDocument?.getElementById('timeout')
    ?.parentElement as HTMLSpanElement;
  span.innerText = 'タイムアウト抑制中';
  span.style.fontSize = '';

  setTimeout(() => {
    frame.contentWindow?.location.reload();
  }, 1700000);
});
