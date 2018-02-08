import VisualData from './visual_data';
import Map from './map';

document.addEventListener("DOMContentLoaded", () => {
  document.getElementsByTagName('body', new VisualData());
  new Map();
});
