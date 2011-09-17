App = new Ext.Application({
    name: "App",

    launch: function() {
        this.views.viewport = new this.views.Viewport();
        
        this.views.main = this.views.viewport.down('#main');
        this.views.configForm = this.views.viewport.down('#configForm');
    }
});
