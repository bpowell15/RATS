import VisualData from './visual_data';
import Map from './map';

document.addEventListener("DOMContentLoaded", () => {
  let map;
  document.getElementsByTagName('body', new VisualData());
  map = new Map();
  map.loadData();
});
