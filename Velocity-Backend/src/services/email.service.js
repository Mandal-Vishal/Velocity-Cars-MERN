const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendBookingEmail = async ({
  booking,
  car,
  subject,
  message,
  invoiceBuffer,
}) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: [booking.email],

      subject,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 650px;
          margin: 0 auto;
          padding: 30px;
          color: #222;
        ">

          <h1 style="
            color: #172554;
            margin-bottom: 5px;
          ">
            Velocity
          </h1>

          <p style="color: #666;">
            Car Rental Platform
          </p>

          <hr />

          <h2>${subject}</h2>

          <p>
            Hi ${booking.firstName},
          </p>

          <p>
            ${message}
          </p>

          <div style="
            margin-top: 25px;
            padding: 20px;
            background: #f8fafc;
            border-radius: 10px;
          ">

            <h3>Booking Details</h3>

            <p>
              <strong>Booking ID:</strong>
              ${booking._id}
            </p>

            <p>
              <strong>Car:</strong>
              ${car.brand} ${car.model}
            </p>

            <p>
              <strong>Pickup:</strong>
              ${booking.pickupLocation}
            </p>

            <p>
              <strong>Drop:</strong>
              ${booking.dropLocation}
            </p>

            <p>
              <strong>Pickup Date:</strong>
              ${new Date(booking.pickupDate).toLocaleDateString("en-IN")}
            </p>

            <p>
              <strong>Return Date:</strong>
              ${new Date(booking.returnDate).toLocaleDateString("en-IN")}
            </p>

            <p>
              <strong>Total:</strong>
              ₹${booking.total}
            </p>

            <p>
              <strong>Status:</strong>
              ${booking.status}
            </p>

          </div>

          <p style="
            margin-top: 30px;
            color: #666;
          ">
            Your invoice is attached to this email.
          </p>

          <p>
            Thank you for choosing <strong>Velocity</strong>.
          </p>

        </div>
      `,

      attachments: [
        {
          filename: `Velocity-Invoice-${booking._id}.pdf`,
          content: invoiceBuffer,
        },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return null;
    }

    console.log("Email sent successfully:", data);

    return data;
  } catch (error) {
    console.error("Email service error:", error);
    return null;
  }
};

module.exports = {
  sendBookingEmail,
};

