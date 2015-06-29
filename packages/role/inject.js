
Meteor.publish('roles',function(){
	return Meteor.roles.find();
});

Meteor.publish(null, function() {
	if (this.userId) {
		var adminRole=Meteor.roles.findOne({"name":"superAdmin"});
		if(adminRole && Meteor.user().roles.indexOf(adminRole._id)>=0){
			//超级管理员用户可以订阅全部用户信息
			return Meteor.users.find({},{fields: {profile: 1, username: 1, emails: 1,roles: 1}});
		}else{
			return Meteor.users.find(
				{_id: this.userId},
				{fields: {profile: 1, username: 1, emails: 1,roles: 1}});
		}
	} else {
		return null;
	}
});


Meteor.startup(function(){
	//注射增加角色字段的方法到Accounts-base中
	Accounts.onCreateUser(function(options,user){
		if(options.roles){
			user.roles=options.roles;
		}else{
			var role=Roles.queryByName("normalUser");
			if(role){
				user.roles=[role._id];
			}
		}
		return user;
	});
});
