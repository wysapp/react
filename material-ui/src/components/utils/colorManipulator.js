import warning from 'warning';

function clamp(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

export function convertColorToString(color) {
  const { type, values } = color;

  if ( type.indexOf('rgb') > -1) {
    for (let i = 0; i < 3; i++) {
      values[i] = parseInt(values[i]);
    }
  }

  let colorString;
  if (type.indexOf('hsl') > -1) {
    colorString = `${color.type}(${values[0]}, ${values[1]}%, ${values[2]}%`;
  } else {
    colorString = `${color.type}(${values[0]}, ${values[1]}, ${values[2]}`;
  }

  if ( values.length == 4) {
    colorString += `, ${values[3]})`;
  } else {
    colorString += ')';
  }

  return colorString;
}

export function convertHexToRGB(color) {
  if ( color.length === 4) {
    let extendedColor = '#';
    for (let i = 1; i < color.length; i++) {
      extendedColor += color.charAt(i) + color.charAt(i);
    }
    color = extendedColor;
  }

  const values = {
    r: parseInt(color.substr(1, 2), 16),
    g: parseInt(color.substr(3, 2), 16),
    b: parseInt(color.substr(5, 2), 16),
  };

  return `rgb(${values.r}, ${values.g}, ${values.b})`;
}

export function decomposeColor(color) {
  if ( color.charAt(0) === '#') {
    return decomposeColor(convertHexToRGB(color));
  }

  const marker = color.indexOf('(');

  warning(marker !== -1, `Material-UI: The ${color} color was not parsed correctly,
  because it has an unsupported format (color name or RGB %). This may cause issues in component rendering.`);

  const type = color.substring(0, marker);
  let values = color.substring(marker + 1, color.length -1).split(',');
  values = values.map((value) => parseFloat(value));

  return {type, values};
}

export function fade(color, value) {
  color = decomposeColor(color);
  value = clamp(value, 0, 1);

  if ( color.type === 'rgb' || color.type === 'hsl') {
    color.type += 'a';
  }

  color.values[3] = value;

  return convertColorToString(color);
}