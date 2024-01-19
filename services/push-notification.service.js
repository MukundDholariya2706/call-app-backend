const webpush = require("web-push");
const { userFindOneService } = require("./user.service");

const sendPushNotification = async (fromUser, toUser, message) => {
  try {
    // const vapidKeys = webpush.generateVAPIDKeys(); // create public and private key

    const reciverUser = await userFindOneService({ _id: toUser });
    const senderUser = await userFindOneService({ _id: fromUser });

    if (!!reciverUser.push_notification_endpoint) {
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

      webpush.sendNotification(
        reciverUser.push_notification_endpoint,
        JSON.stringify(payload)
      );
    }
  } catch (error) {}
};

module.exports = { sendPushNotification };
