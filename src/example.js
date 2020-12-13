// import NekoContextMenu from './neko-context-menu'
import NContextMenu, { MenuItem } from './neko-context-menu'
window.$ = window.JQuery = require('jquery')
require('./JQuery/jquery-neko-context-menu')
const randomSentence = require('random-sentence');

// const targets = document.querySelectorAll('[data-context]')

// targets.forEach(target => {
//     let contextMenu = new NContextMenu(target)

//     let item = new MenuItem('Title', (evt, target) => console.log("MON TEST", evt, target))
//     let item2 = new MenuItem('Title 2', (evt, target) => console.log("MON TEST 2", evt, target))
//     let item3 = new MenuItem('Title 3', (evt, target) => console.log("MON TEST 3", evt, target))

//     contextMenu.add(item)
//     contextMenu.add(item2)
//     contextMenu.add(item3)

// })


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

