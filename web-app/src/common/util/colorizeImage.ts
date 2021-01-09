import { decode, Image } from 'upng-js';

const colorScale = [
  [68, 1, 84, 255],
  [68, 2, 85, 255],
  [69, 4, 87, 255],
  [69, 5, 88, 255],
  [69, 7, 90, 255],
  [69, 8, 91, 255],
  [70, 10, 92, 255],
  [70, 11, 94, 255],
  [70, 13, 95, 255],
  [70, 14, 96, 255],
  [71, 15, 98, 255],
  [71, 17, 99, 255],
  [71, 18, 101, 255],
  [71, 20, 102, 255],
  [72, 21, 103, 255],
  [72, 23, 105, 255],
  [72, 24, 106, 255],
  [72, 25, 107, 255],
  [72, 27, 108, 255],
  [72, 28, 109, 255],
  [72, 29, 110, 255],
  [72, 31, 111, 255],
  [72, 32, 112, 255],
  [72, 33, 113, 255],
  [72, 35, 115, 255],
  [71, 36, 116, 255],
  [71, 37, 117, 255],
  [71, 38, 118, 255],
  [71, 40, 119, 255],
  [71, 41, 120, 255],
  [71, 42, 121, 255],
  [71, 44, 122, 255],
  [71, 45, 123, 255],
  [71, 46, 124, 255],
  [70, 47, 124, 255],
  [70, 49, 125, 255],
  [70, 50, 126, 255],
  [69, 51, 126, 255],
  [69, 52, 127, 255],
  [69, 53, 128, 255],
  [69, 55, 129, 255],
  [68, 56, 129, 255],
  [68, 57, 130, 255],
  [68, 58, 131, 255],
  [67, 59, 131, 255],
  [67, 60, 132, 255],
  [67, 62, 133, 255],
  [66, 63, 133, 255],
  [66, 64, 134, 255],
  [66, 65, 134, 255],
  [65, 66, 135, 255],
  [65, 67, 135, 255],
  [64, 69, 135, 255],
  [64, 70, 136, 255],
  [63, 71, 136, 255],
  [63, 72, 136, 255],
  [63, 73, 137, 255],
  [62, 74, 137, 255],
  [62, 75, 137, 255],
  [61, 76, 137, 255],
  [61, 78, 138, 255],
  [60, 79, 138, 255],
  [60, 80, 138, 255],
  [59, 81, 139, 255],
  [59, 82, 139, 255],
  [59, 83, 139, 255],
  [58, 84, 139, 255],
  [58, 85, 139, 255],
  [57, 86, 140, 255],
  [57, 87, 140, 255],
  [56, 88, 140, 255],
  [56, 89, 140, 255],
  [55, 91, 140, 255],
  [55, 92, 140, 255],
  [54, 93, 140, 255],
  [54, 94, 140, 255],
  [53, 95, 141, 255],
  [53, 96, 141, 255],
  [52, 97, 141, 255],
  [52, 98, 141, 255],
  [51, 99, 141, 255],
  [51, 100, 141, 255],
  [50, 101, 141, 255],
  [50, 102, 141, 255],
  [49, 103, 141, 255],
  [49, 104, 141, 255],
  [48, 105, 141, 255],
  [48, 106, 141, 255],
  [48, 107, 142, 255],
  [47, 107, 142, 255],
  [47, 108, 142, 255],
  [46, 109, 142, 255],
  [46, 110, 142, 255],
  [45, 111, 142, 255],
  [45, 112, 142, 255],
  [44, 113, 142, 255],
  [44, 114, 142, 255],
  [44, 115, 142, 255],
  [43, 116, 142, 255],
  [43, 117, 142, 255],
  [43, 118, 142, 255],
  [42, 119, 142, 255],
  [42, 120, 142, 255],
  [41, 121, 142, 255],
  [41, 122, 142, 255],
  [41, 123, 142, 255],
  [40, 124, 142, 255],
  [40, 125, 142, 255],
  [40, 126, 142, 255],
  [39, 127, 142, 255],
  [39, 128, 142, 255],
  [38, 129, 142, 255],
  [38, 130, 142, 255],
  [38, 131, 142, 255],
  [37, 132, 142, 255],
  [37, 133, 142, 255],
  [37, 134, 142, 255],
  [36, 135, 141, 255],
  [36, 136, 141, 255],
  [36, 137, 141, 255],
  [36, 138, 141, 255],
  [35, 138, 141, 255],
  [35, 139, 141, 255],
  [35, 140, 141, 255],
  [34, 141, 141, 255],
  [34, 142, 140, 255],
  [34, 143, 140, 255],
  [33, 144, 140, 255],
  [33, 145, 140, 255],
  [33, 146, 140, 255],
  [33, 147, 140, 255],
  [33, 148, 139, 255],
  [33, 149, 139, 255],
  [32, 150, 139, 255],
  [32, 151, 139, 255],
  [32, 152, 138, 255],
  [32, 153, 138, 255],
  [32, 153, 138, 255],
  [32, 154, 138, 255],
  [32, 155, 137, 255],
  [32, 156, 137, 255],
  [31, 157, 137, 255],
  [31, 158, 137, 255],
  [31, 159, 136, 255],
  [31, 160, 136, 255],
  [32, 161, 136, 255],
  [32, 162, 135, 255],
  [33, 163, 135, 255],
  [33, 164, 134, 255],
  [34, 164, 134, 255],
  [34, 165, 133, 255],
  [35, 166, 133, 255],
  [36, 167, 132, 255],
  [36, 168, 132, 255],
  [37, 169, 131, 255],
  [37, 170, 131, 255],
  [38, 171, 130, 255],
  [38, 171, 130, 255],
  [39, 172, 129, 255],
  [39, 173, 129, 255],
  [40, 174, 128, 255],
  [41, 175, 127, 255],
  [43, 176, 126, 255],
  [44, 177, 126, 255],
  [46, 178, 125, 255],
  [47, 178, 124, 255],
  [49, 179, 123, 255],
  [50, 180, 122, 255],
  [52, 181, 122, 255],
  [53, 182, 121, 255],
  [54, 183, 120, 255],
  [56, 184, 119, 255],
  [57, 185, 118, 255],
  [59, 185, 117, 255],
  [60, 186, 117, 255],
  [62, 187, 116, 255],
  [63, 188, 115, 255],
  [65, 189, 114, 255],
  [67, 190, 113, 255],
  [69, 190, 112, 255],
  [71, 191, 111, 255],
  [73, 192, 110, 255],
  [75, 193, 109, 255],
  [77, 194, 108, 255],
  [79, 195, 107, 255],
  [80, 195, 105, 255],
  [82, 196, 104, 255],
  [84, 197, 103, 255],
  [86, 198, 102, 255],
  [88, 199, 101, 255],
  [90, 199, 100, 255],
  [92, 200, 99, 255],
  [94, 201, 98, 255],
  [96, 202, 97, 255],
  [99, 202, 95, 255],
  [101, 203, 94, 255],
  [104, 204, 92, 255],
  [106, 204, 91, 255],
  [108, 205, 89, 255],
  [111, 206, 88, 255],
  [113, 207, 87, 255],
  [115, 207, 85, 255],
  [118, 208, 84, 255],
  [120, 209, 82, 255],
  [123, 209, 81, 255],
  [125, 210, 79, 255],
  [127, 211, 78, 255],
  [130, 211, 76, 255],
  [132, 212, 75, 255],
  [135, 213, 73, 255],
  [137, 213, 72, 255],
  [140, 214, 70, 255],
  [142, 214, 68, 255],
  [145, 215, 67, 255],
  [147, 215, 65, 255],
  [150, 216, 63, 255],
  [153, 216, 62, 255],
  [155, 217, 60, 255],
  [158, 217, 58, 255],
  [160, 218, 56, 255],
  [163, 218, 55, 255],
  [165, 219, 53, 255],
  [168, 219, 51, 255],
  [170, 220, 50, 255],
  [173, 220, 48, 255],
  [176, 220, 47, 255],
  [178, 221, 45, 255],
  [181, 221, 44, 255],
  [184, 222, 42, 255],
  [186, 222, 41, 255],
  [189, 222, 39, 255],
  [192, 223, 38, 255],
  [195, 223, 37, 255],
  [197, 223, 35, 255],
  [200, 224, 34, 255],
  [203, 224, 32, 255],
  [205, 225, 31, 255],
  [208, 225, 29, 255],
  [211, 225, 28, 255],
  [213, 226, 26, 255],
  [216, 226, 25, 255],
  [218, 226, 26, 255],
  [221, 227, 27, 255],
  [223, 227, 27, 255],
  [226, 227, 28, 255],
  [228, 228, 29, 255],
  [231, 228, 30, 255],
  [233, 228, 31, 255],
  [236, 229, 31, 255],
  [238, 229, 32, 255],
  [241, 229, 33, 255],
  [243, 230, 34, 255],
  [246, 230, 35, 255],
  [248, 230, 35, 255],
  [251, 231, 36, 255],
  [253, 231, 37, 255],
];

function extractIntensityAndMask(png: Image, min: number, max: number) {
  const { width, height, depth, ctype } = png;
  const bytesPerComponent = depth <= 8 ? 1 : 2;
  const hasAlpha = ctype === 4 || ctype === 6;
  const numPixels = width * height;
  const numComponents = (ctype & 2 ? 3 : 1) + (hasAlpha ? 1 : 0);
  const rangeVal = Number(max - min) / (bytesPerComponent === 1 ? 255 : 65535);
  const baseVal = Number(min);
  // NOTE: pngDataBuffer usually has some trailing padding bytes. TypedArrays should have explicit sizes specified to prevent over-reading
  const pngDataBuffer = ((png.data as any) as Uint8Array).buffer; // The typings are wrong

  // NOTE: This function is a bit verbose. It's intentionally structured this way so that the JS engine can
  // statically determine the types of all variables involved in copying, and hopefully generate fast machine code.
  const intensityValues = new Float32Array(numPixels);
  const mask = new Uint8ClampedArray(numPixels);
  const dataView = new DataView(
    pngDataBuffer,
    0,
    numPixels * numComponents * bytesPerComponent
  );
  if (bytesPerComponent === 1) {
    for (let i = 0; i < numPixels; i++) {
      const byteOffset = i * numComponents * bytesPerComponent;
      intensityValues[i] = dataView.getUint8(byteOffset) * rangeVal + baseVal;
    }
    if (hasAlpha) {
      const alphaOffset = numComponents - 1;
      for (let i = 0; i < numPixels; i++) {
        const byteOffset = i * numComponents * bytesPerComponent + alphaOffset;
        mask[i] = dataView.getUint8(byteOffset) < 128 ? 0 : 255;
      }
    } else {
      mask.fill(255);
    }
  } else {
    for (let i = 0; i < numPixels; i++) {
      const byteOffset = i * numComponents * bytesPerComponent;
      intensityValues[i] =
        dataView.getUint16(byteOffset, false) * rangeVal + baseVal;
    }
    if (hasAlpha) {
      const alphaOffset = (numComponents - 1) * bytesPerComponent;
      for (let i = 0; i < numPixels; i++) {
        const byteOffset = i * numComponents * bytesPerComponent + alphaOffset;
        mask[i] = dataView.getUint16(byteOffset, false) < 32768 ? 0 : 255;
      }
    } else {
      mask.fill(255);
    }
  }

  return { intensityValues, mask };
}

function colorizeValues(
  intensityValues: Float32Array,
  mask: Uint8ClampedArray,
  maxIntensity: number
): Uint8ClampedArray {
  const outArray = new Uint8ClampedArray(intensityValues.length * 4);
  for (let i = 0; i < intensityValues.length; i++) {
    if (mask[i]) {
      const quantizedValue = Math.floor(
        (intensityValues[i] * 255) / maxIntensity
      );
      const [r, g, b, a] = colorScale[quantizedValue];

      outArray[i * 4] = r;
      outArray[i * 4 + 1] = g;
      outArray[i * 4 + 2] = b;
      outArray[i * 4 + 3] = a;
    } else {
      outArray[i * 4] = 0;
      outArray[i * 4 + 1] = 0;
      outArray[i * 4 + 2] = 0;
      outArray[i * 4 + 3] = 0;
    }
  }
  return outArray;
}

/**
 * Colorizes an ion image with the Viridis color map so that it's easier to visually interpret.
 * @param pngBytes An ArrayBuffer containing the raw bytes of the input PNG
 * @param minIntensity The minimum intensity value of the ion image
 * @param maxIntensity The maximum intensity value of the ion image
 * @returns {ImageData}
 */
export default function colorizeImage(
  pngBytes: ArrayBuffer,
  minIntensity: number,
  maxIntensity: number
): ImageData {
  const png = decode(pngBytes);
  const { intensityValues, mask } = extractIntensityAndMask(
    png,
    minIntensity,
    maxIntensity
  );
  const colorized = colorizeValues(intensityValues, mask, maxIntensity);
  return new ImageData(colorized, png.width, png.height);
}
