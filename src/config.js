import * as d3 from 'd3';

export const TYPES = d3.range(1100, 11100, 1000);
export const HAT_TYPES = d3.range(1100, 31100, 1000);
export const DEFAULT_MALE = {};
export const DEFAULT_FEMALE = {};

export const BODY_PARTS_FEMALE = [
    { title: 'Arms', name: 'armf-cls', gender: 'female' },
    { title: 'Body', name: 'bodyf-cls', gender: 'female' },
    { title: 'Hat', name: 'hatf-cls', gender: 'female' },
    { title: 'Tshirt', name: 'tshirf-cls', gender: 'female' },
    { title: 'Leg', name: 'pantsf-cls', gender: 'female' },
];

export const BODY_PARTS_MALE = [
    { title: 'Arms', name: 'arms-cls', gender: 'male' },
    { title: 'Body', name: 'bodym-cls', gender: 'male' },
    { title: 'Hat', name: 'hatm-cls', gender: 'male' },
    { title: 'Tshirt', name: 'tshirtm-cls', gender: 'male' },
    { title: 'Leg', name: 'legm-cls', gender: 'male' },
];

BODY_PARTS_FEMALE.forEach(k => {
    DEFAULT_FEMALE[k.name] = `/assets/${k.name}-${TYPES[0]}.svg`;
});

BODY_PARTS_MALE.forEach(k => {
    DEFAULT_MALE[k.name] = `/assets/${k.name}-${TYPES[0]}.svg`;
});