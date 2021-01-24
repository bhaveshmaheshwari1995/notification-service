const nodemailer = require('nodemailer');
const config = require('./../../config');

class Mailer {
    constructor (logger) {
        this.logger = logger;
        this.transporter = nodemailer.createTransport({
            host: config.get('mailSMTP'),
            port: config.get('mailSMTPPort'),
            auth: {
               user: config.get('mailUser'),
               pass: config.get('mailPassword')
            }
        });
    }    
    
    /**
     * Sends mail to user
     *
     * @param String user
     * @param {*} order
     * @return Promise
     */
    send(user, order) {
        let mailOptions = {
            from: config.get('mailUser'), // Sender address
            to: user.email,         // List of recipients
            subject: 'Order Update',                    // Subject line
            text: `Hi ${user.name}, Your order for ${order.name} from seller ${order.company} is ${order.state}`
        };
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                this.logger.error(error);
            }
            this.logger.info('Mail sent to %s on email %s', mailOptions.to)
        });
    }
}

module.exports = Mailer;

