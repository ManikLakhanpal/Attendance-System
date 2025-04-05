'use client';

import { useEffect, useState } from 'react';

export default function ClientDate({ dateString }) {
  const [localDate, setLocalDate] = useState('');

  useEffect(() => {
    if (dateString) {
      const formatted = new Date(dateString).toLocaleString();
      setLocalDate(formatted);
    }
  }, [dateString]);

  return <span>{localDate}</span>;
}
