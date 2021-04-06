import * as d3 from 'd3';
import anime from 'animejs';

export const loadGooloo = (parts, element) => {
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

export const addSvgItems = (group, item, type) => {
    const elem = group
        .append('g')
        .attr('class', type)
        .node();

    d3.select(item).selectAll('*').each(function() {
        elem.append(this);
    });
};

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