/*!
 * Stem - Minimal wrapper with a really basic caching mechanism
 * https://github.com/colbyfayock/stem
 * Version: 0.0.1
 * @colbyfayock - colbyfayock.com
 */

window.Stem = function(selector) {

    var _this = this;

    _this.cache = {
        precompiled: false,
        compiled: false,
        data: false,
        render: false
    }

    _this.precompiled = document.querySelector(selector).innerHTML;

    _this.is_stale = function(item, cache_key, compare) {

        if ( typeof compare === 'undefined' ) return true;
        
        if ( compare === 'html' ) return _this.cache[cache_key] !== item;
        if ( compare === 'json' ) return JSON.stringify(_this.cache[cache_key]) !== JSON.stringify(item);
        
        return true;

    }

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

    _this.compile = function(template) {
        return _this.cache.compiled = Handlebars.compile(_this.html_to_template(template));;
    }

    _this.render = function(data) {
        return _this.cache.render = _this.cache.compiled(data);
    }

    _this.grab = function(data) {

        if ( !_this.precompiled ) return false;

        if ( _this.is_stale(_this.precompiled, 'precompiled', 'html') ) {
            console.log('Precompiled is stale, compiling fresh template');
            _this.cache.precompiled = _this.precompiled;
            _this.compile(_this.cache.precompiled);
        } else {
        	console.log('Precompiled is cached, using existing template');
        }

        if ( _this.is_stale(data, 'data', 'json') ) {
            console.log('Data is stale, rendering fresh template');
            _this.cache.data = data;
            _this.render(_this.cache.data);
        } else {
        	console.log('Data is cached, using existing template');
        }

        return _this.cache.render;
        
    }

}

window.stpl = {};