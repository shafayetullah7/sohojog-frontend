interface HeroiconProps {
  className?: string;
  viewBox?: string;
  width?: string;
  height?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: "round" | "butt" | "square";
  strokeLinejoin?: "round" | "miter" | "bevel";
  strokeDasharray?: string;
  strokeDashoffset?: number;
}

export type HeroIcon = React.ComponentType<HeroiconProps>; 
