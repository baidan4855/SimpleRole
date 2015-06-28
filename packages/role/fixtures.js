Meteor.startup(function(){
    //为了出现防止系统第一次运行时、或者超级管理员被误删，
    //导致出现没有超级管理员的情况，在系统启动时检查是否
    //有超级管理员，若没有则自动生成一个超级管理员用户。
    if(Meteor.isServer){

        if(!Meteor.settings)
            return;
        var rolesSetting=Meteor.settings.rolesSetting;
        if(!rolesSetting)
            return;

        //检查配置文件中是否有生成默认角色的配置
        if(rolesSetting.autoCreateRoles && rolesSetting.autoCreateRoles.length){
            //若配置了默认角色，则自动生成默认角色
            _.each(rolesSetting.autoCreateRoles,function(item,index){
                Roles.createDefaultRole(item);
                console.log("--- create roles ---");
            })
        }

        //检查配置文件中是否有生成默认超级管理员的配置。
        if(rolesSetting.defaultAdminConfig){
            var defaultAdmin=rolesSetting.defaultAdminConfig;
            //检查数据库中是否已经有此用户
            var exists=Meteor.users.find({"emails.address":defaultAdmin.email}).count();
            if(exists == 0){
                //没有默认管理员用户则创建默认管理员
                var role=Roles.queryByName("superAdmin");
                if(role) {
                    defaultAdmin = _.extend({"roles": [role._id]}, defaultAdmin);
                    try {
                        Accounts.createUser(defaultAdmin);
                        console.log("--- create administrator success---");
                    } catch (e) {
                        console.log("--- create administrator failed---");
                        console.log(e);
                    }
                }
            }
        }
    }
});
