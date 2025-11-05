import Layout from "@/app/component/Layout";
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Chip,
  Divider,
  Stack,
  Avatar
} from "@mui/material";
import DetailItem from "@/app/component/DetailItem";


export default function AbhaHome() {
  const data = {
    "abhaAddress": "divyapatel@sbx",
    "fullName": "Divya R Patel",
    "firstName": "Divya",
    "middleName": "R",
    "lastName": "Patel",
    "dayOfBirth": "01",
    "monthOfBirth": "02",
    "yearOfBirth": "2023",
    "dateOfBirth": "01-02-2023",
    "gender": "Female",
    "email": "",
    "mobile": "7623992385",
    "address": "Test",
    "stateName": "Maharashtra",
    "districtName": "Dhule",
    "pinCode": "425405",
    "stateCode": "15",
    "districtCode": "15",
    "authMethods": ["MOBILE_OTP"],
    "status": "ACTIVE",
    "emailVerified": "false",
    "mobileVerified": "true",
    "kycStatus": "PENDING",
    "abhaLinkedCount": "0",
    "age": 2
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        {/* Profile Details and ABHA Information in one row */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: 2,
            mb: 2,
          }}
        >
          {/* Profile Details */}
          <Card>
            <CardContent>
                <Typography variant="h6">
                  Profile Details
                </Typography>
              <Divider sx={{ mb: 2 }} />

              
            {/* <Box sx={{ display: 'flex',  mb: 2 }}>
                <Avatar sx={{ width: 56, height: 56, mr: 2, bgcolor: 'primary.main' }}>
                    {data.firstName.charAt(0)}{data.lastName.charAt(0)}
                </Avatar>
            </Box> */}

            <DetailItem label="Full Name" value={data.fullName} />
            <DetailItem label="Years" value={data.age} />
            <DetailItem label="Gender" value={data.gender} />
            <DetailItem label="Mobile" value={data.mobile} />
                    
            </CardContent>
          </Card>

          {/* ABHA Information */}
          <Card>
            <CardContent>
                  <Typography variant="h6">
                   ABHA detail
                </Typography>
              <Divider sx={{ mb: 2 }} />

                <DetailItem label="ABHA Number" value="Link Abha Number" />
                <DetailItem label="ABHA Address" value={data.abhaAddress} />
            </CardContent>
          </Card>

          {/* Address Details - Full Width */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Address Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <DetailItem label="Address" value={data.address} />
            <DetailItem label="State Name" value={data.stateName} />
            <DetailItem label="District Name" value={data.districtName} />
            <DetailItem label="Pin Code" value={data.pinCode} />

          </CardContent>
        </Card>

        </Box>

        
      </Box>
    </Layout>
  );
}