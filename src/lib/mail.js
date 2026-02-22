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

    const formattedTime = booking.pickupDetails?.timeOfArrival 
      ? (() => { 
          const [h, m] = booking.pickupDetails.timeOfArrival.split(':'); 
          const hour = parseInt(h); 
          const ampm = hour >= 12 ? 'PM' : 'AM'; 
          return `${hour % 12 || 12}:${m} ${ampm}`; 
        })() 
      : 'Check your itinerary';

    // Generate Extra Services HTML block
    let extrasHtml = '';
    let extrasTotal = 0;
    const extrasObj = booking.selectedExtras?.toJSON ? booking.selectedExtras.toJSON() : booking.selectedExtras;
    
    if (extrasObj && Object.keys(extrasObj).length > 0 && tour?.extraServices) {
      Object.entries(extrasObj).forEach(([indexStr, count]) => {
          const idx = parseInt(indexStr);
          if (count > 0 && tour.extraServices[idx]) {
              const extra = tour.extraServices[idx];
              const cost = count * Number(extra.price);
              extrasTotal += cost;
              extrasHtml += `
                <tr>
                  <td style="padding: 5px 0; font-size: 14px; color: #475569;">
                    ➕ ${extra.name} (${count}x)
                  </td>
                  <td align="right" style="padding: 5px 0; font-size: 14px; color: #475569;">
                    $${cost.toFixed(2)}
                  </td>
                </tr>
              `;
          }
      });
    }

    // Client Email Content
    const clientHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Booking Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f7fa; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f7fa;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #0b253a; padding: 40px 30px; text-align: center;">
              <div style="color: #f9a826; font-size: 24px; font-weight: bold; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">
                ATV Roatan
              </div>
              <div style="background-color: rgba(255,255,255,0.1); display: inline-block; padding: 8px 16px; border-radius: 20px; color: #ffffff; font-size: 14px; margin-bottom: 20px;">
                🎫 Your Booking is Confirmed! (Order #${(booking._id || '').toString().substring(0,8).toUpperCase()})
              </div>
              <h1 style="color: #ffffff; font-size: 28px; margin: 0; line-height: 1.3;">
                Hi ${booking.customer.firstName},<br>get ready for an unforgettable experience!
              </h1>
            </td>
          </tr>
          
          <!-- Content Body -->
          <tr>
            <td style="padding: 30px; background-color: #ffffff;">
              
              <!-- Tour Details Card -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 10px 0; font-size: 16px; color: #334155;"><strong>Tour:</strong> ${booking.tourTitle}</p>
                    <p style="margin: 0 0 10px 0; font-size: 15px; color: #475569;">📅 <strong>Date:</strong> ${bookingDate}</p>
                    <p style="margin: 0 0 10px 0; font-size: 15px; color: #475569;">👥 <strong>Guests:</strong> ${(booking.travelers.adults || 0) + (booking.travelers.children || 0)} People</p>
                    <p style="margin: 0; font-size: 15px; color: #475569;">⏰ <strong>Time:</strong> ${formattedTime}</p>
                  </td>
                </tr>
              </table>

              <!-- Price Breakdown Card -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #e0f2fe; border-radius: 12px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #0369a1; border-bottom: 1px solid #bae6fd; padding-bottom: 10px;">💳 Price Breakdown</h3>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 5px 0; font-size: 15px; color: #0c4a6e;">Tour Base Price</td>
                        <td align="right" style="padding: 5px 0; font-size: 15px; color: #0c4a6e;">$${((booking.totalPrice || 0) - extrasTotal).toFixed(2)}</td>
                      </tr>
                      ${extrasHtml}
                      <tr>
                        <td style="padding: 10px 0 5px 0; font-size: 15px; color: #0c4a6e; border-top: 1px dashed #bae6fd; margin-top: 5px;"><strong>Total Amount Paid</strong></td>
                        <td align="right" style="padding: 10px 0 5px 0; font-size: 16px; color: #0c4a6e; font-weight: bold; border-top: 1px dashed #bae6fd; margin-top: 5px;">$${(booking.totalPrice || 0).toFixed(2)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Customer Details Card -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 12px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #334155; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">👤 Customer Details</h3>
                    <p style="margin: 0 0 10px 0; font-size: 15px; color: #475569;"><strong>Name:</strong> ${booking.customer.firstName} ${booking.customer.lastName}</p>
                    <p style="margin: 0 0 10px 0; font-size: 15px; color: #475569;"><strong>Email:</strong> ${booking.customer.email}</p>
                    <p style="margin: 0; font-size: 15px; color: #475569;"><strong>Phone:</strong> ${booking.customer.phone}</p>
                  </td>
                </tr>
              </table>

              <!-- Pickup & Arrival Details Card -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #e0f2fe; border-radius: 12px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="margin: 0 0 15px 0; font-size: 16px; color: #0369a1; border-bottom: 1px solid #bae6fd; padding-bottom: 10px;">📍 Pickup & Arrival Details</h3>
                    
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 15px;">
                      <tr>
                        <td width="30" valign="top" style="font-size: 20px;">🚢</td>
                        <td style="font-size: 15px; color: #0c4a6e; line-height: 1.5;">
                          <strong>Arrival:</strong> 
                          ${booking.pickupDetails?.cruiseShipName ? `Cruise Ship: ${booking.pickupDetails.cruiseShipName}` : 
                            (booking.pickupDetails?.placeOfStay ? `Staying at: ${booking.pickupDetails.placeOfStay}` : 
                            (booking.pickupDetails?.meetingPoint || 'Please check your detailed itinerary for meeting instructions.'))}
                        </td>
                      </tr>
                    </table>
                    
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 15px;">
                      <tr>
                        <td width="30" valign="top" style="font-size: 20px;">🚙</td>
                        <td style="font-size: 15px; color: #0c4a6e; line-height: 1.5;">
                          <strong>Adventure:</strong> Get ready for an amazing ATV tour! Please ensure you arrive 15 minutes early.
                        </td>
                      </tr>
                    </table>

                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="30" valign="top" style="font-size: 20px;">👀</td>
                        <td style="font-size: 15px; color: #0c4a6e; line-height: 1.5;">
                          <strong>Visual Guide:</strong> Your driver will be waiting with a sign at the exit, wearing an 'ATV Roatan' shirt. Look for your name!
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Footer Information -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid #e2e8f0; padding-top: 20px;">
                <tr>
                  <td style="font-size: 13px; color: #64748b; line-height: 1.6;">
                    <strong>Cancellation Policy:</strong> Please let us know at least 24 hours in advance if you need to cancel or reschedule.<br><br>
                    <strong>Contact Info:</strong> Need help? Reply to this email.
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
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
            ${booking.pickupDetails?.cruiseShipName ? `<p><strong>Cruise Ship:</strong> ${booking.pickupDetails.cruiseShipName}</p>` : ''}
            ${booking.pickupDetails?.placeOfStay ? `<p><strong>Place of Stay:</strong> ${booking.pickupDetails.placeOfStay}</p>` : ''}
            ${booking.pickupDetails?.dateOfArrival ? `<p><strong>Date of Arrival:</strong> ${booking.pickupDetails.dateOfArrival}</p>` : ''}
            ${booking.pickupDetails?.timeOfArrival ? `<p><strong>Time of Arrival:</strong> ${booking.pickupDetails.timeOfArrival}</p>` : ''}
            ${booking.pickupDetails?.orderNotes ? `<p><strong>Notes:</strong> ${booking.pickupDetails.orderNotes}</p>` : ''}
            
            <h3 style="border-top: 1px solid #ccc; padding-top: 10px;">Booking Details</h3>
            <p><strong>Date:</strong> ${bookingDate}</p>
            <p><strong>Travelers:</strong> ${booking.travelers.adults || 0} Adults, ${booking.travelers.children || 0} Children</p>
            ${extrasHtml ? `<div style="margin: 15px 0; padding: 10px; background: #fff; border: 1px solid #eee;"><strong>Extra Services:</strong><table width="100%">${extrasHtml}</table></div>` : ''}
            <p><strong>Total Price:</strong> $${(booking.totalPrice || 0).toFixed(2)}</p>
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

export async function sendClaimGiftEmail({ name, email, reviewLink1, reviewLink2, storyLink }) {
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

    const clientHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background-color: #0b253a; padding: 20px; text-align: center;">
            <div style="color: #f9a826; font-size: 24px; font-weight: bold; text-transform: uppercase;">ATV Roatan</div>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
            <h2 style="color: #00694B;">Thank you for your submission, ${name}!</h2>
            <p style="line-height: 1.6;">We have received your verification request for the 10% OFF gift code.</p>
            <p style="line-height: 1.6;">Our team will review your links within 12-24 hours. Once verified, we will send the gift code directly to this email address.</p>
            <br/>
            <p style="line-height: 1.6;">Best regards,<br/><strong>ATV Roatan Team</strong></p>
        </div>
      </div>
    `;

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #15531B;">New Gift Claim Submission</h2>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; line-height: 1.6;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Review 1 (Google/Facebook):</strong> <a href="${reviewLink1}">${reviewLink1}</a></p>
            <p><strong>Review 2 (TripAdvisor):</strong> <a href="${reviewLink2}">${reviewLink2}</a></p>
            <p><strong>Social Media Story:</strong> <a href="${storyLink}">${storyLink}</a></p>
        </div>
      </div>
    `;

    // Send to Client
    await transporter.sendMail({
      from: `"ATV Roatan" <${EMAIL_USER}>`,
      to: email,
      subject: "We received your Gift Code claim request!",
      html: clientHtml
    });

    // Send to Admin
    await transporter.sendMail({
      from: `"ATV Roatan System" <${EMAIL_USER}>`,
      to: EMAIL_USER, // Admin receives email at the same address
      subject: `New Gift Claim Submission from ${name}`,
      html: adminHtml
    });

    return true;

  } catch (error) {
    console.error("Error sending claim gift emails:", error);
    return false;
  }
}

export async function sendContactEmail({ name, email, subject, message }) {
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

    const clientHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background-color: #0b253a; padding: 20px; text-align: center;">
            <div style="color: #f9a826; font-size: 24px; font-weight: bold; text-transform: uppercase;">ATV Roatan</div>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
            <h2 style="color: #00694B;">Thank you for contacting us, ${name}!</h2>
            <p style="line-height: 1.6;">We have received your message regarding "<strong>${subject}</strong>".</p>
            <p style="line-height: 1.6;">Our team will review your inquiry and get back to you at this email address as soon as possible.</p>
            <br/>
            <p style="line-height: 1.6;">Best regards,<br/><strong>ATV Roatan Team</strong></p>
        </div>
      </div>
    `;

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #15531B;">New Contact Form Message</h2>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; line-height: 1.6;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ccc;">
              <strong>Message:</strong>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
        </div>
      </div>
    `;

    // Send to Client
    await transporter.sendMail({
      from: `"ATV Roatan" <${EMAIL_USER}>`,
      to: email,
      subject: `We received your message: ${subject}`,
      html: clientHtml
    });

    // Send to Admin
    await transporter.sendMail({
      from: `"ATV Roatan System" <${EMAIL_USER}>`,
      to: EMAIL_USER,
      subject: `New Contact Request: ${subject} from ${name}`,
      html: adminHtml
    });

    return true;

  } catch (error) {
    console.error("Error sending contact emails:", error);
    return false;
  }
}


