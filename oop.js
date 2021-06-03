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
// console.log(testColorRgb);
// console.log(testColorHex);

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
// console.log(firstColor.rgb());
// console.log(firstColor.hex());

function Color(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
}

Color.prototype.rgb = function () {
  const { r, g, b } = this;
  return `rgb(${r}, ${g}, ${b})`;
};

Color.prototype.hex = function () {
  const { r, g, b } = this;
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const colorOne = new Color(40, 50, 60);
const colorTwo = new Color(120, 37, 59);
console.log(colorOne.rgb());
console.log(colorOne.hex());
console.log(colorOne.hex === colorTwo.hex);
/* the above should return true because the hex method is attached to the Color 
prototype and not to each individual instance */
