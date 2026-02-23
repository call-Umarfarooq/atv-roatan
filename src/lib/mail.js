import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

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
                  <td style="padding: 4px 0; font-size: 14px; color: #1a5c39;">
                    ➕ ${extra.name} (${count}x)
                  </td>
                  <td align="right" style="padding: 4px 0; font-size: 14px; color: #1a5c39;">
                    $${cost.toFixed(2)}
                  </td>
                </tr>
              `;
          }
      });
    }

    const arrivalInfo = booking.pickupDetails?.cruiseShipName ? `Cruise Ship: ${booking.pickupDetails.cruiseShipName}` : 
                       (booking.pickupDetails?.placeOfStay ? `Staying at: ${booking.pickupDetails.placeOfStay}` : 
                       (booking.pickupDetails?.meetingPoint || 'Check itinerary for instructions.'));

    // Read HTML template
    const templatePath = path.join(process.cwd(), 'src', 'lib', 'templates', 'booking-confirmation.html');
    let clientHtml = fs.readFileSync(templatePath, 'utf8');

    // Replace Placeholders
    const replacements = {
      '{{orderId}}': (booking._id || '').toString().substring(0,8).toUpperCase(),
      '{{customerName}}': booking.customer.firstName,
      '{{customerNameFull}}': `${booking.customer.firstName} ${booking.customer.lastName}`,
      '{{tourTitle}}': booking.tourTitle,
      '{{bookingDate}}': bookingDate,
      '{{guests}}': (booking.travelers.adults || 0) + (booking.travelers.children || 0),
      '{{time}}': formattedTime,
      '{{basePrice}}': ((booking.totalPrice || 0) - extrasTotal).toFixed(2),
      '{{extrasHtml}}': extrasHtml,
      '{{totalPrice}}': (booking.totalPrice || 0).toFixed(2),
      '{{arrivalInfo}}': arrivalInfo,
      '{{email}}': booking.customer.email,
      '{{phone}}': booking.customer.phone
    };

    Object.entries(replacements).forEach(([key, value]) => {
      clientHtml = clientHtml.split(key).join(value);
    });

    // Logo path for attachment
    const logoPath = path.join(process.cwd(), 'public', 'images', 'atv-logo.png');

    // Client Email
    await transporter.sendMail({
      from: `"ATV Roatan" <${EMAIL_USER}>`,
      to: booking.customer.email,
      subject: `Booking Confirmed: ${booking.tourTitle}`,
      html: clientHtml,
      attachments: [{
        filename: 'atv-logo.png',
        path: logoPath,
        cid: 'logo' // same cid value as in the html img src
      }]
    });

    // Admin Email Content (keeping it simple as it's for internal use)
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #00694B;">New Booking Received!</h2>
        <p>A new booking has been made for <strong>${booking.tourTitle}</strong>.</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Customer Details</h3>
            <p><strong>Name:</strong> ${booking.customer.firstName} ${booking.customer.lastName}</p>
            <p><strong>Email:</strong> ${booking.customer.email}</p>
            <p><strong>Phone:</strong> ${booking.customer.phone}</p>
            ${booking.pickupDetails?.cruiseShipName ? `<p><strong>Cruise Ship:</strong> ${booking.pickupDetails.cruiseShipName}</p>` : ''}
            ${booking.pickupDetails?.placeOfStay ? `<p><strong>Place of Stay:</strong> ${booking.pickupDetails.placeOfStay}</p>` : ''}
            
            <h3 style="border-top: 1px solid #ccc; padding-top: 10px; color: #334155;">Booking Details</h3>
            <p><strong>Date:</strong> ${bookingDate}</p>
            <p><strong>Travelers:</strong> ${booking.travelers.adults || 0} Adults, ${booking.travelers.children || 0} Children</p>
            <p><strong>Total Price:</strong> $${(booking.totalPrice || 0).toFixed(2)}</p>
            <p><strong>Payment Status:</strong> ${booking.paymentStatus.toUpperCase()}</p>
        </div>
      </div>
    `;

    // Send to Admin
    await transporter.sendMail({
      from: `"ATV Roatan System" <${EMAIL_USER}>`,
      to: EMAIL_USER,
      subject: `New Booking: ${booking.tourTitle} - ${booking.customer.firstName}`,
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


