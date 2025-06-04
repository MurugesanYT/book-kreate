
import { toast } from "sonner";

const BUTTONDOWN_API_KEY = "2f558f9d-313a-4c15-a285-36b1fa771293";
const BUTTONDOWN_API_URL = "https://api.buttondown.com/v1/subscribers";

export interface NewsletterSubscription {
  email: string;
  tags?: string[];
}

export const subscribeToNewsletter = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch(BUTTONDOWN_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${BUTTONDOWN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        tags: ["newsletter", "welcome"]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Newsletter subscription error:', errorData);
      
      // Handle specific error cases
      if (response.status === 400) {
        throw new Error('Invalid email address or already subscribed');
      } else if (response.status === 401) {
        throw new Error('Authentication failed');
      } else {
        throw new Error('Failed to subscribe to newsletter');
      }
    }

    const data = await response.json();
    console.log('Newsletter subscription successful:', data);
    return true;
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    throw error;
  }
};
