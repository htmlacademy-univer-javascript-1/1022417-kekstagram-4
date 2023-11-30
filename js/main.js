const PUBLISHED_PHOTOS_COUNT = 25;

const PhotoSettings = {
  ID_RANGE: {
    MIN: 1,
    MAX: 25
  },
  URL_ID_RANGE: {
    MIN: 1,
    MAX: 25
  },
  LIKES_COUNT_RANGE: {
    MIN: 15,
    MAX: 200
  },
  COMMENTS_COUNT_RANGE: {
    MIN: 0,
    MAX: 30
  },
  DESCRIPTIONS_DATA: [
    'Всё было не зря',
    'Дом Перцовой. Москва',
    'Раньше так и общались',
    'Занятное наблюдение',
    'Георгий и хлебная фабрика',
    'Факт о крикете',
    'Дачные замки под Петербургом',
    'Нет человека — нет проблемы',
    'Лица иностранцев представили'
  ]
};

const CommentSettings = {
  AVATAR_ID_RANGE: {
    MIN: 1,
    MAX: 6
  },
  MESSAGE_DATA: [
    'Всё отлично!',
    'В целом всё неплохо.Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент?!'
  ],
  NAMES_DATA: [
    'Артём',
    'Евфросиния',
    'Роман',
    'Аглая',
    'Павел',
    'Игнат',
    'Осип',
    'Яна',
    'Олимпия',
    'Катарина',
    'Якун',
    'Сильвестр',
  ]
};

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(elements) {
  return elements[getRandomInteger(0, elements.length)];
}

function createGeneratorId(min = 0, max = Number.MAX_SAFE_INTEGER) {
  const previousValues = [];
  const maxSize = max - min + 1;

  return function () {
    if (previousValues.length >= maxSize) {
      return null;
    }

    let id = getRandomInteger(min, max);
    while (previousValues.includes(id)) {
      id = getRandomInteger(min, max);
    }

    previousValues.push(id);
    return id;
  };
}

const commentIdGenerator = createGeneratorId(0);
const photoUrlIdGenerator = createGeneratorId(
  PhotoSettings.URL_ID_RANGE.MIN,
  PhotoSettings.URL_ID_RANGE.MAX
);
const photoIdGenerator = createGeneratorId(
  PhotoSettings.ID_RANGE.MIN,
  PhotoSettings.ID_RANGE.MAX
);

function Comment(id, avatar, message, name) {
  this.id = id;
  this.avatar = avatar;
  this.message = message;
  this.name = name;
}

function generateRandomComment() {
  return new Comment(
    commentIdGenerator(),
    `img/avatar-${getRandomInteger(
      CommentSettings.AVATAR_ID_RANGE.MIN,
      CommentSettings.AVATAR_ID_RANGE.MAX
    )}.svg`,
    getRandomElement(CommentSettings.MESSAGE_DATA),
    getRandomElement(CommentSettings.NAMES_DATA)
  );
}

function Photo(id, url, desctription, likesCount, comments) {
  this.id = id;
  this.url = url;
  this.desctription = desctription;
  this.likes = likesCount;
  this.comments = comments;
}

function generateRandomPhoto() {
  return new Photo(
    photoIdGenerator(),
    `photos/${photoUrlIdGenerator()}.jpg`,
    getRandomElement(PhotoSettings.DESCRIPTIONS_DATA),
    getRandomInteger(
      PhotoSettings.LIKES_COUNT_RANGE.MIN,
      PhotoSettings.LIKES_COUNT_RANGE.MAX
    ),
    Array.from(
      {
        length: getRandomInteger(
          PhotoSettings.COMMENTS_COUNT_RANGE.MIN,
          PhotoSettings.COMMENTS_COUNT_RANGE.MAX,
        )
      },
      generateRandomComment
    )
  );
}

const photosData = Array.from({ length: PUBLISHED_PHOTOS_COUNT }, generateRandomPhoto);

// Сортируем массив в порядке популярности (число_лайков + 3 * число_коментариев)
photosData.sort((photo1, photo2) => {
  const popularity1 = photo1.likes + 3 * photo1.comments.length;
  const popularity2 = photo2.likes + 3 * photo2.comments.length;
  if (popularity1 === popularity2) {
    return 0;
  }

  return (popularity1 > popularity2) ? 1 : -1;
});
