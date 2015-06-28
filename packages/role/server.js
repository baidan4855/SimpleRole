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

Meteor.publish('roles',function(){
    return Meteor.roles.find();
});

// 创建角色
var validateNewRoleHooks= [];

Roles.createDefaultRole = function(role){
    role = _.extend({"default": true},role);
    Roles.createRole(role);
};
Roles.createRole = function(role){
    role = _.extend({createdAt: new Date(), _id: Random.id()},role);
    var isRoleNameGood=true;
    _.each(validateNewRoleHooks,function(hook){
        if(!hook(role)){
            isRoleNameGood=false;
            return;
        }
    });
    if(!isRoleNameGood)
        return null;
    var roleId;
    try{
        roleId = Meteor.roles.insert(role);
    }catch(e){
        throw e;
    }
    return roleId;
};
/**
 * 设置创建新角色要进行的验证方法。
 * @param func
 */
Roles.validateNewRole = function(func){
    validateNewRoleHooks.push(func);
};
/**
 * 检查角色名称是否合法
 */
Roles.validateNewRole(function(role){
    if(!role)
        return false;//未传入role
    if(_.isEmpty(role.name))
        return false;//角色名称为空
    var isRoleNameExists=Meteor.roles.findOne({name:role.name});
    if(isRoleNameExists){
        return false;//角色名称已存在
    }
    return true;
});

Roles.isDefaultRole = function(roleName){
    if(!Meteor.settings)
        return false;
    if(!Meteor.settings.rolesSetting)
        return false;
    if(!Meteor.settings.rolesSetting.autoCreateRoles)
        return false;
    var idr = false;
    _.each(Meteor.settings.rolesSetting.autoCreateRoles,function(item,index){
        if(item.name && item.name == roleName){
            idr=true;
            return;
        }
    });
    return idr;
};

//TODO: 修改用户的角色信息

//TODO: 修改角色名称
Roles.updateRole=function(id,role){

    if(role.updateAt){
        role.updateAt=new Date();
    }else{
        _.extend({"updateAt":new Date()},role);
    }


    try{
        Meteor.roles.update({_id:id},{$set:{'name':role.name}});
    }catch(e){
        throw e;
    }
    return true;
};

//TODO: 删除角色
Roles.deleteById=function(id){
    try{
        Meteor.roles.remove({_id:id});
    }catch(e){
        throw e;
    }
    return true;
};

//TODO: 查询角色下所有用户
Roles.listUsers=function(roleId){
    if(!roleId)
        return false;
    if(!Meteor.users)
        return false;
    return Meteor.users.find({roles:roleId})
};


//TODO: 角色列表

var validateListRolesHook=[];

Roles.listRoles=function(){
    _.each(validateListRolesHook,function(hook){
        if(!hook(role))
            throw new Meteor.Error(403,"List Role validation failed");
    });
    try{
        return Meteor.roles.find();
    }catch(e){
        throw e;
    }
};

/**
 * 设置查询角色列表信息前的检查条件
 * @param func
 */
Roles.validateListRoles=function(func){
    validateListRolesHook.push(func);
};
/**
 * 按角色名查询角色实例
 * @param name
 * @returns {any}
 */
Roles.queryByName=function(name){
    return Meteor.roles.findOne({"name":name});
}