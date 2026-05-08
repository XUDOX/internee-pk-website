# Internee.pk Clone - Cloud Migration & Deployment

A fully responsive clone of the Internee.pk platform, built with React and deployed to a professional cloud infrastructure.

## 🚀 Live Demo
[View the Live Project](https://yaseen-cloud-project.duckdns.org)

## 🛠️ Tech Stack
* **Frontend:** React.js, Vite, Tailwind CSS
* **Infrastructure:** AWS EC2 (Ubuntu 22.04 LTS)
* **Web Server:** Nginx
* **Security:** HTTPS via Let's Encrypt SSL (Certbot)
* **Deployment:** WinSCP & SSH

## 📖 Key Features
* **Modern UI:** Pixel-perfect recreation of the Internee.pk landing page.
* **Responsive Design:** Optimized for mobile, tablet, and desktop views.
* **Cloud Hosted:** Migrated from local development to a globally accessible AWS instance.
* **Secure Connection:** SSL/TLS encryption implemented for safe browsing.

## 📂 Deployment Steps
1. Optimized the React build using `npm run build`.
2. Provisioned an AWS EC2 instance and configured Security Groups for Ports 80 and 443.
3. Configured Nginx as a reverse proxy to serve the static build and handle SPA routing.
4. Integrated Let's Encrypt via Certbot for automated SSL certificate management.