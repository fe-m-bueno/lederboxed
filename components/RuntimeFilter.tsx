'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import StyledSlider from '@/components/StyledSlider';
import { useTranslation } from 'react-i18next';
import { Badge } from './ui/badge';
export default function RuntimeFilter({
  value,
  onChange,
  isActive,
}: {
  value: number;
  onChange: (value: number) => void;
  isActive: boolean;
}) {
  const { t } = useTranslation();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`flex gap-2 ${
            isActive ? 'bg-primary/20 border-primary' : ''
          }`}
        >
          {value ? (
            <>
              {t('Runtime')}{' '}
              <Badge variant="default" className="ml-2">
                {`> ${value} ${t('minutes')}`}
              </Badge>
            </>
          ) : (
            t('Runtime')
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2 items-center justify-center">
          <p className="text-sm text-accent-foreground">
            {t('Greater than')} {value} {t('minutes')}
          </p>
          <StyledSlider
            value={value}
            onChange={(_, newValue) => onChange(newValue as number)}
            min={0}
            max={400}
            step={30}
            valueLabelDisplay="auto"
            marks
            color="primary"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
