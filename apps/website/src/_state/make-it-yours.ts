import { BorderRadius, Color, Mode, ThemeStyle } from '@qwik-ui/utils';

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
  'border-radius-0',
  'border-radius-dot-25',
  'border-radius-dot-50',
  'border-radius-dot-75',
  'border-radius-1',
];

export const modeOptions: Mode[] = [Mode.LIGHT, Mode.DARK];

export const primaryOptions = createPrimaryColors();

function createPrimaryColors() {
  const colorValues = Object.values(Color);

  const primaryColorsByLightness = [];
  for (let i = 300; i <= 900; i += 100) {
    for (const color of colorValues) {
      primaryColorsByLightness.push(`primary-${color}-${i}`);
    }
  }
  return primaryColorsByLightness;
}
