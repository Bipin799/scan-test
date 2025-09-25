  "use client";

  import { useParams, useRouter } from "next/navigation";
  import { useEffect, useState } from "react";
  import Layout from "@/app/component/Layout";
  import {
    Card,
    CardContent,
    Typography,
    Button,
    CircularProgress,
    Box,
    Avatar,
    Chip,
    Divider,
    Grid,
    Paper,
    IconButton,
    Container,
    Skeleton
  } from "@mui/material";
  import {
    Email,
    Phone,
    Language,
    Business,
    LocationCity,
    Person,
    ArrowBack,
    Edit,
    Share,
    Bookmark,
    Work,
    Home,
    Public
  } from "@mui/icons-material";
  import Loader from "@/app/component/Loader";
  // import Custom404 from "@/app/Error404";
  import CommentsList from "@/app/component/CommentsList";
  import PhotosList from "@/app/component/PhotosList";

  export default function UserDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [users, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      if (id) {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setUser(data);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      }
    }, [id]);


    const getInitials = (name) => {
      if (!name) return "U";
      return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');
    };

    // Generate avatar color based on users ID
    const getAvatarColor = (userId) => {
      const colors = [
        // 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        // 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        // 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        // 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      ];
      return colors[(userId || 0) % colors.length];
    };

    if (loading) {
      return (
        <Layout>
            <Loader></Loader>
        </Layout>
      );
    }

    // User Not Found State
    if (!users) {
      return (
        <Layout>
          {/* <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ 
              display: "flex", 
              flexDirection: "column",
              justifyContent: "center", 
              alignItems: "center", 
              minHeight: "60vh",
              textAlign: "center"
            }}>
              <Typography variant="h4" color="error.main" gutterBottom>
                User Not Found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                The users you're looking for doesn't exist or has been removed.
              </Typography>
              <Button
                variant="contained"
                startIcon={<ArrowBack />}
                onClick={() => router.back()}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                Go Back
              </Button>
            </Box>
          </Container> */}
          {/* <Custom404/> */}
        </Layout>
      );
    }

    return (
      <Layout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Header Section */}
          <Box sx={{ mb: 4 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => router.back()}
              sx={{
                mb: 2,
                color: 'text.secondary',
                '&:hover': {
                  background: 'rgba(102, 126, 234, 0.08)',
                  color: 'primary.main',
                }
              }}
            >
              Back to Users
            </Button>
            
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 1
              }}
            >
              User Profile
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Detailed information about the selected users
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* Profile Card */}
            <Grid item xs={12} md={8}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  border: '1px solid',
                  borderColor: 'divider',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                {/* Gradient Header */}
                <Box
                  sx={{
                    height: 120,
                    background: getAvatarColor(users.id),
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'flex-end',
                    px: 3,
                    pb: 2
                  }}
                >
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      background: 'rgba(255, 255, 255, 0.9)',
                      color: 'primary.main',
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      border: '4px solid white',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                      mb: -6
                    }}
                  >
                    {getInitials(users.name)}
                  </Avatar>
                </Box>

                <CardContent sx={{ pt: 8, pb: 4 }}>
                  {/* User Header */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 3,
                    flexWrap: 'wrap',
                    gap: 2
                  }}>
                    <Box>
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 700,
                          mb: 1,
                          color: 'text.primary'
                        }}
                      >
                        {users.name}
                      </Typography>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: 'text.secondary',
                          mb: 2,
                          fontSize: '1.1rem'
                        }}
                      >
                        @{users.username}
                      </Typography>
                      <Chip
                        label="Active User"
                        sx={{
                          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.875rem'
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        sx={{
                          background: 'rgba(102, 126, 234, 0.08)',
                          '&:hover': { background: 'rgba(102, 126, 234, 0.15)' }
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        sx={{
                          background: 'rgba(102, 126, 234, 0.08)',
                          '&:hover': { background: 'rgba(102, 126, 234, 0.15)' }
                        }}
                      >
                        <Share />
                      </IconButton>
                      <IconButton
                        sx={{
                          background: 'rgba(102, 126, 234, 0.08)',
                          '&:hover': { background: 'rgba(102, 126, 234, 0.15)' }
                        }}
                      >
                        <Bookmark />
                      </IconButton>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  {/* Contact Information */}
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
                    Contact Information
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Paper
                        sx={{
                          p: 2.5,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.04) 100%)',
                          border: '1px solid rgba(102, 126, 234, 0.12)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Email sx={{ color: 'primary.main', mr: 1 }} />
                          <Typography variant="subtitle2" color="text.secondary">
                            Email Address
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {users.email}
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Paper
                        sx={{
                          p: 2.5,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.04) 100%)',
                          border: '1px solid rgba(102, 126, 234, 0.12)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Phone sx={{ color: 'primary.main', mr: 1 }} />
                          <Typography variant="subtitle2" color="text.secondary">
                            Phone Number
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {users.phone}
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Paper
                        sx={{
                          p: 2.5,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.04) 100%)',
                          border: '1px solid rgba(102, 126, 234, 0.12)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Public sx={{ color: 'primary.main', mr: 1 }} />
                          <Typography variant="subtitle2" color="text.secondary">
                            Website
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {users.website}
                        </Typography>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Paper
                        sx={{
                          p: 2.5,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.04) 100%)',
                          border: '1px solid rgba(102, 126, 234, 0.12)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationCity sx={{ color: 'primary.main', mr: 1 }} />
                          <Typography variant="subtitle2" color="text.secondary">
                            City
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {users.address?.city || 'Not specified'}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Additional Info Sidebar */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Company Info */}
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Business sx={{ color: 'primary.main', mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Company
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                      {users.company?.name || 'Not specified'}
                    </Typography>
                    {users.company?.catchPhrase && (
                      <Typography variant="body2" color="text.secondary">
                        "{users.company.catchPhrase}"
                      </Typography>
                    )}
                  </CardContent>
                </Card>

                {/* Address Info */}
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Home sx={{ color: 'primary.main', mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Address
                      </Typography>
                    </Box>
                    {users.address && (
                      <>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          {users.address.street} {users.address.suite}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          {users.address.city}, {users.address.zipcode}
                        </Typography>
                        {users.address.geo && (
                          <Typography variant="caption" color="text.secondary">
                            Coordinates: {users.address.geo.lat}, {users.address.geo.lng}
                          </Typography>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ArrowBack />}
                    onClick={() => router.back()}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                      }
                    }}
                  >
                    Back to Users
                  </Button>
                  
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Edit />}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        background: 'rgba(102, 126, 234, 0.08)',
                        borderColor: 'primary.dark',
                      }
                    }}
                  >
                    Edit Profile
                  </Button>
                </Box>
              </Box>
            </Grid>

          </Grid>
        </Container>
        {/* <CommentsList postId={1} />  */}
        <CommentsList postId={users.id} />
        {/* <PhotosList albumId={1} /> */}
      </Layout>
    );
  }