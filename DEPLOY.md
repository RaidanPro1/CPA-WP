# Deployment Guide: Ubuntu 22.04

Follow these steps to deploy the CPA Portal to your own server.

## 1. Prepare the Server

Connect to your server via SSH:
```bash
ssh user@your_server_ip
```

Update your package lists and install Node.js (version 18+) and Nginx:

```bash
sudo apt update
sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs nginx
```

## 2. Upload Your Code

You can use `scp` or git to get your files onto the server. Let's assume you put them in `/var/www/cpa-portal`.

```bash
# Create directory
sudo mkdir -p /var/www/cpa-portal
sudo chown -R $USER:$USER /var/www/cpa-portal
```

Upload the files (index.tsx, App.tsx, package.json, etc.) to this folder.

## 3. Build the Application

Navigate to the project folder and install dependencies:

```bash
cd /var/www/cpa-portal
npm install
```

**Important:** Provide your Gemini API Key during the build or run process. 
Create a `.env` file or export the variable before building:

```bash
export API_KEY="your_google_gemini_api_key_here"
npm run build
```

This will create a `dist` folder containing the optimized production files.

## 4. Configure Nginx

Copy the provided `nginx.conf` content to the Nginx sites-available directory.

```bash
sudo nano /etc/nginx/sites-available/cpa-portal
```

Paste the content from `nginx.conf` (make sure to change `your_domain_or_ip.com` to your actual IP or domain).

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/cpa-portal /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Optional: remove default if not needed
sudo nginx -t # Test configuration
sudo systemctl restart nginx
```

## 5. Setup SSL (Optional but Recommended)

If you have a domain name, use Certbot for free SSL:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your_domain.com
```

## 6. Access the App

Open your browser and navigate to `http://your_server_ip` (or your domain).
