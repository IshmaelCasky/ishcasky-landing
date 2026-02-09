import { AccessToken, RoomAgentDispatch, RoomConfiguration } from 'livekit-server-sdk';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const participantName = searchParams.get('name') || `user-${Math.random().toString(36).substring(7)}`;
  
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.LIVEKIT_URL;

  if (!apiKey || !apiSecret || !wsUrl) {
    return NextResponse.json(
      { error: 'Server misconfigured' },
      { status: 500 }
    );
  }

  // Create the access token
  const at = new AccessToken(apiKey, apiSecret, {
    identity: participantName,
    name: participantName,
  });

  // Add video grant - use unique room per user session for privacy
  const roomName = `portfolio-${participantName}`;
  
  at.addGrant({
    room: roomName,
    roomJoin: true,
    roomCreate: true,
    canPublish: true,
    canSubscribe: true,
  });

  // Configure agent dispatch - triggers the hosted agent to join when user connects
  const agentDispatch = new RoomAgentDispatch({
    agentName: 'Harper-80c',
    metadata: JSON.stringify({ 
      source: 'portfolio-website',
      user: participantName 
    }),
  });

  // Set room configuration with agent dispatch using the property setter
  at.roomConfig = new RoomConfiguration({
    agents: [agentDispatch],
  });

  const token = await at.toJwt();

  return NextResponse.json({ token, wsUrl });
}

