let routes = {};
let templates = {};

let app_div = document.getElementById('app');

//simplify the 2 methods into one because they are similar
function renderPage(name, nextPageName, nextPageNamelink) {
    //instead of reloading the page, empty the HTML element. Is better from a performance, storage and user experience perspective
    app_div.innerHTML = "";

    //create HTML elements
    let div = document.createElement('div');
    let anchor = document.createElement('a');
    anchor.href = `#/${nextPageNamelink}`;
    anchor.innerText = nextPageName;
    
    div.innerHTML = `<h1>${name}</h1>`;

    div.appendChild(anchor);
    
    app_div.appendChild(div);
}

function route (path, template) {
    if (typeof template === 'function') {
        return routes[path] = template;
    }
    else if (typeof template === 'string') {
        return routes[path] = templates[template];
    } else {
        return;
    };
};

function template (name, templateFunction) {
    return templates[name] = templateFunction;
};

template('home', function(){
    renderPage('Home', 'About', 'about');
});

template('about', function(){
    //empty link beacuse the route is just a "/" so it doesnt need anything added to the URL
    renderPage('About', 'Home', '');
});

route('/', 'home');
route('/about', 'about');

function resolveRoute(route) {
    try {
        return routes[route];
    } catch (e) {
        throw new Error(`Route ${route} not found`);
    };
};

function router(evt) {
    let url = window.location.hash.slice(1) || '/';
    let route = resolveRoute(url);

    route();
};

window.addEventListener('load', router);

window.addEventListener('hashchange', router)
