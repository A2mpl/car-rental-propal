'use server';

export type ContactErrors = Partial<Record<'firstName' | 'lastName' | 'email' | 'subject' | 'message', string>>;

export type ContactState = { status: 'idle' } | { status: 'success' } | { status: 'error'; errors: ContactErrors };

const VALID_SUBJECTS = [
  'Demande de location',
  'Question sur un véhicule',
  'Tarifs et disponibilités',
  'Service après-vente',
  'Partenariat',
  'Autre',
] as const;

function isValidEmail(email: string): boolean {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitContact(_prevState: ContactState, formData: FormData): Promise<ContactState> {
  const firstName = (formData.get('firstName') as string | null)?.trim() ?? '';
  const lastName = (formData.get('lastName') as string | null)?.trim() ?? '';
  const email = (formData.get('email') as string | null)?.trim() ?? '';
  const phone = (formData.get('phone') as string | null)?.trim() ?? '';
  const subject = (formData.get('subject') as string | null)?.trim() ?? '';
  const message = (formData.get('message') as string | null)?.trim() ?? '';

  const errors: ContactErrors = {};

  if (!firstName) {
    errors.firstName = 'Prénom requis';
  } else if (firstName.length > 100) {
    errors.firstName = 'Prénom trop long (max 100 car.)';
  }

  if (!lastName) {
    errors.lastName = 'Nom requis';
  } else if (lastName.length > 100) {
    errors.lastName = 'Nom trop long (max 100 car.)';
  }

  if (!email) {
    errors.email = 'Email requis';
  } else if (!isValidEmail(email)) {
    errors.email = 'Email invalide';
  }

  if (!subject || !(VALID_SUBJECTS as readonly string[]).includes(subject)) {
    errors.subject = 'Veuillez choisir un objet';
  }

  if (!message) {
    errors.message = 'Message requis';
  } else if (message.length > 5000) {
    errors.message = 'Message trop long (max 5 000 car.)';
  }

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors };
  }

  try {
    // TODO: configurer l'envoi d'email (ex: Resend, Nodemailer, Brevo)
    // const to = process.env.CONTACT_EMAIL;
    // await sendEmail({ to, replyTo: email, subject, body: { firstName, lastName, phone, message } });

    console.log('[Contact]', {
      firstName,
      lastName,
      email,
      phone: phone || '—',
      subject,
      messageLength: message.length,
    });

    return { status: 'success' };
  } catch (err) {
    console.error('[Contact] Sending error:', err);
    return { status: 'error', errors: {} };
  }
}
