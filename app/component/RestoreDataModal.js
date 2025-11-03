// components/RestoreDataModal.js

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton
} from "@mui/material";
import CustomButton from './CustomButton';
import CloseIcon from "@mui/icons-material/Close";

const RestoreDataModal = ({
  open,
  onClose,
  onRestore,
  onCancel,
  title = "DO YOU WANT TO SAVE ?",
  description = "This tab has unsaved changes which will be lost if you choose to Don't Save. Save these changes to avoid losing your work.?",
  // helperText = "Click \"Restore Data\" to continue where you left off, or \"Start Fresh\" to begin with a new form.",
  cancelButtonText = "Don't Save",
  restoreButtonText = "Save Changes"
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
       sx={{
    "& .MuiDialog-container": {
      alignItems: "flex-start", // Align dialog to top
      justifyContent: "center", // Center horizontally
    },
     "& .MuiDialog-paper": {
      mt: 2,
     //m: 0,         // remove dialog margin
      p: 0,         // remove internal padding
      borderRadius: "8px", // optional
    }
  }}
    >
      <DialogTitle sx={{ 
        fontWeight: 700, 
        fontSize: '15px',
        pr: 5,
        // borderBottom: '1px solid #e0e0e0'
        
      }}>
        {title}

         {/* ✅ Cross Button */}
        <IconButton
          aria-label="close"
          onClick={onRestore}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            padding: "4px",
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

      </DialogTitle>
      
      <DialogContent >
        <Typography 
        sx={{ 
          fontWeight: 400, 
          fontSize: '13px',
        }}
        >
          {description}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          {helperText}
        </Typography> */}
      </DialogContent>
      
      <DialogActions sx={{
         justifyContent: "space-between"  }}>
        <Button
          onClick={onCancel}
          // startIcon={<CancelIcon />}
          sx={{ 
            color: '#d32f2f',
            '&:hover': { backgroundColor: '#ffebee' }
          }}
        >
          {cancelButtonText}
        </Button>
        <CustomButton
        onClick={onRestore}
         variant="contained"
         label = " Save Changes"
          //  {restoreButtonText}
        />
      </DialogActions>
    </Dialog>
  );
};

export default RestoreDataModal;
