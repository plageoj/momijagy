import { download } from './content/download';
import { preventTimeout } from './content/preventTimeout';

const jigenRawData = Array.from(
  document.getElementsByClassName('kyuko-date-jigen'),
) as HTMLTableCellElement[];
if (jigenRawData.length) download(jigenRawData);

preventTimeout();
