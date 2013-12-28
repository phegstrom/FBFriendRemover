/*
	Scripts behind the facebook friend analyzer and remover. 
	Created by Rick Sullivan and Parker Hegstrom.
*/

function getFriends(id, accessToken) {
	/* GET request at me/friends endpoint. 

		SUCCESS: displayFriends(msg);
	*/
};

function displayFriends(friends) {
	var friendHtml = '';
	for(var i = 0; i < friends.length; i++) {
		friendHtml += '<p>' + friends[i].name + ' : ' + friends[i].id 
			+ ' <img src="' + friends[i].picture + '"></p>';
	}

	var friendDiv = document.getElementById('friendListDiv');
	friendDiv.innerHtml += friendHtml;
};

function getFeedData(id, accessToken) {
	/*
		GET me/feed?fields=from,to,likes.fields(id),comments.fields(from.id),message_tags
	
		SUCESS: processFeedData(msg);
	*/
};

/* Extracts the number of occurences of each friend id and populates friends array. */
function processFeedData(feed) {
	var friends = [];

	/* Do shit */

	return updateDisplayedFriends(friends);
};

function Friend(id, occurrences) {
	this.id = id;
	this.occurrences = occurrences;
};