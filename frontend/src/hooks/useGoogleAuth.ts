import { useEffect, useRef } from 'react';

const GOOGLE_CLIENT_ID = '170719978233-hasimb16p9k4a6qirs2aq2pd6kab1olv.apps.googleusercontent.com';

interface GoogleAuthConfig {
  onSuccess: (email: string, name: string, picture: string) => void;
  onError: (error: string) => void;
  buttonId: string;
}

export const useGoogleAuth = ({ onSuccess, onError, buttonId }: GoogleAuthConfig) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    
    const initGoogle = () => {
      if (!(window as any).google) {
        setTimeout(initGoogle, 500);
        return;
      }

      initialized.current = true;

      (window as any).google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: any) => {
          try {
            const payload = JSON.parse(atob(response.credential.split('.')[1]));
            onSuccess(
              payload.email || '',
              payload.name || 'User',
              payload.picture || ''
            );
          } catch {
            onError('Failed to decode Google response');
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      const buttonElement = document.getElementById(buttonId);
      if (buttonElement) {
        (window as any).google.accounts.id.renderButton(
          buttonElement,
          {
            type: 'standard',
            theme: 'outline',
            size: 'large',
            text: 'continue_with',
            shape: 'rectangular',
            width: 220,
          }
        );
      }
    };

    initGoogle();
  }, []);
};