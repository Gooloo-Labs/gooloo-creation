import * as d3 from 'd3';
import anime from 'animejs';
import {
    HATS_SHADOW,
} from '../config';

import {
    EYES_MALE,
    EYES_FEMALE,
} from '../assets'

// in case hat has a shadow get the shadowed parts
const getShadowedHat = (parts) => {
    const hat = parts.find(k => k.type.indexOf('hat') !== -1);
    if (hat) {
        const shadowedHat = HATS_SHADOW.find(k => hat.url.indexOf(k.name) !== -1);
        if(shadowedHat) {
            parts = parts.filter(k => k.type.indexOf('hat') === -1);
            parts.splice(0, 0, { url: `/hat_shadow/${shadowedHat.shadow}.svg`, type: hat.type });
            parts.splice(parts.length, 0, { url: `/hat_shadow/${shadowedHat.main}.svg`, type: hat.type });
        }
    }
    return parts;
};

const addEyes = (type, parts) => {
    console.log('@@@@', type)
    if(type === 'male') {
        EYES_MALE.forEach(k => {
            parts.push({
                url: `/assets/${k.url}`,
                type: k.type
            });
        })
    } else {
        EYES_FEMALE.forEach(k => {
            parts.push({
                url: `/assets/${k.url}`,
                type: k.type
            });
        });
    }
    return parts;
}

// load the gooloo images
export const loadGooloo = (parts, element, type) => {
    parts = getShadowedHat(parts);
    parts = addEyes(type, parts)

    const promises = parts.map(k => d3.xml(k.url));

    Promise.all(promises)
    .then(data => {
        d3.select(element).selectAll("*").remove();

        const groupBg = d3.select(element)
            .append('g')
            .attr('class', 'googoo-bg');

        const group = d3.select(element)
            .append('g')
            .attr('class', 'gooloo')
            .attr('transform', 'scale(4) translate(-12, -38)');

        data.forEach((item, index) => {
            if(['bgm', 'bgf'].indexOf(parts[index].type) !== -1) {
                addSvg(groupBg, item.documentElement, parts[index].type);
            } else {
                // if background add the whole image as svg
                addSvgItems(group, item.documentElement, parts[index].type);
            }
        });



        createAnimation(element);
    });
};

export const addSvg = (group, item, type) => {
    group.node().append(item);
};

// add items to form new gooloo svg
export const addSvgItems = (group, item, type) => {
    const elem = group
        .append('g')
        .attr('class', type)
        .classed('hidden', type === 'eye_closed')
        .classed('eye', ['eye_closed', 'eye_open'].indexOf(type) !== -1)
        .node();

    d3.select(item).selectAll('*').each(function() {
        elem.append(this);
    });
};

// animate the gooloo
export const createAnimation = (element) => {
    anime({
        // targets: `#${id} .gooloo`,
        targets: d3.select(element).select('.gooloo').node(),
        scale: [4, 4],
        translateX: [-12, -12],
        translateY: [-38, -40],
        borderRadius: 50,
        duration: 800,
        easing: 'linear',
        direction: 'alternate',
        loop: true
    }); 
};