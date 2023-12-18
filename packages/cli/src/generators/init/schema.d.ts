import { StyledKit } from './styled-kit.enum';

export interface InitGeneratorSchema {
  projectRoot?: string;
  rootCssPath?: string;
  tailwindConfigPath?: string;
  styledKit?: StyledKit;
  componentsRoot?: string;
}
