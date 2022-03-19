# querykey structure

[postType, slug] for posts. no scope. 
'auth' for auth
['hasSubmittedPrFor', {authUser:<googleId>}]
[{
    nature:'feed | null', //feed is required for matching all lists of posts with postType
    place:"dashboard | profile | course | search | explore", 
    widget:"subs | review | profile | LandT | controls",
    postType: "pr | blog | rsa",
    courseCode: "<courseCode>", // courseCode in search belong in search
    profileSlug: "<userSlug>", // profilePage or profile widget in dashB
    scope:"display | subStatus | overview | levels" //display for profile in dashB and page.
                                                     controls, overview, levels for course data.
    authUser: "<<googleId from authUser>>" //don't use when data will be similar for 2 diff users
    search:{ ...filters }
}]
