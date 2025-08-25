import {resend} from '@/lib/resend'


export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<any> {

    try {

        await resend.emails.send({
            from: 'mehul@dev.com',
            to: email,
            subject: 'Mystery Message Verification Code',
            html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
        });

    } catch (error) {

        console.error('Error sending verification email:', error);

        return { success: false, message: 'Failed to send verification email.' };
    }

}
