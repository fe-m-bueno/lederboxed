'use client';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useRouter } from 'next/navigation';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const router = useRouter();

  const [selectedLanguage, setSelectedLanguage] = useState<string>('en'); // Fallback padrão

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'pt', label: 'Português do Brasil' },
    { value: 'es', label: 'Español' },
  ];

  useEffect(() => {
    const detectedLang = i18n.language.toLowerCase();

    const matchedLang =
      languageOptions.find((opt) => detectedLang.startsWith(opt.value))
        ?.value || 'en';
    setSelectedLanguage(matchedLang);
  }, [i18n.language]);

  const handleChange = (value: string) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(value);
    localStorage.setItem('i18nextLng', value);
    router.refresh();
  };

  return (
    <Select value={selectedLanguage} onValueChange={handleChange}>
      <SelectTrigger className="w-44">
        <SelectValue placeholder={selectedLanguage} />
      </SelectTrigger>
      <SelectContent>
        {languageOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
