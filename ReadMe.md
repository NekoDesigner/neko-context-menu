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
require('neko-context-menu-min');
```
or directly in your template :
For install with npm
```html
<script src="/node-modules/neko-context-menu/neko-context-menu-min.js"></script>
```
without npm
```html
<script src="/path/to/neko-context-menu-min.js"></script>
```

# Usage

```html
<ul>
    <li data-level="context-menu">lorem</li>
    <li data-level="context-menu">lorem</li>
    <li data-level="context-menu">lorem</li>
    <li data-level="context-menu">lorem</li>
    <li data-level="context-menu">lorem</li>
</ul>
```

```javascript
var ContextMenu = new NekoContextMenu({
                        selector: '[data-level="context-menu"]',
                        items: [
                            {
                                name: "New folder",
                                callback: function (evt, ui) {
                                    evt.preventDefault();
                                    alert('New folder called !');
                                },
                                icon: 'fas fa-folder'
                            },
                            {
                                name: "Rename",
                                callback: function (evt, ui) {
                                    alert('Rename called !');
                                },
                                icon: 'fas fa-edit'
                            },
                            {
                                name: "Details",
                                callback: function (evt, ui) {
                                    alert('Details called !');
                                },
                                icon: 'fas fa-eye'
                            },
                            {
                                name: "Delete",
                                callback: function (evt, ui) {
                                    alert('delete called');
                                },
                                icon: 'fas fa-trash'
                            }
                        ]
                    });
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
    callback: function(evt, ui) {
        /**
         * ui -> element opened the contextual menu
         * evt -> event captured
         * REQUIRED
        */
    },
    icon: 'fas fa-folder' // OPTIONNAL
}
```

The icon key is optionnal. By default, Font awesome is imported in your css.