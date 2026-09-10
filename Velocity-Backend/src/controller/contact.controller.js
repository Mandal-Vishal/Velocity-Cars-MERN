const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        msg: "All fields are required",
      });
    }

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,

      // This should be YOUR Velocity email
      to: [process.env.CONTACT_EMAIL],

      // So when you reply, it goes directly to the person
      replyTo: email,

      subject: `Velocity Contact: ${subject}`,

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 30px; color: #222;">

          <h1 style="color: #172554; margin-bottom: 5px;">
            Velocity
          </h1>

          <p style="color: #666;">
            New Contact Form Message
          </p>

          <hr />

          <h2>${subject}</h2>

          <div style="margin-top: 25px; padding: 20px; background: #f8fafc; border-radius: 10px;">

            <p>
              <strong>Name:</strong> ${name}
            </p>

            <p>
              <strong>Email:</strong> ${email}
            </p>

            <p>
              <strong>Subject:</strong> ${subject}
            </p>

          </div>

          <div style="margin-top: 25px;">
            <h3>Message</h3>

            <p style="line-height: 1.6;">
              ${message}
            </p>
          </div>

          <hr style="margin-top: 30px;" />

          <p style="font-size: 12px; color: #777;">
            This message was submitted through the Velocity contact form.
          </p>

        </div>
      `,
    });

    if (error) {
      console.error("Resend contact email error:", error);

      return res.status(500).json({
        msg: "Failed to send message",
      });
    }

    console.log("Contact email sent:", data);

    return res.status(200).json({
      msg: "Message sent successfully",
    });

  } catch (error) {
    console.error("Contact controller error:", error);

    return res.status(500).json({
      msg: "Failed to send message",
    });
  }
};

module.exports = {
  sendContactMessage,
};