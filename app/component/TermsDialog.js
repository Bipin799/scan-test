import { Dialog, DialogTitle, DialogContent, Button, Box } from "@mui/material";
import { Step1TermsContent, Step2TermsContent } from "./../utils/TermsContent";

export default function TermsDialog({ open, onClose, step = 1 }) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      scroll="paper"
    >
      <DialogTitle sx={{ bgcolor: "#f5f5f5", fontWeight: 600 }}>
        {step === 1 ? "Terms & Conditions" : "Personal Information Agreement"}
      </DialogTitle>
      <DialogContent dividers sx={{ maxHeight: 500, p: 3 }}>
        {step === 1 ? <Step1TermsContent /> : <Step2TermsContent />}
      </DialogContent>
      <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end", bgcolor: "#f5f5f5" }}>
        <Button onClick={onClose} variant="contained" color="primary">
          I Understand
        </Button>
      </Box>
    </Dialog>
  );
}