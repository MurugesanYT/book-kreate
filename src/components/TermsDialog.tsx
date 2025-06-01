
import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/enhanced-dialog";
import { Button } from "@/components/ui/button";

interface TermsDialogProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const TermsDialog: React.FC<TermsDialogProps> = ({ isOpen, onAccept, onDecline }) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden">
        <div className="overflow-y-auto">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="px-6 pt-6 text-base">
              Terms and Conditions
            </DialogTitle>
            <DialogDescription asChild>
              <div className="p-6">
                <div className="space-y-4 [&_strong]:font-semibold [&_strong]:text-foreground">
                  <div className="space-y-1">
                    <p>
                      <strong>Welcome to Book-Kreate</strong>
                    </p>
                    <p>
                      By using Book-Kreate, you agree to these terms and conditions. Please read them carefully before proceeding.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>AI-Generated Content</strong>
                    </p>
                    <p>
                      Book-Kreate utilizes artificial intelligence to help generate and enhance content. You acknowledge that AI-generated content is provided as a tool to assist in the creative process and should be reviewed and edited by you.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>User Content and Rights</strong>
                    </p>
                    <p>
                      You retain all rights to the content you create using Book-Kreate. By using our service, you grant us a limited license to process and store your content for the purpose of providing our services.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Privacy and Data Protection</strong>
                    </p>
                    <p>
                      We are committed to protecting your privacy. Your data is stored securely and will not be shared with third parties without your consent. Please review our Privacy Policy for detailed information.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Acceptable Use</strong>
                    </p>
                    <p>
                      You agree not to use Book-Kreate for any illegal activities or to generate content that is harmful, offensive, or violates intellectual property rights.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Service Availability</strong>
                    </p>
                    <p>
                      While we strive to maintain high availability, we cannot guarantee uninterrupted service. We reserve the right to modify or discontinue features with reasonable notice.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Limitation of Liability</strong>
                    </p>
                    <p>
                      Book-Kreate is provided "as is" without warranties. We are not liable for any damages arising from the use of our service, including but not limited to loss of data or business interruption.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Changes to Terms</strong>
                    </p>
                    <p>
                      We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
                    </p>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </div>
        <DialogFooter className="border-t border-border px-6 py-4">
          <Button type="button" variant="outline" onClick={onDecline}>
            Decline
          </Button>
          <Button type="button" onClick={onAccept}>
            Accept & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TermsDialog;
