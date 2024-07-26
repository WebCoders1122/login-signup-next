import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { User } from "@/model/userModel";
import { v4 as uuidv4 } from "uuid";
type Props = {
  email: string;
  emailType: string;
  userID: string;
};
export const sendEmail = async ({ email, emailType, userID }: Props) => {
  try {
    console.log("sendEmail");

    const hashedToken = uuidv4();
    console.log(hashedToken);
    //checking the email type and saving tokens to DB
    if (emailType === "VERIFY") {
      console.log("verify");
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
    console.log("after verify");

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "webuser0808@gmail.com",
        pass: process.env.GMAIL_PASS,
      },
    });
    console.log("transporter success");

    // mail options to be sent to user
    const emailOptions = await transporter.sendMail({
      from: "webuser0808@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Verify Your Email Address"
          : "Reset your Password", // Subject line
      //TODO to be setup later
      // text: "Hello world?", // plain text body
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
    console.log("emailoptions success");

    //sending email
    const emailResponse = transporter.sendMail(emailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
    console.log("email response success");

    console.log(emailOptions, "sent");
    return emailResponse;
  } catch (error) {
    console.log("mailer.ts file error: ", error);
  }
};
