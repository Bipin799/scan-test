"use client";

import { useEffect, useState } from "react";
import { 
  Grid, 
  Card, 
  CardMedia, 
  Typography, 
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Chip,
  Paper,
  TextField,
  InputAdornment,
  Button,
  Avatar,
  Skeleton,
  Fade,
  Zoom,
  Container
} from "@mui/material";
import {
  Close,
  ZoomIn,
  Download,
  Favorite,
  FavoriteBorder,
  Share,
  Fullscreen,
  Search,
  GridView,
  ViewModule,
  Collections,
  Photo,
  ArrowBack,
  ArrowForward
} from "@mui/icons-material";

export default function PhotosList({ albumId }) {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or masonry
  const [likedPhotos, setLikedPhotos] = useState(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [displayedPhotos, setDisplayedPhotos] = useState([]);

  useEffect(() => {
    if (albumId) {
      fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
        .then((res) => res.json())
        .then((data) => {
          // Enhance photos with mock data
          const enhancedPhotos = data.map((photo, index) => ({
            ...photo,
            likes: Math.floor(Math.random() * 100) + 5,
            views: Math.floor(Math.random() * 1000) + 50,
            photographer: `Photographer ${Math.floor(Math.random() * 10) + 1}`,
            tags: generateRandomTags(),
            featured: index < 3 // First 3 are featured
          }));
          setPhotos(enhancedPhotos);
          setFilteredPhotos(enhancedPhotos);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching photos:", err);
          setLoading(false);
        });
    }
  }, [albumId]);

  // Search and display functionality
  useEffect(() => {
    let filtered = [...photos];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(photo =>
        photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredPhotos(filtered);
    
    // Set displayed photos based on showAll state
    if (showAll || searchTerm) {
      setDisplayedPhotos(filtered);
    } else {
      setDisplayedPhotos(filtered.slice(0, 4));
    }
  }, [searchTerm, photos, showAll]);

  const generateRandomTags = () => {
    const allTags = ['nature', 'portrait', 'landscape', 'urban', 'abstract', 'street', 'macro', 'travel', 'sunset', 'architecture'];
    const numTags = Math.floor(Math.random() * 3) + 1;
    const shuffled = allTags.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numTags);
  };

  const handlePhotoClick = (photo, index) => {
    setSelectedPhoto(photo);
    setCurrentImageIndex(index);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPhoto(null);
  };

  const handleLike = (photoId, event) => {
    event.stopPropagation();
    const newLiked = new Set(likedPhotos);
    if (newLiked.has(photoId)) {
      newLiked.delete(photoId);
    } else {
      newLiked.add(photoId);
    }
    setLikedPhotos(newLiked);
  };

  const handleViewMore = () => {
    setShowAll(true);
  };

  const handleViewLess = () => {
    setShowAll(false);
  };

  const navigatePhoto = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentImageIndex + 1) % filteredPhotos.length
      : (currentImageIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    
    setCurrentImageIndex(newIndex);
    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  // Loading Skeleton
  const PhotoSkeleton = () => (
    <Grid container spacing={3}>
      {[...Array(8)].map((_, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Card sx={{ borderRadius: 3 }}>
            <Skeleton variant="rectangular" height={200} />
            <Box sx={{ p: 2 }}>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 4, mb: 4 }}>
          <CircularProgress 
            size={50}
            sx={{ 
              color: 'primary.main',
              mr: 2
            }}
          />
          <Typography variant="h6" color="text.secondary">
            Loading amazing photos...
          </Typography>
        </Box>
        <PhotoSkeleton />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 800,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 1,
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          📸 Photo Gallery
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Album {albumId} • {showAll || searchTerm ? filteredPhotos.length : Math.min(4, photos.length)} of {photos.length} photographs
          {!showAll && !searchTerm && photos.length > 4 && (
            <Chip 
              label={`+${photos.length - 4} more`}
              size="small"
              sx={{ 
                ml: 1,
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                color: 'white',
                fontWeight: 600
              }}
            />
          )}
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={6} sm={3}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textAlign: 'center'
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {photos.length}
              </Typography>
              <Typography variant="body2">Total Photos</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                color: 'white',
                textAlign: 'center'
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {photos.filter(p => p.featured).length}
              </Typography>
              <Typography variant="body2">Featured</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                textAlign: 'center'
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {photos.reduce((sum, photo) => sum + photo.likes, 0)}
              </Typography>
              <Typography variant="body2">Total Likes</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                color: 'white',
                textAlign: 'center'
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {photos.reduce((sum, photo) => sum + photo.views, 0)}
              </Typography>
              <Typography variant="body2">Total Views</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Search and Controls */}
        <Paper 
          sx={{ 
            p: 3,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            mb: 4
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Search photos by title or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    background: 'white',
                    '&:hover': {
                      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.15)',
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                <Button
                  startIcon={<GridView />}
                  variant={viewMode === 'grid' ? 'contained' : 'outlined'}
                  onClick={() => setViewMode('grid')}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none'
                  }}
                >
                  Grid
                </Button>
                <Button
                  startIcon={<ViewModule />}
                  variant={viewMode === 'masonry' ? 'contained' : 'outlined'}
                  onClick={() => setViewMode('masonry')}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none'
                  }}
                >
                  Masonry
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Photos Grid */}
      {displayedPhotos.length === 0 ? (
        <Paper 
          sx={{ 
            textAlign: "center", 
            py: 8,
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.02) 100%)',
            border: '1px solid rgba(102, 126, 234, 0.08)'
          }}
        >
          <Photo sx={{ fontSize: '4rem', color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            No photos found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Try adjusting your search criteria
          </Typography>
          <Button
            variant="contained"
            onClick={() => setSearchTerm("")}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              textTransform: 'none'
            }}
          >
            Show All Photos
          </Button>
        </Paper>
      ) : (
        <Fade in={!loading} timeout={500}>
          <Box>
            <Grid container spacing={3} sx={{ justifyContent: 'flex-start' }}>
              {displayedPhotos.map((photo, index) => (
              <Grid 
                item 
                xs={6}
                key={photo.id}
                sx={{ 
                  display: 'flex',
                  '& > *': { 
                    width: '100%' 
                  }
                }}
              >
                <Card
                  sx={{
                    height: '100%',
                    minHeight: 400,
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                      '& .photo-overlay': {
                        opacity: 1,
                      },
                      '& .photo-image': {
                        transform: 'scale(1.1)',
                      }
                    }
                  }}
                  onClick={() => handlePhotoClick(photo, index)}
                >
                  {/* Featured Badge */}
                  {photo.featured && (
                    <Chip
                      label="Featured"
                      icon={<Collections />}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        zIndex: 2,
                        background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.7rem'
                      }}
                    />
                  )}

                  {/* Photo */}
                  <Box sx={{ position: 'relative', overflow: 'hidden', flex: '1' }}>
                    <CardMedia
                      className="photo-image"
                      component="img"
                      height={280}
                      image={photo.url}
                      alt={photo.title}
                      sx={{
                        transition: 'transform 0.3s ease',
                        objectFit: 'cover',
                        width: '100%'
                      }}
                    />

                    {/* Hover Overlay */}
                    <Box
                      className="photo-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        p: 2
                      }}
                    >
                      <Box>
                        <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                          {photo.photographer}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                          {photo.views} views
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <IconButton
                          size="small"
                          onClick={(e) => handleLike(photo.id, e)}
                          sx={{
                            color: likedPhotos.has(photo.id) ? 'error.main' : 'white',
                            background: 'rgba(255, 255, 255, 0.2)',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.3)',
                            }
                          }}
                        >
                          {likedPhotos.has(photo.id) ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{
                            color: 'white',
                            background: 'rgba(255, 255, 255, 0.2)',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.3)',
                            }
                          }}
                        >
                          <ZoomIn />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>

                  {/* Photo Info */}
                  <Box sx={{ p: 2 }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 600,
                        mb: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.3
                      }}
                    >
                      {photo.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Favorite sx={{ fontSize: '1rem', color: 'error.main' }} />
                        <Typography variant="caption" color="text.secondary">
                          {photo.likes + (likedPhotos.has(photo.id) ? 1 : 0)}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        #{photo.id}
                      </Typography>
                    </Box>

                    {/* Tags */}
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {photo.tags.slice(0, 2).map((tag, tagIndex) => (
                        <Chip
                          key={tagIndex}
                          label={tag}
                          size="small"
                          sx={{
                            fontSize: '0.7rem',
                            height: 20,
                            background: 'rgba(102, 126, 234, 0.08)',
                            color: 'primary.main',
                            '&:hover': {
                              background: 'rgba(102, 126, 234, 0.15)',
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* View More/Less Button */}
          {!searchTerm && photos.length > 4 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              {!showAll ? (
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleViewMore}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 30px rgba(102, 126, 234, 0.4)',
                    }
                  }}
                >
                  View More Photos ({photos.length - 4} remaining)
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleViewLess}
                  sx={{
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      background: 'rgba(102, 126, 234, 0.08)',
                      borderColor: 'primary.dark',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  Show Less Photos
                </Button>
              )}
            </Box>
          )}
          </Box>
        </Fade>
      )}

      {/* Lightbox Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth={false}
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            background: 'rgba(0, 0, 0, 0.9)',
            margin: 0,
            maxHeight: '100vh',
            maxWidth: '100vw',
          }
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          {selectedPhoto && (
            <>
              {/* Close Button */}
              <IconButton
                onClick={handleCloseDialog}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  zIndex: 3,
                  color: 'white',
                  background: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    background: 'rgba(0, 0, 0, 0.7)',
                  }
                }}
              >
                <Close />
              </IconButton>

              {/* Navigation Buttons */}
              <IconButton
                onClick={() => navigatePhoto('prev')}
                sx={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 3,
                  color: 'white',
                  background: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    background: 'rgba(0, 0, 0, 0.7)',
                  }
                }}
              >
                <ArrowBack />
              </IconButton>

              <IconButton
                onClick={() => navigatePhoto('next')}
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 3,
                  color: 'white',
                  background: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    background: 'rgba(0, 0, 0, 0.7)',
                  }
                }}
              >
                <ArrowForward />
              </IconButton>

              {/* Image */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '80vh',
                  p: 2
                }}
              >
                <Zoom in={dialogOpen} timeout={300}>
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.title}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      borderRadius: '8px'
                    }}
                  />
                </Zoom>
              </Box>

              {/* Photo Info Bar */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                  color: 'white',
                  p: 3
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {selectedPhoto.title}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2">
                      by {selectedPhoto.photographer}
                    </Typography>
                    <Typography variant="body2">
                      {selectedPhoto.likes} likes • {selectedPhoto.views} views
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" sx={{ color: 'white' }}>
                      <Favorite />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'white' }}>
                      <Download />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'white' }}>
                      <Share />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
}