<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OtpMail extends Mailable
{
    use Queueable, SerializesModels;
    public $otp;
    public $otpExpiration;
    /**
     * Create a new message instance.
     */
    public function __construct($otp, $otpExpiration)
    {
        $this->otp = $otp;
        $this->otpExpiration = $otpExpiration;
    }



    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Otp Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'email.welcome',
            with: [
                'otp' => $this->otp,
                'otp_ex' => $this->otpExpiration->setTimezone('Asia/Ho_Chi_Minh')->format('Y-m-d H:i:s'),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
