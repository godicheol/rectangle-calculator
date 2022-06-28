(function() {
    'use strict';

    function mod(x,n) {
        return ((x % n) + n) % n;
    }
    function getRadians(x, y) {
        return Math.atan2(y, x) * Math.PI / 180;
    }
    function getRotatedSize(w, h, d) {
        var radians = d * Math.PI / 180;
        var sinFraction = Math.sin(radians);
        var cosFraction = Math.cos(radians);
        if (sinFraction < 0) {
            sinFraction = -sinFraction;
        }
        if (cosFraction < 0) {
            cosFraction = -cosFraction;
        }
        return {
            width: (w * cosFraction) + (h * sinFraction),
            height: (w * sinFraction) + (h * cosFraction)
        }
    }

    function getPoint(x, y, w, h, d) {

    }

    function Rect(arg) {
        if (typeof(arg) !== "object") {
            throw new Error("arg must be Object");
        }
        this.x = typeof(arg.x) !== "number" ? 0 : arg.x;
        this.y = typeof(arg.y) !== "number" ? 0 : arg.y;
        this.width = typeof(arg.width) !== "number" ? 0 : arg.width;
        this.height = typeof(arg.height) !== "number" ? 0 : arg.height;
        this.degree = typeof(arg.degree) !== "number" ? 0 : arg.degree;
        this.color = typeof(arg.color) !== "string" ? "#000000" : arg.color;
        this.rotatedWidth = 0;
        this.rotatedHeight = 0;
        this.point = [];

        this.rotate = function(n) {
            var rotatedSizes;
            // set degree
            this.degree = n;
            // set rotated sizes
            rotatedSizes = getRotatedSize(this.width, this.height, this.degree);
            this.rotatedWidth = rotatedSizes.width;
            this.rotatedHeight = rotatedSizes.height;
        }

        this.getCanvas = function() {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            var x = 0.5*this.rotatedWidth;
            var y = 0.5*this.rotatedHeight;

            canvas.width = Math.round(this.rotatedWidth);
            canvas.height = Math.round(this.rotatedHeight);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(this.degree * Math.PI / 180);
            ctx.translate(-x, -y);
            ctx.fillStyle = this.color;
            ctx.fillRect(x-(0.5*this.width), y-(0.5*this.height), this.width, this.height);
            ctx.restore();
            return canvas;
        }

        this.rotate(this.degree);
    }

    if (typeof(window.Rect) === "undefined") {
        window.Rect = Rect;
    }
})();