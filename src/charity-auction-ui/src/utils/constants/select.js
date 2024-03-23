export const categoryOptions = [
  { value: 'Антикваріат', label: 'Антикваріат' },
  { value: 'Букіністика', label: 'Букіністика' },
  { value: 'Живопис', label: 'Живопис' },
  { value: 'Електроніка', label: 'Електроніка' },
  { value: 'Пам’ятні предмети', label: 'Пам’ятні предмети' },
  { value: 'Ручна робота', label: 'Ручна робота' },
  { value: 'Інше', label: 'Інше' },
];

export const priceOptions = [
  { value: 'В порядку зростання', label: 'В порядку зростання' },
  { value: 'В порядку спадання', label: 'В порядку спадання' },
];

export const noveltyOptions = [
  { value: 'Від більш нових', label: 'Від більш нових' },
  { value: 'Від більш старих', label: 'Від більш старих' },
];

export const relevanceOptions = [
  { value: 'Активні', label: 'Активні' },
  { value: 'Продані', label: 'Продані' },
];

export const selectStyles = {
  menu: (provided) => ({
    ...provided,
    marginTop: 0,
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
};

export const selectStylesDarkColor = {
  menu: (provided) => ({
    ...provided,
    marginTop: 0, // Убираем верхний отступ между селектом и вариантами
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0, // Убираем внутренний отступ вокруг вариантов
  }),
  option: (provided) => ({
    ...provided,
    color: '#131313', // Устанавливаем цвет текста в черный
  }),
  control: (provided) => ({
    ...provided,
    borderColor: '#131313', // Устанавливаем цвет обводки в черный
  }),
};
