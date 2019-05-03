const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY) // from environment variable in config/ (module env-cmd)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'kinpeter85@gmail.com',
        subject: 'Thanks for registering to my Task App',
        text: `Hi ${name}! \r\n\r\n Welcome to the app! Let me know how you like it!`,
        html: `<h2 style="color: blue;">Hi ${name}!</h2><br><h4 style="color: darkgray">Welcome to the app! Let me know how you like it!</h4>`
    })
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'kinpeter85@gmail.com',
        subject: 'Sorry to see you go.',
        text: `Hi ${name}! \r\n\r\nWe'll cry all night now that you left :( `,
        html: `<h2 style="color: blue;">Hi ${name}!</h2><br><h4 style="color: darkgray">We'll cry all night now that you left :(</h4>`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}
