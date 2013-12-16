/*
	Scripts behind the facebook friend analyzer and remover. 
	Created by Rick Sullivan and Parker Hegstrom.
*/

page.load() = function() {
	/* If User is already logged into Facebook, call getAccessToken(); */
};

authorizeButton.submit() = function () {
	/* On Submit, we need to:
		1) Get a User Access Token with the User's credentials.
		2) Get the User's friends list and display it.
		3) Asynchronously, analyze the User's recent feed and determine which friends they interact with.
		4) Determine which friends are inactive somehow.
		5) Update the displayed friends list to account for the analysis.
	*/

	var username, password;

	/* Get user and password. */

	GetAccessToken(username, password);
};

function getAccessToken(username, password) {
	/* SUCESS: getFriends(msg.id, msg.accessToken) and getFeedData */

	/* FAILURE: display authorization failure info. */
};

function getFriends(id, accessToken) {
	/* GET request at me/friends endpoint. 

		SUCCESS: displayFriends(msg);
	*/
};

function displayFriends(friends) {

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

	return UpdateDisplayedFriends(friends);
};

function Friend(id, occurrences) {
	this.id = id;
	this.occurrences = occurrences;
};