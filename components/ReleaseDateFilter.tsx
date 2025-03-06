'use client';

import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
export default function ReleaseDateFilter({
  releaseFrom,
  releaseTo,
  onChange,
  isActive,
}: {
  releaseFrom: string;
  releaseTo: string;
  onChange: (releaseFrom: string, releaseTo: string) => void;
  isActive: boolean;
}) {
  const [showCalendar, setShowCalendar] = useState(false);
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
          <CalendarIcon className="w-5 h-5" />
          {releaseFrom && releaseTo
            ? `${t('Release date')} ${releaseFrom} - ${releaseTo}`
            : t('Release date')}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[350px]">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">{t('Choose period')}</h3>
          <div className="flex items-center gap-4">
            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium">{t('From')}:</label>
              <div className="relative">
                <Input
                  type="date"
                  value={releaseFrom}
                  onChange={(e) => onChange(e.target.value, releaseTo)}
                  className="border rounded-md p-2 w-full text-sm"
                />
                <Button
                  variant="ghost"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  <CalendarIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium">{t('To')}:</label>
              <div className="relative ">
                <Input
                  type="date"
                  value={releaseTo}
                  onChange={(e) => onChange(releaseFrom, e.target.value)}
                  className="border rounded-md p-2 w-full text-sm"
                />
                <Button
                  variant="ghost"
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowCalendar(!showCalendar)}
                >
                  <CalendarIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {showCalendar && (
            <Calendar
              mode="single"
              selected={
                showCalendar
                  ? releaseFrom
                    ? new Date(releaseFrom)
                    : undefined
                  : releaseTo
                  ? new Date(releaseTo)
                  : undefined
              }
              onSelect={(date) => {
                if (date) {
                  if (showCalendar) {
                    onChange(date.toISOString().split('T')[0], releaseTo);
                  } else {
                    onChange(releaseFrom, date.toISOString().split('T')[0]);
                  }
                  setShowCalendar(!showCalendar);
                }
              }}
            />
          )}

          <Button
            variant="outline"
            size="sm"
            className="mt-2 w-full"
            onClick={() =>
              onChange(
                new Date().toISOString().split('T')[0],
                new Date().toISOString().split('T')[0]
              )
            }
          >
            {t('Today')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
