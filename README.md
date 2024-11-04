<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>Mobisokoni</h1>

<p>Mobisokoni is an automated mobile platform that empowers agents in the Bingwa Sokini network to manage and sell data bundles effortlessly. The app automates USSD code transactions and processes MPESA SMS payments, creating a streamlined experience for agents to handle transactions without manual intervention.</p>

<h2>Project Overview</h2>

<h3>What Mobisokoni Does</h3>
<p>Mobisokoni simplifies data bundle sales for agents who rely on mobile payments and want a hands-free way to process transactions. Key features include:</p>
<ul>
  <li><strong>Automated USSD Transactions</strong>: The app runs in the background to dial USSD codes based on MPESA payments received, allowing agents to handle sales passively.</li>
  <li><strong>MPESA SMS Parsing</strong>: Payments are automatically processed by reading MPESA transaction SMS messages, reducing manual input and error.</li>
  <li><strong>User-Friendly Dashboard</strong>: Agents have access to a dashboard to track transaction history, view customer contact details, and manage finances.</li>
  <li><strong>Alert System</strong>: Alerts for failed or pending transactions ensure smooth operations and allow agents to address any issues promptly.</li>
</ul>

<h3>Target Audience</h3>
<p>Mobisokoni is designed for:</p>
<ul>
  <li><strong>Mobile Service Resellers</strong>: Agents who resell mobile data bundles and rely on mobile payment systems.</li>
  <li><strong>Freelancers and Micro-Business Owners</strong>: Individuals looking for efficient, low-cost solutions to manage mobile data services.</li>
  <li><strong>Markets Using Mobile Payments</strong>: Although designed for Kenya’s MPESA ecosystem, the Mobisokoni model can be adapted to other markets using similar mobile payment systems.</li>
</ul>

<h2>Getting Started</h2>
<p>This guide will help you set up Mobisokoni locally for development and contributions.</p>

<h3>Prerequisites</h3>
<p>To run the Mobisokoni app locally, you’ll need:</p>
<ul>
  <li><a href="https://nodejs.org/">Node.js</a> (v14.x or later)</li>
  <li><a href="https://reactnative.dev/docs/environment-setup">React Native</a> development environment (for mobile applications)</li>
  <li><strong>Expo CLI</strong> (optional but recommended for testing on devices and simulators)</li>
  <li><a href="https://supabase.com/">Supabase</a> account and API keys for backend services</li>
</ul>

<h3>Installation</h3>
<ol>
  <li><strong>Clone the Repository</strong>
    <pre><code>git clone https://github.com/kbett035/mobisokoni.git
cd mobisokoni</code></pre>
  </li>
  <li><strong>Install Dependencies</strong>
    <pre><code>npm install</code></pre>
  </li>
  <li><strong>Set Up Environment Variables</strong>
    <p>Create a <code>.env</code> file in the root directory and add the following:</p>
    <pre><code>REACT_APP_API_URL=your_api_url_here
REACT_APP_MPESA_API_KEY=your_mpesa_api_key_here
REACT_APP_SUPABASE_URL=your_supabase_url_here
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here</code></pre>
    <p>Replace placeholders with actual values for your development environment.</p>
  </li>
  <li><strong>Start the Development Server</strong>
    <pre><code>npm start</code></pre>
  </li>
  <li><strong>Run on an Emulator or Device</strong>
    <p>For Expo: Open the project on the Expo Go app on your phone or use an iOS/Android simulator.</p>
  </li>
</ol>

<h3>Folder Structure</h3>
<p>The project structure is organized for easy navigation and extension:</p>
<ul>
  <li><code>src/</code>: Contains the main application code.
    <ul>
      <li><code>screens/</code>: App screens, such as Home, Dashboard, and History.</li>
      <li><code>components/</code>: Reusable components like buttons, list views, etc.</li>
      <li><code>services/</code>: Utility functions and services, including MPESA SMS parsing and Supabase integration.</li>
      <li><code>navigation/</code>: Defines app navigation and routing structure.</li>
    </ul>
  </li>
</ul>

<h2>Contributing</h2>
<p>We welcome contributions from developers around the world! Here’s how you can get involved:</p>
<ol>
  <li><strong>Fork the Repository</strong> to your own GitHub account.</li>
  <li><strong>Create a New Branch</strong> for your changes with a descriptive name (e.g., <code>feature/transaction-history</code>).</li>
  <li><strong>Make Your Changes</strong> and test thoroughly.</li>
  <li><strong>Submit a Pull Request</strong> to the main repository.</li>
</ol>

<h3>Contribution Guidelines</h3>
<ul>
  <li><strong>Code Style</strong>: Follow the existing code style (ESLint, Prettier are used).</li>
  <li><strong>Commit Messages</strong>: Use clear and descriptive commit messages.</li>
  <li><strong>Testing</strong>: Ensure all changes work as expected, especially if adding new features.</li>
</ul>

<h3>Issues</h3>
<p>If you encounter any issues, feel free to open an <a href="https://github.com/kbett035/mobisokoni/issues">issue</a>. We encourage feedback and suggestions to improve the app!</p>

<h2>License</h2>
<p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

<h2>Contact</h2>
<p>For questions, suggestions, or further discussion, please reach out to <a href="mailto:bett@edracom.co.ke">Bett</a>.</p>

</body>
</html>
