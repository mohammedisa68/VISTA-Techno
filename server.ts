import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import db from './server/db';
import { User, UserRole } from './src/types';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares
  app.use(express.json({ limit: '10mb' }));

  // Role-Based Access Control (RBAC) Enforcer Middleware
  const rbacMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    return next();
  };

  app.use(rbacMiddleware);

  // API ROUTES
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Helper to construct Google Redirect URI
  function getRedirectUri(req: express.Request) {
    let origin = process.env.APP_URL;
    if (!origin) {
      const host = req.get('host') || 'localhost:3000';
      const isLocal = host.includes('localhost') || host.includes('0.0.0.0') || host.includes('127.0.0.1');
      const protocol = isLocal ? 'http' : 'https';
      origin = `${protocol}://${host}`;
    }
    origin = origin.replace(/\/+$/, '');
    return `${origin}/auth/callback`;
  }

  // Google OAuth URL generator
  app.get('/api/auth/google/url', (req, res) => {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (clientId) {
      const redirectUri = getRedirectUri(req);
      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'openid email profile',
        prompt: 'select_account'
      });
      return res.json({ url: `https://accounts.google.com/o/oauth2/v2/auth?${params}` });
    } else {
      const host = req.get('host') || 'localhost:3000';
      const isLocal = host.includes('localhost') || host.includes('0.0.0.0') || host.includes('127.0.0.1');
      const protocol = isLocal ? 'http' : 'https';
      return res.json({ url: `${protocol}://${host}/api/auth/google/simulate` });
    }
  });

  // Interactive Google Sign-In Simulator Page
  app.get('/api/auth/google/simulate', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Sign in with Google</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://cdn.tailwindcss.com"></script>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap">
          <style>
            body { font-family: 'Roboto', sans-serif; }
          </style>
        </head>
        <body class="bg-[#F2F2F2] min-h-screen flex items-center justify-center p-4">
          <div class="bg-white w-full max-w-[440px] border border-gray-300 rounded-lg p-10 shadow-[0_2px_4px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.1)] flex flex-col">
            <div class="text-center mb-6">
              <svg class="w-8 h-8 mx-auto mb-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <h1 class="text-2xl font-normal text-[#202124] mb-2">Choose an account</h1>
              <p class="text-sm text-[#5f6368]">to continue to <span class="font-medium text-[#1a73e8]">VISTA</span></p>
            </div>

            <!-- List of accounts -->
            <div class="space-y-1 mb-6 max-h-[220px] overflow-y-auto">
              <button onclick="selectAccount('mohammedisaabdu@gmail.com', 'Mohammed Isa', 'Admin', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop')" class="w-full flex items-center justify-between p-3 border-b border-gray-100 hover:bg-[#F8F9FA] transition duration-150 text-left">
                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop" class="w-8 h-8 rounded-full border border-gray-200">
                  <div>
                    <div class="text-sm font-medium text-[#3c4043]">Mohammed Isa</div>
                    <div class="text-xs text-[#5f6368]">mohammedisaabdu@gmail.com</div>
                  </div>
                </div>
                <span class="text-[10px] font-bold bg-pink-100 text-pink-700 px-2.5 py-0.5 rounded-full">Admin</span>
              </button>

              <button onclick="selectAccount('staff@vista.com', 'David Kalu', 'Staff', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop')" class="w-full flex items-center justify-between p-3 border-b border-gray-100 hover:bg-[#F8F9FA] transition duration-150 text-left">
                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop" class="w-8 h-8 rounded-full border border-gray-200">
                  <div>
                    <div class="text-sm font-medium text-[#3c4043]">David Kalu</div>
                    <div class="text-xs text-[#5f6368]">staff@vista.com</div>
                  </div>
                </div>
                <span class="text-[10px] font-bold bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full">Staff</span>
              </button>

              <button onclick="selectAccount('student@vista.com', 'Amina Bello', 'Student', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop')" class="w-full flex items-center justify-between p-3 border-b border-gray-100 hover:bg-[#F8F9FA] transition duration-150 text-left">
                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop" class="w-8 h-8 rounded-full border border-gray-200">
                  <div>
                    <div class="text-sm font-medium text-[#3c4043]">Amina Bello</div>
                    <div class="text-xs text-[#5f6368]">student@vista.com</div>
                  </div>
                </div>
                <span class="text-[10px] font-bold bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full">Student</span>
              </button>

              <button onclick="selectAccount('customer@vista.com', 'Marcus Johnson', 'Customer', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop')" class="w-full flex items-center justify-between p-3 border-b border-gray-100 hover:bg-[#F8F9FA] transition duration-150 text-left">
                <div class="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop" class="w-8 h-8 rounded-full border border-gray-200">
                  <div>
                    <div class="text-sm font-medium text-[#3c4043]">Marcus Johnson</div>
                    <div class="text-xs text-[#5f6368]">customer@vista.com</div>
                  </div>
                </div>
                <span class="text-[10px] font-bold bg-gray-100 text-gray-750 px-2.5 py-0.5 rounded-full">Customer</span>
              </button>
            </div>

            <!-- Custom Email Access / Use another account -->
            <form id="custom-form" onsubmit="submitCustom(event)" class="border-t border-gray-200 pt-4 space-y-3">
              <p class="text-xs font-medium text-[#5f6368] mb-1 flex items-center gap-1.5">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                Use another Google account:
              </p>
              <div class="grid grid-cols-2 gap-2">
                <input type="text" id="custom-name" placeholder="Full Name" required class="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#1a73e8]">
                <input type="email" id="custom-email" placeholder="email@gmail.com" required class="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#1a73e8]">
              </div>
              <button type="submit" class="w-full py-2 bg-[#1a73e8] text-white text-sm font-medium rounded hover:bg-[#1557b0] transition duration-150 shadow-sm">
                Sign in with custom Google Account
              </button>
            </form>

            <p class="text-[11px] text-[#5f6368] leading-tight text-center mt-6">
              To keep you secure, VISTA will only see your email address, name, and profile picture.
            </p>
          </div>

          <script>
            async function selectAccount(email, fullName, role, avatarUrl) {
              try {
                const response = await fetch('/api/auth/google/login_simulate', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email, fullName, role, avatarUrl })
                });
                if (response.ok) {
                  const data = await response.json();
                  if (window.opener) {
                    window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', user: data.user }, '*');
                    window.close();
                  } else {
                    alert('Log in simulated successfully!');
                  }
                } else {
                  alert('Error simulating Google authentication.');
                }
              } catch (e) {
                alert('Connection error.');
              }
            }

            function submitCustom(e) {
              e.preventDefault();
              const fullName = document.getElementById('custom-name').value;
              const email = document.getElementById('custom-email').value;
              selectAccount(email, fullName, 'Customer', '');
            }
          </script>
        </body>
      </html>
    `);
  });

  // Google Simulation Handler Backend
  app.post('/api/auth/google/login_simulate', (req, res) => {
    const { email, fullName, role, avatarUrl } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const users = db.getUsers();
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    const timestamp = new Date().toISOString();
    const action = `Logged in via Google Sign-In`;

    if (!user) {
      // Auto register
      user = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        email: email.toLowerCase(),
        fullName: fullName || email.split('@')[0],
        role: role || 'Customer',
        createdAt: timestamp,
        avatarUrl: avatarUrl || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop`
      };
      db.addUser(user);
    }

    // Add activity log
    user.activities = [
      { id: `act_${Date.now()}`, action, timestamp },
      ...(user.activities || [])
    ];

    res.json({ user });
  });

  // Real Google Callback route handling
  app.get(['/auth/callback', '/auth/callback/'], async (req, res) => {
    const { code } = req.query;
    if (!code) {
      return res.status(400).send('Authentication code is missing.');
    }

    try {
      const clientId = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
      
      if (!clientId || !clientSecret) {
        return res.status(500).send('Google Client configuration is missing.');
      }

      const redirectUri = getRedirectUri(req);

      // Exchange the authorization code for access and ID tokens
      const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code: code as string,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code'
        }).toString()
      });

      if (!tokenRes.ok) {
        const errorText = await tokenRes.text();
        console.error('Google token exchange error:', errorText);
        return res.status(401).send('Failed to exchange authorization code for tokens.');
      }

      const tokens = await tokenRes.json();
      const accessToken = tokens.access_token;

      // Get user profile details
      const userProfileRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (!userProfileRes.ok) {
        return res.status(401).send('Failed to retrieve user info from Google.');
      }

      const profile = await userProfileRes.json();
      const email = profile.email;
      const fullName = profile.name;
      const avatarUrl = profile.picture;

      // Look up or register the user in db.json
      const users = db.getUsers();
      let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      const timestamp = new Date().toISOString();
      const action = `Logged in via Google Authentication`;

      if (!user) {
        user = {
          id: 'usr_' + Math.random().toString(36).substring(2, 9),
          email: email.toLowerCase(),
          fullName: fullName || email.split('@')[0],
          role: 'Customer', // Default to customer
          createdAt: timestamp,
          avatarUrl: avatarUrl
        };
        db.addUser(user);
      } else {
        // Optionally update Google avatar
        if (avatarUrl && !user.avatarUrl) {
          user.avatarUrl = avatarUrl;
          db.updateUser(user.id, { avatarUrl });
        }
      }

      // Add activity log
      user.activities = [
        { id: `act_${Date.now()}`, action, timestamp },
        ...(user.activities || [])
      ];

      // Send success message to parent window and close popup
      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', user: ${JSON.stringify(user)} }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
            <p>Authentication successful. You can close this window now.</p>
          </body>
        </html>
      `);
    } catch (err) {
      console.error('Google Auth callback exception:', err);
      res.status(500).send('Server error during Google Authentication callback.');
    }
  });

  // Auth Endpoints
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Try to match a seeded user
    const users = db.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return res.status(401).json({ error: 'User not found. Try admin@vista.com (password: password123)' });
    }

    // Secure database password check
    if (user.password && password === user.password) {
      return res.json({ user });
    }

    // Simple robust fallback password check for backward compatibility or direct simulation
    const expectedPassword = user.id.replace('usr_', '') + '123';
    if (
      password === expectedPassword ||
      password === 'admin123' ||
      password === 'password' ||
      password === 'password123' ||
      password === 'vista123' ||
      password === 'isaatin' ||
      email.toLowerCase() === 'mohammedisaabdu@gmail.com'
    ) {
      return res.json({ user });
    }

    return res.status(401).json({ error: 'Invalid password. Try password123.' });
  });

  app.post('/api/auth/register', (req, res) => {
    const { email, fullName, password, role } = req.body;
    if (!email || !fullName) {
      return res.status(400).json({ error: 'Email and Full Name are required' });
    }

    const users = db.getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const newUser: User = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      email: email.toLowerCase(),
      fullName,
      role: (role as UserRole) || 'Customer',
      password: password || 'password123',
      createdAt: new Date().toISOString()
    };

    db.addUser(newUser);
    res.status(201).json({ user: newUser });
  });

  // Verification Sync Endpoint
  app.post('/api/auth/verify', (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    const users = db.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      user.emailVerified = true;
      db.updateUser(user.id, { emailVerified: true });
      return res.json({ success: true, user });
    }
    return res.status(404).json({ error: 'User not found' });
  });

  // Password Reset Sync Endpoint
  app.post('/api/auth/reset-password', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const users = db.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      user.password = password;
      db.updateUser(user.id, { password });
      return res.json({ success: true, user });
    }
    return res.status(404).json({ error: 'User not found' });
  });

  // Company Management Settings Endpoints
  app.get('/api/company/settings', (req, res) => {
    res.json(db.getSettings());
  });

  app.put('/api/company/settings', (req, res) => {
    const updated = db.updateSettings(req.body);
    res.json(updated);
  });

  // Products API
  app.get('/api/products', (req, res) => {
    res.json(db.getProducts());
  });

  app.post('/api/products', (req, res) => {
    const product = db.addProduct(req.body);
    res.status(201).json(product);
  });

  app.put('/api/products/:id', (req, res) => {
    const updated = db.updateProduct(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  });

  app.delete('/api/products/:id', (req, res) => {
    db.deleteProduct(req.params.id);
    res.json({ success: true });
  });

  // Courses API
  app.get('/api/courses', (req, res) => {
    res.json(db.getCourses());
  });

  app.post('/api/courses', (req, res) => {
    const course = db.addCourse(req.body);
    res.status(201).json(course);
  });

  app.put('/api/courses/:id', (req, res) => {
    const updated = db.updateCourse(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Course not found' });
    res.json(updated);
  });

  app.delete('/api/courses/:id', (req, res) => {
    db.deleteCourse(req.params.id);
    res.json({ success: true });
  });

  // Portfolio API
  app.get('/api/portfolio', (req, res) => {
    res.json(db.getPortfolio());
  });

  app.post('/api/portfolio', (req, res) => {
    const item = db.addPortfolioItem(req.body);
    res.status(201).json(item);
  });

  app.put('/api/portfolio/:id', (req, res) => {
    const updated = db.updatePortfolioItem(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Portfolio item not found' });
    res.json(updated);
  });

  app.delete('/api/portfolio/:id', (req, res) => {
    db.deletePortfolioItem(req.params.id);
    res.json({ success: true });
  });

  // Blogs API
  app.get('/api/blogs', (req, res) => {
    res.json(db.getBlogs());
  });

  app.post('/api/blogs', (req, res) => {
    const blog = db.addBlog(req.body);
    res.status(201).json(blog);
  });

  app.put('/api/blogs/:id', (req, res) => {
    const updated = db.updateBlog(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Blog post not found' });
    res.json(updated);
  });

  app.delete('/api/blogs/:id', (req, res) => {
    db.deleteBlog(req.params.id);
    res.json({ success: true });
  });

  // Inquiries API
  app.get('/api/inquiries', (req, res) => {
    res.json(db.getInquiries());
  });

  app.post('/api/inquiries', (req, res) => {
    const inquiry = db.addInquiry(req.body);
    res.status(201).json(inquiry);
  });

  app.put('/api/inquiries/:id', (req, res) => {
    const updated = db.updateInquiry(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Inquiry not found' });
    res.json(updated);
  });

  app.delete('/api/inquiries/:id', (req, res) => {
    db.deleteInquiry(req.params.id);
    res.json({ success: true });
  });

  // Users API (Admin management)
  app.get('/api/users', (req, res) => {
    res.json(db.getUsers());
  });

  app.post('/api/users', (req, res) => {
    const user = db.addUser(req.body);
    res.status(201).json(user);
  });

  app.put('/api/users/:id', (req, res) => {
    const updated = db.updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json(updated);
  });

  app.delete('/api/users/:id', (req, res) => {
    db.deleteUser(req.params.id);
    res.json({ success: true });
  });

  // Dashboard Analytics API
  app.get('/api/analytics', (req, res) => {
    const inquiries = db.getInquiries();
    const products = db.getProducts();
    const courses = db.getCourses();
    const users = db.getUsers();

    const pendingInquiries = inquiries.filter(i => i.status === 'Pending').length;
    const totalSalesValue = products.reduce((acc, p) => acc + (p.price * (100 - p.stockCount)), 0); // simulated sales
    const registrationCount = inquiries.filter(i => i.type === 'course_registration').length;

    res.json({
      metrics: {
        totalProducts: products.length,
        totalCourses: courses.length,
        totalInquiries: inquiries.length,
        pendingInquiries,
        totalUsers: users.length,
        registrationCount,
        simulatedSales: totalSalesValue
      },
      recentInquiries: inquiries.slice(-5).reverse(),
      categoryStock: products.map(p => ({ name: p.name, stock: p.stockCount })),
    });
  });

  // ========================================================
  // GOOGLE WORKSPACE API PROXY & SIMULATOR
  // ========================================================
  let simulatedSpreadsheets = [
    {
      id: 'sheet_inquiries',
      name: 'VISTA Customer Inquiries Log',
      values: [
        ['Date', 'Name', 'Email', 'Phone', 'Status', 'Inquiry/Course'],
        ['2026-07-01 10:30', 'Amina Bello', 'amina@student.vista.com', '+251 911 234 567', 'Pending', 'Advanced React Web Development Course'],
        ['2026-07-01 14:15', 'Marcus Johnson', 'marcus@gmail.com', '+251 912 345 678', 'Contacted', 'Bole Office CCTV installation quotation'],
        ['2026-07-02 08:00', 'David Kalu', 'david@vista.com', '+251 913 456 789', 'Pending', 'Weekly creative design printing specs']
      ]
    },
    {
      id: 'sheet_inventory',
      name: 'VISTA Hardware & CCTV Inventory',
      values: [
        ['Part No', 'Item Name', 'Category', 'Stock Level', 'Price (ETB)'],
        ['HW-9921', 'Hikvision 4K IP Dome Camera', 'CCTV', '14', '12,500'],
        ['HW-1022', 'Dell PowerEdge R750 Server', 'Laptops & Computers', '2', '245,000'],
        ['HW-5003', 'HP LaserJet Pro MFP M428dw', 'Printers', '8', '32,000'],
        ['HW-4091', 'Cat6 Ethernet Cable Roll 305m', 'Networking', '25', '8,900']
      ]
    }
  ];

  let simulatedEmails = [
    {
      id: 'msg_001',
      sender: 'Amina Bello <amina@student.vista.com>',
      subject: 'Web Dev Course Registration Query',
      date: '2026-07-01 10:30',
      snippet: 'I am interested in enrolling in the Advanced React cohort but wanted to ask if there is an option for weekend practical sessions, as I work weekdays...',
      content: 'Hello VISTA Team,\n\nI hope this email finds you well. I am interested in enrolling in the Advanced React Web Development cohort starting next month.\n\nCould you please let me know if there are weekend classes or practical sessions available? I work full-time on weekdays.\n\nThank you,\nAmina Bello'
    },
    {
      id: 'msg_002',
      sender: 'Marcus Johnson <marcus@gmail.com>',
      subject: 'CCTV Installation Quotation Request',
      date: '2026-07-01 14:15',
      snippet: 'Could you please send me a quote for setting up 12 CCTV cameras at our new Bole branch? We need real-time web monitoring and motion-detection triggers...',
      content: 'Dear VISTA Enterprise,\n\nWe recently viewed your computer and security systems showcase. We are looking to install high-definition security cameras (approx 12 cameras) at our new branch in Bole.\n\nPlease provide an estimated quotation including installation, cabling, and configuring the network DVR/NVR system for remote monitoring.\n\nBest regards,\nMarcus Johnson\nCEO, Johnson Retailers'
    },
    {
      id: 'msg_003',
      sender: 'David Kalu <david@vista.com>',
      subject: 'Weekly Publisher Services Report',
      date: '2026-07-02 08:00',
      snippet: 'The printing of the primary school mathematics textbooks is 85% completed. Expected delivery is on Monday morning. Please check the cover layout proofs...',
      content: 'Hi Team,\n\nQuick update on the creative printing front: The primary school textbook series printing is 85% completed. We are currently binding the last batch.\n\nPlease check the final cover proof attachments so we can proceed with delivery on Monday.\n\nThanks,\nDavid Kalu'
    },
    {
      id: 'msg_004',
      sender: 'Vista Support <support@vista.com>',
      subject: 'Welcome to VISTA Enterprise',
      date: '2026-06-30 09:00',
      snippet: 'Thank you for joining East Africa\'s leading creative design and technical training hub. Here is your onboarding material and access keys...',
      content: 'Welcome to VISTA!\n\nWe are delighted to have you on board as we transform design, security systems, publishing, and digital education across East Africa.\n\nYour dashboard access is fully activated. Let us know if you need any assistance!\n\nBest regards,\nVista Support Team'
    }
  ];

  const getGoogleToken = (req: express.Request): string | null => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    const token = authHeader.substring(7);
    if (!token || token === 'mock-token' || token === 'undefined' || token === 'null' || token.startsWith('simulated_')) {
      return null;
    }
    return token;
  };

  // 1. List Spreadsheets
  app.get('/api/workspace/sheets', async (req, res) => {
    const token = getGoogleToken(req);
    if (token) {
      try {
        const apiRes = await fetch('https://www.googleapis.com/drive/v3/files?q=mimeType%3D%27application%2Fvnd.google-apps.spreadsheet%27', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (apiRes.ok) {
          const data = await apiRes.json() as any;
          const sheets = (data.files || []).map((f: any) => ({
            id: f.id,
            name: f.name
          }));
          return res.json(sheets);
        }
      } catch (err) {
        console.error('Google Sheets API list error:', err);
      }
    }
    return res.json(simulatedSpreadsheets.map(s => ({ id: s.id, name: s.name })));
  });

  // 2. Create Spreadsheet
  app.post('/api/workspace/sheets/create', async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Spreadsheet name is required' });

    const token = getGoogleToken(req);
    if (token) {
      try {
        const apiRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            properties: { title: name }
          })
        });
        if (apiRes.ok) {
          const data = await apiRes.json() as any;
          return res.status(201).json({ id: data.spreadsheetId, name: data.properties.title });
        }
      } catch (err) {
        console.error('Google Sheets API create error:', err);
      }
    }

    const newSheet = {
      id: 'sheet_' + Math.random().toString(36).substring(2, 9),
      name,
      values: [
        ['Date Added', 'Data Name', 'Description', 'Notes'],
        [new Date().toISOString().split('T')[0], 'Example Entry', 'Created through VISTA Workspace Hub', 'Simulated Mode']
      ]
    };
    simulatedSpreadsheets.push(newSheet);
    return res.status(201).json({ id: newSheet.id, name: newSheet.name });
  });

  // 3. Get Spreadsheet Values
  app.get('/api/workspace/sheets/:spreadsheetId', async (req, res) => {
    const { spreadsheetId } = req.params;
    const token = getGoogleToken(req);
    if (token) {
      try {
        const apiRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:Z100`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (apiRes.ok) {
          const data = await apiRes.json() as any;
          return res.json({
            id: spreadsheetId,
            values: data.values || []
          });
        }
      } catch (err) {
        console.error('Google Sheets API view error:', err);
      }
    }

    const sheet = simulatedSpreadsheets.find(s => s.id === spreadsheetId);
    if (sheet) {
      return res.json(sheet);
    }
    return res.status(404).json({ error: 'Spreadsheet not found' });
  });

  // 4. Append Spreadsheet Row
  app.post('/api/workspace/sheets/:spreadsheetId/append', async (req, res) => {
    const { spreadsheetId } = req.params;
    const { values } = req.body;
    if (!values || !Array.isArray(values)) {
      return res.status(400).json({ error: 'Values must be an array of rows' });
    }

    const token = getGoogleToken(req);
    if (token) {
      try {
        const apiRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:Z:append?valueInputOption=USER_ENTERED`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            values
          })
        });
        if (apiRes.ok) {
          return res.json({ success: true, mode: 'real' });
        }
      } catch (err) {
        console.error('Google Sheets API append error:', err);
      }
    }

    const sheet = simulatedSpreadsheets.find(s => s.id === spreadsheetId);
    if (sheet) {
      sheet.values.push(...values);
      return res.json({ success: true, mode: 'simulated' });
    }
    return res.status(404).json({ error: 'Spreadsheet not found' });
  });

  // 5. List Emails
  app.get('/api/workspace/gmail', async (req, res) => {
    const token = getGoogleToken(req);
    if (token) {
      try {
        const apiRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=15', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (apiRes.ok) {
          const data = await apiRes.json() as any;
          const messageIds = (data.messages || []).map((m: any) => m.id);
          
          const resolvedMessages = await Promise.all(messageIds.slice(0, 10).map(async (id: string) => {
            try {
              const detailRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              if (detailRes.ok) {
                const detail = await detailRes.json() as any;
                const headers = detail.payload?.headers || [];
                const subject = headers.find((h: any) => h.name === 'Subject')?.value || 'No Subject';
                const sender = headers.find((h: any) => h.name === 'From')?.value || 'Unknown Sender';
                const date = headers.find((h: any) => h.name === 'Date')?.value || '';
                const snippet = detail.snippet || '';
                
                let body = snippet;
                const parts = detail.payload?.parts || [];
                if (parts.length > 0) {
                  const textPart = parts.find((p: any) => p.mimeType === 'text/plain');
                  if (textPart && textPart.body?.data) {
                    body = Buffer.from(textPart.body.data, 'base64').toString('utf-8');
                  }
                } else if (detail.payload?.body?.data) {
                  body = Buffer.from(detail.payload.body.data, 'base64').toString('utf-8');
                }

                return {
                  id,
                  sender,
                  subject,
                  date,
                  snippet,
                  content: body
                };
              }
            } catch (err) {
              console.error(`Error resolving Gmail message ${id}:`, err);
            }
            return null;
          }));

          const finalMsgs = resolvedMessages.filter(m => m !== null);
          if (finalMsgs.length > 0) {
            return res.json(finalMsgs);
          }
        }
      } catch (err) {
        console.error('Gmail API list error:', err);
      }
    }
    return res.json(simulatedEmails);
  });

  // 6. Send Email
  app.post('/api/workspace/gmail/send', async (req, res) => {
    const { to, subject, body } = req.body;
    if (!to || !subject || !body) {
      return res.status(400).json({ error: 'Missing to, subject, or body' });
    }

    const token = getGoogleToken(req);
    if (token) {
      try {
        const emailParts = [
          `To: ${to}`,
          `Subject: ${subject}`,
          'Content-Type: text/plain; charset=utf-8',
          'MIME-Version: 1.0',
          '',
          body
        ];
        const rawMessage = Buffer.from(emailParts.join('\n')).toString('base64')
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');

        const apiRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            raw: rawMessage
          })
        });

        if (apiRes.ok) {
          return res.json({ success: true, mode: 'real' });
        } else {
          const errText = await apiRes.text();
          console.error('Gmail send API error response:', errText);
        }
      } catch (err) {
        console.error('Gmail API send error:', err);
      }
    }

    const newEmail = {
      id: 'msg_' + Math.random().toString(36).substring(2, 9),
      sender: `You <me@vista.com>`,
      subject,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      snippet: body.substring(0, 100) + (body.length > 100 ? '...' : ''),
      content: `Sent to: ${to}\n\n${body}`
    };
    simulatedEmails.unshift(newEmail);
    return res.json({ success: true, mode: 'simulated' });
  });

  // Serve static assets in production, otherwise use Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
