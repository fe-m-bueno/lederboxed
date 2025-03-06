'use client';

import Image from 'next/image';

interface StarsProps {
  rating?: number;
}

export default function Stars({ rating = 0 }: StarsProps) {
  const fillPercentage = (rating / 10) * 100;

  return (
    <div className="relative w-[110px] h-[20px] filter hue-rotate-[320deg]">
      <Image
        src="/stars.webp"
        alt="Estrelas vazias"
        width={110}
        height={20}
        className="absolute inset-0 w-auto h-auto"
      />

      <Image
        src="/stars-filled.webp"
        alt="Estrelas preenchidas"
        width={110}
        height={20}
        className="absolute inset-0 w-auto h-auto"
        style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
      />
    </div>
  );
}
