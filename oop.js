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

/* 
// THE NEW KEYWORD
// 1. Creates a blank, JS object
// 2. Links (sets the constructor of) this object to another object;
// 3. Passes the newly created object from Step 1 as the this context
// 4. Returns this if the function doesn't return its own object
*/
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

Color.prototype.rgba = function (a = 1.0) {
  const { r, g, b } = this;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const colorOne = new Color(40, 50, 60);
const colorTwo = new Color(120, 37, 59);
console.log(colorOne.rgb());
console.log(colorOne.hex());
console.log(colorOne.rgba());
console.log(colorOne.hex === colorTwo.hex);
/* the above should return true because the hex method is attached to the Color 
prototype and not to each individual instance */

// the above can be implemented with the class and new keywords
class ColorClass {
  constructor(r, g, b, name) {
    // console.log("INSIDE CONSTRUCTOR!");
    //   console.log(r, g, b);
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
    this.calcHSL();
  }
  shortRGB() {
    const { r, g, b } = this;
    return `${r}, ${g}, ${b}`;
  }

  rgb() {
    const { r, g, b } = this;
    return `rgb(${this.shortRGB()})`;
  }

  rgba(a = 1.0) {
    const { r, g, b } = this;
    return `rgba(${this.shortRGB()}, ${a})`;
  }

  hex() {
    const { r, g, b } = this;
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  hsl() {
    const { h, s, l } = this;
    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  calcHSL() {
    let { r, g, b } = this;
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
    if (delta == 0) h = 0;
    else if (cmax == r)
      // Red is max
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      // Green is max
      h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h == Math.round(h * 60);

    // Make negative hues positive behind
    if (h < 0) h += 360;
    //Calculate lightness
    l = (cmax - cmin) / 2;
    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    this.h = h;
    this.s = s;
    this.l = l;
  }

  opposite() {
    const { h, s, l } = this;
    const newHue = (h + 180) % 360;
    return `hsl(${newHue}, ${s}%, ${l}%)`;
  }

  fullySaturated() {
    const { h, l } = this;
    return `hsl(${h}, 100%, ${l}%)`;
  }
}

const c1 = new ColorClass(255, 67, 89, "tomato");
const white = new ColorClass(255, 255, 255, "white");
// console.log(c1);
// console.log(c1.rgb());
// console.log(c1.rgba());
// // console.log("hex", c1.hex());
// console.log(white.opposite());
