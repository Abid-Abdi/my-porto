import {
  CONTACT_API_ENDPOINT,
  CONTACT_EMAIL,
  inquiryOptions,
} from "@/data/contact";
import type { ContactFormData } from "@/types/portfolio";

export function buildMailtoPayload(data: ContactFormData) {
  const inquiryLabel =
    inquiryOptions.find((o) => o.value === data.inquiryType)?.label ??
    data.inquiryType;
  const subject = data.subject.trim() || `Portfolio inquiry — ${inquiryLabel}`;
  const body = [
    `Name: ${data.fullName.trim()}`,
    `Email: ${data.email.trim()}`,
    data.company.trim() ? `Organization: ${data.company.trim()}` : null,
    `Inquiry type: ${inquiryLabel}`,
    "",
    data.message.trim(),
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: encodeURIComponent(subject),
    body: encodeURIComponent(body),
  };
}

export async function deliverContactMessage(
  data: ContactFormData
): Promise<void> {
  if (CONTACT_API_ENDPOINT) {
    const res = await fetch(CONTACT_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        to: CONTACT_EMAIL,
        replyTo: data.email.trim(),
      }),
    });
    if (!res.ok) {
      throw new Error("Unable to send message. Please try again.");
    }
    return;
  }

  const { subject, body } = buildMailtoPayload(data);
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  window.location.href = mailto;
}
