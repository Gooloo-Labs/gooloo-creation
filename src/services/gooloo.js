import * as d3 from 'd3';
import anime from 'animejs';
import { HATS_SHADOW } from '../config';

// in case hat has a shadow get the shadowed parts
const getShadowedHat = (parts) => {
    const hat = parts.find(k => k.type.indexOf('hat') !== -1);
    const shadowedHat = HATS_SHADOW.find(k => hat.url.indexOf(k.name) !== -1);
    if(shadowedHat) {
        parts = parts.filter(k => k.type.indexOf('hat') === -1);
        parts.splice(0, 0, { url: `/hat_shadow/${shadowedHat.shadow}.svg`, type: hat.type });
        parts.splice(parts.length, 0, { url: `/hat_shadow/${shadowedHat.main}.svg`, type: hat.type });
    }
    return parts;
};

// load the gooloo images
export const loadGooloo = (parts, element) => {
    parts = getShadowedHat(parts);

    const promises = parts.map(k => d3.xml(k.url));

    Promise.all(promises)
    .then(data => {
        d3.select(element).selectAll("*").remove();
        const group = d3.select(element)
            .append('g')
            .attr('class', 'gooloo')
            .attr('transform', 'scale(4) translate(-5, -30)');

        data.forEach((item, index) => {
            addSvgItems(group, item.documentElement, parts[index].type);
        });

        createAnimation(element);
    });
};

// add items to form new gooloo svg
export const addSvgItems = (group, item, type) => {
    const elem = group
        .append('g')
        .attr('class', type)
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
        translateX: [-5, -5],
        translateY: [-30, -32],
        borderRadius: 50,
        duration: 800,
        easing: 'linear',
        direction: 'alternate',
        loop: true
    }); 
};