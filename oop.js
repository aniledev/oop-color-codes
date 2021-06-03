// converts RGB colors to hexadecimal colors
const hex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// converts given parameters to rgb color code
const rgb = (r, g, b) => {
  return `rgb(${r}, ${g}, ${b})`;
};

const testColorHex = hex(255, 100, 25);
const testColorRgb = rgb(255, 100, 25);
console.log(testColorRgb);
console.log(testColorHex);

// create a factory function with properties and methods for an object
const makeColor = (r, g, b) => {
  const color = {};
  color.r = r;
  color.g = g;
  color.b = b;
  color.rgb = function () {
    const { r, g, b } = this;
    return `rgb(${r}, ${g}, ${b})`;
  };
  color.hex = function () {
    const { r, g, b } = this;
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };
  return color;
};

const firstColor = makeColor(35, 255, 150);
console.log(firstColor.rgb());
console.log(firstColor.hex());
