import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { User } from "@/model/userModel";
type Props = {
  email: string;
  emailType: string;
  userID: string;
};
export const sendEmail = async ({ email, emailType, userID }: Props) => {
  console.log("sendEmail");
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedToken = await bcryptjs.hash(userID.toString(), salt);
    //checking the email type and saving tokens to DB
    if (emailType === "VERIFY") {
      const verifyTokenExpiry = Date.now() + 3600000;
      const saveVerifyInfo = await User.findByIdAndUpdate(userID, {
        verifyToken: hashedToken,
        verifyTokenExpiry,
      });
    } else if (emailType === "RESET") {
      const forgotPasswordTokenExpiry = Date.now() + 3600000;
      const saveForgotPassInfo = await User.findByIdAndUpdate(userID, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry,
      });
    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASS,
      },
    });
    // mail options to be sent to user
    const emailOptions = await transport.sendMail({
      from: "webcoders1122@abc.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY"
          ? "Verify Your Email Address"
          : "Reset your Password", // Subject line
      //TODO to be setup later
      text: "Hello world?", // plain text body
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
    or copy and paste the link below in your browser. <br> ${
      process.env.DOMAIN
    }/verifyemail?token=${hashedToken}
    </p>`, // html body
    });
    //sending email
    const emailResponse = await transport.sendMail(emailOptions);
    return emailResponse;
  } catch (error) {
    console.log("mailer.ts file error: ", error);
  }
};
