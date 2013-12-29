/*
	Scripts behind the facebook friend analyzer and remover. 
	Created by Rick Sullivan and Parker Hegstrom.
*/

/* Information about the current user. */
var USER_ID;
var FIRST_NAME;
var LAST_NAME;

function getFriends(id, accessToken) {
	/* GET request at me/friends endpoint. 

		SUCCESS: displayFriends(msg);
	*/
};

function displayFriends(friends) {
	var friendHtml = '';
	for(var i = 0; i < friends.length; i++) {
		friendHtml += '<p>' + friends[i].name + ' : ' + friends[i].id 
			+ ' <img src="' + friends[i].picture.data.url + '"></p>';
	}

	var friendDiv = document.getElementById('friendListDiv');
	friendDiv.innerHTML += friendHtml;
};

/* Extracts the number of occurences of each friend id and populates friends array. */
function processFeedData(feed) {
	var userId = FB.getLoginSatus();
	var friends = new Friends();

	var post;

	function addIdsFromArray(array) {
		if (array != null) {
			for (var k = 0; k < array.data.length; k++) {
				if (array.data[k].id != USER_ID)
					friends.add(array.data[k].id);
			}
		}
	};

	for(var j = 0; j < feed.length; j++) {
		post = feed[j];

		if (post.from != null && post.from.id != USER_ID) {
			friends.add(post.from.id);
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
					friends.add(post.comments.data[k].from.id);
			}
		}
	}

	return updateDisplayedFriends(friends);
};

function updateDisplayedFriends(friends) {
	var friendsHtml = '';
	friends.sort();
	for (int l = 0; l < friends.length; l++) {
		friendsHtml += '<p>Id: ' + friends[l].id + '	# of occurrences:' + friends[l].occurrences + '</p>';
	}

	var friendDiv = document.getElementById('updatedFriendDiv');
	friendDiv.innerHTML += friendsHtml;
};

function Friends() {
	this = [];

	add = function(friendId) {
		var index = indexOf(friendId);
		if (index != null) {
			this[index].occurrences += 1;
		} else {
			this.push(new Friend(friendId, 1));
		}
	};

	containsId = function(friendId) {
    	return (this.indexOf(friendId) != null);
	};

	getFriendById = function(friendId) {
	    for (var i = 0; i < this.length; i++) {
	      if (this[i].id == friendId) 
	      	return this[i];
	    }
		return null;
	};

	indexOf = function(friendId) {
	    for (var i = 0; i < this.length; i++) {
	      if (this[i].id == friendId) 
	      	return i;
	    }
		return null;
	};
};

function Friend(id, occurrences) {
	this.id = id;
	this.occurrences = occurrences;
};
