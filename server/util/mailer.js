const sgMail = require('@sendgrid/mail')
const {log, error} = require('../customLogger')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = (msg) => {

  return new Promise((resolve, reject) => {
    log(msg)

    sgMail
    .send(msg)
    .then(() => {
      log('Mail sent: ' + msg.subject)
    }, err => {
      error(err);

      if (err.response) {
        error(err.response.body)
      }
    })
  })
  
}

exports.sendActivationMail = (user, req) => {
  const prelink = `Please click on the following link, or paste it in your browser to acccess the application.\n\n`
  const hostString = `${process.env.PROTOCOL}://${req.hostname}/activate?u=${user.username}&c=${user.activation_code}`
  const postLink = '\n\nIf you have not requested this, please ignore the email'

  const text = prelink + hostString + postLink

  sendMail({
    from: 'admin@qitaab.com',
    to: user.username,
    subject: 'Qitaab Account Activation',
    text: text
  })
}

exports.sendSignupNotification = (user) => {

  const from = 'admin@qitaab.com'
  const to = 'abverma@protonmail.com'
  const subject = 'Qitaab Signup Notification'
  const text = user.username + ' has signed up to the app. \n \n Thanks \n Pustak Team'
  sendMail({
    from,
    to,
    subject,
    text
  })
}

exports.sendResetPassword = async (user, password) => {

  // create reusable transporter object using the default SMTP transport
  const from_email = new helper.Email('admin@apnenotes.com')
  const to_email = new helper.Email(user.email)
  const subject = 'Reset Password'
  const content = new helper.Content('text/plain', user.firstName + ',\n Your new password is ' + password + '\n \n Thanks \n Notes Team')
  const mail = new helper.Mail(from_email, subject, to_email, content)

  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  })

  console.log(mail.toJSON())

  sg.API(request, function(error, response) {
    if (error) {
  console.log(error)
    }
    console.log(response.statusCode)
    console.log(response.body)
    console.log(response.headers)
  })
}