$.fn.NContextmenu = function (options) {

    this.items = options
    let _window = null

    this.items.forEach((item, key) => item.key = key)

    $(document).on('click', () => $(document).trigger('close-context-menu'))

    $(document).on('close-context-menu', () => {
        if (_window) _window.remove()
    })

    $(this).on('contextmenu', function (evt) {
        evt.preventDefault()

        createWindow(evt.clientX, evt.clientY)

    })

    const createWindow = (x, y) => {
        $(document).trigger('close-context-menu')

        if (_window) _window.remove()
        _window = $('<div></div>')
        _window.addClass('contextMenu_nekodev')

        _window.html(`
            <div class="content">
                <ul>
                </ul>
            </div>
        `)

        this.items.map(item => {
            let li = $('<li></li>')
            if (item.icon) {
                li.html(item.icon + '&nbsp;&nbsp;&nbsp;' + item.label)
            } else {
                li.html(item.label)
            }

            li.on('click', evt => item.callback(evt, this, item))
            _window.find('ul').first().append(li)
        })

        $('body').append(_window)

        _window.css('left', `${x}px`)
        _window.css('top', `${y}px`)
    }

}

