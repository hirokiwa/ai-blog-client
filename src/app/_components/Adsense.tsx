'use client';

import { useEffect } from 'react';

const AdSense = ({ adSlot }: { adSlot: string }) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', width: '100%', height: '90px' }}
      data-ad-client="ca-pub-5553296223899055"
      data-ad-slot={adSlot}
    />
  );
};

export default AdSense;
