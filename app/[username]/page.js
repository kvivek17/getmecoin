// app/[username]/page.js

import Paymentpage from '@/components/Paymentpage';
import React from 'react';
import User from '../models/User';
import { connectDB } from '../mongodb';
import { notFound } from 'next/navigation';

// ✅ This is a Server Component
const Username = async ({ params }) => {
  const { username } = await params;   // <-- await needed here

  await connectDB();

  let u = await User.findOne({ username });
  if (!u) {
    notFound();
  }

  return (
    <Paymentpage username={username} />
  );
};

export default Username;
