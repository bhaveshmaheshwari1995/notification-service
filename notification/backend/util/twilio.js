const twilio = require('twilio');
const config = require('./../../config')
const logger = require('./../../logger')

const TWILIO_FROM_PHONE = config.get("twilioFromNumber");
const TWILIO_ACCOUNT_SID = config.get("twilioAccountSID");
const TWILIO_AUTH_TOKEN = config.get("twilioAuthToken");

class Twilio {
    constructor(){
        this.twilioClient = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);      
    }

    /**
     * Sends text message to user
     *
     * @param String user
     * @param {*} order
     * @return Promise
     */    
    send (user, order) {
        //'{"name":"phone","qty":3,"company":"WS Retails","state":"ACCEPTED"}'
        let smsBody = `Hi ${user.name}, Your order for ${order.name} from seller ${order.company} is ${order.state}` 
        sendSMS(this.twilioClient, user.mobileno, smsBody);
    }
    
}

function sendSMS (client, toPhone, body){

	client.messages.create({
		to:   toPhone,
		from: TWILIO_FROM_PHONE,
		body: body
	}, (err, twilioResponse) => {
		if(err){
			logger.error(err)
		}
		else{
			logger.info("Messge sent to toPhone %s", toPhone);
		}
	});
};


module.exports = Twilio
