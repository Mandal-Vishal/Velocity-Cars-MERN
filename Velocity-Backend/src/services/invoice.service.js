const PDFDocument = require("pdfkit");

const generateInvoice = (booking, car) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      margin: 50,
    });

    const chunks = [];

    doc.on("data", (chunk) => {
      chunks.push(chunk);
    });

    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(chunks);
      resolve(pdfBuffer);
    });

    doc.on("error", reject);

    // Header
    doc
      .fontSize(24)
      .font("Helvetica-Bold")
      .text("VELOCITY");

    doc
      .fontSize(10)
      .font("Helvetica")
      .text("Car Rental Platform");

    doc.moveDown();

    doc
      .fontSize(20)
      .font("Helvetica-Bold")
      .text("INVOICE");

    doc.moveDown();

    // Invoice details
    doc
      .fontSize(10)
      .font("Helvetica")
      .text(`Invoice ID: ${booking._id}`)
      .text(
        `Invoice Date: ${new Date(
          booking.createdAt
        ).toLocaleDateString("en-IN")}`
      );

    doc.moveDown();

    // Customer
    doc
      .fontSize(13)
      .font("Helvetica-Bold")
      .text("Renter Details");

    doc.moveDown(0.5);

    doc
      .fontSize(10)
      .font("Helvetica")
      .text(`Name: ${booking.firstName} ${booking.lastName}`)
      .text(`Email: ${booking.email}`)
      .text(`Phone: ${booking.phone}`);

    doc.moveDown();

    // Car
    doc
      .fontSize(13)
      .font("Helvetica-Bold")
      .text("Car Details");

    doc.moveDown(0.5);

    doc
      .fontSize(10)
      .font("Helvetica")
      .text(`Car: ${car.brand} ${car.model}`)
      .text(`Year: ${car.year}`)
      .text(`Location: ${car.location}`);

    doc.moveDown();

    // Rental
    doc
      .fontSize(13)
      .font("Helvetica-Bold")
      .text("Rental Details");

    doc.moveDown(0.5);

    doc
      .fontSize(10)
      .font("Helvetica")
      .text(`Pickup Location: ${booking.pickupLocation}`)
      .text(`Drop Location: ${booking.dropLocation}`)
      .text(
        `Pickup Date: ${new Date(
          booking.pickupDate
        ).toLocaleDateString("en-IN")}`
      )
      .text(
        `Return Date: ${new Date(
          booking.returnDate
        ).toLocaleDateString("en-IN")}`
      )
      .text(`Number of Days: ${booking.days}`);

    doc.moveDown();

    // Payment
    doc
      .fontSize(13)
      .font("Helvetica-Bold")
      .text("Payment Details");

    doc.moveDown(0.5);

    doc
      .fontSize(10)
      .font("Helvetica")
      .text(`Subtotal: ₹${booking.subtotal}`)
      .text(`Service Fee: ₹${booking.serviceFee}`)
      .text(`Insurance: ₹${booking.insurance}`)
      .text(`Additional Driver: ₹${booking.additionalDriver}`)
      .text(`Taxes: ₹${booking.taxes}`);

    doc.moveDown();

    doc
      .fontSize(15)
      .font("Helvetica-Bold")
      .text(`Total Amount: ₹${booking.total}`);

    doc.moveDown();

    doc
      .fontSize(10)
      .font("Helvetica")
      .text(`Payment Method: ${booking.paymentMethod}`)
      .text(`Booking Status: ${booking.status}`);

    doc.moveDown(3);

    doc
      .fontSize(9)
      .font("Helvetica")
      .text(
        "Thank you for choosing Velocity. We hope you have a great journey!"
      );

    doc.end();
  });
};

module.exports = {
  generateInvoice,
};

