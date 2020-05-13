window.addEventListener('DOMContentLoaded', () => {
    section = document.querySelector('section')
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'data.json', true)
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            const response = JSON.parse(xhr.responseText)
            response.forEach(data => {
                loadContent(data)
            });

        }
    };
    xhr.send();

    function loadContent(data) {
        card = create_and_append(section, 'div', 'card')
        img = create_and_append(card, 'img', 'img', data.logo)
        left_div = create_and_append(card, 'div', 'left_div')
        right_div = create_and_append(card, 'div', 'right_div')
        left_up_div = create_and_append(left_div, 'div', 'left_up_div')
        create_and_append(left_div, 'h3', 'position', data.position)
        left_down_div = create_and_append(left_div, 'div', 'left_down_div')

        //left up div`

        create_and_append(left_up_div, 'p', 'company', data.company)
        if (data.new) {
            create_and_append(left_up_div, 'p', 'new', 'new!')
        }
        if (data.featured) {
            create_and_append(left_up_div, 'p', 'featured', 'featured')
        }

        //left down div
        create_and_append(left_down_div, 'p', 'date', data.postedAt)
        create_and_append(left_down_div, 'p', 'contract', data.contract)
        create_and_append(left_down_div, 'p', 'location', data.location)
        //right div
        create_and_append(right_div, 'span', 'role', data.role)
        create_and_append(right_div, 'span', 'level', data.level)
        languages = create_and_append(right_div, 'p', 'languages')
        tools = create_and_append(right_div, 'p', 'tools')
        //programming laguages
        for (const lang of data.languages) {
            create_and_append(languages, 'span', 'prog_lang', lang)
        }
        if (data.tools)
            for (const tool of data.tools) {
                create_and_append(tools, 'span', 'lang_tool', tool)
            }



    }

    function create_and_append(parent, el, cls, content) {
        html_el = create_element(el, cls, content)
        parent.append(html_el)
        return html_el
    }

    function create_element(el, cls, content) {
        elem = document.createElement(el);
        elem.classList.add(cls)
        if (el == "img") {
            elem.setAttribute("src", content)
        } else {
            elem.textContent = content
        }
        return elem

    }
})