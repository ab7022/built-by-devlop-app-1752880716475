import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
export default function Logo({ size = 64 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Rect width="64" height="64" rx="16" fill="#0ea5e9" />
      <Path d="M32 16C25.3726 16 20 21.3726 20 28C20 34.6274 25.3726 40 32 40C38.6274 40 44 34.6274 44 28C44 21.3726 38.6274 16 32 16ZM32 36C27.5817 36 24 32.4183 24 28C24 23.5817 27.5817 20 32 20C36.4183 20 40 23.5817 40 28C40 32.4183 36.4183 36 32 36Z" fill="#fff" />
      <Path d="M24 48C24 44.6863 30.6863 44 32 44C33.3137 44 40 44.6863 40 48V52H24V48Z" fill="#fff" />
    </Svg>
  );
}
