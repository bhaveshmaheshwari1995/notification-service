Notification service

Use below API to subscribe to notifications

API - http://localhost:8000/v1/notification/subscribe
POST
Parameters - 
{
	"name": <name>,
	"mode": <mode of notification>,		// Accepted types ["EMAIL","SMS"],
	"state": <array of states for which user wants notification> 	//["ACCEPTED", "INPROGRESS", "CANCELLED", "DELIVERED","NOT DELIVERED"] if not given default all
	"email": <email Address>,
	"mobileno": <mobile number> 		// use contry code before number eg +919009878767
}

Use below API to unsubscribe to notifications

API - http://localhost:8000/v1/notification/unsubscribe
POST
Parameters - 
{
	"name": <name>,
	"mode": <mode of notification>		// Accepted types ["EMAIL",""],
}