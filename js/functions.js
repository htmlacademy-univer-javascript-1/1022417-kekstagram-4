/*
Функция для проверки длины строки. Она принимает строку, которую нужно проверить,
 и максимальную длину и возвращает true, если строка меньше или равна указанной
 длине, и false, если строка длиннее. Эта функция нам пригодится для валидации
 формы.
*/
function validateStringLen(string, maxLength) {
  return string.length <= maxLength;
}

// Примеры
validateStringLen('проверяемая строка', 20); // true
validateStringLen('проверяемая строка', 18); // true
validateStringLen('проверяемая строка', 10); // false

/*
Функция для проверки, является ли строка палиндромом. Палиндром — это слово или
 фраза, которые одинаково читаются и слева направо и справа налево.
*/
function isPalindrome(string) {
  string = string.replaceAll(' ', '').toLowerCase();

  let left = 0, right = string.length - 1;
  while (left < right && string[left] === string[right]) {
    ++left;
    --right;
  }

  return left >= right;
}

// Примеры
isPalindrome('топот');  // true
isPalindrome('ДовОд');  // true
isPalindrome('Кекс');   // false
isPalindrome('Лёша на полке клопа нашёл ');  // true

/*
Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает
 их в виде целого положительного числа. Если в строке нет ни одной цифры, функция
 должна вернуть NaN:
*/

function isDigit(char) {
  return '0' <= char && char <= '9';
}

function extractNumber(target) {
  let result = '';
  target = String(target);
  for (let i = 0; i < target.length; i++) {
    if (isDigit(target[i])) {
      result += target[i];
    }
  }
  return parseInt(result, 10);
}

// Примеры
extractNumber('2023 год');            //2023
extractNumber('ECMAScript 2022');     //2022
extractNumber('1 кефир, 0.5 батона'); //105
extractNumber('агент 007');           //7
extractNumber('а я томат');           //NaN
extractNumber(2023);                  //2023
extractNumber(-1);                    //1
extractNumber(1.5);                   //15


/*
  Функцию, которая принимает время начала и конца рабочего дня, а также время
   старта и продолжительность встречи в минутах и возвращает true, если встреча
   не выходит за рамки рабочего дня, и false, если выходит.
*/
function isWithinTime(begin, end, start, duration) {
  const timeCalcul = (total, current) => (60 * total + Number(current));

  const timeBegin = begin.split(':').reduce(timeCalcul, 0);
  const timeEnd = end.split(':').reduce(timeCalcul, 0);
  const timeStart = start.split(':').reduce(timeCalcul, 0);

  return timeStart >= timeBegin && (timeStart + duration) <= timeEnd;
}

/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/
isWithinTime('08:00', '17:30', '14:00', 90); // true
isWithinTime('8:0', '10:0', '8:0', 120);     // true
isWithinTime('08:00', '14:30', '14:00', 90); // false
isWithinTime('14:00', '17:30', '08:0', 90);  // false
isWithinTime('8:00', '17:30', '08:00', 900); // false
