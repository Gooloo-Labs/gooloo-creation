import * as d3 from 'd3';
import anime from 'animejs';

import {
    HATS_SHADOW,
    EYES_MALE,
    EYES_FEMALE,
} from '../assets';

let eyeInterval;
let interval;

// in case hat has a shadow get the shadowed parts
const getShadowedHat = (parts) => {
    const hat = parts.find(k => k.type.indexOf('hat') !== -1);
    if (hat) {
        const shadowedHat = HATS_SHADOW.find(k => hat.url.indexOf(k.name) !== -1);
        if(shadowedHat) {
            parts = parts.filter(k => k.type.indexOf('hat') === -1);
            parts.splice(0, 0, { url: `/assets/${shadowedHat.shadow}`, type: hat.type });
            parts.splice(parts.length, 0, { url: `/assets/${shadowedHat.main}`, type: hat.type });
        }
    }
    return parts;
};

const addEyes = (type, parts) => {
    if(type === 'male') {
        EYES_MALE.forEach(k => {
            parts.push({
                url: `/eyeblink/${k.url}`,
                type: k.type
            });
        })
    } else {
        EYES_FEMALE.forEach(k => {
            parts.push({
                url: `/eyeblink/${k.url}`,
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

    if(eyeInterval) clearInterval(eyeInterval);
    if(interval) clearInterval(interval);

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
                // if(['eye_closed', 'eye_open'].indexOf(parts[index].type) !== -1)
                // if(['pantsm'].indexOf(parts[index].type) !== -1)
                addSvgItems(group, item.documentElement, parts[index].type);
            }
        });

        createAnimation(element, group);
        // interval = createBodyAnimation(element, group);
        eyeInterval = createEyeAnimation(element, group);

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
        // .classed('hidden', type === 'eye_closed')
        .classed('eye', ['eye_closed', 'eye_open'].indexOf(type) !== -1)
        .node();

    d3.select(item).selectAll('*').each(function() {
        elem.append(this);
    });
};

// animate gooloo eyes
export const createEyeAnimation = (element, group) => {
    const duration = 750;
    const anim = () => {
        const t = d3.transition()
            .delay(duration)
            .ease(d3.easeLinear);

        group.select('.eye_open')
            .style('opacity', 1)
            .transition(t)
            .style('opacity', 0);
    };

    const interval = setInterval(anim, duration * 2);
    anim();
    return interval;
};

// animate the gooloo using d3
export const createBodyAnimation = (element, group) => {
    const duration = 1000;
    const anim = () => {
        const t = d3.transition()
            .duration(duration)
            .ease(d3.easeLinear);

        d3.select(element).select('.gooloo')
            .attr('transform', 'scale(4) translate(-12, -38)')
            .transition(t)
            .attr('transform', 'scale(4) translate(-12, -42)')
            .transition(t)
            .attr('transform', 'scale(4) translate(-12, -38)');
    };

    const interval = setInterval(anim, duration * 2);
    anim();
    return interval;
};

// animate the gooloo using animejs
export const createAnimation = (element, group) => {
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