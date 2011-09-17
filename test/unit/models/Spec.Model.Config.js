describe("Config", function() {

    beforeEach(function() {
      this.emptyConfig = Ext.ModelMgr.create({}, 'Config');
    });
  
    describe("server field", function() {

        it("should only allow a valid url", function() {
            this.emptyConfig.set('server', 'http://123');
            var errors = this.emptyConfig.validate();
            expect(errors.isValid()).toEqual(false);
            expect(errors.getByField('server')).toEqual([]);
            expect(this.emptyConfig.get('server')).toEqual('http://123');
        });
        
        it("should not allow an invalid url", function() {
            this.emptyConfig.set('server', 'guff');
            var errors = this.emptyConfig.validate();
            expect(errors.isValid()).toEqual(false);
            expect(errors.getByField('server')).toEqual([{field: 'server', message: 'must be a valid url'}]);
        });
        
    });

    describe("key field", function() {
        
        it("should only allow 6 or more characters", function() {
            this.emptyConfig.set('key', '123456');
            var errors = this.emptyConfig.validate();
            expect(errors.isValid()).toEqual(false);
            expect(errors.getByField('key')).toEqual([]);
            expect(this.emptyConfig.get('key')).toEqual('123456');
        });
        
        it("should not allow less than 6 characters", function() {
            this.emptyConfig.set('key', '12345');
            var errors = this.emptyConfig.validate();
            expect(errors.isValid()).toEqual(false);
            expect(errors.getByField('key')).toEqual([{field: 'key', message: 'must be at least 6 characters'}]);
        });
        
    });

    describe("nickname field", function() {
        
        it("should not allow non-alphanumeric characters", function() {
            this.emptyConfig.set('nickname', '*&^%$');
            var errors = this.emptyConfig.validate();
            expect(errors.isValid()).toEqual(false);
            expect(errors.getByField('nickname')).toEqual([{field: 'nickname', message: 'must only contain characters and numbers'}]);
        });
        
    });

    describe("email field", function() {
        
        it("should not allow non-email like value", function() {
            this.emptyConfig.set('email', 'whee');
            var errors = this.emptyConfig.validate();
            expect(errors.isValid()).toEqual(false);
            expect(errors.getByField('email')).toEqual([{field: 'email', message: 'must be a valid email'}]);
        });

    });

    describe("messaging field", function() {

        it("should only allow one of selected values", function() {
            this.emptyConfig.set('messaging', 'asynchronous');
            var errors = this.emptyConfig.validate();
            expect(errors.isValid()).toEqual(false);
            expect(errors.getByField('messaging')).toEqual([]);
            expect(this.emptyConfig.get('messaging')).toEqual('asynchronous');
        });
        
        it("should not allow a value that is not one of the allowed values", function() {
            this.emptyConfig.set('messaging', 'whee');
            var errors = this.emptyConfig.validate();
            expect(errors.isValid()).toEqual(false);
            expect(errors.getByField('messaging')).toEqual([{field: 'messaging', message: 'must be either polling, asynchronous or off'}]);
        });
        
    });

    describe("timerInterval field", function() {
        // no tests yet
    });

    describe("gravatar method", function() {

        it("should create a hash for gravatar from email", function() {
            this.emptyConfig.set('email', 'poo@plop.com');
            this.emptyConfig.updateGravatar();
            expect(this.emptyConfig.get('gravatar')).toEqual('30eb8b2ba07517c0379b86b29e3aa284');
        });
        
    });
    
  
});