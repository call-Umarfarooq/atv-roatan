import nodemailer from 'nodemailer';

export async function sendBookingConfirmationEmail(booking, tour) {
  try {
    const { EMAIL_USER, EMAIL_PASS } = process.env;
    
    if (!EMAIL_USER || !EMAIL_PASS) {
      console.warn("Email credentials missing. Emails will not be sent.");
      return false;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    });

    // Formatting date
    const bookingDate = new Date(booking.date).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // Client Email Content
    const clientHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #15531B;">Booking Confirmation</h2>
        <p>Dear ${booking.customer.firstName} ${booking.customer.lastName},</p>
        <p>Thank you for booking with us! Your reservation for <strong>${booking.tourTitle}</strong> is confirmed.</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Date:</strong> ${bookingDate}</p>
            <p><strong>Travelers:</strong> ${booking.travelers.adults || 0} Adults, ${booking.travelers.children || 0} Children</p>
            <p><strong>Total Price:</strong> $${booking.totalPrice.toFixed(2)}</p>
            <p><strong>Payment Status:</strong> ${booking.paymentStatus.toUpperCase()}</p>
        </div>
        
        <p>If you have any questions, please reply to this email.</p>
        <p>Best regards,<br>ATV Roatan Team</p>
      </div>
    `;

    // Admin Email Content
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #15531B;">New Booking Received!</h2>
        <p>A new booking has been made for <strong>${booking.tourTitle}</strong>.</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Customer Details</h3>
            <p><strong>Name:</strong> ${booking.customer.firstName} ${booking.customer.lastName}</p>
            <p><strong>Email:</strong> ${booking.customer.email}</p>
            <p><strong>Phone:</strong> ${booking.customer.phone}</p>
            ${booking.customer.cruiseShipName ? `<p><strong>Cruise Ship:</strong> ${booking.customer.cruiseShipName}</p>` : ''}
            ${booking.customer.placeOfStay ? `<p><strong>Place of Stay:</strong> ${booking.customer.placeOfStay}</p>` : ''}
            ${booking.customer.timeOfArrival ? `<p><strong>Time of Arrival:</strong> ${booking.customer.timeOfArrival}</p>` : ''}
            ${booking.customer.orderNotes ? `<p><strong>Notes:</strong> ${booking.customer.orderNotes}</p>` : ''}
            
            <h3 style="border-top: 1px solid #ccc; padding-top: 10px;">Booking Details</h3>
            <p><strong>Date:</strong> ${bookingDate}</p>
            <p><strong>Travelers:</strong> ${booking.travelers.adults || 0} Adults, ${booking.travelers.children || 0} Children</p>
            <p><strong>Total Price:</strong> $${booking.totalPrice.toFixed(2)}</p>
            <p><strong>Payment Strategy:</strong> ${booking.paymentType}</p>
            <p><strong>Payment Status:</strong> ${booking.paymentStatus.toUpperCase()}</p>
        </div>
      </div>
    `;

    // Send to Client
    await transporter.sendMail({
      from: `"ATV Roatan" <${EMAIL_USER}>`,
      to: booking.customer.email,
      subject: `Booking Confirmed: ${booking.tourTitle}`,
      html: clientHtml
    });

    // Send to Admin
    await transporter.sendMail({
      from: `"ATV Roatan System" <${EMAIL_USER}>`,
      to: EMAIL_USER, // Admin receives email at the same address
      subject: `New Booking: ${booking.tourTitle} - ${booking.customer.firstName} ${booking.customer.lastName}`,
      html: adminHtml
    });

    return true;

  } catch (error) {
    console.error("Error sending booking emails:", error);
    return false; // Non-blocking
  }
}
