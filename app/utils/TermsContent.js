import { Box, Typography, Divider } from "@mui/material";

export const Step1TermsContent = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: "#1976d2" }}>
        Terms & Conditions for Community Health Worker Registration
      </Typography>
      
      <Typography variant="body2" paragraph sx={{ color: "#666", fontStyle: "italic" }}>
        Last Updated: November 3, 2025
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body2" paragraph>
        Welcome to the Community Health Worker Registration Platform ("Platform"). 
        By registering and using our services, you agree to be bound by these Terms and Conditions. 
        Please read them carefully before proceeding.
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        1. Acceptance of Terms
      </Typography>
      <Typography variant="body2" paragraph>
        By creating an account on this Platform, you acknowledge that you have read, understood, 
        and agree to be bound by these Terms and Conditions, as well as our Privacy Policy. 
        If you do not agree to these terms, you must not proceed with registration.
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        2. Eligibility Requirements
      </Typography>
      <Typography variant="body2" paragraph>
        To register as a Community Health Worker, you must:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li>
          <Typography variant="body2">Be at least 18 years of age</Typography>
        </li>
        <li>
          <Typography variant="body2">Provide accurate and complete registration information</Typography>
        </li>
        <li>
          <Typography variant="body2">Have a valid mobile number for verification purposes</Typography>
        </li>
        <li>
          <Typography variant="body2">Be legally authorized to work as a health worker in your jurisdiction</Typography>
        </li>
      </Box>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        3. Account Registration and Security
      </Typography>
      <Typography variant="body2" paragraph>
        <strong>3.1 Account Creation:</strong> You agree to provide accurate, current, and complete 
        information during the registration process. You must update your information promptly if any changes occur.
      </Typography>
      <Typography variant="body2" paragraph>
        <strong>3.2 Account Security:</strong> You are responsible for maintaining the confidentiality 
        of your account credentials, including your mobile number, ABHA address, and password. 
        You agree to notify us immediately of any unauthorized use of your account.
      </Typography>
      <Typography variant="body2" paragraph>
        <strong>3.3 Account Responsibility:</strong> You are fully responsible for all activities 
        that occur under your account. We are not liable for any loss or damage arising from 
        your failure to maintain account security.
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        4. Mobile Number Verification
      </Typography>
      <Typography variant="body2" paragraph>
        By providing your mobile number, you consent to receive:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li>
          <Typography variant="body2">One-time passwords (OTP) for account verification</Typography>
        </li>
        <li>
          <Typography variant="body2">Important notifications regarding your account and services</Typography>
        </li>
        <li>
          <Typography variant="body2">Updates about platform features and policies</Typography>
        </li>
        <li>
          <Typography variant="body2">Emergency alerts related to community health services</Typography>
        </li>
      </Box>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        5. Use of Platform Services
      </Typography>
      <Typography variant="body2" paragraph>
        <strong>5.1 Permitted Use:</strong> You agree to use this Platform only for legitimate 
        healthcare and community health worker purposes in accordance with applicable laws and regulations.
      </Typography>
      <Typography variant="body2" paragraph>
        <strong>5.2 Prohibited Activities:</strong> You agree NOT to:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li>
          <Typography variant="body2">Provide false or misleading information</Typography>
        </li>
        <li>
          <Typography variant="body2">Impersonate another person or entity</Typography>
        </li>
        <li>
          <Typography variant="body2">Use the Platform for any illegal or unauthorized purpose</Typography>
        </li>
        <li>
          <Typography variant="body2">Attempt to gain unauthorized access to other users' accounts</Typography>
        </li>
        <li>
          <Typography variant="body2">Transmit any viruses, malware, or harmful code</Typography>
        </li>
        <li>
          <Typography variant="body2">Interfere with or disrupt the Platform's operation</Typography>
        </li>
      </Box>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        6. Data Privacy and Protection
      </Typography>
      <Typography variant="body2" paragraph>
        We are committed to protecting your personal information. Your data will be collected, 
        processed, and stored in accordance with applicable data protection laws, including but 
        not limited to the Digital Personal Data Protection Act, 2023 (India).
      </Typography>
      <Typography variant="body2" paragraph>
        For detailed information about how we handle your data, please refer to our Privacy Policy.
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        7. Intellectual Property Rights
      </Typography>
      <Typography variant="body2" paragraph>
        All content, features, and functionality of this Platform, including but not limited to 
        text, graphics, logos, and software, are owned by us or our licensors and are protected 
        by copyright, trademark, and other intellectual property laws.
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        8. Limitation of Liability
      </Typography>
      <Typography variant="body2" paragraph>
        To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, 
        special, consequential, or punitive damages arising out of or related to your use of the Platform.
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        9. Termination
      </Typography>
      <Typography variant="body2" paragraph>
        We reserve the right to suspend or terminate your account at any time, with or without notice, 
        if we believe you have violated these Terms and Conditions or engaged in any prohibited activities.
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        10. Changes to Terms
      </Typography>
      <Typography variant="body2" paragraph>
        We reserve the right to modify these Terms and Conditions at any time. We will notify you 
        of any material changes via email or through the Platform. Your continued use of the Platform 
        after such modifications constitutes your acceptance of the updated terms.
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        11. Governing Law and Dispute Resolution
      </Typography>
      <Typography variant="body2" paragraph>
        These Terms and Conditions shall be governed by and construed in accordance with the laws 
        of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction 
        of courts in [Your Jurisdiction].
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        12. Contact Information
      </Typography>
      <Typography variant="body2" paragraph>
        If you have any questions about these Terms and Conditions, please contact us at:
      </Typography>
      <Box sx={{ pl: 2, mb: 2 }}>
        <Typography variant="body2">Email: support@healthworker.gov.in</Typography>
        <Typography variant="body2">Phone: 1800-XXX-XXXX (Toll-Free)</Typography>
        <Typography variant="body2">Address: Community Health Department, [City, State]</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body2" sx={{ fontWeight: 600, textAlign: "center", color: "#1976d2" }}>
        By clicking "I agree" or by continuing with registration, you acknowledge that you have 
        read, understood, and agree to be bound by these Terms and Conditions.
      </Typography>
    </Box>
  );
};

export const Step2TermsContent = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: "#1976d2" }}>
        Personal Information & Data Usage Agreement
      </Typography>
      
      <Typography variant="body2" paragraph sx={{ color: "#666", fontStyle: "italic" }}>
        Last Updated: November 3, 2025
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body2" paragraph>
        This Personal Information Agreement explains how we collect, use, share, and protect 
        your personal information as part of your Community Health Worker profile. 
        By providing your personal details, you acknowledge and agree to the following terms.
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        1. Information We Collect
      </Typography>
      <Typography variant="body2" paragraph>
        During registration, we collect the following personal information:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li>
          <Typography variant="body2"><strong>Identity Information:</strong> First name, middle name, last name</Typography>
        </li>
        <li>
          <Typography variant="body2"><strong>Demographic Information:</strong> Date of birth, gender</Typography>
        </li>
        <li>
          <Typography variant="body2"><strong>Location Information:</strong> ZIP code, city, state, country</Typography>
        </li>
        <li>
          <Typography variant="body2"><strong>Contact Information:</strong> Mobile number (already provided in Step 1)</Typography>
        </li>
        <li>
          <Typography variant="body2"><strong>Health Identifier:</strong> ABHA (Ayushman Bharat Health Account) address</Typography>
        </li>
      </Box>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        2. Purpose of Data Collection
      </Typography>
      <Typography variant="body2" paragraph>
        We collect your personal information for the following purposes:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li>
          <Typography variant="body2">Creating and maintaining your health worker profile</Typography>
        </li>
        <li>
          <Typography variant="body2">Verifying your identity and credentials</Typography>
        </li>
        <li>
          <Typography variant="body2">Connecting you with healthcare facilities in your area</Typography>
        </li>
        <li>
          <Typography variant="body2">Coordinating community health services and programs</Typography>
        </li>
        <li>
          <Typography variant="body2">Communicating important updates and notifications</Typography>
        </li>
        <li>
          <Typography variant="body2">Generating reports and analytics for health program management</Typography>
        </li>
        <li>
          <Typography variant="body2">Complying with legal and regulatory requirements</Typography>
        </li>
      </Box>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        3. Data Accuracy and Updates
      </Typography>
      <Typography variant="body2" paragraph>
        <strong>3.1 Accuracy Commitment:</strong> You confirm that all information provided is 
        accurate, current, and complete to the best of your knowledge.
      </Typography>
      <Typography variant="body2" paragraph>
        <strong>3.2 Update Obligation:</strong> You agree to promptly update your information 
        if any changes occur, including changes to your name, location, or contact details.
      </Typography>
      <Typography variant="body2" paragraph>
        <strong>3.3 Consequences of Inaccuracy:</strong> Providing false or inaccurate information 
        may result in account suspension or termination and may affect your ability to participate 
        in health programs.
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        4. Use of Location Data
      </Typography>
      <Typography variant="body2" paragraph>
        Your ZIP code and location information will be used to:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li>
          <Typography variant="body2">Assign you to relevant healthcare facilities and community health centers</Typography>
        </li>
        <li>
          <Typography variant="body2">Provide location-specific health programs and services</Typography>
        </li>
        <li>
          <Typography variant="body2">Send alerts about health emergencies or outbreaks in your area</Typography>
        </li>
        <li>
          <Typography variant="body2">Generate regional health statistics and reports (anonymized)</Typography>
        </li>
        <li>
          <Typography variant="body2">Optimize resource allocation for community health initiatives</Typography>
        </li>
      </Box>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        5. Data Sharing and Disclosure
      </Typography>
      <Typography variant="body2" paragraph>
        <strong>5.1 Authorized Sharing:</strong> Your profile information may be shared with:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li>
          <Typography variant="body2">Government health departments and authorities</Typography>
        </li>
        <li>
          <Typography variant="body2">Authorized healthcare facilities and hospitals</Typography>
        </li>
        <li>
          <Typography variant="body2">Community health program coordinators</Typography>
        </li>
        <li>
          <Typography variant="body2">National Health Authority (for ABHA integration)</Typography>
        </li>
        <li>
          <Typography variant="body2">Research institutions (for anonymized statistical analysis only)</Typography>
        </li>
      </Box>
      <Typography variant="body2" paragraph>
        <strong>5.2 No Unauthorized Sharing:</strong> We will NOT sell, rent, or share your personal 
        information with third parties for marketing purposes without your explicit consent.
      </Typography>
      <Typography variant="body2" paragraph>
        <strong>5.3 Legal Disclosure:</strong> We may disclose your information if required by law, 
        court order, or government regulation.
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        6. ABHA (Ayushman Bharat Health Account) Integration
      </Typography>
      <Typography variant="body2" paragraph>
        By creating an ABHA address, you acknowledge that:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li>
          <Typography variant="body2">Your ABHA address will be linked to the National Health Authority's digital health ecosystem</Typography>
        </li>
        <li>
          <Typography variant="body2">Your health records and interactions may be accessible through your ABHA account</Typography>
        </li>
        <li>
          <Typography variant="body2">You consent to the integration of your profile with ABHA services</Typography>
        </li>
        <li>
          <Typography variant="body2">The use of ABHA is governed by the National Health Authority's policies</Typography>
        </li>
      </Box>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        7. Data Security Measures
      </Typography>
      <Typography variant="body2" paragraph>
        We implement appropriate technical and organizational security measures to protect 
        your personal information, including:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li>
          <Typography variant="body2">Encryption of data during transmission and storage</Typography>
        </li>
        <li>
          <Typography variant="body2">Access controls and authentication mechanisms</Typography>
        </li>
        <li>
          <Typography variant="body2">Regular security audits and vulnerability assessments</Typography>
        </li>
        <li>
          <Typography variant="body2">Employee training on data protection and confidentiality</Typography>
        </li>
        <li>
          <Typography variant="body2">Incident response procedures for data breaches</Typography>
        </li>
      </Box>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        8. Data Retention
      </Typography>
      <Typography variant="body2" paragraph>
        We will retain your personal information for as long as:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li>
          <Typography variant="body2">Your account remains active</Typography>
        </li>
        <li>
          <Typography variant="body2">Required to fulfill the purposes outlined in this agreement</Typography>
        </li>
        <li>
          <Typography variant="body2">Necessary to comply with legal, regulatory, or audit requirements</Typography>
        </li>
      </Box>
      <Typography variant="body2" paragraph>
        After account closure, your data may be retained in anonymized form for statistical 
        and research purposes.
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        9. Your Rights and Control
      </Typography>
      <Typography variant="body2" paragraph>
        You have the following rights regarding your personal information:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li>
          <Typography variant="body2"><strong>Right to Access:</strong> Request a copy of your personal information</Typography>
        </li>
        <li>
          <Typography variant="body2"><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete information</Typography>
        </li>
        <li>
          <Typography variant="body2"><strong>Right to Deletion:</strong> Request deletion of your account and personal data (subject to legal obligations)</Typography>
        </li>
        <li>
          <Typography variant="body2"><strong>Right to Withdrawal:</strong> Withdraw consent for specific data processing activities</Typography>
        </li>
        <li>
          <Typography variant="body2"><strong>Right to Complaint:</strong> Lodge a complaint with the relevant data protection authority</Typography>
        </li>
      </Box>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        10. Age Verification
      </Typography>
      <Typography variant="body2" paragraph>
        By providing your date of birth, you confirm that you are at least 18 years of age. 
        We do not knowingly collect information from individuals under 18 years of age.
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        11. Gender Information
      </Typography>
      <Typography variant="body2" paragraph>
        Gender information is collected to:
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li>
          <Typography variant="body2">Provide gender-sensitive health programs</Typography>
        </li>
        <li>
          <Typography variant="body2">Ensure appropriate representation in health initiatives</Typography>
        </li>
        <li>
          <Typography variant="body2">Generate gender-disaggregated health statistics</Typography>
        </li>
      </Box>
      <Typography variant="body2" paragraph>
        We respect all gender identities and provide the option to select "Other" if you do not 
        identify as male or female.
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        12. Changes to This Agreement
      </Typography>
      <Typography variant="body2" paragraph>
        We may update this Personal Information Agreement from time to time. We will notify you 
        of any material changes via email or platform notification. Your continued use of the 
        platform after such changes constitutes acceptance of the updated agreement.
      </Typography>

      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
        13. Contact for Data Privacy Concerns
      </Typography>
      <Typography variant="body2" paragraph>
        If you have questions or concerns about how we handle your personal information, 
        please contact our Data Protection Officer:
      </Typography>
      <Box sx={{ pl: 2, mb: 2 }}>
        <Typography variant="body2">Email: privacy@healthworker.gov.in</Typography>
        <Typography variant="body2">Phone: 1800-XXX-XXXX (Privacy Helpline)</Typography>
        <Typography variant="body2">Address: Data Protection Office, Community Health Department</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body2" sx={{ fontWeight: 600, textAlign: "center", color: "#1976d2" }}>
        By proceeding with registration, you confirm that you have read, understood, and agree 
        to this Personal Information & Data Usage Agreement.
      </Typography>
    </Box>
  );
};