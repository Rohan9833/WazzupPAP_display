import mongoose from 'mongoose';

export async function connectDatabase(uri) {
  mongoose.set('strictQuery', true);
  mongoose.connection.on('error', (err) => {
    console.error('[db] connection error:', err.message);
  });
  mongoose.connection.on('disconnected', () => {
    console.warn('[db] disconnected');
  });

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    autoIndex: true,
  });
  console.log('[db] connected');
}

export async function disconnectDatabase() {
  await mongoose.connection.close();
}

export function isDatabaseReady() {
  return mongoose.connection.readyState === 1;
}
