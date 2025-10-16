import emailjs from '@emailjs/browser';

const sendEmail = (formData) => {
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  emailjs.init(publicKey);

  return emailjs.send(serviceID, templateID, formData)
    .then((response) => {
      console.log('Email sent successfully:', response);
      return response;
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      throw error;
    });
};

export default sendEmail;