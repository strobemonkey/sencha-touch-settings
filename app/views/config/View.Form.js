App.views.ConfigForm = Ext.extend(Ext.form.FormPanel, {
    defaultInstructions: 'Please enter the information above.',

    initComponent: function(){
        var titlebar, cancelButton, buttonbar, saveButton, deleteButton, fields;

        cancelButton = {
            text: 'cancel',
            ui: 'back',
            handler: this.onCancelAction,
            scope: this
        };

        titlebar = {
            id: 'configFormTitlebar',
            xtype: 'toolbar',
            title: 'Create config',
            items: [ cancelButton ]
        };

        saveButton = {
            id: 'configFormSaveButton',
            text: 'save',
            ui: 'confirm',
            handler: this.onSaveAction,
            scope: this
        };

        buttonbar = {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [ {xtype: 'spacer'}, saveButton]
        };

        fields = {
            xtype: 'fieldset',
            id: 'configFormFieldset',
            title: 'Config details',
            instructions: this.defaultInstructions,
            defaults: {
                xtype: 'textfield',
                labelAlign: 'left',
                labelWidth: '40%',
                required: false,
                useClearIcon: true,
                autoCapitalize : false
            },
            items: [
                {
                    name: 'server',
                    label: 'server',
                    xtype: 'textfield',
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'server',
                },
                {
                    name: 'key',
                    label: 'key',
                    xtype: 'textfield',
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'key',
                },
                {
                    name: 'nickname',
                    label: 'nickname',
                    xtype: 'textfield',
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'nickname',
                },
                {
                    name: 'email',
                    label: 'email',
                    xtype: 'emailfield',
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'email',
                },
                {
                    name: 'gravatar',
                    label: 'gravatar',
                    xtype: 'hiddenfield',
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'gravatar',
                },
                {
                    name: 'messaging',
                    label: 'messaging',
                    xtype: 'selectfield',
                    options: [{
                        text: 'Polling',
                        value: 'polling'
                    }, {
                        text: 'Asynchronous',
                        value: 'asynchronous'
                    }, {
                        text: 'Off',
                        value: 'off'
                    }]
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'messaging',
                },
                {
                    name: 'timerInterval',
                    label: 'timerInterval',
                    xtype: 'numberfield',
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'timerInterval',
                },
            ]
        };

        Ext.apply(this, {
            scroll: 'vertical',
            dockedItems: [ titlebar, buttonbar ],
            items: [ fields ],
            listeners: {
                beforeactivate: function() {
                    var deleteButton = this.down('#configFormDeleteButton'),
                        saveButton = this.down('#configFormSaveButton'),
                        titlebar = this.down('#configFormTitlebar'),
                        model = this.getRecord();

                    if (model.phantom) {
                        titlebar.setTitle('Create config');
                        saveButton.setText('create');
                    } else {
                        titlebar.setTitle('Update config');
                        saveButton.setText('update');
                    }
                },
                deactivate: function() { this.resetForm(); }
            }
        });

        App.views.ConfigForm.superclass.initComponent.call(this);
    },

    onCancelAction: function() {
        Ext.dispatch({
            controller: 'Config',
            action: 'index'
        });
    },

    onSaveAction: function() {
        var model = this.getRecord();

        Ext.dispatch({
            controller: 'Config',
            action    : (model.phantom ? 'save' : 'update'),
            data      : this.getValues(),
            record    : model,
            form      : this
        });
    },

    showErrors: function(errors) {
        var fieldset = this.down('#configFormFieldset');
        this.fields.each(function(field) {
            var fieldErrors = errors.getByField(field.name);

            if (fieldErrors.length > 0) {
                var errorField = this.down('#'+field.name+'ErrorField');
                field.addCls('invalid-field');
                errorField.update(fieldErrors);
                errorField.show();
            } else {
                this.resetField(field);
            }
        }, this);
        fieldset.setInstructions("Please amend the flagged fields");
    },

    resetForm: function() {
        var fieldset = this.down('#configFormFieldset');
        this.fields.each(function(field) {
            this.resetField(field);
        }, this);
        fieldset.setInstructions(this.defaultInstructions);
        this.reset();
    },

    resetField: function(field) {
        var errorField = this.down('#'+field.name+'ErrorField');
        errorField.hide();
        field.removeCls('invalid-field');
        return errorField;
    }
});

Ext.reg('App.views.ConfigForm', App.views.ConfigForm);
