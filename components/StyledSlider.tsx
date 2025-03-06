'use client';

import { Slider, SliderProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@/hooks/useTheme';
import { fontFamily } from '@mui/system';

const ShadcnSlider = styled(Slider)(({ theme }) => {
  const mode = useTheme().theme;

  return {
    color: mode === 'dark' ? 'hsl(0, 0%, 98%)' : 'hsl(240, 10%, 4%)',
    height: 6,
    '& .MuiSlider-thumb': {
      height: 16,
      width: 16,
      backgroundColor:
        mode === 'dark' ? 'hsl(0, 0%, 98%)' : 'hsl(240, 10%, 4%)',
      border: `2px solid ${
        mode === 'dark' ? 'hsl(0, 0%, 98%)' : 'hsl(240, 10%, 4%)'
      }`,
      '&:hover, &.Mui-focusVisible': {
        backgroundColor:
          mode === 'dark' ? 'hsl(0, 0%, 98%)' : 'hsl(240, 10%, 4%)',
        borderColor: mode === 'dark' ? 'hsl(0, 0%, 98%)' : 'hsl(240, 10%, 4%)',
        boxShadow: 'none',
      },
    },
    '& .MuiSlider-track': {
      backgroundColor:
        mode === 'dark' ? 'hsl(0, 0%, 98%)' : 'hsl(240, 10%, 4%)',
    },
    '& .MuiSlider-rail': {
      backgroundColor:
        mode === 'dark' ? 'hsl(0, 0%, 98%)' : 'hsl(240, 10%, 4%)',
      opacity: 0.3,
    },
    '& .MuiSlider-valueLabel': {
      backgroundColor:
        mode === 'dark' ? 'hsl(0, 0%, 98%)' : 'hsl(240, 10%, 4%)',
      color: mode === 'dark' ? 'hsl(240, 10%, 4%)' : 'hsl(0, 0%, 98%)',
      fontSize: '12px',
      fontFamily: 'Public Sans Variable',
      borderRadius: '6px',
      padding: '8px 8px',
    },
  };
});

export default function StyledSlider(props: SliderProps) {
  return <ShadcnSlider {...props} />;
}
