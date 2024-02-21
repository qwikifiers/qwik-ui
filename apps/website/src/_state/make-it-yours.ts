import { BorderRadius, Color, Contrast, Mode, ThemeStyle } from '@qwik-ui/utils';

export const baseOptions = [
  Color.SLATE,
  Color.GRAY,
  Color.ZINC,
  Color.NEUTRAL,
  Color.STONE,
].map((color) => `base-${color}`);

export const styleOptions: ThemeStyle[] = [
  ThemeStyle.SIMPLE,
  ThemeStyle.BRUTALIST,
  ThemeStyle.NEUMORPHIC,
];

export const borderRadiusOptions: BorderRadius[] = [
  BorderRadius.BORDER_RADIUS_0,
  BorderRadius.BORDER_RADIUS_025,
  BorderRadius.BORDER_RADIUS_050,
  BorderRadius.BORDER_RADIUS_075,
  BorderRadius.BORDER_RADIUS_1,
];

export const contrastOptions: Contrast[] = [
  Contrast.HIGH_CONTRAST,
  Contrast.LOW_CONTRAST,
];

export const modeOptions: Mode[] = [Mode.LIGHT, Mode.DARK];

export const primaryOptions = createPrimaryColors();

function createPrimaryColors() {
  const colorValues = Object.values(Color);

  const primaryColorsByLightness = [];
  for (let i = 100; i <= 900; i += 100) {
    for (const color of colorValues) {
      primaryColorsByLightness.push(`primary-${color}-${i}`);
    }
  }
  return primaryColorsByLightness;
}
