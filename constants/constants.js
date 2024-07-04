import dayjs from 'dayjs';
const month = dayjs(new Date).subtract(1, 'month').format('MMMM');
const year = dayjs(new Date).year();
const currentMonthSheet = `${month} ${year}`;
const folderId = '1_MGtAvn4TKs60nYfyhlB8SC_txmwXuTG';
const spreadsheetId = '1y5KC9CK9KcOSzp2hBSN66VGMlNnRA3f6ya71qX0aouM';

export {
  currentMonthSheet,
  folderId,
  spreadsheetId
};