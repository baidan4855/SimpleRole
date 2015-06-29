Template.usersList.helpers({
	"allUsers":function(){
		var u =  Meteor.users.find();
		console.log(u.count());
		return u;
	}
});

Template.singleUser.helpers({
	"getRoleName":function(){
		var id=this.toString();
		console.log(id);
		var role = Meteor.roles.findOne({"_id":id});
		if(!role || !role.name)
			return undefined;
		return role.name;
	}
});

Template.singleUser.events({
	"click .edit-button":function(e){
		$("#hideUserId").val(this._id);
		var rs=this.roles;
		$("input[name='roles']").each(function(i,item){
			var chkId=$(item).val();
			if(rs && rs.indexOf(chkId)>=0){
				$(item).prop("checked",true);
			}else{
				$(item).prop("checked",false);
			}
		});
		$(".changeBox").show();
	}
});

Template.changeRole.helpers({
	"allRoles":function(){
		return Roles.listRoles();
	},
	"isOptional":function(){
		return this.name !== 'guest';
	}
});

Template.changeRole.events({
	"click #submitChange":function(e){
		var userId=$("#hideUserId").val();
		if(userId){
			var chked=$("input[type='checkbox'][name='roles']:checked");
			if(chked && chked.length){
				var rs=[];
				$.each(chked,function(i,item){
					rs.push($(item).val());
				});
				Meteor.call('changeUserRole',userId,rs,function(err,result){
					if(err){
						alert("更新用户角色失败");
					}else{
						$(".changeBox").hide();
					}
				})
			}else{
				alert('您至少应为用户选择一种角色');
			}
		}
	}
})