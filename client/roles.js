
Template.rolesList.helpers({
    allRoles:function(){
        return Roles.listRoles();
    }
});

Template.rolesList.events({
	'click .add-button':function(e){
		if($(".newInput").val()){
			console.log($(".newInput").val());
			var role={"name":$(".newInput").val()};
			console.log(role);
			Meteor.call("createRole",role,function(err,result){
				if(err){
					alert("create new role failed");
				}else{
					$(".newInput").val("");
				}
			})
		}
	}
});

Template.singleRole.events({
	'click .delete-button':function(e){
		if(this.type === 'default'){
			alert('不能删除系统默认角色');
			return;
		}
		Meteor.call("deleteRole",this._id,function(err,result){

		})
	},
	'click .modify-button':function(e){
		if(this.type === 'default'){
			alert('不能修改系统默认角色');
			return;
		}
		var newName=$(e.target).prev("input.nameInput").val();
		Meteor.call("updateRole",this._id,newName,function(err,result){

		})
	}
});

Template.singleRole.helpers({
	"isCustomRole":function(){
		return this.type === 'custom'
	}
});