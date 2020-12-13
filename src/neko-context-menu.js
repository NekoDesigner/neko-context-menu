
/**
 *
 * @author NekoDev<tahar.chibane@gmail.com>
 * @class NContextMenu
 */
class NContextMenu {

    /**
     * Creates an instance of NContextMenu.
     * 
     * @param {HTMLElement|string} target
     * @memberof NContextMenu
     */
    constructor(target) {
        this.openHandler = this.open.bind(this)
        this.closeHandler = this.close.bind(this)

        this.load(target)
            .events()

        this.items = []

    }

    /**
     *
     *
     * @param {HTMLElement|string} target
     * @return {NContextMenu} 
     * @memberof NContextMenu
     */
    load(target) {
        this.target = typeof target === 'string' ? document.querySelector(target) : target

        return this
    }

    /**
     *
     *
     * @return {NContextMenu} 
     * @memberof NContextMenu
     */
    refresh() {

        this.target.removeEventListener('contextmenu', this.openHandler)
        document.body.removeEventListener('click', this.closeHandler)
        document.removeEventListener('close-context-menu', this.closeHandler)

        this.load().events()

        return this

    }

    /**
     *
     *
     * @return {NContextMenu} 
     * @memberof NContextMenu
     */
    events() {
        this.target.addEventListener('contextmenu', this.openHandler)
        document.body.addEventListener('click', this.closeHandler)
        document.addEventListener('close-context-menu', this.closeHandler)

        return this
    }

    /**
     *
     *
     * @param {MenuItem} menuItem
     * @return {NContextMenu}
     * @memberof NContextMenu
     */
    add(menuItem) {
        this.items = [...this.items, menuItem]

        return this
    }


    /**
     *
     *
     * @param {MenuItem|number} menuItem
     * @return {NContextMenu}
     * @memberof NContextMenu
     */
    remove(menuItem) {

        let index = null

        if (typeof menuItem == 'object') {
            index = this.items.indexOf(menuItem)
        } else {
            index = menuItem
        }

        if (index > -1) this.items.splice(index, 1)

        return this

    }

    /**
     *
     *
     * @param {MouseEvent} e
     * @memberof NContextMenu
     */
    open(e) {
        e.preventDefault()
        this.createWindow(e.clientX, e.clientY)
    }

    /**
     *
     *
     * @memberof NContextMenu
     */
    close() {
        this.removeWindow()
    }

    /**
     *
     *
     * @param {number} x
     * @param {number} y
     * @memberof NContextMenu
     */
    createWindow(x, y) {

        document.dispatchEvent(new Event('close-context-menu'))

        this.window = document.createElement('div')
        this.window.className = 'contextMenu_nekodev'

        this.window.innerHTML = `
            <div class="content">
                <ul>
                </ul>
            </div>
        `

        document.body.appendChild(this.window)

        this.items.map(item => {
            let el = item.createItem(this.target, item)
            this.window.querySelector('ul').appendChild(el)
        })

        this.window.style.left = x + 'px'
        this.window.style.top = y + 'px'

    }

    /**
     *
     *
     * @memberof NContextMenu
     */
    removeWindow() {
        if (this.window) this.window.remove()
    }

}

/**
 *
 *
 * @author NekoDev<tahar.chibane@gmail.com>
 * @class MenuItem
 */
class MenuItem {

    /**
     * Creates an instance of MenuItem.
     * 
     * @param {string} label
     * @param {Function} callback
     * @param {string} [icon=null]
     * @memberof MenuItem
     */
    constructor(label, callback, icon = null) {
        this.label = label
        this.callback = callback
        this.icon = icon
    }

    /**
     *
     *
     * @param {HTMLElement} target
     * @param {MenuItem} item
     * @return {HTMLElement} 
     * @memberof MenuItem
     */
    createItem(target, item) {
        let li = document.createElement('li')

        if (this.icon) {
            let span = document.createElement('span')
            span.className = "contextMenuIcon"
            span.innerHTML = this.icon
            li.appendChild(span)
        }

        li.innerHTML += this.label

        li.addEventListener('click', evt => {
            evt.preventDefault()
            this.callback(evt, { target, item })
        })

        return li
    }
}

export default NContextMenu
export { MenuItem }