"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  CircularProgress,
  Divider,
  Grid,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Skeleton,
  Fade,
  Badge,
  Tooltip
} from "@mui/material";
import {
  Reply,
  Favorite,
  FavoriteBorder,
  MoreVert,
  ThumbUp,
  ThumbDown,
  Flag,
  AccessTime,
  Person,
  Email as EmailIcon,
  Sort,
  FilterList,
  Add,
  Search
} from "@mui/icons-material";

export default function CommentsList({ postId }) {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [likedComments, setLikedComments] = useState(new Set());

  useEffect(() => {
    if (postId) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then((res) => res.json())
        .then((data) => {
          // Add mock data for enhanced features
          const enhancedComments = data.map((comment, index) => ({
            ...comment,
            likes: Math.floor(Math.random() * 50) + 1,
            replies: Math.floor(Math.random() * 5),
            timeAgo: getRandomTimeAgo(),
            isVerified: index < 2, // First 2 comments are verified
            avatar: getRandomAvatarColor(comment.id)
          }));
          setComments(enhancedComments);
          setFilteredComments(enhancedComments);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [postId]);

  // Search and filter functionality
  useEffect(() => {
    let filtered = [...comments];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(comment =>
        comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort comments
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => a.id - b.id);
        break;
      case "oldest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      case "popular":
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      default:
        break;
    }

    setFilteredComments(filtered);
  }, [searchTerm, sortBy, comments]);

  // Helper functions
  const getRandomTimeAgo = () => {
    const times = ["2 minutes ago", "1 hour ago", "3 hours ago", "1 day ago", "2 days ago", "1 week ago"];
    return times[Math.floor(Math.random() * times.length)];
  };

  const getRandomAvatarColor = (id) => {
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    ];
    return colors[id % colors.length];
  };

  const getInitials = (name) => {
    return name.split(' ').map(word => word.charAt(0).toUpperCase()).slice(0, 2).join('');
  };

  const handleLike = (commentId) => {
    const newLiked = new Set(likedComments);
    if (newLiked.has(commentId)) {
      newLiked.delete(commentId);
    } else {
      newLiked.add(commentId);
    }
    setLikedComments(newLiked);
  };

  // Loading skeleton
  const CommentSkeleton = () => (
    <Box>
      {[...Array(3)].map((_, index) => (
        <Paper key={index} sx={{ p: 3, borderRadius: 3, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Skeleton variant="circular" width={50} height={50} />
            <Box sx={{ ml: 2, flex: 1 }}>
              <Skeleton variant="text" width="40%" height={24} />
              <Skeleton variant="text" width="60%" height={20} />
            </Box>
          </Box>
          <Skeleton variant="text" width="100%" height={60} />
          <Skeleton variant="text" width="80%" />
        </Paper>
      ))}
    </Box>
  );

  if (loading) {
    return (
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 2, mb: 3 }}>
          <CircularProgress 
            size={40}
            sx={{ 
              color: 'primary.main',
              mr: 2
            }}
          />
          <Typography variant="h6" color="text.secondary">
            Loading comments...
          </Typography>
        </Box>
        <CommentSkeleton />
      </Box>
    );
  }

  if (!comments.length) {
    return (
      <Box sx={{ mt: 4 }}>
        <Paper 
          sx={{ 
            textAlign: "center", 
            py: 6,
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.02) 100%)',
            border: '1px solid rgba(102, 126, 234, 0.08)'
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mx: 'auto',
              mb: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontSize: '2rem'
            }}
          >
            💬
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            No comments yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Be the first to share your thoughts on this post!
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 2,
              textTransform: 'none',
              px: 3
            }}
          >
            Add Comment
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            💬 Comments
            <Chip 
              label={comments.length}
              size="small"
              sx={{
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                color: 'white',
                fontWeight: 600
              }}
            />
          </Typography>
          
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 2,
              textTransform: 'none',
              px: 3
            }}
          >
            Add Comment
          </Button>
        </Box>

        {/* Search and Filter Bar */}
        <Paper 
          sx={{ 
            p: 2,
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            mb: 3
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search comments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    background: 'white'
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                <Button
                  size="small"
                  startIcon={<Sort />}
                  variant={sortBy === 'newest' ? 'contained' : 'outlined'}
                  onClick={() => setSortBy('newest')}
                  sx={{ textTransform: 'none', borderRadius: 2 }}
                >
                  Newest
                </Button>
                <Button
                  size="small"
                  startIcon={<AccessTime />}
                  variant={sortBy === 'oldest' ? 'contained' : 'outlined'}
                  onClick={() => setSortBy('oldest')}
                  sx={{ textTransform: 'none', borderRadius: 2 }}
                >
                  Oldest
                </Button>
                <Button
                  size="small"
                  startIcon={<ThumbUp />}
                  variant={sortBy === 'popular' ? 'contained' : 'outlined'}
                  onClick={() => setSortBy('popular')}
                  sx={{ textTransform: 'none', borderRadius: 2 }}
                >
                  Popular
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Comments List */}
      <Fade in={!loading} timeout={500}>
        <Grid container spacing={3}>
          {filteredComments.map((comment, index) => (
            <Grid
            sx={{
              width:'100%',
            }}
             item xs={12} key={comment.id}>
              <Paper
                sx={{   
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                  border: '1px solid',
                  borderColor: 'divider',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                {/* Gradient top bar */}
                <Box
                  sx={{
                    height: 6,
                    background: comment.avatar,
                  }}
                />

                <Box sx={{ p: 3 }}>
                  {/* Comment Header */}
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                          comment.isVerified ? (
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px'
                              }}
                            >
                              ✓
                            </Box>
                          ) : null
                        }
                      >
                        <Avatar 
                          sx={{ 
                            width: 50, 
                            height: 50,
                            background: comment.avatar,
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            mr: 2,
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                          }}
                        >
                          {getInitials(comment.name)}
                        </Avatar>
                      </Badge>
                      
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                            {comment.name}
                          </Typography>
                          {comment.isVerified && (
                            <Chip
                              label="Verified"
                              size="small"
                              sx={{
                                height: 20,
                                fontSize: '0.7rem',
                                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                                color: 'white',
                                fontWeight: 600
                              }}
                            />
                          )}
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <EmailIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ fontSize: '0.8rem' }}
                            >
                              {comment.email}
                            </Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary">•</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTime sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                              {comment.timeAgo}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Tooltip title="More options">
                      <IconButton size="small" sx={{ color: 'text.secondary' }}>
                        <MoreVert />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Divider sx={{ my: 2, opacity: 0.6 }} />

                  {/* Comment Body */}
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      lineHeight: 1.6,
                      color: 'text.primary',
                      mb: 3,
                      fontSize: '0.95rem'
                    }}
                  >
                    {comment.body}
                  </Typography>

                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        startIcon={
                          likedComments.has(comment.id) ? (
                            <Favorite sx={{ color: 'error.main' }} />
                          ) : (
                            <FavoriteBorder />
                          )
                        }
                        onClick={() => handleLike(comment.id)}
                        sx={{
                          color: likedComments.has(comment.id) ? 'error.main' : 'text.secondary',
                          textTransform: 'none',
                          fontSize: '0.8rem',
                          '&:hover': {
                            background: likedComments.has(comment.id) 
                              ? 'rgba(244, 67, 54, 0.08)' 
                              : 'rgba(0, 0, 0, 0.04)'
                          }
                        }}
                      >
                        {comment.likes + (likedComments.has(comment.id) ? 1 : 0)}
                      </Button>
                      
                      <Button
                        size="small"
                        startIcon={<Reply />}
                        sx={{
                          color: 'text.secondary',
                          textTransform: 'none',
                          fontSize: '0.8rem',
                          '&:hover': {
                            color: 'primary.main',
                            background: 'rgba(102, 126, 234, 0.08)'
                          }
                        }}
                      >
                        Reply {comment.replies > 0 && `(${comment.replies})`}
                      </Button>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Tooltip title="Report comment">
                        <IconButton
                          size="small"
                          sx={{
                            color: 'text.secondary',
                            '&:hover': {
                              color: 'warning.main',
                              background: 'rgba(255, 152, 0, 0.08)'
                            }
                          }}
                        >
                          <Flag fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Fade>

      {/* No Search Results */}
      {!loading && filteredComments.length === 0 && searchTerm && (
        <Paper 
          sx={{ 
            textAlign: "center", 
            py: 6,
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.02) 100%)',
            border: '1px solid rgba(102, 126, 234, 0.08)'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            No comments found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Try adjusting your search criteria
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setSearchTerm("")}
            sx={{ textTransform: 'none' }}
          >
            Show All Comments
          </Button>
        </Paper>
      )}
    </Box>
  );
}