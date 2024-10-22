📱 Mobisokoni

Mobisokoni is a mobile app that automates USSD code dialing in the background, allowing users to multitask while managing data bundle purchases and other operations. Tailored for Bingwa Sokini agents, it simplifies mobile business management.

🚀 Key Features
🛠️ Automated USSD Dialing: Runs in the background, executing USSD codes effortlessly.
📊 Agent and Admin Dashboards: Custom dashboards for agents and administrators.
🔐 Clerk Authentication: Secure login and registration.
💳 Subscription Management: Manage payments via MPESA and Paystack.
💬 Transaction Tracking: Access transaction history and retrieve phone numbers for SMS campaigns.
💵 Airtime Management: Check and recharge airtime balances directly from the app.
🎓 Onboarding Guide: Interactive slides to help new users get started.
🛠️ Tech Stack
React Native: Cross-platform mobile app development.
TypeScript: For strong type-checking and scalable development.
Clerk: Secure and seamless user authentication.
Paystack & MPESA: Payment processing integration.
📦 Installation
Follow these steps to install and run Mobisokoni locally:

Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/mobisokoni.git
cd mobisokoni
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm run start
Run the app on a device or emulator:

bash
Copy code
npm run android   # For Android
npm run ios       # For iOS
📂 Directory Structure

App.js: Contains the main navigation setup.
OnboardingScreen.js: Guides users through app introduction.
HomeScreen.js: Displays a welcome message after login.
AdmindashboardScreen.js: The admin’s control panel.
AgentdashboardScreen.js: The agent’s workspace for managing operations.
🎯 How to Use
Onboarding: Follow the app’s introduction slides upon installation.
Authentication: Log in or register using Clerk authentication.
Agent Features: Agents can manage USSD codes, transactions, and more from their dashboard.
Admin Features: Admins can oversee agents and manage business functions from the admin dashboard.
🔑 Permissions
Mobisokoni requires the following permissions:

Background Service: For background USSD dialing.
Network Access: To interact with MPESA and Paystack services.
SMS: To retrieve phone numbers for SMS campaigns.
📅 Future Roadmap
USSD Error Handling: Auto-retry USSD if it fails.
Advanced Reporting: In-depth reports for agents and admins.
Push Notifications: Instant alerts for transactions, low balance, etc.
🤝 Contributing
We welcome contributions! Follow these steps:

Fork the repository.
Create a new branch: git checkout -b feature/new-feature.
Commit your changes: git commit -m 'Add new feature'.
Push to the branch: git push origin feature/new-feature.
Open a pull request.
📝 License
This project is licensed under the MIT License. See the LICENSE file for more information.

