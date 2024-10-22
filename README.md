Mobisokoni
Mobisokoni is a mobile application designed to automate USSD code dialing in the background, enabling users to perform other tasks on their phones while their business operations, such as managing data bundle purchases, run seamlessly. It is built for Bingwa Sokini agents, who handle mobile data purchases and delivery for their clients.

Features
Automated USSD Dialing: Mobisokoni runs in the background, dialing USSD codes for data bundles and other services automatically.
Agent and Admin Dashboards: Two distinct dashboards tailored for agents and administrators to manage services and users.
Clerk Authentication: Secure login and registration process powered by Clerk.
Subscription Management: Agents pay for monthly subscriptions via MPESA through Paystack.
Transaction Tracking: View transaction history and retrieve phone numbers for SMS campaigns.
Airtime Management: Check and recharge airtime balances directly from the app.
Onboarding Guide: New users are guided through an onboarding process with slides that explain the app, followed by an option to log in or register.
Tech Stack
React Native: For building the mobile app.
TypeScript: For type-safe and scalable code.
Clerk: For authentication and user management.
Paystack: For payment processing of monthly subscriptions.
MPESA: Integration for receiving payments from clients.
Installation
To install and run Mobisokoni on your local development environment, follow these steps:

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
npm run android # for Android
npm run ios     # for iOS
Directory Structure
plaintext
Copy code
/src
  ├── components/
  │   ├── AdminDashboard/
  │   ├── AgentDashboard/
  │   ├── AgentManagement/
  ├── screens/
  │   ├── HomeScreen.js
  │   ├── OnboardingScreen.js
  │   ├── AdmindashboardScreen.js
  │   ├── AgentdashboardScreen.js
  └── App.js
App.js: Contains the main navigation setup.
OnboardingScreen.js: Guides users through the app with slides before login.
HomeScreen.js: Displays a welcome message upon successful login.
AdmindashboardScreen.js: Displays the admin dashboard with management tools.
AgentdashboardScreen.js: Displays the agent dashboard for individual agents.
AgentManagement/: Handles management features for agents (create, update, view details, etc.).
Usage
Onboarding: After installing the app, users are taken through an onboarding guide.
Authentication: Users must log in or register via Clerk to access the app.
Agent Dashboard: Once logged in, agents can view their dashboard, manage transactions, and input USSD codes.
Admin Dashboard: Administrators can manage agents and track performance from their own dashboard.
Permissions
The Mobisokoni app requires the following permissions:

Background Service: To run USSD code dialing while other tasks are performed.
Network Access: To interact with MPESA and Paystack for payments.
SMS: For retrieving phone numbers to send SMS campaigns.
Future Features
USSD Error Handling: Automatically retry USSD codes if they fail.
Advanced Reporting: Allow agents and admins to generate detailed business reports.
Notifications: Alerts for successful transactions and low airtime or data balances.
Contributing
We welcome contributions! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/new-feature).
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature/new-feature).
Create a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.
