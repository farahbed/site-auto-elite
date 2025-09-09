import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY); // Ta clé API est dans .env.local

export async function POST(req) {
  const body = await req.json();
  const { name, email, message } = body;

  try {
    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // ← L'adresse d'expédition Resend changer avec ton domaine vérifié
      to: ['farah.bendriss.la@gmail.com'], // ← Ton adresse ici changer avec mail pro 
      subject: `📩 Nouveau message de ${name}`,
      html: `
        <h2>Nouveau message reçu</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong><br>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return NextResponse.json({ error: 'Erreur Resend' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Erreur serveur:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}