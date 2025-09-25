// "use client"

// import * as React from "react";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";

// export default function SwapCard() {
//  const [cards, setCards] = React.useState([
//   {
//     id: 1,
//     title: "Lizard",
//     description:
//       "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
//     width: 400, 
//     // height: 50,
//   },
//   {
//     id: 2,
//     title: "Chameleon",
//     description:
//       "Chameleons are distinguished by their zygodactylous feet, swaying gait, and ability to change color.",
//     width: 300, 
//     // height: 60,
//   },
//   {
//     id: 3,
//     title: "Lion",
//     description:
//       "Lions are social felines, living in groups called prides, and are known as the kings of the jungle.",  
//     width: 390, 
//     // height: 160,
//   },
//   {
//     id: 4,
//     title: "Elephant",
//     description:
//       "Elephants are the largest land mammals on Earth, known for their intelligence, memory, and long trunks.",
//     width: 545, 
//     // height: 160,
//   },
//   {
//     id: 5,
//     title: "Eagle",
//     description:
//       "Eagles are powerful birds of prey with excellent eyesight, often seen as symbols of strength and freedom.",
//     width: 560, 
//     // height: 160,
//   },
//   {
//     id: 6,
//     title: "Dolphin",
//     description:
//       "Dolphins are highly intelligent marine mammals known for their playful behavior and complex communication.",
//     width: 280, 
//     // height: 160,
//   },

// ]);

//   const [draggedCard, setDraggedCard] = React.useState(null);

//   const handleDragStart = (card) => {
//     setDraggedCard(card);
//   };

//   const handleDrop = (targetCard) => {
//     if (!draggedCard || draggedCard.id === targetCard.id) return;

//     const newCards = [...cards];
//     const draggedIndex = newCards.findIndex((c) => c.id === draggedCard.id);
//     console.log("value of dragged index: ", draggedIndex);
    
//     const targetIndex = newCards.findIndex((c) => c.id === targetCard.id);
//     console.log("value of traget index index: ", targetIndex    );

//     // Swap positions
//     [newCards[draggedIndex], newCards[targetIndex]] = [newCards[targetIndex],newCards[draggedIndex],];

//     setCards(newCards);
//     setDraggedCard(null);
//   };

//   return (
//     <Box
//       display="flex"
//       flexWrap="wrap"
//       gap={3}
//       // justifyContent="center"
//       // alignItems="center"
//       mt={5}
//     >
//       {cards.map((card) => (
//         <Card
//           key={card.id}
//           sx={{
//             // width: 320,
//             width: card.width, 
//             cursor: "grab",
//             boxShadow: 4,
//             borderRadius: 3,
//             transition: "transform 0.2s, box-shadow 0.2s",
//             "&:hover": { transform: "scale(1.05)", boxShadow: 8 },
//           }}
//           draggable
//           onDragStart={() => handleDragStart(card)}
//           onDragOver={(e) => e.preventDefault()}
//           onDrop={() => handleDrop(card)}
//         >
//           <CardMedia
//             sx={{ height: 180 }}
//             image={card.image}
//             title={card.title}
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               {card.title}
//             </Typography>
//             <Typography variant="body2" sx={{ color: "text.secondary" }}>
//               {card.description}
//             </Typography>
//           </CardContent>
//           <CardActions>
//             <Button size="small">Share</Button>
//             <Button size="small">Learn More</Button>
//           </CardActions>
//         </Card>
//       ))}
//     </Box>
//   );
// }










// "use client";

// import * as React from "react";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";

// export default function SwapGrid() {
//   const [order, setOrder] = React.useState([1, 2, 3, 4]);
//   const [draggedId, setDraggedId] = React.useState(null);

//   const handleDragStart = (id) => {
//     setDraggedId(id);
//   };

//   const handleDrop = (targetId) => {
//     if (!draggedId || draggedId === targetId) return;

//     const newOrder = [...order];
//     const draggedIndex = newOrder.indexOf(draggedId);
//     const targetIndex = newOrder.indexOf(targetId);

//     [newOrder[draggedIndex], newOrder[targetIndex]] = [
//       newOrder[targetIndex],
//       newOrder[draggedIndex],
//     ];

//     setOrder(newOrder);
//     setDraggedId(null);
//   };

//   const renderContent = (id) => {
//     if (id === 1) {
//       return (
//         <Grid
//           key={id}  // ✅ unique key added
//           item
//           draggable
//           onDragStart={() => handleDragStart(1)}
//           onDragOver={(e) => e.preventDefault()}
//           onDrop={() => handleDrop(1)}
//         >
//           <Box
//             sx={{
//               width: 400,
//               height: 200,
//               bgcolor: "lightblue",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "grab",
//               borderRadius: 2,
//             }}
//           >
//             🦎 Lizard Content
//           </Box>
//         </Grid>
//       );
//     }

//     if (id === 2) {
//       return (
//         <Grid
//           key={id}
//           item
//           draggable
//           onDragStart={() => handleDragStart(2)}
//           onDragOver={(e) => e.preventDefault()}
//           onDrop={() => handleDrop(2)}
//         >
//           <Box
//             sx={{
//               width: 250,
//               height: 200,
//               bgcolor: "lightgreen",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "grab",
//               borderRadius: 2,
//             }}
//           >
//             🦎 Chameleon Content
//           </Box>
//         </Grid>
//       );
//     }

//     if (id === 3) {
//       return (
//         <Grid
//           key={id}
//           item
//           draggable
//           onDragStart={() => handleDragStart(3)}
//           onDragOver={(e) => e.preventDefault()}
//           onDrop={() => handleDrop(3)}
//         >
//           <Box
//             sx={{
//               width: 390,
//               height: 200,
//               bgcolor: "orange",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "grab",
//               borderRadius: 2,
//             }}
//           >
//             🦁 Lion Content
//           </Box>
//         </Grid>
//       );
//     }

//     if (id === 4) {
//       return (
//         <Grid
//           key={id}
//           item
//           draggable
//           onDragStart={() => handleDragStart(4)}
//           onDragOver={(e) => e.preventDefault()}
//           onDrop={() => handleDrop(4)}
//         >
//           <Box
//             sx={{
//               width: 545,
//               height: 200,
//               bgcolor: "pink",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "grab",
//               borderRadius: 2,
//             }}
//           >
//             🐘 Elephant Content
//           </Box>
//         </Grid>
//       );
//     }
//   };

//   return (
//     <Box sx={{ flexGrow: 1, mt: 4 }}>
//       <Grid container spacing={2}>
//         {order.map((id) => renderContent(id))}
//       </Grid>
//     </Box>
//   );
// }










// "use client";
// import * as React from "react";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import { GripVertical } from "lucide-react";

// export default function SwapGrid() {
//   const [order, setOrder] = React.useState([1, 2, 3, 4]);
//   const [draggedId, setDraggedId] = React.useState(null);
//   const [dragOverId, setDragOverId] = React.useState(null);

//   const handleDragStart = (id) => {
//     setDraggedId(id);
//   };

//   const handleDragOver = (e, targetId) => {
//     e.preventDefault();
//     if (draggedId && draggedId !== targetId) {
//       setDragOverId(targetId);
//     }
//   };

//   const handleDragLeave = () => {
//     setDragOverId(null);
//   };

//   const handleDrop = (targetId) => {
//     if (!draggedId || draggedId === targetId) return;
    
//     const newOrder = [...order];
//     const draggedIndex = newOrder.indexOf(draggedId);
//     const targetIndex = newOrder.indexOf(targetId);
    
//     [newOrder[draggedIndex], newOrder[targetIndex]] = [
//       newOrder[targetIndex],
//       newOrder[draggedIndex],
//     ];
    
//     setOrder(newOrder);
//     setDraggedId(null);
//     setDragOverId(null);
//   };

//   const renderContent = (id) => {
//     const isBeingDragged = draggedId === id;
//     const isDropTarget = dragOverId === id;
    
//     const configs = {
//       1: { width: 400, bgcolor: "lightblue", content: " Lizard Content" },
//       2: { width: 250, bgcolor: "lightgreen", content: " Chameleon Content" },
//       3: { width: 390, bgcolor: "orange", content: " Lion Content" },
//       4: { width: 545, bgcolor: "pink", content: " Elephant Content " }
//     };

//     const config = configs[id];

//     return (
//       <Grid
//         key={id}
//         item
//         draggable
//         onDragStart={() => handleDragStart(id)}
//         onDragOver={(e) => handleDragOver(e, id)}
//         onDragLeave={handleDragLeave}
//         onDrop={() => handleDrop(id)}
//         sx={{
//           position: 'relative',
//           opacity: isBeingDragged ? 0.5 : 1,
//           // transition: 'all 0.2s ease'
//         }}
//       >
//         {/* Drop indicator - dashed border */}
//         {isDropTarget && (
//           <Box
//             sx={{
//               position: 'absolute',
//               top: -4,
//               left: -4,
//               right: -4,
//               bottom: -4,
//               border: '3px dashed #1c232aff',
//               borderRadius: 3,
//               backgroundColor: 'rgba(33, 150, 243, 0.1)',
//               zIndex: 1,
//               pointerEvents: 'none',
//               animation: 'pulse 1s ease-in-out infinite alternate'
//             }}
//           />
//         )}
        
//         <Box
//           sx={{
//             width: config.width,
//             height: 200,
//             bgcolor: config.bgcolor,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             cursor: "grab",
//             borderRadius: 2,
//             position: 'relative',
//             boxShadow: isBeingDragged ? '0 8px 25px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
//             // transform: isBeingDragged ? 'rotate(3deg)' : 'none',
//             // transition: 'all 0.2s ease',
//             '&:hover': {
//               // transform: isBeingDragged ? 'rotate(3deg)' : 'translateY(-2px)',
//               boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
//             },
//             '&:active': {
//               cursor: 'grabbing'
//             }
//           }}
//         >
//           {/* Drag handle icon */}
//           <Box
//             sx={{
//               position: 'absolute',
//               top: 8,
//               left: 8,
//               opacity: 0.6,
//               // transition: 'opacity 0.2s ease',
//               '&:hover': {
//                 opacity: 1
//               }
//             }}
//           >
//             {/* Try to use your drag_icon.png first, fallback to Lucide icon */}
//             <img 
//               src="/drag_icon.png"
//               alt="drag handle"
//               style={{ width: 40, height: 40 }}
//               onError={(e) => {
//                 // Fallback to Lucide icon if image fails to load
//                 e.target.style.display = 'none';
//                 e.target.nextElementSibling.style.display = 'block';
//               }}
//             />

//             <GripVertical 
//               size={20} 
//               color="#666"
//               style={{ display: 'none' }}
//             />

//           </Box>
          
//           <Box sx={{ fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center' }}>
//             {config.content}
//           </Box>
//         </Box>
//       </Grid>
//     );
//   };

//   return (
//     <Box sx={{ flexGrow: 1, mt: 4 }}>
//       <style>
//         {`
//           @keyframes pulse {
//             from {
//               background-color: rgba(33, 150, 243, 0.1);
//             }
//             to {
//               background-color: rgba(33, 150, 243, 0.2);
//             }
//           }
//         `}
//       </style>
//       <Grid container spacing={2}>
//         {order.map((id) => renderContent(id))}
//       </Grid>
//     </Box>
//   );
// }



















"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { GripVertical } from "lucide-react";

export default function SwapGrid() {
  const configs = {
    1: { width: 550, bgcolor: "lightblue", content: "Lizard Content" },
    2: { width: 400, bgcolor: "lightgreen", content: "Chameleon Content" },
    3: { width: 300, bgcolor: "orange", content: "Lion Content" },
    4: { width: 550, bgcolor: "pink", content: "Elephant Content" }
  };

  const [order, setOrder] = React.useState([1, 2, 3, 4]);
  const [draggedId, setDraggedId] = React.useState(null);
  const [dragOverId, setDragOverId] = React.useState(null);

  const handleDragStart = (id) => {
    setDraggedId(id);
  };

  const handleDragOver = (e, targetId) => {
    e.preventDefault();
    if (draggedId && draggedId !== targetId) {
      setDragOverId(targetId);
    }
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (targetId) => {
    if (!draggedId) return;

    // if (targetId && configs[targetId].width < configs[draggedId].width) {
    //   console.log("targetId", targetId);
    //   console.log("configs[targetId].width", configs[targetId].width);
    //   console.log("configs[draggedId].width", configs[draggedId].width);
      
       
    //   setDragOverId(null);
    //   return;
    // }

    const newOrder = [...order];
    const draggedIndex = newOrder.indexOf(draggedId);
    const targetIndex = targetId ? newOrder.indexOf(targetId) : -1;

    newOrder.splice(draggedIndex, 1);

    if (targetIndex === -1) {
      newOrder.push(draggedId);
    } else {
      newOrder.splice(targetIndex, 0, draggedId);
    }

    setOrder(newOrder);
    console.log("the values of new order is:", newOrder);
    
    setDraggedId(null);
    setDragOverId(null);
  };



  const renderContent = (id) => {
    const isBeingDragged = draggedId === id;
    const isDropTarget = dragOverId === id;
    const config = configs[id];

    return (
      <Grid
        key={id}
        item
        draggable
        onDragStart={() => handleDragStart(id)}
        onDragOver={(e) => handleDragOver(e, id)}
        onDragLeave={handleDragLeave}
        onDrop={() => handleDrop(id)}
        sx={{
          position: "relative",
          opacity: isBeingDragged ? 0.5 : 1,
        }}
      >
        {isDropTarget && (
          <Box
            sx={{
              position: "absolute",
              top: -4,
              left: -4,
              right: -4,
              bottom: -4,
              border: "3px dashed #1c232aff",
              borderRadius: 3,
              backgroundColor: "rgba(33, 150, 243, 0.1)",
              zIndex: 1,
              pointerEvents: "none",
              animation: "pulse 1s ease-in-out infinite alternate",
            }}
          />
        )}

        <Box
          sx={{
            width: config.width,
            height: 200,
            bgcolor: config.bgcolor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "grab",
            borderRadius: 2,
            position: "relative",
            boxShadow: isBeingDragged
              ? "0 8px 25px rgba(0,0,0,0.3)"
              : "0 2px 8px rgba(0,0,0,0.1)",
            "&:hover": {
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            },
            "&:active": {
              cursor: "grabbing",
            },
          }}
        >
          {/* Drag handle icon */}
          <Box
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              opacity: 0.6,
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            <img
              src="/drag_icon.png"
              alt="drag handle"
              style={{ width: 40, height: 40 }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <GripVertical size={20} color="#666" style={{ display: "none" }} />
          </Box>

          <Box
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {config.content}
          </Box>
        </Box>
      </Grid>
    );
  };

  return (
    <Box sx={{

      //  flexGrow: 1,
       mt: 4, 

      // border: "2px solid gray", // border for clarity
      borderRadius: 2,
      padding: 2,
      // height: 450, 
      // overflow: "hidden", 
      // position: "relative", 
       }}>
      <style>
        {`
          @keyframes pulse {
            from { background-color: rgba(33, 150, 243, 0.1); }
            to { background-color: rgba(33, 150, 243, 0.2); }
          }
        `}
      </style>
      <Grid container spacing={2}>
        {order.map((id) => renderContent(id))}

        {/* Allow drop in empty space */}
        {draggedId && (
          <Grid
            item
            xs={12}
            onDragOver={(e) => handleDragOver(e, null)}
            onDrop={() => handleDrop(null)}
            sx={{
              height: 200, 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: draggedId ? configs[draggedId].width : "100%", 
              top: -4,
              left: -4,
              right: -4,
              bottom: -4,
              border: "3px dashed #1c232aff",
              borderRadius: 3,
              backgroundColor: "rgba(33, 150, 243, 0.1)",
              animation: "pulse 1s ease-in-out infinite alternate",
            }}
          >
            Drop here
          </Grid>
        )}

      </Grid>
    </Box>
  );
}