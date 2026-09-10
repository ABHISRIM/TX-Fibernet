const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Plan = require('./models/Plan');

const initialPlans = [
  {
    name: 'Starter Fiber',
    price: 399,
    speed: '30 Mbps',
    validity: '30 Days',
    data: 'Unlimited Data',
    description: 'Perfect for light web browsing, emails, and social media.',
    benefits: ['Unlimited Ultra-Fast Fiber Data', 'Symmetric Download & Upload Speed', 'Free Fiber Modem Installation', '24/7 Dedicated Support'],
    location: ['Tiruppur', 'Erode', 'Palladam', 'Sulur', 'Palani', 'Kodaikanal'],
    active: true
  },
  {
    name: 'Standard Fiber',
    price: 499,
    speed: '50 Mbps',
    validity: '30 Days',
    data: 'Unlimited Data',
    description: 'Ideal for HD video streaming and family internet use.',
    benefits: ['Unlimited Ultra-Fast Fiber Data', 'Symmetric Speed 50 Mbps', 'Dual Band Wi-Fi Router Included', 'Zero Buffering Streaming', '24/7 Customer Care'],
    location: ['Tiruppur', 'Erode', 'Palladam', 'Sulur', 'Palani', 'Kodaikanal'],
    active: true
  },
  {
    name: 'Turbo Fiber',
    price: 699,
    speed: '100 Mbps',
    validity: '30 Days',
    data: 'Unlimited Data',
    description: 'Great for work from home, online classes, and HD movies.',
    benefits: ['100 Mbps Ultra-High Speed', 'Unlimited High-Speed Fiber Data', 'Free Dual-Band Gigabit Router', 'Supports 10+ Devices', 'Priority Support'],
    location: ['Tiruppur', 'Erode', 'Palladam', 'Sulur', 'Palani', 'Kodaikanal'],
    active: true
  },
  {
    name: 'Pro Streaming Fiber',
    price: 999,
    speed: '200 Mbps',
    validity: '30 Days',
    data: 'Unlimited Data',
    description: 'High performance for 4K streaming and simultaneous gaming.',
    benefits: ['200 Mbps Blazing Fast Speed', 'Unlimited Data with No Throttling', 'Includes Complimentary OTT Apps', 'Ultra-Low Latency for Gaming', '24/7 Priority Support'],
    location: ['Tiruppur', 'Erode', 'Palladam', 'Sulur', 'Palani', 'Kodaikanal'],
    active: true
  },
  {
    name: 'Ultra Gamer Fiber',
    price: 1299,
    speed: '300 Mbps',
    validity: '30 Days',
    data: 'Unlimited Data',
    description: 'Designed for heavy downloads, 4K HDR streaming, and pro gaming.',
    benefits: ['300 Mbps Lightning Fiber Speed', 'Unlimited Fiber Data', 'Premium Dual-Band Mesh Router', 'Free OTT Entertainment Bundle', 'Instant Technical Assistance'],
    location: ['Tiruppur', 'Erode', 'Palladam', 'Sulur', 'Palani', 'Kodaikanal'],
    active: true
  },
  {
    name: 'Gigabit Max Fiber',
    price: 1999,
    speed: '500 Mbps',
    validity: '30 Days',
    data: 'Unlimited Data',
    description: 'Ultimate speed for multi-user smart homes and offices.',
    benefits: ['500 Mbps Extreme Gigabit Speed', 'Unlimited High-Speed Data', 'Top Tier OTT Subscription Package', 'Static IP Included on Request', 'Dedicated Account Manager'],
    location: ['Tiruppur', 'Erode', 'Palladam', 'Sulur', 'Palani', 'Kodaikanal'],
    active: true
  }
];

const seedData = async () => {
  try {
    // Seed Admin User
    const existingAdmin = await User.findOne({ email: 'admin@txfibernet.com' });
    if (!existingAdmin) {
      const adminPassword = await bcrypt.hash('Admin@123', 10);
      await User.create({
        name: 'TX Admin',
        email: 'admin@txfibernet.com',
        phone: '9876543210',
        password: adminPassword,
        role: 'admin'
      });
      console.log('Admin user seeded (admin@txfibernet.com / Admin@123)');
    }

    // Seed Sample Customer User
    const existingUser = await User.findOne({ email: 'user@txfibernet.com' });
    if (!existingUser) {
      const userPassword = await bcrypt.hash('User@123', 10);
      await User.create({
        name: 'Sample Customer',
        email: 'user@txfibernet.com',
        phone: '9123456789',
        password: userPassword,
        role: 'customer'
      });
      console.log('Sample customer user seeded (user@txfibernet.com / User@123)');
    }

    // Seed Plans
    const count = await Plan.countDocuments();
    if (count === 0) {
      await Plan.insertMany(initialPlans);
      console.log('Initial broadband plans seeded into database successfully.');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = seedData;
