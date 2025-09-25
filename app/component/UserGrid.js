"use client";

import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box,
  Avatar,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { 
  Email, 
  Phone, 
  Person, 
  ArrowForward,
  LocationOn 
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function UserGrid({ users }) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Generate initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  // Generate random gradient colors for avatars
  const getAvatarColor = (id) => {
    const colors = [
    //   'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    //   'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    //   'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    //   'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    //   'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    //   'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    //   'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    ];
    return colors[id % colors.length];
  };

  return (
    <Box sx={{ 
      width: '100%',
      px: { xs: 1, sm: 2, md: 3 },
      py: 2
    }}>
      <Grid 
        container 
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {users.map((user, index) => (
          <Grid 
            item
            size={{ xs: 2, sm: 4, md: 4 }}
            key={user.id}
            sx={{ display: 'flex' }}
          >

        <Card
            sx={{
                height: '100%',
                width: '100%',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
                '& .user-avatar': {
                    transform: 'scale(1.1)',
                },
                '& .view-button': {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    transform: 'translateX(4px)',
                }
                }
            }}
            >
            <Box
                sx={{
                height: 4,
                background: getAvatarColor(user.id),
                width: '100%'
                }}
            />
            
            <CardContent
                sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                flex: 1,
                gap: 2
                }}
            >
                <Avatar
                className="user-avatar"
                sx={{
                    width: 80,
                    height: 80,
                    mb: 2,
                    background: getAvatarColor(user.id),
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    transition: 'transform 0.3s ease',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                }}
                >
                {getInitials(user.name)}
                </Avatar>

                <Typography
                variant="h6"
                sx={{
                    fontWeight: 700,
                    mb: 1,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    fontSize: { xs: '1.1rem', sm: '1.25rem' }
                }}
                >
                {user.name}
                </Typography>

                <Chip
                label="Active"
                size="small"
                sx={{
                    mb: 3,
                    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.75rem'
                }}
                />

                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
                <Box
                    sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 1,
                    borderRadius: 2,
                    backgroundColor: 'rgba(102, 126, 234, 0.04)',
                    border: '1px solid rgba(102, 126, 234, 0.08)'
                    }}
                >
                    <Email sx={{ color: '#667eea', fontSize: '1.2rem', mr: 1.5 }} />
                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, fontSize: '0.875rem' }}>
                    {user.email}
                    </Typography>
                </Box>

                <Box
                    sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 1,
                    borderRadius: 2,
                    backgroundColor: 'rgba(102, 126, 234, 0.04)',
                    border: '1px solid rgba(102, 126, 234, 0.08)'
                    }}
                >
                    <Phone sx={{ color: '#667eea', fontSize: '1.2rem', mr: 1.5 }} />
                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, fontSize: '0.875rem' }}>
                    {user.phone}
                    </Typography>
                </Box>
                </Box>
            </CardContent>

            <Box sx={{ p: 2, pt: 0 }}>
                <Button
                className="view-button"
                variant="contained"
                fullWidth
                endIcon={<ArrowForward />}
                onClick={() => router.push(`/user/${user.id}`)}
                sx={{
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    textTransform: 'none',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                    }
                }}
                >
                View Profile
                </Button>
            </Box>
        </Card>

          </Grid>
        ))}
      </Grid>
    </Box>
  );
}