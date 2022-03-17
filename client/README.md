# querykey structure

[postType, slug] for posts. no scope. 
'auth' for auth
[{
    nature:'feed | unit', //required
    place:"dashboard | profile | course | search | explore", 
    widget:"subs | review | profile | LandT | controls",
    postType: "pr | blog | rsa",
    courseCode: "<courseCode>",
    profileSlug: "<userSlug>",
    scope:"display | controls | overview | levels"
    authUser: "<<googleId from authUser>>"
    search:{filter:"String", }
}]