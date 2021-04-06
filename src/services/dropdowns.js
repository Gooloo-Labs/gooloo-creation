import * as d3 from 'd3';

const svgId = 'main';
const dropdownId = 'dropdowns';
const formId = 'gooloos-form';

const bodyParts = [
    { title: 'Accessory', name: 'acc' },
    { title: 'Arms', name: 'arms' },
    { title: 'Body', name: 'body' },
    { title: 'Face', name: 'face' },
    { title: 'Hat', name: 'hat' },
    // { title: 'Clothes', name: 'cloth' },
];

const types = d3.range(1100, 11100, 1000);

const createDropdowns = () => {
    return bodyParts.map((d, di) => {
        return <NavDropdown title="Dropdown" key={di}>
            {types.map((k, ki) => {
                return <NavDropdown.Item href="#" key={ki} onClick={() => onClick(d, k)}>
                    <img src={`/assets/${d.name}-${k}.svg`} />
                    <span>{`${d.title} ${k}`}</span>
                </NavDropdown.Item>
            })}
        </NavDropdown>
    });



    const li = d3.select(`#${dropdownId}`)
        .selectAll('.nav-item')
        .data(bodyParts)
        .join('li')
        .attr('class', 'nav-item dropdown');

    const a = li.append('a')
        .attr('id', d => d.name)
        .attr('class', 'nav-link dropdown-toggle')
        .attr('href', '#')
        .attr('role', 'button')
        .attr('data-bs-toggle', 'dropdown')
        .attr('aria-expanded', 'false')
        .text(d => `Select ${d.title}`);

    const dropdownLink = li.append('ul')
        .attr('class', 'dropdown-menu')
        .attr('aria-expanded', d => d.name)
        .selectAll('li')
        .data(d => {
            return types.map(k => ({
                url: `/assets/${d.name}-${k}.svg`,
                type: d.name,
                title: `${d.title} ${k}`
            }))
        })
        .join('li');

    const dropdownLinka = dropdownLink.append('a')
        .attr('class', 'dropdown-item')
        .attr('href', '#');

    dropdownLinka
        .append('img')
        .attr('class', 'dropdown-img img-thumbnail')
        .attr('src', d => d.url);

    dropdownLinka
        .append('span')
        .text(d => d.title);

    dropdownLink.on('click', (event, d) => {
        d3.select(`#input-${d.type}`).attr('value', d.url);
    });
};

const submitForm = () => {
    const form = document.getElementById(formId);
    const data = Object.fromEntries(new FormData(form).entries());
    const keys = Object.keys(data);
    const result = keys.map(k => ({
        url: data[k],
        type: k
    }))
    loadGooloo(result, svgId);
};

const createForm = () => {
    d3.select(`#${formId}`)
        .selectAll('input')
        .data(bodyParts)
        .join('input')
        .attr('type', 'hidden')
        .attr('id', d => `input-${d.name}`)
        .attr('name', d => d.name)
        .attr('value', d => {
            return `/assets/${d.name}-${types[0]}.svg`;
        });

    d3.select(`#${formId}`)
        .append('button')
        .attr('class', 'btn btn-outline-success .submit-btn')
        .attr('type', 'submit')
        .text('Create Gooloo')
        .on('click', (e) => {
            e.preventDefault();
            submitForm();
        });
};

createDropdowns();
createForm();
submitForm();


