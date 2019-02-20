function NekoContextMenu(options) {

    const $this = this;

    let settings = $.extend({

        selector: 'div.context',
        items: [
            { name: 'ajouter', callback: null, icon: null }
        ]

    }, options);

    function generateContextMenu(ui) {
        let div = $('<div></div>');
        let content = $('<div></div>');
        let ul = $('<ul></ul>');
        for (let i = 0; i < settings.items.length; i++) {
            let li = $('<li></li>');
            let ic = $('<i></i>');
            if ('icon' in settings.items[i] && settings.items[i].icon != null) {
                ic.addClass(settings.items[i].icon);
                ic.addClass("contextMenuIcon");
            }
            li.text(settings.items[i].name);
            li.prepend(ic);
            li.click(function (evt) {
                settings.items[i].callback(evt, ui);
            });

            ul.append(li);
        }

        content.append(ul);
        div.append(content);

        div.addClass('contextMenu_nekodev');
        content.addClass('content');

        return div;
    }

    $('body').click(function () {
        $('.contextMenu_nekodev').remove();
    });

    $(settings.selector).contextmenu(function (event) {

        event.preventDefault();
        event.stopPropagation();
        let ui = $(event.target)
        $('.contextMenu_nekodev').remove();

        let contextMenu = generateContextMenu(ui);

        const x = event.pageX;
        const y = event.pageY;

        contextMenu.css({
            left: x,
            top: y
        });

        $('body').append(contextMenu);

        return false;
    });

}
