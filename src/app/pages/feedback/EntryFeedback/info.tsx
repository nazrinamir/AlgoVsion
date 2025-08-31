import React from "react";



function InfoPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div  role="note" aria-live="polite">
      <div className="font-semibold mb-1">{title}</div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export const information = {
  /** Name info
   *  If user is returning, tell them they only need to enter their name to locate existing data.
   */
  name: ({ isReturning = false }: { isReturning?: boolean }) => (
    <InfoPanel title="Name">
      <p>
        We store your details securely. If you’ve submitted before, you only
        need to enter your <b>name</b> to locate your record.
      </p>
      {isReturning && (
        <p className="text-emerald-300">
          Returning user detected — type your name and we’ll auto-fill the rest
          (email & phone) if available.
        </p>
      )}
      <ul className="list-disc pl-5">
        <li>Use your real name (min 3 characters).</li>
        <li>We use your name to prevent fake/bot entries.</li>
      </ul>
    </InfoPanel>
  ),

  /** Email info
   *  News and updates will be sent here.
   */
  email: () => (
    <InfoPanel title="Email">
      <p>
        We’ll send important <b>news and updates</b> to this address (e.g.
        submission status, announcements).
      </p>
      <ul className="list-disc pl-5">
        <li>Use a valid inbox you check regularly.</li>
        <li>We won’t share your email with third parties.</li>
        <li>Example: <code>name@example.com</code></li>
      </ul>
      <p className="opacity-80">Note: This System is used to collect email from the user. to store and use to make sure the user is not a bot and to make sure the user is real.
        the system will check the email if exist or not and if exist it will not allow the user to submit the feedback.</p>
    </InfoPanel>
  ),

  /** Phone info
   *  Must be reachable—no barred/suspended numbers.
   */
  phone: () => (
    <InfoPanel title="Mobile number">
      <p>
        Your phone must be <b>active and reachable</b> (not barred or
        suspended). We may verify it with an OTP / carrier check.
      </p>
      <ul className="list-disc pl-5">
        <li>Accepted formats: <code>0123456789</code>, <code>012-3456789</code>, <code>+60123456789</code></li>
        <li>Used for account recovery and critical notices.</li>
      </ul>
      <p className="opacity-80">Note: This System is used to collect phone number from the user. to store and use to make sure the user is not a bot and to make sure the user is real.
        the system will check the phone number if exist or not and if exist it will not allow the user to submit the feedback.</p>
    </InfoPanel>
  ),
};
