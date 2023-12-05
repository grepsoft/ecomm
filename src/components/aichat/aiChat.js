import { Box, Fab, IconButton, Input, InputAdornment, Typography, useTheme, Grid } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import { useReducer, useRef } from "react";
import { Colors } from "../../styles/theme";
import MinimizeIcon from '@mui/icons-material/Minimize';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { BotService } from "../../services/bot";
import LinearProgress from '@mui/material/LinearProgress';
import SingleProductChat from "./SingleProductChat";
import Chip from '@mui/material/Chip';
import { useMediaQuery } from "@mui/material";

const chatWindowWidth = "400";
const chatOriginEnum = {
  AI: 'ai',
  CUSTOMER: 'customer'
};

const RenderMessage = ({ message }) => {
  const theme = useTheme();

  return <Box
    sx={{
      position: "relative",
      padding: "16px 6px",
      background: Colors.light_gray,
      margin: "14px 40px 14px 4px",
      boxShadow: theme.shadows[2],
      borderRadius: "1px 10px 20px 10px",
    }}
  >
    <Typography>{message.text}</Typography>
  </Box>
}

const RenderResponse = ({ message, data, inquirytype }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          position: "relative",
          padding: "16px 6px",
          background: Colors.secondary,
          margin: "14px 8px 14px 40px",
          boxShadow: theme.shadows[2],
          borderRadius: "8px 1px 8px 20px",
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            right: "-8px",
            bottom: "-8px",
            color: Colors.white,
            background: Colors.dark,
            height: "24px",
            width: "24px",
            padding: "4px",
            borderRadius: "50%",
            textAlign: "center",
          }}
        >
          AI
        </Typography>
        <Typography>{message.text}</Typography>
      </Box>
      <Box>

        {{
          'product_specific':
            <Grid
              container
              spacing={{ xs: 1 }}
              justifyContent="center"
              columns={{ xs: 4 }}
            >
              {
                Array.isArray(data) > 0 && data.map((p, i) => (

                  <Grid item key={i} xs={2} display="flex" flexDirection={'column'} alignItems="center">
                    <SingleProductChat width={'80%'} product={p} matches={true} />
                  </Grid>

                ))}
            </Grid>,
          'product_inquiry':
          <Grid
          container
          spacing={{ xs: 1 }}
          justifyContent="center"
          columns={{ xs: 4 }}
        >
              {data.map(p => (
                <Grid item key={p} xs={2} display="flex" flexDirection={'column'} alignItems="center">
                <Chip key={p}
                  label={p}
                />
                </Grid>

              ))}
            </Grid>
        }[inquirytype]}


      </Box>
    </>
  )
}

export default function AiChat() {

  const ref = useRef();
  const theme = useTheme();
  const matches = useMediaQuery (theme.breakpoints.down("md"));


  const [state, updateState] = useReducer((state, params) => {
    if (state.chatopen === false) state.chatminimize = false;
    return { ...state, ...params }
  }, {
    messages: [{
      id: Date.now(),
      origin: chatOriginEnum.AI,
      text: "Hey, tell me what you are looking for",
      data: [],
      inquirytype: ""
    }],
    chatopen: false,
    chatminimize: false,
    chatmessage: '',
    botbusy: false,
  });

  const sendChatMessage = async () => {
    updateState({
      botbusy: true
    });

    const existingMessages = state.messages;

    existingMessages.push({
      id: Date.now(),
      origin: chatOriginEnum.CUSTOMER,
      text: state.chatmessage
    });

    const botResponse = await BotService.chat(state.chatmessage);
    existingMessages.push({
      id: Date.now(),
      origin: chatOriginEnum.AI,
      text: Array.isArray(botResponse.data) ? "This is what I found" : botResponse,
      inquirytype: botResponse.inquiry_type,
      data: botResponse.data
    });

    updateState({
      messages: existingMessages,
      chatmessage: '',
      botbusy: false,
    });

    // scroll to bottom
    ref.current.scrollTop = ref.current.scrollHeight;
  }

  const handleKeyDown = (e) => {

    if (e.key === 'Enter') {
      sendChatMessage();
    }
  }

  const handleChatMessageChange = (event) => {
    updateState({
      chatmessage: event.target.value
    });
  }

  return (
    <Box
      sx={{
        position: "fixed",
        zIndex: 99999,
        bottom: matches ? 0 : "20px",
        right: matches ? 0 : "20px",
      }}
    >
      {state.chatopen ? (
        state.chatminimize ? (
          <Box
            sx={{
              height: "5%",
              width: `${chatWindowWidth}px`,
              background: Colors.primary,
              padding: "6px 8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography color={Colors.white}>AI Assistant</Typography>
            <Box>
              <IconButton
                onClick={() => updateState({ chatminimize: false })}
                sx={{ color: Colors.white }}
              >
                <MinimizeIcon />
              </IconButton>
              <IconButton
                onClick={() => updateState({ chatopen: false })}
                sx={{ color: Colors.white }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              height: matches ? '100vh' : "680px",
              width: matches ? '100vw' : `${chatWindowWidth}px`,
              background: Colors.white,
              boxShadow: "1px 1px 6px 2px rgba(0,0,0,0.25)",
            }}
            display={"flex"}
            flexDirection={"column"}
          >
            <Box
              sx={{
                height: "5%",
                background: Colors.primary,
                padding: "6px 8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography color={Colors.white}>AI Assistant</Typography>
              <Box>
                <IconButton
                  onClick={() => updateState({ chatminimize: true })}
                  sx={{ color: Colors.white }}
                >
                  <MinimizeIcon />
                </IconButton>
                <IconButton
                  onClick={() => updateState({ chatopen: false })}
                  sx={{ color: Colors.white }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>

            {/* chat conversation */}
            <Box
              ref={ref}
              sx={{
                height: "90%",
                width: chatWindowWidth,
                overflowY: "scroll",
              }}
            >
              {
                state.messages.length > 0 &&
                state.messages.map(message => (

                  message.origin === chatOriginEnum.AI ?
                    <RenderResponse key={message.id} message={message} data={message.data} inquirytype={message.inquirytype} />
                    :
                    <RenderMessage key={message.id} message={message} />
                ))
              }
            </Box>

            {/* chat input */}
            {
              state.botbusy ?
                <Box sx={{ width: '100%' }}>
                  <LinearProgress />
                </Box>
                :
                <Box
                  sx={{ p: matches ? 2 : 1, height: "5%" }}
                  display={"flex"}
                  alignItems={"flex-end"}
                >
                  <Input
                    onKeyDown={handleKeyDown}
                    onChange={handleChatMessageChange}
                    value={state.chatmessage}
                    fullWidth
                    sx={{ fontSize: '1.2rem' }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={() => sendChatMessage()}>
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Box>
            }


          </Box >
        )
      ) : (
        <Fab
          onClick={() => updateState({ chatopen: true })}
          color="secondary"
          sx={matches && {
            bottom: '60px'
          }}
        >
          <ChatIcon />
        </Fab>
      )
      }
    </Box >
  );
}