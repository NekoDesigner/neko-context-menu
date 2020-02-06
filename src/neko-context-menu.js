class NekoContextMenu {

    constructor(options) {

        if(!window.$) console.error('[NEKO CONTEXT MENU]', "This plugin need JQuery.")
    
        this.settings = $.extend({
    
            selector: 'div.context',
            items: [{
                name: 'ajouter',
                callback: null,
                icon: null
            }]
    
        }, options);

        this._init();

        $('body').on('click', function () {
            $('.contextMenu_nekodev').remove();
        });

    }

    refresh() {
        this._init()
    }

    _init() {
        this.selector = $(this.settings.selector);
        $(this.settings.selector).contextmenu((event) => {
            let parent = $(event.target).closest(this.settings.selector);
            event.preventDefault();
            event.stopPropagation();
            let ui = $(event.target)
            $('.contextMenu_nekodev').remove();

            let contextMenu = this._generateContextMenu(ui, parent);

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

    _generateContextMenu(ui, target) {
        let div = $('<div></div>');
        let content = $('<div></div>');
        let ul = $('<ul></ul>');
        for (let i = 0; i < this.settings.items.length; i++) {
            let li = $('<li></li>');
            let ic = $('<i></i>');
            if ('icon' in this.settings.items[i] && this.settings.items[i].icon != null) {
                ic.addClass(this.settings.items[i].icon);
                ic.addClass("contextMenuIcon");
            }
            li.text(this.settings.items[i].name);
            li.prepend(ic);
            li.click((evt) => {
                this.settings.items[i].callback(evt, ui, target);
            });

            ul.append(li);
        }

        content.append(ul);
        div.append(content);

        div.addClass('contextMenu_nekodev');
        content.addClass('content');

        return div;
    }

}

export default NekoContextMenu;