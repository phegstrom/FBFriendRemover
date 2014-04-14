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

var friends = new Friends(FRIENDS_DIV);
var friendsToDelete = new Friends(FRIENDS_TO_DELETE_DIV);

function addFriends(friendList) {
	var friend;

	for(var i = 0; i < friendList.length; i++) {
		friend = friendList[i];
		friends.addFriend(new Friend(friend.id, friend.first_name, friend.last_name, friend.picture.data.url, 0));
	}

	friends.sort();

	displayFriends(friends, FRIENDS_DIV);
;}

function displayFriends(friends, divName) {
	var friendHtml = '';
	var friend;

	for(var i = 0; i < friends.filteredList.length; i++) {
		friend = friends.filteredList[i];
		friendHtml += '<div class="well friend" id="' + friend.id + '" '
			+ 'onclick="removeFriend(' + friend.id + ', \'' + divName + '\');">' 
	 		+ ' <img class="img-circle" src="' + friend.picture + '">' + friend.firstName + ' ' + friend.lastName
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
	this.filteredList = this.list;
	this.filterKey = '';
	this.divName = divName;
	this.sortFunction = new Sort().lastName;

	this.newFilter = function(key) {
		this.filterKey = key;
		this.filter();
	};

	this.filter = function() { 
		var key = this.filterKey;

		if (key == null) {
			this.filteredList = this.list;
		} else {
			/* Remove whitespace and make key lowercase. */
			key = key.toLowerCase().replace(/\s/g,'');
			var keylen = key.length;
			this.filteredList = this.list.filter(function (friend) {
				return friend.firstName.substring(0, keylen).toLowerCase() == key ||
						friend.lastName.substring(0, keylen).toLowerCase() == key ||
						(friend.firstName + friend.lastName).substring(0, keylen).toLowerCase() == key;
			});
		}

		displayFriends(this, this.divName);
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

	this.newSort = function(newSortFunction) {
		this.sortFunction = newSortFunction;
		this.sort();
		displayFriends(this, this.divName);
	};

	this.sort = function() {
		this.list = this.list.sort(this.sortFunction);
		this.filter();
	};

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

function Friend(id, firstName, lastName, picture, occurrences) {
	this.id = id;
	this.firstName = firstName;
	this.lastName = lastName;
	this.picture = picture;
	this.occurrences = occurrences;
};

function Sort() {
	this.firstName = function (a, b) {
		    if (a.firstName < b.firstName) return -1;
	    	if (a.firstName > b.firstName) return 1;

		    if (a.lastName < b.lastName) return -1;
		    if (a.lastName > b.lastName) return 1;

	    	return 0;
	};

	this.lastName = function (a, b) {
		    if (a.lastName < b.lastName) return -1;
		    if (a.lastName > b.lastName) return 1;

		    if (a.firstName < b.firstName) return -1;
	    	if (a.firstName > b.firstName) return 1;

	    	return 0;
	};

	this.occurrences = function (a, b) {
		console.log("Occurrence sort not implemented");
	};
}