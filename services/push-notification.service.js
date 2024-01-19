const dotenv = require("dotenv");
const webpush = require("web-push");
const { userFindOneService } = require("./user.service");

dotenv.config();

const sendPushNotification = async (fromUser, toUser, message) => {
  try {
    const reciverUser = await userFindOneService({ _id: toUser });
    const senderUser = await userFindOneService({_id: fromUser});

    if (!!reciverUser.push_notification_endpoint) {
      webpush.setVapidDetails(
        "mailto:mukunddtridhyatech@gmail.com",
        process.env.webpushPublicKey,
        process.env.webpushPrivateKey
      );

      const payload = {
        notification: {
          data: {
            url: "https://mailmeteor.com/logos/assets/PNG/Google_Chat_Logo_256px.png",
          },
          icon: "https://mailmeteor.com/logos/assets/PNG/Google_Chat_Logo_256px.png",
          title: senderUser.username,
          body: message,
          vibrate: [100, 50, 100],
        },
      };

      console.log(payload, 'payload');

      webpush.sendNotification(
        reciverUser.push_notification_endpoint,
        JSON.stringify(payload)
      );
    }
  } catch (error) {}
};

module.exports = { sendPushNotification };
