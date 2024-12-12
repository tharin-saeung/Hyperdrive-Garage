import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Configure the SMTP transporter
const transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail', // Change as per your email service
    auth: {
      user: 'koonbuuch@gmail.com',   // your email
      pass: 'ncwx nnwn xgrx fdir'    },
  })
);

// Generate a random token
const generateResetToken = () => {
  return crypto.randomBytes(4).toString('hex');
};

// Route handler
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { error: 'No user found with this email address.' },
        { status: 404 }
      );
    }

    const password = generateResetToken();
    // Save the token and expiry in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
    });

    // Send email with reset link
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'CarSell Password Reset',
      html: `<p>Your new password for CarSell is</p>
             <a>${password}</a>`
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Password reset successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in forgot password:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}