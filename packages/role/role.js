Meteor.roles = new Meteor.Collection("roles");

Roles={};

Meteor.methods({
	"createRole":function(role){
		if(Meteor.isServer){
			return Roles.createRole(role);
		}
	},
	"updateRole":function(id,roleName){
		if(Meteor.isServer){
			return Roles.updateRole(id,roleName);
		}
	},
	"deleteRole":function(id){
		if(Meteor.isServer){
			return Roles.deleteById(id);
		}
	}
})