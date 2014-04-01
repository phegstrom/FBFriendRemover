/*
	Scripts behind the facebook friend analyzer and remover. 
	Created by Rick Sullivan and Parker Hegstrom.
*/

/* Information about the current user. */
var USER_ID;
var FIRST_NAME;
var LAST_NAME;

var FRIENDS_DIV = 'friendListDiv';
var FRIENDS_TO_DELETE_DIV = 'friendsToDeleteDiv';

var friends;
var friendsToDelete;

function addFriends(friendList) {
	var friend;

	for(var i = 0; i < friendList.length; i++) {
		friend = friendList[i];
		friends.addFriend(new Friend(friend.id, friend.first_name, friend.last_name, friend.picture.data.url, 0));
	}

	displayFriends(friends, FRIENDS_DIV);
};

function displayFriends(friends, divName) {
	friends.sort();

	var friendHtml = '';
	var friend;

	for(var i = 0; i < friends.list.length; i++) {
		friend = friends.list[i]	;
		friendHtml += '<div class="well friend" id="' + friend.id + '" '
			+ 'onclick="removeFriend(' + friend.id + ', \'' + divName + '\');">' 
	 		+ ' <img class="img-circle" src="' + friend.picture + '">' + friend.firstname + ' ' + friend.lastname
			 + '</div>';
	}

	var friendDiv = document.getElementById(divName);
	friendDiv.innerHTML = friendHtml;
};

function removeFriend(id, divName) {
	var friend;

	if (divName == FRIENDS_DIV) {
		friend = friends.getFriendById(id);
		friends.removeById(id);
		friendsToDelete.addFriend(friend);
	} else {
		friend = friendsToDelete.getFriendById(id);
		friendsToDelete.removeById(id);
		friends.addFriend(friend);
	}

	displayFriends(friends, FRIENDS_DIV);
	displayFriends(friendsToDelete, FRIENDS_TO_DELETE_DIV);
}

/*Will extract number of occurences of each friend id in every photo the 
person has uploaded*/

function processPhotoData(albumList) {

	var currentAlbum;
	for (var i = 0; i < albumList.length; i++) {
		currentAlbum = albumList[i];
	}

}

function addIdsFromArray(array) {
	if (array != null && array.data != null) {
		for (var k = 0; k < array.data.length; k++) {
			if (array.data[k].id != USER_ID)
				friends.addOccurrence(array.data[k].id);
		}
	}
};

/* Extracts the number of occurences of each friend id and populates friends array. */
function processFeedData(feed) {
	var post;

	for(var j = 0; j < feed.length; j++) {
		post = feed[j];

		if (post.from != null && post.from.id != USER_ID) {
			friends.addOccurrence(post.from.id);
		}

		/* Handle data that are returned as arrays. */
		addIdsFromArray(post.to);
		addIdsFromArray(post.likes);
		addIdsFromArray(post.story_tags);
		addIdsFromArray(post.message_tags);

		/* We need the id from the 'from' object of comments, so do that manually. */
		if (post.comments != null) {
			for (var k = 0; k < post.comments.data.length; k++) {
				if (post.comments.data[k].from.id != USER_ID)
					friends.addOccurrence(post.comments.data[k].from.id);
			}
		}
	}

	return displayFriends(friends, FRIENDS_DIV);
};

function Friends(divName) {
	this.list = [];
	this.filteredList = [];
	this.filterKey = '';

	this.filter = function(key) { 
		if (key == null) {
			this.filteredList = this.list;
		} else {
			key = key.toLowerCase();
			var keylen = key.length;
			this.filteredList = list.filter(function (a) {
				return a.firstName.substring(0, keylen).toLowerCase == key || 
						a.firstName.substring(0, keylen).toLowerCase;
			});
		}
	}

	this.addFriend = function(friend) {
		if (friend)
			this.list.push(friend);
	};

	this.removeById = function(friendId) {
		var index = this.indexOf(friendId);
		this.list.splice(index, 1);
	};

	this.addOccurrence = function(friendId) {
		var index = this.indexOf(friendId);
		if (index != null) {
			this.list[index].occurrences += 1;
		}
	};

	/* Sorting friends should sort by first names, then last names, then number of occurrences. 
		These are in increasing order of sort precedence. */
	this.sort = function() {
		this.list.sort( function(a, b) {
			/* Occurrences has the highest sorting precedence, so return if they are different. */
			//if (a.occurrences < b.occurrences) return -1;
			//if (a.occurrences > b.occurrences) return 1;

			/* Invariate: occurrences are the same. */
			/* Now compare last names. */
		    if (a.lastname < b.lastname) return -1;
		    if (a.lastname > b.lastname) return 1;

		    if (a.firstname < b.firstname) return -1;
	    	if (a.firstname > b.firstname) return 1;

	    	return 0;
	    });
	}

	this.containsId = function(friendId) {
    	return (this.list.indexOf(friendId) != null);
	};

	this.getFriendById = function(friendId) {
	    for (var i = 0; i < this.list.length; i++) {
	      if (this.list[i].id == friendId) 
	      	return this.list[i];
	    }
		return null;
	};

	this.indexOf = function(friendId) {
	    for (var i = 0; i < this.list.length; i++) {
	      if (this.list[i].id == friendId) 
	      	return i;
	    }
		return null;
	};
};

function Friend(id, firstname, lastname, picture, occurrences) {
	this.id = id;
	this.firstname = firstname;
	this.lastname = lastname;
	this.picture = picture;
	this.occurrences = occurrences;
};
