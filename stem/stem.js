/*!
 * Stem - Minimal wrapper with a really basic caching mechanism
 * https://github.com/colbyfayock/stem
 * Version: 0.0.1
 * @colbyfayock - colbyfayock.com
 */

window.Stem = function(selector) {

    var _this = this;

    _this.cache = {
        data: false,
        render: false
    }

    _this.template = document.querySelector(selector);

    _this.html_to_template = function(html) {
        if ( typeof html !== 'string'  ) {
            if ( typeof html !== 'object' || html.length === 0 ) return false;
            for ( var item in html) {
                item = _this.html_to_template(item);
            }
            return html;
        }
        return html.replace(new RegExp(/{{&gt;/, 'g'), '{{>');
    }

    _this.build = function(template, data) {
        var render = Handlebars.compile(_this.html_to_template(template));
        return render(data);
    }

    _this.grab = function(data) {
        if ( !_this.template ) return false;

        if ( _this.cache.render && ( JSON.stringify(_this.cache.data) === JSON.stringify(data) )  ) return _this.cache.render;

        _this.cache.data = data;
        _this.cache.render = _this.build(_this.template.innerHTML, _this.cache.data);

        return _this.cache.render;
    }

}

window.stpl = {};