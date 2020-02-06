import NekoContextMenu from './neko-context-menu'
const randomSentence = require('random-sentence');

const ContextMenu = new NekoContextMenu({
    selector: '[data-context="main"]',
    items: [
        {
            name: "Add item",
            callback: function (evt, ui, target) {
                evt.preventDefault();
                createItem(target);
            },
            icon: 'fas fa-list-ul',
        },
        {
            name: "Add container",
            callback: function (evt, ui) {
                evt.preventDefault();
                createContainer();
            },
            icon: 'far fa-plus-square',
        },
        {
            name: "Remove container",
            callback: function (evt, ui, target) {
                evt.preventDefault();
                removeContainer(target, evt);
            },
            icon: 'far fa-trash-alt',
        }
        
    ]
});

function createItem(parent) {

    const p = $('<p></p>')
    p.addClass('text-dark')
    p.text(randomSentence({min: 4, max: 9}))
    $(parent).append(p)

    new NekoContextMenu({
        selector: p,
        items: [
            {
                name: 'Alert me',
                icon: 'far fa-bell',
                callback: function (evt, ui) {
                    alert('You clicked to the element sentence : ' + ui.text())
                }
            },
            {
                name: 'Delete',
                callback: function (evt, ui) {
                    ui.remove()
                },
                icon: 'far fa-trash-alt'
            }
        ]
    })

}

function createContainer() {
    const div = $('<div></div>')
    div.attr('data-context', 'main')
    div.html(`<h1>New container</h1>`)
    $('body').append(div)
    ContextMenu.refresh()
}

function removeContainer(parent, evt) {
    let elements = ContextMenu.selector.length
    if (elements > 1) {
        $(parent).remove()
        ContextMenu.refresh()
    } else {
        alert("C'est le dernier conteneur !")
    }

}
