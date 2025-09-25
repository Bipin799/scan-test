// "use client";

// import { useEffect, useState } from "react";
// import Layout from "../component/Layout";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Grid,
// } from "@mui/material";

// export default function PostPage() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/posts")
//       .then((res) => res.json())
//       .then((data) => {
//         setPosts(data);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <Layout>
//       <Box sx={{ padding: 4 }}>
//         {loading ? (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               minHeight: "200px",
//             }}
//           >
//             <CircularProgress sx={{ color: "#2d7231" }} />
//           </Box>
//         ) : (
//           <Grid container spacing={3}>
//             {posts.map((post) => (
//               <Grid item xs={12} sm={6} md={4} key={post.id}>
//                 <Card
//                   sx={{
//                     height: "100%",
//                     borderRadius: 3,
//                     boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
//                     transition: "0.3s",
//                     "&:hover": {
//                       transform: "translateY(-6px)",
//                       boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
//                     },
//                   }}
//                 >
//                   <CardContent>
//                     <Typography
//                       variant="h6"
//                       sx={{
//                         mb: 1,
//                         fontWeight: 600,
//                         color: "primary.main",
//                       }}
//                     >
//                       {post.title}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {post.body}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         )}
//       </Box>
//     </Layout>
//   );
// }






"use client";

import { useEffect, useState } from "react";
import Layout from "../component/Layout";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Container,
  Avatar,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Paper,
  Skeleton,
  Fade,
  Divider
} from "@mui/material";
import {
  Article,
  Person,
  AccessTime,
  Favorite,
  Share,
  Comment,
  Search,
  FilterList,
  BookmarkBorder,
  MoreVert,
  TrendingUp,
  FiberNew
} from "@mui/icons-material";

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchTerm) {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, posts]);

  // Generate random user avatar color
  const getAvatarColor = (userId) => {
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
    ];
    return colors[userId % colors.length];
  };

  // Get random reading time
  const getReadingTime = (text) => {
    const wordCount = text.split(' ').length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed
    return `${readingTime} min read`;
  };

  // Get random likes count
  const getLikesCount = (id) => {
    return Math.floor(Math.random() * 500) + 10;
  };

  // Truncate text
  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  // Loading Skeleton
  const PostSkeleton = () => (
    <Grid container spacing={3}>
      {[...Array(6)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ borderRadius: 3, p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ ml: 2, flex: 1 }}>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
              </Box>
            </Box>
            <Skeleton variant="text" width="100%" height={60} />
            <Skeleton variant="text" width="80%" />
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Layout>
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
            Latest Posts
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Discover amazing articles and stories from our community
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
                  {posts.length}
                </Typography>
                <Typography variant="body2">Total Posts</Typography>
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
                  {filteredPosts.length}
                </Typography>
                <Typography variant="body2">Showing</Typography>
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
                  10
                </Typography>
                <Typography variant="body2">Authors</Typography>
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
                  2.5K
                </Typography>
                <Typography variant="body2">Total Likes</Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Search and Filter Bar */}
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
                  placeholder="Search posts by title or content..."
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
                      },
                      '&.Mui-focused': {
                        boxShadow: '0 4px 20px rgba(102, 126, 234, 0.25)',
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                  <Button
                    startIcon={<FilterList />}
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      borderColor: 'primary.main',
                      '&:hover': {
                        background: 'rgba(102, 126, 234, 0.08)'
                      }
                    }}
                  >
                    Filter
                  </Button>
                  <Button
                    startIcon={<TrendingUp />}
                    variant="contained"
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                      }
                    }}
                  >
                    Trending
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Content Section */}
        {loading ? (
          <PostSkeleton />
        ) : (
          <Fade in={!loading} timeout={500}>
            <Grid container spacing={3}>
              {filteredPosts.map((post, index) => (
                <Grid item xs={12} sm={6} lg={4} key={post.id}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
                        '& .post-image': {
                          transform: 'scale(1.05)',
                        },
                        '& .action-buttons': {
                          opacity: 1,
                          transform: 'translateY(0)',
                        }
                      }
                    }}
                  >
                    {/* Trending Badge */}
                    {index < 3 && (
                      <Chip
                        label={index === 0 ? "Trending" : index === 1 ? "Popular" : "New"}
                        icon={index === 0 ? <TrendingUp /> : index === 1 ? <Favorite /> : <FiberNew />}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          zIndex: 2,
                          background: index === 0 
                            ? 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
                            : index === 1 
                            ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                            : 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.75rem'
                        }}
                      />
                    )}

                    {/* Gradient Header */}
                    <Box
                      sx={{
                        height: 8,
                        background: getAvatarColor(post.userId),
                      }}
                    />

                    <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 'calc(100% - 8px)' }}>
                      {/* Author Section */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            background: getAvatarColor(post.userId),
                            color: 'white',
                            fontWeight: 'bold',
                            mr: 2
                          }}
                        >
                          U{post.userId}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            User {post.userId}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccessTime sx={{ fontSize: '0.875rem', color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {getReadingTime(post.body)}
                            </Typography>
                          </Box>
                        </Box>
                        <IconButton size="small" sx={{ color: 'text.secondary' }}>
                          <MoreVert />
                        </IconButton>
                      </Box>

                      {/* Post Title */}
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 2,
                          fontWeight: 700,
                          color: 'text.primary',
                          lineHeight: 1.3,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          '&:hover': {
                            color: 'primary.main',
                            cursor: 'pointer'
                          }
                        }}
                      >
                        {post.title}
                      </Typography>

                      {/* Post Content */}
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          mb: 3,
                          lineHeight: 1.6,
                          flex: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {truncateText(post.body)}
                      </Typography>

                      <Divider sx={{ mb: 2 }} />

                      {/* Action Buttons */}
                      <Box 
                        className="action-buttons"
                        sx={{ 
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          opacity: 0.7,
                          transform: 'translateY(4px)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            size="small"
                            startIcon={<Favorite />}
                            sx={{
                              color: 'text.secondary',
                              textTransform: 'none',
                              minWidth: 'auto',
                              fontSize: '0.8rem',
                              '&:hover': {
                                color: 'error.main',
                                background: 'rgba(244, 67, 54, 0.08)'
                              }
                            }}
                          >
                            {getLikesCount(post.id)}
                          </Button>
                          <Button
                            size="small"
                            startIcon={<Comment />}
                            sx={{
                              color: 'text.secondary',
                              textTransform: 'none',
                              minWidth: 'auto',
                              fontSize: '0.8rem',
                              '&:hover': {
                                color: 'primary.main',
                                background: 'rgba(102, 126, 234, 0.08)'
                              }
                            }}
                          >
                            {Math.floor(Math.random() * 50) + 5}
                          </Button>
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <IconButton
                            size="small"
                            sx={{
                              color: 'text.secondary',
                              '&:hover': {
                                color: 'primary.main',
                                background: 'rgba(102, 126, 234, 0.08)'
                              }
                            }}
                          >
                            <BookmarkBorder fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{
                              color: 'text.secondary',
                              '&:hover': {
                                color: 'primary.main',
                                background: 'rgba(102, 126, 234, 0.08)'
                              }
                            }}
                          >
                            <Share fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Fade>
        )}

        {/* No Results State */}
        {!loading && filteredPosts.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px',
              textAlign: 'center'
            }}
          >
            <Article sx={{ fontSize: '4rem', color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              No posts found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Try adjusting your search criteria or browse all posts
            </Typography>
            <Button
              variant="contained"
              onClick={() => setSearchTerm("")}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textTransform: 'none'
              }}
            >
              Show All Posts
            </Button>
          </Box>
        )}
      </Container>
    </Layout>
  );
}