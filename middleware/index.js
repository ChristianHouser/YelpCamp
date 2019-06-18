var Campground = require("../models/campground");
var Comment = require("../models/comment");

// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
        //is user logged in
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCampground){
                if(err){
                    req.flash("error", "Campground not found");
                    res.redirect("back");
                } else {
                    //does user own the campground?
                    if(foundCampground.author.id.equals(req.user._id)){
                        next(); 
                    } else {
                        req.flash("error", "PERMISSION DENIED");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "You need to be logged in to do that");
            res.redirect("back");
    }
}

middlewareObj.checkCommentsOwnership = function(req, res, next){
        //is user logged in
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    req.flash("error","Campground not found");
                    res.redirect("back");
                } else {
                    //does user own the comment?
                    if(foundComment.author.id.equals(req.user._id)){
                        next(); 
                    } else {
                        req.flash("error","Permission denied, Suckah!");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "You need to be logged in to do that");
            res.redirect("back");
    }
}

//middleware - Is logged in?
middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    req.flash("error", "You must be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;