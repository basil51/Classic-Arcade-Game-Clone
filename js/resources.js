/* Resources.js
 * This is simply an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes
 * a simple "caching" layer so it will reuse cached images if you attempt
 * to load the same image multiple times.
 */
(function() {
    let resourceCache = {};
    let readyCallbacks = [];

    /* This is the publicly accessible image loading function. It accepts
     * an array of strings pointing to image files or a string for a single
     * image. It will then call our private image loading function accordingly.
     */
    function load(urlOrArr) {
        if(urlOrArr instanceof Array)   urlOrArr.forEach( url => _load(url));
        else  _load(urlOrArr);
    }
    /* This is our private image loader function, it is
     * called by the public image loader function.
     */
    function _load(url) {
        if(resourceCache[url]) return resourceCache[url];
        else {
            var img = new Image();
            img.onload = function() {
                resourceCache[url] = img;
                if (isReady())  readyCallbacks.forEach( func => func());
            };
            resourceCache[url] = false;
            img.src = url;
        }
    }

    function get(url) {
        return resourceCache[url];
    }
/* This function determines if all of the images that have been requested
     * for loading have in fact been properly loaded.
     */
    function isReady() {
        let ready = true;
        for(let k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&  !resourceCache[k])
                ready = false;
        }
        return ready;
    }

    function onReady(func) {
        readyCallbacks.push(func);
    }
     /* This object defines the publicly accessible functions available to
     * developers by creating a global Resources object.
     */
    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();