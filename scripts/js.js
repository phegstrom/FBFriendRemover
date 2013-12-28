/*
	Scripts behind the facebook friend analyzer and remover. 
	Created by Rick Sullivan and Parker Hegstrom.
*/

$('#authorizeButton').submit(function () {
	/* On Submit, we need to:
		1) Get the User's friends list and display it.
		2) Asynchronously, analyze the User's recent feed and determine which friends they interact with.
		3) Determine which friends are inactive somehow.
		4) Update the displayed friends list to account for the analysis.
	*/

	var username, password;

	/* Get user and password. */

	GetAccessToken(username, password);
});

function getFriends(id, accessToken) {
	/* GET request at me/friends endpoint. 

		SUCCESS: displayFriends(msg);
	*/
};

function displayFriends(friends) {
	for(var i = 0; i < friends.length; i++) {
		console.log(friends[i].name + ' : ' + friends[i].id);
	}
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