Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', {name: 'index'});

Router.route('/roles',{name:'rolesList'})

Router.route('/users',{name:'usersList'})