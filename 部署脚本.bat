@echo off
echo ========================================
echo   美家装修 - 部署脚本
echo ========================================
echo.

echo [1/4] 初始化Git仓库...
git init
git add .
git commit -m "Initial commit"

echo.
echo [2/4] 请在GitHub上创建新仓库:
echo   1. 访问 https://github.com/new
echo   2. 仓库名: meijia-home
echo   3. 选择 Public
echo   4. 不要勾选任何初始化选项
echo   5. 点击 Create repository
echo.
pause

echo [3/4] 推送到GitHub...
git remote add origin https://github.com/你的用户名/meijia-home.git
git branch -M main
git push -u origin main

echo.
echo [4/4] 部署说明:
echo   前端 (GitHub Pages):
echo   1. 进入仓库 Settings -> Pages
echo   2. Source 选择 "Deploy from a branch"
echo   3. Branch 选择 main, 文件夹选择 /frontend
echo   4. 点击 Save
echo   5. 等待几分钟后访问: https://你的用户名.github.io/meijia-home/
echo.
echo   后端 (Railway):
echo   1. 访问 https://railway.app
echo   2. 用GitHub账号登录
echo   3. 点击 "New Project" -> "Deploy from GitHub repo"
echo   4. 选择 meijia-home 仓库
echo   5. 选择 backend 文件夹
echo   6. 等待部署完成
echo   7. 复制生成的域名，更新 frontend/js/api.js 中的 API_BASE
echo.
echo 部署完成！
pause
