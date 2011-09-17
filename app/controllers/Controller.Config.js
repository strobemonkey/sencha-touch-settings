Ext.regController('Config', {
    store: App.stores.config,

    index: function() {
        App.views.viewport.reveal('main');
    },

    editForm: function() {
        var model = this.store.first();
        if (!model) {
            model = new App.models.Config();
        }
        App.views.configForm.load(model);
        App.views.viewport.reveal('configForm');
    },

    save: function(params) {
        params.record.set(params.data);
        var errors = params.record.validate();

        if (errors.isValid()) {
            this.store.create(params.data);
            this.index();
        } else {
            params.form.showErrors(errors);
        }
    },

    update: function(params) {
        var tmpConfig = new App.models.Config(params.data),
            errors = tmpConfig.validate();

        if (errors.isValid()) {
            params.record.set(params.data);
            params.record.save();
            this.index();
        } else {
            params.form.showErrors(errors);
        }
    },

});
