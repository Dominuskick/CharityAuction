export function formatDateString(originalDateString) {
  const originalDate = new Date(originalDateString);

  // Получаем компоненты даты и времени
  const day = originalDate.getDate();
  const month = originalDate.getMonth() + 1; // Месяцы в JavaScript начинаются с 0
  const year = originalDate.getFullYear();
  const hours = originalDate.getHours();
  const minutes = originalDate.getMinutes();

  // Дополняем нулями, если компонент состоит из одной цифры
  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  // Форматируем строку в нужном формате
  const formattedString = `${formattedDay}.${formattedMonth}.${year}, ${formattedHours}:${formattedMinutes}`;

  return formattedString;
}

export function calculateTimeRemaining(endDate) {
  const currentTime = new Date();
  const endTime = new Date(endDate);

  // Разница в миллисекундах между текущим временем и датой окончания
  const timeDifference = endTime - currentTime;

  // Преобразуем разницу в дни, часы и минуты
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  // Формируем строку с оставшимся временем
  const remainingTime = `${days} днів ${hours} годин`;

  return remainingTime;
}
