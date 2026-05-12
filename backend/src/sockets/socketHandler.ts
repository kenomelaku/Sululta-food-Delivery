import { Server } from 'socket.io';

export const setupSockets = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_order', (orderId) => {
      socket.join(`order_${orderId}`);
    });

    socket.on('update_location', (data) => {
      // data: { driverId, orderId, latitude, longitude }
      io.to(`order_${data.orderId}`).emit('location_update', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};