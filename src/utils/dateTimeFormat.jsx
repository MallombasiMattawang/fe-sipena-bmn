// dateTimeFormat.jsx

export default function dateTimeFormat(dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `Tanggal ${formattedDate}, Pukul ${formattedTime} Wita`;
}
