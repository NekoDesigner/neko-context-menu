# Intallation

Install package

```shell
npm install neko-context-menu --save
```

Import add this lines to your CSS

```scss
@import path/to/neko-context-menu.css;
```

Import in your project :

With js compiler like WebPack :
```js
import NekoContextMenu from 'neko-context-menu'
```

# Usage

```html
<div data-context="main">
    <h1>Neko Context Menu</h1>
    <p>Faites un clique droit pour ajouter des éléments</p>
</div>
```

```javascript
import NekoContextMenu from 'neko-context-menu'

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
    p.text("My text")
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
    let elements = $(ContextMenu.selector).length
    if (elements > 1) {
        $(parent).remove()
    } else {
        alert("C'est le dernier conteneur !")
    }

}

```

## Options

### selector 
Type: String  
Required  
Elément that you want open the contextual menu on right click.

### items
Type: Array
Required
Array of object. Each object is a section of your contextual menu and fonctionnality.

```javascript
{
    name: 'New folder', // Name of the option => REQUIRED
    callback: function(evt, ui, target) {
        /**
         * ui -> element opened the contextual menu
         * evt -> event captured
         * target -> the element that opened the context menu
         * REQUIRED
        */
    },
    icon: 'fas fa-folder' // OPTIONNAL
}
```

The icon key is optionnal. It using class of FontAwesome. Please import it before using this feature.

## Methods

You can refresh NekoContextMenu listeners. it's very useful if you add some elements dynamically in the DOM.

## Getters

You can access to elements like this :

```js
const ContextMenu = new NekoContextMenu({
    selector: '[data-context="main"]',
    items: [
        ...
    ]
});

console.log(ContextMenu.selector) // JQuery elements

```
