# Neko Context Menu

![alt Preview](https://zupimages.net/up/20/06/zmmk.gif)

# Intallation

Install package

```shell
npm install neko-context-menu --save
```

Import add this lines to your CSS

```scss
@import path/to/neko-context-menu.scss;
```

You can change colors with the scss variable :

```scss
 $neko-context-menu-color: #343A40 !default;
 $neko-context-menu-background-color: #FFFFFF !default;
```

Import in your project :

With js compiler like WebPack :
```js
// Vanilla Javascript
import NContextMenu from 'neko-context-menu'

// JQuery
import 'jquery-neko-context-menu'
```

# Usage

```html
<div data-context>
    <h1>Neko Context Menu</h1>
    <p>Faites un clique droit pour ajouter des éléments</p>
</div>
```

```javascript
import NContextMenu from 'neko-context-menu'

const targets = document.querySelectorAll('[data-context]')

// Vanilla javascript
targets.forEach(target => {

    // Instanciate Context Menu
    let contextMenu = new NContextMenu(target)

    // Create a menu item
    let item = new MenuItem('Title', (evt, target) => console.log("MY TEST", evt, target))
    let item2 = new MenuItem('Title 2', (evt, target) => console.log("MY TEST 2", evt, target))
    let item3 = new MenuItem('Title 3', (evt, target) => console.log("MY TEST 3", evt, target))

    // Add menu item to the context menu
    contextMenu.add(item)
    contextMenu.add(item2)
    contextMenu.add(item3)

    // Remove the item from the context menu
    contextMenu.remove(item)

})

// JQuery Plugin
$('[data-context]').NContextmenu([
    {
        label: "File",
        icon: '<i class="far fa-copy"></i>',
        callback(evt, target, item) {
            console.log("file", evt, target, item)
        }
    },
    {
        label: "Directory",
        icon: '<i class="far fa-folder"></i>',
        callback(evt, target, item) {
            console.log("directory", evt, target, item)
        }
    },
    {
        label: "Remove",
        icon: '<i class="far fa-trash-alt"></i>',
        callback(evt, target, item) {
            console.log("remove", evt, target, item)
        }
    },
])


```

## Options

### items
Type: Array
Required
Array of object. Each object is a section of your contextual menu and fonctionnality.

```javascript
{
    name: 'New folder', // Name of the option => REQUIRED
    callback: function(evt, target, item) {
        /**
         * evt -> event captured
         * target -> the element that opened the context menu
         * item -> the menu item object
         * REQUIRED
        */
    },
    icon: '<i class="fas fa-folder"></i>' // OPTIONNAL
}
```

The icon key is optionnal. In this example, I am using classes of FontAwesome.

