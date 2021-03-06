import {tinycolor} from '@thebespokepixel/es-tinycolor';

// eslint-disable-next-line no-unused-vars
class ColorPickerUtils {

  static roundToNearest(value, nearest) {
    nearest = 1 / (nearest);
    return Math.round(value * nearest) / nearest;
  }

  static limit(value, min, max) {
    value = +value;
    return isNaN(value) ? min : (value < min ? min : (value > max ? max : value));
  }

  static conditionallySetAttribute(element, condition, attr) {
    if (condition) {
      element.setAttribute(attr, '');
    } else {
      element.removeAttribute(attr);
    }
  }

  static getContrastColor(color) {
    const hsl = color.toHsl();
    const contrastColor = tinycolor({h: hsl.h, s: 1, l: .5});

    if (color.getLuminance() >= 0.5 || color.getAlpha() <= 0.5) {
      return contrastColor.darken(color.getAlpha() <= 0.5 && color.getLuminance() <= 0.5 ? 10 : 20).toRgbString();
    } else {
      return contrastColor.brighten(90).toRgbString();
    }
  }

  static getFormattedColor(color, format, stepAlpha, step) {
    const colorInternal = color.setAlpha(ColorPickerUtils.roundToNearest(color.getAlpha(), stepAlpha));

    if ('hex' === format) {
      return colorInternal.getAlpha() === 1 ? colorInternal.toHexString() : colorInternal.toHex8String();
    } else {
      const regex = colorInternal.getAlpha() === 1 ? /(\d+\.\d+)/gm : /(\d+\.\d+(?=[^\d)]+\d))/gm;
      return colorInternal.toString(format).replace(regex, match => {
        return ColorPickerUtils.roundToNearest(match, step);
      });
    }
  }

  static getResolvedValue(element, value) {
    if (/--[a-zA-Z0-9]+[a-zA-Z0-9-]*/gm.test(value)) {
      const propertyValue = window.getComputedStyle(element).getPropertyValue(value).trim();
      return propertyValue !== '' ? tinycolor(propertyValue) : undefined;
    } else {
      return tinycolor(value);
    }
  }
}

export default ColorPickerUtils;
