import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export async function sendBookingConfirmationEmail(booking, tour) {
  try {
    const { EMAIL_USER, EMAIL_PASS, NEXT_PUBLIC_BASE_URL } = process.env;
    const baseUrl = NEXT_PUBLIC_BASE_URL || 'https://atvroatan.com';
    
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

    const taxAmount = booking.taxAmount || (booking.totalPrice / 1.1 * 0.1);
    const subtotal = booking.subtotal || (booking.totalPrice - taxAmount - extrasTotal);
    const discountAmount = booking.discountAmount || (booking.paymentType === 'pay_now' ? (booking.totalPrice / 0.98 * 0.02) : 0);

    const taxHtml = `
      <tr>
        <td style="padding: 4px 0; font-size: 14px; color: #1a5c39;">Tax (10%)</td>
        <td align="right" style="padding: 4px 0; font-size: 14px; color: #1a5c39;">$${taxAmount.toFixed(2)}</td>
      </tr>
    `;

    const discountHtml = discountAmount > 0 ? `
      <tr>
        <td style="padding: 4px 0; font-size: 13px; color: #00694B; font-style: italic;">Applied: 2% Advance Booking Discount</td>
        <td align="right" style="padding: 4px 0; font-size: 13px; color: #00694B; font-weight: bold;">-$${discountAmount.toFixed(2)}</td>
      </tr>
    ` : '';
    const portSpecificMeetingHtml = `
      <div id="where-we-meet-you-section" style="margin-top: 40px; margin-bottom: 25px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; border-top: 2px solid #eee; padding-top: 30px;">
        <h3 style="text-align: center; color: #1a1a1a; font-size: 22px; margin-bottom: 25px; font-weight: 900; letter-spacing: 1px;">**WHERE WE MEET YOU**</h3>
        
        <!-- Summary Cards -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
          <tr>
            <td width="48%" valign="top" style="background-color: #ffffff; border: 2px solid #00694B; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.08);">
              <div style="background-color: #00694B; color: #ffffff; padding: 12px; text-align: center; font-weight: bold; font-size: 14px; text-transform: uppercase;">
                Port of Roatán
              </div>
              <div style="padding: 20px;">
                <ul style="margin: 0; padding: 0 0 0 15px; color: #333333; font-size: 13px; line-height: 1.8;">
                  <li>Meet <strong>60 mins</strong> after docking.</li>
                  <li>Walk to <strong>Independent Operator</strong> area.</li>
                  <li>Look for <strong>"ATV Buggy"</strong> sign.</li>
                </ul>
                <div style="text-align: center; margin-top: 20px;">
                  <a href="${baseUrl}/meeting-points#port-roatan" style="background-color: #00694B; color: #ffffff; padding: 10px 18px; border-radius: 30px; text-decoration: none; font-size: 12px; font-weight: bold; display: inline-block;">View More</a>
                </div>
              </div>
            </td>
            <td width="4%">&nbsp;</td>
            <td width="48%" valign="top" style="background-color: #ffffff; border: 2px solid #00694B; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.08);">
              <div style="background-color: #00694B; color: #ffffff; padding: 12px; text-align: center; font-weight: bold; font-size: 14px; text-transform: uppercase;">
                Mahogany Bay
              </div>
              <div style="padding: 20px;">
                <ul style="margin: 0; padding: 0 0 0 15px; color: #333333; font-size: 13px; line-height: 1.8;">
                  <li>Meet <strong>60 mins</strong> after docking.</li>
                  <li>Walk <strong>outside security gate</strong>.</li>
                  <li>Look for <strong>"ATV Buggy"</strong> sign.</li>
                </ul>
                <div style="text-align: center; margin-top: 20px;">
                  <a href="${baseUrl}/meeting-points#mahogany-bay" style="background-color: #00694B; color: #ffffff; padding: 10px 18px; border-radius: 30px; text-decoration: none; font-size: 12px; font-weight: bold; display: inline-block;">View More</a>
                </div>
              </div>
            </td>
          </tr>
        </table>

        <!-- Contact Support Footer -->
        <div style="text-align: center; background-color: #f4f4f4; border: 1px solid #ddd; padding: 25px; border-radius: 15px;">
          <p style="font-size: 15px; color: #333; margin-bottom: 10px;">If you need assistance on the day of your tour:</p>
          <p style="font-size: 17px; font-weight: bold; color: #d9534f; margin: 0;">Ph: +504 9648 9745, +504 9939 2442</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="${baseUrl}/meeting-points" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; padding: 12px 25px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 13px;">View Detailed Map & Photos Online</a>
          </div>
        </div>
      </div>
    `;

    // Replace Placeholders
    const replacements = {
      '{{orderId}}': (booking._id || '').toString().substring(0,8).toUpperCase(),
      '{{customerName}}': booking.customer.firstName,
      '{{customerNameFull}}': `${booking.customer.firstName} ${booking.customer.lastName}`,
      '{{tourTitle}}': booking.tourTitle,
      '{{bookingDate}}': bookingDate,
      '{{guests}}': (booking.travelers.adults || 0) + (booking.travelers.children || 0),
      '{{time}}': formattedTime,
      '{{basePrice}}': subtotal.toFixed(2),
      '{{extrasHtml}}': extrasHtml,
      '{{taxHtml}}': taxHtml,
      '{{discountHtml}}': discountHtml,
      '{{totalPrice}}': (booking.totalPrice || 0).toFixed(2),
      '{{arrivalInfo}}': arrivalInfo,
      '{{portSpecificMeetingHtml}}': portSpecificMeetingHtml,
      '{{email}}': booking.customer.email,
      '{{phone}}': booking.customer.phone,
      '{{paymentOption}}': booking.paymentType === 'pay_now' ? 'Pay Now' : 'Reserve Now',
      '{{paymentGateway}}': (booking.paymentGateway || 'unknown').charAt(0).toUpperCase() + (booking.paymentGateway || 'unknown').slice(1)
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
            <p><strong>Payment Status:</strong> ${booking.paymentStatus.toUpperCase()} (${booking.paymentType === 'pay_now' ? 'Pay Now' : 'Reserve Now'} via ${(booking.paymentGateway || 'unknown').charAt(0).toUpperCase() + (booking.paymentGateway || 'unknown').slice(1)})</p>
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
        <h2 style="color: #00694B;">New Gift Claim Submission</h2>
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
        <h2 style="color: #00694B;">New Contact Form Message</h2>
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



export async function sendPlanBookingEmail(planBooking) {
  try {
    const { EMAIL_USER, EMAIL_PASS } = process.env;
    if (!EMAIL_USER || !EMAIL_PASS) {
      console.warn("Email credentials missing. Plan booking email not sent.");
      return false;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: EMAIL_USER, pass: EMAIL_PASS }
    });

    const arrival = new Date(planBooking.arrivalDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const departure = new Date(planBooking.departureDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const orderId = (planBooking._id || '').toString().substring(0, 8).toUpperCase();

    // Build day-by-day HTML
    const daysHtml = (planBooking.days || []).map(day => {
      const actRows = (day.activities || []).map(a =>
        `<tr><td style="padding:4px 8px;font-size:13px;">${a.emoji || '🌴'} ${a.name}</td><td style="padding:4px 8px;font-size:13px;color:#888;">${a.durationHours}h</td><td style="padding:4px 8px;font-size:13px;color:#00694B;font-weight:bold;">$${a.price}/pp</td></tr>`
      ).join('');
      const regionLabel = day.region === 'east' ? '🌅 East Roatan' : day.region === 'west' ? '🌊 West Roatan' : '';
      return `
        <div style="margin-bottom:16px;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">
          <div style="background:#f0fdf6;padding:8px 14px;font-weight:bold;font-size:14px;color:#1a1a1a;">
            Day ${day.dayNumber} ${regionLabel ? `<span style="color:#888;font-weight:normal;font-size:12px;margin-left:8px;">${regionLabel}</span>` : ''}
          </div>
          <table style="width:100%;border-collapse:collapse;">${actRows || '<tr><td style="padding:8px;font-size:12px;color:#aaa;font-style:italic;">Free day</td></tr>'}</table>
        </div>`;
    }).join('');

    const clientHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;">
        <div style="background:#00694B;padding:24px;text-align:center;">
          <div style="color:#fff;font-size:22px;font-weight:bold;">ATV Roatan</div>
          <div style="color:#a7f3d0;font-size:13px;margin-top:4px;">Adventure Plan Confirmed 🌴</div>
        </div>
        <div style="padding:24px;background:#f9f9f9;">
          <h2 style="color:#00694B;margin-top:0;">Your Adventure Plan is Booked!</h2>
          <p>Hi <strong>${planBooking.customer.firstName}</strong>,</p>
          <p>We're excited to confirm your custom Roatan adventure. Here's your full itinerary:</p>
          <div style="background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:16px;margin:16px 0;">
            <p style="margin:0 0 4px;"><strong>Order ID:</strong> #${orderId}</p>
            <p style="margin:0 0 4px;"><strong>Arrival:</strong> ${arrival}</p>
            <p style="margin:0 0 4px;"><strong>Departure:</strong> ${departure}</p>
            <p style="margin:0;"><strong>Travelers:</strong> ${planBooking.travelers.adults} Adults${planBooking.travelers.children > 0 ? `, ${planBooking.travelers.children} Children` : ''}${planBooking.travelers.infants > 0 ? `, ${planBooking.travelers.infants} Infants` : ''}</p>
          </div>
          <h3 style="color:#1a1a1a;">Your Day-by-Day Itinerary</h3>
          ${daysHtml}
          <div style="background:#00694B;color:#fff;border-radius:10px;padding:16px;margin-top:16px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span>Subtotal</span><span>$${(planBooking.subtotal || 0).toFixed(2)}</span></div>
            ${planBooking.discountAmount > 0 ? `<div style="display:flex;justify-content:space-between;margin-bottom:4px;"><span>Long-Stay Discount (${planBooking.discountPercent}%)</span><span>-$${(planBooking.discountAmount || 0).toFixed(2)}</span></div>` : ''}
            <div style="display:flex;justify-content:space-between;font-size:18px;font-weight:bold;margin-top:8px;border-top:1px solid rgba(255,255,255,0.3);padding-top:8px;"><span>Total Paid</span><span>$${(planBooking.totalPrice || 0).toFixed(2)}</span></div>
          </div>
          <p style="margin-top:20px;">Our team will be in touch with pickup instructions for each day. If you have any questions, reply to this email or WhatsApp us.</p>
          <p>Best regards,<br/><strong>ATV Roatan Team</strong></p>
        </div>
      </div>`;

    await transporter.sendMail({
      from: `"ATV Roatan" <${EMAIL_USER}>`,
      to: planBooking.customer.email,
      subject: `Adventure Plan Confirmed! #${orderId} — ${planBooking.totalDays} Days in Roatan`,
      html: clientHtml,
    });

    // Admin notification
    await transporter.sendMail({
      from: `"ATV Roatan System" <${EMAIL_USER}>`,
      to: EMAIL_USER,
      subject: `New Plan Booking: ${planBooking.customer.firstName} ${planBooking.customer.lastName} — ${planBooking.totalDays} Days`,
      html: `<div style="font-family:Arial,sans-serif;"><h2 style="color:#00694B;">New Adventure Plan Booking</h2>
        <p><strong>Customer:</strong> ${planBooking.customer.firstName} ${planBooking.customer.lastName}</p>
        <p><strong>Email:</strong> ${planBooking.customer.email}</p>
        <p><strong>Phone:</strong> ${planBooking.customer.phone}</p>
        <p><strong>Dates:</strong> ${arrival} → ${departure} (${planBooking.totalDays} days)</p>
        <p><strong>Travelers:</strong> ${planBooking.travelers.adults} Adults, ${planBooking.travelers.children} Children, ${planBooking.travelers.infants} Infants</p>
        <p><strong>Total Activities:</strong> ${(planBooking.days || []).reduce((s, d) => s + (d.activities || []).length, 0)}</p>
        <p><strong>Total Paid:</strong> $${(planBooking.totalPrice || 0).toFixed(2)}</p>
        <p><strong>Order ID:</strong> #${orderId}</p></div>`,
    });

    return true;
  } catch (error) {
    console.error("Error sending plan booking email:", error);
    return false;
  }
}

export async function sendGiftCardPurchaseEmail(purchase, giftCardTitle) {
  try {
    const { EMAIL_USER, EMAIL_PASS, NEXT_PUBLIC_BASE_URL } = process.env;
    const baseUrl = NEXT_PUBLIC_BASE_URL || 'https://atvroatan.com';
    
    if (!EMAIL_USER || !EMAIL_PASS) {
      console.warn("Email credentials missing. Emails will not be sent.");
      return false;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: EMAIL_USER, pass: EMAIL_PASS }
    });

    const isGift = Boolean(purchase.recipient_email);
    const targetEmail = isGift ? purchase.recipient_email : purchase.buyer_email;
    const recipientName = isGift ? purchase.recipient_name : purchase.buyer_name;
    const gcfTitle = `${giftCardTitle} ($${purchase.initial_value})`;

    const messageHtml = purchase.message ? 
      `<div style="background-color: #f0fdf4; border-left: 4px solid #00694B; padding: 15px; margin: 20px 0; border-radius: 4px;">
        <p style="margin: 0; font-style: italic; color: #1a1a1a;">"${purchase.message}"</p>
        <p style="margin: 10px 0 0 0; font-weight: bold; color: #00694B;">- ${purchase.buyer_name}</p>
      </div>` : '';

    const clientHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #00694B; padding: 30px; text-align: center;">
            <div style="color: #ffffff; font-size: 28px; font-weight: 900; letter-spacing: 1px; margin-bottom: 10px;">ATV ROATAN</div>
            <div style="color: #a7f3d0; font-size: 16px;">Here is your Gift Card!</div>
        </div>
        <div style="padding: 30px; background-color: #ffffff;">
            <p style="font-size: 18px; color: #1a1a1a;">Hi <strong>${recipientName}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
               ${isGift ? `<strong>${purchase.buyer_name}</strong> sent you an ATV Roatan Gift Card!` : `Thank you for purchasing an ATV Roatan Gift Card.`}
            </p>
            
            ${messageHtml}

            <div style="background-color: #f9fafb; border: 2px dashed #00694B; border-radius: 12px; padding: 25px; text-align: center; margin: 30px 0;">
                <p style="font-size: 14px; font-weight: bold; color: #6b7280; text-transform: uppercase; margin-bottom: 10px; letter-spacing: 1px;">Gift Card Code</p>
                <div style="font-size: 36px; font-family: monospace; font-weight: 900; color: #00694B; letter-spacing: 3px; background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; display: inline-block;">
                    ${purchase.code}
                </div>
                <p style="font-size: 18px; font-weight: bold; color: #1a1a1a; margin-top: 20px;">Value: $${purchase.initial_value}</p>
                <p style="font-size: 16px; color: #6b7280; margin-top: 5px;">${giftCardTitle}</p>
            </div>

            <p style="font-size: 16px; line-height: 1.6; color: #4b5563; text-align: center;">
                You can use this code during checkout to apply the balance to any tour or adventure booking.
            </p>

            <div style="text-align: center; margin-top: 30px;">
                <a href="${baseUrl}" style="display: inline-block; background-color: #00694B; color: #ffffff; padding: 14px 30px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 30px;">Book an Adventure Now</a>
            </div>
            
            <p style="font-size: 14px; color: #9ca3af; text-align: center; margin-top: 40px;">
                Keep this code safe. If you have any questions, contact us at info@atvroatan.com.
            </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: '"ATV Roatan" <' + EMAIL_USER + '>',
      to: targetEmail,
      subject: isGift ? `You received an ATV Roatan Gift Card!` : `Your ATV Roatan Gift Card Code`,
      html: clientHtml
    });

    // Notify Admin
    const adminHtml = `
      <div style="font-family: Arial, sans-serif;">
        <h2 style="color: #00694B;">New Gift Card Purchased</h2>
        <p><strong>Code:</strong> ${purchase.code}</p>
        <p><strong>Value:</strong> $${purchase.initial_value} (${giftCardTitle})</p>
        <p><strong>Buyer:</strong> ${purchase.buyer_name} (${purchase.buyer_email})</p>
        ${isGift ? `<p><strong>Recipient:</strong> ${purchase.recipient_name} (${purchase.recipient_email})</p>` : ''}
      </div>
    `;

    await transporter.sendMail({
      from: '"ATV Roatan System" <' + EMAIL_USER + '>',
      to: EMAIL_USER,
      subject: `New Gift Card Purchase: ${purchase.code}`,
      html: adminHtml
    });

    return true;
  } catch (error) {
    console.error("Error sending gift card email:", error);
    return false;
  }
}
