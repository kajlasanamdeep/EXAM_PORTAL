const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey('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');

module.exports = {
    sendRegisterMail : (payload) => {
        const msg = {
            from: 'hrxtos@gmail.com',
            to: payload.email,
            subject: 'Access-Code',
            html: `<p>You are registered to new course successfully <br> 
            your account,s new password is ${payload.password} </p>.`
        }
        sendGridMail.send(msg).then(info => {
            console.log('Email Sent successfully!');
        }).catch(error => {
            console.log('Email not sent.', error);
        });
        
    },
    sendExamMail : (payload) => {
        const msg = {
            from: 'hrxtos@gmail.com',
            to: payload.email,
            subject: 'Access-Code',
            html: `<p>Your Access code for exam of subject ${payload.subject} of course ${payload.course} is ${payload.accesscode} </p>.`
        }
        sendGridMail.send(msg).then(info => {
            console.log('Email Sent successfully!');
        }).catch(error => {
            console.log('Email not sent.', error);
        });
        
    }
}

