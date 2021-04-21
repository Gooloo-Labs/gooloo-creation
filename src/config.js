import {
    EYES_MALE,
    EYES_FEMALE,

    COMMON_BODY_FEMALE,
    COMMON_SHIRT_FEMALE,
    COMMON_PANTS_FEMALE,
    COMMON_HAT_FEMALE,

    COMMON_BODY_MALE,
    COMMON_SHIRT_MALE,
    COMMON_PANTS_MALE,
    COMMON_HAT_MALE,

    RARE_BODY_FEMALE,
    RARE_BODY_MALE,
    RARE_HAT_FEMALE,
    RARE_HAT_MALE,
    RARE_ONESIE_FEMALE,
    RARE_ONESIE_MALE,

    SUPER_RARE_BG_FEMALE,
    SUPER_RARE_BG_MALE,
    SUPER_RARE_BODY_FEMALE,
    SUPER_RARE_BODY_MALE,
    SUPER_RARE_ONESIE_FEMALE,
    SUPER_RARE_ONESIE_MALE
} from './assets';

export const DEFAULT_MALE = {};
export const DEFAULT_FEMALE = {};
export const RARE_DEFAULT_MALE = {};
export const RARE_DEFAULT_FEMALE = {};
export const SUPER_RARE_DEFAULT_MALE = {};
export const SUPER_RARE_DEFAULT_FEMALE = {};

export const BODY_PARTS_FEMALE = [
    { title: 'Body', name: 'bodyf', gender: 'female', assets: COMMON_BODY_FEMALE },
    { title: 'Shirt', name: 'shirtf', gender: 'female', assets: COMMON_SHIRT_FEMALE },
    { title: 'Pants', name: 'pantsf', gender: 'female', assets: COMMON_PANTS_FEMALE },
    { title: 'Hat', name: 'hatf', gender: 'female', assets: COMMON_HAT_FEMALE },
];

export const BODY_PARTS_MALE = [
    { title: 'Body', name: 'bodyf', gender: 'male', assets: COMMON_BODY_MALE },
    { title: 'Shirt', name: 'shirtf', gender: 'male', assets: COMMON_SHIRT_MALE },
    { title: 'Pants', name: 'pantsf', gender: 'male', assets: COMMON_PANTS_MALE },
    { title: 'Hat', name: 'hatf', gender: 'male', assets: COMMON_HAT_MALE },
];

export const RARE_BODY_PARTS_FEMALE = [
    { title: 'Body', name: 'bodyf', gender: 'female', assets: RARE_BODY_FEMALE },
    { title: 'OneSie', name: 'onesief', gender: 'female', assets: RARE_ONESIE_FEMALE },
    { title: 'Hat', name: 'hatf', gender: 'female', assets: RARE_HAT_FEMALE },
];

export const RARE_BODY_PARTS_MALE = [
    { title: 'Body', name: 'bodyf', gender: 'male', assets: RARE_BODY_MALE },
    { title: 'OneSie', name: 'onesiem', gender: 'male', assets: RARE_ONESIE_MALE },
    { title: 'Hat', name: 'hatf', gender: 'male', assets: RARE_HAT_MALE },
];

export const SUPER_RARE_BODY_PARTS_FEMALE = [
    { title: 'Background', name: 'bgf', gender: 'female', assets: SUPER_RARE_BG_FEMALE },
    { title: 'Body', name: 'bodyf', gender: 'female', assets: SUPER_RARE_BODY_FEMALE },
    { title: 'OneSie', name: 'onesief', gender: 'female', assets: SUPER_RARE_ONESIE_FEMALE },
];

export const SUPER_RARE_BODY_PARTS_MALE = [
    { title: 'Background', name: 'bgm', gender: 'male', assets: SUPER_RARE_BG_MALE },
    { title: 'Body', name: 'bodyf', gender: 'male', assets: SUPER_RARE_BODY_MALE },
    { title: 'OneSie', name: 'onesiem', gender: 'male', assets: SUPER_RARE_ONESIE_MALE },
];

export const HATS_SHADOW = [
    {
        name: 'hatf-cls-3100',
        main: 'hatm-cls-95_a100',
        shadow: 'hatm-cls-95_b100'
    },
    {
        name: 'hatf-cls-8100',
        main: 'hatm-cls-94_a100',
        shadow: 'hatm-cls-94_b100'
    },
    {
        name: 'hatm-cls-7100',
        main: 'hatm-cls-96_a100',
        shadow: 'hatm-cls-96_b100'
    },
    {
        name: 'hatm-cls-4100',
        main: 'hatm-cls-97_a100',
        shadow: 'hatm-cls-97_b100'
    },
    {
        name: 'hatm-cls-1100',
        main: 'hatm-cls-98_a100',
        shadow: 'hatm-cls-98_b100'
    },
]

BODY_PARTS_FEMALE.forEach(k => {
    DEFAULT_FEMALE[k.name] = `/assets/${k.assets[0]}`;
});

BODY_PARTS_MALE.forEach(k => {
    DEFAULT_MALE[k.name] = `/assets/${k.assets[0]}`;
});

RARE_BODY_PARTS_FEMALE.forEach(k => {
    RARE_DEFAULT_FEMALE[k.name] = `/assets/${k.assets[0]}`;
});

RARE_BODY_PARTS_MALE.forEach(k => {
    RARE_DEFAULT_MALE[k.name] = `/assets/${k.assets[0]}`;
});

SUPER_RARE_BODY_PARTS_FEMALE.forEach(k => {
    SUPER_RARE_DEFAULT_FEMALE[k.name] = `/assets/${k.assets[0]}`;
});

SUPER_RARE_BODY_PARTS_MALE.forEach(k => {
    SUPER_RARE_DEFAULT_MALE[k.name] = `/assets/${k.assets[0]}`;
});

export const TYPES = [
    {
        title: 'Common',
        value: 'common',
        defaultMale: DEFAULT_MALE,
        defaultFemale: DEFAULT_FEMALE,
        bodyPartMale: BODY_PARTS_MALE,
        bodyPartFemale: BODY_PARTS_FEMALE
    },
    {
        title: 'Rare',
        value: 'rare',
        defaultMale: RARE_DEFAULT_MALE,
        defaultFemale: RARE_DEFAULT_FEMALE,
        bodyPartMale: RARE_BODY_PARTS_MALE,
        bodyPartFemale: RARE_BODY_PARTS_FEMALE
    },
    {
        title: 'Super Rare',
        value: 'super_rare',
        defaultMale: SUPER_RARE_DEFAULT_MALE,
        defaultFemale: SUPER_RARE_DEFAULT_FEMALE,
        bodyPartMale: SUPER_RARE_BODY_PARTS_MALE,
        bodyPartFemale: SUPER_RARE_BODY_PARTS_FEMALE
    },
];

export const DEFAULT_TYPE = TYPES[0];