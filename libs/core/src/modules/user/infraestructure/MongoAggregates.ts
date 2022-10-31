export const profile = [
  {
    $lookup: {
      from: 'profile',
      localField: 'profile',
      foreignField: '_id',
      as: 'profile',
    },
  },
  {
    $unwind: {
      path: '$profile',
      includeArrayIndex: 'string',
      preserveNullAndEmptyArrays: false,
    },
  },
];

export const login = (identifier: string) => [
  {
    $match: {
      $or: [{ username: identifier }, { email: identifier }],
    },
  },
];
