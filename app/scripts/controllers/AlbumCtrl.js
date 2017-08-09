(function() {
    function AlbumCtrl() {
       this.albumData = [];
       for (var i=0; i < 12; i++) {
        this.albumData = albumPicasso;
        }
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();
