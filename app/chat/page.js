"use client";
import Layout from "../component/Layout";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  Avatar,
  IconButton,
  Chip,
  Fade,
  AppBar,
  Toolbar,
  Tooltip,
} from "@mui/material";
import {
  Send,
  AttachFile,
  Delete,
  Logout,
} from "@mui/icons-material";
const ChatPage = () =>{
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {

    fetch("http://localhost:5000/messages")
      .then((res) => res.json())
      .then((data) => setChat(data))
      .catch((err) => console.error("Failed to load messages:", err));

    const ws = new WebSocket("ws://localhost:7070");

    ws.onopen = () => {
      console.log("WebSocket Connected");
      setSocket(ws);
    };

    ws.addEventListener("message", (event) => {
      console.log("WS Message Received →", event.data);
      const msg = JSON.parse(event.data);
    //  setChat((prev) => [...prev, msg]);
    
      if (msg.type === "delete") {
          setChat(prev => prev.filter(m => m.id !== msg.id));
          return;
      }



    setChat(prev => {
        const exists = prev.some(m => m.time === msg.time);
        return exists ? prev : [...prev, msg];
    });

    });

    ws.addEventListener("error", (event) => {
      console.log("WS error:", event);
    });

    ws.addEventListener("close", (event) => {
      console.log("websocket is closed");
      console.log("code :", event.code);
      console.log("reason:", event.reason);
      console.log("wasClean:", event.wasClean);
    });

    // return () => {
    //   ws.close();
    // };
    
    return () => {
        if (ws.readyState === WebSocket.OPEN) ws.close(); 
    };

  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const msg = {
        id: Date.now(),
        type: "file",
        user: username,
        file: reader.result,
        fileName: file.name,
        fileType: file.type,
        time: new Date().toISOString(),
      };

      socket.send(JSON.stringify(msg));

      fetch("http://localhost:5000/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msg),
      });

      setChat((prev) => [...prev, msg]);
    };

    reader.readAsDataURL(file);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.log("❌ WebSocket not connected");
        return;
    }

    const msgObj = {
      id: Date.now().toString(),
      user: username,
      message,
      file: null,
      fileName: null,
      fileType: null,
      time: new Date().toISOString(),
    };

    socket.send(JSON.stringify(msgObj));

    await fetch("http://localhost:5000/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msgObj),
    });

    setMessage("");
    // setChat((prev) => [...prev, msgObj]);

  };

  const deleteMessage = async (id) => {
    console.log("values of id is", id);
    
    try {
      await fetch(`http://localhost:5000/messages/${id}`, {
        method: "DELETE",
      }).then(res => res.status).then(console.log);

      setChat((prev) => prev.filter((msg) =>{
        console.log("msg. time value", msg.id, "time value", id);   
        return msg.id !== id;
      } ));

      socket?.send(JSON.stringify({ type: "delete", id }));

    } catch (err) {
      console.error("Error deleting message", err);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setChat([]);
  };

  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "??"; 
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!loggedIn) {
    return (
        <Layout>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container maxWidth="sm">
            <Fade in timeout={800}>
              <Paper
                elevation={10}
                sx={{
                  p: 5,
                  borderRadius: 4,
                  textAlign: "center",
                }}
              >

                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    margin: "0 auto 24px",
                    bgcolor: "primary.main",
                    fontSize: "2rem",
                  }}
                >
                  💬
                </Avatar>

                <Typography variant="h4" mb={1} color="primary">
                  Welcome to Chat
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={4}>
                  Enter your name to start chatting
                </Typography>

                <TextField
                  fullWidth
                  label="Your Name"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && username.trim()) {
                      setLoggedIn(true);
                    }
                  }}
                  sx={{ mb: 3 }}
                />

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={() => username.trim() && setLoggedIn(true)}
                  disabled={!username.trim()}
                  sx={{
                    py: 1.5,
                    fontSize: "1.1rem",
                  }}
                >
                  Join Chat
                </Button>

              </Paper>
            </Fade>
          </Container>
        </Box>
        </Layout>

    );
  }

    return(
    <Layout>
        <Box
          sx={{
            minHeight: "100vh",
            bgcolor: "background.default",
          }}
        >
          <AppBar position="static" elevation={2}>
            <Toolbar>
              <Avatar
                sx={{
                  bgcolor: "secondary.main",
                  mr: 2,
                  width: 40,
                  height: 40,
                }}
              >
                {getInitials(username)}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{username}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Online
                </Typography>
              </Box>

              {/* <Tooltip title="Toggle theme">
                <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Tooltip> */}

              <Tooltip title="Logout">
                <IconButton color="inherit" onClick={handleLogout}>
                  <Logout />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>

          <Container maxWidth="md" sx={{ py: 3 }}>
            <Paper
              elevation={3}
              sx={{
                height: "calc(100vh - 220px)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  p: 2,
                  flexGrow: 1,
                  overflowY: "auto",
                }}
              >
                {chat.map((msg, i) => (
                  <Fade key={i} in timeout={300}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent:
                          msg.user === username ? "flex-end" : "flex-start",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: "70%",
                          position: "relative",
                        }}
                      >
                        {msg.user !== username && (
                          <Chip
                            label={msg.user}
                            size="small"
                            sx={{ mb: 0.5 }}
                            avatar={
                              <Avatar sx={{ width: 24, height: 24 }}>
                                {getInitials(msg.user)}
                              </Avatar>
                            }
                          />
                        )}

                        <Paper
                          elevation={1}
                          sx={{
                            p: 1.5,
                            bgcolor:
                              msg.user === username
                                ? "primary.main"
                                : "background.paper",
                            color:
                              msg.user === username
                                ? "primary.contrastText"
                                : "text.primary",
                            borderRadius: 2,
                            position: "relative",
                          }}
                        >
                          {msg.type === "file" ? (
                            <Box>
                              {msg.fileType.includes("image") && (
                                <Box
                                  component="img"
                                  src={msg.file}
                                  alt="uploaded"
                                  sx={{
                                    maxWidth: "100%",
                                    maxHeight: 300,
                                    borderRadius: 2,
                                    display: "block",
                                  }}
                                />
                              )}

                              {(msg.fileType.includes("pdf") ||
                                msg.fileType.includes("application")) && (
                                <Button
                                  href={msg.file}
                                  download={msg.fileName}
                                  variant="outlined"
                                  size="small"
                                  sx={{
                                    color:
                                      msg.user === username
                                        ? "primary.contrastText"
                                        : "primary.main",
                                    borderColor:
                                      msg.user === username
                                        ? "primary.contrastText"
                                        : "primary.main",
                                  }}
                                >
                                  📄 {msg.fileName}
                                </Button>
                              )}
                            </Box>
                          ) : (
                            <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                              {msg.message}
                            </Typography>
                          )}



                          <Typography
                            variant="caption"
                            sx={{
                              display: "block",
                              mt: 0.5,
                              opacity: 0.7,
                              fontSize: "0.7rem",
                            }}
                          >
                            {new Date(msg.time).toLocaleTimeString()}
                          </Typography>

                          {msg.user === username && (
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                onClick={() => deleteMessage(msg.id)}
                                sx={{
                                  position: "absolute",
                                  top: -8,
                                  right: -8,
                                  bgcolor: "error.main",
                                  color: "white",
                                  width: 24,
                                  height: 24,
                                  "&:hover": {
                                    bgcolor: "error.dark",
                                  },
                                }}
                              >
                                <Delete sx={{ fontSize: 14 }} />
                              </IconButton>
                            </Tooltip>
                          )}

                        </Paper>
                      </Box>
                    </Box>
                  </Fade>
                ))}
              </Box>

              <Box
                sx={{
                  p: 2,
                  bgcolor: "background.paper",
                  borderTop: 1,
                  borderColor: "divider",
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    fullWidth
                    placeholder="Type a message..."
                    variant="outlined"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    size="small"
                  />

                  <input
                    type="file"
                    hidden
                    id="fileUpload"
                    onChange={handleFileUpload}
                  />
                  <Tooltip title="Attach file">
                    <IconButton
                      component="label"
                      htmlFor="fileUpload"
                      color="primary"
                      sx={{
                        bgcolor: "action.hover",
                      }}
                    >
                      <AttachFile />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Send message">
                    <IconButton
                      onClick={sendMessage}
                      disabled={!message.trim()}
                      sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        "&:hover": {
                          bgcolor: "primary.dark",
                        },
                        "&:disabled": {
                          bgcolor: "action.disabledBackground",
                        },
                      }}
                    >
                      <Send />
                    </IconButton>
                  </Tooltip>
                </Stack>

              </Box>

            </Paper>
          </Container>
        </Box>
    </Layout>
    )
}

export default ChatPage;